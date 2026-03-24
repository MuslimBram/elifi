import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Volume2, CheckCircle, XCircle } from "lucide-react";
import TajweedBuiltIn from "@/components/tajweed/TajweedBuiltIn";
import TajweedFilters from "@/components/tajweed/TajweedFilters";

interface TajweedRule {
  id: string;
  title: string;
  arabic: string;
  description: string;
  examples: { arabic: string; transliteration: string; explanation: string }[];
  color: string;
  letterGroup?: string;
}

const RULES: TajweedRule[] = [
  {
    id: "idhhar", title: "Idh'har (إظهار)", arabic: "إِظْهَار",
    description: "Shqiptimi i qartë i Nun sakinës ose Tenvinit kur pas tyre vjen njëra nga 6 shkronjat e fytit: ء هـ ع ح غ خ. Nuk ka hundoresim (ghunneh) dhe nuk ka bashkim.",
    color: "bg-green-500",
    letterGroup: "ء هـ ع ح غ خ",
    examples: [
      { arabic: "مَنْ أَعْطَى", transliteration: "men a'taa", explanation: "Nun sakineh + Hemze (ء) = Idh'har — shqipto qartë" },
      { arabic: "عِلْمٌ حَكِيمٌ", transliteration: "'ilmun hakiim", explanation: "Tenvin + Ha (ح) = Idh'har" },
      { arabic: "مِنْ عِلْمٍ", transliteration: "min 'ilmin", explanation: "Nun sakineh + Ajn (ع) = Idh'har" },
      { arabic: "أَنْعَمْتَ", transliteration: "en'amte", explanation: "Nun sakineh + Ajn brenda fjalës = Idh'har" },
      { arabic: "مِنْ خَيْرٍ", transliteration: "min khajrin", explanation: "Nun sakineh + Kha (خ) = Idh'har" },
    ],
  },
  {
    id: "idgham_ghunneh", title: "Idgham me Ghunneh", arabic: "إِدْغَام بِغُنَّة",
    description: "Bashkimi i Nun sakinës ose Tenvinit me shkronjën pasuese me hundoresim (ghunneh). Shkronjat janë: ي ن م و (YNMW). Ghunneh zgjat 2 harekate.",
    color: "bg-blue-500",
    letterGroup: "ي ن م و",
    examples: [
      { arabic: "مَن يَعْمَلْ", transliteration: "may-ya'mel", explanation: "Nun sakineh + Ya (ي) = Idgham me Ghunneh" },
      { arabic: "مِن نِّعْمَةٍ", transliteration: "min-ni'metin", explanation: "Nun sakineh + Nun (ن) = Idgham me Ghunneh" },
      { arabic: "مِن مَّاءٍ", transliteration: "mim-maa-in", explanation: "Nun sakineh + Mim (م) = Idgham me Ghunneh" },
      { arabic: "مِن وَلِيٍّ", transliteration: "miw-walijj", explanation: "Nun sakineh + Waw (و) = Idgham me Ghunneh" },
    ],
  },
  {
    id: "idgham_bila", title: "Idgham pa Ghunneh", arabic: "إِدْغَام بِلَا غُنَّة",
    description: "Bashkimi i Nun sakinës ose Tenvinit me shkronjën pasuese PA hundoresim. Shkronjat janë vetëm 2: ل ر (Lam dhe Ra).",
    color: "bg-indigo-500",
    letterGroup: "ل ر",
    examples: [
      { arabic: "مِن رَّبِّهِمْ", transliteration: "mir-rabbihim", explanation: "Nun sakineh + Ra (ر) = Idgham pa Ghunneh" },
      { arabic: "مِن لَّدُنْهُ", transliteration: "mil-ladunhu", explanation: "Nun sakineh + Lam (ل) = Idgham pa Ghunneh" },
      { arabic: "هُدًى لِّلْمُتَّقِينَ", transliteration: "hudal-lilmuttaqiin", explanation: "Tenvin + Lam = Idgham pa Ghunneh" },
    ],
  },
  {
    id: "iqlab", title: "Iklab (إقلاب)", arabic: "إِقْلَاب",
    description: "Kthimi i Nun sakinës ose Tenvinit në shkronjën Mim (م) kur pas tyre vjen shkronja Ba (ب). Shqiptohet si Mim me hundoresim (ghunneh) 2 harekate.",
    color: "bg-purple-500",
    letterGroup: "ب",
    examples: [
      { arabic: "مِن بَعْدِ", transliteration: "mim ba'di", explanation: "Nun sakineh + Ba = Iklab (shqiptohet si Mim)" },
      { arabic: "سَمِيعٌ بَصِيرٌ", transliteration: "samiim-basiir", explanation: "Tenvin + Ba = Iklab" },
      { arabic: "أَنبِئْهُمْ", transliteration: "ambi'hum", explanation: "Nun sakineh + Ba brenda fjalës = Iklab" },
    ],
  },
  {
    id: "ikhfa", title: "Ikhfa (إخفاء)", arabic: "إِخْفَاء",
    description: "Fshehja e Nun sakinës ose Tenvinit me Ghunneh (hundoresim 2 harekate) kur vjen njëra nga 15 shkronjat e tjera: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك",
    color: "bg-orange-500",
    letterGroup: "ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك",
    examples: [
      { arabic: "مِن قَبْلُ", transliteration: "min qablu", explanation: "Nun sakineh + Qaf = Ikhfa" },
      { arabic: "أَنتُمْ", transliteration: "antum", explanation: "Nun sakineh + Ta brenda fjalës = Ikhfa" },
      { arabic: "مُنذِرٌ", transliteration: "mundhir", explanation: "Nun sakineh + Dhal brenda fjalës = Ikhfa" },
      { arabic: "عَلِيمًا سَمِيعًا", transliteration: "'aliiman samii'an", explanation: "Tenvin + Sin = Ikhfa" },
      { arabic: "مِن شَرِّ", transliteration: "min sharri", explanation: "Nun sakineh + Shin = Ikhfa" },
    ],
  },
  {
    id: "ghunnah", title: "Ghunneh (غُنَّة)", arabic: "غُنَّة",
    description: "Hundoresimi që del nga hunda kur shqiptojmë Mim (م) ose Nun (ن) të dyfishuara (me Sheddeh). Ghunneh zgjat 2 harekate. Është tingull i detyrueshëm.",
    color: "bg-cyan-500",
    examples: [
      { arabic: "إِنَّ", transliteration: "inne", explanation: "Nun me Sheddeh = Ghunneh 2 harekate" },
      { arabic: "ثُمَّ", transliteration: "thumme", explanation: "Mim me Sheddeh = Ghunneh 2 harekate" },
      { arabic: "مِنَ النَّاسِ", transliteration: "minen-naas", explanation: "Nun me Sheddeh = Ghunneh" },
    ],
  },
  {
    id: "madd", title: "Medd (مَدّ)", arabic: "مَدّ",
    description: "Zgjatja e zërit në shkronjat e Meddit (ا و ي). Llojet kryesore: Medd Tabii (2 harekate — natyror), Medd Munfasil (4-5 harekate — i ndarë), Medd Muttasil (4-5 harekate — i bashkuar), Medd Lazim (6 harekate).",
    color: "bg-red-500",
    examples: [
      { arabic: "قَالَ", transliteration: "qaala", explanation: "Medd Tabii — Elif pas Fethës, zgjat 2 harekate" },
      { arabic: "جَاءَ", transliteration: "jaa-a", explanation: "Medd Muttasil — Hemze pas Meddit brenda fjalës (4-5 harekate)" },
      { arabic: "فِي أَنفُسِهِمْ", transliteration: "fii anfusihim", explanation: "Medd Munfasil — Hemze në fjalë tjetër (4-5 harekate)" },
      { arabic: "الم", transliteration: "alif-laam-miim", explanation: "Medd Lazim — në shkronjat e hapura (6 harekate)" },
      { arabic: "نُوحِيهَا", transliteration: "nuuhiiha", explanation: "Medd Tabii me Waw dhe Ya" },
    ],
  },
  {
    id: "qalqalah", title: "Kalkaleh (قلقلة)", arabic: "قَلْقَلَة",
    description: "Dridhja/tundja e 5 shkronjave ق ط ب ج د (QaTaBaJaD) kur janë sakin (pa harekate). Kalkaleh Sugra (e vogël) — në mes të fjalës. Kalkaleh Kubra (e madhe) — në fund të fjalës ose ajetit.",
    color: "bg-teal-500",
    letterGroup: "ق ط ب ج د",
    examples: [
      { arabic: "يَخْلُقْ", transliteration: "yakhluq", explanation: "Qaf sakineh në fund = Kalkaleh Kubra (e madhe)" },
      { arabic: "يَجْعَلْ", transliteration: "yaj'al", explanation: "Xhim sakineh në mes = Kalkaleh Sugra (e vogël)" },
      { arabic: "أَحَدْ", transliteration: "ahad", explanation: "Dal sakineh në fund = Kalkaleh Kubra" },
      { arabic: "يَطْمَعُ", transliteration: "yatma'u", explanation: "Ta sakineh në mes = Kalkaleh Sugra" },
      { arabic: "اقْتَرَبَ", transliteration: "iqtaraba", explanation: "Qaf sakineh në mes = Kalkaleh Sugra" },
    ],
  },
  {
    id: "lam_shamsiyyah", title: "Lam Shamsijjeh", arabic: "اللام الشمسية",
    description: "Kur artikulli 'ال' vjen para 14 shkronjave 'diellore' (ت ث د ذ ر ز س ش ص ض ط ظ ل ن), Lami nuk shqiptohet dhe shkronja pas saj dyfishohet (idgham).",
    color: "bg-yellow-500",
    letterGroup: "ت ث د ذ ر ز س ش ص ض ط ظ ل ن",
    examples: [
      { arabic: "الشَّمْس", transliteration: "esh-shems", explanation: "Lam + Shin = Lam nuk dëgjohet, Shin dyfishohet" },
      { arabic: "النَّاس", transliteration: "en-naas", explanation: "Lam + Nun = Lam nuk dëgjohet" },
      { arabic: "الرَّحْمَن", transliteration: "er-rahmaan", explanation: "Lam + Ra = Lam nuk dëgjohet" },
    ],
  },
  {
    id: "lam_qamariyyah", title: "Lam Kamerijjeh", arabic: "اللام القمرية",
    description: "Kur artikulli 'ال' vjen para 14 shkronjave 'hënore' (ا ب ج ح خ ع غ ف ق ك م و ه ي), Lami shqiptohet qartë (idh'har).",
    color: "bg-amber-500",
    letterGroup: "ا ب ج ح خ ع غ ف ق ك م و ه ي",
    examples: [
      { arabic: "القَمَر", transliteration: "el-qamar", explanation: "Lam + Qaf = Lam shqiptohet qartë" },
      { arabic: "الكِتَاب", transliteration: "el-kitaab", explanation: "Lam + Kef = Lam shqiptohet qartë" },
      { arabic: "الحَمْد", transliteration: "el-hamd", explanation: "Lam + Ha = Lam shqiptohet qartë" },
    ],
  },
  {
    id: "mim_sakinah", title: "Mim Sakineh (م)", arabic: "أحكام الميم الساكنة",
    description: "Rregullat e Mim sakinës: 1) Ikhfa Shafawi — Mim sakineh + Ba = fshehje me ghunneh. 2) Idgham Shafawi — Mim sakineh + Mim = bashkim me ghunneh. 3) Idh'har Shafawi — Mim sakineh + çdo shkronjë tjetër = shqiptim i qartë.",
    color: "bg-rose-500",
    examples: [
      { arabic: "تَرْمِيهِم بِحِجَارَةٍ", transliteration: "tarmiihim bi-hijaara", explanation: "Mim sakineh + Ba = Ikhfa Shafawi (fshehje me ghunneh)" },
      { arabic: "لَهُم مَّا", transliteration: "lehum-maa", explanation: "Mim sakineh + Mim = Idgham Shafawi (bashkim)" },
      { arabic: "أَلَمْ نَشْرَحْ", transliteration: "elem neshrah", explanation: "Mim sakineh + Nun = Idh'har Shafawi (qartë)" },
    ],
  },
];

