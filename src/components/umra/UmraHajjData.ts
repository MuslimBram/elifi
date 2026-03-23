export const UMRA_STEPS = [
  {
    num: 1, icon: "🕊️", title: "Ihrami", arabic: "الإحرام",
    description: "Veshi petkat e Ihramit dhe bëj Nijetin nga Miqati.",
    location: "Miqati (stacioni i Ihramit)",
    color: "border-emerald-200 bg-emerald-50/40",
    info: "Ihrami simbolizon barazinë para Allahut — të gjithë vishin të njëjtën petk të bardhë.",
    details: ["Lahe (gusl) — sunet para Ihramit", "Vish dy petkë të bardhë të palëmuara (burrat)", "Bëj Nijetin me zemër: 'Allahu, dëshiroj të bëj Umre'", "Lexo Talbijën me zë të lartë", "Hyr në Ihram nga Miqati"],
    dua: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
    dua_sq: "Lebbejk Allahumme Umreten — Ja Allahu, jam i pranishëm për Umre!"
  },
  {
    num: 2, icon: "🔄", title: "Tavafi (7 Rrethe)", arabic: "الطواف",
    description: "Rrotullohu 7 herë rreth Qabesë në drejtim kundër-orar.",
    location: "Mesxhidul Haram — Meka",
    color: "border-amber-200 bg-amber-50/40",
    info: "Tavafi fillon dhe mbaron te Haxharul Esved (Guri i Zezë). 7 shawt = 1 Tavaf.",
    details: ["Hyr me këmbën e djathtë dhe thuaj: Allahu Akbar", "Fillo nga Haxharul Esved", "Rrotullohu kundër-orar — Qabeja në të majtë", "3 rrethet e para: ecje e shpejtë (Reml) — vetëm burrat", "Bëj lutje me zemër gjatë çdo rrethi", "Pas Tavafi: fal 2 rekat te Makam Ibrahimi"],
    dua: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ",
    dua_sq: "Bismil-lahi wal-lahu ekber — Me emrin e Allahut dhe Allahu është më i Madhi!"
  },
  {
    num: 3, icon: "💧", title: "Uji i Zemzemit", arabic: "ماء زمزم",
    description: "Pi ujin e Zemzemit pas Tavafi — sunet i Profetit ﷺ.",
    location: "Brenda Mesxhidul Haram",
    color: "border-blue-200 bg-blue-50/40",
    info: "Zemzemi është ujë i bekuar i shpuar nga engjëlli Xhibrili për Haxheren dhe Ismailin.",
    details: ["Kthehu nga Kibla gjatë pirjes", "Pi me 3 frymë — sunet", "Bëj Nijet: 'Pi për shëndet, dije, etj.'", "Lexo dua pas pirjes"],
    dua: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ",
    dua_sq: "O Allah, kërkoj prej Teje dije të dobishme, furnizim të bollshëm dhe shërim nga çdo sëmundje!"
  },
  {
    num: 4, icon: "🏃", title: "Sa'ji (Safa-Merva)", arabic: "السعي",
    description: "Ec 7 herë mes kodrave Safa dhe Merva.",
    location: "Korridori Safa-Merva, Mesxhidul Haram",
    color: "border-teal-200 bg-teal-50/40",
    info: "Sa'ji kujton Haxheren ﷺ e cila vrapoi mes dy kodrave duke kërkuar ujë.",
    details: ["Fillo nga kodra Safa — kthehu nga Kibla", "Lexo ajetin: Inne Safa wal Marwata min sha'airil-llah", "Ec drejt Mervas — ecje 1 (Safa→Merva)", "7 ecje = Safa→Merva→...→Merva", "Gjatë mesit: burrat vrapojnë lehtë"],
    dua: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ",
    dua_sq: "Safa dhe Merva janë nga shenjat e Allahut."
  },
  {
    num: 5, icon: "✂️", title: "Leshimi i Flokëve", arabic: "الحلق أو التقصير",
    description: "Prit ose rruro flokët — dalja nga Ihrami.",
    location: "Meka",
    color: "border-purple-200 bg-purple-50/40",
    info: "Halq = rruajtja e plotë (e preferuar). Taqsir = shkurtimi. Gratë presin vetëm ~2.5cm.",
    details: ["Burrat: preferohet rruajtja e plotë e kokës", "Burrat: lejohet shkurtimi (Taqsir)", "Gratë: presin gishtin e fundit të flokëve", "Pas leshimit: del nga Ihrami", "Çdo gjë e ndaluar gjatë Ihramit bëhet e lejuar"],
    dua: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي",
    dua_sq: "Allahu m'fal dhe m'mëshiro!"
  }
];

