import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Gamepad2, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const gameTabs = [
  { id: "quiz", label: "🧠 Kuiz" },
  { id: "memory", label: "🃏 Hafizja" },
  { id: "math", label: "🔢 Matematika" },
];

/* ─── QUIZ ─── */
const quizQuestions = [
  { q: "Si thuhet 'Mirëdita' në arabisht?", options: ["مرحبا", "شكرا", "مع السلامة", "نعم"], correct: 0 },
  { q: "Sa germa ka alfabeti shqip?", options: ["26", "29", "36", "32"], correct: 2 },
  { q: "Cila është sureja e parë e Kur'anit?", options: ["El-Bekare", "El-Fatiha", "El-Ihlas", "Jasin"], correct: 1 },
  { q: "Si shkruhet numri 5 në arabisht?", options: ["٣", "٥", "٧", "٩"], correct: 1 },
  { q: "Sa janë shtyllat e Islamit?", options: ["3", "4", "5", "6"], correct: 2 },
  { q: "Çfarë do të thotë 'Bismilah'?", options: ["Lavdërimi i takon Allahut", "Me emrin e Allahut", "Allahu është i Madh", "Falënderim"], correct: 1 },
  { q: "Sa sure ka Kur'ani?", options: ["100", "114", "120", "99"], correct: 1 },
  { q: "Cili muaj është i 9-ti në kalendarin islam?", options: ["Shaban", "Sheval", "Ramazan", "Muharrem"], correct: 2 },
  { q: "Si thuhet 'Faleminderit' në arabisht?", options: ["مرحبا", "شكرا", "عفوا", "أهلا"], correct: 1 },
  { q: "Sa rekate farz ka namazi i Drekës?", options: ["2", "3", "4", "5"], correct: 2 },
  { q: "Cili profet ndërtoi Qabenë?", options: ["Musai a.s.", "Isai a.s.", "Ibrahimi a.s.", "Nuhi a.s."], correct: 2 },
  { q: "Çfarë është Texhuidi?", options: ["Lloj namazi", "Shkenca e leximit të Kur'anit", "Lloj agjërimi", "Emër sureje"], correct: 1 },
];

/* ─── MEMORY CARDS ─── */
const memoryPairs = [
  { id: "a1", emoji: "🕋", label: "Qabeja" },
  { id: "a2", emoji: "📖", label: "Kur'ani" },
  { id: "a3", emoji: "🤲", label: "Duaja" },
  { id: "a4", emoji: "🌙", label: "Ramazani" },
  { id: "a5", emoji: "⭐", label: "Islami" },
  { id: "a6", emoji: "🕌", label: "Xhamia" },
  { id: "a7", emoji: "💧", label: "Abdesi" },
  { id: "a8", emoji: "📿", label: "Tesbihu" },
];

interface MemoryCard {
  id: string;
  emoji: string;
  label: string;
  uniqueId: string;
  flipped: boolean;
  matched: boolean;
}

export default function Games() {
  const [searchParams] = useSearchParams();
  const gameFromUrl = searchParams.get("game") || "quiz";
  const [activeGame, setActiveGame] = useState(gameFromUrl);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <Gamepad2 className="w-4 h-4" />
          Mëso Duke Luajtur
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          <span className="text-gradient">Lojëra Edukative</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Testo njohuritë me kuize, lojëra hafizjeje dhe matematikë.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {gameTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveGame(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeGame === tab.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border text-foreground/70 hover:border-primary/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeGame === "quiz" && <QuizGame key="quiz" />}
        {activeGame === "memory" && <MemoryGame key="memory" />}
        {activeGame === "math" && <MathGame key="math" />}
      </AnimatePresence>
    </div>
  );
}

