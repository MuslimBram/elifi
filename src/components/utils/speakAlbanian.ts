// Speech utility functions for Albanian, Arabic, and English TTS

export function speakAlbanian(text: string): void {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.toLowerCase().startsWith("sq"))
      || voices.find(v => v.lang.toLowerCase().startsWith("hr") || v.lang.toLowerCase().startsWith("cs"))
      || voices.find(v => v.lang.toLowerCase().startsWith("en-gb"))
      || voices.find(v => v.lang.toLowerCase().startsWith("en"))
      || null;

    const u = new SpeechSynthesisUtterance(text);
    if (preferred) { u.voice = preferred; u.lang = preferred.lang; } else { u.lang = "sq"; }
    u.rate = 0.75;
    u.pitch = 1.0;
    window.speechSynthesis.speak(u);
  };

  if (window.speechSynthesis.getVoices().length > 0) trySpeak();
  else window.speechSynthesis.onvoiceschanged = trySpeak;
}

export function speakArabic(text: string): void {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const voices = window.speechSynthesis.getVoices();
  const arVoice = voices.find(v => v.lang.startsWith("ar"));
  const u = new SpeechSynthesisUtterance(text);
  if (arVoice) u.voice = arVoice;
  u.lang = "ar-SA";
  u.rate = 0.6;
  window.speechSynthesis.speak(u);
}

export function speakEnglish(text: string): void {
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en"));
  const u = new SpeechSynthesisUtterance(text);
  if (enVoice) u.voice = enVoice;
  u.lang = "en-GB";
  u.rate = 0.75;
  window.speechSynthesis.speak(u);
}

export function speakText(text: string, language: string): void {
  if (!text) return;
  if (language === "arabisht") speakArabic(text);
  else if (language === "anglisht") speakEnglish(text);
  else speakAlbanian(text);
}
