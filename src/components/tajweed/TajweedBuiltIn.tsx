import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Volume2 } from "lucide-react";

interface TajweedRule {
  name: string;
  nameAr: string;
  level: string;
  desc: string;
  letters: string;
  example: string;
  exampleTranslit: string;
  rule: string;
}

interface RuleCategory {
  category: string;
  categoryLabel: string;
  color: string;
  bg: string;
  border: string;
  rules: TajweedRule[];
}

const RULES: RuleCategory[] = [
  {
    category: "noon_sakinah",
    categoryLabel: "Noon Sakinah & Tenvin",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    rules: [
      {
        name: "Izhar (إظهار)",
        nameAr: "إِظْهَار",
        level: "fillestar",
        desc: "Shqiptimi i qartë i Noon Sakinah ose Tenvinit kur pas tyre vjen njëra nga 6 shkronjat: أ هـ ع ح غ خ",
        letters: "أ هـ ع ح غ خ",
        example: "مِنْ أَهْلِ",
        exampleTranslit: "min ahli",
        rule: "Shqiptohet qartë pa zgjatje dhe pa ghunnah."
      },
      {
        name: "Idgham (إدغام)",
        nameAr: "إِدْغَام",
        level: "fillestar",
        desc: "Bashkimi dhe zgjatja me Ghunnah kur pas Noon Sakinah vjen njëra nga: ن م و ي — ose pa Ghunnah për: ل ر",
        letters: "ي ن م و — ل ر",
        example: "مِن نِّعمَة",
        exampleTranslit: "mi-nniʿmatin",
        rule: "Me Ghunnah: ي ن م و | Pa Ghunnah: ل ر"
      },
      {
        name: "Ikhfa (إخفاء)",
        nameAr: "إِخْفَاء",
        level: "mesatar",
        desc: "Fshehja e Noon Sakinah ose Tenvinit kur pas tyre vjen njëra nga 15 shkronjat e mbetur. Lexohet mes Izharit dhe Idghamit me Ghunnah.",
        letters: "ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك",
        example: "أَنتُمْ",
        exampleTranslit: "antum",
        rule: "Lexohet mes qartë dhe bashkimit — me ghunnah të moderuar."
      },
      {
        name: "Iqlab (إقلاب)",
        nameAr: "إِقْلَاب",
        level: "mesatar",
        desc: "Ndërrimi i Noon Sakinah ose Tenvinit në MIM kur pas tyre vjen shkronja ب (Ba).",
        letters: "ب",
        example: "مِنْ بَعْدِ",
        exampleTranslit: "mim baʿdi",
        rule: "Noon ndryshon në Mim me Ghunnah."
      },
    ]
  },
  {
    category: "meem_sakinah",
    categoryLabel: "Meem Sakinah",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    rules: [
      {
        name: "Ikhfa Shafawi (إخفاء شفوي)",
        nameAr: "إِخْفَاء شَفَوِي",
        level: "mesatar",
        desc: "Fshehja e Meem Sakinah kur pas saj vjen shkronja ب. Quhet 'shfawe' (buzor) pasi bëhet me buzë.",
        letters: "ب",
        example: "وَهُم بِالآخِرَةِ",
        exampleTranslit: "wa-hum bi-l-ākhira",
        rule: "Meem fshihet me Ghunnah para Ba."
      },
      {
        name: "Idgham Shafawi (إدغام شفوي)",
        nameAr: "إِدْغَام شَفَوِي",
        level: "mesatar",
        desc: "Bashkimi i Meem Sakinah me Meem tjetër — quhet Idgham i plotë.",
        letters: "م",
        example: "لَهُم مَّا",
        exampleTranslit: "lahum mā",
        rule: "Dy Mim bashkohen — lexohet si një Mim i zgjatur me Ghunnah."
      },
      {
        name: "Izhar Shafawi (إظهار شفوي)",
        nameAr: "إِظْهَار شَفَوِي",
        level: "fillestar",
        desc: "Shqiptimi i qartë i Meem Sakinah para të gjitha shkronjave të tjera (jo ب dhe م).",
        letters: "Të gjitha shkronjat tjera",
        example: "هُمْ يُوقِنُونَ",
        exampleTranslit: "hum yūqinūn",
        rule: "Meem shqiptohet qartë pa Ghunnah."
      },
    ]
  },
  {
    category: "madd",
    categoryLabel: "Madd — Zgjatjet",
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    rules: [
      {
        name: "Madd Tabii (مد طبيعي)",
        nameAr: "مَدّ طَبِيعِي",
        level: "fillestar",
        desc: "Zgjatja natyrale — zgjat 2 hareke. Shenjat: ا ي و pas zanores përkatëse.",
        letters: "ا ي و",
        example: "قَالَ — بِيَدَيَّ",
        exampleTranslit: "qāla — bi-yadayya",
        rule: "Zgjat 2 hareke (rreth 1 sekondë)."
      },
      {
        name: "Madd Muttasil (مد متصل)",
        nameAr: "مَدّ مُتَّصِل",
        level: "mesatar",
        desc: "Zgjatja e bashkuar — shkronja e Madd dhe Hamza janë në të njëjtën fjalë. Zgjat 4-5 hareke.",
        letters: "ء (Hamza)",
        example: "جَاءَ — سَوَاءٌ",
        exampleTranslit: "jāʾa — sawāʾun",
        rule: "Zgjat 4-5 hareke (obligative)."
      },
      {
        name: "Madd Munfasil (مد منفصل)",
        nameAr: "مَدّ مُنْفَصِل",
        level: "mesatar",
        desc: "Zgjatja e ndarë — shkronja e Madd dhe Hamza janë në dy fjalë të ndryshme. Zgjat 4-5 hareke.",
        letters: "ء",
        example: "إِنَّا أَنزَلْنَاهُ",
        exampleTranslit: "innā anzalnāhu",
        rule: "Zgjat 4-5 hareke (jo obligative)."
      },
      {
        name: "Madd Lazim (مد لازم)",
        nameAr: "مَدّ لَازِم",
        level: "avancuar",
        desc: "Zgjatja e domosdoshme — pas shkronjës Madd vjen Sukun ose Teshded (i fortë). Zgjat 6 hareke.",
        letters: "ّ (Teshded) ْ (Sukun)",
        example: "الضَّالِّينَ",
        exampleTranslit: "aḍ-ḍāllīn",
        rule: "Zgjat 6 hareke (obligative dhe e fortë)."
      },
    ]
  },
  {
    category: "qalqalah",
    categoryLabel: "Qalqalah — Dridhje",
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    rules: [
      {
        name: "Qalqalah Sughra (قلقلة صغرى)",
        nameAr: "قَلْقَلَة صُغْرَى",
        level: "fillestar",
        desc: "Dridhja e vogël — kur shkronjat e Qalqalah kanë Sukun brenda fjalës.",
        letters: "ق ط ب ج د",
        example: "يَقْطَعُ",
        exampleTranslit: "yaqṭaʿu",
        rule: "Dridhje e lehtë-mesme para shkronjave tjera."
      },
      {
        name: "Qalqalah Kubra (قلقلة كبرى)",
        nameAr: "قَلْقَلَة كُبْرَى",
        level: "fillestar",
        desc: "Dridhja e madhe — kur shkronjat e Qalqalah janë në fund të fjalës, lexohen me dridhje të fortë.",
        letters: "ق ط ب ج د",
        example: "وَالْفَلَقْ",
        exampleTranslit: "wa-l-falaq",
        rule: "Dridhje e fortë në fund të fjalës ose ajeti."
      },
    ]
  },
  {
    category: "ghunnah",
    categoryLabel: "Ghunnah — Hundëtimi",
    color: "from-teal-500 to-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    rules: [
      {
        name: "Ghunnah (غنة)",
        nameAr: "غُنَّة",
        level: "fillestar",
        desc: "Tingulli nasal (hundë) i prodhuar nga goja e mbyllur. Zgjat 2 hareke. Bëhet kur Noon ose Meem kanë Teshded.",
        letters: "نّ مّ",
        example: "إِنَّ — ثُمَّ",
        exampleTranslit: "inna — thumma",
        rule: "Zgjat 2 hareke me tingulli i hundës."
      },
    ]
  },
];

