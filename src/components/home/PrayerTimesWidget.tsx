import React, { useState, useEffect, useRef } from "react";
import { Bell, MapPin, ChevronDown, Music } from "lucide-react";

const ALBANIAN_CITIES = [
  "Tirane", "Durres", "Shkoder", "Vlore", "Elbasan", "Korce", "Fier", "Berat",
  "Prizren", "Prishtine", "Tetove", "Shkup", "Gjilan", "Pejë", "Mitrovice",
];

const PRAYERS: Array<{
  key: string;
  label: string;
  sub?: string;
  icon: string;
  isMain: boolean;
  isInfo?: boolean;
}> = [
  { key: "Imsak", label: "Imsaku (fillim agjërimi)", icon: "🌙", isMain: false, isInfo: true },
  { key: "Fajr", label: "Sabahu", sub: "Agimi", icon: "🟢", isMain: true },
  { key: "Sunrise", label: "Lindja e Diellit", icon: "☀️", isMain: false, isInfo: true },
  { key: "Dhuhr", label: "Dreka", icon: "☀️", isMain: true },
  { key: "Asr", label: "Ikindia", sub: "Pasdija", icon: "🌤️", isMain: true },
  { key: "Maghrib", label: "Akshami", sub: "Perëndimi", icon: "🕌", isMain: true },
  { key: "Sunset", label: "Perëndimi i Diellit", icon: "🌅", isMain: false, isInfo: true },
  { key: "Isha", label: "Jacia", sub: "Nata", icon: "🌙", isMain: true },
];

const HIJRI_MONTHS_SQ: Record<string, string> = {
  "Muharram": "Muharrem", "Safar": "Safer", "Rabi al-awwal": "Rebiul-Evvel",
  "Rabi al-thani": "Rebiul-Ahir", "Jumada al-awwal": "Xhumadel-Evvel",
  "Jumada al-thani": "Xhumadel-Ahir", "Rajab": "Rexheb", "Sha'ban": "Shaban",
  "Ramadan": "Ramazan", "Shawwal": "Shevval", "Dhu al-Qi'dah": "Dhul-Kade",
  "Dhu al-Hijjah": "Dhul-Hixhe",
};

