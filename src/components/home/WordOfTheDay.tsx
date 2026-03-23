import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, RefreshCw } from "lucide-react";

const WORDS = [
  { sq: "Shokë", en: "Friend", ar: "صَدِيق", translit: "Sadiq" },
  { sq: "Diell", en: "Sun", ar: "شَمْس", translit: "Shams" },
  { sq: "Ujë", en: "Water", ar: "مَاء", translit: "Ma'" },
  { sq: "Libër", en: "Book", ar: "كِتَاب", translit: "Kitab" },
  { sq: "Shkollë", en: "School", ar: "مَدْرَسَة", translit: "Madrasa" },
  { sq: "Shtëpi", en: "House", ar: "بَيْت", translit: "Bayt" },
  { sq: "Zemër", en: "Heart", ar: "قَلْب", translit: "Qalb" },
  { sq: "Dritë", en: "Light", ar: "نُور", translit: "Nur" },
  { sq: "Qiell", en: "Sky", ar: "سَمَاء", translit: "Sama'" },
  { sq: "Tokë", en: "Earth", ar: "أَرْض", translit: "Ard" },
  { sq: "Fëmijë", en: "Child", ar: "طِفْل", translit: "Tifl" },
  { sq: "Mësues", en: "Teacher", ar: "مُعَلِّم", translit: "Mu'allim" },
  { sq: "Paqe", en: "Peace", ar: "سَلَام", translit: "Salam" },
  { sq: "Dashuri", en: "Love", ar: "حُبّ", translit: "Hubb" },
  { sq: "Dije", en: "Knowledge", ar: "عِلْم", translit: "'Ilm" },
  { sq: "Falënderim", en: "Gratitude", ar: "شُكْر", translit: "Shukr" },
  { sq: "Durim", en: "Patience", ar: "صَبْر", translit: "Sabr" },
  { sq: "Besim", en: "Faith", ar: "إِيمَان", translit: "Iman" },
  { sq: "Lutje", en: "Prayer", ar: "دُعَاء", translit: "Du'a" },
  { sq: "Mëshirë", en: "Mercy", ar: "رَحْمَة", translit: "Rahma" },
  { sq: "Yll", en: "Star", ar: "نَجْم", translit: "Najm" },
  { sq: "Det", en: "Sea", ar: "بَحْر", translit: "Bahr" },
  { sq: "Mal", en: "Mountain", ar: "جَبَل", translit: "Jabal" },
  { sq: "Pemë", en: "Tree", ar: "شَجَرَة", translit: "Shajara" },
  { sq: "Lule", en: "Flower", ar: "زَهْرَة", translit: "Zahra" },
  { sq: "Hënë", en: "Moon", ar: "قَمَر", translit: "Qamar" },
  { sq: "Natë", en: "Night", ar: "لَيْل", translit: "Layl" },
  { sq: "Ditë", en: "Day", ar: "يَوْم", translit: "Yawm" },
  { sq: "Verë", en: "Summer", ar: "صَيْف", translit: "Sayf" },
  { sq: "Dimër", en: "Winter", ar: "شِتَاء", translit: "Shita'" },
];

function getDailyWord() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return WORDS[dayOfYear % WORDS.length];
}

function speakArabic(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.5;
  window.speechSynthesis.speak(u);
}

export default function WordOfTheDay() {
  const [word, setWord] = useState(getDailyWord);
  const [showRandom, setShowRandom] = useState(false);

  const randomWord = () => {
    const r = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(r);
    setShowRandom(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-foreground">📝 Fjala e Ditës</h3>
        <button onClick={randomWord} className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors" title="Fjalë e rastit">
          <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-extrabold text-foreground">{word.sq}</span>
            <button onClick={() => speakArabic(word.ar)} className="p-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">🇬🇧 {word.en}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-primary" dir="rtl">{word.ar}</span>
            <span className="text-xs text-muted-foreground">({word.translit})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