function RuleCard({ rule, bg, border }: { rule: TajweedRule; bg: string; border: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border ${border} ${bg} overflow-hidden`}>
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-foreground text-sm">{rule.name}</p>
            <p className="text-base text-foreground/80 font-semibold" style={{ fontFamily: "serif", direction: "rtl" }}>
              {rule.nameAr}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs bg-white/70 text-muted-foreground px-2 py-0.5 rounded-full font-medium">{rule.level}</span>
          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/50 px-4 py-4 bg-white/60 space-y-3">
            <p className="text-sm text-foreground/80 leading-relaxed">{rule.desc}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-xl p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1 font-semibold">Shkronjat</p>
                <p className="text-lg font-bold text-right" style={{ fontFamily: "serif", direction: "rtl" }}>{rule.letters}</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border">
                <p className="text-xs text-muted-foreground mb-1 font-semibold">Shembull</p>
                <p className="text-lg font-bold text-right" style={{ fontFamily: "serif", direction: "rtl" }}>{rule.example}</p>
                <p className="text-xs text-muted-foreground italic">{rule.exampleTranslit}</p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-xs font-bold text-amber-700 mb-1">📌 Rregulli:</p>
              <p className="text-sm text-amber-900">{rule.rule}</p>
            </div>
            <button
              onClick={() => {
                if (!window.speechSynthesis) return;
                window.speechSynthesis.cancel();
                const u = new SpeechSynthesisUtterance(rule.example);
                u.lang = "ar-SA"; u.rate = 0.5;
                const voices = window.speechSynthesis.getVoices();
                const v = voices.find(v => v.lang.startsWith("ar"));
                if (v) u.voice = v;
                window.speechSynthesis.speak(u);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg text-xs text-primary font-medium transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" /> Dëgjo Shembullin
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface Props {
  selectedLevel?: string;
  selectedCategory?: string;
}

export default function TajweedBuiltIn({ selectedLevel = "te_gjitha", selectedCategory = "te_gjitha" }: Props) {
  const filtered = RULES.filter(cat => selectedCategory === "te_gjitha" || cat.category === selectedCategory);

  return (
    <div className="space-y-8">
      {filtered.map(cat => {
        const catRules = cat.rules.filter(r => selectedLevel === "te_gjitha" || r.level === selectedLevel);
        if (catRules.length === 0) return null;
        return (
          <div key={cat.category}>
            <div className={`flex items-center gap-3 mb-4`}>
              <div className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${cat.color}`} />
              <h3 className="text-lg font-bold text-foreground">{cat.categoryLabel}</h3>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{catRules.length} rregulla</span>
            </div>
            <div className="space-y-3">
              {catRules.map((rule, i) => (
                <RuleCard key={i} rule={rule} bg={cat.bg} border={cat.border} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
