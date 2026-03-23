import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import QuranTabs from "@/components/quran/QuranTabs";
import SuretView from "@/components/quran/SuretView";
import HaditheSahihe from "@/components/quran/HaditheSahihe";
import QuranQuizView from "@/components/quran/QuranQuizView";
import QuranProgressView from "@/components/quran/QuranProgressView";
import SevapetView from "@/components/quran/SevapetView";

export default function Quran() {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "suret";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          Kur'ani Famëlartë
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          Mëso <span className="text-gradient">Kur'anin</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Lexo suret me përkthim shqip, dëgjo audio, testo veten me kuiz dhe ndiq progresin tënd.
        </p>
      </motion.div>

      <QuranTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-8">
        {activeTab === "suret" && <SuretView />}
        {activeTab === "quiz" && <QuranQuizView />}
        {activeTab === "progress" && <QuranProgressView />}
        {activeTab === "sevapet" && <SevapetView />}
      </div>
    </div>
  );
}
