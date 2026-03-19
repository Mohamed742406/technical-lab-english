import { useState, useEffect, useMemo } from "react";
import { getCategories } from "@/data/vocabulary";
import { addXP } from "@/lib/gamification";
import { Trophy, Star, Volume2, RotateCcw, Check, X } from "lucide-react";

const CHALLENGE_KEY = "lab-english-daily-challenge";

interface ChallengeState {
  date: string;
  wordOfDay: { english: string; arabic: string; pronunciation: string } | null;
  completed: string[];
  xpEarned: number;
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getDailyState(): ChallengeState {
  try {
    const s = JSON.parse(localStorage.getItem(CHALLENGE_KEY) || "{}");
    if (s.date === getTodayStr()) return s;
  } catch {}
  return { date: getTodayStr(), wordOfDay: null, completed: [], xpEarned: 0 };
}

function saveDailyState(s: ChallengeState) {
  localStorage.setItem(CHALLENGE_KEY, JSON.stringify(s));
}

const DailyChallenge = () => {
  const allWords = useMemo(() => {
    const cats = getCategories();
    return cats.flatMap(c => c.words);
  }, []);

  const [state, setState] = useState<ChallengeState>(getDailyState());
  const [scrambleWord, setScrambleWord] = useState("");
  const [scrambleInput, setScrambleInput] = useState("");
  const [scrambleResult, setScrambleResult] = useState<"correct" | "wrong" | null>(null);
  const [matchPairs, setMatchPairs] = useState<{en: string; ar: string; matched: boolean}[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [matchOptions, setMatchOptions] = useState<{text: string; type: "en" | "ar"; idx: number; matched: boolean}[]>([]);

  // Word of the day
  useEffect(() => {
    if (!state.wordOfDay && allWords.length > 0) {
      const dayIdx = new Date().getDate() + new Date().getMonth() * 31;
      const word = allWords[dayIdx % allWords.length];
      const ns = { ...state, wordOfDay: { english: word.english, arabic: word.arabic, pronunciation: word.pronunciation } };
      setState(ns);
      saveDailyState(ns);
    }
  }, [allWords, state]);

  // Setup scramble
  useEffect(() => {
    if (!state.completed.includes("scramble") && allWords.length > 0) {
      const dayIdx = (new Date().getDate() + 7) % allWords.length;
      setScrambleWord(allWords[dayIdx].english);
    }
  }, [allWords, state.completed]);

  // Setup match
  useEffect(() => {
    if (!state.completed.includes("match") && allWords.length > 0) {
      const dayIdx = new Date().getDate() * 3;
      const pairs = Array.from({ length: 4 }, (_, i) => {
        const w = allWords[(dayIdx + i * 7) % allWords.length];
        return { en: w.english, ar: w.arabic, matched: false };
      });
      setMatchPairs(pairs);
      const opts = [
        ...pairs.map((p, i) => ({ text: p.en, type: "en" as const, idx: i, matched: false })),
        ...pairs.map((p, i) => ({ text: p.ar, type: "ar" as const, idx: i, matched: false })),
      ].sort(() => Math.random() - 0.5);
      setMatchOptions(opts);
    }
  }, [allWords, state.completed]);

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.8;
    speechSynthesis.speak(u);
  };

  // ✓ خلط الحروف بـ Fisher-Yates الموثوق، مخزّن في state مستقل
  const [scrambled, setScrambled] = useState("");

  useEffect(() => {
    if (!scrambleWord) return;
    const letters = scrambleWord.split("");
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    setScrambled(letters.join(""));
  }, [scrambleWord]);

  const checkScramble = () => {
    if (scrambleInput.toLowerCase().trim() === scrambleWord.toLowerCase()) {
      setScrambleResult("correct");
      const ns = { ...state, completed: [...state.completed, "scramble"], xpEarned: state.xpEarned + 15 };
      setState(ns);
      saveDailyState(ns);
      addXP(15, "lessonCompleted");
    } else {
      setScrambleResult("wrong");
    }
  };

  const handleMatchClick = (optIdx: number) => {
    const opt = matchOptions[optIdx];
    if (opt.matched) return;

    if (selectedMatch === null) {
      setSelectedMatch(optIdx);
    } else {
      const prev = matchOptions[selectedMatch];
      if (prev.idx === opt.idx && prev.type !== opt.type) {
        // Match!
        const newOpts = matchOptions.map(o => o.idx === opt.idx ? { ...o, matched: true } : o);
        setMatchOptions(newOpts);
        setSelectedMatch(null);
        if (newOpts.every(o => o.matched)) {
          const ns = { ...state, completed: [...state.completed, "match"], xpEarned: state.xpEarned + 20 };
          setState(ns);
          saveDailyState(ns);
          addXP(20, "lessonCompleted");
        }
      } else {
        setSelectedMatch(null);
      }
    }
  };

  const completedCount = state.completed.length;
  const totalChallenges = 3;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
        <div className="flex items-center gap-3 mb-3">
          <Trophy className="w-8 h-8 text-yellow-300" />
          <div>
            <h2 className="text-xl font-bold">🎯 تحدي اليوم</h2>
            <p className="text-sm opacity-80">أكمل 3 تحديات واكسب نقاط إضافية!</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {Array.from({ length: totalChallenges }).map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${i < completedCount ? "bg-yellow-400" : "bg-white/20"}`} />
          ))}
        </div>
        <p className="text-xs mt-2 opacity-70">{completedCount}/{totalChallenges} مكتمل • +{state.xpEarned} XP</p>
      </div>

      {/* Word of the Day */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-yellow-500" />
          <h3 className="font-bold">⭐ كلمة اليوم</h3>
          {state.completed.includes("wod") && <Check className="w-4 h-4 text-green-500" />}
        </div>
        {state.wordOfDay && (
          <div className="text-center space-y-2">
            <p className="text-2xl font-bold text-primary">{state.wordOfDay.english}</p>
            <p className="text-lg text-green-600 font-semibold">{state.wordOfDay.pronunciation}</p>
            <p className="text-muted-foreground">{state.wordOfDay.arabic}</p>
            <button onClick={() => {
              speak(state.wordOfDay!.english);
              if (!state.completed.includes("wod")) {
                const ns = { ...state, completed: [...state.completed, "wod"], xpEarned: state.xpEarned + 5 };
                setState(ns);
                saveDailyState(ns);
                addXP(5, "wordLearned");
              }
            }} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 mx-auto">
              <Volume2 size={16} /> استمع 🔊
            </button>
          </div>
        )}
      </div>

      {/* Word Scramble */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <RotateCcw className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold">🔀 رتّب الحروف</h3>
          {state.completed.includes("scramble") && <Check className="w-4 h-4 text-green-500" />}
        </div>
        {state.completed.includes("scramble") ? (
          <p className="text-center text-green-600 font-bold">✅ أحسنت! الكلمة: {scrambleWord}</p>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2 justify-center flex-wrap">
              {scrambled.split("").map((ch, i) => (
                <span key={i} className="w-10 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-lg font-bold">
                  {ch.toUpperCase()}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={scrambleInput}
                onChange={e => { setScrambleInput(e.target.value); setScrambleResult(null); }}
                placeholder="اكتب الكلمة الصحيحة"
                className={`flex-1 border-2 rounded-xl px-4 py-3 text-center font-bold text-lg ${
                  scrambleResult === "correct" ? "border-green-500 bg-green-50" : scrambleResult === "wrong" ? "border-red-500 bg-red-50" : "border-border"
                }`}
                dir="ltr"
                onKeyDown={e => e.key === "Enter" && checkScramble()}
              />
              <button onClick={checkScramble} className="bg-primary text-primary-foreground px-5 rounded-xl font-bold">تحقق</button>
            </div>
            {scrambleResult === "wrong" && <p className="text-red-500 text-sm text-center">❌ حاول مرة تانية!</p>}
          </div>
        )}
      </div>

      {/* Match Pairs */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🔗</span>
          <h3 className="font-bold">وصّل الكلمة بمعناها</h3>
          {state.completed.includes("match") && <Check className="w-4 h-4 text-green-500" />}
        </div>
        {state.completed.includes("match") ? (
          <p className="text-center text-green-600 font-bold">✅ ممتاز! وصلت كل الكلمات!</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {matchOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleMatchClick(i)}
                disabled={opt.matched}
                className={`p-3 rounded-xl text-sm font-bold border-2 transition-all ${
                  opt.matched ? "border-green-500 bg-green-50 opacity-50" :
                  selectedMatch === i ? "border-primary bg-primary/10 scale-105" :
                  "border-border hover:border-primary/50"
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {completedCount >= totalChallenges && (
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl p-6 text-center">
          <p className="text-3xl mb-2">🏆</p>
          <h3 className="text-xl font-bold text-white">مبروك! أكملت تحدي اليوم!</h3>
          <p className="text-white/80 text-sm mt-1">كسبت {state.xpEarned} نقطة XP</p>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
