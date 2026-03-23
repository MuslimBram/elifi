import React, { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";

const HIJRI_MONTHS = ["Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Xhumada al-Ula", "Xhumada al-Thani", "Rexheb", "Sha'ban", "Ramazan", "Shevval", "Dhul-Ka'deh", "Dhul-Hixhxheh"];

function getHijriApprox(d: Date) {
  const jd = Math.floor(1461 * (d.getFullYear() + 4800 + Math.floor((d.getMonth() + 1 - 14) / 12)) / 4 +
    Math.floor(367 * (d.getMonth() + 1 - 2 - 12 * Math.floor((d.getMonth() + 1 - 14) / 12)) / 12) -
    Math.floor(3 * Math.floor((d.getFullYear() + 4900 + Math.floor((d.getMonth() + 1 - 14) / 12)) / 100) / 4) +
    d.getDate() - 32045);
  const hijriYear = Math.floor((jd - 1948439.5) / 354.36667);
  const monthDay = (jd - 1948439.5) % 354.36667;
  const month = Math.floor(monthDay / 29.5306);
  const day = Math.floor(monthDay % 29.5306) + 1;
  return `${day} ${HIJRI_MONTHS[Math.max(0, Math.min(11, month))]} ${hijriYear} H`;
}

export default function TimeHeaderWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const gregorianDate = time.toLocaleDateString("sq-AL", {
    year: "numeric", month: "long", day: "numeric", weekday: "long"
  });

  const currentTime = time.toLocaleTimeString("sq-AL", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  });

  const hijriDate = getHijriApprox(time);

  return (
    <div className="glass-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Clock className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xl font-bold text-foreground tabular-nums">{currentTime}</p>
          <p className="text-xs text-muted-foreground">{gregorianDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-primary" />
        <p className="text-xs font-medium text-foreground/80">🌙 {hijriDate}</p>
      </div>
    </div>
  );
}
