export interface Story {
  id: string;
  title: string;
  titleArabic: string;
  category: string;
  paragraphs: {
    english: string;
    arabic: string;
    pronunciation: string;
  }[];
}

export const stories: Story[] = [
  // ========== CONCRETE ==========
  {
    id: "cs1", title: "Slump Test Procedure", titleArabic: "إجراء اختبار الهبوط", category: "concrete",
    paragraphs: [
      { english: "The slump test is used to measure the workability of fresh concrete. First, clean the slump cone and the base plate with water.", arabic: "اختبار الهبوط يستخدم لقياس قابلية تشغيل الخرسانة الطازجة. أولاً، نظف قالب الهبوط واللوح الأساسي بالماء.", pronunciation: "ذا سلامب تيست إز يوزد تو ميجر ذا ووركابيليتي أوف فريش كونكريت. فيرست، كلين ذا سلامب كون أند ذا بيس بليت ويذ ووتر." },
      { english: "Fill the cone in three layers. Each layer should be compacted with 25 strokes using the tamping rod.", arabic: "املأ القالب في ثلاث طبقات. كل طبقة تُدمك بـ 25 ضربة باستخدام قضيب الدمك.", pronunciation: "فيل ذا كون إن ثري لايرز. إيتش لاير شود بي كومباكتد ويذ توينتي فايف ستروكس يوزينج ذا تامبينج رود." },
      { english: "After filling, strike off the top surface and carefully lift the cone vertically. Measure the difference in height between the cone and the concrete.", arabic: "بعد الملء، سوّي السطح العلوي وارفع القالب بعناية رأسياً. قس فرق الارتفاع بين القالب والخرسانة.", pronunciation: "أفتر فيلينج، سترايك أوف ذا توب سيرفيس أند كيرفولي ليفت ذا كون فيرتيكالي. ميجر ذا ديفرنس إن هايت بيتوين ذا كون أند ذا كونكريت." },
    ],
  },
  {
    id: "cs2", title: "Cube Casting and Curing", titleArabic: "صب ومعالجة المكعبات", category: "concrete",
    paragraphs: [
      { english: "Concrete cubes are cast to determine the compressive strength of concrete. The standard cube size is 150 millimeters.", arabic: "تُصب مكعبات الخرسانة لتحديد مقاومة الضغط. حجم المكعب القياسي 150 مليمتر.", pronunciation: "كونكريت كيوبز آر كاست تو ديتيرمين ذا كومبريسيف سترينث أوف كونكريت. ذا ستاندرد كيوب سايز إز وان هاندرد أند فيفتي ميليميترز." },
      { english: "Fill the mold in three layers and compact each layer with 35 strokes. After 24 hours, remove the cubes from the molds.", arabic: "املأ القالب في ثلاث طبقات وادمك كل طبقة بـ 35 ضربة. بعد 24 ساعة، أزل المكعبات من القوالب.", pronunciation: "فيل ذا مولد إن ثري لايرز أند كومباكت إيتش لاير ويذ ثيرتي فايف ستروكس. أفتر توينتي فور أورز، ريموف ذا كيوبز فروم ذا مولدز." },
      { english: "Place the cubes in a curing tank with water at 20 degrees Celsius. Test three cubes at 7 days and three at 28 days.", arabic: "ضع المكعبات في حوض معالجة بماء عند 20 درجة مئوية. اختبر ثلاث مكعبات بعد 7 أيام وثلاثة بعد 28 يوم.", pronunciation: "بليس ذا كيوبز إن أ كيورينج تانك ويذ ووتر أت توينتي ديجريز سيلسيوس. تيست ثري كيوبز أت سيفن ديز أند ثري أت توينتي إيت ديز." },
    ],
  },
  {
    id: "cs3", title: "Mix Design Basics", titleArabic: "أساسيات تصميم الخلطة", category: "concrete",
    paragraphs: [
      { english: "Concrete mix design determines the proportions of cement, water, fine aggregate, and coarse aggregate to achieve the required strength.", arabic: "تصميم خلطة الخرسانة يحدد نسب الأسمنت والماء والركام الناعم والخشن لتحقيق المقاومة المطلوبة.", pronunciation: "كونكريت ميكس ديزاين ديتيرمينز ذا بروبورشنز أوف سيمنت، ووتر، فاين أجريجيت، أند كورس أجريجيت تو أتشيف ذا ريكوايرد سترينث." },
      { english: "The water-cement ratio is the most important factor. A lower ratio gives higher strength but lower workability.", arabic: "نسبة الماء للأسمنت هي العامل الأهم. نسبة أقل تعطي مقاومة أعلى لكن قابلية تشغيل أقل.", pronunciation: "ذا ووتر سيمنت ريشيو إز ذا موست إمبورتانت فاكتور. أ لوور ريشيو جيفز هاير سترينث بت لوور ووركابيليتي." },
    ],
  },
  {
    id: "cs4", title: "Compressive Strength Testing", titleArabic: "اختبار مقاومة الضغط", category: "concrete",
    paragraphs: [
      { english: "The compressive strength test is performed using a compression testing machine. Place the cube between the plates of the machine.", arabic: "يتم اختبار مقاومة الضغط باستخدام ماكينة اختبار الضغط. ضع المكعب بين لوحات الماكينة.", pronunciation: "ذا كومبريسيف سترينث تيست إز بيرفورمد يوزينج أ كومبريشن تيستينج ماشين. بليس ذا كيوب بيتوين ذا بليتس أوف ذا ماشين." },
      { english: "Apply the load gradually at a rate of 0.6 megapascals per second until the cube fails. Record the maximum load.", arabic: "طبق الحمل تدريجياً بمعدل 0.6 ميجا باسكال في الثانية حتى ينهار المكعب. سجل أقصى حمل.", pronunciation: "أبلاي ذا لود جراجوالي أت أ ريت أوف بوينت سيكس ميجاباسكالز بير سيكند أنتيل ذا كيوب فيلز. ريكورد ذا ماكسيمم لود." },
    ],
  },
  {
    id: "cs5", title: "Concrete Quality Control", titleArabic: "ضبط جودة الخرسانة", category: "concrete",
    paragraphs: [
      { english: "Quality control of concrete involves checking the materials, mix proportions, and fresh and hardened properties of concrete.", arabic: "ضبط جودة الخرسانة يشمل فحص المواد ونسب الخلط وخواص الخرسانة الطازجة والمتصلدة.", pronunciation: "كواليتي كونترول أوف كونكريت إنفولفز تشيكينج ذا ماتيريالز، ميكس بروبورشنز، أند فريش أند هاردند بروبرتيز أوف كونكريت." },
      { english: "For fresh concrete, check the slump, temperature, and air content. For hardened concrete, test the compressive strength at 7 and 28 days.", arabic: "للخرسانة الطازجة، افحص الهبوط ودرجة الحرارة ومحتوى الهواء. للمتصلدة، اختبر مقاومة الضغط عند 7 و28 يوم.", pronunciation: "فور فريش كونكريت، تشيك ذا سلامب، تيمبريتشر، أند إير كونتنت. فور هاردند كونكريت، تيست ذا كومبريسيف سترينث أت سيفن أند توينتي إيت ديز." },
    ],
  },

  // ========== SOIL ==========
  {
    id: "ss1", title: "Proctor Compaction Test", titleArabic: "اختبار بروكتور للدمك", category: "soil",
    paragraphs: [
      { english: "The Proctor test determines the maximum dry density and optimum moisture content of soil. There are two types: Standard Proctor and Modified Proctor.", arabic: "اختبار بروكتور يحدد أقصى كثافة جافة ومحتوى الرطوبة الأمثل للتربة. نوعان: بروكتور القياسي والمعدل.", pronunciation: "ذا بروكتور تيست ديتيرمينز ذا ماكسيمم دراي دينسيتي أند أوبتيمم مويستشر كونتنت أوف سويل. ذير آر تو تايبز: ستاندرد بروكتور أند موديفايد بروكتور." },
      { english: "In the Standard Proctor test, use a 2.5 kilogram rammer dropped from 30 centimeters. Compact the soil in three layers with 25 blows each.", arabic: "في اختبار بروكتور القياسي، استخدم مطرقة 2.5 كيلو تُسقط من 30 سنتيمتر. ادمك التربة في ثلاث طبقات بـ 25 ضربة.", pronunciation: "إن ذا ستاندرد بروكتور تيست، يوز أ تو بوينت فايف كيلوجرام رامر دروبد فروم ثيرتي سينتيميترز. كومباكت ذا سويل إن ثري لايرز ويذ توينتي فايف بلوز إيتش." },
    ],
  },
  {
    id: "ss2", title: "Atterberg Limits", titleArabic: "حدود أتربيرج", category: "soil",
    paragraphs: [
      { english: "Atterberg limits define the moisture content at which soil changes behavior. The liquid limit is the moisture content where soil flows. The plastic limit is where soil crumbles.", arabic: "حدود أتربيرج تحدد محتوى الرطوبة الذي تتغير عنده سلوك التربة. حد السيولة هو الرطوبة التي تسيل عندها التربة. حد اللدونة هو حيث تتفتت.", pronunciation: "أتربيرج ليميتس ديفاين ذا مويستشر كونتنت أت ويتش سويل تشينجز بيهيفيور. ذا ليكويد ليميت إز ذا مويستشر كونتنت وير سويل فلوز. ذا بلاستيك ليميت إز وير سويل كرامبلز." },
      { english: "The plasticity index equals the liquid limit minus the plastic limit. A high plasticity index means the soil is highly plastic like clay.", arabic: "معامل اللدونة يساوي حد السيولة ناقص حد اللدونة. معامل لدونة عالي يعني التربة لدنة جداً مثل الطين.", pronunciation: "ذا بلاستيسيتي إنديكس إيكوالز ذا ليكويد ليميت ماينس ذا بلاستيك ليميت. أ هاي بلاستيسيتي إنديكس مينز ذا سويل إز هايلي بلاستيك لايك كلاي." },
    ],
  },
  {
    id: "ss3", title: "CBR Test Procedure", titleArabic: "إجراء اختبار CBR", category: "soil",
    paragraphs: [
      { english: "The California Bearing Ratio test measures the strength of subgrade soil. Soak the specimen for four days with a surcharge weight on top.", arabic: "اختبار نسبة تحمل كاليفورنيا يقيس قوة تربة الأساس. غمر العينة لأربعة أيام مع وزن حمل فوقها.", pronunciation: "ذا كاليفورنيا بيرينج ريشيو تيست ميجرز ذا سترينث أوف سابجريد سويل. سوك ذا سبيسيمن فور فور ديز ويذ أ سيرتشارج وايت أون توب." },
      { english: "After soaking, penetrate the soil at a rate of 1.27 millimeters per minute. Record the load at 2.5 and 5.0 millimeters penetration.", arabic: "بعد الغمر، اخترق التربة بمعدل 1.27 مليمتر في الدقيقة. سجل الحمل عند اختراق 2.5 و5.0 مليمتر.", pronunciation: "أفتر سوكينج، بينيتريت ذا سويل أت أ ريت أوف وان بوينت تو سيفن ميليميترز بير مينت. ريكورد ذا لود أت تو بوينت فايف أند فايف بوينت زيرو ميليميترز بينيتريشن." },
    ],
  },
  {
    id: "ss4", title: "Field Density Test", titleArabic: "اختبار الكثافة الحقلية", category: "soil",
    paragraphs: [
      { english: "The sand replacement method measures the in-place density of compacted soil. Dig a hole about 15 centimeters deep and weigh the removed soil.", arabic: "طريقة الاستبدال بالرمل تقيس الكثافة الموضعية للتربة المدموكة. احفر حفرة بعمق 15 سنتيمتر ووزن التربة المزالة.", pronunciation: "ذا ساند ريبليسمنت ميثود ميجرز ذا إن بليس دينسيتي أوف كومباكتد سويل. ديج أ هول أباوت فيفتين سينتيميترز ديب أند واي ذا ريموفد سويل." },
      { english: "Fill the hole with calibrated sand to determine the volume. Calculate the density by dividing the weight of soil by the volume of the hole.", arabic: "املأ الحفرة برمل معاير لتحديد الحجم. احسب الكثافة بقسمة وزن التربة على حجم الحفرة.", pronunciation: "فيل ذا هول ويذ كاليبريتد ساند تو ديتيرمين ذا فوليوم. كالكيوليت ذا دينسيتي باي ديفايدينج ذا وايت أوف سويل باي ذا فوليوم أوف ذا هول." },
    ],
  },
  {
    id: "ss5", title: "Sieve Analysis for Soil", titleArabic: "تحليل المناخل للتربة", category: "soil",
    paragraphs: [
      { english: "Sieve analysis determines the particle size distribution of soil. Dry the soil sample in the oven at 105 degrees Celsius for 24 hours.", arabic: "تحليل المناخل يحدد توزيع حجم الحبيبات للتربة. جفف عينة التربة في الفرن عند 105 درجة مئوية لمدة 24 ساعة.", pronunciation: "سيف أناليسيس ديتيرمينز ذا بارتيكل سايز ديستريبيوشن أوف سويل. دراي ذا سويل سامبل إن ذا أوفن أت وان هاندرد أند فايف ديجريز سيلسيوس فور توينتي فور أورز." },
      { english: "Stack the sieves from the largest opening on top to the smallest on the bottom. Shake for 10 to 15 minutes.", arabic: "رص المناخل من الأكبر فتحة في الأعلى للأصغر في الأسفل. هز لمدة 10 إلى 15 دقيقة.", pronunciation: "ستاك ذا سيفز فروم ذا لارجيست أوبنينج أون توب تو ذا سمولست أون ذا بوتوم. شيك فور تين تو فيفتين مينتس." },
    ],
  },

  // ========== ASPHALT ==========
  {
    id: "as1", title: "Marshall Mix Design", titleArabic: "تصميم خلطة مارشال", category: "asphalt",
    paragraphs: [
      { english: "The Marshall mix design method determines the optimum bitumen content for asphalt mixes. Prepare specimens at five different bitumen contents.", arabic: "طريقة تصميم خلطة مارشال تحدد نسبة البيتومين المثلى للخلطات الأسفلتية. جهز عينات عند خمس نسب بيتومين مختلفة.", pronunciation: "ذا مارشال ميكس ديزاين ميثود ديتيرمينز ذا أوبتيمم بيتيومن كونتنت فور أسفولت ميكسيز. بريبير سبيسيمنز أت فايف ديفرنت بيتيومن كونتنتس." },
      { english: "Compact each specimen with 75 blows on each side. Test for stability, flow, density, and air voids to find the optimum bitumen content.", arabic: "ادمك كل عينة بـ 75 ضربة على كل وجه. اختبر الثبات والانسياب والكثافة والفراغات الهوائية لإيجاد نسبة البيتومين المثلى.", pronunciation: "كومباكت إيتش سبيسيمن ويذ سيفنتي فايف بلوز أون إيتش سايد. تيست فور ستابيليتي، فلو، دينسيتي، أند إير فويدز تو فايند ذا أوبتيمم بيتيومن كونتنت." },
    ],
  },
  {
    id: "as2", title: "Penetration Test of Bitumen", titleArabic: "اختبار اختراق البيتومين", category: "asphalt",
    paragraphs: [
      { english: "The penetration test classifies bitumen by its hardness. Heat the bitumen and pour it into a container. Let it cool to 25 degrees Celsius.", arabic: "اختبار الاختراق يصنف البيتومين حسب صلابته. سخن البيتومين واصبه في وعاء. اتركه يبرد إلى 25 درجة مئوية.", pronunciation: "ذا بينيتريشن تيست كلاسيفايز بيتيومن باي إتس هاردنيس. هيت ذا بيتيومن أند بور إت إنتو أ كونتينر. ليت إت كول تو توينتي فايف ديجريز سيلسيوس." },
      { english: "Place the needle on the surface and release it for exactly 5 seconds. Measure the depth of penetration in tenths of a millimeter.", arabic: "ضع الإبرة على السطح واتركها لمدة 5 ثوانٍ بالضبط. قس عمق الاختراق بعشر المليمتر.", pronunciation: "بليس ذا نيدل أون ذا سيرفيس أند ريليس إت فور إجزاكتلي فايف سيكندز. ميجر ذا ديبث أوف بينيتريشن إن تينثس أوف أ ميليميتر." },
    ],
  },
  {
    id: "as3", title: "Softening Point Test", titleArabic: "اختبار نقطة التليين", category: "asphalt",
    paragraphs: [
      { english: "The softening point test uses the ring and ball method. Pour bitumen into two brass rings and let it solidify.", arabic: "اختبار نقطة التليين يستخدم طريقة الحلقة والكرة. اصب البيتومين في حلقتين نحاسيتين واتركه يتصلد.", pronunciation: "ذا سوفتنينج بوينت تيست يوزز ذا رينج أند بول ميثود. بور بيتيومن إنتو تو براس رينجز أند ليت إت سوليديفاي." },
      { english: "Place a steel ball on each ring and heat the water bath at a rate of 5 degrees per minute. The softening point is the temperature when the bitumen touches the bottom plate.", arabic: "ضع كرة فولاذية على كل حلقة وسخن حمام الماء بمعدل 5 درجات في الدقيقة. نقطة التليين هي درجة الحرارة عندما يلمس البيتومين اللوح السفلي.", pronunciation: "بليس أ ستيل بول أون إيتش رينج أند هيت ذا ووتر باث أت أ ريت أوف فايف ديجريز بير مينت. ذا سوفتنينج بوينت إز ذا تيمبريتشر وين ذا بيتيومن تاتشز ذا بوتوم بليت." },
    ],
  },
  {
    id: "as4", title: "Asphalt Paving Process", titleArabic: "عملية فرد الأسفلت", category: "asphalt",
    paragraphs: [
      { english: "Before paving, apply tack coat on the existing surface. The tack coat creates a bond between the old and new layers.", arabic: "قبل الفرد، ارش طبقة لاصقة على السطح الحالي. الطبقة اللاصقة تخلق رابطة بين الطبقة القديمة والجديدة.", pronunciation: "بيفور بيفينج، أبلاي تاك كوت أون ذا إجزيستينج سيرفيس. ذا تاك كوت كرييتس أ بوند بيتوين ذا أولد أند نيو لايرز." },
      { english: "The paver spreads the asphalt at the required thickness. Rollers follow immediately to compact the asphalt while it is still hot.", arabic: "الفرادة تفرد الأسفلت بالسمك المطلوب. الحادلات تتبعها فوراً لدمك الأسفلت وهو لسه ساخن.", pronunciation: "ذا بيفر سبريدز ذا أسفولت أت ذا ريكوايرد ثيكنيس. رولرز فولو إميديتلي تو كومباكت ذا أسفولت وايل إت إز ستيل هوت." },
    ],
  },
  {
    id: "as5", title: "Asphalt Quality Control", titleArabic: "ضبط جودة الأسفلت", category: "asphalt",
    paragraphs: [
      { english: "Quality control of asphalt involves testing materials, monitoring temperatures, and verifying compaction.", arabic: "ضبط جودة الأسفلت يشمل اختبار المواد ومراقبة درجات الحرارة والتحقق من الدمك.", pronunciation: "كواليتي كونترول أوف أسفولت إنفولفز تيستينج ماتيريالز، مونيتورينج تيمبريتشرز، أند فيريفايينج كومباكشن." },
      { english: "Monitor the mixing and compaction temperatures. Take core samples to verify the layer thickness and density after paving.", arabic: "راقب درجات حرارة الخلط والدمك. خذ عينات لبية للتحقق من سمك الطبقة والكثافة بعد الفرد.", pronunciation: "مونيتور ذا ميكسينج أند كومباكشن تيمبريتشرز. تيك كور سامبلز تو فيريفاي ذا لاير ثيكنيس أند دينسيتي أفتر بيفينج." },
    ],
  },

  // ========== AGGREGATE ==========
  {
    id: "ags1", title: "Sieve Analysis of Aggregates", titleArabic: "تحليل مناخل الركام", category: "general",
    paragraphs: [
      { english: "Sieve analysis is the most common test for aggregates. It determines the particle size distribution by passing the material through sieves.", arabic: "تحليل المناخل هو أكثر اختبار شائع للركام. يحدد توزيع حجم الحبيبات بتمرير المادة خلال المناخل.", pronunciation: "سيف أناليسيس إز ذا موست كومن تيست فور أجريجيتس. إت ديتيرمينز ذا بارتيكل سايز ديستريبيوشن باي باسينج ذا ماتيريال ثرو سيفز." },
      { english: "Weigh the material retained on each sieve. Calculate the percentage passing and plot the gradation curve.", arabic: "وزن المادة المتبقية على كل منخل. احسب نسبة المارة وارسم منحنى التدرج.", pronunciation: "واي ذا ماتيريال ريتيند أون إيتش سيف. كالكيوليت ذا بيرسينتيج باسينج أند بلوت ذا جريديشن كيرف." },
    ],
  },
  {
    id: "ags2", title: "Los Angeles Abrasion", titleArabic: "اختبار لوس أنجلوس", category: "general",
    paragraphs: [
      { english: "The Los Angeles abrasion test measures the resistance of aggregate to wear. Place the aggregate and steel balls in the rotating drum.", arabic: "اختبار لوس أنجلوس يقيس مقاومة الركام للتآكل. ضع الركام والكرات الفولاذية في الأسطوانة الدوارة.", pronunciation: "ذا لوس أنجيليس أبريجن تيست ميجرز ذا ريزيستانس أوف أجريجيت تو وير. بليس ذا أجريجيت أند ستيل بولز إن ذا روتيتينج درام." },
      { english: "Rotate the drum for 500 revolutions. The percentage of loss indicates the abrasion resistance.", arabic: "أدِر الأسطوانة لـ 500 دورة. نسبة الفقد تدل على مقاومة البري.", pronunciation: "روتيت ذا درام فور فايف هاندرد ريفوليوشنز. ذا بيرسينتيج أوف لوس إنديكيتس ذا أبريجن ريزيستانس." },
    ],
  },

  // ========== 50+ NEW STORIES ==========
  {
    id: "ns1", title: "Hot Weather Concreting", titleArabic: "صب الخرسانة في الحر", category: "concrete",
    paragraphs: [
      { english: "Hot weather can cause problems with concrete. High temperatures speed up the setting time and reduce workability.", arabic: "الطقس الحار ممكن يسبب مشاكل للخرسانة. الحرارة العالية بتسرع زمن الشك وتقلل قابلية التشغيل.", pronunciation: "هوت ويذر كان كوز بروبلمز ويذ كونكريت. هاي تيمبريتشرز سبيد أب ذا سيتينج تايم أند ريديوس ووركابيليتي." },
      { english: "To solve this, use chilled water or ice in the mix. Add a retarder to slow down setting. Cover the fresh concrete immediately.", arabic: "لحل المشكلة، استخدم ماء مثلج أو ثلج. ضيف مبطئ لتأخير الشك. غطي الخرسانة فوراً.", pronunciation: "تو سولف ذيس، يوز تشيلد ووتر أور آيس إن ذا ميكس. أد أ ريتاردر تو سلو داون سيتينج. كوفر ذا فريش كونكريت إميديتلي." },
    ],
  },
  {
    id: "ns2", title: "Soil Improvement Methods", titleArabic: "طرق تحسين التربة", category: "soil",
    paragraphs: [
      { english: "When the natural soil is too weak for construction, we use soil improvement methods. Chemical stabilization adds lime or cement to increase strength.", arabic: "لما التربة الطبيعية تكون ضعيفة للبناء، بنستخدم طرق تحسين التربة. التثبيت الكيميائي بيضيف جير أو أسمنت لزيادة القوة.", pronunciation: "وين ذا ناتشرال سويل إز تو ويك فور كونستراكشن، وي يوز سويل إمبروفمنت ميثودز. كيميكال ستابيلايزيشن أدز لايم أور سيمنت تو إنكريس سترينث." },
      { english: "Dynamic compaction drops a heavy weight from a crane. Stone columns use vibration to push gravel into weak soil layers.", arabic: "الدمك الديناميكي بيسقط وزن ثقيل من كرين. الأعمدة الحجرية بتستخدم الاهتزاز لدفع الزلط في الطبقات الضعيفة.", pronunciation: "داينامك كومباكشن دروبز أ هيفي وايت فروم أ كرين. ستون كولمنز يوز فايبريشن تو بوش جرافل إنتو ويك سويل لايرز." },
    ],
  },
  {
    id: "ns3", title: "Asphalt Plant Operations", titleArabic: "عمليات محطة الأسفلت", category: "asphalt",
    paragraphs: [
      { english: "An asphalt plant heats and mixes aggregate with bitumen to produce asphalt mix. The aggregate is dried and heated in a rotating drum.", arabic: "محطة الأسفلت بتسخن وتخلط الركام مع البيتومين. الركام بيتجفف ويتسخن في أسطوانة دوارة.", pronunciation: "أن أسفولت بلانت هيتس أند ميكسيز أجريجيت ويذ بيتيومن. ذا أجريجيت إز درايد أند هيتد إن أ روتيتينج درام." },
      { english: "The mixing temperature is typically 150 to 170 degrees. The finished mix is loaded into trucks and delivered within 2 hours.", arabic: "درجة حرارة الخلط عادة من 150 لـ 170 درجة. الخلطة الجاهزة بتتحمل وتوصل خلال ساعتين.", pronunciation: "ذا ميكسينج تيمبريتشر إز تيبيكالي وان فيفتي تو وان سيفنتي ديجريز. ذا فينيشد ميكس إز لودد أند ديليفرد ويذين تو أورز." },
    ],
  },
  {
    id: "ns4", title: "Laboratory Safety Rules", titleArabic: "قواعد سلامة المختبر", category: "general",
    paragraphs: [
      { english: "Safety is the first priority in any laboratory. Always wear PPE including safety glasses, gloves, and steel-toe boots.", arabic: "السلامة هي الأولوية الأولى. دايماً ارتدي معدات الحماية شاملة نظارات وجوانتي وبوت حديد.", pronunciation: "سيفتي إز ذا فيرست برايوريتي إن إني لابوراتوري. أولويز وير بي بي إي إنكلودينج سيفتي جلاسيز، جلوفز، أند ستيل تو بوتس." },
      { english: "Know the location of the fire extinguisher and first aid kit. Report any accidents immediately. Never work alone.", arabic: "اعرف مكان طفاية الحريق وصندوق الإسعافات. أبلغ عن أي حوادث فوراً. متشتغلش لوحدك.", pronunciation: "نو ذا لوكيشن أوف ذا فاير إكستينجويشر أند فيرست إيد كيت. ريبورت إني أكسيدنتس إميديتلي. نيفر وورك ألون." },
    ],
  },
  {
    id: "ns5", title: "Reinforcement Corrosion", titleArabic: "صدأ حديد التسليح", category: "concrete",
    paragraphs: [
      { english: "Reinforcement corrosion is the biggest problem affecting concrete durability. When steel rusts, it expands and cracks the concrete cover.", arabic: "صدأ حديد التسليح هو أكبر مشكلة تأثر على متانة الخرسانة. لما الحديد يصدي بيتمدد ويشرخ الغطاء.", pronunciation: "رينفورسمنت كوروجن إز ذا بيجست بروبلم أفيكتينج كونكريت ديورابيليتي. وين ستيل راستس، إت إكسباندز أند كراكس ذا كوفر." },
      { english: "To prevent corrosion, use adequate cover, low water-cement ratio, and high-quality concrete. In aggressive environments, use epoxy-coated reinforcement.", arabic: "لمنع الصدأ، استخدم غطاء كافي ونسبة ماء/أسمنت منخفضة وخرسانة عالية الجودة.", pronunciation: "تو بريفينت كوروجن، يوز أديكويت كوفر، لو ووتر سيمنت ريشيو، أند هاي كواليتي كونكريت." },
    ],
  },
  {
    id: "ns6", title: "Plate Bearing Test", titleArabic: "اختبار لوح التحمل", category: "soil",
    paragraphs: [
      { english: "The plate bearing test measures the load-bearing capacity of soil in the field. A steel plate is placed on the soil surface.", arabic: "اختبار لوح التحمل يقيس قدرة تحمل التربة في الحقل. لوح فولاذي يوضع على سطح التربة.", pronunciation: "ذا بليت بيرينج تيست ميجرز ذا لود بيرينج كاباسيتي أوف سويل. أ ستيل بليت إز بليسد أون ذا سويل سيرفيس." },
      { english: "Load is applied in increments using a hydraulic jack. Plot the load-settlement curve to find the bearing capacity.", arabic: "الحمل بيتطبق بالتدريج بجاك هيدروليكي. ارسم منحنى الحمل-الهبوط لإيجاد قدرة التحمل.", pronunciation: "لود إز أبلايد إن إنكريمنتس يوزينج أ هايدروليك جاك. بلوت ذا لود سيتلمنت كيرف تو فايند ذا بيرينج كاباسيتي." },
    ],
  },
  {
    id: "ns7", title: "Superpave Mix Design", titleArabic: "تصميم خلطة سوبربيف", category: "asphalt",
    paragraphs: [
      { english: "Superpave is a modern asphalt mix design method. It uses performance-graded bitumen based on climate conditions.", arabic: "سوبربيف هي طريقة حديثة لتصميم خلطة الأسفلت. بتستخدم بيتومين مصنف حسب الأداء.", pronunciation: "سوبربيف إز أ مودرن أسفولت ميكس ديزاين ميثود. إت يوزز بيرفورمانس جريدد بيتيومن." },
      { english: "The Superpave gyratory compactor simulates actual traffic conditions better than the Marshall method.", arabic: "ماكينة الدمك الدورانية سوبربيف بتحاكي ظروف المرور أحسن من طريقة مارشال.", pronunciation: "ذا سوبربيف جايراتوري كومباكتور سيميوليتس أكتشوال ترافيك كونديشنز بيتر ذان ذا مارشال ميثود." },
    ],
  },
  {
    id: "ns8", title: "Concrete Pump Operations", titleArabic: "عمليات مضخة الخرسانة", category: "concrete",
    paragraphs: [
      { english: "A concrete pump is used when the pouring location is difficult to reach. The pump pushes concrete through pipes.", arabic: "مضخة الخرسانة بتُستخدم لما مكان الصب يكون صعب الوصول. المضخة بتدفع الخرسانة في مواسير.", pronunciation: "أ كونكريت بامب إز يوزد وين ذا بورينج لوكيشن إز ديفيكلت تو ريتش. ذا بامب بوشيز كونكريت ثرو بايبس." },
      { english: "Before pumping, prime the line with mortar. The slump should be at least 100mm for pumpable concrete.", arabic: "قبل الضخ، ابدأ بالمونة. الهبوط لازم يكون 100 مليمتر على الأقل.", pronunciation: "بيفور بامبينج، برايم ذا لاين ويذ مورتار. ذا سلامب شود بي أت ليست وان هاندرد ميليميترز." },
    ],
  },
  {
    id: "ns9", title: "Geotechnical Investigation", titleArabic: "الاستكشاف الجيوتقني", category: "soil",
    paragraphs: [
      { english: "A geotechnical investigation is done before any construction project. Boreholes are drilled to collect soil samples at different depths.", arabic: "الاستكشاف الجيوتقني بيتعمل قبل أي مشروع بناء. بيتم حفر جسات لجمع عينات من أعماق مختلفة.", pronunciation: "أ جيوتيكنيكال إنفيستيجيشن إز دان بيفور إني كونستراكشن بروجيكت. بورهولز آر دريلد تو كوليكت سامبلز." },
      { english: "The samples are tested for classification, strength, and compressibility. The results help design the foundation.", arabic: "العينات بتتختبر للتصنيف والقوة والانضغاطية. النتائج بتساعد في تصميم الأساس.", pronunciation: "ذا سامبلز آر تيستد فور كلاسيفيكيشن، سترينث، أند كومبريسيبيليتي. ذا ريزالتس هيلب ديزاين ذا فاونديشن." },
    ],
  },
  {
    id: "ns10", title: "Asphalt Overlay", titleArabic: "طبقة أسفلت إضافية", category: "asphalt",
    paragraphs: [
      { english: "An asphalt overlay is a new layer placed on top of existing pavement. It improves ride quality and extends pavement life.", arabic: "الطبقة الإضافية هي طبقة أسفلت جديدة فوق الرصف الحالي. بتحسن جودة السير وبتطول عمر الرصف.", pronunciation: "أن أسفولت أوفرلاي إز أ نيو لاير بليسد أون توب. إت إمبروفز رايد كواليتي أند إكستيندز لايف." },
      { english: "Before applying the overlay, mill the existing surface if needed. Apply tack coat then spread the new mix.", arabic: "قبل وضع الطبقة، اكشط السطح لو لازم. ارش طبقة لاصقة وبعدين افرد الخلطة الجديدة.", pronunciation: "بيفور أبلايينج ذا أوفرلاي، ميل ذا سيرفيس إف نيدد. أبلاي تاك كوت ذين سبريد ذا نيو ميكس." },
    ],
  },
  {
    id: "ns11", title: "Concrete Coring", titleArabic: "عينات لبية من الخرسانة", category: "concrete",
    paragraphs: [
      { english: "Core samples are drilled from hardened concrete to verify strength when cube results are unsatisfactory.", arabic: "العينات اللبية بتتحفر من الخرسانة المتصلدة للتحقق من المقاومة.", pronunciation: "كور سامبلز آر دريلد فروم هاردند كونكريت تو فيريفاي سترينث." },
      { english: "The core diameter should be at least three times the maximum aggregate size.", arabic: "قطر اللب لازم يكون ثلاث مرات على الأقل من أكبر حجم ركام.", pronunciation: "ذا كور دايميتر شود بي أت ليست ثري تايمز ذا ماكسيمم أجريجيت سايز." },
    ],
  },
  {
    id: "ns12", title: "Unconfined Compression Test", titleArabic: "الضغط غير المحصور", category: "soil",
    paragraphs: [
      { english: "The unconfined compression test is a quick method to determine shear strength of cohesive soil.", arabic: "اختبار الضغط غير المحصور هو طريقة سريعة لتحديد مقاومة القص للتربة المتماسكة.", pronunciation: "ذا أنكونفايند كومبريشن تيست إز أ كويك ميثود تو ديتيرمين شير سترينث." },
      { english: "Apply the load at a constant rate until the sample fails. The strength equals the maximum load divided by the area.", arabic: "طبق الحمل بمعدل ثابت لحد ما العينة تنهار. المقاومة تساوي أقصى حمل مقسوم على المساحة.", pronunciation: "أبلاي ذا لود أت أ كونستانت ريت. ذا سترينث إيكوالز ذا ماكسيمم لود ديفايدد باي ذا إيريا." },
    ],
  },
  {
    id: "ns13", title: "Equipment Calibration", titleArabic: "معايرة المعدات", category: "general",
    paragraphs: [
      { english: "All laboratory equipment must be calibrated regularly to ensure accurate results.", arabic: "كل معدات المختبر لازم تتعاير بانتظام لضمان نتائج دقيقة.", pronunciation: "أول لابوراتوري إكويبمنت ماست بي كاليبريتد ريجيولارلي." },
      { english: "Keep records of all calibrations including the date and the standard used. Display the certificate near each equipment.", arabic: "احتفظ بسجلات كل المعايرات. اعرض شهادة المعايرة جنب كل قطعة معدات.", pronunciation: "كيب ريكوردز أوف أول كاليبريشنز. ديسبلاي ذا سيرتيفيكيت نير إيتش إكويبمنت." },
    ],
  },
  {
    id: "ns14", title: "Self-Compacting Concrete", titleArabic: "الخرسانة ذاتية الدمك", category: "concrete",
    paragraphs: [
      { english: "Self-compacting concrete flows and fills the formwork without vibration. It uses high amounts of fine materials and admixtures.", arabic: "الخرسانة ذاتية الدمك بتسيل وتملأ الشدة بدون هز. بتستخدم كمية عالية من المواد الناعمة.", pronunciation: "سيلف كومباكتينج كونكريت فلوز أند فيلز ذا فورم وورك ويذاوت فايبريشن." },
      { english: "Three tests are used: slump flow, L-box, and V-funnel. The slump flow should be 600 to 750 millimeters.", arabic: "ثلاث اختبارات بتُستخدم: انسياب الهبوط وصندوق L وقمع V. انسياب الهبوط 600 لـ 750 مليمتر.", pronunciation: "ثري تيستس آر يوزد: سلامب فلو، إل بوكس، أند في فانل." },
    ],
  },
  {
    id: "ns15", title: "Concrete Curing Methods", titleArabic: "طرق معالجة الخرسانة", category: "concrete",
    paragraphs: [
      { english: "Curing keeps concrete moist to allow cement hydration. Water curing is the most effective method.", arabic: "المعالجة بتحافظ على رطوبة الخرسانة لإتمام تفاعل الأسمنت. المعالجة بالماء هي أفضل طريقة.", pronunciation: "كيورينج كيبز كونكريت مويست تو ألاو سيمنت هايدريشن. ووتر كيورينج إز ذا موست إفيكتيف." },
      { english: "Other methods include covering with wet burlap, using curing compounds, or steam curing for precast elements.", arabic: "طرق تانية تشمل التغطية بالخيش المبلل واستخدام مركبات المعالجة والمعالجة بالبخار.", pronunciation: "أذر ميثودز إنكلود كوفرينج ويذ ويت بيرلاب، يوزينج كيورينج كومباوندز، أور ستيم كيورينج." },
    ],
  },
  {
    id: "ns16", title: "Soil Bearing Capacity", titleArabic: "قدرة تحمل التربة", category: "soil",
    paragraphs: [
      { english: "Bearing capacity is the maximum pressure that soil can support without failure. It depends on soil type, depth, and water table.", arabic: "قدرة التحمل هي أقصى ضغط تتحمله التربة بدون انهيار. بتعتمد على نوع التربة والعمق ومنسوب المياه.", pronunciation: "بيرينج كاباسيتي إز ذا ماكسيمم بريشر ذات سويل كان سابورت. إت ديبيندز أون سويل تايب، ديبث، أند ووتر تيبل." },
      { english: "The allowable bearing capacity includes a safety factor. For residential buildings, it is typically 100 to 200 kilopascals.", arabic: "قدرة التحمل المسموحة بتشمل معامل أمان. للمباني السكنية، عادة 100 لـ 200 كيلو باسكال.", pronunciation: "ذا ألاوابل بيرينج كاباسيتي إنكلودز أ سيفتي فاكتور." },
    ],
  },
  {
    id: "ns17", title: "Ductility Test", titleArabic: "اختبار المطيلية", category: "asphalt",
    paragraphs: [
      { english: "The ductility test measures how far bitumen can stretch before breaking.", arabic: "اختبار المطيلية يقيس مدى استطالة البيتومين قبل الكسر.", pronunciation: "ذا داكتيليتي تيست ميجرز هاو فار بيتيومن كان ستريتش بيفور بريكينج." },
      { english: "Pull the briquette at 50 millimeters per minute in water at 25 degrees. Record the distance at breaking.", arabic: "اسحب العينة بمعدل 50 مليمتر في الدقيقة في ماء 25 درجة. سجل مسافة الكسر.", pronunciation: "بول ذا بريكيت أت فيفتي ميليميترز بير مينت. ريكورد ذا ديستانس أت بريكينج." },
    ],
  },
  {
    id: "ns18", title: "Flash Point Test", titleArabic: "اختبار نقطة الوميض", category: "asphalt",
    paragraphs: [
      { english: "The flash point is the lowest temperature at which bitumen vapors ignite briefly. This test is important for safety.", arabic: "نقطة الوميض هي أقل درجة حرارة تشتعل فيها أبخرة البيتومين. الاختبار مهم للسلامة.", pronunciation: "ذا فلاش بوينت إز ذا لويست تيمبريتشر ويتش بيتيومن فيبورز إجنايت. إت إز إمبورتانت فور سيفتي." },
      { english: "Use the Cleveland open cup method. Heat the bitumen and pass a flame over the surface.", arabic: "استخدم طريقة كليفلاند المفتوحة. سخن البيتومين ومرر لهب فوق السطح.", pronunciation: "يوز ذا كليفلاند أوبن كاب ميثود. هيت ذا بيتيومن أند باس أ فليم أوفر ذا سيرفيس." },
    ],
  },
  {
    id: "ns19", title: "Concrete Admixtures Guide", titleArabic: "دليل إضافات الخرسانة", category: "concrete",
    paragraphs: [
      { english: "Admixtures are chemicals added to concrete to modify its properties. Plasticizers improve workability without adding water.", arabic: "الإضافات مواد كيميائية تُضاف للخرسانة لتعديل خواصها. الملدنات بتحسن قابلية التشغيل.", pronunciation: "أدميكستشرز آر كيميكالز أدد تو كونكريت. بلاستيسايزرز إمبروف ووركابيليتي." },
      { english: "Retarders slow setting time. Accelerators speed it up. Air-entraining agents create tiny bubbles for durability.", arabic: "المبطئات بتبطئ زمن الشك. المسرعات بتسرعه. عوامل الهواء بتخلق فقاعات للمتانة.", pronunciation: "ريتاردرز سلو سيتينج. أكسيليريتورز سبيد إت أب. إير إنتريننج إيجنتس كريت بابلز." },
    ],
  },
  {
    id: "ns20", title: "Permeability Test", titleArabic: "اختبار النفاذية", category: "soil",
    paragraphs: [
      { english: "The permeability test measures how fast water flows through soil. For coarse soil, use the constant head method.", arabic: "اختبار النفاذية يقيس سرعة تدفق الماء خلال التربة. للتربة الخشنة، استخدم طريقة الضاغط الثابت.", pronunciation: "ذا بيرميابيليتي تيست ميجرز هاو فاست ووتر فلوز ثرو سويل." },
      { english: "For fine soil like clay, use the falling head method. Record the time for the water level to drop.", arabic: "للتربة الناعمة كالطين، استخدم طريقة الضاغط المتناقص.", pronunciation: "فور فاين سويل لايك كلاي، يوز ذا فولينج هيد ميثود." },
    ],
  },
  {
    id: "ns21", title: "Concrete Segregation Prevention", titleArabic: "منع انفصال الخرسانة", category: "concrete",
    paragraphs: [
      { english: "Segregation is the separation of concrete components. Coarse aggregates separate from the mortar.", arabic: "الانفصال الحبيبي هو انفصال مكونات الخرسانة عن بعض.", pronunciation: "سيجريجيشن إز ذا سيباريشن أوف كونكريت كومبوننتس." },
      { english: "To prevent segregation, avoid dropping concrete from more than 1.5 meters. Use proper vibration.", arabic: "لمنع الانفصال، تجنب إسقاط الخرسانة من أكثر من 1.5 متر. استخدم هز مناسب.", pronunciation: "تو بريفينت سيجريجيشن، أفويد دروبينج كونكريت فروم مور ذان وان بوينت فايف ميترز." },
    ],
  },
  {
    id: "ns22", title: "Direct Shear Test", titleArabic: "اختبار القص المباشر", category: "soil",
    paragraphs: [
      { english: "The direct shear test measures the shear strength of soil. Place the soil in a split box and apply a normal force.", arabic: "اختبار القص المباشر يقيس مقاومة القص للتربة. ضع التربة في صندوق مشقوق.", pronunciation: "ذا دايريكت شير تيست ميجرز ذا شير سترينث. بليس ذا سويل إن أ سبليت بوكس." },
      { english: "Apply a horizontal force to shear the soil. Repeat at three different normal stresses.", arabic: "طبق قوة أفقية لقص التربة. كرر عند ثلاث إجهادات مختلفة.", pronunciation: "أبلاي أ هوريزونتال فورس. ريبيت أت ثري ديفرنت ستريسز." },
    ],
  },
  {
    id: "ns23", title: "Emulsion Application", titleArabic: "استخدام المستحلب", category: "asphalt",
    paragraphs: [
      { english: "Bitumen emulsion is a mixture of bitumen, water, and emulsifying agent. It can be applied at room temperature.", arabic: "مستحلب البيتومين خليط من البيتومين والماء ومادة استحلاب. ممكن يتطبق في درجة حرارة الغرفة.", pronunciation: "بيتيومن إيمالشن إز أ ميكستشر أوف بيتيومن أند ووتر. إت كان بي أبلايد أت روم تيمبريتشر." },
      { english: "Emulsions are classified as rapid, medium, or slow setting. They are used for tack coats and surface treatments.", arabic: "المستحلبات بتتصنف سريعة ومتوسطة وبطيئة التفكك.", pronunciation: "إيمالشنز آر كلاسيفايد أز رابيد، ميديم، أور سلو سيتينج." },
    ],
  },
  {
    id: "ns24", title: "Concrete Water-Cement Ratio", titleArabic: "نسبة الماء للأسمنت", category: "concrete",
    paragraphs: [
      { english: "The water-cement ratio is the weight of water divided by the weight of cement. It is the key factor affecting strength.", arabic: "نسبة الماء للأسمنت هي وزن الماء مقسوماً على وزن الأسمنت. هي العامل الرئيسي المؤثر على المقاومة.", pronunciation: "ذا ووتر سيمنت ريشيو إز ذا وايت أوف ووتر ديفايدد باي سيمنت وايت. إت إز ذا كي فاكتور." },
      { english: "A typical ratio for structural concrete is 0.40 to 0.50. Higher ratios result in weaker concrete.", arabic: "نسبة نموذجية للخرسانة الإنشائية 0.40 إلى 0.50. النسب الأعلى تنتج خرسانة أضعف.", pronunciation: "أ تيبيكال ريشيو إز بوينت فور تو بوينت فايف. هاير ريشيوز ريزالت إن ويكر كونكريت." },
    ],
  },
  {
    id: "ns25", title: "Consolidation Test", titleArabic: "اختبار الانضغاط", category: "soil",
    paragraphs: [
      { english: "The consolidation test measures how much clay will compress under load over time. It is essential for predicting settlement.", arabic: "اختبار الانضغاط يقيس مقدار انضغاط الطين تحت الحمل. ضروري للتنبؤ بالهبوط.", pronunciation: "ذا كونسوليديشن تيست ميجرز هاو ماتش كلاي ويل كومبريس. إت إز إسينشال فور بريديكتينج سيتلمنت." },
      { english: "Place the soil in the oedometer ring. Apply loads in increments and measure the compression at each stage.", arabic: "ضع التربة في حلقة الأوديوميتر. طبق الأحمال بالتدريج وقس الانضغاط.", pronunciation: "بليس ذا سويل إن ذا أوديوميتر رينج. أبلاي لودز إن إنكريمنتس." },
    ],
  },
  {
    id: "ns26", title: "Viscosity Testing", titleArabic: "اختبار اللزوجة", category: "asphalt",
    paragraphs: [
      { english: "Viscosity measures the resistance of bitumen to flow. It is tested at 135 degrees for mixing temperature.", arabic: "اللزوجة تقيس مقاومة البيتومين للتدفق. تُختبر عند 135 درجة لحرارة الخلط.", pronunciation: "فيسكوسيتي ميجرز ذا ريزيستانس أوف بيتيومن تو فلو." },
      { english: "Use the rotational viscometer. The spindle rotates in the bitumen. The torque indicates the viscosity.", arabic: "استخدم مقياس اللزوجة الدوراني. المغزل يدور في البيتومين.", pronunciation: "يوز ذا روتيشنال فيسكوميتر. ذا تورك إنديكيتس ذا فيسكوسيتي." },
    ],
  },
  {
    id: "ns27", title: "Aggregate Impact Value", titleArabic: "قيمة تأثير الركام", category: "general",
    paragraphs: [
      { english: "The aggregate impact value test measures toughness. Fill the cup with aggregate between 10mm and 14mm.", arabic: "اختبار قيمة تأثير الركام يقيس المتانة. املأ الكوب بركام بين 10 و14 مليمتر.", pronunciation: "ذا أجريجيت إمباكت فاليو تيست ميجرز تافنيس." },
      { english: "Drop the hammer 15 times from 380 millimeters. Sieve and calculate the percentage of fines.", arabic: "أسقط المطرقة 15 مرة من 380 مليمتر. غربل واحسب نسبة الناعم.", pronunciation: "دروب ذا هامر فيفتين تايمز. سيف أند كالكيوليت ذا بيرسينتيج أوف فاينز." },
    ],
  },
  {
    id: "ns28", title: "Concrete Formwork Removal", titleArabic: "فك الشدة الخشبية", category: "concrete",
    paragraphs: [
      { english: "Formwork removal timing depends on the concrete element type. For columns, remove after 24 hours minimum.", arabic: "توقيت فك الشدة بيعتمد على نوع العنصر الخرساني. للأعمدة، فك بعد 24 ساعة على الأقل.", pronunciation: "فورم وورك ريموفال تايمينج ديبيندز أون ذا إليمنت تايب." },
      { english: "For beams and slabs, wait at least 14 days. Do not remove props until the concrete reaches sufficient strength.", arabic: "للكمرات والبلاطات، استنى 14 يوم على الأقل. متشيلش الدعامات لحد ما الخرسانة تقوى.", pronunciation: "فور بيمز أند سلابز، ويت أت ليست فورتين ديز." },
    ],
  },
  {
    id: "ns29", title: "Specific Gravity of Soil", titleArabic: "الكثافة النوعية للتربة", category: "soil",
    paragraphs: [
      { english: "The specific gravity of soil solids is the ratio of soil particle density to water density. Use a pycnometer.", arabic: "الكثافة النوعية هي نسبة كثافة الحبيبات لكثافة الماء. استخدم البيكنوميتر.", pronunciation: "ذا سبيسيفيك جرافيتي إز ذا ريشيو أوف سويل بارتيكل دينسيتي تو ووتر دينسيتي." },
      { english: "Remove air bubbles by boiling for 10 minutes. The typical specific gravity for sandy soil is 2.65.", arabic: "أزل فقاعات الهواء بالغلي 10 دقائق. الكثافة النوعية النموذجية للرمل 2.65.", pronunciation: "ريموف إير بابلز باي بويلينج. ذا تيبيكال فاليو فور ساندي سويل إز تو بوينت سيكس فايف." },
    ],
  },
  {
    id: "ns30", title: "Core Sampling from Pavement", titleArabic: "عينات لبية من الرصف", category: "asphalt",
    paragraphs: [
      { english: "Core samples are taken from finished pavement to verify thickness, density, and composition.", arabic: "العينات اللبية بتتاخد من الرصف المكتمل للتحقق من السمك والكثافة والتركيب.", pronunciation: "كور سامبلز آر تيكن فروم فينيشد بيفمنت تو فيريفاي ثيكنيس أند دينسيتي." },
      { english: "Use a core drilling machine with a 100mm or 150mm bit. Measure the core thickness and compare with design.", arabic: "استخدم ماكينة حفر بقطر 100 أو 150 مليمتر. قيس سمك اللب وقارنه بالتصميم.", pronunciation: "يوز أ كور دريلينج ماشين. ميجر ذا ثيكنيس أند كومبير ويذ ديزاين." },
    ],
  },
  {
    id: "ns31", title: "Concrete Pouring in Rain", titleArabic: "صب الخرسانة في المطر", category: "concrete",
    paragraphs: [
      { english: "Pouring concrete in rain can dilute the mix and weaken the surface. Stop pouring if heavy rain starts.", arabic: "صب الخرسانة في المطر ممكن يخفف الخلطة ويضعف السطح. وقف الصب لو المطر غزير.", pronunciation: "بورينج كونكريت إن رين كان دايليوت ذا ميكس. ستوب بورينج إف هيفي رين ستارتس." },
      { english: "If light rain falls, cover the fresh concrete with plastic sheets immediately.", arabic: "لو المطر خفيف، غطي الخرسانة بملاءات بلاستيك فوراً.", pronunciation: "إف لايت رين فولز، كوفر ذا فريش كونكريت ويذ بلاستيك شيتس." },
    ],
  },
  {
    id: "ns32", title: "Moisture Content Determination", titleArabic: "تحديد محتوى الرطوبة", category: "soil",
    paragraphs: [
      { english: "The moisture content is the ratio of water weight to dry soil weight. Weigh the wet sample then dry it at 110 degrees.", arabic: "محتوى الرطوبة هو نسبة وزن الماء لوزن التربة الجافة. وزن العينة الرطبة ثم جففها عند 110 درجة.", pronunciation: "ذا مويستشر كونتنت إز ذا ريشيو أوف ووتر وايت تو دراي سويل وايت." },
      { english: "After drying, weigh the dry soil. Moisture content equals the difference divided by dry weight times 100.", arabic: "بعد التجفيف، وزن التربة الجافة. الرطوبة = الفرق ÷ الوزن الجاف × 100.", pronunciation: "أفتر درايينج، واي ذا دراي سويل. مويستشر كونتنت إيكوالز ذا ديفرنس." },
    ],
  },
  {
    id: "ns33", title: "Water Absorption of Aggregate", titleArabic: "امتصاص الماء للركام", category: "general",
    paragraphs: [
      { english: "Water absorption is the percentage of water that aggregate absorbs when soaked. It affects the water in concrete mix.", arabic: "امتصاص الماء هو نسبة الماء اللي الركام بيمتصها. بيأثر على الماء في خلطة الخرسانة.", pronunciation: "ووتر أبسوربشن إز ذا بيرسينتيج أوف ووتر أبسوربد. إت أفيكتس ذا ووتر إن ميكس." },
      { english: "Soak for 24 hours, dry the surface and weigh. Then oven dry. The difference is the absorption.", arabic: "غمر 24 ساعة، جفف السطح ووزن. ثم جفف بالفرن. الفرق هو الامتصاص.", pronunciation: "سوك فور توينتي فور أورز. ذا ديفرنس إز ذا أبسوربشن." },
    ],
  },
  {
    id: "ns34", title: "Concrete Joint Types", titleArabic: "أنواع فواصل الخرسانة", category: "concrete",
    paragraphs: [
      { english: "There are three main types of concrete joints: expansion joints, contraction joints, and construction joints.", arabic: "فيه ثلاث أنواع رئيسية من فواصل الخرسانة: تمدد وانكماش وفواصل صب.", pronunciation: "ذير آر ثري مين تايبز أوف كونكريت جوينتس: إكسبانشن، كونتراكشن، أند كونستراكشن." },
      { english: "Expansion joints allow the concrete to expand with temperature changes. Contraction joints control cracking.", arabic: "فواصل التمدد بتسمح للخرسانة تتمدد مع الحرارة. فواصل الانكماش بتتحكم في الشروخ.", pronunciation: "إكسبانشن جوينتس ألاو إكسبانشن. كونتراكشن جوينتس كونترول كراكينج." },
    ],
  },
  {
    id: "ns35", title: "Vane Shear Test", titleArabic: "اختبار القص بالريشة", category: "soil",
    paragraphs: [
      { english: "The vane shear test is a quick field test for soft clay. Push the vane into the soil and rotate it.", arabic: "اختبار القص بالريشة هو اختبار حقلي سريع للطين الناعم. ادفع الريشة في التربة ولفها.", pronunciation: "ذا فين شير تيست إز أ كويك فيلد تيست فور سوفت كلاي." },
      { english: "The torque at failure gives the undrained shear strength. This test is fast and does not need laboratory equipment.", arabic: "العزم عند الانهيار بيعطي مقاومة القص غير المصرفة. الاختبار سريع.", pronunciation: "ذا تورك أت فيليور جيفز ذا أندريند شير سترينث." },
    ],
  },
  {
    id: "ns36", title: "Aggregate Crushing Value", titleArabic: "قيمة سحق الركام", category: "general",
    paragraphs: [
      { english: "The aggregate crushing value test measures resistance to crushing under compressive load.", arabic: "اختبار قيمة سحق الركام يقيس مقاومة السحق تحت حمل الضغط.", pronunciation: "ذا أجريجيت كراشينج فاليو تيست ميجرز ريزيستانس تو كراشينج." },
      { english: "Fill the cylinder with aggregate. Apply 400 kilonewtons over 10 minutes. Sieve and weigh the fines.", arabic: "املأ الأسطوانة بالركام. طبق 400 كيلونيوتن على مدى 10 دقائق.", pronunciation: "فيل ذا سيلندر. أبلاي فور هاندرد كيلونيوتنز أوفر تين مينتس." },
    ],
  },
  {
    id: "ns37", title: "Precast Concrete Elements", titleArabic: "عناصر خرسانية مسبقة الصب", category: "concrete",
    paragraphs: [
      { english: "Precast concrete elements are manufactured in a factory and transported to the construction site.", arabic: "العناصر الخرسانية مسبقة الصب بتُصنع في مصنع وتتنقل للموقع.", pronunciation: "بريكاست كونكريت إليمنتس آر مانيوفاكتشرد إن أ فاكتوري." },
      { english: "Quality control is easier in a factory environment. Steam curing can accelerate strength development.", arabic: "ضبط الجودة أسهل في بيئة المصنع. المعالجة بالبخار بتسرع تطور المقاومة.", pronunciation: "كواليتي كونترول إز إيزير إن أ فاكتوري. ستيم كيورينج أكسيليريتس سترينث." },
    ],
  },
  {
    id: "ns38", title: "Soil Classification Systems", titleArabic: "أنظمة تصنيف التربة", category: "soil",
    paragraphs: [
      { english: "The Unified Soil Classification System is the most widely used. It classifies soil based on grain size and plasticity.", arabic: "النظام الموحد لتصنيف التربة هو الأكثر استخداماً. بيصنف التربة حسب حجم الحبيبات واللدونة.", pronunciation: "ذا يونيفايد سويل كلاسيفيكيشن سيستم إز ذا موست وايدلي يوزد." },
      { english: "Coarse-grained soils are classified by sieve analysis. Fine-grained soils are classified by Atterberg limits.", arabic: "التربة خشنة الحبيبات بتتصنف بتحليل المناخل. الناعمة بحدود أتربيرج.", pronunciation: "كورس جريند سويلز آر كلاسيفايد باي سيف أناليسيس." },
    ],
  },
  {
    id: "ns39", title: "Road Pavement Layers", titleArabic: "طبقات الرصف", category: "asphalt",
    paragraphs: [
      { english: "A road pavement consists of several layers: subgrade, sub-base, base course, binder course, and wearing course.", arabic: "رصف الطريق بيتكون من طبقات: تربة الأساس وتحت الأساس والأساس والرابطة والسطحية.", pronunciation: "أ رود بيفمنت كونسيستس أوف سيفرال لايرز: سابجريد، ساب بيس، بيس، بايندر، أند ويرينج كورس." },
      { english: "Each layer must be compacted and tested before applying the next one.", arabic: "كل طبقة لازم تتدمك وتتختبر قبل وضع الطبقة التالية.", pronunciation: "إيتش لاير ماست بي كومباكتد أند تيستد بيفور أبلايينج ذا نيكست وان." },
    ],
  },
  {
    id: "ns40", title: "Soundness Test for Aggregate", titleArabic: "اختبار متانة الركام", category: "general",
    paragraphs: [
      { english: "The soundness test checks how well aggregate resists weathering. Soak in sodium sulfate solution for 16 hours.", arabic: "اختبار المتانة يفحص مقاومة الركام للتجوية. غمر في محلول كبريتات الصوديوم 16 ساعة.", pronunciation: "ذا ساوندنيس تيست تشيكس ويذيرينج ريزيستانس. سوك إن سوديوم سالفيت فور سيكستين أورز." },
      { english: "Dry and repeat for 5 cycles. The weight loss should not exceed 12 percent.", arabic: "جفف وكرر لـ 5 دورات. فقد الوزن ما يتجاوزش 12 بالمائة.", pronunciation: "دراي أند ريبيت فور فايف سايكلز. وايت لوس شود نوت إكسيد توليف بيرسينت." },
    ],
  },
  {
    id: "ns41", title: "Fiber Reinforced Concrete", titleArabic: "خرسانة مسلحة بالألياف", category: "concrete",
    paragraphs: [
      { english: "Fiber reinforced concrete contains steel, glass, or polypropylene fibers. Fibers improve tensile strength and crack resistance.", arabic: "الخرسانة المسلحة بالألياف فيها ألياف حديد أو زجاج أو بولي بروبيلين. الألياف بتحسن مقاومة الشد.", pronunciation: "فايبر رينفورسد كونكريت كونتينز ستيل، جلاس، أور بولي بروبيلين فايبرز." },
      { english: "The fiber dosage is typically 0.5 to 2 percent by volume. Mix the fibers carefully to avoid balling.", arabic: "جرعة الألياف عادة 0.5 لـ 2 بالمائة بالحجم. اخلط الألياف بعناية.", pronunciation: "ذا فايبر دوسيج إز تيبيكالي بوينت فايف تو تو بيرسينت." },
    ],
  },
  {
    id: "ns42", title: "SPT Standard Penetration Test", titleArabic: "اختبار الاختراق القياسي", category: "soil",
    paragraphs: [
      { english: "The Standard Penetration Test counts the blows needed to drive a sampler 300mm into soil. It indicates soil strength.", arabic: "اختبار الاختراق القياسي بيحسب الضربات المطلوبة لدفع عينة 300 مليمتر في التربة.", pronunciation: "ذا ستاندرد بينيتريشن تيست كاونتس ذا بلوز نيدد تو درايف أ سامبلر." },
      { english: "The N-value helps classify soil density. An N-value above 30 indicates dense sand.", arabic: "قيمة N بتساعد تصنف كثافة التربة. قيمة فوق 30 تعني رمل كثيف.", pronunciation: "ذا إن فاليو هيلبز كلاسيفاي دينسيتي. أبوف ثيرتي مينز دينس ساند." },
    ],
  },
  {
    id: "ns43", title: "Recycled Asphalt Pavement", titleArabic: "أسفلت معاد التدوير", category: "asphalt",
    paragraphs: [
      { english: "Recycled asphalt pavement reuses old asphalt material. The old material is milled, crushed, and mixed with new material.", arabic: "الأسفلت المعاد التدوير بيعيد استخدام المادة القديمة. بيتكشط ويتكسر ويتخلط بمادة جديدة.", pronunciation: "ريسايكلد أسفولت ريوزز أولد ماتيريال. إت إز ميلد، كراشد، أند ميكسد ويذ نيو." },
      { english: "Using RAP reduces costs and is environmentally friendly. Up to 30 percent RAP can be used in new mixes.", arabic: "استخدام RAP بيقلل التكاليف وصديق للبيئة. ممكن نستخدم لحد 30 بالمائة.", pronunciation: "يوزينج آر إي بي ريديوسز كوستس. أب تو ثيرتي بيرسينت كان بي يوزد." },
    ],
  },
  {
    id: "ns44", title: "Concrete Bleeding Causes", titleArabic: "أسباب نزف الخرسانة", category: "concrete",
    paragraphs: [
      { english: "Bleeding is the rise of water to the concrete surface after pouring. It is caused by high water content or poor gradation.", arabic: "النزف هو صعود الماء لسطح الخرسانة بعد الصب. بيحصل بسبب ماء زيادة أو تدرج سيء.", pronunciation: "بليدينج إز ذا رايز أوف ووتر تو ذا سيرفيس. إت إز كوزد باي هاي ووتر أور بور جريديشن." },
      { english: "Excessive bleeding weakens the surface. Use proper mix design and avoid over-vibration to reduce bleeding.", arabic: "النزف الزائد بيضعف السطح. استخدم خلطة مناسبة ومتهزش زيادة.", pronunciation: "إكسيسيف بليدينج ويكنز ذا سيرفيس. يوز بروبر ميكس ديزاين." },
    ],
  },
  {
    id: "ns45", title: "Flakiness and Elongation Tests", titleArabic: "اختبارات التفلطح والاستطالة", category: "general",
    paragraphs: [
      { english: "Flaky and elongated particles weaken aggregate structure. The flakiness index measures flat particles.", arabic: "الحبيبات المفلطحة والمستطالة تضعف بنية الركام. معامل التفلطح يقيس الحبيبات المسطحة.", pronunciation: "فليكي بارتيكلز ويكن ستراكتشر. ذا فليكينيس إنديكس ميجرز فلات بارتيكلز." },
      { english: "Pass aggregate through the thickness gauge. The combined index should not exceed 35 percent.", arabic: "مرر الركام خلال مقياس السمك. المجموع ما يزيدش عن 35 بالمائة.", pronunciation: "باس ثرو ذا ثيكنيس جيج. ذا كومبايند شود نوت إكسيد ثيرتي فايف." },
    ],
  },
  {
    id: "ns46", title: "High-Strength Concrete", titleArabic: "خرسانة عالية المقاومة", category: "concrete",
    paragraphs: [
      { english: "High-strength concrete has compressive strength above 60 MPa. It uses low water-cement ratio and silica fume.", arabic: "الخرسانة عالية المقاومة مقاومتها أعلى من 60 ميجا باسكال. بتستخدم نسبة ماء منخفضة وسيليكا فيوم.", pronunciation: "هاي سترينث كونكريت هاز سترينث أبوف سيكستي ميجاباسكالز." },
      { english: "Superplasticizers are essential to achieve good workability at low water content.", arabic: "الملدنات الفائقة ضرورية لتحقيق قابلية تشغيل جيدة عند ماء منخفض.", pronunciation: "سوبربلاستيسايزرز آر إسينشال فور جود ووركابيليتي أت لو ووتر." },
    ],
  },
  {
    id: "ns47", title: "Ground Improvement by Grouting", titleArabic: "تحسين الأرض بالحقن", category: "soil",
    paragraphs: [
      { english: "Grouting injects cement slurry into soil voids to increase strength and reduce permeability.", arabic: "الحقن بيضخ خلطة أسمنتية في فراغات التربة لزيادة القوة وتقليل النفاذية.", pronunciation: "جراوتينج إنجيكتس سيمنت سلاري إنتو سويل فويدز." },
      { english: "Common grouting types include cement grouting, chemical grouting, and jet grouting.", arabic: "أنواع الحقن الشائعة تشمل الحقن الأسمنتي والكيميائي والنفاث.", pronunciation: "كومن تايبز إنكلود سيمنت جراوتينج، كيميكال، أند جيت جراوتينج." },
    ],
  },
  {
    id: "ns48", title: "Milling Asphalt Surface", titleArabic: "كشط سطح الأسفلت", category: "asphalt",
    paragraphs: [
      { english: "Milling removes the top layer of damaged asphalt using a milling machine. The milled material can be recycled.", arabic: "الكشط بيشيل الطبقة العلوية المتضررة بماكينة كشط. المادة المكشوطة ممكن تتعاد تدويرها.", pronunciation: "ميلينج ريموفز ذا توب لاير يوزينج أ ميلينج ماشين. ذا ماتيريال كان بي ريسايكلد." },
      { english: "After milling, clean the surface and apply tack coat before placing the new asphalt layer.", arabic: "بعد الكشط، نظف السطح وارش طبقة لاصقة قبل وضع الطبقة الجديدة.", pronunciation: "أفتر ميلينج، كلين أند أبلاي تاك كوت بيفور بليسينج ذا نيو لاير." },
    ],
  },
  {
    id: "ns49", title: "Concrete Mix Proportioning", titleArabic: "تحديد نسب خلطة الخرسانة", category: "concrete",
    paragraphs: [
      { english: "Mix proportioning determines the quantities of each material per cubic meter of concrete.", arabic: "تحديد نسب الخلطة بيحدد كميات كل مادة لكل متر مكعب خرسانة.", pronunciation: "ميكس بروبورشنينج ديتيرمينز ذا كوانتيتيز أوف إيتش ماتيريال." },
      { english: "A typical C30 mix might contain 350 kg cement, 175 liters water, 700 kg sand, and 1100 kg coarse aggregate.", arabic: "خلطة C30 نموذجية ممكن تحتوي 350 كجم أسمنت و175 لتر ماء و700 كجم رمل و1100 كجم ركام خشن.", pronunciation: "أ تيبيكال سي ثيرتي ميكس مايت كونتين ثري هاندرد فيفتي كيلو سيمنت." },
    ],
  },
  {
    id: "ns50", title: "Aggregate Quality Acceptance", titleArabic: "قبول جودة الركام", category: "general",
    paragraphs: [
      { english: "Before accepting aggregate, verify all test results meet the specification. Check gradation, abrasion, and absorption.", arabic: "قبل قبول الركام، تأكد إن كل النتائج تحقق المواصفة. افحص التدرج والبري والامتصاص.", pronunciation: "بيفور أكسيبتينج أجريجيت، فيريفاي أول ريزالتس ميت ذا سبيسيفيكيشن." },
      { english: "If any test fails, reject the material and notify the supplier. Keep records for quality documentation.", arabic: "لو أي اختبار فشل، ارفض المادة وأبلغ المورد. احتفظ بالسجلات.", pronunciation: "إف إني تيست فيلز، ريجيكت أند نوتيفاي ذا سابلاير. كيب ريكوردز." },
    ],
  },
  // ─── MORE STORIES ───
  {
    id: "ns51", title: "Permeability Test", titleArabic: "اختبار النفاذية", category: "concrete",
    paragraphs: [
      { english: "The permeability test measures how easily water passes through concrete. Low permeability means better durability.", arabic: "اختبار النفاذية بيقيس سهولة مرور الماء خلال الخرسانة. نفاذية منخفضة يعني متانة أفضل.", pronunciation: "ذا بيرميابيليتي تيست ميجرز هاو إيزيلي ووتر باسيز ثرو كونكريت." },
      { english: "Apply water pressure on one face of the specimen for 72 hours. Cut the specimen and measure the depth of water penetration.", arabic: "طبق ضغط ماء على وجه العينة لمدة 72 ساعة. اقطع العينة وقس عمق تغلغل الماء.", pronunciation: "أبلاي ووتر بريشر أون وان فيس فور سيفنتي تو أورز. كت ذا سبيسيمن أند ميجر ذا ديبث." },
    ],
  },
  {
    id: "ns52", title: "Consolidation Test of Soil", titleArabic: "اختبار التماسك للتربة", category: "soil",
    paragraphs: [
      { english: "The consolidation test determines how much a soil will compress under load over time. It is important for foundation design.", arabic: "اختبار التماسك بيحدد مقدار انضغاط التربة تحت الحمل. مهم لتصميم الأساسات.", pronunciation: "ذا كونسوليديشن تيست ديتيرمينز هاو ماتش أ سويل ويل كومبريس." },
      { english: "Place a soil ring in the oedometer. Apply loads in increments and record the settlement for each load.", arabic: "ضع حلقة التربة في جهاز الأوديومتر. طبق الأحمال تدريجياً وسجل الهبوط لكل حمل.", pronunciation: "بليس أ سويل رينج إن ذا أوديومتر. أبلاي لودز إن إنكريمنتس." },
    ],
  },
  {
    id: "ns53", title: "Ductility Test of Bitumen", titleArabic: "اختبار مطيلية البيتومين", category: "asphalt",
    paragraphs: [
      { english: "The ductility test measures how far bitumen can stretch before it breaks. High ductility means the bitumen is more flexible.", arabic: "اختبار المطيلية بيقيس المسافة اللي البيتومين يقدر يتمدد قبل ما ينقطع.", pronunciation: "ذا دكتيليتي تيست ميجرز هاو فار بيتيومن كان ستريتش." },
      { english: "Pull the bitumen specimen at 50 mm per minute at 25 degrees. Measure the distance at which it breaks.", arabic: "اسحب العينة بمعدل 50 مم في الدقيقة عند 25 درجة. قس المسافة عند الانقطاع.", pronunciation: "بول ذا سبيسيمن أت فيفتي ميليميترز بير مينت. ميجر ذا ديستانس." },
    ],
  },
  {
    id: "ns54", title: "Direct Shear Test", titleArabic: "اختبار القص المباشر", category: "soil",
    paragraphs: [
      { english: "The direct shear test measures the shear strength of soil along a predetermined plane.", arabic: "اختبار القص المباشر بيقيس مقاومة القص للتربة على مستوى محدد.", pronunciation: "ذا دايريكت شير تيست ميجرز ذا شير سترينث أوف سويل." },
      { english: "Apply a normal force and then a shear force. Record the displacement and shear stress to find cohesion and friction angle.", arabic: "طبق قوة عمودية ثم قوة قص. سجل الإزاحة وإجهاد القص لإيجاد التماسك وزاوية الاحتكاك.", pronunciation: "أبلاي أ نورمال فورس ذين أ شير فورس. ريكورد ديسبليسمنت أند شير ستريس." },
    ],
  },
  {
    id: "ns55", title: "Aggregate Impact Value", titleArabic: "قيمة الصدم للركام", category: "general",
    paragraphs: [
      { english: "The aggregate impact value test assesses the resistance of aggregate to sudden impact.", arabic: "اختبار قيمة الصدم بيقيّم مقاومة الركام للصدم المفاجئ.", pronunciation: "ذا أجريجيت إمباكت فاليو تيست أسيسيز ذا ريزيستانس تو سادن إمباكت." },
      { english: "Drop a hammer 15 times onto the aggregate sample. Sieve the crushed material and calculate the percentage passing.", arabic: "اسقط المطرقة 15 مرة على العينة. أنخل المادة المسحوقة واحسب النسبة المارة.", pronunciation: "دروب أ هامر فيفتين تايمز. سيف ذا كراشت ماتيريال أند كالكيوليت." },
    ],
  },

  // ========== NEW STORIES - CONCRETE ==========
  {
    id: "ns60", title: "Concrete Temperature Monitoring", titleArabic: "مراقبة درجة حرارة الخرسانة", category: "concrete",
    paragraphs: [
      { english: "Monitoring concrete temperature is critical during hot and cold weather concreting. High temperatures can cause rapid setting and cracking.", arabic: "مراقبة درجة حرارة الخرسانة أمر حيوي أثناء الصب في الطقس الحار والبارد. الحرارة العالية تسبب شك سريع وتشققات.", pronunciation: "مونيتورينج كونكريت تيمبريتشر إز كريتيكال ديورينج هوت أند كولد ويذر كونكريتينج." },
      { english: "Use a thermometer to check the concrete temperature immediately after mixing. The maximum allowed temperature is usually 32 degrees Celsius.", arabic: "استخدم ترمومتر لفحص حرارة الخرسانة فوراً بعد الخلط. الحد الأقصى المسموح عادةً 32 درجة مئوية.", pronunciation: "يوز أ ثيرموميتر تو تشيك ذا كونكريت تيمبريتشر. ذا ماكسيمم إز يوجوالي ثيرتي تو ديجريز." },
      { english: "In hot weather, use chilled water or ice as part of the mixing water to reduce the concrete temperature.", arabic: "في الطقس الحار، استخدم ماء مثلج أو ثلج كجزء من ماء الخلط لتقليل حرارة الخرسانة.", pronunciation: "إن هوت ويذر، يوز تشيلد ووتر أور آيس تو ريديوس ذا كونكريت تيمبريتشر." },
    ],
  },
  {
    id: "ns61", title: "Concrete Permeability Test", titleArabic: "اختبار نفاذية الخرسانة", category: "concrete",
    paragraphs: [
      { english: "The water permeability test determines how resistant concrete is to water penetration under pressure.", arabic: "اختبار نفاذية الماء يحدد مقاومة الخرسانة لتغلغل الماء تحت الضغط.", pronunciation: "ذا ووتر بيرميابيليتي تيست ديتيرمينز هاو ريزيستانت كونكريت إز تو ووتر بينيتريشن." },
      { english: "Apply water pressure of 5 bar for 72 hours on the specimen. Then split the specimen and measure the depth of water penetration.", arabic: "طبق ضغط ماء 5 بار لمدة 72 ساعة. ثم اشق العينة وقس عمق تغلغل الماء.", pronunciation: "أبلاي ووتر بريشر أوف فايف بار فور سيفنتي تو أورز. ذين سبليت أند ميجر." },
    ],
  },
  {
    id: "ns62", title: "Concrete Carbonation Test", titleArabic: "اختبار كربنة الخرسانة", category: "concrete",
    paragraphs: [
      { english: "Carbonation reduces the pH of concrete, making the reinforcement steel vulnerable to corrosion.", arabic: "الكربنة تقلل الرقم الهيدروجيني للخرسانة مما يجعل حديد التسليح عرضة للصدأ.", pronunciation: "كاربونيشن ريديوسز ذا بي إتش أوف كونكريت، ميكينج ذا ريإنفورسمنت فالنرابل تو كوروجن." },
      { english: "Spray phenolphthalein indicator on a freshly broken concrete surface. Pink color indicates non-carbonated concrete.", arabic: "رش كاشف الفينولفثالين على سطح خرسانة مكسور حديثاً. اللون الوردي يدل على عدم الكربنة.", pronunciation: "سبراي فينولفثالين إنديكيتور. بينك كالر إنديكيتس نون كاربونيتد كونكريت." },
    ],
  },
  {
    id: "ns63", title: "Self-Compacting Concrete", titleArabic: "الخرسانة ذاتية الدمك", category: "concrete",
    paragraphs: [
      { english: "Self-compacting concrete flows and fills formwork by its own weight without vibration. It is tested using the slump flow test.", arabic: "الخرسانة ذاتية الدمك تتدفق وتملأ الشدة بوزنها بدون هزاز. تُختبر باختبار انسياب الهبوط.", pronunciation: "سيلف كومباكتينج كونكريت فلوز أند فيلز فورم وورك باي إتس أون وايت." },
      { english: "The target slump flow is typically 650 to 800 millimeters. Measure the diameter of the spread in two perpendicular directions.", arabic: "الهدف عادةً 650 إلى 800 مليمتر. قس قطر الانتشار في اتجاهين متعامدين.", pronunciation: "ذا تارجيت سلامب فلو إز 650 تو 800 ميليميترز. ميجر ذا دايأميتر." },
    ],
  },

  // ========== NEW STORIES - SOIL ==========
  {
    id: "ns64", title: "Unconfined Compression Test", titleArabic: "اختبار الضغط غير المحصور", category: "soil",
    paragraphs: [
      { english: "The unconfined compression test measures the shear strength of cohesive soil without lateral support.", arabic: "اختبار الضغط غير المحصور يقيس مقاومة القص للتربة المتماسكة بدون دعم جانبي.", pronunciation: "ذا أنكونفايند كومبريشن تيست ميجرز ذا شير سترينث أوف كوهيسيف سويل." },
      { english: "Prepare a cylindrical specimen with a height-to-diameter ratio of 2:1. Apply axial load until the specimen fails.", arabic: "جهز عينة أسطوانية بنسبة ارتفاع لقطر 2:1. طبق حمل محوري حتى تنهار العينة.", pronunciation: "بريبير أ سيليندريكال سبيسيمن. أبلاي أكسيال لود أنتيل فيليور." },
    ],
  },
  {
    id: "ns65", title: "Soil Classification Systems", titleArabic: "أنظمة تصنيف التربة", category: "soil",
    paragraphs: [
      { english: "The Unified Soil Classification System (USCS) classifies soil based on grain size and plasticity. Coarse-grained soils are classified as gravel (G) or sand (S).", arabic: "نظام التصنيف الموحد يصنف التربة حسب حجم الحبيبات واللدونة. التربة الخشنة تصنف كحصى أو رمل.", pronunciation: "ذا يونيفايد سويل كلاسيفيكيشن سيستم كلاسيفايز سويل بيسد أون جرين سايز." },
      { english: "Fine-grained soils are classified as silt (M) or clay (C). The letter L means low plasticity and H means high plasticity.", arabic: "التربة الناعمة تصنف كطمي أو طين. حرف L يعني لدونة منخفضة وH يعني لدونة عالية.", pronunciation: "فاين جريند سويلز آر كلاسيفايد أز سيلت أور كلاي." },
    ],
  },
  {
    id: "ns66", title: "Plate Load Test", titleArabic: "اختبار الحمل بالصفيحة", category: "soil",
    paragraphs: [
      { english: "The plate load test determines the bearing capacity and settlement characteristics of soil in the field.", arabic: "اختبار الحمل بالصفيحة يحدد قدرة تحمل التربة وخصائص الهبوط في الموقع.", pronunciation: "ذا بليت لود تيست ديتيرمينز ذا بيرينج كاباسيتي أوف سويل إن ذا فيلد." },
      { english: "Place a rigid steel plate on the prepared soil surface. Apply incremental loads and measure the settlement using dial gauges.", arabic: "ضع صفيحة فولاذية صلبة على سطح التربة المجهز. طبق أحمال تدريجية وقس الهبوط بمؤشرات قياس.", pronunciation: "بليس أ ريجيد ستيل بليت. أبلاي إنكريمنتال لودز أند ميجر سيتلمنت." },
    ],
  },
  {
    id: "ns67", title: "Vane Shear Test", titleArabic: "اختبار القص بالمروحة", category: "soil",
    paragraphs: [
      { english: "The vane shear test measures the undrained shear strength of soft clay in the field or laboratory.", arabic: "اختبار القص بالمروحة يقيس مقاومة القص غير المصرف للطين الناعم في الموقع أو المعمل.", pronunciation: "ذا فين شير تيست ميجرز ذا أندرييند شير سترينث أوف سوفت كلاي." },
      { english: "Push the vane into the soil and rotate it at a constant rate. Record the maximum torque to calculate the shear strength.", arabic: "ادفع المروحة في التربة ولفها بمعدل ثابت. سجل أقصى عزم دوران لحساب مقاومة القص.", pronunciation: "بوش ذا فين إنتو ذا سويل أند روتيت. ريكورد ماكسيمم تورك." },
    ],
  },

  // ========== NEW STORIES - ASPHALT ==========
  {
    id: "ns68", title: "Asphalt Density by Core Samples", titleArabic: "كثافة الأسفلت بالعينات اللبية", category: "asphalt",
    paragraphs: [
      { english: "Core samples are taken from the compacted asphalt layer to check the in-place density and thickness.", arabic: "تؤخذ عينات لبية من طبقة الأسفلت المدموكة لفحص الكثافة الموضعية والسماكة.", pronunciation: "كور سامبلز آر تيكن فروم ذا كومباكتد أسفولت لاير تو تشيك دينسيتي." },
      { english: "Use a diamond core drill with the correct diameter. The minimum required density is usually 96 percent of the maximum theoretical density.", arabic: "استخدم حفار لبي ماسي بالقطر الصحيح. الحد الأدنى للكثافة عادةً 96% من الكثافة النظرية القصوى.", pronunciation: "يوز أ دايموند كور دريل. ذا مينيمم ديينسيتي إز 96 بيرسينت." },
    ],
  },
  {
    id: "ns69", title: "Bitumen Emulsion Types", titleArabic: "أنواع مستحلبات البيتومين", category: "asphalt",
    paragraphs: [
      { english: "Bitumen emulsions are classified as rapid setting (RS), medium setting (MS), and slow setting (SS) based on their breaking time.", arabic: "مستحلبات البيتومين تصنف سريعة الشك ومتوسطة وبطيئة حسب وقت الكسر.", pronunciation: "بيتيومن إمالشنز آر كلاسيفايد أز رابيد، ميديم، أند سلو سيتينج." },
      { english: "Rapid setting emulsions are used for tack coats. Slow setting emulsions are used for mixing with aggregates in cold weather.", arabic: "المستحلبات سريعة الشك تستخدم للطبقات اللاصقة. البطيئة تستخدم للخلط مع الركام في الطقس البارد.", pronunciation: "رابيد سيتينج فور تاك كوتس. سلو سيتينج فور كولد ميكسينج." },
    ],
  },
  {
    id: "ns70", title: "Los Angeles Abrasion Test", titleArabic: "اختبار لوس أنجلوس للتآكل", category: "general",
    paragraphs: [
      { english: "The Los Angeles abrasion test measures the resistance of aggregate to wear and degradation.", arabic: "اختبار لوس أنجلوس للتآكل يقيس مقاومة الركام للتآكل والتدهور.", pronunciation: "ذا لوس أنجيليس أبريجن تيست ميجرز ذا ريزيستانس أوف أجريجيت تو وير." },
      { english: "Place the aggregate sample with steel balls in the rotating drum. After 500 revolutions, sieve the material and calculate the percentage loss.", arabic: "ضع العينة مع كرات فولاذية في الأسطوانة الدوارة. بعد 500 دورة، أنخل وحسب نسبة الفقد.", pronunciation: "بليس ذا سامبل ويذ ستيل بولز. أفتر 500 ريفوليوشنز، كالكيوليت ذا لوس." },
    ],
  },
  {
    id: "ns71", title: "Specific Gravity of Cement", titleArabic: "الوزن النوعي للأسمنت", category: "concrete",
    paragraphs: [
      { english: "The specific gravity of Portland cement is typically 3.15. It is measured using a Le Chatelier flask.", arabic: "الوزن النوعي للأسمنت البورتلاندي عادةً 3.15. يُقاس باستخدام قارورة لو شاتليه.", pronunciation: "ذا سبيسيفيك جرافيتي أوف بورتلاند سيمنت إز 3.15. يوزينج أ لو شاتليه فلاسك." },
      { english: "Fill the flask with kerosene to a known level. Add a weighed amount of cement and measure the rise in liquid level.", arabic: "املأ القارورة بالكيروسين لمستوى معلوم. أضف كمية موزونة من الأسمنت وقس ارتفاع مستوى السائل.", pronunciation: "فيل ذا فلاسك ويذ كيروسين. أد سيمنت أند ميجر ذا رايز." },
    ],
  },

  // ========== NEW STORIES - GENERAL/SAFETY ==========
  {
    id: "ns72", title: "Laboratory Safety Procedures", titleArabic: "إجراءات سلامة المختبر", category: "general",
    paragraphs: [
      { english: "Always wear personal protective equipment (PPE) in the laboratory. This includes safety glasses, gloves, steel-toe boots, and a lab coat.", arabic: "دائماً ارتدي معدات الوقاية الشخصية في المختبر. تشمل نظارات حماية وقفازات وحذاء سلامة ومعطف مختبر.", pronunciation: "أولويز وير بيرسونال بروتيكتيف إكويبمنت. سيفتي جلاسز، جلافز، ستيل تو بوتس." },
      { english: "Keep fire extinguishers accessible and know their locations. Report any spills or accidents immediately to your supervisor.", arabic: "أبقِ طفايات الحريق في متناول اليد واعرف أماكنها. أبلغ عن أي انسكاب أو حادث فوراً للمشرف.", pronunciation: "كيب فاير إكستينجويشرز أكسيسيبل. ريبورت إني سبيلز أور أكسيدنتس." },
      { english: "Never eat or drink inside the laboratory. Wash your hands thoroughly after handling chemicals or soil samples.", arabic: "لا تأكل أو تشرب داخل المختبر. اغسل يديك جيداً بعد التعامل مع الكيماويات أو عينات التربة.", pronunciation: "نيفر إيت أور درينك إنسايد ذا لاب. ووش يور هاندز ثوروهلي." },
    ],
  },
  {
    id: "ns73", title: "Equipment Calibration", titleArabic: "معايرة الأجهزة", category: "general",
    paragraphs: [
      { english: "Regular calibration ensures that testing equipment gives accurate and reliable results. Most equipment requires annual calibration.", arabic: "المعايرة المنتظمة تضمن أن أجهزة الاختبار تعطي نتائج دقيقة وموثوقة. معظم الأجهزة تحتاج معايرة سنوية.", pronunciation: "ريجيولار كاليبريشن إنشورز أكيوريت أند ريلايبل ريزالتس." },
      { english: "Keep a calibration log for each piece of equipment. Record the date, results, and the name of the person who performed the calibration.", arabic: "احتفظ بسجل معايرة لكل جهاز. سجل التاريخ والنتائج واسم الشخص الذي أجرى المعايرة.", pronunciation: "كيب أ كاليبريشن لوج. ريكورد ذا ديت أند ريزالتس." },
    ],
  },
  {
    id: "ns74", title: "Sampling Methods and Standards", titleArabic: "طرق ومعايير أخذ العينات", category: "general",
    paragraphs: [
      { english: "Proper sampling is essential for accurate test results. Always follow the relevant ASTM or BS standard for each material.", arabic: "أخذ العينات الصحيح ضروري لنتائج اختبار دقيقة. اتبع دائماً المواصفة القياسية المعنية لكل مادة.", pronunciation: "بروبر سامبلينج إز إسينشال. أولويز فولو ذا ريليفانت ستاندرد." },
      { english: "Label each sample with the date, location, depth, and project name. Store samples in airtight containers to prevent moisture loss.", arabic: "عنون كل عينة بالتاريخ والموقع والعمق واسم المشروع. خزن العينات في حاويات محكمة لمنع فقد الرطوبة.", pronunciation: "ليبل إيتش سامبل. ستور سامبلز إن إيرتايت كونتينرز." },
    ],
  },
];

