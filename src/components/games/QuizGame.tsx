import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Trophy, RotateCcw, Zap } from "lucide-react";

interface Question { q: string; opts: string[]; correct: string }
interface QuizModule { title: string; emoji: string; timePerQ: number; questions: Question[] }

const QUIZ_DATA: Record<string, QuizModule> = {
  alphabeti_shqip: {
    title: "Kuiz Alfabeti Shqip", emoji: "🇦🇱", timePerQ: 15,
    questions: [
      { q: "Sa shkronja ka alfabeti shqip?", opts: ["32", "36", "28", "30"], correct: "36" },
      { q: "Sa zanore ka alfabeti shqip?", opts: ["5", "6", "7", "8"], correct: "7" },
      { q: "Sa bashkëtingëllore ka shqipja?", opts: ["25", "29", "27", "23"], correct: "29" },
      { q: "Sa digrafë (shkronja dyshe) ka shqipja?", opts: ["7", "8", "9", "10"], correct: "9" },
      { q: "Cila shkronjë shqipe nuk ekziston në anglisht?", opts: ["A", "B", "Ë", "C"], correct: "Ë" },
      { q: "Cila fjalë fillon me shkronjën 'Ë'?", opts: ["Emër", "Erë", "Ëmbël", "Enë"], correct: "Ëmbël" },
      { q: "Cila shkronjë vjen pas 'Z' në alfabetin shqip?", opts: ["Xh", "Zh", "Sh", "Th"], correct: "Zh" },
      { q: "Cila shkronjë paraqet tingullin 'L të trashë'?", opts: ["L", "Ll", "Lj", "Lh"], correct: "Ll" },
      { q: "Cila shkronjë paraqet tingullin si 'ch' anglisht?", opts: ["C", "Ç", "Xh", "Sh"], correct: "Ç" },
      { q: "'Y' shqip është:", opts: ["Zanore", "Bashkëtingëllore", "Digraff", "Shkronjë angleze"], correct: "Zanore" },
      { q: "Zanorja 'Ë' quhet:", opts: ["Schwa", "Epsilon", "Eta", "Omega"], correct: "Schwa" },
      { q: "Cili digraff tingëllon si 'j' angleze?", opts: ["Gj", "Xh", "Zh", "Dh"], correct: "Xh" },
      { q: "Cili digraff shqip tingëllon si 'dh' angleze (this)?", opts: ["Th", "Dh", "Gj", "Nj"], correct: "Dh" },
      { q: "Sa rrokje ka fjala 'bukuri'?", opts: ["2", "3", "4", "1"], correct: "3" },
      { q: "Ndaj rrokjet e 'bardha'?", opts: ["bar-dha", "ba-rdha", "bard-ha", "b-ardha"], correct: "bar-dha" },
      { q: "Nyja e emrit mashkullor shqip është:", opts: ["-a / -ja", "-i / -u", "-ë", "-e"], correct: "-i / -u" },
      { q: "Nyja e emrit femëror shqip është:", opts: ["-i / -u", "-a / -ja", "-ë", "-o"], correct: "-a / -ja" },
      { q: "Shumësi i emrit 'libër' është:", opts: ["libri", "librë", "libra", "libret"], correct: "libra" },
      { q: "Rasa emërore tregon:", opts: ["Kryefjalën e fjalisë", "Përkatësinë", "Marrësin", "Objektin"], correct: "Kryefjalën e fjalisë" },
      { q: "Rasa gjinore tregon:", opts: ["Kryefjalën", "Përkatësinë (i kujt)", "Marrësin", "Mjetin"], correct: "Përkatësinë (i kujt)" },
      { q: "E ardhme shqip formohet me:", opts: ["do + folja", "kam + folja", "do të + folja", "jam + folja"], correct: "do të + folja" },
      { q: "'Lexova' — kjo është kohë:", opts: ["E tashme", "E ardhme", "E shkuar e thjeshtë", "Urdhërorja"], correct: "E shkuar e thjeshtë" },
      { q: "Forma e saktë e urdhërorës së 'shkoj'?", opts: ["shko!", "shkoj!", "do të shkoj!", "shkova!"], correct: "shko!" },
      { q: "Mohimi i drejtë para foljes?", opts: ["s'", "jo", "nuk", "mos"], correct: "nuk" },
      { q: "Kur përdoret 'mos'?", opts: ["Para foljes pohore", "Para emrit", "Para foljes urdhërore mohuese", "Para mbiemrit"], correct: "Para foljes urdhërore mohuese" },
      { q: "Folja tregon:", opts: ["Cilësi", "Veprim ose gjendje", "Sasi", "Marrëdhënie"], correct: "Veprim ose gjendje" },
      { q: "Kush shkroi 'Lahuta e Malcis'?", opts: ["Naim Frashëri", "Migjeni", "Gjergj Fishta", "Fan Noli"], correct: "Gjergj Fishta" },
      { q: "Naim Frashëri i takon periudhës:", opts: ["Romantizmit Italian", "Rilindjes Kombëtare", "Modernizmit", "Mes luftërave"], correct: "Rilindjes Kombëtare" },
      { q: "Kush shkroi 'Vargjet e Lira'?", opts: ["Fan Noli", "Kadare", "Naim Frashëri", "Migjeni"], correct: "Migjeni" },
      { q: "Rasat e emrit shqip janë:", opts: ["3", "4", "5", "6"], correct: "5" },
      { q: "Kush shkroi 'Bagëti e Bujqësi'?", opts: ["Gjergj Fishta", "Fan Noli", "Naim Frashëri", "Migjeni"], correct: "Naim Frashëri" },
      { q: "Fjalia ka gjithmonë:", opts: ["Emër", "Folje", "Mbiemër", "Ndajfolje"], correct: "Folje" },
      { q: "Gjinia e emrit 'shtëpi'?", opts: ["Mashkullore", "Femërorja", "Asnjanëse", "Nuk ka gjini"], correct: "Femërorja" },
      { q: "Gjinia e emrit 'mal'?", opts: ["Femërorja", "Asnjanëse", "Mashkullore", "Nuk ka gjini"], correct: "Mashkullore" },
      { q: "Shqipja shkruhet:", opts: ["Djathtas-majtas", "Majtas-djathtas", "Poshtë-lart", "Çfarëdo drejtimt"], correct: "Majtas-djathtas" },
      { q: "Rasa dhanore tregon:", opts: ["Kryefjalën", "Përkatësinë", "Marrësin e veprimit", "Objektin direkt"], correct: "Marrësin e veprimit" },
      { q: "Rasa kallëzore tregon:", opts: ["Kryefjalën", "Marrësin", "Objektin direkt", "Origjinën"], correct: "Objektin direkt" },
      { q: "'Shoh djalin' — 'djalin' është rasë:", opts: ["Emërore", "Gjinore", "Dhanore", "Kallëzore"], correct: "Kallëzore" },
      { q: "Llojet e ligjëratës janë gjithsej:", opts: ["6", "7", "8", "10"], correct: "8" },
      { q: "Digrafi nuk ndahet kurrë sepse:", opts: ["Është i gjatë", "Paraqet 1 tingull të vetëm", "Është zanore", "Është rrallë"], correct: "Paraqet 1 tingull të vetëm" },
    ]
  },
  alfabeti_anglisht: {
    title: "Kuiz Alfabeti Anglisht", emoji: "🇬🇧", timePerQ: 15,
    questions: [
      { q: "Sa shkronja ka alfabeti anglez?", opts: ["24", "25", "26", "27"], correct: "26" },
      { q: "Sa zanore ka anglishtja?", opts: ["4", "5", "6", "7"], correct: "5" },
      { q: "Cila shkronjë vjen pas 'M'?", opts: ["L", "N", "O", "K"], correct: "N" },
      { q: "Shkronja e fundit e alfabetit anglez?", opts: ["Y", "X", "Z", "W"], correct: "Z" },
      { q: "Cila shkronjë quhet 'double-you'?", opts: ["U", "V", "W", "X"], correct: "W" },
      { q: "Silent letter në 'knife'?", opts: ["I", "N", "K", "E"], correct: "K" },
      { q: "Silent letter në 'write'?", opts: ["R", "I", "W", "T"], correct: "W" },
      { q: "Silent letter në 'hour'?", opts: ["O", "U", "R", "H"], correct: "H" },
      { q: "Silent letter në 'lamb'?", opts: ["L", "A", "M", "B"], correct: "B" },
      { q: "TH në 'the/this/that' tingëllon si:", opts: ["θ (pa zë)", "ð (me zë)", "T", "D"], correct: "ð (me zë)" },
      { q: "TH në 'think/three' tingëllon si:", opts: ["ð (me zë)", "θ (pa zë)", "T", "S"], correct: "θ (pa zë)" },
      { q: "Shumësi i 'child'?", opts: ["childs", "childes", "children", "childs"], correct: "children" },
      { q: "Shumësi i 'mouse'?", opts: ["mouses", "mice", "mices", "mousies"], correct: "mice" },
      { q: "E shkuara e thjeshtë e 'go'?", opts: ["goed", "gone", "went", "gos"], correct: "went" },
      { q: "E shkuara e thjeshtë e 'eat'?", opts: ["eated", "eaten", "ate", "eat"], correct: "ate" },
      { q: "E shkuara e 'buy'?", opts: ["buyed", "bought", "buied", "buyd"], correct: "bought" },
      { q: "Participi i 'write'?", opts: ["writed", "wrote", "written", "wrotten"], correct: "written" },
      { q: "Participi i 'swim'?", opts: ["swammed", "swum", "swimmed", "swam"], correct: "swum" },
      { q: "Cila fjalë ka 'ph' = /f/?", opts: ["shepherd", "phone", "uphill", "perhaps"], correct: "phone" },
      { q: "'GH' lexohet /f/ në:", opts: ["ghost", "through", "enough", "eight"], correct: "enough" },
      { q: "Sinonimi i 'big'?", opts: ["small", "large", "tiny", "narrow"], correct: "large" },
      { q: "Antonimi i 'happy'?", opts: ["glad", "joyful", "sad", "excited"], correct: "sad" },
      { q: "'Beautiful' ka sa rrokje?", opts: ["2", "3", "4", "5"], correct: "3" },
      { q: "Present Perfect formohet me:", opts: ["have/has + V-ed/V3", "do + V", "will + V", "was + V"], correct: "have/has + V-ed/V3" },
      { q: "Forma e saktë: 'She ___ to school every day'?", opts: ["go", "goes", "going", "gone"], correct: "goes" },
      { q: "Mbiemri krahasues i 'good'?", opts: ["gooder", "more good", "better", "best"], correct: "better" },
      { q: "Mbiemri sipëror i 'bad'?", opts: ["baddest", "more bad", "worse", "worst"], correct: "worst" },
      { q: "Cila fjalë ka diftong?", opts: ["cat", "coin", "sit", "pen"], correct: "coin" },
      { q: "Artikulli 'an' përdoret para:", opts: ["Bashkëtingëlloreve", "Zanoreve", "Emrave shumës", "Foljeve"], correct: "Zanoreve" },
      { q: "Cila fjali është e saktë?", opts: ["He don't like", "He doesn't likes", "He doesn't like", "He not like"], correct: "He doesn't like" },
    ]
  },
  alfabeti_arab: {
    title: "Kuiz Alfabeti Arab", emoji: "🇸🇦", timePerQ: 15,
    questions: [
      { q: "Sa shkronja ka alfabeti arab?", opts: ["26", "28", "30", "32"], correct: "28" },
      { q: "Arabishtja shkruhet nga:", opts: ["Majtas-djathtas", "Djathtas-majtas", "Lart-poshtë", "Poshtë-lart"], correct: "Djathtas-majtas" },
      { q: "Shkronja e parë e alfabetit arab?", opts: ["ب", "ا", "ت", "ج"], correct: "ا" },
      { q: "Si quhet shkronja 'ب'?", opts: ["Ta", "Ba", "Tha", "Jim"], correct: "Ba" },
      { q: "Sa harekate (zanore të shkurtra) ka arabishtja?", opts: ["2", "3", "4", "5"], correct: "3" },
      { q: "Si quhet harekeja 'َ' (vija sipër)?", opts: ["Kasra", "Damma", "Fatha", "Sukun"], correct: "Fatha" },
      { q: "Si quhet harekeja 'ِ' (vija poshtë)?", opts: ["Fatha", "Kasra", "Damma", "Shadda"], correct: "Kasra" },
      { q: "Si quhet harekeja 'ُ' (vava sipër)?", opts: ["Fatha", "Kasra", "Damma", "Tanvin"], correct: "Damma" },
      { q: "Çfarë tregon Sukuni 'ْ'?", opts: ["Zanore e gjatë", "Pa zanore", "Zanore e shkurtë", "Dyfishim"], correct: "Pa zanore" },
      { q: "Çfarë tregon Shaddah 'ّ'?", opts: ["Pa zanore", "Dyfishim i bashkëtingëllores", "Zanore e gjatë", "Fund fjale"], correct: "Dyfishim i bashkëtingëllores" },
      { q: "Sa forma ka çdo shkronjë arabe?", opts: ["2", "3", "4", "1"], correct: "4" },
      { q: "Format e shkronjës janë:", opts: ["E izoluar, fillore, mesore, fundore", "E madhe dhe e vogël", "Vetëm 2 forma", "Nuk ndryshon"], correct: "E izoluar, fillore, mesore, fundore" },
      { q: "Cila shkronjë nuk lidhet me shkronjën pas saj?", opts: ["ب", "ت", "ر", "ف"], correct: "ر" },
      { q: "Shkronjat 'و ا ي' quhen:", opts: ["Bashkëtingëllore", "Shkronja Meddi (zanore të gjata)", "Harekate", "Tanvine"], correct: "Shkronja Meddi (zanore të gjata)" },
      { q: "Si quhet 'لا'?", opts: ["Lam-Elif", "Elif-Lam", "Ta-Marbuta", "Ha"], correct: "Lam-Elif" },
      { q: "Shkronja 'ة' quhet:", opts: ["Ha", "Ta Marbuta", "Ta", "Hemze"], correct: "Ta Marbuta" },
      { q: "Çfarë është Hemzeja 'ء'?", opts: ["Zanore", "Ndalesë glotale", "Harekate", "Pikëzim"], correct: "Ndalesë glotale" },
      { q: "Si quhet 'ع'?", opts: ["Gajn", "Ajn", "Ha", "Kha"], correct: "Ajn" },
      { q: "Si quhet 'غ'?", opts: ["Ajn", "Gajn", "Fa", "Qaf"], correct: "Gajn" },
      { q: "Shkronja 'ص' quhet:", opts: ["Sin", "Sad", "Shin", "Shad"], correct: "Sad" },
      { q: "Dallimi mes 'س' dhe 'ش'?", opts: ["S vs SH", "S vs Z", "T vs TH", "D vs DH"], correct: "S vs SH" },
      { q: "Dallimi mes 'د' dhe 'ذ'?", opts: ["D vs DH", "D vs T", "R vs Z", "S vs SH"], correct: "D vs DH" },
      { q: "Dallimi mes 'ت' dhe 'ث'?", opts: ["T vs TH", "T vs D", "S vs SH", "K vs Q"], correct: "T vs TH" },
      { q: "Shkronja 'خ' quhet:", opts: ["Ha", "Kha", "Jim", "Gajn"], correct: "Kha" },
      { q: "Shkronja 'ح' quhet:", opts: ["Kha", "Ha", "Ajn", "Gajn"], correct: "Ha" },
      { q: "Sa lloje Tanvini ka?", opts: ["1", "2", "3", "4"], correct: "3" },
      { q: "Tanvinu 'ً' quhet:", opts: ["Tanvin Fatha", "Tanvin Kasra", "Tanvin Damma", "Sukun"], correct: "Tanvin Fatha" },
      { q: "Fjala 'بِسْمِ' — harekeja e 'ب' është:", opts: ["Fatha", "Kasra", "Damma", "Sukun"], correct: "Kasra" },
      { q: "Si lexohet 'كِتَابٌ'?", opts: ["Kitaab", "Kutub", "Kataba", "Kitaban"], correct: "Kitaab" },
      { q: "Çfarë do të thotë 'كِتَابٌ'?", opts: ["Shtëpi", "Libër", "Shkollë", "Stilolaps"], correct: "Libër" },
    ]
  },
  texhuidi: {
    title: "Kuiz Texhuidi", emoji: "📖", timePerQ: 20,
    questions: [
      { q: "Sa rregulla kryesore ka Nun Sakineh?", opts: ["3", "4", "5", "6"], correct: "4" },
      { q: "Rregullat e Nun Sakineh janë:", opts: ["Izhar, Idgham, Iqlab, Ikhfa", "Madd, Qalqalah, Waqf", "Ghunnah, Tafkhim, Tarqiq", "Sakt, Isti'adha, Basmala"], correct: "Izhar, Idgham, Iqlab, Ikhfa" },
      { q: "Sa shkronja ka Izhari?", opts: ["4", "5", "6", "7"], correct: "6" },
      { q: "Shkronjat e Izharit janë:", opts: ["ء هـ ع ح غ خ", "ي ر م ل و ن", "ب ت ث ج د ذ", "ط ظ ص ض ق ك"], correct: "ء هـ ع ح غ خ" },
      { q: "Sa shkronja ka Idghami?", opts: ["4", "5", "6", "7"], correct: "6" },
      { q: "Shkronjat e Idghamit janë:", opts: ["ي ر م ل و ن", "ء هـ ع ح غ خ", "ب ت ث ج", "ص ض ط ظ"], correct: "ي ر م ل و ن" },
      { q: "Idghami ndahet në:", opts: ["Me Ghunneh dhe pa Ghunneh", "I plotë dhe i pjesshëm", "I fortë dhe i dobët", "I shpejtë dhe i ngadaltë"], correct: "Me Ghunneh dhe pa Ghunneh" },
      { q: "Shkronjat e Idghamit pa Ghunneh:", opts: ["ل ر", "ي ن", "و م", "ب ت"], correct: "ل ر" },
      { q: "Iklab ndodh kur pas Nun Sakineh vjen:", opts: ["ب", "ت", "ث", "ج"], correct: "ب" },
      { q: "Gjatë Iklabit, Nuni kthehet në:", opts: ["Mim م", "Ba ب", "Lam ل", "Ra ر"], correct: "Mim م" },
      { q: "Sa shkronja ka Ikhfaja?", opts: ["10", "12", "15", "18"], correct: "15" },
      { q: "Ghunneh zgjat sa harekate?", opts: ["1", "2", "3", "4"], correct: "2" },
      { q: "Çfarë është Ghunneh?", opts: ["Tingull hundor", "Tingull fyti", "Tingull buzor", "Tingull dhëmbor"], correct: "Tingull hundor" },
      { q: "Madd Tabii zgjat:", opts: ["1 harekate", "2 harekate", "4 harekate", "6 harekate"], correct: "2 harekate" },
      { q: "Madd Muttasil do të thotë:", opts: ["Meddi i lidhur (brenda fjalës)", "Meddi i ndarë (mes fjalëve)", "Meddi natyror", "Meddi i detyruar"], correct: "Meddi i lidhur (brenda fjalës)" },
      { q: "Sa lloje kryesore Meddi ka?", opts: ["2", "3", "5", "7"], correct: "5" },
      { q: "Shkronjat e Qalqaleh-s janë:", opts: ["ق ط ب ج د", "ص ض ط ظ ع", "ت ث ح خ ذ", "ف ك ل م ن"], correct: "ق ط ب ج د" },
      { q: "Qalqaleh e madhe (Kubra) ndodh kur:", opts: ["Shkronja me Sukun në fund", "Shkronja me Sukun në mes", "Shkronja me Fatha", "Shkronja me Kasra"], correct: "Shkronja me Sukun në fund" },
      { q: "Tafkhim do të thotë:", opts: ["Trashje e tingullit", "Hollim i tingullit", "Zgjatje", "Dridhje"], correct: "Trashje e tingullit" },
      { q: "Tarqiq do të thotë:", opts: ["Trashje", "Hollim i tingullit", "Zgjatje", "Ndalje"], correct: "Hollim i tingullit" },
      { q: "Sa lloje Waqf (ndalje) ka?", opts: ["2", "3", "4", "5"], correct: "4" },
      { q: "Simboli 'مـ' në Mus'haf tregon:", opts: ["Waqf i detyrueshëm", "Waqf i lejueshëm", "Waqf i ndaluar", "Meddi i gjatë"], correct: "Waqf i detyrueshëm" },
      { q: "Çfarë do të thotë 'Isti'adha'?", opts: ["Kërkim mbrojtjeje nga Allahu", "Falënderim", "Lavdërim", "Lutje"], correct: "Kërkim mbrojtjeje nga Allahu" },
      { q: "Rregullat e Mim Sakineh janë:", opts: ["3: Idgham Shafavi, Ikhfa Shafavi, Izhar Shafavi", "2: Izhar dhe Ikhfa", "4 rregulla", "1 rregull"], correct: "3: Idgham Shafavi, Ikhfa Shafavi, Izhar Shafavi" },
      { q: "Idgham Shafavi ndodh kur pas Mim Sakineh vjen:", opts: ["م", "ب", "ن", "ل"], correct: "م" },
      { q: "Ikhfa Shafavi ndodh kur pas Mim Sakineh vjen:", opts: ["ب", "م", "ن", "ت"], correct: "ب" },
      { q: "Lam e artikullit 'ال' — sa rregulla ka?", opts: ["1", "2", "3", "4"], correct: "2" },
      { q: "Lam Shamsije do të thotë:", opts: ["Lami nuk lexohet, shkronja pas saj dyfishohet", "Lami lexohet qartë", "Lami zgjatet", "Lami hiqet"], correct: "Lami nuk lexohet, shkronja pas saj dyfishohet" },
      { q: "Sa shkronja Shamsije ka?", opts: ["10", "12", "14", "16"], correct: "14" },
      { q: "Sa shkronja Qamerije ka?", opts: ["10", "12", "14", "16"], correct: "14" },
    ]
  },
  kurani: {
    title: "Kuiz Kur'ani", emoji: "📖", timePerQ: 20,
    questions: [
      { q: "Sa sure ka Kur'ani?", opts: ["100", "114", "120", "99"], correct: "114" },
      { q: "Cila është surja e parë?", opts: ["El-Bekare", "El-Fatiha", "El-Ihlas", "Jasin"], correct: "El-Fatiha" },
      { q: "Cila është surja më e gjatë?", opts: ["Ali Imran", "En-Nisa", "El-Bekare", "El-Maide"], correct: "El-Bekare" },
      { q: "Cila është surja më e shkurtë?", opts: ["El-Ihlas", "El-Keuther", "En-Nasr", "El-Asr"], correct: "El-Keuther" },
      { q: "Sa ajete ka surja El-Fatiha?", opts: ["5", "6", "7", "8"], correct: "7" },
      { q: "Kur'ani u zbrit brenda:", opts: ["10 viteve", "23 viteve", "30 viteve", "40 viteve"], correct: "23 viteve" },
      { q: "Kur'ani u zbrit me anë të:", opts: ["Xhibrilit a.s.", "Mikailit a.s.", "Israfilit a.s.", "Azrailit a.s."], correct: "Xhibrilit a.s." },
      { q: "Muaji kur filloi zbritja e Kur'anit?", opts: ["Shaban", "Ramazan", "Muharrem", "Rexhep"], correct: "Ramazan" },
      { q: "Nata kur filloi zbritja quhet:", opts: ["Nata e Kadrit", "Nata e Israsë", "Nata e Beratit", "Nata e Regaibit"], correct: "Nata e Kadrit" },
      { q: "Sa xhuze (pjesë) ka Kur'ani?", opts: ["20", "25", "30", "35"], correct: "30" },
      { q: "Sa hizbe ka Kur'ani?", opts: ["30", "40", "60", "120"], correct: "60" },
      { q: "Cila sure quhet 'Zemra e Kur'anit'?", opts: ["El-Bekare", "Jasin", "Er-Rahman", "El-Mulk"], correct: "Jasin" },
      { q: "Surja 'Er-Rahman' flet për:", opts: ["Mëshirën e Allahut", "Ditën e Gjykimit", "Profetët", "Luftën"], correct: "Mëshirën e Allahut" },
      { q: "Sa herë përmendet emri 'Muhammed' në Kur'an?", opts: ["2", "4", "7", "10"], correct: "4" },
      { q: "Profeti më i përmendur në Kur'an?", opts: ["Ibrahimi", "Isai", "Musai", "Muhammedi"], correct: "Musai" },
      { q: "Cila sure ka emrin e një metali?", opts: ["El-Hadid (Hekuri)", "En-Nexhm", "El-Kamer", "El-Buruxh"], correct: "El-Hadid (Hekuri)" },
      { q: "Cila sure ka emrin e një kafshe?", opts: ["El-Bekare (Lopa)", "El-Fatiha", "Jasin", "El-Mulk"], correct: "El-Bekare (Lopa)" },
      { q: "Ajeti i Kursi-t gjendet në suren:", opts: ["Ali Imran", "El-Bekare", "En-Nisa", "El-Maide"], correct: "El-Bekare" },
      { q: "Sure Mekase do të thotë:", opts: ["Zbriti në Mekë", "Zbriti në Medinë", "U shkrua në Mekë", "U mësua në Mekë"], correct: "Zbriti në Mekë" },
      { q: "Çfarë do të thotë 'Bismilah'?", opts: ["Lavdërimi i takon Allahut", "Me emrin e Allahut", "Allahu është i Madh", "Falënderim"], correct: "Me emrin e Allahut" },
      { q: "Cili muaj është i 9-ti në kalendarin islam?", opts: ["Shaban", "Sheval", "Ramazan", "Muharrem"], correct: "Ramazan" },
      { q: "Sa rekate farz ka namazi i Drekës?", opts: ["2", "3", "4", "5"], correct: "4" },
      { q: "Cili profet ndërtoi Qabenë?", opts: ["Musai a.s.", "Isai a.s.", "Ibrahimi a.s.", "Nuhi a.s."], correct: "Ibrahimi a.s." },
      { q: "Çfarë është Texhuidi?", opts: ["Lloj namazi", "Shkenca e leximit të Kur'anit", "Lloj agjërimi", "Emër sureje"], correct: "Shkenca e leximit të Kur'anit" },
      { q: "Surja El-Ihlas flet për:", opts: ["Njësinë e Allahut", "Ditën e Gjykimit", "Profetët", "Xhenetin"], correct: "Njësinë e Allahut" },
      { q: "Si thuhet 'Faleminderit' në arabisht?", opts: ["مرحبا", "شكرا", "عفوا", "أهلا"], correct: "شكرا" },
      { q: "Sa sure Medinase ka Kur'ani (përafërsisht)?", opts: ["18", "28", "38", "48"], correct: "28" },
      { q: "Ajeti më i gjatë në Kur'an gjendet në:", opts: ["El-Bekare (282)", "Ali Imran", "En-Nisa", "El-Maide"], correct: "El-Bekare (282)" },
      { q: "Surja El-Kehf lexohet zakonisht ditën e:", opts: ["Hënës", "Mërkurës", "Xhumasë", "Shtunës"], correct: "Xhumasë" },
      { q: "Sa ajete ka Kur'ani gjithsej (përafërsisht)?", opts: ["5000", "6236", "7000", "4500"], correct: "6236" },
    ]
  },
  umra_haxh: {
    title: "Kuiz Umra & Haxhi", emoji: "🕋", timePerQ: 20,
    questions: [
      { q: "Sa shtyllat kryesore ka Umra?", opts: ["2", "3", "4", "5"], correct: "4" },
      { q: "Hapi i parë i Umrës është:", opts: ["Tavafi", "Ihrami", "Sa'ji", "Rruajtja"], correct: "Ihrami" },
      { q: "Tavafi bëhet rreth:", opts: ["Safasë dhe Mervesë", "Qabes", "Xhamisë së Profetit", "Arafatit"], correct: "Qabes" },
      { q: "Sa rrotullime ka Tavafi?", opts: ["5", "6", "7", "8"], correct: "7" },
      { q: "Sa'ji bëhet mes:", opts: ["Qabes dhe Minas", "Safasë dhe Mervesë", "Arafatit dhe Muzdelifes", "Mekës dhe Medinës"], correct: "Safasë dhe Mervesë" },
      { q: "Sa ecje ka Sa'ji?", opts: ["5", "6", "7", "8"], correct: "7" },
      { q: "Ihrami për meshkujt përfshin:", opts: ["2 copa të bardha", "Rroba normale", "1 copë", "3 copa"], correct: "2 copa të bardha" },
      { q: "Telbijeh fillon me:", opts: ["Bismilah", "Lebbejk Allahumme Lebbejk", "Allahu Ekber", "Subhanallah"], correct: "Lebbejk Allahumme Lebbejk" },
      { q: "Haxhi bëhet në muajin:", opts: ["Ramazan", "Shaban", "Dhul-Hixhe", "Muharrem"], correct: "Dhul-Hixhe" },
      { q: "Dita e Arafatit është:", opts: ["8 Dhul-Hixhe", "9 Dhul-Hixhe", "10 Dhul-Hixhe", "11 Dhul-Hixhe"], correct: "9 Dhul-Hixhe" },
      { q: "Ditët e Teshrikut janë:", opts: ["8-10 Dhul-Hixhe", "11-13 Dhul-Hixhe", "1-3 Sheval", "10-12 Dhul-Hixhe"], correct: "11-13 Dhul-Hixhe" },
      { q: "Gjuajtja e guralecëve (Remy) bëhet në:", opts: ["Arafat", "Muzdelife", "Mina", "Mekë"], correct: "Mina" },
      { q: "Sa guralecë gjuhen gjithsej (ditën e 10-të)?", opts: ["5", "7", "10", "21"], correct: "7" },
      { q: "Tavafi i Ifadhës bëhet pas:", opts: ["Sa'jit", "Gjuajtjes së guralecëve", "Ihramit", "Arafatit"], correct: "Gjuajtjes së guralecëve" },
      { q: "Guri i Zi (Haxherul Esved) ndodhet:", opts: ["Brenda Qabes", "Në cepin lindor të Qabes", "Në Safa", "Në Merve"], correct: "Në cepin lindor të Qabes" },
      { q: "Mekam Ibrahimi ndodhet:", opts: ["Pranë Qabes", "Në Mina", "Në Arafat", "Në Muzdelife"], correct: "Pranë Qabes" },
      { q: "Burimi i Zemzemit u zbulua nga:", opts: ["Ibrahimi a.s.", "Ismaili a.s. (si foshnje)", "Muhammedi a.s.", "Hagari"], correct: "Ismaili a.s. (si foshnje)" },
      { q: "Haxhi është shtyllë e:", opts: ["3-të e Islamit", "4-të e Islamit", "5-të e Islamit", "2-të e Islamit"], correct: "5-të e Islamit" },
      { q: "Festa e Bajramit të Madh lidhet me:", opts: ["Fundin e Ramazanit", "Ditën e Arafatit", "Haxhin", "Mevludin"], correct: "Haxhin" },
      { q: "Kush ndërtoi Qabenë?", opts: ["Muhammedi a.s.", "Ibrahimi a.s. me Ismailin a.s.", "Nuhi a.s.", "Ademi a.s."], correct: "Ibrahimi a.s. me Ismailin a.s." },
      { q: "Distanca Safa-Merve është përafërsisht:", opts: ["200 m", "395 m", "500 m", "1 km"], correct: "395 m" },
      { q: "Muzdelifja ndodhet mes:", opts: ["Mekës dhe Medinës", "Minas dhe Arafatit", "Qabes dhe Safasë", "Taiffit dhe Mekës"], correct: "Minas dhe Arafatit" },
      { q: "Qëndresa në Arafat quhet:", opts: ["Wuquf", "Tawaf", "Sa'ji", "Ihram"], correct: "Wuquf" },
      { q: "Tavafi i Lamtumirës (Veda) bëhet:", opts: ["Para Ihramit", "Para largimit nga Meka", "Në Medinë", "Në Arafat"], correct: "Para largimit nga Meka" },
      { q: "Umra mund të bëhet:", opts: ["Vetëm në Dhul-Hixhe", "Gjatë gjithë vitit", "Vetëm në Ramazan", "Vetëm në Muharrem"], correct: "Gjatë gjithë vitit" },
    ]
  },
  fikh: {
    title: "Kuiz Fikh Elementar", emoji: "🕌", timePerQ: 20,
    questions: [
      { q: "Sa janë shtyllat e Islamit?", opts: ["3", "4", "5", "6"], correct: "5" },
      { q: "Shtylla e parë e Islamit?", opts: ["Namazi", "Shehadeti", "Agjërimi", "Zekati"], correct: "Shehadeti" },
      { q: "Sa janë kushtet e Imanit?", opts: ["5", "6", "7", "8"], correct: "6" },
      { q: "Kushti i parë i Imanit?", opts: ["Besimi në melaqe", "Besimi në Allahun", "Besimi në Kaderin", "Besimi në libra"], correct: "Besimi në Allahun" },
      { q: "Sa namaze farz ka në ditë?", opts: ["3", "4", "5", "7"], correct: "5" },
      { q: "Namazi i parë i ditës?", opts: ["Dreka", "Ikindia", "Sabahu", "Akshami"], correct: "Sabahu" },
      { q: "Sa rekate farz ka Sabahu?", opts: ["2", "3", "4", "1"], correct: "2" },
      { q: "Sa rekate farz ka Dreka?", opts: ["2", "3", "4", "5"], correct: "4" },
      { q: "Sa rekate farz ka Akshami?", opts: ["2", "3", "4", "5"], correct: "3" },
      { q: "Sa rekate farz ka Jacia?", opts: ["2", "3", "4", "5"], correct: "4" },
      { q: "Sa farz ka abdesi?", opts: ["3", "4", "5", "6"], correct: "4" },
      { q: "Farzi i parë i abdesit?", opts: ["Larja e duarve", "Larja e fytyrës", "Larja e këmbëve", "Mesh mbi kokë"], correct: "Larja e fytyrës" },
      { q: "Çfarë e prish abdesin?", opts: ["Të ngrënit", "Të pirit ujë", "Dalja e gazrave", "Ecja"], correct: "Dalja e gazrave" },
      { q: "Gusli (larja e plotë) bëhet:", opts: ["Çdo ditë", "Kur ke xhunubllëk", "Vetëm për Xhuma", "Vetëm për Bajram"], correct: "Kur ke xhunubllëk" },
      { q: "Tejemmumi bëhet me:", opts: ["Ujë", "Dhe/tokë të pastër", "Ajër", "Qumësht"], correct: "Dhe/tokë të pastër" },
      { q: "Kur lejohet Tejemmumi?", opts: ["Gjithmonë", "Kur nuk ka ujë ose s'mund ta përdorësh", "Vetëm në udhëtim", "Vetëm natën"], correct: "Kur nuk ka ujë ose s'mund ta përdorësh" },
      { q: "Sa rekate ka Namazi i Vitrit?", opts: ["1", "2", "3", "4"], correct: "3" },
      { q: "Zekati jepet:", opts: ["Çdo muaj", "Një herë në vit", "Çdo javë", "Çdo ditë"], correct: "Një herë në vit" },
      { q: "Përqindja e Zekatit?", opts: ["1%", "2.5%", "5%", "10%"], correct: "2.5%" },
      { q: "Nisabi i arit për Zekat?", opts: ["50g", "85g", "100g", "200g"], correct: "85g" },
      { q: "Agjërimi në Ramazan fillon:", opts: ["Me agimin", "Me lindjen e diellit", "Me drekën", "Me perëndimin"], correct: "Me agimin" },
      { q: "Agjërimi prishet me:", opts: ["Marrjen e frymës", "Ngrënien me qëllim", "Larjen e dhëmbëve", "Parfumin"], correct: "Ngrënien me qëllim" },
      { q: "Iftari bëhet:", opts: ["Me agimin", "Me drekën", "Me perëndimin e diellit", "Me mesnatë"], correct: "Me perëndimin e diellit" },
      { q: "Syfyri hahet:", opts: ["Pas agimit", "Para agimit", "Në drekë", "Në darkë"], correct: "Para agimit" },
      { q: "Sa ditë ka Ramazani?", opts: ["28-29", "29-30", "30-31", "28-30"], correct: "29-30" },
      { q: "Sadakatul-Fitri jepet:", opts: ["Në fund të Ramazanit", "Në fillim të Ramazanit", "Çdo xhuma", "Gjatë Haxhit"], correct: "Në fund të Ramazanit" },
      { q: "Kibleja (drejtimi i namazit) është:", opts: ["Lindja", "Perëndimi", "Qabeja në Mekë", "Xhamia e Medinës"], correct: "Qabeja në Mekë" },
      { q: "Ezani thirret:", opts: ["1 herë në ditë", "Para çdo namazi", "Vetëm për Xhuma", "Vetëm për Sabah"], correct: "Para çdo namazi" },
      { q: "Ikameti thirret:", opts: ["Para ezanit", "Mes ezanit dhe namazit", "Pas namazit", "Vetëm për Bajram"], correct: "Mes ezanit dhe namazit" },
      { q: "Sutra e namazit është:", opts: ["Qilimi", "Sexhdeja", "Pengesa para falësit", "Kibla"], correct: "Pengesa para falësit" },
    ]
  },
};

