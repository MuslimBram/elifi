import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Info, ChevronDown, ChevronUp } from "lucide-react";
import { speakText } from "@/components/utils/speakAlbanian";

// ─── SHQIP GRAMMAR ────────────────────────────────────────
const SHQIP_GRAMMAR = {
  gjinia: {
    title: "Gjinia (Mashkullore / Femërore)",
    icon: "⚥",
    color: "bg-emerald-50 border-emerald-200",
    explanation: "Emrat shqip kanë dy gjini: mashkullore dhe femërore.",
    interactive: {
      label: "Ndërro gjininë:",
      pairs: [
        { m: { word: "mësuesi", note: "mashk." }, f: { word: "mësuesja", note: "fem." }, meaning: "mësuesi/ja" },
        { m: { word: "studenti", note: "mashk." }, f: { word: "studentia", note: "fem." }, meaning: "studenti/ja" },
        { m: { word: "djali", note: "mashk." }, f: { word: "vajza", note: "fem." }, meaning: "djali/vajza" },
      ]
    },
    rules: [
      "Shumë emra mashk. mbarojnë me zanore + i: libri, djali",
      "Emrat femërorë shpesh mbarojnë me -ë: vajzë, motër",
      "Mbiemrat pajtohen me gjininë: libër i mirë / grua e mirë",
    ]
  },
  numri: {
    title: "Numri (Njëjës / Shumës)",
    icon: "🔢",
    color: "bg-blue-50 border-blue-200",
    explanation: "Shumësi në shqip formohet me mbaresa të ndryshme.",
    interactive: {
      label: "Shiko shumësin:",
      pairs: [
        { s: { word: "libër", note: "njëjës" }, p: { word: "libra", note: "shumës" }, meaning: "libër/libra" },
        { s: { word: "vajzë", note: "njëjës" }, p: { word: "vajza", note: "shumës" }, meaning: "vajzë/vajza" },
        { s: { word: "mik", note: "njëjës" }, p: { word: "miq", note: "shumës" }, meaning: "mik/miq" },
      ]
    },
    rules: [
      "-ë → -a: vajzë → vajza",
      "konsonant → +e: mal → male",
      "-ër → -ra: libër → libra",
    ]
  },
  rasat: {
    title: "Rasat (Lakimi i Emrit)",
    icon: "📐",
    color: "bg-amber-50 border-amber-200",
    explanation: "Shqipja ka 5 rasa: Emërore, Gjinore, Dhanore, Kallëzore, Rrjedhore.",
    interactive: {
      label: "Kliko rasën:",
      word: "djalë",
      declension: [
        { rasa: "Emërore", form: "djali", usage: "Kush? — Djali shkon." },
        { rasa: "Gjinore", form: "djalit", usage: "I kujt? — Libri i djalit." },
        { rasa: "Dhanore", form: "djalit", usage: "Kujt? — I jap djalit." },
        { rasa: "Kallëzore", form: "djalin", usage: "Kë? — Shoh djalin." },
        { rasa: "Rrjedhore", form: "djalit", usage: "Prej kujt? — Prej djalit." },
      ]
    },
    rules: [
      "Emërorja: subjekti kryesor i fjalisë",
      "Gjinorja: tregon përkatësi (i/e/të/së)",
      "Kallëzorja: objekti direkt i foljes",
    ]
  }
};

// ─── ANGLISHT GRAMMAR ─────────────────────────────────────
const ANGLISHT_GRAMMAR = {
  articles: {
    title: "Nyjat (A / An / The)",
    icon: "📌",
    color: "bg-sky-50 border-sky-200",
    explanation: "Anglishtja ka nyje të pacaktuar (a/an) dhe të caktuar (the).",
    interactive: {
      label: "Provoni nyjat:",
      pairs: [
        { s: { word: "a cat", note: "konsonant" }, p: { word: "the cat", note: "e caktuar" }, meaning: "macja" },
        { s: { word: "an apple", note: "zanore" }, p: { word: "the apple", note: "e caktuar" }, meaning: "molla" },
      ]
    },
    rules: [
      "a + konsonant: a dog, a book",
      "an + zanore: an egg, an orange",
      "the: i/e njohur nga konteksti",
    ]
  },
  numri: {
    title: "Shumësi i Emrave",
    icon: "🔢",
    color: "bg-indigo-50 border-indigo-200",
    explanation: "Shumësi formohet kryesisht me +(e)s.",
    interactive: {
      label: "Shiko shumësin:",
      pairs: [
        { s: { word: "book", note: "rregullt" }, p: { word: "books", note: "+s" }, meaning: "libër/libra" },
        { s: { word: "child", note: "parregullt" }, p: { word: "children", note: "ndryshim" }, meaning: "fëmijë" },
        { s: { word: "man", note: "parregullt" }, p: { word: "men", note: "ndryshim" }, meaning: "burrë" },
      ]
    },
    rules: [
      "+s: dogs, cats, books",
      "+es: churches, boxes",
      "Parregullt: man→men, child→children",
    ]
  },
};

