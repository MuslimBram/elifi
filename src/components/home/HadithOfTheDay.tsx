import React, { useState, useEffect } from "react";
import { Volume2, BookOpen, Sparkles } from "lucide-react";

interface Hadith {
  arabic: string;
  translation: string;
  source: string;
  narrator: string;
  topic: string;
}

const HADITHS: Hadith[] = [
  {
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    translation: "Veprat vlerësohen sipas qëllimeve, dhe çdo njeri do të ketë atë që ka për qëllim.",
    source: "Buhariu 1, Muslimi 1907",
    narrator: "Omer ibn Hattabi (r.a.)",
    topic: "Nijeti",
  },
  {
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    translation: "Kush beson në Allahun dhe Ditën e Fundit, le të flasë mirë ose le të heshtë.",
    source: "Buhariu 6018, Muslimi 47",
    narrator: "Ebu Hurejra (r.a.)",
    topic: "Fjala e mirë",
  },
  {
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translation: "Asnjëri prej jush nuk beson me të vërtetë derisa të dëshirojë për vëllanë e tij atë që dëshiron për vetveten.",
    source: "Buhariu 13, Muslimi 45",
    narrator: "Enes ibn Maliku (r.a.)",
    topic: "Vëllazëria",
  },
  {
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    translation: "Musliman i vërtetë është ai prej gjuhës dhe dorës së të cilit janë të sigurtë muslimanët.",
    source: "Buhariu 10, Muslimi 40",
    narrator: "Abdullah ibn Amri (r.a.)",
    topic: "Karakteri",
  },
  {
    arabic: "الدِّينُ النَّصِيحَةُ",
    translation: "Feja është këshillë e sinqertë (për Allahun, Librin e Tij, të Dërguarin e Tij, prijësit dhe muslimanët).",
    source: "Muslimi 55",
    narrator: "Temim Ed-Dari (r.a.)",
    topic: "Sinqeriteti",
  },
  {
    arabic: "مَنْ حَسُنَ إِسْلَامُ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ",
    translation: "Pjesë e mirësisë së Islamit të një njeriu është braktisja e asaj që nuk e ka për punë.",
    source: "Tirmidhiu 2317 (sahih)",
    narrator: "Ebu Hurejra (r.a.)",
    topic: "Vetëdisiplina",
  },
  {
    arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
    translation: "Buzëqeshja jote ndaj vëllait tënd është sadaka.",
    source: "Tirmidhiu 1956 (sahih)",
    narrator: "Ebu Dheri (r.a.)",
    topic: "Bamirësia",
  },
  {
    arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعْ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
    translation: "Frikësohu Allahut kudo që të jesh; pas së keqes bëj një vepër të mirë që ta fshijë; dhe sillu me njerëzit me moral të mirë.",
    source: "Tirmidhiu 1987 (hasen sahih)",
    narrator: "Ebu Dheri dhe Muadh ibn Xhebeli (r.a.)",
    topic: "Takvallëku",
  },
  {
    arabic: "مَنْ لَا يَرْحَمُ النَّاسَ لَا يَرْحَمُهُ اللَّهُ",
    translation: "Kush nuk i mëshiron njerëzit, nuk e mëshiron Allahu.",
    source: "Buhariu 7376, Muslimi 2319",
    narrator: "Xherir ibn Abdullahu (r.a.)",
    topic: "Mëshira",
  },
  {
    arabic: "لَا تَغْضَبْ",
    translation: "Mos u zemëro!",
    source: "Buhariu 6116",
    narrator: "Ebu Hurejra (r.a.)",
    topic: "Vetëkontrolli",
  },
  {
    arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ",
    translation: "Pastërtia është gjysma e besimit.",
    source: "Muslimi 223",
    narrator: "Ebu Maliku El-Eshariu (r.a.)",
    topic: "Pastërtia",
  },
  {
    arabic: "مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ",
    translation: "Kush i fal dy namazet e freskëta (Sabahu dhe Ikindia) hyn në Xhenet.",
    source: "Buhariu 574, Muslimi 635",
    narrator: "Ebu Musa El-Eshariu (r.a.)",
    topic: "Namazi",
  },
  {
    arabic: "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ، وَالْحَسَنَةُ بِعَشْرِ أَمْثَالِهَا",
    translation: "Kush lexon një shkronjë nga Libri i Allahut, ka për të një të mirë, dhe e mira shumëfishohet dhjetëfish.",
    source: "Tirmidhiu 2910 (sahih)",
    narrator: "Abdullah ibn Mes'udi (r.a.)",
    topic: "Kur'ani",
  },
  {
    arabic: "مَا مَلَأَ آدَمِيٌّ وِعَاءً شَرًّا مِنْ بَطْنٍ",
    translation: "Njeriu nuk ka mbushur enë më të keqe se barkun e tij.",
    source: "Tirmidhiu 2380 (hasen sahih)",
    narrator: "Mikdam ibn Ma'di Kerib (r.a.)",
    topic: "Moderimi",
  },
  {
    arabic: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
    translation: "Fjala e mirë është sadaka.",
    source: "Buhariu 2989, Muslimi 1009",
    narrator: "Ebu Hurejra (r.a.)",
    topic: "Fjala",
  },
  {
    arabic: "خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ",
    translation: "Më i miri prej jush është ai që sillet më mirë me familjen e tij.",
    source: "Tirmidhiu 3895 (sahih)",
    narrator: "Aisha (r.a.)",
    topic: "Familja",
  },
  {
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    translation: "Kush ndjek një rrugë në kërkim të dijes, Allahu ia lehtëson atij rrugën për në Xhenet.",
    source: "Muslimi 2699",
    narrator: "Ebu Hurejra (r.a.)",
    topic: "Dija",
  },
  {
    arabic: "مَنْ كَظَمَ غَيْظًا وَهُوَ قَادِرٌ عَلَى أَنْ يُنْفِذَهُ دَعَاهُ اللَّهُ يَوْمَ الْقِيَامَةِ",
    translation: "Kush e përmban zemërimin e tij, edhe pse mundet ta shfaqë, Allahu do ta thërrasë në Ditën e Kiametit (përpara krijesave).",
    source: "Tirmidhiu 2021 (hasen)",
    narrator: "Muadh ibn Enesi (r.a.)",
    topic: "Durimi",
  },
  {
    arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
    translation: "Vërtet Allahu është i Bukur dhe e do të bukurën.",
    source: "Muslimi 91",
    narrator: "Abdullah ibn Mes'udi (r.a.)",
    topic: "Bukuria",
  },
  {
    arabic: "مَنْ غَشَّنَا فَلَيْسَ مِنَّا",
    translation: "Kush na mashtron nuk është prej nesh.",
    source: "Muslimi 102",
    narrator: "Ebu Hurejra (r.a.)",
    topic: "Sinqeriteti",
  },
];

