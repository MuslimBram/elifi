import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Star, Clock, Target } from "lucide-react";

const STATS = [
  { label: "Sure të mësuara", value: "5", icon: BookOpen, color: "text-primary" },
  { label: "Kuize të përfunduara", value: "12", icon: Target, color: "text-yellow-500" },
  { label: "Ditë radhazi", value: "7", icon: Clock, color: "text-blue-500" },
  { label: "Pikë totale", value: "340", icon: Star, color: "text-orange-500" },
];

const RECENT = [
  { surah: "El-Fatiha", status: "completed", date: "Sot" },
  { surah: "El-Ihlas", status: "completed", date: "Dje" },
  { surah: "El-Felek", status: "in-progress", date: "Sot" },
  { surah: "En-Nas", status: "not-started", date: "—" },
  { surah: "En-Nasr", status: "not-started", date: "—" },
];

export default function QuranProgressView() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-5 text-center">
              <Icon className={`w-8 h-8 mx-auto mb-2 ${s.color}`} />
              <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Surah list */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">📖 Progresi i Sureve</h3>
        <div className="space-y-3">
          {RECENT.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/20">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  r.status === "completed" ? "bg-green-500" : r.status === "in-progress" ? "bg-yellow-500 animate-pulse" : "bg-muted-foreground/30"
                }`} />
                <span className="font-medium text-foreground text-sm">{r.surah}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  r.status === "completed" ? "bg-green-100 text-green-700" : r.status === "in-progress" ? "bg-yellow-100 text-yellow-700" : "bg-muted text-muted-foreground"
                }`}>
                  {r.status === "completed" ? "✅ Mësuar" : r.status === "in-progress" ? "⏳ Duke mësuar" : "⬜ Pa filluar"}
                </span>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
