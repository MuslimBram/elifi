import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ChevronLeft, ChevronRight, Eraser, Mic, MicOff, CheckCircle, Star, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NumberItem {
  num: number;
  word: string;
  ordinal: string;
  pronunciation: string;
  transliteration?: string;
}

const NUMBERS: Record<string, NumberItem[]> = {
  shqip: [
    { num: 0, word: "zero", ordinal: "i zerët", pronunciation: "ze-ro" },
    { num: 1, word: "një", ordinal: "i parë", pronunciation: "një" },
    { num: 2, word: "dy", ordinal: "i dytë", pronunciation: "dy" },
    { num: 3, word: "tre", ordinal: "i tretë", pronunciation: "tre" },
    { num: 4, word: "katër", ordinal: "i katërt", pronunciation: "ka-tër" },
    { num: 5, word: "pesë", ordinal: "i pestë", pronunciation: "pe-së" },
    { num: 6, word: "gjashtë", ordinal: "i gjashtë", pronunciation: "gjash-të" },
    { num: 7, word: "shtatë", ordinal: "i shtatë", pronunciation: "shta-të" },
    { num: 8, word: "tetë", ordinal: "i tetë", pronunciation: "te-të" },
    { num: 9, word: "nëntë", ordinal: "i nëntë", pronunciation: "nën-të" },
    { num: 10, word: "dhjetë", ordinal: "i dhjetë", pronunciation: "dhje-të" },
    { num: 11, word: "njëmbëdhjetë", ordinal: "i njëmbëdhjetë", pronunciation: "njëm-bë-dhje-të" },
    { num: 12, word: "dymbëdhjetë", ordinal: "i dymbëdhjetë", pronunciation: "dym-bë-dhje-të" },
    { num: 20, word: "njëzet", ordinal: "i njëzetë", pronunciation: "një-zet" },
    { num: 100, word: "njëqind", ordinal: "i njëqindtë", pronunciation: "një-qind" },
  ],
  anglisht: [
    { num: 0, word: "zero", ordinal: "zeroth", pronunciation: "ZEE-roh" },
    { num: 1, word: "one", ordinal: "first", pronunciation: "wun" },
    { num: 2, word: "two", ordinal: "second", pronunciation: "too" },
    { num: 3, word: "three", ordinal: "third", pronunciation: "three" },
    { num: 4, word: "four", ordinal: "fourth", pronunciation: "for" },
    { num: 5, word: "five", ordinal: "fifth", pronunciation: "fayv" },
    { num: 6, word: "six", ordinal: "sixth", pronunciation: "siks" },
    { num: 7, word: "seven", ordinal: "seventh", pronunciation: "SEV-en" },
    { num: 8, word: "eight", ordinal: "eighth", pronunciation: "ayt" },
    { num: 9, word: "nine", ordinal: "ninth", pronunciation: "nayn" },
    { num: 10, word: "ten", ordinal: "tenth", pronunciation: "ten" },
    { num: 11, word: "eleven", ordinal: "eleventh", pronunciation: "ih-LEV-en" },
    { num: 12, word: "twelve", ordinal: "twelfth", pronunciation: "twelv" },
    { num: 20, word: "twenty", ordinal: "twentieth", pronunciation: "TWEN-tee" },
    { num: 100, word: "one hundred", ordinal: "hundredth", pronunciation: "wun HUN-dred" },
  ],
  arabisht: [
    { num: 0, word: "صِفْر", ordinal: "الصِّفْر", pronunciation: "sifr", transliteration: "sifr" },
    { num: 1, word: "وَاحِد", ordinal: "الأَوَّل", pronunciation: "wāhid", transliteration: "wāhid" },
    { num: 2, word: "اِثْنَان", ordinal: "الثَّانِي", pronunciation: "ithnān", transliteration: "ithnān" },
    { num: 3, word: "ثَلَاثَة", ordinal: "الثَّالِث", pronunciation: "thalātha", transliteration: "thalātha" },
    { num: 4, word: "أَرْبَعَة", ordinal: "الرَّابِع", pronunciation: "arba'a", transliteration: "arba'a" },
    { num: 5, word: "خَمْسَة", ordinal: "الخَامِس", pronunciation: "khamsa", transliteration: "khamsa" },
    { num: 6, word: "سِتَّة", ordinal: "السَّادِس", pronunciation: "sitta", transliteration: "sitta" },
    { num: 7, word: "سَبْعَة", ordinal: "السَّابِع", pronunciation: "sab'a", transliteration: "sab'a" },
    { num: 8, word: "ثَمَانِيَة", ordinal: "الثَّامِن", pronunciation: "thamāniya", transliteration: "thamāniya" },
    { num: 9, word: "تِسْعَة", ordinal: "التَّاسِع", pronunciation: "tis'a", transliteration: "tis'a" },
    { num: 10, word: "عَشَرَة", ordinal: "العَاشِر", pronunciation: "'ashara", transliteration: "'ashara" },
    { num: 20, word: "عِشْرُون", ordinal: "العِشْرُون", pronunciation: "'ishrūn", transliteration: "'ishrūn" },
    { num: 100, word: "مِئَة", ordinal: "المِئَة", pronunciation: "mi'a", transliteration: "mi'a" },
  ],
};

