import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Star, CheckCircle, XCircle, Volume2, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ZekatiCalculator from "@/components/fikh/ZekatiCalculator";
import PrayerGuide from "@/components/fikh/PrayerGuide";

const tabs = [
  { id: "akide", label: "🕌 Akide" },
  { id: "pastresia", label: "💧 Pastërtia" },
  { id: "namazi", label: "🤲 Namazi" },
  { id: "namazguide", label: "🕌 Udhëzuesi" },
  { id: "agjrimi", label: "🌙 Agjërimi" },
  { id: "zekati", label: "💰 Zekati" },
  { id: "duate", label: "🌿 Duatë" },
  { id: "kuiz", label: "🎯 Kuiz" },
];

/* ─── AKIDE ─── */
const akideTopics = [
  { title: "Besimi në Allah", icon: "☝️", points: ["Allahu është Një (Teuhid)", "Ai është Krijuesi i çdo gjëje", "Ai ka Emrat dhe Cilësitë më të bukura", "Nuk i ngjason asgjëje: «Lejse kemithlihi shej'un»"] },
  { title: "Besimi në Engjëjt", icon: "👼", points: ["Krijuar nga drita (nuri)", "Nuk kanë gjini, nuk hanë e nuk pinë", "Xhibrili – sillte Shpalljen", "Mikaili – shpërndan furnizimin", "Israfili – fryn në Sur"] },
  { title: "Besimi në Librat", icon: "📖", points: ["Teurati – Musait a.s.", "Zeburi – Davudit a.s.", "Inxhili – Isait a.s.", "Kur'ani – Muhamedit ﷺ (i fundit, i ruajtur)"] },
  { title: "Besimi në Profetët", icon: "🕊️", points: ["124,000 profetë (sipas disa transmetimeve)", "25 përmenden në Kur'an", "Muhamedi ﷺ është vula e profetëve", "Të gjithë thirrën në Teuhid"] },
  { title: "Besimi në Ditën e Fundit", icon: "⚖️", points: ["Jeta e varrit (Berzahu)", "Ringjallja dhe tubimi", "Peshorja e veprave (Mizani)", "Xheneti dhe Xhehenemi"] },
  { title: "Besimi në Kaderin", icon: "📝", points: ["Allahu di çdo gjë para se të ndodhë", "Çdo gjë është shkruar në Lehvi Mahfudh", "Asgjë nuk ndodh pa vullnetin e Tij", "Njeriu ka përgjegjësi për zgjedhjet e veta"] },
];

/* ─── PASTËRTIA ─── */
const abdestSteps = [
  { step: 1, title: "Nijeti", desc: "Bëj nijet me zemër për abdes.", icon: "💭" },
  { step: 2, title: "Larja e duarve", desc: "Laj duart 3 herë deri te kyçet.", icon: "🤲" },
  { step: 3, title: "Shpëlarja e gojës", desc: "Fut ujë në gojë dhe shpëlaje 3 herë (Madmada).", icon: "👄" },
  { step: 4, title: "Shpëlarja e hundës", desc: "Tërhiq ujë në hundë dhe pastro 3 herë (Istinshak).", icon: "👃" },
  { step: 5, title: "Larja e fytyrës", desc: "Laj fytyrën 3 herë nga veshi në vesh, nga balli deri nën mjekër.", icon: "😊" },
  { step: 6, title: "Larja e krahëve", desc: "Laj krahun e djathtë pastaj të majtën, 3 herë secilën, deri mbi bërryl.", icon: "💪" },
  { step: 7, title: "Mes'hi i kokës", desc: "Lago duart dhe fërko kokën nga para-prapa një herë.", icon: "🧕" },
  { step: 8, title: "Mes'hi i veshëve", desc: "Fërko brendësinë dhe jashtësinë e veshëve.", icon: "👂" },
  { step: 9, title: "Larja e këmbëve", desc: "Laj këmbën e djathtë pastaj të majtën, 3 herë secilën, deri mbi nyje.", icon: "🦶" },
];

