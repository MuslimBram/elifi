import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Languages,
  Gamepad2,
  BookMarked,
  MapPin,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

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
    path: "/medine",
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

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
            ✨ Platformë edukative
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
            Mirë se vini në{" "}
            <span className="text-gradient">Edukim Interaktiv</span>
          </h1>

          <p className="text-muted-foreground mb-6 mx-auto text-lg leading-relaxed md:text-xl max-w-2xl">
            Mëso alfabetin në 3 gjuhë, Kuranin me texhuid dhe ritualet e Umras dhe Haxhit. Duke u argëtuar.
          </p>

          <div className="glass-card rounded-2xl px-6 py-4 max-w-xl mx-auto mb-10">
            <p className="text-sm text-primary font-medium italic text-center leading-relaxed">
              🌿 <strong>"Njerëzit më të mirë ndër ju janë ata që mësojnë Kur'anin dhe ua mësojnë të tjerëve."</strong>
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">— Transmeton Buhariu</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl px-8 py-5 min-w-[160px] hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl mb-1 block">{stat.icon}</span>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main learning sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${section.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            </Link>
          ))}
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
