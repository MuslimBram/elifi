import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapPin, Volume2, CheckCircle, XCircle, Trophy, RotateCcw, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "umra", label: "🕋 Umra" },
  { id: "haxhi", label: "🏔️ Haxhi" },
  { id: "vendet", label: "🗺️ Vendet e Shenjta" },
  { id: "duate", label: "📖 Duatë" },
  { id: "kuiz", label: "🎯 Kuiz" },
];

const umraSteps = [
  { step: 1, title: "Ihrami", desc: "Veshja e Ihramit dhe nijeti për Umra. Thuaj: «Lebbejke Allahumme Umra».", icon: "🧕", details: "Lahu (gusli) para veshjes. Burrat veshin dy copa të bardha pa qepje. Gratë veshin rroba normale modeste." },
  { step: 2, title: "Tavafi (7 rrotullime)", desc: "Rrotullohu rreth Qabesë 7 herë duke filluar nga Guri i Zi.", icon: "🕋", details: "Fillo nga këndi i Gurit të Zi. Ecë në drejtim të kundërt të akrepave. Në çdo rrotullim bëj dua." },
  { step: 3, title: "Namazi 2 rekate pas Tavafit", desc: "Fal 2 rekate pas Mekamit të Ibrahimit.", icon: "🤲", details: "Lexo suren El-Kafirun në rekatin e parë dhe El-Ihlas në të dytin." },
  { step: 4, title: "Sa'ji (Safa – Merva)", desc: "Ec 7 herë mes kodrave Safa dhe Merva.", icon: "🏃", details: "Fillo nga Safa. Burrat vrapojnë lehtë mes dy shenjave të gjelbra. Bëj dua në majë të çdo kodre." },
  { step: 5, title: "Rruajtja / Shkurtimi", desc: "Burrat rruajnë ose shkurtojnë flokët. Gratë shkurtojnë sa një gishtërinj.", icon: "✂️", details: "Rruajtja është më e vlefshme por edhe shkurtimi lejohet. Pas kësaj, Umra ka përfunduar." },
];

const hajjSteps = [
  { step: 1, title: "Ihrami (8 Dhul-Hixhe)", desc: "Vesh Ihramin dhe bëj nijet për Haxh nga Mikati.", icon: "🧕", details: "Thuaj: «Lebbejke Allahumme Haxhen». Shko në Mina pas Ihramit." },
  { step: 2, title: "Dita në Mina (8 Dhul-Hixhe)", desc: "Qëndro në Mina dhe fal namazet e shkurtuara.", icon: "⛺", details: "Fal Dhuhr, Asr, Magrib, Isha (të shkurtuara) dhe Fexhr." },
  { step: 3, title: "Arafati (9 Dhul-Hixhe)", desc: "Qëndro në Arafat nga dreka deri në perëndim. Dita më e rëndësishme!", icon: "🏔️", details: "Bëj shumë dua dhe dhikër. Fal Dhuhr dhe Asr bashkë (të shkurtuara). Kjo është shtylla e Haxhit." },
  { step: 4, title: "Muzdelife (Nata 9→10)", desc: "Shko në Muzdelife pas perëndimit. Fal Magrib e Isha bashkë.", icon: "🌙", details: "Mblidh 49-70 guralecë për gjuajtjen e shtyllave. Qëndro deri pas Fexhrit." },
  { step: 5, title: "Gjuajtja e Xhemres (10 Dhul-Hixhe)", desc: "Gjuaj 7 guralecë në shtyllën e madhe (Xhemretul-Akabe).", icon: "🎯", details: "Thuaj «Bismilah, Allahu Ekber» me çdo guralec." },
  { step: 6, title: "Kurbani (10 Dhul-Hixhe)", desc: "Ther kurbanin pas gjuajtjes.", icon: "🐑", details: "Mund të autorizosh dikë tjetër për therjen. Pastaj rruaj ose shkurto flokët." },
  { step: 7, title: "Tavafi i Ifadas", desc: "Tavafi rreth Qabesë — shtylla e Haxhit.", icon: "🕋", details: "Bëj Tavafin e Ifadas dhe Sa'jin. Pas kësaj, të gjitha ndalesat e Ihramit hiqen." },
  { step: 8, title: "Ditët e Teshrikut (11-13)", desc: "Qëndro në Mina. Gjuaj 3 shtyllat çdo ditë.", icon: "⛺", details: "Gjuaj secilën shtyllë me 7 guralecë. Mund të largohesh ditën e 12-të nëse nxiton." },
  { step: 9, title: "Tavafi i Lamtumirës", desc: "Tavafi i fundit para largimit nga Meka.", icon: "👋", details: "Ky është Tavafi i fundit. Bëj dua dhe largo me zemër të pastër." },
];

