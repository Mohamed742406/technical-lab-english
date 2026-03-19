import { useState } from "react";
import { speakText } from "@/lib/phonetics";
import { Volume2, ChevronLeft, CheckCircle2, XCircle, Lock, Star, BookOpen } from "lucide-react";
import SpeedControl from "@/components/SpeedControl";
import { addXP, XP_REWARDS, Achievement } from "@/lib/gamification";
import XPNotification from "@/components/XPNotification";

interface GrammarExample {
  english: string;
  arabic: string;
  pronunciation: string;
}

interface GrammarQuiz {
  question: string;
  questionArabic: string;
  options: string[];
  correct: number;
}

interface GrammarLesson {
  id: string;
  title: string;
  titleArabic: string;
  icon: string;
  explanation: string;
  rule: string;
  examples: GrammarExample[];
  quiz: GrammarQuiz[];
}

const GRAMMAR_KEY = "lab-english-grammar-progress";
function getGrammarProgress(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(GRAMMAR_KEY) || "{}"); } catch { return {}; }
}
function saveGrammarDone(id: string) {
  const p = getGrammarProgress(); p[id] = true;
  localStorage.setItem(GRAMMAR_KEY, JSON.stringify(p));
}

const grammarLessons: GrammarLesson[] = [
  {
    id: "g1", title: "To Be (am/is/are)", titleArabic: "فعل يكون", icon: "🔵",
    explanation: "فعل (يكون) هو أهم فعل في الإنجليزي. بيتغير حسب الفاعل:\nI → am | He/She/It → is | You/We/They → are",
    rule: "Subject + am/is/are + complement",
    examples: [
      { english: "The sample is ready.", arabic: "العينة جاهزة.", pronunciation: "ذا سامبل إز ريدي" },
      { english: "We are testing the concrete.", arabic: "إحنا بنختبر الخرسانة.", pronunciation: "وي آر تيستينج ذا كونكريت" },
      { english: "I am a lab technician.", arabic: "أنا فني مختبر.", pronunciation: "آي أم أ لاب تيكنيشن" },
      { english: "The results are acceptable.", arabic: "النتائج مقبولة.", pronunciation: "ذا ريزالتس آر أكسيبتابل" },
    ],
    quiz: [
      { question: "The sample ___ ready.", questionArabic: "العينة جاهزة", options: ["am", "is", "are", "be"], correct: 1 },
      { question: "We ___ testing now.", questionArabic: "إحنا بنختبر دلوقتي", options: ["am", "is", "are", "be"], correct: 2 },
      { question: "I ___ a technician.", questionArabic: "أنا فني", options: ["am", "is", "are", "be"], correct: 0 },
    ],
  },
  {
    id: "g2", title: "Present Simple", titleArabic: "المضارع البسيط", icon: "⏰",
    explanation: "بنستخدمه للحقائق والعادات والإجراءات الثابتة.\nمع He/She/It بنضيف s أو es للفعل.",
    rule: "Subject + verb(s) + object",
    examples: [
      { english: "The technician tests the sample.", arabic: "الفني بيختبر العينة.", pronunciation: "ذا تيكنيشن تيستس ذا سامبل" },
      { english: "Water boils at 100°C.", arabic: "الماء بيغلي عند 100 درجة.", pronunciation: "ووتر بويلز أت وان هاندرد ديجريز" },
      { english: "We measure the slump every batch.", arabic: "بنقيس الهبوط كل خلطة.", pronunciation: "وي ميجر ذا سلامب إيفري باتش" },
    ],
    quiz: [
      { question: "The engineer ___ the results.", questionArabic: "المهندس بيراجع النتائج", options: ["check", "checks", "checking", "checked"], correct: 1 },
      { question: "We ___ samples daily.", questionArabic: "بنجمع عينات يومياً", options: ["collects", "collect", "collecting", "collected"], correct: 1 },
    ],
  },
  {
    id: "g3", title: "Present Continuous", titleArabic: "المضارع المستمر", icon: "🔄",
    explanation: "بنستخدمه للأفعال اللي بتحصل دلوقتي.\nالتركيب: am/is/are + verb + ing",
    rule: "Subject + am/is/are + verb-ing",
    examples: [
      { english: "I am pouring the concrete now.", arabic: "أنا بصب الخرسانة دلوقتي.", pronunciation: "آي أم بورينج ذا كونكريت ناو" },
      { english: "The machine is vibrating.", arabic: "الماكينة بتهتز.", pronunciation: "ذا مشين إز فايبريتينج" },
      { english: "They are curing the specimens.", arabic: "هم بيعالجوا العينات.", pronunciation: "ذي آر كيورينج ذا سبيسيمنز" },
    ],
    quiz: [
      { question: "The mixer is ___ the concrete.", questionArabic: "الخلاطة بتخلط الخرسانة", options: ["mix", "mixed", "mixing", "mixes"], correct: 2 },
      { question: "We are ___ the temperature.", questionArabic: "بنسجل درجة الحرارة", options: ["record", "recording", "records", "recorded"], correct: 1 },
    ],
  },
  {
    id: "g4", title: "Past Simple", titleArabic: "الماضي البسيط", icon: "⏮️",
    explanation: "بنستخدمه للأفعال اللي خلصت في الماضي.\nالأفعال المنتظمة بنضيف ed, الشاذة لازم تتحفظ.",
    rule: "Subject + verb(ed/irregular) + object",
    examples: [
      { english: "We tested 10 samples yesterday.", arabic: "اختبرنا 10 عينات إمبارح.", pronunciation: "وي تيستيد تين سامبلز ييسترداي" },
      { english: "The concrete set after 4 hours.", arabic: "الخرسانة شكّت بعد 4 ساعات.", pronunciation: "ذا كونكريت سيت آفتر فور آورز" },
      { english: "I wrote the report last night.", arabic: "كتبت التقرير إمبارح بالليل.", pronunciation: "آي روت ذا ريبورت لاست نايت" },
    ],
    quiz: [
      { question: "We ___ the slump test at 8 AM.", questionArabic: "عملنا اختبار الهبوط الساعة 8", options: ["perform", "performed", "performing", "performs"], correct: 1 },
      { question: "The sample ___ the requirements.", questionArabic: "العينة استوفت المتطلبات", options: ["meet", "meets", "met", "meeting"], correct: 2 },
    ],
  },
  {
    id: "g5", title: "Future (will / going to)", titleArabic: "المستقبل", icon: "🔮",
    explanation: "will = قرار لحظي أو توقع\ngoing to = خطة مسبقة أو شيء واضح هيحصل",
    rule: "Subject + will/going to + base verb",
    examples: [
      { english: "We will test the sample tomorrow.", arabic: "هنختبر العينة بكرة.", pronunciation: "وي ويل تيست ذا سامبل تومورو" },
      { english: "I am going to prepare the molds.", arabic: "هجهز القوالب.", pronunciation: "آي أم جوينج تو بريبير ذا مولدز" },
      { english: "The results will be ready by Friday.", arabic: "النتائج هتكون جاهزة يوم الجمعة.", pronunciation: "ذا ريزالتس ويل بي ريدي باي فرايداي" },
    ],
    quiz: [
      { question: "We ___ start testing at 7 AM.", questionArabic: "هنبدأ الاختبار الساعة 7", options: ["will", "going", "is", "are"], correct: 0 },
      { question: "I am ___ to write the report.", questionArabic: "هكتب التقرير", options: ["will", "going", "go", "went"], correct: 1 },
    ],
  },
  {
    id: "g6", title: "Articles (a/an/the)", titleArabic: "أدوات التعريف والتنكير", icon: "📌",
    explanation: "a = قبل الحروف الساكنة (a test)\nan = قبل حروف العلة (an oven)\nthe = لشيء معروف أو محدد (the sample we tested)",
    rule: "a/an (indefinite) | the (definite)",
    examples: [
      { english: "Use a sieve for the test.", arabic: "استخدم منخل للاختبار.", pronunciation: "يوز أ سيف فور ذا تيست" },
      { english: "Put the sample in an oven.", arabic: "حط العينة في فرن.", pronunciation: "بوت ذا سامبل إن أن أوفن" },
      { english: "The compressive strength is 30 MPa.", arabic: "مقاومة الضغط 30 ميجا باسكال.", pronunciation: "ذا كومبريسيف سترينث إز ثيرتي ميجا باسكال" },
    ],
    quiz: [
      { question: "Put ___ sample in the oven.", questionArabic: "حط العينة في الفرن", options: ["a", "an", "the", "-"], correct: 2 },
      { question: "We need ___ aggregate sample.", questionArabic: "محتاجين عينة ركام", options: ["a", "an", "the", "-"], correct: 1 },
    ],
  },
  {
    id: "g7", title: "Singular & Plural", titleArabic: "المفرد والجمع", icon: "👥",
    explanation: "معظم الكلمات بنضيف s\nالكلمات اللي بتنتهي بـ s, sh, ch, x بنضيف es\nبعض الكلمات شاذة: specimen → specimens, datum → data",
    rule: "noun + s/es | irregular plurals",
    examples: [
      { english: "Three specimens were tested.", arabic: "تم اختبار 3 عينات.", pronunciation: "ثري سبيسيمنز وير تيستيد" },
      { english: "The data show a clear trend.", arabic: "البيانات بتوضح اتجاه.", pronunciation: "ذا ديتا شو أ كلير ترند" },
      { english: "We used two batches of concrete.", arabic: "استخدمنا خلطتين خرسانة.", pronunciation: "وي يوزد تو باتشز أوف كونكريت" },
    ],
    quiz: [
      { question: "We tested 5 ___.", questionArabic: "اختبرنا 5 عينات", options: ["specimen", "specimens", "speciman", "specimans"], correct: 1 },
      { question: "The ___ are recorded.", questionArabic: "البيانات مسجلة", options: ["datum", "datas", "data", "datums"], correct: 2 },
    ],
  },
  {
    id: "g8", title: "Prepositions of Place", titleArabic: "حروف الجر (المكان)", icon: "📍",
    explanation: "in = جوه (in the mold)\non = على (on the table)\nat = عند (at the site)\nbetween = بين | under = تحت | above = فوق",
    rule: "verb + preposition + noun",
    examples: [
      { english: "Put the sample in the container.", arabic: "حط العينة في الحاوية.", pronunciation: "بوت ذا سامبل إن ذا كونتينر" },
      { english: "The gauge is on the machine.", arabic: "المقياس على الماكينة.", pronunciation: "ذا جيج إز أون ذا مشين" },
      { english: "We work at the construction site.", arabic: "بنشتغل في الموقع.", pronunciation: "وي وورك أت ذا كونستراكشن سايت" },
    ],
    quiz: [
      { question: "Place the specimen ___ the mold.", questionArabic: "حط العينة في القالب", options: ["on", "in", "at", "by"], correct: 1 },
      { question: "The results are ___ the report.", questionArabic: "النتائج في التقرير", options: ["on", "in", "at", "by"], correct: 1 },
    ],
  },
  {
    id: "g9", title: "Prepositions of Time", titleArabic: "حروف الجر (الزمان)", icon: "🕐",
    explanation: "at = وقت محدد (at 8 AM)\non = يوم (on Monday)\nin = فترة (in January / in 2024)\nfor = مدة | during = أثناء | after = بعد | before = قبل",
    rule: "at (time) | on (day) | in (month/year)",
    examples: [
      { english: "We start at 7 AM.", arabic: "بنبدأ الساعة 7 الصبح.", pronunciation: "وي ستارت أت سيفن أيه إم" },
      { english: "The test was done on Monday.", arabic: "الاختبار اتعمل يوم الاثنين.", pronunciation: "ذا تيست ووز دان أون مانداي" },
      { english: "Cure for 28 days.", arabic: "عالج لمدة 28 يوم.", pronunciation: "كيور فور توينتي إيت ديز" },
    ],
    quiz: [
      { question: "We start testing ___ 8 AM.", questionArabic: "بنبدأ الاختبار الساعة 8", options: ["in", "on", "at", "for"], correct: 2 },
      { question: "Cure the sample ___ 7 days.", questionArabic: "عالج العينة لمدة 7 أيام", options: ["in", "on", "at", "for"], correct: 3 },
    ],
  },
  {
    id: "g10", title: "Can / Must / Should", titleArabic: "أفعال مساعدة (القدرة والوجوب)", icon: "💪",
    explanation: "can = يقدر | must = لازم (إجباري) | should = المفروض (نصيحة)\nبعدهم دايماً الفعل بدون to أو s",
    rule: "Subject + can/must/should + base verb",
    examples: [
      { english: "You must wear safety glasses.", arabic: "لازم تلبس نظارة سلامة.", pronunciation: "يو ماست وير سيفتي جلاسز" },
      { english: "We can test 20 samples per day.", arabic: "نقدر نختبر 20 عينة في اليوم.", pronunciation: "وي كان تيست توينتي سامبلز بير داي" },
      { english: "You should calibrate the machine.", arabic: "المفروض تعاير الماكينة.", pronunciation: "يو شود كاليبريت ذا مشين" },
    ],
    quiz: [
      { question: "You ___ wear PPE in the lab.", questionArabic: "لازم تلبس معدات الحماية", options: ["can", "must", "should", "may"], correct: 1 },
      { question: "We ___ finish by 5 PM.", questionArabic: "المفروض نخلص قبل 5", options: ["can", "must", "should", "may"], correct: 2 },
    ],
  },
  {
    id: "g11", title: "Imperatives (Orders)", titleArabic: "صيغة الأمر", icon: "📢",
    explanation: "في المختبر بنستخدم الأمر كتير — ابدأ بالفعل مباشرة بدون فاعل.\nللنفي: Don't + verb",
    rule: "Verb + object | Don't + verb",
    examples: [
      { english: "Pour the concrete slowly.", arabic: "صب الخرسانة ببطء.", pronunciation: "بور ذا كونكريت سلولي" },
      { english: "Don't touch the wet sample.", arabic: "متلمسش العينة المبلولة.", pronunciation: "دونت تاتش ذا ويت سامبل" },
      { english: "Record the temperature immediately.", arabic: "سجل درجة الحرارة فوراً.", pronunciation: "ريكورد ذا تيمبراتشر إميدياتلي" },
    ],
    quiz: [
      { question: "___ the slump cone carefully.", questionArabic: "ارفع قمع الهبوط بعناية", options: ["Lift", "Lifts", "Lifting", "To lift"], correct: 0 },
      { question: "___ add extra water!", questionArabic: "متضيفش ماء زيادة", options: ["No", "Not", "Don't", "Doesn't"], correct: 2 },
    ],
  },
  {
    id: "g12", title: "Passive Voice", titleArabic: "المبني للمجهول", icon: "🔀",
    explanation: "مهم جداً في التقارير الفنية!\nالتركيب: object + be + past participle (V3)\nThe sample was tested. (العينة اتختبرت)",
    rule: "Object + am/is/are/was/were + V3",
    examples: [
      { english: "The sample was tested at 28 days.", arabic: "العينة اتختبرت عند 28 يوم.", pronunciation: "ذا سامبل ووز تيستيد أت توينتي إيت ديز" },
      { english: "The results are recorded in the log.", arabic: "النتائج بتتسجل في السجل.", pronunciation: "ذا ريزالتس آر ريكورديد إن ذا لوج" },
      { english: "Three cubes were crushed.", arabic: "تم سحق 3 مكعبات.", pronunciation: "ثري كيوبز وير كراشت" },
    ],
    quiz: [
      { question: "The sample ___ tested yesterday.", questionArabic: "العينة اتختبرت إمبارح", options: ["is", "was", "were", "be"], correct: 1 },
      { question: "The reports ___ submitted weekly.", questionArabic: "التقارير بتتقدم أسبوعياً", options: ["is", "was", "are", "be"], correct: 2 },
    ],
  },
  {
    id: "g13", title: "Comparatives & Superlatives", titleArabic: "المقارنة والتفضيل", icon: "📊",
    explanation: "short words: -er (stronger) / -est (strongest)\nlong words: more/most (more accurate / most accurate)\nthan = من",
    rule: "adj-er + than | the + adj-est | more/most + adj",
    examples: [
      { english: "This mix is stronger than the previous one.", arabic: "الخلطة دي أقوى من اللي قبلها.", pronunciation: "ذس ميكس إز سترونجر ذان ذا بريفياس وان" },
      { english: "Use the most accurate scale.", arabic: "استخدم أدق ميزان.", pronunciation: "يوز ذا موست أكيوريت سكيل" },
      { english: "The test is harder than expected.", arabic: "الاختبار أصعب من المتوقع.", pronunciation: "ذا تيست إز هاردر ذان إكسبيكتيد" },
    ],
    quiz: [
      { question: "This concrete is ___ than that one.", questionArabic: "الخرسانة دي أقوى من دي", options: ["strong", "stronger", "strongest", "more strong"], correct: 1 },
      { question: "Use the ___ accurate equipment.", questionArabic: "استخدم أدق جهاز", options: ["more", "most", "much", "very"], correct: 1 },
    ],
  },
  {
    id: "g14", title: "Countable & Uncountable", titleArabic: "المعدود وغير المعدود", icon: "🔢",
    explanation: "Countable: sample, cube, test (ينفع يتعد)\nUncountable: water, concrete, sand (مش بيتعد)\nmuch = لغير المعدود | many = للمعدود | a lot of = للاتنين",
    rule: "many + countable | much + uncountable",
    examples: [
      { english: "How much water did you add?", arabic: "ضفت كام ماء؟", pronunciation: "هاو ماتش ووتر ديد يو آد" },
      { english: "How many samples do we need?", arabic: "محتاجين كام عينة؟", pronunciation: "هاو ميني سامبلز دو وي نيد" },
      { english: "We don't have much time.", arabic: "مش معانا وقت كتير.", pronunciation: "وي دونت هاف ماتش تايم" },
    ],
    quiz: [
      { question: "How ___ cement do we need?", questionArabic: "محتاجين كام أسمنت؟", options: ["many", "much", "lot", "few"], correct: 1 },
      { question: "How ___ specimens were tested?", questionArabic: "كام عينة اتختبرت؟", options: ["many", "much", "lot", "few"], correct: 0 },
    ],
  },
  {
    id: "g15", title: "There is / There are", titleArabic: "يوجد / توجد", icon: "📍",
    explanation: "There is + مفرد أو غير معدود\nThere are + جمع\nفي السؤال: Is there / Are there",
    rule: "There is + singular | There are + plural",
    examples: [
      { english: "There is a crack in the sample.", arabic: "في شرخ في العينة.", pronunciation: "ذير إز أ كراك إن ذا سامبل" },
      { english: "There are 10 cubes in the tank.", arabic: "في 10 مكعبات في الحوض.", pronunciation: "ذير آر تين كيوبز إن ذا تانك" },
      { english: "Is there a problem with the mix?", arabic: "في مشكلة في الخلطة؟", pronunciation: "إز ذير أ بروبلم ويذ ذا ميكس" },
    ],
    quiz: [
      { question: "There ___ a defect in the specimen.", questionArabic: "في عيب في العينة", options: ["is", "are", "be", "was"], correct: 0 },
      { question: "There ___ many cracks.", questionArabic: "في شروخ كتير", options: ["is", "are", "be", "has"], correct: 1 },
    ],
  },
  {
    id: "g16", title: "Questions (Wh-)", titleArabic: "أسئلة الاستفهام", icon: "❓",
    explanation: "What = إيه | Where = فين | When = إمتى | Why = ليه | How = إزاي | Which = أنهي | Who = مين",
    rule: "Wh + auxiliary + subject + verb?",
    examples: [
      { english: "What is the slump value?", arabic: "قيمة الهبوط كام؟", pronunciation: "وات إز ذا سلامب فاليو" },
      { english: "Where is the curing tank?", arabic: "حوض المعالجة فين؟", pronunciation: "وير إز ذا كيورينج تانك" },
      { english: "How many days for curing?", arabic: "المعالجة كام يوم؟", pronunciation: "هاو ميني ديز فور كيورينج" },
    ],
    quiz: [
      { question: "___ is the compressive strength?", questionArabic: "مقاومة الضغط كام؟", options: ["What", "Where", "When", "Who"], correct: 0 },
      { question: "___ did you place the sample?", questionArabic: "حطيت العينة فين؟", options: ["What", "Where", "When", "Who"], correct: 1 },
    ],
  },
  {
    id: "g17", title: "Negation (don't/doesn't/not)", titleArabic: "النفي", icon: "🚫",
    explanation: "Present: don't/doesn't + verb\nPast: didn't + verb\nBe: am/is/are + not",
    rule: "Subject + don't/doesn't/didn't + base verb",
    examples: [
      { english: "The result doesn't meet the spec.", arabic: "النتيجة مش مطابقة للمواصفة.", pronunciation: "ذا ريزالت دازنت ميت ذا سبيك" },
      { english: "We didn't add enough water.", arabic: "مضفناش ماء كفاية.", pronunciation: "وي ديدنت آد إنَف ووتر" },
      { english: "The mix is not workable.", arabic: "الخلطة مش قابلة للتشغيل.", pronunciation: "ذا ميكس إز نوت ووركابل" },
    ],
    quiz: [
      { question: "The test ___ pass.", questionArabic: "الاختبار منجحش", options: ["don't", "doesn't", "didn't", "not"], correct: 2 },
      { question: "It ___ not acceptable.", questionArabic: "مش مقبول", options: ["do", "does", "is", "are"], correct: 2 },
    ],
  },
  {
    id: "g18", title: "Adjective Order", titleArabic: "ترتيب الصفات", icon: "📏",
    explanation: "في الإنجليزي الصفة بتيجي قبل الاسم (عكس العربي).\nلو أكتر من صفة: Opinion → Size → Age → Shape → Color → Material",
    rule: "adjective + noun",
    examples: [
      { english: "A large cylindrical specimen.", arabic: "عينة أسطوانية كبيرة.", pronunciation: "أ لارج سيليندريكال سبيسيمن" },
      { english: "Fresh concrete mix.", arabic: "خلطة خرسانة طازجة.", pronunciation: "فريش كونكريت ميكس" },
      { english: "A small round metal sieve.", arabic: "منخل معدني دائري صغير.", pronunciation: "أ سمول راوند ميتال سيف" },
    ],
    quiz: [
      { question: "A ___ concrete specimen.", questionArabic: "عينة خرسانة أسطوانية", options: ["concrete cylindrical", "cylindrical concrete", "cylindrical", "specimen cylindrical"], correct: 1 },
    ],
  },
  {
    id: "g19", title: "Possessives", titleArabic: "الملكية", icon: "🏷️",
    explanation: "للأشخاص: 's (the engineer's report)\nللأشياء: of (the result of the test)\nPossessive pronouns: my, your, his, her, its, our, their",
    rule: "noun + 's | of + noun | possessive pronoun",
    examples: [
      { english: "The supervisor's instructions.", arabic: "تعليمات المشرف.", pronunciation: "ذا سوبرفايزرز إنستراكشنز" },
      { english: "The strength of the concrete.", arabic: "مقاومة الخرسانة.", pronunciation: "ذا سترينث أوف ذا كونكريت" },
      { english: "Check your equipment.", arabic: "افحص أجهزتك.", pronunciation: "تشيك يور إكويبمنت" },
    ],
    quiz: [
      { question: "The _____ report is ready.", questionArabic: "تقرير المهندس جاهز", options: ["engineer", "engineer's", "engineers", "engineering"], correct: 1 },
    ],
  },
  {
    id: "g20", title: "Conjunctions (and/but/or/so)", titleArabic: "أدوات الربط", icon: "🔗",
    explanation: "and = و | but = لكن | or = أو | so = عشان كدة | because = لأن\nبتربط جملتين أو أكتر ببعض",
    rule: "clause + conjunction + clause",
    examples: [
      { english: "Mix the concrete and pour it.", arabic: "اخلط الخرسانة واصبها.", pronunciation: "ميكس ذا كونكريت أند بور إت" },
      { english: "The slump is low, so add water.", arabic: "الهبوط قليل، عشان كده ضيف ماء.", pronunciation: "ذا سلامب إز لو، سو آد ووتر" },
      { english: "We can use Type I or Type II cement.", arabic: "ممكن نستخدم أسمنت نوع I أو نوع II.", pronunciation: "وي كان يوز تايب وان أور تايب تو سيمنت" },
    ],
    quiz: [
      { question: "Test the sample ___ record the result.", questionArabic: "اختبر العينة وسجل النتيجة", options: ["but", "or", "and", "so"], correct: 2 },
      { question: "The sample failed, ___ we rejected it.", questionArabic: "العينة فشلت عشان كدة رفضناها", options: ["but", "or", "and", "so"], correct: 3 },
    ],
  },
  // Lessons 21-50 continue with more advanced topics...
  {
    id: "g21", title: "If Conditionals (Type 0 & 1)", titleArabic: "الشرط (النوع 0 و 1)", icon: "🔀",
    explanation: "Type 0 (حقائق): If + present, present\nType 1 (محتمل): If + present, will + verb",
    rule: "If + condition, result",
    examples: [
      { english: "If the slump is low, add water.", arabic: "لو الهبوط قليل، ضيف ماء.", pronunciation: "إف ذا سلامب إز لو، آد ووتر" },
      { english: "If it rains, we will stop the pour.", arabic: "لو نزل مطر، هنوقف الصب.", pronunciation: "إف إت رينز، وي ويل ستوب ذا بور" },
    ],
    quiz: [
      { question: "If the temperature ___ high, we stop.", questionArabic: "لو الحرارة عالية بنوقف", options: ["is", "was", "will", "would"], correct: 0 },
    ],
  },
  {
    id: "g22", title: "Have to / Need to", titleArabic: "يجب / يحتاج", icon: "⚠️",
    explanation: "have to = لازم (إلزام خارجي)\nneed to = محتاج\ndon't have to = مش لازم (اختياري)",
    rule: "Subject + have to/need to + base verb",
    examples: [
      { english: "We have to follow the specification.", arabic: "لازم نتبع المواصفة.", pronunciation: "وي هاف تو فولو ذا سبيسيفيكيشن" },
      { english: "You need to calibrate the scale.", arabic: "محتاج تعاير الميزان.", pronunciation: "يو نيد تو كاليبريت ذا سكيل" },
    ],
    quiz: [
      { question: "We ___ to test every batch.", questionArabic: "لازم نختبر كل خلطة", options: ["have", "has", "had", "having"], correct: 0 },
    ],
  },
  {
    id: "g23", title: "Present Perfect", titleArabic: "المضارع التام", icon: "✅",
    explanation: "بنستخدمه لحاجة حصلت في الماضي لكن ليها تأثير دلوقتي.\nhas/have + V3 (past participle)",
    rule: "Subject + has/have + past participle",
    examples: [
      { english: "We have tested 50 samples this month.", arabic: "اختبرنا 50 عينة الشهر ده.", pronunciation: "وي هاف تيستيد فيفتي سامبلز ذس مانث" },
      { english: "The concrete has cured for 7 days.", arabic: "الخرسانة اتعالجت 7 أيام.", pronunciation: "ذا كونكريت هاز كيورد فور سيفن ديز" },
    ],
    quiz: [
      { question: "We ___ completed the testing.", questionArabic: "خلصنا الاختبار", options: ["has", "have", "had", "having"], correct: 1 },
    ],
  },
  {
    id: "g24", title: "Adverbs of Frequency", titleArabic: "ظروف التكرار", icon: "🔁",
    explanation: "always = دايماً | usually = عادةً | often = كتير | sometimes = أحياناً | rarely = نادراً | never = أبداً\nبتيجي قبل الفعل الأساسي وبعد be",
    rule: "Subject + adverb + verb",
    examples: [
      { english: "We always check the mix design.", arabic: "دايماً بنراجع تصميم الخلطة.", pronunciation: "وي أولويز تشيك ذا ميكس ديزاين" },
      { english: "The results are usually accurate.", arabic: "النتائج عادةً دقيقة.", pronunciation: "ذا ريزالتس آر يوجوالي أكيوريت" },
    ],
    quiz: [
      { question: "We ___ calibrate the equipment.", questionArabic: "دايماً بنعاير الأجهزة", options: ["always", "never", "rarely", "sometimes"], correct: 0 },
    ],
  },
  {
    id: "g25", title: "Relative Clauses (who/which/that)", titleArabic: "الجمل الوصفية", icon: "📎",
    explanation: "who = للأشخاص | which = للأشياء | that = للاتنين\nبتوصف اسم قبلها",
    rule: "noun + who/which/that + clause",
    examples: [
      { english: "The technician who prepared the sample.", arabic: "الفني اللي جهز العينة.", pronunciation: "ذا تيكنيشن هو بريبيرد ذا سامبل" },
      { english: "The mold that was used for casting.", arabic: "القالب اللي استخدمناه في الصب.", pronunciation: "ذا مولد ذات ووز يوزد فور كاستينج" },
    ],
    quiz: [
      { question: "The sample ___ failed was retested.", questionArabic: "العينة اللي فشلت اتعاد اختبارها", options: ["who", "which", "whom", "where"], correct: 1 },
    ],
  },
  {
    id: "g26", title: "Numbers & Measurements", titleArabic: "الأرقام والقياسات", icon: "📐",
    explanation: "بنقرأ الأرقام العشرية بـ point: 3.5 = three point five\nالنسبة: percent أو % | الوحدات: mm, kg, MPa, °C",
    rule: "number + unit of measurement",
    examples: [
      { english: "The strength is 35.5 MPa.", arabic: "المقاومة 35.5 ميجا باسكال.", pronunciation: "ذا سترينث إز ثيرتي فايف بوينت فايف ميجا باسكال" },
      { english: "Add 0.45 water-cement ratio.", arabic: "ضيف نسبة ماء أسمنت 0.45.", pronunciation: "آد زيرو بوينت فور فايف ووتر سيمنت ريشو" },
    ],
    quiz: [
      { question: "2.5 is read as ___.", questionArabic: "2.5 بتتقرأ إزاي", options: ["two and half", "two point five", "two comma five", "two five"], correct: 1 },
    ],
  },
  {
    id: "g27", title: "Giving Instructions", titleArabic: "إعطاء التعليمات", icon: "📋",
    explanation: "First = أولاً | Then = بعدين | Next = بعد كده | After that = بعد ذلك | Finally = أخيراً\nبنستخدم ترتيب الخطوات في إجراءات المختبر",
    rule: "Sequence word + imperative verb",
    examples: [
      { english: "First, prepare the mold. Then, pour the concrete.", arabic: "أولاً، جهز القالب. بعدين، صب الخرسانة.", pronunciation: "فيرست بريبير ذا مولد. ذين بور ذا كونكريت" },
      { english: "Finally, record the results.", arabic: "أخيراً، سجل النتائج.", pronunciation: "فاينالي ريكورد ذا ريزالتس" },
    ],
    quiz: [
      { question: "_____, weigh the sample.", questionArabic: "أولاً، وزن العينة", options: ["First", "Then", "Finally", "After"], correct: 0 },
    ],
  },
  {
    id: "g28", title: "Expressing Obligation", titleArabic: "التعبير عن الالتزام", icon: "⚖️",
    explanation: "shall = يجب (في المواصفات)\nmust = لازم | required = مطلوب\nmandatory = إلزامي | prohibited = ممنوع",
    rule: "shall/must + base verb (in specifications)",
    examples: [
      { english: "The contractor shall provide test certificates.", arabic: "المقاول يجب أن يقدم شهادات الاختبار.", pronunciation: "ذا كونتراكتور شال بروفايد تيست سيرتيفيكيتس" },
      { english: "Testing is mandatory before acceptance.", arabic: "الاختبار إلزامي قبل القبول.", pronunciation: "تيستينج إز ماندتوري بيفور أكسيبتانس" },
    ],
    quiz: [
      { question: "The contractor ___ submit the report.", questionArabic: "المقاول يجب أن يقدم التقرير", options: ["shall", "can", "may", "might"], correct: 0 },
    ],
  },
  {
    id: "g29", title: "Describing Processes", titleArabic: "وصف العمليات", icon: "⚙️",
    explanation: "بنستخدم المبني للمجهول + ترتيب الخطوات لوصف الإجراءات:\nThe sample is weighed. Then it is placed in the oven.",
    rule: "Passive voice + sequence markers",
    examples: [
      { english: "The aggregate is sieved through different sizes.", arabic: "الركام بيتنخل على أحجام مختلفة.", pronunciation: "ذا أجريجيت إز سيفد ثرو ديفرنت سايزز" },
      { english: "The temperature is recorded every hour.", arabic: "درجة الحرارة بتتسجل كل ساعة.", pronunciation: "ذا تيمبراتشر إز ريكورديد إيفري آور" },
    ],
    quiz: [
      { question: "The sample is ___ and tested.", questionArabic: "العينة بتتوزن وبتتختبر", options: ["weigh", "weighed", "weighing", "weighs"], correct: 1 },
    ],
  },
  {
    id: "g30", title: "Reported Speech", titleArabic: "الكلام المنقول", icon: "💬",
    explanation: "لنقل كلام حد تاني:\nHe said that... | She told me that...\nالزمن بيرجع خطوة للخلف",
    rule: "Subject + said/told + (that) + past tense",
    examples: [
      { english: "The engineer said that the results were acceptable.", arabic: "المهندس قال إن النتائج مقبولة.", pronunciation: "ذا إنجينير سيد ذات ذا ريزالتس وير أكسيبتابل" },
      { english: "He told me to retest the sample.", arabic: "قالي أعيد اختبار العينة.", pronunciation: "هي تولد مي تو ريتيست ذا سامبل" },
    ],
    quiz: [
      { question: "She said that the test ___ failed.", questionArabic: "قالت إن الاختبار فشل", options: ["has", "had", "have", "having"], correct: 1 },
    ],
  },
  // Lessons 31-40
  {
    id: "g31", title: "Expressing Results", titleArabic: "التعبير عن النتائج", icon: "📈",
    explanation: "therefore = لذلك | as a result = نتيجة لذلك\nconsequently = وبالتالي | hence = ومن ثم",
    rule: "Result clause + therefore/as a result",
    examples: [
      { english: "The slump was too high; therefore, we rejected the batch.", arabic: "الهبوط كان عالي جداً؛ لذلك رفضنا الخلطة.", pronunciation: "ذا سلامب ووز تو هاي ذيرفور وي ريجيكتيد ذا باتش" },
    ],
    quiz: [
      { question: "The test failed; ___, we retested.", questionArabic: "الاختبار فشل لذلك أعدنا الاختبار", options: ["but", "therefore", "and", "or"], correct: 1 },
    ],
  },
  {
    id: "g32", title: "Making Suggestions", titleArabic: "تقديم اقتراحات", icon: "💡",
    explanation: "Let's = خلينا | How about = إيه رأيك | Why don't we = ليه منعملش | I suggest = أقترح",
    rule: "Let's/How about + verb(-ing)",
    examples: [
      { english: "Let's test another batch.", arabic: "خلينا نختبر خلطة تانية.", pronunciation: "ليتس تيست أنازر باتش" },
      { english: "How about increasing the cement?", arabic: "إيه رأيك نزود الأسمنت؟", pronunciation: "هاو أباوت إنكريسينج ذا سيمنت" },
    ],
    quiz: [
      { question: "___ retesting the sample.", questionArabic: "إيه رأيك نعيد اختبار العينة", options: ["Let's", "How about", "Why don't", "I suggest"], correct: 1 },
    ],
  },
  {
    id: "g33", title: "Tag Questions", titleArabic: "الأسئلة المذيلة", icon: "🏷️",
    explanation: "الجملة موجبة → سؤال سالب\nThe test passed, didn't it?\nالجملة سالبة → سؤال موجب",
    rule: "Statement + opposite tag?",
    examples: [
      { english: "The sample is ready, isn't it?", arabic: "العينة جاهزة، مش كده؟", pronunciation: "ذا سامبل إز ريدي، إزنت إت" },
      { english: "You tested it, didn't you?", arabic: "إنت اختبرتها، مش كده؟", pronunciation: "يو تيستيد إت، ديدنت يو" },
    ],
    quiz: [
      { question: "The result is good, ___ it?", questionArabic: "النتيجة كويسة، مش كده؟", options: ["is", "isn't", "wasn't", "doesn't"], correct: 1 },
    ],
  },
  {
    id: "g34", title: "Used to", titleArabic: "كان بيعمل (عادة قديمة)", icon: "🕰️",
    explanation: "used to = كان بيعمل (في الماضي ومش بيعمل دلوقتي)\nbe used to = متعود على",
    rule: "Subject + used to + base verb",
    examples: [
      { english: "We used to test manually.", arabic: "كنا بنختبر يدوي.", pronunciation: "وي يوزد تو تيست مانيوالي" },
      { english: "I am used to working in the lab.", arabic: "أنا متعود على الشغل في المعمل.", pronunciation: "آي أم يوزد تو ووركينج إن ذا لاب" },
    ],
    quiz: [
      { question: "We ___ to use old equipment.", questionArabic: "كنا بنستخدم أجهزة قديمة", options: ["use", "used", "using", "uses"], correct: 1 },
    ],
  },
  {
    id: "g35", title: "Phrasal Verbs (Lab)", titleArabic: "الأفعال المركبة (المختبر)", icon: "🔧",
    explanation: "carry out = ينفذ | fill in/out = يملأ | set up = يجهز\nturn on/off = يشغل/يطفي | write down = يكتب | pick up = يرفع",
    rule: "verb + particle (preposition/adverb)",
    examples: [
      { english: "Carry out the test according to the standard.", arabic: "نفذ الاختبار طبقاً للمواصفة.", pronunciation: "كاري أوت ذا تيست أكوردينج تو ذا ستاندرد" },
      { english: "Fill in the test report.", arabic: "إملأ تقرير الاختبار.", pronunciation: "فيل إن ذا تيست ريبورت" },
      { english: "Set up the testing machine.", arabic: "جهز ماكينة الاختبار.", pronunciation: "سيت أب ذا تيستينج مشين" },
    ],
    quiz: [
      { question: "___ out the test carefully.", questionArabic: "نفذ الاختبار بعناية", options: ["Carry", "Fill", "Set", "Turn"], correct: 0 },
    ],
  },
  {
    id: "g36", title: "Describing Properties", titleArabic: "وصف الخصائص", icon: "🔬",
    explanation: "بنستخدم صفات + أسماء لوصف خصائص المواد:\nhigh strength, low permeability, good workability",
    rule: "adjective + property noun",
    examples: [
      { english: "The concrete has high compressive strength.", arabic: "الخرسانة عندها مقاومة ضغط عالية.", pronunciation: "ذا كونكريت هاز هاي كومبريسيف سترينث" },
      { english: "We need low water absorption.", arabic: "محتاجين امتصاص ماء منخفض.", pronunciation: "وي نيد لو ووتر أبسوربشن" },
    ],
    quiz: [
      { question: "The soil has ___ bearing capacity.", questionArabic: "التربة عندها قدرة تحمل عالية", options: ["high", "tall", "big", "large"], correct: 0 },
    ],
  },
  {
    id: "g37", title: "Past Continuous", titleArabic: "الماضي المستمر", icon: "⏳",
    explanation: "was/were + verb-ing = كان بيعمل حاجة في وقت معين في الماضي",
    rule: "Subject + was/were + verb-ing",
    examples: [
      { english: "We were testing when the rain started.", arabic: "كنا بنختبر لما المطر بدأ.", pronunciation: "وي وير تيستينج وين ذا رين ستارتيد" },
      { english: "The machine was vibrating during the pour.", arabic: "الماكينة كانت بتهتز أثناء الصب.", pronunciation: "ذا مشين ووز فايبريتينج ديورينج ذا بور" },
    ],
    quiz: [
      { question: "We ___ working when the supervisor arrived.", questionArabic: "كنا بنشتغل لما المشرف وصل", options: ["was", "were", "are", "is"], correct: 1 },
    ],
  },
  {
    id: "g38", title: "Abbreviations & Symbols", titleArabic: "الاختصارات والرموز", icon: "🔣",
    explanation: "MPa = Megapascal | psi = pounds per square inch\nmm = millimeter | kg = kilogram | °C = degree Celsius\nw/c = water-cement ratio | max. = maximum | min. = minimum",
    rule: "Learn common lab abbreviations",
    examples: [
      { english: "The strength is 30 MPa.", arabic: "المقاومة 30 ميجا باسكال.", pronunciation: "ذا سترينث إز ثيرتي ميجا باسكال" },
      { english: "Max. aggregate size is 20 mm.", arabic: "أقصى حجم للركام 20 مم.", pronunciation: "ماكسيمام أجريجيت سايز إز توينتي ميليميترز" },
    ],
    quiz: [
      { question: "MPa stands for ___.", questionArabic: "MPa اختصار لـ", options: ["Megapascal", "Millipascal", "Maximum", "Minimum"], correct: 0 },
    ],
  },
  {
    id: "g39", title: "Conditional Type 2", titleArabic: "الشرط النوع الثاني", icon: "🤔",
    explanation: "If + past simple, would + verb\nبنستخدمه لمواقف مش حقيقية أو غير محتملة",
    rule: "If + past, subject + would + base verb",
    examples: [
      { english: "If we had better equipment, we would test faster.", arabic: "لو عندنا أجهزة أحسن، كنا هنختبر أسرع.", pronunciation: "إف وي هاد بيتر إكويبمنت وي وود تيست فاستر" },
      { english: "If the mix failed, we would reject it.", arabic: "لو الخلطة فشلت، كنا هنرفضها.", pronunciation: "إف ذا ميكس فيلد وي وود ريجيكت إت" },
    ],
    quiz: [
      { question: "If I ___ more time, I would retest.", questionArabic: "لو عندي وقت أكتر كنت هعيد الاختبار", options: ["have", "had", "has", "having"], correct: 1 },
    ],
  },
  {
    id: "g40", title: "Gerunds & Infinitives", titleArabic: "المصدر والفعل المجرد", icon: "📝",
    explanation: "بعض الأفعال بتيجي بعدها verb+ing:\nenjoy, finish, avoid, consider\nبعض الأفعال بتيجي بعدها to + verb:\nwant, need, decide, plan",
    rule: "verb + -ing | to + verb",
    examples: [
      { english: "We need to calibrate the equipment.", arabic: "محتاجين نعاير الأجهزة.", pronunciation: "وي نيد تو كاليبريت ذا إكويبمنت" },
      { english: "Avoid adding too much water.", arabic: "تجنب إضافة ماء كتير.", pronunciation: "أفويد آدينج تو ماتش ووتر" },
      { english: "We finished testing at 3 PM.", arabic: "خلصنا اختبار الساعة 3.", pronunciation: "وي فينيشت تيستينج أت ثري بي إم" },
    ],
    quiz: [
      { question: "Avoid ___ extra water.", questionArabic: "تجنب إضافة ماء زيادة", options: ["add", "to add", "adding", "adds"], correct: 2 },
    ],
  },
  // Lessons 41-50
  {
    id: "g41", title: "Expressing Purpose", titleArabic: "التعبير عن الهدف", icon: "🎯",
    explanation: "to + verb = عشان | in order to = من أجل | so that = بحيث إن | for + noun = من أجل",
    rule: "to/in order to/so that + purpose",
    examples: [
      { english: "We add admixture to improve workability.", arabic: "بنضيف إضافات عشان نحسن التشغيلية.", pronunciation: "وي آد أدميكستشر تو إمبروف ووركابيليتي" },
      { english: "Test the sample in order to verify the quality.", arabic: "اختبر العينة من أجل التحقق من الجودة.", pronunciation: "تيست ذا سامبل إن أوردر تو فيريفاي ذا كواليتي" },
    ],
    quiz: [
      { question: "We cure concrete ___ increase strength.", questionArabic: "بنعالج الخرسانة عشان نزود المقاومة", options: ["for", "to", "so", "but"], correct: 1 },
    ],
  },
  {
    id: "g42", title: "Cause & Effect", titleArabic: "السبب والنتيجة", icon: "🔗",
    explanation: "because = لأن | due to = بسبب | caused by = سببه | leads to = يؤدي إلى | results in = ينتج عنه",
    rule: "cause + leads to/results in + effect",
    examples: [
      { english: "Cracking was caused by rapid drying.", arabic: "التشقق سببه الجفاف السريع.", pronunciation: "كراكينج ووز كوزد باي رابيد دراينج" },
      { english: "High temperature leads to fast setting.", arabic: "الحرارة العالية بتؤدي لشك سريع.", pronunciation: "هاي تيمبراتشر ليدز تو فاست سيتينج" },
    ],
    quiz: [
      { question: "The failure was ___ by excess water.", questionArabic: "الفشل سببه الماء الزيادة", options: ["caused", "cause", "causing", "causes"], correct: 0 },
    ],
  },
  {
    id: "g43", title: "Approximate Language", titleArabic: "لغة التقريب", icon: "≈",
    explanation: "about/approximately = تقريباً | around = حوالي | roughly = بالتقريب | nearly = تقريباً",
    rule: "approximately/about + number",
    examples: [
      { english: "The strength is approximately 35 MPa.", arabic: "المقاومة تقريباً 35 ميجا باسكال.", pronunciation: "ذا سترينث إز أبروكسيميتلي ثيرتي فايف ميجا باسكال" },
      { english: "About 200 kg of cement per cubic meter.", arabic: "حوالي 200 كيلو أسمنت لكل متر مكعب.", pronunciation: "أباوت تو هاندرد كيلوجرامز أوف سيمنت" },
    ],
    quiz: [
      { question: "The value is ___ 40 MPa.", questionArabic: "القيمة تقريباً 40 ميجا باسكال", options: ["approximate", "approximately", "approximation", "approx"], correct: 1 },
    ],
  },
  {
    id: "g44", title: "Polite Requests", titleArabic: "الطلبات المهذبة", icon: "🤝",
    explanation: "Could you = ممكن | Would you mind = تمانع | Please = من فضلك | I'd like to = أحب أن",
    rule: "Could you + base verb + please?",
    examples: [
      { english: "Could you prepare the sample, please?", arabic: "ممكن تجهز العينة من فضلك؟", pronunciation: "كود يو بريبير ذا سامبل بليز" },
      { english: "Would you mind checking the results?", arabic: "تمانع تراجع النتائج؟", pronunciation: "وود يو مايند تشيكينج ذا ريزالتس" },
    ],
    quiz: [
      { question: "___ you help me with the test?", questionArabic: "ممكن تساعدني في الاختبار؟", options: ["Could", "Do", "Are", "Is"], correct: 0 },
    ],
  },
  {
    id: "g45", title: "Expressing Contrast", titleArabic: "التعبير عن التناقض", icon: "↔️",
    explanation: "however = ومع ذلك | although = بالرغم من | despite = رغم | on the other hand = من ناحية تانية",
    rule: "clause + however/although + contrasting clause",
    examples: [
      { english: "The slump was low; however, the strength was good.", arabic: "الهبوط كان قليل؛ ومع ذلك المقاومة كانت كويسة.", pronunciation: "ذا سلامب ووز لو هاوإيفر ذا سترينث ووز جود" },
      { english: "Although the test failed, we continued.", arabic: "بالرغم من فشل الاختبار، كملنا.", pronunciation: "أولذو ذا تيست فيلد وي كونتينيود" },
    ],
    quiz: [
      { question: "The result failed; ___, we retested.", questionArabic: "النتيجة فشلت؛ ومع ذلك أعدنا الاختبار", options: ["but", "however", "and", "so"], correct: 1 },
    ],
  },
  {
    id: "g46", title: "Writing Lab Reports", titleArabic: "كتابة تقارير المختبر", icon: "📄",
    explanation: "التقارير بتتكتب بالمبني للمجهول:\nThe sample was tested... The results showed...\nبنستخدم أسلوب رسمي ودقيق",
    rule: "Passive voice + formal language",
    examples: [
      { english: "Three specimens were cast and cured for 28 days.", arabic: "تم صب 3 عينات ومعالجتها لمدة 28 يوم.", pronunciation: "ثري سبيسيمنز وير كاست أند كيورد فور توينتي إيت ديز" },
      { english: "The results indicate that the concrete meets the requirements.", arabic: "النتائج بتوضح إن الخرسانة مطابقة للمتطلبات.", pronunciation: "ذا ريزالتس إنديكيت ذات ذا كونكريت ميتس ذا ريكوايرمنتس" },
    ],
    quiz: [
      { question: "The sample ___ tested at 28 days.", questionArabic: "العينة اتختبرت عند 28 يوم", options: ["is", "was", "were", "be"], correct: 1 },
    ],
  },
  {
    id: "g47", title: "Making Comparisons", titleArabic: "المقارنات المتقدمة", icon: "⚖️",
    explanation: "as...as = زي | not as...as = مش زي | the same as = نفس | similar to = شبيه بـ | different from = مختلف عن",
    rule: "as + adj + as | similar to / different from",
    examples: [
      { english: "This mix is as strong as the control.", arabic: "الخلطة دي قوية زي الكنترول.", pronunciation: "ذس ميكس إز أز سترونج أز ذا كونترول" },
      { english: "The results are different from yesterday.", arabic: "النتائج مختلفة عن إمبارح.", pronunciation: "ذا ريزالتس آر ديفرنت فروم ييسترداي" },
    ],
    quiz: [
      { question: "This sample is as ___ as that one.", questionArabic: "العينة دي قوية زي دي", options: ["strong", "stronger", "strongest", "strongly"], correct: 0 },
    ],
  },
  {
    id: "g48", title: "Expressing Recommendations", titleArabic: "التوصيات", icon: "📌",
    explanation: "It is recommended that = يُوصى بأن\nWe recommend + verb-ing = نوصي بـ\nadvisable = يُنصح به",
    rule: "It is recommended + that + clause",
    examples: [
      { english: "It is recommended to increase the cement content.", arabic: "يُوصى بزيادة محتوى الأسمنت.", pronunciation: "إت إز ريكومينديد تو إنكريز ذا سيمنت كونتينت" },
      { english: "We recommend retesting the sample.", arabic: "نوصي بإعادة اختبار العينة.", pronunciation: "وي ريكوميند ريتيستينج ذا سامبل" },
    ],
    quiz: [
      { question: "It is ___ to retest.", questionArabic: "يُنصح بإعادة الاختبار", options: ["recommend", "recommended", "recommending", "recommends"], correct: 1 },
    ],
  },
  {
    id: "g49", title: "Expressing Opinions", titleArabic: "التعبير عن الرأي", icon: "💭",
    explanation: "I think = أعتقد | In my opinion = في رأيي | I believe = أؤمن | It seems = يبدو",
    rule: "I think/believe + that + clause",
    examples: [
      { english: "I think the mix design needs adjustment.", arabic: "أعتقد تصميم الخلطة محتاج تعديل.", pronunciation: "آي ثينك ذا ميكس ديزاين نيدز أجاستمنت" },
      { english: "In my opinion, we should retest.", arabic: "في رأيي، لازم نعيد الاختبار.", pronunciation: "إن ماي أوبينيون وي شود ريتيست" },
    ],
    quiz: [
      { question: "I ___ the results are accurate.", questionArabic: "أعتقد النتائج دقيقة", options: ["think", "thinking", "thought", "thinks"], correct: 0 },
    ],
  },
  {
    id: "g50", title: "Comprehensive Review", titleArabic: "مراجعة شاملة", icon: "🏆",
    explanation: "في الدرس ده هنراجع أهم القواعد اللي اتعلمناها:\n• أزمنة الأفعال\n• المبني للمجهول\n• المقارنات\n• أدوات الربط\n• لغة التقارير",
    rule: "All grammar rules combined",
    examples: [
      { english: "The concrete was tested, and the results showed that it meets the specification.", arabic: "الخرسانة اتختبرت والنتائج وضحت إنها مطابقة للمواصفة.", pronunciation: "ذا كونكريت ووز تيستيد أند ذا ريزالتس شود ذات إت ميتس ذا سبيسيفيكيشن" },
      { english: "If the strength is below 25 MPa, we must reject the batch.", arabic: "لو المقاومة أقل من 25 ميجا باسكال، لازم نرفض الخلطة.", pronunciation: "إف ذا سترينث إز بيلو توينتي فايف ميجا باسكال وي ماست ريجيكت ذا باتش" },
    ],
    quiz: [
      { question: "The sample ___ tested and the results ___ recorded.", questionArabic: "العينة اتختبرت والنتائج اتسجلت", options: ["was/were", "is/are", "were/was", "be/been"], correct: 0 },
      { question: "If it ___ tomorrow, we will delay the pour.", questionArabic: "لو المطر نزل بكرة هنأجل الصب", options: ["rain", "rains", "rained", "raining"], correct: 1 },
    ],
  },
];

