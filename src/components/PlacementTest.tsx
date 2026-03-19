import { useState, useMemo } from "react";
import { setPlacementDone, isTourDone, setTourDone } from "@/lib/progress";
import { speakText } from "@/lib/phonetics";
import { Volume2 } from "lucide-react";

/* ─── بيانات الاختبار (3 مراحل) ─── */
const PHASE_1 = [ // مبتدئ جداً — كلمات يومية وأرقام
  { en: "Hello",         ar: "مرحبا",         opts: ["مرحبا","وداع","شكراً","أنا"] },
  { en: "One",           ar: "واحد",           opts: ["اثنان","واحد","ثلاثة","صفر"] },
  { en: "Good morning",  ar: "صباح الخير",     opts: ["مساء الخير","صباح الخير","مع السلامة","شكراً"] },
];

const PHASE_2 = [ // مبتدئ مختبر — مصطلحات أساسية
  { en: "Sample",        ar: "عينة",           opts: ["عينة","تقرير","قالب","فرن"] },
  { en: "Test",          ar: "اختبار",         opts: ["ماء","أسمنت","اختبار","خرسانة"] },
  { en: "Measure",       ar: "قياس",           opts: ["كتابة","قياس","ردم","دمك"] },
  { en: "Compaction",    ar: "دمك",            opts: ["دمك","هبوط","كثافة","رطوبة"] },
];

const PHASE_3 = [ // متوسط — جمل ومصطلحات متقدمة
  { en: "The sample passed the test",    ar: "العينة اجتازت الاختبار",    opts: ["العينة اجتازت الاختبار","العينة تحتاج إعادة","الاختبار مؤجل","النتيجة مجهولة"] },
  { en: "Water-cement ratio",            ar: "نسبة الماء للأسمنت",         opts: ["نسبة الماء للأسمنت","مقاومة الضغط","اختبار الهبوط","معالجة الخرسانة"] },
  { en: "Non-conforming with spec",      ar: "غير مطابق للمواصفة",         opts: ["غير مطابق للمواصفة","مطابق للمواصفة","ناجح في الاختبار","جاهز للتسليم"] },
];

const ALL_QUESTIONS = [...PHASE_1, ...PHASE_2, ...PHASE_3];

function calcLevel(scores: boolean[]): "beginner" | "intermediate" | "advanced" {
  const p1 = scores.slice(0, 3).filter(Boolean).length;
  const p2 = scores.slice(3, 7).filter(Boolean).length;
  const p3 = scores.slice(7, 10).filter(Boolean).length;
  if (p1 <= 1)                  return "beginner";
  if (p1 >= 3 && p2 <= 1)      return "beginner";
  if (p2 >= 3 && p3 <= 1)      return "intermediate";
  if (p3 >= 2)                  return "advanced";
  return "intermediate";
}

const LEVEL_INFO = {
  beginner:     { ar: "مبتدئ",   icon: "🌱", desc: "هتبدأ من الأساسيات — التحيات والأرقام وكلمات المختبر الأولى.", startUnit: "الوحدة 1" },
  intermediate: { ar: "متوسط",   icon: "📘", desc: "عندك قاعدة كويسة — هتبدأ من مصطلحات وجمل المختبر.",         startUnit: "الوحدة 5" },
  advanced:     { ar: "متقدم",   icon: "⭐", desc: "مستواك قوي — هتبدأ من اختبارات التربة والأسفلت المتقدمة.",   startUnit: "الوحدة 9" },
};

const TOUR_STEPS = [
  { icon: "🗺️", title: "مسار التعلم",       desc: "ابدأ من مسار التعلم — كل وحدة فيها دروس استماع وكتابة واختبار. أكمل وحدة تفتح اللي بعدها." },
  { icon: "🔊", title: "زر الاستماع",        desc: "في كل كلمة أو جملة فيه زر الصوت 🔊 — اضغط عليه، واسمع كويس، وحاول تكرر بصوتك." },
  { icon: "🔁", title: "المراجعة الذكية",    desc: "بطاقات المراجعة بتتابع الكلمات اللي صعبة عليك وبتعرضها أكتر. استخدمها بعد كل وحدة." },
  { icon: "🎯", title: "التحدي اليومي",      desc: "افتح التطبيق كل يوم وأكمل تحدي اليوم — 3 تحديات صغيرة وتكسب XP إضافي." },
  { icon: "📊", title: "تابع تقدمك",         desc: "في صفحة \"تقدمي\" هتلاقي إحصاء الكلمات المتقنة وسلسلة أيام التعلم. حافظ على السلسلة!" },
];

