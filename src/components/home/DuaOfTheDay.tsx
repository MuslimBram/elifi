import React from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

const DAILY_DUAS = [
  { arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", sq: "Me emrin e Allahut, Mëshiruesit, Mëshirëbërësit!", category: "🌅 Fillimi" },
  { arabic: "رَبِّ زِدْنِي عِلْمًا", sq: "O Zoti im, shtoma dijen!", category: "📚 Dituria" },
  { arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", sq: "O Zoti ynë, na jep të mira në dynja e ahiret dhe na ruaj nga zjarri!", category: "🤲 Përgjithshme" },
  { arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ", sq: "O Allah, kërkoj falje dhe shëndet!", category: "💚 Shëndeti" },
  { arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ", sq: "I Lartësuar qoftë Allahu me lavdërim, i Lartësuar qoftë Allahu i Madhërishëm!", category: "🌿 Dhikri" },
  { arabic: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَارْزُقْنِي", sq: "O Allah, më fal, më mëshiro, më udhëzo dhe më furnizo!", category: "🙏 Falja" },
  { arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", sq: "Na mjafton Allahu, sa Mbrojtës i mrekullueshëm!", category: "🛡️ Mbrojtja" },
  { arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", sq: "S'ka fuqi e forcë përveçse me Allahun!", category: "⚡ Forca" },
  { arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ", sq: "O Allah, kërkoj mbrojtje nga dituria që s'bën dobi!", category: "📖 Dituria" },
  { arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", sq: "O Zoti im, m'hap gjoksin dhe m'lehtëso punën!", category: "🌅 Lehtësimi" },
  { arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ", sq: "O Allah, ndihmo të kujtoj Ty, të falënderoj dhe t'adhuroj bukur!", category: "🤲 Adhurimi" },
  { arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا", sq: "Zoti ynë, mos na i devijo zemrat pasi na udhëzove!", category: "💛 Udhëzimi" },
];

function speakArabic(text: string) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ar-SA"; u.rate = 0.8;
    window.speechSynthesis.speak(u);
  }
}

export default function DuaOfTheDay() {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % DAILY_DUAS.length;
  const dua = DAILY_DUAS[dayIndex];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          🤲 Duaja e Ditës
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{dua.category}</span>
        </h3>
        <button onClick={() => speakArabic(dua.arabic)}
          className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-lg font-arabic text-foreground text-right leading-loose mb-2" dir="rtl">{dua.arabic}</p>
      <p className="text-sm text-muted-foreground italic">"{dua.sq}"</p>
    </motion.div>
  );
}
