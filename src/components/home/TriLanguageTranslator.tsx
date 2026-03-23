import React, { useState } from "react";
import { Globe, Volume2 } from "lucide-react";

const LANGUAGES: Record<string, { name: string; flag: string }> = {
  sq: { name: "Shqip", flag: "🇦🇱" },
  ar: { name: "Arabisht", flag: "🇸🇦" },
  en: { name: "Anglisht", flag: "🇬🇧" },
};

const DICTIONARY: Record<string, Record<string, Record<string, string>>> = {
  sq: {
    "përshëndetje": { ar: "السلام عليكم", en: "Hello" },
    "mirëmëngjesi": { ar: "صباح الخير", en: "Good morning" },
    "mirëmbrëma": { ar: "مساء الخير", en: "Good evening" },
    "faleminderit": { ar: "شكراً", en: "Thank you" },
    "ju lutem": { ar: "من فضلك", en: "Please" },
    "po": { ar: "نعم", en: "Yes" },
    "jo": { ar: "لا", en: "No" },
    "emri im është": { ar: "اسمي", en: "My name is" },
    "si jeni": { ar: "كيف حالك", en: "How are you" },
    "mirë": { ar: "بخير", en: "Good" },
    "libër": { ar: "كتاب", en: "Book" },
    "shkollë": { ar: "مدرسة", en: "School" },
    "ujë": { ar: "ماء", en: "Water" },
    "shtëpi": { ar: "بيت", en: "House" },
    "diell": { ar: "شمس", en: "Sun" },
    "hënë": { ar: "قمر", en: "Moon" },
    "dashuri": { ar: "حب", en: "Love" },
    "paqe": { ar: "سلام", en: "Peace" },
    "familje": { ar: "عائلة", en: "Family" },
    "fëmijë": { ar: "طفل", en: "Child" },
  },
  ar: {
    "السلام عليكم": { sq: "Përshëndetje", en: "Hello" },
    "صباح الخير": { sq: "Mirëmëngjesi", en: "Good morning" },
    "مساء الخير": { sq: "Mirëmbrëma", en: "Good evening" },
    "شكراً": { sq: "Faleminderit", en: "Thank you" },
    "من فضلك": { sq: "Ju lutem", en: "Please" },
    "نعم": { sq: "Po", en: "Yes" },
    "لا": { sq: "Jo", en: "No" },
    "اسمي": { sq: "Emri im është", en: "My name is" },
    "كيف حالك": { sq: "Si jeni", en: "How are you" },
    "بخير": { sq: "Mirë", en: "Good" },
    "كتاب": { sq: "Libër", en: "Book" },
    "مدرسة": { sq: "Shkollë", en: "School" },
    "ماء": { sq: "Ujë", en: "Water" },
    "بيت": { sq: "Shtëpi", en: "House" },
    "شمس": { sq: "Diell", en: "Sun" },
    "قمر": { sq: "Hënë", en: "Moon" },
    "حب": { sq: "Dashuri", en: "Love" },
    "سلام": { sq: "Paqe", en: "Peace" },
    "عائلة": { sq: "Familje", en: "Family" },
    "طفل": { sq: "Fëmijë", en: "Child" },
  },
  en: {
    "hello": { sq: "Përshëndetje", ar: "السلام عليكم" },
    "good morning": { sq: "Mirëmëngjesi", ar: "صباح الخير" },
    "good evening": { sq: "Mirëmbrëma", ar: "مساء الخير" },
    "thank you": { sq: "Faleminderit", ar: "شكراً" },
    "please": { sq: "Ju lutem", ar: "من فضلك" },
    "yes": { sq: "Po", ar: "نعم" },
    "no": { sq: "Jo", ar: "لا" },
    "my name is": { sq: "Emri im është", ar: "اسمي" },
    "how are you": { sq: "Si jeni", ar: "كيف حالك" },
    "good": { sq: "Mirë", ar: "بخير" },
    "book": { sq: "Libër", ar: "كتاب" },
    "school": { sq: "Shkollë", ar: "مدرسة" },
    "water": { sq: "Ujë", ar: "ماء" },
    "house": { sq: "Shtëpi", ar: "بيت" },
    "sun": { sq: "Diell", ar: "شمس" },
    "moon": { sq: "Hënë", ar: "قمر" },
    "love": { sq: "Dashuri", ar: "حب" },
    "peace": { sq: "Paqe", ar: "سلام" },
    "family": { sq: "Familje", ar: "عائلة" },
    "child": { sq: "Fëmijë", ar: "طفل" },
  },
};

