import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Volume2 } from "lucide-react";

interface TajweedRule {
  id: string;
  title: string;
  arabic: string;
  description: string;
  examples: { arabic: string; transliteration: string; explanation: string }[];
  color: string;
}

const RULES: TajweedRule[] = [
  {
    id: "idhhar", title: "Idh'har (إظهار)", arabic: "إِظْهَار",
    description: "Shqiptimi i qartë i Nun sakinës ose Tenvinit kur pas tyre vjen njëra nga 6 shkronjat e fytit: ء هـ ع ح غ خ",
    color: "bg-green-500",
    examples: [
      { arabic: "مَنْ أَعْطَى", transliteration: "men a'taa", explanation: "Nun sakineh + Hemze = Idh'har" },
      { arabic: "عِلْمٌ حَكِيمٌ", transliteration: "'ilmun hakiim", explanation: "Tenvin + Ha = Idh'har" },
    ],
  },
  {
    id: "idgham", title: "Idgham (إدغام)", arabic: "إِدْغَام",
    description: "Bashkimi i Nun sakinës ose Tenvinit me shkronjën pasuese. Ndahet në Idgham me Ghunneh (يَنْمُو) dhe pa Ghunneh (لر).",
    color: "bg-blue-500",
    examples: [
      { arabic: "مَن يَعْمَلْ", transliteration: "may-ya'mel", explanation: "Nun sakineh + Ya = Idgham me Ghunneh" },
      { arabic: "مِن رَّبِّهِمْ", transliteration: "mir-rabbihim", explanation: "Nun sakineh + Ra = Idgham pa Ghunneh" },
    ],
  },
  {
    id: "iqlab", title: "Iklab (إقلاب)", arabic: "إِقْلَاب",
    description: "Kthimi i Nun sakinës ose Tenvinit në shkronjën Mim (م) kur pas tyre vjen shkronja Ba (ب).",
    color: "bg-purple-500",
    examples: [
      { arabic: "مِن بَعْدِ", transliteration: "mim ba'di", explanation: "Nun sakineh + Ba = Iklab (shqiptohet si Mim)" },
      { arabic: "سَمِيعٌ بَصِيرٌ", transliteration: "samiim-basiir", explanation: "Tenvin + Ba = Iklab" },
    ],
  },
  {
    id: "ikhfa", title: "Ikhfa (إخفاء)", arabic: "إِخْفَاء",
    description: "Fshehja e Nun sakinës ose Tenvinit me Ghunneh (hundore) kur vjen njëra nga 15 shkronjat e tjera.",
    color: "bg-orange-500",
    examples: [
      { arabic: "مِن قَبْلُ", transliteration: "min qablu", explanation: "Nun sakineh + Qaf = Ikhfa" },
      { arabic: "عَلِيمًا سَمِيعًا", transliteration: "'aliiman samii'an", explanation: "Tenvin + Sin = Ikhfa" },
    ],
  },
  {
    id: "madd", title: "Medd (مَدّ)", arabic: "مَدّ",
    description: "Zgjatja e zërit në shkronjat e Meddit (ا و ي). Llojet kryesore: Medd Tabii (2 harekate), Medd Munfasil, Medd Muttasil.",
    color: "bg-red-500",
    examples: [
      { arabic: "قَالَ", transliteration: "qaala", explanation: "Medd Tabii — zgjat 2 harekate (Elif pas Fethës)" },
      { arabic: "جَاءَ", transliteration: "jaa-a", explanation: "Medd Muttasil — Hemze pas Meddit brenda fjalës (4-5 harekate)" },
    ],
  },
  {
    id: "qalqalah", title: "Kalkaleh (قلقلة)", arabic: "قَلْقَلَة",
    description: "Dridhja/tundja e shkronjave ق ط ب ج د kur janë sakin (pa harekate).",
    color: "bg-teal-500",
    examples: [
      { arabic: "يَخْلُقْ", transliteration: "yakhluq", explanation: "Qaf sakineh në fund = Kalkaleh Kubra (e madhe)" },
      { arabic: "يَجْعَلْ", transliteration: "yaj'al", explanation: "Xhim sakineh në mes = Kalkaleh Sugra (e vogël)" },
    ],
  },
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
  const rule = RULES.find((r) => r.id === selectedRule)!;

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
          Mëso rregullat e leximit të saktë të Kuranit me shembuj dhe audio.
        </p>
      </motion.div>

      {/* Rule selector */}
      <div className="flex flex-wrap gap-2 glass-card p-4 rounded-xl mb-8">
        {RULES.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedRule(r.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedRule === r.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border text-foreground/70 hover:border-primary/50"
            }`}
          >
            {r.title}
          </button>
        ))}
      </div>

      {/* Rule detail */}
      <motion.div key={rule.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-4 h-4 rounded-full ${rule.color}`} />
            <h2 className="text-xl font-bold text-foreground">{rule.title}</h2>
            <span className="text-2xl text-primary font-arabic ml-auto" dir="rtl">{rule.arabic}</span>
          </div>
          <p className="text-foreground/80 leading-relaxed">{rule.description}</p>
        </div>

        {/* Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">📝 Shembuj</h3>
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

        {/* Color code legend */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-3">🎨 Kodi i Ngjyrave në Mus'haf</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {RULES.map((r) => (
              <div key={r.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${r.color}`} />
                <span className="text-sm text-foreground/80">{r.title.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