const holyPlaces = [
  { name: "Qabeja (الكعبة)", desc: "Shtëpia e parë e ndërtuar për adhurimin e Allahut. Drejtimi i Kibles për 1.8 miliardë muslimanë.", icon: "🕋", details: "Ndërtuar nga Ibrahimi a.s. dhe Ismaili a.s. Guri i Zi ndodhet në këndin lindor. Tavafi bëhet 7 herë." },
  { name: "Guri i Zi (الحجر الأسود)", desc: "Guri i shenjtë në këndin lindor të Qabesë.", icon: "⚫", details: "Erdhi nga Xheneti. Profeti ﷺ e puth gjatë Tavafit. Sot ndodhet i copëtuar në kornizë argjendi." },
  { name: "Mekam Ibrahimi (مقام إبراهيم)", desc: "Guri ku qëndroi Ibrahimi a.s. gjatë ndërtimit të Qabesë.", icon: "👣", details: "Pas Tavafit falen 2 rekate pas Mekam Ibrahimit." },
  { name: "Safa dhe Merva", desc: "Dy kodra mes të cilave bëhet Sa'ji (7 herë).", icon: "⛰️", details: "Haxherja (nëna e Ismailit) vrapoi mes tyre duke kërkuar ujë. Allahu nxori ujin Zemzem." },
  { name: "Pusi Zemzem (زمزم)", desc: "Burimi i shenjtë brenda Haremit.", icon: "💧", details: "Uji i Zemzemit doli kur Ismaili i vogël u preh me thembrat. Pija me nijet dhe dua." },
  { name: "Mina", desc: "Lugina ku haxhilerët qëndrojnë në ditët 8, 10-13 Dhul-Hixhe.", icon: "⛺", details: "Quhet 'Qyteti i Çadrave'. Gjuajtja e Xhemrateve bëhet këtu." },
  { name: "Fusha e Arafatit", desc: "Vendi ku mbahet qëndrimi kryesor i Haxhit (9 Dhul-Hixhe).", icon: "🏔️", details: "Profeti ﷺ tha: «Haxhi është Arafat». Hutbja e Lamtumirës u mbajt këtu." },
  { name: "Muzdelife", desc: "Vendi mes Arafatit dhe Minës ku natohet pas Arafatit.", icon: "🌙", details: "Fal Magrib + Isha bashkë. Mblidh guralecë për gjuajtjen e shtyllave." },
  { name: "Xhemrat (Shtyllat)", desc: "Tre shtyllat e gjuajtjes me guralecë në Mina.", icon: "🎯", details: "Xhemretul-Akabe (e madhe) gjuhet ditën e 10-të. Tre shtyllat gjuhen ditët 11-13." },
  { name: "Xhamia e Profetit ﷺ (Medine)", desc: "Xhamia e dytë e shenjtë në Islam, në Medinë.", icon: "🕌", details: "Një namaz këtu barazohet me 1000 namaze. Varri i Profetit ﷺ ndodhet brenda." },
];

