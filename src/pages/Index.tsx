import { useState, useMemo, useEffect, useRef } from "react";
import { getCategories } from "@/data/vocabulary";
import CategoryCard from "@/components/CategoryCard";
import WordCard from "@/components/WordCard";
import SentencePractice from "@/components/SentencePractice";
import SpecReader from "@/components/SpecReader";
import Quiz from "@/components/Quiz";
import WritingPractice from "@/components/WritingPractice";
import Conversations from "@/components/Conversations";
import Stories from "@/components/Stories";
import Flashcards from "@/components/Flashcards";
import InteractiveConversation from "@/components/InteractiveConversation";
import ProgressDashboard from "@/components/ProgressDashboard";
import Phonics from "@/components/Phonics";
import PlacementTest from "@/components/PlacementTest";
import NumbersTrainer from "@/components/NumbersTrainer";
import ProcedureBuilder from "@/components/ProcedureBuilder";
import FillReport from "@/components/FillReport";
import Grammar from "@/components/Grammar";
import IllustratedStories from "@/components/IllustratedStories";
import DailyChallenge from "@/components/DailyChallenge";
import LearningPath from "@/components/LearningPath";
import PronunciationTrainer from "@/components/PronunciationTrainer";
import LearningGames from "@/components/LearningGames";
import RepetitionWriter from "@/components/RepetitionWriter";
import FoundationLearning from "@/components/FoundationLearning";
import GamificationBar from "@/components/GamificationBar";
import { getShowSyllables, setShowSyllables } from "@/lib/syllables";
import { isPlacementDone, isTourDone, setTourDone, recordActivity } from "@/lib/progress";
import { BookOpen, MessageSquare, GraduationCap, FileText, Trophy, Pen, MessagesSquare, BookText, Settings, RotateCcw, Mic, BarChart3, Volume2, Hash, ClipboardList, FileCheck, Map, BookMarked, Palette, Zap, Gamepad2, AudioLines, ChevronDown, Sun, Moon } from "lucide-react";

type Tab = "vocab" | "practice" | "quiz" | "writing" | "repetition" | "foundation" | "conversations" | "stories" | "specs" | "flashcards" | "interactive" | "progress" | "phonics" | "numbers" | "procedures" | "fillreport" | "path" | "grammar" | "illustrated" | "daily" | "pronunciation" | "games";

