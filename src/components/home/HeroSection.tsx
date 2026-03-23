import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Languages,
  Gamepad2,
  BookMarked,
  MapPin,
  Star,
  Volume2,
  Copy,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Mësime Aktive", value: "12", icon: "⏱" },
  { label: "Të Kompletuara", value: "5", icon: "🏆" },
  { label: "Rezultat Mesatar", value: "78%", icon: "✨" },
];

const learningSections = [
  {
    title: "🔤 Alfabeti",
    description: "Mëso germët, numrat dhe rrokjet në 3 gjuhë",
    gradient: "from-blue-500 to-cyan-500",
    path: "/alphabet",
    items: ["Numrat", "Germët", "Rrokjet", "Fjalët", "Zgjedhimi", "Lakimi"],
  },
  {
    title: "🕌 Arabisht Medinë",
    description: "Kursi i arabishtes nga niveli fillestar deri profesionist",
    gradient: "from-green-500 to-emerald-600",
    path: "/alphabet?tab=medine",
    items: ["Fillestar", "Mesatar", "Avancuar", "Profesionist", "Mësimet"],
  },
  {
    title: "📖 Kur'ani & Texhuidi",
    description: "Dëgjo suret, mëso texhuidin dhe bëj kuize",
    gradient: "from-amber-500 to-orange-500",
    path: "/quran",
    items: ["Suret me Audio", "Texhuidi", "Rregullat Tajweed", "Kuiz Kurani", "Sevapet"],
  },
];

const quickLinks = [
  { name: "Alfabeti", path: "/alphabet", icon: Languages, gradient: "from-emerald-500 to-teal-500" },
  { name: "Kur'ani", path: "/quran", icon: BookOpen, gradient: "from-amber-500 to-orange-500" },
  { name: "Texhuidi", path: "/tajweed", icon: BookMarked, gradient: "from-violet-500 to-purple-500" },
  { name: "Umra & Haxhi", path: "/umra-hajj", icon: MapPin, gradient: "from-teal-500 to-cyan-500" },
  { name: "Fikh Elementar", path: "/fikh", icon: Star, gradient: "from-green-500 to-emerald-600" },
  { name: "Lojëra", path: "/games", icon: Gamepad2, gradient: "from-pink-500 to-rose-500" },
];

// Prayer times (static for demo — in a real app these come from an API)
const PRAYER_NAMES = [
  { name: "Imsaku (fillim agjërimi)", icon: "🌅", color: "text-muted-foreground" },
  { name: "Sabahu", subtitle: "Farz Para Dritë, Sunet", icon: "🌄", color: "text-emerald-600" },
  { name: "Lindja e Diellit", icon: "☀️", color: "text-amber-500" },
  { name: "Dreka", icon: "🟡", color: "text-yellow-600" },
  { name: "Ikindia", subtitle: "Pasdreke", icon: "🟠", color: "text-orange-500" },
  { name: "Akshami", subtitle: "Netëzërit", icon: "🔴", color: "text-red-500" },
  { name: "Perëndimi i Diellit", icon: "🌅", color: "text-orange-600" },
  { name: "Jacia", subtitle: "Nata", icon: "🟣", color: "text-purple-600" },
];

const PRAYER_TIMES = ["03:56", "04:36", "05:39", "11:47", "15:14", "17:56", "17:56", "19:24"];

// Daily verses
const DAILY_VERSES = [
  {
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal wakeel",
    meaning: "\"Allahu na mjafton neve dhe sa i mirë Mëkëqyrësi!\"",
    source: "Kur'an 3:173",
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    transliteration: "Inna ma'al usri yusra",
    meaning: "\"Vërtet, me vështirësinë vjen lehtësimi.\"",
    source: "Kur'an 94:6",
  },
  {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    transliteration: "Wa man yatawakkal 'alallahi fahuwa hasbuhu",
    meaning: "\"Kush i mbështetet Allahut, Ai i mjafton atij.\"",
    source: "Kur'an 65:3",
  },
];

