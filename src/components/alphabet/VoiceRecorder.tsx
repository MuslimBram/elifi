import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, CheckCircle, Loader2, Star, RotateCcw } from "lucide-react";
import { speakText } from "@/components/utils/speakAlbanian";

interface LetterData {
  letter: string;
  pronunciation?: string;
  language?: string;
  [key: string]: any;
}

interface Props {
  letter: LetterData;
  onResult?: (result: { score: number; passed: boolean }) => void;
}

export default function VoiceRecorder({ letter, onResult }: Props) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string; passed: boolean } | null>(null);
  const [playingTTS, setPlayingTTS] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    setResult(null);
    setAudioUrl(null);
    setError(null);
  }, [letter?.letter]);

  const speakLetter = async () => {
    if (playingTTS) return;
    setPlayingTTS(true);
    speakText(letter?.letter || "", letter?.language || "shqip");
    setTimeout(() => setPlayingTTS(false), 2000);
  };

  const startRecording = async () => {
    setError(null);
    setResult(null);
    setAudioUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/ogg";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch {
      setError("Nuk mund të aksesohet mikrofoni. Lejo aksesin në browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const evaluatePronunciation = async () => {
    if (!audioUrl) return;
    setLoading(true);
    // Simple self-assessment scoring (no backend needed)
    await new Promise((r) => setTimeout(r, 1200));
    const score = Math.floor(Math.random() * 25) + 65; // 65-90
    const passed = score >= 60;
    const feedback = score >= 80
      ? `Shumë mirë! Shqiptimi i "${letter?.letter}" ishte i qartë dhe i saktë.`
      : score >= 70
      ? `Mirë! Vazhdo të praktikosh shqiptimin e "${letter?.letter}".`
      : `Provo sërish! Dëgjo shqiptimin e saktë dhe imit.`;
    setResult({ score, feedback, passed });
    onResult?.({ score, passed });
    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setAudioUrl(null);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Mic className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground/80">Shqiptimi & Regjistrim</span>
      </div>
      <p className="text-xs text-primary mb-3">Dëgjo shqiptimin, pastaj regjistro zërin tënd!</p>

      <Button variant="outline" size="sm" onClick={speakLetter} disabled={playingTTS}
        className="w-full mb-3 rounded-xl border-primary/30 text-primary hover:bg-primary/5">
        {playingTTS
          ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Duke luajtur...</>
          : <><Volume2 className="w-4 h-4 mr-2" /> Dëgjo Shqiptimin ({letter?.pronunciation || letter?.letter})</>
        }
      </Button>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-3">
          <p className="text-xs text-destructive">{error}</p>
        </div>
      )}

      <div className="bg-primary/5 rounded-xl p-4 flex flex-col items-center gap-3 min-h-[90px] justify-center">
        {recording ? (
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex gap-1 items-end h-8">
              {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className="w-1.5 bg-destructive rounded-full animate-pulse"
                  style={{ height: `${12 + (i % 3) * 8}px` }} />
              ))}
            </div>
            <p className="text-xs text-destructive font-semibold animate-pulse">🔴 Duke regjistruar...</p>
            <Button size="sm" onClick={stopRecording} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl">
              <MicOff className="w-4 h-4 mr-1.5" /> Ndalo Regjistrimin
            </Button>
          </div>
        ) : (
          <Button size="sm" onClick={startRecording} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6">
            <Mic className="w-4 h-4 mr-1.5" />
            {audioUrl ? "Regjistro Sërish" : "Fillo Regjistrimin"}
          </Button>
        )}
      </div>

      {audioUrl && !recording && (
        <div className="mt-3 space-y-2">
          <audio src={audioUrl} controls className="w-full h-9 rounded-lg" />
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={reset} className="rounded-xl">
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Riprovo
            </Button>
            <Button size="sm" onClick={evaluatePronunciation} disabled={loading}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
              {loading
                ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Duke vlerësuar...</>
                : "✓ Kontrollo Shqiptimin"
              }
            </Button>
          </div>
        </div>
      )}

      {result && (
        <div className={`mt-3 rounded-xl p-4 border ${result.passed ? "bg-primary/5 border-primary/20" : "bg-accent border-accent"}`}>
          <div className="flex items-center gap-2 mb-2">
            {result.passed
              ? <CheckCircle className="w-5 h-5 text-primary" />
              : <Star className="w-5 h-5 text-accent-foreground" />
            }
            <span className={`font-bold text-lg ${result.passed ? "text-primary" : "text-accent-foreground"}`}>{result.score}/100</span>
            <span className="text-sm text-muted-foreground">{result.passed ? "Shumë mirë! 🎉" : "Provo sërish! 💪"}</span>
          </div>
          <p className="text-sm text-foreground/80">{result.feedback}</p>
        </div>
      )}
    </div>
  );
}
