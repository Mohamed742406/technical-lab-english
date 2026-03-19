import { useState, useMemo, useRef, useEffect } from "react";
import { getCategories } from "@/data/vocabulary";
import { speakText } from "@/lib/phonetics";
import { addXP, XP_REWARDS } from "@/lib/gamification";
import {
  Volume2, RotateCcw, CheckCircle, ChevronLeft,
  Pen, Target, Trophy, ArrowRight
} from "lucide-react";
import SpeedControl from "@/components/SpeedControl";

/* ─── Types ─── */
type Screen = "setup" | "practice" | "wordDone" | "allDone";
type ContentType = "words" | "sentences";

interface Item {
  english: string;
  arabic: string;
  pronunciation: string;
}

/* ─── Helpers ─── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const REP_OPTIONS = [5, 10, 20, 30];
const WORDS_PER_SESSION = 5;

/* ═══════════════ Component ═══════════════ */
const RepetitionWriter = () => {
  const allCategories = useMemo(() => getCategories(), []);

  /* Setup state */
  const [screen, setScreen]           = useState<Screen>("setup");
  const [contentType, setContentType] = useState<ContentType>("words");
  const [category, setCategory]       = useState(allCategories[0].id);
  const [reps, setReps]               = useState(10);

  /* Session state */
  const [items, setItems]             = useState<Item[]>([]);
  const [wordIdx, setWordIdx]         = useState(0);
  const [repsDone, setRepsDone]       = useState(0);
  const [input, setInput]             = useState("");
  const [lastResult, setLastResult]   = useState<"correct" | "wrong" | null>(null);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [speed, setSpeed]             = useState(0.7);
  const [wrongOnThisRep, setWrongOnThisRep] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  /* Focus input whenever screen is practice */
  useEffect(() => {
    if (screen === "practice") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [screen, wordIdx, repsDone]);

  /* ── Build session items ── */
  const buildItems = (): Item[] => {
    const cat = allCategories.find(c => c.id === category)!;
    if (contentType === "words") {
      return shuffle(cat.words).slice(0, WORDS_PER_SESSION).map(w => ({
        english: w.english,
        arabic: w.arabic,
        pronunciation: w.pronunciation,
      }));
    } else {
      return shuffle(cat.words.filter(w => w.example && w.exampleArabic))
        .slice(0, WORDS_PER_SESSION)
        .map(w => ({
          english: w.example!,
          arabic: w.exampleArabic!,
          pronunciation: w.pronunciation,
        }));
    }
  };

  const startSession = () => {
    const built = buildItems();
    if (built.length === 0) return;
    setItems(built);
    setWordIdx(0);
    setRepsDone(0);
    setInput("");
    setLastResult(null);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setWrongOnThisRep(false);
    setScreen("practice");
  };

  const currentItem = items[wordIdx];

  /* Normalize for comparison — case insensitive, ignore punctuation */
  const normalize = (s: string) =>
    s.toLowerCase().trim().replace(/[.,!?;:'"-]/g, "").replace(/\s+/g, " ");

  const handleSubmit = () => {
    if (!input.trim()) return;
    const correct = normalize(input) === normalize(currentItem.english);
    setTotalAttempts(a => a + 1);
    setLastResult(correct ? "correct" : "wrong");

    if (correct) {
      setTotalCorrect(c => c + 1);
      const next = repsDone + 1;
      if (next >= reps) {
        // finished all reps for this word
        addXP(XP_REWARDS.lessonCompleted, "lessonCompleted");
        setRepsDone(next);
        setScreen("wordDone");
      } else {
        setRepsDone(next);
        setInput("");
        setLastResult(null);
        setWrongOnThisRep(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    } else {
      setWrongOnThisRep(true);
      // keep input so user sees what they typed
    }
  };

  const clearAndRetry = () => {
    setInput("");
    setLastResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const goToNextWord = () => {
    const next = wordIdx + 1;
    if (next >= items.length) {
      setScreen("allDone");
    } else {
      setWordIdx(next);
      setRepsDone(0);
      setInput("");
      setLastResult(null);
      setWrongOnThisRep(false);
      setScreen("practice");
    }
  };

  /* ══════════ SETUP SCREEN ══════════ */
  if (screen === "setup") {
    return (
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-1">✍️ التكرار للحفظ</h2>
        <p className="text-muted-foreground text-sm mb-6">
          الكلمة بالإنجليزي قدامك — اكتبها كذا مرة لحد ما تحفظ كتابتها عن ظهر قلب
        </p>

        {/* Content type */}
        <p className="text-sm font-bold text-foreground mb-2">ماذا تريد أن تكتب؟</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {([
            { id: "words",     icon: "🔤", label: "كلمات",  desc: "كلمات مفردة" },
            { id: "sentences", icon: "📝", label: "جمل",    desc: "جمل كاملة" },
          ] as { id: ContentType; icon: string; label: string; desc: string }[]).map(o => (
            <button
              key={o.id}
              onClick={() => setContentType(o.id)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                contentType === o.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 bg-card"
              }`}
            >
              <span className="text-2xl block mb-1">{o.icon}</span>
              <p className="font-display font-bold text-foreground text-sm">{o.label}</p>
              <p className="text-xs text-muted-foreground">{o.desc}</p>
            </button>
          ))}
        </div>

        {/* Category */}
        <p className="text-sm font-bold text-foreground mb-2">القسم</p>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {allCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 text-right transition-all ${
                category === cat.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 bg-card"
              }`}
            >
              <span className="text-xl shrink-0">{cat.icon}</span>
              <div>
                <p className="font-bold text-foreground text-sm">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.words.length} كلمة</p>
              </div>
            </button>
          ))}
        </div>

        {/* Reps */}
        <p className="text-sm font-bold text-foreground mb-2">عدد مرات التكرار لكل عنصر</p>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {REP_OPTIONS.map(n => (
            <button
              key={n}
              onClick={() => setReps(n)}
              className={`py-3 rounded-xl border-2 font-display font-bold text-lg transition-all ${
                reps === n
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              {n}×
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-muted rounded-xl p-4 mb-5 flex items-center gap-3">
          <Target size={20} className="text-primary shrink-0" />
          <p className="text-sm text-foreground">
            ستكتب <span className="font-bold text-primary">{WORDS_PER_SESSION} {contentType === "words" ? "كلمات" : "جمل"}</span>، كل واحدة <span className="font-bold text-primary">{reps} مرة</span>
            {" "}= <span className="font-bold text-primary">{WORDS_PER_SESSION * reps} كتابة</span> في المجموع
          </p>
        </div>

        <button
          onClick={startSession}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
        >
          <Pen size={20} />
          ابدأ التكرار
        </button>
      </div>
    );
  }

  /* ══════════ PRACTICE SCREEN ══════════ */
  if (screen === "practice" && currentItem) {
    const progress = repsDone / reps;
    const isMultiline = currentItem.english.length > 40;

    return (
      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setScreen("setup")}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ChevronLeft size={14} /> رجوع
          </button>
          <span className="text-xs text-muted-foreground font-display font-bold">
            كلمة {wordIdx + 1} / {items.length}
          </span>
        </div>

        {/* Word / sentence card */}
        <div className="bg-card rounded-2xl border-2 border-border p-5 mb-4">

          {/* English target */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <p
              className={`font-display font-extrabold text-foreground leading-snug ${
                isMultiline ? "text-lg" : "text-3xl"
              }`}
              dir="ltr"
            >
              {currentItem.english}
            </p>
            <button
              onClick={() => speakText(currentItem.english, speed)}
              className="shrink-0 p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Volume2 size={20} />
            </button>
          </div>

          {/* Arabic + pronunciation */}
          <div className="border-t border-border pt-3 flex items-center justify-between gap-2 flex-wrap">
            <p className="text-primary font-bold text-sm">{currentItem.arabic}</p>
            <p className="text-muted-foreground text-xs">🗣️ {currentItem.pronunciation}</p>
          </div>

          {/* Speed control */}
          <div className="mt-2 flex justify-end">
            <SpeedControl speed={speed} onSpeedChange={setSpeed} />
          </div>
        </div>

        {/* Rep progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">التكرار</span>
            <span className="text-sm font-display font-bold text-foreground">
              {repsDone} / {reps}
            </span>
          </div>
          {/* Circle progress dots */}
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: reps }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all ${
                  i < repsDone
                    ? "bg-green-500 w-4 h-4"
                    : i === repsDone
                    ? "bg-primary w-4 h-4 ring-2 ring-primary/30"
                    : "bg-muted w-3 h-3 mt-0.5"
                }`}
              />
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-1.5 mt-2">
            <div
              className="bg-gradient-to-l from-primary to-green-500 h-1.5 rounded-full transition-all"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Input */}
        <div className="relative mb-3">
          {isMultiline ? (
            <textarea
              ref={inputRef as any}
              value={input}
              onChange={e => { setInput(e.target.value); setLastResult(null); }}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
              placeholder="اكتب الجملة بالإنجليزي..."
              rows={3}
              className={`w-full px-4 py-3 rounded-xl bg-muted border-2 text-foreground font-bold placeholder:text-muted-foreground focus:outline-none resize-none transition-colors ${
                lastResult === "correct" ? "border-green-500"
                : lastResult === "wrong"   ? "border-destructive"
                : "border-border focus:border-primary"
              }`}
              dir="ltr"
              style={{ textAlign: "left" }}
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => { setInput(e.target.value); setLastResult(null); }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="اكتب هنا..."
              className={`w-full px-4 py-3 rounded-xl bg-muted border-2 text-foreground text-lg font-bold placeholder:text-muted-foreground focus:outline-none transition-colors ${
                lastResult === "correct" ? "border-green-500"
                : lastResult === "wrong"   ? "border-destructive"
                : "border-border focus:border-primary"
              }`}
              dir="ltr"
              style={{ textAlign: "left" }}
            />
          )}

          {/* Inline feedback icon */}
          {lastResult === "correct" && (
            <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
          )}
        </div>

        {/* Feedback message on wrong */}
        {lastResult === "wrong" && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-3 mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-destructive font-bold text-sm mb-1">❌ غلط — ركز تاني</p>
              <p className="text-xs text-muted-foreground">
                الصح: <span className="text-foreground font-bold" dir="ltr">{currentItem.english}</span>
              </p>
            </div>
            <button
              onClick={clearAndRetry}
              className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-bold hover:text-foreground"
            >
              <RotateCcw size={12} /> حاول تاني
            </button>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-40"
        >
          تأكيد ← (Enter)
        </button>

        {/* Session stats strip */}
        <div className="flex justify-center gap-6 mt-4 text-xs text-muted-foreground">
          <span>✅ {totalCorrect} صح</span>
          <span>🔄 {totalAttempts} محاولة</span>
          <span>🔥 {Math.max(0, Math.round((totalCorrect / Math.max(1, totalAttempts)) * 100))}% دقة</span>
        </div>
      </div>
    );
  }

  /* ══════════ WORD DONE ══════════ */
  if (screen === "wordDone" && currentItem) {
    const isLast = wordIdx + 1 >= items.length;
    return (
      <div className="text-center py-8">
        <p className="text-6xl mb-4">🎯</p>
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
          أتقنت الكتابة!
        </h3>
        <div className="bg-card border border-border rounded-xl p-5 mb-6 max-w-xs mx-auto">
          <p className="text-2xl font-display font-extrabold text-primary mb-1" dir="ltr">
            {currentItem.english}
          </p>
          <p className="text-muted-foreground text-sm">{currentItem.arabic}</p>
          <div className="flex items-center justify-center gap-1 mt-3">
            {Array.from({ length: Math.min(reps, 20) }).map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-green-500" />
            ))}
            {reps > 20 && <span className="text-xs text-muted-foreground ml-1">+{reps - 20}</span>}
          </div>
          <p className="text-xs text-muted-foreground mt-2">كتبتها {reps} مرة ✓</p>
        </div>

        <button
          onClick={goToNextWord}
          className="flex items-center gap-2 mx-auto px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all"
        >
          {isLast ? (
            <><Trophy size={20} /> شوف النتيجة</>
          ) : (
            <>الكلمة التالية <ArrowRight size={20} /></>
          )}
        </button>

        {!isLast && (
          <p className="text-xs text-muted-foreground mt-3">
            {items.length - wordIdx - 1} عنصر متبقي
          </p>
        )}
      </div>
    );
  }

  /* ══════════ ALL DONE ══════════ */
  if (screen === "allDone") {
    const accuracy = Math.round((totalCorrect / Math.max(1, totalAttempts)) * 100);
    const emoji = accuracy >= 90 ? "🏆" : accuracy >= 70 ? "⭐" : "💪";
    const msg   = accuracy >= 90 ? "ممتاز! إيدك اتعودت على الكتابة الصح"
                : accuracy >= 70 ? "كويس جداً! كمّل التمرين"
                : "استمر — التكرار هو السر";

    return (
      <div className="text-center py-6">
        <p className="text-6xl mb-4">{emoji}</p>
        <h2 className="text-2xl font-display font-bold text-foreground mb-1">{msg}</h2>
        <p className="text-muted-foreground text-sm mb-6">
          كتبت {WORDS_PER_SESSION} {contentType === "words" ? "كلمات" : "جمل"} × {reps} مرة = {WORDS_PER_SESSION * reps} كتابة
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-xs mx-auto">
          {[
            { label: "إجمالي الكتابات",  value: `${WORDS_PER_SESSION * reps}` },
            { label: "الدقة",             value: `${accuracy}%` },
            { label: "محاولات",           value: `${totalAttempts}` },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-3">
              <p className="text-xl font-display font-bold text-primary">{s.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mastered words list */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6 text-right">
          <p className="text-sm font-bold text-foreground mb-3">✅ اتقنت كتابة:</p>
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <p className="text-foreground font-bold text-sm" dir="ltr">{item.english}</p>
                <p className="text-muted-foreground text-xs">{item.arabic}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={startSession}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all"
          >
            <RotateCcw size={18} /> كرار تاني
          </button>
          <button
            onClick={() => setScreen("setup")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-all"
          >
            <ChevronLeft size={18} /> اختيارات جديدة
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default RepetitionWriter;
