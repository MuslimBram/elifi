import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Languages } from "lucide-react";
import { motion } from "framer-motion";
import AlphabetTabs from "@/components/alphabet/AlphabetTabs";
import LettersView from "@/components/alphabet/LettersView";
import NumberLearningView from "@/components/alphabet/NumberLearningView";
import SyllablesView from "@/components/alphabet/SyllablesView";
import WordsView from "@/components/alphabet/WordsView";
import FlashcardsView from "@/components/alphabet/FlashcardsView";
import DrawingCanvas from "@/components/alphabet/DrawingCanvas";
import VerbConjugationView from "@/components/alphabet/VerbConjugationView";
import NounDeclensionView from "@/components/alphabet/NounDeclensionView";
import MadinahArabicView from "@/components/alphabet/MadinahArabicView";

const languages = [
  { value: "shqip", label: "🇦🇱 Shqip" },
  { value: "anglisht", label: "🇬🇧 Anglisht" },
  { value: "arabisht", label: "🇸🇦 Arabisht" },
];

export default function Alphabet() {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "germat";
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [selectedLang, setSelectedLang] = useState("shqip");

  const showLangFilter = ["numrat", "germat", "rrokjet", "fjalet", "flashcards"].includes(activeTab);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <Languages className="w-4 h-4" />
          Alfabeti në 3 Gjuhë
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          Mëso <span className="text-gradient">Alfabetin</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Numrat, germët, rrokjet, fjalët, zgjedhimi i foljeve dhe lakimi i emrave në shqip, anglisht dhe arabisht.
        </p>
      </motion.div>

      <AlphabetTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {showLangFilter && (
        <div className="flex flex-wrap items-center gap-4 mb-8 mt-6">
          <p className="text-xs font-semibold text-primary">Gjuha</p>
          <div className="flex gap-2">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => setSelectedLang(lang.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedLang === lang.value
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border text-foreground/70 hover:border-primary/50"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        {activeTab === "numrat" && <NumberLearningView language={selectedLang} />}
        {activeTab === "germat" && <LettersView language={selectedLang} />}
        {activeTab === "rrokjet" && <SyllablesView language={selectedLang} />}
        {activeTab === "fjalet" && <WordsView language={selectedLang} />}
        {activeTab === "flashcards" && <FlashcardsView language={selectedLang} />}
        {activeTab === "vizato" && <DrawingCanvas letter={selectedLang === "arabisht" ? "ا" : "A"} />}
        {activeTab === "zgjedhimi" && <VerbConjugationView />}
        {activeTab === "lakimi" && <NounDeclensionView />}
        {activeTab === "medine" && <MadinahArabicView />}
      </div>
    </div>
  );
}
