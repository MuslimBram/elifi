import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Volume2, Check, X } from "lucide-react";

const PRAYER_STEPS = [
  {
    id: 1,
    title: "Nijeti (Qëllimi)",
    description: "Bëj nijetin me zemër për namazin specifik. Nijeti shprehet vetëm në zemër, jo me gojë — kjo është sunnet.",
    figure: "🧍",
    figureLabel: "Qëndro drejt, zemra të jetë e pranishme",
    arabic: "",
    translit: "",
    grade: "Kusht (Shart)",
    gradeColor: "bg-red-100 text-red-700",
    correct: ["🧍 Qëndrim drejt", "❤️ Nijet me zemër"],
    wrong: ["🗣️ Shqiptim me gojë 'Naveitu...'"],
    quiz: { q: "Si bëhet Nijeti?", options: ["Vetëm në zemër", "Me gojë duke thënë 'Naveitu'", "Me dorë duke bërë shenjë"], correct: 0 }
  },
  {
    id: 2,
    title: "Tekbiri Fillestar",
    description: "Ngri duart deri te supet ose veshët, me gishta të hapura drejt Kiblës, dhe thuaj 'Allahu Ekber'. Kjo është shtyllë (rukn).",
    figure: "🙌",
    figureLabel: "Duart ngrihen deri te supet",
    arabic: "اللَّهُ أَكْبَرُ",
    translit: "Allāhu Akbar",
    grade: "Shtyllë (Rukn)",
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["🙌 Duart deri supet ose veshët", "📐 Gishtat drejt Kiblës"],
    wrong: ["❌ Duart shumë lart ose shumë poshtë"],
    quiz: { q: "Deri ku ngrihen duart në Tekbir?", options: ["Deri te supe ose veshë", "Deri te beli", "Mbi kokë"], correct: 0 }
  },
  {
    id: 3,
    title: "Vendosja e Duarve — Kijam",
    description: "Vendos dorën e djathtë mbi dorën e majtë, mbi gjoks. Vështro vendin e sexhdes.",
    figure: "🧍‍♂️",
    figureLabel: "E djathta mbi të majtën, mbi gjoks",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ",
    translit: "Subhānaka Allāhumma wa bihamdika...",
    grade: "Sunet",
    gradeColor: "bg-blue-100 text-blue-700",
    correct: ["✅ E djathta mbi të majtën", "✅ Duart mbi gjoks"],
    wrong: ["❌ Duart të varura", "❌ E majta mbi të djathtën"],
    quiz: { q: "Ku vendosen duart gjatë Kijamit?", options: ["Mbi gjoks", "Mbi bel", "Të varura anash"], correct: 0 }
  },
  {
    id: 4,
    title: "Leximi i Fatihasë",
    description: "Lexo El-Fatihanë plotësisht në çdo rekat — shtyllë e namazit pa të cilën namazi nuk vlen.",
    figure: "📖",
    figureLabel: "Lexo me qartësi, gërmë për gërmë",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translit: "Bismi-llāhi r-rahmāni r-rahīm. Al-hamdu lillāhi rabbi l-ālamīn...",
    grade: "Shtyllë (Rukn)",
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ Lexo plotësisht", "✅ Me Bismillah"],
    wrong: ["❌ Lënia e ndonjë ajeti"],
    quiz: { q: "A është Fatiha e obligueshme në çdo rekat?", options: ["Po, është shtyllë e namazit", "Jo, vetëm në rekatin e parë", "Vetëm në namazin e mëngjesit"], correct: 0 }
  },
  {
    id: 5,
    title: "Rukuja (Përkulja)",
    description: "Perkulj trupin horizontalisht, shpina e drejtë, duart mbi gjunjë. Thuaj 'Subhane rabbijel adhim' 3 herë.",
    figure: "🙇",
    figureLabel: "Shpina horizontale, duart te gjunjët",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    translit: "Subhāna rabbiya l-azīm",
    grade: "Shtyllë (Rukn)",
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ Shpina e drejtë horizontale", "✅ Duart mbi gjunjë fort"],
    wrong: ["❌ Shpina e lakuar", "❌ Koka ngritur ose ulur"],
    quiz: { q: "Sa herë thuhet 'Subhane rabbijel adhim' në Ruku?", options: ["Minimum 3 herë", "Vetëm 1 herë", "7 herë gjithmonë"], correct: 0 }
  },
  {
    id: 6,
    title: "Drejtimi pas Rukusë (I'tidal)",
    description: "Ngrihuni duke thënë 'Semia Allahu limen hamideh'. Qëndro plotësisht drejt.",
    figure: "🧍",
    figureLabel: "Drejtim i plotë, pastaj 'Rabbena ue lekel hamd'",
    arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ — رَبَّنَا وَلَكَ الْحَمْدُ",
    translit: "Samia Allāhu liman hamidah — Rabbanā wa laka l-hamd",
    grade: "Shtyllë (Rukn)",
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ Ngritje e plotë", "✅ Qetësi (tumeninat)"],
    wrong: ["❌ Kalim i shpejtë pa qetësi"],
    quiz: { q: "Çfarë thuhet kur ngrihesh nga Rukuja?", options: ["Semia Allahu limen hamideh", "Allahu Ekber", "SubhanAllah"], correct: 0 }
  },
  {
    id: 7,
    title: "Sexhdeja e Parë",
    description: "Zbrit duke thënë 'Allahu Ekber'. 7 pjesë preken tokën: balli me hundën, dy duart, dy gjunjët, majat e gishtërinjve. Thuaj 'Subhane rabbijel a'la' 3 herë.",
    figure: "🤲",
    figureLabel: "7 pjesë preken tokën",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    translit: "Subhāna rabbiya l-a'lā",
    grade: "Shtyllë (Rukn)",
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ 7 pjesë preken tokën", "✅ Bërrylat ngritur nga toka"],
    wrong: ["❌ Bërrylat preken tokën", "❌ Këmbët ngrihen"],
    quiz: { q: "Sa pjesë të trupit preken tokën në Sexhde?", options: ["7 pjesë", "5 pjesë", "3 pjesë"], correct: 0 }
  },
  {
    id: 8,
    title: "Ulja mes dy Sexhdeve",
    description: "Ulu mes dy sexhdeve, thuaj 'Rabbigfirli, rabbigfirli' (O Zoti im, më fal).",
    figure: "🧎",
    figureLabel: "Ulu drejt, duart mbi gjunjë",
    arabic: "رَبِّ اغْفِرْ لِي",
    translit: "Rabbi ghfir lī",
    grade: "Shtyllë (Rukn)",
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ Ulje e qetë", "✅ Dua mes sexhdeve"],
    wrong: ["❌ Kalim pa ulje"],
    quiz: { q: "Çfarë thuhet mes dy sexhdeve?", options: ["Rabbigfirli", "SubhanAllah", "Allahu Ekber"], correct: 0 }
  },
  {
    id: 9,
    title: "Sexhdeja e Dytë",
    description: "Njësoj si sexhdeja e parë. Pas saj ngrihesh për rekatin e dytë duke thënë 'Allahu Ekber'.",
    figure: "🤲",
    figureLabel: "Njësoj si sexhdeja e parë",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    translit: "Subhāna rabbiya l-a'lā",
    grade: "Shtyllë (Rukn)",
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ Njëjtë me sexhden e parë"],
    wrong: ["❌ Nxitim pa qetësi"],
    quiz: { q: "A ndryshon sexhdeja e dytë nga e para?", options: ["Jo, janë njësoj", "Po, pa dhikr", "Po, pa duar"], correct: 0 }
  },
  {
    id: 10,
    title: "Et-Tehijatu (Teshehudi)",
    description: "Pas dy rekateve, ulu dhe lexo Et-Tehijatun. Ngri gishtin tregues gjatë shehadetit.",
    figure: "🙏",
    figureLabel: "Ulu, gishti tregues ngritur",
    arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ",
    translit: "Et-tehijjātu lillāhi was-salawātu wat-tajjibāt...",
    grade: "Shtyllë (Rukn)",
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ Gishti tregues ngritur", "✅ Lexim i plotë i Tehijatit"],
    wrong: ["❌ Lëvizje e tepërt e gishtit"],
    quiz: { q: "Kur ngrihet gishti tregues?", options: ["Gjatë shehadetit në Tehijat", "Gjatë Rukusë", "Gjatë Kijamit"], correct: 0 }
  },
  {
    id: 11,
    title: "Salavatet & Selami",
    description: "Lexo salavatet për Profetin ﷺ, pastaj jep selam djathtas e majtas: 'Es-selamu alejkum ue rahmetullah'.",
    figure: "🕊️",
    figureLabel: "Selam djathtas pastaj majtas",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    translit: "Es-selāmu alejkum we rahmetullāh",
    grade: "Shtyllë (Rukn)",
    gradeColor: "bg-emerald-100 text-emerald-700",
    correct: ["✅ Selam djathtas pastaj majtas", "✅ Kthimi i kokës drejt supeve"],
    wrong: ["❌ Selam vetëm nga njëra anë"],
    quiz: { q: "Sa herë jepet selami?", options: ["2 herë — djathtas dhe majtas", "1 herë — vetëm djathtas", "3 herë"], correct: 0 }
  },
];

