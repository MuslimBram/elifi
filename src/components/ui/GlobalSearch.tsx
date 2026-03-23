import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, Languages, Gamepad2, MapPin, Star, Settings, BarChart3, Heart, BookMarked } from "lucide-react";

interface SearchItem {
  title: string;
  description: string;
  path: string;
  emoji: string;
  category: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Pages
  { title: "Ballina", description: "Faqja kryesore", path: "/", emoji: "🏠", category: "Faqe" },
  { title: "Alfabeti", description: "Germët, numrat, rrokjet në 3 gjuhë", path: "/alphabet", emoji: "🔤", category: "Faqe" },
  { title: "Kur'ani", description: "Suret me audio, kuize, progresi", path: "/quran", emoji: "📖", category: "Faqe" },
  { title: "Texhuidi", description: "Rregullat e texhuidit me shembuj", path: "/tajweed", emoji: "📝", category: "Faqe" },
  { title: "Umra & Haxhi", description: "Udhëzues hap-pas-hapi", path: "/umra-hajj", emoji: "🕋", category: "Faqe" },
  { title: "Fikh Elementar", description: "Akide, namaz, agjërim, zekat", path: "/fikh", emoji: "⭐", category: "Faqe" },
  { title: "Lojëra", description: "30+ lojëra edukative", path: "/games", emoji: "🎮", category: "Faqe" },
  { title: "Progresi", description: "Ndjekja e progresit dhe arritjet", path: "/progress", emoji: "📊", category: "Faqe" },
  { title: "Favoritët", description: "Suret dhe duatë e ruajtura", path: "/favorites", emoji: "❤️", category: "Faqe" },
  { title: "Cilësimet", description: "Gjuha, tema, madhësia", path: "/settings", emoji: "⚙️", category: "Faqe" },
  // Quran tabs
  { title: "Suret me Audio", description: "18+ sure me tekst arabisht dhe audio", path: "/quran?tab=suret", emoji: "🎵", category: "Kur'ani" },
  { title: "Kuiz Kurani", description: "Testo njohuritë kuranore", path: "/quran?tab=quiz", emoji: "🎯", category: "Kur'ani" },
  { title: "Hadithe Sahihe", description: "Buhari, Muslim, Tirmidhi", path: "/quran?tab=hadithe", emoji: "📚", category: "Kur'ani" },
  { title: "Rijadu Es-Salihin", description: "Hadithe me komente", path: "/quran?tab=rijadu", emoji: "📗", category: "Kur'ani" },
  { title: "Tefsir Dijetaresh", description: "Komente kuranore", path: "/quran?tab=tefsir", emoji: "📜", category: "Kur'ani" },
  { title: "Sevapet", description: "Vlera e leximit të Kur'anit", path: "/quran?tab=sevapet", emoji: "✨", category: "Kur'ani" },
  // Surahs
  { title: "Sure El-Fatiha", description: "Surja hapëse e Kur'anit", path: "/quran?tab=suret", emoji: "📖", category: "Sure" },
  { title: "Sure Jasin", description: "Zemra e Kur'anit", path: "/quran?tab=suret", emoji: "📖", category: "Sure" },
  { title: "Sure Er-Rahman", description: "Mëshiruesi", path: "/quran?tab=suret", emoji: "📖", category: "Sure" },
  { title: "Sure El-Mulk", description: "Sundimi", path: "/quran?tab=suret", emoji: "📖", category: "Sure" },
  { title: "Sure El-Ihlas", description: "Sinqeriteti", path: "/quran?tab=suret", emoji: "📖", category: "Sure" },
  { title: "Sure El-Felek", description: "Agimi", path: "/quran?tab=suret", emoji: "📖", category: "Sure" },
  { title: "Sure En-Nas", description: "Njerëzit", path: "/quran?tab=suret", emoji: "📖", category: "Sure" },
  // Fikh tabs
  { title: "Akide & Besimi", description: "Shtyllat e Islamit dhe Imanit", path: "/fikh?tab=akide", emoji: "🕌", category: "Fikh" },
  { title: "Namazi", description: "Si falet namazi hap-pas-hapi", path: "/fikh?tab=namazi", emoji: "🤲", category: "Fikh" },
  { title: "Duatë", description: "25 dua të përditshme", path: "/fikh?tab=duate", emoji: "🌿", category: "Fikh" },
  { title: "Llogaritësi i Zekatit", description: "Llogarit zekatin tënd", path: "/fikh?tab=zekati", emoji: "💰", category: "Fikh" },
  // Alphabet
  { title: "Germët Arabe", description: "Mëso shkronjat arabe", path: "/alphabet?tab=germat", emoji: "ا", category: "Alfabeti" },
  { title: "Numrat", description: "Numrat në 3 gjuhë", path: "/alphabet?tab=numrat", emoji: "🔢", category: "Alfabeti" },
  { title: "Arabisht Medinë", description: "Kursi nga niveli fillestar", path: "/alphabet?tab=medine", emoji: "🏫", category: "Alfabeti" },
  // Umra
  { title: "Hapat e Umrës", description: "5 hapat e Umrës me dua", path: "/umra-hajj?tab=umra", emoji: "🕊️", category: "Umra & Haxhi" },
  { title: "Hapat e Haxhit", description: "10 hapat e Haxhit", path: "/umra-hajj?tab=haxhi", emoji: "🏔️", category: "Umra & Haxhi" },
  { title: "Vendet e Shenjta", description: "Qabeja, Arafati, Muzdelifa", path: "/umra-hajj?tab=vendet", emoji: "🗺️", category: "Umra & Haxhi" },
];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [open]);

  const filtered = query.length > 0
    ? SEARCH_ITEMS.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : SEARCH_ITEMS.slice(0, 8);

  const handleSelect = (item: SearchItem) => {
    navigate(item.path);
    setOpen(false);
  };

  return (
    <>
      {/* Trigger button in navbar */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/80 text-muted-foreground text-sm hover:bg-secondary transition-colors"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="text-xs">Kërko...</span>
        <kbd className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">⌘K</kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh] p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              className="bg-card rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-border"
              onClick={e => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Kërko sure, lojëra, module..."
                  className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
                />
                <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-secondary text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground text-sm">
                    Nuk u gjet asgjë për "{query}"
                  </div>
                ) : (
                  <>
                    {query.length === 0 && <p className="text-[10px] text-muted-foreground px-3 py-1 font-medium">Të sugjeruara</p>}
                    {filtered.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(item)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary/70 transition-colors text-left"
                      >
                        <span className="text-lg shrink-0">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{item.description}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground shrink-0">{item.category}</span>
                      </button>
                    ))}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border px-4 py-2 flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground">
                  {filtered.length} rezultate
                </p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↑↓</kbd> për të lundruar
                  <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">Esc</kbd> për të mbyllur
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
