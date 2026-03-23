import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

function padNum(n: number, len: number) {
  return n.toString().padStart(len, "0");
}

interface Props {
  surahNum: number;
  surahName: string;
  totalVerses?: number;
}

export default function SurahAudioPlayer({ surahNum, surahName, totalVerses = 1 }: Props) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${padNum(surahNum, 3)}${padNum(currentVerse, 3)}.mp3`;

  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, [surahNum]);

  useEffect(() => {
    if (playing && audioRef.current) {
      setError(false);
      audioRef.current.load();
      audioRef.current.play().catch(() => { setError(true); setPlaying(false); });
    }
  }, [currentVerse]);

  const handleEnded = () => {
    if (currentVerse < totalVerses) {
      setCurrentVerse(v => v + 1);
    } else {
      setPlaying(false);
      setCurrentVerse(1);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      setLoading(true);
      setError(false);
      audioRef.current.play().then(() => {
        setLoading(false);
        setPlaying(true);
      }).catch(() => {
        setLoading(false);
        setError(true);
      });
    }
  };

  const restart = () => {
    audioRef.current?.pause();
    setPlaying(false);
    setCurrentVerse(1);
    setError(false);
    setTimeout(() => {
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => setError(true));
    }, 100);
  };

  return (
    <div className="bg-secondary/50 border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-foreground">🎵 Audio — {surahName}</span>
        </div>
        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full font-semibold">
          Ajet {currentVerse}/{totalVerses}
        </span>
      </div>

      <audio ref={audioRef} src={audioUrl} onEnded={handleEnded} onError={() => { setError(true); setLoading(false); setPlaying(false); }} preload="none" />

      {error ? (
        <div className="text-xs text-destructive bg-destructive/10 rounded-lg p-2">⚠️ Audio nuk u ngarkua. Kontrollo lidhjen.</div>
      ) : (
        <div className="flex items-center gap-2">
          <button onClick={togglePlay} className="flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-xl transition-all shadow-sm">
            {loading ? <span className="animate-spin">⏳</span> : playing ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Dëgjo Suren</>}
          </button>
          <button onClick={restart} className="w-9 h-9 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center" title="Rinis">
            <RotateCcw className="w-4 h-4 text-foreground/70" />
          </button>
          {playing && <span className="text-xs text-primary animate-pulse font-medium">🎵 Po luan...</span>}
        </div>
      )}
      <p className="text-[10px] text-muted-foreground mt-2">Recitim: Sheikh Mishary Al-Afasy</p>
    </div>
  );
}
