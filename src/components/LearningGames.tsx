import { useState, useEffect, useCallback } from "react";
import { speakText } from "@/lib/phonetics";
import { Volume2, ChevronLeft, RotateCcw, Timer, Zap } from "lucide-react";
import { addXP, XP_REWARDS, Achievement } from "@/lib/gamification";
import XPNotification from "@/components/XPNotification";

// ─── Game Data ───
const wordPairs = [
  { en: "Concrete", ar: "خرسانة" }, { en: "Cement", ar: "أسمنت" }, { en: "Aggregate", ar: "ركام" },
  { en: "Slump", ar: "هبوط" }, { en: "Soil", ar: "تربة" }, { en: "Clay", ar: "طين" },
  { en: "Sand", ar: "رمل" }, { en: "Water", ar: "ماء" }, { en: "Test", ar: "اختبار" },
  { en: "Sample", ar: "عينة" }, { en: "Mix", ar: "خلط" }, { en: "Pour", ar: "صب" },
  { en: "Scale", ar: "ميزان" }, { en: "Oven", ar: "فرن" }, { en: "Sieve", ar: "منخل" },
  { en: "Mold", ar: "قالب" }, { en: "Density", ar: "كثافة" }, { en: "Moisture", ar: "رطوبة" },
  { en: "Strength", ar: "مقاومة" }, { en: "Load", ar: "حمل" }, { en: "Pressure", ar: "ضغط" },
  { en: "Temperature", ar: "حرارة" }, { en: "Report", ar: "تقرير" }, { en: "Result", ar: "نتيجة" },
  { en: "Asphalt", ar: "أسفلت" }, { en: "Bitumen", ar: "بيتومين" }, { en: "Curing", ar: "معالجة" },
  { en: "Compaction", ar: "دمك" }, { en: "Gravel", ar: "حصى" }, { en: "Crack", ar: "شرخ" },
];

const sentenceGaps = [
  { sentence: "The ___ test measures workability.", answer: "slump", options: ["slump", "cube", "sieve", "core"], arabic: "اختبار ___ يقيس قابلية التشغيل" },
  { sentence: "We need to ___ the sample.", answer: "weigh", options: ["weigh", "color", "paint", "eat"], arabic: "محتاجين ___ العينة" },
  { sentence: "Place cubes in the ___ tank.", answer: "curing", options: ["curing", "cooking", "swimming", "fishing"], arabic: "حط المكعبات في حوض ___" },
  { sentence: "The ___ content is 14 percent.", answer: "moisture", options: ["moisture", "sugar", "oxygen", "carbon"], arabic: "محتوى ___ 14 بالمائة" },
  { sentence: "Compact soil in ___ layers.", answer: "three", options: ["three", "ten", "one", "zero"], arabic: "ادمك التربة على ___ طبقات" },
  { sentence: "The concrete ___ is 30 MPa.", answer: "strength", options: ["strength", "color", "smell", "taste"], arabic: "___ الخرسانة 30 ميجا باسكال" },
  { sentence: "Use a ___ to remove air voids.", answer: "vibrator", options: ["vibrator", "hammer", "fan", "brush"], arabic: "استخدم ___ لإزالة الفراغات" },
  { sentence: "Check the delivery ___.", answer: "ticket", options: ["ticket", "movie", "game", "song"], arabic: "افحص ___ التوريد" },
  { sentence: "The CBR value is 12 ___.", answer: "percent", options: ["percent", "meters", "kilograms", "liters"], arabic: "قيمة CBR هي 12 ___" },
  { sentence: "Cure specimens for ___ days.", answer: "28", options: ["28", "5", "100", "2"], arabic: "عالج العينات لمدة ___ يوم" },
  { sentence: "Record the ___ in the log.", answer: "result", options: ["result", "dream", "recipe", "song"], arabic: "سجل ___ في السجل" },
  { sentence: "Sieve analysis determines ___.", answer: "gradation", options: ["gradation", "color", "smell", "speed"], arabic: "التحليل المنخلي يحدد ___" },
];