export default function PrayerTimesWidget() {
  const [times, setTimes] = useState<Record<string, string> | null>(null);
  const [city, setCity] = useState("Tirane");
  const [usingGPS, setUsingGPS] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hijriDate, setHijriDate] = useState<string | null>(null);
  const [showCityList, setShowCityList] = useState(false);
  const [notify, setNotify] = useState<boolean>(() => localStorage.getItem("prayerNotify") === "1");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchTimes = async (params: string) => {
    setLoading(true);
    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const res = await fetch(`https://api.aladhan.com/v1/${params}&date=${dateStr}&method=3`);
      const data = await res.json();
      if (data.data?.timings) {
        setTimes(data.data.timings);
        const h = data.data?.date?.hijri;
        if (h) {
          const monthSq = HIJRI_MONTHS_SQ[h.month?.en] || h.month?.en || "";
          setHijriDate(`${h.day} ${monthSq} ${h.year}`);
        }
      }
    } catch { /* silent */ }
    setLoading(false);
  };

  useEffect(() => {
    if (!usingGPS) {
      fetchTimes(`timingsByCity/?city=${encodeURIComponent(city)}&country=Albania`);
    }
  }, [city, usingGPS]);

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setUsingGPS(true);
      fetchTimes(`timings/?latitude=${latitude}&longitude=${longitude}`);
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

  const playAdhan = (prayerKey: string) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    const audio = new Audio("https://www.islamcan.com/audio/adhan/azan2.mp3");
    audioRef.current = audio;
    audio.play().catch(() => {
      if ("speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance("Allahu Akbar. Allahu Akbar.");
        u.lang = "ar-SA";
        window.speechSynthesis.speak(u);
      }
    });
  };

  const toggleNotify = () => {
    const v = !notify;
    setNotify(v);
    localStorage.setItem("prayerNotify", v ? "1" : "0");
    if (v && "Notification" in window) Notification.requestPermission();
  };

  const nextPrayer = getNextPrayer();
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  });
  const dateString = currentTime.toLocaleDateString("sq-AL", {
    weekday: "long", month: "short", day: "numeric",
  });

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: "linear-gradient(135deg, rgb(13,27,42) 0%, rgb(26,39,68) 50%, rgb(30,27,58) 100%)" }}
    >
      {/* Top header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full border-2 border-teal-400 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-teal-400" />
          </div>
          <span className="text-white font-bold text-lg">Kohët e Namazit</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleNotify}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              notify ? "bg-teal-500/30 text-teal-300" : "bg-white/10 hover:bg-white/20 text-white/70"
            }`}
            title={notify ? "Njoftimet aktive" : "Aktivizo njoftimet"}
          >
            <Bell className="w-4 h-4" />
          </button>
          <button
            onClick={detectLocation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
              usingGPS
                ? "bg-teal-500/20 border-teal-500/40 text-teal-300"
                : "bg-white/10 border-white/10 text-white/80 hover:bg-white/15"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${usingGPS ? "bg-teal-400 animate-pulse" : "bg-white/40"}`} />
            GPS
          </button>
          <div className="relative">
            <button
              onClick={() => setShowCityList(s => !s)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium"
            >
              <MapPin className="w-3.5 h-3.5 text-white/60" />
              {city === "Tirane" ? "Tiranë" : city}
              <ChevronDown className="w-3.5 h-3.5 text-white/60" />
            </button>
            {showCityList && (
              <div className="absolute right-0 top-full mt-1 w-44 max-h-64 overflow-y-auto bg-gray-900 border border-white/10 rounded-xl shadow-xl z-20">
                {ALBANIAN_CITIES.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCity(c); setUsingGPS(false); setShowCityList(false); }}
                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Time + date */}
      <div className="px-5 pb-4 flex items-center justify-between border-b border-white/10 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/50" />
          </div>
          <span className="text-white text-2xl font-mono font-bold">{timeString}</span>
        </div>
        <div className="text-right">
          <p className="text-teal-400 text-sm font-semibold capitalize">{dateString}</p>
          {hijriDate && <p className="text-amber-400 text-xs">🌙 {hijriDate} 🌙</p>}
        </div>
      </div>

      {/* Prayer list */}
      <div className="divide-y divide-white/5">
        {loading && <div className="text-center py-4 text-white/50 text-sm">Duke ngarkuar...</div>}
        {times && PRAYERS.map(p => {
          const isNext = p.key === nextPrayer && p.isMain;
          const time = times[p.key]?.slice(0, 5);
          if (!time) return null;
          return (
            <div
              key={p.key}
              className={`px-5 py-3 flex items-center justify-between transition-colors ${
                isNext
                  ? "bg-gradient-to-r from-teal-900/60 to-teal-800/30 border-l-4 border-teal-400"
                  : p.isInfo ? "bg-transparent opacity-70" : "hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg w-6 text-center">{p.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    {isNext && <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />}
                    <span className={`font-semibold text-sm ${
                      isNext ? "text-teal-300" : p.isInfo ? "text-yellow-300" : "text-white"
                    }`}>
                      {p.label}
                    </span>
                  </div>
                  {p.key === "Fajr" && times.Fajr && (
                    <p className="text-xs text-white/40">Ezani (Fajr): {times.Fajr.slice(0, 5)}</p>
                  )}
                  {p.sub && <p className="text-xs text-white/30">{p.sub}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-base tabular-nums ${
                  isNext ? "text-teal-300" : p.isInfo ? "text-yellow-300" : "text-white/90"
                }`}>
                  {time}
                </span>
                {p.isMain && (
                  <button
                    onClick={() => playAdhan(p.key)}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/50 hover:text-white/80 transition-colors"
                    title="Dëgjo ezanin"
                  >
                    <Music className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-3 text-center text-white/30 text-xs">
        * Kohët janë afërsisht. Verifikoni me burim lokal.
      </div>
    </div>
  );
}