const QUIZ_QUESTIONS = [
  { q: "Çfarë është Idh'hari?", options: ["Shqiptim i qartë i Nun sakinës", "Bashkim i Nun sakinës", "Fshehje e Nun sakinës", "Kthim në Mim"], correct: 0 },
  { q: "Sa shkronja ka Idh'hari?", options: ["4", "6", "15", "2"], correct: 1 },
  { q: "Cilat janë shkronjat e Kalkaleh-s?", options: ["ق ط ب ج د", "ي ن م و", "ل ر", "ا و ي"], correct: 0 },
  { q: "Çfarë është Medd Tabii?", options: ["Zgjatje 6 harekate", "Zgjatje 2 harekate", "Zgjatje 4 harekate", "Pa zgjatje"], correct: 1 },
  { q: "Kur ndodh Iklabi?", options: ["Nun + Ba", "Nun + Ra", "Nun + Lam", "Nun + Ya"], correct: 0 },
  { q: "Sa harekate zgjat Ghunneh-ja?", options: ["1", "2", "3", "4"], correct: 1 },
  { q: "Idgham pa Ghunneh ndodh me cilat shkronja?", options: ["ي ن م و", "ل ر", "ق ط ب ج د", "ا و ي"], correct: 1 },
  { q: "Çfarë ndodh me Lam Shamsijjeh?", options: ["Lami shqiptohet qartë", "Lami nuk shqiptohet, shkronja dyfishohet", "Lami kthehet në Nun", "Lami zgjatet"], correct: 1 },
  { q: "Ikhfa-ja ka sa shkronja?", options: ["6", "2", "15", "28"], correct: 2 },
  { q: "Medd Muttasil zgjat sa harekate?", options: ["2", "3", "4-5", "6"], correct: 2 },
  { q: "Çfarë është Kalkaleh Kubra?", options: ["Dridhje në mes të fjalës", "Dridhje në fund të fjalës/ajetit", "Pa dridhje", "Zgjatje"], correct: 1 },
  { q: "Ikhfa Shafawi ndodh kur?", options: ["Mim sakineh + Ba", "Mim sakineh + Mim", "Nun sakineh + Ba", "Nun sakineh + Mim"], correct: 0 },
  { q: "Medd Lazim zgjat sa harekate?", options: ["2", "4", "5", "6"], correct: 3 },
  { q: "Lam Kamerijjeh — çfarë ndodh?", options: ["Lami nuk dëgjohet", "Lami shqiptohet qartë", "Lami kthehet në Ra", "Lami dyfishohet"], correct: 1 },
  { q: "Shkronjat e Idgham me Ghunneh janë:", options: ["ل ر", "ق ط ب ج د", "ي ن م و", "ء هـ ع ح غ خ"], correct: 2 },
  { q: "Iklabi e kthen Nun-in në cilën shkronjë?", options: ["Ra", "Lam", "Mim", "Ba"], correct: 2 },
  { q: "Cilat janë shkronjat e fytit (Idh'har)?", options: ["ء هـ ع ح غ خ", "ي ن م و", "ق ط ب ج د", "ت ث د ذ ر ز"], correct: 0 },
  { q: "Idgham Shafawi ndodh kur?", options: ["Mim sakineh + Ba", "Mim sakineh + Mim", "Nun sakineh + Mim", "Mim sakineh + Nun"], correct: 1 },
  { q: "Çfarë do të thotë 'Ghunneh'?", options: ["Dridhje", "Hundoresim", "Zgjatje", "Fshehje"], correct: 1 },
  { q: "Sa lloje Medd ka?", options: ["2", "3", "4+", "1"], correct: 2 },
];