export const HAJJ_STEPS = [
  {
    num: 1, icon: "🕊️", title: "Ihrami i Haxhit", arabic: "إحرام الحج",
    description: "Vesh Ihramën dhe bëj Nijetin për Haxh nga Miqati.",
    location: "Miqati ose Meka",
    color: "border-emerald-200 bg-emerald-50/40",
    info: "Nëse bën Tamattu': vishe Ihramën e re ditën e 8 Dhul-Hixhe.",
    details: ["Lahe (gusl) sunet", "Vesh petkat e Ihramit", "Nijet: 'Allahu, dëshiroj të bëj Haxh'", "Lexo Talbijën", "Shko drejt Minasë ditën e 8 Dhul-Hixhe"],
    dua: "لَبَّيْكَ اللَّهُمَّ حَجًّا",
    dua_sq: "Lebbejk Allahumme Haxhxhan — Jam i pranishëm për Haxh!"
  },
  {
    num: 2, icon: "🏕️", title: "Qëndrimi në Mina (8 Dhul-Hixhe)", arabic: "يوم التروية",
    description: "Kalon ditën dhe natën e 8 Dhul-Hixhe në Minë.",
    location: "Minë (~5km nga Meka)",
    color: "border-amber-200 bg-amber-50/40",
    info: "Dita e 8 quhet 'Yawm al-Tarwiyah'. Falen 5 kohë namazit në Minë.",
    details: ["Shko në Minë pas agimit (Fajrit) të ditës 8", "Fal të 5 namazet në Minë me shkurtim", "Fli natën në Minë — kjo është Sunet", "Lexo Kur'an dhe bëj Dhikr"],
    dua: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ",
    dua_sq: "Lebbejk Allahumme Lebbejk — Talbia vazhdon."
  },
  {
    num: 3, icon: "🌄", title: "Arafati — Shtyllë e Haxhit", arabic: "يوم عرفة",
    description: "Qëndro në Arafat nga dreka deri në perëndim — SHTYLLA e Haxhit!",
    location: "Fusha e Arafatit (~14km nga Meka)",
    color: "border-red-200 bg-red-50/40",
    info: "Profeti ﷺ tha: 'Haxhi është Arafati!' — Kush e humb Arafatin ka humbur Haxhin.",
    details: ["Shko në Arafat pas agimit të ditës 9", "Fal Drekën dhe Ikindinë bashkë me Qasr", "Qëndro deri pas perëndimit — pa u larguar para!", "Lutu intensivisht", "Pas perëndimit: shko në Muzdelifë"],
    dua: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    dua_sq: "La ilahe illallahu wahdahu la sherike leh..."
  },
  {
    num: 4, icon: "🌙", title: "Muzdelifa — Mbledhja e Gurëve", arabic: "المزدلفة",
    description: "Fal Aksham+Jaci bashkë, fli nën qiell, mbledh 49-70 gurë.",
    location: "Muzdelifa (~9km nga Meka)",
    color: "border-blue-200 bg-blue-50/40",
    info: "Muzdelifa quhet 'Mash'ar al-Haram'. Fli nën qiell — Sunet.",
    details: ["Arrij në Muzdelifa pas perëndimit", "Fal Aksham (3) + Jaci (2) bashkë", "Fli nën qiell ose çadër deri Fajr", "Mbledh 49 gurë të vegjël", "Pas Fajrit: shko në Minë"],
    dua: "اللَّهُمَّ إِنِّي أَسْأَلُكَ أَنْ تُيَسِّرَ لِي مَا هُوَ خَيْرٌ لِي",
    dua_sq: "O Allah, kërkoj prej Teje të lehtësosh për mua çfarë është më e mira."
  },
  {
    num: 5, icon: "🪨", title: "Hedhja e Gurëve — Xhemratul Akabe", arabic: "رمي جمرة العقبة",
    description: "Hedh 7 gurë te Xhemratul Akabe — shtyllën e madhe.",
    location: "Minë — Xhemratul Akabe",
    color: "border-orange-200 bg-orange-50/40",
    info: "Simbol i hedhjes së gurëve nga Ibrahimi ﷺ ndaj Shejtanit.",
    details: ["Arrij në Minë para lindjes së diellit", "Shko te shtyllën e madhe", "Hedh 7 gurë — çdo gur: 'Allahu Akbar'", "Pas hedhjes: ndalja e Talbisë", "Ther kurbanin, prish flokët, dil nga Ihrami"],
    dua: "اللَّهُ أَكْبَرُ",
    dua_sq: "Allahu Ekber! — Me çdo gur."
  },
  {
    num: 6, icon: "🐑", title: "Kurbani (Hadji)", arabic: "الهدي",
    description: "Ther kurbanin — detyrim për Tamattu' dhe Qiran.",
    location: "Minë ose Meka",
    color: "border-red-200 bg-red-50/40",
    info: "Kafshët: dele/dhi (1 person), lopë/deve (7 persona).",
    details: ["Ther kurbanin pas hedhjes së gurëve", "Kafshët: dele/dhi (1) ose lopë/deve (7)", "Mishi: 1/3 vet, 1/3 familja, 1/3 të varfërit", "Pas therjes: lesh flokët"],
    dua: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ",
    dua_sq: "Bismil-lahi wal-lahu ekber — Gjatë therjes."
  },
  {
    num: 7, icon: "✂️", title: "Leshimi dhe Dalja nga Ihrami", arabic: "الحلق أو التقصير",
    description: "Prith ose rruro flokët — del nga Ihrami (pjesërisht).",
    location: "Minë",
    color: "border-purple-200 bg-purple-50/40",
    info: "Pas leshimit del nga Ihrami PJESËRISHT — lejohet gjithçka përveç marrëdhënieve.",
    details: ["Burrat: rruo kokën ose prit flokët", "Gratë: prit ~2.5cm flokësh", "Hiq rrobat e Ihramit", "Tani lejohen parfumi, veshjet normale", "Nuk lejohet ende marrëdhënia — deri pas Tavafit"],
    dua: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَعَافِنِي وَارْزُقْنِي",
    dua_sq: "O Allah, më fal, më mëshiro, më shëro dhe më furnizo!"
  },
  {
    num: 8, icon: "🔄", title: "Tavaful Ifade (Ziyarah)", arabic: "طواف الإفاضة",
    description: "Kry Tavaful Ifade — tavafi kryesor i Haxhit.",
    location: "Mesxhidul Haram — Meka",
    color: "border-amber-200 bg-amber-50/40",
    info: "Tavaful Ifade është SHTYLLA e dytë e Haxhit. Bëhet ditën e 10 Dhul-Hixhe.",
    details: ["Shko nga Mina në Meka", "Bëj 7 rrethe rreth Qabesë", "Fal 2 rekat te Makam Ibrahimi", "Pi ujë Zemzemi", "Bëj Sa'ji nëse nuk e ke bërë", "Pas Sa'jit: dal PLOTËSISHT nga Ihrami!"],
    dua: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    dua_sq: "Rabbena atina fid-dunya hasaneten wa fil-akhirati hasaneten wa qina adhaban-nar."
  },
  {
    num: 9, icon: "🪨", title: "Ditët e Tashrikut (11, 12, 13 Dhul-Hixhe)", arabic: "أيام التشريق",
    description: "Hedh gurë çdo ditë te 3 Xhemrat — qëndro në Minë.",
    location: "Minë — 3 Xhemrat",
    color: "border-teal-200 bg-teal-50/40",
    info: "Ditët 11, 12, 13 — hedh gurë çdo ditë pas dreke. 21 gurë çdo ditë × 3 ditë = 63.",
    details: ["Hedh 7 gurë te Xhemratul Sugra (e vogël)", "Hedh 7 gurë te Xhemratul Vusta (e mesme)", "Hedh 7 gurë te Xhemratul Akabe (e madhe)", "Mund të largohesh ditën 12 (Nafr Awwal)"],
    dua: "اللَّهُ أَكْبَرُ",
    dua_sq: "Allahu Ekber!"
  },
  {
    num: 10, icon: "👋", title: "Tavaful Veda (Lamtumira)", arabic: "طواف الوداع",
    description: "Bëj Tavaful Veda para se të largohesh nga Meka.",
    location: "Mesxhidul Haram — Meka",
    color: "border-gray-200 bg-gray-50/40",
    info: "Tavaful Veda bëhet si e fundit para largimit. Gratë me menstruacione janë të lira.",
    details: ["Bëj 7 rrethe rreth Qabesë", "Fal 2 rekat te Makam Ibrahimi", "Pi ujë Zemzemi", "Shikoje Qabenë me zemër plot falënderim", "Ik me lot — kjo mund të jetë vizita jote e fundit!"],
    dua: "اللَّهُمَّ لَا تَجْعَلْ هَذَا آخِرَ عَهْدِنَا بِبَيْتِكَ الْحَرَامِ",
    dua_sq: "O Allah, mos e bëj këtë vizitën e fundit tonë te Shtëpia Jote e Shenjtë!"
  }
];

