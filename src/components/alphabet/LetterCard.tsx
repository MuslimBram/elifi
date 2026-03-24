import React from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

interface LetterData {
  letter: string;
  pronunciation: string;
  language: string;
  [key: string]: any;
}

const speak = (letter: LetterData) => {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(letter.letter);
  u.lang = letter.language === "arabisht" ? "ar" : letter.language === "anglisht" ? "en-US" : "sq";
  u.rate = 0.7;
  window.speechSynthesis.speak(u);
};

interface Props {
  letter: LetterData;
  onClick: (letter: LetterData) => void;
  isSelected?: boolean;
}

export default function LetterCard({ letter, onClick, isSelected }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(letter)}
      className={`relative group p-4 rounded-2xl border-2 transition-all duration-200 text-center ${
        isSelected
          ? "border-primary bg-primary/10 shadow-lg"
          : "border-border bg-card hover:border-primary/50 hover:shadow-md"
      }`}
    >
      <div
        className="font-bold text-foreground mb-1"
        style={{
          fontSize: letter.language === "arabisht" ? "2rem" : "1.875rem",
          fontFamily: letter.language === "arabisht" ? "serif" : "inherit",
        }}
      >
        {letter.letter}
      </div>
      <p className="text-xs text-muted-foreground truncate">{letter.pronunciation}</p>
      <button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={e => { e.stopPropagation(); speak(letter); }}
      >
        <Volume2 className="w-3.5 h-3.5 text-primary" />
      </button>
    </motion.button>
  );
}
