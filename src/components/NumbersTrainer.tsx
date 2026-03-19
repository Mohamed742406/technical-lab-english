import { useState } from "react";
import { speakText } from "@/lib/phonetics";
import SpeedControl from "@/components/SpeedControl";
import { Volume2, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

const numbersData = {
  basic: [
    { num: "1", word: "one", pron: "وان", ex: "1 specimen tested" },
    { num: "2", word: "two", pron: "تو", ex: "2 layers of asphalt" },
    { num: "3", word: "three", pron: "ثري", ex: "3 layers in slump test" },
    { num: "4", word: "four", pron: "فور", ex: "4 days soaking for CBR" },
    { num: "5", word: "five", pron: "فايڤ", ex: "5 sieve sizes" },
    { num: "6", word: "six", pron: "سيكس", ex: "6 cube molds" },
    { num: "7", word: "seven", pron: "سيڤن", ex: "7 day test age" },
    { num: "8", word: "eight", pron: "إيت", ex: "8 report sections" },
    { num: "9", word: "nine", pron: "ناين", ex: "9 Marshall specimens" },
    { num: "10", word: "ten", pron: "تِن", ex: "10 writing practices" },
    { num: "15", word: "fifteen", pron: "فيفتين", ex: "15 minutes mixing" },
    { num: "20", word: "twenty", pron: "توينتي", ex: "20°C curing" },
    { num: "23", word: "twenty-three", pron: "توينتي ثري", ex: "23°C standard" },
    { num: "25", word: "twenty-five", pron: "توينتي فايڤ", ex: "25 blows per layer" },
    { num: "28", word: "twenty-eight", pron: "توينتي إيت", ex: "28 days test age" },
    { num: "30", word: "thirty", pron: "ثيرتي", ex: "30 MPa target" },
    { num: "50", word: "fifty", pron: "فيفتي", ex: "50 blows modified" },
    { num: "75", word: "seventy-five", pron: "سيڤنتي فايڤ", ex: "75 blows Marshall" },
    { num: "96", word: "ninety-six", pron: "ناينتي سيكس", ex: "96% compaction" },
    { num: "100", word: "one hundred", pron: "وان هاندرد", ex: "100% maximum" },
  ],
  units: [
    { unit: "MPa", full: "Megapascal", pron: "ميجاباسكال", read: "thirty-two point five MPa", arabic: "ميجاباسكال — وحدة قياس مقاومة الضغط" },
    { unit: "kN", full: "Kilonewton", pron: "كيلونيوتن", read: "eleven kilonewtons stability", arabic: "كيلونيوتن — وحدة قياس الثبات" },
    { unit: "kg/m³", full: "Kilograms per cubic meter", pron: "كيلوجرام لكل متر مكعب", read: "three hundred and fifty kg per cubic meter", arabic: "كيلوجرام لكل متر مكعب — وحدة الكثافة" },
    { unit: "g/cm³", full: "Grams per cubic centimeter", pron: "جرام لكل سنتيمتر مكعب", read: "one point eight five grams per cubic centimeter", arabic: "جرام/سم³ — وحدة الكثافة" },
    { unit: "%", full: "Percent", pron: "بيرسنت", read: "ninety-six percent", arabic: "بيرسنت — نسبة مئوية" },
    { unit: "mm", full: "Millimeter", pron: "ميليميتر", read: "eighty-five millimeters slump", arabic: "مليمتر — وحدة طول" },
    { unit: "°C", full: "Degrees Celsius", pron: "ديجريز سيلسيوس", read: "one hundred sixty degrees Celsius", arabic: "درجة مئوية — وحدة حرارة" },
    { unit: "kPa", full: "Kilopascal", pron: "كيلوباسكال", read: "two hundred kilopascals", arabic: "كيلوباسكال — وحدة ضغط" },
  ],
  decimals: [
    { num: "0.5", word: "zero point five", pron: "زيرو بوينت فايڤ", ex: "0.5% air content tolerance" },
    { num: "1.85", word: "one point eight five", pron: "وان بوينت إيت فايڤ", ex: "1.85 g/cm³ dry density" },
    { num: "23.5", word: "twenty-three point five", pron: "توينتي ثري بوينت فايڤ", ex: "23.5 MPa strength" },
    { num: "0.45", word: "zero point four five", pron: "زيرو بوينت فور فايڤ", ex: "0.45 water-cement ratio" },
    { num: "14.2", word: "fourteen point two", pron: "فورتين بوينت تو", ex: "14.2% optimum moisture" },
    { num: "350", word: "three hundred and fifty", pron: "ثري هاندرد أند فيفتي", ex: "350 kg/m³ cement content" },
    { num: "5.2", word: "five point two", pron: "فايڤ بوينت تو", ex: "5.2% bitumen content" },
    { num: "96.5", word: "ninety-six point five", pron: "ناينتي سيكس بوينت فايڤ", ex: "96.5% compaction" },
  ],
  readings: [
    { reading: "The slump is 85 mm", pron: "ذا سلامب إز إيتي فايڤ ميليميترز", ar: "الهبوط هو 85 مليمتراً" },
    { reading: "Strength is 32.5 MPa", pron: "سترينث إز ثيرتي تو بوينت فايڤ ميجاباسكال", ar: "المقاومة 32.5 ميجاباسكال" },
    { reading: "Compaction is 96 percent", pron: "كومباكشن إز ناينتي سيكس بيرسنت", ar: "الدمك هو 96%" },
    { reading: "Temperature is 160 degrees Celsius", pron: "تمبراتشر إز وان هاندرد أند سيكستي ديجريز سيلسيوس", ar: "الحرارة 160 درجة" },
    { reading: "Density is 1.85 grams per cubic centimeter", pron: "دِنسيتي إز وان بوينت إيت فايڤ جرامز بير كيوبيك سنتيميتر", ar: "الكثافة 1.85 جم/سم³" },
    { reading: "Stability is 11 kilonewtons", pron: "ستابيليتي إز إليڤن كيلونيوتنز", ar: "الثبات 11 كيلونيوتن" },
    { reading: "Moisture content is 14.2 percent", pron: "مويستشر كونتنت إز فورتين بوينت تو بيرسنت", ar: "الرطوبة 14.2%" },
    { reading: "The sample weighs 350 grams", pron: "ذا سامبل ويز ثري هاندرد أند فيفتي جرامز", ar: "وزن العينة 350 جرام" },
  ],
};

type Tab = "basic" | "units" | "decimals" | "readings" | "challenge";

const NumbersTrainer = () => {
  const [tab, setTab] = useState<Tab>("basic");
  const [speed, setSpeed] = useState(0.6);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [challengeScore, setChallengeScore] = useState(0);
  const [challengePool, setChallengePool] = useState<typeof numbersData.basic>([]);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<null | boolean>(null);
  const [challengeDone, setChallengeDone] = useState(false);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "basic", label: "أرقام أساسية", icon: "🔢" },
    { id: "units", label: "الوحدات", icon: "📐" },
    { id: "decimals", label: "كسور عشرية", icon: "🔣" },
    { id: "readings", label: "قراءات معملية", icon: "📖" },
    { id: "challenge", label: "تحدي!", icon: "🎯" },
  ];

  const startChallenge = () => {
    const pool = [...numbersData.basic, ...numbersData.decimals]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    setChallengePool(pool);
    setChallengeIdx(0);
    setChallengeScore(0);
    setInput("");
    setFeedback(null);
    setChallengeDone(false);
    setTab("challenge");
  };

  const checkChallenge = () => {
    const item = challengePool[challengeIdx];
    const norm = input.trim().toLowerCase().replace(/-/g, " ");
    const correct = item.word.toLowerCase().replace(/-/g, " ");
    const isCorrect = norm === correct;
    setFeedback(isCorrect);
    if (isCorrect) setChallengeScore((s) => s + 1);
    speakText(item.word, speed);
    setTimeout(() => {
      if (challengeIdx + 1 >= challengePool.length) {
        setChallengeDone(true);
      } else {
        setChallengeIdx((i) => i + 1);
        setInput("");
        setFeedback(null);
      }
    }, 1500);
  };

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-2">🔢 تدريب الأرقام والوحدات</h2>
      <p className="text-muted-foreground mb-4">تعلم قراءة الأرقام والوحدات المعملية بالإنجليزي</p>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => t.id === "challenge" ? startChallenge() : setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
              tab === t.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <SpeedControl speed={speed} onSpeedChange={setSpeed} />

      <div className="mt-4">
        {tab === "basic" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {numbersData.basic.map((n) => (
              <div key={n.num} className="bg-card rounded-xl border border-border p-4 text-center hover:border-primary transition-all">
                <p className="text-3xl font-display font-extrabold text-primary">{n.num}</p>
                <p className="font-bold text-foreground mt-1">{n.word}</p>
                <p className="text-sm text-success font-semibold">{n.pron}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.ex}</p>
                <button onClick={() => speakText(n.word, speed)} className="mt-2 p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                  <Volume2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "units" && (
          <div className="space-y-3">
            {numbersData.units.map((u) => (
              <div key={u.unit} className="bg-card rounded-xl border border-border p-5 hover:border-primary transition-all">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-4xl font-display font-extrabold text-primary font-mono w-24 text-center">{u.unit}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground">{u.full} — <span className="text-success">{u.pron}</span></p>
                    <p className="text-muted-foreground text-sm mt-1">📖 قراءة: <em>"{u.read}"</em></p>
                    <p className="text-xs text-muted-foreground mt-1 bg-muted rounded px-2 py-1 inline-block">{u.arabic}</p>
                  </div>
                  <button onClick={() => speakText(u.read, speed)} className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Volume2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "decimals" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {numbersData.decimals.map((d) => (
              <div key={d.num} className="bg-card rounded-xl border border-border p-5 hover:border-primary transition-all">
                <p className="text-4xl font-display font-extrabold text-primary">{d.num}</p>
                <p className="font-bold text-foreground mt-2">{d.word}</p>
                <p className="text-success font-semibold">{d.pron}</p>
                <p className="text-xs text-muted-foreground mt-2 bg-muted rounded p-2">{d.ex}</p>
                <button onClick={() => speakText(d.word, speed)} className="mt-3 p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground">
                  <Volume2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "readings" && (
          <div className="space-y-3">
            {numbersData.readings.map((r, i) => (
              <div key={i} className="bg-card rounded-xl border-l-4 border-primary p-5">
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="flex-1">
                    <p className="text-lg font-bold text-foreground" dir="ltr">{r.reading}</p>
                    <p className="text-success font-semibold mt-1">{r.pron}</p>
                    <p className="text-muted-foreground text-sm mt-1 bg-muted rounded px-2 py-1 inline-block">{r.ar}</p>
                  </div>
                  <button onClick={() => speakText(r.reading, speed)} className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Volume2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "challenge" && !challengeDone && challengePool.length > 0 && (
          <div className="bg-card rounded-2xl border border-border p-6 max-w-lg mx-auto">
            <div className="text-center mb-6">
              <p className="text-muted-foreground font-bold mb-2">اكتب الرقم ده بالإنجليزي</p>
              <p className="text-6xl font-display font-extrabold text-primary">{challengePool[challengeIdx]?.num}</p>
            </div>
            <button onClick={() => speakText(challengePool[challengeIdx]?.word, speed)} className="w-full mb-3 py-2 rounded-lg bg-primary/10 text-primary font-bold">
              🔊 تلميح — اسمع النطق
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && feedback === null && checkChallenge()}
              placeholder="اكتب بالإنجليزي..."
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-xl font-bold text-center placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              dir="ltr"
              autoFocus
              disabled={feedback !== null}
            />
            {feedback !== null && (
              <div className={`mt-3 p-3 rounded-xl text-center font-bold ${feedback ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                {feedback ? <><CheckCircle2 className="inline" size={18} /> صح!</> : <><XCircle className="inline" size={18} /> الإجابة: {challengePool[challengeIdx]?.word}</>}
              </div>
            )}
            {feedback === null && (
              <button onClick={checkChallenge} className="w-full mt-3 py-3 rounded-xl bg-primary text-primary-foreground font-bold">تأكيد ✓</button>
            )}
            <p className="text-center text-muted-foreground text-sm mt-3">
              {challengeIdx + 1} / {challengePool.length} — النتيجة: {challengeScore}
            </p>
          </div>
        )}

        {tab === "challenge" && challengeDone && (
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <div className="text-6xl mb-4">{challengeScore >= challengePool.length * 0.8 ? "🏆" : "📚"}</div>
            <h3 className="text-3xl font-display font-bold text-foreground">
              {challengeScore} / {challengePool.length}
            </h3>
            <button onClick={startChallenge} className="mt-6 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold flex items-center gap-2 mx-auto">
              <RotateCcw size={18} /> حاول تاني
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumbersTrainer;
