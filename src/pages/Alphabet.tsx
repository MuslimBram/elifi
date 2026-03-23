import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Languages } from "lucide-react";
import { motion } from "framer-motion";
import AlphabetTabs from "@/components/alphabet/AlphabetTabs";
import NumberLearningView from "@/components/alphabet/NumberLearningView";
import SyllablesView from "@/components/alphabet/SyllablesView";
import WordsView from "@/components/alphabet/WordsView";
import VerbConjugationView from "@/components/alphabet/VerbConjugationView";
import NounDeclensionView from "@/components/alphabet/NounDeclensionView";

const languages = [
  { value: "shqip", label: "🇦🇱 Shqip" },
  { value: "anglisht", label: "🇬🇧 Anglisht" },
  { value: "arabisht", label: "🇸🇦 Arabisht" },
];

export default function Alphabet() {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "numrat";
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [selectedLang, setSelectedLang] = useState("shqip");

  const showLangFilter = ["numrat", "germat", "rrokjet", "fjalet"].includes(activeTab);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
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

      {/* Tabs */}
      <AlphabetTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Language Filter */}
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

      {/* Content */}
      <div className="mt-6">
        {activeTab === "numrat" && <NumberLearningView language={selectedLang} />}
        {activeTab === "germat" && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <Languages className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground text-lg font-medium">Germët — Së shpejti!</p>
            <p className="text-muted-foreground text-sm mt-1">
              Mësimi i germave me vizatim, shqiptim dhe kuiz do të shtohet së shpejti.
            </p>
          </div>
        )}
        {activeTab === "rrokjet" && <SyllablesView language={selectedLang} />}
        {activeTab === "fjalet" && <WordsView language={selectedLang} />}
        {activeTab === "zgjedhimi" && <VerbConjugationView />}
        {activeTab === "lakimi" && <NounDeclensionView />}
      </div>
    </div>
  );
}
