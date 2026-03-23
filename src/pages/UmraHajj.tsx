import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { id: "umra", label: "🕋 Umra" },
  { id: "haxhi", label: "🏔️ Haxhi" },
  { id: "harta", label: "🗺️ Hartë" },
  { id: "duate", label: "📖 Duatë" },
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

const duas = [
  { title: "Duaja e Ihramit", arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ", transliteration: "Lebbejke Allahumme lebbejk, lebbejke la sherike leke lebbejk, innel-hamde ven-ni'mete leke vel-mulk, la sherike lek.", meaning: "Të përgjigjem o Allah, të përgjigjem! Të përgjigjem, Ti nuk ke shok, të përgjigjem! Lavdërimi, mirësia dhe sundimi të takojnë Ty, Ti nuk ke shok." },
  { title: "Duaja mes Rukn Jemanit dhe Gurit të Zi", arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", transliteration: "Rabbena atina fid-dunja haseneten ve fil-ahireti haseneten ve kina adhaben-nar.", meaning: "Zoti ynë, na jep të mira në këtë botë dhe në botën tjetër, dhe na ruaj nga dënimi i zjarrit." },
  { title: "Duaja në Safa dhe Merva", arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ", transliteration: "Innes-Safa vel-Mervete min she'airillah.", meaning: "Safa dhe Merva janë nga shenjat e Allahut." },
  { title: "Duaja në Arafat", arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", transliteration: "La ilahe il-lAllahu vahdehu la sherike lehu, lehul-mulku ve lehul-hamdu ve huve ala kul-li shej'in kadir.", meaning: "Nuk ka zot tjetër përveç Allahut, Një dhe i Vetëm, pa shok. Atij i takon sundimi dhe lavdërimi, dhe Ai ka fuqi mbi çdo gjë." },
  { title: "Duaja pas Tavafit", arabic: "وَاتَّخِذُوا مِنْ مَقَامِ إِبْرَاهِيمَ مُصَلًّى", transliteration: "Vet-tehidhu min mekam-i Ibrahime musel-la.", meaning: "Dhe merreni vendin e Ibrahimit si vend faljeje." },
];

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
          Mëso hapat e Umras dhe Haxhit, duatë e rëndësishme dhe orientimet në Vendet e Shenjta.
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
            <div
              key={s.step}
              className="glass-card rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setExpandedStep(expandedStep === s.step ? null : s.step)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Hapi {s.step}
                    </span>
                    <h3 className="font-bold text-foreground">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                  {expandedStep === s.step && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 p-3 rounded-xl bg-secondary/50 text-sm text-foreground/80"
                    >
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
            <div
              key={s.step}
              className="glass-card rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setExpandedStep(expandedStep === s.step + 100 ? null : s.step + 100)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Hapi {s.step}
                    </span>
                    <h3 className="font-bold text-foreground">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                  {expandedStep === s.step + 100 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 p-3 rounded-xl bg-secondary/50 text-sm text-foreground/80"
                    >
                      {s.details}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Map placeholder */}
      {activeTab === "harta" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-xl font-bold text-foreground mb-2">Hartë Interaktive</h2>
          <p className="text-muted-foreground mb-6">
            Hartë e vendeve të shenjta me pikat kryesore: Qabeja, Safa, Merva, Mina, Arafat, Muzdelife.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto">
            {["🕋 Qabeja", "⛰️ Safa & Merva", "⛺ Mina", "🏔️ Arafat", "🌙 Muzdelife", "🎯 Xhemrat"].map((place, i) => (
              <div key={i} className="glass-card rounded-xl p-4 text-center">
                <p className="text-lg font-medium text-foreground">{place}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6 italic">
            Harta 3D do të shtohet në versionin e ardhshëm.
          </p>
        </motion.div>
      )}

      {/* Duas */}
      {activeTab === "duate" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <h2 className="text-xl font-bold text-foreground mb-4">📖 Duatë e Umras & Haxhit</h2>
          {duas.map((dua, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <h3 className="font-bold text-primary mb-3">{dua.title}</h3>
              <p className="text-xl md:text-2xl text-foreground font-arabic text-right leading-loose mb-3" dir="rtl">
                {dua.arabic}
              </p>
              <p className="text-sm text-primary/80 italic mb-2">{dua.transliteration}</p>
              <div className="bg-secondary/50 rounded-xl p-3">
                <p className="text-sm text-foreground/80">🇦🇱 {dua.meaning}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
