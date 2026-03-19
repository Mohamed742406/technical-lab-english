import { useState } from "react";
import { Volume2, Mic, MicOff, CheckCircle2, XCircle, Download } from "lucide-react";
import { VocabWord } from "@/data/vocabulary";
import { toArabicPhonetic, speakText, downloadTextFile } from "@/lib/phonetics";
import SpeedControl from "@/components/SpeedControl";

interface WordCardProps {
  word: VocabWord;
}

const WordCard = ({ word }: WordCardProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingResult, setRecordingResult] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExample, setShowExample] = useState(false);
  const [speed, setSpeed] = useState(0.8);

  const speak = (text: string) => {
    speakText(text, speed);
  };

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
      const target = word.english.toLowerCase();
      const match = transcript.includes(target) || target.includes(transcript);
      setIsCorrect(match);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      setRecordingResult("لم يتم التعرف على الصوت");
      setIsCorrect(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleDownload = (text: string, label: string) => {
    const phonetic = word.pronunciation || toArabicPhonetic(text);
    const content = `${label}\n${"=".repeat(30)}\nالكلمة: ${text}\nالنطق: ${phonetic}\nالمعنى: ${word.arabic}\n`;
    downloadTextFile(`نطق-${label}.txt`, content);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:card-glow transition-all duration-300 group">
      {/* English word */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
            {word.english}
          </h3>
          <p className="text-lg text-primary font-body mt-1">{word.arabic}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleDownload(word.english, word.english)}
            className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
            title="تحميل النطق"
          >
            <Download size={16} />
          </button>
          <button
            onClick={() => speak(word.english)}
            className="p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            title="استمع للنطق"
          >
            <Volume2 size={20} />
          </button>
        </div>
      </div>

      {/* Speed control */}
      <div className="mb-3">
        <SpeedControl speed={speed} onSpeedChange={setSpeed} />
      </div>

      {/* Pronunciation */}
      <div className="bg-muted rounded-lg px-4 py-2.5 mb-4">
        <p className="text-sm text-muted-foreground mb-0.5">النطق بالعربي:</p>
        <p className="text-foreground font-display font-semibold text-lg">{word.pronunciation}</p>
      </div>

      {/* Recording section */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            isRecording
              ? "bg-destructive text-destructive-foreground pulse-record"
              : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
          {isRecording ? "جاري التسجيل..." : "سجل صوتك"}
        </button>

        {recordingResult && (
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <CheckCircle2 className="text-success" size={20} />
            ) : (
              <XCircle className="text-destructive" size={20} />
            )}
            <span className={`text-sm font-medium ${isCorrect ? "text-success" : "text-destructive"}`}>
              {recordingResult}
            </span>
          </div>
        )}
      </div>

      {/* Example */}
      {word.example && (
        <div>
          <button
            onClick={() => setShowExample(!showExample)}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {showExample ? "إخفاء المثال ▲" : "عرض مثال ▼"}
          </button>
          {showExample && (
            <div className="mt-2 bg-muted/50 rounded-lg p-3 border border-border/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground font-medium">{word.example}</p>
                <button
                  onClick={() => speak(word.example!)}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-primary transition-colors"
                >
                  <Volume2 size={14} />
                </button>
              </div>
              <p className="text-sm text-primary mt-1">{word.exampleArabic}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WordCard;
