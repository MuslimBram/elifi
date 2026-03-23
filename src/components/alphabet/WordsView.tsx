import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WordItem {
  word: string;
  meaning: string;
  translation: string;
  emoji: string;
}

const WORDS_DATA: Record<string, WordItem[]> = {
  shqip: [
    { word: "BU-KË", meaning: "bukë", translation: "bread", emoji: "🍞" },
    { word: "MA-MÄ", meaning: "mamë", translation: "mom", emoji: "👩" },
    { word: "BA-BÄ", meaning: "babë", translation: "dad", emoji: "👨" },
    { word: "DI-ELL", meaning: "diell", translation: "sun", emoji: "☀️" },
    { word: "HÄN-Ä", meaning: "hënë", translation: "moon", emoji: "🌙" },
    { word: "LI-BËR", meaning: "libër", translation: "book", emoji: "📚" },
    { word: "MA-KI-NÄ", meaning: "makinë", translation: "car", emoji: "🚗" },
    { word: "NA-TÄ", meaning: "natë", translation: "night", emoji: "🌃" },
    { word: "SHTE-PI", meaning: "shtëpi", translation: "house", emoji: "🏠" },
    { word: "U-JÄ", meaning: "ujë", translation: "water", emoji: "💧" },
    { word: "VE-ZÄ", meaning: "vezë", translation: "egg", emoji: "🥚" },
    { word: "ZO-GU", meaning: "zogu", translation: "bird", emoji: "🐦" },
    { word: "KA-FÄ", meaning: "kafë", translation: "coffee", emoji: "☕" },
    { word: "LU-LE", meaning: "lule", translation: "flower", emoji: "🌸" },
    { word: "PE-MÄ", meaning: "pemë", translation: "tree", emoji: "🌳" },
    { word: "SHI", meaning: "shi", translation: "rain", emoji: "🌧️" },
    { word: "YLL", meaning: "yll", translation: "star", emoji: "⭐" },
    { word: "ZJA-RR", meaning: "zjarr", translation: "fire", emoji: "🔥" },
    { word: "GUR", meaning: "gur", translation: "stone", emoji: "🪨" },
    { word: "FJA-LÄ", meaning: "fjalë", translation: "word", emoji: "💬" },
  ],
  anglisht: [
    { word: "BOOK", meaning: "book", translation: "libër", emoji: "📚" },
    { word: "SUN", meaning: "sun", translation: "diell", emoji: "☀️" },
    { word: "MOON", meaning: "moon", translation: "hënë", emoji: "🌙" },
    { word: "HOUSE", meaning: "house", translation: "shtëpi", emoji: "🏠" },
    { word: "WA-TER", meaning: "water", translation: "ujë", emoji: "💧" },
    { word: "BIRD", meaning: "bird", translation: "zog", emoji: "🐦" },
    { word: "TREE", meaning: "tree", translation: "pemë", emoji: "🌳" },
    { word: "RAIN", meaning: "rain", translation: "shi", emoji: "🌧️" },
    { word: "STAR", meaning: "star", translation: "yll", emoji: "⭐" },
    { word: "FIRE", meaning: "fire", translation: "zjarr", emoji: "🔥" },
    { word: "FLOW-ER", meaning: "flower", translation: "lule", emoji: "🌸" },
    { word: "NIGHT", meaning: "night", translation: "natë", emoji: "🌃" },
  ],
  arabisht: [
    { word: "كِتَاب", meaning: "kitaab", translation: "libër/book", emoji: "📚" },
    { word: "شَمْس", meaning: "shams", translation: "diell/sun", emoji: "☀️" },
    { word: "قَمَر", meaning: "qamar", translation: "hënë/moon", emoji: "🌙" },
    { word: "بَيْت", meaning: "bayt", translation: "shtëpi/house", emoji: "🏠" },
    { word: "مَاء", meaning: "maa'", translation: "ujë/water", emoji: "💧" },
    { word: "شَجَرَة", meaning: "shajarah", translation: "pemë/tree", emoji: "🌳" },
    { word: "نَجْم", meaning: "najm", translation: "yll/star", emoji: "⭐" },
    { word: "نَار", meaning: "naar", translation: "zjarr/fire", emoji: "🔥" },
    { word: "وَرْدَة", meaning: "wardah", translation: "lule/flower", emoji: "🌸" },
    { word: "مَسْجِد", meaning: "masjid", translation: "xhami/mosque", emoji: "🕌" },
    { word: "قَلَم", meaning: "qalam", translation: "laps/pen", emoji: "✏️" },
    { word: "مَدْرَسَة", meaning: "madrasah", translation: "shkollë/school", emoji: "🏫" },
  ],
};

function speakText(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const langCode = lang === "arabisht" ? "ar" : lang === "anglisht" ? "en-US" : "sq";
  const u = new SpeechSynthesisUtterance(text);
  u.lang = langCode;
  u.rate = 0.6;
  window.speechSynthesis.speak(u);
}

export default function WordsView({ language }: { language: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = WORDS_DATA[language] || WORDS_DATA.shqip;
  const item = words[currentIndex];
  const isArabic = language === "arabisht";

  return (
    <div className="space-y-6">
      {/* Word grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {words.map((w, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`p-3 rounded-xl text-center transition-all ${
              idx === currentIndex
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "glass-card text-foreground hover:shadow-md"
            }`}
          >
            <span className="text-2xl block mb-1">{w.emoji}</span>
            <span className="text-xs font-medium truncate block">{w.meaning}</span>
          </button>
        ))}
      </div>

      {/* Detail card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="text-center">
              <span className="text-6xl block mb-3">{item.emoji}</span>
              <p className="text-3xl font-bold text-foreground mb-1" dir={isArabic ? "rtl" : "ltr"}>
                {item.word}
              </p>
              <p className="text-sm text-muted-foreground">{item.meaning}</p>
              <p className="text-xs text-primary mt-1">({item.translation})</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrentIndex(Math.min(words.length - 1, currentIndex + 1))} disabled={currentIndex === words.length - 1}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={() => speakText(item.meaning, language)}
            >
              <Volume2 className="w-4 h-4 mr-2" /> Dëgjo Fjalën
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            {currentIndex + 1} / {words.length}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
