import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, Trophy, CheckCircle, XCircle, RotateCcw } from "lucide-react";

const FIKH_QUESTIONS = [
  { q: "Cilat janë 3 Parimet e Islamit?", opts: ["Allah, Engjëjt, Kur'ani", "Allahu, Feja, Profeti ﷺ", "Islami, Imani, Ihsani", "5 Shtyllat"], correct: "Allahu, Feja, Profeti ﷺ" },
  { q: "Cilat janë 5 Shtyllat e Islamit?", opts: ["Namaz, Zekat, Haxh, Saum, Dua", "Shehadet, Namaz, Zekat, Saum, Haxh", "Shehadet, Namaz, Sadaka, Umre, Haxh", "Besim, Namaz, Zekat, Haxh, Saum"], correct: "Shehadet, Namaz, Zekat, Saum, Haxh" },
  { q: "Cilat janë 6 Kushtet e Imanit?", opts: ["Allah, Engjëjt, Librat, Profetët, Kijameti, Kaderi", "Allah, Njeriu, Xhenneti, Xhehennemi, Kijameti, Kaderi", "Islam, Iman, Ihsan, Taqva, Sabr, Shukr", "6 Parimet e Kur'anit"], correct: "Allah, Engjëjt, Librat, Profetët, Kijameti, Kaderi" },
  { q: "Çfarë do të thotë 'Tevhid'?", opts: ["Besim në engjëjt", "Besim në profetët", "Njëshmëria e Allahut — Ai është Një", "Besim në Kader"], correct: "Njëshmëria e Allahut — Ai është Një" },
  { q: "Ihsani sipas Hadithit të Xhibrilit?", opts: ["Të bësh mirë", "Të adhurosh Allahun sikur ta shohësh Atë", "Të lexosh Kur'an", "Të japësh zekat"], correct: "Të adhurosh Allahun sikur ta shohësh Atë" },
  { q: "Vula e Profetëve është:", opts: ["Musa ﷺ", "Isa ﷺ", "Ibrahim ﷺ", "Muhammedi ﷺ"], correct: "Muhammedi ﷺ" },
  { q: "Gjatë Mi'raxhit, namazi fillimisht u obligua sa herë?", opts: ["5 herë", "10 herë", "50 herë", "3 herë"], correct: "50 herë" },
  { q: "Cilat janë 4 Farzet e Abdestit?", opts: ["Duart, koka, fytyra, këmbët", "Fytyra, duart deri bërryla, koka (mes'h), këmbët deri nyja", "Fytyra, koka, qafa, këmbët", "Nijet, fytyrë, duar, këmbë"], correct: "Fytyra, duart deri bërryla, koka (mes'h), këmbët deri nyja" },
  { q: "Cili lloj uji pastron?", opts: ["Çdo ujë", "Vetëm uji i shiut", "Ujë i pastër (Mutlak — natyrsor, i pandryshuar)", "Vetëm uji i detit"], correct: "Ujë i pastër (Mutlak — natyrsor, i pandryshuar)" },
  { q: "Çfarë është Tejemmumi?", opts: ["Larje me ujë", "Gusul me ujë të ngrohtë", "Pastrimi me dhe (rërë) kur nuk ka ujë", "Lloji i abdestit"], correct: "Pastrimi me dhe (rërë) kur nuk ka ujë" },
  { q: "Sa namaze janë të obliguara (farz) në ditë?", opts: ["3", "4", "6", "5"], correct: "5" },
  { q: "Cilat janë 5 namazet e detyruara?", opts: ["Sabahu, Dreka, Ikindia, Akshami, Jacia", "Sabahu, Duhaja, Dreka, Ikindia, Jacia", "Sabahu, Dreka, Ikindia, Akshami, Teravihu", "Fajri, Duhaja, Dhuhri, Asri, Isha"], correct: "Sabahu, Dreka, Ikindia, Akshami, Jacia" },
  { q: "Sa rekat ka namazi i Sabahut?", opts: ["2 sunnet + 2 farz", "2 sunnet + 4 farz", "4 sunnet + 2 farz", "2 farz vetëm"], correct: "2 sunnet + 2 farz" },
  { q: "Cili kusht i namazit ka lidhje me drejtimin?", opts: ["Tahara", "Kibla", "Auret", "Nijet"], correct: "Kibla" },
  { q: "Çfarë e prish namazin?", opts: ["Qarja", "Ecja pak", "Të folurit me qëllim dhe qeshja me zë", "Lëvizja e vogël"], correct: "Të folurit me qëllim dhe qeshja me zë" },
  { q: "Cili muaj është muaji i agjërimit?", opts: ["Sheval", "Muharrem", "Dhul-Hixhe", "Ramazan"], correct: "Ramazan" },
  { q: "Çfarë është Sehuri?", opts: ["Vakti i iftarit", "Namazi i natës", "Vakt vakti para agimit (vakti i ngrënies para agjërimit)", "Namazi i Fajrit"], correct: "Vakt vakti para agimit (vakti i ngrënies para agjërimit)" },
  { q: "Çfarë e prish agjërimin?", opts: ["Injeksioni mjekësor", "Ngrënia e qëllimshme dhe pirja", "Shikimi i gabuar", "Mendimi i keq"], correct: "Ngrënia e qëllimshme dhe pirja" },
  { q: "Nisabi i arit (kufiri minimal) është:", opts: ["50 gram ar", "100 gram ar", "200 gram ar", "85 gram ar (20 mithkal)"], correct: "85 gram ar (20 mithkal)" },
  { q: "Zekat i argjendisë është sa % e vlerës?", opts: ["5%", "10%", "2.5%", "1%"], correct: "2.5%" },
  { q: "Sa qiej ka kaluar Profeti ﷺ gjatë Mi'raxhit?", opts: ["3 qiej", "5 qiej", "7 qiej", "10 qiej"], correct: "7 qiej" },
  { q: "Çfarë thuhet gjatë Rukusë?", opts: ["Subhana rabbijel ala", "Subhana rabbijel adhim", "Allahu Ekber", "Semia Allahu"], correct: "Subhana rabbijel adhim" },
  { q: "Çfarë thuhet gjatë Sexhdes?", opts: ["Subhana rabbijel adhim", "Subhana rabbijel ala", "Allahu Ekber", "Semia Allahu"], correct: "Subhana rabbijel ala" },
  { q: "Cila dua thuhet kur del nga shtëpia?", opts: ["Bismillah tewekkeltu alallah", "Allahu Ekber", "Subhanallah", "Asteghfirullah"], correct: "Bismillah tewekkeltu alallah" },
  { q: "Mes'hi i kokës gjatë abdesit — sa herë?", opts: ["3 herë", "2 herë", "1 herë e plotë", "Sipas dëshirës"], correct: "1 herë e plotë" },
  { q: "Sa gjymtyrë duhet të prekin tokën në Sexhde?", opts: ["5 gjymtyrë", "6 gjymtyrë", "7 gjymtyrë", "4 gjymtyrë"], correct: "7 gjymtyrë" },
  { q: "Cila frazë thuhet kur ngrihesh nga Rukuja?", opts: ["Subhana rabbijel adhim", "Semia Allahu limen hamideh", "Allahu Ekber", "Rabbi igfirli"], correct: "Semia Allahu limen hamideh" },
  { q: "Gusuli është i detyrueshëm pas:", opts: ["Abdestit", "Namazi farzit", "Marrëdhënieve intime dhe derdhjes së spermës", "Çdo ditë"], correct: "Marrëdhënieve intime dhe derdhjes së spermës" },
  { q: "Sadakatu'l-Fitr jepet:", opts: ["Çdo muaj", "Fund Haxhi", "Para namazit të Bajramit Fitër", "Fund Ramazani (çdo kohë)"], correct: "Para namazit të Bajramit Fitër" },
  { q: "Kur urdhërohet fëmija të fillojë namazin?", opts: ["Nga 5 vjeç", "Nga 7 vjeç", "Nga 10 vjeç", "Vetëm kur bëhet baligh"], correct: "Nga 7 vjeç" },
];

