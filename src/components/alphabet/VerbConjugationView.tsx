import React, { useState } from "react";
import { Volume2, ChevronDown } from "lucide-react";

interface Conjugation {
  [person: string]: string;
}

interface Verb {
  verb: string;
  meaning: string;
  arabic: string;
  tenses: Record<string, Conjugation>;
  persons: string[];
  personLabels: Record<string, string>;
}

const SHQIP_PERSONS = ["une", "ti_m", "ti_f", "ai", "ajo", "ne", "ju_m", "ju_f", "ata", "ato"];
const SHQIP_LABELS: Record<string, string> = {
  une: "Unë", ti_m: "Ti (m)", ti_f: "Ti (f)", ai: "Ai", ajo: "Ajo",
  ne: "Ne", ju_m: "Ju (m)", ju_f: "Ju (f)", ata: "Ata", ato: "Ato",
};

const SHQIP_VERBS: Verb[] = [
  {
    verb: "jam", meaning: "to be", arabic: "كَانَ",
    persons: SHQIP_PERSONS, personLabels: SHQIP_LABELS,
    tenses: {
      "E Tashme": { une: "jam", ti_m: "je", ti_f: "je", ai: "është", ajo: "është", ne: "jemi", ju_m: "jeni", ju_f: "jeni", ata: "janë", ato: "janë" },
      "E Shkuar": { une: "isha", ti_m: "ishe", ti_f: "ishe", ai: "ishte", ajo: "ishte", ne: "ishim", ju_m: "ishit", ju_f: "ishit", ata: "ishin", ato: "ishin" },
      "E Ardhme": { une: "do të jem", ti_m: "do të jesh", ti_f: "do të jesh", ai: "do të jetë", ajo: "do të jetë", ne: "do të jemi", ju_m: "do të jeni", ju_f: "do të jeni", ata: "do të jenë", ato: "do të jenë" },
    },
  },
  {
    verb: "kam", meaning: "to have", arabic: "مَلَكَ",
    persons: SHQIP_PERSONS, personLabels: SHQIP_LABELS,
    tenses: {
      "E Tashme": { une: "kam", ti_m: "ke", ti_f: "ke", ai: "ka", ajo: "ka", ne: "kemi", ju_m: "keni", ju_f: "keni", ata: "kanë", ato: "kanë" },
      "E Shkuar": { une: "pata", ti_m: "pate", ti_f: "pate", ai: "pati", ajo: "pati", ne: "patëm", ju_m: "patët", ju_f: "patët", ata: "patën", ato: "patën" },
      "E Ardhme": { une: "do të kem", ti_m: "do të kesh", ti_f: "do të kesh", ai: "do të ketë", ajo: "do të ketë", ne: "do të kemi", ju_m: "do të keni", ju_f: "do të keni", ata: "do të kenë", ato: "do të kenë" },
    },
  },
  {
    verb: "shkoj", meaning: "to go", arabic: "ذَهَبَ",
    persons: SHQIP_PERSONS, personLabels: SHQIP_LABELS,
    tenses: {
      "E Tashme": { une: "shkoj", ti_m: "shkon", ti_f: "shkon", ai: "shkon", ajo: "shkon", ne: "shkojmë", ju_m: "shkoni", ju_f: "shkoni", ata: "shkojnë", ato: "shkojnë" },
      "E Shkuar": { une: "shkova", ti_m: "shkove", ti_f: "shkove", ai: "shkoi", ajo: "shkoi", ne: "shkuam", ju_m: "shkuat", ju_f: "shkuat", ata: "shkuan", ato: "shkuan" },
      "E Ardhme": { une: "do të shkoj", ti_m: "do të shkosh", ti_f: "do të shkosh", ai: "do të shkojë", ajo: "do të shkojë", ne: "do të shkojmë", ju_m: "do të shkoni", ju_f: "do të shkoni", ata: "do të shkojnë", ato: "do të shkojnë" },
    },
  },
  {
    verb: "lexoj", meaning: "to read", arabic: "قَرَأَ",
    persons: SHQIP_PERSONS, personLabels: SHQIP_LABELS,
    tenses: {
      "E Tashme": { une: "lexoj", ti_m: "lexon", ti_f: "lexon", ai: "lexon", ajo: "lexon", ne: "lexojmë", ju_m: "lexoni", ju_f: "lexoni", ata: "lexojnë", ato: "lexojnë" },
      "E Shkuar": { une: "lexova", ti_m: "lexove", ti_f: "lexove", ai: "lexoi", ajo: "lexoi", ne: "lexuam", ju_m: "lexuat", ju_f: "lexuat", ata: "lexuan", ato: "lexuan" },
      "E Ardhme": { une: "do të lexoj", ti_m: "do të lexosh", ti_f: "do të lexosh", ai: "do të lexojë", ajo: "do të lexojë", ne: "do të lexojmë", ju_m: "do të lexoni", ju_f: "do të lexoni", ata: "do të lexojnë", ato: "do të lexojnë" },
    },
  },
  {
    verb: "bëj", meaning: "to do/make", arabic: "فَعَلَ",
    persons: SHQIP_PERSONS, personLabels: SHQIP_LABELS,
    tenses: {
      "E Tashme": { une: "bëj", ti_m: "bën", ti_f: "bën", ai: "bën", ajo: "bën", ne: "bëjmë", ju_m: "bëni", ju_f: "bëni", ata: "bëjnë", ato: "bëjnë" },
      "E Shkuar": { une: "bëra", ti_m: "bëre", ti_f: "bëre", ai: "bëri", ajo: "bëri", ne: "bëmë", ju_m: "bëtë", ju_f: "bëtë", ata: "bënë", ato: "bënë" },
      "E Ardhme": { une: "do të bëj", ti_m: "do të bësh", ti_f: "do të bësh", ai: "do të bëjë", ajo: "do të bëjë", ne: "do të bëjmë", ju_m: "do të bëni", ju_f: "do të bëni", ata: "do të bëjnë", ato: "do të bëjnë" },
    },
  },
];

