import { useMemo } from "react";
import { getProgressData, getReviewData, resetProgress } from "@/lib/progress";
import { getGamificationData, getLevelInfo, ACHIEVEMENTS, LEVELS } from "@/lib/gamification";
import { getCategories } from "@/data/vocabulary";
import { Flame, Trophy, BarChart3, Clock, RotateCcw, Star, Target, BookOpen, MessageSquare, Volume2, Gamepad2, BookMarked, Palette, TrendingUp, Award, Zap } from "lucide-react";

const ProgressDashboard = () => {
  const progress = useMemo(() => getProgressData(), []);
  const reviewData = useMemo(() => getReviewData(), []);
  const gamification = useMemo(() => getGamificationData(), []);
  const categories = useMemo(() => getCategories(), []);
  const levelInfo = useMemo(() => getLevelInfo(gamification.xp), [gamification.xp]);

  const totalWords = categories.reduce((sum, c) => sum + c.words.length, 0);
  const reviewedWords = Object.keys(reviewData).length;
  const masteredWords = Object.values(reviewData).filter((r) => r.level >= 4).length;

  const categoryCounts = categories.map((c) => ({
    name: c.name,
    icon: c.icon,
    total: c.words.length,
    reviewed: Object.values(reviewData).filter((r) => r.category === c.id).length,
    mastered: Object.values(reviewData).filter((r) => r.category === c.id && r.level >= 4).length,
  }));

  const mostPracticed = categoryCounts.reduce((best, c) => (c.reviewed > best.reviewed ? c : best), categoryCounts[0]);

  // Grammar progress
  const grammarProgress = (() => {
    try {
      const data = JSON.parse(localStorage.getItem("lab-english-grammar-progress") || "{}");
      return Object.keys(data).length;
    } catch { return 0; }
  })();

  // Section stats
  const sections = [
    { icon: <BookOpen size={18} />, label: "كلمات تمت مراجعتها", value: reviewedWords, color: "text-primary" },
    { icon: <Trophy size={18} />, label: "كلمات متقنة", value: masteredWords, color: "text-accent" },
    { icon: <BarChart3 size={18} />, label: "اختبارات مكتملة", value: progress.quizHistory.length, color: "text-primary" },
    { icon: <Flame size={18} />, label: "أيام متتالية", value: progress.streak, color: "text-destructive" },
    { icon: <Star size={18} />, label: "إجمالي XP", value: gamification.xp, color: "text-accent" },
    { icon: <BookMarked size={18} />, label: "دروس القواعد", value: grammarProgress, color: "text-primary" },
    { icon: <MessageSquare size={18} />, label: "محادثات", value: gamification.totalConversations, color: "text-accent" },
    { icon: <Volume2 size={18} />, label: "دروس الأصوات", value: gamification.totalPhonicsLessons, color: "text-primary" },
    { icon: <Palette size={18} />, label: "قصص مقروءة", value: gamification.totalStories, color: "text-accent" },
    { icon: <Target size={18} />, label: "دروس مكتملة", value: gamification.totalLessonsCompleted, color: "text-primary" },
  ];

  const handleReset = () => {
    if (confirm("هل أنت متأكد من حذف كل التقدم؟ لا يمكن التراجع عن هذا الإجراء.")) {
      resetProgress();
      localStorage.removeItem("lab-english-gamification");
      localStorage.removeItem("lab-english-grammar-progress");
      window.location.reload();
    }
  };

  // Quiz accuracy
  const totalQuizScore = progress.quizHistory.reduce((s, q) => s + q.score, 0);
  const totalQuizMax = progress.quizHistory.reduce((s, q) => s + q.total, 0);
  const accuracy = totalQuizMax > 0 ? Math.round((totalQuizScore / totalQuizMax) * 100) : 0;

  return (
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-2">📊 لوحة التقدم الشاملة</h2>
      <p className="text-muted-foreground mb-6">تتبع تقدمك في جميع الأقسام</p>

      {/* Level card */}
      <div className="bg-gradient-to-l from-primary/20 to-accent/20 rounded-2xl border border-primary/30 p-5 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{levelInfo.current.icon}</span>
          <div className="flex-1">
            <p className="text-lg font-display font-bold text-foreground">مستوى {levelInfo.current.level} - {levelInfo.current.title}</p>
            <div className="w-full bg-secondary rounded-full h-3 mt-2">
              <div
                className="h-3 rounded-full bg-gradient-to-l from-primary to-accent transition-all duration-500"
                style={{ width: `${levelInfo.progressToNext}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {gamification.xp} / {levelInfo.next.xpNeeded} XP للمستوى التالي
            </p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {sections.map((s, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-3 text-center">
            <div className={`mx-auto mb-1 ${s.color}`}>{s.icon}</div>
            <p className="text-xl font-display font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Overall mastery */}
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" /> التقدم الإجمالي في المفردات
        </h3>
        <div className="w-full bg-secondary rounded-full h-4 mb-2">
          <div
            className="h-4 rounded-full bg-gradient-to-l from-primary to-accent transition-all duration-500"
            style={{ width: `${totalWords > 0 ? (masteredWords / totalWords) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{masteredWords} من {totalWords} كلمة متقنة</span>
          <span>{totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0}%</span>
        </div>
      </div>

      {/* Quiz accuracy */}
      {progress.quizHistory.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5 mb-6">
          <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
            <Target size={18} className="text-accent" /> دقة الاختبارات
          </h3>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  className="stroke-secondary"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="3"
                  strokeDasharray={`${accuracy}, 100`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-display font-bold text-foreground">{accuracy}%</span>
            </div>
            <div>
              <p className="text-sm text-foreground font-semibold">{totalQuizScore} إجابة صحيحة من {totalQuizMax}</p>
              <p className="text-xs text-muted-foreground">{progress.quizHistory.length} اختبار مكتمل</p>
            </div>
          </div>
        </div>
      )}

      {/* Category progress */}
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-primary" /> التقدم حسب القسم
        </h3>
        <div className="space-y-3">
          {categoryCounts.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                  {cat.icon} {cat.name}
                </span>
                <span className="text-xs text-muted-foreground">{cat.mastered}/{cat.total} متقن</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${cat.total > 0 ? (cat.reviewed / cat.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly activity */}
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
          <Zap size={18} className="text-accent" /> نشاط الأسبوع
        </h3>
        <div className="flex items-end gap-2 h-24">
          {["سبت", "أحد", "اثن", "ثلا", "أرب", "خمي", "جمع"].map((day, i) => {
            const val = gamification.weeklyXp[i] || 0;
            const max = Math.max(...gamification.weeklyXp, 1);
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-muted-foreground">{val}</span>
                <div className="w-full bg-secondary rounded-t-md overflow-hidden" style={{ height: "60px" }}>
                  <div
                    className="w-full bg-gradient-to-t from-primary to-accent rounded-t-md transition-all mt-auto"
                    style={{ height: `${(val / max) * 100}%`, marginTop: `${100 - (val / max) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
          <Award size={18} className="text-accent" /> الشارات ({gamification.achievements.length}/{ACHIEVEMENTS.length})
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {ACHIEVEMENTS.map((ach) => {
            const unlocked = gamification.achievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`flex flex-col items-center p-2 rounded-xl text-center transition-all ${
                  unlocked ? "bg-accent/10 border border-accent/30" : "bg-muted/30 opacity-40"
                }`}
                title={ach.description}
              >
                <span className="text-xl">{ach.icon}</span>
                <p className="text-[9px] font-bold text-foreground mt-0.5 leading-tight">{ach.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Most practiced */}
      {mostPracticed && mostPracticed.reviewed > 0 && (
        <div className="bg-card rounded-xl border border-border p-5 mb-6">
          <h3 className="font-display font-bold text-foreground mb-2">🏆 أكثر قسم تعلمت منه</h3>
          <p className="text-lg text-primary font-display font-bold">{mostPracticed.icon} {mostPracticed.name}</p>
          <p className="text-sm text-muted-foreground">{mostPracticed.reviewed} كلمة تمت مراجعتها</p>
        </div>
      )}

      {/* Recent quizzes */}
      {progress.quizHistory.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5 mb-6">
          <h3 className="font-display font-bold text-foreground mb-3">آخر الاختبارات</h3>
          <div className="space-y-2">
            {progress.quizHistory.slice(-5).reverse().map((q, i) => (
              <div key={i} className="flex items-center justify-between bg-muted rounded-lg p-3">
                <span className="text-sm text-foreground">{q.category}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${q.score >= q.total * 0.7 ? "text-[hsl(var(--success))]" : "text-destructive"}`}>
                    {q.score}/{q.total}
                  </span>
                  <span className="text-xs text-muted-foreground">{new Date(q.date).toLocaleDateString("ar")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Levels roadmap */}
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <h3 className="font-display font-bold text-foreground mb-3">🗺️ خريطة المستويات</h3>
        <div className="space-y-2">
          {LEVELS.map((lvl) => {
            const reached = gamification.xp >= lvl.xpNeeded;
            return (
              <div key={lvl.level} className={`flex items-center gap-3 p-2 rounded-lg transition-all ${reached ? "bg-primary/10" : "bg-muted/30 opacity-50"}`}>
                <span className="text-xl">{lvl.icon}</span>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${reached ? "text-foreground" : "text-muted-foreground"}`}>مستوى {lvl.level} - {lvl.title}</p>
                </div>
                <span className="text-xs text-muted-foreground">{lvl.xpNeeded} XP</span>
                {reached && <span className="text-xs text-primary font-bold">✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 text-destructive font-semibold hover:bg-destructive hover:text-destructive-foreground transition-all"
      >
        <RotateCcw size={16} /> إعادة تعيين كل التقدم
      </button>
    </div>
  );
};

export default ProgressDashboard;
