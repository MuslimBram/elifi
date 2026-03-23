import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/ui/ScrollToTop";
import {
  Home,
  BookOpen,
  Gamepad2,
  Menu,
  X,
  Languages,
  Scroll,
  MapPin,
  Settings,
  BarChart3,
  ChevronDown,
  Star,
  Heart,
} from "lucide-react";

const navItems = [
  { name: "Ballina", path: "/", icon: Home },
  {
    name: "Alfabeti",
    path: "/alphabet",
    icon: Languages,
    children: [
      { name: "Germët", path: "/alphabet?tab=germat" },
      { name: "Numrat", path: "/alphabet?tab=numrat" },
      { name: "Rrokjet", path: "/alphabet?tab=rrokjet" },
      { name: "Fjalët", path: "/alphabet?tab=fjalet" },
      { name: "Zgjedhimi", path: "/alphabet?tab=zgjedhimi" },
      { name: "Lakimi", path: "/alphabet?tab=lakimi" },
      { name: "Arabisht Medinë", path: "/alphabet?tab=medine" },
    ],
  },
  {
    name: "Kur'ani",
    path: "/quran",
    icon: BookOpen,
    children: [
      { name: "📖 Suret me Audio", path: "/quran?tab=suret" },
      { name: "🎯 Kuiz Kurani", path: "/quran?tab=quiz" },
      { name: "📊 Progresi", path: "/quran?tab=progress" },
      { name: "✨ Sevapet", path: "/quran?tab=sevapet" },
      { name: "📚 Texhuidi", path: "/tajweed" },
    ],
  },
  {
    name: "Umra & Haxhi",
    path: "/umra-hajj",
    icon: MapPin,
    children: [
      { name: "🕋 Umra — Hapat", path: "/umra-hajj?tab=umra" },
      { name: "🏔️ Haxhi — Hapat", path: "/umra-hajj?tab=haxhi" },
      { name: "🗺️ Vendet e Shenjta", path: "/umra-hajj?tab=vendet" },
      { name: "📖 Duatë e Umras", path: "/umra-hajj?tab=duate" },
      { name: "🎯 Kuiz", path: "/umra-hajj?tab=kuiz" },
    ],
  },
  {
    name: "Fikh Elementar",
    path: "/fikh",
    icon: Star,
    children: [
      { name: "🕌 Akide", path: "/fikh?tab=akide" },
      { name: "💧 Pastërtia & Abdesi", path: "/fikh?tab=pastresia" },
      { name: "🤲 Namazi", path: "/fikh?tab=namazi" },
      { name: "🌙 Agjërimi", path: "/fikh?tab=agjrimi" },
      { name: "💰 Zekati", path: "/fikh?tab=zekati" },
      { name: "🌿 Duatë", path: "/fikh?tab=duate" },
      { name: "🎯 Kuiz", path: "/fikh?tab=kuiz" },
    ],
  },
  {
    name: "Lojëra",
    path: "/games",
    icon: Gamepad2,
    children: [
      { name: "🧠 Kuiz", path: "/games?game=quiz" },
      { name: "🃏 Hafizja", path: "/games?game=memory" },
      { name: "🔢 Matematika", path: "/games?game=math" },
    ],
  },
  { name: "Favoritët", path: "/favorites", icon: Heart },
  { name: "Progresi", path: "/progress", icon: BarChart3 },
  { name: "Cilësimet", path: "/settings", icon: Settings },
];

function NavDropdown({ item, isActive }: { item: typeof navItems[0]; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={item.path}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-foreground/70 hover:text-primary hover:bg-secondary"
        }`}
      >
        <Icon className="w-4 h-4" />
        {item.name}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </Link>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-xl shadow-xl py-1.5 min-w-[180px] z-50">
          {item.children?.map((child, i) => (
            <Link
              key={i}
              to={child.path}
              className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary transition-colors"
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-light via-background to-emerald-light">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="gradient-primary rounded-xl w-9 h-9 flex items-center justify-center shadow-md">
              <Scroll className="text-primary-foreground w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-foreground tracking-tight">Edukim Interaktiv</span>
              <p className="text-[10px] text-primary -mt-1 font-medium">Mëso & Luaj</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              if (item.children) {
                return <NavDropdown key={item.path} item={item} isActive={active} />;
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-foreground/70 hover:text-primary hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5 text-foreground/70" /> : <Menu className="w-5 h-5 text-foreground/70" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-md">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                if (item.children) {
                  return (
                    <div key={item.path}>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.path ? null : item.path)}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          active ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-secondary"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          {item.name}
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${mobileExpanded === item.path ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileExpanded === item.path && (
                        <div className="ml-10 mt-1 space-y-1">
                          {item.children.map((child, i) => (
                            <Link
                              key={i}
                              to={child.path}
                              onClick={() => setMobileOpen(false)}
                              className="block px-4 py-2 text-sm text-foreground/70 hover:bg-secondary hover:text-primary rounded-xl transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      active ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-secondary"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/60 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-primary text-sm">
            © 2026 Edukim Interaktiv — Platformë edukative për alfabetin, texhuidin dhe Kuranin
          </p>
        </div>
      </footer>
    </div>
  );
}