export default function FikhQuiz() {
  const [started, setStarted] = useState(false);
  const [questions] = useState(() => [...FIKH_QUESTIONS].sort(() => Math.random() - 0.5));
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<{ selected: string | null; correct: string; isCorrect: boolean } | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started || finished) return;
    if (timer <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, started, finished, idx]);

  const handleAnswer = (opt: string | null) => {
    if (answered !== null) return;
    const isCorrect = opt === questions[idx].correct;
    setAnswered({ selected: opt, correct: questions[idx].correct, isCorrect });
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) { setFinished(true); return; }
      setIdx(i => i + 1); setTimer(20); setAnswered(null);
    }, 1500);
  };

  const restart = () => { setStarted(false); setFinished(false); setIdx(0); setScore(0); setTimer(20); setAnswered(null); };
  const pct = Math.round((score / questions.length) * 100);

  if (!started) return (
    <div className="bg-card rounded-2xl border border-border p-8 text-center">
      <div className="text-5xl mb-4">🕌</div>
      <h3 className="text-xl font-bold text-foreground mb-2">Kuiz Fikh Elementar</h3>
      <p className="text-muted-foreground mb-1">{questions.length} pyetje · 20 sekonda secila</p>
      <p className="text-sm text-primary mb-6">Akide, Pastërtia, Namazi, Agjërimi, Zekati</p>
      <button onClick={() => setStarted(true)}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-3 font-bold transition-all">
        🚀 Fillo Kuizin
      </button>
    </div>
  );

  if (finished) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="bg-card rounded-2xl border border-border p-8 text-center">
      <Trophy className="w-14 h-14 text-amber-400 mx-auto mb-3" />
      <h3 className="text-2xl font-bold text-foreground mb-2">Mbaroi!</h3>
      <p className={`text-5xl font-bold mb-3 ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500"}`}>
        {score}/{questions.length}
      </p>
      <p className="text-muted-foreground mb-2 font-medium">
        {pct >= 85 ? "🏆 Mashallah! Fikh-un zotëron!" : pct >= 60 ? "👍 Mirë! Vazhdo të mësosh!" : "📚 Rishiko mësimet dhe provo sërish!"}
      </p>
      <p className="text-sm text-muted-foreground mb-6">{pct}% saktësi</p>
      <button onClick={restart}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-3 font-bold flex items-center gap-2 mx-auto">
        <RotateCcw className="w-4 h-4" /> Provo Sërish
      </button>
    </motion.div>
  );

  const q = questions[idx];
  return (
    <div className="bg-card rounded-2xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-muted-foreground">Pyetja {idx + 1}/{questions.length}</span>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-emerald-100 text-emerald-700"}`}>
          <Timer className="w-4 h-4" /> {timer}s
        </div>
        <span className="text-sm font-semibold text-emerald-600">✓ {score}</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2 mb-4">
        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
      </div>
      <div className="bg-secondary rounded-2xl p-5 text-center mb-4">
        <p className="text-base font-bold text-foreground leading-relaxed">{q.q}</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {q.opts.map((opt) => {
          let cls = "border-border bg-card text-foreground hover:border-primary/50 hover:bg-secondary";
          if (answered) {
            if (opt === answered.correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
            else if (opt === answered.selected && !answered.isCorrect) cls = "border-red-400 bg-red-50 text-red-700";
            else cls = "border-border bg-muted text-muted-foreground";
          }
          return (
            <button key={opt} disabled={!!answered} onClick={() => handleAnswer(opt)}
              className={`border-2 rounded-2xl p-3 text-sm text-left transition-all ${cls}`}>
              {opt}
              {answered && opt === answered.correct && <CheckCircle className="w-4 h-4 inline ml-1 text-emerald-600" />}
              {answered && opt === answered.selected && !answered.isCorrect && <XCircle className="w-4 h-4 inline ml-1 text-red-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
