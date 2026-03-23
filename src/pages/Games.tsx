import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";
import GameCard from "@/components/games/GameCard";
import QuizGame, { QUIZ_GAME_MAP } from "@/components/games/QuizGame";
import MemoryGame from "@/components/games/MemoryGame";
import MathGame from "@/components/games/MathGame";
import BrainGymGame from "@/components/games/BrainGymGame";

const allGames = [
  { id: 8, title: "Kuiz Alfabeti Shqip", description: "60+ pyetje mbi alfabetin shqip, germat dhe shqiptimin", module: "alfabeti", level: "fillestar", duration: "60 pyetje", points: 40 },
  { id: 9, title: "Kuiz Alfabeti Anglisht", description: "60+ pyetje mbi alfabetin anglisht dhe shqiptimin", module: "alfabeti", level: "fillestar", duration: "60 pyetje", points: 40 },
  { id: 10, title: "Kuiz Alfabeti Arab", description: "60+ pyetje mbi shkronjat arabe dhe format e tyre", module: "alfabeti", level: "fillestar", duration: "60 pyetje", points: 50 },
  { id: 29, title: "Kuiz Lakimi i Emrit Shqip", description: "60+ pyetje mbi rasat e emrit shqip", module: "alfabeti", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 30, title: "Kuiz Zgjedhimi Foljeve Shqip", description: "60+ pyetje mbi zgjedhimin e foljeve shqip", module: "alfabeti", level: "mesatar", duration: "60 pyetje", points: 60 },
  { id: 31, title: "Kuiz Zgjedhimi Arabisht", description: "60+ pyetje mbi zgjedhimin e foljeve arabe", module: "alfabeti", level: "avancuar", duration: "60 pyetje", points: 80 },
  { id: 13, title: "Kuiz Texhuidi Mesatar", description: "60+ pyetje mbi rregullat e texhuidit", module: "texhuidi", level: "mesatar", duration: "60 pyetje", points: 60 },
  { id: 14, title: "Kuiz Texhuidi Avancuar", description: "60+ pyetje të vështira mbi texhuidin", module: "texhuidi", level: "avancuar", duration: "60 pyetje", points: 80 },
  { id: 19, title: "Kuiz Texhuidi - Izhar", description: "60+ pyetje specifike mbi Izhar dhe Idgham", module: "texhuidi", level: "fillestar", duration: "60 pyetje", points: 40 },
  { id: 33, title: "Kuiz Texhuidi - Ikhfa", description: "60+ pyetje mbi rregullën Ikhfa", module: "texhuidi", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 34, title: "Kuiz Texhuidi - Madd", description: "60+ pyetje mbi llojet e Madd dhe zgjatimin", module: "texhuidi", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 35, title: "Kuiz Texhuidi - Qalqalah", description: "60+ pyetje mbi rregullën Qalqalah", module: "texhuidi", level: "fillestar", duration: "60 pyetje", points: 40 },
  { id: 15, title: "Kompletim Ajeti", description: "Plotëso ajetin e Kur'anit — 60+ ajete", module: "kurani", level: "mesatar", duration: "60 ajete", points: 70 },
  { id: 16, title: "Kuiz Kur'ani Mesatar", description: "60+ pyetje mbi suret, ajetet dhe historinë", module: "kurani", level: "mesatar", duration: "60 pyetje", points: 65 },
  { id: 37, title: "Kuiz Suret e Shkurtra", description: "60+ pyetje mbi suret e fundit (Juz Amma)", module: "kurani", level: "fillestar", duration: "60 pyetje", points: 50 },
  { id: 38, title: "Kuiz Historitë Kur'anore", description: "60+ pyetje mbi historitë dhe profetët", module: "kurani", level: "mesatar", duration: "60 pyetje", points: 65 },
  { id: 17, title: "Kuiz Umra Mesatar", description: "60+ pyetje mbi hapat dhe ritualat e Umrës", module: "umra_haxh", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 18, title: "Kuiz Haxhi Avancuar", description: "60+ pyetje të detajuara mbi ritualet e Haxhit", module: "umra_haxh", level: "avancuar", duration: "60 pyetje", points: 80 },
  { id: 28, title: "Kuiz Umra & Haxhi Niveli 1", description: "60+ pyetje bazike mbi Umrën dhe Haxhin", module: "umra_haxh", level: "fillestar", duration: "60 pyetje", points: 40 },
  { id: 41, title: "Vendet e Shenjta", description: "60+ pyetje mbi Kaaben, Mekën, Medinën", module: "umra_haxh", level: "mesatar", duration: "60 pyetje", points: 60 },
  { id: 47, title: "Kuiz Akide & Besimi", description: "60+ pyetje mbi Tevhidin, Shtyllat dhe Kushtet e Imanit", module: "fikh", level: "fillestar", duration: "60 pyetje", points: 50 },
  { id: 48, title: "Kuiz Pastërtia & Abdesi", description: "60+ pyetje mbi Abdesin, Guslin dhe pastërtinë", module: "fikh", level: "fillestar", duration: "60 pyetje", points: 45 },
  { id: 49, title: "Kuiz Namazi", description: "60+ pyetje mbi hapat e namazit, kushtet, kohët", module: "fikh", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 50, title: "Kuiz Agjërimi & Zekati", description: "60+ pyetje mbi agjërimin, Ramazanin dhe Zekatin", module: "fikh", level: "mesatar", duration: "60 pyetje", points: 55 },
  { id: 2, title: "Loja e Numrave", description: "Ushtrime matematikore: mbledhje, zbritje, shumëzo, pjesëto", module: "lojera", level: "fillestar", duration: "60+ pyetje", points: 40 },
  { id: 12, title: "🎴 Lojë Memorie", description: "Gjej çiftet e kartave — 3 gjuhë: shqip, arabisht, anglisht", module: "lojera", level: "fillestar", duration: "pa limit", points: 30 },
  { id: 7, title: "🧠 Brain Gym Fillestar", description: "Gjej modelin e njëjtë! Rrjeta 3×3", module: "lojera", level: "fillestar", duration: "pa limit", points: 60, isBrainGym: true, brainGymLevel: "fillestar" },
  { id: 71, title: "🧠 Brain Gym Mesatar", description: "Gjej modelin e njëjtë! Rrjeta 4×4", module: "lojera", level: "mesatar", duration: "pa limit", points: 80, isBrainGym: true, brainGymLevel: "mesatar" },
  { id: 72, title: "🧠 Brain Gym Avancuar", description: "Gjej modelin e njëjtë! Rrjeta 5×5", module: "lojera", level: "avancuar", duration: "pa limit", points: 100, isBrainGym: true, brainGymLevel: "avancuar" },
  { id: 73, title: "🧠 Brain Gym Profesionist", description: "Gjej modelin e njëjtë! Rrjeta 6×6", module: "lojera", level: "profesionist", duration: "pa limit", points: 150, isBrainGym: true, brainGymLevel: "profesionist" },
];

