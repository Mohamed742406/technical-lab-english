import { useState, useMemo } from "react";
import { conversations, speakerLabels, Conversation } from "@/data/conversations";
import { speakText } from "@/lib/phonetics";
import { recordWordSeen } from "@/lib/progress";
import SpeedControl from "@/components/SpeedControl";
import { Volume2, Mic, MicOff, CheckCircle2, XCircle, ChevronLeft, Play, SkipForward } from "lucide-react";

const categoryTabs = [
  { id: "concrete", label: "الخرسانة", icon: "🧱" },
  { id: "soil", label: "التربة", icon: "🏗️" },
  { id: "asphalt", label: "الأسفلت", icon: "🛣️" },
  { id: "general", label: "عامة", icon: "📋" },
];

const InteractiveConversation = () => {
  const [activeCategory, setActiveCategory] = useState("concrete");
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [speed, setSpeed] = useState(0.7);
  const [phase, setPhase] = useState<"listen" | "speak" | "result">("listen");
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  const filtered = conversations.filter((c) => c.category === activeCategory);

  const startPractice = (conv: Conversation) => {
    setActiveConv(conv);
    setCurrentLine(0);
    setPhase("listen");
    setSessionScore(0);
    setSessionTotal(0);
    setTranscript("");
  };

  const playCurrentLine = () => {
    if (!activeConv) return;
    const line = activeConv.lines[currentLine];
    speakText(line.english, speed);
    // After playing supervisor's line, switch to speak phase for technician
    if (line.speaker !== "technician") {
      setTimeout(() => {
        if (currentLine + 1 < activeConv.lines.length && activeConv.lines[currentLine + 1].speaker === "technician") {
          setCurrentLine((i) => i + 1);
          setPhase("speak");
        } else {
          nextLine();
        }
      }, 2000 / speed);
    }
  };

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("المتصفح لا يدعم التعرف على الصوت. جرب Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    setIsRecording(true);
    setTranscript("");

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript.toLowerCase();
      setTranscript(result);
      setIsRecording(false);

      if (!activeConv) return;
      const expected = activeConv.lines[currentLine].english.toLowerCase().replace(/[.,!?;:]/g, "");
      const expectedWords = expected.split(/\s+/);
      const resultWords = result.replace(/[.,!?;:]/g, "").split(/\s+/);
      const matched = expectedWords.filter((w) => resultWords.includes(w));
      const acc = Math.round((matched.length / expectedWords.length) * 100);
      setAccuracy(acc);
      setSessionTotal((t) => t + 1);
      if (acc >= 60) setSessionScore((s) => s + 1);

      // Record words
      activeConv.lines[currentLine].english.split(/\s+/).forEach((w) => {
        if (w.length > 3) recordWordSeen(w, "", activeConv.category);
      });

      setPhase("result");
    };

    recognition.onerror = () => {
      setIsRecording(false);
      setTranscript("لم يتم التعرف على الصوت");
      setAccuracy(0);
      setPhase("result");
    };

    recognition.start();
  };

  const nextLine = () => {
    if (!activeConv) return;
    if (currentLine + 1 < activeConv.lines.length) {
      setCurrentLine((i) => i + 1);
      setPhase("listen");
      setTranscript("");
    } else {
      // Session complete
      setPhase("listen");
    }
  };

  // Session complete
  if (activeConv && currentLine >= activeConv.lines.length - 1 && phase === "listen" && sessionTotal > 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 text-center max-w-lg mx-auto">
        <p className="text-5xl mb-4">🎉</p>
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">أحسنت!</h3>
        <p className="text-muted-foreground mb-4">أنهيت المحادثة التفاعلية</p>
        <div className="bg-muted rounded-xl p-4 mb-6">
          <p className="text-3xl font-display font-bold text-primary">{sessionScore} / {sessionTotal}</p>
          <p className="text-sm text-muted-foreground">جمل نطقتها بشكل صحيح</p>
          <div className="w-full bg-secondary rounded-full h-3 mt-3">
            <div
              className="h-3 rounded-full bg-primary transition-all"
              style={{ width: `${(sessionScore / sessionTotal) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => startPractice(activeConv)} className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-semibold">
            أعد التمرين
          </button>
          <button onClick={() => setActiveConv(null)} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold">
            اختر محادثة أخرى
          </button>
        </div>
      </div>
    );
  }

  // Practice mode
  if (activeConv) {
    const line = activeConv.lines[currentLine];
    return (
      <div className="max-w-lg mx-auto">
        <button onClick={() => setActiveConv(null)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft size={16} /> رجوع
        </button>

        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-foreground">{activeConv.titleArabic}</h3>
            <span className="text-sm text-muted-foreground">
              {currentLine + 1} / {activeConv.lines.length}
            </span>
          </div>

          <SpeedControl speed={speed} onSpeedChange={setSpeed} />

          {/* Current line */}
          <div className="mt-4 bg-muted rounded-xl p-5">
            <p className="text-xs text-muted-foreground mb-2 font-semibold">
              {speakerLabels[line.speaker]} يقول:
            </p>

            {phase === "speak" ? (
              <>
                <p className="text-lg font-bold text-primary mb-1">{line.arabic}</p>
                <p className="text-sm text-muted-foreground mb-4">النطق: {line.pronunciation}</p>

                <div className="text-center">
                  <p className="text-sm text-foreground mb-3">🎙️ انطق الجملة بالإنجليزي</p>
                  <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      isRecording
                        ? "bg-destructive text-destructive-foreground pulse-record"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {isRecording ? (
                      <span className="flex items-center gap-2"><MicOff size={18} /> جاري التسجيل...</span>
                    ) : (
                      <span className="flex items-center gap-2"><Mic size={18} /> ابدأ التسجيل</span>
                    )}
                  </button>
                </div>
              </>
            ) : phase === "result" ? (
              <>
                <div className="mb-3">
                  <p className="text-foreground font-medium" dir="ltr" style={{ textAlign: "left" }}>{line.english}</p>
                  <p className="text-primary text-sm mt-1">{line.arabic}</p>
                </div>

                <div className={`rounded-xl p-4 border ${accuracy >= 60 ? "bg-success/10 border-[hsl(var(--success))]/30" : "bg-destructive/10 border-destructive/30"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {accuracy >= 60 ? <CheckCircle2 className="text-[hsl(var(--success))]" size={20} /> : <XCircle className="text-destructive" size={20} />}
                    <span className="font-display font-bold text-foreground">
                      دقة النطق: {accuracy}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">أنت قلت:</p>
                  <p className="text-foreground font-medium" dir="ltr" style={{ textAlign: "left" }}>{transcript}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => { setPhase("speak"); setTranscript(""); }}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold"
                  >
                    🔄 أعد المحاولة
                  </button>
                  <button
                    onClick={nextLine}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold"
                  >
                    <SkipForward size={14} /> التالي
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-foreground font-medium text-lg" dir="ltr" style={{ textAlign: "left" }}>{line.english}</p>
                <p className="text-primary text-sm mt-1">{line.arabic}</p>
                <p className="text-xs text-muted-foreground mt-1">النطق: {line.pronunciation}</p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => speakText(line.english, speed)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Volume2 size={14} /> اسمع
                  </button>
                  {line.speaker !== "technician" ? (
                    <button onClick={playCurrentLine} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold">
                      <Play size={14} /> شغل ورد عليه
                    </button>
                  ) : (
                    <button onClick={() => setPhase("speak")} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-semibold">
                      <Mic size={14} /> انطقها
                    </button>
                  )}
                  <button onClick={nextLine} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold">
                    <SkipForward size={14} /> تخطي
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-2">🎙️ تمرين المحادثة التفاعلية</h2>
      <p className="text-muted-foreground mb-4">اسمع سؤال المشرف وانطق رد الفني بصوتك مع تقييم النطق</p>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === tab.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((conv) => (
          <button
            key={conv.id}
            onClick={() => startPractice(conv)}
            className="bg-card rounded-xl border border-border p-5 text-right hover:border-primary hover:card-glow transition-all group"
          >
            <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors mb-1">
              {conv.titleArabic}
            </h3>
            <p className="text-sm text-muted-foreground" dir="ltr" style={{ textAlign: "left" }}>{conv.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{conv.lines.length} جمل</span>
              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">🎙️ تفاعلي</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InteractiveConversation;
