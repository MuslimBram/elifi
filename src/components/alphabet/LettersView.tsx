import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Pencil, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Letter {
  letter: string;
  name: string;
  pronunciation: string;
  example: string;
  exampleMeaning: string;
}

const ALBANIAN_LETTERS: Letter[] = [
  { letter: "A", name: "A", pronunciation: "a", example: "arë", exampleMeaning: "field" },
  { letter: "B", name: "Bë", pronunciation: "b", example: "bukë", exampleMeaning: "bread" },
  { letter: "C", name: "Cë", pronunciation: "ts", example: "copë", exampleMeaning: "piece" },
  { letter: "Ç", name: "Çë", pronunciation: "tʃ", example: "çaj", exampleMeaning: "tea" },
  { letter: "D", name: "Dë", pronunciation: "d", example: "det", exampleMeaning: "sea" },
  { letter: "Dh", name: "Dhë", pronunciation: "ð", example: "dhomë", exampleMeaning: "room" },
  { letter: "E", name: "E", pronunciation: "ɛ", example: "emër", exampleMeaning: "name" },
  { letter: "Ë", name: "Ë", pronunciation: "ə", example: "ëndërr", exampleMeaning: "dream" },
  { letter: "F", name: "Fë", pronunciation: "f", example: "fjalë", exampleMeaning: "word" },
  { letter: "G", name: "Gë", pronunciation: "g", example: "gur", exampleMeaning: "stone" },
  { letter: "Gj", name: "Gjë", pronunciation: "ɟ", example: "gjel", exampleMeaning: "rooster" },
  { letter: "H", name: "Hë", pronunciation: "h", example: "hënë", exampleMeaning: "moon" },
  { letter: "I", name: "I", pronunciation: "i", example: "ishull", exampleMeaning: "island" },
  { letter: "J", name: "Jë", pronunciation: "j", example: "javë", exampleMeaning: "week" },
  { letter: "K", name: "Kë", pronunciation: "k", example: "kokë", exampleMeaning: "head" },
  { letter: "L", name: "Lë", pronunciation: "l", example: "lule", exampleMeaning: "flower" },
  { letter: "Ll", name: "Llë", pronunciation: "ɫ", example: "lloj", exampleMeaning: "type" },
  { letter: "M", name: "Më", pronunciation: "m", example: "mal", exampleMeaning: "mountain" },
  { letter: "N", name: "Në", pronunciation: "n", example: "natë", exampleMeaning: "night" },
  { letter: "Nj", name: "Një", pronunciation: "ɲ", example: "njeri", exampleMeaning: "person" },
  { letter: "O", name: "O", pronunciation: "ɔ", example: "orë", exampleMeaning: "hour" },
  { letter: "P", name: "Pë", pronunciation: "p", example: "pemë", exampleMeaning: "tree" },
  { letter: "Q", name: "Që", pronunciation: "c", example: "qen", exampleMeaning: "dog" },
  { letter: "R", name: "Rë", pronunciation: "ɾ", example: "ra", exampleMeaning: "fell" },
  { letter: "Rr", name: "Rrë", pronunciation: "r", example: "rrugë", exampleMeaning: "road" },
  { letter: "S", name: "Së", pronunciation: "s", example: "shi", exampleMeaning: "rain" },
  { letter: "Sh", name: "Shë", pronunciation: "ʃ", example: "shkollë", exampleMeaning: "school" },
  { letter: "T", name: "Të", pronunciation: "t", example: "tokë", exampleMeaning: "earth" },
  { letter: "Th", name: "Thë", pronunciation: "θ", example: "thikë", exampleMeaning: "knife" },
  { letter: "U", name: "U", pronunciation: "u", example: "ujë", exampleMeaning: "water" },
  { letter: "V", name: "Vë", pronunciation: "v", example: "verë", exampleMeaning: "summer" },
  { letter: "X", name: "Xë", pronunciation: "dz", example: "xhep", exampleMeaning: "pocket" },
  { letter: "Xh", name: "Xhë", pronunciation: "dʒ", example: "xham", exampleMeaning: "glass" },
  { letter: "Y", name: "Y", pronunciation: "y", example: "yll", exampleMeaning: "star" },
  { letter: "Z", name: "Zë", pronunciation: "z", example: "zog", exampleMeaning: "bird" },
  { letter: "Zh", name: "Zhë", pronunciation: "ʒ", example: "zhurmë", exampleMeaning: "noise" },
];