export default function TriLanguageTranslator() {
  const [selectedLang, setSelectedLang] = useState("sq");
  const [inputWord, setInputWord] = useState("");
  const [translation, setTranslation] = useState<{ word: string; translations: Record<string, string> } | null>(null);

  const handleTranslate = (word: string) => {
    const normalized = word.toLowerCase().trim();
    const dict = DICTIONARY[selectedLang];
    const found = Object.entries(dict).find(([key]) => key.toLowerCase() === normalized);
    if (found) setTranslation({ word: found[0], translations: found[1] });
    else setTranslation(null);
  };

  const speak = (text: string, lang: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "ar" ? "ar-SA" : lang === "sq" ? "sq-AL" : "en-US";
    u.rate = 0.7;
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Globe className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground">Përkthyes Tri-Gjuhësor</h3>
      </div>

      <div className="flex gap-2 mb-5">
        {Object.entries(LANGUAGES).map(([code, lang]) => (
          <button key={code} onClick={() => { setSelectedLang(code); setInputWord(""); setTranslation(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedLang === code ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground"}`}>
            <span>{lang.flag}</span> {lang.name}
          </button>
        ))}
      </div>

      <div className="relative mb-5">
        <input type="text" placeholder={`Shkruaj fjalë në ${LANGUAGES[selectedLang].name}...`} value={inputWord}
          onChange={e => setInputWord(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && inputWord) handleTranslate(inputWord); }}
          className="w-full px-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          style={{ direction: selectedLang === "ar" ? "rtl" : "ltr" }} />
        <button onClick={() => { if (inputWord) handleTranslate(inputWord); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-bold">
          Përkthe
        </button>
      </div>

      {translation ? (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-3">
          <div className="font-bold text-foreground flex items-center gap-2">
            <span className="text-lg" dir={selectedLang === "ar" ? "rtl" : "ltr"}>{translation.word}</span>
            <button onClick={() => speak(translation.word, selectedLang)} className="opacity-70 hover:opacity-100"><Volume2 className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(translation.translations).map(([lang, text]) => (
              <div key={lang} className="bg-card rounded-lg p-3 text-center border border-border">
                <p className="text-xs text-muted-foreground mb-1">{LANGUAGES[lang]?.name || lang}</p>
                <p className="font-semibold text-foreground text-sm" dir={lang === "ar" ? "rtl" : "ltr"}>{text}</p>
                <button onClick={() => speak(text, lang)} className="mt-2 text-primary opacity-70 hover:opacity-100"><Volume2 className="w-3.5 h-3.5 mx-auto" /></button>
              </div>
            ))}
          </div>
        </div>
      ) : inputWord ? (
        <div className="text-center py-6 text-muted-foreground text-sm">Fjala nuk u gjet në fjalor. Provo ndonjë fjalë tjetër.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.keys(DICTIONARY[selectedLang]).slice(0, 8).map(word => (
            <button key={word} onClick={() => { setInputWord(word); handleTranslate(word); }}
              className="px-3 py-2 bg-secondary hover:bg-primary/10 rounded-lg text-xs font-semibold text-foreground transition-colors text-center truncate"
              dir={selectedLang === "ar" ? "rtl" : "ltr"}>
              {word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
