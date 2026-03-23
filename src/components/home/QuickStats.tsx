import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const QUICK_LINKS = [
  { title: "Namazi Hap-pas-Hapi", desc: "Mëso mënyrën e saktë të faljes me arabisht", emoji: "🤲", path: "/fikh?tab=namazguide", color: "from-emerald-500 to-teal-500" },
  { title: "Duatë e Përditshme", desc: "10 dua me arabisht, transliterim dhe shqip", emoji: "🌿", path: "/fikh?tab=duate", color: "from-green-500 to-emerald-500" },
  { title: "Kur'ani me Tafsir", desc: "Lexo ajete me kuptim dhe shpjegim shqip", emoji: "📖", path: "/quran?tab=tefsir", color: "from-amber-500 to-orange-500" },
  { title: "Rijadu Es-Salihin", desc: "Hadithe sahihe me komente", emoji: "📗", path: "/quran?tab=rijadu", color: "from-teal-500 to-cyan-500" },
  { title: "Texhuidi i Integruar", desc: "15+ rregulla texhuidi me shembuj", emoji: "🎓", path: "/tajweed", color: "from-violet-500 to-purple-500" },
  { title: "Lojëra Edukative", desc: "60+ kuize me pikë dhe sfida", emoji: "🎮", path: "/games", color: "from-pink-500 to-rose-500" },
];

export default function QuickStats() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-foreground text-center">🚀 Filloni Mësimet</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {QUICK_LINKS.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link to={item.path} className="glass-card rounded-2xl p-4 block hover:shadow-lg transition-all hover:-translate-y-1">
              <span className="text-2xl block mb-2">{item.emoji}</span>
              <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              <div className={`mt-3 h-1 rounded-full bg-gradient-to-r ${item.color} opacity-60`} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
