import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, RefreshCw, Check, X, Shuffle } from "lucide-react";

interface FlashWord {
  word: string;
  translation: string;
  emoji: string;
  transliteration?: string;
}

const WORDS: Record<string, FlashWord[]> = {
  shqip: [
    { word: "Shtëpi", translation: "House", emoji: "🏠" },
    { word: "Libër", translation: "Book", emoji: "📖" },
    { word: "Diell", translation: "Sun", emoji: "☀️" },
    { word: "Ujë", translation: "Water", emoji: "💧" },
    { word: "Pemë", translation: "Tree", emoji: "🌳" },
    { word: "Shkolle", translation: "School", emoji: "🏫" },
    { word: "Qiell", translation: "Sky", emoji: "🌤️" },
    { word: "Zemër", translation: "Heart", emoji: "❤️" },
    { word: "Yllë", translation: "Star", emoji: "⭐" },
    { word: "Lule", translation: "Flower", emoji: "🌸" },
    { word: "Dritë", translation: "Light", emoji: "💡" },
    { word: "Natyrë", translation: "Nature", emoji: "🌿" },
  ],
  anglisht: [
    { word: "Peace", translation: "Paqe", emoji: "☮️" },
    { word: "Knowledge", translation: "Dije", emoji: "📚" },
    { word: "Prayer", translation: "Namaz/Lutje", emoji: "🤲" },
    { word: "Faith", translation: "Besim", emoji: "🕌" },
    { word: "Family", translation: "Familje", emoji: "👨‍👩‍👧‍👦" },
    { word: "Friend", translation: "Mik", emoji: "🤝" },
    { word: "Garden", translation: "Kopsht", emoji: "🌻" },
    { word: "Mountain", translation: "Mal", emoji: "⛰️" },
    { word: "River", translation: "Lumë", emoji: "🏞️" },
    { word: "Moon", translation: "Hënë", emoji: "🌙" },
  ],
  arabisht: [
    { word: "كِتَابٌ", translation: "Libër", emoji: "📖", transliteration: "Kitāb" },
    { word: "بَيْتٌ", translation: "Shtëpi", emoji: "🏠", transliteration: "Bayt" },
    { word: "مَاءٌ", translation: "Ujë", emoji: "💧", transliteration: "Māʾ" },
    { word: "شَمْسٌ", translation: "Diell", emoji: "☀️", transliteration: "Shams" },
    { word: "قَمَرٌ", translation: "Hënë", emoji: "🌙", transliteration: "Qamar" },
    { word: "نَجْمٌ", translation: "Yll", emoji: "⭐", transliteration: "Najm" },
    { word: "سَلَامٌ", translation: "Paqe", emoji: "☮️", transliteration: "Salām" },
    { word: "عِلْمٌ", translation: "Dije", emoji: "📚", transliteration: "ʿIlm" },
    { word: "نُورٌ", translation: "Dritë", emoji: "💡", transliteration: "Nūr" },
    { word: "قَلْبٌ", translation: "Zemër", emoji: "❤️", transliteration: "Qalb" },
    { word: "صَلَاةٌ", translation: "Namaz", emoji: "🤲", transliteration: "Ṣalāh" },
    { word: "جَنَّةٌ", translation: "Xhennet", emoji: "🌴", transliteration: "Jannah" },
  ],
};