const ENGLISH_LETTERS: Letter[] = [
  { letter: "A", name: "Ei", pronunciation: "eɪ", example: "apple", exampleMeaning: "mollë" },
  { letter: "B", name: "Bi", pronunciation: "biː", example: "book", exampleMeaning: "libër" },
  { letter: "C", name: "Si", pronunciation: "siː", example: "cat", exampleMeaning: "mace" },
  { letter: "D", name: "Di", pronunciation: "diː", example: "dog", exampleMeaning: "qen" },
  { letter: "E", name: "I", pronunciation: "iː", example: "egg", exampleMeaning: "vezë" },
  { letter: "F", name: "Ef", pronunciation: "ɛf", example: "fish", exampleMeaning: "peshk" },
  { letter: "G", name: "Xhi", pronunciation: "dʒiː", example: "good", exampleMeaning: "mirë" },
  { letter: "H", name: "Ejç", pronunciation: "eɪtʃ", example: "hat", exampleMeaning: "kapelë" },
  { letter: "I", name: "Aj", pronunciation: "aɪ", example: "ice", exampleMeaning: "akull" },
  { letter: "J", name: "Xhej", pronunciation: "dʒeɪ", example: "juice", exampleMeaning: "lëng" },
  { letter: "K", name: "Kej", pronunciation: "keɪ", example: "key", exampleMeaning: "çelës" },
  { letter: "L", name: "El", pronunciation: "ɛl", example: "lamp", exampleMeaning: "llambë" },
  { letter: "M", name: "Em", pronunciation: "ɛm", example: "map", exampleMeaning: "hartë" },
  { letter: "N", name: "En", pronunciation: "ɛn", example: "name", exampleMeaning: "emër" },
  { letter: "O", name: "Ou", pronunciation: "oʊ", example: "open", exampleMeaning: "hap" },
  { letter: "P", name: "Pi", pronunciation: "piː", example: "pen", exampleMeaning: "laps" },
  { letter: "Q", name: "Kju", pronunciation: "kjuː", example: "queen", exampleMeaning: "mbretëreshë" },
  { letter: "R", name: "Ar", pronunciation: "ɑːr", example: "rain", exampleMeaning: "shi" },
  { letter: "S", name: "Es", pronunciation: "ɛs", example: "sun", exampleMeaning: "diell" },
  { letter: "T", name: "Ti", pronunciation: "tiː", example: "tree", exampleMeaning: "pemë" },
  { letter: "U", name: "Ju", pronunciation: "juː", example: "up", exampleMeaning: "lart" },
  { letter: "V", name: "Vi", pronunciation: "viː", example: "van", exampleMeaning: "furgon" },
  { letter: "W", name: "Dabllju", pronunciation: "ˈdʌbljuː", example: "water", exampleMeaning: "ujë" },
  { letter: "X", name: "Eks", pronunciation: "ɛks", example: "box", exampleMeaning: "kuti" },
  { letter: "Y", name: "Uaj", pronunciation: "waɪ", example: "year", exampleMeaning: "vit" },
  { letter: "Z", name: "Zed", pronunciation: "zɛd", example: "zoo", exampleMeaning: "kopsht zoologjik" },
];

