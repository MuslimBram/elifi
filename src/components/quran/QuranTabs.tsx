import React from "react";

const TABS = [
  { id: "suret", label: "Suret", icon: "📖" },
  { id: "quiz", label: "Kuiz", icon: "🎯" },
  { id: "progress", label: "Progresi", icon: "📊" },
  { id: "sevapet", label: "Sevapet", icon: "✨" },
];

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function QuranTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 glass-card p-4 rounded-xl">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === tab.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card border border-border text-foreground/70 hover:border-primary/50"
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
}
