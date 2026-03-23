import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Languages, Gamepad2, MapPin, Star, Sparkles } from "lucide-react";

const STEPS = [
  { emoji: "🌟", title: "Mirë se vini në Elif!", desc: "Platforma edukative islame interaktive me 30+ module mësimore.", icon: Sparkles, color: "from-emerald-500 to-teal-500" },
  { emoji: "🔤", title: "Mëso Alfabetin", desc: "Germët, numrat, rrokjet në 3 gjuhë — Shqip, Arabisht, Anglisht.", icon: Languages, color: "from-blue-500 to-cyan-500" },
  { emoji: "📖", title: "Kur'ani me Audio", desc: "18+ sure me tekst arabisht, përkthim shqip dhe audio recitim.", icon: BookOpen, color: "from-amber-500 to-orange-500" },
  { emoji: "🕋", title: "Umra & Haxhi", desc: "Udhëzues hap-pas-hapi me dua, audio dhe harta.", icon: MapPin, color: "from-teal-500 to-emerald-600" },
  { emoji: "🎮", title: "Lojëra & Sfida", desc: "30+ lojëra me 60+ pyetje secila — testo njohuritë!", icon: Gamepad2, color: "from-pink-500 to-rose-500" },
  { emoji: "🏆", title: "Mblidh Pikë & Medalje", desc: "Streak ditor, arritje, favorit — mëso duke u argëtuar!", icon: Star, color: "from-amber-500 to-yellow-500" },
];

export default function OnboardingModal() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem("elif_onboarding_done");
    if (!seen) setShow(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem("elif_onboarding_done", "true");
    setShow(false);
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else handleClose();
  };

  if (!show) return null;

  const current = STEPS[step];
  const Icon = current.icon;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={handleClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
          onClick={e => e.stopPropagation()}>
          
          {/* Gradient header */}
          <div className={`bg-gradient-to-br ${current.color} p-8 text-center relative`}>
            <button onClick={handleClose} className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
            <motion.div key={step} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
              <span className="text-5xl block mb-3">{current.emoji}</span>
              <Icon className="w-8 h-8 text-white/80 mx-auto" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <motion.div key={step} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <h3 className="text-xl font-extrabold text-foreground mb-2">{current.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{current.desc}</p>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mb-5">
              {STEPS.map((_, i) => (
                <button key={i} onClick={() => setStep(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === step ? "bg-primary w-6" : "bg-muted-foreground/30"}`} />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
                  Mbrapa
                </button>
              )}
              <button onClick={handleNext}
                className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all shadow-md">
                {step < STEPS.length - 1 ? "Vazhdo →" : "Fillo Mësimet! 🚀"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
