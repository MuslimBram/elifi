import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MapPin, Volume2, CheckCircle, XCircle, Trophy, RotateCcw, Timer, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UMRA_STEPS, HAJJ_STEPS, HOLY_SITES, QUIZ_QUESTIONS } from "@/components/umra/UmraHajjData";

const tabs = [
  { id: "umra", label: "🕋 Umra" },
  { id: "haxhi", label: "🏔️ Haxhi" },
  { id: "vendet", label: "🗺️ Vendet e Shenjta" },
  { id: "duate", label: "📖 Duatë" },
  { id: "kuiz", label: "🎯 Kuiz" },
  { id: "progres", label: "📊 Progres" },
];

function speakArabic(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.45;
  window.speechSynthesis.speak(u);
}

function StepCard({ step, isCompleted, onToggleComplete }: { step: any; isCompleted: boolean; onToggleComplete: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border-2 p-5 transition-all ${step.color} ${isCompleted ? "ring-2 ring-primary/40" : ""}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-card flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
          {step.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Hapi {step.num}</span>
            <h3 className="font-bold text-foreground">{step.title}</h3>
            <span className="text-sm text-muted-foreground font-arabic" dir="rtl">{step.arabic}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
          <p className="text-xs text-primary/70 mb-2">📍 {step.location}</p>

          {step.info && (
            <p className="text-xs text-foreground/60 italic bg-secondary/30 rounded-lg p-2 mb-2">💡 {step.info}</p>
          )}

          <button onClick={() => setExpanded(!expanded)} className="text-xs text-primary font-semibold flex items-center gap-1 mb-2">
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {expanded ? "Fshih detajet" : `Shfaq detajet (${step.details?.length || 0})`}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <ul className="space-y-1.5 mb-3">
                  {step.details?.map((d: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="text-primary mt-0.5">•</span> {d}
                    </li>
                  ))}
                </ul>

                {step.dua && (
                  <div className="bg-card rounded-xl p-3 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-primary">🤲 Duaja:</span>
                      <button onClick={() => speakArabic(step.dua)} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20">
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-lg text-foreground text-right leading-loose font-semibold" dir="rtl">{step.dua}</p>
                    {step.dua_sq && <p className="text-sm text-foreground/70 italic mt-2">🇦🇱 {step.dua_sq}</p>}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={onToggleComplete}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isCompleted ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/60 hover:bg-primary/10"
              }`}
            >
              {isCompleted ? <><CheckCircle className="w-3.5 h-3.5" /> Përfunduar</> : "Shëno si përfunduar"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function UmraHajj() {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "umra";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // Progress tracking
  const [umraCompleted, setUmraCompleted] = useState<boolean[]>(() => {
    try { return JSON.parse(localStorage.getItem("umra_steps_completed") || "[]"); } catch { return []; }
  });
  const [hajjCompleted, setHajjCompleted] = useState<boolean[]>(() => {
    try { return JSON.parse(localStorage.getItem("hajj_steps_completed") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("umra_steps_completed", JSON.stringify(umraCompleted)); }, [umraCompleted]);
  useEffect(() => { localStorage.setItem("hajj_steps_completed", JSON.stringify(hajjCompleted)); }, [hajjCompleted]);

  const toggleUmra = (i: number) => {
    const arr = [...umraCompleted];
    arr[i] = !arr[i];
    setUmraCompleted(arr);
  };
  const toggleHajj = (i: number) => {
    const arr = [...hajjCompleted];
    arr[i] = !arr[i];
    setHajjCompleted(arr);
  };

  const umraPct = UMRA_STEPS.length > 0 ? Math.round((umraCompleted.filter(Boolean).length / UMRA_STEPS.length) * 100) : 0;
  const hajjPct = HAJJ_STEPS.length > 0 ? Math.round((hajjCompleted.filter(Boolean).length / HAJJ_STEPS.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <MapPin className="w-4 h-4" />
          Udhëzues i Plotë
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          <span className="text-gradient">Umra & Haxhi</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {UMRA_STEPS.length} hapa Umra · {HAJJ_STEPS.length} hapa Haxhi · {HOLY_SITES.length} vende · {QUIZ_QUESTIONS.length} pyetje kuizi
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id ? "bg-primary text-primary-foreground shadow-md" : "bg-card border border-border text-foreground/70 hover:border-primary/50"
            }`}>{tab.label}</button>
        ))}
      </div>

      {/* UMRA */}
      {activeTab === "umra" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">🕋 Hapat e Umras ({UMRA_STEPS.length})</h2>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${umraPct}%` }} />
              </div>
              <span className="text-xs font-bold text-primary">{umraPct}%</span>
            </div>
          </div>
          {UMRA_STEPS.map((s, i) => (
            <StepCard key={s.num} step={s} isCompleted={!!umraCompleted[i]} onToggleComplete={() => toggleUmra(i)} />
          ))}
        </motion.div>
      )}

      {/* HAJJ */}
      {activeTab === "haxhi" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">🏔️ Hapat e Haxhit ({HAJJ_STEPS.length})</h2>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${hajjPct}%` }} />
              </div>
              <span className="text-xs font-bold text-primary">{hajjPct}%</span>
            </div>
          </div>
          {HAJJ_STEPS.map((s, i) => (
            <StepCard key={s.num} step={s} isCompleted={!!hajjCompleted[i]} onToggleComplete={() => toggleHajj(i)} />
          ))}
        </motion.div>
      )}

      {/* HOLY SITES */}
      {activeTab === "vendet" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-bold text-foreground mb-4">🗺️ Vendet e Shenjta ({HOLY_SITES.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOLY_SITES.map((site, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border-2 p-5 ${site.color}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{site.emoji}</span>
                  <h3 className="font-bold text-foreground">{site.name}</h3>
                </div>
                <p className="text-sm text-foreground/80">{site.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* DUAS */}
      {activeTab === "duate" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <h2 className="text-xl font-bold text-foreground mb-4">📖 Duatë e Umras & Haxhit</h2>
          {[...UMRA_STEPS, ...HAJJ_STEPS].filter(s => s.dua).map((s, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-primary">{s.icon} {s.title}</h3>
                <button onClick={() => speakArabic(s.dua)} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xl md:text-2xl text-foreground font-semibold text-right leading-loose mb-3" dir="rtl">{s.dua}</p>
              <div className="bg-secondary/50 rounded-xl p-3">
                <p className="text-sm text-foreground/80">🇦🇱 {s.dua_sq}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* QUIZ */}
      {activeTab === "kuiz" && <UmraQuiz />}

      {/* PROGRESS */}
      {activeTab === "progres" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <h2 className="text-xl font-bold text-foreground mb-4">📊 Progresi i Umras & Haxhit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center">
              <span className="text-4xl block mb-3">🕋</span>
              <h3 className="font-bold text-foreground mb-2">Umra</h3>
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" className="stroke-secondary" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" className="stroke-primary" strokeWidth="3" strokeDasharray={`${umraPct}, 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-foreground">{umraPct}%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{umraCompleted.filter(Boolean).length}/{UMRA_STEPS.length} hapa</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <span className="text-4xl block mb-3">🏔️</span>
              <h3 className="font-bold text-foreground mb-2">Haxhi</h3>
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" className="stroke-secondary" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" className="stroke-primary" strokeWidth="3" strokeDasharray={`${hajjPct}, 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-foreground">{hajjPct}%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{hajjCompleted.filter(Boolean).length}/{HAJJ_STEPS.length} hapa</p>
            </div>
          </div>
          <button onClick={() => { setUmraCompleted([]); setHajjCompleted([]); }}
            className="flex items-center gap-2 mx-auto px-4 py-2 rounded-xl bg-secondary text-foreground/70 text-sm font-medium hover:bg-destructive/10 hover:text-destructive transition-colors">
            <RotateCcw className="w-4 h-4" /> Reseto Progresin
          </button>
        </motion.div>
      )}
    </div>
  );
}

function UmraQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(20);
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    if (finished || selected !== null) return;
    if (timer <= 0) { handleAnswer("__timeout__"); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, finished, selected]);

  const handleAnswer = (opt: string) => {
    if (selected !== null) return;
    setSelected(opt);
    const correct = opt === QUIZ_QUESTIONS[current].correct;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, correct]);
    setTimeout(() => {
      if (current + 1 < QUIZ_QUESTIONS.length) {
        setCurrent(c => c + 1);
        setSelected(null);
        setTimer(20);
      } else {
        setFinished(true);
        const prev = JSON.parse(localStorage.getItem("progress_umra") || "{}");
        prev.lastScore = score + (correct ? 1 : 0);
        prev.totalQuestions = QUIZ_QUESTIONS.length;
        prev.lastPlayed = new Date().toISOString();
        localStorage.setItem("progress_umra", JSON.stringify(prev));
      }
    }, 1200);
  };

  const restart = () => { setCurrent(0); setScore(0); setSelected(null); setFinished(false); setTimer(20); setAnswers([]); };

  if (finished) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center max-w-md mx-auto">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${pct >= 70 ? "text-yellow-500" : "text-muted-foreground"}`} />
        <h2 className="text-2xl font-bold text-foreground mb-2">Kuizi Përfundoi!</h2>
        <p className="text-4xl font-extrabold text-primary mb-1">{score}/{QUIZ_QUESTIONS.length}</p>
        <p className="text-muted-foreground mb-2">{pct}% saktë</p>
        <div className="flex justify-center gap-1 mb-6 flex-wrap">
          {answers.map((a, i) => <div key={i} className={`w-3 h-3 rounded-full ${a ? "bg-green-500" : "bg-red-400"}`} />)}
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {pct >= 90 ? "🏆 Mashallah! Ekspert i Umras & Haxhit!" : pct >= 70 ? "🌟 Shumë mirë!" : pct >= 50 ? "📚 Vazhdo të mësosh!" : "💪 Provo përsëri!"}
        </p>
        <button onClick={restart} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold">
          <RotateCcw className="w-4 h-4" /> Fillo Përsëri
        </button>
      </motion.div>
    );
  }

  const q = QUIZ_QUESTIONS[current];
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">Pyetja {current + 1}/{QUIZ_QUESTIONS.length}</span>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-destructive/10 text-destructive animate-pulse" : "bg-primary/10 text-primary"}`}>
          <Timer className="w-3 h-3" /> {timer}s
        </div>
        <span className="text-sm font-bold text-primary">✓ {score}</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2 mb-6">
        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((current + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
      </div>
      <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">{q.q}</h3>
        <div className="space-y-3">
          {q.options.map((opt) => {
            let cls = "glass-card border border-border text-foreground hover:border-primary/50";
            if (selected !== null) {
              if (opt === q.correct) cls = "bg-green-500/10 border-green-500 text-green-700";
              else if (opt === selected) cls = "bg-red-500/10 border-red-400 text-red-600";
            }
            return (
              <button key={opt} onClick={() => handleAnswer(opt)} disabled={selected !== null}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${cls}`}>
                {opt}
                {selected !== null && opt === q.correct && <CheckCircle className="w-4 h-4 ml-auto text-green-600" />}
                {selected !== null && opt === selected && opt !== q.correct && <XCircle className="w-4 h-4 ml-auto text-red-500" />}
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
