import { useState, useCallback, useEffect } from "react";
import { categories, VocabWord } from "@/data/vocabulary";
import { toArabicPhonetic, speakText, downloadTextFile } from "@/lib/phonetics";
import {
  Volume2, Mic, MicOff, CheckCircle2, XCircle, RotateCcw,
  Trophy, Star, ChevronLeft, Pen, Ear, BookOpen, MessageSquare,
  Download, ArrowLeft
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

type QuizMode = "select" | "meaning" | "listening" | "pronounce" | "writing" | "sentence" | "results";

interface QuizQuestion {
  type: "meaning" | "listening" | "pronounce" | "writing" | "sentence";
  word: VocabWord;
  options?: string[];
  correctAnswer: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(categoryId: string): QuizQuestion[] {
  const cat = categories.find((c) => c.id === categoryId);
  if (!cat) return [];

  const words = shuffle(cat.words).slice(0, 8);
  const allWords = cat.words;
  const questions: QuizQuestion[] = [];

  for (const word of words) {
    // 1. Meaning: What does this word mean?
    // ✓ تأمين عدد الخيارات لو الـ category فيها كلمات قليلة
    const wrongMeanings = shuffle(allWords.filter((w) => w.english !== word.english))
      .slice(0, Math.min(3, allWords.length - 1))
      .map((w) => w.arabic);
    const meaningOptions = shuffle([word.arabic, ...wrongMeanings]);
    questions.push({
      type: "meaning",
      word,
      options: meaningOptions,
      correctAnswer: word.arabic,
    });

    // 2. Listening: Listen and pick the word
    const wrongWords = shuffle(allWords.filter((w) => w.english !== word.english))
      .slice(0, 3)
      .map((w) => w.english);
    const listeningOptions = shuffle([word.english, ...wrongWords]);
    questions.push({
      type: "listening",
      word,
      options: listeningOptions,
      correctAnswer: word.english,
    });
  }

  // 3 & 4. Pronunciation + Writing — ✓ نقسّم الـ 8 كلمات بينهما بدل تكرار نفس الكلمات
  const allShuffled = shuffle(words);
  const pronounceWords = allShuffled.slice(0, 4);
  const writingWords   = allShuffled.slice(4, 8);

  for (const word of pronounceWords) {
    questions.push({
      type: "pronounce",
      word,
      correctAnswer: word.english,
    });
  }

  for (const word of writingWords) {
    questions.push({
      type: "writing",
      word,
      correctAnswer: word.english,
    });
  }

  // 5. Sentence questions (pick 3 words that have examples)
  const sentenceWords = shuffle(words.filter((w) => w.example)).slice(0, 3);
  for (const word of sentenceWords) {
    questions.push({
      type: "sentence",
      word,
      correctAnswer: word.example!,
    });
  }

  return shuffle(questions);
}

const Quiz = () => {
  const [mode, setMode] = useState<QuizMode>("select");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [writingInput, setWritingInput] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState<QuizQuestion[]>([]);

  const question = questions[currentQ];
  const progress = questions.length > 0 ? ((currentQ) / questions.length) * 100 : 0;

  const startQuiz = (catId: string) => {
    setSelectedCategory(catId);
    const qs = generateQuestions(catId);
    setQuestions(qs);
    setCurrentQ(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setWrongAnswers([]);
    setMode(qs[0]?.type || "select");
  };

  const handleAnswer = useCallback((answer: string) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(answer);
    const correct = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
    else setWrongAnswers((prev) => [...prev, question]);
  }, [answered, question]);

  const handleWritingSubmit = () => {
    if (!writingInput.trim()) return;
    handleAnswer(writingInput.trim());
  };

  const nextQuestion = () => {
    const next = currentQ + 1;
    if (next >= questions.length) {
      setMode("results");
      return;
    }
    setCurrentQ(next);
    setAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setWritingInput("");
    setMode(questions[next].type);
  };

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("المتصفح لا يدعم التعرف على الصوت. جرب متصفح Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    setIsRecording(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsRecording(false);
      handleAnswer(transcript);
    };
    recognition.onerror = () => {
      setIsRecording(false);
      handleAnswer("__error__");
    };
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meaning": return <BookOpen size={18} />;
      case "listening": return <Ear size={18} />;
      case "pronounce": return <Mic size={18} />;
      case "writing": return <Pen size={18} />;
      case "sentence": return <MessageSquare size={18} />;
      default: return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "meaning": return "معنى الكلمة";
      case "listening": return "استماع";
      case "pronounce": return "نطق";
      case "writing": return "كتابة";
      case "sentence": return "جملة";
      default: return "";
    }
  };

  // Category selection
  if (mode === "select") {
    return (
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">📝 اختبر نفسك</h2>
        <p className="text-muted-foreground mb-6">اختار القسم اللي عايز تمتحن فيه</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => startQuiz(cat.id)}
              className="bg-card rounded-xl border border-border p-6 text-right hover:border-primary hover:card-glow transition-all duration-300 group"
            >
              <span className="text-4xl block mb-3">{cat.icon}</span>
              <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{cat.words.length} كلمة</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["معنى", "استماع", "نطق", "كتابة", "جمل"].map((t) => (
                  <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Results
  if (mode === "results") {
    const percentage = Math.round((score / questions.length) * 100);
    const level = percentage >= 90 ? "🏆 ممتاز!" : percentage >= 70 ? "⭐ جيد جداً!" : percentage >= 50 ? "👍 جيد، كمّل!" : "💪 محتاج تراجع أكتر";
    
    const downloadResults = () => {
      let content = `نتيجة الاختبار - ${categories.find(c => c.id === selectedCategory)?.name}\n`;
      content += `الدرجة: ${score}/${questions.length} (${percentage}%)\n`;
      content += `المستوى: ${level}\n\n`;
      
      if (wrongAnswers.length > 0) {
        content += "=== الكلمات اللي محتاج تراجعها ===\n\n";
        wrongAnswers.forEach((q) => {
          content += `${q.word.english} - ${q.word.arabic}\n`;
          content += `النطق: ${q.word.pronunciation}\n`;
          if (q.word.example) content += `مثال: ${q.word.example}\n`;
          content += "\n";
        });
      }
      downloadTextFile("quiz-results.txt", content);
    };

    return (
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 text-center">
        <div className="text-6xl mb-4">{percentage >= 70 ? "🎉" : "📚"}</div>
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">{level}</h2>
        <p className="text-muted-foreground mb-6">
          {categories.find((c) => c.id === selectedCategory)?.name}
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

        {/* Wrong answers review */}
        {wrongAnswers.length > 0 && (
          <div className="text-right mb-6">
            <h3 className="text-lg font-display font-bold text-foreground mb-3">📖 راجع الكلمات دي:</h3>
            <div className="grid gap-3">
              {wrongAnswers.map((q, i) => (
                <div key={i} className="bg-muted rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-foreground" dir="ltr" style={{ textAlign: "left" }}>{q.word.english}</p>
                    <p className="text-primary text-sm">{q.word.arabic} • {q.word.pronunciation}</p>
                  </div>
                  <button
                    onClick={() => speakText(q.word.english)}
                    className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => startQuiz(selectedCategory)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
          >
            <RotateCcw size={18} />
            أعد الاختبار
          </button>
          <button
            onClick={() => setMode("select")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all"
          >
            <ArrowLeft size={18} />
            اختار قسم تاني
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
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getTypeIcon(question.type)}
            <span>{getTypeLabel(question.type)}</span>
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
          <button
            onClick={() => setMode("select")}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            إلغاء الاختبار
          </button>
        </div>
      </div>

      {/* ====== MEANING ====== */}
      {question.type === "meaning" && (
        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-1">ما معنى هذه الكلمة؟</h3>
          <div className="bg-muted rounded-xl p-5 mb-5 flex items-center justify-between">
            <p className="text-2xl font-bold text-foreground" dir="ltr">{question.word.english}</p>
            <button
              onClick={() => speakText(question.word.english)}
              className="p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Volume2 size={20} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-2">النطق: <span className="text-foreground font-semibold">{question.word.pronunciation}</span></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options!.map((opt) => {
              let cls = "bg-secondary text-secondary-foreground hover:bg-secondary/70 border-transparent";
              if (answered) {
                if (opt === question.correctAnswer) cls = "bg-success/20 text-success border-success/40";
                else if (opt === selectedAnswer && !isCorrect) cls = "bg-destructive/20 text-destructive border-destructive/40";
                else cls = "bg-secondary/50 text-muted-foreground border-transparent opacity-60";
              }
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={answered}
                  className={`p-4 rounded-xl border-2 font-semibold text-lg transition-all ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ====== LISTENING ====== */}
      {question.type === "listening" && (
        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-1">اسمع واختار الكلمة الصح</h3>
          <div className="bg-muted rounded-xl p-5 mb-5 flex items-center justify-center">
            <button
              onClick={() => speakText(question.word.english, 0.7)}
              className="flex items-center gap-3 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all"
            >
              <Volume2 size={24} />
              اضغط واسمع 🔊
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options!.map((opt) => {
              let cls = "bg-secondary text-secondary-foreground hover:bg-secondary/70 border-transparent";
              if (answered) {
                if (opt === question.correctAnswer) cls = "bg-success/20 text-success border-success/40";
                else if (opt === selectedAnswer && !isCorrect) cls = "bg-destructive/20 text-destructive border-destructive/40";
                else cls = "bg-secondary/50 text-muted-foreground border-transparent opacity-60";
              }
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={answered}
                  className={`p-4 rounded-xl border-2 font-bold text-lg transition-all ${cls}`}
                  dir="ltr"
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {answered && (
            <p className="text-sm text-muted-foreground mt-3">
              النطق: <span className="text-foreground font-semibold">{question.word.pronunciation}</span> • المعنى: <span className="text-primary">{question.word.arabic}</span>
            </p>
          )}
        </div>
      )}

      {/* ====== PRONOUNCE ====== */}
      {question.type === "pronounce" && (
        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-1">انطق الكلمة دي</h3>
          <div className="bg-muted rounded-xl p-5 mb-3 text-center">
            <p className="text-3xl font-bold text-foreground mb-2" dir="ltr">{question.word.english}</p>
            <p className="text-primary text-lg">{question.word.arabic}</p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-5">
            <p className="text-sm text-primary mb-0.5">💡 النطق بالعربي:</p>
            <p className="text-foreground font-display font-bold text-xl">{question.word.pronunciation}</p>
          </div>

          {!answered ? (
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => speakText(question.word.english, 0.7)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all"
              >
                <Volume2 size={18} />
                اسمع النطق الصح الأول
              </button>
              <button
                onClick={startRecording}
                disabled={isRecording}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                  isRecording
                    ? "bg-destructive text-destructive-foreground pulse-record"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                {isRecording ? "جاري التسجيل..." : "🎙️ سجل صوتك"}
              </button>
            </div>
          ) : (
            <div className={`rounded-xl p-4 border ${isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}>
              <div className="flex items-center gap-2">
                {isCorrect ? <CheckCircle2 className="text-success" size={22} /> : <XCircle className="text-destructive" size={22} />}
                <span className={`font-display font-bold ${isCorrect ? "text-success" : "text-destructive"}`}>
                  {isCorrect ? "ممتاز! نطقك صح 🎉" : "حاول تاني، الإجابة: " + question.word.english}
                </span>
              </div>
              {selectedAnswer && selectedAnswer !== "__error__" && (
                <p className="text-sm text-muted-foreground mt-1">أنت قلت: <span className="text-foreground" dir="ltr">{selectedAnswer}</span></p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ====== WRITING ====== */}
      {question.type === "writing" && (
        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-1">اكتب الكلمة بالإنجليزي</h3>
          <div className="bg-muted rounded-xl p-5 mb-3 text-center">
            <p className="text-2xl font-bold text-primary mb-1">{question.word.arabic}</p>
            <p className="text-foreground font-display font-semibold">{question.word.pronunciation}</p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => speakText(question.word.english, 0.7)}
              className="p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Volume2 size={18} />
            </button>
            <span className="text-sm text-muted-foreground">اسمع الكلمة وحاول تكتبها</span>
          </div>

          {!answered ? (
            <div className="flex gap-3">
              <input
                type="text"
                value={writingInput}
                onChange={(e) => setWritingInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleWritingSubmit()}
                placeholder="اكتب الكلمة هنا..."
                className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-lg font-bold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                dir="ltr"
                style={{ textAlign: "left" }}
                autoFocus
              />
              <button
                onClick={handleWritingSubmit}
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all"
              >
                تأكيد
              </button>
            </div>
          ) : (
            <div className={`rounded-xl p-4 border ${isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? <CheckCircle2 className="text-success" size={22} /> : <XCircle className="text-destructive" size={22} />}
                <span className={`font-display font-bold ${isCorrect ? "text-success" : "text-destructive"}`}>
                  {isCorrect ? "برافو! كتابتك صح ✍️" : "الإجابة الصحيحة:"}
                </span>
              </div>
              {!isCorrect && (
                <p className="text-xl font-bold text-foreground" dir="ltr" style={{ textAlign: "left" }}>
                  {question.word.english}
                </p>
              )}
              {selectedAnswer && (
                <p className="text-sm text-muted-foreground mt-1">أنت كتبت: <span className="text-foreground" dir="ltr">{selectedAnswer}</span></p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ====== SENTENCE ====== */}
      {question.type === "sentence" && (
        <div>
          <h3 className="text-lg font-display font-bold text-foreground mb-1">انطق الجملة دي</h3>
          <div className="bg-muted rounded-xl p-5 mb-3">
            <p className="text-xl font-bold text-foreground mb-2" dir="ltr" style={{ textAlign: "left" }}>
              {question.word.example}
            </p>
            <p className="text-primary">{question.word.exampleArabic}</p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-5">
            <p className="text-sm text-primary mb-0.5">النطق بالعربي:</p>
            <p className="text-foreground font-display font-semibold text-lg">
              {toArabicPhonetic(question.word.example || "")}
            </p>
          </div>

          {!answered ? (
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => speakText(question.word.example || "", 0.65)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all"
              >
                <Volume2 size={18} />
                اسمع الجملة الأول
              </button>
              <button
                onClick={startRecording}
                disabled={isRecording}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                  isRecording
                    ? "bg-destructive text-destructive-foreground pulse-record"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                {isRecording ? "جاري التسجيل..." : "🎙️ سجل صوتك"}
              </button>
            </div>
          ) : (
            <div className={`rounded-xl p-4 border ${isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}>
              <div className="flex items-center gap-2">
                {isCorrect ? <CheckCircle2 className="text-success" size={22} /> : <XCircle className="text-destructive" size={22} />}
                <span className={`font-display font-bold ${isCorrect ? "text-success" : "text-destructive"}`}>
                  {isCorrect ? "ممتاز! 🎉" : "حاول تاني 💪"}
                </span>
              </div>
              {selectedAnswer && selectedAnswer !== "__error__" && (
                <p className="text-sm text-muted-foreground mt-1">أنت قلت: <span className="text-foreground" dir="ltr">{selectedAnswer}</span></p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Next button */}
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

export default Quiz;
