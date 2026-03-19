import { useState, useRef, useEffect } from "react";
import { Volume2, X } from "lucide-react";
import { speakText } from "@/lib/phonetics";
import { getSyllables, getShowSyllables } from "@/lib/syllables";
import { toArabicPhonetic } from "@/lib/phonetics";

// Known images for specific terms
const termImages: Record<string, string> = {
  "slump cone": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=150&fit=crop",
  microscope: "https://images.unsplash.com/photo-1516571748831-5d81767b044d?w=200&h=150&fit=crop",
  hydrometer: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=200&h=150&fit=crop",
};

function getTermImage(word: string): string | null {
  const lower = word.toLowerCase();
  for (const [term, url] of Object.entries(termImages)) {
    if (lower.includes(term) || term.includes(lower)) return url;
  }
  return null;
}

// Simple Arabic dictionary for common lab words
const quickTranslations: Record<string, string> = {
  the: "ال", is: "هو/هي", are: "هم", was: "كان", were: "كانوا",
  test: "اختبار", sample: "عينة", result: "نتيجة", report: "تقرير",
  concrete: "خرسانة", soil: "تربة", asphalt: "أسفلت", aggregate: "ركام",
  cement: "أسمنت", water: "ماء", sand: "رمل", gravel: "حصى",
  strength: "مقاومة", density: "كثافة", moisture: "رطوبة", temperature: "حرارة",
  compaction: "دمك", curing: "معالجة", mixing: "خلط", pouring: "صب",
  specification: "مواصفة", standard: "معيار", equipment: "معدات",
  laboratory: "مختبر", calibration: "معايرة", safety: "سلامة",
  approved: "مقبول", rejected: "مرفوض", check: "فحص", measure: "قياس",
  perform: "تنفيذ", prepare: "تجهيز", record: "تسجيل", calculate: "حساب",
  weight: "وزن", volume: "حجم", area: "مساحة", depth: "عمق",
  layer: "طبقة", surface: "سطح", value: "قيمة", ratio: "نسبة",
  percent: "بالمائة", degree: "درجة", minimum: "أدنى", maximum: "أقصى",
  bitumen: "بيتومين", slump: "هبوط", cube: "مكعب", beam: "كمرة",
  roller: "حادلة", paver: "فرادة", vibrator: "هزاز", mold: "قالب",
  load: "حمل", force: "قوة", pressure: "ضغط", stress: "إجهاد",
};

function getTranslation(word: string): string {
  const lower = word.toLowerCase().replace(/[^a-z]/g, "");
  return quickTranslations[lower] || toArabicPhonetic(word);
}

interface TechTooltipProps {
  word: string;
  children?: React.ReactNode;
}

const TechTooltip = ({ word, children }: TechTooltipProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cleanWord = word.replace(/[^a-zA-Z'-]/g, "");
  const showSyllables = getShowSyllables();
  const syllables = getSyllables(cleanWord);
  const image = getTermImage(cleanWord);
  const translation = getTranslation(cleanWord);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (cleanWord.length < 2) return <span>{children || word}</span>;

  return (
    <span className="relative inline" ref={ref}>
      {showSyllables && syllables && (
        <span className="block text-[10px] text-muted-foreground/50 leading-none -mb-0.5 select-none" dir="ltr">
          {syllables}
        </span>
      )}
      <span
        onClick={() => setOpen(!open)}
        className="cursor-pointer hover:bg-primary/20 hover:text-primary rounded px-0.5 transition-colors inline"
      >
        {children || word}
      </span>
      {open && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-card rounded-xl shadow-xl border border-border p-4 animate-in fade-in-0 zoom-in-95 duration-200" dir="rtl">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-xl font-display font-bold text-foreground" dir="ltr">{cleanWord}</h4>
            <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-muted transition-colors">
              <X size={14} className="text-muted-foreground" />
            </button>
          </div>
          {syllables && (
            <p className="text-xs text-muted-foreground mb-1" dir="ltr">{syllables}</p>
          )}
          <p className="text-primary font-semibold text-lg mb-2">{translation}</p>
          {image && (
            <img src={image} alt={cleanWord} className="w-full h-24 object-cover rounded-lg mb-2" />
          )}
          {!image && (
            <div className="w-full h-16 bg-muted rounded-lg mb-2 flex items-center justify-center">
              <span className="text-2xl">🔬</span>
            </div>
          )}
          <button
            onClick={() => speakText(cleanWord, 0.5)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Volume2 size={16} />
            🐌 نطق بطيء جداً
          </button>
        </div>
      )}
    </span>
  );
};

/** Wrap every word in a sentence with TechTooltip */
export function renderClickableText(text: string) {
  return text.split(/(\s+)/).map((token, i) => {
    const clean = token.replace(/[^a-zA-Z'-]/g, "");
    if (clean.length >= 2) {
      return <TechTooltip key={i} word={token}>{token}</TechTooltip>;
    }
    return <span key={i}>{token}</span>;
  });
}

export default TechTooltip;
