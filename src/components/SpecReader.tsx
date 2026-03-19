import { useState, useCallback } from "react";
import {
  Upload, FileText, Volume2, Mic, MicOff, CheckCircle2, XCircle,
  Download, ChevronRight, BookOpen, X, Plus, Check,
} from "lucide-react";
import { toArabicPhonetic, speakText, downloadTextFile } from "@/lib/phonetics";
import { addCustomWord, getCustomWords } from "@/data/vocabulary";
import SpeedControl from "@/components/SpeedControl";
import { toast } from "sonner";

interface Section {
  title: string;
  content: string;
}

interface WordInfo {
  word: string;
  phonetic: string;
  sentence: string;
  sentencePhonetic: string;
}

const SpecReader = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [selectedWord, setSelectedWord] = useState<WordInfo | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordResult, setRecordResult] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [speed, setSpeed] = useState(0.7);
  const [saveCategoryId, setSaveCategoryId] = useState("general");
  const [savedWords, setSavedWords] = useState<string[]>(() =>
    getCustomWords().map((w) => w.english.toLowerCase())
  );

  const parseTextIntoSections = useCallback((text: string): Section[] => {
    const lines = text.split("\n");
    const sectionList: Section[] = [];
    let currentTitle = "";
    let currentContent: string[] = [];

    const sectionPattern = /^(\d+[\.\d]*\s|section\s+\d+|chapter\s+\d+|clause\s+\d+|part\s+\d+|article\s+\d+)/i;
    const headingPattern = /^[A-Z][A-Z\s]{3,}$/;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) { currentContent.push(""); continue; }
      if (sectionPattern.test(trimmed) || headingPattern.test(trimmed)) {
        if (currentTitle || currentContent.some((l) => l.trim())) {
          sectionList.push({ title: currentTitle || `القسم ${sectionList.length + 1}`, content: currentContent.join("\n").trim() });
        }
        currentTitle = trimmed;
        currentContent = [];
      } else {
        currentContent.push(trimmed);
      }
    }
    if (currentTitle || currentContent.some((l) => l.trim())) {
      sectionList.push({ title: currentTitle || `القسم ${sectionList.length + 1}`, content: currentContent.join("\n").trim() });
    }
    if (sectionList.length === 0) {
      sectionList.push({ title: "المحتوى", content: text.trim() });
    }
    return sectionList;
  }, []);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setFileName(file.name);
    setActiveSection(null);
    setSelectedWord(null);

    try {
      if (file.type === "application/pdf") {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(" ");
          fullText += pageText + "\n\n";
        }
        setSections(parseTextIntoSections(fullText));
      } else {
        const text = await file.text();
        setSections(parseTextIntoSections(text));
      }
    } catch (err) {
      console.error("Error reading file:", err);
      alert("حصل خطأ في قراءة الملف. جرب ملف تاني.");
    } finally {
      setIsLoading(false);
    }
  }, [parseTextIntoSections]);

  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[^a-zA-Z'-]/g, "");
    if (!cleanWord || cleanWord.length < 2) return;
    const sentence = generateSentence(cleanWord);
    setSelectedWord({
      word: cleanWord,
      phonetic: toArabicPhonetic(cleanWord),
      sentence,
      sentencePhonetic: toArabicPhonetic(sentence),
    });
    setRecordResult(null);
    setIsCorrect(null);
  };

  const generateSentence = (word: string): string => {
    const templates = [
      `The ${word} is required for this test.`,
      `Please check the ${word} before proceeding.`,
      `The ${word} must meet the specification requirements.`,
      `Measure the ${word} carefully.`,
      `The ${word} value should be recorded in the report.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const startPronunciationTest = (text: string) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("المتصفح لا يدعم التعرف على الصوت. جرب متصفح Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    setIsRecording(true);
    setRecordResult(null);
    setIsCorrect(null);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setRecordResult(transcript);
      const target = text.toLowerCase().replace(/[.,!?]/g, "");
      const words = target.split(" ");
      const matched = words.filter((w) => transcript.includes(w));
      setIsCorrect(matched.length / words.length >= 0.5);
      setIsRecording(false);
    };
    recognition.onerror = () => { setIsRecording(false); setRecordResult("لم يتم التعرف على الصوت"); setIsCorrect(false); };
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const handleDownloadPhonetics = (text: string, phonetic: string, label: string) => {
    const content = `${label}\n${"=".repeat(40)}\n\nالنص الإنجليزي:\n${text}\n\nالنطق بالعربي:\n${phonetic}\n`;
    downloadTextFile(`نطق-${label}.txt`, content);
  };

  const handleSaveWord = (word: string) => {
    const cleanWord = word.replace(/[^a-zA-Z'-]/g, "");
    if (!cleanWord) return;
    addCustomWord({
      english: cleanWord,
      arabic: toArabicPhonetic(cleanWord),
      pronunciation: toArabicPhonetic(cleanWord),
      category: saveCategoryId,
      example: `The ${cleanWord} is important for the test.`,
      exampleArabic: `ال${toArabicPhonetic(cleanWord)} مهم للاختبار.`,
    });
    setSavedWords((prev) => [...prev, cleanWord.toLowerCase()]);
    toast.success(`تم حفظ "${cleanWord}" في المفردات ✅`);
  };

  // Upload screen
  if (!fileName) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 text-center max-w-lg w-full">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Upload className="text-primary" size={36} />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">📄 رفع مواصفة فنية</h2>
          <p className="text-muted-foreground mb-6">ارفع ملف PDF أو ملف نصي وهنساعدك تقرأه وتنطقه</p>
          <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold cursor-pointer hover:bg-primary/90 transition-all">
            <FileText size={20} />
            اختر ملف المواصفة
            <input type="file" accept=".pdf,.txt,.text,.doc,.docx" onChange={handleFileUpload} className="hidden" />
          </label>
          <p className="text-xs text-muted-foreground mt-4">يدعم ملفات PDF و TXT</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-foreground font-display font-semibold">جاري قراءة الملف...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* File header */}
      <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <FileText className="text-primary" size={22} />
          <div>
            <p className="font-display font-bold text-foreground text-sm">{fileName}</p>
            <p className="text-xs text-muted-foreground">{sections.length} قسم</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <SpeedControl speed={speed} onSpeedChange={setSpeed} />
          <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold cursor-pointer hover:bg-secondary/80 transition-all">
            <Upload size={14} />
            ملف جديد
            <input type="file" accept=".pdf,.txt,.text" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Section list */}
        <div className="md:col-span-1 bg-card rounded-xl border border-border p-3 max-h-[70vh] overflow-y-auto">
          <h3 className="text-sm font-display font-bold text-muted-foreground mb-3 px-2">📑 الأقسام</h3>
          <div className="space-y-1">
            {sections.map((sec, i) => (
              <button
                key={i}
                onClick={() => { setActiveSection(i); setSelectedWord(null); }}
                className={`w-full text-right px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
                  activeSection === i ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <ChevronRight size={14} className="shrink-0" />
                <span className="truncate" dir="ltr" style={{ textAlign: "left" }}>{sec.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content viewer */}
        <div className="md:col-span-2 bg-card rounded-xl border border-border p-5 max-h-[70vh] overflow-y-auto">
          {activeSection === null ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="text-muted-foreground mb-3" size={40} />
              <p className="text-muted-foreground">اختر قسم من القائمة عشان تبدأ تقرأ</p>
            </div>
          ) : (
            <>
              {/* Section title */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-foreground text-lg" dir="ltr" style={{ textAlign: "left" }}>
                  {sections[activeSection].title}
                </h3>
                <button
                  onClick={() => speakText(sections[activeSection].content.slice(0, 500), speed)}
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  title="اقرأ القسم"
                >
                  <Volume2 size={18} />
                </button>
              </div>

              {/* Content with clickable words */}
              <div className="bg-muted rounded-xl p-4 mb-4" dir="ltr" style={{ textAlign: "left" }}>
                <p className="leading-relaxed text-foreground">
                  {sections[activeSection].content.split(/(\s+)/).map((token, i) => {
                    const cleanWord = token.replace(/[^a-zA-Z'-]/g, "");
                    if (cleanWord.length >= 2) {
                      return (
                        <span
                          key={i}
                          onClick={() => handleWordClick(token)}
                          className="cursor-pointer hover:bg-primary/20 hover:text-primary rounded px-0.5 transition-colors inline"
                        >
                          {token}
                        </span>
                      );
                    }
                    return <span key={i}>{token}</span>;
                  })}
                </p>
              </div>

              {/* Pronunciation guide */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-primary font-semibold">النطق بالعربي للقسم:</p>
                  <button
                    onClick={() =>
                      handleDownloadPhonetics(
                        sections[activeSection].content,
                        toArabicPhonetic(sections[activeSection].content),
                        sections[activeSection].title
                      )
                    }
                    className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors"
                  >
                    <Download size={14} />
                    تحميل
                  </button>
                </div>
                <p className="text-foreground font-display text-sm leading-relaxed">
                  {toArabicPhonetic(sections[activeSection].content.slice(0, 600))}
                  {sections[activeSection].content.length > 600 && "..."}
                </p>
              </div>

              {/* Pronunciation test */}
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    startPronunciationTest(
                      sections[activeSection].content.split(".")[0] || sections[activeSection].content.slice(0, 80)
                    )
                  }
                  disabled={isRecording}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isRecording
                      ? "bg-destructive text-destructive-foreground pulse-record"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  {isRecording ? "جاري التسجيل..." : "🎙️ امتحان نطق"}
                </button>
              </div>

              {recordResult && !selectedWord && (
                <div className={`mt-4 rounded-xl p-4 border ${isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {isCorrect ? (
                      <><CheckCircle2 className="text-success" size={20} /><span className="font-display font-bold text-success">ممتاز! 🎉</span></>
                    ) : (
                      <><XCircle className="text-destructive" size={20} /><span className="font-display font-bold text-destructive">حاول تاني 💪</span></>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">أنت قلت:</p>
                  <p className="text-foreground font-medium text-sm" dir="ltr" style={{ textAlign: "left" }}>{recordResult}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Selected word popup */}
      {selectedWord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card rounded-2xl border border-border p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-display font-bold text-primary">{selectedWord.word}</h3>
              <button
                onClick={() => { setSelectedWord(null); setRecordResult(null); setIsCorrect(null); }}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Phonetic */}
            <div className="bg-muted rounded-lg px-4 py-3 mb-4">
              <p className="text-xs text-muted-foreground mb-1">النطق بالعربي:</p>
              <p className="text-foreground font-display font-semibold text-xl">{selectedWord.phonetic}</p>
            </div>

            {/* Speed control */}
            <div className="mb-4">
              <SpeedControl speed={speed} onSpeedChange={setSpeed} />
            </div>

            {/* Listen + Download + Save */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => speakText(selectedWord.word, speed)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                <Volume2 size={16} />
                انطق الكلمة
              </button>
              <button
                onClick={() => handleDownloadPhonetics(selectedWord.word, selectedWord.phonetic, selectedWord.word)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/80 transition-all"
              >
                <Download size={16} />
                تحميل
              </button>
              {savedWords.includes(selectedWord.word.toLowerCase()) ? (
                <span className="flex items-center gap-1 px-3 py-2 rounded-lg bg-success/10 text-success text-sm font-semibold">
                  <Check size={16} />
                  محفوظة
                </span>
              ) : (
                <button
                  onClick={() => handleSaveWord(selectedWord.word)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-all"
                >
                  <Plus size={16} />
                  أضف للمفردات
                </button>
              )}
            </div>

            {/* Save category selector */}
            {!savedWords.includes(selectedWord.word.toLowerCase()) && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-muted-foreground">حفظ في:</span>
                {["soil", "concrete", "asphalt", "general"].map((catId) => (
                  <button
                    key={catId}
                    onClick={() => setSaveCategoryId(catId)}
                    className={`text-xs px-2 py-1 rounded-md transition-all ${
                      saveCategoryId === catId ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {catId === "soil" ? "تربة" : catId === "concrete" ? "خرسانة" : catId === "asphalt" ? "أسفلت" : "عام"}
                  </button>
                ))}
              </div>
            )}

            {/* Example sentence */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-muted-foreground mb-1">جملة مثال:</p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-foreground font-medium text-sm" dir="ltr" style={{ textAlign: "left" }}>{selectedWord.sentence}</p>
                <button
                  onClick={() => speakText(selectedWord.sentence, speed)}
                  className="p-1.5 rounded-full text-primary hover:bg-primary/10 transition-colors shrink-0"
                >
                  <Volume2 size={16} />
                </button>
              </div>
              <p className="text-primary font-display text-sm mt-2">{selectedWord.sentencePhonetic}</p>
              <button
                onClick={() => handleDownloadPhonetics(selectedWord.sentence, selectedWord.sentencePhonetic, `جملة-${selectedWord.word}`)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-2 transition-colors"
              >
                <Download size={12} />
                تحميل نطق الجملة
              </button>
            </div>

            {/* Record */}
            <button
              onClick={() => startPronunciationTest(selectedWord.word)}
              disabled={isRecording}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                isRecording
                  ? "bg-destructive text-destructive-foreground pulse-record"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              {isRecording ? "جاري التسجيل..." : "🎙️ سجل صوتك وجرب"}
            </button>

            {recordResult && (
              <div className={`mt-3 rounded-xl p-3 border ${isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}>
                <div className="flex items-center gap-2">
                  {isCorrect ? <CheckCircle2 className="text-success" size={18} /> : <XCircle className="text-destructive" size={18} />}
                  <span className={`text-sm font-bold ${isCorrect ? "text-success" : "text-destructive"}`}>
                    {isCorrect ? "ممتاز! 🎉" : "حاول تاني 💪"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1" dir="ltr" style={{ textAlign: "left" }}>{recordResult}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecReader;