export const HOLY_SITES = [
  { emoji: "🕋", name: "Qabeja (البيت الحرام)", desc: "Shtëpia e parë e Allahut e ndërtuar nga Ibrahimi dhe Ismaili ﷺ. Qendra e çdo Tavafit.", color: "border-amber-300 bg-amber-50" },
  { emoji: "⚫", name: "Haxharul Esved (Guri i Zezë)", desc: "Guri i Zezë i vendosur në këndin lindor. Ka zbritur nga Xhenneti.", color: "border-gray-300 bg-gray-50" },
  { emoji: "👣", name: "Makam Ibrahimi", desc: "Guri ku qëndroi Ibrahimi ﷺ gjatë ndërtimit. Falen 2 rekat sunet pas Tavafi.", color: "border-yellow-300 bg-yellow-50" },
  { emoji: "💧", name: "Pusi i Zemzemit", desc: "Uji i bekuar i shpuar nga Xhibrili për Haxheren dhe Ismailin. Rrjedh 4000+ vite.", color: "border-blue-300 bg-blue-50" },
  { emoji: "🌄", name: "Fusha e Arafatit", desc: "Shtylla kryesore e Haxhit. 'Haxhi është Arafati' — Dita e 9 Dhul-Hixhe.", color: "border-orange-300 bg-orange-50" },
  { emoji: "🌙", name: "Muzdelifa (المزدلفة)", desc: "'Mash'ar al-Haram'. Ku haxhilerët flen nën qiell dhe mbledhin gurë.", color: "border-indigo-300 bg-indigo-50" },
  { emoji: "🏕️", name: "Minë (منى)", desc: "Qyteti i çadrave. Qëndrim 3-4 ditë. 3 Xhemrat për hedhjen e gurëve.", color: "border-green-300 bg-green-50" },
  { emoji: "⛰️", name: "Shpella Hira", desc: "Vendi ku i zbriti Revelata e parë — Sure Al-Alaq. Mbi Xhebel Nur.", color: "border-purple-300 bg-purple-50" },
  { emoji: "🕌", name: "Mesxhidul Haram", desc: "Xhamia më e madhe në botë — rreth Qabesë. Namazi vlen 100,000 herë.", color: "border-emerald-300 bg-emerald-50" },
  { emoji: "🌿", name: "Safa dhe Merva", desc: "Dy kodrat mes të cilave Haxherja vrapoi duke kërkuar ujë.", color: "border-teal-300 bg-teal-50" }
];