// Quick translations
const TRANSLATIONS: Record<string, Record<string, string>> = {
  shqip: {
    "përshëndetje": "greeting / تحية",
    "mirëmëngjes": "good morning / صباح الخير",
    "mirëmbrëma": "good evening / مساء الخير",
    "faleminderit": "thank you / شكرًا",
    "ju lutem": "please / من فضلك",
    "po": "yes / نعم",
    "jo": "no / لا",
    "si jeni": "how are you / كيف حالك",
    "mirë": "good / جيد",
    "shëndet": "health / صحة",
    "libër": "book / كتاب",
    "shkollë": "school / مدرسة",
    "ujë": "water / ماء",
    "shtëpi": "house / بيت",
    "diell": "sun / شمس",
    "hënë": "moon / قمر",
    "dashuri": "love / حب",
    "paqe": "peace / سلام",
    "familje": "family / عائلة",
    "fëmijë": "child / طفل",
  },
  arabisht: {
    "سلام": "përshëndetje / greeting",
    "صباح الخير": "mirëmëngjes / good morning",
    "مساء الخير": "mirëmbrëma / good evening",
    "شكرًا": "faleminderit / thank you",
    "من فضلك": "ju lutem / please",
    "نعم": "po / yes",
    "لا": "jo / no",
    "كيف حالك": "si jeni / how are you",
    "جيد": "mirë / good",
    "كتاب": "libër / book",
    "مدرسة": "shkollë / school",
    "ماء": "ujë / water",
    "بيت": "shtëpi / house",
    "شمس": "diell / sun",
    "قمر": "hënë / moon",
    "حب": "dashuri / love",
    "سلام عليكم": "paqe mbi ju / peace upon you",
    "عائلة": "familje / family",
    "طفل": "fëmijë / child",
    "مسجد": "xhami / mosque",
  },
  anglisht: {
    "hello": "përshëndetje / مرحبا",
    "good morning": "mirëmëngjes / صباح الخير",
    "good evening": "mirëmbrëma / مساء الخير",
    "thank you": "faleminderit / شكرًا",
    "please": "ju lutem / من فضلك",
    "yes": "po / نعم",
    "no": "jo / لا",
    "how are you": "si jeni / كيف حالك",
    "good": "mirë / جيد",
    "book": "libër / كتاب",
    "school": "shkollë / مدرسة",
    "water": "ujë / ماء",
    "house": "shtëpi / بيت",
    "sun": "diell / شمس",
    "moon": "hënë / قمر",
    "love": "dashuri / حب",
    "peace": "paqe / سلام",
    "family": "familje / عائلة",
    "child": "fëmijë / طفل",
    "mosque": "xhami / مسجد",
  },
};

function useCurrentTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

