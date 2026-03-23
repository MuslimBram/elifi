import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Volume2 } from "lucide-react";

const CHAPTERS = [
  {
    chapter: "Kapitulli 1 — Sinqeriteti & Nijeti",
    color: "emerald",
    hadiths: [
      { arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", text: "Veprat vlerësohen sipas qëllimeve, dhe çdo njeriu i takon ajo që ka synuar.", source: "Buhari & Muslim — Riyadu Es-Salihin 1", explanation: "Ky është hadithi themelor i Islamit. Nëse dikush bën namaz për t'u dukur para njerëzve, nuk ka shpërblim. Nijeti (qëllimi) është zemra e çdo vepre." },
      { arabic: "مَنْ كَانَ آخِرُ كَلَامِهِ لَا إِلَهَ إِلَّا اللَّهُ دَخَلَ الْجَنَّةَ", text: "Kush fjalën e fundit të tij e ka 'La ilahe illallah', hyn në Xhennet.", source: "Ebu Davud — Riyadu Es-Salihin 18", explanation: "Fjalët e fundit të njeriut para vdekjes janë pasqyra e gjendjes shpirtërore." }
    ]
  },
  {
    chapter: "Kapitulli 2 — Pendimi & Kthimi tek Allahu",
    color: "blue",
    hadiths: [
      { arabic: "التَّائِبُ مِنَ الذَّنْبِ كَمَنْ لَا ذَنْبَ لَهُ", text: "Ai që pendohet nga mëkati është si ai që nuk ka bërë mëkat.", source: "Ibn Maxheh — Riyadu Es-Salihin 16", explanation: "Pendimi i sinqertë (Tewbe Nasuh) fshin plotësisht mëkatin." },
      { arabic: "إِنَّ اللَّهَ يَبْسُطُ يَدَهُ بِاللَّيْلِ لِيَتُوبَ مُسِيءُ النَّهَارِ", text: "Allahu shtrin Dorën e Tij natën për të pranuar pendimin e atij që ka mëkatuar ditën.", source: "Muslim — Riyadu Es-Salihin 19", explanation: "Dera e pendimit është gjithnjë e hapur derisa dielli të lindë nga perëndimi." }
    ]
  },
  {
    chapter: "Kapitulli 3 — Durimi (Sabri)",
    color: "amber",
    hadiths: [
      { arabic: "مَا أُعْطِيَ أَحَدٌ عَطَاءً خَيْرًا وَأَوْسَعَ مِنَ الصَّبْرِ", text: "Askujt nuk i është dhënë një dhunti më e mirë dhe më e gjerë se durimi.", source: "Buhari & Muslim — Riyadu Es-Salihin 26", explanation: "Durimi (sabri) ka tre lloje: durim ndaj adhurimeve, durim ndaj sprovave dhe durim ndaj ndalimeve." },
      { arabic: "عَجَبًا لِأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ", text: "Sa e mrekullueshme është çështja e besimtarit — çdo gjë është e mirë për të!", source: "Muslim — Riyadu Es-Salihin 27", explanation: "Nëse e godet gëzimi, falënderon dhe kjo është mirë. Nëse e godet sprova, duron dhe kjo është mirë." }
    ]
  },
  {
    chapter: "Kapitulli 4 — E Drejta e Prindërve",
    color: "rose",
    hadiths: [
      { arabic: "رِضَا اللَّهِ فِي رِضَا الْوَالِدَيْنِ وَسَخَطُ اللَّهِ فِي سَخَطِ الْوَالِدَيْنِ", text: "Kënaqësia e Allahut është në kënaqësinë e prindërve, dhe zemërimi i Allahut është në zemërimin e prindërve.", source: "Tirmidhi — Riyadu Es-Salihin 48", explanation: "Pas teuhidit dhe namazit, respekti ndaj prindërve është farzul-ajni." }
    ]
  },
  {
    chapter: "Kapitulli 5 — Vlera e Dijes",
    color: "indigo",
    hadiths: [
      { arabic: "إِذَا مَاتَ ابْنُ آدَمَ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ", text: "Kur vdes biri i Ademit, veprat i ndërpriten, me përjashtim të tre gjërave: sadakaja xharije, dija nga e cila përfitohet, ose fëmija i devotshëm që lutet për të.", source: "Muslim — Riyadu Es-Salihin 90", explanation: "Tre mënyrat e shpërblimit pas vdekjes: sadakaja xharije, dija e dobishme, lutja e fëmijës." },
      { arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ", text: "Kërkimi i dijes është detyrim (farz) për çdo musliman.", source: "Ibn Maxheh — Riyadu Es-Salihin 95", explanation: "Dija islame nuk është opsionale — ajo është detyrim." }
    ]
  },
  {
    chapter: "Kapitulli 6 — Bamirësia & Sadakaja",
    color: "emerald",
    hadiths: [
      { arabic: "الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ", text: "Sadakaja e shuajnë mëkatin ashtu si uji shuajnë zjarrin.", source: "Tirmidhi — Riyadu Es-Salihin 121", explanation: "Sadakaja ka tri fuqi: fshin mëkatet, shëron sëmundjet, largon balën." }
    ]
  },
  {
    chapter: "Kapitulli 7 — Lutja (Dua)",
    color: "amber",
    hadiths: [
      { arabic: "الدُّعَاءُ هُوَ الْعِبَادَةُ", text: "Dua është adhurim.", source: "Tirmidhi — Riyadu Es-Salihin 145", explanation: "Dua nuk është thjesht kërkesë — ajo është thelbi i adhurimit." },
      { arabic: "أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ", text: "Robi është më afër Zotit të tij kur është në sexhde.", source: "Muslim — Riyadu Es-Salihin 152", explanation: "Sexhdeja është kulmi i adhurimit — koka preket tokën. Shfrytëzo momentin e sexhdes për dua." }
    ]
  },
  {
    chapter: "Kapitulli 8 — Vëllazëria & Dashuria për Allahun",
    color: "blue",
    hadiths: [
      { arabic: "لَا تَدْخُلُونَ الْجَنَّةَ حَتَّى تُؤْمِنُوا وَلَا تُؤْمِنُوا حَتَّى تَحَابُّوا", text: "Nuk hyni në Xhennet derisa të besoni, dhe nuk besoni derisa të duheni.", source: "Muslim — Riyadu Es-Salihin 183", explanation: "Dashuria vëllazërore për hir të Allahut është kusht i imanit të plotë." }
    ]
  },
  {
    chapter: "Kapitulli 9 — Dhikri & Përmendje e Allahut",
    color: "violet",
    hadiths: [
      { arabic: "أَحَبُّ الْكَلَامِ إِلَى اللَّهِ أَرْبَعٌ: سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ", text: "Fjalët më të dashura tek Allahu janë katër: SubhanAllah, Elhamdulillah, La ilahe illallah dhe Allahu Ekber.", source: "Muslim — Riyadu Es-Salihin 244", explanation: "Dhikri (përmendja e Allahut) është forma më e lehtë e adhurimit me shpërblimin më të madh." }
    ]
  },
  {
    chapter: "Kapitulli 10 — Xheneti & Shpresa",
    color: "emerald",
    hadiths: [
      { arabic: "فِي الْجَنَّةِ مَا لَا عَيْنٌ رَأَتْ وَلَا أُذُنٌ سَمِعَتْ وَلَا خَطَرَ عَلَى قَلْبِ بَشَرٍ", text: "Në Xhennet ka gjëra që asnjë sy nuk i ka parë, asnjë vesh nuk i ka dëgjuar, dhe nuk kanë kaluar nëpër zemrën e asnjë njeriu.", source: "Buhari & Muslim — Riyadu Es-Salihin 425", explanation: "Xheneti tejkalon çdo imagjinatë njerëzore. Shpresa në mëshirën e Allahut është motori i besimtarit." }
    ]
  }
];

const colorMap: Record<string, string> = {
  emerald: "border-emerald-200 bg-emerald-50/50",
  blue: "border-blue-200 bg-blue-50/50",
  amber: "border-amber-200 bg-amber-50/50",
  rose: "border-rose-200 bg-rose-50/50",
  indigo: "border-indigo-200 bg-indigo-50/50",
  violet: "border-violet-200 bg-violet-50/50",
};

const speakArabic = (text: string) => {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.8;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

export default function RiyaduSalihin() {
  const [openChapter, setOpenChapter] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-foreground">📗 Rijadu Es-Salihin</h2>
        <p className="text-sm text-muted-foreground">Kopshti i të Devotshmëve — Imam En-Nevevi</p>
        <p className="text-xs text-muted-foreground mt-1">{CHAPTERS.length} kapituj • {CHAPTERS.reduce((s, c) => s + c.hadiths.length, 0)} hadithe</p>
      </div>

      {CHAPTERS.map((ch, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
          <div className={`rounded-2xl border ${colorMap[ch.color] || "border-border bg-card"} overflow-hidden`}>
            <button
              onClick={() => setOpenChapter(openChapter === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="font-bold text-foreground text-sm">{ch.chapter}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{ch.hadiths.length} hadithe</span>
                {openChapter === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>
            <AnimatePresence>
              {openChapter === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-4 pb-4 space-y-4">
                    {ch.hadiths.map((h, j) => (
                      <div key={j} className="bg-card rounded-xl border border-border p-4 space-y-3">
                        <div className="flex items-start gap-2">
                          <p className="text-right text-lg leading-relaxed font-arabic text-foreground flex-1" dir="rtl">{h.arabic}</p>
                          <button onClick={() => speakArabic(h.arabic)} className="p-1.5 rounded-lg bg-secondary hover:bg-primary/10 transition-colors shrink-0">
                            <Volume2 className="w-4 h-4 text-primary" />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-foreground">{h.text}</p>
                        <p className="text-xs text-muted-foreground italic">{h.source}</p>
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground"><strong>📝 Koment:</strong> {h.explanation}</p>
                        </div>
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
