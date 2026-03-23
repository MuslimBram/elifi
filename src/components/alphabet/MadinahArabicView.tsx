import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Volume2, BookOpen, GraduationCap, Award, Trophy } from "lucide-react";

interface Lesson {
  id: number;
  titleAr: string;
  titleSq: string;
  description: string;
}

interface BookLevel {
  id: number;
  name: string;
  nameAr: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  structureItems: string[];
  nextNote: string;
  lessons: Lesson[];
}

const BOOKS: BookLevel[] = [
  {
    id: 1,
    name: "Fillestar",
    nameAr: "الكتاب الأول",
    label: "Libri 1 — Bazat",
    icon: <BookOpen className="w-5 h-5" />,
    color: "bg-emerald-600 text-white",
    description: "Libri i Parë",
    aboutTitle: "Rreth Kursit — Arabisht Medinase Pjesa 1",
    aboutText: "Aplikacioni për studimin e gjuhës arabe i zhvilluar sipas metodologjisë së kursit Madinah pjesa 1. I përshtatshëm për ata që fillojnë të mësojnë arabishten nga e para, si dhe për ata që duan të forcojnë njohurïtë e tyre më tej.",
    structureItems: [
      "Sharh (Përkthimi) — Përkthim i plotë i rregullave gramatikore",
      "Fjalat Arabe — Lista e fjalëve të reja me sistem zanor",
      "Lidhja e Foljeve — Ushtrime me foljat arabe (Pjesa 2)",
      "Dialogë — Mësëdh dialogje në arabisht",
    ],
    nextNote: "Mund të vazhdoni me Kursin e Gjuhës Arabe Medina Pjesa 2 — Zgjerim i mëtejshëm.",
    lessons: [
      { id: 1, titleAr: "الدرس الأول", titleSq: "Mësimi 1", description: "هذا / هل / ما / أ" },
      { id: 2, titleAr: "الدرس الثاني", titleSq: "Mësimi 2", description: "ذلك / ما • Lloje emërsh kjo!" },
      { id: 3, titleAr: "الدرس الثالث", titleSq: "Mësimi 3", description: "أ • هو / أنا" },
      { id: 4, titleAr: "الدرس الرابع", titleSq: "Mësimi 4", description: "من هذا • Kush eshte ky?" },
      { id: 5, titleAr: "الدرس الخامس", titleSq: "Mësimi 5", description: "ن — Pyetje Yes/No" },
      { id: 6, titleAr: "الدرس السادس", titleSq: "Mësimi 6", description: "أين • Ku?" },
      { id: 7, titleAr: "الدرس السابع", titleSq: "Mësimi 7", description: "في • Në / Brenda" },
      { id: 8, titleAr: "الدرس الثامن", titleSq: "Mësimi 8", description: "ال • Artikulli i Përcaruar" },
      { id: 9, titleAr: "الدرس التاسع", titleSq: "Mësimi 9", description: "المضارع • I fjala Emërore" },
      { id: 10, titleAr: "الدرس العاشر", titleSq: "Mësimi 10", description: "المبتدأ • Xheminat" },
      { id: 11, titleAr: "الدرس الحادي عشر", titleSq: "Mësimi 11", description: "الضمائر • Përemrat" },
      { id: 12, titleAr: "الدرس الثاني عشر", titleSq: "Mësimi 12", description: "العدد • Numrat" },
      { id: 13, titleAr: "الدرس الثالث عشر", titleSq: "Mësimi 13", description: "الإضافة • Idhafa" },
      { id: 14, titleAr: "الدرس الرابع عشر", titleSq: "Mësimi 14", description: "حروف الجر • Parafjalët" },
      { id: 15, titleAr: "الدرس الخامس عشر", titleSq: "Mësimi 15", description: "الفعل الماضي • Folja e Shkuar" },
      { id: 16, titleAr: "الدرس السادس عشر", titleSq: "Mësimi 16", description: "الفعل المضارع • Folja e Tashme" },
      { id: 17, titleAr: "الدرس السابع عشر", titleSq: "Mësimi 17", description: "النفي • Mohimi" },
      { id: 18, titleAr: "الدرس الثامن عشر", titleSq: "Mësimi 18", description: "الأمر • Folja Urdhërore" },
      { id: 19, titleAr: "الدرس التاسع عشر", titleSq: "Mësimi 19", description: "الصفة • Mbiemri" },
      { id: 20, titleAr: "الدرس العشرون", titleSq: "Mësimi 20", description: "الموصول • Përemri Lidhor" },
      { id: 21, titleAr: "الدرس الحادي والعشرون", titleSq: "Mësimi 21", description: "المثنى • Numri Dysor" },
      { id: 22, titleAr: "الدرس الثاني والعشرون", titleSq: "Mësimi 22", description: "الجمع • Shumësi" },
      { id: 23, titleAr: "الدرس الثالث والعشرون", titleSq: "Mësimi 23", description: "المراجعة • Përmbledhje" },
    ],
  },
  {
    id: 2,
    name: "Mesatar",
    nameAr: "الكتاب الثاني",
    label: "Libri 2 — Zgjerim",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "bg-orange-500 text-white",
    description: "Libri i Dytë",
    aboutTitle: "Rreth Kursit — Arabisht Medinase Pjesa 2",
    aboutText: "Kursi i Medinës Pjesa 2 — Zgjerim i plotë i fjalont dhe gramatikës arabe. I përshtatshëm për ata që kanë mbaruar Pjesën 1 dhe duan të forcojnë njohurïtë e tyre më tej.",
    structureItems: [
      "Sharh (Përkthimi) — Përkthim i plotë i rregullave gramatikore",
      "Fjalat Arabe — Lista e fjalëve të reja me sistem zanor",
      "Lidhja e Foljeve — Ushtrime me foljat arabe (Pjesa 2)",
      "Dialogë — Mësëdh dialogje në arabisht",
    ],
    nextNote: "Mund të vazhdoni me Kursin e Gjuhës Arabe Medina Pjesa 3 — Avancim i plotë në arabishten klasike.",
    lessons: [
      { id: 1, titleAr: "الدرس الأول", titleSq: "Mësimi 1", description: "Rishikim i Librit 1 • الكتاب الأول" },
      { id: 2, titleAr: "الدرس الثاني", titleSq: "Mësimi 2", description: "Rishikim i fjalve Nominale • الجملة الاسمية" },
      { id: 3, titleAr: "الدرس الثالث", titleSq: "Mësimi 3", description: "Rishikim i Përemrave Deftorëre • أسماء الإشارة" },
      { id: 4, titleAr: "الدرس الرابع", titleSq: "Mësimi 4", description: "Rishikim i Parafjalteve • الحروف المارة" },
      { id: 5, titleAr: "الدرس الخامس", titleSq: "Mësimi 5", description: "Folje me Kohën e Shkuar • الفعل الماضي" },
      { id: 6, titleAr: "الدرس السادس", titleSq: "Mësimi 6", description: "Folje me Kryefjalë • الفعل والفاعل" },
      { id: 7, titleAr: "الدرس السابع", titleSq: "Mësimi 7", description: "Folje + Kundreshtim • الفعل والمفعول" },
      { id: 8, titleAr: "الدرس الثامن", titleSq: "Mësimi 8", description: "Folje me Kohën e Tashme • الفعل المضارع" },
      { id: 9, titleAr: "الدرس التاسع", titleSq: "Mësimi 9", description: "Koha e Tashme me Mohime • المضارع مع النفي والسؤال" },
      { id: 10, titleAr: "الدرس العاشر", titleSq: "Mësimi 10", description: "Përemrat e Subjektit • ضمائر الفاعل" },
      { id: 11, titleAr: "الدرس الحادي عشر", titleSq: "Mësimi 11", description: "Përemrat e Objektit • ضمائر المفعول" },
      { id: 12, titleAr: "الدرس الثاني عشر", titleSq: "Mësimi 12", description: "Idhafa e Thelluar • الإضافة المتقدمة" },
      { id: 13, titleAr: "الدرس الثالث عشر", titleSq: "Mësimi 13", description: "Mbiemri & Emri • النعت والمنعوت" },
      { id: 14, titleAr: "الدرس الرابع عشر", titleSq: "Mësimi 14", description: "Fjali Foljore • الجملة الفعلية" },
      { id: 15, titleAr: "الدرس الخامس عشر", titleSq: "Mësimi 15", description: "Dialogë e Avancuar • حوارات متقدمة" },
      { id: 16, titleAr: "الدرس السادس عشر", titleSq: "Mësimi 16", description: "Përmbledhje Libri 2 • مراجعة الكتاب" },
    ],
  },
  {
    id: 3,
    name: "Avancuar",
    nameAr: "الكتاب الثالث",
    label: "Libri 3 — Avancim",
    icon: <Award className="w-5 h-5" />,
    color: "bg-blue-600 text-white",
    description: "Libri i Tretë",
    aboutTitle: "Rreth Kursit — Arabisht Medinase Pjesa 3",
    aboutText: "Kursi i Medinës Pjesa 3 — Avancim i plotë në arabishten klasike me fokus në morfologjinë e avancuar.",
    structureItems: [
      "Sharh (Përkthimi) — Përkthim i plotë i rregullave gramatikore",
      "Fjalat Arabe — Lista e fjalëve të reja me sistem zanor",
      "Lidhja e Foljeve — Ushtrime me foljat arabe (Pjesa 2)",
      "Dialogë — Mësëdh dialogje në arabisht",
    ],
    nextNote: "Mund të vazhdoni me Kursin e Gjuhës Arabe Medina Pjesa 4 — Thellim profesional.",
    lessons: [
      { id: 1, titleAr: "الدرس الأول", titleSq: "Mësimi 1", description: "أوزان الأفعال — Sistemet e Foljeve" },
      { id: 2, titleAr: "الدرس الثاني", titleSq: "Mësimi 2", description: "E Kaluara & E tashme • الفعل الماضي والمضارع" },
      { id: 3, titleAr: "الدرس الثالث", titleSq: "Mësimi 3", description: "إعراب الأسماء — Rasët Gramatikore" },
      { id: 4, titleAr: "الدرس الرابع", titleSq: "Mësimi 4", description: "الأفعال المعتلة — Foljat e Dobëta" },
      { id: 5, titleAr: "الدرس الخامس", titleSq: "Mësimi 5", description: "اسم التفضيل واسم المفعول — Emri Veprues & Objekti" },
      { id: 6, titleAr: "الدرس السادس", titleSq: "Mësimi 6", description: "المصدر — Masdar (Emri i Veprimit)" },
      { id: 7, titleAr: "الدرس السابع", titleSq: "Mësimi 7", description: "كان وأخواتها — Kana & Motrat e Saj" },
      { id: 8, titleAr: "الدرس الثامن", titleSq: "Mësimi 8", description: "إن وأخواتها — Inne & Motrat e Saj" },
      { id: 9, titleAr: "الدرس التاسع", titleSq: "Mësimi 9", description: "الجملة الشرطية — Fjali Kushtore" },
      { id: 10, titleAr: "الدرس العاشر", titleSq: "Mësimi 10", description: "الجملة الاسمية والفعلية — Fjali Emërore & Foljore" },
      { id: 11, titleAr: "الدرس الحادي عشر", titleSq: "Mësimi 11", description: "الحال — Gjendja (Haal)" },
      { id: 12, titleAr: "الدرس الثاني عشر", titleSq: "Mësimi 12", description: "التمييز — Dallimi" },
    ],
  },
  {
    id: 4,
    name: "Profesionist",
    nameAr: "الكتاب الرابع",
    label: "Libri 4 — Thellim",
    icon: <Trophy className="w-5 h-5" />,
    color: "bg-red-600 text-white",
    description: "Libri i Katërt",
    aboutTitle: "Rreth Kursit — Arabisht Medinase Pjesa 4",
    aboutText: "Kursi i Medinës Pjesa 4 — Kjo është pjesa e katërt e fundit e kursit të arabishtes Medina. Thellim profesional në arabishten klasike me fokus në morfologjinë e avancuar.",
    structureItems: [
      "Sharh (Përkthimi) — Përkthim i plotë i rregullave gramatikore",
      "Fjalat Arabe — Lista e fjalëve të reja me sistem zanor",
      "Dialogë — Mësëdh dialogje në arabisht",
    ],
    nextNote: "Ju keni përfunduar serinë e plotë Medina! Aplikacioni ka tre opsione zanore (dy mashkull, një femër): ideale për të mësuar arabisht në grup ose familje.",
    lessons: [
      { id: 1, titleAr: "الدرس الأول", titleSq: "Mësimi 1", description: "أوزان الأفعال — Sistemet e Foljeve" },
      { id: 2, titleAr: "الدرس الثاني", titleSq: "Mësimi 2", description: "E Kaluara & E tashme • الفعل الماضي والمضارع" },
      { id: 3, titleAr: "الدرس الثالث", titleSq: "Mësimi 3", description: "إعراب الأسماء — Rasët Gramatikore" },
      { id: 4, titleAr: "الدرس الرابع", titleSq: "Mësimi 4", description: "الأفعال المعتلة — Foljat e Dobëta" },
      { id: 5, titleAr: "الدرس الخامس", titleSq: "Mësimi 5", description: "اسم التفضيل واسم المفعول — Emri Veprues & Objekti" },
      { id: 6, titleAr: "الدرس السادس", titleSq: "Mësimi 6", description: "المصدر — Masdar (Emri i Veprimit)" },
      { id: 7, titleAr: "الدرس السابع", titleSq: "Mësimi 7", description: "كان وأخواتها — Kana & Motrat e Saj" },
      { id: 8, titleAr: "الدرس الثامن", titleSq: "Mësimi 8", description: "إن وأخواتها — Inne & Motrat e Saj" },
      { id: 9, titleAr: "الدرس التاسع", titleSq: "Mësimi 9", description: "الجملة الشرطية — Fjali Kushtore" },
      { id: 10, titleAr: "الدرس العاشر", titleSq: "Mësimi 10", description: "الجملة الاسمية والفعلية — Fjali Emërore & Foljore" },
    ],
  },
];

