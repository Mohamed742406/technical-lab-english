import { useState, useEffect, useRef } from "react";
import { speakText } from "@/lib/phonetics";
import { addXP, XP_REWARDS } from "@/lib/gamification";
import {
  Volume2, ChevronLeft, ChevronRight, CheckCircle,
  RotateCcw, Star, Trophy, BookOpen, Pen, Mic2
} from "lucide-react";

/* ─── الحروف مع كلمات المختبر ─── */
const ALPHABET: { letter: string; word: string; arabic: string; pronunciation: string }[] = [
  { letter: "A", word: "Aggregate",  arabic: "ركام",           pronunciation: "أجريجيت" },
  { letter: "B", word: "Beam",       arabic: "كمرة",           pronunciation: "بيم" },
  { letter: "C", word: "Cement",     arabic: "أسمنت",          pronunciation: "سيمنت" },
  { letter: "D", word: "Density",    arabic: "كثافة",          pronunciation: "دينسيتي" },
  { letter: "E", word: "Equipment",  arabic: "معدات",          pronunciation: "إكويبمنت" },
  { letter: "F", word: "Filter",     arabic: "مرشح",           pronunciation: "فيلتر" },
  { letter: "G", word: "Gravel",     arabic: "حصى",            pronunciation: "جرافل" },
  { letter: "H", word: "Humidity",   arabic: "رطوبة",          pronunciation: "هيوميديتي" },
  { letter: "I", word: "Index",      arabic: "مؤشر",           pronunciation: "إندكس" },
  { letter: "J", word: "Joint",      arabic: "فاصل",           pronunciation: "جوينت" },
  { letter: "K", word: "Kilogram",   arabic: "كيلوجرام",       pronunciation: "كيلوجرام" },
  { letter: "L", word: "Load",       arabic: "حمل",            pronunciation: "لود" },
  { letter: "M", word: "Mold",       arabic: "قالب",           pronunciation: "مولد" },
  { letter: "N", word: "Newton",     arabic: "نيوتن",          pronunciation: "نيوتن" },
  { letter: "O", word: "Oven",       arabic: "فرن",            pronunciation: "أوفن" },
  { letter: "P", word: "Proctor",    arabic: "بروكتور",        pronunciation: "بروكتور" },
  { letter: "Q", word: "Quality",    arabic: "جودة",           pronunciation: "كواليتي" },
  { letter: "R", word: "Result",     arabic: "نتيجة",          pronunciation: "ريزالت" },
  { letter: "S", word: "Sample",     arabic: "عينة",           pronunciation: "سامبل" },
  { letter: "T", word: "Test",       arabic: "اختبار",         pronunciation: "تيست" },
  { letter: "U", word: "Unit",       arabic: "وحدة",           pronunciation: "يونيت" },
  { letter: "V", word: "Void",       arabic: "فراغ",           pronunciation: "فويد" },
  { letter: "W", word: "Water",      arabic: "ماء",            pronunciation: "ووتر" },
  { letter: "X", word: "X-ray",      arabic: "أشعة سينية",     pronunciation: "إكس راي" },
  { letter: "Y", word: "Yield",      arabic: "ناتج",           pronunciation: "ييلد" },
  { letter: "Z", word: "Zero",       arabic: "صفر",            pronunciation: "زيرو" },
];

/* كلمات التهجئة — من الأسهل للأصعب */
const SPELL_WORDS = [
  { word: "MIX",      arabic: "خلط",          pronunciation: "ميكس" },
  { word: "TEST",     arabic: "اختبار",        pronunciation: "تيست" },
  { word: "SOIL",     arabic: "تربة",          pronunciation: "سويل" },
  { word: "LOAD",     arabic: "حمل",           pronunciation: "لود" },
  { word: "MOLD",     arabic: "قالب",          pronunciation: "مولد" },
  { word: "SIEVE",    arabic: "منخل",          pronunciation: "سيف" },
  { word: "OVEN",     arabic: "فرن",           pronunciation: "أوفن" },
  { word: "CLAY",     arabic: "طين",           pronunciation: "كلاي" },
  { word: "SAND",     arabic: "رمل",           pronunciation: "ساند" },
  { word: "SLUMP",    arabic: "هبوط",          pronunciation: "سلامب" },
  { word: "PROBE",    arabic: "مسبار",         pronunciation: "بروب" },
  { word: "GRAVEL",   arabic: "حصى",           pronunciation: "جرافل" },
  { word: "SAMPLE",   arabic: "عينة",          pronunciation: "سامبل" },
  { word: "RESULT",   arabic: "نتيجة",         pronunciation: "ريزالت" },
  { word: "CEMENT",   arabic: "أسمنت",         pronunciation: "سيمنت" },
  { word: "DENSITY",  arabic: "كثافة",         pronunciation: "دينسيتي" },
  { word: "CONCRETE", arabic: "خرسانة",        pronunciation: "كونكريت" },
];

