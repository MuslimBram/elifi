import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, RotateCcw, Timer } from "lucide-react";

const CARD_SETS: Record<string, string[]> = {
  shqip: ["🍎Mollë","🐶Qen","🌙Hënë","⭐Yll","🌊Det","🏔️Mal","🌺Lule","🦋Flutur","📚Libër","🎵Muzikë","🌳Pemë","🦁Luan"],
  arabisht: ["ا Elif","ب Ba","ت Ta","ث Tha","ج Xhim","ح Ha","خ Kha","د Dal","ر Ra","ز Zayn","س Sin","ش Shin"],
  anglisht: ["🐱Cat","🐦Bird","🌻Sun","🌊Sea","🏠Home","🍕Pizza","🎸Guitar","🚀Rocket","🦋Butterfly","🌈Rainbow","⚡Thunder","🎯Target"],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
}

interface Card { id: number; value: string }

export default function MemoryGame({ onClose }: { onClose: () => void }) {
  const [lang, setLang] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [phase, setPhase] = useState<"select" | "playing" | "done">("select");
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (phase !== "playing" || matched.length === 8) return;
    const t = setInterval(() => setTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [phase, matched.length]);

  const startGame = (l: string) => {
    setLang(l);
    const items = CARD_SETS[l].slice(0, 8);
    setCards(shuffle([...items, ...items].map((v, i) => ({ id: i, value: v }))));
    setFlipped([]); setMatched([]); setMoves(0); setTime(0); setPhase("playing");
  };

  const handleFlip = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(cards[idx].value)) return;
    const nf = [...flipped, idx];
    setFlipped(nf);
    if (nf.length === 2) {
      setMoves(m => m + 1);
      if (cards[nf[0]].value === cards[nf[1]].value) {
        const nm = [...matched, cards[nf[0]].value];
        setMatched(nm); setFlipped([]);
        if (nm.length === 8) setPhase("done");
      } else { setTimeout(() => setFlipped([]), 900); }
    }
  };

  const isFlipped = (idx: number) => flipped.includes(idx) || matched.includes(cards[idx]?.value);
  const rating = moves <= 12 ? "🏆 Perfekt!" : moves <= 18 ? "👍 Shumë mirë!" : moves <= 25 ? "💪 Mirë!" : "📚 Mëso koordinimin!";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-3xl p-5 text-white flex justify-between items-center">
          <div><p className="text-2xl">🎴</p><h2 className="font-bold text-lg">Lojë Memorie</h2></div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold">✕</button>
        </div>

        {phase === "select" && (
          <div className="p-8 text-center">
            <p className="text-4xl mb-4">🎴</p>
            <h3 className="text-xl font-bold text-foreground mb-2">Zgjedh Gjuhën</h3>
            <p className="text-muted-foreground text-sm mb-6">Gjej 8 çifte kartash duke pasur sa më pak lëvizje!</p>
            <div className="space-y-3">
              {[{ l: "shqip", label: "🇦🇱 Shqip — Fjalë & Emoji" }, { l: "arabisht", label: "🇸🇦 Arabisht — Shkronjat" }, { l: "anglisht", label: "🇬🇧 Anglisht — Fjalë & Emoji" }].map(item => (
                <button key={item.l} onClick={() => startGame(item.l)} className="w-full py-4 rounded-2xl bg-secondary border border-border hover:border-primary/50 font-semibold text-foreground transition-all">
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "playing" && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4 text-sm font-semibold text-muted-foreground">
              <span>Lëvizje: {moves}</span>
              <div className="flex items-center gap-1"><Timer className="w-4 h-4" /> {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}</div>
              <span>Çifte: {matched.length}/8</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 mb-4"><div className="bg-pink-500 h-2 rounded-full transition-all" style={{ width: `${(matched.length / 8) * 100}%` }} /></div>
            <div className="grid grid-cols-4 gap-2">
              {cards.map((card, i) => {
                const fl = isFlipped(i);
                const mt = matched.includes(card.value);
                return (
                  <button key={card.id} onClick={() => handleFlip(i)} disabled={fl} className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all ${mt ? "bg-emerald-500/10 border-2 border-emerald-400 text-foreground" : fl ? "bg-pink-500/10 border-2 border-pink-400 text-foreground" : "bg-secondary hover:bg-secondary/80 border border-border text-transparent"}`}>
                    {fl ? card.value : "?"}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => startGame(lang!)} className="flex-1 py-2 rounded-xl bg-pink-500/10 text-pink-600 font-semibold text-sm flex items-center justify-center gap-1"><RotateCcw className="w-3.5 h-3.5" /> Rifillo</button>
              <button onClick={() => setPhase("select")} className="flex-1 py-2 rounded-xl bg-secondary text-muted-foreground font-semibold text-sm">Gjuha</button>
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="p-8 text-center space-y-4">
            <Trophy className="w-14 h-14 text-amber-400 mx-auto" />
            <h3 className="text-2xl font-bold text-foreground">Gjete të gjitha! 🎉</h3>
            <div className="grid grid-cols-3 gap-3">
              {[{ l: "Lëvizje", v: moves, i: "🎯" }, { l: "Koha", v: `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`, i: "⏱️" }, { l: "Çifte", v: "8/8", i: "🃏" }].map(s => (
                <div key={s.l} className="bg-secondary rounded-xl p-3 text-center"><p className="text-xl">{s.i}</p><p className="font-bold text-foreground">{s.v}</p><p className="text-xs text-muted-foreground">{s.l}</p></div>
              ))}
            </div>
            <p className="font-semibold text-foreground">{rating}</p>
            <div className="flex gap-3">
              <button onClick={() => startGame(lang!)} className="flex-1 py-3 rounded-xl bg-pink-500 text-white font-bold">🔄 Sërish</button>
              <button onClick={() => setPhase("select")} className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-bold">Gjuha</button>
              <button onClick={onClose} className="flex-1 py-3 rounded-xl border-2 border-border text-foreground font-bold">Mbyll</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