export default function MadinahArabicView() {
  const [selectedBook, setSelectedBook] = useState(0);
  const book = BOOKS[selectedBook];

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🕌</span>
          <div>
            <h2 className="text-xl font-bold">Arabisht — Metoda e Medinës</h2>
            <p className="text-sm text-white/80">Mëso arabishten klasike hap pas hapi</p>
          </div>
        </div>
      </div>

      {/* Level selector */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-3">Zgjidhi nivelin:</p>
        <div className="flex flex-wrap gap-3">
          {BOOKS.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setSelectedBook(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                selectedBook === i
                  ? `${b.color} shadow-lg scale-105`
                  : "glass-card text-foreground/70 hover:shadow-md"
              }`}
            >
              {b.icon}
              <div className="text-left">
                <span className="block">{b.name}</span>
                <span className="text-[10px] opacity-70 block">{b.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Book info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedBook}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-6"
        >
          {/* Title */}
          <div className="text-center">
            <p className="text-xl font-bold text-foreground" dir="rtl">{book.nameAr}</p>
            <p className="text-lg font-bold text-foreground">— {book.description}</p>
            <p className="text-sm text-muted-foreground">
              Madinah Book {book.id} · {book.lessons.length} Mësime {
                book.id === 1 ? "Bazë të Arabishtes" :
                book.id === 2 ? "të Arabishtes Intermediate" :
                book.id === 3 ? "të Arabishtes Avancuar" :
                "Thellim profesional në arabishten klasike"
              }
            </p>
          </div>

          {/* About section */}
          <div className="glass-card rounded-2xl p-6 border-l-4 border-primary">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">📜</span>
              <h3 className="text-lg font-bold text-foreground">{book.aboutTitle}</h3>
            </div>
            <p className="text-sm text-foreground/80 mb-4 leading-relaxed">{book.aboutText}</p>
            <p className="text-sm text-foreground/80 mb-3">
              Thelbi i të gjitha aplikacionit ishte se ju duhet të mbëlechni fraza në arabisht. Me ne do të mësoni arabisht në një kohë të shkurtër <strong>hap pas hapi</strong>.
            </p>

            <div className="bg-secondary/50 rounded-xl p-4 mb-4">
              <p className="text-xs font-bold text-foreground mb-2">📋 Çdo mësim ka 1 deri në {book.id <= 2 ? "4" : "3"} skede:</p>
              <ul className="space-y-1">
                {book.structureItems.map((item, i) => (
                  <li key={i} className="text-xs text-foreground/70 flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3">
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                <strong>🔄 {book.id < 4 ? `Pas Kursit ${book.id}` : "Kursi i Katërt"}</strong><br />
                {book.nextNote}
              </p>
            </div>

            {book.id === 4 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 mt-3 border border-amber-200 dark:border-amber-700">
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  <strong>⚠️ Përgatituni në Aplikacion</strong><br />
                  Duke përdorur modularitetet e mësimit: mbishteja e fjalëve, funksione manuale (për të avancuare), opsione zanore multiple — mëso arabisht si kurrë më parë!
                </p>
              </div>
            )}
          </div>

          {/* Lessons list */}
          <div className="space-y-3">
            {book.lessons.map((lesson) => (
              <button
                key={lesson.id}
                className="w-full glass-card rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-all text-left group"
              >
                <div className={`w-10 h-10 rounded-full ${
                  selectedBook === 0 ? "bg-emerald-100 text-emerald-700" :
                  selectedBook === 1 ? "bg-orange-100 text-orange-700" :
                  selectedBook === 2 ? "bg-blue-100 text-blue-700" :
                  "bg-red-100 text-red-700"
                } flex items-center justify-center font-bold text-sm`}>
                  {lesson.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground">
                    <span dir="rtl" className="ml-2">{lesson.titleAr}</span> — {lesson.titleSq}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{lesson.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
