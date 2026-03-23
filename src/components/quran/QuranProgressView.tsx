import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Star, Clock, Target, Trophy, RotateCcw } from "lucide-react";

function getStoredProgress() {
  const keys = [
    { key: "progress_quran", label: "Kuiz Kurani" },
    { key: "quranQuizScore", label: "Pikë Kurani" },
  ];
  let totalScore = 0;
  let totalMax = 0;
  let lastPlayed = "";

  for (const { key } of keys) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const data = JSON.parse(raw);
      if (data.lastScore !== undefined && data.totalQuestions !== undefined) {
        totalScore += data.lastScore;
        totalMax += data.totalQuestions;
      }
      if (data.score !== undefined) totalScore += data.score;
      if (data.lastPlayed && (!lastPlayed || data.lastPlayed > lastPlayed)) lastPlayed = data.lastPlayed;
    } catch {
      const n = parseInt(raw!);
      if (!isNaN(n)) totalScore += n;
    }
  }
  return { totalScore, totalMax, lastPlayed };
}

function getSurahProgress(): { surah: string; status: string; date: string }[] {
  try {
    const raw = localStorage.getItem("surah_reading_progress");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    { surah: "El-Fatiha", status: "completed", date: "—" },
    { surah: "El-Ihlas", status: "not-started", date: "—" },
    { surah: "El-Felek", status: "not-started", date: "—" },
    { surah: "En-Nas", status: "not-started", date: "—" },
    { surah: "Jasin", status: "not-started", date: "—" },
    { surah: "El-Mulk", status: "not-started", date: "—" },
    { surah: "Ed-Duha", status: "not-started", date: "—" },
    { surah: "El-Kadr", status: "not-started", date: "—" },
  ];
}

function getPoints(): number {
  try {
    const raw = localStorage.getItem("elifi_total_points");
    return raw ? parseInt(raw) || 0 : 0;
  } catch { return 0; }
}

function getStreak(): number {
  try {
    const raw = localStorage.getItem("daily_streak");
    if (raw) { const data = JSON.parse(raw); return data.count || 0; }
  } catch {}
  return 0;
}

export default function QuranProgressView() {
  const [progress, setProgress] = useState(getStoredProgress());
  const [surahList, setSurahList] = useState(getSurahProgress());
  const points = getPoints();
  const streak = getStreak();

  const toggleSurah = (i: number) => {
    const updated = [...surahList];
    const current = updated[i].status;
    updated[i].status = current === "completed" ? "not-started" : current === "in-progress" ? "completed" : "in-progress";
    updated[i].date = updated[i].status !== "not-started" ? new Date().toLocaleDateString("sq-AL") : "—";
    setSurahList(updated);
    localStorage.setItem("surah_reading_progress", JSON.stringify(updated));
  };

  const completedCount = surahList.filter(s => s.status === "completed").length;
  const inProgressCount = surahList.filter(s => s.status === "in-progress").length;

  const STATS = [
    { label: "Sure të mësuara", value: String(completedCount), icon: BookOpen, color: "text-primary" },
    { label: "Duke mësuar", value: String(inProgressCount), icon: Clock, color: "text-yellow-500" },
    { label: "Pikë totale", value: String(points), icon: Star, color: "text-orange-500" },
    { label: "Ditë radhazi", value: String(streak), icon: Trophy, color: "text-blue-500" },
  ];

  return (
    <div className="space-y-6">
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

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">📖 Progresi i Sureve</h3>
          <span className="text-xs text-muted-foreground">{completedCount}/{surahList.length} përfunduar</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 mb-4">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${surahList.length > 0 ? (completedCount / surahList.length) * 100 : 0}%` }} />
        </div>
        <div className="space-y-3">
          {surahList.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/20 cursor-pointer hover:bg-secondary/40 transition-colors" onClick={() => toggleSurah(i)}>
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
        <p className="text-xs text-muted-foreground mt-3 text-center">💡 Kliko mbi një sure për të ndryshuar statusin</p>
      </div>
    </div>
  );
}
