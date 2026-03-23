import React, { useState, useEffect } from "react";
import { Clock, MapPin, LocateFixed } from "lucide-react";

const PRAYER_META: Record<string, { emoji: string; sq: string; sub?: string }> = {
  Fajr: { emoji: "🌄", sq: "Sabahu", sub: "Agimi" },
  Sunrise: { emoji: "☀️", sq: "Lindja e Diellit" },
  Dhuhr: { emoji: "🟡", sq: "Dreka", sub: "Mesditja" },
  Asr: { emoji: "🟠", sq: "Ikindia", sub: "Pasditja" },
  Maghrib: { emoji: "🌇", sq: "Akshami", sub: "Perëndimi" },
  Isha: { emoji: "🌙", sq: "Jacia", sub: "Nata" },
};

const SHOW_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default function PrayerTimesWidget() {
  const [times, setTimes] = useState<Record<string, string> | null>(null);
  const [city, setCity] = useState("Tirane");
  const [locationName, setLocationName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hijriDate, setHijriDate] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchByCity = async (cityName: string) => {
    setLoading(true);
    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const res = await fetch(`https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(cityName)}&country=Albania&method=3`);
      const data = await res.json();
      if (data.data?.timings) {
        setTimes(data.data.timings);
        const h = data.data?.date?.hijri;
        if (h) setHijriDate(`${h.day} ${h.month?.en || ""} ${h.year} هـ`);
      }
    } catch { /* silent */ }
    setLoading(false);
  };

  const fetchByCoords = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=3`);
      const data = await res.json();
      if (data.data?.timings) {
        setTimes(data.data.timings);
        const h = data.data?.date?.hijri;
        if (h) setHijriDate(`${h.day} ${h.month?.en || ""} ${h.year} هـ`);
      }
    } catch { /* silent */ }
    setLoading(false);
  };

  useEffect(() => { fetchByCity(city); }, [city]);

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      fetchByCoords(latitude, longitude);
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const d = await r.json();
        setLocationName(d.address?.city || d.address?.town || d.address?.village || "GPS");
      } catch { setLocationName("GPS"); }
    });
  };

  const getNextPrayer = () => {
    if (!times) return null;
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    for (const p of ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]) {
      const [h, m] = (times[p] || "00:00").split(":").map(Number);
      if (h * 60 + m > now) return p;
    }
    return "Fajr";
  };

  const nextPrayer = getNextPrayer();
  const timeString = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const dateString = currentTime.toLocaleDateString("sq-AL", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg">Kohët e Namazit</h3>
          </div>
          <div className="flex gap-2">
            <button onClick={detectLocation} className="flex items-center gap-1 bg-emerald-600/40 hover:bg-emerald-600/60 rounded-xl px-2 py-1 transition-colors" title="Zbulo vendndodhjen">
              <LocateFixed className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs text-emerald-200 font-semibold">{locationName || "GPS"}</span>
            </button>
            {!locationName && (
              <div className="flex items-center gap-1 bg-white/10 rounded-xl px-2 py-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                <select value={city} onChange={e => { setLocationName(null); setCity(e.target.value); }} className="bg-transparent text-white text-xs font-semibold outline-none cursor-pointer">
                  <option value="Tirane" className="text-black">Tiranë</option>
                  <option value="Durres" className="text-black">Durrës</option>
                  <option value="Shkoder" className="text-black">Shkodër</option>
                  <option value="Vlore" className="text-black">Vlorë</option>
                  <option value="Elbasan" className="text-black">Elbasan</option>
                  <option value="Korce" className="text-black">Korçë</option>
                  <option value="Fier" className="text-black">Fier</option>
                  <option value="Berat" className="text-black">Berat</option>
                  <option value="Prizren" className="text-black">Prizren</option>
                  <option value="Prishtine" className="text-black">Prishtinë</option>
                  <option value="Tetove" className="text-black">Tetovë</option>
                  <option value="Shkup" className="text-black">Shkup</option>
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-mono font-bold">⏰ {timeString}</p>
          <div className="text-right text-sm">
            <p className="text-white/80">{dateString}</p>
            {hijriDate && <p className="text-emerald-300 text-xs">{hijriDate}</p>}
          </div>
        </div>
      </div>

      {/* Prayer list */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800">
        {loading && <div className="text-center py-4 text-white/50 text-sm">Duke ngarkuar...</div>}
        {times && SHOW_ORDER.map(key => {
          const meta = PRAYER_META[key];
          const isNext = key === nextPrayer;
          return (
            <div key={key} className={`flex items-center justify-between px-4 py-3 border-b border-white/5 ${isNext ? "bg-emerald-500/10" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="text-lg">{meta.emoji}</span>
                <div>
                  <p className={`text-sm font-semibold ${isNext ? "text-emerald-400" : "text-white/80"}`}>{meta.sq}</p>
                  {meta.sub && <p className="text-[10px] text-white/40">{meta.sub}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold font-mono ${isNext ? "text-emerald-400" : "text-white/70"}`}>{times[key]?.slice(0, 5)}</span>
                {isNext && <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Radhës</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
