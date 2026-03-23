import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Surah {
  number: number;
  name: string;
  arabicName: string;
  meaning: string;
  verses: number;
  type: "Mekase" | "Medinase";
  audioUrl: string;
  ayahs: { number: number; arabic: string; translation: string }[];
}

const SURAHS: Surah[] = [
  {
    number: 1, name: "El-Fatiha", arabicName: "الفاتحة", meaning: "Hapja", verses: 7, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/1.mp3",
    ayahs: [
      { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "Me emrin e Allahut, të Gjithëmëshirshmit, Mëshirëplotit" },
      { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "Falënderimi i takon Allahut, Zotit të botëve" },
      { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "Të Gjithëmëshirshmit, Mëshirëplotit" },
      { number: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", translation: "Sunduesit të Ditës së Gjykimit" },
      { number: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "Vetëm Ty të adhurojmë dhe vetëm prej Teje ndihmë kërkojmë" },
      { number: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Udhëzona në rrugën e drejtë" },
      { number: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "Në rrugën e atyre që u ke dhuruar mirësi, jo të atyre që kanë merituar zemërimin, as të atyre që janë të humbur" },
    ],
  },
  {
    number: 112, name: "El-Ihlas", arabicName: "الإخلاص", meaning: "Sinqeriteti", verses: 4, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/112.mp3",
    ayahs: [
      { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Thuaj: Ai është Allahu, Një dhe i Vetëm" },
      { number: 2, arabic: "اللَّهُ الصَّمَدُ", translation: "Allahu është Ai që çdo krijesë i drejtohet" },
      { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "Ai as nuk lind, as nuk është i lindur" },
      { number: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", translation: "Dhe askush nuk është i barabartë me Të" },
    ],
  },
  {
    number: 113, name: "El-Felek", arabicName: "الفلق", meaning: "Agimi", verses: 5, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/113.mp3",
    ayahs: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", translation: "Thuaj: Kërkoj mbrojtje te Zoti i agimit" },
      { number: 2, arabic: "مِن شَرِّ مَا خَلَقَ", translation: "Nga e keqja e çdo gjëje që Ai ka krijuar" },
      { number: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", translation: "Dhe nga e keqja e natës kur shtrihet" },
      { number: 4, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", translation: "Dhe nga e keqja e fryrëseve në nyje" },
      { number: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", translation: "Dhe nga e keqja e smirëziut kur ka smirë" },
    ],
  },
  {
    number: 114, name: "En-Nas", arabicName: "الناس", meaning: "Njerëzit", verses: 6, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/114.mp3",
    ayahs: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", translation: "Thuaj: Kërkoj mbrojtje te Zoti i njerëzve" },
      { number: 2, arabic: "مَلِكِ النَّاسِ", translation: "Sunduesit të njerëzve" },
      { number: 3, arabic: "إِلَٰهِ النَّاسِ", translation: "Zotit të njerëzve" },
      { number: 4, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", translation: "Nga e keqja e cytësit që fshihet" },
      { number: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", translation: "I cili bën cytje në gjoksat e njerëzve" },
      { number: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", translation: "Qoftë ai (cytës) nga xhinët apo nga njerëzit" },
    ],
  },
  {
    number: 110, name: "En-Nasr", arabicName: "النصر", meaning: "Ndihma", verses: 3, type: "Medinase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/110.mp3",
    ayahs: [
      { number: 1, arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", translation: "Kur të vijë ndihma e Allahut dhe çlirimi" },
      { number: 2, arabic: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", translation: "Dhe i sheh njerëzit duke hyrë grupe-grupe në fenë e Allahut" },
      { number: 3, arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", translation: "Atëherë madhëro Zotin tënd duke e lavdëruar dhe kërko falje nga Ai. Ai është Pranues i pendimit" },
    ],
  },
];

export default function SuretView() {
  const [expandedSurah, setExpandedSurah] = useState<number | null>(1);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [audioRef] = useState<HTMLAudioElement>(new Audio());

  const togglePlay = (surahNum: number, url: string) => {
    if (playingAudio === surahNum) {
      audioRef.pause();
      setPlayingAudio(null);
    } else {
      audioRef.src = url;
      audioRef.play();
      setPlayingAudio(surahNum);
      audioRef.onended = () => setPlayingAudio(null);
    }
  };

  return (
    <div className="space-y-4">
      {SURAHS.map((surah) => (
        <motion.div
          key={surah.number}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
            onClick={() => setExpandedSurah(expandedSurah === surah.number ? null : surah.number)}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {surah.number}
              </div>
              <div>
                <h3 className="font-bold text-foreground">{surah.name}</h3>
                <p className="text-xs text-muted-foreground">{surah.meaning} • {surah.verses} ajete • {surah.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-arabic text-primary" dir="rtl">{surah.arabicName}</span>
              <button
                onClick={(e) => { e.stopPropagation(); togglePlay(surah.number, surah.audioUrl); }}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {playingAudio === surah.number ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              {expandedSurah === surah.number ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </div>

          {/* Ayahs */}
          <AnimatePresence>
            {expandedSurah === surah.number && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-border"
              >
                <div className="p-4 space-y-4">
                  {surah.ayahs.map((ayah) => (
                    <div key={ayah.number} className="flex gap-4 p-3 rounded-xl bg-secondary/20">
                      <span className="w-7 h-7 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                        {ayah.number}
                      </span>
                      <div className="flex-1 space-y-2">
                        <p className="text-right text-xl leading-loose text-foreground font-arabic" dir="rtl">
                          {ayah.arabic}
                        </p>
                        <p className="text-sm text-muted-foreground">{ayah.translation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
