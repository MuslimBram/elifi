import React from "react";
import { motion } from "framer-motion";
import { Heart, BookOpen, Star, Trash2 } from "lucide-react";
import { useFavorites, FavoriteItem } from "@/hooks/useFavorites";
import { Link } from "react-router-dom";

const TYPE_CONFIG: Record<FavoriteItem["type"], { label: string; icon: React.ElementType; color: string; emoji: string }> = {
  surah: { label: "Sure", icon: BookOpen, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", emoji: "📖" },
  dua: { label: "Dua", icon: Star, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", emoji: "🤲" },
  hadith: { label: "Hadith", icon: BookOpen, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", emoji: "📚" },
  ayah: { label: "Ajet", icon: BookOpen, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", emoji: "✨" },
};

export default function Favorites() {
  const { favorites, removeFavorite, getFavoritesByType } = useFavorites();

  const types: FavoriteItem["type"][] = ["surah", "dua", "hadith", "ayah"];
  const groupedTypes = types.filter(t => getFavoritesByType(t).length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <Heart className="w-4 h-4 text-red-500" />
          Të preferuarat
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          <span className="text-gradient">Favoritët e Mi</span>
        </h1>
        <p className="text-muted-foreground">Suret, duatë dhe hadithet që ke ruajtur</p>
      </motion.div>

      {favorites.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-12 text-center">
          <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-foreground mb-2">Ende pa favorit</h3>
          <p className="text-sm text-muted-foreground mb-4">Shtyp ikonën ❤️ te suret ose duatë për t'i shtuar këtu.</p>
          <Link to="/quran" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all">
            <BookOpen className="w-4 h-4" /> Shko te Kur'ani
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {types.map(type => {
              const config = TYPE_CONFIG[type];
              const count = getFavoritesByType(type).length;
              return (
                <motion.div key={type} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-2xl p-4 text-center">
                  <span className="text-2xl">{config.emoji}</span>
                  <p className="text-xl font-bold text-foreground mt-1">{count}</p>
                  <p className="text-xs text-muted-foreground">{config.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Grouped items */}
          {groupedTypes.map(type => {
            const config = TYPE_CONFIG[type];
            const items = getFavoritesByType(type);
            return (
              <motion.div key={type} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span>{config.emoji}</span> {config.label}t ({items.length})
                </h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{item.title}</p>
                        {item.arabic && <p className="text-base font-arabic text-primary mt-0.5" dir="rtl">{item.arabic}</p>}
                        {item.translation && <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.translation}</p>}
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {new Date(item.addedAt).toLocaleDateString("sq-AL")}
                        </p>
                      </div>
                      <button onClick={() => removeFavorite(item.id)}
                        className="p-2 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors ml-2 shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