const speedWords = [
  { en: "Test", ar: "اختبار" }, { en: "Mix", ar: "خلط" }, { en: "Pour", ar: "صب" },
  { en: "Soil", ar: "تربة" }, { en: "Sand", ar: "رمل" }, { en: "Clay", ar: "طين" },
  { en: "Load", ar: "حمل" }, { en: "Cube", ar: "مكعب" }, { en: "Sieve", ar: "منخل" },
  { en: "Oven", ar: "فرن" }, { en: "Weight", ar: "وزن" }, { en: "Depth", ar: "عمق" },
  { en: "Beam", ar: "كمرة" }, { en: "Core", ar: "لب" }, { en: "Crack", ar: "شرخ" },
  { en: "Grade", ar: "درجة" }, { en: "Steel", ar: "صلب" }, { en: "Bar", ar: "قضيب" },
  { en: "Level", ar: "مستوى" }, { en: "Pump", ar: "مضخة" },
];

type GameType = "memory" | "fillgap" | "speed" | "wordbuilder";

interface GameInfo {
  id: GameType;
  title: string;
  icon: string;
  description: string;
}

const games: GameInfo[] = [
  { id: "memory", title: "لعبة الذاكرة", icon: "🧠", description: "طابق الكلمة الإنجليزية مع ترجمتها العربية" },
  { id: "fillgap", title: "املأ الفراغ", icon: "✏️", description: "اختر الكلمة الصحيحة لملء الجملة" },
  { id: "speed", title: "تحدي السرعة", icon: "⚡", description: "ترجم أكبر عدد من الكلمات في 60 ثانية" },
  { id: "wordbuilder", title: "بناء الكلمات", icon: "🔠", description: "رتب الحروف لتكوين الكلمة الصحيحة" },
];

