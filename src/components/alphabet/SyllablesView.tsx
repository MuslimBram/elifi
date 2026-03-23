import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const HAREKET = [
  { symbol: "بَ", name: "Fatha", sound: "a / e (i shkurtër)", tip: "Vizë e vogël sipër germës → lexohet 'a'" },
  { symbol: "بِ", name: "Kasra", sound: "i (i shkurtër)", tip: "Vizë e vogël poshtë germës → lexohet 'i'" },
  { symbol: "بُ", name: "Damma", sound: "u (i shkurtër)", tip: "Kërpudhë e vogël sipër → lexohet 'u'" },
  { symbol: "بَا", name: "Alif (Madd)", sound: "ea / aa (i gjatë)", tip: "Fatha + Alif → tingulli 'ea' zgjatet 2 beat" },
  { symbol: "بِي", name: "Ya (Madd)", sound: "ii (i gjatë)", tip: "Kasra + Ya → tingulli 'ii' zgjatet 2 beat" },
  { symbol: "بُو", name: "Waw (Madd)", sound: "uu (i gjatë)", tip: "Damma + Waw → tingulli 'uu' zgjatet 2 beat" },
  { symbol: "بً", name: "Tanwin Fatha", sound: "en (fundore)", tip: "Dy fatha → lexohet '-en' në fund të fjalës" },
  { symbol: "بٍ", name: "Tanwin Kasra", sound: "in (fundore)", tip: "Dy kasra → lexohet '-in' në fund të fjalës" },
  { symbol: "بٌ", name: "Tanwin Damma", sound: "un (fundore)", tip: "Dy damma → lexohet '-un' në fund të fjalës" },
  { symbol: "بْ", name: "Sukun (ـْ)", sound: "pa vokal (i qetë)", tip: "Rreth i vogël → asnjë vokal, germë e qetë" },
  { symbol: "بَّ", name: "Shadda (ّ)", sound: "dyfishim germës", tip: "W e vogël → germë e dyfishuar" },
];

const ALL_ARABIC_LETTERS = [
  "ا","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي"
];

const ALBANIAN_SYLLABLES = [
  { syllable: "BA", pronunciation: "ba" }, { syllable: "BE", pronunciation: "be" },
  { syllable: "BI", pronunciation: "bi" }, { syllable: "BO", pronunciation: "bo" },
  { syllable: "BU", pronunciation: "bu" }, { syllable: "CA", pronunciation: "tsa" },
  { syllable: "DA", pronunciation: "da" }, { syllable: "DE", pronunciation: "de" },
  { syllable: "FA", pronunciation: "fa" }, { syllable: "GA", pronunciation: "ga" },
  { syllable: "HA", pronunciation: "ha" }, { syllable: "JA", pronunciation: "ja" },
  { syllable: "KA", pronunciation: "ka" }, { syllable: "LA", pronunciation: "la" },
  { syllable: "MA", pronunciation: "ma" }, { syllable: "NA", pronunciation: "na" },
  { syllable: "PA", pronunciation: "pa" }, { syllable: "RA", pronunciation: "ra" },
  { syllable: "SA", pronunciation: "sa" }, { syllable: "SHA", pronunciation: "sha" },
  { syllable: "TA", pronunciation: "ta" }, { syllable: "VA", pronunciation: "va" },
  { syllable: "ZA", pronunciation: "za" }, { syllable: "GJA", pronunciation: "gja" },
  { syllable: "NJA", pronunciation: "nja" }, { syllable: "XHA", pronunciation: "dʒa" },
];