/* كلمات المقاطع */
const SYLLABLE_WORDS = [
  { word: "SAMPLE",    syllables: ["SAM", "PLE"],          arabic: "عينة" },
  { word: "CEMENT",    syllables: ["CE", "MENT"],          arabic: "أسمنت" },
  { word: "CONCRETE",  syllables: ["CON", "CRETE"],        arabic: "خرسانة" },
  { word: "DENSITY",   syllables: ["DEN", "SI", "TY"],     arabic: "كثافة" },
  { word: "MOISTURE",  syllables: ["MOIS", "TURE"],        arabic: "رطوبة" },
  { word: "AGGREGATE", syllables: ["AG", "GRE", "GATE"],   arabic: "ركام" },
  { word: "EQUIPMENT", syllables: ["E", "QUIP", "MENT"],   arabic: "معدات" },
  { word: "COMPACTION",syllables: ["COM", "PAC", "TION"],  arabic: "دمك" },
  { word: "LABORATORY",syllables: ["LAB", "O", "RA", "TO", "RY"], arabic: "مختبر" },
];

type Screen = "menu" | "alphabet" | "spelling" | "syllables" | "done";

const PROGRESS_KEY = "lab-foundation-progress";
function getFoundationProgress(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}"); } catch { return {}; }
}
function markDone(key: string) {
  const p = getFoundationProgress(); p[key] = true;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

/* ═══════════════ Component ═══════════════ */
const FoundationLearning = () => {
  const [screen, setScreen] = useState<Screen>("menu");
  const prog = getFoundationProgress();

  /* ── MENU ── */
  if (screen === "menu") {
    const modules = [
      {
        key: "alphabet",
        icon: "🔤",
        title: "الحروف الإنجليزية",
        desc: "تعرّف على الـ 26 حرف مع كلمة من المختبر لكل حرف",
        screen: "alphabet" as Screen,
        done: !!prog["alphabet"],
        color: "from-green-500 to-emerald-600",
      },
      {
        key: "spelling",
        icon: "✏️",
        title: "التهجئة حرف حرف",
        desc: "اسمع الكلمة واكتبها حرف حرف — زي ما الأطفال بيتعلموا",
        screen: "spelling" as Screen,
        done: !!prog["spelling"],
        color: "from-blue-500 to-cyan-600",
      },
      {
        key: "syllables",
        icon: "🔊",
        title: "تقطيع المقاطع",
        desc: "Sam-ple، Con-crete — تعلم تقطّع الكلمات عشان تنطقها صح",
        screen: "syllables" as Screen,
        done: !!prog["syllables"],
        color: "from-purple-500 to-violet-600",
      },
    ];

    return (
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-1">🧒 التعلم من الأساس</h2>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          زي ما الطفل يتعلم يقرأ ويكتب — بس بكلمات المختبر. ابدأ بالحروف ثم التهجئة ثم المقاطع.
        </p>
        <div className="space-y-3">
          {modules.map((m, i) => (
            <button
              key={m.key}
              onClick={() => setScreen(m.screen)}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-right transition-all ${
                m.done
                  ? "bg-green-500/10 border-green-500/30 hover:border-green-500/50"
                  : "bg-card border-border hover:border-primary hover:shadow-md"
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 bg-gradient-to-br ${m.color} shadow-md`}>
                {m.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-display font-bold text-foreground text-lg">{m.title}</p>
                  {m.done && <CheckCircle size={16} className="text-green-500" />}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
              <div className="text-muted-foreground">
                <span className="text-xs bg-muted px-2 py-1 rounded-full">{i === 0 ? "26 حرف" : i === 1 ? `${SPELL_WORDS.length} كلمة` : `${SYLLABLE_WORDS.length} كلمة`}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-4">
          <p className="text-sm text-primary font-bold mb-1">💡 نصيحة</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            ابدأ بالحروف أولاً — لما تحفظ شكل كل حرف وصوته، التهجئة والقراءة هتبقى أسهل بكتير.
          </p>
        </div>
      </div>
    );
  }

  /* ── ALPHABET ── */
  if (screen === "alphabet") return (
    <AlphabetModule onBack={() => setScreen("menu")} onDone={() => { markDone("alphabet"); setScreen("menu"); }} />
  );

  /* ── SPELLING ── */
  if (screen === "spelling") return (
    <SpellingModule onBack={() => setScreen("menu")} onDone={() => { markDone("spelling"); setScreen("menu"); }} />
  );

  /* ── SYLLABLES ── */
  if (screen === "syllables") return (
    <SyllablesModule onBack={() => setScreen("menu")} onDone={() => { markDone("syllables"); setScreen("menu"); }} />
  );

  return null;
};

/* ═══════════════ ALPHABET MODULE ═══════════════ */
const AlphabetModule = ({ onBack, onDone }: { onBack: () => void; onDone: () => void }) => {
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState<"browse" | "quiz">("browse");
  const [quizInput, setQuizInput] = useState("");
  const [quizResult, setQuizResult] = useState<"correct" | "wrong" | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizWords] = useState(() => [...ALPHABET].sort(() => Math.random() - 0.5).slice(0, 10));
  const inputRef = useRef<HTMLInputElement>(null);

  const current = ALPHABET[idx];
  const qCurrent = quizWords[quizIdx];

  const speakLetter = (letter: string) => {
    speakText(letter, 0.6);
  };

  const speakWord = (word: string) => {
    speakText(word, 0.7);
  };

  if (mode === "quiz" && !quizDone) {
    return (
      <div>
        <button onClick={() => setMode("browse")} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
          <ChevronLeft size={14} /> رجوع للحروف
        </button>

        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">سؤال {quizIdx + 1} / {quizWords.length}</span>
            <span className="text-sm font-bold text-primary">{quizScore} ✓</span>
          </div>

          <div className="w-full bg-muted rounded-full h-2 mb-6">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((quizIdx) / quizWords.length) * 100}%` }} />
          </div>

          <p className="text-center text-sm text-muted-foreground mb-3">اكتب الكلمة اللي بتبدأ بالحرف ده:</p>

          <div className="text-center mb-6">
            <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-3">
              <span className="text-7xl font-display font-extrabold text-white">{qCurrent.letter}</span>
            </div>
            <button onClick={() => speakLetter(qCurrent.letter)} className="text-xs text-primary flex items-center gap-1 mx-auto">
              <Volume2 size={14} /> اسمع الحرف
            </button>
          </div>

          {quizResult === null ? (
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={quizInput}
                onChange={e => setQuizInput(e.target.value.toUpperCase())}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    const correct = quizInput.trim().toUpperCase() === qCurrent.word.toUpperCase();
                    setQuizResult(correct ? "correct" : "wrong");
                    if (correct) setQuizScore(s => s + 1);
                  }
                }}
                placeholder="اكتب الكلمة..."
                className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border text-foreground font-bold text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                dir="ltr"
                autoFocus
              />
              <button
                onClick={() => {
                  const correct = quizInput.trim().toUpperCase() === qCurrent.word.toUpperCase();
                  setQuizResult(correct ? "correct" : "wrong");
                  if (correct) setQuizScore(s => s + 1);
                }}
                className="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold"
              >✓</button>
            </div>
          ) : (
            <div className={`rounded-xl p-4 mb-3 ${quizResult === "correct" ? "bg-green-500/10 border border-green-500/30" : "bg-destructive/10 border border-destructive/30"}`}>
              <p className="font-bold text-lg text-center" dir="ltr">{qCurrent.word}</p>
              <p className="text-center text-sm text-muted-foreground">{qCurrent.arabic} • {qCurrent.pronunciation}</p>
              <p className="text-center mt-1">{quizResult === "correct" ? "✅ ممتاز!" : "❌ الإجابة أعلاه"}</p>
            </div>
          )}

          {quizResult !== null && (
            <button
              onClick={() => {
                if (quizIdx + 1 >= quizWords.length) {
                  setQuizDone(true);
                  addXP(XP_REWARDS.lessonCompleted, "lessonCompleted");
                } else {
                  setQuizIdx(i => i + 1);
                  setQuizInput("");
                  setQuizResult(null);
                  setTimeout(() => inputRef.current?.focus(), 50);
                }
              }}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold"
            >
              {quizIdx + 1 >= quizWords.length ? "🏆 شوف النتيجة" : "التالي ←"}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (quizDone) {
    const pct = Math.round((quizScore / quizWords.length) * 100);
    return (
      <div className="text-center py-8">
        <p className="text-6xl mb-4">{pct >= 80 ? "🏆" : "💪"}</p>
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">{pct >= 80 ? "ممتاز!" : "كمّل التمرين!"}</h3>
        <p className="text-primary font-bold text-lg mb-6">{quizScore} / {quizWords.length} صح</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setMode("browse"); setQuizDone(false); setQuizIdx(0); setQuizScore(0); setQuizInput(""); setQuizResult(null); }} className="px-5 py-2 rounded-xl bg-secondary text-secondary-foreground font-bold">
            راجع الحروف
          </button>
          <button onClick={onDone} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold flex items-center gap-2">
            <Trophy size={16} /> خلاص ✓
          </button>
        </div>
      </div>
    );
  }

  /* Browse mode */
  return (
    <div>
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
        <ChevronLeft size={14} /> رجوع
      </button>

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-foreground text-lg">🔤 الحروف الإنجليزية</h3>
        <span className="text-sm text-muted-foreground">{idx + 1} / {ALPHABET.length}</span>
      </div>

      {/* Big letter card */}
      <div className="bg-card rounded-2xl border-2 border-border p-6 text-center mb-4">
        <div className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 shadow-lg">
          <span className="text-8xl font-display font-extrabold text-white">{current.letter}</span>
        </div>

        {/* Lowercase */}
        <p className="text-4xl font-display font-bold text-muted-foreground mb-4">{current.letter.toLowerCase()}</p>

        {/* Word */}
        <div className="bg-muted rounded-xl p-4 mb-3">
          <p className="text-2xl font-display font-bold text-foreground mb-1" dir="ltr">
            <span className="text-primary text-3xl">{current.word[0]}</span>{current.word.slice(1).toLowerCase()}
          </p>
          <p className="text-primary font-bold">{current.arabic}</p>
          <p className="text-sm text-muted-foreground">🗣️ {current.pronunciation}</p>
        </div>

        {/* Spell it out */}
        <div className="flex justify-center gap-2 mb-4">
          {current.word.split("").map((ch, i) => (
            <button
              key={i}
              onClick={() => speakLetter(ch)}
              className={`w-10 h-10 rounded-lg font-display font-bold text-lg transition-all hover:scale-110 ${
                i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-primary/20"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          <button onClick={() => speakLetter(current.letter)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all">
            <Volume2 size={16} /> اسمع الحرف
          </button>
          <button onClick={() => speakWord(current.word)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all">
            <Volume2 size={16} /> اسمع الكلمة
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
          className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold disabled:opacity-30 flex items-center justify-center gap-1"
        >
          <ChevronLeft size={18} /> السابق
        </button>
        <button
          onClick={() => { if (idx + 1 < ALPHABET.length) setIdx(i => i + 1); }}
          disabled={idx >= ALPHABET.length - 1}
          className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold disabled:opacity-30 flex items-center justify-center gap-1"
        >
          التالي <ChevronRight size={18} />
        </button>
      </div>

      {/* Alphabet grid */}
      <div className="grid grid-cols-6 gap-1.5 mb-4">
        {ALPHABET.map((a, i) => (
          <button
            key={a.letter}
            onClick={() => setIdx(i)}
            className={`aspect-square rounded-lg font-display font-bold text-sm transition-all ${
              i === idx ? "bg-primary text-primary-foreground scale-110" : "bg-muted text-foreground hover:bg-primary/20"
            }`}
          >
            {a.letter}
          </button>
        ))}
      </div>

      {idx >= ALPHABET.length - 1 && (
        <button
          onClick={() => { setMode("quiz"); setQuizIdx(0); setQuizScore(0); setQuizInput(""); setQuizResult(null); setQuizDone(false); }}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2"
        >
          <Star size={18} /> جرب اختبار الحروف
        </button>
      )}
    </div>
  );
};

/* ═══════════════ SPELLING MODULE ═══════════════ */
const SpellingModule = ({ onBack, onDone }: { onBack: () => void; onDone: () => void }) => {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentInput, setCurrentInput] = useState("");
  const [letterResult, setLetterResult] = useState<"correct" | "wrong" | null>(null);

  const word = SPELL_WORDS[idx];
  const letters = word.word.split("");
  const currentLetterIdx = typed.length;
  const isDone = typed.length === letters.length;

  useEffect(() => {
    if (!isDone) setTimeout(() => inputRef.current?.focus(), 50);
  }, [idx, typed.length]);

  const handleLetterInput = () => {
    if (!currentInput.trim()) return;
    const entered = currentInput.trim().toUpperCase();
    const expected = letters[currentLetterIdx];
    const correct = entered === expected;
    setLetterResult(correct ? "correct" : "wrong");

    setTimeout(() => {
      if (correct) {
        setTyped(t => [...t, entered]);
        setCurrentInput("");
        setLetterResult(null);
        if (typed.length + 1 === letters.length) {
          // word complete
          setScore(s => s + 1);
          speakText(word.word, 0.7);
        }
      } else {
        setCurrentInput("");
        setLetterResult(null);
      }
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 400);
  };

  const nextWord = () => {
    if (idx + 1 >= SPELL_WORDS.length) {
      setFinished(true);
      addXP(XP_REWARDS.lessonCompleted, "lessonCompleted");
    } else {
      setIdx(i => i + 1);
      setTyped([]);
      setCurrentInput("");
      setLetterResult(null);
      setShowWord(false);
    }
  };

  if (finished) {
    const pct = Math.round((score / SPELL_WORDS.length) * 100);
    return (
      <div className="text-center py-8">
        <p className="text-6xl mb-4">{pct >= 80 ? "🏆" : "💪"}</p>
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">{pct >= 80 ? "تهجئة ممتازة!" : "استمر في التمرين!"}</h3>
        <p className="text-primary font-bold text-lg mb-6">{score} / {SPELL_WORDS.length} كلمة</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setIdx(0); setTyped([]); setFinished(false); setScore(0); setShowWord(false); }} className="px-5 py-2 rounded-xl bg-secondary text-secondary-foreground font-bold">
            <RotateCcw size={16} className="inline ml-1" /> من الأول
          </button>
          <button onClick={onDone} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold flex items-center gap-2">
            <Trophy size={16} /> خلاص ✓
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
        <ChevronLeft size={14} /> رجوع
      </button>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display font-bold text-foreground">✏️ التهجئة</h3>
        <span className="text-sm text-muted-foreground">{idx + 1} / {SPELL_WORDS.length}</span>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 mb-4">
        {/* Arabic meaning + listen */}
        <div className="text-center mb-5">
          <p className="text-2xl font-bold text-primary mb-1">{word.arabic}</p>
          <p className="text-sm text-muted-foreground mb-3">🗣️ {word.pronunciation}</p>
          <button
            onClick={() => { speakText(word.word, 0.6); setShowWord(true); }}
            className="flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Volume2 size={16} /> اسمع الكلمة
          </button>
        </div>

        {/* Letter boxes */}
        <div className="flex justify-center gap-2 mb-5">
          {letters.map((letter, i) => {
            const isTyped = i < typed.length;
            const isCurrent = i === currentLetterIdx;
            return (
              <div
                key={i}
                className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center font-display font-extrabold text-2xl transition-all ${
                  isTyped
                    ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400"
                    : isCurrent
                    ? "border-primary bg-primary/5 animate-pulse"
                    : "border-border bg-muted text-transparent"
                }`}
              >
                {isTyped ? typed[i] : isCurrent ? "?" : showWord ? letter : ""}
              </div>
            );
          })}
        </div>

        {/* Current letter prompt */}
        {!isDone ? (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              اكتب الحرف رقم <span className="font-bold text-primary">{currentLetterIdx + 1}</span>:
            </p>
            <div className="flex gap-2 max-w-xs mx-auto">
              <input
                ref={inputRef}
                value={currentInput}
                onChange={e => setCurrentInput(e.target.value.slice(-1).toUpperCase())}
                onKeyDown={e => e.key === "Enter" && handleLetterInput()}
                maxLength={1}
                className={`flex-1 px-4 py-3 rounded-xl border-2 text-center text-2xl font-display font-extrabold focus:outline-none transition-all ${
                  letterResult === "correct" ? "bg-green-500/20 border-green-500"
                  : letterResult === "wrong" ? "bg-destructive/20 border-destructive"
                  : "bg-muted border-border focus:border-primary"
                }`}
                dir="ltr"
                placeholder="?"
              />
              <button onClick={handleLetterInput} className="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold">✓</button>
            </div>
            {letterResult === "wrong" && (
              <p className="text-destructive text-sm mt-2">❌ مش صح — حاول تاني</p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-green-600 dark:text-green-400 font-bold text-lg mb-1">✅ أحسنت!</p>
            <p className="text-2xl font-display font-extrabold text-foreground" dir="ltr">{word.word}</p>
            <button onClick={nextWord} className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold">
              {idx + 1 >= SPELL_WORDS.length ? "🏆 شوف النتيجة" : "الكلمة التالية ←"}
            </button>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {SPELL_WORDS.map((_, i) => (
          <div key={i} className={`rounded-full transition-all ${
            i < idx ? "w-4 h-4 bg-green-500"
            : i === idx ? "w-4 h-4 bg-primary ring-2 ring-primary/30"
            : "w-3 h-3 bg-muted mt-0.5"
          }`} />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════ SYLLABLES MODULE ═══════════════ */
const SyllablesModule = ({ onBack, onDone }: { onBack: () => void; onDone: () => void }) => {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizInput, setQuizInput] = useState("");
  const [quizResult, setQuizResult] = useState<boolean | null>(null);

  const word = SYLLABLE_WORDS[idx];
  const allRevealed = revealed.length === word.syllables.length;

  const speakSyllable = (syl: string) => speakText(syl, 0.5);
  const speakFullWord = () => speakText(word.syllables.join("-"), 0.5);

  const nextWord = () => {
    if (idx + 1 >= SYLLABLE_WORDS.length) {
      setDone(true);
      addXP(XP_REWARDS.lessonCompleted, "lessonCompleted");
    } else {
      setIdx(i => i + 1);
      setRevealed([]);
      setQuizMode(false);
      setQuizInput("");
      setQuizResult(null);
    }
  };

  if (done) {
    return (
      <div className="text-center py-8">
        <p className="text-6xl mb-4">🏆</p>
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">أتقنت تقطيع المقاطع!</h3>
        <p className="text-primary font-bold mb-6">{score} / {SYLLABLE_WORDS.length} صح</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setIdx(0); setRevealed([]); setDone(false); setScore(0); }} className="px-5 py-2 rounded-xl bg-secondary text-secondary-foreground font-bold">
            <RotateCcw size={16} className="inline ml-1" /> من الأول
          </button>
          <button onClick={onDone} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold flex items-center gap-2">
            <Trophy size={16} /> خلاص ✓
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1">
        <ChevronLeft size={14} /> رجوع
      </button>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display font-bold text-foreground">🔊 تقطيع المقاطع</h3>
        <span className="text-sm text-muted-foreground">{idx + 1} / {SYLLABLE_WORDS.length}</span>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 mb-4">
        {/* Arabic */}
        <div className="text-center mb-5">
          <p className="text-xl font-bold text-primary mb-1">{word.arabic}</p>
          <p className="text-sm text-muted-foreground mb-2">الكلمة فيها {word.syllables.length} مقاطع</p>
        </div>

        {/* Syllable boxes */}
        <div className="flex justify-center gap-2 mb-5 flex-wrap">
          {word.syllables.map((syl, i) => {
            const isRevealed = revealed.includes(i);
            return (
              <button
                key={i}
                onClick={() => {
                  if (!isRevealed) {
                    setRevealed(r => [...r, i]);
                    speakSyllable(syl);
                  } else {
                    speakSyllable(syl);
                  }
                }}
                className={`px-4 py-3 rounded-xl border-2 font-display font-bold text-xl transition-all ${
                  isRevealed
                    ? "bg-primary/10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    : "bg-muted border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {isRevealed ? syl : "?"}
                {isRevealed && <span className="block text-xs font-normal opacity-60 mt-0.5"><Volume2 size={10} className="inline" /></span>}
              </button>
            );
          })}
        </div>

        {/* Full word when all revealed */}
        {allRevealed && (
          <div className="text-center mb-4">
            <div className="bg-muted rounded-xl p-3 mb-3">
              <p className="text-sm text-muted-foreground mb-1">الكلمة كاملة:</p>
              <p className="text-3xl font-display font-extrabold text-foreground" dir="ltr">
                {word.syllables.join("-")}
              </p>
            </div>
            <button onClick={speakFullWord} className="flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
              <Volume2 size={16} /> اسمع التقطيع
            </button>
          </div>
        )}

        {/* Hint */}
        {!allRevealed && (
          <p className="text-center text-xs text-muted-foreground">
            👆 اضغط على كل مربع لتكشف المقطع وتسمعه
          </p>
        )}

        {/* Quiz after reveal */}
        {allRevealed && !quizMode && (
          <button
            onClick={() => setQuizMode(true)}
            className="w-full mt-3 py-2.5 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all"
          >
            اكتب الكلمة كاملة بدون تقطيع ✍️
          </button>
        )}

        {quizMode && quizResult === null && (
          <div className="mt-3 flex gap-2">
            <input
              value={quizInput}
              onChange={e => setQuizInput(e.target.value.toUpperCase())}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  const correct = quizInput.trim().toUpperCase() === word.word.toUpperCase();
                  setQuizResult(correct);
                  if (correct) setScore(s => s + 1);
                }
              }}
              placeholder={`اكتب ${word.word.toLowerCase()}...`}
              className="flex-1 px-4 py-2 rounded-xl bg-muted border border-border text-foreground font-bold text-center focus:outline-none focus:ring-2 focus:ring-primary"
              dir="ltr"
              autoFocus
            />
            <button
              onClick={() => {
                const correct = quizInput.trim().toUpperCase() === word.word.toUpperCase();
                setQuizResult(correct);
                if (correct) setScore(s => s + 1);
              }}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold"
            >✓</button>
          </div>
        )}

        {quizResult !== null && (
          <div className={`mt-3 rounded-xl p-3 text-center ${quizResult ? "bg-green-500/10 border border-green-500/30" : "bg-destructive/10 border border-destructive/30"}`}>
            <p className="font-bold" dir="ltr">{word.word}</p>
            <p className="text-sm">{quizResult ? "✅ ممتاز!" : "❌ الإجابة أعلاه"}</p>
          </div>
        )}

        {(allRevealed && (!quizMode || quizResult !== null)) && (
          <button onClick={nextWord} className="w-full mt-3 py-3 rounded-xl bg-primary text-primary-foreground font-bold">
            {idx + 1 >= SYLLABLE_WORDS.length ? "🏆 شوف النتيجة" : "الكلمة التالية ←"}
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {SYLLABLE_WORDS.map((_, i) => (
          <div key={i} className={`rounded-full transition-all ${
            i < idx ? "w-4 h-4 bg-green-500"
            : i === idx ? "w-4 h-4 bg-primary ring-2 ring-primary/30"
            : "w-3 h-3 bg-muted mt-0.5"
          }`} />
        ))}
      </div>
    </div>
  );
};

export default FoundationLearning;