const ARABIC_LETTERS: Letter[] = [
  { letter: "ا", name: "Elif", pronunciation: "a / i / u", example: "أَسَد", exampleMeaning: "luan" },
  { letter: "ب", name: "Ba", pronunciation: "b", example: "بَيْت", exampleMeaning: "shtëpi" },
  { letter: "ت", name: "Ta", pronunciation: "t", example: "تُفَّاحَة", exampleMeaning: "mollë" },
  { letter: "ث", name: "Tha", pronunciation: "θ (th angleze)", example: "ثَعْلَب", exampleMeaning: "dhelpër" },
  { letter: "ج", name: "Xhim", pronunciation: "dʒ", example: "جَمَل", exampleMeaning: "deve" },
  { letter: "ح", name: "Ha", pronunciation: "ħ (h e thellë)", example: "حِصَان", exampleMeaning: "kalë" },
  { letter: "خ", name: "Kha", pronunciation: "x (hh e ashpër)", example: "خُبْز", exampleMeaning: "bukë" },
  { letter: "د", name: "Dal", pronunciation: "d", example: "دَجَاجَة", exampleMeaning: "pulë" },
  { letter: "ذ", name: "Dhal", pronunciation: "ð (dh)", example: "ذِئْب", exampleMeaning: "ujk" },
  { letter: "ر", name: "Ra", pronunciation: "r", example: "رَجُل", exampleMeaning: "burrë" },
  { letter: "ز", name: "Zaj", pronunciation: "z", example: "زَهْرَة", exampleMeaning: "lule" },
  { letter: "س", name: "Sin", pronunciation: "s", example: "سَمَاء", exampleMeaning: "qiell" },
  { letter: "ش", name: "Shin", pronunciation: "ʃ (sh)", example: "شَمْس", exampleMeaning: "diell" },
  { letter: "ص", name: "Sad", pronunciation: "sˤ (s emfatik)", example: "صَبَاح", exampleMeaning: "mëngjes" },
  { letter: "ض", name: "Dad", pronunciation: "dˤ (d emfatik)", example: "ضِفْدَع", exampleMeaning: "bretkosë" },
  { letter: "ط", name: "Ta", pronunciation: "tˤ (t emfatik)", example: "طَائِرَة", exampleMeaning: "aeroplan" },
  { letter: "ظ", name: "Dha", pronunciation: "ðˤ (dh emfatik)", example: "ظَرْف", exampleMeaning: "zarf" },
  { letter: "ع", name: "Ajn", pronunciation: "ʕ (i thellë)", example: "عَيْن", exampleMeaning: "sy" },
  { letter: "غ", name: "Gajn", pronunciation: "ɣ (gr franceze)", example: "غُرَاب", exampleMeaning: "sorrë" },
  { letter: "ف", name: "Fa", pronunciation: "f", example: "فِيل", exampleMeaning: "elefant" },
  { letter: "ق", name: "Kaf", pronunciation: "q (q e thellë)", example: "قَمَر", exampleMeaning: "hënë" },
  { letter: "ك", name: "Kef", pronunciation: "k", example: "كِتَاب", exampleMeaning: "libër" },
  { letter: "ل", name: "Lam", pronunciation: "l", example: "لَيْل", exampleMeaning: "natë" },
  { letter: "م", name: "Mim", pronunciation: "m", example: "مَاء", exampleMeaning: "ujë" },
  { letter: "ن", name: "Nun", pronunciation: "n", example: "نَجْم", exampleMeaning: "yll" },
  { letter: "ه", name: "Ha", pronunciation: "h", example: "هِلَال", exampleMeaning: "hënë e re" },
  { letter: "و", name: "Vav", pronunciation: "w / uu", example: "وَرْدَة", exampleMeaning: "trëndafil" },
  { letter: "ي", name: "Ja", pronunciation: "j / ii", example: "يَد", exampleMeaning: "dorë" },
];

function speakText(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const langCode = lang === "arabisht" ? "ar" : lang === "anglisht" ? "en-US" : "sq";
  const u = new SpeechSynthesisUtterance(text);
  u.lang = langCode;
  u.rate = 0.6;
  window.speechSynthesis.speak(u);
}

function DrawingCanvas({ letter, onClear }: { letter: string; onClear: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw guide letter
    ctx.font = "120px serif";
    ctx.fillStyle = "rgba(100, 100, 100, 0.1)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
  }, [letter]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = "hsl(var(--primary))";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "120px serif";
    ctx.fillStyle = "rgba(100, 100, 100, 0.1)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
    onClear();
  };

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        width={280}
        height={200}
        className="border-2 border-dashed border-border rounded-xl bg-card mx-auto block touch-none cursor-crosshair"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
      <button onClick={clear} className="flex items-center gap-1 mx-auto text-xs text-muted-foreground hover:text-primary transition-colors">
        <RotateCcw className="w-3 h-3" /> Fshi
      </button>
    </div>
  );
}

interface Props {
  language: string;
}