const duas = [
  { title: "Duaja e Ihramit (Telbija)", arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ", transliteration: "Lebbejke Allahumme lebbejk, lebbejke la sherike leke lebbejk, innel-hamde ven-ni'mete leke vel-mulk, la sherike lek.", meaning: "Të përgjigjem o Allah, të përgjigjem! Ti nuk ke shok. Lavdërimi, mirësia dhe sundimi të takojnë Ty." },
  { title: "Duaja mes Rukn Jemanit dhe Gurit të Zi", arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", transliteration: "Rabbena atina fid-dunja haseneten ve fil-ahireti haseneten ve kina adhaben-nar.", meaning: "Zoti ynë, na jep të mira në këtë botë dhe në botën tjetër, dhe na ruaj nga dënimi i zjarrit." },
  { title: "Duaja në Safa dhe Merva", arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ", transliteration: "Innes-Safa vel-Mervete min she'airillah.", meaning: "Safa dhe Merva janë nga shenjat e Allahut." },
  { title: "Duaja në Arafat", arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", transliteration: "La ilahe il-lAllahu vahdehu la sherike lehu, lehul-mulku ve lehul-hamdu ve huve ala kul-li shej'in kadir.", meaning: "Nuk ka zot tjetër përveç Allahut, Një dhe i Vetëm, pa shok." },
  { title: "Duaja pas Tavafit", arabic: "وَاتَّخِذُوا مِنْ مَقَامِ إِبْرَاهِيمَ مُصَلًّى", transliteration: "Vet-tehidhu min mekam-i Ibrahime musel-la.", meaning: "Merreni vendin e Ibrahimit si vend faljeje." },
  { title: "Duaja kur sheh Qaben", arabic: "اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً", transliteration: "Allahumme zid hadha-l-bejte teshrifen ve ta'dhimen ve tekrimen ve mehabeten", meaning: "O Allah, shtoja kësaj Shtëpie nderim, madhërim, respekt dhe frikërespekt." },
];

const quizQuestions = [
  { q: "Sa herë rrotullohesh rreth Qabesë gjatë Tavafit?", options: ["3", "5", "7", "10"], correct: 2 },
  { q: "Ku bëhet Sa'ji?", options: ["Rreth Qabesë", "Mes Safa-Merva", "Në Arafat", "Në Mina"], correct: 1 },
  { q: "Cila ditë quhet 'Dita e Arafatit'?", options: ["8 Dhul-Hixhe", "9 Dhul-Hixhe", "10 Dhul-Hixhe", "11 Dhul-Hixhe"], correct: 1 },
  { q: "Çfarë thuhet gjatë Telbijës?", options: ["Subhanallah", "Lebbejke Allahumme lebbejk", "Allahu Ekber", "Estagfirullah"], correct: 1 },
  { q: "Sa hapa ka Umra?", options: ["3", "5", "7", "9"], correct: 1 },
  { q: "Çfarë vesh burri gjatë Ihramit?", options: ["Rroba normale", "Dy copa të bardha pa qepje", "Vetëm pantallona", "Uniformë"], correct: 1 },
  { q: "Ku ndodhet Guri i Zi?", options: ["Në Medine", "Në këndin lindor të Qabesë", "Në Arafat", "Në Muzdelife"], correct: 1 },
  { q: "Sa guralecë gjuhen ditën e parë të gjuajtjes?", options: ["3", "5", "7", "10"], correct: 2 },
  { q: "Çfarë bëhet pas Tavafit?", options: ["Sa'ji", "2 rekate namaz", "Rruajtja", "Gjuajtja"], correct: 1 },
  { q: "Ku u mbajt Hutbja e Lamtumirës?", options: ["Në Mina", "Në Arafat", "Në Medine", "Në Mekë"], correct: 1 },
  { q: "Çfarë është Zemzemi?", options: ["Lumi i Mekës", "Burim i shenjtë uji", "Mal i shenjtë", "Porta e Qabesë"], correct: 1 },
  { q: "Sa herë ecet mes Safa-Merva?", options: ["3", "5", "7", "9"], correct: 2 },
  { q: "Cili ndërtoi Qaben?", options: ["Muhamedi ﷺ", "Ibrahimi a.s. dhe Ismaili a.s.", "Nuh a.s.", "Musa a.s."], correct: 1 },
  { q: "Kur bëhet Tavafi i Lamtumirës?", options: ["Ditën e parë", "Para largimit nga Meka", "Pas Arafatit", "Gjatë Sa'jit"], correct: 1 },
  { q: "Çfarë është Mekam Ibrahimi?", options: ["Një kodër", "Guri ku qëndroi Ibrahimi a.s.", "Porta e Qabesë", "Një burim uji"], correct: 1 },
];

function speakArabic(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.45;
  window.speechSynthesis.speak(u);
}

export default function UmraHajj() {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "umra";
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
          <MapPin className="w-4 h-4" />
          Udhëzues i Plotë
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          <span className="text-gradient">Umra & Haxhi</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Mëso hapat e Umras dhe Haxhit, duatë e rëndësishme dhe vendet e shenjta.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setExpandedStep(null); }}
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

      {/* Umra Steps */}
      {activeTab === "umra" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">🕋 Hapat e Umras</h2>
          {umraSteps.map((s) => (
            <div key={s.step} className="glass-card rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all" onClick={() => setExpandedStep(expandedStep === s.step ? null : s.step)}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">{s.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Hapi {s.step}</span>
                    <h3 className="font-bold text-foreground">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                  {expandedStep === s.step && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 p-3 rounded-xl bg-secondary/50 text-sm text-foreground/80">
                      {s.details}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Hajj Steps */}
      {activeTab === "haxhi" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">🏔️ Hapat e Haxhit</h2>
          {hajjSteps.map((s) => (
            <div key={s.step} className="glass-card rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all" onClick={() => setExpandedStep(expandedStep === s.step + 100 ? null : s.step + 100)}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">{s.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Hapi {s.step}</span>
                    <h3 className="font-bold text-foreground">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                  {expandedStep === s.step + 100 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 p-3 rounded-xl bg-secondary/50 text-sm text-foreground/80">
                      {s.details}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Holy Places */}
      {activeTab === "vendet" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">🗺️ Vendet e Shenjta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {holyPlaces.map((place, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all" onClick={() => setExpandedStep(expandedStep === i + 200 ? null : i + 200)}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{place.icon}</span>
                  <h3 className="font-bold text-foreground">{place.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{place.desc}</p>
                {expandedStep === i + 200 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 p-3 rounded-xl bg-secondary/50 text-sm text-foreground/80 border-l-4 border-primary">
                    {place.details}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Duas */}
      {activeTab === "duate" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <h2 className="text-xl font-bold text-foreground mb-4">📖 Duatë e Umras & Haxhit</h2>
          {duas.map((dua, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-primary">{dua.title}</h3>
                <button onClick={() => speakArabic(dua.arabic)} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xl md:text-2xl text-foreground font-arabic text-right leading-loose mb-3" dir="rtl">{dua.arabic}</p>
              <p className="text-sm text-primary/80 italic mb-2">{dua.transliteration}</p>
              <div className="bg-secondary/50 rounded-xl p-3">
                <p className="text-sm text-foreground/80">🇦🇱 {dua.meaning}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Quiz */}
      {activeTab === "kuiz" && <UmraQuiz />}
    </div>
  );
}

function UmraQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(20);
  const [answers, setAnswers] = useState<boolean[]>([]);

  React.useEffect(() => {
    if (finished || selected !== null) return;
    if (timer <= 0) { handleAnswer(-1); return; }
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, finished, selected]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === quizQuestions[current].correct;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, correct]);
    setTimeout(() => {
      if (current + 1 < quizQuestions.length) {
        setCurrent(c => c + 1);
        setSelected(null);
        setTimer(20);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const restart = () => { setCurrent(0); setScore(0); setSelected(null); setFinished(false); setTimer(20); setAnswers([]); };

  if (finished) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 text-center max-w-md mx-auto">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${pct >= 70 ? "text-yellow-500" : "text-muted-foreground"}`} />
        <h2 className="text-2xl font-bold text-foreground mb-2">Kuizi Përfundoi!</h2>
        <p className="text-4xl font-extrabold text-primary mb-2">{score}/{quizQuestions.length}</p>
        <p className="text-muted-foreground mb-2">{pct}% saktë</p>
        <div className="flex justify-center gap-1 mb-4 flex-wrap">
          {answers.map((a, i) => (<div key={i} className={`w-3 h-3 rounded-full ${a ? "bg-green-500" : "bg-red-400"}`} />))}
        </div>
        <button onClick={restart} className="px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-bold inline-flex items-center gap-2">
          <RotateCcw className="w-4 h-4" /> Fillo Përsëri
        </button>
      </motion.div>
    );
  }

  const q = quizQuestions[current];
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">Pyetja {current + 1}/{quizQuestions.length}</span>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${timer <= 5 ? "bg-destructive/10 text-destructive animate-pulse" : "bg-primary/10 text-primary"}`}>
          <Timer className="w-3 h-3" />{timer}s
        </div>
        <span className="text-sm font-bold text-primary">✓ {score}</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2 mb-6">
        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }} />
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
              <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${cls}`}>
                <span className="w-7 h-7 shrink-0 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">{String.fromCharCode(65 + i)}</span>
                {opt}
                {selected !== null && i === q.correct && <CheckCircle className="w-4 h-4 ml-auto text-green-600" />}
                {selected !== null && i === selected && i !== q.correct && <XCircle className="w-4 h-4 ml-auto text-red-500" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}