import React, { useState } from "react";
import { Settings as SettingsIcon, Volume2, VolumeX, Moon, Sun, Type, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [language, setLanguage] = useState("shqip");

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <SettingsIcon className="w-4 h-4" />
          Preferencat
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          <span className="text-gradient">Cilësimet</span>
        </h1>
      </motion.div>

      <div className="space-y-4">
        {/* Theme */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
              <div>
                <h3 className="font-bold text-foreground text-sm">Tema</h3>
                <p className="text-xs text-muted-foreground">{darkMode ? "E errët" : "E ndritshme"}</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-7 rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-secondary"} relative`}
            >
              <div className={`w-5 h-5 rounded-full bg-primary-foreground absolute top-1 transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        {/* Sound */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {soundEnabled ? <Volume2 className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-primary" />}
              <div>
                <h3 className="font-bold text-foreground text-sm">Zëri / Audio</h3>
                <p className="text-xs text-muted-foreground">{soundEnabled ? "Aktivizuar" : "Çaktivizuar"}</p>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-7 rounded-full transition-colors ${soundEnabled ? "bg-primary" : "bg-secondary"} relative`}
            >
              <div className={`w-5 h-5 rounded-full bg-primary-foreground absolute top-1 transition-transform ${soundEnabled ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Type className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-bold text-foreground text-sm">Madhësia e Shkronjave</h3>
              <p className="text-xs text-muted-foreground">Zgjidh madhësinë që të përshtatet</p>
            </div>
          </div>
          <div className="flex gap-2">
            {([["normal", "Normale"], ["large", "E madhe"], ["xlarge", "Shumë e madhe"]] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFontSize(val)}
                className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  fontSize === val ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">🌐</span>
            <div>
              <h3 className="font-bold text-foreground text-sm">Gjuha e Ndërfaqes</h3>
              <p className="text-xs text-muted-foreground">Zgjidh gjuhën e aplikacionit</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[["shqip", "🇦🇱 Shqip"], ["anglisht", "🇬🇧 English"], ["arabisht", "🇸🇦 عربي"]].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setLanguage(val)}
                className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  language === val ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-red-500" />
              <div>
                <h3 className="font-bold text-foreground text-sm">Rivendos Progresin</h3>
                <p className="text-xs text-muted-foreground">Fshi të gjitha të dhënat e progresit</p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-sm font-medium hover:bg-red-500/20 transition-colors">
              Rivendos
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        Edukim Interaktiv v1.0 — Platforma edukative islamike
      </p>
    </div>
  );
}
