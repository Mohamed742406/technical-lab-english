import { useState } from "react";
import { conversations, speakerLabels, Conversation } from "@/data/conversations";
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

const speakerColors: Record<string, string> = {
  technician: "bg-primary/10 border-primary/30",
  supervisor: "bg-accent/10 border-accent/30",
  engineer: "bg-success/10 border-[hsl(var(--success))]/30",
  worker: "bg-secondary border-border",
};

const Conversations = () => {
  const [activeCategory, setActiveCategory] = useState("concrete");
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [speed, setSpeed] = useState(0.7);
  const [writingMode, setWritingMode] = useState(false);
  const [writingLineIdx, setWritingLineIdx] = useState(0);
  const [writingAttempt, setWritingAttempt] = useState(0);
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const maxAttempts = 10;

  const filtered = conversations.filter((c) => c.category === activeCategory);

  const startWriting = (conv: Conversation) => {
    setActiveConv(conv);
    setWritingMode(true);
    setWritingLineIdx(0);
    setWritingAttempt(0);
    setInput("");
    setIsCorrect(null);
    setTotalAttempts(0);
  };

  const checkWriting = () => {
    if (!activeConv || !input.trim()) return;
    const line = activeConv.lines[writingLineIdx];
    const userAnswer = input.trim().toLowerCase().replace(/[.,!?;:]/g, "");
    const correct = line.english.toLowerCase().replace(/[.,!?;:]/g, "");
    const words = correct.split(/\s+/);
    const userWords = userAnswer.split(/\s+/);
    const matched = words.filter((w) => userWords.includes(w));
    const ratio = matched.length / words.length;
    const match = ratio >= 0.7;
    setIsCorrect(match);
    setTotalAttempts((p) => p + 1);
  };

  const nextWritingLine = () => {
    if (!activeConv) return;
    if (writingLineIdx + 1 < activeConv.lines.length) {
      setWritingLineIdx((p) => p + 1);
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
  if (writingMode && activeConv) {
    const line = activeConv.lines[writingLineIdx];
    return (
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setWritingMode(false)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft size={16} /> رجوع
          </button>
          <span className="text-sm text-muted-foreground">
            سطر {writingLineIdx + 1} / {activeConv.lines.length} • محاولة {writingAttempt + 1} / {maxAttempts}
          </span>
        </div>

        <h3 className="text-lg font-display font-bold text-foreground mb-4">✍️ اكتب الجملة بالإنجليزي</h3>

        <div className="bg-muted rounded-xl p-4 mb-3">
          <p className="text-xs text-muted-foreground mb-1">{speakerLabels[line.speaker]}:</p>
          <p className="text-lg font-bold text-primary">{line.arabic}</p>
          <p className="text-sm text-muted-foreground mt-1">النطق: {line.pronunciation}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => speakText(line.english, speed)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
            <Volume2 size={14} /> اسمع
          </button>
          <SpeedControl speed={speed} onSpeedChange={setSpeed} />
        </div>

        {isCorrect === null ? (
          <div className="space-y-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkWriting()}
              placeholder="اكتب الجملة بالإنجليزي..."
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-lg font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              dir="ltr" style={{ textAlign: "left" }} autoFocus
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
                {isCorrect ? "ممتاز! ✍️🎉" : "حاول تاني 💪"}
              </span>
            </div>
            {!isCorrect && (
              <div className="bg-muted rounded-lg p-3 mt-2">
                <p className="font-bold text-foreground text-sm" dir="ltr" style={{ textAlign: "left" }}>{line.english}</p>
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">أنت كتبت:</p>
            <p className="font-medium text-foreground" dir="ltr" style={{ textAlign: "left" }}>{input}</p>

            <div className="flex gap-2 mt-4">
              {writingAttempt + 1 < maxAttempts && !isCorrect && (
                <button onClick={retryWriting} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all">
                  <RotateCcw size={14} /> حاول تاني
                </button>
              )}
              <button onClick={nextWritingLine} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all">
                {writingLineIdx + 1 < activeConv.lines.length ? "السطر التالي ←" : "انتهى ✓"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Conversation detail
  if (activeConv) {
    return (
      <div>
        <button onClick={() => setActiveConv(null)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft size={16} /> رجوع للمحادثات
        </button>
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground">{activeConv.titleArabic}</h3>
              <p className="text-sm text-muted-foreground" dir="ltr">{activeConv.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <SpeedControl speed={speed} onSpeedChange={setSpeed} />
              <button
                onClick={() => startWriting(activeConv)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-all"
              >
                <Pen size={14} /> تمرين كتابة
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {activeConv.lines.map((line, i) => (
              <div key={i} className={`rounded-xl border p-4 ${speakerColors[line.speaker] || "bg-muted border-border"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground">{speakerLabels[line.speaker]}</span>
                  <button
                    onClick={() => speakText(line.english, speed)}
                    className="p-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
                <p className="text-foreground font-medium mb-1" dir="ltr" style={{ textAlign: "left" }}>
                  {renderClickableText(line.english)}
                </p>
                <p className="text-primary text-sm">{line.arabic}</p>
                <p className="text-xs text-muted-foreground mt-1">النطق: {line.pronunciation}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              activeConv.lines.forEach((line, i) => {
                setTimeout(() => speakText(line.english, speed), i * 3000);
              });
            }}
            className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <Volume2 size={18} /> تشغيل المحادثة كاملة 🔊
          </button>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-2">💬 المحادثات</h2>
      <p className="text-muted-foreground mb-4">حوارات واقعية بين فني ومشرف ومهندس في الموقع</p>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveCategory(tab.id); setActiveConv(null); }}
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

      {/* Conversations grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((conv) => (
          <button
            key={conv.id}
            onClick={() => setActiveConv(conv)}
            className="bg-card rounded-xl border border-border p-5 text-right hover:border-primary hover:card-glow transition-all group"
          >
            <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors mb-1">
              {conv.titleArabic}
            </h3>
            <p className="text-sm text-muted-foreground" dir="ltr" style={{ textAlign: "left" }}>{conv.title}</p>
            <p className="text-xs text-muted-foreground mt-2">{conv.lines.length} سطر</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Conversations;