export default function HeroSection() {
  const currentTime = useCurrentTime();
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [transLang, setTransLang] = useState("shqip");
  const [searchWord, setSearchWord] = useState("");

  const todayIndex = currentTime.getDate() % DAILY_VERSES.length;
  const verse = DAILY_VERSES[todayIndex];

  const timeString = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const dateString = currentTime.toLocaleDateString("sq-AL", { weekday: "short", month: "short", day: "numeric" });

  const matchingWords = Object.entries(TRANSLATIONS[transLang] || {}).filter(
    ([key]) => !searchWord || key.toLowerCase().includes(searchWord.toLowerCase())
  );

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
            ✨ Platformë edukative
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
            Mirë se vini në <span className="text-gradient">Edukim Interaktiv</span>
          </h1>

          <div className="glass-card rounded-2xl px-6 py-4 max-w-xl mx-auto mb-10">
            <p className="text-sm text-primary font-medium italic text-center leading-relaxed">
              🌿 <strong>"Njerëzit më të mirë ndër ju janë ata që mësojnë Kur'anin dhe ua mësojnë të tjerëve."</strong>
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">— Transmeton Buhariu</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl px-8 py-5 min-w-[160px] hover:shadow-lg transition-shadow">
              <span className="text-2xl mb-1 block">{stat.icon}</span>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Prayer Times Widget */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="rounded-2xl overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Kohët e Namazit</h3>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-emerald-600 px-2 py-1 rounded-full">📍 GPS</span>
                  <span className="text-xs bg-primary px-2 py-1 rounded-full">🏙 Tiranë</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xl font-mono font-bold">⏰ {timeString}</p>
                <div className="text-right text-sm">
                  <p className="text-white/80">{dateString}</p>
                </div>
              </div>
            </div>
            {/* Prayer list */}
            <div className="bg-gradient-to-b from-gray-900 to-gray-800">
              {PRAYER_NAMES.map((prayer, i) => (
                <div key={i} className={`flex items-center justify-between px-4 py-3 border-b border-white/5 ${
                  [1, 3, 4, 5, 7].includes(i) ? "bg-white/5" : ""
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{prayer.icon}</span>
                    <div>
                      <p className={`text-sm font-semibold ${prayer.color}`}>{prayer.name}</p>
                      {prayer.subtitle && <p className="text-[10px] text-white/50">{prayer.subtitle}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${prayer.color}`}>{PRAYER_TIMES[i]}</span>
                    <span className="text-white/30">🔔</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Daily Verse */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="glass-card rounded-2xl p-6 border border-amber-200/30">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-amber-600">📖 AJETI I DITËS</p>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => navigator.clipboard?.writeText(verse.arabic)}>
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-3 leading-relaxed" dir="rtl">
              {verse.arabic}
            </p>
            <button
              onClick={() => setShowTransliteration(!showTransliteration)}
              className="text-xs text-primary font-medium mb-2 hover:underline"
            >
              {showTransliteration ? "🔼 Fshih transliterimin" : "🔽 Shfaq transliterimin"}
            </button>
            {showTransliteration && (
              <p className="text-sm text-muted-foreground italic mb-2">{verse.transliteration}</p>
            )}
            <p className="text-sm text-foreground/80 italic">{verse.meaning}</p>
            <p className="text-xs text-muted-foreground mt-2">— {verse.source}</p>
          </div>
        </motion.div>

        {/* Tri-lingual Translator */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                🌍 Përkthyes Tri-Gjuhësor
              </h3>
              <Link to="/alphabet?tab=fjalet" className="text-xs text-primary font-medium hover:underline">
                Fjalë Gjuhët
              </Link>
            </div>

            <div className="flex gap-2 mb-4">
              {[
                { key: "shqip", label: "🇦🇱 Shqip" },
                { key: "arabisht", label: "🇸🇦 Arabisht" },
                { key: "anglisht", label: "🇬🇧 Anglisht" },
              ].map((lang) => (
                <button
                  key={lang.key}
                  onClick={() => setTransLang(lang.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    transLang === lang.key
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                placeholder={`Shkruaj fjalë në ${transLang === "shqip" ? "Shqip" : transLang === "arabisht" ? "Arabisht" : "Anglisht"}...`}
                className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:border-primary outline-none"
              />
              <Button size="sm" className="rounded-xl px-4">Përkthe</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {matchingWords.slice(0, 8).map(([word, translation]) => (
                <button
                  key={word}
                  onClick={() => setSearchWord(word)}
                  className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main learning sections */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          {learningSections.map((section, idx) => (
            <Link
              key={idx}
              to={section.path}
              className="group glass-card rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">{section.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {section.items.map((item, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                    {item}
                  </span>
                ))}
              </div>
              <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${section.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            </Link>
          ))}
        </motion.div>

        {/* Quick links */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto"
        >
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="group glass-card rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xs font-semibold text-foreground text-center">{item.name}</span>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