/* ─── QUIZ GAME ─── */
function QuizGame() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quizQuestions[current].correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 < quizQuestions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  const restart = () => { setCurrent(0); setScore(0); setSelected(null); setFinished(false); };

  if (finished) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center max-w-md mx-auto">
        <div className="text-5xl mb-4">{pct >= 80 ? "🏆" : pct >= 50 ? "👏" : "📚"}</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{score}/{quizQuestions.length} Pikë</h2>
        <p className="text-muted-foreground mb-1">{pct}% saktësi</p>
        <p className="text-sm text-muted-foreground mb-6">
          {pct >= 80 ? "Shkëlqyeshëm! Je shumë i/e mirë!" : pct >= 50 ? "Mirë! Vazhdo të mësosh." : "Mos u dorëzo, provo përsëri!"}
        </p>
        <button onClick={restart} className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium inline-flex items-center gap-2">
          <RotateCcw className="w-4 h-4" /> Provo Përsëri
        </button>
      </motion.div>
    );
  }

  const q = quizQuestions[current];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">Pyetja {current + 1}/{quizQuestions.length}</span>
        <span className="text-sm font-bold text-primary">Pikë: {score}</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2 mb-6">
        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }} />
      </div>
      <div className="glass-card rounded-2xl p-6 mb-4">
        <h3 className="text-lg font-bold text-foreground">{q.q}</h3>
      </div>
      <div className="space-y-3">
        {q.options.map((opt, i) => {
          let extra = "";
          if (selected !== null) {
            if (i === q.correct) extra = " border-2 border-green-500 bg-green-500/10";
            else if (i === selected) extra = " border-2 border-red-500 bg-red-500/10";
          }
          return (
            <div key={i} className={`glass-card rounded-xl p-4 text-sm font-medium cursor-pointer transition-all hover:shadow-md${extra}`} onClick={() => handleAnswer(i)}>
              <div className="flex items-center justify-between">
                <span className="text-foreground/80">{opt}</span>
                {selected !== null && i === q.correct && <CheckCircle className="w-5 h-5 text-green-500" />}
                {selected !== null && i === selected && i !== q.correct && <XCircle className="w-5 h-5 text-red-500" />}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── MEMORY GAME ─── */
function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);

  const initGame = useCallback(() => {
    const doubled = memoryPairs.flatMap((p) => [
      { ...p, uniqueId: p.id + "-1", flipped: false, matched: false },
      { ...p, uniqueId: p.id + "-2", flipped: false, matched: false },
    ]);
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }
    setCards(doubled);
    setFlippedIds([]);
    setMoves(0);
    setMatched(0);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  const handleFlip = (uniqueId: string) => {
    if (flippedIds.length >= 2) return;
    const card = cards.find((c) => c.uniqueId === uniqueId);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map((c) => c.uniqueId === uniqueId ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flippedIds, uniqueId];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped.map((id) => newCards.find((c) => c.uniqueId === id)!);
      if (first.id === second.id) {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => c.id === first.id ? { ...c, matched: true } : c));
          setMatched((m) => m + 1);
          setFlippedIds([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => newFlipped.includes(c.uniqueId) ? { ...c, flipped: false } : c));
          setFlippedIds([]);
        }, 800);
      }
    }
  };

  const allMatched = matched === memoryPairs.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">Lëvizje: {moves}</span>
        <span className="text-sm font-bold text-primary">Çifte: {matched}/{memoryPairs.length}</span>
        <button onClick={initGame} className="text-sm px-3 py-1 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center gap-1">
          <RotateCcw className="w-3 h-3" /> Rifillo
        </button>
      </div>

      {allMatched && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-6 text-center mb-6">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-lg font-bold text-foreground">Bravo! I gjete të gjitha!</h3>
          <p className="text-sm text-muted-foreground">Me {moves} lëvizje</p>
        </motion.div>
      )}

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.uniqueId}
            onClick={() => handleFlip(card.uniqueId)}
            className={`aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 text-center ${
              card.flipped || card.matched
                ? "bg-primary/10 border-2 border-primary/30 shadow-md"
                : "bg-card border border-border hover:border-primary/50 hover:shadow-md"
            } ${card.matched ? "opacity-60" : ""}`}
          >
            {card.flipped || card.matched ? (
              <motion.div initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} className="flex flex-col items-center">
                <span className="text-2xl">{card.emoji}</span>
                <span className="text-[10px] font-medium text-foreground/70 mt-1">{card.label}</span>
              </motion.div>
            ) : (
              <span className="text-2xl text-muted-foreground/40">❓</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── MATH GAME ─── */
function MathGame() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [question, setQuestion] = useState({ a: 0, b: 0, op: "+", answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const generateQuestion = useCallback(() => {
    let a: number, b: number, op: string, answer: number;
    const ops = level === "easy" ? ["+", "-"] : level === "medium" ? ["+", "-", "×"] : ["+", "-", "×", "÷"];
    op = ops[Math.floor(Math.random() * ops.length)];
    const max = level === "easy" ? 20 : level === "medium" ? 50 : 100;

    switch (op) {
      case "+":
        a = Math.floor(Math.random() * max) + 1;
        b = Math.floor(Math.random() * max) + 1;
        answer = a + b;
        break;
      case "-":
        a = Math.floor(Math.random() * max) + 1;
        b = Math.floor(Math.random() * a) + 1;
        answer = a - b;
        break;
      case "×":
        a = Math.floor(Math.random() * 12) + 1;
        b = Math.floor(Math.random() * 12) + 1;
        answer = a * b;
        break;
      case "÷":
        b = Math.floor(Math.random() * 12) + 1;
        answer = Math.floor(Math.random() * 12) + 1;
        a = b * answer;
        break;
      default:
        a = 1; b = 1; answer = 2;
    }
    setQuestion({ a: a!, b: b!, op, answer: answer! });
    setUserAnswer("");
    setFeedback(null);
  }, [level]);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  const checkAnswer = () => {
    const num = parseInt(userAnswer);
    if (isNaN(num)) return;
    setTotal((t) => t + 1);
    if (num === question.answer) {
      setScore((s) => s + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
    setTimeout(() => generateQuestion(), 1200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-md mx-auto">
      <div className="flex gap-2 justify-center mb-6">
        {(["easy", "medium", "hard"] as const).map((l) => (
          <button
            key={l}
            onClick={() => { setLevel(l); setScore(0); setTotal(0); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              level === l ? "bg-primary text-primary-foreground shadow-md" : "bg-card border border-border text-foreground/70"
            }`}
          >
            {l === "easy" ? "🟢 Lehtë" : l === "medium" ? "🟡 Mesatar" : "🔴 Vështirë"}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">Saktë: {score}/{total}</span>
        {total > 0 && <span className="text-sm font-bold text-primary">{Math.round((score / total) * 100)}%</span>}
      </div>

      <div className="glass-card rounded-2xl p-8 text-center mb-6">
        <p className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          {question.a} {question.op} {question.b} = ?
        </p>

        <div className="flex items-center gap-3 justify-center">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            className="w-32 text-center text-2xl font-bold p-3 rounded-xl border-2 border-border bg-card text-foreground focus:border-primary focus:outline-none transition-colors"
            placeholder="?"
            autoFocus
          />
          <button
            onClick={checkAnswer}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-lg"
          >
            ✓
          </button>
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 text-lg font-bold ${feedback === "correct" ? "text-green-500" : "text-red-500"}`}
            >
              {feedback === "correct" ? "✅ Saktë!" : `❌ Gabim! Përgjigja: ${question.answer}`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
