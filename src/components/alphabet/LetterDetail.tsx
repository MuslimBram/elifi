import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, BookOpen } from "lucide-react";

const formLabels: Record<string, string> = {
  uppercase: "E Madhe shtypi",
  lowercase: "E Vogël shtypi",
  handwritten_upper: "E Madhe dorëshkrim",
  handwritten_lower: "E Vogël dorëshkrim",
};

interface LetterData {
  letter: string;
  pronunciation: string;
  language: string;
  description?: string;
  form_uppercase?: string;
  form_lowercase?: string;
  form_handwritten_upper?: string;
  form_handwritten_lower?: string;
  audio_url?: string;
  example_words?: { word: string; translation: string }[];
  [key: string]: any;
}

export default function LetterDetail({ letter }: { letter: LetterData | null }) {
  const [activeForm, setActiveForm] = useState("uppercase");

  if (!letter) return null;

  const forms: Record<string, string> = {
    uppercase: letter.form_uppercase || letter.letter?.toUpperCase(),
    lowercase: letter.form_lowercase || letter.letter?.toLowerCase(),
    handwritten_upper: letter.form_handwritten_upper || letter.letter?.toUpperCase(),
    handwritten_lower: letter.form_handwritten_lower || letter.letter?.toLowerCase(),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Shkronja: {letter.letter}</h2>
          <p className="text-sm text-muted-foreground">Shkronja {letter.letter}</p>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
          onClick={() => {
            if (letter.audio_url) {
              new Audio(letter.audio_url).play();
            } else if (window.speechSynthesis) {
              const u = new SpeechSynthesisUtterance(letter.letter);
              u.lang = letter.language === "arabisht" ? "ar-SA" : letter.language === "anglisht" ? "en-US" : "sq-AL";
              u.rate = 0.7;
              window.speechSynthesis.speak(u);
            }
          }}
        >
          <Volume2 className="w-4 h-4 mr-1.5" /> Dëgjo Tingullin
        </Button>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground/80 mb-3">Zgjidhni Formën</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(formLabels).map((key) => (
            <button
              key={key}
              onClick={() => setActiveForm(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeForm === key
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-card border border-border text-foreground/60 hover:border-primary/50"
              }`}
            >
              {formLabels[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-secondary rounded-2xl p-8 text-center">
        <motion.div
          key={activeForm}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl font-bold text-foreground mb-3"
        >
          {forms[activeForm]}
        </motion.div>
        <p className="text-sm text-primary italic">Shqiptimi: Shqiptohet si '{letter.pronunciation}'</p>
      </div>

      {letter.description && (
        <div className="bg-primary/5 rounded-xl p-4 flex items-start gap-3">
          <BookOpen className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-primary mb-1">Përshkrimi</p>
            <p className="text-sm text-foreground/70">{letter.description}</p>
          </div>
        </div>
      )}

      {letter.example_words && letter.example_words.length > 0 && (
        <div>
          <p className="text-sm font-bold text-foreground/80 mb-3">Shembuj Fjalësh</p>
          <div className="grid grid-cols-2 gap-3">
            {letter.example_words.map((ex, i) => (
              <div key={i} className="bg-secondary rounded-xl p-3 border border-border">
                <p className="font-bold text-foreground">{ex.word}</p>
                <p className="text-xs text-muted-foreground">{ex.translation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
