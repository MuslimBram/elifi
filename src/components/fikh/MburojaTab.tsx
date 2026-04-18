import React, { useState, useRef, useMemo } from "react";
import { Volume2, Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { MBUROJA_DUA, MBUROJA_CATEGORIES } from "./MburojaData";

export default function MburojaTab() {
  const [category, setCategory] = useState("te_gjitha");
  const [query, setQuery] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filtered = useMemo(() => {
    let list = category === "te_gjitha" ? MBUROJA_DUA : MBUROJA_DUA.filter(d => d.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.meaning.toLowerCase().includes(q) ||
        d.trans.toLowerCase().includes(q)
      );
    }
    return list;
  }, [category, query]);

  const stopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setPlayingId(null);
  };

  const playDua = (id: number, arabic: string, audioUrl?: string) => {
    stopAudio();
    setPlayingId(id);

    const useTTS = () => {
      if (!window.speechSynthesis) { setPlayingId(null); return; }
      const u = new SpeechSynthesisUtterance(arabic);
      u.lang = "ar-SA";
      u.rate = 0.6;
      u.onend = () => setPlayingId(null);
      u.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(u);
    };

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => { setPlayingId(null); audioRef.current = null; };
      audio.onerror = () => { audioRef.current = null; useTTS(); };
      audio.play().catch(() => useTTS());
    } else {
      useTTS();
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-foreground mb-1">🛡️ Mburoja e Muslimanit</h2>
        <p className="text-sm text-muted-foreground">Hisnul Muslim — {MBUROJA_DUA.length} dua nga Sunneti</p>
      </div>

      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kërko dua..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {MBUROJA_CATEGORIES.map(c => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              category === c.value
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border text-foreground/70 hover:border-primary/50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">{filtered.length} dua</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((dua) => (
          <div key={dua.id} className="glass-card rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3 gap-2">
              <div className="flex-1">
                <span className="text-[10px] text-primary font-bold">#{dua.id}</span>
                <h3 className="font-bold text-primary text-sm">{dua.title}</h3>
              </div>
              <button
                onClick={() => playingId === dua.id ? stopAudio() : playDua(dua.id, dua.arabic, dua.audioUrl)}
                className={`p-2 rounded-full transition-colors ${
                  playingId === dua.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
                aria-label="Dëgjo"
              >
                {playingId === dua.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-lg md:text-xl text-foreground font-arabic text-right leading-loose mb-2" dir="rtl">
              {dua.arabic}
            </p>
            <p className="text-xs text-primary/80 italic mb-2">{dua.trans}</p>
            <div className="bg-secondary/50 rounded-xl p-3">
              <p className="text-xs text-foreground/80">🇦🇱 {dua.meaning}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          Asnjë dua nuk u gjet për këtë kërkim.
        </div>
      )}
    </motion.div>
  );
}
