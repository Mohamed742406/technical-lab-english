import { useState, useMemo } from "react";
import { getCategories, VocabWord } from "@/data/vocabulary";
import { toArabicPhonetic, speakText, downloadTextFile } from "@/lib/phonetics";
import SpeedControl from "@/components/SpeedControl";
import {
  Volume2, CheckCircle2, XCircle, RotateCcw, Pen,
  ArrowLeft, Download, ChevronLeft, Star
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

type WritingMode = "select" | "word" | "sentence" | "paragraph" | "results";
type Difficulty = "word" | "sentence" | "paragraph";

interface WritingQuestion {
  arabic: string;
  english: string;
  pronunciation: string;
  type: Difficulty;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Paragraph data
const paragraphs = [
  {
    arabic: "خذ عينة تربة من الموقع واعمل اختبار الرطوبة. سجل النتيجة في التقرير.",
    english: "Take a soil sample from the site and perform a moisture test. Record the result in the report.",
  },
  {
    arabic: "اختبار الهبوط يقيس قابلية تشغيل الخرسانة. النتيجة يجب أن تكون ضمن المواصفة.",
    english: "The slump test measures concrete workability. The result must be within specification.",
  },
  {
    arabic: "تحقق من درجة حرارة الأسفلت قبل الفرد. درجة الحرارة يجب أن تكون مائة وستين درجة.",
    english: "Check the asphalt temperature before spreading. The temperature should be one hundred and sixty degrees.",
  },
  {
    arabic: "معايرة المعدات مهمة جداً للحصول على نتائج دقيقة. اتبع إجراءات المعايرة.",
    english: "Equipment calibration is very important for accurate results. Follow calibration procedures.",
  },
  {
    arabic: "مقاومة الضغط للخرسانة يجب أن تحقق المواصفة. اختبر المكعبات بعد ثمانية وعشرين يوم.",
    english: "The compressive strength of concrete must meet the specification. Test the cubes after twenty-eight days.",
  },
];

const WritingPractice = () => {
  const [mode, setMode] = useState<WritingMode>("select");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<Difficulty>("word");
  const [questions, setQuestions] = useState<WritingQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<WritingQuestion[]>([]);
  const [speed, setSpeed] = useState(0.7);

  const allCategories = useMemo(() => getCategories(), []);
  const question = questions[currentQ];
  const progress = questions.length > 0 ? (currentQ / questions.length) * 100 : 0;

  const startPractice = (catId: string, diff: Difficulty) => {
    setSelectedCategory(catId);
    setDifficulty(diff);
    
    let qs: WritingQuestion[] = [];

    if (diff === "paragraph") {
      qs = shuffle(paragraphs).slice(0, 5).map((p) => ({
        arabic: p.arabic,
        english: p.english,
        pronunciation: toArabicPhonetic(p.english),
        type: "paragraph" as Difficulty,
      }));
    } else {
      const cat = allCategories.find((c) => c.id === catId);
      if (!cat) return;
      const words = shuffle(cat.words).slice(0, 10);

      if (diff === "word") {
        qs = words.map((w) => ({
          arabic: w.arabic,
          english: w.english,
          pronunciation: w.pronunciation,
          type: "word" as Difficulty,
        }));
      } else {
        // sentence
        qs = words
          .filter((w) => w.example && w.exampleArabic)
          .slice(0, 8)
          .map((w) => ({
            arabic: w.exampleArabic!,
            english: w.example!,
            pronunciation: toArabicPhonetic(w.example!),
            type: "sentence" as Difficulty,
          }));
      }
    }

    setQuestions(qs);
    setCurrentQ(0);
    setScore(0);
    setInput("");
    setAnswered(false);
    setIsCorrect(null);
    setShowHint(false);
    setWrongAnswers([]);
    setMode(diff);
  };

  const checkAnswer = () => {
    if (!input.trim() || answered) return;
    setAnswered(true);

    const userAnswer = input.trim().toLowerCase().replace(/[.,!?;:]/g, "");
    const correct = question.english.toLowerCase().replace(/[.,!?;:]/g, "");

    // For words, exact match. For sentences/paragraphs, calculate word overlap
    if (difficulty === "word") {
      const match = userAnswer === correct;
      setIsCorrect(match);
      if (match) setScore((s) => s + 1);
      else setWrongAnswers((prev) => [...prev, question]);
    } else {
      const correctWords = correct.split(/\s+/);
      const userWords = userAnswer.split(/\s+/);
      const matched = correctWords.filter((w) => userWords.includes(w));
      const ratio = matched.length / correctWords.length;
      const match = ratio >= 0.7;
      setIsCorrect(match);
      if (match) setScore((s) => s + 1);
      else setWrongAnswers((prev) => [...prev, question]);
    }
  };

  const nextQuestion = () => {
    const next = currentQ + 1;
    if (next >= questions.length) {
      setMode("results");
      return;
    }
    setCurrentQ(next);
    setInput("");
    setAnswered(false);
    setIsCorrect(null);
    setShowHint(false);
  };

  const downloadResults = () => {
    const percentage = Math.round((score / questions.length) * 100);
    let content = `نتيجة امتحان الكتابة\n`;
    content += `النوع: ${difficulty === "word" ? "كلمات" : difficulty === "sentence" ? "جمل" : "فقرات"}\n`;
    content += `الدرجة: ${score}/${questions.length} (${percentage}%)\n\n`;

    if (wrongAnswers.length > 0) {
      content += "=== راجع الإجابات دي ===\n\n";
      wrongAnswers.forEach((q) => {
        content += `بالعربي: ${q.arabic}\n`;
        content += `بالإنجليزي: ${q.english}\n`;
        content += `النطق: ${q.pronunciation}\n\n`;
      });
    }
    downloadTextFile("writing-results.txt", content);
  };

  // Select screen
  if (mode === "select") {
    return (
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">✍️ امتحان الكتابة</h2>
        <p className="text-muted-foreground mb-6">اختار مستوى الصعوبة والقسم وابدأ اكتب بالإنجليزي</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { diff: "word" as Difficulty, icon: "🔤", title: "كلمات", desc: "كلمة عربي واكتبها إنجليزي" },
            { diff: "sentence" as Difficulty, icon: "📝", title: "جمل", desc: "جملة عربي واكتبها إنجليزي" },
            { diff: "paragraph" as Difficulty, icon: "📄", title: "فقرات", desc: "فقرة كاملة واكتبها إنجليزي" },
          ].map((d) => (
            <div
              key={d.diff}
              className={`bg-card rounded-xl border-2 p-5 text-center transition-all ${
                difficulty === d.diff ? "border-primary" : "border-border hover:border-primary/50"
              }`}
              onClick={() => setDifficulty(d.diff)}
              role="button"
            >
              <span className="text-3xl block mb-2">{d.icon}</span>
              <h3 className="font-display font-bold text-foreground">{d.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{d.desc}</p>
            </div>
          ))}
        </div>

        {difficulty === "paragraph" ? (
          <button
            onClick={() => startPractice("general", "paragraph")}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all"
          >
            ابدأ كتابة الفقرات ✍️
          </button>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => startPractice(cat.id, difficulty)}
                className="bg-card rounded-xl border border-border p-5 text-right hover:border-primary hover:card-glow transition-all group"
              >
                <span className="text-3xl block mb-2">{cat.icon}</span>
                <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.words.length} كلمة</p>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Results
  if (mode === "results") {
    const percentage = Math.round((score / questions.length) * 100);
    const level = percentage >= 90 ? "🏆 ممتاز!" : percentage >= 70 ? "⭐ جيد جداً!" : percentage >= 50 ? "👍 جيد!" : "💪 محتاج تتمرن أكتر";

    return (
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 text-center">
        <div className="text-6xl mb-4">{percentage >= 70 ? "🎉" : "📚"}</div>
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">{level}</h2>
        <p className="text-muted-foreground mb-6">
          امتحان الكتابة - {difficulty === "word" ? "كلمات" : difficulty === "sentence" ? "جمل" : "فقرات"}
        </p>

        <div className="bg-muted rounded-xl p-6 mb-6 inline-block mx-auto">
          <div className="flex items-center gap-6 justify-center">
            <div>
              <p className="text-4xl font-display font-bold text-primary">{score}</p>
              <p className="text-sm text-muted-foreground">صح</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="text-4xl font-display font-bold text-destructive">{questions.length - score}</p>
              <p className="text-sm text-muted-foreground">غلط</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="text-4xl font-display font-bold text-foreground">{percentage}%</p>
              <p className="text-sm text-muted-foreground">النسبة</p>
            </div>
          </div>
        </div>

        {wrongAnswers.length > 0 && (
          <div className="text-right mb-6">
            <h3 className="text-lg font-display font-bold text-foreground mb-3">📖 راجع الإجابات:</h3>
            <div className="grid gap-3">
              {wrongAnswers.map((q, i) => (
                <div key={i} className="bg-muted rounded-xl p-4">
                  <p className="text-primary font-semibold">{q.arabic}</p>
                  <p className="font-bold text-foreground mt-1" dir="ltr" style={{ textAlign: "left" }}>{q.english}</p>
                  <p className="text-sm text-muted-foreground mt-1">النطق: {q.pronunciation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => startPractice(selectedCategory, difficulty)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
          >
            <RotateCcw size={18} />
            أعد الامتحان
          </button>
          <button
            onClick={() => setMode("select")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all"
          >
            <ArrowLeft size={18} />
            رجوع
          </button>
          {wrongAnswers.length > 0 && (
            <button
              onClick={downloadResults}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
            >
              <Download size={18} />
              حمّل النتيجة
            </button>
          )}
        </div>
      </div>
    );
  }

  // Question view
  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Pen size={16} />
            <span>{difficulty === "word" ? "كتابة كلمة" : difficulty === "sentence" ? "كتابة جملة" : "كتابة فقرة"}</span>
          </div>
          <span className="text-sm text-muted-foreground font-display font-bold">
            {currentQ + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-success flex items-center gap-1">
            <Star size={12} /> {score} صح
          </span>
          <button onClick={() => setMode("select")} className="text-xs text-muted-foreground hover:text-foreground">
            إلغاء
          </button>
        </div>
      </div>

      {/* Arabic text to translate */}
      <h3 className="text-lg font-display font-bold text-foreground mb-1">
        {difficulty === "word" ? "اكتب الكلمة دي بالإنجليزي:" : difficulty === "sentence" ? "اكتب الجملة دي بالإنجليزي:" : "اكتب الفقرة دي بالإنجليزي:"}
      </h3>
      <div className="bg-muted rounded-xl p-5 mb-4">
        <p className="text-xl font-bold text-primary leading-relaxed">{question.arabic}</p>
      </div>

      {/* Speed control + listen */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <button
          onClick={() => speakText(question.english, speed)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <Volume2 size={16} />
          اسمع النطق
        </button>
        <SpeedControl speed={speed} onSpeedChange={setSpeed} />
      </div>

      {/* Hint */}
      <button
        onClick={() => setShowHint(!showHint)}
        className="text-xs text-muted-foreground hover:text-primary mb-3 transition-colors"
      >
        {showHint ? "إخفاء المساعدة ▲" : "💡 محتاج مساعدة؟ ▼"}
      </button>
      {showHint && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-4">
          <p className="text-sm text-primary mb-0.5">النطق بالعربي:</p>
          <p className="text-foreground font-display font-semibold">{question.pronunciation}</p>
        </div>
      )}

      {/* Input */}
      {!answered ? (
        <div className="space-y-3">
          {difficulty === "paragraph" ? (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب الفقرة بالإنجليزي هنا..."
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-lg font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[120px] resize-none"
              dir="ltr"
              style={{ textAlign: "left" }}
            />
          ) : (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
              placeholder={difficulty === "word" ? "اكتب الكلمة هنا..." : "اكتب الجملة هنا..."}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-lg font-bold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              dir="ltr"
              style={{ textAlign: "left" }}
              autoFocus
            />
          )}
          <button
            onClick={checkAnswer}
            className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all"
          >
            تأكيد ✓
          </button>
        </div>
      ) : (
        <div className={`rounded-xl p-4 border ${isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? <CheckCircle2 className="text-success" size={22} /> : <XCircle className="text-destructive" size={22} />}
            <span className={`font-display font-bold ${isCorrect ? "text-success" : "text-destructive"}`}>
              {isCorrect ? "برافو! كتابتك صح ✍️🎉" : "الإجابة الصحيحة:"}
            </span>
          </div>
          {!isCorrect && (
            <div className="bg-muted rounded-lg p-3 mt-2">
              <p className="font-bold text-foreground" dir="ltr" style={{ textAlign: "left" }}>{question.english}</p>
              <p className="text-sm text-muted-foreground mt-1">النطق: {question.pronunciation}</p>
            </div>
          )}
          {input && (
            <p className="text-sm text-muted-foreground mt-2">أنت كتبت: <span className="text-foreground" dir="ltr">{input}</span></p>
          )}
        </div>
      )}

      {/* Next */}
      {answered && (
        <button
          onClick={nextQuestion}
          className="w-full mt-5 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all"
        >
          <ChevronLeft size={20} />
          {currentQ + 1 >= questions.length ? "شوف النتيجة" : "السؤال التالي"}
        </button>
      )}
    </div>
  );
};

export default WritingPractice;