/* ─── Component ─── */
const PlacementTest = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"intro" | "test" | "result" | "tour">("intro");
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<boolean[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [tourStep, setTourStep] = useState(0);
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");

  const current = ALL_QUESTIONS[step];

  // مؤشر المرحلة الحالية
  const currentPhase = step < 3 ? 1 : step < 7 ? 2 : 3;
  const phaseLabel = currentPhase === 1 ? "أساسيات اللغة" : currentPhase === 2 ? "مصطلحات المختبر" : "جمل متقدمة";
  const phaseColor = currentPhase === 1 ? "bg-green-500" : currentPhase === 2 ? "bg-blue-500" : "bg-purple-500";

  const handleAnswer = (ans: string) => {
    if (selected) return;
    setSelected(ans);
    const correct = ans === current.ar;
    const newScores = [...scores, correct];

    setTimeout(() => {
      if (step + 1 < ALL_QUESTIONS.length) {
        setStep(s => s + 1);
        setSelected(null);
      } else {
        const lv = calcLevel(newScores);
        setLevel(lv);
        setPlacementDone(lv);
        setScores(newScores);
        setPhase("result");
      }
    }, 700);
    setScores(newScores);
  };

  /* ── INTRO ── */
  if (phase === "intro") {
    return (
      <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl border border-border p-8 max-w-sm w-full text-center">
          <p className="text-5xl mb-4">👋</p>
          <h2 className="text-xl font-display font-bold text-foreground mb-2">أهلاً بك في Lab English!</h2>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            قبل ما تبدأ، هنعمل اختبار صغير (10 أسئلة) عشان نحدد المستوى المناسب ليك ونبدأ من المكان الصح.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setPhase("test")}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all"
            >
              ابدأ الاختبار 🎯
            </button>
            <button
              onClick={() => { setPlacementDone("beginner"); setPhase("tour"); }}
              className="w-full py-2 rounded-xl bg-secondary text-muted-foreground font-semibold text-sm hover:text-foreground transition-all"
            >
              أنا مبتدئ تماماً — ابدأ من الأول
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── TEST ── */
  if (phase === "test") {
    return (
      <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl border border-border p-6 max-w-sm w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${phaseColor}`}>{phaseLabel}</span>
            <span className="text-xs text-muted-foreground">{step + 1} / {ALL_QUESTIONS.length}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-5">
            <div
              className={`h-2 rounded-full transition-all ${phaseColor}`}
              style={{ width: `${((step + 1) / ALL_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="bg-muted rounded-xl p-5 text-center mb-4">
            <p className="text-2xl font-display font-bold text-foreground mb-2" dir="ltr">{current.en}</p>
            <button
              onClick={() => speakText(current.en)}
              className="mx-auto flex items-center gap-1 text-xs text-primary hover:text-primary/80"
            >
              <Volume2 size={14} /> استمع
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center mb-3">اختر الترجمة الصحيحة</p>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2">
            {current.opts.map((opt) => {
              const isCorrect = opt === current.ar;
              const isSelected = selected === opt;
              let cls = "bg-secondary text-secondary-foreground hover:bg-primary/10 border border-transparent";
              if (selected) {
                if (isCorrect)             cls = "bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/40";
                else if (isSelected)       cls = "bg-destructive/20 text-destructive border border-destructive/40";
                else                       cls = "bg-secondary/50 text-muted-foreground border border-transparent opacity-60";
              }
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selected}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all text-right ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ── RESULT ── */
  if (phase === "result") {
    const info = LEVEL_INFO[level];
    const total = scores.filter(Boolean).length;
    return (
      <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl border border-border p-8 max-w-sm w-full text-center">
          <p className="text-5xl mb-3">{info.icon}</p>
          <h2 className="text-2xl font-display font-bold text-foreground mb-1">مستواك: {info.ar}</h2>
          <p className="text-sm text-muted-foreground mb-1">
            {total} / {ALL_QUESTIONS.length} إجابات صحيحة
          </p>

          {/* Phase breakdown */}
          <div className="flex gap-2 justify-center my-4">
            {[PHASE_1, PHASE_2, PHASE_3].map((phase, pi) => {
              const start = [0, 3, 7][pi];
              const len = phase.length;
              const correct = scores.slice(start, start + len).filter(Boolean).length;
              const labels = ["أساسيات", "مختبر", "متقدم"];
              return (
                <div key={pi} className="flex-1 bg-muted rounded-xl p-2 text-center">
                  <p className="text-lg font-bold text-foreground">{correct}/{len}</p>
                  <p className="text-[10px] text-muted-foreground">{labels[pi]}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 text-right">
            <p className="text-sm text-primary font-bold mb-1">📍 هتبدأ من {info.startUnit}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{info.desc}</p>
          </div>

          <button
            onClick={() => setPhase("tour")}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all"
          >
            تابع — جولة سريعة 👀
          </button>
        </div>
      </div>
    );
  }

  /* ── TOUR ── */
  if (phase === "tour") {
    if (isTourDone()) { onComplete(); return null; }
    const ts = TOUR_STEPS[tourStep];
    return (
      <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl border border-border p-8 max-w-sm w-full text-center">
          <p className="text-5xl mb-4">{ts.icon}</p>
          <h3 className="text-xl font-display font-bold text-foreground mb-2">{ts.title}</h3>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{ts.desc}</p>

          {/* Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {TOUR_STEPS.map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i === tourStep ? "bg-primary scale-125" : "bg-muted-foreground/30"}`} />
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            {tourStep > 0 && (
              <button onClick={() => setTourStep(s => s - 1)} className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-semibold">
                السابق
              </button>
            )}
            {tourStep < TOUR_STEPS.length - 1 ? (
              <button onClick={() => setTourStep(s => s + 1)} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold">
                التالي ←
              </button>
            ) : (
              <button
                onClick={() => { setTourDone(); onComplete(); }}
                className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold"
              >
                ابدأ التعلم 🚀
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PlacementTest;
