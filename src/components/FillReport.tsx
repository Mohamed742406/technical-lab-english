import { useState } from "react";
import { speakText } from "@/lib/phonetics";
import { Volume2, CheckCircle2, RotateCcw } from "lucide-react";

interface BlankData {
  hint: string;
  opts: string[];
}

interface ReportParagraph {
  text: string;
  blanks: Record<string, BlankData>;
}

interface Report {
  id: number;
  category: string;
  title: string;
  titleAr: string;
  level: string;
  icon: string;
  paragraphs: ReportParagraph[];
}

const fillReports: Report[] = [
  {
    id: 1, category: "concrete", title: "Concrete Compressive Strength", titleAr: "مقاومة ضغط الخرسانة", level: "مبتدئ", icon: "💪",
    paragraphs: [
      {
        text: "Three concrete {cylinders} were cast on {site} and transported to the laboratory. Each {specimen} was {cured} in water at 23°C for 28 {days}.",
        blanks: { cylinders: { hint: "اسطوانات", opts: ["cubes", "cylinders", "molds", "blocks"] }, site: { hint: "الموقع", opts: ["lab", "office", "site", "factory"] }, specimen: { hint: "عينة", opts: ["sample", "specimen", "mold", "result"] }, cured: { hint: "معالجة", opts: ["dried", "cured", "stored", "frozen"] }, days: { hint: "أيام", opts: ["hours", "weeks", "days", "months"] } },
      },
      {
        text: "The {compressive} strength test was performed using a hydraulic {testing} machine. The {load} was applied at constant rate until {failure}.",
        blanks: { compressive: { hint: "ضغط", opts: ["tensile", "compressive", "shear", "bending"] }, testing: { hint: "اختبار", opts: ["mixing", "testing", "curing", "casting"] }, load: { hint: "حمل", opts: ["weight", "force", "load", "pressure"] }, failure: { hint: "انهيار", opts: ["success", "failure", "cracking", "setting"] } },
      },
      {
        text: "The average {result} was 32.5 {MPa}, which {exceeds} the specified {strength} of 30 MPa.",
        blanks: { result: { hint: "نتيجة", opts: ["reading", "result", "value", "number"] }, MPa: { hint: "وحدة", opts: ["kPa", "N/m", "MPa", "kg/cm"] }, exceeds: { hint: "يتجاوز", opts: ["fails", "meets", "exceeds", "equals"] }, strength: { hint: "مقاومة", opts: ["hardness", "strength", "density", "weight"] } },
      },
    ],
  },
  {
    id: 2, category: "soil", title: "Soil Compaction Test", titleAr: "اختبار دمك التربة", level: "مبتدئ", icon: "🔨",
    paragraphs: [
      {
        text: "The {Proctor} test was conducted to determine the {optimum} moisture content and maximum dry {density} of the soil sample.",
        blanks: { Proctor: { hint: "نوع الاختبار", opts: ["Marshall", "CBR", "Proctor", "Atterberg"] }, optimum: { hint: "مثلى", opts: ["minimum", "maximum", "optimum", "average"] }, density: { hint: "كثافة", opts: ["density", "weight", "volume", "pressure"] } },
      },
      {
        text: "The soil was {compacted} in three {layers} using a standard {hammer}. The mold was then {weighed} to determine bulk density.",
        blanks: { compacted: { hint: "مدموك", opts: ["dried", "compacted", "mixed", "heated"] }, layers: { hint: "طبقات", opts: ["samples", "layers", "batches", "portions"] }, hammer: { hint: "مطرقة", opts: ["rod", "vibrator", "hammer", "machine"] }, weighed: { hint: "وُزن", opts: ["measured", "weighed", "tested", "checked"] } },
      },
    ],
  },
  {
    id: 3, category: "asphalt", title: "Marshall Test Report", titleAr: "تقرير اختبار مارشال", level: "متوسط", icon: "🛣️",
    paragraphs: [
      {
        text: "Marshall {specimens} were prepared at five different {bitumen} contents ranging from 4.5% to 6.5%. Each specimen was compacted with {75} blows per side.",
        blanks: { specimens: { hint: "عينات", opts: ["tests", "specimens", "samples", "molds"] }, bitumen: { hint: "بيتومين", opts: ["cement", "bitumen", "aggregate", "asphalt"] }, "75": { hint: "عدد الضربات", opts: ["25", "50", "75", "100"] } },
      },
      {
        text: "After conditioning in a {water} bath at 60°C for 30 minutes, specimens were tested for {stability} and {flow}.",
        blanks: { water: { hint: "ماء", opts: ["oil", "water", "air", "sand"] }, stability: { hint: "ثبات", opts: ["strength", "stability", "density", "viscosity"] }, flow: { hint: "انسياب", opts: ["flow", "temperature", "pressure", "weight"] } },
      },
    ],
  },
  {
    id: 4, category: "concrete", title: "Fresh Concrete Test", titleAr: "اختبار الخرسانة الطازجة", level: "مبتدئ", icon: "🔺",
    paragraphs: [
      {
        text: "The {slump} test was performed on freshly mixed concrete. The cone was filled in {three} layers and each layer was {rodded} 25 times.",
        blanks: { slump: { hint: "هبوط", opts: ["flow", "slump", "test", "cone"] }, three: { hint: "ثلاثة", opts: ["two", "three", "four", "five"] }, rodded: { hint: "مدموك بالقضيب", opts: ["vibrated", "rodded", "compacted", "stirred"] } },
      },
      {
        text: "The measured slump was {85} mm, within the target range. The concrete {temperature} was 24°C and air {content} was 2.1%.",
        blanks: { "85": { hint: "قيمة الهبوط", opts: ["45", "65", "85", "120"] }, temperature: { hint: "درجة حرارة", opts: ["temperature", "moisture", "density", "weight"] }, content: { hint: "محتوى", opts: ["volume", "content", "ratio", "percent"] } },
      },
    ],
  },
];