const ARABIC_NUMERALS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

function speakWord(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const langCode = lang === "arabisht" ? "ar" : lang === "anglisht" ? "en-US" : "sq";
  const u = new SpeechSynthesisUtterance(text);
  u.lang = langCode;
  u.rate = 0.65;
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang === langCode) || voices.find(v => v.lang.startsWith(langCode.split("-")[0]));
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}

/* ── Drawing Canvas ── */
function NumberDrawingCanvas({ item, language }: { item: NumberItem; language: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setHasDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  }, [item?.num]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width);
      canvas.height = Math.round(rect.height);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPos = (e: any) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const src = e.touches?.[0] || e;
    return {
      x: (src.clientX - rect.left) * (canvas.width / rect.width),
      y: (src.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDrawing = (e: any) => {
    e.preventDefault();
    lastPosRef.current = getPos(e);
    setIsDrawing(true);
    setHasDrawing(true);
  };
  const draw = (e: any) => {
    e.preventDefault();
    if (!isDrawing || !lastPosRef.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPosRef.current = pos;
  };
  const stopDrawing = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  };

  const displayLabel = language === "arabisht" ? `${item.num} (${item.word})` : `"${item.word}" (${item.num})`;

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-bold text-amber-600">✏️ Vizato Numrin</span>
      </div>
      <p className="text-xs text-muted-foreground mb-2">
        Vizato numrin <strong>{displayLabel}</strong> brenda kutisë!
      </p>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-44 border-2 border-dashed border-amber-200 rounded-xl bg-white cursor-crosshair touch-none block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasDrawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-8xl font-bold text-gray-100 select-none">{item.num}</span>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-2">
        <Button size="sm" variant="outline" onClick={clearCanvas} className="rounded-xl text-xs">
          <Eraser className="w-3 h-3 mr-1" /> Fshi
        </Button>
        <Button size="sm" onClick={clearCanvas} className="rounded-xl text-xs bg-amber-500 hover:bg-amber-600 text-white">
          ✓ Kontrollo
        </Button>
      </div>
    </div>
  );
}

/* ── Voice Recorder ── */
function NumberVoiceRecorder({ item, language }: { item: NumberItem; language: string }) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    setAudioUrl(null);
    setError(null);
  }, [item?.num]);

  const startRecording = async () => {
    setError(null);
    setAudioUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      setRecording(true);
    } catch {
      setError("Nuk mund të aksesohet mikrofoni.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-bold text-teal-600">🎤 Shqiptimi</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => speakWord(item.word, language)}
        className="w-full mb-2 rounded-xl border-teal-200 text-teal-700 hover:bg-teal-50"
      >
        <Volume2 className="w-4 h-4 mr-2" /> Dëgjo: "{item.pronunciation}"
      </Button>
      {error && <p className="text-xs text-destructive mb-2">{error}</p>}
      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-3 flex flex-col items-center gap-2 min-h-[70px] justify-center">
        {recording ? (
          <>
            <p className="text-xs text-destructive font-semibold animate-pulse">🔴 Duke regjistruar...</p>
            <Button size="sm" onClick={stopRecording} className="bg-destructive hover:bg-destructive/90 text-white rounded-xl">
              <MicOff className="w-4 h-4 mr-1" /> Ndalo
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            onClick={startRecording}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-5"
          >
            <Mic className="w-4 h-4 mr-1" /> {audioUrl ? "Regjistro Sërish" : "Fillo Regjistrimin"}
          </Button>
        )}
      </div>
      {audioUrl && !recording && (
        <div className="mt-2">
          <audio src={audioUrl} controls className="w-full h-8 rounded-lg" />
        </div>
      )}
    </div>
  );
}

