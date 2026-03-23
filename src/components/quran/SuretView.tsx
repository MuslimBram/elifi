import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, BookOpen, ChevronDown, ChevronUp, Volume2, Search } from "lucide-react";

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
    number: 36, name: "Jasin", arabicName: "يس", meaning: "Ja Sin (Zemra e Kur'anit)", verses: 83, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/36.mp3",
    ayahs: [
      { number: 1, arabic: "يس", translation: "Ja Sin." },
      { number: 2, arabic: "وَالْقُرْآنِ الْحَكِيمِ", translation: "Pasha Kur'anin e urtë!" },
      { number: 3, arabic: "إِنَّكَ لَمِنَ الْمُرْسَلِينَ", translation: "Ti me të vërtetë je prej të dërguarve" },
      { number: 4, arabic: "عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ", translation: "Mbi rrugë të drejtë" },
      { number: 5, arabic: "تَنزِيلَ الْعَزِيزِ الرَّحِيمِ", translation: "Shpallje e të Plotfuqishmit, Mëshirëplotit" },
      { number: 6, arabic: "لِتُنذِرَ قَوْمًا مَّا أُنذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ", translation: "Që të paralajmërosh një popull, etërit e të cilëve nuk u paralajmëruan, andaj ata janë të shkujdesur" },
      { number: 7, arabic: "لَقَدْ حَقَّ الْقَوْلُ عَلَىٰ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ", translation: "Me të vërtetë fjala (dënimi) u bë e merituar për shumicën e tyre, andaj ata nuk besojnë" },
      { number: 8, arabic: "إِنَّا جَعَلْنَا فِي أَعْنَاقِهِمْ أَغْلَالًا فَهِيَ إِلَى الْأَذْقَانِ فَهُم مُّقْمَحُونَ", translation: "Ne u kemi vënë pranga në qafat e tyre deri në mjekra, kështu që kokat i kanë ngritur lart" },
      { number: 9, arabic: "وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ", translation: "Dhe kemi vënë pengesë para tyre dhe pengesë mbrapa tyre, i kemi mbuluar dhe ata nuk shohin" },
      { number: 10, arabic: "وَسَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ", translation: "Për ta është njëlloj, i paralajmërove apo nuk i paralajmërove, ata nuk besojnë" },
    ],
  },
  {
    number: 55, name: "Er-Rahman", arabicName: "الرحمن", meaning: "I Gjithëmëshirshmi", verses: 78, type: "Medinase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/55.mp3",
    ayahs: [
      { number: 1, arabic: "الرَّحْمَٰنُ", translation: "I Gjithëmëshirshmi" },
      { number: 2, arabic: "عَلَّمَ الْقُرْآنَ", translation: "E mësoi Kur'anin" },
      { number: 3, arabic: "خَلَقَ الْإِنسَانَ", translation: "E krijoi njeriun" },
      { number: 4, arabic: "عَلَّمَهُ الْبَيَانَ", translation: "I mësoi atij të shprehurit" },
      { number: 5, arabic: "الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ", translation: "Dielli dhe hëna ecin me llogaritje të caktuar" },
      { number: 6, arabic: "وَالنَّجْمُ وَالشَّجَرُ يَسْجُدَانِ", translation: "Bimët e ulëta dhe pemët i bëjnë sexhde" },
      { number: 7, arabic: "وَالسَّمَاءَ رَفَعَهَا وَوَضَعَ الْمِيزَانَ", translation: "Dhe qiellin e ngriti lart dhe vendosi peshorën" },
      { number: 13, arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", translation: "Cilën nga mirësitë e Zotit tuaj po e mohoni?" },
    ],
  },
  {
    number: 67, name: "El-Mulk", arabicName: "الملك", meaning: "Sundimi", verses: 30, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/67.mp3",
    ayahs: [
      { number: 1, arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", translation: "I Lartësuar është Ai, në dorën e të Cilit është sundimi dhe Ai ka fuqi mbi çdo gjë" },
      { number: 2, arabic: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ", translation: "Ai i cili krijoi vdekjen dhe jetën për t'ju provuar se cili prej jush është më i mirë në vepra. Ai është i Plotfuqishmi, Falësi" },
      { number: 3, arabic: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ", translation: "Ai i cili krijoi shtatë qiej njërin mbi tjetrin. Ti nuk sheh ndonjë parregullsi në krijimin e të Gjithëmëshirshmit" },
      { number: 4, arabic: "فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ", translation: "Shiko përsëri, a sheh ndonjë të çarë?" },
      { number: 5, arabic: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ", translation: "Pastaj shiko edhe dy herë, shikimi do të kthehet tek ty i lodhur e i dështuar" },
    ],
  },
  {
    number: 56, name: "El-Vaki'a", arabicName: "الواقعة", meaning: "Ngjarja", verses: 96, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/56.mp3",
    ayahs: [
      { number: 1, arabic: "إِذَا وَقَعَتِ الْوَاقِعَةُ", translation: "Kur të ndodhë Ngjarja (Kiameti)" },
      { number: 2, arabic: "لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ", translation: "Nuk ka kush ta mohojë ndodhjen e saj" },
      { number: 3, arabic: "خَافِضَةٌ رَّافِعَةٌ", translation: "Ajo do të ulë (disa) dhe do të lartësojë (disa)" },
      { number: 4, arabic: "إِذَا رُجَّتِ الْأَرْضُ رَجًّا", translation: "Kur toka të dridhet me tërmet të fortë" },
      { number: 5, arabic: "وَبُسَّتِ الْجِبَالُ بَسًّا", translation: "Dhe malet të thërrmohen copë-copë" },
      { number: 6, arabic: "فَكَانَتْ هَبَاءً مُّنبَثًّا", translation: "Dhe bëhen pluhur i shpërndarë" },
    ],
  },
  {
    number: 78, name: "En-Nebe'", arabicName: "النبأ", meaning: "Lajmi i Madh", verses: 40, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/78.mp3",
    ayahs: [
      { number: 1, arabic: "عَمَّ يَتَسَاءَلُونَ", translation: "Për çfarë po pyesin njëri-tjetrin?" },
      { number: 2, arabic: "عَنِ النَّبَإِ الْعَظِيمِ", translation: "Për Lajmin e Madh" },
      { number: 3, arabic: "الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ", translation: "Për të cilin ata nuk pajtohen" },
      { number: 4, arabic: "كَلَّا سَيَعْلَمُونَ", translation: "Jo, ata do ta dinë!" },
      { number: 5, arabic: "ثُمَّ كَلَّا سَيَعْلَمُونَ", translation: "Pastaj jo, ata do ta dinë!" },
    ],
  },
  {
    number: 108, name: "El-Keuther", arabicName: "الكوثر", meaning: "Bollëku", verses: 3, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/108.mp3",
    ayahs: [
      { number: 1, arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", translation: "Ne të kemi dhënë ty Keutherin (bollëkun)" },
      { number: 2, arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", translation: "Andaj, falu për Zotin tënd dhe ther kurban" },
      { number: 3, arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", translation: "Me të vërtetë, urrejtësi yt është ai i shkëputuri (pa pasardhës)" },
    ],
  },
  {
    number: 109, name: "El-Kafirun", arabicName: "الكافرون", meaning: "Mohuesit", verses: 6, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/109.mp3",
    ayahs: [
      { number: 1, arabic: "قُلْ يَا أَيُّهَا الْكَافِرُونَ", translation: "Thuaj: O ju mohues!" },
      { number: 2, arabic: "لَا أَعْبُدُ مَا تَعْبُدُونَ", translation: "Unë nuk adhuroj atë që ju adhuroni" },
      { number: 3, arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", translation: "As ju nuk jeni adhurues të Atij që unë adhuroj" },
      { number: 4, arabic: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ", translation: "Dhe unë nuk do të adhuroj atë që ju keni adhuruar" },
      { number: 5, arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", translation: "As ju nuk do të adhuroni Atë që unë adhuroj" },
      { number: 6, arabic: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", translation: "Ju keni fenë tuaj, e unë kam fenë time" },
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
  {
    number: 111, name: "El-Mesed", arabicName: "المسد", meaning: "Litari i Palmës", verses: 5, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/111.mp3",
    ayahs: [
      { number: 1, arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", translation: "U shkatërruan duart e Ebu Lehebit dhe ai vetë u shkatërrua" },
      { number: 2, arabic: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", translation: "Nuk i bëri dobi pasuria e tij dhe as ajo që fitoi" },
      { number: 3, arabic: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", translation: "Ai do të digjet në zjarr me flakë" },
      { number: 4, arabic: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", translation: "Edhe gruaja e tij, bartëse e druve" },
      { number: 5, arabic: "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ", translation: "Në qafën e saj do ketë litar nga fibrat e palmës" },
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
    number: 2, name: "El-Bekare (Ajetu-l-Kursi)", arabicName: "البقرة ٢٥٥", meaning: "Ajeti i Fronit", verses: 1, type: "Medinase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/2.mp3",
    ayahs: [
      { number: 255, arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", translation: "Allahu! Nuk ka zot tjetër përveç Tij, i Gjalli, Mbikëqyrësi i përhershëm. Atë nuk e kap as dremitja as gjumi. Atij i përket çdo gjë në qiej dhe në tokë. Kush mund të ndërmjetësojë tek Ai pa lejen e Tij? Ai di çdo gjë para tyre dhe pas tyre. Ata nuk mund të përfshijnë gjë nga dituria e Tij, përveç asaj që Ai dëshiron. Froni i Tij përfshin qiejt dhe tokën, dhe ruajtja e tyre nuk e rëndon Atë. Ai është i Lartësuari, Madhështori." },
    ],
  },
  {
    number: 103, name: "El-Asr", arabicName: "العصر", meaning: "Koha", verses: 3, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/103.mp3",
    ayahs: [
      { number: 1, arabic: "وَالْعَصْرِ", translation: "Pasha kohën!" },
      { number: 2, arabic: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", translation: "Me të vërtetë, njeriu është në humbje" },
      { number: 3, arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", translation: "Përveç atyre që besuan, bënë vepra të mira, porositën njëri-tjetrin me të vërtetën dhe porositën njëri-tjetrin me durim" },
    ],
  },
  {
    number: 105, name: "El-Fil", arabicName: "الفيل", meaning: "Elefanti", verses: 5, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/105.mp3",
    ayahs: [
      { number: 1, arabic: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", translation: "A nuk e pe se çfarë bëri Zoti yt me pronarët e elefantit?" },
      { number: 2, arabic: "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", translation: "A nuk e bëri dredhimin e tyre të dështuar?" },
      { number: 3, arabic: "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ", translation: "Dhe dërgoi kundër tyre tufëza zogjsh" },
      { number: 4, arabic: "تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ", translation: "Që i gjuanin me gurë prej baltës së pjekur" },
      { number: 5, arabic: "فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ", translation: "Dhe i bëri si kashta e përtypur" },
    ],
  },
  {
    number: 106, name: "Kurejsh", arabicName: "قريش", meaning: "Kurejshët", verses: 4, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/106.mp3",
    ayahs: [
      { number: 1, arabic: "لِإِيلَافِ قُرَيْشٍ", translation: "Për hir të bashkimit të Kurejshëve" },
      { number: 2, arabic: "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", translation: "Bashkimit të tyre për udhëtimin e dimrit dhe verës" },
      { number: 3, arabic: "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ", translation: "Le ta adhurojnë Zotin e kësaj Shtëpie (Qabesë)" },
      { number: 4, arabic: "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ", translation: "I cili i ushqeu nga uria dhe i siguroi nga frika" },
    ],
  },
  {
    number: 107, name: "El-Maun", arabicName: "الماعون", meaning: "Ndihma e Vogël", verses: 7, type: "Mekase",
    audioUrl: "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/107.mp3",
    ayahs: [
      { number: 1, arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", translation: "A e ke parë atë që mohon Ditën e Gjykimit?" },
      { number: 2, arabic: "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", translation: "Ai është ai që e shtyn jetimin" },
      { number: 3, arabic: "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ", translation: "Dhe nuk nxit për ushqimin e të varfrit" },
      { number: 4, arabic: "فَوَيْلٌ لِّلْمُصَلِّينَ", translation: "Mjerë për ata që falen" },
      { number: 5, arabic: "الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ", translation: "Të cilët janë të pakujdesshëm ndaj namazit të tyre" },
      { number: 6, arabic: "الَّذِينَ هُمْ يُرَاءُونَ", translation: "Të cilët duan vetëm të shihen (dyfytyrësi)" },
      { number: 7, arabic: "وَيَمْنَعُونَ الْمَاعُونَ", translation: "Dhe ndalojnë ndihmën e vogël" },
    ],
  },
];

function speakArabic(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.5;
  window.speechSynthesis.speak(u);
}

export default function SuretView() {
  const [expandedSurah, setExpandedSurah] = useState<number | null>(1);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [audioRef] = useState<HTMLAudioElement>(new Audio());
  const [searchQuery, setSearchQuery] = useState("");

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

  const filtered = SURAHS.filter(s =>
    !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.arabicName.includes(searchQuery)
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md mx-auto mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Kërko sure... (p.sh. Fatiha, Jasin)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <p className="text-xs text-muted-foreground text-center mb-2">
        {filtered.length} sure • Kliko për ajete • 🔊 për audio
      </p>

      {filtered.map((surah) => (
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
                      <div className="flex flex-col items-center gap-2">
                        <span className="w-7 h-7 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                          {ayah.number}
                        </span>
                        <button
                          onClick={() => speakArabic(ayah.arabic)}
                          className="p-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
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