import { useState } from "react";
import { speakText } from "@/lib/phonetics";
import { Volume2, ChevronLeft, CheckCircle2, XCircle, Star } from "lucide-react";
import SpeedControl from "@/components/SpeedControl";
import { addXP, XP_REWARDS, Achievement } from "@/lib/gamification";
import XPNotification from "@/components/XPNotification";

interface StoryScene {
  image: string;
  english: string;
  arabic: string;
  pronunciation: string;
}

interface StoryQuiz {
  question: string;
  questionArabic: string;
  options: string[];
  correct: number;
}

interface IllustratedStory {
  id: string;
  title: string;
  titleArabic: string;
  icon: string;
  category: string;
  scenes: StoryScene[];
  quiz: StoryQuiz[];
}

const illustratedStories: IllustratedStory[] = [
  {
    id: "is1", title: "Slump Test Step by Step", titleArabic: "اختبار الهبوط خطوة بخطوة", icon: "🧪", category: "concrete",
    scenes: [
      { image: "🪣", english: "First, moisten the slump cone and the base plate.", arabic: "أولاً، رطب قمع الهبوط واللوح القاعدي.", pronunciation: "فيرست، مويسن ذا سلامب كون أند ذا بيس بليت" },
      { image: "🏗️", english: "Fill the cone in three layers, each about one-third of the volume.", arabic: "إملأ القمع على 3 طبقات، كل طبقة حوالي ثلث الحجم.", pronunciation: "فيل ذا كون إن ثري ليرز إيتش أباوت وان ثيرد أوف ذا فوليوم" },
      { image: "🔨", english: "Rod each layer with 25 strokes using the tamping rod.", arabic: "ادمك كل طبقة بـ 25 ضربة بقضيب الدمك.", pronunciation: "رود إيتش لير ويذ توينتي فايف ستروكس يوزينج ذا تامبينج رود" },
      { image: "⬆️", english: "Lift the cone vertically in 5 to 10 seconds.", arabic: "ارفع القمع عمودياً في 5 إلى 10 ثوانٍ.", pronunciation: "ليفت ذا كون فيرتيكالي إن فايف تو تين سيكندز" },
      { image: "📏", english: "Measure the difference in height. This is the slump value.", arabic: "قيس فرق الارتفاع. ده قيمة الهبوط.", pronunciation: "ميجر ذا ديفرنس إن هايت. ذس إز ذا سلامب فاليو" },
      { image: "📝", english: "Record the result and compare with the specification.", arabic: "سجل النتيجة وقارنها بالمواصفة.", pronunciation: "ريكورد ذا ريزالت أند كومبير ويذ ذا سبيسيفيكيشن" },
    ],
    quiz: [
      { question: "How many layers do we fill the cone?", questionArabic: "كام طبقة بنملأ القمع؟", options: ["2", "3", "4", "5"], correct: 1 },
      { question: "How many rod strokes per layer?", questionArabic: "كام ضربة دمك لكل طبقة؟", options: ["15", "20", "25", "30"], correct: 2 },
      { question: "How fast should we lift the cone?", questionArabic: "في كام ثانية نرفع القمع؟", options: ["1-3 sec", "5-10 sec", "15-20 sec", "30 sec"], correct: 1 },
    ],
  },
  {
    id: "is2", title: "Cube Casting & Curing", titleArabic: "صب ومعالجة المكعبات", icon: "🧊", category: "concrete",
    scenes: [
      { image: "🧹", english: "Clean the cube molds and apply release oil.", arabic: "نظف قوالب المكعبات وادهنها بزيت الفك.", pronunciation: "كلين ذا كيوب مولدز أند أبلاي ريليز أويل" },
      { image: "🪣", english: "Fill each mold in two layers.", arabic: "إملأ كل قالب على طبقتين.", pronunciation: "فيل إيتش مولد إن تو ليرز" },
      { image: "🔨", english: "Compact each layer on the vibrating table for 15 seconds.", arabic: "ادمك كل طبقة على الطاولة الهزازة لمدة 15 ثانية.", pronunciation: "كومباكت إيتش لير أون ذا فايبريتينج تيبل فور فيفتين سيكندز" },
      { image: "🏷️", english: "Label each cube with the date and batch number.", arabic: "اكتب على كل مكعب التاريخ ورقم الخلطة.", pronunciation: "ليبل إيتش كيوب ويذ ذا ديت أند باتش نامبر" },
      { image: "💧", english: "After 24 hours, demold and place in the curing tank at 20°C.", arabic: "بعد 24 ساعة، فك القالب وحط المكعب في حوض المعالجة عند 20 درجة.", pronunciation: "آفتر توينتي فور آورز ديمولد أند بليس إن ذا كيورينج تانك أت توينتي ديجريز" },
      { image: "📅", english: "Cure for 7 or 28 days, then test for compressive strength.", arabic: "عالج لمدة 7 أو 28 يوم، وبعدين اختبر مقاومة الضغط.", pronunciation: "كيور فور سيفن أور توينتي إيت ديز ذين تيست فور كومبريسيف سترينث" },
    ],
    quiz: [
      { question: "What do we apply before filling?", questionArabic: "بنحط إيه قبل الملء؟", options: ["Water", "Release oil", "Cement", "Sand"], correct: 1 },
      { question: "What temperature for the curing tank?", questionArabic: "درجة حرارة حوض المعالجة؟", options: ["10°C", "20°C", "30°C", "40°C"], correct: 1 },
      { question: "Standard curing period?", questionArabic: "فترة المعالجة القياسية؟", options: ["3 days", "14 days", "28 days", "56 days"], correct: 2 },
    ],
  },
  {
    id: "is3", title: "Sieve Analysis Test", titleArabic: "اختبار التحليل المنخلي", icon: "🔍", category: "concrete",
    scenes: [
      { image: "⚖️", english: "Weigh the aggregate sample accurately.", arabic: "وزن عينة الركام بدقة.", pronunciation: "واي ذا أجريجيت سامبل أكيوريتلي" },
      { image: "🧱", english: "Arrange sieves in order from largest to smallest.", arabic: "رتب المناخل بالترتيب من الأكبر للأصغر.", pronunciation: "أرينج سيفز إن أوردر فروم لارجيست تو سمولست" },
      { image: "🔄", english: "Place the sample on the top sieve and shake for 10 minutes.", arabic: "حط العينة على المنخل العلوي وهز لمدة 10 دقائق.", pronunciation: "بليس ذا سامبل أون ذا توب سيف أند شيك فور تين مينتس" },
      { image: "⚖️", english: "Weigh the material retained on each sieve.", arabic: "وزن المادة المتبقية على كل منخل.", pronunciation: "واي ذا ماتيريال ريتيند أون إيتش سيف" },
      { image: "📊", english: "Calculate the percentage passing each sieve.", arabic: "احسب النسبة المئوية المارة من كل منخل.", pronunciation: "كالكيوليت ذا بيرسينتيج باسينج إيتش سيف" },
      { image: "📈", english: "Plot the grading curve and compare with specification limits.", arabic: "ارسم منحنى التدرج وقارنه بحدود المواصفة.", pronunciation: "بلوت ذا جريدينج كيرف أند كومبير ويذ سبيسيفيكيشن ليميتس" },
    ],
    quiz: [
      { question: "How to arrange sieves?", questionArabic: "ترتيب المناخل إزاي؟", options: ["Random", "Smallest first", "Largest first", "By color"], correct: 2 },
      { question: "What do we calculate?", questionArabic: "بنحسب إيه؟", options: ["Weight only", "Color", "% passing", "Temperature"], correct: 2 },
    ],
  },
  {
    id: "is4", title: "Soil Compaction Test (Proctor)", titleArabic: "اختبار دمك التربة (بروكتور)", icon: "🏗️", category: "soil",
    scenes: [
      { image: "🪣", english: "Take about 3 kg of air-dried soil sample.", arabic: "خد حوالي 3 كجم من عينة تربة مجففة بالهواء.", pronunciation: "تيك أباوت ثري كيلوجرامز أوف إير درايد سويل سامبل" },
      { image: "💧", english: "Add water to the soil and mix thoroughly.", arabic: "ضيف ماء على التربة واخلط كويس.", pronunciation: "آد ووتر تو ذا سويل أند ميكس ثورولي" },
      { image: "🔨", english: "Compact the soil in the mold in three layers, 25 blows each.", arabic: "ادمك التربة في القالب على 3 طبقات، 25 ضربة لكل طبقة.", pronunciation: "كومباكت ذا سويل إن ذا مولد إن ثري ليرز توينتي فايف بلوز إيتش" },
      { image: "⚖️", english: "Weigh the mold with the compacted soil.", arabic: "وزن القالب مع التربة المدموكة.", pronunciation: "واي ذا مولد ويذ ذا كومباكتيد سويل" },
      { image: "🌡️", english: "Take a sample for moisture content determination.", arabic: "خد عينة لتحديد المحتوى المائي.", pronunciation: "تيك أ سامبل فور مويستشر كونتينت ديترميناشن" },
      { image: "📊", english: "Repeat with different water contents and plot the curve.", arabic: "كرر بمحتويات مائية مختلفة وارسم المنحنى.", pronunciation: "ريبيت ويذ ديفرنت ووتر كونتينتس أند بلوت ذا كيرف" },
    ],
    quiz: [
      { question: "How many layers in standard Proctor?", questionArabic: "كام طبقة في بروكتور القياسي؟", options: ["2", "3", "4", "5"], correct: 1 },
      { question: "Blows per layer?", questionArabic: "كام ضربة لكل طبقة؟", options: ["15", "20", "25", "56"], correct: 2 },
    ],
  },
  {
    id: "is5", title: "CBR Test", titleArabic: "اختبار CBR (نسبة تحمل كاليفورنيا)", icon: "📐", category: "soil",
    scenes: [
      { image: "🪣", english: "Prepare the soil sample at optimum moisture content.", arabic: "جهز عينة التربة عند المحتوى المائي الأمثل.", pronunciation: "بريبير ذا سويل سامبل أت أوبتيمام مويستشر كونتينت" },
      { image: "🔨", english: "Compact the sample in the CBR mold.", arabic: "ادمك العينة في قالب CBR.", pronunciation: "كومباكت ذا سامبل إن ذا سي بي آر مولد" },
      { image: "💧", english: "Soak the sample for 4 days.", arabic: "انقع العينة لمدة 4 أيام.", pronunciation: "سوك ذا سامبل فور فور ديز" },
      { image: "⬇️", english: "Place the mold in the testing machine and apply load.", arabic: "حط القالب في ماكينة الاختبار واضغط.", pronunciation: "بليس ذا مولد إن ذا تيستينج مشين أند أبلاي لود" },
      { image: "📊", english: "Record the load at 2.5 mm and 5 mm penetration.", arabic: "سجل الحمل عند اختراق 2.5 مم و 5 مم.", pronunciation: "ريكورد ذا لود أت تو بوينت فايف أند فايف ميليميتر بينيتريشن" },
      { image: "📐", english: "Calculate CBR as percentage of standard load.", arabic: "احسب CBR كنسبة مئوية من الحمل القياسي.", pronunciation: "كالكيوليت سي بي آر أز بيرسينتيج أوف ستاندرد لود" },
    ],
    quiz: [
      { question: "How many days to soak?", questionArabic: "كام يوم نقع؟", options: ["1", "2", "4", "7"], correct: 2 },
      { question: "Penetration values recorded at?", questionArabic: "قيم الاختراق بتتسجل عند؟", options: ["1 & 2 mm", "2.5 & 5 mm", "5 & 10 mm", "10 & 20 mm"], correct: 1 },
    ],
  },
  {
    id: "is6", title: "Marshall Test for Asphalt", titleArabic: "اختبار مارشال للأسفلت", icon: "🛣️", category: "asphalt",
    scenes: [
      { image: "🌡️", english: "Heat the aggregate and bitumen to mixing temperature.", arabic: "سخن الركام والبيتومين لدرجة حرارة الخلط.", pronunciation: "هيت ذا أجريجيت أند بيتيومن تو ميكسينج تيمبراتشر" },
      { image: "🔄", english: "Mix the aggregate with bitumen thoroughly.", arabic: "اخلط الركام مع البيتومين كويس.", pronunciation: "ميكس ذا أجريجيت ويذ بيتيومن ثورولي" },
      { image: "🔨", english: "Compact the specimen with 75 blows on each side.", arabic: "ادمك العينة بـ 75 ضربة على كل وجه.", pronunciation: "كومباكت ذا سبيسيمن ويذ سيفنتي فايف بلوز أون إيتش سايد" },
      { image: "💧", english: "Determine the bulk specific gravity and air voids.", arabic: "حدد الكثافة الظاهرية ونسبة الفراغات الهوائية.", pronunciation: "ديترمين ذا بالك سبيسيفيك جرافيتي أند إير فويدز" },
      { image: "🌡️", english: "Place the specimen in a water bath at 60°C for 30 minutes.", arabic: "حط العينة في حمام مائي عند 60 درجة لمدة 30 دقيقة.", pronunciation: "بليس ذا سبيسيمن إن أ ووتر باث أت سيكستي ديجريز فور ثيرتي مينتس" },
      { image: "📊", english: "Test for stability and flow using the Marshall apparatus.", arabic: "اختبر الثبات والانسياب بجهاز مارشال.", pronunciation: "تيست فور ستابيليتي أند فلو يوزينج ذا مارشال أباراتس" },
    ],
    quiz: [
      { question: "How many blows per side?", questionArabic: "كام ضربة لكل وجه؟", options: ["25", "50", "75", "100"], correct: 2 },
      { question: "Water bath temperature?", questionArabic: "درجة حرارة الحمام المائي؟", options: ["25°C", "40°C", "60°C", "80°C"], correct: 2 },
    ],
  },
  {
    id: "is7", title: "Concrete Compression Test", titleArabic: "اختبار مقاومة الضغط", icon: "💪", category: "concrete",
    scenes: [
      { image: "💧", english: "Remove the cube from the curing tank.", arabic: "طلع المكعب من حوض المعالجة.", pronunciation: "ريموف ذا كيوب فروم ذا كيورينج تانك" },
      { image: "📏", english: "Measure and record the dimensions of the cube.", arabic: "قيس وسجل أبعاد المكعب.", pronunciation: "ميجر أند ريكورد ذا ديمينشنز أوف ذا كيوب" },
      { image: "⚖️", english: "Weigh the specimen and record the weight.", arabic: "وزن العينة وسجل الوزن.", pronunciation: "واي ذا سبيسيمن أند ريكورد ذا وايت" },
      { image: "⬇️", english: "Place the cube centrally in the compression machine.", arabic: "حط المكعب في مركز ماكينة الضغط.", pronunciation: "بليس ذا كيوب سينترالي إن ذا كومبريشن مشين" },
      { image: "📈", english: "Apply load at a rate of 0.6 MPa/s until failure.", arabic: "اضغط بمعدل 0.6 ميجا باسكال/ث حتى الكسر.", pronunciation: "أبلاي لود أت أ ريت أوف زيرو بوينت سيكس ميجا باسكال بير سيكند أنتيل فيليور" },
      { image: "📝", english: "Record the maximum load and calculate the strength.", arabic: "سجل أقصى حمل واحسب المقاومة.", pronunciation: "ريكورد ذا ماكسيمام لود أند كالكيوليت ذا سترينث" },
    ],
    quiz: [
      { question: "Loading rate for compression test?", questionArabic: "معدل التحميل لاختبار الضغط؟", options: ["0.3 MPa/s", "0.6 MPa/s", "1.0 MPa/s", "2.0 MPa/s"], correct: 1 },
      { question: "What do we record at failure?", questionArabic: "بنسجل إيه عند الكسر؟", options: ["Color", "Max load", "Temperature", "Sound"], correct: 1 },
    ],
  },
  {
    id: "is8", title: "Atterberg Limits Test", titleArabic: "اختبار حدود أتربرج", icon: "🏺", category: "soil",
    scenes: [
      { image: "🪣", english: "Take about 200g of soil passing sieve No. 40.", arabic: "خد حوالي 200 جرام تربة مارة من منخل رقم 40.", pronunciation: "تيك أباوت تو هاندرد جرامز أوف سويل باسينج سيف نامبر فورتي" },
      { image: "💧", english: "Add water gradually and mix until uniform paste.", arabic: "ضيف ماء تدريجياً واخلط لحد ما تبقى عجينة متجانسة.", pronunciation: "آد ووتر جراجوالي أند ميكس أنتيل يونيفورم بيست" },
      { image: "📏", english: "Place the paste in the Casagrande cup and make a groove.", arabic: "حط العجينة في كاس كاساجراندي واعمل أخدود.", pronunciation: "بليس ذا بيست إن ذا كاساجراندي كاب أند ميك أ جروف" },
      { image: "🔄", english: "Drop the cup and count the blows until the groove closes.", arabic: "أسقط الكاس واحسب الضربات لحد ما الأخدود يتقفل.", pronunciation: "دروب ذا كاب أند كاونت ذا بلوز أنتيل ذا جروف كلوزز" },
      { image: "📊", english: "The liquid limit is at 25 blows.", arabic: "حد السيولة عند 25 ضربة.", pronunciation: "ذا ليكويد ليميت إز أت توينتي فايف بلوز" },
      { image: "🔬", english: "For plastic limit, roll soil into 3mm thread.", arabic: "لحد اللدونة، افرد التربة لخيط 3 مم.", pronunciation: "فور بلاستيك ليميت رول سويل إنتو ثري ميليميتر ثريد" },
    ],
    quiz: [
      { question: "Liquid limit is at how many blows?", questionArabic: "حد السيولة عند كام ضربة؟", options: ["15", "20", "25", "30"], correct: 2 },
      { question: "Plastic limit thread diameter?", questionArabic: "قطر خيط حد اللدونة؟", options: ["1mm", "3mm", "5mm", "10mm"], correct: 1 },
    ],
  },
  // ─── NEW SOIL STORIES ───
  {
    id: "is9", title: "Field Density Test (Sand Cone)", titleArabic: "اختبار الكثافة الحقلية (المخروط الرملي)", icon: "⏳", category: "soil",
    scenes: [
      { image: "🕳️", english: "Dig a small hole in the compacted soil layer.", arabic: "احفر حفرة صغيرة في طبقة التربة المدموكة.", pronunciation: "ديج أ سمول هول إن ذا كومباكتيد سويل لير" },
      { image: "⚖️", english: "Weigh all the soil removed from the hole.", arabic: "وزن كل التربة اللي طلعت من الحفرة.", pronunciation: "واي أول ذا سويل ريموفد فروم ذا هول" },
      { image: "⏳", english: "Place the sand cone apparatus over the hole.", arabic: "حط جهاز المخروط الرملي فوق الحفرة.", pronunciation: "بليس ذا ساند كون أباراتس أوفر ذا هول" },
      { image: "🏖️", english: "Allow calibrated sand to fill the hole.", arabic: "خلي الرمل المعاير يملأ الحفرة.", pronunciation: "ألاو كاليبريتيد ساند تو فيل ذا هول" },
      { image: "📊", english: "Calculate the volume from the sand weight.", arabic: "احسب الحجم من وزن الرمل.", pronunciation: "كالكيوليت ذا فوليوم فروم ذا ساند وايت" },
      { image: "📐", english: "Determine the field density and compare with MDD.", arabic: "حدد الكثافة الحقلية وقارنها بأقصى كثافة جافة.", pronunciation: "ديترمين ذا فيلد دينسيتي أند كومبير ويذ إم دي دي" },
    ],
    quiz: [
      { question: "What fills the hole?", questionArabic: "إيه اللي بيملأ الحفرة؟", options: ["Water", "Calibrated sand", "Cement", "Gravel"], correct: 1 },
      { question: "We compare field density with?", questionArabic: "بنقارن الكثافة الحقلية بـ؟", options: ["CBR", "MDD", "LL", "PI"], correct: 1 },
    ],
  },
  {
    id: "is10", title: "Hydrometer Test", titleArabic: "اختبار الهيدروميتر", icon: "🧪", category: "soil",
    scenes: [
      { image: "🪣", english: "Take 50g of fine soil passing sieve No. 200.", arabic: "خد 50 جرام تربة ناعمة مارة من منخل 200.", pronunciation: "تيك فيفتي جرامز أوف فاين سويل باسينج سيف نامبر تو هاندرد" },
      { image: "💧", english: "Mix with dispersing agent and distilled water.", arabic: "اخلط مع مادة مشتتة وماء مقطر.", pronunciation: "ميكس ويذ ديسبيرسينج إيجنت أند ديستيلد ووتر" },
      { image: "🔄", english: "Shake the cylinder vigorously for one minute.", arabic: "هز الأسطوانة بقوة لمدة دقيقة.", pronunciation: "شيك ذا سيليندر فيجوروسلي فور وان مينت" },
      { image: "📏", english: "Insert the hydrometer and take readings at intervals.", arabic: "أدخل الهيدروميتر وخد قراءات على فترات.", pronunciation: "إنسيرت ذا هايدروميتر أند تيك ريدينجز أت إنترفالز" },
      { image: "📊", english: "Plot the grain size distribution curve.", arabic: "ارسم منحنى توزيع حجم الحبيبات.", pronunciation: "بلوت ذا جرين سايز ديستريبيوشن كيرف" },
    ],
    quiz: [
      { question: "Sample weight for hydrometer?", questionArabic: "وزن العينة للهيدروميتر؟", options: ["10g", "50g", "200g", "500g"], correct: 1 },
    ],
  },
  {
    id: "is11", title: "Specific Gravity of Soil", titleArabic: "الكثافة النوعية للتربة", icon: "🔬", category: "soil",
    scenes: [
      { image: "⚖️", english: "Weigh the empty pycnometer.", arabic: "وزن البيكنوميتر الفارغ.", pronunciation: "واي ذا إمبتي بيكنوميتر" },
      { image: "🪣", english: "Add a known weight of dry soil.", arabic: "ضيف وزن معلوم من التربة الجافة.", pronunciation: "آد أ نون وايت أوف دراي سويل" },
      { image: "💧", english: "Fill with distilled water and remove air bubbles.", arabic: "إملأ بماء مقطر وأزل فقاعات الهواء.", pronunciation: "فيل ويذ ديستيلد ووتر أند ريموف إير بابلز" },
      { image: "⚖️", english: "Weigh the pycnometer with soil and water.", arabic: "وزن البيكنوميتر بالتربة والماء.", pronunciation: "واي ذا بيكنوميتر ويذ سويل أند ووتر" },
      { image: "📐", english: "Calculate specific gravity using the formula.", arabic: "احسب الكثافة النوعية بالمعادلة.", pronunciation: "كالكيوليت سبيسيفيك جرافيتي يوزينج ذا فورميولا" },
    ],
    quiz: [
      { question: "What instrument is used?", questionArabic: "إيه الجهاز المستخدم؟", options: ["Hydrometer", "Pycnometer", "Scale only", "Oven"], correct: 1 },
    ],
  },
  // ─── NEW ASPHALT STORIES ───
  {
    id: "is12", title: "Bitumen Penetration Test", titleArabic: "اختبار الاختراق للبيتومين", icon: "📍", category: "asphalt",
    scenes: [
      { image: "🌡️", english: "Heat the bitumen sample and pour into the container.", arabic: "سخن عينة البيتومين واصبها في الحاوية.", pronunciation: "هيت ذا بيتيومن سامبل أند بور إنتو ذا كونتينر" },
      { image: "❄️", english: "Cool the sample to 25°C in a water bath.", arabic: "برد العينة لـ 25 درجة في حمام مائي.", pronunciation: "كول ذا سامبل تو توينتي فايف ديجريز إن أ ووتر باث" },
      { image: "📍", english: "Place the needle on the surface of the bitumen.", arabic: "حط الإبرة على سطح البيتومين.", pronunciation: "بليس ذا نيدل أون ذا سيرفيس أوف ذا بيتيومن" },
      { image: "⏱️", english: "Release the needle for exactly 5 seconds under 100g load.", arabic: "اترك الإبرة لمدة 5 ثواني تحت حمل 100 جرام.", pronunciation: "ريليز ذا نيدل فور إجزاكتلي فايف سيكندز أندر وان هاندرد جرام لود" },
      { image: "📏", english: "Read the penetration value in 0.1mm units.", arabic: "اقرأ قيمة الاختراق بوحدة 0.1 مم.", pronunciation: "ريد ذا بينيتريشن فاليو إن زيرو بوينت وان ميليميتر يونيتس" },
    ],
    quiz: [
      { question: "Test temperature?", questionArabic: "درجة حرارة الاختبار؟", options: ["15°C", "25°C", "60°C", "100°C"], correct: 1 },
      { question: "Load on needle?", questionArabic: "الحمل على الإبرة؟", options: ["50g", "100g", "200g", "500g"], correct: 1 },
    ],
  },
  {
    id: "is13", title: "Softening Point Test (Ring & Ball)", titleArabic: "اختبار درجة التلين (الحلقة والكرة)", icon: "🔥", category: "asphalt",
    scenes: [
      { image: "🌡️", english: "Heat bitumen and pour into two brass rings.", arabic: "سخن البيتومين واصبه في حلقتين نحاس.", pronunciation: "هيت بيتيومن أند بور إنتو تو براس رينجز" },
      { image: "❄️", english: "Cool and trim excess bitumen level with the ring.", arabic: "بردها وسوي السطح مع الحلقة.", pronunciation: "كول أند تريم إكسيس بيتيومن ليفل ويذ ذا رينج" },
      { image: "⚽", english: "Place a steel ball on each ring.", arabic: "حط كرة معدنية على كل حلقة.", pronunciation: "بليس أ ستيل بول أون إيتش رينج" },
      { image: "🌡️", english: "Heat the water bath at 5°C per minute.", arabic: "سخن الحمام المائي بمعدل 5 درجات في الدقيقة.", pronunciation: "هيت ذا ووتر باث أت فايف ديجريز بير مينت" },
      { image: "📏", english: "Record when bitumen touches the bottom plate.", arabic: "سجل لما البيتومين يلمس اللوح السفلي.", pronunciation: "ريكورد وين بيتيومن تاتشيز ذا بوتوم بليت" },
    ],
    quiz: [
      { question: "Heating rate?", questionArabic: "معدل التسخين؟", options: ["1°C/min", "5°C/min", "10°C/min", "15°C/min"], correct: 1 },
    ],
  },
  {
    id: "is14", title: "Extraction Test for Asphalt", titleArabic: "اختبار الاستخلاص للأسفلت", icon: "🧫", category: "asphalt",
    scenes: [
      { image: "⚖️", english: "Weigh the asphalt sample accurately.", arabic: "وزن عينة الأسفلت بدقة.", pronunciation: "واي ذا أسفالت سامبل أكيوريتلي" },
      { image: "🧪", english: "Add solvent to dissolve the bitumen.", arabic: "ضيف مذيب لإذابة البيتومين.", pronunciation: "آد سولفنت تو ديزولف ذا بيتيومن" },
      { image: "🔄", english: "Centrifuge the mixture to separate aggregate.", arabic: "استخدم الطرد المركزي لفصل الركام.", pronunciation: "سينتريفيوج ذا ميكستشر تو سيباريت أجريجيت" },
      { image: "⚖️", english: "Weigh the dried aggregate and calculate bitumen content.", arabic: "وزن الركام الجاف واحسب نسبة البيتومين.", pronunciation: "واي ذا درايد أجريجيت أند كالكيوليت بيتيومن كونتينت" },
      { image: "📊", english: "Run sieve analysis on the extracted aggregate.", arabic: "اعمل تحليل منخلي على الركام المستخلص.", pronunciation: "ران سيف أناليسيس أون ذا إكستراكتيد أجريجيت" },
    ],
    quiz: [
      { question: "What dissolves the bitumen?", questionArabic: "إيه اللي بيذيب البيتومين؟", options: ["Water", "Solvent", "Acid", "Oil"], correct: 1 },
    ],
  },
  {
    id: "is15", title: "Ductility Test", titleArabic: "اختبار المتانة (الاستطالة)", icon: "↔️", category: "asphalt",
    scenes: [
      { image: "🌡️", english: "Heat bitumen and pour into the ductility mold.", arabic: "سخن البيتومين واصبه في قالب الاستطالة.", pronunciation: "هيت بيتيومن أند بور إنتو ذا داكتيليتي مولد" },
      { image: "❄️", english: "Cool to 25°C in a water bath for 90 minutes.", arabic: "برد لـ 25 درجة في حمام مائي لمدة 90 دقيقة.", pronunciation: "كول تو توينتي فايف ديجريز إن أ ووتر باث فور ناينتي مينتس" },
      { image: "↔️", english: "Pull the sample at a rate of 50mm per minute.", arabic: "اسحب العينة بمعدل 50 مم في الدقيقة.", pronunciation: "بول ذا سامبل أت أ ريت أوف فيفتي ميليميتر بير مينت" },
      { image: "📏", english: "Measure the length at the point of breaking.", arabic: "قيس الطول عند نقطة الكسر.", pronunciation: "ميجر ذا لينث أت ذا بوينت أوف بريكينج" },
    ],
    quiz: [
      { question: "Pulling rate?", questionArabic: "معدل السحب؟", options: ["10mm/min", "25mm/min", "50mm/min", "100mm/min"], correct: 2 },
    ],
  },
  // ─── NEW CONCRETE STORIES ───
  {
    id: "is16", title: "Concrete Core Testing", titleArabic: "اختبار اللب الخرساني", icon: "🔩", category: "concrete",
    scenes: [
      { image: "🔩", english: "Mark the core location on the concrete structure.", arabic: "حدد مكان اللب على المنشأ الخرساني.", pronunciation: "مارك ذا كور لوكيشن أون ذا كونكريت ستراكتشر" },
      { image: "🔄", english: "Drill the core using a diamond core drill.", arabic: "اقطع اللب باستخدام مثقاب ماسي.", pronunciation: "دريل ذا كور يوزينج أ دايموند كور دريل" },
      { image: "📏", english: "Measure the length and diameter of the core.", arabic: "قيس طول وقطر اللب.", pronunciation: "ميجر ذا لينث أند دايميتر أوف ذا كور" },
      { image: "💧", english: "Cap the ends with sulfur or neoprene caps.", arabic: "سوي الأطراف بالكبريت أو أغطية نيوبرين.", pronunciation: "كاب ذا إندز ويذ سالفر أور نيوبرين كابس" },
      { image: "⬇️", english: "Test in the compression machine.", arabic: "اختبر في ماكينة الضغط.", pronunciation: "تيست إن ذا كومبريشن مشين" },
      { image: "📐", english: "Apply correction factor for L/D ratio.", arabic: "طبق معامل التصحيح لنسبة الطول/القطر.", pronunciation: "أبلاي كوريكشن فاكتور فور إل دي ريشيو" },
    ],
    quiz: [
      { question: "What drill is used?", questionArabic: "إيه المثقاب المستخدم؟", options: ["Normal drill", "Diamond core drill", "Hand drill", "Hammer"], correct: 1 },
    ],
  },
  {
    id: "is17", title: "Rebound Hammer Test", titleArabic: "اختبار مطرقة الارتداد (شميدت)", icon: "🔨", category: "concrete",
    scenes: [
      { image: "📍", english: "Select a smooth area on the concrete surface.", arabic: "اختار منطقة ملساء على سطح الخرسانة.", pronunciation: "سيليكت أ سموذ إيريا أون ذا كونكريت سيرفيس" },
      { image: "🔨", english: "Hold the hammer perpendicular to the surface.", arabic: "امسك المطرقة عمودياً على السطح.", pronunciation: "هولد ذا هامر بيربنديكيولر تو ذا سيرفيس" },
      { image: "📏", english: "Take at least 12 readings at different points.", arabic: "خد على الأقل 12 قراءة في نقاط مختلفة.", pronunciation: "تيك أت ليست توليف ريدينجز أت ديفرنت بوينتس" },
      { image: "📊", english: "Calculate the average rebound number.", arabic: "احسب متوسط رقم الارتداد.", pronunciation: "كالكيوليت ذا أفريج ريباوند نامبر" },
      { image: "📐", english: "Estimate concrete strength from the calibration chart.", arabic: "قدر مقاومة الخرسانة من جدول المعايرة.", pronunciation: "إستيميت كونكريت سترينث فروم ذا كاليبريشن تشارت" },
    ],
    quiz: [
      { question: "Minimum readings?", questionArabic: "أقل عدد قراءات؟", options: ["5", "8", "12", "20"], correct: 2 },
    ],
  },
  {
    id: "is18", title: "Setting Time Test", titleArabic: "اختبار زمن الشك", icon: "⏱️", category: "concrete",
    scenes: [
      { image: "⚖️", english: "Weigh 400g of cement and determine water of normal consistency.", arabic: "وزن 400 جرام أسمنت وحدد ماء القوام العادي.", pronunciation: "واي فور هاندرد جرامز أوف سيمنت أند ديترمين ووتر أوف نورمال كونسيستينسي" },
      { image: "💧", english: "Mix cement with water of normal consistency.", arabic: "اخلط الأسمنت مع ماء القوام العادي.", pronunciation: "ميكس سيمنت ويذ ووتر أوف نورمال كونسيستينسي" },
      { image: "🪣", english: "Fill the Vicat mold with cement paste.", arabic: "إملأ قالب فيكات بالعجينة الأسمنتية.", pronunciation: "فيل ذا فيكات مولد ويذ سيمنت بيست" },
      { image: "📍", english: "Use 1mm needle for initial setting time.", arabic: "استخدم إبرة 1 مم لزمن الشك الابتدائي.", pronunciation: "يوز وان ميليميتر نيدل فور إنيشيال سيتينج تايم" },
      { image: "⏱️", english: "Record when needle penetrates only 5mm from bottom.", arabic: "سجل لما الإبرة تخترق 5 مم فقط من القاع.", pronunciation: "ريكورد وين نيدل بينيتريتس أونلي فايف ميليميتر فروم بوتوم" },
    ],
    quiz: [
      { question: "Needle for initial setting?", questionArabic: "إبرة الشك الابتدائي؟", options: ["1mm", "3mm", "5mm", "10mm"], correct: 0 },
    ],
  },
];

