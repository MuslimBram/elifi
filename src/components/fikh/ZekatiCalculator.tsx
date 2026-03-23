import React, { useState } from "react";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";

const GOLD_PRICE_PER_GRAM = 85;
const NISAB_GOLD_GRAMS = 85;
const ZEKAT_RATE = 0.025;

export default function ZekatiCalculator() {
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [cash, setCash] = useState("");
  const [business, setBusiness] = useState("");
  const [debts, setDebts] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const totalAssets =
      (parseFloat(gold) || 0) * GOLD_PRICE_PER_GRAM +
      (parseFloat(silver) || 0) * 0.85 +
      (parseFloat(cash) || 0) +
      (parseFloat(business) || 0);
    const totalDebts = parseFloat(debts) || 0;
    const zakatable = totalAssets - totalDebts;
    const nisabValue = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM;
    const zekat = zakatable >= nisabValue ? zakatable * ZEKAT_RATE : 0;
    setResult({ totalAssets: totalAssets.toFixed(2), zakatable: zakatable.toFixed(2), nisabValue: nisabValue.toFixed(2), zekat: zekat.toFixed(2), obligated: zakatable >= nisabValue });
  };

  return (
    <div className="bg-card rounded-2xl border border-yellow-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-yellow-600" />
        <h3 className="font-bold text-foreground">Kalkulatori i Zekatit</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Llogarit Zekatin e detyrueshëm. Nisabi = 85g ar ≈ {(NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM).toLocaleString()} €</p>
      <div className="space-y-3 mb-4">
        {[
          { label: "💛 Ari (gram)", val: gold, set: setGold, hint: "~85€/gram" },
          { label: "⚪ Argjendi (gram)", val: silver, set: setSilver, hint: "~0.85€/gram" },
          { label: "💶 Para & Kursime (€)", val: cash, set: setCash, hint: "Banke + kesh" },
          { label: "🏪 Pasuri Tregtare (€)", val: business, set: setBusiness, hint: "Inventari, aksionet" },
          { label: "💳 Borxhet e tua (€)", val: debts, set: setDebts, hint: "Zbrihen nga totali" },
        ].map(({ label, val, set, hint }) => (
          <div key={label}>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">{label} <span className="text-muted-foreground font-normal">({hint})</span></label>
            <Input type="number" min="0" placeholder="0" value={val} onChange={e => set(e.target.value)} className="rounded-xl text-sm" />
          </div>
        ))}
      </div>
      <button onClick={calculate} className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold text-sm hover:opacity-90 transition-all shadow-md">
        🧮 Llogarit Zekatin
      </button>
      {result && (
        <div className="mt-4 space-y-2">
          <div className={`rounded-2xl p-4 border-2 ${result.obligated ? "border-emerald-400 bg-emerald-50" : "border-border bg-muted"}`}>
            {result.obligated ? (
              <>
                <p className="text-sm font-bold text-emerald-700 mb-1">✅ Zekati është i detyrueshëm!</p>
                <p className="text-3xl font-extrabold text-emerald-700">{parseFloat(result.zekat).toLocaleString()} €</p>
                <p className="text-xs text-emerald-600 mt-1">Zekat i detyrueshëm (2.5% × {parseFloat(result.zakatable).toLocaleString()} €)</p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-muted-foreground mb-1">ℹ️ Zekati nuk është detyrueshëm</p>
                <p className="text-xs text-muted-foreground">Pasuria ({parseFloat(result.zakatable).toLocaleString()} €) nuk arrin Nisabin ({parseFloat(result.nisabValue).toLocaleString()} €)</p>
              </>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-secondary rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground">Totali i pasurisë</p>
              <p className="font-bold text-foreground">{parseFloat(result.totalAssets).toLocaleString()} €</p>
            </div>
            <div className="bg-secondary rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground">Pas zbritjes borxheve</p>
              <p className="font-bold text-foreground">{parseFloat(result.zakatable).toLocaleString()} €</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">⚠️ Llogaritje aproximative. Konsultohuni me dijetar për saktësi.</p>
        </div>
      )}
    </div>
  );
}