const ENGLISH_SYLLABLES = [
  { syllable: "BA", pronunciation: "bæ" }, { syllable: "BE", pronunciation: "biː" },
  { syllable: "BI", pronunciation: "baɪ" }, { syllable: "BO", pronunciation: "boʊ" },
  { syllable: "BU", pronunciation: "buː" }, { syllable: "CA", pronunciation: "kæ" },
  { syllable: "DA", pronunciation: "dæ" }, { syllable: "FA", pronunciation: "fæ" },
  { syllable: "GA", pronunciation: "gæ" }, { syllable: "HA", pronunciation: "hæ" },
  { syllable: "KA", pronunciation: "kæ" }, { syllable: "LA", pronunciation: "læ" },
  { syllable: "MA", pronunciation: "mæ" }, { syllable: "NA", pronunciation: "næ" },
  { syllable: "PA", pronunciation: "pæ" }, { syllable: "RA", pronunciation: "ræ" },
  { syllable: "SA", pronunciation: "sæ" }, { syllable: "THA", pronunciation: "θæ" },
  { syllable: "SH", pronunciation: "ʃ" }, { syllable: "CH", pronunciation: "tʃ" },
];

function speakText(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const langCode = lang === "arabisht" ? "ar" : lang === "anglisht" ? "en-US" : "sq";
  const u = new SpeechSynthesisUtterance(text);
  u.lang = langCode;
  u.rate = 0.6;
  window.speechSynthesis.speak(u);
}

interface Props {
  language: string;
}

export default function SyllablesView({ language }: Props) {
  const [selectedLetter, setSelectedLetter] = useState("ب");
  const [expandedHareke, setExpandedHareke] = useState<number | null>(null);

  if (language === "arabisht") {
    const generateSyllables = (letter: string) => [
      { syllable: letter + "َ", pronunciation: letter + "a (fatha)" },
      { syllable: letter + "ِ", pronunciation: letter + "i (kasra)" },
      { syllable: letter + "ُ", pronunciation: letter + "u (damma)" },
      { syllable: letter + "َا", pronunciation: letter + "aa (madd)" },
      { syllable: letter + "ِي", pronunciation: letter + "ii (madd)" },
      { syllable: letter + "ُو", pronunciation: letter + "uu (madd)" },
      { syllable: letter + "ْ", pronunciation: letter + "° (sukun)" },
    ];

    const syllables = generateSyllables(selectedLetter);

    return (
      <div className="space-y-6">
        {/* Hareket section */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">🎵 Hareket — Shenjat e Vokaleve</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {HAREKET.map((h, i) => (
              <button
                key={i}
                onClick={() => setExpandedHareke(expandedHareke === i ? null : i)}
                className="glass-card rounded-xl p-4 text-left hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-primary" dir="rtl">{h.symbol}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{h.name}</p>
                    <p className="text-xs text-muted-foreground">{h.sound}</p>
                  </div>
                </div>
                {expandedHareke === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 flex items-start gap-2 text-xs text-primary bg-secondary rounded-lg p-2"
                  >
                    <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    {h.tip}
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Letter selector */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Zgjedh germën për rrokje</h3>
          <div className="flex flex-wrap gap-2 mb-6" dir="rtl">
            {ALL_ARABIC_LETTERS.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLetter(l)}
                className={`w-10 h-10 rounded-lg font-bold text-lg transition-all ${
                  selectedLetter === l
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "glass-card text-foreground hover:shadow-sm"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {syllables.map((s, i) => (
              <button
                key={i}
                onClick={() => speakText(s.syllable, "arabisht")}
                className="glass-card rounded-xl p-4 text-center hover:shadow-md transition-all group"
              >
                <p className="text-2xl font-bold text-foreground mb-1" dir="rtl">{s.syllable}</p>
                <p className="text-xs text-muted-foreground">{s.pronunciation}</p>
                <Volume2 className="w-3 h-3 text-primary mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Albanian or English
  const syllables = language === "anglisht" ? ENGLISH_SYLLABLES : ALBANIAN_SYLLABLES;

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">
        🎵 Rrokjet {language === "anglisht" ? "në Anglisht" : "në Shqip"}
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {syllables.map((s, i) => (
          <button
            key={i}
            onClick={() => speakText(s.syllable, language)}
            className="glass-card rounded-xl p-4 text-center hover:shadow-md transition-all group"
          >
            <p className="text-xl font-bold text-foreground mb-1">{s.syllable}</p>
            <p className="text-xs text-muted-foreground">{s.pronunciation}</p>
            <Volume2 className="w-3 h-3 text-primary mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}
