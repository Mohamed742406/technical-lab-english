import { useState, useCallback } from "react";
import { speakText } from "@/lib/phonetics";
import { Volume2, RotateCcw, CheckCircle2, XCircle, GripVertical } from "lucide-react";

interface ProcStep {
  id: number;
  text: string;
  ar: string;
}

interface Procedure {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  icon: string;
  steps: ProcStep[];
}

const labProcedures: Procedure[] = [
  {
    id: "slump", title: "Slump Test", titleAr: "اختبار الهبوط", category: "concrete", icon: "🔺",
    steps: [
      { id: 1, text: "Clean and oil the slump cone", ar: "نظّف ودهّن مخروط الهبوط" },
      { id: 2, text: "Place cone on flat non-absorbent surface", ar: "ضع المخروط على سطح مستوٍ غير ماصّ" },
      { id: 3, text: "Fill cone in three equal layers", ar: "امأ المخروط بثلاث طبقات متساوية" },
      { id: 4, text: "Rod each layer 25 times", ar: "ادمك كل طبقة 25 مرة بالقضيب" },
      { id: 5, text: "Level off the top surface", ar: "سوِّ السطح العلوي" },
      { id: 6, text: "Lift cone vertically in 5-10 seconds", ar: "ارفع المخروط رأسياً في 5-10 ثوانٍ" },
      { id: 7, text: "Measure the slump immediately", ar: "قِس الهبوط فوراً" },
      { id: 8, text: "Record result in mm", ar: "سجّل النتيجة بالمليمتر" },
    ],
  },
  {
    id: "proctor", title: "Standard Proctor Test", titleAr: "اختبار بروكتور القياسي", category: "soil", icon: "🔨",
    steps: [
      { id: 1, text: "Prepare soil and pass through No.4 sieve", ar: "جهّز التربة وأمررها من منخل رقم 4" },
      { id: 2, text: "Add water to achieve target moisture", ar: "أضف ماء لتحقيق نسبة الرطوبة المستهدفة" },
      { id: 3, text: "Mix soil and water thoroughly", ar: "اخلط التربة والماء جيداً" },
      { id: 4, text: "Fill mold in 3 equal layers", ar: "امأ القالب بثلاث طبقات متساوية" },
      { id: 5, text: "Compact each layer with 25 blows", ar: "ادمك كل طبقة بـ 25 ضربة" },
      { id: 6, text: "Remove collar and trim excess soil", ar: "أزل الياقة وشذّب التربة الزائدة" },
      { id: 7, text: "Weigh the mold with soil", ar: "زِن القالب مع التربة" },
      { id: 8, text: "Take moisture content sample", ar: "خذ عينة لتحديد محتوى الرطوبة" },
    ],
  },
  {
    id: "sieve", title: "Sieve Analysis", titleAr: "التحليل المنخلي", category: "aggregate", icon: "⚗️",
    steps: [
      { id: 1, text: "Dry sample in oven at 105°C", ar: "جفّف العينة في الفرن عند 105°C" },
      { id: 2, text: "Weigh the dried sample", ar: "زِن العينة المجففة" },
      { id: 3, text: "Arrange sieves largest to smallest", ar: "رتب المناخل من الأكبر للأصغر" },
      { id: 4, text: "Pour sample into top sieve", ar: "ضع العينة في المنخل العلوي" },
      { id: 5, text: "Shake mechanically for 10 minutes", ar: "هزّ ميكانيكياً لمدة 10 دقائق" },
      { id: 6, text: "Weigh retained material on each sieve", ar: "زِن المحجوز على كل منخل" },
      { id: 7, text: "Calculate percentage passing each sieve", ar: "احسب النسبة المئوية المارة" },
      { id: 8, text: "Plot the gradation curve", ar: "ارسم منحنى التدرج الحبيبي" },
    ],
  },
  {
    id: "marshall", title: "Marshall Test", titleAr: "اختبار مارشال", category: "asphalt", icon: "🛣️",
    steps: [
      { id: 1, text: "Heat bitumen to mixing temperature 160°C", ar: "سخّن البيتومين لدرجة الخلط 160°C" },
      { id: 2, text: "Heat aggregate to 170°C", ar: "سخّن الركام لـ 170°C" },
      { id: 3, text: "Mix bitumen and aggregate thoroughly", ar: "اخلط البيتومين والركام جيداً" },
      { id: 4, text: "Place mix in Marshall mold at 150°C", ar: "ضع الخلطة في قالب مارشال" },
      { id: 5, text: "Compact with 75 blows each side", ar: "ادمك بـ 75 ضربة من كل جانب" },
      { id: 6, text: "Cool specimen to room temperature", ar: "برّد العينة لدرجة حرارة الغرفة" },
      { id: 7, text: "Submerge in water bath at 60°C for 30 min", ar: "انقعها في حمام مائي 60°C لـ 30 دقيقة" },
      { id: 8, text: "Test in Marshall apparatus", ar: "اختبرها في جهاز مارشال" },
      { id: 9, text: "Record stability in kN and flow in mm", ar: "سجّل الثبات بـ kN والانسياب بـ mm" },
    ],
  },
  {
    id: "cube", title: "Concrete Cube Test", titleAr: "اختبار مكعبات الخرسانة", category: "concrete", icon: "🧊",
    steps: [
      { id: 1, text: "Clean and oil the cube mold 150mm", ar: "نظّف ودهّن قالب المكعب 150 مم" },
      { id: 2, text: "Fill mold in two equal layers", ar: "امأ القالب بطبقتين متساويتين" },
      { id: 3, text: "Compact each layer with vibrator or rod", ar: "ادمك كل طبقة بالهزاز أو القضيب" },
      { id: 4, text: "Level the top surface and cover", ar: "سوِّ السطح وغطِّ القالب" },
      { id: 5, text: "Demold after 24 hours", ar: "افك القالب بعد 24 ساعة" },
      { id: 6, text: "Cure in water at 20°C until test age", ar: "عالج في ماء عند 20°C" },
      { id: 7, text: "Test in compression machine at 28 days", ar: "اختبر في ماكينة الضغط عند 28 يوم" },
      { id: 8, text: "Calculate: Load divided by Area in MPa", ar: "احسب: الحمل ÷ المساحة بالـ MPa" },
    ],
  },
  {
    id: "cbr", title: "CBR Test", titleAr: "اختبار CBR", category: "soil", icon: "🎯",
    steps: [
      { id: 1, text: "Prepare soil at optimum moisture content", ar: "جهّز التربة عند الرطوبة المثلى" },
      { id: 2, text: "Compact soil in mold using Proctor method", ar: "ادمك التربة في القالب بطريقة بروكتر" },
      { id: 3, text: "Soak specimen in water for 4 days", ar: "انقع العينة في الماء لمدة 4 أيام" },
      { id: 4, text: "Measure swelling after soaking", ar: "قِس الانتفاخ بعد النقع" },
      { id: 5, text: "Apply surcharge weight on specimen", ar: "ضع الأوزان الإضافية على العينة" },
      { id: 6, text: "Penetrate piston at 1.27 mm per minute", ar: "ادخل الإبرة بمعدل 1.27 مم/دقيقة" },
      { id: 7, text: "Record load at 2.5mm and 5mm penetration", ar: "سجّل الحمل عند 2.5 و5 مم" },
      { id: 8, text: "Calculate CBR percentage", ar: "احسب نسبة الـ CBR" },
    ],
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ProcedureBuilder = () => {
  const [selected, setSelected] = useState<Procedure | null>(null);
  const [shuffledSteps, setShuffledSteps] = useState<ProcStep[]>([]);
  const [placed, setPlaced] = useState<(ProcStep | null)[]>([]);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const startProcedure = (proc: Procedure) => {
    setSelected(proc);
    setShuffledSteps(shuffle(proc.steps));
    setPlaced(Array(proc.steps.length).fill(null));
    setChecked(false);
    setScore(0);
  };

  const handleDrop = useCallback((slotIdx: number, step: ProcStep) => {
    setPlaced((prev) => {
      const next = [...prev];
      // Remove from old slot if already placed
      const oldIdx = next.findIndex((s) => s?.id === step.id);
      if (oldIdx >= 0) next[oldIdx] = null;
      // If slot already occupied, swap
      if (next[slotIdx]) {
        if (oldIdx >= 0) next[oldIdx] = next[slotIdx];
      }
      next[slotIdx] = step;
      return next;
    });
  }, []);

  const checkOrder = () => {
    if (!selected) return;
    let correct = 0;
    placed.forEach((step, i) => {
      if (step && step.id === selected.steps[i].id) correct++;
    });
    setScore(correct);
    setChecked(true);
  };

  const showAnswer = () => {
    if (!selected) return;
    setPlaced([...selected.steps]);
    setChecked(true);
    setScore(selected.steps.length);
  };

  const availableSteps = shuffledSteps.filter((s) => !placed.some((p) => p?.id === s.id));

  if (!selected) {
    return (
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">📋 ترتيب خطوات الاختبار</h2>
        <p className="text-muted-foreground mb-6">رتب خطوات الاختبار بالترتيب الصحيح — بالسحب والإفلات</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {labProcedures.map((proc) => (
            <button
              key={proc.id}
              onClick={() => startProcedure(proc)}
              className="bg-card rounded-xl border border-border p-5 text-center hover:border-primary hover:card-glow transition-all"
            >
              <span className="text-4xl block mb-2">{proc.icon}</span>
              <h3 className="font-display font-bold text-foreground text-sm">{proc.title}</h3>
              <p className="text-xs text-muted-foreground">{proc.titleAr}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const pct = selected ? Math.round((score / selected.steps.length) * 100) : 0;

  return (
    <div>
      <button onClick={() => setSelected(null)} className="text-sm text-muted-foreground hover:text-foreground mb-4 block">← رجوع</button>
      <h2 className="text-xl font-display font-bold text-foreground mb-1">{selected.icon} {selected.title}</h2>
      <p className="text-muted-foreground text-sm mb-4">{selected.titleAr} — رتب الخطوات بالترتيب الصحيح</p>

      {/* Available steps to drag */}
      {!checked && availableSteps.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-muted-foreground mb-2">الخطوات المتاحة — اضغط على خطوة ثم اضغط على المكان:</h3>
          <div className="flex flex-wrap gap-2">
            {availableSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => setDragIdx(step.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all border-2 ${
                  dragIdx === step.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/50"
                }`}
              >
                <GripVertical size={14} />
                <span dir="ltr">{step.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Drop zones */}
      <div className="space-y-2">
        {selected.steps.map((correctStep, i) => {
          const placedStep = placed[i];
          const isCorrect = checked && placedStep?.id === correctStep.id;
          const isWrong = checked && placedStep && placedStep.id !== correctStep.id;

          return (
            <div
              key={i}
              onClick={() => {
                if (checked) return;
                if (dragIdx !== null) {
                  const step = shuffledSteps.find((s) => s.id === dragIdx);
                  if (step) handleDrop(i, step);
                  setDragIdx(null);
                }
              }}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all min-h-[56px] cursor-pointer ${
                isCorrect ? "border-success bg-success/10" : isWrong ? "border-destructive bg-destructive/10" : placedStep ? "border-primary/30 bg-card" : "border-dashed border-border bg-muted/50 hover:border-primary/50"
              }`}
            >
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-display font-bold text-sm flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              {placedStep ? (
                <div className="flex-1">
                  <p className="font-bold text-foreground text-sm" dir="ltr">{placedStep.text}</p>
                  <p className="text-xs text-muted-foreground">{placedStep.ar}</p>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">اضغط هنا لوضع الخطوة</p>
              )}
              {placedStep && !checked && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(placedStep.text, 0.7);
                  }}
                  className="p-1.5 rounded-full bg-primary/10 text-primary"
                >
                  <Volume2 size={14} />
                </button>
              )}
              {isCorrect && <CheckCircle2 size={18} className="text-success shrink-0" />}
              {isWrong && <XCircle size={18} className="text-destructive shrink-0" />}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-6">
        {!checked ? (
          <>
            <button onClick={checkOrder} disabled={placed.some((p) => !p)} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold disabled:opacity-50">
              ✅ تحقق من الترتيب
            </button>
            <button onClick={showAnswer} className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold">
              💡 اعرض الإجابة
            </button>
          </>
        ) : (
          <div className="w-full">
            <div className={`rounded-xl p-4 mb-4 text-center font-bold ${pct === 100 ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
              {pct === 100 ? "🎉 ممتاز! كل الخطوات صح!" : `${score} / ${selected.steps.length} خطوات صحيحة (${pct}%)`}
            </div>
            <div className="flex gap-3">
              <button onClick={() => startProcedure(selected)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold">
                <RotateCcw size={18} /> أعد المحاولة
              </button>
              <button onClick={() => setSelected(null)} className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold">
                اختار اختبار تاني
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcedureBuilder;