const LearningGames = () => {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [xpNotif, setXpNotif] = useState<{ xp: number; achievements: Achievement[]; leveledUp: boolean } | null>(null);

  return (
    <div dir="rtl">
      {xpNotif && <XPNotification {...xpNotif} onDone={() => setXpNotif(null)} />}

      {!activeGame && (
        <>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">🎮 تعلم بالألعاب</h2>
          <p className="text-muted-foreground mb-6 text-sm">تعلم وأنت بتلعب — طريقة ممتعة لحفظ المصطلحات</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {games.map(game => (
              <button key={game.id} onClick={() => setActiveGame(game.id)}
                className="bg-card rounded-xl border border-border p-5 text-right hover:border-primary hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{game.icon}</span>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{game.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{game.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {activeGame === "memory" && <MemoryGame onBack={() => setActiveGame(null)} onXP={setXpNotif} />}
      {activeGame === "fillgap" && <FillGapGame onBack={() => setActiveGame(null)} onXP={setXpNotif} />}
      {activeGame === "speed" && <SpeedGame onBack={() => setActiveGame(null)} onXP={setXpNotif} />}
      {activeGame === "wordbuilder" && <WordBuilderGame onBack={() => setActiveGame(null)} onXP={setXpNotif} />}
    </div>
  );
};

// ─── Memory Game ───
function MemoryGame({ onBack, onXP }: { onBack: () => void; onXP: (n: any) => void }) {
  const [cards, setCards] = useState<{ id: number; text: string; matched: boolean; type: "en" | "ar"; pairId: number }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const totalPairs = 6;

  useEffect(() => {
    const shuffled = [...wordPairs].sort(() => Math.random() - 0.5).slice(0, totalPairs);
    const cardSet = shuffled.flatMap((w, i) => [
      { id: i * 2, text: w.en, matched: false, type: "en" as const, pairId: i },
      { id: i * 2 + 1, text: w.ar, matched: false, type: "ar" as const, pairId: i },
    ]).sort(() => Math.random() - 0.5);
    setCards(cardSet);
  }, []);

  const handleFlip = (id: number) => {
    if (flipped.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.matched || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped.map(fid => cards.find(c => c.id === fid)!);
      if (a.pairId === b.pairId) {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.pairId === a.pairId ? { ...c, matched: true } : c));
          setMatches(m => m + 1);
          setFlipped([]);
          if (matches + 1 === totalPairs) {
            const result = addXP(XP_REWARDS.quizCompleted, "quizCompleted");
            onXP({ xp: XP_REWARDS.quizCompleted, achievements: result.newAchievements, leveledUp: result.leveledUp });
          }
        }, 500);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  if (matches === totalPairs) {
    return (
      <div className="text-center">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"><ChevronLeft size={14} /> رجوع</button>
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-2">أحسنت!</h3>
          <p className="text-muted-foreground mb-4">طابقت كل الأزواج في {moves} محاولة</p>
          <p className="text-accent font-bold mb-6">+{XP_REWARDS.quizCompleted} XP ⭐</p>
          <button onClick={onBack} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold">رجوع</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"><ChevronLeft size={14} /> رجوع</button>
      <h3 className="font-display font-bold text-foreground mb-1">🧠 لعبة الذاكرة</h3>
      <p className="text-xs text-muted-foreground mb-4">محاولات: {moves} | أزواج: {matches}/{totalPairs}</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || card.matched;
          return (
            <button key={card.id} onClick={() => handleFlip(card.id)}
              className={`aspect-square rounded-xl border-2 font-bold text-sm transition-all flex items-center justify-center p-2 ${
                card.matched ? "bg-green-500/20 border-green-500/50 text-foreground" :
                isFlipped ? "bg-primary/10 border-primary text-foreground" :
                "bg-muted border-border hover:border-primary text-transparent"
              }`} dir={card.type === "ar" ? "rtl" : "ltr"}>
              {isFlipped ? card.text : "❓"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Fill Gap Game ───
function FillGapGame({ onBack, onXP }: { onBack: () => void; onXP: (n: any) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [shuffledGaps] = useState(() => [...sentenceGaps].sort(() => Math.random() - 0.5).slice(0, 10));
  const total = shuffledGaps.length;

  const current = shuffledGaps[currentIdx];

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === current.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
    } else {
      const result = addXP(XP_REWARDS.quizCompleted, "quizCompleted");
      onXP({ xp: XP_REWARDS.quizCompleted, achievements: result.newAchievements, leveledUp: result.leveledUp });
    }
  };

  if (currentIdx >= total - 1 && selected) {
    const finalScore = score + (selected === current.answer ? 1 : 0);
    return (
      <div className="text-center">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"><ChevronLeft size={14} /> رجوع</button>
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="text-5xl mb-4">{finalScore >= 8 ? "🎉" : finalScore >= 5 ? "👍" : "💪"}</div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-2">{finalScore >= 8 ? "ممتاز!" : "أحسنت!"}</h3>
          <p className="text-lg text-primary font-bold mb-4">النتيجة: {finalScore}/{total}</p>
          <p className="text-accent font-bold mb-6">+{XP_REWARDS.quizCompleted} XP ⭐</p>
          <button onClick={onBack} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold">رجوع</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"><ChevronLeft size={14} /> رجوع</button>
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-foreground">✏️ املأ الفراغ</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{currentIdx + 1}/{total}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div className="bg-gradient-to-l from-primary to-accent h-2 rounded-full transition-all" style={{ width: `${((currentIdx + 1) / total) * 100}%` }} />
        </div>

        <p className="text-lg font-bold text-foreground mb-2" dir="ltr" style={{ textAlign: "left" }}>{current.sentence}</p>
        <p className="text-sm text-primary mb-4">{current.arabic}</p>

        <div className="grid grid-cols-2 gap-3">
          {current.options.map(opt => {
            let cls = "bg-muted border-border hover:border-primary";
            if (selected) {
              if (opt === current.answer) cls = "bg-green-500/20 border-green-500/50";
              else if (opt === selected) cls = "bg-red-500/20 border-red-500/50";
            }
            return (
              <button key={opt} onClick={() => handleSelect(opt)}
                className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${cls}`} dir="ltr">{opt}</button>
            );
          })}
        </div>

        {selected && currentIdx < total - 1 && (
          <button onClick={next} className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold">التالي ←</button>
        )}
      </div>
    </div>
  );
}

// ─── Speed Game ───
function SpeedGame({ onBack, onXP }: { onBack: () => void; onXP: (n: any) => void }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentWord, setCurrentWord] = useState<typeof speedWords[0] | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const nextWord = useCallback(() => {
    const word = speedWords[Math.floor(Math.random() * speedWords.length)];
    const wrongOptions = speedWords.filter(w => w.en !== word.en).sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.ar);
    setCurrentWord(word);
    setOptions([word.ar, ...wrongOptions].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          setGameOver(true);
          const result = addXP(Math.max(5, score * 2), "quizCompleted");
          onXP({ xp: Math.max(5, score * 2), achievements: result.newAchievements, leveledUp: result.leveledUp });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, score, onXP]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    nextWord();
  };

  const handleAnswer = (ans: string) => {
    if (!currentWord) return;
    if (ans === currentWord.ar) setScore(s => s + 1);
    nextWord();
  };

  if (gameOver) {
    return (
      <div className="text-center">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"><ChevronLeft size={14} /> رجوع</button>
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-2">انتهى الوقت!</h3>
          <p className="text-lg text-primary font-bold mb-4">أجبت صح {score} كلمة في 60 ثانية</p>
          <p className="text-accent font-bold mb-6">+{Math.max(5, score * 2)} XP ⭐</p>
          <div className="flex gap-2 justify-center">
            <button onClick={startGame} className="px-6 py-2 rounded-xl bg-secondary text-secondary-foreground font-bold flex items-center gap-2"><RotateCcw size={16} /> إعادة</button>
            <button onClick={onBack} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold">رجوع</button>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="text-center">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"><ChevronLeft size={14} /> رجوع</button>
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-2">تحدي السرعة</h3>
          <p className="text-muted-foreground mb-6">ترجم أكبر عدد من الكلمات في 60 ثانية!</p>
          <button onClick={startGame} className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg">ابدأ!</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"><ChevronLeft size={14} /> رجوع</button>
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary font-bold"><Zap size={18} /> النقاط: {score}</div>
          <div className={`flex items-center gap-2 font-bold ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-muted-foreground"}`}><Timer size={18} /> {timeLeft}s</div>
        </div>

        {currentWord && (
          <div className="text-center space-y-4">
            <p className="text-3xl font-display font-extrabold text-foreground" dir="ltr">{currentWord.en}</p>
            <button onClick={() => speakText(currentWord.en, 1)} className="mx-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
              <Volume2 size={16} />
            </button>
            <div className="grid grid-cols-2 gap-3">
              {options.map(opt => (
                <button key={opt} onClick={() => handleAnswer(opt)}
                  className="p-4 rounded-xl border-2 border-border bg-muted font-bold hover:border-primary hover:bg-primary/5 transition-all">{opt}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Word Builder Game ───
function WordBuilderGame({ onBack, onXP }: { onBack: () => void; onXP: (n: any) => void }) {
  const buildWords = [
    { word: "TEST", arabic: "اختبار" }, { word: "SAMPLE", arabic: "عينة" }, { word: "WATER", arabic: "ماء" },
    { word: "SLUMP", arabic: "هبوط" }, { word: "CONCRETE", arabic: "خرسانة" }, { word: "SOIL", arabic: "تربة" },
    { word: "CEMENT", arabic: "أسمنت" }, { word: "CLAY", arabic: "طين" }, { word: "SAND", arabic: "رمل" },
    { word: "GRADE", arabic: "درجة" }, { word: "LOAD", arabic: "حمل" }, { word: "BEAM", arabic: "كمرة" },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);

  const total = Math.min(8, buildWords.length);
  const [gameWords] = useState(() => [...buildWords].sort(() => Math.random() - 0.5).slice(0, total));
  const current = gameWords[currentIdx];

  useEffect(() => {
    if (current) {
      setShuffled(current.word.split("").sort(() => Math.random() - 0.5));
      setSelected([]);
      setChecked(false);
    }
  }, [currentIdx]);

  const toggleLetter = (idx: number) => {
    if (checked) return;
    if (selected.includes(idx)) {
      setSelected(selected.filter(i => i !== idx));
    } else {
      setSelected([...selected, idx]);
    }
  };

  const checkAnswer = () => {
    const built = selected.map(i => shuffled[i]).join("");
    if (built === current.word) setScore(s => s + 1);
    setChecked(true);
  };

  const next = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setDone(true);
      const result = addXP(XP_REWARDS.quizCompleted, "quizCompleted");
      onXP({ xp: XP_REWARDS.quizCompleted, achievements: result.newAchievements, leveledUp: result.leveledUp });
    }
  };

  if (done) {
    return (
      <div className="text-center">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"><ChevronLeft size={14} /> رجوع</button>
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="text-5xl mb-4">🔠</div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-2">أحسنت!</h3>
          <p className="text-lg text-primary font-bold mb-4">النتيجة: {score}/{total}</p>
          <p className="text-accent font-bold mb-6">+{XP_REWARDS.quizCompleted} XP ⭐</p>
          <button onClick={onBack} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold">رجوع</button>
        </div>
      </div>
    );
  }

  const built = selected.map(i => shuffled[i]).join("");
  const isCorrect = built === current.word;

  return (
    <div>
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"><ChevronLeft size={14} /> رجوع</button>
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-foreground">🔠 بناء الكلمات</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{currentIdx + 1}/{total}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div className="bg-gradient-to-l from-primary to-accent h-2 rounded-full transition-all" style={{ width: `${((currentIdx + 1) / total) * 100}%` }} />
        </div>

        <div className="text-center space-y-4">
          <p className="text-xl text-primary font-bold">{current.arabic}</p>
          <button onClick={() => speakText(current.word, 0.7)} className="mx-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
            <Volume2 size={16} /> تلميح صوتي
          </button>

          {/* Built word display */}
          <div className="min-h-[3rem] flex items-center justify-center gap-1">
            {selected.map((idx, i) => (
              <span key={i} className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-lg font-bold text-foreground">{shuffled[idx]}</span>
            ))}
            {selected.length === 0 && <span className="text-muted-foreground text-sm">اختر الحروف بالترتيب...</span>}
          </div>

          {/* Available letters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {shuffled.map((letter, i) => (
              <button key={i} onClick={() => toggleLetter(i)} disabled={checked}
                className={`w-12 h-12 rounded-xl border-2 font-bold text-lg transition-all ${
                  selected.includes(i) ? "bg-primary/20 border-primary/50 opacity-50" : "bg-muted border-border hover:border-primary"
                }`}>{letter}</button>
            ))}
          </div>

          {!checked && selected.length === current.word.length && (
            <button onClick={checkAnswer} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold">تأكيد ✓</button>
          )}

          {checked && (
            <div className={`rounded-xl p-4 ${isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
              <p className="font-bold" dir="ltr">{isCorrect ? "✅ ممتاز!" : `❌ الإجابة: ${current.word}`}</p>
              <button onClick={next} className="mt-3 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold">
                {currentIdx < total - 1 ? "التالي ←" : "✓ إنهاء"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LearningGames;
