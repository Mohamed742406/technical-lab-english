export interface VocabWord {
  english: string;
  arabic: string;
  pronunciation: string;
  category: string;
  example?: string;
  exampleArabic?: string;
}

export interface VocabCategory {
  id: string;
  name: string;
  icon: string;
  words: VocabWord[];
}

// Custom words stored in localStorage
const CUSTOM_WORDS_KEY = "lab-english-custom-words";

export function getCustomWords(): VocabWord[] {
  try {
    const stored = localStorage.getItem(CUSTOM_WORDS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addCustomWord(word: VocabWord): void {
  const existing = getCustomWords();
  // Avoid duplicates
  if (existing.some((w) => w.english.toLowerCase() === word.english.toLowerCase() && w.category === word.category)) return;
  existing.push(word);
  localStorage.setItem(CUSTOM_WORDS_KEY, JSON.stringify(existing));
}

export function removeCustomWord(english: string, category: string): void {
  const existing = getCustomWords().filter(
    (w) => !(w.english.toLowerCase() === english.toLowerCase() && w.category === category)
  );
  localStorage.setItem(CUSTOM_WORDS_KEY, JSON.stringify(existing));
}

const baseCategories: VocabCategory[] = [
  {
    id: "soil",
    name: "اختبارات التربة",
    icon: "🏗️",
    words: [
      { english: "Soil", arabic: "تربة", pronunciation: "سويل", category: "soil", example: "The soil sample was collected.", exampleArabic: "تم جمع عينة التربة." },
      { english: "Compaction", arabic: "دمك", pronunciation: "كومباكشن", category: "soil", example: "Check the compaction ratio.", exampleArabic: "تحقق من نسبة الدمك." },
      { english: "Moisture Content", arabic: "محتوى الرطوبة", pronunciation: "مويستشر كونتنت", category: "soil", example: "Measure the moisture content.", exampleArabic: "قياس محتوى الرطوبة." },
      { english: "Sieve Analysis", arabic: "تحليل المناخل", pronunciation: "سيف أناليسيس", category: "soil", example: "Perform a sieve analysis.", exampleArabic: "قم بإجراء تحليل المناخل." },
      { english: "Proctor Test", arabic: "اختبار بروكتور", pronunciation: "بروكتور تيست", category: "soil", example: "Run the Proctor test.", exampleArabic: "قم بإجراء اختبار بروكتور." },
      { english: "Bearing Capacity", arabic: "قدرة التحمل", pronunciation: "بيرينج كاباسيتي", category: "soil", example: "Calculate the bearing capacity.", exampleArabic: "احسب قدرة التحمل." },
      { english: "Specific Gravity", arabic: "الكثافة النوعية", pronunciation: "سبيسيفيك جرافيتي", category: "soil", example: "Determine the specific gravity.", exampleArabic: "حدد الكثافة النوعية." },
      { english: "Liquid Limit", arabic: "حد السيولة", pronunciation: "ليكويد ليميت", category: "soil", example: "Find the liquid limit.", exampleArabic: "أوجد حد السيولة." },
      { english: "Plastic Limit", arabic: "حد اللدونة", pronunciation: "بلاستيك ليميت", category: "soil", example: "Determine the plastic limit.", exampleArabic: "حدد حد اللدونة." },
      { english: "CBR Test", arabic: "اختبار CBR", pronunciation: "سي بي آر تيست", category: "soil", example: "The CBR value is acceptable.", exampleArabic: "قيمة CBR مقبولة." },
      { english: "Density", arabic: "كثافة", pronunciation: "دينسيتي", category: "soil", example: "Check the field density.", exampleArabic: "تحقق من الكثافة الحقلية." },
      { english: "Sample", arabic: "عينة", pronunciation: "سامبل", category: "soil", example: "Take a soil sample.", exampleArabic: "خذ عينة تربة." },
      // New words
      { english: "Permeability", arabic: "نفاذية", pronunciation: "بيرميابيليتي", category: "soil", example: "Measure the soil permeability.", exampleArabic: "قياس نفاذية التربة." },
      { english: "Consolidation", arabic: "تصلب / انضغاط", pronunciation: "كونسوليديشن", category: "soil", example: "Run the consolidation test.", exampleArabic: "قم بإجراء اختبار الانضغاط." },
      { english: "Shear Strength", arabic: "مقاومة القص", pronunciation: "شير سترينث", category: "soil", example: "Calculate the shear strength.", exampleArabic: "احسب مقاومة القص." },
      { english: "Clay", arabic: "طين", pronunciation: "كلاي", category: "soil", example: "The soil contains clay.", exampleArabic: "التربة تحتوي على طين." },
      { english: "Sand", arabic: "رمل", pronunciation: "ساند", category: "soil", example: "Add sand to the mixture.", exampleArabic: "أضف رمل للخلطة." },
      { english: "Gravel", arabic: "حصى / زلط", pronunciation: "جرافل", category: "soil", example: "Use coarse gravel.", exampleArabic: "استخدم حصى خشن." },
      { english: "Water Table", arabic: "منسوب المياه الجوفية", pronunciation: "ووتر تيبل", category: "soil", example: "The water table is high.", exampleArabic: "منسوب المياه الجوفية مرتفع." },
      { english: "Void Ratio", arabic: "نسبة الفراغات", pronunciation: "فويد ريشيو", category: "soil", example: "Calculate the void ratio.", exampleArabic: "احسب نسبة الفراغات." },
      { english: "Settlement", arabic: "هبوط", pronunciation: "سيتلمنت", category: "soil", example: "Monitor the settlement.", exampleArabic: "راقب الهبوط." },
      { english: "Excavation", arabic: "حفر", pronunciation: "إكسكافيشن", category: "soil", example: "Start the excavation.", exampleArabic: "ابدأ الحفر." },
      { english: "Backfill", arabic: "ردم", pronunciation: "باك فيل", category: "soil", example: "Compact the backfill material.", exampleArabic: "ادمك مواد الردم." },
    ],
  },
  {
    id: "concrete",
    name: "اختبارات الخرسانة",
    icon: "🧱",
    words: [
      { english: "Concrete", arabic: "خرسانة", pronunciation: "كونكريت", category: "concrete", example: "The concrete mix is ready.", exampleArabic: "خلطة الخرسانة جاهزة." },
      { english: "Slump Test", arabic: "اختبار الهبوط", pronunciation: "سلامب تيست", category: "concrete", example: "Perform the slump test.", exampleArabic: "قم بإجراء اختبار الهبوط." },
      { english: "Compressive Strength", arabic: "مقاومة الضغط", pronunciation: "كومبريسيف سترينث", category: "concrete", example: "The compressive strength is 30 MPa.", exampleArabic: "مقاومة الضغط 30 ميجا باسكال." },
      { english: "Cube Test", arabic: "اختبار المكعب", pronunciation: "كيوب تيست", category: "concrete", example: "Prepare the cube test specimens.", exampleArabic: "جهز عينات اختبار المكعب." },
      { english: "Curing", arabic: "معالجة", pronunciation: "كيورينج", category: "concrete", example: "Curing should last 28 days.", exampleArabic: "المعالجة يجب أن تستمر 28 يوم." },
      { english: "Mix Design", arabic: "تصميم الخلطة", pronunciation: "ميكس ديزاين", category: "concrete", example: "Review the mix design.", exampleArabic: "راجع تصميم الخلطة." },
      { english: "Water-Cement Ratio", arabic: "نسبة الماء للأسمنت", pronunciation: "ووتر سيمنت ريشيو", category: "concrete", example: "The water-cement ratio is 0.45.", exampleArabic: "نسبة الماء للأسمنت 0.45." },
      { english: "Aggregate", arabic: "ركام", pronunciation: "أجريجيت", category: "concrete", example: "Check the aggregate size.", exampleArabic: "تحقق من حجم الركام." },
      { english: "Cement", arabic: "أسمنت", pronunciation: "سيمنت", category: "concrete", example: "Use Portland cement.", exampleArabic: "استخدم أسمنت بورتلاندي." },
      { english: "Admixture", arabic: "إضافات", pronunciation: "أدميكستشر", category: "concrete", example: "Add the admixture carefully.", exampleArabic: "أضف الإضافات بعناية." },
      { english: "Formwork", arabic: "شدة خشبية", pronunciation: "فورم وورك", category: "concrete", example: "Remove the formwork after 24 hours.", exampleArabic: "أزل الشدة بعد 24 ساعة." },
      { english: "Reinforcement", arabic: "حديد تسليح", pronunciation: "رينفورسمنت", category: "concrete", example: "Check the reinforcement spacing.", exampleArabic: "تحقق من تباعد حديد التسليح." },
      // New words
      { english: "Tensile Strength", arabic: "مقاومة الشد", pronunciation: "تينسايل سترينث", category: "concrete", example: "Measure the tensile strength.", exampleArabic: "قياس مقاومة الشد." },
      { english: "Flexural Strength", arabic: "مقاومة الانحناء", pronunciation: "فليكشورال سترينث", category: "concrete", example: "Test the flexural strength of the beam.", exampleArabic: "اختبر مقاومة الانحناء للكمرة." },
      { english: "Workability", arabic: "قابلية التشغيل", pronunciation: "ووركابيليتي", category: "concrete", example: "Check the concrete workability.", exampleArabic: "تحقق من قابلية تشغيل الخرسانة." },
      { english: "Bleeding", arabic: "نزف الخرسانة", pronunciation: "بليدينج", category: "concrete", example: "Excessive bleeding was observed.", exampleArabic: "لوحظ نزف زائد في الخرسانة." },
      { english: "Segregation", arabic: "انفصال حبيبي", pronunciation: "سيجريجيشن", category: "concrete", example: "Avoid segregation during pouring.", exampleArabic: "تجنب الانفصال أثناء الصب." },
      { english: "Plasticizer", arabic: "ملدن", pronunciation: "بلاستيسايزر", category: "concrete", example: "Add plasticizer to improve workability.", exampleArabic: "أضف ملدن لتحسين قابلية التشغيل." },
      { english: "Air Content", arabic: "محتوى الهواء", pronunciation: "إير كونتنت", category: "concrete", example: "Measure the air content.", exampleArabic: "قياس محتوى الهواء." },
      { english: "Cylinder Test", arabic: "اختبار الأسطوانة", pronunciation: "سيلندر تيست", category: "concrete", example: "Prepare cylinder test specimens.", exampleArabic: "جهز عينات اختبار الأسطوانة." },
      { english: "Batch Plant", arabic: "محطة خلط", pronunciation: "باتش بلانت", category: "concrete", example: "The batch plant is operational.", exampleArabic: "محطة الخلط تعمل." },
      { english: "Ready Mix", arabic: "خرسانة جاهزة", pronunciation: "ريدي ميكس", category: "concrete", example: "Order ready mix concrete.", exampleArabic: "اطلب خرسانة جاهزة." },
      { english: "Pouring", arabic: "صب", pronunciation: "بورينج", category: "concrete", example: "Start pouring the concrete.", exampleArabic: "ابدأ صب الخرسانة." },
      { english: "Vibrator", arabic: "هزاز", pronunciation: "فايبريتور", category: "concrete", example: "Use the vibrator during pouring.", exampleArabic: "استخدم الهزاز أثناء الصب." },
    ],
  },
  {
    id: "asphalt",
    name: "اختبارات الأسفلت",
    icon: "🛣️",
    words: [
      { english: "Asphalt", arabic: "أسفلت", pronunciation: "أسفولت", category: "asphalt", example: "The asphalt layer is 5cm thick.", exampleArabic: "طبقة الأسفلت سمكها 5 سم." },
      { english: "Bitumen", arabic: "بيتومين", pronunciation: "بيتيومن", category: "asphalt", example: "Check the bitumen grade.", exampleArabic: "تحقق من درجة البيتومين." },
      { english: "Marshall Test", arabic: "اختبار مارشال", pronunciation: "مارشال تيست", category: "asphalt", example: "Perform the Marshall test.", exampleArabic: "قم بإجراء اختبار مارشال." },
      { english: "Core Sample", arabic: "عينة لبية", pronunciation: "كور سامبل", category: "asphalt", example: "Take a core sample from the road.", exampleArabic: "خذ عينة لبية من الطريق." },
      { english: "Penetration Test", arabic: "اختبار الاختراق", pronunciation: "بينيتريشن تيست", category: "asphalt", example: "Run the penetration test.", exampleArabic: "قم بإجراء اختبار الاختراق." },
      { english: "Viscosity", arabic: "اللزوجة", pronunciation: "فيسكوسيتي", category: "asphalt", example: "Measure the viscosity.", exampleArabic: "قياس اللزوجة." },
      { english: "Softening Point", arabic: "نقطة التليين", pronunciation: "سوفتنينج بوينت", category: "asphalt", example: "The softening point is 52°C.", exampleArabic: "نقطة التليين 52 درجة مئوية." },
      { english: "Ductility", arabic: "المطيلية", pronunciation: "داكتيليتي", category: "asphalt", example: "Test the ductility of bitumen.", exampleArabic: "اختبر مطيلية البيتومين." },
      { english: "Compaction", arabic: "دمك", pronunciation: "كومباكشن", category: "asphalt", example: "Ensure proper compaction.", exampleArabic: "تأكد من الدمك الصحيح." },
      { english: "Temperature", arabic: "درجة الحرارة", pronunciation: "تيمبريتشر", category: "asphalt", example: "Check the temperature.", exampleArabic: "تحقق من درجة الحرارة." },
      // New words
      { english: "Binder Course", arabic: "طبقة رابطة", pronunciation: "بايندر كورس", category: "asphalt", example: "Apply the binder course first.", exampleArabic: "ضع الطبقة الرابطة أولاً." },
      { english: "Wearing Course", arabic: "طبقة التآكل / السطحية", pronunciation: "ويرينج كورس", category: "asphalt", example: "The wearing course is the top layer.", exampleArabic: "طبقة التآكل هي الطبقة العلوية." },
      { english: "Base Course", arabic: "طبقة الأساس", pronunciation: "بيس كورس", category: "asphalt", example: "Compact the base course.", exampleArabic: "ادمك طبقة الأساس." },
      { english: "Sub-base", arabic: "طبقة تحت الأساس", pronunciation: "ساب بيس", category: "asphalt", example: "Prepare the sub-base layer.", exampleArabic: "جهز طبقة تحت الأساس." },
      { english: "Paver", arabic: "فرادة أسفلت", pronunciation: "بيفر", category: "asphalt", example: "The paver is spreading asphalt.", exampleArabic: "الفرادة تفرد الأسفلت." },
      { english: "Roller", arabic: "رصاصة / حادلة", pronunciation: "رولر", category: "asphalt", example: "Use the roller for compaction.", exampleArabic: "استخدم الحادلة للدمك." },
      { english: "Flash Point", arabic: "نقطة الوميض", pronunciation: "فلاش بوينت", category: "asphalt", example: "Determine the flash point.", exampleArabic: "حدد نقطة الوميض." },
      { english: "Gradation", arabic: "تدرج حبيبي", pronunciation: "جريديشن", category: "asphalt", example: "Check the aggregate gradation.", exampleArabic: "تحقق من التدرج الحبيبي." },
      { english: "Stability", arabic: "ثبات", pronunciation: "ستابيليتي", category: "asphalt", example: "The Marshall stability is high.", exampleArabic: "ثبات مارشال مرتفع." },
      { english: "Flow", arabic: "انسياب / تدفق", pronunciation: "فلو", category: "asphalt", example: "Measure the flow value.", exampleArabic: "قياس قيمة الانسياب." },
      { english: "Emulsion", arabic: "مستحلب", pronunciation: "إيمالشن", category: "asphalt", example: "Apply bitumen emulsion.", exampleArabic: "ضع مستحلب البيتومين." },
      { english: "Prime Coat", arabic: "طبقة تأسيسية", pronunciation: "برايم كوت", category: "asphalt", example: "Apply the prime coat.", exampleArabic: "ضع الطبقة التأسيسية." },
      { english: "Tack Coat", arabic: "طبقة لاصقة", pronunciation: "تاك كوت", category: "asphalt", example: "Apply tack coat between layers.", exampleArabic: "ضع الطبقة اللاصقة بين الطبقات." },
    ],
  },
  {
    id: "general",
    name: "مصطلحات عامة",
    icon: "📋",
    words: [
      { english: "Test", arabic: "اختبار", pronunciation: "تيست", category: "general", example: "Run the test now.", exampleArabic: "قم بإجراء الاختبار الآن." },
      { english: "Report", arabic: "تقرير", pronunciation: "ريبورت", category: "general", example: "Submit the test report.", exampleArabic: "سلم تقرير الاختبار." },
      { english: "Specification", arabic: "مواصفة", pronunciation: "سبيسيفيكيشن", category: "general", example: "Follow the specification.", exampleArabic: "اتبع المواصفة." },
      { english: "Standard", arabic: "معيار", pronunciation: "ستاندرد", category: "general", example: "Meet the standard requirements.", exampleArabic: "حقق متطلبات المعيار." },
      { english: "Equipment", arabic: "معدات", pronunciation: "إكويبمنت", category: "general", example: "Calibrate the equipment.", exampleArabic: "قم بمعايرة المعدات." },
      { english: "Laboratory", arabic: "مختبر", pronunciation: "لابوراتوري", category: "general", example: "Work in the laboratory.", exampleArabic: "اعمل في المختبر." },
      { english: "Result", arabic: "نتيجة", pronunciation: "ريزالت", category: "general", example: "The result is satisfactory.", exampleArabic: "النتيجة مُرضية." },
      { english: "Approved", arabic: "مقبول", pronunciation: "أبروفد", category: "general", example: "The sample is approved.", exampleArabic: "العينة مقبولة." },
      { english: "Rejected", arabic: "مرفوض", pronunciation: "ريجيكتد", category: "general", example: "The sample is rejected.", exampleArabic: "العينة مرفوضة." },
      { english: "Calibration", arabic: "معايرة", pronunciation: "كاليبريشن", category: "general", example: "Equipment calibration is due.", exampleArabic: "موعد معايرة المعدات." },
      { english: "Safety", arabic: "سلامة", pronunciation: "سيفتي", category: "general", example: "Follow safety procedures.", exampleArabic: "اتبع إجراءات السلامة." },
      { english: "Supervisor", arabic: "مشرف", pronunciation: "سوبرفايزر", category: "general", example: "Report to the supervisor.", exampleArabic: "أبلغ المشرف." },
      // New words
      { english: "Compliance", arabic: "مطابقة", pronunciation: "كومبلاينس", category: "general", example: "Check for compliance.", exampleArabic: "تحقق من المطابقة." },
      { english: "Tolerance", arabic: "تفاوت مسموح", pronunciation: "توليرانس", category: "general", example: "Within the tolerance range.", exampleArabic: "ضمن نطاق التفاوت المسموح." },
      { english: "Inspection", arabic: "فحص / تفتيش", pronunciation: "إنسبيكشن", category: "general", example: "Schedule the inspection.", exampleArabic: "حدد موعد الفحص." },
      { english: "Quality Control", arabic: "ضبط الجودة", pronunciation: "كواليتي كونترول", category: "general", example: "Follow quality control procedures.", exampleArabic: "اتبع إجراءات ضبط الجودة." },
      { english: "Contractor", arabic: "مقاول", pronunciation: "كونتراكتور", category: "general", example: "The contractor is on site.", exampleArabic: "المقاول في الموقع." },
      { english: "Engineer", arabic: "مهندس", pronunciation: "إنجينير", category: "general", example: "Consult the engineer.", exampleArabic: "استشر المهندس." },
      { english: "Technician", arabic: "فني", pronunciation: "تيكنيشن", category: "general", example: "The technician performed the test.", exampleArabic: "الفني أجرى الاختبار." },
      { english: "Certificate", arabic: "شهادة", pronunciation: "سيرتيفيكيت", category: "general", example: "Issue the test certificate.", exampleArabic: "أصدر شهادة الاختبار." },
      { english: "Procedure", arabic: "إجراء", pronunciation: "بروسيجر", category: "general", example: "Follow the test procedure.", exampleArabic: "اتبع إجراء الاختبار." },
      { english: "Measurement", arabic: "قياس", pronunciation: "ميجرمنت", category: "general", example: "Take accurate measurements.", exampleArabic: "خذ قياسات دقيقة." },
      { english: "Accuracy", arabic: "دقة", pronunciation: "أكيوراسي", category: "general", example: "Ensure accuracy of results.", exampleArabic: "تأكد من دقة النتائج." },
      { english: "Failure", arabic: "فشل / انهيار", pronunciation: "فيليور", category: "general", example: "The sample showed failure.", exampleArabic: "العينة أظهرت انهيار." },
      { english: "Deadline", arabic: "موعد نهائي", pronunciation: "ديدلاين", category: "general", example: "Submit before the deadline.", exampleArabic: "سلم قبل الموعد النهائي." },
      { english: "Dimension", arabic: "بُعد", pronunciation: "دايمينشن", category: "general", example: "Check the dimensions.", exampleArabic: "افحص الأبعاد." },
      { english: "Specimen", arabic: "عينة اختبار", pronunciation: "سبيسيمن", category: "general", example: "Prepare the specimen.", exampleArabic: "جهز عينة الاختبار." },
      { english: "Load", arabic: "حمل", pronunciation: "لود", category: "general", example: "Apply the load gradually.", exampleArabic: "طبق الحمل تدريجياً." },
      { english: "Crack", arabic: "شرخ", pronunciation: "كراك", category: "general", example: "There is a crack in the wall.", exampleArabic: "فيه شرخ في الحيطة." },
      { english: "Delivery", arabic: "توريد", pronunciation: "ديليفري", category: "general", example: "The delivery arrived on time.", exampleArabic: "التوريد وصل في الوقت." },
      { english: "Batch", arabic: "دفعة", pronunciation: "باتش", category: "general", example: "Test each batch separately.", exampleArabic: "اختبر كل دفعة لوحدها." },
      { english: "Foundation", arabic: "أساس", pronunciation: "فاونديشن", category: "general", example: "Inspect the foundation.", exampleArabic: "افحص الأساس." },
      { english: "Structure", arabic: "منشأ", pronunciation: "ستراكتشر", category: "general", example: "The structure is complete.", exampleArabic: "المنشأ اكتمل." },
    ],
  },
];

/** Get all categories including custom words merged in */
export function getCategories(): VocabCategory[] {
  const custom = getCustomWords();
  return baseCategories.map((cat) => ({
    ...cat,
    words: [...cat.words, ...custom.filter((w) => w.category === cat.id)],
  }));
}

export const categories = baseCategories;
