import React, { useState } from "react";
import { Volume2 } from "lucide-react";

interface NounData {
  noun: string;
  gender: string;
  meaning: string;
  arabic: string;
  pashquar: { njejes: Record<string, string>; shumes: Record<string, string> };
  shquar: { njejes: Record<string, string>; shumes: Record<string, string> };
}

const RASAS = [
  { key: "emerore", label: "Emërore", question: "kush? cili?" },
  { key: "gjinore", label: "Gjinore", question: "i/e kujt?" },
  { key: "dhanore", label: "Dhanore", question: "kujt?" },
  { key: "kallezore", label: "Kallëzore", question: "kë? cilin?" },
  { key: "rrjedhore", label: "Rrjedhore", question: "prej kujt?" },
];

const NOUNS: NounData[] = [
  {
    noun: "laps", gender: "mashkullore", meaning: "pencil", arabic: "قَلَم",
    pashquar: {
      njejes: { emerore: "një laps", gjinore: "i/e një lapsi", dhanore: "një lapsi", kallezore: "një laps", rrjedhore: "prej një lapsi" },
      shumes: { emerore: "disa lapsa", gjinore: "i/e disa lapsave", dhanore: "disa lapsave", kallezore: "disa lapsa", rrjedhore: "prej disa lapsave" },
    },
    shquar: {
      njejes: { emerore: "lapsi", gjinore: "i lapsit", dhanore: "lapsit", kallezore: "lapsin", rrjedhore: "prej lapsit" },
      shumes: { emerore: "lapsat", gjinore: "i lapsave", dhanore: "lapsave", kallezore: "lapsat", rrjedhore: "prej lapsave" },
    },
  },
  {
    noun: "shkollë", gender: "femërore", meaning: "school", arabic: "مَدْرَسَة",
    pashquar: {
      njejes: { emerore: "një shkollë", gjinore: "i/e një shkolle", dhanore: "një shkolle", kallezore: "një shkollë", rrjedhore: "prej një shkolle" },
      shumes: { emerore: "disa shkolla", gjinore: "i/e disa shkollave", dhanore: "disa shkollave", kallezore: "disa shkolla", rrjedhore: "prej disa shkollave" },
    },
    shquar: {
      njejes: { emerore: "shkolla", gjinore: "i shkollës", dhanore: "shkollës", kallezore: "shkollën", rrjedhore: "prej shkollës" },
      shumes: { emerore: "shkollat", gjinore: "i shkollave", dhanore: "shkollave", kallezore: "shkollat", rrjedhore: "prej shkollave" },
    },
  },
  {
    noun: "mal", gender: "mashkullore", meaning: "mountain", arabic: "جَبَل",
    pashquar: {
      njejes: { emerore: "një mal", gjinore: "i/e një mali", dhanore: "një mali", kallezore: "një mal", rrjedhore: "prej një mali" },
      shumes: { emerore: "disa male", gjinore: "i/e disa maleve", dhanore: "disa maleve", kallezore: "disa male", rrjedhore: "prej disa maleve" },
    },
    shquar: {
      njejes: { emerore: "mali", gjinore: "i malit", dhanore: "malit", kallezore: "malin", rrjedhore: "prej malit" },
      shumes: { emerore: "malet", gjinore: "i maleve", dhanore: "maleve", kallezore: "malet", rrjedhore: "prej maleve" },
    },
  },
  {
    noun: "fletore", gender: "femërore", meaning: "notebook", arabic: "دَفْتَر",
    pashquar: {
      njejes: { emerore: "një fletore", gjinore: "i/e një fletoreje", dhanore: "një fletoreje", kallezore: "një fletore", rrjedhore: "prej një fletoreje" },
      shumes: { emerore: "disa fletore", gjinore: "i/e disa fletoreve", dhanore: "disa fletoreve", kallezore: "disa fletore", rrjedhore: "prej disa fletoreve" },
    },
    shquar: {
      njejes: { emerore: "fletorja", gjinore: "i fletores", dhanore: "fletores", kallezore: "fletoren", rrjedhore: "prej fletores" },
      shumes: { emerore: "fletoret", gjinore: "i fletoreve", dhanore: "fletoreve", kallezore: "fletoret", rrjedhore: "prej fletoreve" },
    },
  },
];

function speak(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "sq-AL";
  u.rate = 0.75;
  window.speechSynthesis.speak(u);
}

export default function NounDeclensionView() {
  const [selectedNoun, setSelectedNoun] = useState(0);
  const [trajta, setTrajta] = useState<"pashquar" | "shquar">("pashquar");

  const noun = NOUNS[selectedNoun];
  const data = noun[trajta];

  return (
    <div className="space-y-6">
      {/* Noun selector */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">📋 Lakimi i Emrave</h3>
        <div className="flex flex-wrap gap-2">
          {NOUNS.map((n, i) => (
            <button
              key={n.noun}
              onClick={() => setSelectedNoun(i)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedNoun === i
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "glass-card text-foreground hover:shadow-sm"
              }`}
            >
              {n.noun} <span className="text-xs opacity-70">({n.meaning})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gender & Arabic */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          noun.gender === "mashkullore" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"
        }`}>
          {noun.gender === "mashkullore" ? "♂ Mashkullore" : "♀ Femërore"}
        </span>
        <span className="text-sm text-primary font-bold" dir="rtl">{noun.arabic}</span>
      </div>

      {/* Trajta toggle */}
      <div className="flex gap-2">
        {(["pashquar", "shquar"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTrajta(t)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              trajta === t
                ? "bg-primary text-primary-foreground shadow-md"
                : "glass-card text-foreground/70 border border-border"
            }`}
          >
            {t === "pashquar" ? "Trajta e Pashquar" : "Trajta e Shquar"}
          </button>
        ))}
      </div>

      {/* Declension table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Rasa</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Pyetja</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Njëjës</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase">Shumës</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {RASAS.map((rasa, i) => (
                <tr key={rasa.key} className={`border-b border-border ${i % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}>
                  <td className="px-4 py-3 font-semibold text-foreground">{rasa.label}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs italic">{rasa.question}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{data.njejes[rasa.key]}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{data.shumes[rasa.key]}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => speak(data.njejes[rasa.key])} className="text-primary hover:text-primary/80">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
