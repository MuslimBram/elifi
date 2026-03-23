import React, { useState, useEffect, useCallback } from "react";

const LEVELS: Record<string, { label: string; gridSize: number; filledRange: [number, number]; optionCount: number; autoNext: number; description: string }> = {
  fillestar: { label: "🌱 Fillestar", gridSize: 9, filledRange: [2, 3], optionCount: 4, autoNext: 2000, description: "Rrjeta 3×3 — 2-3 sheshe" },
  mesatar: { label: "📚 Mesatar", gridSize: 16, filledRange: [3, 5], optionCount: 4, autoNext: 1800, description: "Rrjeta 4×4 — 3-5 sheshe" },
  avancuar: { label: "⭐ Avancuar", gridSize: 25, filledRange: [5, 8], optionCount: 4, autoNext: 1500, description: "Rrjeta 5×5 — 5-8 sheshe" },
  profesionist: { label: "🏆 Profesionist", gridSize: 36, filledRange: [8, 12], optionCount: 6, autoNext: 1200, description: "Rrjeta 6×6 — 8-12 sheshe" },
};

function getGridCols(gs: number) { return gs === 9 ? "grid-cols-3" : gs === 16 ? "grid-cols-4" : gs === 25 ? "grid-cols-5" : "grid-cols-6"; }

interface Pattern { filledPositions: number[]; count: number }

function generatePattern(gridSize: number, filledRange: [number, number]): Pattern {
  const [min, max] = filledRange;
  const count = min + Math.floor(Math.random() * (max - min + 1));
  const filled: number[] = [];
  while (filled.length < count) { const p = Math.floor(Math.random() * gridSize); if (!filled.includes(p)) filled.push(p); }
  return { filledPositions: filled.sort((a, b) => a - b), count };
}

function GridDisplay({ pattern, gridSize, size = "sm", highlight = false }: { pattern: Pattern; gridSize: number; size?: string; highlight?: boolean }) {
  const cols = getGridCols(gridSize);
  const cs = size === "lg" ? (gridSize <= 9 ? "w-10 h-10" : gridSize <= 16 ? "w-8 h-8" : "w-6 h-6") : (gridSize <= 9 ? "w-5 h-5" : gridSize <= 16 ? "w-4 h-4" : "w-3 h-3");
  return (
    <div className={`grid ${cols} gap-1`}>
      {Array.from({ length: gridSize }, (_, i) => (
        <div key={i} className={`rounded-sm transition-all ${cs} ${pattern.filledPositions.includes(i) ? (highlight ? "bg-emerald-500 border border-emerald-600" : "bg-primary border border-primary") : "bg-secondary border border-border"}`} />
      ))}
    </div>
  );
}

export default function BrainGymGame({ onClose, initialLevel }: { onClose: () => void; initialLevel?: string }) {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null);
  const [options, setOptions] = useState<{ correct: string; choices: Pattern[] } | null>(null);

  const initRound = useCallback((levelKey: string) => {
    const lv = LEVELS[levelKey];
    const correct = generatePattern(lv.gridSize, lv.filledRange);
    const wrongs = Array.from({ length: lv.optionCount - 1 }, () => generatePattern(lv.gridSize, lv.filledRange));
    const all = [correct, ...wrongs].sort(() => Math.random() - 0.5);
    setCurrentPattern(correct);
    setOptions({ correct: correct.filledPositions.join(","), choices: all });
    setAnswered(null);
    setShowResult(false);
  }, []);

  const handleLevelSelect = (key: string) => { setSelectedLevel(key); setScore(0); setRound(0); initRound(key); };

  const nextRound = useCallback(() => { if (!selectedLevel) return; initRound(selectedLevel); setRound(r => r + 1); }, [selectedLevel, initRound]);

  const handleAnswer = (choice: Pattern) => {
    if (answered !== null || !options) return;
    const isCorrect = choice.filledPositions.join(",") === options.correct;
    setAnswered(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(s => s + 1);
    setShowResult(true);
    setTimeout(nextRound, LEVELS[selectedLevel!].autoNext);
  };

  useEffect(() => { if (initialLevel && LEVELS[initialLevel] && !selectedLevel) handleLevelSelect(initialLevel); }, [initialLevel]);

  const lv = selectedLevel ? LEVELS[selectedLevel] : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {selectedLevel && <button onClick={() => setSelectedLevel(null)} className="text-xs px-2 py-1 bg-secondary rounded-lg text-muted-foreground font-semibold">← Niveli</button>}
            <div><h2 className="text-lg font-extrabold text-foreground">🧠 Brain Gym</h2>{lv && <p className="text-xs text-muted-foreground">{lv.label} · {lv.description}</p>}</div>
          </div>
          <div className="flex items-center gap-3">
            {selectedLevel && <div className="text-right"><p className="text-2xl font-bold text-primary">{score}</p><p className="text-xs text-muted-foreground">pikë</p></div>}
            <button onClick={onClose} className="w-8 h-8 bg-secondary hover:bg-destructive/10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-destructive font-bold text-lg">✕</button>
          </div>
        </div>

        {!selectedLevel && (
          <div className="flex flex-col items-center py-4">
            <div className="text-5xl mb-3">🧠</div>
            <h2 className="text-2xl font-extrabold text-foreground mb-1">Brain Gym Vizual</h2>
            <p className="text-muted-foreground text-sm mb-6">Zgjidh nivelin e vështirësisë</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
              {Object.entries(LEVELS).map(([key, lv]) => (
                <button key={key} onClick={() => handleLevelSelect(key)} className="rounded-2xl border-2 border-border p-5 text-left transition-all hover:scale-105 hover:shadow-md hover:border-primary bg-card">
                  <p className="text-lg font-extrabold mb-1">{lv.label}</p>
                  <p className="text-xs text-muted-foreground">{lv.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedLevel && currentPattern && options && (
          <>
            <div className="bg-secondary rounded-2xl p-5 mb-4">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-3 text-center">Modeli origjinal — gjej njëjtin!</p>
              <div className="flex justify-center mb-2"><GridDisplay pattern={currentPattern} gridSize={lv!.gridSize} size="lg" /></div>
              <p className="text-center text-xs text-muted-foreground">{currentPattern.count} sheshe të mbushura</p>
            </div>
            {showResult && <div className={`text-center font-bold text-lg mb-3 ${answered === "correct" ? "text-emerald-600" : "text-red-500"}`}>{answered === "correct" ? "✅ Saktë!" : "❌ Jo e saktë!"}</div>}
            <p className="text-xs font-bold text-muted-foreground uppercase mb-3 text-center">Zgjidh modelin e njëjtë:</p>
            <div className={`grid gap-3 ${lv!.optionCount === 6 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
              {options.choices.map((choice, i) => (
                <button key={i} disabled={!!answered} onClick={() => handleAnswer(choice)} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${answered && choice.filledPositions.join(",") === options.correct ? "border-emerald-500 bg-emerald-500/10" : "border-border hover:border-primary/50 hover:bg-secondary"}`}>
                  <GridDisplay pattern={choice} gridSize={lv!.gridSize} size="sm" />
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">Rundi: {round + 1}</p>
              <button onClick={nextRound} className="text-xs px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-xl font-semibold text-muted-foreground transition-all">Kapërceje →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
