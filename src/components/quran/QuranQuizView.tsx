import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Timer } from "lucide-react";

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
  { question: "Cili engjëll i solli Shpalljen Profetit ﷺ?", options: ["Mikaili", "Israfili", "Xhibrili", "Azraili"], correct: 2, explanation: "Engjëlli Xhibril (a.s.) i solli Shpalljen hyjnore Profetit Muhamed ﷺ." },
  { question: "Çfarë do të thotë 'El-Fatiha'?", options: ["Mbyllja", "Hapja", "Mesi", "Përfundimi"], correct: 1, explanation: "El-Fatiha do të thotë 'Hapja' — surja hapëse e Kur'anit." },
  { question: "Sa ajete ka surja El-Bekare?", options: ["200", "256", "286", "300"], correct: 2, explanation: "Surja El-Bekare ka 286 ajete." },
  { question: "Në cilën sure ndodhet Ajetu-l-Kursi?", options: ["Ali Imran", "El-Bekare", "En-Nisa", "El-Maide"], correct: 1, explanation: "Ajetu-l-Kursi ndodhet në suren El-Bekare, ajeti 255." },
  { question: "Sa herë përmendet emri 'Muhamed' në Kur'an?", options: ["2", "4", "6", "10"], correct: 1, explanation: "Emri 'Muhamed' përmendet 4 herë në Kur'an." },
  { question: "Cila sure fillon me 'Bismilah'?", options: ["Et-Teube", "El-Fatiha", "Jasin", "Të gjitha"], correct: 1, explanation: "El-Fatiha fillon me Bismilah. Et-Teube është e vetmja sure pa Bismilah." },
  { question: "Cila sure nuk ka 'Bismilah' në fillim?", options: ["El-Ihlas", "Et-Teube", "El-Felek", "Jasin"], correct: 1, explanation: "Surja Et-Teube (nr. 9) është e vetmja sure që nuk fillon me Bismilah." },
  { question: "Surja El-Ihlas barazohet me sa të tretat e Kur'anit?", options: ["Një të katërtën", "Një të tretën", "Gjysmën", "Të tërën"], correct: 1, explanation: "Profeti ﷺ tha se El-Ihlas barazohet me një të tretën e Kur'anit." },
  { question: "Cila natë është më e vlefshme se 1000 muaj?", options: ["Nata e Beratit", "Nata e Kadrit", "Nata e Israsë", "Nata e Regaibit"], correct: 1, explanation: "Nata e Kadrit (Lejletu-l-Kadr) është më e vlefshme se 1000 muaj (Sure El-Kadr)." },
  { question: "Sa sure mekase dhe sa medinase ka?", options: ["80 + 34", "86 + 28", "90 + 24", "100 + 14"], correct: 1, explanation: "Ka 86 sure mekase dhe 28 sure medinase." },
  { question: "Cila sure fillon me 'Er-Rahman'?", options: ["Sure 55", "Sure 36", "Sure 67", "Sure 78"], correct: 0, explanation: "Surja Er-Rahman është surja nr. 55." },
  { question: "Çfarë do të thotë 'El-Mulk'?", options: ["Ndihma", "Sundimi", "Ngjarja", "Koha"], correct: 1, explanation: "El-Mulk do të thotë 'Sundimi' — surja nr. 67." },
  { question: "Në sa vite u shpall i tërë Kur'ani?", options: ["10 vjet", "15 vjet", "23 vjet", "30 vjet"], correct: 2, explanation: "Kur'ani u shpall gjatë 23 vjetëve." },
  { question: "Cili është ajeti më i gjatë në Kur'an?", options: ["Ajetu-l-Kursi", "Ajeti i borxhit (2:282)", "El-Fatiha:7", "Ali Imran:18"], correct: 1, explanation: "Ajeti i borxhit (El-Bekare 282) është ajeti më i gjatë." },
  { question: "Sa profetë përmenden me emër në Kur'an?", options: ["15", "20", "25", "30"], correct: 2, explanation: "Në Kur'an përmenden 25 profetë me emër." },
  { question: "Surja El-Mulk ndërmjetëson për cilin?", options: ["Për lexuesin", "Për prindin", "Për fëmijën", "Për shoqin"], correct: 0, explanation: "Profeti ﷺ tha se Sure El-Mulk ndërmjetëson për lexuesin e saj." },
  { question: "Sa 'sexhde tilaveti' ka në Kur'an?", options: ["10", "14", "15", "20"], correct: 2, explanation: "Ka 15 vende sexhde tilaveti në Kur'an." },
];

export default function QuranQuizView() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [timer, setTimer] = useState(20);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const q = QUESTIONS[currentQ];

  useEffect(() => {
    if (finished || selected !== null) return;
    if (timer <= 0) {
      handleSelect(-1);
      return;
    }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, finished, selected]);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.correct;
    if (correct) {
      setScore((s) => s + 1);
      setStreak(s => {
        const ns = s + 1;
        if (ns > bestStreak) setBestStreak(ns);
        return ns;
      });
    } else {
      setStreak(0);
    }
    setAnswers((a) => [...a, correct]);
  };

  const next = () => {
    if (currentQ + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setTimer(20);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setTimer(20);
    setStreak(0);
    setBestStreak(0);
  };

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center max-w-md mx-auto">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${pct >= 70 ? "text-yellow-500" : "text-muted-foreground"}`} />
        <h2 className="text-2xl font-bold text-foreground mb-2">Kuizi Përfundoi!</h2>
        <p className="text-4xl font-extrabold text-primary mb-1">{score}/{QUESTIONS.length}</p>
        <p className="text-muted-foreground mb-2">{pct}% saktë</p>
        <p className="text-sm text-foreground/70 mb-4">🔥 Seria më e gjatë: {bestStreak}</p>
        <div className="flex justify-center gap-1 mb-6 flex-wrap">
          {answers.map((a, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${a ? "bg-green-500" : "bg-red-400"}`} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {pct >= 90 ? "🏆 Shkëlqyeshëm! Je ekspert i Kur'anit!" :
           pct >= 70 ? "🌟 Shumë mirë! Vazhdo kështu!" :
           pct >= 50 ? "📚 Jo keq, por mund të bësh më mirë!" :
           "💪 Provo përsëri, mëso më shumë!"}
        </p>
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
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
          timer <= 5 ? "bg-destructive/10 text-destructive animate-pulse" : "bg-primary/10 text-primary"
        }`}>
          <Timer className="w-3 h-3" />
          {timer}s
        </div>
        <span className="text-sm font-bold text-primary">✓ {score} {streak > 1 && <span className="text-orange-500">🔥{streak}</span>}</span>
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
                disabled={selected !== null}
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