function getHadithOfTheDay(): Hadith {
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return HADITHS[day % HADITHS.length];
}

export default function HadithOfTheDay() {
  const [hadith, setHadith] = useState<Hadith>(getHadithOfTheDay());
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setHadith(getHadithOfTheDay());
  }, []);

  const speak = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(hadith.arabic);
    u.lang = "ar-SA";
    u.rate = 0.7;
    u.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  const newRandom = () => {
    const idx = Math.floor(Math.random() * HADITHS.length);
    setHadith(HADITHS[idx]);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-emerald-500 uppercase tracking-widest font-semibold flex items-center gap-1">
            <BookOpen className="w-3 h-3" /> Hadithi i Ditës
          </p>
          <p className="text-lg font-bold text-emerald-900 dark:text-emerald-300">📜 {hadith.topic}</p>
        </div>
        <button
          onClick={newRandom}
          className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 text-emerald-700 dark:text-emerald-300 transition-colors"
          title="Hadith tjetër"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xl md:text-2xl text-foreground font-arabic text-right leading-loose mb-3" dir="rtl">
        {hadith.arabic}
      </p>

      <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3 mb-3">
        <p className="text-sm text-foreground/90 italic leading-relaxed">"{hadith.translation}"</p>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="text-muted-foreground">
          <p className="font-semibold text-emerald-700 dark:text-emerald-400">{hadith.narrator}</p>
          <p className="text-[10px]">📚 {hadith.source}</p>
        </div>
        <button
          onClick={speak}
          disabled={speaking}
          className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 transition-colors disabled:opacity-50"
        >
          <Volume2 className={`w-4 h-4 ${speaking ? "animate-pulse" : ""}`} />
        </button>
      </div>
    </div>
  );
}
