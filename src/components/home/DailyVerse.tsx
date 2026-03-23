import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, RefreshCw, BookOpen } from "lucide-react";

const DAILY_VERSES = [
  { ar: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ", translit: "Wa-ʿasā an takrahū shayʾan wa-huwa khayrun lakum", sq: "Ndoshta urrehni diçka, ndërkohë ajo është e mirë për ju.", source: "Kur'an 2:216" },
  { ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", translit: "Inna maʿa l-ʿusri yusrā", sq: "Me vështirësinë vjen lehtësia.", source: "Kur'an 94:6" },
  { ar: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ", translit: "Wa-lā tayʾasū min rawḥi-llāh", sq: "Dhe mos dëshpërojini nga mëshira e Allahut.", source: "Kur'an 12:87" },
  { ar: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", translit: "Ḥasbunā-llāhu wa-niʿma l-wakīl", sq: "Allahu na mjafton neve dhe sa i mirë Mbikëqyrës!", source: "Kur'an 3:173" },
  { ar: "وَاللَّهُ مَعَ الصَّابِرِينَ", translit: "Wa-llāhu maʿa ṣ-ṣābirīn", sq: "Allahu është me durimtarët.", source: "Kur'an 2:153" },
  { ar: "إِنَّ اللَّهَ مَعَنَا", translit: "Inna-llāha maʿanā", sq: "Allahu është me ne.", source: "Kur'an 9:40" },
  { ar: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", translit: "Wa man yatawakkal ʿalā-llāhi fahuwa ḥasbuhu", sq: "Kush i mbështetet Allahut, Ai i mjafton atij.", source: "Kur'an 65:3" },
  { ar: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", translit: "Rabbi-shraḥ lī ṣadrī wa-yassir lī amrī", sq: "O Zoti im, ma zgjero gjoksin tim dhe ma lehtëso punën time.", source: "Kur'an 20:25-26" },
  { ar: "فَاذْكُرُونِي أَذْكُرْكُمْ", translit: "Fadhkurūnī adhkurkum", sq: "Më kujtoni Mua, Unë ju kujtoj juve.", source: "Kur'an 2:152" },
  { ar: "وَقُل رَّبِّ زِدْنِي عِلْمًا", translit: "Wa-qul rabbi zidnī ʿilmā", sq: "Dhe thuaj: O Zoti im, ma shto diturinë!", source: "Kur'an 20:114" },
];

export default function DailyVerse() {
  const [idx, setIdx] = useState(() => Math.floor(Date.now() / 86400000) % DAILY_VERSES.length);
  const [showTranslit, setShowTranslit] = useState(false);
  const verse = DAILY_VERSES[idx];

  const next = () => setIdx(i => (i + 1) % DAILY_VERSES.length);

  const speak = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(verse.ar);
    u.lang = "ar-SA"; u.rate = 0.6;
    window.speechSynthesis.speak(u);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass-card border border-amber-200/30 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" /> Ajeti i Ditës
        </span>
        <div className="flex gap-2">
          <button onClick={speak} className="w-8 h-8 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center transition-colors">
            <Volume2 className="w-3.5 h-3.5 text-amber-700" />
          </button>
          <button onClick={next} className="w-8 h-8 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center transition-colors">
            <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
          </button>
        </div>
      </div>

      <p className="text-2xl md:text-3xl text-foreground text-center leading-loose mb-3 font-semibold" dir="rtl">{verse.ar}</p>

      <button onClick={() => setShowTranslit(v => !v)} className="text-xs text-primary underline font-medium mb-2 block mx-auto">
        {showTranslit ? "▲ Fshih transliterimin" : "▼ Shfaq transliterimin"}
      </button>

      {showTranslit && <p className="text-sm text-primary italic text-center mb-2">{verse.translit}</p>}

      <p className="text-base text-foreground/80 text-center italic font-medium">"{verse.sq}"</p>
      <p className="text-xs text-amber-500 text-center mt-2 font-semibold">— {verse.source}</p>
    </motion.div>
  );
}