const QUIZ_GAME_MAP: Record<number, string> = {
  8: "alphabeti_shqip", 9: "alphabeti_anglisht", 10: "alfabeti_arab",
  26: "alfabeti_arab", 29: "alphabeti_shqip", 30: "alphabeti_shqip",
  31: "alfabeti_arab", 32: "alphabeti_anglisht",
  13: "texhuidi", 14: "texhuidi", 19: "texhuidi",
  33: "texhuidi", 34: "texhuidi", 35: "texhuidi", 36: "texhuidi",
  15: "kurani", 16: "kurani", 20: "kurani",
  37: "kurani", 38: "kurani", 39: "kurani", 40: "kurani",
  17: "umra_haxh", 18: "umra_haxh", 21: "umra_haxh",
  22: "umra_haxh", 28: "umra_haxh", 41: "umra_haxh", 42: "umra_haxh", 43: "umra_haxh",
  47: "fikh", 48: "fikh", 49: "fikh", 50: "fikh", 51: "fikh",
  1: "alphabeti_shqip", 11: "alphabeti_shqip", 23: "alphabeti_shqip", 27: "alphabeti_shqip",
};

export { QUIZ_GAME_MAP };

export default function QuizGame({ gameId, quizKey, onClose }: { gameId: number; quizKey: string; onClose: () => void }) {
  const data = QUIZ_DATA[quizKey] || QUIZ_DATA["kurani"];
  const [questions] = useState(() => [...data.questions].sort(() => Math.random() - 0.5).slice(0, 20));
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<{ selected: string; correct: string; isCorrect: boolean } | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timer, setTimer] = useState(data.timePerQ);
  const [totalTime, setTotalTime] = useState(0);
  const [phase, setPhase] = useState<"playing" | "done">("playing");

  useEffect(() => {
    if (phase !== "playing" || answered) return;
    if (timer <= 0) { handleAnswer("__timeout__"); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, phase, answered]);

  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setTotalTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const handleAnswer = (opt: string) => {
    if (answered) return;
    const q = questions[idx];
    const isCorrect = opt === q.correct;
    setAnswered({ selected: opt, correct: q.correct, isCorrect });
    if (isCorrect) { setScore(s => s + 1); setStreak(s => { const ns = s + 1; setMaxStreak(m => Math.max(m, ns)); return ns; }); } else setStreak(0);
    setTimeout(() => {
      if (idx + 1 >= questions.length) { setPhase("done"); return; }
      setIdx(i => i + 1); setTimer(data.timePerQ); setAnswered(null);
    }, 1200);
  };

  const restart = () => { setIdx(0); setAnswered(null); setScore(0); setStreak(0); setMaxStreak(0); setTimer(data.timePerQ); setTotalTime(0); setPhase("playing"); };
  const pct = Math.round((score / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="gradient-primary rounded-t-3xl p-5 text-primary-foreground flex justify-between items-center">
          <div><p className="text-2xl">{data.emoji}</p><h2 className="font-bold text-lg">{data.title}</h2></div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold">✕</button>
        </div>

        {phase === "playing" && questions[idx] && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">{idx + 1}/{questions.length}</span>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-red-500/10 text-red-500 animate-pulse" : "bg-primary/10 text-primary"}`}>
                <Timer className="w-4 h-4" /> {timer}s
              </div>
              <div className="flex items-center gap-1 text-amber-600 font-bold text-sm"><Zap className="w-4 h-4" /> {streak}x</div>
            </div>
            <div className="w-full bg-secondary rounded-full h-2"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${((idx + 1) / questions.length) * 100}%` }} /></div>

            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="bg-secondary rounded-2xl p-6 border border-border">
                <p className="text-lg font-bold text-foreground">{questions[idx].q}</p>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-2">
              {questions[idx].opts.map(opt => {
                let cls = "border-2 border-border bg-card hover:border-primary/50 text-foreground";
                if (answered) {
                  if (opt === answered.correct) cls = "border-2 border-emerald-500 bg-emerald-500/10 text-emerald-700 font-bold";
                  else if (opt === answered.selected && !answered.isCorrect) cls = "border-2 border-red-400 bg-red-500/10 text-red-600";
                  else cls = "border-2 border-border/50 bg-secondary text-muted-foreground";
                }
                return <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!answered} className={`w-full p-4 rounded-xl text-left font-medium transition-all ${cls}`}>{opt}</button>;
              })}
            </div>
            <p className="text-center text-sm text-muted-foreground">✓ {score} të sakta</p>
          </div>
        )}

        {phase === "done" && (
          <div className="p-8 text-center space-y-4">
            <Trophy className="w-14 h-14 text-amber-400 mx-auto" />
            <h3 className="text-2xl font-bold text-foreground">Mbaroi!</h3>
            <p className={`text-5xl font-extrabold ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-500"}`}>{pct}%</p>
            <div className="grid grid-cols-3 gap-3">
              {[{ l: "Saktësi", v: `${score}/${questions.length}`, i: "🎯" }, { l: "Koha", v: `${Math.floor(totalTime / 60)}:${String(totalTime % 60).padStart(2, "0")}`, i: "⏱️" }, { l: "Seria maks", v: `${maxStreak}x`, i: "🔥" }].map(s => (
                <div key={s.l} className="bg-secondary rounded-xl p-3 text-center"><p className="text-xl">{s.i}</p><p className="font-bold text-foreground">{s.v}</p><p className="text-xs text-muted-foreground">{s.l}</p></div>
              ))}
            </div>
            <p className="text-sm font-semibold text-foreground">{pct >= 90 ? "🏆 Shkëlqyeshëm!" : pct >= 70 ? "👍 Shumë mirë!" : pct >= 50 ? "💪 Mirë, vazhdo!" : "📚 Mëso edhe pak!"}</p>
            <div className="flex gap-3">
              <button onClick={restart} className="flex-1 py-3 rounded-xl gradient-primary text-primary-foreground font-bold flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" /> Sërish</button>
              <button onClick={onClose} className="flex-1 py-3 rounded-xl border-2 border-border text-foreground font-bold">Mbyll</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
