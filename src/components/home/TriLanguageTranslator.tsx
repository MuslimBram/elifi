import React, { useState } from "react";
import { ArrowRightLeft, Volume2 } from "lucide-react";

type LangCode = "sq" | "en" | "ar";

const LANGUAGES: Record<LangCode, { name: string; flag: string; ttsLang: string }> = {
  sq: { name: "Shqip", flag: "🇦🇱", ttsLang: "sq-AL" },
  en: { name: "Anglisht", flag: "🇬🇧", ttsLang: "en-US" },
  ar: { name: "Arabisht", flag: "🇸🇦", ttsLang: "ar-SA" },
};

const DICTIONARY: Record<LangCode, Record<string, Record<LangCode, string>>> = {
  sq: {
    "përshëndetje": { sq: "Përshëndetje", ar: "السلام عليكم", en: "Hello" },
    "mirëmëngjesi": { sq: "Mirëmëngjesi", ar: "صباح الخير", en: "Good morning" },
    "mirëmbrëma": { sq: "Mirëmbrëma", ar: "مساء الخير", en: "Good evening" },
    "faleminderit": { sq: "Faleminderit", ar: "شكراً", en: "Thank you" },
    "ju lutem": { sq: "Ju lutem", ar: "من فضلك", en: "Please" },
    "po": { sq: "Po", ar: "نعم", en: "Yes" },
    "jo": { sq: "Jo", ar: "لا", en: "No" },
    "emri im është": { sq: "Emri im është", ar: "اسمي", en: "My name is" },
    "si jeni": { sq: "Si jeni", ar: "كيف حالك", en: "How are you" },
    "mirë": { sq: "Mirë", ar: "بخير", en: "Good" },
    "libër": { sq: "Libër", ar: "كتاب", en: "Book" },
    "shkollë": { sq: "Shkollë", ar: "مدرسة", en: "School" },
    "ujë": { sq: "Ujë", ar: "ماء", en: "Water" },
    "shtëpi": { sq: "Shtëpi", ar: "بيت", en: "House" },
    "diell": { sq: "Diell", ar: "شمس", en: "Sun" },
    "hënë": { sq: "Hënë", ar: "قمر", en: "Moon" },
    "dashuri": { sq: "Dashuri", ar: "حب", en: "Love" },
    "paqe": { sq: "Paqe", ar: "سلام", en: "Peace" },
    "familje": { sq: "Familje", ar: "عائلة", en: "Family" },
    "fëmijë": { sq: "Fëmijë", ar: "طفل", en: "Child" },
  },
  en: {
    "hello": { sq: "Përshëndetje", ar: "السلام عليكم", en: "Hello" },
    "good morning": { sq: "Mirëmëngjesi", ar: "صباح الخير", en: "Good morning" },
    "good evening": { sq: "Mirëmbrëma", ar: "مساء الخير", en: "Good evening" },
    "thank you": { sq: "Faleminderit", ar: "شكراً", en: "Thank you" },
    "please": { sq: "Ju lutem", ar: "من فضلك", en: "Please" },
    "yes": { sq: "Po", ar: "نعم", en: "Yes" },
    "no": { sq: "Jo", ar: "لا", en: "No" },
    "my name is": { sq: "Emri im është", ar: "اسمي", en: "My name is" },
    "how are you": { sq: "Si jeni", ar: "كيف حالك", en: "How are you" },
    "good": { sq: "Mirë", ar: "بخير", en: "Good" },
    "book": { sq: "Libër", ar: "كتاب", en: "Book" },
    "school": { sq: "Shkollë", ar: "مدرسة", en: "School" },
    "water": { sq: "Ujë", ar: "ماء", en: "Water" },
    "house": { sq: "Shtëpi", ar: "بيت", en: "House" },
    "sun": { sq: "Diell", ar: "شمس", en: "Sun" },
    "moon": { sq: "Hënë", ar: "قمر", en: "Moon" },
    "love": { sq: "Dashuri", ar: "حب", en: "Love" },
    "peace": { sq: "Paqe", ar: "سلام", en: "Peace" },
    "family": { sq: "Familje", ar: "عائلة", en: "Family" },
    "child": { sq: "Fëmijë", ar: "طفل", en: "Child" },
  },
  ar: {
    "السلام عليكم": { sq: "Përshëndetje", ar: "السلام عليكم", en: "Hello" },
    "صباح الخير": { sq: "Mirëmëngjesi", ar: "صباح الخير", en: "Good morning" },
    "مساء الخير": { sq: "Mirëmbrëma", ar: "مساء الخير", en: "Good evening" },
    "شكراً": { sq: "Faleminderit", ar: "شكراً", en: "Thank you" },
    "من فضلك": { sq: "Ju lutem", ar: "من فضلك", en: "Please" },
    "نعم": { sq: "Po", ar: "نعم", en: "Yes" },
    "لا": { sq: "Jo", ar: "لا", en: "No" },
    "اسمي": { sq: "Emri im është", ar: "اسمي", en: "My name is" },
    "كيف حالك": { sq: "Si jeni", ar: "كيف حالك", en: "How are you" },
    "بخير": { sq: "Mirë", ar: "بخير", en: "Good" },
    "كتاب": { sq: "Libër", ar: "كتاب", en: "Book" },
    "مدرسة": { sq: "Shkollë", ar: "مدرسة", en: "School" },
    "ماء": { sq: "Ujë", ar: "ماء", en: "Water" },
    "بيت": { sq: "Shtëpi", ar: "بيت", en: "House" },
    "شمس": { sq: "Diell", ar: "شمس", en: "Sun" },
    "قمر": { sq: "Hënë", ar: "قمر", en: "Moon" },
    "حب": { sq: "Dashuri", ar: "حب", en: "Love" },
    "سلام": { sq: "Paqe", ar: "سلام", en: "Peace" },
    "عائلة": { sq: "Familje", ar: "عائلة", en: "Family" },
    "طفل": { sq: "Fëmijë", ar: "طفل", en: "Child" },
  },
};