export const QUIZ_QUESTIONS = [
  { q: "Sa hapa ka Umra?", options: ["3", "4", "6", "5"], correct: "5" },
  { q: "Shtylla kryesore e Haxhit?", options: ["Tavafi", "Sa'ji", "Ihrami", "Qëndrimi në Arafat"], correct: "Qëndrimi në Arafat" },
  { q: "Sa herë rrotullohet Qabeja (Tavafi)?", options: ["5", "6", "8", "7"], correct: "7" },
  { q: "Cila ditë është 'Dita e Arafatit'?", options: ["7 Dhul-Hixhe", "8 Dhul-Hixhe", "10 Dhul-Hixhe", "9 Dhul-Hixhe"], correct: "9 Dhul-Hixhe" },
  { q: "Sa ecje ka Sa'ji?", options: ["5", "6", "8", "7"], correct: "7" },
  { q: "Ku mblidhen gurët për Xhemrat?", options: ["Mina", "Arafat", "Meka", "Muzdelifa"], correct: "Muzdelifa" },
  { q: "Sa gurë hidhen në Xhemratul Akabe ditën e parë?", options: ["3", "5", "10", "7"], correct: "7" },
  { q: "Nga fillon Sa'ji?", options: ["Merva", "Qabeja", "Makam Ibrahimi", "Safa"], correct: "Safa" },
  { q: "Si quhet Tavafi i fundit para largimit?", options: ["Tavafi i Kudum", "Tavafi i Ifadës", "Tavafi i Rritjes", "Tavafi i Vedas"], correct: "Tavafi i Vedas" },
  { q: "Ihrama hyjnë nga:", options: ["Qabeja", "Safa", "Miqati", "Arafati"], correct: "Miqati" },
  { q: "Sa nate qëndrojnë haxhilerët në Minë?", options: ["1 natë", "2 netë", "4 netë", "3 netë"], correct: "3 netë" },
  { q: "Ditët e Tashrikut janë:", options: ["7,8,9 Dhul-Hixhe", "9,10,11 Dhul-Hixhe", "11,12,13 Dhul-Hixhe", "10,11,12 Dhul-Hixhe"], correct: "11,12,13 Dhul-Hixhe" },
  { q: "Qabeja ndodhet në:", options: ["Medine", "Arafat", "Mina", "Meke"], correct: "Meke" },
  { q: "Talbia fillon me:", options: ["Allahu Akbar", "Bismillah", "Subhanallah", "Lebbejk Allahumme Lebbejk"], correct: "Lebbejk Allahumme Lebbejk" },
  { q: "Sa herë bëhet Haxhi gjatë jetës (farz)?", options: ["Çdo vit", "5 herë", "Kurrë", "1 herë (kur të ketë mundësi)"], correct: "1 herë (kur të ketë mundësi)" },
  { q: "Cili qëndrim është SHTYLLA e Haxhit?", options: ["Mina", "Muzdelifa", "Arafati", "Meka"], correct: "Arafati" },
  { q: "Pusi i Zemzemit u shpua për:", options: ["Ibrahimin", "Haxheren dhe Ismailin", "Profet Muhamedin ﷺ", "Makam Ibrahimin"], correct: "Haxheren dhe Ismailin" },
];
