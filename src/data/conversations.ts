export interface ConversationLine {
  speaker: "technician" | "supervisor" | "engineer" | "worker";
  english: string;
  arabic: string;
  pronunciation: string;
}

export interface Conversation {
  id: string;
  title: string;
  titleArabic: string;
  category: string;
  lines: ConversationLine[];
}

const speakerLabels: Record<string, string> = {
  technician: "فني",
  supervisor: "مشرف",
  engineer: "مهندس",
  worker: "عامل",
};

export { speakerLabels };

export const conversations: Conversation[] = [
  // ========== CONCRETE ==========
  {
    id: "c1", title: "Slump Test Discussion", titleArabic: "مناقشة اختبار الهبوط", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "Did you perform the slump test?", arabic: "هل أجريت اختبار الهبوط؟", pronunciation: "ديد يو بيرفورم ذا سلامب تيست؟" },
      { speaker: "technician", english: "Yes, the slump value is 100 millimeters.", arabic: "نعم، قيمة الهبوط 100 مليمتر.", pronunciation: "يس، ذا سلامب فاليو إز وان هاندرد ميليميترز." },
      { speaker: "supervisor", english: "Is it within the specification?", arabic: "هل هي ضمن المواصفة؟", pronunciation: "إز إت ويذين ذا سبيسيفيكيشن؟" },
      { speaker: "technician", english: "Yes, the specification allows 80 to 120 millimeters.", arabic: "نعم، المواصفة تسمح من 80 إلى 120 مليمتر.", pronunciation: "يس، ذا سبيسيفيكيشن ألاوز إيتي تو وان هاندرد أند توينتي ميليميترز." },
      { speaker: "supervisor", english: "Good. Record the result in the report.", arabic: "جيد. سجل النتيجة في التقرير.", pronunciation: "جود. ريكورد ذا ريزالت إن ذا ريبورت." },
    ],
  },
  {
    id: "c2", title: "Cube Casting", titleArabic: "صب المكعبات", category: "concrete",
    lines: [
      { speaker: "engineer", english: "How many cubes did you cast today?", arabic: "كم مكعب صبيت اليوم؟", pronunciation: "هاو ميني كيوبز ديد يو كاست توداي؟" },
      { speaker: "technician", english: "I cast six cubes from two trucks.", arabic: "صبيت ستة مكعبات من عربيتين.", pronunciation: "آي كاست سيكس كيوبز فروم تو تراكس." },
      { speaker: "engineer", english: "Make sure to label each cube properly.", arabic: "تأكد من ترقيم كل مكعب بشكل صحيح.", pronunciation: "ميك شور تو ليبل إيتش كيوب بروبرلي." },
      { speaker: "technician", english: "I already labeled them with the date and truck number.", arabic: "رقمتهم بالتاريخ ورقم العربية.", pronunciation: "آي أولريدي ليبلد ذيم ويذ ذا ديت أند تراك نامبر." },
      { speaker: "engineer", english: "When will you test them?", arabic: "إمتى هتختبرهم؟", pronunciation: "وين ويل يو تيست ذيم؟" },
      { speaker: "technician", english: "Three cubes after seven days and three after twenty-eight days.", arabic: "ثلاث مكعبات بعد سبعة أيام وثلاثة بعد ثمانية وعشرين يوم.", pronunciation: "ثري كيوبز أفتر سيفن ديز أند ثري أفتر توينتي إيت ديز." },
    ],
  },
  {
    id: "c3", title: "Mix Design Review", titleArabic: "مراجعة تصميم الخلطة", category: "concrete",
    lines: [
      { speaker: "engineer", english: "What is the water-cement ratio for this mix?", arabic: "ما هي نسبة الماء للأسمنت لهذه الخلطة؟", pronunciation: "وات إز ذا ووتر سيمنت ريشيو فور ذيس ميكس؟" },
      { speaker: "technician", english: "The water-cement ratio is 0.45.", arabic: "نسبة الماء للأسمنت 0.45.", pronunciation: "ذا ووتر سيمنت ريشيو إز بوينت فور فايف." },
      { speaker: "engineer", english: "What grade of concrete are we using?", arabic: "ما درجة الخرسانة المستخدمة؟", pronunciation: "وات جريد أوف كونكريت آر وي يوزينج؟" },
      { speaker: "technician", english: "We are using C30 grade concrete.", arabic: "نستخدم خرسانة درجة C30.", pronunciation: "وي آر يوزينج سي ثيرتي جريد كونكريت." },
      { speaker: "engineer", english: "Did you add any admixture?", arabic: "هل أضفت أي إضافات؟", pronunciation: "ديد يو أد إني أدميكستشر؟" },
      { speaker: "technician", english: "Yes, I added a plasticizer to improve workability.", arabic: "نعم، أضفت ملدن لتحسين قابلية التشغيل.", pronunciation: "يس، آي أدد أ بلاستيسايزر تو إمبروف ووركابيليتي." },
    ],
  },
  {
    id: "c4", title: "Compressive Strength Results", titleArabic: "نتائج مقاومة الضغط", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "What are the compressive strength results?", arabic: "ما هي نتائج مقاومة الضغط؟", pronunciation: "وات آر ذا كومبريسيف سترينث ريزالتس؟" },
      { speaker: "technician", english: "The seven-day result is 22 megapascals.", arabic: "نتيجة سبعة أيام 22 ميجا باسكال.", pronunciation: "ذا سيفن داي ريزالت إز توينتي تو ميجاباسكالز." },
      { speaker: "supervisor", english: "Is the result satisfactory?", arabic: "هل النتيجة مُرضية؟", pronunciation: "إز ذا ريزالت ساتيسفاكتوري؟" },
      { speaker: "technician", english: "Yes, it is above the minimum requirement.", arabic: "نعم، هي أعلى من الحد الأدنى.", pronunciation: "يس، إت إز أبوف ذا مينيمم ريكوايرمنت." },
    ],
  },
  {
    id: "c5", title: "Concrete Pouring", titleArabic: "صب الخرسانة", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "Is the formwork ready for pouring?", arabic: "هل الشدة جاهزة للصب؟", pronunciation: "إز ذا فورم وورك ريدي فور بورينج؟" },
      { speaker: "worker", english: "Yes, we checked everything.", arabic: "نعم، فحصنا كل حاجة.", pronunciation: "يس، وي تشيكد إفريثينج." },
      { speaker: "supervisor", english: "Use the vibrator during pouring to avoid air voids.", arabic: "استخدم الهزاز أثناء الصب لتجنب الفراغات الهوائية.", pronunciation: "يوز ذا فايبريتور ديورينج بورينج تو أفويد إير فويدز." },
      { speaker: "technician", english: "I will take a slump test from this truck first.", arabic: "هاخد اختبار هبوط من العربية دي الأول.", pronunciation: "آي ويل تيك أ سلامب تيست فروم ذيس تراك فيرست." },
      { speaker: "supervisor", english: "Good. Don't forget to cast the cubes.", arabic: "جيد. متنساش تصب المكعبات.", pronunciation: "جود. دونت فورجيت تو كاست ذا كيوبز." },
    ],
  },
  {
    id: "c6", title: "Curing Process", titleArabic: "عملية المعالجة", category: "concrete",
    lines: [
      { speaker: "engineer", english: "How are you curing the concrete?", arabic: "إزاي بتعالج الخرسانة؟", pronunciation: "هاو آر يو كيورينج ذا كونكريت؟" },
      { speaker: "technician", english: "We are using water curing for 28 days.", arabic: "بنستخدم المعالجة بالماء لمدة 28 يوم.", pronunciation: "وي آر يوزينج ووتر كيورينج فور توينتي إيت ديز." },
      { speaker: "engineer", english: "Make sure the cubes stay in water at the correct temperature.", arabic: "تأكد إن المكعبات في الماء عند درجة الحرارة الصحيحة.", pronunciation: "ميك شور ذا كيوبز ستاي إن ووتر أت ذا كوريكت تيمبريتشر." },
      { speaker: "technician", english: "The water temperature is 20 degrees Celsius.", arabic: "درجة حرارة الماء 20 درجة مئوية.", pronunciation: "ذا ووتر تيمبريتشر إز توينتي ديجريز سيلسيوس." },
    ],
  },
  {
    id: "c7", title: "Concrete Bleeding", titleArabic: "نزف الخرسانة", category: "concrete",
    lines: [
      { speaker: "technician", english: "I noticed bleeding on the surface of the concrete.", arabic: "لاحظت نزف على سطح الخرسانة.", pronunciation: "آي نوتيسد بليدينج أون ذا سيرفيس أوف ذا كونكريت." },
      { speaker: "supervisor", english: "Is it excessive?", arabic: "هل هو زائد؟", pronunciation: "إز إت إكسيسيف؟" },
      { speaker: "technician", english: "No, it is within normal limits.", arabic: "لا، هو ضمن الحدود الطبيعية.", pronunciation: "نو، إت إز ويذين نورمال ليميتس." },
      { speaker: "supervisor", english: "Keep monitoring and report any changes.", arabic: "استمر في المراقبة وأبلغ عن أي تغييرات.", pronunciation: "كيب مونيتورينج أند ريبورت إني تشينجز." },
    ],
  },
  {
    id: "c8", title: "Ready Mix Delivery", titleArabic: "توريد الخرسانة الجاهزة", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "When will the ready mix arrive?", arabic: "إمتى هتوصل الخرسانة الجاهزة؟", pronunciation: "وين ويل ذا ريدي ميكس أرايف؟" },
      { speaker: "worker", english: "The truck is on the way. It will arrive in 30 minutes.", arabic: "العربية في الطريق. هتوصل في 30 دقيقة.", pronunciation: "ذا تراك إز أون ذا واي. إت ويل أرايف إن ثيرتي مينتس." },
      { speaker: "supervisor", english: "Check the delivery ticket when it arrives.", arabic: "افحص بطاقة التوريد لما توصل.", pronunciation: "تشيك ذا ديليفري تيكت وين إت أرايفز." },
      { speaker: "technician", english: "I will check the grade, volume, and time on the ticket.", arabic: "هافحص الدرجة والحجم والوقت على البطاقة.", pronunciation: "آي ويل تشيك ذا جريد، فوليوم، أند تايم أون ذا تيكت." },
    ],
  },
  {
    id: "c9", title: "Flexural Strength Test", titleArabic: "اختبار مقاومة الانحناء", category: "concrete",
    lines: [
      { speaker: "engineer", english: "We need to test the flexural strength of this beam.", arabic: "محتاجين نختبر مقاومة الانحناء للكمرة دي.", pronunciation: "وي نيد تو تيست ذا فليكشورال سترينث أوف ذيس بيم." },
      { speaker: "technician", english: "I will prepare the beam specimen.", arabic: "هجهز عينة الكمرة.", pronunciation: "آي ويل بريبير ذا بيم سبيسيمن." },
      { speaker: "engineer", english: "The beam size should be 150 by 150 by 600 millimeters.", arabic: "حجم الكمرة 150 في 150 في 600 مليمتر.", pronunciation: "ذا بيم سايز شود بي وان فيفتي باي وان فيفتي باي سيكس هاندرد ميليميترز." },
      { speaker: "technician", english: "Understood. I will cast it today.", arabic: "فهمت. هاصبها النهاردة.", pronunciation: "أندرستود. آي ويل كاست إت توداي." },
    ],
  },
  {
    id: "c10", title: "Air Content Test", titleArabic: "اختبار محتوى الهواء", category: "concrete",
    lines: [
      { speaker: "technician", english: "The air content of this batch is 5 percent.", arabic: "محتوى الهواء لهذه الدفعة 5 بالمائة.", pronunciation: "ذا إير كونتنت أوف ذيس باتش إز فايف بيرسينت." },
      { speaker: "supervisor", english: "Is that acceptable?", arabic: "هل ده مقبول؟", pronunciation: "إز ذات أكسيبتابل؟" },
      { speaker: "technician", english: "Yes, the specification requires 4 to 7 percent.", arabic: "نعم، المواصفة تتطلب من 4 إلى 7 بالمائة.", pronunciation: "يس، ذا سبيسيفيكيشن ريكوايرز فور تو سيفن بيرسينت." },
      { speaker: "supervisor", english: "Record it and continue with the pour.", arabic: "سجلها واستمر في الصب.", pronunciation: "ريكورد إت أند كونتينيو ويذ ذا بور." },
    ],
  },

  // ========== SOIL ==========
  {
    id: "s1", title: "Soil Sampling", titleArabic: "أخذ عينة تربة", category: "soil",
    lines: [
      { speaker: "supervisor", english: "Take a soil sample from this location.", arabic: "خذ عينة تربة من المكان ده.", pronunciation: "تيك أ سويل سامبل فروم ذيس لوكيشن." },
      { speaker: "technician", english: "At what depth should I take the sample?", arabic: "من أي عمق آخد العينة؟", pronunciation: "أت وات ديبث شود آي تيك ذا سامبل؟" },
      { speaker: "supervisor", english: "Take it from 1.5 meters depth.", arabic: "خدها من عمق 1.5 متر.", pronunciation: "تيك إت فروم وان بوينت فايف ميترز ديبث." },
      { speaker: "technician", english: "I will use the hand auger.", arabic: "هستخدم المثقاب اليدوي.", pronunciation: "آي ويل يوز ذا هاند أوجر." },
      { speaker: "supervisor", english: "Put the sample in a sealed bag immediately.", arabic: "حط العينة في كيس محكم فوراً.", pronunciation: "بوت ذا سامبل إن أ سيلد باج إميديتلي." },
    ],
  },
  {
    id: "s2", title: "Moisture Content Test", titleArabic: "اختبار محتوى الرطوبة", category: "soil",
    lines: [
      { speaker: "technician", english: "I finished the moisture content test.", arabic: "خلصت اختبار محتوى الرطوبة.", pronunciation: "آي فينيشد ذا مويستشر كونتنت تيست." },
      { speaker: "supervisor", english: "What is the result?", arabic: "ما النتيجة؟", pronunciation: "وات إز ذا ريزالت؟" },
      { speaker: "technician", english: "The moisture content is 14 percent.", arabic: "محتوى الرطوبة 14 بالمائة.", pronunciation: "ذا مويستشر كونتنت إز فورتين بيرسينت." },
      { speaker: "supervisor", english: "Is that close to the optimum moisture content?", arabic: "هل ده قريب من محتوى الرطوبة الأمثل؟", pronunciation: "إز ذات كلوز تو ذا أوبتيمم مويستشر كونتنت؟" },
      { speaker: "technician", english: "The optimum is 12 percent, so we need to dry it a little.", arabic: "الأمثل 12 بالمائة، فمحتاجين نجففها شوية.", pronunciation: "ذا أوبتيمم إز توليف بيرسينت، سو وي نيد تو دراي إت أ ليتل." },
    ],
  },
  {
    id: "s3", title: "Compaction Test", titleArabic: "اختبار الدمك", category: "soil",
    lines: [
      { speaker: "engineer", english: "What compaction method are you using?", arabic: "إنت بتستخدم طريقة دمك إيه؟", pronunciation: "وات كومباكشن ميثود آر يو يوزينج؟" },
      { speaker: "technician", english: "I am using the Modified Proctor test.", arabic: "بستخدم اختبار بروكتور المعدل.", pronunciation: "آي أم يوزينج ذا موديفايد بروكتور تيست." },
      { speaker: "engineer", english: "What is the maximum dry density?", arabic: "ما هي أقصى كثافة جافة؟", pronunciation: "وات إز ذا ماكسيمم دراي دينسيتي؟" },
      { speaker: "technician", english: "The maximum dry density is 1.95 grams per cubic centimeter.", arabic: "أقصى كثافة جافة 1.95 جرام لكل سنتيمتر مكعب.", pronunciation: "ذا ماكسيمم دراي دينسيتي إز وان بوينت ناين فايف جرامز بير كيوبيك سينتيميتر." },
    ],
  },
  {
    id: "s4", title: "CBR Testing", titleArabic: "اختبار CBR", category: "soil",
    lines: [
      { speaker: "supervisor", english: "Have you finished the CBR test?", arabic: "خلصت اختبار CBR؟", pronunciation: "هاف يو فينيشد ذا سي بي آر تيست؟" },
      { speaker: "technician", english: "Yes, the CBR value is 12 percent.", arabic: "نعم، قيمة CBR هي 12 بالمائة.", pronunciation: "يس، ذا سي بي آر فاليو إز توليف بيرسينت." },
      { speaker: "supervisor", english: "The minimum requirement is 8 percent, so it passes.", arabic: "الحد الأدنى 8 بالمائة، فهي ناجحة.", pronunciation: "ذا مينيمم ريكوايرمنت إز إيت بيرسينت، سو إت باسيز." },
      { speaker: "technician", english: "Should I prepare the report now?", arabic: "أجهز التقرير دلوقتي؟", pronunciation: "شود آي بريبير ذا ريبورت ناو؟" },
      { speaker: "supervisor", english: "Yes, submit it before the end of the day.", arabic: "نعم، سلمه قبل آخر اليوم.", pronunciation: "يس، سابميت إت بيفور ذا إند أوف ذا داي." },
    ],
  },
  {
    id: "s5", title: "Sieve Analysis", titleArabic: "تحليل المناخل", category: "soil",
    lines: [
      { speaker: "engineer", english: "We need a sieve analysis for this soil.", arabic: "محتاجين تحليل مناخل للتربة دي.", pronunciation: "وي نيد أ سيف أناليسيس فور ذيس سويل." },
      { speaker: "technician", english: "I will prepare the sieves now.", arabic: "هجهز المناخل دلوقتي.", pronunciation: "آي ويل بريبير ذا سيفز ناو." },
      { speaker: "engineer", english: "Use the standard set of sieves.", arabic: "استخدم مجموعة المناخل القياسية.", pronunciation: "يوز ذا ستاندرد سيت أوف سيفز." },
      { speaker: "technician", english: "The sample weight is 500 grams.", arabic: "وزن العينة 500 جرام.", pronunciation: "ذا سامبل وايت إز فايف هاندرد جرامز." },
      { speaker: "engineer", english: "Shake the sieves for 10 minutes.", arabic: "هز المناخل لمدة 10 دقائق.", pronunciation: "شيك ذا سيفز فور تين مينتس." },
    ],
  },
  {
    id: "s6", title: "Liquid Limit Test", titleArabic: "اختبار حد السيولة", category: "soil",
    lines: [
      { speaker: "technician", english: "I am performing the liquid limit test using the Casagrande device.", arabic: "بعمل اختبار حد السيولة بجهاز كازاجراندي.", pronunciation: "آي أم بيرفورمينج ذا ليكويد ليميت تيست يوزينج ذا كازاجراندي ديفايس." },
      { speaker: "supervisor", english: "How many trials have you done?", arabic: "عملت كام محاولة؟", pronunciation: "هاو ميني ترايلز هاف يو دان؟" },
      { speaker: "technician", english: "I completed four trials at different moisture contents.", arabic: "عملت أربع محاولات عند نسب رطوبة مختلفة.", pronunciation: "آي كومبليتد فور ترايلز أت ديفرنت مويستشر كونتنتس." },
      { speaker: "supervisor", english: "Plot the graph and find the liquid limit at 25 blows.", arabic: "ارسم الرسم البياني وأوجد حد السيولة عند 25 ضربة.", pronunciation: "بلوت ذا جراف أند فايند ذا ليكويد ليميت أت توينتي فايف بلوز." },
    ],
  },
  {
    id: "s7", title: "Field Density Test", titleArabic: "اختبار الكثافة الحقلية", category: "soil",
    lines: [
      { speaker: "engineer", english: "Perform a field density test at this point.", arabic: "اعمل اختبار كثافة حقلية في النقطة دي.", pronunciation: "بيرفورم أ فيلد دينسيتي تيست أت ذيس بوينت." },
      { speaker: "technician", english: "I will use the sand replacement method.", arabic: "هستخدم طريقة الاستبدال بالرمل.", pronunciation: "آي ويل يوز ذا ساند ريبليسمنت ميثود." },
      { speaker: "engineer", english: "The compaction ratio must be at least 95 percent.", arabic: "نسبة الدمك لازم تكون 95 بالمائة على الأقل.", pronunciation: "ذا كومباكشن ريشيو ماست بي أت ليست ناينتي فايف بيرسينت." },
      { speaker: "technician", english: "The result is 97 percent. It passes.", arabic: "النتيجة 97 بالمائة. ناجحة.", pronunciation: "ذا ريزالت إز ناينتي سيفن بيرسينت. إت باسيز." },
    ],
  },
  {
    id: "s8", title: "Specific Gravity", titleArabic: "الكثافة النوعية", category: "soil",
    lines: [
      { speaker: "technician", english: "I measured the specific gravity of the soil.", arabic: "قست الكثافة النوعية للتربة.", pronunciation: "آي ميجرد ذا سبيسيفيك جرافيتي أوف ذا سويل." },
      { speaker: "supervisor", english: "What value did you get?", arabic: "إيه القيمة اللي طلعت؟", pronunciation: "وات فاليو ديد يو جيت؟" },
      { speaker: "technician", english: "The specific gravity is 2.65.", arabic: "الكثافة النوعية 2.65.", pronunciation: "ذا سبيسيفيك جرافيتي إز تو بوينت سيكس فايف." },
      { speaker: "supervisor", english: "That is typical for sandy soil.", arabic: "ده طبيعي للتربة الرملية.", pronunciation: "ذات إز تيبيكال فور ساندي سويل." },
    ],
  },
  {
    id: "s9", title: "Excavation Safety", titleArabic: "سلامة الحفر", category: "soil",
    lines: [
      { speaker: "supervisor", english: "Check the soil stability before entering the excavation.", arabic: "افحص ثبات التربة قبل دخول الحفرة.", pronunciation: "تشيك ذا سويل ستابيليتي بيفور إنترينج ذا إكسكافيشن." },
      { speaker: "worker", english: "Should I install shoring?", arabic: "هركب دعامات؟", pronunciation: "شود آي إنستول شورينج؟" },
      { speaker: "supervisor", english: "Yes, the depth is more than 1.5 meters, so shoring is required.", arabic: "نعم، العمق أكثر من 1.5 متر، فالدعامات مطلوبة.", pronunciation: "يس، ذا ديبث إز مور ذان وان بوينت فايف ميترز، سو شورينج إز ريكوايرد." },
      { speaker: "worker", english: "I will install it now.", arabic: "هركبها دلوقتي.", pronunciation: "آي ويل إنستول إت ناو." },
    ],
  },
  {
    id: "s10", title: "Backfill Compaction", titleArabic: "دمك الردم", category: "soil",
    lines: [
      { speaker: "engineer", english: "Compact the backfill in layers of 25 centimeters.", arabic: "ادمك الردم في طبقات 25 سنتيمتر.", pronunciation: "كومباكت ذا باكفيل إن لايرز أوف توينتي فايف سينتيميترز." },
      { speaker: "worker", english: "What equipment should I use?", arabic: "أستخدم معدات إيه؟", pronunciation: "وات إكويبمنت شود آي يوز؟" },
      { speaker: "engineer", english: "Use the plate compactor for this area.", arabic: "استخدم الهراس اللوحي للمنطقة دي.", pronunciation: "يوز ذا بليت كومباكتور فور ذيس إيريا." },
      { speaker: "worker", english: "Do we need to add water?", arabic: "محتاجين نضيف ماء؟", pronunciation: "دو وي نيد تو أد ووتر؟" },
      { speaker: "engineer", english: "Yes, add water to reach the optimum moisture content.", arabic: "نعم، ضيف ماء للوصول لمحتوى الرطوبة الأمثل.", pronunciation: "يس، أد ووتر تو ريتش ذا أوبتيمم مويستشر كونتنت." },
    ],
  },

  // ========== ASPHALT ==========
  {
    id: "a1", title: "Marshall Test Procedure", titleArabic: "إجراء اختبار مارشال", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "Prepare the Marshall specimens for testing.", arabic: "جهز عينات مارشال للاختبار.", pronunciation: "بريبير ذا مارشال سبيسيمنز فور تيستينج." },
      { speaker: "technician", english: "How many specimens do you need?", arabic: "محتاج كام عينة؟", pronunciation: "هاو ميني سبيسيمنز دو يو نيد؟" },
      { speaker: "engineer", english: "Prepare three specimens for each bitumen content.", arabic: "جهز ثلاث عينات لكل نسبة بيتومين.", pronunciation: "بريبير ثري سبيسيمنز فور إيتش بيتيومن كونتنت." },
      { speaker: "technician", english: "The compaction temperature is 150 degrees.", arabic: "درجة حرارة الدمك 150 درجة.", pronunciation: "ذا كومباكشن تيمبريتشر إز وان هاندرد أند فيفتي ديجريز." },
      { speaker: "engineer", english: "Apply 75 blows on each side.", arabic: "اضرب 75 ضربة على كل وجه.", pronunciation: "أبلاي سيفنتي فايف بلوز أون إيتش سايد." },
    ],
  },
  {
    id: "a2", title: "Asphalt Temperature Check", titleArabic: "فحص درجة حرارة الأسفلت", category: "asphalt",
    lines: [
      { speaker: "supervisor", english: "Check the asphalt temperature before paving.", arabic: "افحص درجة حرارة الأسفلت قبل الفرد.", pronunciation: "تشيك ذا أسفولت تيمبريتشر بيفور بيفينج." },
      { speaker: "technician", english: "The temperature is 160 degrees Celsius.", arabic: "درجة الحرارة 160 درجة مئوية.", pronunciation: "ذا تيمبريتشر إز وان هاندرد أند سيكستي ديجريز سيلسيوس." },
      { speaker: "supervisor", english: "That is within the acceptable range. You can proceed.", arabic: "ده ضمن المدى المقبول. ممكن تكمل.", pronunciation: "ذات إز ويذين ذا أكسيبتابل رينج. يو كان بروسيد." },
      { speaker: "technician", english: "I will record the temperature in the log sheet.", arabic: "هسجل درجة الحرارة في سجل البيانات.", pronunciation: "آي ويل ريكورد ذا تيمبريتشر إن ذا لوج شيت." },
    ],
  },
  {
    id: "a3", title: "Core Sample Extraction", titleArabic: "استخراج عينة لبية", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "Take a core sample from the new pavement.", arabic: "خذ عينة لبية من الرصف الجديد.", pronunciation: "تيك أ كور سامبل فروم ذا نيو بيفمنت." },
      { speaker: "technician", english: "Where exactly should I take it?", arabic: "من فين بالظبط آخدها؟", pronunciation: "وير إجزاكتلي شود آي تيك إت؟" },
      { speaker: "engineer", english: "Take it from the wheel path area.", arabic: "خدها من منطقة مسار العجلات.", pronunciation: "تيك إت فروم ذا ويل باث إيريا." },
      { speaker: "technician", english: "The core diameter is 100 millimeters.", arabic: "قطر اللب 100 مليمتر.", pronunciation: "ذا كور دايميتر إز وان هاندرد ميليميترز." },
      { speaker: "engineer", english: "Measure the thickness and check if it meets the design.", arabic: "قيس السمك وشوف لو مطابق للتصميم.", pronunciation: "ميجر ذا ثيكنيس أند تشيك إف إت ميتس ذا ديزاين." },
    ],
  },
  {
    id: "a4", title: "Penetration Test", titleArabic: "اختبار الاختراق", category: "asphalt",
    lines: [
      { speaker: "technician", english: "I am running the penetration test on the bitumen.", arabic: "بعمل اختبار الاختراق على البيتومين.", pronunciation: "آي أم رانينج ذا بينيتريشن تيست أون ذا بيتيومن." },
      { speaker: "supervisor", english: "What grade of bitumen is it?", arabic: "درجة البيتومين إيه؟", pronunciation: "وات جريد أوف بيتيومن إز إت؟" },
      { speaker: "technician", english: "It is 60/70 grade bitumen.", arabic: "بيتومين درجة 60/70.", pronunciation: "إت إز سيكستي سيفنتي جريد بيتيومن." },
      { speaker: "supervisor", english: "The penetration value should be between 60 and 70.", arabic: "قيمة الاختراق لازم تكون بين 60 و70.", pronunciation: "ذا بينيتريشن فاليو شود بي بيتوين سيكستي أند سيفنتي." },
      { speaker: "technician", english: "The result is 65. It passes.", arabic: "النتيجة 65. ناجحة.", pronunciation: "ذا ريزالت إز سيكستي فايف. إت باسيز." },
    ],
  },
  {
    id: "a5", title: "Paving Operation", titleArabic: "عملية الفرد", category: "asphalt",
    lines: [
      { speaker: "supervisor", english: "Is the paver calibrated properly?", arabic: "الفرادة متعايرة صح؟", pronunciation: "إز ذا بيفر كاليبريتد بروبرلي؟" },
      { speaker: "worker", english: "Yes, we calibrated it this morning.", arabic: "نعم، عايرناها الصبح.", pronunciation: "يس، وي كاليبريتد إت ذيس مورنينج." },
      { speaker: "supervisor", english: "The layer thickness should be 5 centimeters.", arabic: "سمك الطبقة 5 سنتيمتر.", pronunciation: "ذا لاير ثيكنيس شود بي فايف سينتيميترز." },
      { speaker: "worker", english: "The rollers are ready for compaction.", arabic: "الحادلات جاهزة للدمك.", pronunciation: "ذا رولرز آر ريدي فور كومباكشن." },
    ],
  },
  {
    id: "a6", title: "Tack Coat Application", titleArabic: "رش الطبقة اللاصقة", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "Apply the tack coat before the new layer.", arabic: "ارش الطبقة اللاصقة قبل الطبقة الجديدة.", pronunciation: "أبلاي ذا تاك كوت بيفور ذا نيو لاير." },
      { speaker: "technician", english: "What is the application rate?", arabic: "إيه معدل الرش؟", pronunciation: "وات إز ذا أبليكيشن ريت؟" },
      { speaker: "engineer", english: "Apply 0.3 liters per square meter.", arabic: "ارش 0.3 لتر لكل متر مربع.", pronunciation: "أبلاي بوينت ثري ليترز بير سكوير ميتر." },
      { speaker: "technician", english: "Should I wait for it to break before paving?", arabic: "أستنى لحد ما تجف قبل الفرد؟", pronunciation: "شود آي ويت فور إت تو بريك بيفور بيفينج؟" },
      { speaker: "engineer", english: "Yes, wait until it turns from brown to black.", arabic: "نعم، استنى لحد ما تتحول من بني لأسود.", pronunciation: "يس، ويت أنتيل إت تيرنز فروم براون تو بلاك." },
    ],
  },
  {
    id: "a7", title: "Bitumen Viscosity", titleArabic: "لزوجة البيتومين", category: "asphalt",
    lines: [
      { speaker: "technician", english: "I tested the viscosity of the bitumen.", arabic: "اختبرت لزوجة البيتومين.", pronunciation: "آي تيستد ذا فيسكوسيتي أوف ذا بيتيومن." },
      { speaker: "supervisor", english: "At what temperature?", arabic: "عند أي درجة حرارة؟", pronunciation: "أت وات تيمبريتشر؟" },
      { speaker: "technician", english: "At 135 degrees Celsius.", arabic: "عند 135 درجة مئوية.", pronunciation: "أت وان هاندرد أند ثيرتي فايف ديجريز سيلسيوس." },
      { speaker: "supervisor", english: "What was the result?", arabic: "إيه النتيجة؟", pronunciation: "وات واز ذا ريزالت؟" },
      { speaker: "technician", english: "The viscosity is 350 centistokes.", arabic: "اللزوجة 350 سنتيستوكس.", pronunciation: "ذا فيسكوسيتي إز ثري هاندرد أند فيفتي سينتيستوكس." },
    ],
  },
  {
    id: "a8", title: "Softening Point", titleArabic: "نقطة التليين", category: "asphalt",
    lines: [
      { speaker: "technician", english: "The softening point test result is 52 degrees.", arabic: "نتيجة اختبار نقطة التليين 52 درجة.", pronunciation: "ذا سوفتنينج بوينت تيست ريزالت إز فيفتي تو ديجريز." },
      { speaker: "engineer", english: "The specification requires a minimum of 48 degrees.", arabic: "المواصفة تتطلب حد أدنى 48 درجة.", pronunciation: "ذا سبيسيفيكيشن ريكوايرز أ مينيمم أوف فورتي إيت ديجريز." },
      { speaker: "technician", english: "So it meets the requirement.", arabic: "يعني مطابقة للمتطلبات.", pronunciation: "سو إت ميتس ذا ريكوايرمنت." },
      { speaker: "engineer", english: "Yes, approve the batch.", arabic: "نعم، وافق على الدفعة.", pronunciation: "يس، أبروف ذا باتش." },
    ],
  },
  {
    id: "a9", title: "Gradation Check", titleArabic: "فحص التدرج", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "Check the aggregate gradation for the asphalt mix.", arabic: "افحص التدرج الحبيبي للخلطة الأسفلتية.", pronunciation: "تشيك ذا أجريجيت جريديشن فور ذا أسفولت ميكس." },
      { speaker: "technician", english: "I will run a sieve analysis on the aggregates.", arabic: "هعمل تحليل مناخل للركام.", pronunciation: "آي ويل ران أ سيف أناليسيس أون ذا أجريجيتس." },
      { speaker: "engineer", english: "Compare the results with the job mix formula.", arabic: "قارن النتائج مع معادلة خلطة العمل.", pronunciation: "كومبير ذا ريزالتس ويذ ذا جوب ميكس فورميولا." },
      { speaker: "technician", english: "All values are within the tolerance limits.", arabic: "كل القيم ضمن حدود التسامح.", pronunciation: "أول فاليوز آر ويذين ذا توليرانس ليميتس." },
    ],
  },
  {
    id: "a10", title: "Compaction Verification", titleArabic: "التحقق من الدمك", category: "asphalt",
    lines: [
      { speaker: "supervisor", english: "What is the compaction percentage of the asphalt layer?", arabic: "إيه نسبة دمك طبقة الأسفلت؟", pronunciation: "وات إز ذا كومباكشن بيرسينتيج أوف ذا أسفولت لاير؟" },
      { speaker: "technician", english: "The compaction is 98 percent of the Marshall density.", arabic: "الدمك 98 بالمائة من كثافة مارشال.", pronunciation: "ذا كومباكشن إز ناينتي إيت بيرسينت أوف ذا مارشال دينسيتي." },
      { speaker: "supervisor", english: "Excellent. That exceeds the minimum of 95 percent.", arabic: "ممتاز. ده يتجاوز الحد الأدنى 95 بالمائة.", pronunciation: "إكسيلنت. ذات إكسيدز ذا مينيمم أوف ناينتي فايف بيرسينت." },
      { speaker: "technician", english: "I will document it in the quality report.", arabic: "هوثقه في تقرير الجودة.", pronunciation: "آي ويل دوكيومنت إت إن ذا كواليتي ريبورت." },
    ],
  },

  // ========== AGGREGATE ==========
  {
    id: "ag1", title: "Aggregate Sampling", titleArabic: "أخذ عينات الركام", category: "general",
    lines: [
      { speaker: "supervisor", english: "Take an aggregate sample from the stockpile.", arabic: "خذ عينة ركام من الكومة.", pronunciation: "تيك أن أجريجيت سامبل فروم ذا ستوكبايل." },
      { speaker: "technician", english: "How much do we need?", arabic: "محتاجين كام؟", pronunciation: "هاو ماتش دو وي نيد؟" },
      { speaker: "supervisor", english: "Take about 30 kilograms for the sieve analysis.", arabic: "خد حوالي 30 كيلو لتحليل المناخل.", pronunciation: "تيك أباوت ثيرتي كيلوجرامز فور ذا سيف أناليسيس." },
      { speaker: "technician", english: "Should I take it from different locations?", arabic: "آخدها من أماكن مختلفة؟", pronunciation: "شود آي تيك إت فروم ديفرنت لوكيشنز؟" },
      { speaker: "supervisor", english: "Yes, take from at least three different spots.", arabic: "نعم، خد من ثلاث أماكن مختلفة على الأقل.", pronunciation: "يس، تيك فروم أت ليست ثري ديفرنت سبوتس." },
    ],
  },
  {
    id: "ag2", title: "Los Angeles Abrasion Test", titleArabic: "اختبار لوس أنجلوس للبري", category: "general",
    lines: [
      { speaker: "engineer", english: "Run the Los Angeles abrasion test on this aggregate.", arabic: "اعمل اختبار لوس أنجلوس للبري على الركام ده.", pronunciation: "ران ذا لوس أنجيليس أبريجن تيست أون ذيس أجريجيت." },
      { speaker: "technician", english: "What grading should I use?", arabic: "أستخدم أي تدريج؟", pronunciation: "وات جريدينج شود آي يوز؟" },
      { speaker: "engineer", english: "Use grading B for this size range.", arabic: "استخدم التدريج B لنطاق الحجم ده.", pronunciation: "يوز جريدينج بي فور ذيس سايز رينج." },
      { speaker: "technician", english: "The abrasion loss is 22 percent.", arabic: "نسبة فقد البري 22 بالمائة.", pronunciation: "ذا أبريجن لوس إز توينتي تو بيرسينت." },
      { speaker: "engineer", english: "The maximum allowed is 30 percent, so it passes.", arabic: "الحد الأقصى 30 بالمائة، فهي ناجحة.", pronunciation: "ذا ماكسيمم ألاود إز ثيرتي بيرسينت، سو إت باسيز." },
    ],
  },
  {
    id: "ag3", title: "Specific Gravity of Aggregate", titleArabic: "الكثافة النوعية للركام", category: "general",
    lines: [
      { speaker: "technician", english: "I am testing the specific gravity of the coarse aggregate.", arabic: "بختبر الكثافة النوعية للركام الخشن.", pronunciation: "آي أم تيستينج ذا سبيسيفيك جرافيتي أوف ذا كورس أجريجيت." },
      { speaker: "supervisor", english: "Soak the aggregate for 24 hours first.", arabic: "غمر الركام لمدة 24 ساعة الأول.", pronunciation: "سوك ذا أجريجيت فور توينتي فور أورز فيرست." },
      { speaker: "technician", english: "I already soaked it yesterday.", arabic: "غمرته إمبارح.", pronunciation: "آي أولريدي سوكد إت ييسترداي." },
      { speaker: "supervisor", english: "Good. Dry the surface and weigh it.", arabic: "جيد. جفف السطح ووزنه.", pronunciation: "جود. دراي ذا سيرفيس أند واي إت." },
    ],
  },
  {
    id: "ag4", title: "Flakiness Index", titleArabic: "معامل التفلطح", category: "general",
    lines: [
      { speaker: "engineer", english: "We need to check the flakiness index of this aggregate.", arabic: "محتاجين نفحص معامل التفلطح للركام ده.", pronunciation: "وي نيد تو تشيك ذا فليكينيس إنديكس أوف ذيس أجريجيت." },
      { speaker: "technician", english: "I will use the thickness gauge.", arabic: "هستخدم مقياس السمك.", pronunciation: "آي ويل يوز ذا ثيكنيس جيج." },
      { speaker: "engineer", english: "The maximum flakiness index is 25 percent.", arabic: "أقصى معامل تفلطح 25 بالمائة.", pronunciation: "ذا ماكسيمم فليكينيس إنديكس إز توينتي فايف بيرسينت." },
      { speaker: "technician", english: "The result is 18 percent. It is within limits.", arabic: "النتيجة 18 بالمائة. ضمن الحدود.", pronunciation: "ذا ريزالت إز إيتين بيرسينت. إت إز ويذين ليميتس." },
    ],
  },
  {
    id: "ag5", title: "Water Absorption", titleArabic: "امتصاص الماء", category: "general",
    lines: [
      { speaker: "technician", english: "The water absorption of the fine aggregate is 1.5 percent.", arabic: "امتصاص الماء للركام الناعم 1.5 بالمائة.", pronunciation: "ذا ووتر أبسوربشن أوف ذا فاين أجريجيت إز وان بوينت فايف بيرسينت." },
      { speaker: "supervisor", english: "That is acceptable. The limit is 2 percent.", arabic: "ده مقبول. الحد 2 بالمائة.", pronunciation: "ذات إز أكسيبتابل. ذا ليميت إز تو بيرسينت." },
      { speaker: "technician", english: "Should I test the coarse aggregate too?", arabic: "أختبر الركام الخشن كمان؟", pronunciation: "شود آي تيست ذا كورس أجريجيت تو؟" },
      { speaker: "supervisor", english: "Yes, test it and report both results.", arabic: "نعم، اختبره وسلم النتيجتين.", pronunciation: "يس، تيست إت أند ريبورت بوث ريزالتس." },
    ],
  },

  // ========== 50+ NEW CONVERSATIONS ==========
  {
    id: "n1", title: "Concrete Temperature Check", titleArabic: "فحص حرارة الخرسانة", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "What is the concrete temperature?", arabic: "إيه درجة حرارة الخرسانة؟", pronunciation: "وات إز ذا كونكريت تيمبريتشر؟" },
      { speaker: "technician", english: "It is 28 degrees Celsius.", arabic: "28 درجة مئوية.", pronunciation: "إت إز توينتي إيت ديجريز سيلسيوس." },
      { speaker: "supervisor", english: "The maximum allowed is 32 degrees. It is acceptable.", arabic: "الحد الأقصى 32 درجة. مقبولة.", pronunciation: "ذا ماكسيمم ألاود إز ثيرتي تو ديجريز. إت إز أكسيبتابل." },
    ],
  },
  {
    id: "n2", title: "Equipment Calibration Request", titleArabic: "طلب معايرة المعدات", category: "general",
    lines: [
      { speaker: "technician", english: "The compression machine needs calibration.", arabic: "ماكينة الضغط محتاجة معايرة.", pronunciation: "ذا كومبريشن ماشين نيدز كاليبريشن." },
      { speaker: "supervisor", english: "When was the last calibration?", arabic: "آخر معايرة كانت إمتى؟", pronunciation: "وين واز ذا لاست كاليبريشن؟" },
      { speaker: "technician", english: "Six months ago. The certificate has expired.", arabic: "من ست شهور. الشهادة انتهت.", pronunciation: "سيكس مانثس أجو. ذا سيرتيفيكيت هاز إكسبايرد." },
      { speaker: "supervisor", english: "Contact the calibration company immediately.", arabic: "اتصل بشركة المعايرة فوراً.", pronunciation: "كونتاكت ذا كاليبريشن كومباني إميديتلي." },
    ],
  },
  {
    id: "n3", title: "Rejecting Concrete Batch", titleArabic: "رفض دفعة خرسانة", category: "concrete",
    lines: [
      { speaker: "technician", english: "The slump is 180 millimeters. It is too high.", arabic: "الهبوط 180 مليمتر. عالي جداً.", pronunciation: "ذا سلامب إز وان هاندرد أند إيتي ميليميترز. إت إز تو هاي." },
      { speaker: "supervisor", english: "Reject this truck. Do not pour it.", arabic: "ارفض العربية دي. متصبهاش.", pronunciation: "ريجيكت ذيس تراك. دو نوت بور إت." },
      { speaker: "technician", english: "Should I call the batch plant?", arabic: "أكلم محطة الخلط؟", pronunciation: "شود آي كول ذا باتش بلانت؟" },
      { speaker: "supervisor", english: "Yes, tell them to adjust the water content.", arabic: "نعم، قولهم يظبطوا نسبة الماء.", pronunciation: "يس، تيل ذيم تو أدجست ذا ووتر كونتنت." },
    ],
  },
  {
    id: "n4", title: "Test Failure Discussion", titleArabic: "مناقشة فشل اختبار", category: "concrete",
    lines: [
      { speaker: "engineer", english: "The 28-day strength is only 24 MPa. The target is 30.", arabic: "مقاومة 28 يوم 24 ميجا باسكال بس. الهدف 30.", pronunciation: "ذا توينتي إيت داي سترينث إز أونلي توينتي فور ميجاباسكالز. ذا تارجيت إز ثيرتي." },
      { speaker: "technician", english: "Could it be a problem with the curing?", arabic: "ممكن يكون مشكلة في المعالجة؟", pronunciation: "كود إت بي أ بروبلم ويذ ذا كيورينج؟" },
      { speaker: "engineer", english: "Take additional cores from the structure.", arabic: "خد عينات لبية إضافية من المنشأ.", pronunciation: "تيك أديشنال كورز فروم ذا ستراكتشر." },
    ],
  },
  {
    id: "n5", title: "PPE Safety Check", titleArabic: "فحص معدات الحماية", category: "general",
    lines: [
      { speaker: "supervisor", english: "Where is your hard hat?", arabic: "فين الخوذة بتاعتك؟", pronunciation: "وير إز يور هارد هات؟" },
      { speaker: "worker", english: "I forgot it in the office.", arabic: "نسيتها في المكتب.", pronunciation: "آي فورجوت إت إن ذا أوفيس." },
      { speaker: "supervisor", english: "You cannot enter the site without PPE.", arabic: "مش ممكن تدخل الموقع من غير معدات حماية.", pronunciation: "يو كانوت إنتر ذا سايت ويذاوت بي بي إي." },
      { speaker: "worker", english: "I will get it now.", arabic: "هجيبها دلوقتي.", pronunciation: "آي ويل جيت إت ناو." },
    ],
  },
  {
    id: "n6", title: "Soil Classification", titleArabic: "تصنيف التربة", category: "soil",
    lines: [
      { speaker: "engineer", english: "What type of soil is at this location?", arabic: "نوع التربة إيه في المكان ده؟", pronunciation: "وات تايب أوف سويل إز أت ذيس لوكيشن؟" },
      { speaker: "technician", english: "It is silty clay with high plasticity.", arabic: "طين سلتي بلدونة عالية.", pronunciation: "إت إز سيلتي كلاي ويذ هاي بلاستيسيتي." },
      { speaker: "engineer", english: "We need to replace it with suitable fill material.", arabic: "محتاجين نستبدلها بمواد ردم مناسبة.", pronunciation: "وي نيد تو ريبليس إت ويذ سوتابل فيل ماتيريال." },
    ],
  },
  {
    id: "n7", title: "Asphalt Layer Thickness Issue", titleArabic: "مشكلة سمك طبقة الأسفلت", category: "asphalt",
    lines: [
      { speaker: "supervisor", english: "The design thickness is 60 millimeters.", arabic: "سمك التصميم 60 مليمتر.", pronunciation: "ذا ديزاين ثيكنيس إز سيكستي ميليميترز." },
      { speaker: "technician", english: "The core shows only 52 millimeters.", arabic: "اللب بيبين 52 مليمتر بس.", pronunciation: "ذا كور شوز أونلي فيفتي تو ميليميترز." },
      { speaker: "supervisor", english: "That is below tolerance. Mark this area for repair.", arabic: "ده أقل من التسامح. علّم المنطقة دي للإصلاح.", pronunciation: "ذات إز بيلو توليرانس. مارك ذيس إيريا فور ريبير." },
    ],
  },
  {
    id: "n8", title: "Bearing Capacity Result", titleArabic: "نتيجة قدرة التحمل", category: "soil",
    lines: [
      { speaker: "engineer", english: "What is the bearing capacity at foundation level?", arabic: "إيه قدرة التحمل عند مستوى الأساس؟", pronunciation: "وات إز ذا بيرينج كاباسيتي أت فاونديشن ليفل؟" },
      { speaker: "technician", english: "The plate load test shows 200 kilopascals.", arabic: "اختبار لوح التحميل بيبين 200 كيلو باسكال.", pronunciation: "ذا بليت لود تيست شوز تو هاندرد كيلوباسكالز." },
      { speaker: "engineer", english: "That exceeds the design requirement. Approved.", arabic: "ده يتجاوز متطلبات التصميم. مقبول.", pronunciation: "ذات إكسيدز ذا ديزاين ريكوايرمنت. أبروفد." },
    ],
  },
  {
    id: "n9", title: "Bitumen Delivery Check", titleArabic: "فحص توريد البيتومين", category: "asphalt",
    lines: [
      { speaker: "supervisor", english: "The bitumen tanker has arrived.", arabic: "تانكر البيتومين وصل.", pronunciation: "ذا بيتيومن تانكر هاز أرايفد." },
      { speaker: "technician", english: "Let me check the delivery temperature.", arabic: "خليني أفحص درجة حرارة التوريد.", pronunciation: "ليت مي تشيك ذا ديليفري تيمبريتشر." },
      { speaker: "supervisor", english: "Also verify the grade and quantity.", arabic: "كمان تأكد من الدرجة والكمية.", pronunciation: "أولسو فيريفاي ذا جريد أند كوانتيتي." },
      { speaker: "technician", english: "Everything matches the purchase order.", arabic: "كل حاجة مطابقة لأمر الشراء.", pronunciation: "إفريثينج ماتشيز ذا بيرتشيس أوردر." },
    ],
  },
  {
    id: "n10", title: "Water Table Problem", titleArabic: "مشكلة منسوب المياه", category: "soil",
    lines: [
      { speaker: "worker", english: "We hit water during excavation.", arabic: "وصلنا لماء أثناء الحفر.", pronunciation: "وي هيت ووتر ديورينج إكسكافيشن." },
      { speaker: "engineer", english: "At what depth?", arabic: "على أي عمق؟", pronunciation: "أت وات ديبث؟" },
      { speaker: "worker", english: "At 2 meters below ground level.", arabic: "على عمق 2 متر تحت سطح الأرض.", pronunciation: "أت تو ميترز بيلو جراوند ليفل." },
      { speaker: "engineer", english: "We need dewatering before we continue.", arabic: "محتاجين نزح المياه قبل ما نكمل.", pronunciation: "وي نيد ديووترينج بيفور وي كونتينيو." },
    ],
  },
  {
    id: "n11", title: "Rebar Inspection", titleArabic: "فحص حديد التسليح", category: "concrete",
    lines: [
      { speaker: "engineer", english: "Check the reinforcement before the pour.", arabic: "افحص حديد التسليح قبل الصب.", pronunciation: "تشيك ذا رينفورسمنت بيفور ذا بور." },
      { speaker: "technician", english: "The spacing is 15 centimeters as per the drawing.", arabic: "التباعد 15 سم حسب اللوحة.", pronunciation: "ذا سبيسينج إز فيفتين سينتيميترز أز بير ذا دروينج." },
      { speaker: "engineer", english: "What about the cover?", arabic: "وإيه بخصوص الغطاء؟", pronunciation: "وات أباوت ذا كوفر؟" },
      { speaker: "technician", english: "The cover is 50 millimeters. It is correct.", arabic: "الغطاء 50 مليمتر. صحيح.", pronunciation: "ذا كوفر إز فيفتي ميليميترز. إت إز كوريكت." },
    ],
  },
  {
    id: "n12", title: "Daily Report", titleArabic: "التقرير اليومي", category: "general",
    lines: [
      { speaker: "supervisor", english: "Did you finish the daily report?", arabic: "خلصت التقرير اليومي؟", pronunciation: "ديد يو فينيش ذا ديلي ريبورت؟" },
      { speaker: "technician", english: "Almost. I need to add the afternoon results.", arabic: "تقريباً. محتاج أضيف نتائج بعد الظهر.", pronunciation: "أولموست. آي نيد تو أد ذا أفترنون ريزالتس." },
      { speaker: "supervisor", english: "Include photos of each test.", arabic: "ضيف صور لكل اختبار.", pronunciation: "إنكلود فوتوز أوف إيتش تيست." },
      { speaker: "technician", english: "I will email it by 5 PM.", arabic: "هابعته بالإيميل قبل 5 المساء.", pronunciation: "آي ويل إيميل إت باي فايف بي إم." },
    ],
  },
  {
    id: "n13", title: "Site Meeting Preparation", titleArabic: "تحضير اجتماع الموقع", category: "general",
    lines: [
      { speaker: "engineer", english: "We have a site meeting at 9 AM tomorrow.", arabic: "عندنا اجتماع موقع الساعة 9 بكرة.", pronunciation: "وي هاف أ سايت ميتينج أت ناين إي إم تومورو." },
      { speaker: "technician", english: "Should I prepare the test summary?", arabic: "أجهز ملخص الاختبارات؟", pronunciation: "شود آي بريبير ذا تيست سامري؟" },
      { speaker: "engineer", english: "Yes, include all results from this week.", arabic: "نعم، ضيف كل نتائج الأسبوع ده.", pronunciation: "يس، إنكلود أول ريزالتس فروم ذيس ويك." },
    ],
  },
  {
    id: "n14", title: "Concrete Crack Investigation", titleArabic: "فحص شروخ الخرسانة", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "There are cracks on the slab surface.", arabic: "فيه شروخ على سطح البلاطة.", pronunciation: "ذير آر كراكس أون ذا سلاب سيرفيس." },
      { speaker: "technician", english: "Are they structural or shrinkage cracks?", arabic: "هي شروخ إنشائية ولا انكماشية؟", pronunciation: "آر ذي ستراكتشرال أور شرينكيج كراكس؟" },
      { speaker: "supervisor", english: "They look like drying shrinkage cracks.", arabic: "شكلها شروخ انكماش جفاف.", pronunciation: "ذي لوك لايك درايينج شرينكيج كراكس." },
      { speaker: "technician", english: "We should have started curing earlier.", arabic: "كان لازم نبدأ المعالجة بدري.", pronunciation: "وي شود هاف ستارتد كيورينج إيرلير." },
    ],
  },
  {
    id: "n15", title: "Dirty Aggregate Delivery", titleArabic: "توريد ركام متسخ", category: "general",
    lines: [
      { speaker: "technician", english: "The aggregate looks dusty and dirty.", arabic: "الركام شكله مغبر ووسخ.", pronunciation: "ذا أجريجيت لوكس داستي أند ديرتي." },
      { speaker: "supervisor", english: "It might have too many fines.", arabic: "ممكن يكون فيه ناعم كتير.", pronunciation: "إت مايت هاف تو ميني فاينز." },
      { speaker: "technician", english: "I will do a sieve analysis to confirm.", arabic: "هعمل تحليل مناخل للتأكيد.", pronunciation: "آي ويل دو أ سيف أناليسيس تو كونفيرم." },
      { speaker: "supervisor", english: "If it fails, reject the entire shipment.", arabic: "لو فشل، ارفض الشحنة كلها.", pronunciation: "إف إت فيلز، ريجيكت ذا إنتاير شيبمنت." },
    ],
  },
  {
    id: "n16", title: "Lime Stabilization", titleArabic: "تثبيت بالجير", category: "soil",
    lines: [
      { speaker: "engineer", english: "The soil is too weak for the foundation.", arabic: "التربة ضعيفة جداً للأساس.", pronunciation: "ذا سويل إز تو ويك فور ذا فاونديشن." },
      { speaker: "technician", english: "Should we use lime stabilization?", arabic: "نستخدم تثبيت بالجير؟", pronunciation: "شود وي يوز لايم ستابيلايزيشن؟" },
      { speaker: "engineer", english: "Yes, add 5 percent lime and mix thoroughly.", arabic: "نعم، ضيف 5 بالمائة جير واخلط كويس.", pronunciation: "يس، أد فايف بيرسينت لايم أند ميكس ثوروولي." },
    ],
  },
  {
    id: "n17", title: "Road Marking", titleArabic: "علامات الطريق", category: "asphalt",
    lines: [
      { speaker: "supervisor", english: "When will the road marking start?", arabic: "إمتى هتبدأ علامات الطريق؟", pronunciation: "وين ويل ذا رود ماركينج ستارت؟" },
      { speaker: "worker", english: "After the asphalt has cured for 48 hours.", arabic: "بعد ما الأسفلت يتصلد لمدة 48 ساعة.", pronunciation: "أفتر ذا أسفولت هاز كيورد فور فورتي إيت أورز." },
      { speaker: "supervisor", english: "Use reflective paint for the center line.", arabic: "استخدم دهان عاكس لخط النصف.", pronunciation: "يوز ريفليكتيف بينت فور ذا سينتر لاين." },
    ],
  },
  {
    id: "n18", title: "Wrong Concrete Grade", titleArabic: "درجة خرسانة خطأ", category: "concrete",
    lines: [
      { speaker: "technician", english: "The delivery ticket shows grade C35.", arabic: "بطاقة التوريد بتبين درجة C35.", pronunciation: "ذا ديليفري تيكت شوز جريد سي ثيرتي فايف." },
      { speaker: "supervisor", english: "But the order was for C30.", arabic: "بس الطلب كان C30.", pronunciation: "بت ذا أوردر واز فور سي ثيرتي." },
      { speaker: "technician", english: "Should we accept a higher grade?", arabic: "نقبل درجة أعلى؟", pronunciation: "شود وي أكسيبت أ هاير جريد؟" },
      { speaker: "supervisor", english: "Check with the engineer first.", arabic: "ارجع للمهندس الأول.", pronunciation: "تشيك ويذ ذا إنجينير فيرست." },
    ],
  },
  {
    id: "n19", title: "Sand Cone Test", titleArabic: "اختبار المخروط الرملي", category: "soil",
    lines: [
      { speaker: "technician", english: "I will perform the sand cone test here.", arabic: "هعمل اختبار المخروط الرملي هنا.", pronunciation: "آي ويل بيرفورم ذا ساند كون تيست هير." },
      { speaker: "supervisor", english: "Dig the hole carefully. Do not disturb the sides.", arabic: "احفر الحفرة بعناية. متوسعش الجوانب.", pronunciation: "ديج ذا هول كيرفولي. دو نوت ديستيرب ذا سايدز." },
      { speaker: "technician", english: "The field density is 96 percent. It passes.", arabic: "الكثافة الحقلية 96 بالمائة. ناجحة.", pronunciation: "ذا فيلد دينسيتي إز ناينتي سيكس بيرسينت. إت باسيز." },
    ],
  },
  {
    id: "n20", title: "Asphalt Pothole Repair", titleArabic: "إصلاح حفر الأسفلت", category: "asphalt",
    lines: [
      { speaker: "supervisor", english: "There are potholes on the road surface.", arabic: "فيه حفر في سطح الطريق.", pronunciation: "ذير آر بوتهولز أون ذا رود سيرفيس." },
      { speaker: "worker", english: "Should we use cold mix or hot mix?", arabic: "نستخدم خلطة باردة ولا ساخنة؟", pronunciation: "شود وي يوز كولد ميكس أور هوت ميكس؟" },
      { speaker: "supervisor", english: "Use hot mix for a permanent repair.", arabic: "استخدم خلطة ساخنة لإصلاح دائم.", pronunciation: "يوز هوت ميكس فور أ بيرمانينت ريبير." },
    ],
  },
  {
    id: "n21", title: "Lab Safety Incident", titleArabic: "حادث سلامة في المختبر", category: "general",
    lines: [
      { speaker: "technician", english: "I burned my hand on the hot oven.", arabic: "إيدي اتحرقت من الفرن الساخن.", pronunciation: "آي بيرند ماي هاند أون ذا هوت أوفن." },
      { speaker: "supervisor", english: "Go to the first aid kit immediately.", arabic: "روح لصندوق الإسعافات فوراً.", pronunciation: "جو تو ذا فيرست إيد كيت إميديتلي." },
      { speaker: "technician", english: "I should have worn heat-resistant gloves.", arabic: "كان لازم ألبس جوانتي مقاوم للحرارة.", pronunciation: "آي شود هاف وورن هيت ريزيستانت جلوفز." },
    ],
  },
  {
    id: "n22", title: "Mix Adjustment", titleArabic: "تعديل الخلطة", category: "concrete",
    lines: [
      { speaker: "engineer", english: "The concrete is too stiff. Adjust the mix.", arabic: "الخرسانة يابسة أوي. ظبط الخلطة.", pronunciation: "ذا كونكريت إز تو ستيف. أدجست ذا ميكس." },
      { speaker: "technician", english: "Should I add more plasticizer?", arabic: "أضيف ملدن أكتر؟", pronunciation: "شود آي أد مور بلاستيسايزر؟" },
      { speaker: "engineer", english: "Yes, but do not exceed the maximum dosage.", arabic: "نعم، بس متزودش عن الجرعة القصوى.", pronunciation: "يس، بت دو نوت إكسيد ذا ماكسيمم دوسيج." },
    ],
  },
  {
    id: "n23", title: "Gradation Report", titleArabic: "تقرير التدرج", category: "general",
    lines: [
      { speaker: "technician", english: "Here is the gradation report for the aggregate.", arabic: "ده تقرير التدرج للركام.", pronunciation: "هير إز ذا جريديشن ريبورت فور ذا أجريجيت." },
      { speaker: "engineer", english: "Does it fall within the envelope?", arabic: "هل هو ضمن الحدود المسموحة؟", pronunciation: "دوز إت فول ويذين ذا إنفيلوب؟" },
      { speaker: "technician", english: "Yes, all points are within limits.", arabic: "نعم، كل النقط ضمن الحدود.", pronunciation: "يس، أول بوينتس آر ويذين ليميتس." },
    ],
  },
  {
    id: "n24", title: "Pile Load Test", titleArabic: "اختبار حمل الخوازيق", category: "soil",
    lines: [
      { speaker: "engineer", english: "We need to perform a pile load test.", arabic: "محتاجين نعمل اختبار حمل للخازوق.", pronunciation: "وي نيد تو بيرفورم أ بايل لود تيست." },
      { speaker: "technician", english: "The design load is 500 kilonewtons.", arabic: "حمل التصميم 500 كيلو نيوتن.", pronunciation: "ذا ديزاين لود إز فايف هاندرد كيلونيوتنز." },
      { speaker: "engineer", english: "Test to 1.5 times the design load.", arabic: "اختبر حتى 1.5 مرة حمل التصميم.", pronunciation: "تيست تو وان بوينت فايف تايمز ذا ديزاين لود." },
    ],
  },
  {
    id: "n25", title: "Joint Sealing", titleArabic: "حشو الفواصل", category: "asphalt",
    lines: [
      { speaker: "supervisor", english: "Seal the joints between old and new pavement.", arabic: "احشي الفواصل بين الرصف القديم والجديد.", pronunciation: "سيل ذا جوينتس بيتوين أولد أند نيو بيفمنت." },
      { speaker: "worker", english: "What sealant material should I use?", arabic: "أستخدم مادة حشو إيه؟", pronunciation: "وات سيلانت ماتيريال شود آي يوز؟" },
      { speaker: "supervisor", english: "Use hot-applied bitumen sealant.", arabic: "استخدم حشو بيتومين ساخن.", pronunciation: "يوز هوت أبلايد بيتيومن سيلانت." },
    ],
  },
  {
    id: "n26", title: "Setting Time Issue", titleArabic: "مشكلة زمن الشك", category: "concrete",
    lines: [
      { speaker: "technician", english: "The initial setting time is 45 minutes.", arabic: "زمن الشك الابتدائي 45 دقيقة.", pronunciation: "ذا إنيشال سيتينج تايم إز فورتي فايف مينتس." },
      { speaker: "engineer", english: "Is the weather affecting setting time?", arabic: "الطقس بيأثر على زمن الشك؟", pronunciation: "إز ذا ويذر أفيكتينج ذا سيتينج تايم؟" },
      { speaker: "technician", english: "Yes, the hot weather is speeding it up.", arabic: "نعم، الحر بيسرعه.", pronunciation: "يس، ذا هوت ويذر إز سبيدينج إت أب." },
    ],
  },
  {
    id: "n27", title: "Slope Stability Check", titleArabic: "فحص ثبات الميل", category: "soil",
    lines: [
      { speaker: "engineer", english: "Check the slope angle for stability.", arabic: "افحص زاوية الميل للثبات.", pronunciation: "تشيك ذا سلوب أنجل فور ستابيليتي." },
      { speaker: "technician", english: "The angle is 35 degrees.", arabic: "الزاوية 35 درجة.", pronunciation: "ذا أنجل إز ثيرتي فايف ديجريز." },
      { speaker: "engineer", english: "Too steep. Reduce it to 27 degrees.", arabic: "حاد أوي. قللها لـ 27 درجة.", pronunciation: "تو ستيب. ريديوس إت تو توينتي سيفن ديجريز." },
    ],
  },
  {
    id: "n28", title: "Road Rutting", titleArabic: "تخدد الطريق", category: "asphalt",
    lines: [
      { speaker: "supervisor", english: "I noticed rutting on the road surface.", arabic: "لاحظت تخدد على سطح الطريق.", pronunciation: "آي نوتيسد راتينج أون ذا رود سيرفيس." },
      { speaker: "technician", english: "The rut depth is 15 millimeters.", arabic: "عمق التخدد 15 مليمتر.", pronunciation: "ذا رات ديبث إز فيفتين ميليميترز." },
      { speaker: "supervisor", english: "The max is 12.5mm. It needs milling.", arabic: "الحد الأقصى 12.5 مليمتر. محتاج كشط.", pronunciation: "ذا ماكس إز توليف بوينت فايف. إت نيدز ميلينج." },
    ],
  },
  {
    id: "n29", title: "Cement Storage", titleArabic: "تخزين الأسمنت", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "How is the cement stored?", arabic: "الأسمنت متخزن إزاي؟", pronunciation: "هاو إز ذا سيمنت ستورد؟" },
      { speaker: "worker", english: "In a dry warehouse on wooden pallets.", arabic: "في مخزن جاف على طبالي خشب.", pronunciation: "إن أ دراي وير هاوس أون وودن باليتس." },
      { speaker: "supervisor", english: "Never store cement directly on the ground.", arabic: "أبداً متخزنش الأسمنت على الأرض.", pronunciation: "نيفر ستور سيمنت دايريكتلي أون ذا جراوند." },
    ],
  },
  {
    id: "n30", title: "Nuclear Density Gauge", titleArabic: "جهاز الكثافة النووي", category: "soil",
    lines: [
      { speaker: "technician", english: "I will use the nuclear density gauge.", arabic: "هستخدم جهاز الكثافة النووي.", pronunciation: "آي ويل يوز ذا نيوكلير دينسيتي جيج." },
      { speaker: "supervisor", english: "Do you have the radiation safety permit?", arabic: "معاك تصريح سلامة الإشعاع؟", pronunciation: "دو يو هاف ذا ريديشن سيفتي بيرميت؟" },
      { speaker: "technician", english: "Yes, the permit is valid until December.", arabic: "نعم، التصريح صالح لغاية ديسمبر.", pronunciation: "يس، ذا بيرميت إز فاليد أنتيل ديسيمبر." },
    ],
  },
  {
    id: "n31", title: "Concrete Pump Setup", titleArabic: "تجهيز مضخة الخرسانة", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "Set up the concrete pump for the second floor.", arabic: "جهز مضخة الخرسانة للدور الثاني.", pronunciation: "سيت أب ذا كونكريت بامب فور ذا سيكند فلور." },
      { speaker: "worker", english: "The boom reach is 28 meters. Is that enough?", arabic: "مدى الذراع 28 متر. ده كافي؟", pronunciation: "ذا بوم ريتش إز توينتي إيت ميترز. إز ذات إنف؟" },
      { speaker: "supervisor", english: "Yes, that should cover the entire slab.", arabic: "نعم، ده المفروض يغطي البلاطة كلها.", pronunciation: "يس، ذات شود كوفر ذا إنتاير سلاب." },
    ],
  },
  {
    id: "n32", title: "Grout Injection", titleArabic: "حقن الجراوت", category: "concrete",
    lines: [
      { speaker: "engineer", english: "We need to inject grout under the foundation.", arabic: "محتاجين نحقن جراوت تحت الأساس.", pronunciation: "وي نيد تو إنجيكت جراوت أندر ذا فاونديشن." },
      { speaker: "technician", english: "What water-cement ratio for the grout?", arabic: "نسبة الماء للأسمنت للجراوت إيه؟", pronunciation: "وات ووتر سيمنت ريشيو فور ذا جراوت؟" },
      { speaker: "engineer", english: "Use 0.5 ratio and inject at low pressure.", arabic: "استخدم نسبة 0.5 واحقن بضغط منخفض.", pronunciation: "يوز بوينت فايف ريشيو أند إنجيكت أت لو بريشر." },
    ],
  },
  {
    id: "n33", title: "Concrete Truck Waiting Time", titleArabic: "وقت انتظار عربية الخرسانة", category: "concrete",
    lines: [
      { speaker: "technician", english: "This truck has been waiting for 90 minutes.", arabic: "العربية دي مستنية 90 دقيقة.", pronunciation: "ذيس تراك هاز بين ويتينج فور ناينتي مينتس." },
      { speaker: "supervisor", english: "The maximum waiting time is 120 minutes.", arabic: "أقصى وقت انتظار 120 دقيقة.", pronunciation: "ذا ماكسيمم ويتينج تايم إز وان هاندرد أند توينتي مينتس." },
      { speaker: "technician", english: "I will recheck the slump before pouring.", arabic: "هاعيد فحص الهبوط قبل الصب.", pronunciation: "آي ويل ري تشيك ذا سلامب بيفور بورينج." },
    ],
  },
  {
    id: "n34", title: "Retaining Wall Backfill", titleArabic: "ردم حائط استنادي", category: "soil",
    lines: [
      { speaker: "engineer", english: "Use granular material for the retaining wall backfill.", arabic: "استخدم مواد حبيبية لردم الحائط الاستنادي.", pronunciation: "يوز جرانيولار ماتيريال فور ذا ريتينينج وول باكفيل." },
      { speaker: "worker", english: "Should we install drainage behind the wall?", arabic: "نركب صرف خلف الحائط؟", pronunciation: "شود وي إنستول دريناج بيهايند ذا وول؟" },
      { speaker: "engineer", english: "Yes, install a perforated drain pipe at the base.", arabic: "نعم، ركب ماسورة صرف مثقبة في القاعدة.", pronunciation: "يس، إنستول أ بيرفوريتد درين بايب أت ذا بيس." },
    ],
  },
  {
    id: "n35", title: "Asphalt Extraction Test", titleArabic: "اختبار استخلاص الأسفلت", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "Run an extraction test on this asphalt sample.", arabic: "اعمل اختبار استخلاص على عينة الأسفلت دي.", pronunciation: "ران أن إكستراكشن تيست أون ذيس أسفولت سامبل." },
      { speaker: "technician", english: "I will use the centrifuge extractor.", arabic: "هستخدم جهاز الطرد المركزي.", pronunciation: "آي ويل يوز ذا سينتريفيوج إكستراكتور." },
      { speaker: "engineer", english: "What bitumen content did you get?", arabic: "نسبة البيتومين طلعت كام؟", pronunciation: "وات بيتيومن كونتنت ديد يو جيت؟" },
      { speaker: "technician", english: "The bitumen content is 5.2 percent.", arabic: "نسبة البيتومين 5.2 بالمائة.", pronunciation: "ذا بيتيومن كونتنت إز فايف بوينت تو بيرسينت." },
    ],
  },
  {
    id: "n36", title: "Concrete Cover Meter", titleArabic: "جهاز قياس الغطاء", category: "concrete",
    lines: [
      { speaker: "engineer", english: "Use the cover meter to check the rebar cover.", arabic: "استخدم جهاز قياس الغطاء لفحص غطاء الحديد.", pronunciation: "يوز ذا كوفر ميتر تو تشيك ذا ريبار كوفر." },
      { speaker: "technician", english: "The minimum cover is 40 millimeters.", arabic: "أقل غطاء 40 مليمتر.", pronunciation: "ذا مينيمم كوفر إز فورتي ميليميترز." },
      { speaker: "engineer", english: "Check at least 10 points on each slab.", arabic: "افحص على الأقل 10 نقط في كل بلاطة.", pronunciation: "تشيك أت ليست تين بوينتس أون إيتش سلاب." },
    ],
  },
  {
    id: "n37", title: "Geotextile Installation", titleArabic: "تركيب الجيوتكستايل", category: "soil",
    lines: [
      { speaker: "engineer", english: "Place the geotextile fabric on the subgrade.", arabic: "حط قماش الجيوتكستايل على طبقة الأساس.", pronunciation: "بليس ذا جيوتيكستايل فابريك أون ذا سابجريد." },
      { speaker: "worker", english: "How much overlap should I leave?", arabic: "أسيب تراكب قد إيه؟", pronunciation: "هاو ماتش أوفرلاب شود آي ليف؟" },
      { speaker: "engineer", english: "The minimum overlap is 30 centimeters.", arabic: "أقل تراكب 30 سنتيمتر.", pronunciation: "ذا مينيمم أوفرلاب إز ثيرتي سينتيميترز." },
    ],
  },
  {
    id: "n38", title: "Sulfate Attack Prevention", titleArabic: "منع هجوم الكبريتات", category: "concrete",
    lines: [
      { speaker: "engineer", english: "The soil has high sulfate content.", arabic: "التربة فيها نسبة كبريتات عالية.", pronunciation: "ذا سويل هاز هاي سالفيت كونتنت." },
      { speaker: "technician", english: "Should we use sulfate-resistant cement?", arabic: "نستخدم أسمنت مقاوم للكبريتات؟", pronunciation: "شود وي يوز سالفيت ريزيستانت سيمنت؟" },
      { speaker: "engineer", english: "Yes, use Type V cement for this foundation.", arabic: "نعم، استخدم أسمنت نوع V للأساس ده.", pronunciation: "يس، يوز تايب فايف سيمنت فور ذيس فاونديشن." },
    ],
  },
  {
    id: "n39", title: "Compaction Equipment Selection", titleArabic: "اختيار معدات الدمك", category: "soil",
    lines: [
      { speaker: "worker", english: "Which roller should I use for this soil?", arabic: "أستخدم أي حادلة للتربة دي؟", pronunciation: "ويتش رولر شود آي يوز فور ذيس سويل؟" },
      { speaker: "engineer", english: "For clay, use a sheepsfoot roller.", arabic: "للطين، استخدم حادلة قدم الخروف.", pronunciation: "فور كلاي، يوز أ شيبسفوت رولر." },
      { speaker: "worker", english: "And for sand?", arabic: "وللرمل؟", pronunciation: "أند فور ساند؟" },
      { speaker: "engineer", english: "For sand, use a vibratory roller.", arabic: "للرمل، استخدم حادلة اهتزازية.", pronunciation: "فور ساند، يوز أ فايبراتوري رولر." },
    ],
  },
  {
    id: "n40", title: "Asphalt Segregation Problem", titleArabic: "مشكلة انفصال الأسفلت", category: "asphalt",
    lines: [
      { speaker: "supervisor", english: "I see segregation in the asphalt layer.", arabic: "شايف انفصال في طبقة الأسفلت.", pronunciation: "آي سي سيجريجيشن إن ذا أسفولت لاير." },
      { speaker: "technician", english: "The mix temperature might have been too low.", arabic: "ممكن درجة حرارة الخلطة كانت واطية.", pronunciation: "ذا ميكس تيمبريتشر مايت هاف بين تو لو." },
      { speaker: "supervisor", english: "Remove this section and repave it.", arabic: "شيل الجزء ده وأعد فرده.", pronunciation: "ريموف ذيس سيكشن أند ريبيف إت." },
    ],
  },
  {
    id: "n41", title: "Water Quality for Concrete", titleArabic: "جودة ماء الخرسانة", category: "concrete",
    lines: [
      { speaker: "engineer", english: "Is the water suitable for concrete mixing?", arabic: "الماء مناسب لخلط الخرسانة؟", pronunciation: "إز ذا ووتر سوتابل فور كونكريت ميكسينج؟" },
      { speaker: "technician", english: "I will test it for chlorides and sulfates.", arabic: "هختبره للكلوريدات والكبريتات.", pronunciation: "آي ويل تيست إت فور كلورايدز أند سالفيتس." },
      { speaker: "engineer", english: "The chloride content must not exceed 500 ppm.", arabic: "محتوى الكلوريد لازم ما يزيدش عن 500 جزء في المليون.", pronunciation: "ذا كلورايد كونتنت ماست نوت إكسيد فايف هاندرد بي بي إم." },
    ],
  },
  {
    id: "n42", title: "Permeability Test", titleArabic: "اختبار النفاذية", category: "soil",
    lines: [
      { speaker: "technician", english: "I am running the permeability test.", arabic: "بعمل اختبار النفاذية.", pronunciation: "آي أم رانينج ذا بيرميابيليتي تيست." },
      { speaker: "supervisor", english: "Which method are you using?", arabic: "بتستخدم طريقة إيه؟", pronunciation: "ويتش ميثود آر يو يوزينج؟" },
      { speaker: "technician", english: "Constant head for this sandy soil.", arabic: "الضاغط الثابت للتربة الرملية دي.", pronunciation: "كونستانت هيد فور ذيس ساندي سويل." },
    ],
  },
  {
    id: "n43", title: "IRI Measurement", titleArabic: "قياس مؤشر الخشونة", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "Measure the International Roughness Index.", arabic: "قيس مؤشر الخشونة الدولي.", pronunciation: "ميجر ذا إنترناشنال رافنيس إنديكس." },
      { speaker: "technician", english: "The IRI value is 2.1 meters per kilometer.", arabic: "قيمة IRI هي 2.1 متر لكل كيلومتر.", pronunciation: "ذا آي آر آي فاليو إز تو بوينت وان ميترز بير كيلوميتر." },
      { speaker: "engineer", english: "That is within the acceptable range for highways.", arabic: "ده ضمن المدى المقبول للطرق السريعة.", pronunciation: "ذات إز ويذين ذا أكسيبتابل رينج فور هايويز." },
    ],
  },
  {
    id: "n44", title: "Concrete Honeycombing", titleArabic: "التعشيش في الخرسانة", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "There is honeycombing on the column.", arabic: "فيه تعشيش في العمود.", pronunciation: "ذير إز هانيكومينج أون ذا كولم." },
      { speaker: "technician", english: "It was not vibrated properly during pouring.", arabic: "ماتهزش كويس أثناء الصب.", pronunciation: "إت واز نوت فايبريتد بروبرلي ديورينج بورينج." },
      { speaker: "supervisor", english: "We need to repair it with non-shrink grout.", arabic: "محتاجين نصلحه بجراوت غير انكماشي.", pronunciation: "وي نيد تو ريبير إت ويذ نون شرينك جراوت." },
    ],
  },
  {
    id: "n45", title: "Triaxial Test", titleArabic: "اختبار ثلاثي المحاور", category: "soil",
    lines: [
      { speaker: "engineer", english: "Run a triaxial test on the clay sample.", arabic: "اعمل اختبار ثلاثي المحاور على عينة الطين.", pronunciation: "ران أ تراي أكسيال تيست أون ذا كلاي سامبل." },
      { speaker: "technician", english: "Consolidated undrained or drained?", arabic: "مدمج غير مصرّف ولا مصرّف؟", pronunciation: "كونسوليديتد أندرين أور دريند؟" },
      { speaker: "engineer", english: "Use consolidated undrained with pore pressure measurement.", arabic: "استخدم مدمج غير مصرّف مع قياس ضغط المسام.", pronunciation: "يوز كونسوليديتد أندريند ويذ بور بريشر ميجرمنت." },
    ],
  },
  {
    id: "n46", title: "Asphalt Density Test", titleArabic: "اختبار كثافة الأسفلت", category: "asphalt",
    lines: [
      { speaker: "technician", english: "The bulk density of the core is 2.35.", arabic: "الكثافة الظاهرية للعينة اللبية 2.35.", pronunciation: "ذا بالك دينسيتي أوف ذا كور إز تو بوينت ثري فايف." },
      { speaker: "supervisor", english: "What is the theoretical maximum density?", arabic: "إيه أقصى كثافة نظرية؟", pronunciation: "وات إز ذا ثيوريتيكال ماكسيمم دينسيتي؟" },
      { speaker: "technician", english: "The TMD is 2.45. The compaction is 95.9 percent.", arabic: "أقصى كثافة نظرية 2.45. الدمك 95.9 بالمائة.", pronunciation: "ذا تي إم دي إز تو بوينت فور فايف. ذا كومباكشن إز ناينتي فايف بوينت ناين بيرسينت." },
    ],
  },
  {
    id: "n47", title: "Concrete Finishing", titleArabic: "تسوية الخرسانة", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "The surface finish must be smooth.", arabic: "السطح لازم يكون أملس.", pronunciation: "ذا سيرفيس فينيش ماست بي سموث." },
      { speaker: "worker", english: "Should I use a power trowel?", arabic: "أستخدم مالج كهربائي؟", pronunciation: "شود آي يوز أ باور تراول؟" },
      { speaker: "supervisor", english: "Yes, but wait until the bleed water disappears.", arabic: "نعم، بس استنى لحد ما ماء النزف يختفي.", pronunciation: "يس، بت ويت أنتيل ذا بليد ووتر ديسأبيرز." },
    ],
  },
  {
    id: "n48", title: "Oedometer Setup", titleArabic: "تجهيز الأوديوميتر", category: "soil",
    lines: [
      { speaker: "technician", english: "I am setting up the oedometer for consolidation.", arabic: "بجهز الأوديوميتر لاختبار الانضغاط.", pronunciation: "آي أم سيتينج أب ذا أوديوميتر فور كونسوليديشن." },
      { speaker: "supervisor", english: "Trim the sample to fit the ring exactly.", arabic: "قص العينة تمظبط في الحلقة بالظبط.", pronunciation: "تريم ذا سامبل تو فيت ذا رينج إجزاكتلي." },
      { speaker: "technician", english: "The initial load is 25 kilopascals.", arabic: "الحمل الابتدائي 25 كيلو باسكال.", pronunciation: "ذا إنيشال لود إز توينتي فايف كيلوباسكالز." },
    ],
  },
  {
    id: "n49", title: "Chip Seal Application", titleArabic: "تطبيق المعالجة السطحية", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "Apply a chip seal on the secondary road.", arabic: "اعمل معالجة سطحية على الطريق الثانوي.", pronunciation: "أبلاي أ تشيب سيل أون ذا سيكندري رود." },
      { speaker: "worker", english: "What size aggregate should we use?", arabic: "نستخدم ركام بحجم كام؟", pronunciation: "وات سايز أجريجيت شود وي يوز؟" },
      { speaker: "engineer", english: "Use 10mm single-size aggregate.", arabic: "استخدم ركام مقاس واحد 10 مليمتر.", pronunciation: "يوز تين ميليميتر سينجل سايز أجريجيت." },
    ],
  },
  {
    id: "n50", title: "Concrete Temperature Control", titleArabic: "التحكم في حرارة الخرسانة", category: "concrete",
    lines: [
      { speaker: "engineer", english: "The concrete temperature is 34 degrees. Too hot.", arabic: "حرارة الخرسانة 34 درجة. حر أوي.", pronunciation: "ذا كونكريت تيمبريتشر إز ثيرتي فور ديجريز. تو هوت." },
      { speaker: "technician", english: "Should we add ice to the mixing water?", arabic: "نضيف ثلج لماء الخلط؟", pronunciation: "شود وي أد آيس تو ذا ميكسينج ووتر؟" },
      { speaker: "engineer", english: "Yes, and also cool the aggregates with water spray.", arabic: "نعم، وكمان برد الركام برش الماء.", pronunciation: "يس، أند أولسو كول ذا أجريجيتس ويذ ووتر سبراي." },
      { speaker: "technician", english: "I will retest the temperature after adding ice.", arabic: "هاعيد فحص الحرارة بعد ما نضيف الثلج.", pronunciation: "آي ويل ريتيست ذا تيمبريتشر أفتر أدينج آيس." },
    ],
  },
  {
    id: "n51", title: "Oven Temperature Check", titleArabic: "فحص حرارة الفرن", category: "general",
    lines: [
      { speaker: "technician", english: "The oven temperature is set to 110 degrees.", arabic: "درجة حرارة الفرن مظبوطة على 110 درجة.", pronunciation: "ذا أوفن تيمبريتشر إز سيت تو وان هاندرد أند تين ديجريز." },
      { speaker: "supervisor", english: "Is the thermostat calibrated?", arabic: "الثيرموستات متعاير؟", pronunciation: "إز ذا ثيرموستات كاليبريتد؟" },
      { speaker: "technician", english: "Yes, I checked it this morning with a reference thermometer.", arabic: "نعم، فحصته الصبح بترمومتر مرجعي.", pronunciation: "يس، آي تشيكد إت ذيس مورنينج ويذ أ ريفرنس ثيرموميتر." },
    ],
  },
  {
    id: "n52", title: "Waterproofing Membrane", titleArabic: "عزل مائي", category: "concrete",
    lines: [
      { speaker: "engineer", english: "Apply waterproofing membrane on the basement walls.", arabic: "حط عازل مائي على حيطان البدروم.", pronunciation: "أبلاي ووتربروفينج ميمبرين أون ذا بيسمنت وولز." },
      { speaker: "worker", english: "Should I clean the surface first?", arabic: "أنضف السطح الأول؟", pronunciation: "شود آي كلين ذا سيرفيس فيرست؟" },
      { speaker: "engineer", english: "Yes, remove all dust and loose particles.", arabic: "نعم، شيل كل التراب والحبيبات السايبة.", pronunciation: "يس، ريموف أول داست أند لوز بارتيكلز." },
    ],
  },
  {
    id: "n53", title: "Concrete Joint Cutting", titleArabic: "قص فواصل الخرسانة", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "When should we cut the control joints?", arabic: "نقص فواصل التحكم إمتى؟", pronunciation: "وين شود وي كات ذا كونترول جوينتس؟" },
      { speaker: "technician", english: "Within 6 to 12 hours after pouring.", arabic: "خلال 6 لـ 12 ساعة بعد الصب.", pronunciation: "ويذين سيكس تو توليف أورز أفتر بورينج." },
      { speaker: "supervisor", english: "Cut them at 3-meter spacing.", arabic: "اقصها على مسافات 3 متر.", pronunciation: "كات ذيم أت ثري ميتر سبيسينج." },
    ],
  },
  {
    id: "n54", title: "Hydrometer Test", titleArabic: "اختبار الهيدروميتر", category: "soil",
    lines: [
      { speaker: "technician", english: "I need to run a hydrometer test for the fine particles.", arabic: "محتاج أعمل اختبار هيدروميتر للحبيبات الناعمة.", pronunciation: "آي نيد تو ران أ هايدروميتر تيست فور ذا فاين بارتيكلز." },
      { speaker: "supervisor", english: "Use sodium hexametaphosphate as dispersing agent.", arabic: "استخدم سداسي ميتا فوسفات الصوديوم كعامل تفريق.", pronunciation: "يوز سوديوم هيكساميتافوسفيت أز ديسبيرسينج إيجنت." },
      { speaker: "technician", english: "I will take readings at 1, 2, 5, 15, 30, and 60 minutes.", arabic: "هاخد قراءات عند 1 و2 و5 و15 و30 و60 دقيقة.", pronunciation: "آي ويل تيك ريدينجز أت وان، تو، فايف، فيفتين، ثيرتي، أند سيكستي مينتس." },
    ],
  },
  {
    id: "n55", title: "Skid Resistance Test", titleArabic: "اختبار مقاومة الانزلاق", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "Test the skid resistance of the road surface.", arabic: "اختبر مقاومة الانزلاق لسطح الطريق.", pronunciation: "تيست ذا سكيد ريزيستانس أوف ذا رود سيرفيس." },
      { speaker: "technician", english: "I will use the pendulum skid tester.", arabic: "هستخدم جهاز البندول لقياس الانزلاق.", pronunciation: "آي ويل يوز ذا بيندولم سكيد تيستر." },
      { speaker: "engineer", english: "The minimum value should be 55 for this road class.", arabic: "أقل قيمة لازم تكون 55 لفئة الطريق دي.", pronunciation: "ذا مينيمم فاليو شود بي فيفتي فايف فور ذيس رود كلاس." },
    ],
  },
  // ─── 20 NEW CONVERSATIONS ───
  {
    id: "n56", title: "Core Drilling Request", titleArabic: "طلب قطع لب خرساني", category: "concrete",
    lines: [
      { speaker: "engineer", english: "We need to take cores from the slab.", arabic: "محتاجين ناخد لبات من البلاطة.", pronunciation: "وي نيد تو تيك كورز فروم ذا سلاب." },
      { speaker: "technician", english: "What diameter do you need?", arabic: "محتاج قطر كام؟", pronunciation: "وات دايميتر دو يو نيد؟" },
      { speaker: "engineer", english: "Use a 100mm diameter core drill.", arabic: "استخدم مثقاب لب قطر 100 مم.", pronunciation: "يوز أ وان هاندرد ميليميتر دايميتر كور دريل." },
      { speaker: "technician", english: "I will mark the locations first.", arabic: "هحدد الأماكن الأول.", pronunciation: "آي ويل مارك ذا لوكيشنز فيرست." },
    ],
  },
  {
    id: "n57", title: "Concrete Temperature Check", titleArabic: "فحص حرارة الخرسانة", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "What is the concrete temperature?", arabic: "درجة حرارة الخرسانة كام؟", pronunciation: "وات إز ذا كونكريت تيمبراتشر؟" },
      { speaker: "technician", english: "It is 32 degrees Celsius.", arabic: "32 درجة مئوية.", pronunciation: "إت إز ثيرتي تو ديجريز سيلسيوس." },
      { speaker: "supervisor", english: "That is too high. The maximum is 30 degrees.", arabic: "ده عالي. أقصى حد 30 درجة.", pronunciation: "ذات إز تو هاي. ذا ماكسيمم إز ثيرتي ديجريز." },
      { speaker: "technician", english: "Should we use ice in the mix?", arabic: "نستخدم ثلج في الخلطة؟", pronunciation: "شود وي يوز آيس إن ذا ميكس؟" },
    ],
  },
  {
    id: "n58", title: "Sand Equivalent Test", titleArabic: "اختبار المكافئ الرملي", category: "soil",
    lines: [
      { speaker: "technician", english: "I am running the sand equivalent test.", arabic: "بعمل اختبار المكافئ الرملي.", pronunciation: "آي أم رانينج ذا ساند إكويفالنت تيست." },
      { speaker: "supervisor", english: "What is the minimum requirement?", arabic: "إيه الحد الأدنى المطلوب؟", pronunciation: "وات إز ذا مينيمم ريكوايرمنت؟" },
      { speaker: "technician", english: "The specification requires a minimum of 50.", arabic: "المواصفة تتطلب 50 كحد أدنى.", pronunciation: "ذا سبيسيفيكيشن ريكوايرز أ مينيمم أوف فيفتي." },
    ],
  },
  {
    id: "n59", title: "Asphalt Layer Thickness", titleArabic: "سمك طبقة الأسفلت", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "Measure the thickness of the wearing course.", arabic: "قيس سمك طبقة الاحتكاك.", pronunciation: "ميجر ذا ثيكنيس أوف ذا ويرينج كورس." },
      { speaker: "technician", english: "The average thickness is 45mm.", arabic: "متوسط السمك 45 مم.", pronunciation: "ذا أفريج ثيكنيس إز فورتي فايف ميليميترز." },
      { speaker: "engineer", english: "The design thickness is 50mm. It is below specification.", arabic: "السمك التصميمي 50 مم. ده أقل من المواصفة.", pronunciation: "ذا ديزاين ثيكنيس إز فيفتي ميليميترز. إت إز بيلو سبيسيفيكيشن." },
    ],
  },
  {
    id: "n60", title: "Laboratory Calibration", titleArabic: "معايرة أجهزة المختبر", category: "general",
    lines: [
      { speaker: "supervisor", english: "When was the compression machine last calibrated?", arabic: "إمتى آخر مرة ماكينة الضغط اتعايرت؟", pronunciation: "وين واز ذا كومبريشن مشين لاست كاليبريتيد؟" },
      { speaker: "technician", english: "It was calibrated six months ago.", arabic: "اتعايرت من 6 شهور.", pronunciation: "إت واز كاليبريتيد سيكس مانثس أجو." },
      { speaker: "supervisor", english: "It needs annual calibration. Schedule it.", arabic: "محتاجة معايرة سنوية. حددلها موعد.", pronunciation: "إت نيدز أنيوال كاليبريشن. سكيديول إت." },
    ],
  },
  {
    id: "n61", title: "Soil Classification", titleArabic: "تصنيف التربة", category: "soil",
    lines: [
      { speaker: "engineer", english: "How do you classify this soil?", arabic: "بتصنف التربة دي إزاي؟", pronunciation: "هاو دو يو كلاسيفاي ذيس سويل؟" },
      { speaker: "technician", english: "Based on the tests, it is a silty clay.", arabic: "بناءً على الاختبارات، دي طين سلتي.", pronunciation: "بيسد أون ذا تيستس إت إز أ سيلتي كلاي." },
      { speaker: "engineer", english: "What is the plasticity index?", arabic: "إيه معامل اللدونة؟", pronunciation: "وات إز ذا بلاستيسيتي إنديكس؟" },
      { speaker: "technician", english: "The plasticity index is 18.", arabic: "معامل اللدونة 18.", pronunciation: "ذا بلاستيسيتي إنديكس إز إيتين." },
    ],
  },
  {
    id: "n62", title: "Concrete Segregation", titleArabic: "انفصال حبيبي في الخرسانة", category: "concrete",
    lines: [
      { speaker: "technician", english: "I noticed segregation in the concrete.", arabic: "لاحظت انفصال حبيبي في الخرسانة.", pronunciation: "آي نوتيسد سيجريجيشن إن ذا كونكريت." },
      { speaker: "supervisor", english: "Stop the pouring immediately.", arabic: "وقف الصب فوراً.", pronunciation: "ستوب ذا بورينج إميديتلي." },
      { speaker: "supervisor", english: "Check the slump and water content.", arabic: "افحص الهبوط ومحتوى الماء.", pronunciation: "تشيك ذا سلامب أند ووتر كونتينت." },
    ],
  },
  {
    id: "n63", title: "Asphalt Compaction Check", titleArabic: "فحص دمك الأسفلت", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "What is the compaction degree?", arabic: "درجة الدمك كام؟", pronunciation: "وات إز ذا كومباكشن ديجري؟" },
      { speaker: "technician", english: "The density ratio is 97 percent.", arabic: "نسبة الكثافة 97 بالمائة.", pronunciation: "ذا دينسيتي ريشيو إز ناينتي سيفن بيرسينت." },
      { speaker: "engineer", english: "Good. The minimum is 95 percent.", arabic: "كويس. الحد الأدنى 95 بالمائة.", pronunciation: "جود. ذا مينيمم إز ناينتي فايف بيرسينت." },
    ],
  },
  {
    id: "n64", title: "Water Absorption Test", titleArabic: "اختبار امتصاص الماء", category: "concrete",
    lines: [
      { speaker: "technician", english: "The water absorption of the aggregate is 2.5 percent.", arabic: "امتصاص الماء للركام 2.5 بالمائة.", pronunciation: "ذا ووتر أبزوربشن أوف ذا أجريجيت إز تو بوينت فايف بيرسينت." },
      { speaker: "engineer", english: "Is it within the limit?", arabic: "هل هي ضمن الحد؟", pronunciation: "إز إت ويذين ذا ليميت؟" },
      { speaker: "technician", english: "Yes, the maximum allowed is 3 percent.", arabic: "نعم، أقصى مسموح 3 بالمائة.", pronunciation: "يس، ذا ماكسيمم ألاود إز ثري بيرسينت." },
    ],
  },
  {
    id: "n65", title: "Safety Equipment Inspection", titleArabic: "فحص معدات السلامة", category: "general",
    lines: [
      { speaker: "supervisor", english: "Is everyone wearing safety boots?", arabic: "الكل لابس بوت السلامة؟", pronunciation: "إز إفريوان ويرينج سيفتي بوتس؟" },
      { speaker: "worker", english: "Yes, we also have hard hats and gloves.", arabic: "نعم، ومعانا خوذ وجوانتيات.", pronunciation: "يس، وي أولسو هاف هارد هاتس أند جلافز." },
      { speaker: "supervisor", english: "Good. Safety first in the laboratory.", arabic: "كويس. السلامة أولاً في المختبر.", pronunciation: "جود. سيفتي فيرست إن ذا لابوراتوري." },
    ],
  },
  {
    id: "n66", title: "Flexural Test Setup", titleArabic: "إعداد اختبار الانحناء", category: "concrete",
    lines: [
      { speaker: "technician", english: "I set up the third-point loading test.", arabic: "جهزت اختبار التحميل عند الثلث.", pronunciation: "آي سيت أب ذا ثيرد بوينت لودينج تيست." },
      { speaker: "engineer", english: "What is the span length?", arabic: "إيه طول البحر؟", pronunciation: "وات إز ذا سبان لينث؟" },
      { speaker: "technician", english: "The span is 450mm for a 150mm beam.", arabic: "البحر 450 مم لكمرة 150 مم.", pronunciation: "ذا سبان إز فور هاندرد أند فيفتي ميليميترز فور أ وان فيفتي ميليميتر بيم." },
    ],
  },
  {
    id: "n67", title: "Grading Envelope Check", titleArabic: "فحص غلاف التدرج", category: "soil",
    lines: [
      { speaker: "engineer", english: "Is the grading within the envelope?", arabic: "التدرج ضمن الغلاف؟", pronunciation: "إز ذا جريدينج ويذين ذا إنفيلوب؟" },
      { speaker: "technician", english: "The coarse fraction passes but the fine fraction is out.", arabic: "الجزء الخشن ماشي بس الناعم خارج.", pronunciation: "ذا كورس فراكشن باسيز بات ذا فاين فراكشن إز آوت." },
      { speaker: "engineer", english: "We need to blend with more fine material.", arabic: "محتاجين نخلط مع مادة ناعمة أكتر.", pronunciation: "وي نيد تو بليند ويذ مور فاين ماتيريال." },
    ],
  },
  {
    id: "n68", title: "Bitumen Flash Point", titleArabic: "نقطة وميض البيتومين", category: "asphalt",
    lines: [
      { speaker: "technician", english: "I tested the flash point of the bitumen.", arabic: "اختبرت نقطة وميض البيتومين.", pronunciation: "آي تيستيد ذا فلاش بوينت أوف ذا بيتيومن." },
      { speaker: "supervisor", english: "What temperature did it flash?", arabic: "ومض عند درجة حرارة كام؟", pronunciation: "وات تيمبراتشر ديد إت فلاش؟" },
      { speaker: "technician", english: "The flash point is 250 degrees Celsius.", arabic: "نقطة الوميض 250 درجة مئوية.", pronunciation: "ذا فلاش بوينت إز تو هاندرد أند فيفتي ديجريز سيلسيوس." },
    ],
  },
  {
    id: "n69", title: "Concrete Workability Problem", titleArabic: "مشكلة في قابلية تشغيل الخرسانة", category: "concrete",
    lines: [
      { speaker: "worker", english: "The concrete is too stiff to pour.", arabic: "الخرسانة صلبة جداً للصب.", pronunciation: "ذا كونكريت إز تو ستيف تو بور." },
      { speaker: "technician", english: "The slump is only 40mm. It should be 100mm.", arabic: "الهبوط 40 مم بس. المفروض 100 مم.", pronunciation: "ذا سلامب إز أونلي فورتي ميليميترز. إت شود بي وان هاندرد." },
      { speaker: "supervisor", english: "Do not add water on site. Reject this load.", arabic: "متضيفش ماء في الموقع. ارفض الحمولة دي.", pronunciation: "دو نوت آد ووتر أون سايت. ريجكت ذيس لود." },
    ],
  },
  {
    id: "n70", title: "Plate Load Test", titleArabic: "اختبار التحميل باللوح", category: "soil",
    lines: [
      { speaker: "engineer", english: "Set up the plate load test on the subgrade.", arabic: "جهز اختبار التحميل باللوح على التربة التحتية.", pronunciation: "سيت أب ذا بليت لود تيست أون ذا سابجريد." },
      { speaker: "technician", english: "Which plate size should I use?", arabic: "أستخدم لوح مقاس كام؟", pronunciation: "ويتش بليت سايز شود آي يوز؟" },
      { speaker: "engineer", english: "Use the 300mm diameter plate.", arabic: "استخدم اللوح قطر 300 مم.", pronunciation: "يوز ذا ثري هاندرد ميليميتر دايميتر بليت." },
    ],
  },
  {
    id: "n71", title: "Quality Control Meeting", titleArabic: "اجتماع ضبط الجودة", category: "general",
    lines: [
      { speaker: "engineer", english: "Let us review this week's test results.", arabic: "خلينا نراجع نتائج اختبارات الأسبوع.", pronunciation: "ليت أس ريفيو ذيس ويكس تيست ريزالتس." },
      { speaker: "technician", english: "All concrete tests passed. Two soil tests failed.", arabic: "كل اختبارات الخرسانة نجحت. اختبارين تربة فشلوا.", pronunciation: "أول كونكريت تيستس باسد. تو سويل تيستس فيلد." },
      { speaker: "engineer", english: "Prepare NCR reports for the failed tests.", arabic: "جهز تقارير عدم مطابقة للاختبارات الفاشلة.", pronunciation: "بريبير إن سي آر ريبورتس فور ذا فيلد تيستس." },
      { speaker: "technician", english: "I will submit them by tomorrow morning.", arabic: "هسلمهم بكرة الصبح.", pronunciation: "آي ويل سابميت ذيم باي تومورو مورنينج." },
    ],
  },
  {
    id: "n72", title: "Rebar Inspection", titleArabic: "فحص حديد التسليح", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "Check the rebar before we pour.", arabic: "افحص الحديد قبل ما نصب.", pronunciation: "تشيك ذا ريبار بيفور وي بور." },
      { speaker: "technician", english: "The cover is 40mm as specified.", arabic: "الغطاء 40 مم زي المواصفة.", pronunciation: "ذا كافر إز فورتي ميليميترز أز سبيسيفايد." },
      { speaker: "supervisor", english: "What about the spacing?", arabic: "والمسافات إيه؟", pronunciation: "وات أباوت ذا سبيسينج؟" },
      { speaker: "technician", english: "Spacing is 200mm center to center.", arabic: "المسافات 200 مم من مركز لمركز.", pronunciation: "سبيسينج إز تو هاندرد ميليميترز سينتر تو سينتر." },
    ],
  },
  {
    id: "n73", title: "Unconfined Compression Test", titleArabic: "اختبار الضغط غير المحصور", category: "soil",
    lines: [
      { speaker: "engineer", english: "Run the unconfined compression test on this clay.", arabic: "اعمل اختبار الضغط غير المحصور على الطين ده.", pronunciation: "ران ذا أنكونفايند كومبريشن تيست أون ذيس كلاي." },
      { speaker: "technician", english: "The sample height to diameter ratio is 2 to 1.", arabic: "نسبة الارتفاع للقطر 2 إلى 1.", pronunciation: "ذا سامبل هايت تو دايميتر ريشيو إز تو تو وان." },
      { speaker: "engineer", english: "Apply the load at a constant rate.", arabic: "طبق الحمل بمعدل ثابت.", pronunciation: "أبلاي ذا لود أت أ كونستانت ريت." },
    ],
  },
  {
    id: "n74", title: "Asphalt Surface Defects", titleArabic: "عيوب سطح الأسفلت", category: "asphalt",
    lines: [
      { speaker: "supervisor", english: "I see cracking on the new asphalt layer.", arabic: "شايف شروخ على طبقة الأسفلت الجديدة.", pronunciation: "آي سي كراكينج أون ذا نيو أسفالت لير." },
      { speaker: "technician", english: "It could be due to low compaction temperature.", arabic: "ممكن يكون بسبب درجة حرارة دمك منخفضة.", pronunciation: "إت كود بي ديو تو لو كومباكشن تيمبراتشر." },
      { speaker: "supervisor", english: "Take a core sample and check the density.", arabic: "خد عينة لب وافحص الكثافة.", pronunciation: "تيك أ كور سامبل أند تشيك ذا دينسيتي." },
    ],
  },
  {
    id: "n75", title: "Report Submission", titleArabic: "تسليم التقارير", category: "general",
    lines: [
      { speaker: "supervisor", english: "Are all the reports ready for submission?", arabic: "كل التقارير جاهزة للتسليم؟", pronunciation: "آر أول ذا ريبورتس ريدي فور سابميشن؟" },
      { speaker: "technician", english: "Yes, I finished all test reports for this week.", arabic: "نعم، خلصت كل تقارير اختبارات الأسبوع.", pronunciation: "يس، آي فينيشد أول تيست ريبورتس فور ذيس ويك." },
      { speaker: "supervisor", english: "Send them to the client before 5 PM.", arabic: "ابعتهم للعميل قبل الساعة 5.", pronunciation: "سيند ذيم تو ذا كلاينت بيفور فايف بي إم." },
      { speaker: "technician", english: "I will email them right away.", arabic: "هبعتهم بالإيميل فوراً.", pronunciation: "آي ويل إيميل ذيم رايت أواي." },
    ],
  },
  // ─── MORE CONVERSATIONS ───
  {
    id: "n76", title: "New Employee Training", titleArabic: "تدريب موظف جديد", category: "general",
    lines: [
      { speaker: "supervisor", english: "Welcome to the lab. I will show you around.", arabic: "مرحباً بيك في المختبر. هوريك المكان.", pronunciation: "ويلكم تو ذا لاب. آي ويل شو يو أراوند." },
      { speaker: "worker", english: "Thank you. Where do I start?", arabic: "شكراً. أبدأ منين؟", pronunciation: "ثانك يو. وير دو آي ستارت؟" },
      { speaker: "supervisor", english: "First, learn the safety rules. Then watch the senior technician.", arabic: "الأول اتعلم قواعد السلامة. وبعدين تابع الفني الأقدم.", pronunciation: "فيرست ليرن ذا سيفتي رولز. ذين واتش ذا سينيور تيكنيشن." },
    ],
  },
  {
    id: "n77", title: "Ordering Lab Supplies", titleArabic: "طلب مستلزمات المختبر", category: "general",
    lines: [
      { speaker: "technician", english: "We are running low on test molds.", arabic: "القوالب قربت تخلص.", pronunciation: "وي آر رانينج لو أون تيست مولدز." },
      { speaker: "supervisor", english: "How many do we need?", arabic: "محتاجين كام؟", pronunciation: "هاو ميني دو وي نيد؟" },
      { speaker: "technician", english: "At least 20 cube molds and 10 cylinder molds.", arabic: "20 قالب مكعب و10 قوالب أسطوانية على الأقل.", pronunciation: "أت ليست توينتي كيوب مولدز أند تين سيليندر مولدز." },
      { speaker: "supervisor", english: "Submit the purchase request today.", arabic: "سلم طلب الشراء النهاردة.", pronunciation: "سابميت ذا بيرتشيس ريكويست توداي." },
    ],
  },
  {
    id: "n78", title: "Concrete Pump Blockage", titleArabic: "انسداد مضخة الخرسانة", category: "concrete",
    lines: [
      { speaker: "worker", english: "The pump is blocked!", arabic: "المضخة مسدودة!", pronunciation: "ذا بامب إز بلوكد!" },
      { speaker: "supervisor", english: "Stop pumping immediately!", arabic: "وقف الضخ فوراً!", pronunciation: "ستوب بامبينج إميديتلي!" },
      { speaker: "technician", english: "We need to clear the blockage from the pipe.", arabic: "لازم ننظف الانسداد من الماسورة.", pronunciation: "وي نيد تو كلير ذا بلوكيج فروم ذا بايب." },
      { speaker: "supervisor", english: "Check the slump. It might be too low for pumping.", arabic: "افحص الهبوط. ممكن يكون قليل للضخ.", pronunciation: "تشيك ذا سلامب. إت مايت بي تو لو فور بامبينج." },
    ],
  },
  {
    id: "n79", title: "Permeability Discussion", titleArabic: "مناقشة النفاذية", category: "concrete",
    lines: [
      { speaker: "engineer", english: "The permeability test results are concerning.", arabic: "نتائج اختبار النفاذية مقلقة.", pronunciation: "ذا بيرميابيليتي ريزالتس آر كونسيرنينج." },
      { speaker: "technician", english: "The water penetration depth is 35 millimeters.", arabic: "عمق تغلغل الماء 35 مليمتر.", pronunciation: "ذا ووتر بينيتريشن ديبث إز ثيرتي فايف ميليميترز." },
      { speaker: "engineer", english: "The maximum allowed is 30 mm. This batch fails.", arabic: "الحد الأقصى 30 مم. الدفعة دي فاشلة.", pronunciation: "ذا ماكسيمم إز ثيرتي إم إم. ذيس باتش فيلز." },
    ],
  },
  {
    id: "n80", title: "Triaxial Test Setup", titleArabic: "تجهيز اختبار ثلاثي المحاور", category: "soil",
    lines: [
      { speaker: "engineer", english: "Set up the triaxial test apparatus.", arabic: "جهز جهاز الاختبار ثلاثي المحاور.", pronunciation: "سيت أب ذا ترايأكسيال تيست أباراتس." },
      { speaker: "technician", english: "Should I run a consolidated undrained test?", arabic: "أعمل اختبار متماسك غير مصرف؟", pronunciation: "شود آي ران أ كونسوليديتد أندرييند تيست؟" },
      { speaker: "engineer", english: "Yes, at three different confining pressures.", arabic: "نعم، عند ثلاث ضغوط حصر مختلفة.", pronunciation: "يس، أت ثري ديفرنت كونفاينينج بريشرز." },
      { speaker: "technician", english: "I will prepare the specimens now.", arabic: "هجهز العينات دلوقتي.", pronunciation: "آي ويل بريبير ذا سبيسيمنز ناو." },
    ],
  },
  {
    id: "n81", title: "Flash Point Test", titleArabic: "اختبار نقطة الوميض", category: "asphalt",
    lines: [
      { speaker: "technician", english: "I am performing the flash point test on the bitumen.", arabic: "بعمل اختبار نقطة الوميض على البيتومين.", pronunciation: "آي أم بيرفورمينج ذا فلاش بوينت تيست." },
      { speaker: "supervisor", english: "Be very careful. This test uses open flame.", arabic: "خلي بالك جداً. الاختبار ده فيه لهب.", pronunciation: "بي فيري كيرفول. ذيس تيست يوزز أوبن فليم." },
      { speaker: "technician", english: "The flash point is 250 degrees Celsius.", arabic: "نقطة الوميض 250 درجة مئوية.", pronunciation: "ذا فلاش بوينت إز تو هاندرد أند فيفتي ديجريز." },
      { speaker: "supervisor", english: "Good. That meets the safety requirement.", arabic: "كويس. ده بيحقق متطلبات السلامة.", pronunciation: "جود. ذات ميتس ذا سيفتي ريكوايرمنت." },
    ],
  },

  // ========== NEW CONVERSATIONS ==========
  {
    id: "n82", title: "Concrete Shrinkage Cracks", titleArabic: "شروخ انكماش الخرسانة", category: "concrete",
    lines: [
      { speaker: "worker", english: "There are cracks on the concrete surface!", arabic: "في شروخ على سطح الخرسانة!", pronunciation: "ذير آر كراكس أون ذا كونكريت سيرفيس!" },
      { speaker: "technician", english: "These are shrinkage cracks from rapid drying.", arabic: "دي شروخ انكماش من الجفاف السريع.", pronunciation: "ذيز آر شرينكيج كراكس فروم رابيد دراينج." },
      { speaker: "supervisor", english: "We should have applied curing compound earlier.", arabic: "كان لازم نرش مركب المعالجة بدري.", pronunciation: "وي شود هاف أبلايد كيورينج كومباوند إيرلير." },
      { speaker: "technician", english: "Should we apply it now?", arabic: "نرشه دلوقتي؟", pronunciation: "شود وي أبلاي إت ناو؟" },
      { speaker: "supervisor", english: "Yes, and start water curing immediately.", arabic: "نعم، وابدأ المعالجة بالماء فوراً.", pronunciation: "يس، أند ستارت ووتر كيورينج إميديتلي." },
    ],
  },
  {
    id: "n83", title: "Specific Gravity Testing", titleArabic: "اختبار الوزن النوعي", category: "soil",
    lines: [
      { speaker: "engineer", english: "What is the specific gravity of this soil?", arabic: "كام الوزن النوعي للتربة دي؟", pronunciation: "وات إز ذا سبيسيفيك جرافيتي أوف ذيس سويل؟" },
      { speaker: "technician", english: "The specific gravity is 2.65.", arabic: "الوزن النوعي 2.65.", pronunciation: "ذا سبيسيفيك جرافيتي إز تو بوينت سيكس فايف." },
      { speaker: "engineer", english: "That is typical for sandy soil. Good.", arabic: "ده طبيعي للتربة الرملية. كويس.", pronunciation: "ذات إز تيبيكال فور ساندي سويل. جود." },
    ],
  },
  {
    id: "n84", title: "Hot Weather Concreting", titleArabic: "صب الخرسانة في الحر", category: "concrete",
    lines: [
      { speaker: "supervisor", english: "The temperature today is 45 degrees.", arabic: "درجة الحرارة النهاردة 45 درجة.", pronunciation: "ذا تيمبريتشر توداي إز فورتي فايف ديجريز." },
      { speaker: "technician", english: "Should we add ice to the mixing water?", arabic: "نضيف ثلج لماء الخلط؟", pronunciation: "شود وي أد آيس تو ذا ميكسينج ووتر؟" },
      { speaker: "supervisor", english: "Yes, and check the concrete temperature before pouring.", arabic: "نعم، وافحص حرارة الخرسانة قبل الصب.", pronunciation: "يس، أند تشيك ذا كونكريت تيمبريتشر بيفور بورينج." },
      { speaker: "technician", english: "The concrete temperature is 30 degrees. It is within limit.", arabic: "حرارة الخرسانة 30 درجة. ضمن الحدود.", pronunciation: "ذا كونكريت تيمبريتشر إز ثيرتي. إت إز ويذين ليميت." },
    ],
  },
  {
    id: "n85", title: "Unconfined Compression Discussion", titleArabic: "مناقشة الضغط غير المحصور", category: "soil",
    lines: [
      { speaker: "engineer", english: "Run an unconfined compression test on the clay sample.", arabic: "اعمل اختبار ضغط غير محصور على عينة الطين.", pronunciation: "ران أن أنكونفايند كومبريشن تيست أون ذا كلاي سامبل." },
      { speaker: "technician", english: "What strain rate should I use?", arabic: "أستخدم معدل انفعال كام؟", pronunciation: "وات سترين ريت شود آي يوز؟" },
      { speaker: "engineer", english: "Use 1 percent per minute.", arabic: "استخدم 1 بالمائة في الدقيقة.", pronunciation: "يوز وان بيرسينت بير مينت." },
      { speaker: "technician", english: "The shear strength is 85 kPa.", arabic: "مقاومة القص 85 كيلو باسكال.", pronunciation: "ذا شير سترينث إز إيتي فايف كيلوباسكالز." },
    ],
  },
  {
    id: "n86", title: "Asphalt Layer Thickness", titleArabic: "سماكة طبقة الأسفلت", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "What is the required thickness for the wearing course?", arabic: "كام السماكة المطلوبة لطبقة السطح؟", pronunciation: "وات إز ذا ريكوايرد ثيكنيس فور ذا ويرينج كورس؟" },
      { speaker: "technician", english: "The specification requires 50 millimeters.", arabic: "المواصفة تتطلب 50 مليمتر.", pronunciation: "ذا سبيسيفيكيشن ريكوايرز فيفتي ميليميترز." },
      { speaker: "engineer", english: "Check the core thickness after compaction.", arabic: "افحص سماكة اللب بعد الدمك.", pronunciation: "تشيك ذا كور ثيكنيس أفتر كومباكشن." },
      { speaker: "technician", english: "The core thickness is 48 millimeters. Is that acceptable?", arabic: "سماكة اللب 48 مم. ده مقبول؟", pronunciation: "ذا كور ثيكنيس إز فورتي إيت. إز ذات أكسيبتابل؟" },
      { speaker: "engineer", english: "The tolerance is minus 5 mm, so 45 is the minimum. It passes.", arabic: "التفاوت ناقص 5 مم، فالحد الأدنى 45. ناجح.", pronunciation: "ذا تولرانس إز ماينس فايف. فورتي فايف إز ذا مينيمم. إت باسيز." },
    ],
  },
  {
    id: "n87", title: "Plate Load Test Discussion", titleArabic: "مناقشة اختبار الصفيحة", category: "soil",
    lines: [
      { speaker: "engineer", english: "We need a plate load test at this location.", arabic: "محتاجين اختبار حمل بالصفيحة في المكان ده.", pronunciation: "وي نيد أ بليت لود تيست أت ذيس لوكيشن." },
      { speaker: "technician", english: "What plate size should I use?", arabic: "أستخدم صفيحة قطر كام؟", pronunciation: "وات بليت سايز شود آي يوز؟" },
      { speaker: "engineer", english: "Use a 300 millimeter diameter plate.", arabic: "استخدم صفيحة قطر 300 مم.", pronunciation: "يوز أ ثري هاندرد ميليميتر دايأميتر بليت." },
      { speaker: "technician", english: "The bearing capacity is 150 kPa.", arabic: "قدرة التحمل 150 كيلو باسكال.", pronunciation: "ذا بيرينج كاباسيتي إز وان هاندرد أند فيفتي كيلوباسكالز." },
    ],
  },
  {
    id: "n88", title: "Aggregate Washing", titleArabic: "غسيل الركام", category: "general",
    lines: [
      { speaker: "supervisor", english: "The aggregate looks dirty. We need to wash it.", arabic: "الركام شكله وسخ. لازم نغسله.", pronunciation: "ذا أجريجيت لوكس ديرتي. وي نيد تو ووش إت." },
      { speaker: "technician", english: "I will perform a wash sieve analysis.", arabic: "هاعمل تحليل مناخل بالغسيل.", pronunciation: "آي ويل بيرفورم أ ووش سيف أناليسيس." },
      { speaker: "supervisor", english: "How much fine material is passing the 75 micron sieve?", arabic: "كام نسبة المادة الناعمة المارة من منخل 75 ميكرون؟", pronunciation: "هاو ماتش فاين ماتيريال إز باسينج ذا 75 مايكرون سيف؟" },
      { speaker: "technician", english: "About 8 percent. The maximum is 5 percent.", arabic: "حوالي 8 بالمائة. الحد الأقصى 5 بالمائة.", pronunciation: "أباوت إيت بيرسينت. ذا ماكسيمم إز فايف." },
      { speaker: "supervisor", english: "Then we must reject this batch.", arabic: "يبقى لازم نرفض الدفعة دي.", pronunciation: "ذين وي ماست ريجيكت ذيس باتش." },
    ],
  },
  {
    id: "n89", title: "Concrete Setting Time", titleArabic: "زمن شك الخرسانة", category: "concrete",
    lines: [
      { speaker: "engineer", english: "What is the initial setting time of this cement?", arabic: "كام زمن الشك الابتدائي للأسمنت ده؟", pronunciation: "وات إز ذا إنيشال سيتينج تايم أوف ذيس سيمنت؟" },
      { speaker: "technician", english: "The initial setting time is 120 minutes.", arabic: "زمن الشك الابتدائي 120 دقيقة.", pronunciation: "ذا إنيشال سيتينج تايم إز وان هاندرد أند توينتي مينتس." },
      { speaker: "engineer", english: "And the final setting time?", arabic: "وزمن الشك النهائي؟", pronunciation: "أند ذا فاينال سيتينج تايم؟" },
      { speaker: "technician", english: "The final setting time is 240 minutes. Both are within specification.", arabic: "زمن الشك النهائي 240 دقيقة. الاتنين ضمن المواصفة.", pronunciation: "ذا فاينال سيتينج تايم إز تو هاندرد أند فورتي. بوث آر ويذين سبيسيفيكيشن." },
    ],
  },
  {
    id: "n90", title: "Calibrating the Balance", titleArabic: "معايرة الميزان", category: "general",
    lines: [
      { speaker: "supervisor", english: "When was the last time you calibrated the balance?", arabic: "آخر مرة عايرت الميزان إمتى؟", pronunciation: "وين ووز ذا لاست تايم يو كاليبريتد ذا بالانس؟" },
      { speaker: "technician", english: "Three months ago. It is due for recalibration.", arabic: "من 3 شهور. محتاج يتعاير تاني.", pronunciation: "ثري مانثس أجو. إت إز ديو فور ريكاليبريشن." },
      { speaker: "supervisor", english: "Use the standard weights to check it first.", arabic: "استخدم الأوزان القياسية تفحصه الأول.", pronunciation: "يوز ذا ستاندرد وايتس تو تشيك إت فيرست." },
      { speaker: "technician", english: "The error is 0.5 grams. We need to send it for calibration.", arabic: "الخطأ 0.5 جرام. لازم نبعته للمعايرة.", pronunciation: "ذا إيرور إز بوينت فايف جرامز. وي نيد تو سيند إت." },
    ],
  },
  {
    id: "n91", title: "Emulsion Breaking Test", titleArabic: "اختبار كسر المستحلب", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "Test the breaking time of this emulsion.", arabic: "اختبر زمن كسر المستحلب ده.", pronunciation: "تيست ذا بريكينج تايم أوف ذيس إمالشن." },
      { speaker: "technician", english: "It is a rapid setting emulsion. Should break quickly.", arabic: "ده مستحلب سريع الشك. المفروض يكسر بسرعة.", pronunciation: "إت إز أ رابيد سيتينج. شود بريك كويكلي." },
      { speaker: "engineer", english: "Mix it with the aggregate and observe.", arabic: "اخلطه مع الركام وراقب.", pronunciation: "ميكس إت ويذ ذا أجريجيت أند أوبزيرف." },
      { speaker: "technician", english: "It broke within 2 minutes. It meets the specification.", arabic: "انكسر في أقل من دقيقتين. بيحقق المواصفة.", pronunciation: "إت بروك ويذين تو مينتس. إت ميتس ذا سبيسيفيكيشن." },
    ],
  },
  {
    id: "n92", title: "Report Correction", titleArabic: "تصحيح التقرير", category: "general",
    lines: [
      { speaker: "supervisor", english: "There is an error in this report.", arabic: "في غلطة في التقرير ده.", pronunciation: "ذير إز أن إيرور إن ذيس ريبورت." },
      { speaker: "technician", english: "Where is the error?", arabic: "الغلطة فين؟", pronunciation: "وير إز ذا إيرور؟" },
      { speaker: "supervisor", english: "The sample weight is wrong. You wrote 500 instead of 5000 grams.", arabic: "وزن العينة غلط. كتبت 500 بدل 5000 جرام.", pronunciation: "ذا سامبل وايت إز رونج. يو روت 500 إنستيد أوف 5000." },
      { speaker: "technician", english: "I will correct it and reprint the report.", arabic: "هاصححها وأعيد طباعة التقرير.", pronunciation: "آي ويل كوريكت إت أند ريبرينت ذا ريبورت." },
      { speaker: "supervisor", english: "Double check all numbers before submitting.", arabic: "راجع كل الأرقام قبل ما تسلم.", pronunciation: "دابل تشيك أول نامبرز بيفور سابميتينج." },
    ],
  },
  {
    id: "n93", title: "Concrete Admixtures", titleArabic: "إضافات الخرسانة", category: "concrete",
    lines: [
      { speaker: "engineer", english: "We need to add a retarder to this mix.", arabic: "محتاجين نضيف مؤخر شك للخلطة دي.", pronunciation: "وي نيد تو أد أ ريتاردر تو ذيس ميكس." },
      { speaker: "technician", english: "What dosage should I use?", arabic: "أستخدم جرعة كام؟", pronunciation: "وات دوسيج شود آي يوز؟" },
      { speaker: "engineer", english: "Use 0.3 percent by weight of cement.", arabic: "استخدم 0.3 بالمائة من وزن الأسمنت.", pronunciation: "يوز بوينت ثري بيرسينت باي وايت أوف سيمنت." },
      { speaker: "technician", english: "Understood. I will add it to the mixing water.", arabic: "فهمت. هاضيفه لماء الخلط.", pronunciation: "أندرستود. آي ويل أد إت تو ذا ميكسينج ووتر." },
    ],
  },
  {
    id: "n94", title: "Safety Inspection", titleArabic: "تفتيش السلامة", category: "general",
    lines: [
      { speaker: "supervisor", english: "We have a safety inspection tomorrow.", arabic: "عندنا تفتيش سلامة بكرة.", pronunciation: "وي هاف أ سيفتي إنسبيكشن تومورو." },
      { speaker: "technician", english: "I will check all the safety equipment.", arabic: "هافحص كل معدات السلامة.", pronunciation: "آي ويل تشيك أول ذا سيفتي إكويبمنت." },
      { speaker: "supervisor", english: "Make sure all fire extinguishers are valid.", arabic: "تأكد إن كل الطفايات سارية.", pronunciation: "ميك شور أول فاير إكستينجويشرز آر فاليد." },
      { speaker: "technician", english: "I will also update the chemical safety data sheets.", arabic: "هاحدث كمان صحائف بيانات سلامة الكيماويات.", pronunciation: "آي ويل أولسو أبديت ذا كيميكال سيفتي ديتا شيتس." },
    ],
  },
  {
    id: "n95", title: "Soil Bearing Failure", titleArabic: "انهيار تحمل التربة", category: "soil",
    lines: [
      { speaker: "worker", english: "The ground is sinking under the foundation!", arabic: "الأرض بتهبط تحت الأساس!", pronunciation: "ذا جراوند إز سينكينج أندر ذا فاونديشن!" },
      { speaker: "engineer", english: "Stop all loading immediately.", arabic: "وقفوا كل الأحمال فوراً.", pronunciation: "ستوب أول لودينج إميديتلي." },
      { speaker: "technician", english: "We need to test the soil bearing capacity again.", arabic: "لازم نختبر قدرة تحمل التربة تاني.", pronunciation: "وي نيد تو تيست ذا سويل بيرينج كاباسيتي أجين." },
      { speaker: "engineer", english: "Take undisturbed samples and run triaxial tests.", arabic: "خد عينات غير مقلقلة واعمل اختبار ثلاثي المحاور.", pronunciation: "تيك أنديستيربد سامبلز أند ران ترايأكسيال تيستس." },
    ],
  },
  {
    id: "n96", title: "Bitumen Viscosity Test", titleArabic: "اختبار لزوجة البيتومين", category: "asphalt",
    lines: [
      { speaker: "engineer", english: "Measure the viscosity of the bitumen at 135 degrees.", arabic: "قس لزوجة البيتومين عند 135 درجة.", pronunciation: "ميجر ذا فيسكوسيتي أوف ذا بيتيومن أت 135 ديجريز." },
      { speaker: "technician", english: "I will use the rotational viscometer.", arabic: "هاستخدم مقياس اللزوجة الدوراني.", pronunciation: "آي ويل يوز ذا روتيشنال فيسكوميتر." },
      { speaker: "engineer", english: "What is the result?", arabic: "إيه النتيجة؟", pronunciation: "وات إز ذا ريزالت؟" },
      { speaker: "technician", english: "The viscosity is 350 centipoise.", arabic: "اللزوجة 350 سنتي بواز.", pronunciation: "ذا فيسكوسيتي إز ثري هاندرد أند فيفتي سينتيبويز." },
    ],
  },
];

