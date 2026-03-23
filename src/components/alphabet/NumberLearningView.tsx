import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, ChevronLeft, ChevronRight, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NumberItem {
  num: number;
  word: string;
  ordinal: string;
  pronunciation: string;
  transliteration?: string;
}

const NUMBERS: Record<string, NumberItem[]> = {
  shqip: [
    { num: 0, word: "zero", ordinal: "i zerët", pronunciation: "ze-ro" },
    { num: 1, word: "një", ordinal: "i parë", pronunciation: "një" },
    { num: 2, word: "dy", ordinal: "i dytë", pronunciation: "dy" },
    { num: 3, word: "tre", ordinal: "i tretë", pronunciation: "tre" },
    { num: 4, word: "katër", ordinal: "i katërt", pronunciation: "ka-tër" },
    { num: 5, word: "pesë", ordinal: "i pestë", pronunciation: "pe-së" },
    { num: 6, word: "gjashtë", ordinal: "i gjashtë", pronunciation: "gjash-të" },
    { num: 7, word: "shtatë", ordinal: "i shtatë", pronunciation: "shta-të" },
    { num: 8, word: "tetë", ordinal: "i tetë", pronunciation: "te-të" },
    { num: 9, word: "nëntë", ordinal: "i nëntë", pronunciation: "nën-të" },
    { num: 10, word: "dhjetë", ordinal: "i dhjetë", pronunciation: "dhje-të" },
    { num: 11, word: "njëmbëdhjetë", ordinal: "i njëmbëdhjetë", pronunciation: "njëm-bë-dhje-të" },
    { num: 12, word: "dymbëdhjetë", ordinal: "i dymbëdhjetë", pronunciation: "dym-bë-dhje-të" },
    { num: 20, word: "njëzet", ordinal: "i njëzetë", pronunciation: "një-zet" },
    { num: 100, word: "njëqind", ordinal: "i njëqindtë", pronunciation: "një-qind" },
  ],
  anglisht: [
    { num: 0, word: "zero", ordinal: "zeroth", pronunciation: "ZEE-roh" },
    { num: 1, word: "one", ordinal: "first", pronunciation: "wun" },
    { num: 2, word: "two", ordinal: "second", pronunciation: "too" },
    { num: 3, word: "three", ordinal: "third", pronunciation: "three" },
    { num: 4, word: "four", ordinal: "fourth", pronunciation: "for" },
    { num: 5, word: "five", ordinal: "fifth", pronunciation: "fayv" },
    { num: 6, word: "six", ordinal: "sixth", pronunciation: "siks" },
    { num: 7, word: "seven", ordinal: "seventh", pronunciation: "SEV-en" },
    { num: 8, word: "eight", ordinal: "eighth", pronunciation: "ayt" },
    { num: 9, word: "nine", ordinal: "ninth", pronunciation: "nayn" },
    { num: 10, word: "ten", ordinal: "tenth", pronunciation: "ten" },
    { num: 11, word: "eleven", ordinal: "eleventh", pronunciation: "ih-LEV-en" },
    { num: 12, word: "twelve", ordinal: "twelfth", pronunciation: "twelv" },
    { num: 20, word: "twenty", ordinal: "twentieth", pronunciation: "TWEN-tee" },
    { num: 100, word: "one hundred", ordinal: "hundredth", pronunciation: "wun HUN-dred" },
  ],
  arabisht: [
    { num: 0, word: "صِفْر", ordinal: "الصِّفْر", pronunciation: "sifr", transliteration: "sifr" },
    { num: 1, word: "وَاحِد", ordinal: "الأَوَّل", pronunciation: "wāhid", transliteration: "wāhid" },
    { num: 2, word: "اِثْنَان", ordinal: "الثَّانِي", pronunciation: "ithnān", transliteration: "ithnān" },
    { num: 3, word: "ثَلَاثَة", ordinal: "الثَّالِث", pronunciation: "thalātha", transliteration: "thalātha" },
    { num: 4, word: "أَرْبَعَة", ordinal: "الرَّابِع", pronunciation: "arba'a", transliteration: "arba'a" },
    { num: 5, word: "خَمْسَة", ordinal: "الخَامِس", pronunciation: "khamsa", transliteration: "khamsa" },
    { num: 6, word: "سِتَّة", ordinal: "السَّادِس", pronunciation: "sitta", transliteration: "sitta" },
    { num: 7, word: "سَبْعَة", ordinal: "السَّابِع", pronunciation: "sab'a", transliteration: "sab'a" },
    { num: 8, word: "ثَمَانِيَة", ordinal: "الثَّامِن", pronunciation: "thamāniya", transliteration: "thamāniya" },
    { num: 9, word: "تِسْعَة", ordinal: "التَّاسِع", pronunciation: "tis'a", transliteration: "tis'a" },
    { num: 10, word: "عَشَرَة", ordinal: "العَاشِر", pronunciation: "'ashara", transliteration: "'ashara" },
    { num: 20, word: "عِشْرُون", ordinal: "العِشْرُون", pronunciation: "'ishrūn", transliteration: "'ishrūn" },
    { num: 100, word: "مِئَة", ordinal: "المِئَة", pronunciation: "mi'a", transliteration: "mi'a" },
  ],
};

function speakWord(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const langCode = lang === "arabisht" ? "ar" : lang === "anglisht" ? "en-US" : "sq";
  const u = new SpeechSynthesisUtterance(text);
  u.lang = langCode;
  u.rate = 0.65;
  window.speechSynthesis.speak(u);
}

interface Props {
  language: string;
}

export default function NumberLearningView({ language }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOrdinal, setShowOrdinal] = useState(false);

  const nums = NUMBERS[language] || NUMBERS.shqip;
  const item = nums[currentIndex];

  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, nums.length - 1));
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="space-y-6">
      {/* Number grid */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {nums.map((n, idx) => (
          <button
            key={n.num}
            onClick={() => setCurrentIndex(idx)}
            className={`p-3 rounded-xl text-center font-bold transition-all ${
              idx === currentIndex
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "glass-card text-foreground hover:shadow-md hover:-translate-y-0.5"
            }`}
          >
            <span className="text-lg">{n.num}</span>
          </button>
        ))}
      </div>

      {/* Detail card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.num}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" onClick={goPrev} disabled={currentIndex === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="text-center">
              <p className="text-6xl font-bold text-primary mb-2">{item.num}</p>
              <p className="text-2xl font-semibold text-foreground" dir={language === "arabisht" ? "rtl" : "ltr"}>
                {item.word}
              </p>
              {item.transliteration && (
                <p className="text-sm text-muted-foreground italic mt-1">{item.transliteration}</p>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={goNext} disabled={currentIndex === nums.length - 1}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Pronunciation */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-sm text-muted-foreground">Shqiptimi: <strong>{item.pronunciation}</strong></span>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => speakWord(item.word, language)}
            >
              <Volume2 className="w-4 h-4 mr-1" /> Dëgjo
            </Button>
          </div>

          {/* Ordinal toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowOrdinal(!showOrdinal)}
              className="text-sm text-primary hover:underline font-medium"
            >
              {showOrdinal ? "Fshih rreshtorin" : "Shiko rreshtorin (ordinal)"}
            </button>
            {showOrdinal && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-lg font-semibold text-foreground"
                dir={language === "arabisht" ? "rtl" : "ltr"}
              >
                {item.ordinal}
              </motion.p>
            )}
          </div>

          {/* Progress */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Hash className="w-3 h-3" />
            {currentIndex + 1} / {nums.length}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