const categoryTabs = [
  { id: "concrete", label: "الخرسانة", icon: "🧱" },
  { id: "soil", label: "التربة", icon: "🏗️" },
  { id: "asphalt", label: "الأسفلت", icon: "🛣️" },
];

const IllustratedStories = () => {
  const [activeCategory, setActiveCategory] = useState("concrete");
  const [activeStory, setActiveStory] = useState<IllustratedStory | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(0.7);
  const [xpNotif, setXpNotif] = useState<{ amount: number; achievements: Achievement[] } | null>(null);

  const filtered = illustratedStories.filter(s => s.category === activeCategory);

  const handleAnswer = (idx: number) => {
    if (selected !== null || !activeStory) return;
    setSelected(idx);
    if (idx === activeStory.quiz[currentQ].correct) setScore(s => s + 1);
  };

  const nextQ = () => {
    if (!activeStory) return;
    if (currentQ + 1 < activeStory.quiz.length) {
      setCurrentQ(q => q + 1);
      setSelected(null);
    } else {
      const { newAchievements } = addXP(XP_REWARDS.storyRead, "storyRead");
      setXpNotif({ amount: XP_REWARDS.storyRead, achievements: newAchievements });
      setQuizMode(false);
    }
  };

  // Quiz
  if (quizMode && activeStory) {
    const q = activeStory.quiz[currentQ];
    return (
      <div className="space-y-6" dir="rtl">
        {xpNotif && <XPNotification xp={xpNotif.amount} achievements={xpNotif.achievements} leveledUp={false} onDone={() => setXpNotif(null)} />}
        <button onClick={() => setQuizMode(false)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft size={16} /> رجوع
        </button>
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">اختبار: {activeStory.titleArabic}</h3>
          <p className="text-lg font-bold mb-1" dir="ltr" style={{ textAlign: "left" }}>{q.question}</p>
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
            <button onClick={nextQ} className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold">
              {currentQ + 1 < activeStory.quiz.length ? "التالي ←" : `انتهى! النتيجة: ${score}/${activeStory.quiz.length}`}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Story detail - scene by scene
  if (activeStory) {
    const scene = activeStory.scenes[currentScene];
    return (
      <div className="space-y-6" dir="rtl">
        {xpNotif && <XPNotification xp={xpNotif.amount} achievements={xpNotif.achievements} leveledUp={false} onDone={() => setXpNotif(null)} />}
        <button onClick={() => { setActiveStory(null); setCurrentScene(0); }} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft size={16} /> رجوع
        </button>
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-1">{activeStory.titleArabic}</h3>
          <p className="text-sm text-muted-foreground mb-4">خطوة {currentScene + 1} / {activeStory.scenes.length}</p>

          {/* Scene */}
          <div className="bg-muted rounded-2xl p-8 text-center mb-4">
            <span className="text-7xl block mb-4">{scene.image}</span>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-foreground font-medium text-lg" dir="ltr" style={{ textAlign: "left" }}>{scene.english}</p>
              <button onClick={() => speakText(scene.english, speed)} className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 shrink-0">
                <Volume2 size={18} />
              </button>
            </div>
            <p className="text-primary font-semibold">{scene.arabic}</p>
            <p className="text-sm text-muted-foreground">النطق: {scene.pronunciation}</p>
            <SpeedControl speed={speed} onSpeedChange={setSpeed} />
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 justify-center mb-4">
            {activeStory.scenes.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === currentScene ? "bg-primary scale-125" : i < currentScene ? "bg-green-500" : "bg-muted-foreground/20"}`} />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            {currentScene > 0 && (
              <button onClick={() => setCurrentScene(c => c - 1)} className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold">
                ← السابق
              </button>
            )}
            {currentScene < activeStory.scenes.length - 1 ? (
              <button onClick={() => setCurrentScene(c => c + 1)} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold">
                التالي →
              </button>
            ) : (
              <button onClick={() => { setQuizMode(true); setCurrentQ(0); setSelected(null); setScore(0); }} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2">
                <Star size={18} /> ابدأ الاختبار
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-6" dir="rtl">
      {xpNotif && <XPNotification xp={xpNotif.amount} achievements={xpNotif.achievements} leveledUp={false} onDone={() => setXpNotif(null)} />}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-1">🎨 قصص مصورة تفاعلية</h2>
        <p className="text-muted-foreground mb-4">تعلم إجراءات الاختبار خطوة بخطوة مع صور وأسئلة</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryTabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveCategory(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === tab.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}>
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(story => (
          <button key={story.id} onClick={() => { setActiveStory(story); setCurrentScene(0); }}
            className="bg-card rounded-xl border border-border p-5 text-right hover:border-primary hover:shadow-md transition-all group">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{story.icon}</span>
              <div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{story.titleArabic}</h3>
                <p className="text-xs text-muted-foreground" dir="ltr">{story.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{story.scenes.length} خطوة • {story.quiz.length} أسئلة</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IllustratedStories;
