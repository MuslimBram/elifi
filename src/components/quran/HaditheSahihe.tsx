import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Volume2, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

interface Hadith {
  arabic: string;
  text: string;
  source: string;
  context: string;
  topic: string;
}

interface Collection {
  name: string;
  gradient: string;
  info: string;
  hadiths: Hadith[];
}

const COLLECTIONS: Collection[] = [
  {
    name: "Sahih Al-Buhari", gradient: "from-blue-500 to-blue-700",
    info: "Koleksioni më i saktë. Imam Buhariu mblodhi 7.275 hadithe nga 600.000 të verifikuara.",
    hadiths: [
      { arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", text: "Veprat vlerësohen sipas qëllimeve.", source: "Buhari 1", context: "Hadithi i parë i Sahih Buharit — çdo vepër pa nijet nuk ka vlerë tek Allahu.", topic: "Nijeti" },
      { arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ", text: "Njerëzit më të mirë ndër ju janë ata që mësojnë Kur'anin dhe ua mësojnë të tjerëve.", source: "Buhari 5027", context: "Mësimi dhe mësimdhënia e Kur'anit ka dy shpërblime.", topic: "Kur'ani" },
      { arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", text: "Asnjëri prej jush nuk beson plotësisht derisa të dojë për vëllanë atë që dëshiron për veten.", source: "Buhari 13", context: "Dashuria vëllazërore islame është shenjë e imanit të plotë.", topic: "Besimi" },
      { arabic: "أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ", text: "Veprat më të dashura tek Allahu janë ato që bëhen vazhdimisht, edhe nëse janë të vogla.", source: "Buhari 6464", context: "Konsistenca në adhurim është më e dashur sesa vepra të mëdha por të rralla.", topic: "Adhurim" },
      { arabic: "أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا", text: "Besimtari me iman më të plotë është ai me moral më të mirë.", source: "Buhari (Edebul-Mufred)", context: "Morali i lartë është shenjë e imanit të fortë.", topic: "Morali" },
      { arabic: "الدِّينُ النَّصِيحَةُ", text: "Feja është sinqeritet (këshillë e mirë).", source: "Buhari 57", context: "Sinqeriteti ndaj Allahut, Librit të Tij dhe muslimanëve është thelbi i Islamit.", topic: "Sinqeriteti" },
      { arabic: "إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا", text: "Ndër njerëzit tuaj më të mirë janë ata me moral më të mirë.", source: "Buhari 3559", context: "Morali është kriter kryesor i vlerësimit tek Allahu.", topic: "Morali" },
      { arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ", text: "Kush beson në Allahun dhe Ditën e Fundit, le të thotë mirë ose le të heshtë.", source: "Buhari 6018", context: "Kontrolli i gjuhës është shenjë e besimit.", topic: "Gjuha" },
    ],
  },
  {
    name: "Sahih Muslim", gradient: "from-emerald-500 to-emerald-700",
    info: "Koleksioni i dytë në saktësi. Imam Muslimi mblodhi 3.033 hadithe unike.",
    hadiths: [
      { arabic: "اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ", text: "Lexoni Kur'anin, sepse ai do të vijë si ndërmjetësues Ditën e Kiametit.", source: "Muslim 804", context: "Kur'ani do të jetë shefaat për lexuesit e tij.", topic: "Kur'ani" },
      { arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ", text: "Kush ndjek rrugë për dije, Allahu ia lehtëson rrugën drejt Xhennetit.", source: "Muslim 2699", context: "Kërkimi i dijes është ibadet.", topic: "Dija" },
      { arabic: "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ", text: "Allahu nuk shikon fytyrat e pasuritë, por shikon zemrat dhe veprat.", source: "Muslim 2564", context: "Vlera tek Allahu matet me takwanë dhe vepra.", topic: "Sinqeriteti" },
      { arabic: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا", text: "Besimtari për besimtarin është si ndërtesa — njëri forcon tjetrin.", source: "Muslim 2585", context: "Solidariteti islam shprehet me metaforën e ndërtesës.", topic: "Vëllazëria" },
      { arabic: "كُلُّ مَوْلُودٍ يُولَدُ عَلَى الْفِطْرَةِ", text: "Çdo i porsalindur lind mbi fitrat (natyrën e pastër).", source: "Muslim 2658", context: "Islami është feja e natyrës njerëzore.", topic: "Fitrati" },
      { arabic: "بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ", text: "Jam dërguar për të plotësuar virtytet e moralit.", source: "Beyhaki — Sahih", context: "Misioni qenësor i Profetit ﷺ.", topic: "Morali" },
    ],
  },
  {
    name: "Sunen At-Tirmidhi", gradient: "from-amber-500 to-amber-700",
    info: "Imam Tirmidhiu — koleksion me klasifikime të shkallëve të hadithit.",
    hadiths: [
      { arabic: "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ وَالْحَسَنَةُ بِعَشْرِ أَمْثَالِهَا", text: "Kush lexon një shkronjë nga Kur'ani merr një të mirë, dhe e mira shumëfishohet dhjetë herë.", source: "Tirmidhi 2910", context: "Elifi, Lami, Mimi — secila numërohet si shkronjë me 10 sevape.", topic: "Sevapet" },
      { arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا", text: "Ki frikë Allahun kudo, dhe pas të keqes bëj mirësi — ajo e fshin atë.", source: "Tirmidhi 1987", context: "E mira pas të keqes e fshin gjynahun.", topic: "Pendimi" },
      { arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ", text: "Buzëqeshja para vëllait tënd është sadaka.", source: "Tirmidhi 1956", context: "Sadakaja nuk kufizohet vetëm në para.", topic: "Sadaka" },
      { arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ", text: "Dynjaja është burguna e besimtarit dhe xhenneti i jobesimtarit.", source: "Tirmidhi 2324", context: "Besimtari frenon nefsit, ndërsa jobesimtari nuk ka kufizime.", topic: "Dynjaja" },
    ],
  },
];

function speak(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA"; u.rate = 0.6;
  window.speechSynthesis.speak(u);
}

export default function HaditheSahihe() {
  const [expandedCollection, setExpandedCollection] = useState(0);
  const [expandedHadith, setExpandedHadith] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">📚 Hadithe të Sakta</h2>
        <p className="text-muted-foreground text-sm">Koleksione nga Buhari, Muslimi dhe Tirmidhiu me shpjegim në shqip</p>
      </div>

      {COLLECTIONS.map((col, ci) => (
        <div key={ci} className="glass-card rounded-2xl overflow-hidden">
          <button onClick={() => setExpandedCollection(expandedCollection === ci ? -1 : ci)}
            className={`w-full bg-gradient-to-r ${col.gradient} text-white p-5 flex items-center justify-between`}>
            <div className="text-left">
              <h3 className="font-bold text-lg">{col.name}</h3>
              <p className="text-xs text-white/70 mt-1">{col.info}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{col.hadiths.length} hadithe</span>
              {expandedCollection === ci ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          <AnimatePresence>
            {expandedCollection === ci && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <div className="p-4 space-y-3">
                  {col.hadiths.map((h, hi) => (
                    <div key={hi} className="bg-secondary/30 rounded-xl p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{h.topic}</span>
                        <button onClick={() => speak(h.arabic)} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xl text-foreground text-right leading-loose mb-3" dir="rtl">{h.arabic}</p>
                      <p className="text-sm font-medium text-foreground mb-1">"{h.text}"</p>
                      <p className="text-xs text-primary font-semibold mb-2">— {h.source}</p>

                      <button onClick={() => setExpandedHadith(expandedHadith === ci * 100 + hi ? null : ci * 100 + hi)}
                        className="text-xs text-muted-foreground hover:text-primary font-medium flex items-center gap-1">
                        {expandedHadith === ci * 100 + hi ? <><ChevronUp className="w-3 h-3" /> Fshih shpjegimin</> : <><ChevronDown className="w-3 h-3" /> Shpjegimi</>}
                      </button>

                      {expandedHadith === ci * 100 + hi && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground mt-2 bg-secondary/50 rounded-lg p-3">
                          {h.context}
                        </motion.p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
