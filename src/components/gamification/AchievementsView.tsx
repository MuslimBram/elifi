import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Flame, BookOpen, Gamepad2, MapPin, Award, Lock } from "lucide-react";

interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  icon: React.ElementType;
  condition: () => boolean;
  color: string;
}

function checkStorage(key: string, field?: string): number {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return 0;
    if (field) {
      const data = JSON.parse(raw);
      return data[field] || 0;
    }
    const n = parseInt(raw);
    return isNaN(n) ? 0 : n;
  } catch { return 0; }
}

function checkStreak(): number {
  try {
    const raw = localStorage.getItem("daily_streak");
    if (raw) return JSON.parse(raw).count || 0;
  } catch {}
  return 0;
}

function checkFavorites(): number {
  try {
    const raw = localStorage.getItem("elif_favorites");
    return raw ? JSON.parse(raw).length : 0;
  } catch { return 0; }
}

function checkSurahCompleted(): number {
  try {
    const raw = localStorage.getItem("surah_reading_progress");
    if (raw) return JSON.parse(raw).filter((s: any) => s.status === "completed").length;
  } catch {}
  return 0;
}

const BADGES: Badge[] = [
  { id: "first_visit", title: "Mirëseardhje!", description: "Hape aplikacionin për herë të parë", emoji: "🌟", icon: Star, condition: () => true, color: "from-yellow-400 to-amber-500" },
  { id: "streak_3", title: "3 Ditë Radhazi", description: "Vizito aplikacionin 3 ditë rresht", emoji: "🔥", icon: Flame, condition: () => checkStreak() >= 3, color: "from-orange-400 to-red-500" },
  { id: "streak_7", title: "Javë e Plotë", description: "7 ditë radhazi pa ndërprerje", emoji: "⚡", icon: Flame, condition: () => checkStreak() >= 7, color: "from-red-400 to-rose-600" },
  { id: "streak_30", title: "Muaji i Artë", description: "30 ditë radhazi — legjendë!", emoji: "👑", icon: Trophy, condition: () => checkStreak() >= 30, color: "from-amber-400 to-yellow-600" },
  { id: "points_100", title: "100 Pikë", description: "Mblidh 100 pikë totale", emoji: "💎", icon: Award, condition: () => checkStorage("elifi_total_points") >= 100, color: "from-blue-400 to-indigo-500" },
  { id: "points_500", title: "500 Pikë", description: "Mblidh 500 pikë — ekspert!", emoji: "🏆", icon: Trophy, condition: () => checkStorage("elifi_total_points") >= 500, color: "from-purple-400 to-violet-600" },
  { id: "surah_3", title: "3 Sure", description: "Mëso 3 sure përmendësh", emoji: "📖", icon: BookOpen, condition: () => checkSurahCompleted() >= 3, color: "from-emerald-400 to-green-600" },
  { id: "surah_5", title: "5 Sure", description: "Mëso 5 sure — Hafiz fillestar!", emoji: "📚", icon: BookOpen, condition: () => checkSurahCompleted() >= 5, color: "from-teal-400 to-emerald-600" },
  { id: "favorites_5", title: "Koleksionist", description: "Ruaj 5 favorit", emoji: "❤️", icon: Star, condition: () => checkFavorites() >= 5, color: "from-pink-400 to-rose-500" },
  { id: "umra_done", title: "Umra Virtuale", description: "Përfundo të gjithë hapat e Umrës", emoji: "🕋", icon: MapPin, condition: () => { try { const r = localStorage.getItem("umra_steps_completed"); return r ? JSON.parse(r).filter(Boolean).length >= 5 : false; } catch { return false; } }, color: "from-amber-500 to-orange-600" },
  { id: "games_5", title: "Lojtar", description: "Luaj 5 lojëra të ndryshme", emoji: "🎮", icon: Gamepad2, condition: () => checkStorage("elifi_total_points") >= 200, color: "from-violet-400 to-purple-600" },
];

export default function AchievementsView() {
  const badgeStatus = useMemo(() =>
    BADGES.map(b => ({ ...b, unlocked: b.condition() })),
    []
  );

  const unlocked = badgeStatus.filter(b => b.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="glass-card rounded-2xl p-6 text-center">
        <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
        <p className="text-3xl font-extrabold text-foreground">{unlocked}/{BADGES.length}</p>
        <p className="text-sm text-muted-foreground">Arritje të zhbllokuara</p>
        <div className="w-full bg-secondary rounded-full h-2.5 mt-3 max-w-xs mx-auto">
          <div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: `${(unlocked / BADGES.length) * 100}%` }} />
        </div>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badgeStatus.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card rounded-2xl p-5 text-center relative overflow-hidden ${
                !badge.unlocked ? "opacity-50 grayscale" : ""
              }`}
            >
              {badge.unlocked && (
                <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-10`} />
              )}
              <div className="relative">
                <span className="text-3xl block mb-2">{badge.unlocked ? badge.emoji : "🔒"}</span>
                <h4 className="font-bold text-foreground text-sm mb-1">{badge.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-tight">{badge.description}</p>
                {badge.unlocked && (
                  <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    ✅ Zhbllokuar
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