const speakWord = (word: string, lang: string) => {
  const u = new SpeechSynthesisUtterance(word);
  u.lang = lang === "arabisht" ? "ar-SA" : lang === "anglisht" ? "en-US" : "sq";
  u.rate = 0.8;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

function FlashCard({ word, flipped, onFlip, lang }: { word: FlashWord; flipped: boolean; onFlip: () => void; lang: string }) {
  return (
    <div className="relative w-full cursor-pointer" style={{ perspective: "1000px", height: "260px" }} onClick={onFlip}>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} style={{ transformStyle: "preserve-3d", position: "absolute", inset: 0 }}>
        {/* Front */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8" style={{ backfaceVisibility: "hidden" }}>
          <div className="text-7xl mb-4">{word.emoji}</div>
          <div className="text-primary-foreground/80 text-sm font-medium uppercase tracking-widest">
            {lang === "arabisht" ? "عربي" : lang === "anglisht" ? "English" : "Shqip"}
          </div>
          <div className="text-primary-foreground/60 text-xs mt-3">Kliko për të parë fjalën →</div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 bg-card rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 border-2 border-border" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className={`font-bold text-foreground mb-2 text-center ${lang === "arabisht" ? "text-5xl" : "text-4xl"}`} style={lang === "arabisht" ? { fontFamily: "serif", direction: "rtl" } : {}}>
            {word.word}
          </div>
          {word.transliteration && <div className="text-muted-foreground text-sm italic mb-2">{word.transliteration}</div>}
          <div className="text-primary font-semibold text-xl mb-1">{word.translation}</div>
          <button onClick={(e) => { e.stopPropagation(); speakWord(word.word, lang); }} className="mt-4 p-3 bg-secondary hover:bg-primary/10 rounded-2xl transition-all">
            <Volume2 className="w-5 h-5 text-primary" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function FlashcardsView({ language }: { language: string }) {
  const allWords = WORDS[language] || WORDS.shqip;
  const [deck, setDeck] = useState<FlashWord[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<FlashWord[]>([]);
  const [unknown, setUnknown] = useState<FlashWord[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setDeck([...allWords].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
    setFinished(false);
  }, [language]);

  const card = deck[currentIdx];
  const total = deck.length;

  const handleKnow = (knew: boolean) => {
    if (knew) setKnown(p => [...p, card]);
    else setUnknown(p => [...p, card]);
    setFlipped(false);
    setTimeout(() => {
      if (currentIdx + 1 >= total) setFinished(true);
      else setCurrentIdx(i => i + 1);
    }, 200);
  };

  const handleRestart = () => {
    setDeck([...allWords].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
    setFinished(false);
  };

  const handleRetryUnknown = () => {
    if (unknown.length === 0) return;
    setDeck([...unknown].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((known.length / total) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-3xl p-10 text-center max-w-lg mx-auto">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-foreground mb-1">Karta mbaruan!</h3>
        <div className="flex justify-center gap-8 my-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">{known.length}</div>
            <div className="text-xs text-muted-foreground mt-1">✅ I dija</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-destructive">{unknown.length}</div>
            <div className="text-xs text-muted-foreground mt-1">❌ Nuk e dija</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{pct}%</div>
            <div className="text-xs text-muted-foreground mt-1">Rezultat</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={handleRestart} className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm">
            <RefreshCw className="w-4 h-4" /> Rifillo
          </button>
          {unknown.length > 0 && (
            <button onClick={handleRetryUnknown} className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-destructive/30 text-destructive font-medium text-sm hover:bg-destructive/5">
              <X className="w-4 h-4" /> Provo të padijturat ({unknown.length})
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  if (!card) return null;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-muted-foreground">{currentIdx + 1} / {total} karta</span>
          <div className="flex gap-3 text-xs">
            <span className="text-emerald-600 font-semibold">✅ {known.length}</span>
            <span className="text-destructive font-semibold">❌ {unknown.length}</span>
          </div>
          <button onClick={handleRestart} className="text-muted-foreground hover:text-primary transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${(currentIdx / total) * 100}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIdx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
          <FlashCard word={card} flipped={flipped} onFlip={() => setFlipped(f => !f)} lang={language} />
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        <button onClick={() => handleKnow(false)} className="flex-1 flex items-center justify-center gap-2 py-4 bg-destructive/5 hover:bg-destructive/10 border-2 border-destructive/20 rounded-2xl font-bold text-destructive transition-all text-sm">
          <X className="w-5 h-5" /> Nuk e dija
        </button>
        <button onClick={() => handleKnow(true)} className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-500/5 hover:bg-emerald-500/10 border-2 border-emerald-500/20 rounded-2xl font-bold text-emerald-600 transition-all text-sm">
          <Check className="w-5 h-5" /> E dija!
        </button>
      </div>
      <p className="text-center text-xs text-muted-foreground">Kliko kartën për të parë fjalën</p>
    </div>
  );
}
