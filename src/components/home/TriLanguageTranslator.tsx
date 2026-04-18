import React, { useState, useRef } from "react";
import { ArrowRightLeft, Volume2, Loader2 } from "lucide-react";

type LangCode = "sq" | "en" | "ar";

const LANGUAGES: Record<LangCode, { name: string; flag: string; ttsLang: string; mm: string }> = {
  sq: { name: "Shqip", flag: "🇦🇱", ttsLang: "sq-AL", mm: "sq-AL" },
  en: { name: "Anglisht", flag: "🇬🇧", ttsLang: "en-US", mm: "en-GB" },
  ar: { name: "Arabisht", flag: "🇸🇦", ttsLang: "ar-SA", mm: "ar-SA" },
};

export default function TriLanguageTranslator() {
  const [sourceLang, setSourceLang] = useState<LangCode>("sq");
  const [targetLang, setTargetLang] = useState<LangCode>("en");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<number | null>(null);

  const translate = async (text: string, from: LangCode, to: LangCode) => {
    if (!text.trim()) { setResult(null); return; }
    if (from === to) { setResult(text); return; }
    setLoading(true);
    setError(null);
    try {
      const langpair = `${LANGUAGES[from].mm}|${LANGUAGES[to].mm}`;
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`
      );
      const data = await res.json();
      const translated = data?.responseData?.translatedText;
      if (translated && data?.responseStatus === 200) {
        setResult(translated);
      } else {
        setError("Përkthimi dështoi. Provo përsëri.");
      }
    } catch {
      setError("Nuk u lidh me serverin. Kontrollo internetin.");
    }
    setLoading(false);
  };

  const handleTranslate = () => translate(inputText, sourceLang, targetLang);

  const handleInputChange = (v: string) => {
    setInputText(v);
    setResult(null);
    setError(null);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (v.trim().length > 1) {
      debounceRef.current = window.setTimeout(() => translate(v, sourceLang, targetLang), 700);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    if (result) {
      setInputText(result);
      setResult(inputText);
    }
  };

  const speak = (text: string, lang: LangCode) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANGUAGES[lang].ttsLang;
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  const LangButton = ({
    code, active, onClick, accent,
  }: { code: LangCode; active: boolean; onClick: () => void; accent: "purple" | "indigo" }) => (
    <button
      onClick={onClick}
      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? accent === "purple" ? "bg-purple-600 text-white" : "bg-indigo-600 text-white"
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
            {(Object.keys(LANGUAGES) as LangCode[]).map(code => (
              <LangButton
                key={`s-${code}`}
                code={code}
                active={sourceLang === code}
                accent="purple"
                onClick={() => {
                  if (code === targetLang) setTargetLang(sourceLang);
                  setSourceLang(code);
                  setResult(null);
                }}
              />
            ))}
          </div>
          <button
            onClick={handleSwap}
            className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700"
            aria-label="Swap"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1 flex-1">
            {(Object.keys(LANGUAGES) as LangCode[]).map(code => (
              <LangButton
                key={`t-${code}`}
                code={code}
                active={targetLang === code}
                accent="indigo"
                onClick={() => {
                  if (code === sourceLang) setSourceLang(targetLang);
                  setTargetLang(code);
                  setResult(null);
                }}
              />
            ))}
          </div>
        </div>

        <textarea
          placeholder={`Shkruaj në ${LANGUAGES[sourceLang].name}...`}
          value={inputText}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleTranslate(); }
          }}
          className="w-full border-2 border-gray-200 dark:border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 resize-none h-24 bg-card text-foreground"
          dir={sourceLang === "ar" ? "rtl" : "ltr"}
        />

        <button
          onClick={handleTranslate}
          disabled={!inputText.trim() || loading}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 shadow h-9 px-4 py-2 w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Duke përkthyer...</> : <>🌐 Përkthe</>}
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
                className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                aria-label="Dëgjo"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 text-center py-3 text-destructive text-sm bg-destructive/10 rounded-xl">
            {error}
          </div>
        )}

        <p className="text-[10px] text-muted-foreground mt-3 text-center">
          Powered by MyMemory Translation API
        </p>
      </div>
    </div>
  );
}
