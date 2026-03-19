import { useState } from "react";
import { stories, Story } from "@/data/stories";
import { speakText } from "@/lib/phonetics";
import { renderClickableText } from "@/components/TechTooltip";
import SpeedControl from "@/components/SpeedControl";
import { Volume2, ChevronLeft, Pen, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

const categoryTabs = [
  { id: "concrete", label: "الخرسانة", icon: "🧱" },
  { id: "soil", label: "التربة", icon: "🏗️" },
  { id: "asphalt", label: "الأسفلت", icon: "🛣️" },
  { id: "general", label: "الركام", icon: "📋" },
];

const Stories = () => {
  const [activeCategory, setActiveCategory] = useState("concrete");
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [speed, setSpeed] = useState(0.7);
  const [writingMode, setWritingMode] = useState(false);
  const [writingParaIdx, setWritingParaIdx] = useState(0);
  const [writingAttempt, setWritingAttempt] = useState(0);
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const maxAttempts = 10;

  const filtered = stories.filter((s) => s.category === activeCategory);

  const startWriting = (story: Story) => {
    setActiveStory(story);
    setWritingMode(true);
    setWritingParaIdx(0);
    setWritingAttempt(0);
    setInput("");
    setIsCorrect(null);
  };

  const checkWriting = () => {
    if (!activeStory || !input.trim()) return;
    const para = activeStory.paragraphs[writingParaIdx];
    const userAnswer = input.trim().toLowerCase().replace(/[.,!?;:]/g, "");
    const correct = para.english.toLowerCase().replace(/[.,!?;:]/g, "");
    const words = correct.split(/\s+/);
    const userWords = userAnswer.split(/\s+/);
    const matched = words.filter((w) => userWords.includes(w));
    const ratio = matched.length / words.length;
    setIsCorrect(ratio >= 0.6);
  };

  const nextWritingPara = () => {
    if (!activeStory) return;
    if (writingParaIdx + 1 < activeStory.paragraphs.length) {
      setWritingParaIdx((p) => p + 1);
      setWritingAttempt(0);
      setInput("");
      setIsCorrect(null);
    } else {
      setWritingMode(false);
    }
  };

  const retryWriting = () => {
    setInput("");
    setIsCorrect(null);
    setWritingAttempt((p) => p + 1);
  };

  // Writing mode
  if (writingMode && activeStory) {
    const para = activeStory.paragraphs[writingParaIdx];
    return (
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setWritingMode(false)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft size={16} /> رجوع
          </button>
          <span className="text-sm text-muted-foreground">
            فقرة {writingParaIdx + 1} / {activeStory.paragraphs.length} • محاولة {writingAttempt + 1} / {maxAttempts}
          </span>
        </div>

        <h3 className="text-lg font-display font-bold text-foreground mb-4">✍️ اكتب الفقرة بالإنجليزي</h3>

        <div className="bg-muted rounded-xl p-4 mb-3">
          <p className="text-lg font-bold text-primary leading-relaxed">{para.arabic}</p>
          <p className="text-sm text-muted-foreground mt-2">النطق: {para.pronunciation}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => speakText(para.english, speed)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
            <Volume2 size={14} /> اسمع
          </button>
          <SpeedControl speed={speed} onSpeedChange={setSpeed} />
        </div>

        {isCorrect === null ? (
          <div className="space-y-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب الفقرة بالإنجليزي هنا..."
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-base font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[120px] resize-none"
              dir="ltr" style={{ textAlign: "left" }}
            />
            <button onClick={checkWriting} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all">
              تأكيد ✓
            </button>
          </div>
        ) : (
          <div className={`rounded-xl p-4 border ${isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? <CheckCircle2 className="text-success" size={20} /> : <XCircle className="text-destructive" size={20} />}
              <span className={`font-display font-bold ${isCorrect ? "text-success" : "text-destructive"}`}>
                {isCorrect ? "ممتاز! 🎉" : "حاول تاني 💪"}
              </span>
            </div>
            {!isCorrect && (
              <div className="bg-muted rounded-lg p-3 mt-2">
                <p className="font-medium text-foreground text-sm" dir="ltr" style={{ textAlign: "left" }}>{para.english}</p>
              </div>
            )}
            <div className="flex gap-2 mt-4">
              {writingAttempt + 1 < maxAttempts && !isCorrect && (
                <button onClick={retryWriting} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all">
                  <RotateCcw size={14} /> حاول تاني
                </button>
              )}
              <button onClick={nextWritingPara} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all">
                {writingParaIdx + 1 < activeStory.paragraphs.length ? "الفقرة التالية ←" : "انتهى ✓"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Story detail
  if (activeStory) {
    return (
      <div>
        <button onClick={() => setActiveStory(null)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft size={16} /> رجوع للقصص
        </button>
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground">{activeStory.titleArabic}</h3>
              <p className="text-sm text-muted-foreground" dir="ltr">{activeStory.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <SpeedControl speed={speed} onSpeedChange={setSpeed} />
              <button
                onClick={() => startWriting(activeStory)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-all"
              >
                <Pen size={14} /> تمرين كتابة
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {activeStory.paragraphs.map((para, i) => (
              <div key={i} className="bg-muted rounded-xl p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-foreground font-medium leading-relaxed" dir="ltr" style={{ textAlign: "left" }}>
                    {renderClickableText(para.english)}
                  </p>
                  <button
                    onClick={() => speakText(para.english, speed)}
                    className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all shrink-0"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
                <p className="text-primary text-sm mt-2">{para.arabic}</p>
                <p className="text-xs text-muted-foreground mt-1">النطق: {para.pronunciation}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              activeStory.paragraphs.forEach((para, i) => {
                setTimeout(() => speakText(para.english, speed), i * 6000);
              });
            }}
            className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <Volume2 size={18} /> تشغيل القصة كاملة 🔊
          </button>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-2">📖 قصص المختبر</h2>
      <p className="text-muted-foreground mb-4">قصص واقعية عن إجراءات الاختبار وتحضير العينات</p>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveCategory(tab.id); setActiveStory(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((story) => (
          <button
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="bg-card rounded-xl border border-border p-5 text-right hover:border-primary hover:card-glow transition-all group"
          >
            <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors mb-1">
              {story.titleArabic}
            </h3>
            <p className="text-sm text-muted-foreground" dir="ltr" style={{ textAlign: "left" }}>{story.title}</p>
            <p className="text-xs text-muted-foreground mt-2">{story.paragraphs.length} فقرة</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Stories;