/* ── Quiz Generator ── */
function generateQuizQuestions(nums: NumberItem[], language: string) {
  const isArabic = language === "arabisht";
  const questions: any[] = [];
  nums.forEach((item) => {
    const wrongs = nums.filter((n) => n.num !== item.num).sort(() => Math.random() - 0.5).slice(0, 3);
    questions.push({
      question: isArabic ? `Sa është: ${item.num}?` : `Si shkruhet numri ${item.num}?`,
      display: item.num.toString(),
      options: [item, ...wrongs].sort(() => Math.random() - 0.5).map((o) => o.word),
      correct: item.word,
      isArabic,
    });
    questions.push({
      question: isArabic ? `Cili numër është: ${item.word}?` : `"${item.word}" — cili numër është?`,
      display: item.word,
      options: [item, ...wrongs].sort(() => Math.random() - 0.5).map((o) => o.num.toString()),
      correct: item.num.toString(),
      isArabic,
      isArabicWord: isArabic,
    });
    if (item.ordinal) {
      questions.push({
        question: `Cili është numri rreshtor (ordinal) i ${item.num}?`,
        display: item.num.toString(),
        options: [item, ...wrongs].sort(() => Math.random() - 0.5).map((o) => o.ordinal),
        correct: item.ordinal,
        isArabic,
      });
    }
  });
  for (let i = 0; i < 8; i++) {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const ans = a + b;
    const wrongs = [ans + 1, ans - 1, ans + 2].filter((n) => n >= 0 && n !== ans);
    questions.push({
      question: `${a} + ${b} = ?`,
      display: `${a} + ${b}`,
      options: [ans, ...wrongs].sort(() => Math.random() - 0.5).map(String),
      correct: ans.toString(),
      isArabic: false,
    });
  }
  return questions.sort(() => Math.random() - 0.5).slice(0, 25);
}