export default function TriLanguageTranslator() {
  const [sourceLang, setSourceLang] = useState<LangCode>("sq");
  const [targetLang, setTargetLang] = useState<LangCode>("en");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTranslate = () => {
    const normalized = inputText.toLowerCase().trim();
    if (!normalized) return;
    const dict = DICTIONARY[sourceLang];
    const found = Object.entries(dict).find(([key]) => key.toLowerCase() === normalized);
    if (found) {
      setResult(found[1][targetLang]);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    if (result) {
      setInputText(result);
      setResult(inputText);
      setNotFound(false);
    }
  };

  const speak = (text: string, lang: LangCode) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANGUAGES[lang].ttsLang;
    u.rate = 0.7;
    window.speechSynthesis.speak(u);
  };

  const LangButton = ({
    code,
    active,
    onClick,
    accent,
  }: {
    code: LangCode;
    active: boolean;
    onClick: () => void;
    accent: "purple" | "indigo";
  }) => (
    <button
      onClick={onClick}
      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? accent === "purple"
            ? "bg-purple-600 text-white"
            : "bg-indigo-600 text-white"
          : `bg-gray-100 text-gray-600 hover:bg-${accent}-50`
      }`}
    >
      {LANGUAGES[code].flag} {LANGUAGES[code].name}
    </button>
  );

  return (
    <div className="glass-card rounded-2xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div>
            <p className="text-xs text-purple-500 uppercase tracking-widest font-semibold">Përkthyes</p>
            <p className="text-xl font-bold text-purple-900 dark:text-purple-300">🌐 Përkthyes Tri-Gjuhësor</p>
          </div>
          <div className="flex gap-2 text-xs text-purple-600 dark:text-purple-400">
            🇦🇱 Shqip &nbsp;·&nbsp; 🇬🇧 Anglisht &nbsp;·&nbsp; 🇸🇦 Arabisht
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1 flex-1">
            {(Object.keys(LANGUAGES) as LangCode[]).map((code) => (
              <LangButton
                key={`src-${code}`}
                code={code}
                active={sourceLang === code}
                accent="purple"
                onClick={() => {
                  if (code === targetLang) setTargetLang(sourceLang);
                  setSourceLang(code);
                  setResult(null);
                  setNotFound(false);
                }}
              />
            ))}
          </div>
          <button
            onClick={handleSwap}
            className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors"
            aria-label="Swap languages"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1 flex-1">
            {(Object.keys(LANGUAGES) as LangCode[]).map((code) => (
              <LangButton
                key={`tgt-${code}`}
                code={code}
                active={targetLang === code}
                accent="indigo"
                onClick={() => {
                  if (code === sourceLang) setSourceLang(targetLang);
                  setTargetLang(code);
                  setResult(null);
                  setNotFound(false);
                }}
              />
            ))}
          </div>
        </div>

        <textarea
          placeholder={`Shkruaj në ${LANGUAGES[sourceLang].name}...`}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setResult(null);
            setNotFound(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleTranslate();
            }
          }}
          className="w-full border-2 border-gray-200 dark:border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 resize-none h-24 bg-card text-foreground"
          dir={sourceLang === "ar" ? "rtl" : "ltr"}
        />

        <button
          onClick={handleTranslate}
          disabled={!inputText.trim()}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-9 px-4 py-2 w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          🌐 Përkthe
        </button>

        {result && (
          <div className="mt-4 bg-indigo-50 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs text-indigo-500 uppercase tracking-wider font-semibold mb-1">
                  {LANGUAGES[targetLang].flag} {LANGUAGES[targetLang].name}
                </p>
                <p
                  className="text-lg font-bold text-indigo-900 dark:text-indigo-200"
                  dir={targetLang === "ar" ? "rtl" : "ltr"}
                >
                  {result}
                </p>
              </div>
              <button
                onClick={() => speak(result, targetLang)}
                className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-colors"
                aria-label="Listen"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {notFound && (
          <div className="mt-4 text-center py-4 text-muted-foreground text-sm bg-muted/30 rounded-xl">
            Fjala nuk u gjet në fjalor. Provo ndonjë fjalë tjetër.
          </div>
        )}
      </div>
    </div>
  );
}
