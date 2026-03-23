// Auto daily streak tracker — updates on each app visit
export function updateDailyStreak(): { count: number; lastDate: string } {
  const today = new Date().toISOString().split("T")[0];
  try {
    const raw = localStorage.getItem("daily_streak");
    if (raw) {
      const data = JSON.parse(raw);
      if (data.lastDate === today) return data; // Already visited today

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (data.lastDate === yesterdayStr) {
        // Consecutive day
        const updated = { count: (data.count || 0) + 1, lastDate: today };
        localStorage.setItem("daily_streak", JSON.stringify(updated));
        return updated;
      } else {
        // Streak broken
        const updated = { count: 1, lastDate: today };
        localStorage.setItem("daily_streak", JSON.stringify(updated));
        return updated;
      }
    }
  } catch {}

  // First time
  const initial = { count: 1, lastDate: today };
  localStorage.setItem("daily_streak", JSON.stringify(initial));
  return initial;
}

export function addPoints(amount: number): number {
  try {
    const current = parseInt(localStorage.getItem("elifi_total_points") || "0") || 0;
    const next = current + amount;
    localStorage.setItem("elifi_total_points", String(next));
    return next;
  } catch {
    return 0;
  }
}
