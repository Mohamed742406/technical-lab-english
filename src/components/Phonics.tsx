import { useState } from "react";
import { speakText } from "@/lib/phonetics";
import { Volume2, ChevronLeft, CheckCircle, Lock, Star } from "lucide-react";
import SpeedControl from "@/components/SpeedControl";
import { addXP, XP_REWARDS } from "@/lib/gamification";
import XPNotification from "@/components/XPNotification";
import { Achievement } from "@/lib/gamification";

interface PhonicsItem {
  sound: string;
  symbol: string;
  arabicExplain: string;
  arabicClose: string;
  examples: { word: string; arabic: string }[];
  tip: string;
}

interface PhonicsLesson {
  id: string;
  title: string;
  icon: string;
  description: string;
  sounds: PhonicsItem[];
}

const PHONICS_PROGRESS_KEY = "lab-english-phonics-progress";

function getPhonicsProgress(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(PHONICS_PROGRESS_KEY) || "{}"); } catch { return {}; }
}
function savePhonicsLessonDone(id: string) {
  const p = getPhonicsProgress(); p[id] = true;
  localStorage.setItem(PHONICS_PROGRESS_KEY, JSON.stringify(p));
}

const phonicsLessons: PhonicsLesson[] = [
  {
    id: "pl1", title: "الأصوات الأولى — B, D, F, K", icon: "🔤",
    description: "أصوات سهلة موجودة بالعربي تقريباً",
    sounds: [
      { sound: "B", symbol: "/b/", arabicExplain: "زي حرف (ب) بالظبط", arabicClose: "= ب", examples: [{ word: "Block", arabic: "بلوك" }, { word: "Bar", arabic: "قضيب" }, { word: "Beam", arabic: "كمرة" }], tip: "سهل — نفس صوت ب العربي" },
      { sound: "D", symbol: "/d/", arabicExplain: "زي حرف (د) بالظبط", arabicClose: "= د", examples: [{ word: "Density", arabic: "كثافة" }, { word: "Depth", arabic: "عمق" }, { word: "Dry", arabic: "جاف" }], tip: "نفس صوت د العربي" },
      { sound: "F", symbol: "/f/", arabicExplain: "زي حرف (ف) بالظبط", arabicClose: "= ف", examples: [{ word: "Fine", arabic: "ناعم" }, { word: "Filter", arabic: "مرشح" }, { word: "Fill", arabic: "ملء" }], tip: "نفس صوت ف العربي" },
      { sound: "K", symbol: "/k/", arabicExplain: "زي حرف (ك) بالظبط", arabicClose: "= ك", examples: [{ word: "Kiln", arabic: "فرن" }, { word: "Core", arabic: "لب" }, { word: "Cube", arabic: "مكعب" }], tip: "نفس صوت ك العربي" },
    ],
  },
  {
    id: "pl2", title: "أصوات M, N, S, T, Z", icon: "🅰️",
    description: "أصوات أساسية مألوفة",
    sounds: [
      { sound: "M", symbol: "/m/", arabicExplain: "زي حرف (م) بالظبط", arabicClose: "= م", examples: [{ word: "Mix", arabic: "خلط" }, { word: "Mold", arabic: "قالب" }, { word: "Measure", arabic: "قياس" }], tip: "نفس صوت م العربي" },
      { sound: "N", symbol: "/n/", arabicExplain: "زي حرف (ن) بالظبط", arabicClose: "= ن", examples: [{ word: "Normal", arabic: "طبيعي" }, { word: "Number", arabic: "رقم" }], tip: "نفس صوت ن العربي" },
      { sound: "S", symbol: "/s/", arabicExplain: "زي حرف (س) بالظبط", arabicClose: "= س", examples: [{ word: "Sample", arabic: "عينة" }, { word: "Sand", arabic: "رمل" }, { word: "Sieve", arabic: "منخل" }], tip: "نفس صوت س العربي" },
      { sound: "T", symbol: "/t/", arabicExplain: "زي حرف (ت) بالظبط", arabicClose: "= ت", examples: [{ word: "Test", arabic: "اختبار" }, { word: "Tank", arabic: "خزان" }], tip: "نفس صوت ت العربي" },
      { sound: "Z", symbol: "/z/", arabicExplain: "زي حرف (ز) بالظبط", arabicClose: "= ز", examples: [{ word: "Zone", arabic: "منطقة" }, { word: "Zero", arabic: "صفر" }], tip: "نفس صوت ز العربي" },
    ],
  },
  {
    id: "pl3", title: "⚠️ P و V — الأصعب للمصريين", icon: "⚠️",
    description: "أصوات غير موجودة في العربي المصري — لازم تتدرب عليها",
    sounds: [
      { sound: "P", symbol: "/p/", arabicExplain: "ضم شفتيك واخرج الهواء بقوة بدون اهتزاز — مش (ب)!", arabicClose: "قريب من (ب) لكن بدون اهتزاز الأحبال الصوتية", examples: [{ word: "Pour", arabic: "صب" }, { word: "Pressure", arabic: "ضغط" }, { word: "Penetration", arabic: "اختراق" }, { word: "Plastic", arabic: "لدن" }], tip: "حط ورقة قدام فمك — لازم تتحرك لما تنطق P. لو منطقتش يبقى إنت بتقول B!" },
      { sound: "V", symbol: "/v/", arabicExplain: "ضع أسنانك العلوية على شفتك السفلية واهتز — مش (ف)!", arabicClose: "قريب من (ف) لكن مع اهتزاز", examples: [{ word: "Vibrator", arabic: "هزاز" }, { word: "Valve", arabic: "صمام" }, { word: "Volume", arabic: "حجم" }, { word: "Verify", arabic: "تحقق" }], tip: "حط إيدك على زورك (الحنجرة) — لازم تحس باهتزاز لما تنطق V. لو مفيش اهتزاز يبقى إنت بتقول F!" },
    ],
  },
  {
    id: "pl4", title: "أصوات TH — الذال والثاء", icon: "👅",
    description: "حط لسانك بين أسنانك — سهلة للعربي!",
    sounds: [
      { sound: "TH (voiced)", symbol: "/ð/", arabicExplain: "حط لسانك بين أسنانك واهتز — زي (ذ) في الفصحى", arabicClose: "= ذ بالظبط", examples: [{ word: "The", arabic: "ال" }, { word: "This", arabic: "هذا" }, { word: "That", arabic: "ذلك" }, { word: "Weather", arabic: "طقس" }], tip: "المصري بينطقها (د) — لازم تحط لسانك بين أسنانك" },
      { sound: "TH (voiceless)", symbol: "/θ/", arabicExplain: "حط لسانك بين أسنانك بدون اهتزاز — زي (ث) في الفصحى", arabicClose: "= ث بالظبط", examples: [{ word: "Thickness", arabic: "سمك" }, { word: "Three", arabic: "ثلاثة" }, { word: "Thermal", arabic: "حراري" }, { word: "Through", arabic: "خلال" }], tip: "المصري بينطقها (س) — لازم تحط لسانك بين أسنانك" },
    ],
  },
  {
    id: "pl5", title: "W, R, L — أصوات محيرة", icon: "🔄",
    description: "أصوات تشبه العربي لكن مختلفة",
    sounds: [
      { sound: "W", symbol: "/w/", arabicExplain: "ضم شفتيك في دايرة صغيرة واخرج صوت (وو)", arabicClose: "قريب من (و) لكن مضمومة أكثر", examples: [{ word: "Water", arabic: "ماء" }, { word: "Weight", arabic: "وزن" }, { word: "Width", arabic: "عرض" }], tip: "W مش زي V — في W مفيش أسنان على الشفة" },
      { sound: "R", symbol: "/r/", arabicExplain: "لف لسانك لفوق بدون ما يلمس سقف الفم", arabicClose: "مختلف عن (ر) العربي — اللسان مش بيطرقع", examples: [{ word: "Report", arabic: "تقرير" }, { word: "Result", arabic: "نتيجة" }, { word: "Reinforcement", arabic: "تسليح" }], tip: "الـ R الإنجليزي لسانك بيترفع بدون ما يلمس حاجة" },
      { sound: "L", symbol: "/l/", arabicExplain: "طرف لسانك يلمس سقف فمك ورا الأسنان", arabicClose: "زي (ل) لكن أخف في آخر الكلمة", examples: [{ word: "Level", arabic: "مستوى" }, { word: "Load", arabic: "حمل" }, { word: "Laboratory", arabic: "مختبر" }], tip: "L في آخر الكلمة بيكون أثقل (dark L)" },
    ],
  },
  {
    id: "pl6", title: "حروف العلة القصيرة", icon: "🔵",
    description: "A, E, I, O, U — الأصوات القصيرة",
    sounds: [
      { sound: "A (short) /æ/", symbol: "/æ/", arabicExplain: "بين الفتحة والكسرة — مش موجود بالعربي", arabicClose: "بين (أ) و(إ)", examples: [{ word: "Sample", arabic: "عينة" }, { word: "Sand", arabic: "رمل" }, { word: "Crack", arabic: "شرخ" }], tip: "افتح فمك أوسع من (إ) وأضيق من (أ)" },
      { sound: "E (short) /ɛ/", symbol: "/ɛ/", arabicExplain: "كسرة قصيرة — فمك مفتوح شوية", arabicClose: "قريب من (إ)", examples: [{ word: "Test", arabic: "اختبار" }, { word: "Set", arabic: "مجموعة" }, { word: "Strength", arabic: "مقاومة" }], tip: "أقصر وأوسع من (إ) العربي" },
      { sound: "I (short) /ɪ/", symbol: "/ɪ/", arabicExplain: "كسرة خفيفة سريعة", arabicClose: "بين (إ) و(أ)", examples: [{ word: "Mix", arabic: "خلط" }, { word: "Sieve", arabic: "منخل" }, { word: "Slip", arabic: "انزلاق" }], tip: "أقصر وأخف من (إي)" },
      { sound: "O (short) /ɒ/", symbol: "/ɒ/", arabicExplain: "ضم خفيف مع فتح الفم", arabicClose: "بين (أ) و(أو)", examples: [{ word: "Rod", arabic: "قضيب" }, { word: "Block", arabic: "بلوك" }, { word: "Rock", arabic: "صخرة" }], tip: "افتح فمك بس دور شفتيك شوية" },
      { sound: "U (short) /ʌ/", symbol: "/ʌ/", arabicExplain: "فتحة سريعة من وسط الفم", arabicClose: "زي (أ) خفيفة", examples: [{ word: "Slump", arabic: "هبوط" }, { word: "Truck", arabic: "شاحنة" }, { word: "Crush", arabic: "سحق" }], tip: "زي لما تقول 'أه' بسرعة" },
    ],
  },
  {
    id: "pl7", title: "حروف العلة الطويلة", icon: "🔴",
    description: "A, E, I, O, U — الأصوات الطويلة",
    sounds: [
      { sound: "A (long) /ɑː/", symbol: "/ɑː/", arabicExplain: "افتح فمك واسع وقول (آ) طويلة", arabicClose: "= (آ) الطويلة", examples: [{ word: "Start", arabic: "ابدأ" }, { word: "Hard", arabic: "صعب" }, { word: "Part", arabic: "جزء" }], tip: "زي لما تقول 'آه' — اللسان مرتاح" },
      { sound: "E (long) /iː/", symbol: "/iː/", arabicExplain: "مد الكسرة — ابتسم وقول (إي) طويلة", arabicClose: "= (إي) الطويلة", examples: [{ word: "Beam", arabic: "كمرة" }, { word: "Steel", arabic: "صلب" }, { word: "Heat", arabic: "حرارة" }], tip: "مد شفتيك وابتسم" },
      { sound: "I (long) /aɪ/", symbol: "/aɪ/", arabicExplain: "ابدأ بـ (أ) واختم بـ (ي) — أي", arabicClose: "= (آي)", examples: [{ word: "Line", arabic: "خط" }, { word: "Site", arabic: "موقع" }, { word: "Pipe", arabic: "ماسورة" }], tip: "زي ما تقول 'آي' " },
      { sound: "O (long) /oʊ/", symbol: "/oʊ/", arabicExplain: "ابدأ بـ (أو) وضم شفتيك", arabicClose: "= (أوو)", examples: [{ word: "Load", arabic: "حمل" }, { word: "Flow", arabic: "انسياب" }, { word: "Zone", arabic: "منطقة" }], tip: "ابدأ بفتح فمك وختم بضمه" },
      { sound: "U (long) /uː/", symbol: "/uː/", arabicExplain: "ضم شفتيك واخرج (أوو) طويل", arabicClose: "= (أوو) الطويلة", examples: [{ word: "Tool", arabic: "أداة" }, { word: "Proof", arabic: "إثبات" }, { word: "Tube", arabic: "أنبوب" }], tip: "ضم شفتيك بقوة وخليها طويلة" },
    ],
  },
  {
    id: "pl8", title: "SH, CH, J — أصوات مركبة", icon: "🔗",
    description: "أصوات من حرفين مع بعض",
    sounds: [
      { sound: "SH", symbol: "/ʃ/", arabicExplain: "= ش بالظبط", arabicClose: "= ش", examples: [{ word: "Shear", arabic: "قص" }, { word: "Shrinkage", arabic: "انكماش" }, { word: "Shake", arabic: "هز" }], tip: "سهل — نفس ش العربي" },
      { sound: "CH", symbol: "/tʃ/", arabicExplain: "= ت + ش مع بعض بسرعة", arabicClose: "= تش", examples: [{ word: "Check", arabic: "فحص" }, { word: "Charge", arabic: "شحن" }, { word: "Channel", arabic: "قناة" }], tip: "تخيل إنك بتقول ت وش بسرعة" },
      { sound: "J / soft G", symbol: "/dʒ/", arabicExplain: "= ج لكن أقوى شوية", arabicClose: "= ج القاهرية تقريباً", examples: [{ word: "Grade", arabic: "درجة" }, { word: "Joist", arabic: "جسر" }, { word: "Project", arabic: "مشروع" }], tip: "J بتتنطق زي ج بالظبط" },
    ],
  },
  {
    id: "pl9", title: "حروف صامتة — Silent Letters", icon: "🤫",
    description: "حروف مكتوبة لكن مش بتتنطق!",
    sounds: [
      { sound: "Silent K", symbol: "صامت", arabicExplain: "K قبل N في أول الكلمة بتكون صامتة", arabicClose: "الـ K مش بتتنطق خالص", examples: [{ word: "Know", arabic: "يعرف" }, { word: "Knife", arabic: "سكين" }, { word: "Knock", arabic: "يطرق" }, { word: "Knee", arabic: "ركبة" }], tip: "ابدأ من N على طول" },
      { sound: "Silent W", symbol: "صامت", arabicExplain: "W قبل R في أول الكلمة صامتة", arabicClose: "الـ W مش بتتنطق", examples: [{ word: "Write", arabic: "يكتب" }, { word: "Wrong", arabic: "غلط" }, { word: "Wrap", arabic: "يلف" }], tip: "ابدأ من R — W صامتة" },
      { sound: "Silent B", symbol: "صامت", arabicExplain: "B بعد M في آخر الكلمة صامتة", arabicClose: "الـ B مش بتتنطق", examples: [{ word: "Climb", arabic: "يتسلق" }, { word: "Plumb", arabic: "شاقول" }, { word: "Bomb", arabic: "قنبلة" }], tip: "B آخر الكلمة بعد M — متنطقهاش" },
      { sound: "Silent E", symbol: "صامت", arabicExplain: "E في آخر الكلمة غالباً صامتة لكن بتغير نطق اللي قبلها", arabicClose: "E الأخيرة بتحول الحرف القصير لطويل", examples: [{ word: "Rate", arabic: "معدل" }, { word: "Line", arabic: "خط" }, { word: "Cone", arabic: "مخروط" }, { word: "Cube", arabic: "مكعب" }], tip: "E الصامتة بتحول الحرف المتحرك من قصير لطويل" },
      { sound: "Silent H", symbol: "صامت", arabicExplain: "H في بعض الكلمات مش بتتنطق", arabicClose: "H صامتة", examples: [{ word: "Hour", arabic: "ساعة" }, { word: "Honest", arabic: "أمين" }, { word: "Honour", arabic: "شرف" }], tip: "hour = our في النطق" },
      { sound: "Silent G", symbol: "صامت", arabicExplain: "G قبل N صامتة", arabicClose: "G مش بتتنطق", examples: [{ word: "Sign", arabic: "علامة" }, { word: "Design", arabic: "تصميم" }, { word: "Align", arabic: "محاذاة" }], tip: "Sign بتتنطق 'ساين' بدون G" },
    ],
  },
  {
    id: "pl10", title: "تهجيات خادعة — Tricky Spellings", icon: "🎭",
    description: "كلمات مكتوبة بشكل ونطقها مختلف تماماً",
    sounds: [
      { sound: "Ph = F", symbol: "/f/", arabicExplain: "Ph دايماً بتتنطق F", arabicClose: "= ف", examples: [{ word: "Phase", arabic: "مرحلة" }, { word: "Physical", arabic: "فيزيائي" }, { word: "Phosphate", arabic: "فوسفات" }], tip: "Ph = F في كل الحالات" },
      { sound: "TION = شن", symbol: "/ʃən/", arabicExplain: "TION في آخر الكلمة = شن", arabicClose: "= شَن", examples: [{ word: "Specification", arabic: "مواصفة" }, { word: "Vibration", arabic: "اهتزاز" }, { word: "Foundation", arabic: "أساس" }], tip: "كل كلمة بـ TION = شَن" },
      { sound: "SION = جن/شن", symbol: "/ʒən/", arabicExplain: "SION بتتنطق جن أو شن", arabicClose: "= جَن أو شَن", examples: [{ word: "Corrosion", arabic: "تآكل" }, { word: "Compression", arabic: "ضغط" }, { word: "Expansion", arabic: "تمدد" }], tip: "بعد حرف متحرك = جن / بعد ساكن = شن" },
      { sound: "OUGH = !!!", symbol: "متعدد", arabicExplain: "أصعب تهجية — 6 طرق مختلفة!", arabicClose: "لازم تحفظ كل كلمة لوحدها", examples: [{ word: "Through", arabic: "خلال (أوو)" }, { word: "Rough", arabic: "خشن (أف)" }, { word: "Though", arabic: "رغم (أو)" }, { word: "Thought", arabic: "فكرة (أوت)" }], tip: "OUGH = كل كلمة لوحدها!" },
      { sound: "GH = صامت/F", symbol: "متعدد", arabicExplain: "GH في النص صامتة — في الآخر غالباً F", arabicClose: "صامتة أو F", examples: [{ word: "Weight", arabic: "وزن (صامتة)" }, { word: "Straight", arabic: "مستقيم (صامتة)" }, { word: "Rough", arabic: "خشن (= F)" }, { word: "Enough", arabic: "كافي (= F)" }], tip: "GH في النص = صامتة / في الآخر = F" },
    ],
  },
  {
    id: "pl11", title: "أصوات ER, OR, AR, IR", icon: "🌀",
    description: "حروف العلة + R — مهمة جداً في المختبر",
    sounds: [
      { sound: "ER /ɜːr/", symbol: "/ɜːr/", arabicExplain: "صوت من وسط الفم + R خفيفة", arabicClose: "قريب من 'أَر' خفيفة", examples: [{ word: "Permeability", arabic: "نفاذية" }, { word: "Thermal", arabic: "حراري" }, { word: "Determine", arabic: "يحدد" }], tip: "ER بتتنطق 'أَر' خفيفة في معظم الحالات" },
      { sound: "OR /ɔːr/", symbol: "/ɔːr/", arabicExplain: "= أور طويلة", arabicClose: "= أور", examples: [{ word: "Report", arabic: "تقرير" }, { word: "Core", arabic: "لب" }, { word: "Reinforcement", arabic: "تسليح" }], tip: "OR = أور في معظم الكلمات" },
      { sound: "AR /ɑːr/", symbol: "/ɑːr/", arabicExplain: "= آر طويلة", arabicClose: "= آر", examples: [{ word: "Bar", arabic: "قضيب" }, { word: "Start", arabic: "ابدأ" }, { word: "Particle", arabic: "جسيم" }], tip: "AR = آر طويلة" },
      { sound: "IR /ɜːr/", symbol: "/ɜːr/", arabicExplain: "نفس صوت ER تقريباً", arabicClose: "= أَر", examples: [{ word: "Stir", arabic: "يقلب" }, { word: "First", arabic: "أول" }, { word: "Circle", arabic: "دائرة" }], tip: "IR بتتنطق نفس ER" },
    ],
  },
  {
    id: "pl12", title: "تشكيلات OO, OW, OU, EW", icon: "🎶",
    description: "تشكيلات حروف العلة المزدوجة",
    sounds: [
      { sound: "OO = أوو", symbol: "/uː/", arabicExplain: "OO بتتنطق أوو طويلة", arabicClose: "= أوو", examples: [{ word: "Tool", arabic: "أداة" }, { word: "Proof", arabic: "إثبات" }, { word: "Smooth", arabic: "أملس" }], tip: "OO = أوو في معظم الكلمات" },
      { sound: "OW = آو", symbol: "/aʊ/", arabicExplain: "OW بتتنطق آو", arabicClose: "= آو", examples: [{ word: "Tower", arabic: "برج" }, { word: "Power", arabic: "قوة" }, { word: "Trowel", arabic: "مالج" }], tip: "OW أحياناً = أو (مثل flow)" },
      { sound: "OU = آو", symbol: "/aʊ/", arabicExplain: "OU غالباً بتتنطق آو", arabicClose: "= آو", examples: [{ word: "Foundation", arabic: "أساس" }, { word: "Ground", arabic: "أرض" }, { word: "Amount", arabic: "كمية" }], tip: "OU = آو في معظم الحالات" },
      { sound: "EW = يوو", symbol: "/juː/", arabicExplain: "EW بتتنطق يوو", arabicClose: "= يوو", examples: [{ word: "New", arabic: "جديد" }, { word: "Crew", arabic: "طاقم" }, { word: "Screw", arabic: "مسمار" }], tip: "EW = يوو أو أوو" },
    ],
  },
  // ─── NEW PHONICS LESSONS 13-32 ───
  {
    id: "pl13", title: "أصوات NG و NK", icon: "🔔",
    description: "أصوات أنفية مهمة في الإنجليزية",
    sounds: [
      { sound: "NG", symbol: "/ŋ/", arabicExplain: "صوت من الأنف — مش ن + ج!", arabicClose: "= نج خفيفة بدون الجيم", examples: [{ word: "Testing", arabic: "اختبار" }, { word: "Ring", arabic: "حلقة" }, { word: "Casting", arabic: "صب" }], tip: "NG في آخر الكلمة — صوت واحد مش اثنين" },
      { sound: "NK", symbol: "/ŋk/", arabicExplain: "= NG + K", arabicClose: "= نك", examples: [{ word: "Tank", arabic: "خزان" }, { word: "Shrink", arabic: "انكماش" }, { word: "Sink", arabic: "حوض" }], tip: "NK = صوت NG + K في الآخر" },
    ],
  },
  {
    id: "pl14", title: "تشديد المقاطع — Word Stress", icon: "💪",
    description: "أي مقطع بنشدد عليه في الكلمة",
    sounds: [
      { sound: "CON-crete", symbol: "stress", arabicExplain: "التشديد على المقطع الأول", arabicClose: "كُونكريت", examples: [{ word: "CONcrete", arabic: "خرسانة" }, { word: "SAMple", arabic: "عينة" }, { word: "WATer", arabic: "ماء" }], tip: "المقطع المشدد بيكون أعلى وأطول" },
      { sound: "re-SULT", symbol: "stress", arabicExplain: "التشديد على المقطع الثاني", arabicClose: "ريزَلت", examples: [{ word: "reSULT", arabic: "نتيجة" }, { word: "rePORT", arabic: "تقرير" }, { word: "deSIGN", arabic: "تصميم" }], tip: "كلمات كثيرة بتبدأ بـ re- التشديد على التاني" },
      { sound: "speci-FI-ca-tion", symbol: "stress", arabicExplain: "التشديد في الكلمات الطويلة", arabicClose: "سبيسيفيكَيشن", examples: [{ word: "speciFIcation", arabic: "مواصفة" }, { word: "determiNAtion", arabic: "تحديد" }, { word: "permeaBIlity", arabic: "نفاذية" }], tip: "الكلمات بـ -tion التشديد قبلها بمقطع" },
    ],
  },
  {
    id: "pl15", title: "نطق ED في الأفعال", icon: "📅",
    description: "ثلاث طرق لنطق ED",
    sounds: [
      { sound: "ED = /t/", symbol: "/t/", arabicExplain: "بعد الأصوات المهموسة = ت خفيفة", arabicClose: "= ت", examples: [{ word: "Mixed", arabic: "خلط" }, { word: "Washed", arabic: "غسل" }, { word: "Cracked", arabic: "تشقق" }], tip: "بعد K, P, S, F, SH, CH → ED = /t/" },
      { sound: "ED = /d/", symbol: "/d/", arabicExplain: "بعد الأصوات المجهورة = د خفيفة", arabicClose: "= د", examples: [{ word: "Poured", arabic: "صب" }, { word: "Measured", arabic: "قاس" }, { word: "Cured", arabic: "عالج" }], tip: "بعد حروف العلة والأصوات المجهورة → ED = /d/" },
      { sound: "ED = /ɪd/", symbol: "/ɪd/", arabicExplain: "بعد T و D = إِد (مقطع زيادة)", arabicClose: "= إِد", examples: [{ word: "Tested", arabic: "اختبر" }, { word: "Compacted", arabic: "دمك" }, { word: "Loaded", arabic: "حمّل" }], tip: "بعد T و D بس → ED = /ɪd/ مقطع كامل" },
    ],
  },
  {
    id: "pl16", title: "نطق S/ES في الجمع", icon: "🔢",
    description: "ثلاث طرق لنطق S",
    sounds: [
      { sound: "S = /s/", symbol: "/s/", arabicExplain: "بعد الأصوات المهموسة = س", arabicClose: "= س", examples: [{ word: "Tests", arabic: "اختبارات" }, { word: "Trucks", arabic: "شاحنات" }, { word: "Cracks", arabic: "شروخ" }], tip: "بعد T, K, P, F → S = /s/" },
      { sound: "S = /z/", symbol: "/z/", arabicExplain: "بعد الأصوات المجهورة = ز", arabicClose: "= ز", examples: [{ word: "Cubes", arabic: "مكعبات" }, { word: "Samples", arabic: "عينات" }, { word: "Results", arabic: "نتائج" }], tip: "بعد حروف العلة والأصوات المجهورة → S = /z/" },
      { sound: "ES = /ɪz/", symbol: "/ɪz/", arabicExplain: "بعد S, Z, SH, CH = إِز", arabicClose: "= إِز", examples: [{ word: "Phases", arabic: "مراحل" }, { word: "Gauges", arabic: "مقاييس" }, { word: "Sizes", arabic: "أحجام" }], tip: "بعد S, Z, SH, CH, X, J → ES = /ɪz/" },
    ],
  },
  {
    id: "pl17", title: "حروف العلة المركبة — Diphthongs", icon: "🌊",
    description: "أصوات من حرفي علة مع بعض",
    sounds: [
      { sound: "/eɪ/ = أي", symbol: "/eɪ/", arabicExplain: "ابدأ بـ إ وانتقل لـ ي", arabicClose: "= إي", examples: [{ word: "Grade", arabic: "درجة" }, { word: "Rate", arabic: "معدل" }, { word: "Scale", arabic: "ميزان" }], tip: "A_E / AY / AI كلهم = /eɪ/" },
      { sound: "/ɔɪ/ = أوي", symbol: "/ɔɪ/", arabicExplain: "ابدأ بـ أو وانتقل لـ ي", arabicClose: "= أوي", examples: [{ word: "Moisture", arabic: "رطوبة" }, { word: "Point", arabic: "نقطة" }, { word: "Void", arabic: "فراغ" }], tip: "OI / OY = /ɔɪ/ = أوي" },
    ],
  },
  {
    id: "pl18", title: "أصوات العلة الضعيفة — Schwa", icon: "😶",
    description: "أضعف صوت في الإنجليزية وأكثرهم شيوعاً",
    sounds: [
      { sound: "Schwa /ə/", symbol: "/ə/", arabicExplain: "صوت خفيف سريع — بين كل الحروف المتحركة", arabicClose: "= أَ خفيفة جداً", examples: [{ word: "About", arabic: "حول" }, { word: "Problem", arabic: "مشكلة" }, { word: "Cement", arabic: "أسمنت" }], tip: "Schwa هو أكثر صوت في الإنجليزية — في كل الكلمات تقريباً" },
      { sound: "Unstressed syllables", symbol: "/ə/", arabicExplain: "المقاطع غير المشددة بتتحول لـ Schwa", arabicClose: "بتتنطق أَ خفيفة", examples: [{ word: "Laboratory", arabic: "مختبر" }, { word: "Temperature", arabic: "حرارة" }, { word: "Aggregate", arabic: "ركام" }], tip: "ركز على المقطع المشدد — الباقي بيكون Schwa" },
    ],
  },
  {
    id: "pl19", title: "نطق كلمات المختبر الصعبة 1", icon: "🏋️",
    description: "كلمات مختبر نطقها صعب",
    sounds: [
      { sound: "Specification", symbol: "/ˌspesɪfɪˈkeɪʃn/", arabicExplain: "سبيسيفيكيشن — التشديد على KAY", arabicClose: "سبيسيفي-كَي-شن", examples: [{ word: "Specification", arabic: "مواصفة" }], tip: "spec-i-fi-CAY-tion" },
      { sound: "Permeability", symbol: "/ˌpɜːmiəˈbɪlɪti/", arabicExplain: "بيرميابيليتي — التشديد على BIL", arabicClose: "بير-ميا-بِل-يتي", examples: [{ word: "Permeability", arabic: "نفاذية" }], tip: "per-me-a-BIL-i-ty" },
      { sound: "Reinforcement", symbol: "/ˌriːɪnˈfɔːsmənt/", arabicExplain: "رينفورسمنت — التشديد على FORCE", arabicClose: "ري-إن-فُورس-منت", examples: [{ word: "Reinforcement", arabic: "تسليح" }], tip: "re-in-FORCE-ment" },
    ],
  },
  {
    id: "pl20", title: "نطق كلمات المختبر الصعبة 2", icon: "🏋️",
    description: "مزيد من الكلمات الصعبة",
    sounds: [
      { sound: "Consolidation", symbol: "/kənˌsɒlɪˈdeɪʃn/", arabicExplain: "كونسوليديشن — التشديد على DAY", arabicClose: "كون-سولي-دَي-شن", examples: [{ word: "Consolidation", arabic: "تماسك" }], tip: "con-sol-i-DAY-tion" },
      { sound: "Compressive", symbol: "/kəmˈpresɪv/", arabicExplain: "كومبريسيف — التشديد على PRESS", arabicClose: "كوم-بْرِس-يف", examples: [{ word: "Compressive", arabic: "ضغطي" }], tip: "com-PRESS-ive" },
      { sound: "Temperature", symbol: "/ˈtemprətʃər/", arabicExplain: "تيمبرتشر — 3 مقاطع مش 4!", arabicClose: "تِمبر-تشر", examples: [{ word: "Temperature", arabic: "حرارة" }], tip: "TEMP-ra-ture — مش tem-per-a-ture!" },
    ],
  },
  {
    id: "pl21", title: "Connected Speech — ربط الكلمات", icon: "🔗",
    description: "إزاي الكلمات بتتربط مع بعض في الكلام",
    sounds: [
      { sound: "Linking", symbol: "ربط", arabicExplain: "لما كلمة تخلص بساكن واللي بعدها تبدأ بمتحرك — بيتربطوا", arabicClose: "بيبقى صوت واحد", examples: [{ word: "Turn it on", arabic: "شغله" }, { word: "Check it out", arabic: "افحصه" }], tip: "turn-it-on → تيرنيتون" },
      { sound: "Reduction", symbol: "اختصار", arabicExplain: "كلمات صغيرة بتتنطق أسرع وأخف", arabicClose: "بتتاكل في الكلام", examples: [{ word: "Want to → wanna", arabic: "عايز" }, { word: "Going to → gonna", arabic: "هـ" }], tip: "في الكلام السريع الكلمات بتتاكل" },
    ],
  },
  {
    id: "pl22", title: "تنغيم الجملة — Intonation", icon: "📈",
    description: "متى الصوت يطلع ومتى ينزل",
    sounds: [
      { sound: "Falling ↘", symbol: "↘", arabicExplain: "الصوت بينزل في آخر الجملة الخبرية", arabicClose: "نزول", examples: [{ word: "The result is good.", arabic: "النتيجة كويسة" }, { word: "I finished the test.", arabic: "خلصت الاختبار" }], tip: "الجمل العادية الصوت بينزل في الآخر" },
      { sound: "Rising ↗", symbol: "↗", arabicExplain: "الصوت بيطلع في الأسئلة بنعم/لا", arabicClose: "طلوع", examples: [{ word: "Is it ready?", arabic: "جاهز؟" }, { word: "Did you finish?", arabic: "خلصت؟" }], tip: "أسئلة Yes/No الصوت بيطلع" },
    ],
  },
  // ─── NEW PHONICS LESSONS 23-30 ───
  {
    id: "pl23", title: "أصوات EA و EE و IE", icon: "🎯",
    description: "حروف علة مزدوجة مهمة",
    sounds: [
      { sound: "EA = /iː/", symbol: "/iː/", arabicExplain: "EA غالباً بتتنطق إيي طويلة", arabicClose: "= إيي", examples: [{ word: "Beam", arabic: "كمرة" }, { word: "Heat", arabic: "حرارة" }, { word: "Seal", arabic: "ختم" }], tip: "EA = إيي في معظم الكلمات" },
      { sound: "EE = /iː/", symbol: "/iː/", arabicExplain: "EE دايماً إيي طويلة", arabicClose: "= إيي", examples: [{ word: "Steel", arabic: "صلب" }, { word: "Sheet", arabic: "لوح" }, { word: "Speed", arabic: "سرعة" }], tip: "EE = إيي دايماً" },
      { sound: "IE = /aɪ/", symbol: "/aɪ/", arabicExplain: "IE غالباً = آي", arabicClose: "= آي", examples: [{ word: "Tie", arabic: "ربط" }, { word: "Die", arabic: "قالب" }, { word: "Pie", arabic: "كعكة" }], tip: "IE في آخر الكلمة = آي" },
    ],
  },
  {
    id: "pl24", title: "الأصوات المتشابهة B/P D/T", icon: "🔀",
    description: "فرّق بين الأصوات المتشابهة",
    sounds: [
      { sound: "B vs P", symbol: "/b/ vs /p/", arabicExplain: "B = مع اهتزاز | P = بدون اهتزاز", arabicClose: "ب vs بدون اهتزاز", examples: [{ word: "Bar / Par", arabic: "قضيب / قيمة متعادلة" }, { word: "Bit / Pit", arabic: "جزء / حفرة" }], tip: "حط إيدك على الحنجرة — B فيه اهتزاز P مفيش" },
      { sound: "D vs T", symbol: "/d/ vs /t/", arabicExplain: "D = مع اهتزاز | T = بدون اهتزاز", arabicClose: "د vs ت", examples: [{ word: "Dry / Try", arabic: "جاف / حاول" }, { word: "Dense / Tense", arabic: "كثيف / مشدود" }], tip: "D = صوت مجهور | T = صوت مهموس" },
    ],
  },
  {
    id: "pl25", title: "أصوات AI و AY و EI", icon: "📐",
    description: "تشكيلات حروف العلة",
    sounds: [
      { sound: "AI = /eɪ/", symbol: "/eɪ/", arabicExplain: "AI في النص = إي", arabicClose: "= إي", examples: [{ word: "Strain", arabic: "إجهاد" }, { word: "Drain", arabic: "تصريف" }, { word: "Plain", arabic: "مستوي" }], tip: "AI = إي في معظم الكلمات" },
      { sound: "AY = /eɪ/", symbol: "/eɪ/", arabicExplain: "AY في الآخر = إي", arabicClose: "= إي", examples: [{ word: "Spray", arabic: "رش" }, { word: "Clay", arabic: "طين" }, { word: "Delay", arabic: "تأخير" }], tip: "AY في آخر الكلمة = إي" },
      { sound: "EI = /eɪ/ أو /iː/", symbol: "متعدد", arabicExplain: "EI ليها أكتر من نطق", arabicClose: "= إي أو إيي", examples: [{ word: "Vein", arabic: "وريد/عرق" }, { word: "Receive", arabic: "يستلم" }, { word: "Weight", arabic: "وزن" }], tip: "EI = إي في الغالب" },
    ],
  },
  {
    id: "pl26", title: "نطق كلمات المختبر 3", icon: "🏋️",
    description: "كلمات متقدمة في المختبر",
    sounds: [
      { sound: "Geotechnical", symbol: "/ˌdʒiːoʊˈteknɪkl/", arabicExplain: "جيوتيكنيكل — التشديد على TECH", arabicClose: "جيو-تِك-نيكل", examples: [{ word: "Geotechnical", arabic: "جيوتقني" }], tip: "geo-TECH-ni-cal" },
      { sound: "Hydration", symbol: "/haɪˈdreɪʃn/", arabicExplain: "هايدريشن — التشديد على DRAY", arabicClose: "هاي-دْرَي-شن", examples: [{ word: "Hydration", arabic: "إماهة" }], tip: "hy-DRAY-tion" },
      { sound: "Compressibility", symbol: "/kəmˌpresəˈbɪlɪti/", arabicExplain: "كومبريسيبيليتي — التشديد على BIL", arabicClose: "كوم-بريسا-بِل-يتي", examples: [{ word: "Compressibility", arabic: "انضغاطية" }], tip: "com-press-a-BIL-ity" },
    ],
  },
  {
    id: "pl27", title: "نطق الأعداد والكسور", icon: "🔢",
    description: "إزاي تنطق الأرقام في الاختبارات",
    sounds: [
      { sound: "Decimals", symbol: "عشري", arabicExplain: "النقطة العشرية = point | 3.5 = three point five", arabicClose: "بوينت", examples: [{ word: "0.45", arabic: "زيرو بوينت فور فايف" }, { word: "2.65", arabic: "تو بوينت سيكس فايف" }], tip: "كل رقم بعد النقطة بيتقرأ لوحده" },
      { sound: "Fractions", symbol: "كسور", arabicExplain: "1/2 = one half | 1/4 = one quarter | 3/4 = three quarters", arabicClose: "هاف / كوارتر", examples: [{ word: "1/2 inch", arabic: "نص بوصة" }, { word: "3/4 inch", arabic: "ثلاثة أرباع بوصة" }], tip: "half = نص | quarter = ربع" },
      { sound: "Percentages", symbol: "%", arabicExplain: "% = percent | 95% = ninety-five percent", arabicClose: "بيرسينت", examples: [{ word: "95%", arabic: "ناينتي فايف بيرسينت" }, { word: "0.5%", arabic: "زيرو بوينت فايف بيرسينت" }], tip: "percent دايماً في الآخر" },
    ],
  },
  {
    id: "pl28", title: "نطق الحروف الساكنة المزدوجة", icon: "✌️",
    description: "حروف ساكنة متكررة",
    sounds: [
      { sound: "SS = /s/", symbol: "/s/", arabicExplain: "SS بتتنطق S عادية", arabicClose: "= س", examples: [{ word: "Pressure", arabic: "ضغط" }, { word: "Compression", arabic: "انضغاط" }, { word: "Assessment", arabic: "تقييم" }], tip: "SS = S واحدة في النطق" },
      { sound: "TT = /t/", symbol: "/t/", arabicExplain: "TT بتتنطق T عادية", arabicClose: "= ت", examples: [{ word: "Setting", arabic: "شك" }, { word: "Splitting", arabic: "انشطار" }, { word: "Fitting", arabic: "تركيب" }], tip: "TT = T واحدة في النطق" },
      { sound: "LL = /l/", symbol: "/l/", arabicExplain: "LL بتتنطق L عادية", arabicClose: "= ل", examples: [{ word: "Parallel", arabic: "متوازي" }, { word: "Alloy", arabic: "سبيكة" }, { word: "Filler", arabic: "حشو" }], tip: "LL = L واحدة في النطق" },
    ],
  },
  {
    id: "pl29", title: "التنغيم في المختبر", icon: "🎵",
    description: "متى تعلّي ومتى تنزّل صوتك",
    sounds: [
      { sound: "Lists ↗↗↘", symbol: "تعداد", arabicExplain: "في القوائم — الصوت بيطلع في كل عنصر ماعدا الأخير بينزل", arabicClose: "طلوع طلوع نزول", examples: [{ word: "Cement↗, water↗, and sand↘", arabic: "أسمنت وماء ورمل" }], tip: "ارفع صوتك في كل عنصر وانزل في الأخير" },
      { sound: "Clarification ↗", symbol: "↗", arabicExplain: "لما بتستوضح — الصوت بيطلع", arabicClose: "طلوع", examples: [{ word: "You mean 30 MPa?↗", arabic: "تقصد 30 ميجا؟" }], tip: "ارفع صوتك لما بتتأكد" },
    ],
  },
  {
    id: "pl30", title: "كلمات متشابهة النطق", icon: "👀",
    description: "كلمات ليها نطق قريب لكن معنى مختلف",
    sounds: [
      { sound: "Pour vs Poor", symbol: "بور", arabicExplain: "Pour = صب | Poor = ضعيف/فقير — نفس النطق تقريباً!", arabicClose: "بور", examples: [{ word: "Pour the concrete", arabic: "صب الخرسانة" }, { word: "Poor quality", arabic: "جودة ضعيفة" }], tip: "السياق بيفرق!" },
      { sound: "Wait vs Weight", symbol: "ويت", arabicExplain: "Wait = استنى | Weight = وزن — نفس النطق بالظبط!", arabicClose: "ويت", examples: [{ word: "Wait for the result", arabic: "استنى النتيجة" }, { word: "Weight of sample", arabic: "وزن العينة" }], tip: "Homophones = كلمات متشابهة النطق مختلفة المعنى" },
      { sound: "Steal vs Steel", symbol: "ستيل", arabicExplain: "Steal = يسرق | Steel = صلب — نفس النطق!", arabicClose: "ستيل", examples: [{ word: "Steel reinforcement", arabic: "تسليح صلب" }, { word: "Steal", arabic: "يسرق" }], tip: "في المختبر دايماً Steel = صلب" },
    ],
  },
];

