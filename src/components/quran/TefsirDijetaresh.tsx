import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const TEFSIR_DATA = [
  {
    surah: "Al-Fatiha (1)",
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    verse: "Lavdërimi i takon Allahut, Zotit të botëve.",
    tefsir: [
      { scholar: "Ibn Kethir", text: "Kjo sure quhet 'Umm Al-Kitab' (Nëna e Librit). Fjala 'Hamd' do të thotë lavdërim i plotë dhe falënderim ndaj Allahut. 'Rabb Al-Alemin' tregon se Allahu është Zot, Krijues dhe Mirëmbajtës i të gjitha krijesave.", source: "Tefsiru Ibn Kethir, Vëll. 1, f. 22" },
      { scholar: "Es-Sadi", text: "Sure Al-Fatiha përmban bazat e fesë islame: teuhidin, adhurimin e sinqertë dhe kërkimin e udhëzimit. 'Iyyaka nabudu wa iyyaka nastainu' është shtylla e adhurimit islam.", source: "Taisiru Al-Kerimi Ar-Rahman, f. 39" },
      { scholar: "Al-Qurtubi", text: "Dijetarët kanë rënë dakord se leximi i Al-Fatiha është farz në çdo rekat të namazit. Kjo sure ndahet midis robit dhe Zotit — gjysma është falënderim dhe gjysma është lutje.", source: "Al-Xhami' li Ahkam Al-Quran, Vëll. 1, f. 110" }
    ]
  },
  {
    surah: "Ajetu'l-Kursi — Al-Baqarah 2:255",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    verse: "Allahu — nuk ka zot tjetër përveç Tij — i Gjalli, Mbajtësi i gjithçkaje.",
    tefsir: [
      { scholar: "Ibn Kethir", text: "Ajetu'l-Kursi është ajeti më i madh në Kur'an. Ai përmban emnat më të lartë: Al-Hayy dhe Al-Qayyum. Allahu është i Gjallë me jetë absolute, pa fillim dhe pa mbarim.", source: "Tefsiru Ibn Kethir, Vëll. 1, f. 456" },
      { scholar: "Ibn El-Qayyim", text: "Emri 'Al-Hayy Al-Qayyum' është emri më i madh i Allahut (Ismul Adzham). Kush lutet me të, lutja i pranohet. Ky ajet është mburoja e muslimanit — kush e lexon para gjumit, Allahu e mbron deri në mëngjes.", source: "Bedaiu Al-Fewaid, Vëll. 1, f. 29" }
    ]
  },
  {
    surah: "Al-Ikhlas (112)",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    verse: "Thuaj: Allahu është Një.",
    tefsir: [
      { scholar: "Ibn Kethir", text: "Kjo sure është e barabartë me një të tretën e Kur'anit, sepse Kur'ani ka tri tema kryesore: teuhidi, ligjet dhe tregjimet. Sure Al-Ikhlas trajton vetëm teuhidin.", source: "Tefsiru Ibn Kethir, Vëll. 4, f. 569" },
      { scholar: "Es-Sadi", text: "Fjala 'Samad' — Allahu është Ai te Kili drejtohen të gjithë krijesat për nevojat e tyre, ndërkohë Ai nuk ka nevojë për asnjërin.", source: "Taisiru Al-Kerimi Ar-Rahman, f. 934" }
    ]
  },
  {
    surah: "Ya-Sin (36) — Zemra e Kur'anit",
    arabic: "يس وَالْقُرْآنِ الْحَكِيمِ",
    verse: "Ya-Sin. Betohem në Kur'anin e urtë.",
    tefsir: [
      { scholar: "Ibn Kethir", text: "Sure Ya-Sin quhet 'Zemra e Kur'anit' sepse trajton temat qendrore: ringjallja pas vdekjes, njësia e Allahut dhe profetësia. Kush e lexon para vdekjes, Allahu e lehtëson procesin.", source: "Tefsiru Ibn Kethir, Vëll. 3, f. 559" },
      { scholar: "Es-Sadi", text: "Hurufat Mukattaat (germat e lirë si Ya-Sin) janë argument mbi natyrën muxhizë të Kur'anit.", source: "Taisiru Al-Kerimi Ar-Rahman, f. 687" }
    ]
  },
  {
    surah: "Al-Mulk (67) — Mbrojtëse nga dënimi i varrit",
    arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ",
    verse: "I bekuar është Ai Që në Dorën e Tij është Sundimi.",
    tefsir: [
      { scholar: "Ibn Kethir", text: "Sure Al-Mulk quhet edhe 'Al-Waqiyah' (Mbrojtëse) dhe 'Al-Manieh' (Pengimtare). Ajo mbron lexuesin e saj nga dënimi i varrit.", source: "Tefsiru Ibn Kethir, Vëll. 4, f. 387" },
      { scholar: "Es-Sadi", text: "Fjala 'Tebareke' tregon madhërinë, bereqetin dhe lartësinë absolute të Allahut.", source: "Taisiru Al-Kerimi Ar-Rahman, f. 875" }
    ]
  },
  {
    surah: "Al-Kahf (18) — Mbrojtje nga Dexhxhalli",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ",
    verse: "Falënderimi i takon Allahut, i Cili ia zbriti Librin robit të Tij.",
    tefsir: [
      { scholar: "Ibn Kethir", text: "Sure Al-Kahf ka katër tema kryesore: sprova e fesë (Shokët e Shpellës), sprova e pasurisë, sprova e dijes (Musai me Hidrin) dhe sprova e pushtetit (Dhul-Karnejni). Kush e lexon çdo të Premte, mbrohet nga Dexhxhalli.", source: "Tefsiru Ibn Kethir, Vëll. 3, f. 67" },
      { scholar: "Al-Qurtubi", text: "Dhjetë ajetet e para dhe të fundit të Al-Kahfit janë mburojë nga fitnet e kohës së fundit.", source: "Al-Xhami' li Ahkam Al-Quran, Vëll. 10, f. 351" }
    ]
  },
  {
    surah: "Al-Baqarah 2:286 — Allahu nuk ngarkon askënd",
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    verse: "Allahu nuk ngarkon asnjë shpirt përtej mundësive të tij.",
    tefsir: [
      { scholar: "Ibn Kethir", text: "Ky ajet është nga mëshira e madhe e Allahut. Allahu nuk kërkon gjëra të pamundshme. Ajeti vazhdon me duanë: 'Zoti ynë, mos na ndëshko nëse harrojmë ose gabojmë' — Profeti ﷺ tha: 'Allahu tha: Po, e pranova.'", source: "Tefsiru Ibn Kethir, Vëll. 1, f. 765" },
      { scholar: "Es-Sadi", text: "Feja islame është feja e lehtësisë — kur ekziston vështirësia, lejimi (rukhsa) hyn. Kur dikush sëmuret, falet ulur; kur udhëton, shorten namazin.", source: "Taisiru Al-Kerimi Ar-Rahman, f. 116" }
    ]
  },
  {
    surah: "An-Nisa 4:36 — Të drejtat e njeriut",
    arabic: "وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا",
    verse: "Adhurojeni Allahun dhe mos i shoqëroni Atij asgjë.",
    tefsir: [
      { scholar: "Es-Sadi", text: "Ky ajet vendos hierarkinë islame: adhurimi i Allahut pa shirk, mirësia ndaj prindërve, fqinjëve, jetimëve, udhëtarëve. Islami është fe e të drejtave dhe detyrimeve.", source: "Taisiru Al-Kerimi Ar-Rahman, f. 175" }
    ]
  }
];

