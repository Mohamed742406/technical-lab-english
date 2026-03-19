import { useState } from "react";
import { Volume2, Mic, MicOff, RotateCcw, CheckCircle2, XCircle, Download } from "lucide-react";
import { speakText, downloadTextFile } from "@/lib/phonetics";
import SpeedControl from "@/components/SpeedControl";

const practiceContent = [
  {
    english: "The slump test result is 100 millimeters.",
    arabic: "نتيجة اختبار الهبوط 100 مليمتر.",
    pronunciation: "ذا سلامب تيست ريزالت إز وان هاندرد ميليميترز.",
  },
  {
    english: "Take a soil sample from the site.",
    arabic: "خذ عينة تربة من الموقع.",
    pronunciation: "تيك أ سويل سامبل فروم ذا سايت.",
  },
  {
    english: "The compressive strength is thirty megapascals.",
    arabic: "مقاومة الضغط ثلاثين ميجا باسكال.",
    pronunciation: "ذا كومبريسيف سترينث إز ثيرتي ميجاباسكالز.",
  },
  {
    english: "Check the moisture content of the soil.",
    arabic: "تحقق من محتوى الرطوبة في التربة.",
    pronunciation: "تشيك ذا مويستشر كونتنت أوف ذا سويل.",
  },
  {
    english: "The asphalt temperature is one hundred and sixty degrees.",
    arabic: "درجة حرارة الأسفلت مائة وستين درجة.",
    pronunciation: "ذا أسفولت تيمبريتشر إز وان هاندرد أند سيكستي ديجريز.",
  },
  {
    english: "This sample is rejected because it does not meet the specification.",
    arabic: "هذه العينة مرفوضة لأنها لا تحقق المواصفة.",
    pronunciation: "ذيس سامبل إز ريجيكتد بيكوز إت دازنت ميت ذا سبيسيفيكيشن.",
  },
  {
    english: "Please calibrate the equipment before testing.",
    arabic: "من فضلك عاير المعدات قبل الاختبار.",
    pronunciation: "بليز كاليبريت ذا إكويبمنت بيفور تيستينج.",
  },
  {
    english: "The curing period is twenty-eight days.",
    arabic: "فترة المعالجة ثمانية وعشرين يوم.",
    pronunciation: "ذا كيورينج بيريود إز توينتي إيت ديز.",
  },
  {
    english: "Compact the base course before applying the binder.",
    arabic: "ادمك طبقة الأساس قبل وضع الرابط.",
    pronunciation: "كومباكت ذا بيس كورس بيفور أبلايينج ذا بايندر.",
  },
  {
    english: "The CBR value must be at least eight percent.",
    arabic: "قيمة CBR يجب أن تكون على الأقل ثمانية بالمائة.",
    pronunciation: "ذا سي بي آر فاليو ماست بي أت ليست إيت بيرسينت.",
  },
  {
    english: "Submit the test report to the supervisor.",
    arabic: "سلم تقرير الاختبار للمشرف.",
    pronunciation: "سابميت ذا تيست ريبورت تو ذا سوبرفايزر.",
  },
  {
    english: "The quality control inspection is scheduled for tomorrow.",
    arabic: "فحص ضبط الجودة مجدول لبكرة.",
    pronunciation: "ذا كواليتي كونترول إنسبيكشن إز شيديولد فور توموروو.",
  },
];

const SentencePractice = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingResult, setRecordingResult] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [speed, setSpeed] = useState(0.7);

  const current = practiceContent[currentIndex];

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("المتصفح لا يدعم التعرف على الصوت. جرب متصفح Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    setIsRecording(true);
    setRecordingResult(null);
    setIsCorrect(null);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setRecordingResult(transcript);

      const target = current.english.toLowerCase().replace(/[.,!?]/g, "");
      const words = target.split(" ");
      const matchedWords = words.filter((w) => transcript.includes(w));
      const matchRatio = matchedWords.length / words.length;
      setIsCorrect(matchRatio >= 0.6);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      setRecordingResult("لم يتم التعرف على الصوت، حاول مرة أخرى");
      setIsCorrect(false);
    };

    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const nextSentence = () => {
    setCurrentIndex((prev) => (prev + 1) % practiceContent.length);
    setRecordingResult(null);
    setIsCorrect(null);
  };

  const handleDownload = () => {
    const content = `تمرين الجمل\n${"=".repeat(30)}\n\nالجملة: ${current.english}\nالترجمة: ${current.arabic}\nالنطق: ${current.pronunciation}\n`;
    downloadTextFile(`نطق-جملة-${currentIndex + 1}.txt`, content);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-foreground">🎯 تمرين الجمل</h2>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {practiceContent.length}
        </span>
      </div>

      {/* Speed control */}
      <div className="mb-4">
        <SpeedControl speed={speed} onSpeedChange={setSpeed} />
      </div>

      {/* English sentence */}
      <div className="bg-muted rounded-xl p-5 mb-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed" dir="ltr" style={{ textAlign: "left" }}>
            {current.english}
          </p>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleDownload}
              className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              title="تحميل النطق"
            >
              <Download size={18} />
            </button>
            <button
              onClick={() => speakText(current.english, speed)}
              className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <Volume2 size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Arabic translation */}
      <div className="mb-4 px-2">
        <p className="text-muted-foreground text-sm mb-1">الترجمة:</p>
        <p className="text-foreground text-lg">{current.arabic}</p>
      </div>

      {/* Pronunciation */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
        <p className="text-sm text-primary mb-1">النطق بالعربي:</p>
        <p className="text-foreground font-display font-semibold text-lg">{current.pronunciation}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 ${
            isRecording
              ? "bg-destructive text-destructive-foreground pulse-record"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          {isRecording ? "جاري التسجيل..." : "🎙️ سجل صوتك وجرب"}
        </button>

        <button
          onClick={nextSentence}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold transition-all"
        >
          <RotateCcw size={18} />
          الجملة التالية
        </button>
      </div>

      {/* Result */}
      {recordingResult && (
        <div className={`mt-5 rounded-xl p-4 border ${isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="text-success" size={22} />
                <span className="font-display font-bold text-success">ممتاز! نطقك صحيح 🎉</span>
              </>
            ) : (
              <>
                <XCircle className="text-destructive" size={22} />
                <span className="font-display font-bold text-destructive">حاول مرة تانية 💪</span>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground">أنت قلت:</p>
          <p className="text-foreground font-medium" dir="ltr" style={{ textAlign: "left" }}>{recordingResult}</p>
        </div>
      )}
    </div>
  );
};

export default SentencePractice;