const speakArabic = (text: string) => {
  if (!text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.7;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

export default function PrayerGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const step = PRAYER_STEPS[currentStep];

  const handleQuizAnswer = (idx: number) => {
    setQuizAnswer(idx);
    if (idx === step.quiz.correct) {
      setCompletedSteps(prev => new Set(prev).add(currentStep));
    }
  };

  const goNext = () => {
    if (currentStep < PRAYER_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      setQuizAnswer(null);
      setShowQuiz(false);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setQuizAnswer(null);
      setShowQuiz(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-foreground">🕌 Udhëzues Interaktiv i Namazit</h3>
        <p className="text-xs text-muted-foreground">Hap {currentStep + 1} nga {PRAYER_STEPS.length} • {completedSteps.size} kuize korrekte</p>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1">
        {PRAYER_STEPS.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i === currentStep ? "bg-primary" : completedSteps.has(i) ? "bg-emerald-500" : "bg-secondary"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentStep} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="glass-card rounded-2xl p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${step.gradeColor} font-medium`}>{step.grade}</span>
              <h4 className="text-lg font-bold text-foreground mt-1">{step.id}. {step.title}</h4>
            </div>
            <span className="text-4xl">{step.figure}</span>
          </div>

          <p className="text-sm text-muted-foreground">{step.description}</p>
          <p className="text-xs text-muted-foreground italic">{step.figureLabel}</p>

          {/* Arabic */}
          {step.arabic && (
            <div className="bg-secondary/50 rounded-xl p-3 flex items-center gap-2">
              <div className="flex-1">
                <p className="text-right text-lg font-arabic leading-relaxed" dir="rtl">{step.arabic}</p>
                <p className="text-xs text-muted-foreground mt-1">{step.translit}</p>
              </div>
              <button onClick={() => speakArabic(step.arabic)} className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors shrink-0">
                <Volume2 className="w-4 h-4 text-primary" />
              </button>
            </div>
          )}

          {/* Correct / Wrong */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-xs font-bold text-emerald-600">✅ Saktë:</p>
              {step.correct.map((c, i) => <p key={i} className="text-xs text-foreground/80">{c}</p>)}
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-red-500">❌ Gabim:</p>
              {step.wrong.map((w, i) => <p key={i} className="text-xs text-foreground/80">{w}</p>)}
            </div>
          </div>

          {/* Quiz toggle */}
          {!showQuiz ? (
            <button onClick={() => setShowQuiz(true)} className="w-full py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
              🎯 Testo veten
            </button>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-3 space-y-2">
              <p className="text-sm font-bold text-foreground">{step.quiz.q}</p>
              {step.quiz.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleQuizAnswer(i)}
                  disabled={quizAnswer !== null}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    quizAnswer === null ? "bg-card border border-border hover:border-primary/50" :
                    i === step.quiz.correct ? "bg-emerald-100 border border-emerald-400 text-emerald-800" :
                    i === quizAnswer ? "bg-red-100 border border-red-400 text-red-800" :
                    "bg-card border border-border opacity-50"
                  }`}
                >
                  {quizAnswer !== null && i === step.quiz.correct && <Check className="w-3 h-3 inline mr-1" />}
                  {quizAnswer !== null && i === quizAnswer && i !== step.quiz.correct && <X className="w-3 h-3 inline mr-1" />}
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-2">
            <button onClick={goPrev} disabled={currentStep === 0} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-secondary text-foreground text-sm font-medium disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" /> Para
            </button>
            <button onClick={goNext} disabled={currentStep === PRAYER_STEPS.length - 1} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-30">
              Tjetra <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
