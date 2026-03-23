import React from "react";
import { Clock, Star, Play } from "lucide-react";
import { motion } from "framer-motion";

interface Game {
  id: number;
  title: string;
  description: string;
  module: string;
  level: string;
  duration: string;
  points: number;
  isBrainGym?: boolean;
  brainGymLevel?: string;
}

const moduleColors: Record<string, string> = {
  alfabeti: "from-emerald-400 to-teal-500",
  texhuidi: "from-amber-400 to-orange-500",
  kurani: "from-blue-400 to-indigo-500",
  umra_haxh: "from-purple-400 to-violet-500",
  lojera: "from-pink-400 to-rose-500",
  fikh: "from-green-400 to-emerald-500",
};

const levelColors: Record<string, string> = {
  fillestar: "bg-emerald-100 text-emerald-700",
  mesatar: "bg-amber-100 text-amber-700",
  avancuar: "bg-orange-100 text-orange-700",
  profesionist: "bg-red-100 text-red-700",
};

export default function GameCard({ game, onPlay }: { game: Game; onPlay: (g: Game) => void }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className={`h-2 bg-gradient-to-r ${moduleColors[game.module] || "from-gray-400 to-gray-500"}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex gap-2 flex-wrap">
            {game.level && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[game.level] || ""}`}>{game.level}</span>}
            <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">{game.module}</span>
          </div>
          {game.duration && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{game.duration}</span>}
        </div>
        <h3 className="font-bold text-foreground mb-1">{game.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{game.description}</p>
        {game.points && <div className="flex items-center gap-1 text-amber-500 text-sm mb-4"><Star className="w-4 h-4 fill-amber-400" /><span className="font-medium">{game.points} pikë</span></div>}
        <button onClick={() => onPlay(game)} className="w-full gradient-primary text-primary-foreground rounded-xl py-2.5 font-medium flex items-center justify-center gap-2">
          <Play className="w-4 h-4" /> Luaj Tani
        </button>
      </div>
    </motion.div>
  );
}
