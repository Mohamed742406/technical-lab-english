import { useState, useRef } from "react";
import { speakText } from "@/lib/phonetics";
import { Volume2, Mic, MicOff, ChevronLeft, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import SpeedControl from "@/components/SpeedControl";
import { addXP, XP_REWARDS, Achievement } from "@/lib/gamification";
import XPNotification from "@/components/XPNotification";

interface PracticeWord {
  english: string;
  arabic: string;
  pronunciation: string;
  difficulty: "easy" | "medium" | "hard";
}

interface PracticeCategory {
  id: string;
  title: string;
  icon: string;
  words: PracticeWord[];
}

const categories: PracticeCategory[] = [
  {
    id: "basic", title: "كلمات أساسية", icon: "🔤",
    words: [
      { english: "Test", arabic: "اختبار", pronunciation: "تيست", difficulty: "easy" },
      { english: "Sample", arabic: "عينة", pronunciation: "سامبل", difficulty: "easy" },
      { english: "Water", arabic: "ماء", pronunciation: "ووتر", difficulty: "easy" },
      { english: "Weight", arabic: "وزن", pronunciation: "وايت", difficulty: "easy" },
      { english: "Result", arabic: "نتيجة", pronunciation: "ريزالت", difficulty: "easy" },
      { english: "Report", arabic: "تقرير", pronunciation: "ريبورت", difficulty: "easy" },
      { english: "Check", arabic: "فحص", pronunciation: "تشيك", difficulty: "easy" },
      { english: "Record", arabic: "سجل", pronunciation: "ريكورد", difficulty: "easy" },
    ],
  },
  {
    id: "concrete", title: "مصطلحات الخرسانة", icon: "🧱",
    words: [
      { english: "Concrete", arabic: "خرسانة", pronunciation: "كونكريت", difficulty: "medium" },
      { english: "Cement", arabic: "أسمنت", pronunciation: "سيمنت", difficulty: "easy" },
      { english: "Aggregate", arabic: "ركام", pronunciation: "أجريجيت", difficulty: "medium" },
      { english: "Slump", arabic: "هبوط", pronunciation: "سلامب", difficulty: "easy" },
      { english: "Compressive", arabic: "ضغطي", pronunciation: "كومبريسيف", difficulty: "hard" },
      { english: "Curing", arabic: "معالجة", pronunciation: "كيورينج", difficulty: "medium" },
      { english: "Admixture", arabic: "إضافة", pronunciation: "أدميكستشر", difficulty: "hard" },
      { english: "Plasticizer", arabic: "ملدن", pronunciation: "بلاستيسايزر", difficulty: "hard" },
      { english: "Vibrator", arabic: "هزاز", pronunciation: "فايبريتور", difficulty: "medium" },
      { english: "Formwork", arabic: "شدة", pronunciation: "فورم وورك", difficulty: "medium" },
    ],
  },
  {
    id: "soil", title: "مصطلحات التربة", icon: "🏗️",
    words: [
      { english: "Soil", arabic: "تربة", pronunciation: "سويل", difficulty: "easy" },
      { english: "Compaction", arabic: "دمك", pronunciation: "كومباكشن", difficulty: "medium" },
      { english: "Moisture", arabic: "رطوبة", pronunciation: "مويستشر", difficulty: "medium" },
      { english: "Density", arabic: "كثافة", pronunciation: "دينسيتي", difficulty: "medium" },
      { english: "Permeability", arabic: "نفاذية", pronunciation: "بيرميابيليتي", difficulty: "hard" },
      { english: "Penetration", arabic: "اختراق", pronunciation: "بينيتريشن", difficulty: "hard" },
      { english: "Plasticity", arabic: "لدونة", pronunciation: "بلاستيسيتي", difficulty: "hard" },
      { english: "Consolidation", arabic: "تماسك", pronunciation: "كونسوليديشن", difficulty: "hard" },
    ],
  },
  {
    id: "asphalt", title: "مصطلحات الأسفلت", icon: "🛣️",
    words: [
      { english: "Asphalt", arabic: "أسفلت", pronunciation: "أسفالت", difficulty: "easy" },
      { english: "Bitumen", arabic: "بيتومين", pronunciation: "بيتيومن", difficulty: "medium" },
      { english: "Stability", arabic: "ثبات", pronunciation: "ستابيليتي", difficulty: "medium" },
      { english: "Marshall", arabic: "مارشال", pronunciation: "مارشال", difficulty: "easy" },
      { english: "Viscosity", arabic: "لزوجة", pronunciation: "فيسكوسيتي", difficulty: "hard" },
      { english: "Ductility", arabic: "متانة", pronunciation: "داكتيليتي", difficulty: "hard" },
      { english: "Gradation", arabic: "تدرج حبيبي", pronunciation: "جريديشن", difficulty: "medium" },
      { english: "Extraction", arabic: "استخلاص", pronunciation: "إكستراكشن", difficulty: "hard" },
    ],
  },
  {
    id: "equipment", title: "المعدات", icon: "🔧",
    words: [
      { english: "Oven", arabic: "فرن", pronunciation: "أوفن", difficulty: "easy" },
      { english: "Scale", arabic: "ميزان", pronunciation: "سكيل", difficulty: "easy" },
      { english: "Sieve", arabic: "منخل", pronunciation: "سيف", difficulty: "easy" },
      { english: "Thermometer", arabic: "ميزان حرارة", pronunciation: "ثيرموميتر", difficulty: "hard" },
      { english: "Hydrometer", arabic: "هيدروميتر", pronunciation: "هايدروميتر", difficulty: "hard" },
      { english: "Caliper", arabic: "قدمة", pronunciation: "كاليبر", difficulty: "medium" },
      { english: "Mold", arabic: "قالب", pronunciation: "مولد", difficulty: "easy" },
      { english: "Tamping rod", arabic: "قضيب الدمك", pronunciation: "تامبينج رود", difficulty: "medium" },
    ],
  },
  {
    id: "pv", title: "أصوات P و V الصعبة", icon: "⚠️",
    words: [
      { english: "Pour", arabic: "صب", pronunciation: "بور (مع نفخ)", difficulty: "hard" },
      { english: "Pressure", arabic: "ضغط", pronunciation: "بريشر (P مع نفخ)", difficulty: "hard" },
      { english: "Penetration", arabic: "اختراق", pronunciation: "بينيتريشن", difficulty: "hard" },
      { english: "Pipe", arabic: "ماسورة", pronunciation: "بايب (P)", difficulty: "hard" },
      { english: "Vibrator", arabic: "هزاز", pronunciation: "فايبريتور (V مع اهتزاز)", difficulty: "hard" },
      { english: "Valve", arabic: "صمام", pronunciation: "فالف (V)", difficulty: "hard" },
      { english: "Volume", arabic: "حجم", pronunciation: "فوليوم (V)", difficulty: "hard" },
      { english: "Verify", arabic: "تحقق", pronunciation: "فيريفاي (V)", difficulty: "hard" },
    ],
  },
];

const PronunciationTrainer = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "tryagain" | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [speed, setSpeed] = useState(0.5);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [xpNotif, setXpNotif] = useState<{ xp: number; achievements: Achievement[]; leveledUp: boolean } | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const category = categories.find(c => c.id === activeCategory);
  const currentWord = category?.words[currentWordIdx];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setRecordedBlob(blob);
        stream.getTracks().forEach(t => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setFeedback(null);
      setRecordedBlob(null);

      // Auto-stop after 3 seconds
      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          setIsRecording(false);
        }
      }, 3000);
    } catch {
      alert("يرجى السماح بالوصول للميكروفون لاستخدام هذه الميزة");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const audio = new Audio(url);
      audio.play();
      audio.onended = () => URL.revokeObjectURL(url);
    }
  };

  const markCorrect = () => {
    setFeedback("correct");
    setScore(s => s + 1);
    setTotalAttempts(t => t + 1);
  };

  const markTryAgain = () => {
    setFeedback("tryagain");
    setTotalAttempts(t => t + 1);
  };

  const nextWord = () => {
    if (!category) return;
    if (currentWordIdx < category.words.length - 1) {
      setCurrentWordIdx(i => i + 1);
      setRecordedBlob(null);
      setFeedback(null);
    } else {
      setPracticeComplete(true);
      const result = addXP(XP_REWARDS.lessonCompleted, "lessonCompleted");
      setXpNotif({ xp: XP_REWARDS.lessonCompleted, achievements: result.newAchievements, leveledUp: result.leveledUp });
    }
  };

  // Practice complete
  if (practiceComplete && category) {
    return (
      <div className="text-center" dir="rtl">
        {xpNotif && <XPNotification {...xpNotif} onDone={() => setXpNotif(null)} />}
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="text-5xl mb-4">🎤</div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-2">أحسنت!</h3>
          <p className="text-muted-foreground mb-2">أكملت تدريب النطق: {category.title}</p>
          <p className="text-lg text-primary font-bold mb-4">النتيجة: {score}/{totalAttempts}</p>
          <p className="text-accent font-bold mb-6">+{XP_REWARDS.lessonCompleted} XP ⭐</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => { setCurrentWordIdx(0); setScore(0); setTotalAttempts(0); setPracticeComplete(false); setRecordedBlob(null); setFeedback(null); }}
              className="px-6 py-2 rounded-xl bg-secondary text-secondary-foreground font-bold">إعادة</button>
            <button onClick={() => { setActiveCategory(null); setPracticeComplete(false); setScore(0); setTotalAttempts(0); }}
              className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold">رجوع</button>
          </div>
        </div>
      </div>
    );
  }

  // Active practice
  if (category && currentWord) {
    const diffColor = currentWord.difficulty === "easy" ? "text-green-500" : currentWord.difficulty === "medium" ? "text-yellow-500" : "text-red-500";
    const diffLabel = currentWord.difficulty === "easy" ? "سهل" : currentWord.difficulty === "medium" ? "متوسط" : "صعب";

    return (
      <div dir="rtl">
        {xpNotif && <XPNotification {...xpNotif} onDone={() => setXpNotif(null)} />}
        <button onClick={() => { setActiveCategory(null); setCurrentWordIdx(0); setRecordedBlob(null); setFeedback(null); }}
          className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
          <ChevronLeft size={14} /> رجوع
        </button>

        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-foreground">{category.title}</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{currentWordIdx + 1}/{category.words.length}</span>
          </div>

          <div className="w-full bg-muted rounded-full h-2 mb-6">
            <div className="bg-gradient-to-l from-primary to-accent h-2 rounded-full transition-all" style={{ width: `${((currentWordIdx + 1) / category.words.length) * 100}%` }} />
          </div>

          <div className="text-center space-y-4">
            <span className={`text-xs font-bold ${diffColor}`}>● {diffLabel}</span>
            <p className="text-4xl font-display font-extrabold text-foreground" dir="ltr">{currentWord.english}</p>
            <p className="text-xl text-primary font-bold">{currentWord.arabic}</p>
            <p className="text-sm text-muted-foreground">🗣️ {currentWord.pronunciation}</p>

            {/* Listen to correct pronunciation */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">1️⃣ استمع للنطق الصحيح:</p>
              <button onClick={() => speakText(currentWord.english, speed)}
                className="mx-auto flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                <Volume2 size={20} /> استمع 🔊
              </button>
              <SpeedControl speed={speed} onSpeedChange={setSpeed} />
            </div>

            {/* Record */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">2️⃣ سجل نطقك:</p>
              {!isRecording ? (
                <button onClick={startRecording}
                  className="mx-auto flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                  <Mic size={20} /> ابدأ التسجيل 🎤
                </button>
              ) : (
                <button onClick={stopRecording}
                  className="mx-auto flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white animate-pulse">
                  <MicOff size={20} /> إيقاف التسجيل ⏹️
                </button>
              )}
            </div>

            {/* Playback & compare */}
            {recordedBlob && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">3️⃣ قارن نطقك مع النطق الصحيح:</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => speakText(currentWord.english, speed)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary">
                    <Volume2 size={16} /> الصحيح
                  </button>
                  <button onClick={playRecording}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 text-accent">
                    <Mic size={16} /> تسجيلك
                  </button>
                </div>

                {!feedback && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">4️⃣ هل نطقك صحيح؟</p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={markCorrect}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500/20 font-bold">
                        <CheckCircle2 size={18} /> صحيح ✓
                      </button>
                      <button onClick={markTryAgain}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 font-bold">
                        <XCircle size={18} /> حاول تاني
                      </button>
                    </div>
                  </div>
                )}

                {feedback === "correct" && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-500 font-bold text-lg">✅ ممتاز! نطقك صحيح</p>
                    <button onClick={nextWord} className="mt-3 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold">
                      {currentWordIdx < category.words.length - 1 ? "الكلمة التالية ←" : "✓ إنهاء التدريب"}
                    </button>
                  </div>
                )}

                {feedback === "tryagain" && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <p className="text-yellow-500 font-bold text-lg">💪 حاول مرة تانية</p>
                    <p className="text-sm text-muted-foreground mt-1">استمع للنطق الصحيح مرة تانية وسجل</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => { setRecordedBlob(null); setFeedback(null); }}
                        className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold flex items-center justify-center gap-2">
                        <RotateCcw size={16} /> إعادة التسجيل
                      </button>
                      <button onClick={nextWord}
                        className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold">
                        تخطي ←
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Category list
  return (
    <div dir="rtl">
      <h2 className="text-2xl font-display font-bold text-foreground mb-2">🎤 تدريب النطق</h2>
      <p className="text-muted-foreground mb-2 text-sm">سجل صوتك وقارنه مع النطق الصحيح</p>
      <p className="text-xs text-accent mb-6">استمع → سجل → قارن → كرر</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setCurrentWordIdx(0); setScore(0); setTotalAttempts(0); setPracticeComplete(false); setRecordedBlob(null); setFeedback(null); }}
            className="bg-card rounded-xl border border-border p-5 text-right hover:border-primary hover:shadow-md transition-all group">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{cat.icon}</span>
              <div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{cat.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.words.length} كلمة</p>
                <div className="flex gap-1 mt-1">
                  {cat.words.filter(w => w.difficulty === "easy").length > 0 && <span className="text-[10px] bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded">سهل</span>}
                  {cat.words.filter(w => w.difficulty === "hard").length > 0 && <span className="text-[10px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded">صعب</span>}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PronunciationTrainer;
