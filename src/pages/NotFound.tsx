import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, BookOpen, Languages, Gamepad2, MapPin, Star } from "lucide-react";

const quickLinks = [
  { path: "/", label: "Ballina", icon: Home, color: "from-emerald-500 to-teal-500" },
  { path: "/alphabet", label: "Alfabeti", icon: Languages, color: "from-blue-500 to-cyan-500" },
  { path: "/quran", label: "Kur'ani", icon: BookOpen, color: "from-amber-500 to-orange-500" },
  { path: "/fikh", label: "Fikh", icon: Star, color: "from-green-500 to-emerald-600" },
  { path: "/umra-hajj", label: "Umra & Haxhi", icon: MapPin, color: "from-teal-500 to-cyan-500" },
  { path: "/games", label: "Lojëra", icon: Gamepad2, color: "from-pink-500 to-rose-500" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
          className="text-8xl mb-4">🕌</motion.div>
        <h1 className="text-5xl font-extrabold text-foreground mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-2">Faqja nuk u gjet</p>
        <p className="text-sm text-muted-foreground mb-8">
          Rruga <code className="bg-secondary px-2 py-0.5 rounded text-foreground text-xs">{location.pathname}</code> nuk ekziston.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {quickLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.div key={link.path} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
                <Link to={link.path} className="glass-card rounded-2xl p-4 block text-center hover:shadow-lg transition-all group">
                  <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-medium text-foreground">{link.label}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all">
          <Home className="w-4 h-4" /> Kthehu në Ballinë
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