function speak(text: string, lang = "sq-AL") {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.75;
  window.speechSynthesis.speak(u);
}

export default function VerbConjugationView() {
  const [selectedVerb, setSelectedVerb] = useState(0);
  const [selectedTense, setSelectedTense] = useState("E Tashme");
  const [expandedVerb, setExpandedVerb] = useState<number | null>(0);

  const verb = SHQIP_VERBS[selectedVerb];
  const tenses = Object.keys(verb.tenses);

  return (
    <div className="space-y-6">
      {/* Verb selector */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">✏️ Zgjedhimi i Foljeve</h3>
        <div className="flex flex-wrap gap-2">
          {SHQIP_VERBS.map((v, i) => (
            <button
              key={v.verb}
              onClick={() => { setSelectedVerb(i); setExpandedVerb(i); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedVerb === i
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "glass-card text-foreground hover:shadow-sm"
              }`}
            >
              {v.verb} <span className="text-xs opacity-70">({v.meaning})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tense selector */}
      <div className="flex gap-2">
        {tenses.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTense(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTense === t
                ? "bg-accent text-accent-foreground shadow-md"
                : "glass-card text-foreground/70"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Conjugation table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Vetë</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">{selectedTense}</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {verb.persons.map((person, i) => (
                <tr key={person} className={`border-b border-border ${i % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}>
                  <td className="px-4 py-3 font-semibold text-foreground">{verb.personLabels[person]}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{verb.tenses[selectedTense][person]}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => speak(verb.tenses[selectedTense][person])} className="text-primary hover:text-primary/80">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Arabic equivalent */}
      <div className="glass-card rounded-xl p-4 text-center">
        <p className="text-sm text-muted-foreground">Ekuivalenti në arabisht:</p>
        <p className="text-2xl font-bold text-primary mt-1" dir="rtl">{verb.arabic}</p>
      </div>
    </div>
  );
}