/* ── Main Component ── */
export default function NumberLearningView({ language }: { language: string }) {
  const nums = NUMBERS[language] || NUMBERS.shqip;
  const isArabic = language === "arabisht";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<"learn" | "quiz">("learn");
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [answered, setAnswered] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [quizFinished, setQuizFinished] = useState(false);

  const item = nums[currentIndex];

  useEffect(() => {
    if (mode !== "quiz" || quizFinished) return;
    if (timer <= 0) {
      handleAnswer(null);
      return;
    }
    const t = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, mode, quizFinished, quizIdx]);

  const startQuiz = () => {
    const qs = generateQuizQuestions(nums, language);
    setQuizQuestions(qs);
    setQuizIdx(0);
    setAnswered(null);
    setScore(0);
    setTimer(20);
    setQuizFinished(false);
    setMode("quiz");
  };

  const handleAnswer = (opt: string | null) => {
    if (answered !== null || !quizQuestions[quizIdx]) return;
    const isCorrect = opt === quizQuestions[quizIdx].correct;
    setAnswered({ selected: opt, correct: quizQuestions[quizIdx].correct, isCorrect });
    if (isCorrect) setScore((s) => s + 1);
    setTimeout(() => {
      if (quizIdx + 1 >= quizQuestions.length) {
        setQuizFinished(true);
        return;
      }
      setQuizIdx((i) => i + 1);
      setTimer(20);
      setAnswered(null);
    }, 1200);
  };

  /* ── QUIZ MODE ── */
  if (mode === "quiz") {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setMode("learn")} className="rounded-xl text-sm">
          ← Kthehu te Mësimi
        </Button>
        {!quizFinished && quizQuestions[quizIdx] && (
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-muted-foreground">
                Pyetja {quizIdx + 1}/{quizQuestions.length}
              </span>
              <div
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  timer <= 5
                    ? "bg-destructive/10 text-destructive animate-pulse"
                    : "bg-primary/10 text-primary"
                }`}
              >
                ⏱ {timer}s
              </div>
              <span className="text-sm font-semibold text-primary">✓ {score}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 mb-4">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(quizIdx / quizQuestions.length) * 100}%` }}
              />
            </div>
            <div className="bg-primary/5 rounded-2xl p-6 text-center mb-4">
              <div
                className={`font-bold text-foreground mb-1 ${quizQuestions[quizIdx].isArabicWord ? "text-4xl" : "text-3xl"}`}
                style={quizQuestions[quizIdx].isArabicWord ? { fontFamily: "serif", direction: "rtl" } : {}}
              >
                {quizQuestions[quizIdx].display}
              </div>
              <p className="text-sm text-muted-foreground">{quizQuestions[quizIdx].question}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quizQuestions[quizIdx].options.map((opt: string) => {
                let cls =
                  "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5";
                if (answered) {
                  if (opt === answered.correct)
                    cls = "border-primary bg-primary/10 text-primary";
                  else if (opt === answered.selected && !answered.isCorrect)
                    cls = "border-destructive bg-destructive/10 text-destructive";
                  else cls = "border-border/50 bg-muted text-muted-foreground";
                }
                return (
                  <button
                    key={opt}
                    disabled={!!answered}
                    onClick={() => handleAnswer(opt)}
                    className={`border-2 rounded-2xl p-4 font-semibold text-center transition-all text-sm ${cls}`}
                    style={
                      isArabic && quizQuestions[quizIdx].isArabic
                        ? { fontFamily: "serif", direction: "rtl" }
                        : {}
                    }
                  >
                    {opt}
                    {answered && opt === answered.correct && (
                      <CheckCircle className="w-4 h-4 inline ml-1 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {quizFinished && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <Star className="w-14 h-14 text-amber-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Kuizi Mbaroi!</h3>
            <p className="text-5xl font-bold text-primary mb-2">
              {score}/{quizQuestions.length}
            </p>
            <p className="text-muted-foreground mb-6">
              {score >= 20 ? "Fantastike! 🎉" : score >= 15 ? "Shumë mirë! 👍" : "Vazhdo të stërvitesh! 💪"}
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={startQuiz} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6">
                <RotateCcw className="w-4 h-4 mr-2" /> Provo Sërish
              </Button>
              <Button variant="outline" onClick={() => setMode("learn")} className="rounded-xl px-6">
                ← Mëso
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── LEARN MODE ── */
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-card rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Numri:{" "}
            <span
              className={isArabic ? "text-2xl" : ""}
              style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}
            >
              {item.num} — {item.word}
            </span>
          </h2>
          <p className="text-xs text-muted-foreground">
            Numri {currentIndex + 1} nga {nums.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
            onClick={() => speakWord(item.word, language)}
          >
            <Volume2 className="w-4 h-4 mr-1.5" /> Dëgjo
          </Button>
          <Button
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
            onClick={startQuiz}
          >
            🎯 Kuiz 25 pyetje
          </Button>
        </div>
      </div>

      {/* Big number display */}
      <div className="glass-card rounded-2xl p-6 text-center">
        <div className="text-9xl font-bold text-primary mb-3">{item.num}</div>
        {isArabic && item.num < 10 && (
          <div className="text-5xl text-amber-600 mb-2">{ARABIC_NUMERALS[item.num]}</div>
        )}
        <div
          className={`font-bold text-foreground mb-1 ${isArabic ? "text-3xl" : "text-2xl"}`}
          style={isArabic ? { fontFamily: "serif", direction: "rtl" } : {}}
        >
          {item.word}
        </div>
        {item.transliteration && (
          <p className="text-sm text-muted-foreground italic mb-1">{item.transliteration}</p>
        )}
        <p className="text-sm text-primary italic">Shqiptimi: "{item.pronunciation}"</p>
        {item.ordinal && (
          <p className="text-sm text-teal-600 mt-1">Rreshtor: {item.ordinal}</p>
        )}
        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          <button
            onClick={() => speakWord(item.word, language)}
            className="flex items-center gap-1 px-3 py-1.5 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-xl text-xs font-semibold transition-all dark:bg-teal-900/30 dark:text-teal-400"
          >
            <Volume2 className="w-3.5 h-3.5" /> Dëgjo fjalën
          </button>
          <button
            onClick={() => speakWord(item.num.toString(), language)}
            className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-semibold transition-all"
          >
            <Volume2 className="w-3.5 h-3.5" /> Dëgjo numrin
          </button>
          {item.ordinal && (
            <button
              onClick={() => speakWord(item.ordinal, language)}
              className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl text-xs font-semibold transition-all dark:bg-purple-900/30 dark:text-purple-400"
            >
              <Volume2 className="w-3.5 h-3.5" /> Rreshtor
            </button>
          )}
        </div>
      </div>

      {/* Drawing + Voice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-5">
          <NumberDrawingCanvas key={`draw-${item.num}`} item={item} language={language} />
        </div>
        <div className="glass-card rounded-2xl p-5">
          <NumberVoiceRecorder key={`voice-${item.num}`} item={item} language={language} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
          className="rounded-xl"
        >
          <ChevronLeft className="w-4 h-4" /> Para
        </Button>
        <div className="flex gap-1.5 flex-wrap justify-center flex-1">
          {nums.map((n, i) => (
            <button
              key={n.num}
              onClick={() => setCurrentIndex(i)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                i === currentIndex
                  ? "bg-primary text-primary-foreground scale-110 shadow"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/20"
              }`}
            >
              {n.num}
            </button>
          ))}
        </div>
        <Button
          disabled={currentIndex + 1 >= nums.length}
          onClick={() => setCurrentIndex((i) => i + 1)}
          className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Tjetër <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
