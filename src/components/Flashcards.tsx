import { useState, useMemo, useCallback } from "react";
import { getCategories, VocabWord } from "@/data/vocabulary";
import { speakText } from "@/lib/phonetics";
import { getReviewData, updateWordLevel, recordWordSeen, WordReview } from "@/lib/progress";
import { Volume2, RotateCcw, ThumbsUp, ThumbsDown, Eye, EyeOff } from "lucide-react";
import SpeedControl from "@/components/SpeedControl";

const categoryTabs = [
  { id: "soil",     label: "التربة",    icon: "🏗️" },
  { id: "concrete", label: "الخرسانة", icon: "🧱" },
  { id: "asphalt",  label: "الأسفلت",  icon: "🛣️" },
  { id: "general",  label: "عامة",      icon: "📋" },
];

const Flashcards = () => {
  const allCategories = useMemo(() => getCategories(), []);
  const [activeCategory, setActiveCategory] = useState("soil");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [speed, setSpeed] = useState(0.7);
  const [sessionMode, setSessionMode] = useState<"browse" | "review">("browse");

  // ✓ reviewData كـ state عادي بدل useMemo مع dependency على currentIndex (كان hack)
  const [reviewData, setReviewData] = useState<Record<string, WordReview>>(() => getReviewData());

  const words = useMemo(() => {
    if (sessionMode === "review") {
      return Object.values(reviewData)
        .filter((r) => r.level <= 2)
        .map((r) => {
          const cat = allCategories.find((c) => c.id === r.category);
          const word = cat?.words.find((w) => w.english.toLowerCase() === r.word.toLowerCase());
          return word || { english: r.word, arabic: r.arabic, pronunciation: "", category: r.category };
        });
    }
    const cat = allCategories.find((c) => c.id === activeCategory);
    return cat?.words || [];
  }, [activeCategory, allCategories, sessionMode, reviewData]);

  const currentWord = words[currentIndex];

  const getLevel = (word: string) => {
    const r = reviewData[word.toLowerCase()];
    return r ? r.level : 0;
  };

  const getLevelColor = (level: number) => {
    if (level <= 1) return "bg-destructive/20 text-destructive";
    if (level <= 3) return "bg-warning/20 text-warning-foreground";
    return "bg-success/20 text-[hsl(var(--success))]";
  };

  const getLevelLabel = (level: number) => {
    if (level <= 1) return "🔴 تحتاج مراجعة";
    if (level <= 3) return "🟡 تحتاج تقوية";
    return "🟢 متقن";
  };

  const handleAnswer = useCallback((knew: boolean) => {
    if (!currentWord) return;
    updateWordLevel(currentWord.english, knew);
    // ✓ تحديث reviewData مباشرة بعد الإجابة بدل الاعتماد على currentIndex كـ trigger
    setReviewData(getReviewData());
    setFlipped(false);
    if (currentIndex + 1 < words.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentWord, currentIndex, words.length]);

  const handleFlip = () => {
    if (!flipped && currentWord) {
      recordWordSeen(currentWord.english, currentWord.arabic, currentWord.category);
    }
    setFlipped(!flipped);
  };

  const getStats = () => {
    const all = Object.values(reviewData);
    return {
      needReview: all.filter((r) => r.level <= 1).length,
      needPractice: all.filter((r) => r.level >= 2 && r.level <= 3).length,
      mastered: all.filter((r) => r.level >= 4).length,
    };
  };

  if (!currentWord || words.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">🎉</p>
        <h3 className="text-xl font-display font-bold text-foreground mb-2">
          {sessionMode === "review" ? "لا توجد كلمات تحتاج مراجعة!" : "لا توجد كلمات"}
        </h3>
        <p className="text-muted-foreground mb-4">
          {sessionMode === "review" ? "أحسنت! كل الكلمات متقنة" : "اختر قسم آخر"}
        </p>
        {sessionMode === "review" && (
          <button onClick={() => setSessionMode("browse")} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold">
            تصفح الكلمات
          </button>
        )}
      </div>
    );
  }

  const level = getLevel(currentWord.english);
  const stats = getStats();

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">🔁 بطاقات المراجعة</h2>
          <p className="text-muted-foreground text-sm">اضغط على البطاقة لقلبها</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setSessionMode("browse"); setCurrentIndex(0); setFlipped(false); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${sessionMode === "browse" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
          >
            تصفح
          </button>
          <button
            onClick={() => { setSessionMode("review"); setCurrentIndex(0); setFlipped(false); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${sessionMode === "review" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
          >
            🔁 مراجعة ذكية
          </button>
        </div>
      </div>

      {sessionMode === "browse" && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveCategory(tab.id); setCurrentIndex(0); setFlipped(false); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === tab.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground mb-3">
        {currentIndex + 1} / {words.length}
      </p>

      <div
        onClick={handleFlip}
        className="relative bg-card rounded-2xl border-2 border-border hover:border-primary cursor-pointer transition-all duration-300 min-h-[280px] flex items-center justify-center p-8 card-glow mx-auto max-w-lg"
      >
        {!flipped ? (
          <div className="text-center">
            <p className="text-4xl font-display font-extrabold text-foreground mb-4" dir="ltr">
              {currentWord.english}
            </p>
            <div className="flex items-center justify-center gap-2 mb-3">
              <button
                onClick={(e) => { e.stopPropagation(); speakText(currentWord.english, speed); }}
                className="p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Volume2 size={20} />
              </button>
              <SpeedControl speed={speed} onSpeedChange={setSpeed} />
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(level)}`}>
              {getLevelLabel(level)}
            </div>
            <p className="text-muted-foreground text-sm mt-3 flex items-center justify-center gap-1">
              <Eye size={14} /> اضغط لإظهار الإجابة
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-3xl font-display font-bold text-primary mb-2">{currentWord.arabic}</p>
            <p className="text-xl text-foreground font-display mb-1" dir="ltr">{currentWord.english}</p>
            <p className="text-muted-foreground text-lg mb-2">{currentWord.pronunciation}</p>
            {currentWord.example && (
              <div className="bg-muted rounded-lg p-3 mt-3 text-sm">
                <p className="text-foreground" dir="ltr" style={{ textAlign: "left" }}>{currentWord.example}</p>
                <p className="text-primary mt-1">{currentWord.exampleArabic}</p>
              </div>
            )}
            <p className="text-muted-foreground text-sm mt-3 flex items-center justify-center gap-1">
              <EyeOff size={14} /> اضغط لقلب البطاقة
            </p>
          </div>
        )}
      </div>

      {flipped && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handleAnswer(false)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-destructive/10 text-destructive font-bold hover:bg-destructive hover:text-destructive-foreground transition-all"
          >
            <ThumbsDown size={18} /> صعبة
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-success/10 text-[hsl(var(--success))] font-bold hover:bg-[hsl(var(--success))] hover:text-[hsl(var(--success-foreground))] transition-all"
          >
            <ThumbsUp size={18} /> عرفتها
          </button>
        </div>
      )}

      {!flipped && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => { setCurrentIndex(Math.max(0, currentIndex - 1)); setFlipped(false); }}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-semibold disabled:opacity-30"
          >
            ← السابقة
          </button>
          <button
            onClick={() => { setCurrentIndex(Math.min(words.length - 1, currentIndex + 1)); setFlipped(false); }}
            disabled={currentIndex >= words.length - 1}
            className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-semibold disabled:opacity-30"
          >
            التالية →
          </button>
        </div>
      )}

      <div className="mt-8 grid grid-cols-3 gap-3">
        {[
          { label: "🔴 تحتاج مراجعة", count: stats.needReview },
          { label: "🟡 تحتاج تقوية",  count: stats.needPractice },
          { label: "🟢 متقن",          count: stats.mastered },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-3 text-center">
            <p className="text-2xl font-display font-bold text-foreground">{stat.count}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
