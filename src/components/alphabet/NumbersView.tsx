import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Hash, Star, Timer, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NumberItem {
  num: number;
  word: string;
  ordinal: string;
  transliteration?: string;
}

const NUMBERS: Record<string, NumberItem[]> = {
  shqip: [
    { num: 0, word: "zero", ordinal: "i zerët" },
    { num: 1, word: "një", ordinal: "i parë" },
    { num: 2, word: "dy", ordinal: "i dytë" },
    { num: 3, word: "tre", ordinal: "i tretë" },
    { num: 4, word: "katër", ordinal: "i katërt" },
    { num: 5, word: "pesë", ordinal: "i pestë" },
    { num: 6, word: "gjashtë", ordinal: "i gjashtë" },
    { num: 7, word: "shtatë", ordinal: "i shtatë" },
    { num: 8, word: "tetë", ordinal: "i tetë" },
    { num: 9, word: "nëntë", ordinal: "i nëntë" },
    { num: 10, word: "dhjetë", ordinal: "i dhjetë" },
    { num: 20, word: "njëzet", ordinal: "i njëzetë" },
    { num: 30, word: "tridhjetë", ordinal: "i tridhjetë" },
    { num: 50, word: "pesëdhjetë", ordinal: "i pesëdhjetë" },
    { num: 100, word: "njëqind", ordinal: "i njëqindtë" },
    { num: 1000, word: "një mijë", ordinal: "i mijëtë" },
  ],
  anglisht: [
    { num: 0, word: "zero", ordinal: "zeroth" },
    { num: 1, word: "one", ordinal: "first" },
    { num: 2, word: "two", ordinal: "second" },
    { num: 3, word: "three", ordinal: "third" },
    { num: 4, word: "four", ordinal: "fourth" },
    { num: 5, word: "five", ordinal: "fifth" },
    { num: 6, word: "six", ordinal: "sixth" },
    { num: 7, word: "seven", ordinal: "seventh" },
    { num: 8, word: "eight", ordinal: "eighth" },
    { num: 9, word: "nine", ordinal: "ninth" },
    { num: 10, word: "ten", ordinal: "tenth" },
    { num: 20, word: "twenty", ordinal: "twentieth" },
    { num: 100, word: "one hundred", ordinal: "one hundredth" },
  ],
  arabisht: [
    { num: 0, word: "صِفْر", ordinal: "الصِّفْر", transliteration: "sifr" },
    { num: 1, word: "وَاحِد", ordinal: "الأَوَّل", transliteration: "wāḥid" },
    { num: 2, word: "اِثْنَان", ordinal: "الثَّانِي", transliteration: "ithnan" },
    { num: 3, word: "ثَلَاثَة", ordinal: "الثَّالِث", transliteration: "thalātha" },
    { num: 4, word: "أَرْبَعَة", ordinal: "الرَّابِع", transliteration: "arba'a" },
    { num: 5, word: "خَمْسَة", ordinal: "الخَامِس", transliteration: "khamsa" },
    { num: 6, word: "سِتَّة", ordinal: "السَّادِس", transliteration: "sitta" },
    { num: 7, word: "سَبْعَة", ordinal: "السَّابِع", transliteration: "sab'a" },
    { num: 8, word: "ثَمَانِيَة", ordinal: "الثَّامِن", transliteration: "thamāniya" },
    { num: 9, word: "تِسْعَة", ordinal: "التَّاسِع", transliteration: "tis'a" },
    { num: 10, word: "عَشَرَة", ordinal: "العَاشِر", transliteration: "'ashara" },
  ],
};

const speak = (text: string, lang: string) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "arabisht" ? "ar-SA" : lang === "anglisht" ? "en-US" : "sq-AL";
  u.rate = 0.65;
  window.speechSynthesis.speak(u);
};

interface Props {
  language: string;
}

export default function NumbersView({ language }: Props) {
  const nums = NUMBERS[language] || NUMBERS.shqip;
  const [mode, setMode] = useState<"learn" | "quiz">("learn");
  const [quizIdx, setQuizIdx] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const isArabic = language === "arabisht";

  const generateQuestion = () => {
    const item = nums[Math.floor(Math.random() * nums.length)];
    const wrongs = nums.filter(n => n.num !== item.num).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [item, ...wrongs].sort(() => Math.random() - 0.5);
    return { question: `Si shkruhet numri ${item.num} me fjalë?`, correct: item.word, options: options.map(o => o.word) };
  };

  const [questions] = useState(() => Array.from({ length: 10 }, generateQuestion));

  const handleAnswer = (opt: string) => {
    if (answered) return;
    setAnswered(opt);
    if (opt === questions[quizIdx].correct) setScore(s => s + 1);
    setTimeout(() => {
      if (quizIdx + 1 >= questions.length) {
        setQuizDone(true);
      } else {
        setQuizIdx(i => i + 1);
        setAnswered(null);
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode("learn")} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === "learn" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground/70"}`}>
          📖 Mëso
        </button>
        <button onClick={() => { setMode("quiz"); setQuizIdx(0); setScore(0); setQuizDone(false); setAnswered(null); }}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === "quiz" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground/70"}`}>
          🎯 Kuiz
        </button>
      </div>

      {mode === "learn" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {nums.map((n) => (
            <motion.div
              key={n.num}
              whileHover={{ scale: 1.03 }}
              className="bg-card rounded-2xl border border-border p-4 text-center cursor-pointer hover:shadow-md transition-all"
              onClick={() => speak(n.word, language)}
            >
              <p className="text-3xl font-extrabold text-primary mb-1">{n.num}</p>
              <p className={`text-sm font-semibold text-foreground ${isArabic ? "font-serif" : ""}`}>{n.word}</p>
              {n.transliteration && <p className="text-xs text-muted-foreground italic">{n.transliteration}</p>}
              <p className="text-xs text-muted-foreground mt-1">{n.ordinal}</p>
              <Volume2 className="w-3.5 h-3.5 text-primary mx-auto mt-2 opacity-50" />
            </motion.div>
          ))}
        </div>
      ) : quizDone ? (
        <div className="text-center py-8">
          <p className="text-5xl mb-4">{score >= 8 ? "🏆" : score >= 5 ? "👍" : "📖"}</p>
          <p className="text-2xl font-bold text-foreground">{score}/{questions.length}</p>
          <p className="text-muted-foreground mb-4">{Math.round((score / questions.length) * 100)}%</p>
          <Button onClick={() => { setQuizIdx(0); setScore(0); setQuizDone(false); setAnswered(null); }}>🔄 Provo Përsëri</Button>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Pyetja {quizIdx + 1}/{questions.length}</p>
          <p className="text-lg font-bold text-foreground mb-4">{questions[quizIdx].question}</p>
          <div className="grid grid-cols-2 gap-3">
            {questions[quizIdx].options.map((opt, i) => {
              let cls = "border-border bg-card text-foreground hover:border-primary/50";
              if (answered) {
                if (opt === questions[quizIdx].correct) cls = "border-primary bg-primary/10 text-primary";
                else if (opt === answered) cls = "border-destructive bg-destructive/10 text-destructive";
              }
              return (
                <button key={i} onClick={() => handleAnswer(opt)} disabled={!!answered}
                  className={`border-2 rounded-xl p-3 text-sm font-medium transition-all ${cls}`}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
