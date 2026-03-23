import { useState, useCallback } from "react";

export type FavoriteItem = {
  id: string;
  type: "surah" | "dua" | "hadith" | "ayah";
  title: string;
  arabic?: string;
  translation?: string;
  addedAt: string;
};

const STORAGE_KEY = "elif_favorites";

function loadFavorites(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(items: FavoriteItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(loadFavorites);

  const addFavorite = useCallback((item: Omit<FavoriteItem, "addedAt">) => {
    setFavorites(prev => {
      if (prev.some(f => f.id === item.id)) return prev;
      const next = [...prev, { ...item, addedAt: new Date().toISOString() }];
      saveFavorites(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = prev.filter(f => f.id !== id);
      saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.some(f => f.id === id);
  }, [favorites]);

  const toggleFavorite = useCallback((item: Omit<FavoriteItem, "addedAt">) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  }, [isFavorite, removeFavorite, addFavorite]);

  const getFavoritesByType = useCallback((type: FavoriteItem["type"]) => {
    return favorites.filter(f => f.type === type);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite, getFavoritesByType };
}