export default function LettersView({ language }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<"learn" | "quiz">("learn");
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);

  const isArabic = language === "arabisht";
  const letters = isArabic ? ARABIC_LETTERS : language === "anglisht" ? ENGLISH_LETTERS : ALBANIAN_LETTERS;
  const currentLetter = letters[currentIndex];

  const prev = () => setCurrentIndex(Math.max(0, currentIndex - 1));
  const next = () => setCurrentIndex(Math.min(letters.length - 1, currentIndex + 1));

  // Quiz
  const generateOptions = () => {
    const correct = currentIndex;
    const opts = new Set<number>([correct]);
    while (opts.size < 4) {
      opts.add(Math.floor(Math.random() * letters.length));
    }
    return Array.from(opts).sort(() => Math.random() - 0.5);
  };

  const [quizOptions, setQuizOptions] = useState<number[]>(generateOptions());

  useEffect(() => {
    setQuizOptions(generateOptions());
    setQuizAnswer(null);
  }, [currentIndex, mode]);

  const handleQuizAnswer = (idx: number) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(idx);
    setQuizTotal((t) => t + 1);
    if (idx === currentIndex) setQuizScore((s) => s + 1);
    setTimeout(() => {
      if (currentIndex < letters.length - 1) {
        setCurrentIndex((i) => i + 1);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setMode("learn")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            mode === "learn" ? "bg-primary text-primary-foreground shadow-md" : "bg-card border border-border text-foreground/70"
          }`}
        >
          📚 Mëso
        </button>
        <button
          onClick={() => { setMode("quiz"); setQuizScore(0); setQuizTotal(0); setCurrentIndex(0); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            mode === "quiz" ? "bg-primary text-primary-foreground shadow-md" : "bg-card border border-border text-foreground/70"
          }`}
        >
          🎯 Kuiz
        </button>
      </div>

      {/* Letter grid */}
      <div className={`glass-card rounded-2xl p-4 ${isArabic ? "dir-rtl" : ""}`}>
        <div className={`flex flex-wrap gap-1.5 justify-center ${isArabic ? "flex-row-reverse" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
          {letters.map((l, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                idx === currentIndex
                  ? "bg-primary text-primary-foreground shadow-lg scale-110"
                  : "glass-card text-foreground hover:shadow-sm hover:scale-105"
              }`}
            >
              {l.letter}
            </button>
          ))}
        </div>
      </div>

      {mode === "learn" ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm" onClick={prev} disabled={currentIndex === 0}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center">
                <p className={`text-7xl font-bold text-primary mb-2 ${isArabic ? "font-arabic" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
                  {currentLetter.letter}
                </p>
                <p className="text-lg font-semibold text-foreground">{currentLetter.name}</p>
                <p className="text-sm text-muted-foreground">/{currentLetter.pronunciation}/</p>
              </div>
              <Button variant="outline" size="sm" onClick={next} disabled={currentIndex === letters.length - 1}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Example */}
            <div className="bg-secondary/50 rounded-xl p-4 text-center mb-4">
              <p className={`text-xl font-bold text-foreground mb-1 ${isArabic ? "font-arabic" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
                {currentLetter.example}
              </p>
              <p className="text-sm text-muted-foreground">({currentLetter.exampleMeaning})</p>
            </div>

            {/* Audio & Draw */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <Button
                variant="secondary"
                onClick={() => speakText(currentLetter.name + ". " + currentLetter.example, language)}
              >
                <Volume2 className="w-4 h-4 mr-2" /> Dëgjo
              </Button>
            </div>

            {/* Drawing area */}
            <div className="mt-6">
              <p className="text-xs text-muted-foreground text-center mb-2 flex items-center justify-center gap-1">
                <Pencil className="w-3 h-3" /> Vizato germën me gisht ose miun
              </p>
              <DrawingCanvas letter={currentLetter.letter} onClear={() => {}} />
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">
              {currentIndex + 1} / {letters.length}
            </p>
          </motion.div>
        </AnimatePresence>
      ) : (
        /* Quiz mode */
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Germë {currentIndex + 1}/{letters.length}</span>
            <span className="text-sm font-bold text-primary">Pikë: {quizScore}/{quizTotal}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 mb-6">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / letters.length) * 100}%` }} />
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">Cila germë ka këtë shqiptim?</p>
            <p className="text-2xl font-bold text-foreground">/{letters[currentIndex].pronunciation}/</p>
            <p className="text-sm text-muted-foreground mt-1">Shembull: {letters[currentIndex].example}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quizOptions.map((optIdx) => {
              let extra = "";
              if (quizAnswer !== null) {
                if (optIdx === currentIndex) extra = " border-2 border-green-500 bg-green-500/10";
                else if (optIdx === quizAnswer) extra = " border-2 border-red-500 bg-red-500/10";
              }
              return (
                <button
                  key={optIdx}
                  onClick={() => handleQuizAnswer(optIdx)}
                  className={`p-4 rounded-xl text-center font-bold text-2xl glass-card hover:shadow-md transition-all ${isArabic ? "font-arabic" : ""}${extra}`}
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  {letters[optIdx].letter}
                </button>
              );
            })}
          </div>

          {currentIndex === letters.length - 1 && quizAnswer !== null && (
            <div className="text-center mt-6">
              <p className="text-lg font-bold text-foreground">
                Rezultati: {quizScore}/{quizTotal} ({Math.round((quizScore / Math.max(quizTotal, 1)) * 100)}%)
              </p>
              <button
                onClick={() => { setCurrentIndex(0); setQuizScore(0); setQuizTotal(0); }}
                className="mt-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4 inline mr-1" /> Rifillo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