// ─── ARABISHT GRAMMAR ─────────────────────────────────────
const ARABISHT_GRAMMAR = {
  gjinia: {
    title: "Gjinia Gramatikore (مذكر / مؤنث)",
    icon: "⚥",
    color: "bg-rose-50 border-rose-200",
    explanation: "Arabishtja ka dy gjini: Mashkullore (مذكر) dhe Femërore (مؤنث). Femërorja zakonisht shënohet me Ta Marbuta (ة).",
    interactive: {
      label: "Ndërro gjininë:",
      pairs: [
        { s: { word: "مُعَلِّم", note: "mësuesi (mashk.)" }, p: { word: "مُعَلِّمَة", note: "mësuesja (fem.)" }, meaning: "mësues" },
        { s: { word: "طَالِب", note: "student (mashk.)" }, p: { word: "طَالِبَة", note: "studente (fem.)" }, meaning: "student" },
      ]
    },
    rules: [
      "Femërorja: shto ة (Ta Marbuta)",
      "Mashkullorja: pa shenjë të veçantë",
      "Mbiemri pajtohet me gjininë e emrit",
    ]
  },
  fatha_rules: {
    title: "🔴 Fatha — Kur lexohet 'A' dhe jo 'E'",
    icon: "🔠",
    color: "bg-orange-50 border-orange-200",
    explanation: "Fatha normalisht lexohet si 'e'. Por pas germave trasha (حروف مستعلية) dhe R (ر), fatha lexohet si 'A' e hapur.",
    interactive: {
      label: "Krahaso shqiptimin:",
      pairs: [
        { s: { word: "بَ", note: "Ba → 'be'" }, p: { word: "رَ", note: "Ra → 'RA'" }, meaning: "b vs R" },
        { s: { word: "كَ", note: "Ka → 'ke'" }, p: { word: "طَ", note: "Taa → 'TA'" }, meaning: "k vs ط" },
      ]
    },
    rules: [
      "Germët trasha: ص ض ط ظ خ غ ق — fatha = 'A'",
      "Germa ر (Ra): gjithmonë fatha = 'RA' e ngrohtë",
      "Pas germave të buta (ب ت ن): fatha = 'e' e lehtë",
    ]
  },
};

interface GrammarSection {
  title: string;
  icon: string;
  color: string;
  explanation: string;
  interactive: {
    label: string;
    pairs?: any[];
    word?: string;
    declension?: any[];
  };
  rules: string[];
}

function GrammarCard({ section }: { section: GrammarSection }) {
  const [expanded, setExpanded] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className={`rounded-2xl border ${section.color} overflow-hidden`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{section.icon}</span>
          <h3 className="font-bold text-foreground text-sm">{section.title}</h3>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4 space-y-3"
          >
            <p className="text-sm text-foreground/70">{section.explanation}</p>

            {section.interactive.pairs && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">{section.interactive.label}</p>
                <div className="flex gap-2 flex-wrap">
                  {section.interactive.pairs.map((pair: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeIdx === i ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground/70"
                      }`}
                    >
                      {pair.meaning || pair.m?.word || pair.s?.word || `#${i + 1}`}
                    </button>
                  ))}
                </div>
                {section.interactive.pairs[activeIdx] && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {Object.entries(section.interactive.pairs[activeIdx])
                      .filter(([key]) => key !== "meaning")
                      .map(([key, val]: [string, any]) => (
                        <div key={key} className="bg-card rounded-xl p-3 border border-border text-center">
                          <p className="font-bold text-foreground text-lg">{val.word}</p>
                          <p className="text-xs text-muted-foreground">{val.note}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {section.interactive.declension && (
              <div className="space-y-2">
                {section.interactive.declension.map((d: any, i: number) => (
                  <div key={i} className="bg-card rounded-xl p-3 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-primary">{d.rasa}</p>
                      <p className="text-sm text-foreground font-semibold">{d.form}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{d.usage}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-card rounded-xl p-3 border border-border">
              <p className="text-xs font-bold text-primary mb-2">📌 Rregullat:</p>
              <ul className="space-y-1">
                {section.rules.map((r, i) => (
                  <li key={i} className="text-xs text-foreground/70 flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface Props {
  language: string;
}

export default function GrammarRulesView({ language }: Props) {
  const grammar = language === "arabisht"
    ? ARABISHT_GRAMMAR
    : language === "anglisht"
    ? ANGLISHT_GRAMMAR
    : SHQIP_GRAMMAR;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Rregullat Gramatikore</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Mëso rregullat kryesore të gjuhës {language === "arabisht" ? "arabe" : language === "anglisht" ? "angleze" : "shqipe"} me shembuj interaktivë.
      </p>
      {Object.values(grammar).map((section, i) => (
        <GrammarCard key={i} section={section as GrammarSection} />
      ))}
    </div>
  );
}