/* ─── NAMAZI ─── */
const namazet = [
  { name: "Sabahu (Fexhri)", time: "Para lindjes së diellit", farz: 2, sunet: 2, icon: "🌅" },
  { name: "Dreka (Dhuhr)", time: "Kur dielli kalon zenitin", farz: 4, sunet: 6, icon: "☀️" },
  { name: "Ikindia (Asr)", time: "Kur hija bëhet sa objekti", farz: 4, sunet: 0, icon: "🌤️" },
  { name: "Akshami (Magrib)", time: "Pas perëndimit të diellit", farz: 3, sunet: 2, icon: "🌅" },
  { name: "Jacia (Isha)", time: "Kur errësira mbizotëron", farz: 4, sunet: 4, icon: "🌙" },
];

const namazSteps = [
  "Qëndro drejt kah Kibleja (Kijam)",
  "Thuaj «Allahu Ekber» duke ngritur duart (Tekbiri fillestar)",
  "Lexo Fatihanë dhe një sure",
  "Bëj Rukunë – përkulje duke thënë «Subhane Rabijel-Adhim» 3 herë",
  "Ngrihu nga Rukuja – «Semi'Allahu limen hamideh, Rabbena lekel-hamd»",
  "Bëj Sexhde – «Subhane Rabijel-A'la» 3 herë",
  "Ul mes dy sexhdeve – «Rabbigfirli» 2 herë",
  "Bëj sexhden e dytë",
  "Në uljen e fundit lexo Ettehijatin, salavatin dhe bëj selam",
];

/* ─── AGJËRIMI ─── */
const agjerimRules = [
  { title: "Kushtet e Agjërimit", items: ["Të jesh musliman", "I rritur (puberteti)", "I shëndoshë mendërisht", "I aftë fizikisht", "Vendas (jo udhëtar i gjatë)"] },
  { title: "Çka e prish Agjërimin", items: ["Ngrënia dhe pirja me qëllim", "Marrëdhëniet intime", "Vjellja me qëllim", "Menstruacionet", "Injeksione ushqyese"] },
  { title: "Çka NUK e prish", items: ["Ngrënia/pirja pa qëllim (harresë)", "Gëlltitja e pështymës", "Injeksione jo-ushqyese", "Misvaku (pastrimi i dhëmbëve)", "Larja dhe notimi"] },
  { title: "Sunetet e Agjërimit", items: ["Syfyri (ngrënia para agimit)", "Iftari sa më shpejt pas perëndimit", "Duaja e iftarit", "Leximi i Kur'anit", "Bamirësia e shtuar"] },
];

/* ─── ZEKATI INFO ─── */
const zekatInfo = [
  { title: "Çka është Zekati?", desc: "Shtylla e 4-t e Islamit. Pastrim i pasurisë duke dhënë 2.5% të pasurisë vjetore." },
  { title: "Kush e jep?", desc: "Çdo musliman i lirë që posedon nisabin (pragun minimal) për një vit hënor." },
  { title: "Nisabi", desc: "Ekuivalenti i 85g ari ose 595g argjend. Llogarit vlerën aktuale." },
  { title: "Kujt i jepet?", desc: "8 kategori: Të varfrit, Nevojtarët, Mbledhësit e zekatit, Ata që duhen afruar me Islam, Robërit, Borxhlinjtë, Në rrugën e Allahut, Udhëtarët." },
];

