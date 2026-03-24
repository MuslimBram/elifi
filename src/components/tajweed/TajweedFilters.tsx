import React from "react";

const levels = [
  { value: "te_gjitha", label: "Të Gjitha" },
  { value: "fillestar", label: "Fillestar" },
  { value: "mesatar", label: "Mesatar" },
  { value: "avancuar", label: "Avancuar" },
];

const categories = [
  { value: "te_gjitha", label: "Të Gjitha" },
  { value: "noon_sakinah", label: "Noon Sakinah" },
  { value: "meem_sakinah", label: "Meem Sakinah" },
  { value: "madd", label: "Madd (Zgjatja)" },
  { value: "qalqalah", label: "Qalqalah" },
  { value: "ghunnah", label: "Ghunnah" },
];

interface Props {
  selectedLevel: string;
  selectedCategory: string;
  onLevelChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
}

export default function TajweedFilters({ selectedLevel, selectedCategory, onLevelChange, onCategoryChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-primary mb-2">Niveli:</p>
        <div className="flex flex-wrap gap-2">
          {levels.map((lvl) => (
            <button
              key={lvl.value}
              onClick={() => onLevelChange(lvl.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedLevel === lvl.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground/70 border border-border hover:border-primary/50"
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-primary mb-2">Kategoria:</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedCategory === cat.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground/70 border border-border hover:border-primary/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