function shuffleArr<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const FillReport = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean | null>>({});
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalBlanks, setTotalBlanks] = useState(0);

  const selectReport = (r: Report) => {
    setSelectedReport(r);
    setAnswers({});
    setChecked({});
    setTotalCorrect(0);
    let count = 0;
    r.paragraphs.forEach((p) => { count += Object.keys(p.blanks).length; });
    setTotalBlanks(count);
  };

  const handleSelect = (paraIdx: number, key: string, value: string) => {
    const id = `${paraIdx}-${key}`;
    if (checked[id] === true) return; // already correct

    setAnswers((prev) => ({ ...prev, [id]: value }));

    if (value === key) {
      setChecked((prev) => ({ ...prev, [id]: true }));
      setTotalCorrect((c) => c + 1);
    } else if (value) {
      setChecked((prev) => ({ ...prev, [id]: false }));
      // Reset after brief delay
      setTimeout(() => {
        setAnswers((prev) => ({ ...prev, [id]: "" }));
        setChecked((prev) => ({ ...prev, [id]: null }));
      }, 800);
    }
  };

  const readReport = () => {
    if (!selectedReport) return;
    const text = selectedReport.paragraphs.map((p) => p.text.replace(/\{(\w+)\}/g, "$1")).join(" ");
    speakText(text, 0.7);
  };

  const showAll = () => {
    if (!selectedReport) return;
    const newAnswers: Record<string, string> = {};
    const newChecked: Record<string, boolean> = {};
    selectedReport.paragraphs.forEach((p, pi) => {
      Object.keys(p.blanks).forEach((key) => {
        const id = `${pi}-${key}`;
        newAnswers[id] = key;
        newChecked[id] = true;
      });
    });
    setAnswers(newAnswers);
    setChecked(newChecked);
    setTotalCorrect(totalBlanks);
  };

  if (!selectedReport) {
    return (
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">📝 ملء تقارير المختبر</h2>
        <p className="text-muted-foreground mb-6">اختار تقرير وامأ الفراغات بالكلمات الصحيحة</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {fillReports.map((r) => (
            <button
              key={r.id}
              onClick={() => selectReport(r)}
              className="bg-card rounded-xl border border-border p-4 text-center hover:border-primary hover:card-glow transition-all"
            >
              <span className="text-3xl block mb-1">{r.icon}</span>
              <p className="font-display font-bold text-foreground text-xs">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.titleAr}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold mt-1 inline-block ${r.level === "مبتدئ" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                {r.level}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const pct = totalBlanks > 0 ? Math.round((totalCorrect / totalBlanks) * 100) : 0;

  return (
    <div>
      <button onClick={() => setSelectedReport(null)} className="text-sm text-muted-foreground hover:text-foreground mb-4 block">← رجوع</button>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="border-b border-border p-5">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground">{selectedReport.icon} {selectedReport.title}</h3>
              <p className="text-muted-foreground text-sm">{selectedReport.titleAr}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${selectedReport.level === "مبتدئ" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
              {selectedReport.level}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {selectedReport.paragraphs.map((para, pi) => {
            // Split text by {word} patterns
            const parts = para.text.split(/\{(\w+)\}/g);
            return (
              <p key={pi} className="text-foreground leading-loose bg-muted rounded-xl p-4 text-sm md:text-base" dir="ltr" style={{ textAlign: "left" }}>
                {parts.map((part, idx) => {
                  if (idx % 2 === 0) return <span key={idx}>{part}</span>;
                  // This is a blank key
                  const key = part;
                  const blankData = para.blanks[key];
                  if (!blankData) return <span key={idx}>{part}</span>;
                  const id = `${pi}-${key}`;
                  const isCorrect = checked[id] === true;
                  const isWrong = checked[id] === false;

                  return (
                    <span key={idx} className="inline-flex flex-col items-center mx-1">
                      <select
                        value={answers[id] || ""}
                        onChange={(e) => handleSelect(pi, key, e.target.value)}
                        disabled={isCorrect}
                        className={`border-2 rounded-lg px-2 py-1 font-bold text-sm transition-all ${
                          isCorrect ? "border-success bg-success/10 text-success" : isWrong ? "border-destructive bg-destructive/10" : "border-border bg-card focus:border-primary"
                        }`}
                      >
                        <option value="">_____</option>
                        {shuffleArr(blankData.opts).map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      <span className="text-xs text-muted-foreground">{blankData.hint}</span>
                    </span>
                  );
                })}
              </p>
            );
          })}
        </div>

        <div className="border-t border-border p-4 bg-muted/50">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-sm">{totalCorrect} / {totalBlanks} صح</span>
                <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
                  <div className="h-2 bg-success rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
            <button onClick={readReport} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm flex items-center gap-1">
              <Volume2 size={14} /> اقرأ الكل
            </button>
            <button onClick={showAll} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-bold text-sm">
              💡 اعرض الإجابات
            </button>
            <button onClick={() => selectReport(selectedReport)} className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-bold text-sm flex items-center gap-1">
              <RotateCcw size={14} /> أعد
            </button>
          </div>
          {pct === 100 && (
            <div className="mt-3 bg-success/10 text-success rounded-xl p-3 text-center font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={18} /> 🎉 ممتاز! أكملت التقرير بنجاح!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FillReport;
