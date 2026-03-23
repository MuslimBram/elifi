import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Trophy, RotateCcw, Zap } from "lucide-react";

function generateQuestion(level: number) {
  const ops = level <= 1 ? ["+", "-"] : level <= 2 ? ["+", "-", "×"] : ["+", "-", "×", "÷"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a: number, b: number, correct: number;
  if (op === "+") { a = Math.floor(Math.random() * (level * 20 + 10)) + 1; b = Math.floor(Math.random() * (level * 20 + 10)) + 1; correct = a + b; }
  else if (op === "-") { a = Math.floor(Math.random() * (level * 20 + 10)) + 5; b = Math.floor(Math.random() * a) + 1; correct = a - b; }
  else if (op === "×") { a = Math.floor(Math.random() * 12) + 1; b = Math.floor(Math.random() * 12) + 1; correct = a * b; }
  else { b = Math.floor(Math.random() * 12) + 1; correct = Math.floor(Math.random() * 12) + 1; a = b * correct; }
  const wrongs = new Set<number>();
  while (wrongs.size < 3) { const d = Math.floor(Math.random() * 20) - 10; if (d !== 0 && correct + d > 0) wrongs.add(correct + d); }
  const opts = [...wrongs, correct].sort(() => Math.random() - 0.5);
  return { q: `${a} ${op} ${b} = ?`, correct: correct.toString(), opts: opts.map(String) };
}

const TOTAL_Q = 20;

export default function MathGame({ onClose }: { onClose: () => void }) {
  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState<"start" | "playing" | "done">("start");
  const [questions, setQuestions] = useState<ReturnType<typeof generateQuestion>[]>([]);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<{ selected: string | null; correct: string; isCorrect: boolean } | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timer, setTimer] = useState(10);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (phase !== "playing" || answered !== null) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, phase, answered]);

  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setTotalTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const handleAnswer = (opt: string | null) => {
    if (answered !== null) return;
    const q = questions[idx];
    const isCorrect = opt === q.correct;
    setAnswered({ selected: opt, correct: q.correct, isCorrect });
    if (isCorrect) { setScore(s => s + 1); setStreak(s => { const ns = s + 1; setMaxStreak(m => Math.max(m, ns)); return ns; }); } else setStreak(0);
    setTimeout(() => { if (idx + 1 >= questions.length) { setPhase("done"); return; } setIdx(i => i + 1); setTimer(10); setAnswered(null); }, 900);
  };

  const startGame = (lv: number) => {
    setLevel(lv); setQuestions(Array.from({ length: TOTAL_Q }, () => generateQuestion(lv)));
    setIdx(0); setAnswered(null); setScore(0); setStreak(0); setMaxStreak(0); setTimer(10); setTotalTime(0); setPhase("playing");
  };

  const pct = Math.round((score / TOTAL_Q) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-3xl p-5 text-white flex justify-between items-center">
          <div><p className="text-2xl">🔢</p><h2 className="font-bold text-lg">Llogaritjet e Shpejta</h2></div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold">✕</button>
        </div>

        {phase === "start" && (
          <div className="p-8 text-center">
            <p className="text-4xl mb-4">🧮</p>
            <h3 className="text-xl font-bold text-foreground mb-2">Zgjedh Nivelin</h3>
            <p className="text-muted-foreground text-sm mb-6">{TOTAL_Q} pyetje · 10 sekonda secila</p>
            <div className="space-y-3">
              {[{ lv: 1, label: "🌱 Fillestar", desc: "Mbledhje dhe zbritje" }, { lv: 2, label: "📚 Mesatar", desc: "+ Shumëzim" }, { lv: 3, label: "🎓 Avancuar", desc: "+ Pjesëtim dhe numra të mëdha" }].map(item => (
                <button key={item.lv} onClick={() => startGame(item.lv)} className="w-full py-4 rounded-2xl bg-secondary border border-border hover:border-primary/50 text-left px-5 transition-all">
                  <p className="font-bold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "playing" && questions[idx] && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">{idx + 1}/{TOTAL_Q}</span>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 3 ? "bg-red-500/10 text-red-500 animate-pulse" : "bg-primary/10 text-primary"}`}>
                <Timer className="w-4 h-4" /> {timer}s
              </div>
              <div className="flex items-center gap-1 text-amber-600 font-bold text-sm"><Zap className="w-4 h-4" /> {streak}x</div>
            </div>
            <div className="w-full bg-secondary rounded-full h-2"><div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${(timer / 10) * 100}%`, background: timer <= 3 ? "hsl(var(--destructive))" : "hsl(var(--primary))" }} /></div>
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-secondary rounded-2xl p-8 text-center border border-border">
                <p className="text-3xl font-extrabold text-foreground">{questions[idx].q}</p>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-3">
              {questions[idx].opts.map(opt => {
                let cls = "border-2 border-border bg-card hover:border-primary/50 text-foreground";
                if (answered) {
                  if (opt === answered.correct) cls = "border-2 border-emerald-500 bg-emerald-500/10 text-emerald-700 font-bold";
                  else if (opt === answered.selected && !answered.isCorrect) cls = "border-2 border-red-400 bg-red-500/10 text-red-600";
                  else cls = "border-2 border-border/50 bg-secondary text-muted-foreground";
                }
                return <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!answered} className={`p-4 rounded-xl text-center font-bold text-lg transition-all ${cls}`}>{opt}</button>;
              })}
            </div>
            <p className="text-center text-sm text-muted-foreground">✓ {score} të sakta</p>
          </div>
        )}

        {phase === "done" && (
          <div className="p-8 text-center space-y-4">
            <Trophy className="w-14 h-14 text-amber-400 mx-auto" />
            <h3 className="text-2xl font-bold text-foreground">Mbaroi!</h3>
            <p className={`text-5xl font-extrabold ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500"}`}>{pct}%</p>
            <p className="text-muted-foreground">{score}/{TOTAL_Q} · Seria maks: {maxStreak}x · ⏱️ {Math.floor(totalTime / 60)}:{String(totalTime % 60).padStart(2, "0")}</p>
            <p className="text-sm font-semibold text-foreground">{pct >= 90 ? "🏆 Gjen si kalkulatë!" : pct >= 70 ? "👍 Shumë mirë!" : "📚 Vazhdo të stërvitesh!"}</p>
            <div className="flex gap-3">
              <button onClick={() => setPhase("start")} className="flex-1 py-3 rounded-xl gradient-primary text-primary-foreground font-bold flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" /> Sërish</button>
              <button onClick={onClose} className="flex-1 py-3 rounded-xl border-2 border-border text-foreground font-bold">Mbyll</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
