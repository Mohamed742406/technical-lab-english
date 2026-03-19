/**
 * Basic English-to-Arabic phonetic transliteration.
 * Not perfect — a rough approximation to help Arabic speakers read English words.
 */

const phonemeMap: [RegExp, string][] = [
  // Multi-char patterns first (order matters)
  [/\bthe\b/gi, "ذا"],
  [/tion/gi, "شن"],      // ✓ مرة واحدة فقط (كانت مكررة)
  [/sion/gi, "جن"],
  [/ture/gi, "تشر"],
  [/ous/gi, "أس"],
  [/ight/gi, "ايت"],
  [/ough/gi, "أو"],
  [/th/gi, "ث"],
  [/sh/gi, "ش"],
  [/ch/gi, "تش"],
  [/ph/gi, "ف"],
  [/wh/gi, "و"],
  [/ck/gi, "ك"],
  [/gh/gi, ""],
  [/ng/gi, "نج"],
  [/qu/gi, "كو"],
  [/ee/gi, "ي"],
  [/ea/gi, "ي"],
  [/oo/gi, "و"],
  [/ou/gi, "او"],
  [/ai/gi, "اي"],
  [/ay/gi, "اي"],
  [/ey/gi, "اي"],
  [/ow/gi, "او"],
  [/oi/gi, "وي"],
  [/oy/gi, "وي"],
  [/ie/gi, "ي"],
  [/ei/gi, "اي"],
  [/au/gi, "أو"],
  [/aw/gi, "أو"],
  [/er/gi, "ر"],
  [/or/gi, "ور"],
  [/ar/gi, "ار"],
  [/ir/gi, "ير"],
  [/ur/gi, "ر"],
  [/al/gi, "ال"],
  [/le$/gi, "ل"],
  [/ed$/gi, "د"],
  [/es$/gi, "ز"],
  [/ing/gi, "ينج"],
  // Single chars
  [/a/gi, "ا"],
  [/b/gi, "ب"],
  [/c/gi, "ك"],
  [/d/gi, "د"],
  [/e/gi, "إ"],
  [/f/gi, "ف"],
  [/g/gi, "ج"],
  [/h/gi, "ه"],
  [/i/gi, "ي"],
  [/j/gi, "ج"],
  [/k/gi, "ك"],
  [/l/gi, "ل"],
  [/m/gi, "م"],
  [/n/gi, "ن"],
  [/o/gi, "و"],
  [/p/gi, "ب"],
  [/r/gi, "ر"],
  [/s/gi, "س"],
  [/t/gi, "ت"],
  [/u/gi, "يو"],
  [/v/gi, "ف"],
  [/w/gi, "و"],
  [/x/gi, "كس"],
  [/y/gi, "ي"],
  [/z/gi, "ز"],
];

export function toArabicPhonetic(english: string): string {
  if (!english.trim()) return "";

  return english
    .split(/\s+/)
    .map((word) => {
      let result = word.toLowerCase();
      for (const [pattern, replacement] of phonemeMap) {
        result = result.replace(pattern, replacement);
      }
      result = result.replace(/[^\u0600-\u06FF\s]/g, "");
      return result;
    })
    .join(" ");
}

/** Speak text using Web Speech API */
export function speakText(text: string, rate = 0.8) {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  speechSynthesis.speak(utterance);
}

/** Download text content as a file */
export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob(["\uFEFF" + content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  // تأجيل الإلغاء لضمان اكتمال التحميل أولًا
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