const Grammar = () => {
  const [activeLesson, setActiveLesson] = useState<GrammarLesson | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(0.7);
  const [progress, setProgress] = useState(getGrammarProgress());
  const [xpNotif, setXpNotif] = useState<{ amount: number; achievements: Achievement[] } | null>(null);

  const completedCount = Object.keys(progress).filter(k => progress[k]).length;

  const handleAnswer = (idx: number) => {
    if (selected !== null || !activeLesson) return;
    setSelected(idx);
    if (idx === activeLesson.quiz[currentQ].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (!activeLesson) return;
    if (currentQ + 1 < activeLesson.quiz.length) {
      setCurrentQ(q => q + 1);
      setSelected(null);
    } else {
      // Lesson complete
      saveGrammarDone(activeLesson.id);
      setProgress(getGrammarProgress());
      const { newAchievements } = addXP(XP_REWARDS.lessonCompleted, "lessonCompleted");
      setXpNotif({ amount: XP_REWARDS.lessonCompleted, achievements: newAchievements });
      setQuizMode(false);
    }
  };

  const startQuiz = () => {
    setQuizMode(true);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
  };

  // Quiz mode
  if (quizMode && activeLesson) {
    const q = activeLesson.quiz[currentQ];
    return (
      <div className="space-y-6" dir="rtl">
        {xpNotif && <XPNotification xp={xpNotif.amount} achievements={xpNotif.achievements} leveledUp={false} onDone={() => setXpNotif(null)} />}
        <button onClick={() => setQuizMode(false)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft size={16} /> رجوع
        </button>
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">اختبار: {activeLesson.titleArabic}</h3>
            <span className="text-sm text-muted-foreground">{currentQ + 1}/{activeLesson.quiz.length}</span>
          </div>
          <p className="text-lg font-bold text-foreground mb-1" dir="ltr" style={{ textAlign: "left" }}>{q.question}</p>
          <p className="text-sm text-muted-foreground mb-4">{q.questionArabic}</p>
          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null}
                className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${
                  selected === null ? "border-border hover:border-primary" :
                  i === q.correct ? "border-green-500 bg-green-50" :
                  i === selected ? "border-red-500 bg-red-50" : "border-border opacity-50"
                }`} dir="ltr">{opt}</button>
            ))}
          </div>
          {selected !== null && (
            <button onClick={nextQuestion} className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold">
              {currentQ + 1 < activeLesson.quiz.length ? "السؤال التالي ←" : "إنهاء الاختبار ✓"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Lesson detail
  if (activeLesson) {
    return (
      <div className="space-y-6" dir="rtl">
        {xpNotif && <XPNotification xp={xpNotif.amount} achievements={xpNotif.achievements} leveledUp={false} onDone={() => setXpNotif(null)} />}
        <button onClick={() => setActiveLesson(null)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft size={16} /> رجوع للدروس
        </button>
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{activeLesson.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-foreground">{activeLesson.titleArabic}</h3>
              <p className="text-sm text-muted-foreground" dir="ltr">{activeLesson.title}</p>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
            <h4 className="font-bold text-primary mb-2">📖 الشرح:</h4>
            <p className="text-foreground whitespace-pre-line leading-relaxed">{activeLesson.explanation}</p>
          </div>

          {/* Rule */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-3 mb-4 text-center">
            <p className="font-bold text-accent-foreground" dir="ltr">📌 {activeLesson.rule}</p>
          </div>

          {/* Speed Control */}
          <div className="mb-4">
            <SpeedControl speed={speed} onSpeedChange={setSpeed} />
          </div>

          {/* Examples */}
          <h4 className="font-bold text-foreground mb-3">🔊 أمثلة من المختبر:</h4>
          <div className="space-y-3 mb-6">
            {activeLesson.examples.map((ex, i) => (
              <div key={i} className="bg-muted rounded-xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-foreground font-medium" dir="ltr" style={{ textAlign: "left" }}>{ex.english}</p>
                  <button onClick={() => speakText(ex.english, speed)} className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 shrink-0">
                    <Volume2 size={16} />
                  </button>
                </div>
                <p className="text-primary text-sm mt-1">{ex.arabic}</p>
                <p className="text-xs text-muted-foreground mt-1">النطق: {ex.pronunciation}</p>
              </div>
            ))}
          </div>

          {/* Start Quiz */}
          <button onClick={startQuiz} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
            <Star size={18} /> ابدأ الاختبار ({activeLesson.quiz.length} أسئلة)
          </button>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-6" dir="rtl">
      {xpNotif && <XPNotification xp={xpNotif.amount} achievements={xpNotif.achievements} leveledUp={false} onDone={() => setXpNotif(null)} />}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-1">📐 قواعد اللغة الإنجليزية</h2>
        <p className="text-muted-foreground mb-2">50 درس من الصفر للاحتراف — كل درس عليه اختبار من المختبر</p>
        <div className="flex items-center gap-3 bg-primary/10 rounded-xl p-3">
          <BookOpen className="text-primary" size={20} />
          <p className="text-sm text-foreground font-semibold">{completedCount} / {grammarLessons.length} درس مكتمل</p>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(completedCount / grammarLessons.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {grammarLessons.map((lesson, i) => {
          const done = progress[lesson.id];
          const locked = i > 0 && !progress[grammarLessons[i - 1].id] && i > completedCount + 2;
          return (
            <button
              key={lesson.id}
              onClick={() => !locked && setActiveLesson(lesson)}
              disabled={locked}
              className={`p-4 rounded-xl border-2 text-right transition-all ${
                done ? "border-green-500/50 bg-green-50/50" :
                locked ? "border-border opacity-40 cursor-not-allowed" :
                "border-border hover:border-primary hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{locked ? "🔒" : lesson.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">درس {i + 1}</span>
                    {done && <CheckCircle2 className="text-green-500" size={14} />}
                  </div>
                  <h3 className="font-bold text-foreground text-sm truncate">{lesson.titleArabic}</h3>
                  <p className="text-xs text-muted-foreground" dir="ltr">{lesson.title}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Grammar;