const scholarColors: Record<string, string> = {
  "Ibn Kethir": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Es-Sadi": "bg-blue-100 text-blue-700 border-blue-200",
  "Al-Qurtubi": "bg-amber-100 text-amber-700 border-amber-200",
  "Ibn El-Qayyim": "bg-violet-100 text-violet-700 border-violet-200",
  "Ibn Tejmijje": "bg-rose-100 text-rose-700 border-rose-200",
};

export default function TefsirDijetaresh() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-foreground">📜 Tefsir — Komentim i Kur'anit</h2>
        <p className="text-sm text-muted-foreground">Komente nga dijetarët më të njohur: Ibn Kethir, Es-Sadi, Al-Qurtubi, Ibn El-Qayyim</p>
        <p className="text-xs text-muted-foreground mt-1">{TEFSIR_DATA.length} sure/ajete me komente</p>
      </div>

      {TEFSIR_DATA.map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div>
                <p className="font-bold text-foreground text-sm">{item.surah}</p>
                <p className="text-xs text-muted-foreground">{item.verse}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{item.tefsir.length} komente</span>
                {openIdx === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-4 pb-4 space-y-3">
                    <p className="text-right text-lg leading-relaxed font-arabic text-foreground" dir="rtl">{item.arabic}</p>
                    {item.tefsir.map((t, j) => (
                      <div key={j} className={`rounded-xl border p-3 ${scholarColors[t.scholar] || "bg-secondary border-border"}`}>
                        <p className="text-xs font-bold mb-1">📖 {t.scholar}</p>
                        <p className="text-sm text-foreground/90">{t.text}</p>
                        <p className="text-xs mt-2 opacity-70 italic">{t.source}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
