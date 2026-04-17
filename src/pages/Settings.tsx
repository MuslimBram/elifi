import React, { useState, useEffect } from "react";
import { Settings as SettingsIcon, Volume2, VolumeX, Moon, Sun, Type, RotateCcw, Globe, Palette, Check, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import TwoFactorSetup from "@/components/auth/TwoFactorSetup";
import { useAuth } from "@/hooks/useAuth";

const LANGUAGES = [
  { code: "sq", label: "Shqip", flag: "🇦🇱", dialects: ["Standard", "Gegërishte", "Toskërishte"] },
  { code: "en", label: "English", flag: "🇬🇧", dialects: ["British", "American"] },
  { code: "ar", label: "العربية", flag: "🇸🇦", dialects: ["Fusha (Standard)", "Hixhazi", "Misri"] },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", dialects: ["Standard"] },
  { code: "de", label: "Deutsch", flag: "🇩🇪", dialects: ["Standard"] },
];

const UI_LABELS: Record<string, Record<string, string>> = {
  sq: { title: "Cilësimet Personale", subtitle: "Personalizo përvojën tënde të mësimit", langSection: "Gjuha dhe Dialekti", activeTag: "aktive", dialect: "Dialekti i preferuar", theme: "Tema", fontSize: "Madhësia e shkrimit", small: "I vogël", medium: "Normal", large: "I madh", notifications: "Njoftimet", saveBtn: "Ruaj Cilësimet", savedBtn: "U ruajtën!", note: "Platforma është ndërtuar në shqip. Gjuha e zgjedhur ruhet për funksione të ardhshme.", reset: "Rivendos Progresin", resetDesc: "Fshi të gjitha të dhënat e progresit", sound: "Zëri / Audio", daily: "Kujtesë ditore", challenges: "Sfidat", achievements: "Arritjet" },
  en: { title: "Personal Settings", subtitle: "Customize your learning experience", langSection: "Language & Dialect", activeTag: "active", dialect: "Preferred dialect", theme: "Theme", fontSize: "Font Size", small: "Small", medium: "Normal", large: "Large", notifications: "Notifications", saveBtn: "Save Settings", savedBtn: "Saved!", note: "Platform is built in Albanian. Selected language is saved for future features.", reset: "Reset Progress", resetDesc: "Delete all progress data", sound: "Sound / Audio", daily: "Daily reminder", challenges: "Challenges", achievements: "Achievements" },
  ar: { title: "الإعدادات الشخصية", subtitle: "خصّص تجربة التعلم الخاصة بك", langSection: "اللغة واللهجة", activeTag: "نشطة", dialect: "اللهجة المفضلة", theme: "المظهر", fontSize: "حجم الخط", small: "صغير", medium: "عادي", large: "كبير", notifications: "الإشعارات", saveBtn: "حفظ الإعدادات", savedBtn: "تم الحفظ!", note: "المنصة مبنية باللغة الألبانية.", reset: "إعادة التعيين", resetDesc: "حذف كافة بيانات التقدم", sound: "الصوت", daily: "تذكير يومي", challenges: "التحديات", achievements: "الإنجازات" },
  tr: { title: "Kişisel Ayarlar", subtitle: "Öğrenme deneyimini kişiselleştir", langSection: "Dil ve Lehçe", activeTag: "aktif", dialect: "Tercih edilen lehçe", theme: "Tema", fontSize: "Yazı Boyutu", small: "Küçük", medium: "Normal", large: "Büyük", notifications: "Bildirimler", saveBtn: "Ayarları Kaydet", savedBtn: "Kaydedildi!", note: "Platform Arnavutça olarak geliştirilmiştir.", reset: "Sıfırla", resetDesc: "Tüm ilerleme verilerini sil", sound: "Ses", daily: "Günlük hatırlatıcı", challenges: "Meydan okumalar", achievements: "Başarılar" },
  de: { title: "Persönliche Einstellungen", subtitle: "Personalisiere deine Lernerfahrung", langSection: "Sprache & Dialekt", activeTag: "aktiv", dialect: "Bevorzugter Dialekt", theme: "Design", fontSize: "Schriftgröße", small: "Klein", medium: "Normal", large: "Groß", notifications: "Benachrichtigungen", saveBtn: "Einstellungen speichern", savedBtn: "Gespeichert!", note: "Die Plattform ist auf Albanisch aufgebaut.", reset: "Zurücksetzen", resetDesc: "Alle Fortschrittsdaten löschen", sound: "Ton", daily: "Tägliche Erinnerung", challenges: "Herausforderungen", achievements: "Erfolge" },
};

const THEMES = [
  { id: "light", label: "E çelët", icon: Sun, preview: "bg-background border-border" },
  { id: "dark", label: "E errët", icon: Moon, preview: "bg-foreground border-border" },
  { id: "emerald", label: "Gjelbërt", icon: Palette, preview: "bg-emerald-500 border-emerald-600" },
];

interface AppSettings {
  language: string;
  dialect: string;
  theme: string;
  fontSize: string;
  soundEnabled: boolean;
  notifyDaily: boolean;
  notifyChallenges: boolean;
  notifyAchievements: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  language: "sq",
  dialect: "Standard",
  theme: "light",
  fontSize: "medium",
  soundEnabled: true,
  notifyDaily: true,
  notifyChallenges: true,
  notifyAchievements: true,
};

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem("app_settings");
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {}
    return { ...DEFAULT_SETTINGS, theme: document.documentElement.classList.contains("dark") ? "dark" : "light" };
  });
  const [saved, setSaved] = useState(false);

  const selectedLang = LANGUAGES.find(l => l.code === settings.language) || LANGUAGES[0];
  const t = UI_LABELS[settings.language] || UI_LABELS.sq;

  const update = (key: keyof AppSettings, value: string | boolean) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      localStorage.setItem("app_settings", JSON.stringify(next));
      if (key === "theme") applyTheme(value as string);
      if (key === "fontSize") applyFontSize(value as string);
      if (key === "soundEnabled") localStorage.setItem("sound", value ? "on" : "off");
      return next;
    });
  };

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    root.classList.remove("dark");
    localStorage.setItem("theme", theme === "dark" ? "dark" : "light");
    if (theme === "dark") root.classList.add("dark");
  };

  const applyFontSize = (size: string) => {
    const root = document.documentElement;
    localStorage.setItem("fontSize", size);
    if (size === "small") root.style.fontSize = "14px";
    else if (size === "large") root.style.fontSize = "18px";
    else root.style.fontSize = "16px";
  };

  const handleSave = () => {
    localStorage.setItem("app_settings", JSON.stringify(settings));
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);
    toast.success(t.savedBtn);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm(t.language === "sq" ? "Je i sigurt që dëshiron të fshish progresin?" : "Are you sure you want to reset progress?")) {
      const theme = settings.theme;
      const lang = settings.language;
      localStorage.clear();
      setSettings({ ...DEFAULT_SETTINGS, theme, language: lang });
      document.documentElement.classList.remove("dark");
      document.documentElement.style.fontSize = "16px";
      if (theme === "dark") document.documentElement.classList.add("dark");
      toast.success("Progresi u rivendos!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <SettingsIcon className="w-4 h-4" />
          {t.title}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          <span className="text-gradient">{t.title}</span>
        </h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </motion.div>

      <div className="space-y-4">
        {/* Language Selection */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground text-sm">{t.langSection}</h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => { update("language", lang.code); update("dialect", lang.dialects[0]); }}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  settings.language === lang.code
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {lang.flag} {lang.label}
                {settings.language === lang.code && (
                  <span className="ml-1.5 text-xs bg-primary-foreground/20 px-1.5 py-0.5 rounded-full">{t.activeTag}</span>
                )}
              </button>
            ))}
          </div>
          {selectedLang.dialects.length > 1 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">{t.dialect}</p>
              <div className="flex gap-2">
                {selectedLang.dialects.map(d => (
                  <button key={d} onClick={() => update("dialect", d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      settings.dialect === d ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-foreground/60"
                    }`}
                  >{d}</button>
                ))}
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-3 italic">ℹ️ {t.note}</p>
        </div>

        {/* Theme */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground text-sm">{t.theme}</h3>
          </div>
          <div className="flex gap-3">
            {THEMES.map(theme => {
              const Icon = theme.icon;
              return (
                <button key={theme.id} onClick={() => update("theme", theme.id)}
                  className={`flex-1 p-3 rounded-xl border-2 transition-all text-center ${
                    settings.theme === theme.id ? "border-primary shadow-md" : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${theme.preview} mx-auto mb-2 flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-medium text-foreground">{theme.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sound */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-primary" />}
              <div>
                <h3 className="font-bold text-foreground text-sm">{t.sound}</h3>
                <p className="text-xs text-muted-foreground">{settings.soundEnabled ? "ON" : "OFF"}</p>
              </div>
            </div>
            <button onClick={() => update("soundEnabled", !settings.soundEnabled)}
              className={`w-12 h-7 rounded-full transition-colors ${settings.soundEnabled ? "bg-primary" : "bg-secondary"} relative`}>
              <div className={`w-5 h-5 rounded-full bg-primary-foreground absolute top-1 transition-transform ${settings.soundEnabled ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Type className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground text-sm">{t.fontSize}</h3>
          </div>
          <div className="flex gap-2">
            {(["small", "medium", "large"] as const).map(size => (
              <button key={size} onClick={() => update("fontSize", size)}
                className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  settings.fontSize === size ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
                }`}
              >
                {t[size]}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground text-sm">{t.notifications}</h3>
          </div>
          <div className="space-y-3">
            {([
              { key: "notifyDaily" as const, label: t.daily },
              { key: "notifyChallenges" as const, label: t.challenges },
              { key: "notifyAchievements" as const, label: t.achievements },
            ]).map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">{item.label}</span>
                <button onClick={() => update(item.key, !settings[item.key])}
                  className={`w-10 h-6 rounded-full transition-colors ${settings[item.key] ? "bg-primary" : "bg-secondary"} relative`}>
                  <div className={`w-4 h-4 rounded-full bg-primary-foreground absolute top-1 transition-transform ${settings[item.key] ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <button onClick={handleSave}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2">
          {saved ? <><Check className="w-4 h-4" /> {t.savedBtn}</> : t.saveBtn}
        </button>

        {/* 2FA — only shown when logged in */}
        {user && <TwoFactorSetup />}

        {/* Reset */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-destructive" />
              <div>
                <h3 className="font-bold text-foreground text-sm">{t.reset}</h3>
                <p className="text-xs text-muted-foreground">{t.resetDesc}</p>
              </div>
            </div>
            <button onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors">
              {t.reset}
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        Edukim Interaktiv v1.0 — Platforma edukative islamike
      </p>
    </div>
  );
}