const modules = [
  { value: "te_gjitha", label: "🌟 Të Gjitha" },
  { value: "alfabeti", label: "🔤 Alfabeti" },
  { value: "texhuidi", label: "📝 Texhuidi" },
  { value: "kurani", label: "📖 Kur'ani" },
  { value: "umra_haxh", label: "🕌 Umra & Haxhi" },
  { value: "fikh", label: "⭐ Fikh" },
  { value: "lojera", label: "🎮 Lojëra" },
];

const levels = [
  { value: "te_gjitha", label: "Të Gjitha" },
  { value: "fillestar", label: "🌱 Fillestar" },
  { value: "mesatar", label: "📚 Mesatar" },
  { value: "avancuar", label: "⭐ Avancuar" },
  { value: "profesionist", label: "🏆 Profesionist" },
];

export default function Games() {
  const [searchParams] = useSearchParams();
  const [selectedModule, setSelectedModule] = useState("te_gjitha");
  const [selectedLevel, setSelectedLevel] = useState("te_gjitha");
  const [activeGame, setActiveGame] = useState<{ id: number; quizKey: string } | null>(null);
  const [activeMath, setActiveMath] = useState(false);
  const [activeMemory, setActiveMemory] = useState(false);
  const [activeBrainGym, setActiveBrainGym] = useState(false);
  const [brainGymLevel, setBrainGymLevel] = useState("fillestar");

  const filtered = allGames.filter(g => {
    const mM = selectedModule === "te_gjitha" || g.module === selectedModule;
    const lM = selectedLevel === "te_gjitha" || g.level === selectedLevel;
    return mM && lM;
  });

  const handlePlay = (game: any) => {
    if (game.isBrainGym) { setBrainGymLevel(game.brainGymLevel || "fillestar"); setActiveBrainGym(true); }
    else if (QUIZ_GAME_MAP[game.id]) { setActiveGame({ id: game.id, quizKey: QUIZ_GAME_MAP[game.id] }); }
    else if (game.id === 12) { setActiveMemory(true); }
    else if (game.id === 2) { setActiveMath(true); }
    else { setActiveGame({ id: game.id, quizKey: "kurani" }); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <Gamepad2 className="w-4 h-4" /> Mëso Duke Luajtur
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2"><span className="text-gradient">Lojëra & Sfida</span></h1>
        <p className="text-muted-foreground max-w-xl mx-auto">30+ lojëra edukative me 60+ pyetje secila — testo njohuritë e tua!</p>
      </motion.div>

      {/* Module filter */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-primary mb-2">Moduli:</p>
        <div className="flex flex-wrap gap-2">
          {modules.map(m => (
            <button key={m.value} onClick={() => setSelectedModule(m.value)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedModule === m.value ? "bg-primary text-primary-foreground shadow-md" : "bg-card border border-border text-foreground/70 hover:border-primary/50"}`}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Level filter */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-primary mb-2">Niveli:</p>
        <div className="flex flex-wrap gap-2">
          {levels.map(l => (
            <button key={l.value} onClick={() => setSelectedLevel(l.value)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedLevel === l.value ? "bg-primary text-primary-foreground shadow-md" : "bg-card border border-border text-foreground/70 hover:border-primary/50"}`}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-4">{filtered.length} lojëra</p>

      {/* Game modals */}
      {activeGame && <QuizGame gameId={activeGame.id} quizKey={activeGame.quizKey} onClose={() => setActiveGame(null)} />}
      {activeMath && <MathGame onClose={() => setActiveMath(false)} />}
      {activeMemory && <MemoryGame onClose={() => setActiveMemory(false)} />}
      {activeBrainGym && <BrainGymGame initialLevel={brainGymLevel} onClose={() => setActiveBrainGym(false)} />}

      {/* Game cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(game => (
          <GameCard key={game.id} game={game} onPlay={handlePlay} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-4xl mb-3">🎮</p>
          <p>Nuk u gjet asnjë lojë me këto filtra.</p>
        </div>
      )}
    </div>
  );
}
