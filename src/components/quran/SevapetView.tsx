import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SEVAPET = [
  {
    title: "Leximi i Kuranit",
    hadith: "Kush lexon një shkronjë nga Libri i Allahut, do të ketë një sevap, dhe sevapi dhjetëfishohet.",
    source: "Tirmidhiu",
    icon: "📖",
  },
  {
    title: "Mësimi i Sures El-Bekare",
    hadith: "Lexojeni Suren El-Bekare, sepse marrja e saj është bereqet, lënia e saj është humbje, dhe magjistarët nuk mund ta arrijnë.",
    source: "Muslimi",
    icon: "🌟",
  },
  {
    title: "Surja El-Ihlas",
    hadith: "Surja El-Ihlas është e barabartë me një të tretën e Kuranit.",
    source: "Buhariu & Muslimi",
    icon: "💎",
  },
  {
    title: "Ajeti Kursi",
    hadith: "Kush e lexon Ajetin Kursi pas çdo namazi, nuk ka gjë që e ndalon nga hyrja në Xhenet përveç vdekjes.",
    source: "Nesaiu",
    icon: "🛡️",
  },
  {
    title: "Mësimi përmendësh",
    hadith: "Më i miri ndër ju është ai i cili e mëson Kuranin dhe ua mëson të tjerëve.",
    source: "Buhariu",
    icon: "🏆",
  },
  {
    title: "Leximi i Sure Mulk",
    hadith: "Ka një sure me 30 ajete që ndërmjetëson për njeriun derisa i falen mëkatet - Sure Mulk.",
    source: "Tirmidhiu",
    icon: "🌙",
  },
];

export default function SevapetView() {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
        <h3 className="text-lg font-bold text-foreground">Sevapet e Leximit të Kuranit</h3>
        <p className="text-sm text-muted-foreground">Hadithe rreth vlerës së Kuranit Famëlartë</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SEVAPET.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-5 hover:shadow-lg transition-shadow"
          >
            <div className="text-2xl mb-3">{s.icon}</div>
            <h4 className="font-bold text-foreground mb-2">{s.title}</h4>
            <p className="text-sm text-foreground/80 italic leading-relaxed">"{s.hadith}"</p>
            <p className="text-xs text-primary font-semibold mt-3">📚 {s.source}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
