import { useState, useEffect } from "react";
import { getGamificationData, getLevelInfo, ACHIEVEMENTS, LEVELS } from "@/lib/gamification";
import { getProgressData } from "@/lib/progress";
import { Flame, Star, Trophy, ChevronDown, ChevronUp } from "lucide-react";

const GamificationBar = () => {
  const [data, setData] = useState(getGamificationData());
  const [progress, setProgress] = useState(getProgressData());
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(getGamificationData());
      setProgress(getProgressData());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const levelInfo = getLevelInfo(data.xp);
  const unlockedAchievements = ACHIEVEMENTS.filter(a => data.achievements.includes(a.id));
  const dailyProgress = Math.min(100, (data.dailyXp / data.dailyGoal) * 100);

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-3 mb-4">
      {/* Main bar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Level */}
        <div className="flex items-center gap-1.5">
          <span className="text-xl">{levelInfo.current.icon}</span>
          <div>
            <p className="text-xs font-bold text-foreground">مستوى {levelInfo.current.level}</p>
            <p className="text-[10px] text-muted-foreground">{levelInfo.current.title}</p>
          </div>
        </div>

        {/* XP Progress */}
        <div className="flex-1 min-w-[100px]">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
            <span>{data.xp} XP</span>
            <span>{levelInfo.next.xpNeeded} XP</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-l from-primary to-accent transition-all"
              style={{ width: `${levelInfo.progressToNext}%` }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 bg-destructive/10 px-2 py-1 rounded-lg">
          <Flame size={14} className="text-destructive" />
          <span className="text-xs font-bold text-destructive">{progress.streak}</span>
        </div>

        {/* Daily Goal */}
        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
          <Star size={14} className="text-primary" />
          <span className="text-xs font-bold text-primary">{data.dailyXp}/{data.dailyGoal}</span>
        </div>

        {/* Achievements count */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-lg hover:bg-accent/20 transition-all"
        >
          <Trophy size={14} className="text-accent" />
          <span className="text-xs font-bold text-accent">{unlockedAchievements.length}</span>
          {showDetails ? <ChevronUp size={12} className="text-accent" /> : <ChevronDown size={12} className="text-accent" />}
        </button>
      </div>

      {/* Daily goal bar */}
      {dailyProgress < 100 && (
        <div className="mt-2">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
            <span>🎯 الهدف اليومي</span>
            <span>{Math.round(dailyProgress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className="h-1.5 rounded-full bg-accent transition-all" style={{ width: `${dailyProgress}%` }} />
          </div>
        </div>
      )}
      {dailyProgress >= 100 && (
        <p className="text-xs text-accent font-bold mt-1 text-center">🎉 أحسنت! حققت هدفك اليومي!</p>
      )}

      {/* Expanded details */}
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-border">
          {/* Weekly chart */}
          <p className="text-xs font-bold text-foreground mb-2">📊 نشاط الأسبوع</p>
          <div className="flex items-end gap-1 h-12 mb-4">
            {["سبت", "أحد", "اثن", "ثلا", "أرب", "خمي", "جمع"].map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full rounded-t bg-primary/60 transition-all min-h-[2px]"
                  style={{ height: `${Math.min(100, ((data.weeklyXp[i] || 0) / Math.max(1, data.dailyGoal)) * 100)}%` }}
                />
                <span className="text-[8px] text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <p className="text-xs font-bold text-foreground mb-2">🏆 الشارات ({unlockedAchievements.length}/{ACHIEVEMENTS.length})</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {ACHIEVEMENTS.map((ach) => {
              const unlocked = data.achievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`flex flex-col items-center p-2 rounded-xl text-center transition-all ${
                    unlocked ? "bg-accent/10 border border-accent/30" : "bg-muted/50 opacity-40"
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
      )}
    </div>
  );
};

export default GamificationBar;