/* ─── DUATË ─── */
const duate = [
  { title: "Duaja para ngrënies", arabic: "بِسْمِ اللَّهِ", trans: "Bismilah", meaning: "Me emrin e Allahut.", category: "ushqim" },
  { title: "Duaja pas ngrënies", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ", trans: "Elhamdu lil-lahil-ledhi at'ameni hadha ve razekanihi min gajri havlin minni ve la kuvveh", meaning: "Lavdërimi i takon Allahut që më ushqeu me këtë dhe ma furnizoi pa fuqi e forcë nga ana ime.", category: "ushqim" },
  { title: "Duaja para gjumit", arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", trans: "Bismike Allahumme emutu ve ahja", meaning: "Me emrin Tënd, o Allah, vdes dhe jetoj.", category: "gjumi" },
  { title: "Duaja e zgjimit", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", trans: "Elhamdu lil-lahil-ledhi ahjana ba'de ma ematena ve ilejhin-nushur", meaning: "Lavdërimi i takon Allahut që na ringjalli pasi na bëri të vdekur, dhe tek Ai është kthimi.", category: "gjumi" },
  { title: "Duaja e hyrjes në xhami", arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", trans: "Allahummeftah li ebvabe rahmetik", meaning: "O Allah, m'i hap dyert e mëshirës Sate.", category: "xhami" },
  { title: "Duaja e daljes nga xhaminë", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", trans: "Allahumme inni es'eluke min fadlik", meaning: "O Allah, të lutem nga mirësia Jote.", category: "xhami" },
  { title: "Duaja e udhëtimit", arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ", trans: "Subhanel-ledhi sehhare lena hadha ve ma kunna lehu mukrinin", meaning: "I Lartësuar është Ai që na nënshtroi këtë, dhe ne nuk do kishim mundur ta bënim.", category: "udhetim" },
  { title: "Istigfari", arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ", trans: "Estagfirullahel-adhim el-ledhi la ilahe il-la huvel-hajjul-kajjum ve etubu ilejh", meaning: "I kërkoj falje Allahut të Madhërishëm, përveç të Cilit nuk ka zot tjetër, i Gjalli, Mbikëqyrësi, dhe pendohem tek Ai.", category: "dhikr" },
  { title: "Duaja e hyrjes në shtëpi", arabic: "بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى رَبِّنَا تَوَكَّلْنَا", trans: "Bismil-lahi velexhna ve bismil-lahi harexhna ve ala Rabbina tevekkelna", meaning: "Me emrin e Allahut hymë, me emrin e Allahut dalim, dhe tek Zoti ynë mbështetemi.", category: "shtepi" },
  { title: "Duaja kur bie shi", arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا", trans: "Allahumme sajjiben nafi'an", meaning: "O Allah, bëje shi të dobishëm!", category: "natyra" },
  { title: "Duaja kur dëgjon bubullimën", arabic: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلاَئِكَةُ مِنْ خِيفَتِهِ", trans: "Subhanel-ledhi juseb-bihur-ra'du bihamdihi vel-melaaiketu min khifetihi", meaning: "I Lartësuar është Ai të Cilit ia bën tesbih bubullima dhe engjëjt nga frika ndaj Tij.", category: "natyra" },
  { title: "Duaja e veshjes së rrobës", arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ", trans: "Elhamdu lil-lahil-ledhi kesani hadha ve razekanihi", meaning: "Lavdërimi i takon Allahut që më veshi me këtë dhe ma furnizoi.", category: "shtepi" },
  { title: "Duaja para abdesit", arabic: "بِسْمِ اللَّهِ", trans: "Bismilah", meaning: "Me emrin e Allahut (para fillimit të abdesit).", category: "namaz" },
  { title: "Duaja pas abdesit", arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", trans: "Esh-hedu en la ilahe il-lAllah vahdahu la sherike leh ve esh-hedu enne Muhammeden abduhu ve resuluhu", meaning: "Dëshmoj se nuk ka zot tjetër përveç Allahut, Një e pa shok, dhe dëshmoj se Muhamedi është robi dhe i dërguari i Tij.", category: "namaz" },
  { title: "Duaja e brengosjes", arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ", trans: "La ilahe il-la ente subhaneke inni kuntu minez-dhalimin", meaning: "Nuk ka zot përveç Teje! I Lartësuar je! Me të vërtetë, unë isha prej zullumqarëve.", category: "sprova" },
  { title: "Duaja kur frikësohesh", arabic: "اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ وَنَعُوذُ بِكَ مِنْ شُرُورِهِمْ", trans: "Allahumme inna nexh'aluke fi nuhurihim ve ne'udhu bike min shururihim", meaning: "O Allah, Ty të vendosim para tyre dhe kërkojmë mbrojtje nga e keqja e tyre.", category: "sprova" },
  { title: "Duaja e pasqyrës", arabic: "اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي", trans: "Allahumme ente hassente khalki fehassin khuluki", meaning: "O Allah, Ti e bëre të bukur pamjen time, bëje të bukur edhe moralin tim.", category: "shtepi" },
  { title: "Duaja e hyrjes në tualet", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ", trans: "Allahumme inni e'udhu bike minel-khubuthi vel-khabaith", meaning: "O Allah, kërkoj mbrojtje nga shejtanët meshkuj dhe femra.", category: "shtepi" },
  { title: "Duaja e daljes nga tualeti", arabic: "غُفْرَانَكَ", trans: "Ghufraneke", meaning: "Kërkoj faljen Tënde.", category: "shtepi" },
  { title: "Seyyidul Istigfar", arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ", trans: "Allahumme ente Rabbi la ilahe il-la ente khalakteni ve ene abduk...", meaning: "O Allah, Ti je Zoti im, nuk ka zot tjetër përveç Teje, Ti më krijove dhe unë jam robi Yt...", category: "dhikr" },
  { title: "Duaja kur shikon hënën e re", arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ", trans: "Allahumme ehillehu alejna bil-jumni vel-imani ves-selameti vel-islam", meaning: "O Allah, na e shfaq me begati, besim, siguri dhe Islam!", category: "natyra" },
  { title: "Duaja e sëmundjes", arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِ أَنْتَ الشَّافِي", trans: "Allahumme Rabben-nasi edh-hibil-be'se ishfi entes-shafi", meaning: "O Allah, Zoti i njerëzve, largo vuajtjen, shëro — Ti je Shëruesi.", category: "sprova" },
  { title: "Duaja për prindërit", arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا", trans: "Rabbir-hamhuma kema rabbejaani saghira", meaning: "Zoti im, mëshiroi ata siç më rritën kur isha i vogël.", category: "familje" },
  { title: "Duaja e mëngjesit", arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ", trans: "Esbahna ve esbahal-mulku lillah", meaning: "Gdhirëm dhe sundimi i përket Allahut.", category: "dhikr" },
  { title: "Duaja e mbrëmjes", arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ", trans: "Emsejna ve emsel-mulku lillah", meaning: "Ngrysëm dhe sundimi i përket Allahut.", category: "dhikr" },
];

/* ─── KUIZ ─── */
const fikhQuiz = [
  { q: "Sa janë shtyllat e Islamit?", options: ["3", "5", "7", "4"], correct: 1 },
  { q: "Sa herë lahet fytyra gjatë abdesit?", options: ["1 herë", "2 herë", "3 herë", "4 herë"], correct: 2 },
  { q: "Sa rekate farz ka namazi i Sabahut?", options: ["2", "3", "4", "1"], correct: 0 },
  { q: "Cili muaj është muaji i agjërimit?", options: ["Shaban", "Ramazan", "Sheval", "Dhul-Hixhe"], correct: 1 },
  { q: "Sa përqind është Zekati?", options: ["1%", "5%", "2.5%", "10%"], correct: 2 },
  { q: "Sa janë shtyllat e Imanit?", options: ["5", "6", "7", "4"], correct: 1 },
  { q: "Cili engjëll sillte Shpalljen?", options: ["Mikaili", "Israfili", "Xhibrili", "Azraili"], correct: 2 },
  { q: "Sa namaze farz ka brenda ditës?", options: ["3", "4", "5", "6"], correct: 2 },
  { q: "Çfarë e prish agjërimin?", options: ["Misvaku", "Ngrënia me qëllim", "Gëlltitja e pështymës", "Larja"], correct: 1 },
  { q: "Sa kategori përfitojnë nga Zekati?", options: ["5", "6", "8", "10"], correct: 2 },
  { q: "Cila është shtylla e parë e Islamit?", options: ["Namazi", "Agjërimi", "Shehadeti", "Haxhi"], correct: 2 },
  { q: "Sa rekate farz ka namazi i Drekës?", options: ["2", "3", "4", "5"], correct: 2 },
  { q: "Çka është Gusli?", options: ["Larja e duarve", "Abdesi", "Larja e plotë e trupit", "Tejemumi"], correct: 2 },
  { q: "Kur bëhet Tejemumi?", options: ["Çdo ditë", "Kur nuk ka ujë", "Para gjumit", "Pas ngrënies"], correct: 1 },
  { q: "Sa rekate farz ka Akshami?", options: ["2", "3", "4", "5"], correct: 1 },
  { q: "Çka është Nisabi i arit?", options: ["50g", "72g", "85g", "100g"], correct: 2 },
  { q: "Çka lexohet në çdo rekat të namazit?", options: ["Ajetu-l-Kursi", "El-Fatiha", "El-Ihlas", "Et-Tehijatu"], correct: 1 },
  { q: "Sa herë në ditë bëhet ezani?", options: ["3", "4", "5", "6"], correct: 2 },
  { q: "Çka është Sadakatu-l-Fitri?", options: ["Zekat i zakonshëm", "Lëmoshë e Bajramit", "Kurban", "Hadije"], correct: 1 },
  { q: "Sa ditë zgjat agjërimi i Ramazanit?", options: ["28", "29 ose 30", "31", "25"], correct: 1 },
];

function speakArabic(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.5;
  window.speechSynthesis.speak(u);
}

export default function Fikh() {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "akide";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <Star className="w-4 h-4" />
          Bazat e Fesë
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          <span className="text-gradient">Fikh Elementar</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Mëso bazat e besimit, namazit, agjërimit, zekatit dhe duave të përditshme.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border text-foreground/70 hover:border-primary/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "akide" && <AkideTab key="akide" />}
        {activeTab === "pastresia" && <PastresiaTab key="pastresia" />}
        {activeTab === "namazi" && <NamaziTab key="namazi" />}
        {activeTab === "namazguide" && <PrayerGuide key="namazguide" />}
        {activeTab === "agjrimi" && <AgjrimiTab key="agjrimi" />}
        {activeTab === "zekati" && <ZekatiTabFull key="zekati" />}
        {activeTab === "duate" && <DuateTab key="duate" />}
        {activeTab === "kuiz" && <KuizTab key="kuiz" />}
      </AnimatePresence>
    </div>
  );
}

function AkideTab() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <h2 className="text-xl font-bold text-foreground mb-4">☝️ Shtyllat e Imanit (Besimit)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {akideTopics.map((topic, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{topic.icon}</span>
              <h3 className="font-bold text-foreground">{topic.title}</h3>
            </div>
            {expanded === i && (
              <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 space-y-1.5">
                {topic.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-primary mt-0.5">•</span> {p}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function PastresiaTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <h2 className="text-xl font-bold text-foreground mb-4">💧 Hapat e Abdesit</h2>
      {abdestSteps.map((s) => (
        <div key={s.step} className="glass-card rounded-2xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
            {s.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{s.step}</span>
              <h3 className="font-bold text-foreground text-sm">{s.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function NamaziTab() {
  const [showSteps, setShowSteps] = useState(false);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-xl font-bold text-foreground mb-4">🤲 Pesë Namazet Ditore</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {namazet.map((n, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 text-center">
            <span className="text-3xl block mb-2">{n.icon}</span>
            <h3 className="font-bold text-foreground text-sm mb-1">{n.name}</h3>
            <p className="text-xs text-muted-foreground mb-3">{n.time}</p>
            <div className="flex justify-center gap-3">
              <div className="text-center">
                <p className="text-lg font-bold text-primary">{n.farz}</p>
                <p className="text-[10px] text-muted-foreground">Farz</p>
              </div>
              {n.sunet > 0 && (
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground/60">{n.sunet}</p>
                  <p className="text-[10px] text-muted-foreground">Sunet</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowSteps(!showSteps)}
        className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium mb-4"
      >
        {showSteps ? "Fshih hapat" : "🕌 Si falet namazi? — Shiko hapat"}
      </button>

      {showSteps && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-6 space-y-3">
          {namazSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <p className="text-sm text-foreground/80 pt-1">{step}</p>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

function AgjrimiTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-xl font-bold text-foreground mb-4">🌙 Agjërimi (Ramazani)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {agjerimRules.map((section, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="text-primary mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ZekatiTabFull() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <h2 className="text-xl font-bold text-foreground mb-4">💰 Zekati</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {zekatInfo.map((z, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <h3 className="font-bold text-primary mb-2">{z.title}</h3>
            <p className="text-sm text-foreground/80">{z.desc}</p>
          </div>
        ))}
      </div>
      <ZekatiCalculator />
    </motion.div>
  );
}

function DuateTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
      <h2 className="text-xl font-bold text-foreground mb-4">🌿 Duatë e Përditshme</h2>
      {duate.map((dua, i) => (
        <div key={i} className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-primary">{dua.title}</h3>
            <button
              onClick={() => speakArabic(dua.arabic)}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xl md:text-2xl text-foreground font-arabic text-right leading-loose mb-3" dir="rtl">
            {dua.arabic}
          </p>
          <p className="text-sm text-primary/80 italic mb-2">{dua.trans}</p>
          <div className="bg-secondary/50 rounded-xl p-3">
            <p className="text-sm text-foreground/80">🇦🇱 {dua.meaning}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function KuizTab() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(20);
  const [answers, setAnswers] = useState<boolean[]>([]);

  React.useEffect(() => {
    if (finished || selected !== null) return;
    if (timer <= 0) {
      handleAnswer(-1);
      return;
    }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, finished, selected]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === fikhQuiz[current].correct;
    if (correct) setScore((s) => s + 1);
    setAnswers(a => [...a, correct]);
    setTimeout(() => {
      if (current + 1 < fikhQuiz.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setTimer(20);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setTimer(20);
    setAnswers([]);
  };

  if (finished) {
    const pct = Math.round((score / fikhQuiz.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-2">🏆 Kuizi Përfundoi!</h2>
        <p className="text-4xl font-extrabold text-primary mb-2">{score}/{fikhQuiz.length}</p>
        <p className="text-muted-foreground mb-2">{pct}% saktë</p>
        <div className="flex justify-center gap-1 mb-4 flex-wrap">
          {answers.map((a, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${a ? "bg-green-500" : "bg-red-400"}`} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {pct >= 90 ? "Shkëlqyeshëm! 🌟" : pct >= 70 ? "Shumë mirë! 📚" : pct >= 50 ? "Jo keq, provo përsëri! 💪" : "Mëso më shumë dhe provo përsëri! 📖"}
        </p>
        <button onClick={restart} className="px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-bold">
          🔄 Fillo Përsëri
        </button>
      </motion.div>
    );
  }

  const q = fikhQuiz[current];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">Pyetja {current + 1}/{fikhQuiz.length}</span>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
          timer <= 5 ? "bg-destructive/10 text-destructive animate-pulse" : "bg-primary/10 text-primary"
        }`}>
          <Timer className="w-3 h-3" />
          {timer}s
        </div>
        <span className="text-sm font-bold text-primary">✓ {score}</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2 mb-6">
        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((current + 1) / fikhQuiz.length) * 100}%` }} />
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">{q.q}</h3>
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let cls = "glass-card border border-border text-foreground hover:border-primary/50";
            if (selected !== null) {
              if (i === q.correct) cls = "bg-green-500/10 border-green-500 text-green-700";
              else if (i === selected) cls = "bg-red-500/10 border-red-400 text-red-600";
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${cls}`}
              >
                <span className="w-7 h-7 shrink-0 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
                {selected !== null && i === q.correct && <CheckCircle className="w-4 h-4 ml-auto text-green-600" />}
                {selected !== null && i === selected && i !== q.correct && <XCircle className="w-4 h-4 ml-auto text-red-500" />}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}