const Index = () => {
  const allCategories = useMemo(() => getCategories(), []);
  const [activeCategory, setActiveCategory] = useState(allCategories[0].id);
  const [activeTab, setActiveTab] = useState<Tab>("path");
  const [showSyllables, setShowSyllablesState] = useState(getShowSyllables());
  const [showOnboarding, setShowOnboarding] = useState(!isPlacementDone() || !isTourDone());
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("lab-english-theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", !darkMode);
    localStorage.setItem("lab-english-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => { recordActivity(); }, []);

  const currentCategory = allCategories.find((c) => c.id === activeCategory)!;

  const toggleSyllables = () => {
    const next = !showSyllables;
    setShowSyllablesState(next);
    setShowSyllables(next);
  };

  // ✓ إزالة vocab من هنا لأنها تحتاج state خاص — بتتعالج في الأسفل
  const SIMPLE_TABS: Partial<Record<Tab, React.ReactNode>> = {
    path:         <LearningPath />,
    daily:        <DailyChallenge />,
    grammar:      <Grammar />,
    illustrated:  <IllustratedStories />,
    pronunciation:<PronunciationTrainer />,
    games:        <LearningGames />,
    flashcards:   <Flashcards />,
    phonics:      <Phonics />,
    interactive:  <InteractiveConversation />,
    progress:     <ProgressDashboard />,
    conversations:<Conversations />,
    stories:      <Stories />,
    practice:     <SentencePractice />,
    quiz:         <Quiz />,
    writing:      <WritingPractice />,
    repetition:   <RepetitionWriter />,
    foundation:   <FoundationLearning />,
    numbers:      <NumbersTrainer />,
    procedures:   <ProcedureBuilder />,
    fillreport:   <FillReport />,
    specs:        <SpecReader />,
  };

  const tabGroups = [
    { label: "📚 التعلم", tabs: [
      { id: "foundation"    as Tab, icon: <BookOpen size={16} />,    label: "من الأساس 🧒" },
      { id: "path"         as Tab, icon: <Map size={16} />,         label: "مسار التعلم" },
      { id: "daily"        as Tab, icon: <Zap size={16} />,         label: "تحدي يومي" },
      { id: "grammar"      as Tab, icon: <BookMarked size={16} />,  label: "قواعد" },
      { id: "phonics"      as Tab, icon: <Volume2 size={16} />,     label: "الأصوات" },
    ]},
    { label: "🎯 تدريب", tabs: [
      { id: "pronunciation" as Tab, icon: <AudioLines size={16} />, label: "تدريب النطق" },
      { id: "games"         as Tab, icon: <Gamepad2 size={16} />,   label: "ألعاب" },
      { id: "practice"      as Tab, icon: <MessageSquare size={16} />, label: "تمرين" },
      { id: "quiz"          as Tab, icon: <Trophy size={16} />,     label: "اختبار" },
      { id: "writing"       as Tab, icon: <Pen size={16} />,        label: "كتابة" },
      { id: "repetition"    as Tab, icon: <RotateCcw size={16} />,  label: "تكرار للحفظ" },
    ]},
    { label: "📖 محتوى", tabs: [
      { id: "vocab"         as Tab, icon: <BookOpen size={16} />,   label: "المفردات" },
      { id: "flashcards"    as Tab, icon: <RotateCcw size={16} />,  label: "فلاش كارد" },
      { id: "conversations" as Tab, icon: <MessagesSquare size={16} />, label: "محادثات" },
      { id: "interactive"   as Tab, icon: <Mic size={16} />,        label: "تفاعلي" },
      { id: "stories"       as Tab, icon: <BookText size={16} />,   label: "قصص" },
      { id: "illustrated"   as Tab, icon: <Palette size={16} />,    label: "قصص مصورة" },
    ]},
    { label: "🔧 متقدم", tabs: [
      { id: "numbers"     as Tab, icon: <Hash size={16} />,        label: "أرقام" },
      { id: "procedures"  as Tab, icon: <ClipboardList size={16} />, label: "إجراءات" },
      { id: "fillreport"  as Tab, icon: <FileCheck size={16} />,   label: "تقارير" },
      { id: "specs"       as Tab, icon: <FileText size={16} />,    label: "مواصفات" },
      { id: "progress"    as Tab, icon: <BarChart3 size={16} />,   label: "تقدمي" },
    ]},
  ];

  const allTabs = tabGroups.flatMap(g => g.tabs);
  const activeTabData = allTabs.find(t => t.id === activeTab);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {showOnboarding && (
        <PlacementTest onComplete={() => {
          // ✓ استدعاء setTourDone عشان isTourDone() تبقى true في الزيارات الجاية
          setTourDone();
          setShowOnboarding(false);
        }} />
      )}

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm z-10">
        <div className="container max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-extrabold text-gradient">
                🔬 Lab English
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                تعلم الإنجليزية لفني المختبرات
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all bg-secondary text-muted-foreground hover:text-foreground"
                title={darkMode ? "الوضع الفاتح" : "الوضع المظلم"}
              >
                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <button
                onClick={toggleSyllables}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  showSyllables
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
                title="إظهار تقطيع المقاطع"
              >
                <Settings size={12} />
                <span className="hidden sm:inline">مقاطع</span>
              </button>
            </div>
          </div>

          {/* Gamification Bar */}
          <div className="mt-2">
            <GamificationBar />
          </div>

          {/* Dropdown Navigation */}
          <div className="relative mt-2" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-secondary text-foreground font-semibold text-sm transition-all hover:bg-secondary/80"
            >
              <div className="flex items-center gap-2">
                {activeTabData?.icon}
                <span>{activeTabData?.label}</span>
              </div>
              <ChevronDown size={16} className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 max-h-[70vh] overflow-y-auto">
                {tabGroups.map((group, gi) => (
                  <div key={gi}>
                    <p className="px-4 py-2 text-xs font-bold text-muted-foreground bg-muted/50 sticky top-0">{group.label}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 p-2">
                      {group.tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                            activeTab === tab.id
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          {tab.icon}
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-6">
        {/* ✓ vocab لها render خاص لأنها تعتمد على state محلي (activeCategory) */}
        {activeTab === "vocab" ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {allCategories.map((cat) => (
                <div key={cat.id} className="bg-card rounded-xl border border-border p-4 text-center">
                  <span className="text-2xl">{cat.icon}</span>
                  <p className="text-xs text-muted-foreground mt-1">{cat.name}</p>
                  <p className="text-xl font-display font-bold text-foreground">{cat.words.length}</p>
                  <p className="text-xs text-muted-foreground">كلمة</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
              {allCategories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} isActive={activeCategory === cat.id} onClick={() => setActiveCategory(cat.id)} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCategory.words.map((word, i) => (
                <WordCard key={`${word.english}-${i}`} word={word} />
              ))}
            </div>
          </>
        ) : (
          // ✓ lookup object بدل سلسلة ternary بـ 20 مستوى
          SIMPLE_TABS[activeTab] ?? <SpecReader />
        )}
      </main>

      <footer className="border-t border-border py-4 mt-8">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <GraduationCap size={16} />
            استخدم متصفح Chrome للحصول على أفضل تجربة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
