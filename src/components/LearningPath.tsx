import { useState, useEffect } from "react";
import { Lock, CheckCircle, Volume2, ChevronLeft, Star, Zap, BookOpen, Mic, Pen, HelpCircle, Trophy } from "lucide-react";
import { speakText } from "@/lib/phonetics";
import { addXP, XP_REWARDS } from "@/lib/gamification";
import XPNotification from "@/components/XPNotification";
import SpeedControl from "@/components/SpeedControl";
import { Achievement } from "@/lib/gamification";
import {
  UNIT_META,
  MILESTONES,
  getRecommendedStartUnit,
  isMilestoneAfter,
  getNextLesson,
} from "@/lib/learningSystem";

/* ─── Types ─── */
interface LessonContent {
  english: string;
  arabic: string;
  pronunciation: string;
}

interface Lesson {
  id: string;
  title: string;
  titleArabic: string;
  type: "listen" | "read" | "write" | "quiz";
  content: LessonContent[];
}

interface PathUnit {
  id: string;
  title: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

/* ─── Persistence ─── */
const PROGRESS_KEY = "lab-english-learning-path";
function getPathProgress(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}"); } catch { return {}; }
}
function saveLessonDone(id: string) {
  const p = getPathProgress(); p[id] = true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

/* ─── Shuffle ─── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─────────────────── UNITS DATA ─────────────────── */
const units: PathUnit[] = [
  {
    id: "u1", title: "التحيات والأساسيات", icon: "👋", color: "from-green-500 to-emerald-600",
    lessons: [
      { id: "u1l1", title: "Hello & Goodbye", titleArabic: "مرحبا ومع السلامة", type: "listen", content: [
        { english: "Hello",          arabic: "مرحبا",            pronunciation: "هيلو" },
        { english: "Good morning",   arabic: "صباح الخير",       pronunciation: "جود مورنينج" },
        { english: "Good evening",   arabic: "مساء الخير",       pronunciation: "جود إيفنينج" },
        { english: "Goodbye",        arabic: "مع السلامة",       pronunciation: "جود باي" },
        { english: "See you tomorrow",arabic: "أراك غداً",       pronunciation: "سي يو تومورو" },
      ]},
      { id: "u1l2", title: "How are you?", titleArabic: "كيف حالك؟", type: "listen", content: [
        { english: "How are you?",           arabic: "كيف حالك؟",           pronunciation: "هاو آر يو؟" },
        { english: "I am fine, thank you",   arabic: "أنا بخير شكراً",       pronunciation: "آي أم فاين ثانك يو" },
        { english: "Nice to meet you",       arabic: "تشرفت بمعرفتك",        pronunciation: "نايس تو ميت يو" },
        { english: "My name is Ahmed",       arabic: "اسمي أحمد",            pronunciation: "ماي نيم إز أحمد" },
      ]},
      { id: "u1l3", title: "Basic Greetings Quiz", titleArabic: "اختبار التحيات", type: "quiz", content: [
        { english: "Hello",        arabic: "مرحبا",         pronunciation: "هيلو" },
        { english: "Good morning", arabic: "صباح الخير",    pronunciation: "جود مورنينج" },
        { english: "Goodbye",      arabic: "مع السلامة",    pronunciation: "جود باي" },
        { english: "How are you?", arabic: "كيف حالك؟",    pronunciation: "هاو آر يو؟" },
      ]},
    ],
  },
  {
    id: "u2", title: "الأرقام والعد", icon: "🔢", color: "from-blue-500 to-cyan-600",
    lessons: [
      { id: "u2l1", title: "Numbers 1-10", titleArabic: "الأرقام 1-10", type: "listen", content: [
        { english: "One",   arabic: "واحد",  pronunciation: "وان" },
        { english: "Two",   arabic: "اثنان", pronunciation: "تو" },
        { english: "Three", arabic: "ثلاثة", pronunciation: "ثري" },
        { english: "Four",  arabic: "أربعة", pronunciation: "فور" },
        { english: "Five",  arabic: "خمسة",  pronunciation: "فايف" },
        { english: "Six",   arabic: "ستة",   pronunciation: "سيكس" },
        { english: "Seven", arabic: "سبعة",  pronunciation: "سيفن" },
        { english: "Eight", arabic: "ثمانية",pronunciation: "إيت" },
        { english: "Nine",  arabic: "تسعة",  pronunciation: "ناين" },
        { english: "Ten",   arabic: "عشرة",  pronunciation: "تين" },
      ]},
      { id: "u2l2", title: "Numbers 11-20", titleArabic: "الأرقام 11-20", type: "listen", content: [
        { english: "Eleven",  arabic: "أحد عشر",  pronunciation: "إليفن" },
        { english: "Twelve",  arabic: "اثنا عشر", pronunciation: "تويلف" },
        { english: "Fifteen", arabic: "خمسة عشر", pronunciation: "فيفتين" },
        { english: "Twenty",  arabic: "عشرون",    pronunciation: "توينتي" },
      ]},
      { id: "u2l3", title: "Write Numbers", titleArabic: "اكتب الأرقام", type: "write", content: [
        { english: "One",   arabic: "واحد",  pronunciation: "وان" },
        { english: "Three", arabic: "ثلاثة", pronunciation: "ثري" },
        { english: "Five",  arabic: "خمسة",  pronunciation: "فايف" },
        { english: "Ten",   arabic: "عشرة",  pronunciation: "تين" },
      ]},
    ],
  },
  {
    id: "u3", title: "في المختبر", icon: "🔬", color: "from-purple-500 to-violet-600",
    lessons: [
      { id: "u3l1", title: "Lab Greetings", titleArabic: "تحيات المختبر", type: "listen", content: [
        { english: "Welcome to the lab",         arabic: "مرحباً بك في المختبر",  pronunciation: "ويلكم تو ذا لاب" },
        { english: "The equipment is ready",     arabic: "المعدات جاهزة",          pronunciation: "ذا إكويبمنت إز ريدي" },
        { english: "Please wear safety goggles", arabic: "ارتدِ نظارات السلامة",   pronunciation: "بليز وير سيفتي جوجلز" },
        { english: "Let me show you",            arabic: "خليني أوريك",             pronunciation: "ليت مي شو يو" },
      ]},
      { id: "u3l2", title: "Basic Actions", titleArabic: "الأفعال الأساسية", type: "read", content: [
        { english: "Test",    arabic: "اختبار", pronunciation: "تيست" },
        { english: "Mix",     arabic: "خلط",    pronunciation: "ميكس" },
        { english: "Pour",    arabic: "صب",     pronunciation: "بور" },
        { english: "Check",   arabic: "فحص",    pronunciation: "تشيك" },
        { english: "Measure", arabic: "قياس",   pronunciation: "ميجر" },
        { english: "Record",  arabic: "سجل",    pronunciation: "ريكورد" },
      ]},
      { id: "u3l3", title: "Lab Actions Quiz", titleArabic: "اختبار الأفعال", type: "quiz", content: [
        { english: "Test",    arabic: "اختبار", pronunciation: "تيست" },
        { english: "Mix",     arabic: "خلط",    pronunciation: "ميكس" },
        { english: "Pour",    arabic: "صب",     pronunciation: "بور" },
        { english: "Measure", arabic: "قياس",   pronunciation: "ميجر" },
      ]},
    ],
  },
  {
    id: "u4", title: "مواد المختبر", icon: "🧪", color: "from-orange-500 to-amber-600",
    lessons: [
      { id: "u4l1", title: "Concrete Terms", titleArabic: "مصطلحات الخرسانة", type: "listen", content: [
        { english: "Concrete",  arabic: "خرسانة",  pronunciation: "كونكريت" },
        { english: "Cement",    arabic: "أسمنت",   pronunciation: "سيمنت" },
        { english: "Aggregate", arabic: "ركام",    pronunciation: "أجريجيت" },
        { english: "Slump",     arabic: "هبوط",    pronunciation: "سلامب" },
        { english: "Curing",    arabic: "معالجة",  pronunciation: "كيورينج" },
      ]},
      { id: "u4l2", title: "Soil Terms", titleArabic: "مصطلحات التربة", type: "listen", content: [
        { english: "Soil",       arabic: "تربة",   pronunciation: "سويل" },
        { english: "Clay",       arabic: "طين",    pronunciation: "كلاي" },
        { english: "Sand",       arabic: "رمل",    pronunciation: "ساند" },
        { english: "Compaction", arabic: "دمك",    pronunciation: "كومباكشن" },
        { english: "Moisture",   arabic: "رطوبة",  pronunciation: "مويستشر" },
      ]},
      { id: "u4l3", title: "Lab Equipment", titleArabic: "معدات المختبر", type: "write", content: [
        { english: "Scale", arabic: "ميزان", pronunciation: "سكيل" },
        { english: "Oven",  arabic: "فرن",   pronunciation: "أوفن" },
        { english: "Sieve", arabic: "منخل",  pronunciation: "سيف" },
        { english: "Mold",  arabic: "قالب",  pronunciation: "مولد" },
      ]},
      { id: "u4l4", title: "Materials Quiz", titleArabic: "اختبار المواد", type: "quiz", content: [
        { english: "Concrete", arabic: "خرسانة", pronunciation: "كونكريت" },
        { english: "Soil",     arabic: "تربة",   pronunciation: "سويل" },
        { english: "Clay",     arabic: "طين",    pronunciation: "كلاي" },
        { english: "Cement",   arabic: "أسمنت",  pronunciation: "سيمنت" },
      ]},
    ],
  },
  {
    id: "u5", title: "جمل المختبر", icon: "💬", color: "from-teal-500 to-green-600",
    lessons: [
      { id: "u5l1", title: "Requesting Tests", titleArabic: "طلب اختبارات", type: "read", content: [
        { english: "Can you run the slump test?",       arabic: "ممكن تعمل اختبار الهبوط؟",       pronunciation: "كان يو ران ذا سلامب تيست؟" },
        { english: "We need the results by tomorrow",  arabic: "محتاجين النتائج بكرة",             pronunciation: "وي نيد ذا ريزالتس باي تومورو" },
        { english: "Please prepare three specimens",   arabic: "جهز ثلاث عينات",                  pronunciation: "بليز بريبير ثري سبيسيمنز" },
      ]},
      { id: "u5l2", title: "Reporting Results", titleArabic: "الإبلاغ عن النتائج", type: "read", content: [
        { english: "The compressive strength is 30 MPa",arabic: "مقاومة الضغط 30 ميجا باسكال",  pronunciation: "ذا كومبريسيف سترينث إز ثيرتي ميجاباسكالز" },
        { english: "All results meet the specification",arabic: "كل النتائج مطابقة للمواصفة",    pronunciation: "أول ريزالتس ميت ذا سبيسيفيكيشن" },
        { english: "The sample failed the test",       arabic: "العينة فشلت في الاختبار",        pronunciation: "ذا سامبل فيلد ذا تيست" },
      ]},
      { id: "u5l3", title: "Safety Instructions", titleArabic: "تعليمات السلامة", type: "write", content: [
        { english: "Wear your safety glasses", arabic: "ارتدِ نظارات السلامة",     pronunciation: "وير يور سيفتي جلاسيز" },
        { english: "Keep the work area clean", arabic: "حافظ على نظافة مكان العمل",pronunciation: "كيب ذا وورك إيريا كلين" },
        { english: "Do not touch hot equipment",arabic: "لا تلمس المعدات الساخنة", pronunciation: "دو نوت تاتش هوت إكويبمنت" },
      ]},
      { id: "u5l4", title: "Lab Sentences Quiz", titleArabic: "اختبار الجمل", type: "quiz", content: [
        { english: "Take a sample",    arabic: "خذ عينة",         pronunciation: "تيك أ سامبل" },
        { english: "Write the report", arabic: "اكتب التقرير",     pronunciation: "رايت ذا ريبورت" },
        { english: "The result is good",arabic: "النتيجة جيدة",   pronunciation: "ذا ريزالت إز جود" },
      ]},
    ],
  },
  {
    id: "u6", title: "المحادثات الكاملة", icon: "🗣️", color: "from-rose-500 to-pink-600",
    lessons: [
      { id: "u6l1", title: "Morning Briefing", titleArabic: "اجتماع الصباح", type: "read", content: [
        { english: "Good morning everyone. Today we have three concrete pours.", arabic: "صباح الخير للجميع. النهاردة عندنا ثلاث صبات.", pronunciation: "جود مورنينج إفريوان. توداي وي هاف ثري كونكريت بورز." },
        { english: "The first truck arrives at 8 AM.",                          arabic: "أول عربية هتوصل الساعة 8.",                    pronunciation: "ذا فيرست تراك أرايفز أت إيت إي إم." },
        { english: "I will take slump tests from each truck.",                  arabic: "هاخد اختبار هبوط من كل عربية.",                 pronunciation: "آي ويل تيك سلامب تيستس فروم إيتش تراك." },
      ]},
      { id: "u6l2", title: "Client Visit", titleArabic: "زيارة العميل", type: "read", content: [
        { english: "Welcome to our laboratory.",                  arabic: "مرحباً بكم في مختبرنا.",        pronunciation: "ويلكم تو أور لابوراتوري." },
        { english: "This is our compression testing machine.",    arabic: "دي ماكينة اختبار الضغط.",       pronunciation: "ذيس إز أور كومبريشن تيستينج ماشين." },
        { english: "All our equipment is calibrated annually.",   arabic: "كل معداتنا بتتعاير سنوياً.",   pronunciation: "أول أور إكويبمنت إز كاليبريتد أنيوالي." },
      ]},
      { id: "u6l3", title: "Conversation Quiz", titleArabic: "اختبار المحادثات", type: "quiz", content: [
        { english: "The truck is on the way", arabic: "العربية في الطريق",   pronunciation: "ذا تراك إز أون ذا واي" },
        { english: "Check the delivery ticket",arabic: "افحص بطاقة التوريد", pronunciation: "تشيك ذا ديليفري تيكت" },
        { english: "Record the result",        arabic: "سجل النتيجة",        pronunciation: "ريكورد ذا ريزالت" },
      ]},
    ],
  },
  {
    id: "u7", title: "تقارير المختبر", icon: "📝", color: "from-cyan-500 to-blue-600",
    lessons: [
      { id: "u7l1", title: "Report Structure", titleArabic: "هيكل التقرير", type: "read", content: [
        { english: "Report number",           arabic: "رقم التقرير",                  pronunciation: "ريبورت نامبر" },
        { english: "Date of testing",         arabic: "تاريخ الاختبار",               pronunciation: "ديت أوف تيستينج" },
        { english: "Sample description",      arabic: "وصف العينة",                   pronunciation: "سامبل ديسكريبشن" },
        { english: "Test method used",        arabic: "طريقة الاختبار المستخدمة",     pronunciation: "تيست ميثود يوزد" },
        { english: "Results and conclusion",  arabic: "النتائج والخلاصة",             pronunciation: "ريزالتس أند كونكلوجن" },
      ]},
      { id: "u7l2", title: "Writing Results", titleArabic: "كتابة النتائج", type: "write", content: [
        { english: "Pass",           arabic: "ناجح",       pronunciation: "باس" },
        { english: "Fail",           arabic: "راسب",       pronunciation: "فيل" },
        { english: "Satisfactory",   arabic: "مُرضي",      pronunciation: "ساتيسفاكتوري" },
        { english: "Non-conforming", arabic: "غير مطابق",  pronunciation: "نون كونفورمينج" },
      ]},
      { id: "u7l3", title: "Report Phrases", titleArabic: "عبارات التقارير", type: "read", content: [
        { english: "The result meets the specification",       arabic: "النتيجة مطابقة للمواصفة",     pronunciation: "ذا ريزالت ميتس ذا سبيسيفيكيشن" },
        { english: "The sample does not comply",              arabic: "العينة غير مطابقة",            pronunciation: "ذا سامبل دوز نوت كومبلاي" },
        { english: "Testing was performed in accordance with",arabic: "تم الاختبار وفقاً لـ",         pronunciation: "تيستينج واز بيرفورمد إن أكوردانس ويذ" },
      ]},
      { id: "u7l4", title: "Reports Quiz", titleArabic: "اختبار التقارير", type: "quiz", content: [
        { english: "Report",        arabic: "تقرير",    pronunciation: "ريبورت" },
        { english: "Result",        arabic: "نتيجة",    pronunciation: "ريزالت" },
        { english: "Specification", arabic: "مواصفة",   pronunciation: "سبيسيفيكيشن" },
        { english: "Sample",        arabic: "عينة",     pronunciation: "سامبل" },
      ]},
    ],
  },
  {
    id: "u8", title: "معدات متقدمة", icon: "🔧", color: "from-amber-500 to-orange-600",
    lessons: [
      { id: "u8l1", title: "Advanced Equipment", titleArabic: "معدات متقدمة", type: "listen", content: [
        { english: "Compression machine", arabic: "ماكينة الضغط",      pronunciation: "كومبريشن مشين" },
        { english: "Vibrating table",     arabic: "طاولة هزازة",        pronunciation: "فايبريتينج تيبل" },
        { english: "Core drill",          arabic: "مثقاب اللب",          pronunciation: "كور دريل" },
        { english: "Marshall apparatus",  arabic: "جهاز مارشال",         pronunciation: "مارشال أباراتس" },
        { english: "Rebound hammer",      arabic: "مطرقة الارتداد",      pronunciation: "ريباوند هامر" },
      ]},
      { id: "u8l2", title: "Equipment Actions", titleArabic: "أفعال المعدات", type: "read", content: [
        { english: "Calibrate the machine",        arabic: "عاير الماكينة",             pronunciation: "كاليبريت ذا مشين" },
        { english: "Replace the worn parts",       arabic: "غير القطع التالفة",          pronunciation: "ريبليس ذا وورن بارتس" },
        { english: "Clean the equipment after use",arabic: "نظف المعدات بعد الاستخدام", pronunciation: "كلين ذا إكويبمنت آفتر يوز" },
      ]},
      { id: "u8l3", title: "Equipment Quiz", titleArabic: "اختبار المعدات", type: "quiz", content: [
        { english: "Compression machine", arabic: "ماكينة الضغط",    pronunciation: "كومبريشن مشين" },
        { english: "Core drill",          arabic: "مثقاب اللب",       pronunciation: "كور دريل" },
        { english: "Vibrating table",     arabic: "طاولة هزازة",      pronunciation: "فايبريتينج تيبل" },
        { english: "Rebound hammer",      arabic: "مطرقة الارتداد",   pronunciation: "ريباوند هامر" },
      ]},
    ],
  },
  {
    id: "u9", title: "اختبارات التربة", icon: "🏗️", color: "from-lime-500 to-green-600",
    lessons: [
      { id: "u9l1", title: "Soil Test Terms", titleArabic: "مصطلحات اختبارات التربة", type: "listen", content: [
        { english: "Proctor test",       arabic: "اختبار بروكتور",         pronunciation: "بروكتور تيست" },
        { english: "CBR test",           arabic: "اختبار سي بي آر",        pronunciation: "سي بي آر تيست" },
        { english: "Field density test", arabic: "اختبار الكثافة الحقلية", pronunciation: "فيلد دينسيتي تيست" },
        { english: "Atterberg limits",   arabic: "حدود أتربرج",            pronunciation: "أتربرج ليميتس" },
        { english: "Hydrometer test",    arabic: "اختبار الهيدروميتر",     pronunciation: "هايدروميتر تيست" },
      ]},
      { id: "u9l2", title: "Soil Descriptions", titleArabic: "وصف التربة", type: "read", content: [
        { english: "The soil is well graded",              arabic: "التربة متدرجة بشكل جيد",       pronunciation: "ذا سويل إز ويل جريديد" },
        { english: "High plasticity clay",                 arabic: "طين عالي اللدونة",              pronunciation: "هاي بلاستيسيتي كلاي" },
        { english: "The moisture content is above optimum",arabic: "المحتوى المائي أعلى من الأمثل",pronunciation: "ذا مويستشر كونتينت إز أبوف أوبتيمم" },
      ]},
      { id: "u9l3", title: "Soil Tests Quiz", titleArabic: "اختبار التربة", type: "quiz", content: [
        { english: "Proctor test",   arabic: "اختبار بروكتور",         pronunciation: "بروكتور تيست" },
        { english: "Field density",  arabic: "الكثافة الحقلية",         pronunciation: "فيلد دينسيتي" },
        { english: "CBR",            arabic: "نسبة تحمل كاليفورنيا",   pronunciation: "سي بي آر" },
        { english: "Liquid limit",   arabic: "حد السيولة",              pronunciation: "ليكويد ليميت" },
      ]},
    ],
  },
  {
    id: "u10", title: "اختبارات الأسفلت", icon: "🛣️", color: "from-gray-600 to-gray-800",
    lessons: [
      { id: "u10l1", title: "Asphalt Terms", titleArabic: "مصطلحات الأسفلت", type: "listen", content: [
        { english: "Bitumen content",      arabic: "نسبة البيتومين",        pronunciation: "بيتيومن كونتينت" },
        { english: "Air voids",            arabic: "فراغات هوائية",          pronunciation: "إير فويدز" },
        { english: "Bulk specific gravity",arabic: "الكثافة الظاهرية",       pronunciation: "بالك سبيسيفيك جرافيتي" },
        { english: "Stability and flow",   arabic: "الثبات والانسياب",        pronunciation: "ستابيليتي أند فلو" },
        { english: "Penetration grade",    arabic: "درجة الاختراق",           pronunciation: "بينيتريشن جريد" },
      ]},
      { id: "u10l2", title: "Asphalt Descriptions", titleArabic: "وصف الأسفلت", type: "read", content: [
        { english: "The bitumen content is 5.2 percent",arabic: "نسبة البيتومين 5.2 بالمائة", pronunciation: "ذا بيتيومن كونتينت إز فايف بوينت تو بيرسينت" },
        { english: "The air voids are within limits",   arabic: "الفراغات الهوائية ضمن الحدود",pronunciation: "ذا إير فويدز آر ويذين ليميتس" },
        { english: "Marshall stability is 12 kN",       arabic: "ثبات مارشال 12 كيلو نيوتن",  pronunciation: "مارشال ستابيليتي إز تويلف كيلونيوتنز" },
      ]},
      { id: "u10l3", title: "Asphalt Quiz", titleArabic: "اختبار الأسفلت", type: "quiz", content: [
        { english: "Bitumen",       arabic: "بيتومين",  pronunciation: "بيتيومن" },
        { english: "Stability",     arabic: "ثبات",     pronunciation: "ستابيليتي" },
        { english: "Penetration",   arabic: "اختراق",   pronunciation: "بينيتريشن" },
        { english: "Softening point",arabic: "درجة التلين",pronunciation: "سوفنينج بوينت" },
      ]},
    ],
  },
  {
    id: "u11", title: "المواصفات والمعايير", icon: "📋", color: "from-indigo-500 to-purple-600",
    lessons: [
      { id: "u11l1", title: "Standards", titleArabic: "المعايير", type: "listen", content: [
        { english: "ASTM standard",        arabic: "معيار أستم",          pronunciation: "إي إس تي إم ستاندرد" },
        { english: "BS standard",          arabic: "المعيار البريطاني",   pronunciation: "بي إس ستاندرد" },
        { english: "Specification limits", arabic: "حدود المواصفة",       pronunciation: "سبيسيفيكيشن ليميتس" },
        { english: "Tolerance",            arabic: "تفاوت مسموح",         pronunciation: "توليرانس" },
        { english: "Compliance",           arabic: "مطابقة",              pronunciation: "كومبلايانس" },
      ]},
      { id: "u11l2", title: "Specification Sentences", titleArabic: "جمل المواصفات", type: "read", content: [
        { english: "According to ASTM C39",           arabic: "وفقاً لمعيار أستم C39",            pronunciation: "أكوردينج تو إي إس تي إم سي ثيرتي ناين" },
        { english: "The result is within the tolerance",arabic: "النتيجة ضمن التفاوت المسموح",    pronunciation: "ذا ريزالت إز ويذين ذا توليرانس" },
        { english: "Non-compliant with specification", arabic: "غير مطابق للمواصفة",              pronunciation: "نون كومبلايانت ويذ سبيسيفيكيشن" },
      ]},
      { id: "u11l3", title: "Standards Quiz", titleArabic: "اختبار المعايير", type: "quiz", content: [
        { english: "Specification", arabic: "مواصفة",  pronunciation: "سبيسيفيكيشن" },
        { english: "Tolerance",     arabic: "تفاوت",   pronunciation: "توليرانس" },
        { english: "Compliance",    arabic: "مطابقة",  pronunciation: "كومبلايانس" },
        { english: "Standard",      arabic: "معيار",   pronunciation: "ستاندرد" },
      ]},
    ],
  },
  {
    id: "u12", title: "حل المشاكل", icon: "🔍", color: "from-red-500 to-rose-600",
    lessons: [
      { id: "u12l1", title: "Problem Words", titleArabic: "كلمات المشاكل", type: "listen", content: [
        { english: "Problem",  arabic: "مشكلة", pronunciation: "بروبلم" },
        { english: "Solution", arabic: "حل",     pronunciation: "سوليوشن" },
        { english: "Defect",   arabic: "عيب",    pronunciation: "ديفكت" },
        { english: "Failure",  arabic: "فشل",    pronunciation: "فيليور" },
        { english: "Reject",   arabic: "رفض",    pronunciation: "ريجكت" },
      ]},
      { id: "u12l2", title: "Troubleshooting Phrases", titleArabic: "عبارات حل المشاكل", type: "read", content: [
        { english: "The concrete failed the test",      arabic: "الخرسانة فشلت في الاختبار",      pronunciation: "ذا كونكريت فيلد ذا تيست" },
        { english: "We need to retest the sample",     arabic: "محتاجين نعيد اختبار العينة",       pronunciation: "وي نيد تو ريتيست ذا سامبل" },
        { english: "The equipment needs calibration",  arabic: "المعدات محتاجة معايرة",             pronunciation: "ذا إكويبمنت نيدز كاليبريشن" },
      ]},
      { id: "u12l3", title: "Problem Solving Quiz", titleArabic: "اختبار حل المشاكل", type: "quiz", content: [
        { english: "Problem",  arabic: "مشكلة", pronunciation: "بروبلم" },
        { english: "Solution", arabic: "حل",     pronunciation: "سوليوشن" },
        { english: "Defect",   arabic: "عيب",    pronunciation: "ديفكت" },
        { english: "Reject",   arabic: "رفض",    pronunciation: "ريجكت" },
      ]},
    ],
  },
  {
    id: "u13", title: "وحدات القياس", icon: "📏", color: "from-sky-500 to-blue-600",
    lessons: [
      { id: "u13l1", title: "Length & Area", titleArabic: "الطول والمساحة", type: "listen", content: [
        { english: "Millimeter",   arabic: "مليمتر",     pronunciation: "ميليميتر" },
        { english: "Centimeter",   arabic: "سنتيمتر",    pronunciation: "سينتيميتر" },
        { english: "Square meter", arabic: "متر مربع",   pronunciation: "سكوير ميتر" },
        { english: "Cubic meter",  arabic: "متر مكعب",   pronunciation: "كيوبيك ميتر" },
        { english: "Diameter",     arabic: "قطر",        pronunciation: "دايميتر" },
      ]},
      { id: "u13l2", title: "Weight & Force", titleArabic: "الوزن والقوة", type: "listen", content: [
        { english: "Kilogram",    arabic: "كيلوجرام",  pronunciation: "كيلوجرام" },
        { english: "Newton",      arabic: "نيوتن",     pronunciation: "نيوتن" },
        { english: "Kilonewton",  arabic: "كيلو نيوتن",pronunciation: "كيلونيوتن" },
        { english: "Megapascal",  arabic: "ميجا باسكال",pronunciation: "ميجا باسكال" },
      ]},
      { id: "u13l3", title: "Units Write", titleArabic: "اكتب الوحدات", type: "write", content: [
        { english: "Degree Celsius", arabic: "درجة مئوية", pronunciation: "ديجري سيلسيوس" },
        { english: "Liter",          arabic: "لتر",        pronunciation: "ليتر" },
        { english: "Percent",        arabic: "بالمائة",    pronunciation: "بيرسينت" },
        { english: "Ratio",          arabic: "نسبة",       pronunciation: "ريشيو" },
      ]},
      { id: "u13l4", title: "Units Quiz", titleArabic: "اختبار الوحدات", type: "quiz", content: [
        { english: "Millimeter",  arabic: "مليمتر",     pronunciation: "ميليميتر" },
        { english: "Megapascal",  arabic: "ميجا باسكال",pronunciation: "ميجا باسكال" },
        { english: "Kilonewton",  arabic: "كيلو نيوتن", pronunciation: "كيلونيوتن" },
        { english: "Cubic meter", arabic: "متر مكعب",   pronunciation: "كيوبيك ميتر" },
      ]},
    ],
  },
  {
    id: "u14", title: "السلامة المهنية", icon: "⛑️", color: "from-red-500 to-orange-600",
    lessons: [
      { id: "u14l1", title: "Safety Equipment", titleArabic: "معدات السلامة", type: "listen", content: [
        { english: "Hard hat",             arabic: "خوذة",        pronunciation: "هارد هات" },
        { english: "Safety glasses",       arabic: "نظارة سلامة", pronunciation: "سيفتي جلاسيز" },
        { english: "Gloves",               arabic: "جوانتي",      pronunciation: "جلوفز" },
        { english: "Steel-toe boots",      arabic: "بوت حديد",    pronunciation: "ستيل تو بوتس" },
        { english: "High visibility vest", arabic: "سترة عاكسة",  pronunciation: "هاي فيزيبيليتي فيست" },
      ]},
      { id: "u14l2", title: "Safety Commands", titleArabic: "أوامر السلامة", type: "read", content: [
        { english: "Stop! Danger ahead!",          arabic: "قف! خطر أمامك!",                pronunciation: "ستوب! دينجر أهيد!" },
        { english: "Do not enter without PPE",     arabic: "ممنوع الدخول بدون معدات حماية", pronunciation: "دو نوت إنتر ويذاوت بي بي إي" },
        { english: "Emergency exit this way",      arabic: "مخرج الطوارئ من هنا",            pronunciation: "إمرجينسي إجزيت ذيس واي" },
      ]},
      { id: "u14l3", title: "Safety Quiz", titleArabic: "اختبار السلامة", type: "quiz", content: [
        { english: "Hard hat",          arabic: "خوذة",           pronunciation: "هارد هات" },
        { english: "Gloves",            arabic: "جوانتي",         pronunciation: "جلوفز" },
        { english: "Fire extinguisher", arabic: "طفاية حريق",     pronunciation: "فاير إكستينجويشر" },
        { english: "First aid kit",     arabic: "صندوق إسعافات",  pronunciation: "فيرست إيد كيت" },
      ]},
    ],
  },
  {
    id: "u15", title: "الأشكال والأوصاف", icon: "📐", color: "from-pink-500 to-fuchsia-600",
    lessons: [
      { id: "u15l1", title: "Shapes & Colors", titleArabic: "الأشكال والألوان", type: "listen", content: [
        { english: "Cylindrical specimen", arabic: "عينة أسطوانية",  pronunciation: "سيليندريكال سبيسيمن" },
        { english: "Rectangular beam",     arabic: "كمرة مستطيلة",   pronunciation: "ريكتانجيولر بيم" },
        { english: "Gray concrete",        arabic: "خرسانة رمادية",  pronunciation: "جراي كونكريت" },
        { english: "Black bitumen",        arabic: "بيتومين أسود",   pronunciation: "بلاك بيتيومن" },
        { english: "Brown soil",           arabic: "تربة بنية",      pronunciation: "براون سويل" },
      ]},
      { id: "u15l2", title: "Descriptions Quiz", titleArabic: "اختبار الأوصاف", type: "quiz", content: [
        { english: "Cylindrical", arabic: "أسطواني",   pronunciation: "سيليندريكال" },
        { english: "Rectangular", arabic: "مستطيل",    pronunciation: "ريكتانجيولر" },
        { english: "Gray",        arabic: "رمادي",     pronunciation: "جراي" },
        { english: "Conical",     arabic: "مخروطي",    pronunciation: "كونيكال" },
      ]},
    ],
  },
  {
    id: "u16", title: "الأفعال المتقدمة", icon: "⚡", color: "from-yellow-500 to-amber-600",
    lessons: [
      { id: "u16l1", title: "Advanced Verbs", titleArabic: "أفعال متقدمة", type: "listen", content: [
        { english: "Calibrate",   arabic: "يعاير",    pronunciation: "كاليبريت" },
        { english: "Investigate", arabic: "يحقق",     pronunciation: "إنفيستيجيت" },
        { english: "Comply",      arabic: "يمتثل",    pronunciation: "كومبلاي" },
        { english: "Excavate",    arabic: "يحفر",     pronunciation: "إكسكافيت" },
        { english: "Demolish",    arabic: "يهدم",     pronunciation: "ديموليش" },
      ]},
      { id: "u16l2", title: "Verb Sentences", titleArabic: "جمل الأفعال", type: "read", content: [
        { english: "We need to investigate the cause of failure",          arabic: "محتاجين نحقق في سبب الفشل",           pronunciation: "وي نيد تو إنفيستيجيت ذا كوز أوف فيليور" },
        { english: "The contractor must comply with the specification",    arabic: "المقاول لازم يمتثل للمواصفة",          pronunciation: "ذا كونتراكتور ماست كومبلاي ويذ ذا سبيسيفيكيشن" },
        { english: "Calibrate the equipment before testing",              arabic: "عاير الأجهزة قبل الاختبار",            pronunciation: "كاليبريت ذا إكويبمنت بيفور تيستينج" },
      ]},
      { id: "u16l3", title: "Advanced Verbs Quiz", titleArabic: "اختبار الأفعال المتقدمة", type: "quiz", content: [
        { english: "Calibrate",   arabic: "يعاير",    pronunciation: "كاليبريت" },
        { english: "Investigate", arabic: "يحقق",     pronunciation: "إنفيستيجيت" },
        { english: "Excavate",    arabic: "يحفر",     pronunciation: "إكسكافيت" },
        { english: "Comply",      arabic: "يمتثل",    pronunciation: "كومبلاي" },
      ]},
    ],
  },
  {
    id: "u17", title: "البريد والتواصل", icon: "📧", color: "from-violet-500 to-purple-600",
    lessons: [
      { id: "u17l1", title: "Email Phrases", titleArabic: "عبارات الإيميل", type: "read", content: [
        { english: "Please find attached the test report", arabic: "مرفق تقرير الاختبار",          pronunciation: "بليز فايند أتاتشد ذا تيست ريبورت" },
        { english: "As per your request",                 arabic: "بناءً على طلبكم",              pronunciation: "أز بير يور ريكويست" },
        { english: "Kindly confirm receipt",              arabic: "يرجى تأكيد الاستلام",           pronunciation: "كايندلي كونفيرم ريسيت" },
        { english: "Best regards",                        arabic: "مع أطيب التحيات",               pronunciation: "بيست ريجاردز" },
      ]},
      { id: "u17l2", title: "Phone Communication", titleArabic: "التواصل الهاتفي", type: "read", content: [
        { english: "This is Ahmed from the lab",          arabic: "أنا أحمد من المختبر",           pronunciation: "ذيس إز أحمد فروم ذا لاب" },
        { english: "I am calling about the test results", arabic: "أنا بتصل بخصوص نتائج الاختبار", pronunciation: "آي أم كولينج أباوت ذا تيست ريزالتس" },
        { english: "Could you send me the specifications?",arabic: "ممكن تبعتلي المواصفات؟",       pronunciation: "كود يو سيند مي ذا سبيسيفيكيشنز" },
      ]},
      { id: "u17l3", title: "Communication Quiz", titleArabic: "اختبار التواصل", type: "quiz", content: [
        { english: "Attached", arabic: "مرفق",    pronunciation: "أتاتشد" },
        { english: "Confirm",  arabic: "يؤكد",   pronunciation: "كونفيرم" },
        { english: "Request",  arabic: "طلب",     pronunciation: "ريكويست" },
        { english: "Regards",  arabic: "تحيات",   pronunciation: "ريجاردز" },
      ]},
    ],
  },
  {
    id: "u18", title: "المراجعة الشاملة", icon: "🏆", color: "from-emerald-500 to-green-600",
    lessons: [
      { id: "u18l1", title: "Comprehensive Review 1", titleArabic: "مراجعة شاملة ١", type: "quiz", content: [
        { english: "Concrete",        arabic: "خرسانة",           pronunciation: "كونكريت" },
        { english: "Compaction",      arabic: "دمك",               pronunciation: "كومباكشن" },
        { english: "Penetration",     arabic: "اختراق",            pronunciation: "بينيتريشن" },
        { english: "Specification",   arabic: "مواصفة",            pronunciation: "سبيسيفيكيشن" },
        { english: "Calibrate",       arabic: "يعاير",             pronunciation: "كاليبريت" },
      ]},
      { id: "u18l2", title: "Comprehensive Review 2", titleArabic: "مراجعة شاملة ٢", type: "write", content: [
        { english: "The sample was tested",          arabic: "العينة اتختبرت",               pronunciation: "ذا سامبل ووز تيستيد" },
        { english: "Results meet the specification", arabic: "النتائج مطابقة للمواصفة",      pronunciation: "ريزالتس ميت ذا سبيسيفيكيشن" },
        { english: "Please prepare three specimens", arabic: "جهز ثلاث عينات",               pronunciation: "بليز بريبير ثري سبيسيمنز" },
        { english: "The equipment needs calibration",arabic: "المعدات محتاجة معايرة",        pronunciation: "ذا إكويبمنت نيدز كاليبريشن" },
      ]},
      { id: "u18l3", title: "Final Test", titleArabic: "الاختبار النهائي", type: "quiz", content: [
        { english: "Field density test",    arabic: "اختبار الكثافة الحقلية", pronunciation: "فيلد دينسيتي تيست" },
        { english: "Marshall stability",    arabic: "ثبات مارشال",            pronunciation: "مارشال ستابيليتي" },
        { english: "Compressive strength",  arabic: "مقاومة الضغط",           pronunciation: "كومبريسيف سترينث" },
        { english: "Water-cement ratio",    arabic: "نسبة الماء للأسمنت",     pronunciation: "ووتر سيمنت ريشيو" },
      ]},
    ],
  },
];

/* ─── Lesson type helpers ─── */
const TYPE_ICON: Record<Lesson["type"], React.ReactNode> = {
  listen: <Volume2 size={16} />,
  read:   <BookOpen size={16} />,
  write:  <Pen size={16} />,
  quiz:   <HelpCircle size={16} />,
};
const TYPE_EMOJI: Record<Lesson["type"], string> = {
  listen: "🎧", read: "📖", write: "✍️", quiz: "❓",
};
const TYPE_LABEL: Record<Lesson["type"], string> = {
  listen: "استماع", read: "قراءة", write: "كتابة", quiz: "اختبار",
};

/* ═══════════════ Component ═══════════════ */
const LearningPath = () => {
  const [progress, setProgress] = useState<Record<string, boolean>>(getPathProgress());
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [speed, setSpeed] = useState(0.7);
  const [xpNotif, setXpNotif] = useState<{ xp: number; achievements: Achievement[]; leveledUp: boolean } | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  // listen mode: require audio play before allowing next
  const [audioPlayed, setAudioPlayed] = useState(false);
  // milestone celebration
  const [milestone, setMilestone] = useState<{ title: string; icon: string } | null>(null);

  // Highlight recommended start for new users
  const recommendedStart = getRecommendedStartUnit();

  const getUnitProgress = (unit: PathUnit) => {
    const completed = unit.lessons.filter(l => progress[l.id]).length;
    return Math.round((completed / unit.lessons.length) * 100);
  };

  const isUnitUnlocked = (index: number) => {
    if (index === 0) return true;
    return getUnitProgress(units[index - 1]) >= 60;
  };

  const generateQuizOptions = (lesson: Lesson, stepIdx: number) => {
    const correct = lesson.content[stepIdx].arabic;
    const pool = lesson.content.filter((_, i) => i !== stepIdx).map(c => c.arabic);
    const wrong = shuffle(pool).slice(0, Math.min(3, pool.length));
    setQuizOptions(shuffle([correct, ...wrong]));
    setQuizAnswer(null);
  };

  const startLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setStep(0); setInput(""); setShowAnswer(false);
    setScore(0); setDone(false); setAudioPlayed(false);
    if (lesson.type === "quiz") generateQuizOptions(lesson, 0);
  };

  const completeLesson = () => {
    if (!activeLesson) return;
    saveLessonDone(activeLesson.id);
    const newProgress = getPathProgress();
    setProgress(newProgress);
    setDone(true);
    const result = addXP(XP_REWARDS.lessonCompleted, "lessonCompleted");
    setXpNotif({ xp: XP_REWARDS.lessonCompleted, achievements: result.newAchievements, leveledUp: result.leveledUp });

    // Check if completing this lesson finished a unit → check milestone
    const parentUnit = units.find(u => u.lessons.some(l => l.id === activeLesson.id));
    if (parentUnit) {
      const updated = parentUnit.lessons.filter(l => newProgress[l.id]).length;
      if (updated === parentUnit.lessons.length) {
        const m = isMilestoneAfter(parentUnit.id);
        if (m) setTimeout(() => setMilestone(m), 600);
      }
    }
  };

  const nextStep = () => {
    if (!activeLesson) return;
    if (step < activeLesson.content.length - 1) {
      const next = step + 1;
      setStep(next); setInput(""); setShowAnswer(false);
      setQuizAnswer(null); setAudioPlayed(false);
      if (activeLesson.type === "quiz") generateQuizOptions(activeLesson, next);
    } else {
      completeLesson();
    }
  };

  const checkWrite = () => {
    if (!input.trim()) return;
    const correct = activeLesson!.content[step].english.toLowerCase().trim();
    const user = input.toLowerCase().trim();
    if (user === correct) setScore(s => s + 1);
    setShowAnswer(true);
  };

  const handleQuizAnswer = (answer: string) => {
    if (quizAnswer) return;
    setQuizAnswer(answer);
    if (answer === activeLesson!.content[step].arabic) setScore(s => s + 1);
  };

  /* ── Milestone modal ── */
  if (milestone) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-7xl mb-4 animate-bounce">{milestone.icon}</p>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">{milestone.title}</h2>
        <p className="text-muted-foreground mb-6">استمر كده وأكمل المرحلة الجاية!</p>
        <button
          onClick={() => { setMilestone(null); setActiveLesson(null); setActiveUnit(null); }}
          className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all"
        >
          متابعة 🚀
        </button>
      </div>
    );
  }

  /* ── Lesson view ── */
  if (activeLesson && !done) {
    const item = activeLesson.content[step];
    const isLast = step >= activeLesson.content.length - 1;
    return (
      <div>
        {xpNotif && <XPNotification {...xpNotif} onDone={() => setXpNotif(null)} />}
        <button onClick={() => setActiveLesson(null)} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
          <ChevronLeft size={14} /> رجوع
        </button>
        <div className="bg-card rounded-2xl border border-border p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-1.5 rounded-lg">{TYPE_ICON[activeLesson.type]}</span>
              <div>
                <h3 className="font-display font-bold text-foreground leading-tight">{activeLesson.titleArabic}</h3>
                <p className="text-xs text-muted-foreground">{TYPE_LABEL[activeLesson.type]}</p>
              </div>
            </div>
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full font-display font-bold">
              {step + 1}/{activeLesson.content.length}
            </span>
          </div>
          {/* Progress */}
          <div className="w-full bg-muted rounded-full h-2 mb-6">
            <div className="bg-gradient-to-l from-primary to-accent h-2 rounded-full transition-all"
              style={{ width: `${((step + 1) / activeLesson.content.length) * 100}%` }} />
          </div>

          <div className="text-center space-y-4">

            {/* ── LISTEN ── requires audio play before next */}
            {activeLesson.type === "listen" && (
              <>
                <div className="bg-muted rounded-xl p-5">
                  <p className="text-3xl font-display font-bold text-foreground mb-3" dir="ltr">{item.english}</p>
                  <button
                    onClick={() => { speakText(item.english, speed); setAudioPlayed(true); }}
                    className="mx-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all"
                  >
                    <Volume2 size={18} /> استمع 🔊
                  </button>
                  <SpeedControl speed={speed} onSpeedChange={setSpeed} />
                </div>
                <p className="text-xl text-primary font-bold">{item.arabic}</p>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-1">🗣️ النطق بالعربي:</p>
                  <p className="text-foreground font-display font-bold text-lg">{item.pronunciation}</p>
                  <p className="text-xs text-muted-foreground mt-1">كرر بصوتك بعد ما تسمع</p>
                </div>
                <button
                  onClick={nextStep}
                  disabled={!audioPlayed}
                  className={`w-full py-3 rounded-xl font-bold transition-all mt-2 ${
                    audioPlayed
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {audioPlayed ? (isLast ? "✓ إنهاء الدرس" : "التالي ←") : "👆 اضغط استمع أولاً"}
                </button>
              </>
            )}

            {/* ── READ ── */}
            {activeLesson.type === "read" && (
              <>
                <div className="bg-muted rounded-xl p-5">
                  <p className="text-xl font-display font-bold text-foreground mb-3" dir="ltr" style={{ textAlign: "left" }}>
                    {item.english}
                  </p>
                  <button
                    onClick={() => speakText(item.english, speed)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Volume2 size={16} /> استمع
                  </button>
                  <SpeedControl speed={speed} onSpeedChange={setSpeed} />
                </div>
                <p className="text-lg text-primary font-bold">{item.arabic}</p>
                <p className="text-sm text-muted-foreground">🗣️ {item.pronunciation}</p>
                <button onClick={nextStep} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all">
                  {isLast ? "✓ إنهاء الدرس" : "التالي ←"}
                </button>
              </>
            )}

            {/* ── WRITE ── */}
            {activeLesson.type === "write" && (
              <>
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-xl text-primary font-bold mb-1">{item.arabic}</p>
                  <p className="text-sm text-muted-foreground">🗣️ {item.pronunciation}</p>
                </div>
                <button onClick={() => speakText(item.english, speed)} className="mx-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
                  <Volume2 size={16} /> تلميح صوتي
                </button>
                {!showAnswer ? (
                  <>
                    <input
                      value={input} onChange={e => setInput(e.target.value)}
                      placeholder="اكتب الكلمة بالإنجليزي..."
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                      dir="ltr" onKeyDown={e => e.key === "Enter" && checkWrite()}
                    />
                    <button onClick={checkWrite} disabled={!input.trim()} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold disabled:opacity-50">
                      تأكيد ✓
                    </button>
                  </>
                ) : (
                  <div className={`rounded-xl p-4 text-right ${input.toLowerCase().trim() === item.english.toLowerCase().trim() ? "bg-green-500/10 border border-green-500/30" : "bg-destructive/10 border border-destructive/30"}`}>
                    <p className="font-bold text-lg text-foreground" dir="ltr" style={{ textAlign: "left" }}>{item.english}</p>
                    <p className="text-sm mt-1">{input.toLowerCase().trim() === item.english.toLowerCase().trim() ? "✅ ممتاز!" : "❌ الإجابة الصحيحة أعلاه — احفظها كويس"}</p>
                    <button onClick={nextStep} className="mt-3 w-full py-2 rounded-xl bg-primary text-primary-foreground font-bold">
                      {isLast ? "✓ إنهاء" : "التالي ←"}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ── QUIZ ── */}
            {activeLesson.type === "quiz" && (
              <>
                <div className="bg-muted rounded-xl p-5">
                  <p className="text-2xl font-display font-bold text-foreground mb-2" dir="ltr">{item.english}</p>
                  <button onClick={() => speakText(item.english, speed)} className="mx-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
                    <Volume2 size={16} /> استمع
                  </button>
                </div>
                <p className="text-muted-foreground text-sm">اختر الترجمة الصحيحة:</p>
                <div className="grid grid-cols-1 gap-2 mt-1">
                  {quizOptions.map((opt) => {
                    const isCorrect = opt === item.arabic;
                    const isSelected = quizAnswer === opt;
                    let cls = "bg-muted hover:bg-secondary border border-border";
                    if (quizAnswer) {
                      if (isCorrect)               cls = "bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-300";
                      else if (isSelected)          cls = "bg-destructive/20 border-destructive/50 text-destructive";
                      else                          cls = "bg-muted/50 border-border opacity-50";
                    }
                    return (
                      <button key={opt} onClick={() => handleQuizAnswer(opt)} disabled={!!quizAnswer}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all ${cls}`}
                      >{opt}</button>
                    );
                  })}
                </div>
                {quizAnswer && (
                  <button onClick={nextStep} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold mt-1">
                    {isLast ? "✓ إنهاء" : "التالي ←"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Lesson complete ── */
  if (done && activeLesson) {
    const total = activeLesson.content.length;
    const pct = activeLesson.type === "quiz" ? Math.round((score / total) * 100) : 100;
    const emoji = pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "💪";
    const msg   = pct >= 80 ? "ممتاز!" : pct >= 50 ? "أحسنت!" : "حاول تاني!";
    return (
      <div className="text-center">
        {xpNotif && <XPNotification {...xpNotif} onDone={() => setXpNotif(null)} />}
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="text-5xl mb-4">{emoji}</div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-2">{msg}</h3>
          {activeLesson.type === "quiz" && (
            <p className="text-primary text-lg font-bold mb-2">النتيجة: {score}/{total}</p>
          )}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap size={16} className="text-accent" />
            <span className="text-accent font-bold">+{XP_REWARDS.lessonCompleted} XP</span>
          </div>
          <div className="flex gap-2 justify-center">
            <button onClick={() => startLesson(activeLesson)} className="px-5 py-2 rounded-xl bg-secondary text-secondary-foreground font-bold">إعادة</button>
            <button onClick={() => { setActiveLesson(null); setActiveUnit(null); }} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold">متابعة</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Unit lessons list ── */
  if (activeUnit) {
    const unit = units.find(u => u.id === activeUnit)!;
    const meta = UNIT_META.find(m => m.id === activeUnit);
    return (
      <div>
        <button onClick={() => setActiveUnit(null)} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
          <ChevronLeft size={14} /> رجوع للمسار
        </button>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <span>{unit.icon}</span> {unit.title}
            </h2>
            {meta && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${meta.color}`}>
                {meta.label}
              </span>
            )}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className={`h-2 rounded-full bg-gradient-to-l ${unit.color} transition-all`} style={{ width: `${getUnitProgress(unit)}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{getUnitProgress(unit)}% مكتمل</p>
        </div>
        <div className="space-y-3">
          {unit.lessons.map((lesson, i) => {
            const completed = progress[lesson.id];
            return (
              <button key={lesson.id} onClick={() => startLesson(lesson)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-right ${
                  completed ? "bg-green-500/10 border-green-500/30" : "bg-card border-border hover:border-primary"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  completed ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"
                }`}>
                  {completed ? <CheckCircle size={20} /> : <span className="font-bold">{i + 1}</span>}
                </div>
                <div className="flex-1">
                  <p className="font-display font-bold text-foreground">{lesson.titleArabic}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    {TYPE_ICON[lesson.type]}
                    <span>{TYPE_LABEL[lesson.type]} • {lesson.content.length} عناصر</span>
                  </p>
                </div>
                <span className="text-lg">{TYPE_EMOJI[lesson.type]}</span>
                {completed && <Star size={16} className="text-accent shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── Main path view ── */
  // Build quick lesson stats
  const unitLessonsMap = Object.fromEntries(units.map(u => [u.id, u.lessons.map(l => l.id)]));
  const nextRec = getNextLesson(progress, units);

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-1">🗺️ مسار التعلم</h2>
      <p className="text-muted-foreground mb-4 text-sm">أكمل الوحدات بالترتيب — كل وحدة تفتح اللي بعدها</p>

      {/* Next recommended */}
      {nextRec && (
        <div className="mb-5 bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-primary font-bold mb-0.5">📍 الخطوة التالية</p>
            <p className="text-sm font-semibold text-foreground">
              {units.find(u => u.id === nextRec.unitId)?.title} — {units.find(u => u.id === nextRec.unitId)?.lessons.find(l => l.id === nextRec.lessonId)?.titleArabic}
            </p>
          </div>
          <button
            onClick={() => {
              setActiveUnit(nextRec.unitId);
              const lesson = units.find(u => u.id === nextRec.unitId)?.lessons.find(l => l.id === nextRec.lessonId);
              if (lesson) startLesson(lesson);
            }}
            className="shrink-0 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all"
          >
            ابدأ الآن ←
          </button>
        </div>
      )}

      <div className="relative">
        <div className="absolute right-6 top-0 bottom-0 w-1 bg-border rounded-full" />

        <div className="space-y-3">
          {units.map((unit, i) => {
            const unlocked = isUnitUnlocked(i);
            const prog = getUnitProgress(unit);
            const completed = prog === 100;
            const meta = UNIT_META[i];
            const isRecommendedStart = meta.id === recommendedStart && prog === 0;

            // Show level separator before first unit of each level
            const prevMeta = i > 0 ? UNIT_META[i - 1] : null;
            const showLevelBanner = !prevMeta || prevMeta.level !== meta.level;

            return (
              <div key={unit.id}>
                {/* Level separator banner */}
                {showLevelBanner && (
                  <div className="flex items-center gap-3 pl-10 py-2">
                    <div className="flex-1 h-px bg-border" />
                    <span className={`text-xs font-bold px-3 py-1 rounded-full text-white bg-gradient-to-r ${meta.color}`}>
                      مرحلة {meta.label}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                )}

                <button
                  onClick={() => unlocked && setActiveUnit(unit.id)}
                  disabled={!unlocked}
                  className={`relative w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-right ${
                    !unlocked     ? "bg-muted/30 border-border/50 opacity-60 cursor-not-allowed"
                    : completed   ? "bg-green-500/10 border-green-500/30 hover:border-green-500/50"
                    : isRecommendedStart ? "bg-primary/5 border-primary/40 hover:border-primary hover:card-glow ring-2 ring-primary/20"
                    : "bg-card border-border hover:border-primary hover:card-glow"
                  }`}
                >
                  {/* Recommended badge */}
                  {isRecommendedStart && (
                    <span className="absolute -top-2 right-4 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      ابدأ من هنا ⬇
                    </span>
                  )}

                  {/* Icon circle */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 ${
                    !unlocked ? "bg-muted"
                    : completed ? "bg-green-500/20"
                    : `bg-gradient-to-br ${unit.color} shadow-lg`
                  }`}>
                    {!unlocked ? <Lock size={20} className="text-muted-foreground" /> : unit.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-display font-bold text-foreground">{unit.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{unit.lessons.length} دروس</p>
                    {unlocked && (
                      <div className="mt-2">
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full bg-gradient-to-l ${unit.color} transition-all`} style={{ width: `${prog}%` }} />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{prog}%</p>
                      </div>
                    )}
                    {!unlocked && i > 0 && (
                      <p className="text-[10px] text-muted-foreground mt-1">
                        أكمل {Math.max(0, 60 - getUnitProgress(units[i-1]))}% من الوحدة السابقة للفتح
                      </p>
                    )}
                  </div>

                  {completed && <CheckCircle size={22} className="text-green-400 shrink-0" />}
                  {!completed && unlocked && <Trophy size={18} className="text-muted-foreground/40 shrink-0" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