const Phonics = () => {
  const [phonicsProgress, setPhonicsProgress] = useState(getPhonicsProgress());
  const [activeLesson, setActiveLesson] = useState<PhonicsLesson | null>(null);
  const [activeSoundIdx, setActiveSoundIdx] = useState(0);
  const [lessonDone, setLessonDone] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const [xpNotif, setXpNotif] = useState<{ xp: number; achievements: Achievement[]; leveledUp: boolean } | null>(null);

  const isLessonUnlocked = (i: number) => {
    if (i === 0) return true;
    return phonicsProgress[phonicsLessons[i - 1].id];
  };

  const startLesson = (lesson: PhonicsLesson) => {
    setActiveLesson(lesson);
    setActiveSoundIdx(0);
    setLessonDone(false);
  };

  const nextSound = () => {
    if (!activeLesson) return;
    if (activeSoundIdx < activeLesson.sounds.length - 1) {
      setActiveSoundIdx(i => i + 1);
    } else {
      savePhonicsLessonDone(activeLesson.id);
      setPhonicsProgress(getPhonicsProgress());
      setLessonDone(true);
      const result = addXP(XP_REWARDS.phonicsLesson, "phonicsLesson");
      setXpNotif({ xp: XP_REWARDS.phonicsLesson, achievements: result.newAchievements, leveledUp: result.leveledUp });
    }
  };

  // Lesson done
  if (lessonDone && activeLesson) {
    return (
      <div className="text-center">
        {xpNotif && <XPNotification {...xpNotif} onDone={() => setXpNotif(null)} />}
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-2">أحسنت!</h3>
          <p className="text-muted-foreground mb-4">أكملت درس: {activeLesson.title}</p>
          <p className="text-accent font-bold mb-6">+{XP_REWARDS.phonicsLesson} XP ⭐</p>
          <button onClick={() => { setActiveLesson(null); setLessonDone(false); }} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold">رجوع للدروس</button>
        </div>
      </div>
    );
  }

  // Active lesson - sound detail
  if (activeLesson) {
    const sound = activeLesson.sounds[activeSoundIdx];
    return (
      <div>
        {xpNotif && <XPNotification {...xpNotif} onDone={() => setXpNotif(null)} />}
        <button onClick={() => setActiveLesson(null)} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
          <ChevronLeft size={14} /> رجوع
        </button>
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-foreground">{activeLesson.title}</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{activeSoundIdx + 1}/{activeLesson.sounds.length}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-6">
            <div className="bg-gradient-to-l from-primary to-accent h-2 rounded-full transition-all" style={{ width: `${((activeSoundIdx + 1) / activeLesson.sounds.length) * 100}%` }} />
          </div>

          <div className="text-center mb-6">
            <p className="text-5xl font-display font-extrabold text-primary mb-2">{sound.sound}</p>
            <p className="text-xl text-muted-foreground">{sound.symbol}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-muted rounded-xl p-4">
              <h4 className="font-display font-bold text-foreground mb-1">📖 طريقة النطق</h4>
              <p className="text-foreground">{sound.arabicExplain}</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
              <h4 className="font-display font-bold text-primary mb-1">🔄 الصوت القريب بالعربي</h4>
              <p className="text-foreground">{sound.arabicClose}</p>
            </div>
            <div className="bg-accent/5 rounded-xl p-4 border border-accent/20">
              <h4 className="font-display font-bold text-accent mb-1">💡 نصيحة</h4>
              <p className="text-foreground">{sound.tip}</p>
            </div>

            <div>
              <h4 className="font-display font-bold text-foreground mb-2">🔊 أمثلة</h4>
              <SpeedControl speed={speed} onSpeedChange={setSpeed} />
              <div className="space-y-2 mt-3">
                {sound.examples.map(ex => (
                  <div key={ex.word} className="flex items-center justify-between bg-muted rounded-xl p-3">
                    <div>
                      <p className="font-display font-bold text-foreground" dir="ltr">{ex.word}</p>
                      <p className="text-sm text-primary">{ex.arabic}</p>
                    </div>
                    <button onClick={() => speakText(ex.word, speed)} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                      <Volume2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={nextSound} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold mt-6 hover:bg-primary/90 transition-all">
            {activeSoundIdx < activeLesson.sounds.length - 1 ? "الصوت التالي ←" : "✓ إنهاء الدرس"}
          </button>
        </div>
      </div>
    );
  }

  // Lessons list
  const totalDone = phonicsLessons.filter(l => phonicsProgress[l.id]).length;
  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-2">🔤 دروس الأصوات</h2>
      <p className="text-muted-foreground mb-2 text-sm">تعلم كل الأصوات من الصفر — مصمم للمبتدئين</p>
      <p className="text-xs text-accent mb-6">📊 التقدم: {totalDone}/{phonicsLessons.length} درس</p>

      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div className="bg-gradient-to-l from-primary to-accent h-2 rounded-full transition-all" style={{ width: `${(totalDone / phonicsLessons.length) * 100}%` }} />
      </div>

      <div className="space-y-3">
        {phonicsLessons.map((lesson, i) => {
          const unlocked = isLessonUnlocked(i);
          const completed = phonicsProgress[lesson.id];
          return (
            <button
              key={lesson.id}
              onClick={() => unlocked && startLesson(lesson)}
              disabled={!unlocked}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-right ${
                !unlocked ? "bg-muted/30 border-border/50 opacity-50 cursor-not-allowed"
                : completed ? "bg-green-500/10 border-green-500/30"
                : "bg-card border-border hover:border-primary"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                !unlocked ? "bg-muted" : completed ? "bg-green-500/20" : "bg-primary/10"
              }`}>
                {!unlocked ? <Lock size={18} className="text-muted-foreground" /> : completed ? <CheckCircle size={18} className="text-green-400" /> : <span>{lesson.icon}</span>}
              </div>
              <div className="flex-1">
                <p className="font-display font-bold text-foreground">{lesson.title}</p>
                <p className="text-xs text-muted-foreground">{lesson.description}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{lesson.sounds.length} أصوات</p>
              </div>
              {completed && <Star size={16} className="text-accent" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Phonics;
