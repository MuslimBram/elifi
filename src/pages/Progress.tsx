import React, { useState, useEffect } from "react";
import { BarChart3, BookOpen, Languages, Gamepad2, MapPin, Star, BookMarked, RotateCcw, Trophy, Target, Flame, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ModuleProgress {
  name: string;
  icon: React.ElementType;
  path: string;
  color: string;
  storageKeys: string[];
}

const MODULES: ModuleProgress[] = [
  { name: "Alfabeti", icon: Languages, path: "/alphabet", color: "from-blue-500 to-cyan-500", storageKeys: ["progress_alphabet"] },
  { name: "Kur'ani", icon: BookOpen, path: "/quran", color: "from-amber-500 to-orange-500", storageKeys: ["progress_quran", "quranQuizScore"] },
  { name: "Texhuidi", icon: BookMarked, path: "/tajweed", color: "from-violet-500 to-purple-500", storageKeys: ["progress_tajweed"] },
  { name: "Umra & Haxhi", icon: MapPin, path: "/umra-hajj", color: "from-teal-500 to-cyan-500", storageKeys: ["progress_umra", "umra_steps", "hajj_steps"] },
  { name: "Fikh Elementar", icon: Star, path: "/fikh", color: "from-green-500 to-emerald-600", storageKeys: ["progress_fikh", "fikhQuizScore"] },
  { name: "Lojëra", icon: Gamepad2, path: "/games", color: "from-pink-500 to-rose-500", storageKeys: ["progress_games", "quizHighScore", "memoryBestTime", "mathHighScore", "brainGymHighScore"] },
];

function getModuleData(mod: ModuleProgress) {
  let totalScore = 0;
  let totalMax = 0;
  let lastPlayed = "";

  for (const key of mod.storageKeys) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      // Try JSON parse
      try {
        const data = JSON.parse(raw);
        if (data.lastScore !== undefined && data.totalQuestions !== undefined) {
          totalScore += data.lastScore;
          totalMax += data.totalQuestions;
        }
        if (data.score !== undefined) totalScore += data.score;
        if (data.lastPlayed && (!lastPlayed || data.lastPlayed > lastPlayed)) lastPlayed = data.lastPlayed;
        // Handle step completion arrays
        if (Array.isArray(data)) {
          totalScore += data.filter(Boolean).length;
          totalMax += data.length;
        }
      } catch {
        // Plain number
        const n = parseInt(raw);
        if (!isNaN(n)) totalScore += n;
      }
    } catch {}
  }

  const progress = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : totalScore > 0 ? Math.min(totalScore * 10, 100) : 0;
  return { progress: Math.min(progress, 100), lastPlayed };
}

function getRecentActivity(): { action: string; time: string; icon: string }[] {
  const activities: { action: string; time: string; icon: string; date: Date }[] = [];

  const checkKey = (key: string, action: string, icon: string) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.lastPlayed) {
        const d = new Date(data.lastPlayed);
        const now = new Date();
        const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
        const time = diff === 0 ? "Sot" : diff === 1 ? "Dje" : `${diff} ditë më parë`;
        activities.push({ action, time, icon, date: d });
      }
    } catch {}
  };

  checkKey("progress_tajweed", "Përfundove kuizin e Texhuidit", "🎓");
  checkKey("progress_quran", "Mësove në seksionin e Kur'anit", "📖");
  checkKey("progress_fikh", "Studiove Fikhun Elementar", "🕌");
  checkKey("progress_umra", "Mësove hapat e Umra/Haxhit", "🕋");
  checkKey("progress_games", "Luajte lojëra edukative", "🎮");
  checkKey("progress_alphabet", "Mësove alfabetin", "🔤");

  // Sort by date desc
  activities.sort((a, b) => b.date.getTime() - a.date.getTime());
  
  if (activities.length === 0) {
    return [
      { action: "Fillo mësimet për të parë progresin!", time: "Tani", icon: "✨" },
    ];
  }

  return activities.slice(0, 6);
}

function getStreak(): number {
  try {
    const raw = localStorage.getItem("daily_streak");
    if (raw) {
      const data = JSON.parse(raw);
      return data.count || 0;
    }
  } catch {}
  return 0;
}

function getTotalQuizzes(): number {
  let total = 0;
  const keys = ["progress_tajweed", "progress_quran", "progress_fikh", "progress_games"];
  for (const key of keys) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.totalQuestions) total += 1;
      }
    } catch {}
  }
  return total;
}

export default function Progress() {
  const [moduleData, setModuleData] = useState<Record<string, { progress: number; lastPlayed: string }>>({});
  const [activities, setActivities] = useState<{ action: string; time: string; icon: string }[]>([]);

  useEffect(() => {
    const data: Record<string, { progress: number; lastPlayed: string }> = {};
    MODULES.forEach(mod => {
      data[mod.name] = getModuleData(mod);
    });
    setModuleData(data);
    setActivities(getRecentActivity());
  }, []);

  const totalProgress = MODULES.length > 0
    ? Math.round(MODULES.reduce((s, m) => s + (moduleData[m.name]?.progress || 0), 0) / MODULES.length)
    : 0;

  const streak = getStreak();
  const totalQuizzes = getTotalQuizzes();
  const favCount = (() => { try { const r = localStorage.getItem("elif_favorites"); return r ? JSON.parse(r).length : 0; } catch { return 0; } })();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <BarChart3 className="w-4 h-4" />
          Ndjekja e Progresit
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          <span className="text-gradient">Progresi Im</span>
        </h1>
      </motion.div>

      {/* Stats row */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card rounded-2xl p-5 text-center">
          <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{totalProgress}%</p>
          <p className="text-xs text-muted-foreground">Progres Total</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{streak}</p>
          <p className="text-xs text-muted-foreground">Ditë radhazi</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{totalQuizzes}</p>
          <p className="text-xs text-muted-foreground">Kuize përfunduar</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{favCount}</p>
          <p className="text-xs text-muted-foreground">Favorit</p>
        </div>
      </motion.div>

      {/* Overall circle */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-8 text-center mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" className="stroke-secondary" strokeWidth="3" />
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" className="stroke-primary" strokeWidth="3" strokeDasharray={`${totalProgress}, 100`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{totalProgress}%</span>
          </div>
        </div>
        <h2 className="text-lg font-bold text-foreground">Progresi i Përgjithshëm</h2>
        <p className="text-sm text-muted-foreground">
          {totalProgress === 0 ? "Fillo mësimet për të parë progresin!" : totalProgress < 30 ? "Fillim i mirë! Vazhdo!" : totalProgress < 60 ? "Vazhdo kështu!" : totalProgress < 90 ? "Shkëlqyeshëm!" : "🏆 E jashtëzakonshme!"}
        </p>
      </motion.div>

      {/* Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {MODULES.map((mod, i) => {
          const Icon = mod.icon;
          const data = moduleData[mod.name] || { progress: 0, lastPlayed: "" };
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <Link to={mod.path} className="glass-card rounded-2xl p-5 block hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{mod.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {data.lastPlayed ? `Aktivitet i fundit` : "Ende pa filluar"}
                    </p>
                  </div>
                  <span className="ml-auto text-lg font-bold text-primary">{data.progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${mod.color} transition-all`} style={{ width: `${data.progress}%` }} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-lg font-bold text-foreground mb-4">📋 Aktiviteti i Fundit</h2>
        <div className="glass-card rounded-2xl divide-y divide-border">
          {activities.map((act, i) => (
            <div key={i} className="flex items-center gap-3 p-4">
              <span className="text-xl">{act.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{act.action}</p>
                <p className="text-xs text-muted-foreground">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
