import React from "react";
import { BarChart3, BookOpen, Languages, Gamepad2, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const modules = [
  { name: "Alfabeti", icon: Languages, path: "/alphabet", progress: 45, lessons: 6, completed: 3, color: "from-blue-500 to-cyan-500" },
  { name: "Kur'ani", icon: BookOpen, path: "/quran", progress: 30, lessons: 5, completed: 1, color: "from-amber-500 to-orange-500" },
  { name: "Umra & Haxhi", icon: MapPin, path: "/umra-hajj", progress: 20, lessons: 4, completed: 1, color: "from-teal-500 to-cyan-500" },
  { name: "Fikh Elementar", icon: Star, path: "/fikh", progress: 10, lessons: 7, completed: 1, color: "from-green-500 to-emerald-600" },
  { name: "Lojëra", icon: Gamepad2, path: "/games", progress: 60, lessons: 3, completed: 2, color: "from-pink-500 to-rose-500" },
];

const recentActivity = [
  { action: "Përfundove kuizin e Fikhut", time: "Sot, 14:30", icon: "🎯" },
  { action: "Dëgjove Suren El-Fatiha", time: "Sot, 10:15", icon: "📖" },
  { action: "Mësove numrat 1-20 në arabisht", time: "Dje, 18:00", icon: "🔢" },
  { action: "Luajte lojën e Hafizjes", time: "Dje, 15:45", icon: "🃏" },
  { action: "Lexove hapat e Umras", time: "2 ditë më parë", icon: "🕋" },
];

export default function Progress() {
  const totalProgress = Math.round(modules.reduce((s, m) => s + m.progress, 0) / modules.length);

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

      {/* Overall */}
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
        <p className="text-sm text-muted-foreground">Vazhdo kështu!</p>
      </motion.div>

      {/* Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <Link to={mod.path} className="glass-card rounded-2xl p-5 block hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{mod.name}</h3>
                    <p className="text-xs text-muted-foreground">{mod.completed}/{mod.lessons} mësime</p>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${mod.color} transition-all`} style={{ width: `${mod.progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">{mod.progress}%</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-lg font-bold text-foreground mb-4">📋 Aktiviteti i Fundit</h2>
        <div className="glass-card rounded-2xl divide-y divide-border">
          {recentActivity.map((act, i) => (
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
