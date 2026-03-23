import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  { question: "Sa sure ka Kurani Famëlartë?", options: ["110", "114", "120", "100"], correct: 1, explanation: "Kurani ka gjithsej 114 sure." },
  { question: "Cila është surja më e shkurtër?", options: ["El-Ihlas", "El-Keuther", "En-Nasr", "El-Felek"], correct: 1, explanation: "Surja El-Keuther ka vetëm 3 ajete dhe është më e shkurtra." },
  { question: "Cila sure quhet 'Zemra e Kuranit'?", options: ["El-Bekare", "Jasin", "Er-Rahman", "El-Fatiha"], correct: 1, explanation: "Surja Jasin quhet 'Zemra e Kuranit' (Kalbu-l-Kuran)." },
  { question: "Sa ajete ka surja El-Fatiha?", options: ["5", "6", "7", "8"], correct: 2, explanation: "El-Fatiha ka 7 ajete dhe quhet 'Seb'ul-Methani' (Shtatë ajetet e përsëritura)." },
  { question: "Në cilin muaj u shpall Kurani?", options: ["Shaban", "Ramazan", "Muharrem", "Rexheb"], correct: 1, explanation: "Kurani u shpall në muajin e Ramazanit (Nata e Kadrit)." },
  { question: "Cila është surja më e gjatë?", options: ["Ali Imran", "En-Nisa", "El-Bekare", "El-Maide"], correct: 2, explanation: "Surja El-Bekare ka 286 ajete dhe është më e gjata." },
  { question: "Kujt iu shpall Kurani?", options: ["Ibrahimit a.s.", "Musait a.s.", "Isait a.s.", "Muhamedit ﷺ"], correct: 3, explanation: "Kurani iu shpall Profetit Muhamed ﷺ." },
  { question: "Sa xhuze (pjesë) ka Kurani?", options: ["25", "28", "30", "32"], correct: 2, explanation: "Kurani ndahet në 30 xhuze (pjesë)." },
];

export default function QuranQuizView() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = QUESTIONS[currentQ];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.correct;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, correct]);
  };

  const next = () => {
    if (currentQ + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center max-w-md mx-auto">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${pct >= 70 ? "text-yellow-500" : "text-muted-foreground"}`} />
        <h2 className="text-2xl font-bold text-foreground mb-2">Kuizi Përfundoi!</h2>
        <p className="text-4xl font-extrabold text-primary mb-1">{score}/{QUESTIONS.length}</p>
        <p className="text-muted-foreground mb-6">{pct}% saktë</p>
        <div className="flex justify-center gap-1 mb-6">
          {answers.map((a, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${a ? "bg-green-500" : "bg-red-400"}`} />
          ))}
        </div>
        <button onClick={restart} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-bold">
          <RotateCcw className="w-4 h-4" /> Fillo Përsëri
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">Pyetja {currentQ + 1}/{QUESTIONS.length}</span>
        <span className="text-sm font-bold text-primary">Pikë: {score}</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2 mb-6">
        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }} />
      </div>

      <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">{q.question}</h3>
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let cls = "glass-card border border-border text-foreground hover:border-primary/50";
            if (selected !== null) {
              if (i === q.correct) cls = "bg-green-500/10 border-green-500 text-green-700";
              else if (i === selected) cls = "bg-red-500/10 border-red-400 text-red-600";
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${cls}`}
              >
                <span className="w-7 h-7 shrink-0 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
                {selected !== null && i === q.correct && <CheckCircle2 className="w-4 h-4 ml-auto text-green-600" />}
                {selected !== null && i === selected && i !== q.correct && <XCircle className="w-4 h-4 ml-auto text-red-500" />}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            <p className="text-sm text-muted-foreground bg-secondary/50 rounded-xl p-3">💡 {q.explanation}</p>
            <button onClick={next} className="mt-4 w-full py-3 rounded-xl gradient-primary text-primary-foreground font-bold">
              {currentQ + 1 >= QUESTIONS.length ? "Shiko Rezultatin" : "Pyetja Tjetër →"}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