function speak(text: string, lang = "ar-SA") {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.6;
  window.speechSynthesis.speak(u);
}

export default function Tajweed() {
  const [selectedRule, setSelectedRule] = useState<string>("idhhar");
  const [mode, setMode] = useState<"learn" | "quiz">("learn");
  const [quizIdx, setQuizIdx] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [quizDone, setQuizDone] = useState(false);

  const rule = RULES.find((r) => r.id === selectedRule)!;

  // Quiz timer
  React.useEffect(() => {
    if (mode !== "quiz" || quizDone || answered !== null) return;
    if (timer <= 0) { handleAnswer(-1); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, mode, quizDone, answered]);

  const startQuiz = () => {
    setMode("quiz");
    setQuizIdx(0);
    setAnswered(null);
    setScore(0);
    setTimer(20);
    setQuizDone(false);
  };

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === QUIZ_QUESTIONS[quizIdx].correct) setScore(s => s + 1);
    setTimeout(() => {
      if (quizIdx + 1 >= QUIZ_QUESTIONS.length) {
        setQuizDone(true);
        // Save progress
        const prev = JSON.parse(localStorage.getItem("progress_tajweed") || "{}");
        prev.lastScore = score + (idx === QUIZ_QUESTIONS[quizIdx].correct ? 1 : 0);
        prev.totalQuestions = QUIZ_QUESTIONS.length;
        prev.lastPlayed = new Date().toISOString();
        localStorage.setItem("progress_tajweed", JSON.stringify(prev));
      } else {
        setQuizIdx(i => i + 1);
        setTimer(20);
        setAnswered(null);
      }
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          Texhuidi (التجويد)
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          Rregullat e <span className="text-gradient">Texhuidit</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {RULES.length} rregulla texhuidi me shembuj, audio dhe kuiz interaktiv.
        </p>
      </motion.div>

      {/* Mode toggle */}
      <div className="flex gap-2 justify-center mb-6">
        <button onClick={() => setMode("learn")} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "learn" ? "bg-primary text-primary-foreground shadow-md" : "glass-card text-foreground/70"}`}>
          📚 Mëso Rregullat
        </button>
        <button onClick={startQuiz} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "quiz" ? "bg-primary text-primary-foreground shadow-md" : "glass-card text-foreground/70"}`}>
          🎯 Kuiz ({QUIZ_QUESTIONS.length} pyetje)
        </button>
      </div>

      {mode === "learn" ? (
        <>
          {/* Rule selector */}
          <div className="flex flex-wrap gap-2 glass-card p-4 rounded-xl mb-8">
            {RULES.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRule(r.id)}
                className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                  selectedRule === r.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border text-foreground/70 hover:border-primary/50"
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
                {r.title.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Rule detail */}
          <AnimatePresence mode="wait">
            <motion.div key={rule.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-4 h-4 rounded-full ${rule.color}`} />
                  <h2 className="text-xl font-bold text-foreground">{rule.title}</h2>
                  <span className="text-2xl text-primary font-arabic ml-auto" dir="rtl">{rule.arabic}</span>
                </div>
                <p className="text-foreground/80 leading-relaxed">{rule.description}</p>
                {rule.letterGroup && (
                  <div className="mt-4 bg-secondary/50 rounded-xl p-3">
                    <p className="text-xs font-bold text-foreground mb-1">Shkronjat:</p>
                    <p className="text-lg font-bold text-primary" dir="rtl">{rule.letterGroup}</p>
                  </div>
                )}
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground">📝 Shembuj ({rule.examples.length})</h3>
                {rule.examples.map((ex, i) => (
                  <div key={i} className="glass-card rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => speak(ex.arabic)} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors shrink-0">
                        <Volume2 className="w-5 h-5" />
                      </button>
                      <span className="text-2xl text-foreground font-arabic" dir="rtl">{ex.arabic}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary">{ex.transliteration}</p>
                      <p className="text-sm text-muted-foreground">{ex.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Color code legend */}
          <div className="glass-card rounded-2xl p-5 mt-8">
            <h3 className="text-sm font-bold text-foreground mb-3">🎨 Kodi i Ngjyrave në Mus'haf</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {RULES.map((r) => (
                <div key={r.id} className="flex items-center gap-2 cursor-pointer hover:bg-secondary/50 rounded-lg p-1.5 transition-colors" onClick={() => setSelectedRule(r.id)}>
                  <div className={`w-3 h-3 rounded-full ${r.color}`} />
                  <span className="text-xs text-foreground/80">{r.title.split("(")[0].trim()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary table */}
          <div className="glass-card rounded-2xl overflow-hidden mt-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-3 text-left text-xs font-bold">Rregulle</th>
                  <th className="px-4 py-3 text-left text-xs font-bold">Kur ndodh</th>
                  <th className="px-4 py-3 text-left text-xs font-bold">Shembuj</th>
                </tr>
              </thead>
              <tbody>
                {RULES.map((r, i) => (
                  <tr key={r.id} className={`border-b border-border cursor-pointer hover:bg-secondary/30 ${i % 2 === 0 ? "bg-card" : "bg-secondary/20"}`} onClick={() => setSelectedRule(r.id)}>
                    <td className="px-4 py-3 font-semibold text-foreground flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
                      {r.title.split("(")[0].trim()}
                    </td>
                    <td className="px-4 py-3 text-foreground/70 text-xs">{r.description.substring(0, 60)}...</td>
                    <td className="px-4 py-3 text-foreground/70 text-xs">{r.examples.length} shembuj</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* QUIZ MODE */
        <div className="max-w-2xl mx-auto">
          {!quizDone ? (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-muted-foreground">Pyetja {quizIdx + 1}/{QUIZ_QUESTIONS.length}</span>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-destructive/10 text-destructive animate-pulse" : "bg-primary/10 text-primary"}`}>
                  ⏱ {timer}s
                </div>
                <span className="text-sm font-bold text-primary">✓ {score}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 mb-6">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${(quizIdx / QUIZ_QUESTIONS.length) * 100}%` }} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-6">{QUIZ_QUESTIONS[quizIdx].q}</h3>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                  let cls = "border-border bg-card text-foreground hover:border-primary/50";
                  if (answered !== null) {
                    if (i === QUIZ_QUESTIONS[quizIdx].correct) cls = "border-primary bg-primary/10 text-primary";
                    else if (i === answered) cls = "border-destructive bg-destructive/10 text-destructive";
                    else cls = "border-border/50 bg-muted text-muted-foreground";
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(i)} disabled={answered !== null}
                      className={`w-full text-left px-5 py-3.5 rounded-xl border-2 text-sm font-medium transition-all flex items-center gap-3 ${cls}`}>
                      <span className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                      {answered !== null && i === QUIZ_QUESTIONS[quizIdx].correct && <CheckCircle className="w-5 h-5 text-primary ml-auto" />}
                      {answered !== null && i === answered && i !== QUIZ_QUESTIONS[quizIdx].correct && <XCircle className="w-5 h-5 text-destructive ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center">
              <span className="text-6xl block mb-4">{score >= QUIZ_QUESTIONS.length * 0.8 ? "🏆" : score >= QUIZ_QUESTIONS.length * 0.5 ? "👍" : "📖"}</span>
              <h2 className="text-2xl font-bold text-foreground mb-2">Rezultati: {score}/{QUIZ_QUESTIONS.length}</h2>
              <p className="text-muted-foreground mb-1">{Math.round((score / QUIZ_QUESTIONS.length) * 100)}%</p>
              <p className="text-sm text-primary mb-6">
                {score >= QUIZ_QUESTIONS.length * 0.8 ? "Shkëlqyeshëm! Ke zotëruar texhuidin!" : score >= QUIZ_QUESTIONS.length * 0.5 ? "Mirë! Vazhdo të mësosh!" : "Rishiko rregullat dhe provo përsëri!"}
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={startQuiz} className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm">🔄 Provo Përsëri</button>
                <button onClick={() => setMode("learn")} className="px-5 py-2.5 rounded-xl glass-card text-foreground font-bold text-sm">📚 Kthehu te Mësimi</button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
