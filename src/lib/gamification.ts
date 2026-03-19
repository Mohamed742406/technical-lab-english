/** Gamification: XP, Levels, Streaks, Achievements */

const GAMIFICATION_KEY = "lab-english-gamification";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  type: "words" | "lessons" | "streak" | "quiz" | "conversations" | "stories" | "phonics" | "xp";
  unlockedAt?: string;
}

export interface GamificationData {
  xp: number;
  level: number;
  dailyXp: number;
  dailyGoal: number;
  lastXpDate: string;
  totalWordsLearned: number;
  totalLessonsCompleted: number;
  totalQuizzesTaken: number;
  totalConversations: number;
  totalStories: number;
  totalPhonicsLessons: number;
  achievements: string[];
  weeklyXp: number[];
}

export const ACHIEVEMENTS: Achievement[] = [
  // Words
  { id: "words_5",   title: "أول خطوة",     description: "تعلم 5 كلمات",        icon: "🌱", requirement: 5,    type: "words" },
  { id: "words_25",  title: "جامع كلمات",   description: "تعلم 25 كلمة",        icon: "📚", requirement: 25,   type: "words" },
  { id: "words_50",  title: "خبير مفردات",  description: "تعلم 50 كلمة",        icon: "🏆", requirement: 50,   type: "words" },
  { id: "words_100", title: "عبقري الكلمات",description: "تعلم 100 كلمة",       icon: "👑", requirement: 100,  type: "words" },
  // Lessons
  { id: "lessons_3",  title: "طالب مجتهد",  description: "أكمل 3 دروس",         icon: "📖", requirement: 3,    type: "lessons" },
  { id: "lessons_10", title: "متعلم نشيط",  description: "أكمل 10 دروس",        icon: "🎓", requirement: 10,   type: "lessons" },
  { id: "lessons_25", title: "ماراثون التعلم",description: "أكمل 25 درس",       icon: "🏅", requirement: 25,   type: "lessons" },
  // Streak
  { id: "streak_3",  title: "منتظم",        description: "3 أيام متتالية",       icon: "🔥", requirement: 3,    type: "streak" },
  { id: "streak_7",  title: "أسبوع كامل",  description: "7 أيام متتالية",       icon: "⚡", requirement: 7,    type: "streak" },
  { id: "streak_30", title: "شهر كامل!",   description: "30 يوم متتالي",        icon: "💎", requirement: 30,   type: "streak" },
  // Quiz
  { id: "quiz_5",    title: "ممتحن",        description: "أكمل 5 اختبارات",      icon: "✅", requirement: 5,    type: "quiz" },
  { id: "quiz_20",   title: "بطل الاختبارات",description: "أكمل 20 اختبار",     icon: "🎯", requirement: 20,   type: "quiz" },
  // Conversations
  { id: "conv_5",    title: "متحدث",        description: "أكمل 5 محادثات",       icon: "💬", requirement: 5,    type: "conversations" },
  { id: "conv_15",   title: "محاور محترف",  description: "أكمل 15 محادثة",      icon: "🗣️", requirement: 15,   type: "conversations" },
  // Stories
  { id: "story_5",   title: "قارئ",         description: "اقرأ 5 قصص",          icon: "📕", requirement: 5,    type: "stories" },
  { id: "story_15",  title: "دودة كتب",     description: "اقرأ 15 قصة",         icon: "📚", requirement: 15,   type: "stories" },
  // XP
  { id: "xp_100",    title: "أول 100 XP",   description: "اجمع 100 نقطة خبرة",  icon: "⭐", requirement: 100,  type: "xp" },
  { id: "xp_500",    title: "500 XP!",       description: "اجمع 500 نقطة خبرة",  icon: "🌟", requirement: 500,  type: "xp" },
  { id: "xp_1000",   title: "ألف نقطة!",    description: "اجمع 1000 نقطة خبرة", icon: "💫", requirement: 1000, type: "xp" },
  { id: "xp_5000",   title: "نجم التعلم",   description: "اجمع 5000 نقطة خبرة", icon: "🏆", requirement: 5000, type: "xp" },
];

export const LEVELS = [
  { level: 1,  title: "مبتدئ",         xpNeeded: 0,     icon: "🌱" },
  { level: 2,  title: "متعلم",         xpNeeded: 100,   icon: "🌿" },
  { level: 3,  title: "نشيط",          xpNeeded: 300,   icon: "🌳" },
  { level: 4,  title: "متقدم",         xpNeeded: 600,   icon: "⭐" },
  { level: 5,  title: "ماهر",          xpNeeded: 1000,  icon: "🌟" },
  { level: 6,  title: "خبير",          xpNeeded: 1500,  icon: "💫" },
  { level: 7,  title: "محترف",         xpNeeded: 2500,  icon: "🏅" },
  { level: 8,  title: "بطل",           xpNeeded: 4000,  icon: "🏆" },
  { level: 9,  title: "أسطورة",        xpNeeded: 6000,  icon: "👑" },
  { level: 10, title: "عبقري المختبر", xpNeeded: 10000, icon: "💎" },
];

export const XP_REWARDS = {
  wordLearned: 5,
  lessonCompleted: 20,
  quizCompleted: 15,
  quizPerfect: 30,
  conversationCompleted: 10,
  storyRead: 10,
  phonicsLesson: 10,
  dailyGoal: 25,
  reviewSession: 10,
};

function getDefaultData(): GamificationData {
  return {
    xp: 0, level: 1, dailyXp: 0, dailyGoal: 50, lastXpDate: "",
    totalWordsLearned: 0, totalLessonsCompleted: 0, totalQuizzesTaken: 0,
    totalConversations: 0, totalStories: 0, totalPhonicsLessons: 0,
    achievements: [], weeklyXp: [0, 0, 0, 0, 0, 0, 0],
  };
}

export function getGamificationData(): GamificationData {
  try {
    const stored = localStorage.getItem(GAMIFICATION_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      const today = new Date().toISOString().split("T")[0];
      if (data.lastXpDate !== today) {
        // ✓ حساب عدد الأيام الفائتة وشيفت المصفوفة بالعدد الصح
        const daysMissed = data.lastXpDate
          ? Math.min(
              7,
              Math.round(
                (new Date(today).getTime() - new Date(data.lastXpDate).getTime()) /
                  86400000
              )
            )
          : 1;
        const weekly = data.weeklyXp || [0, 0, 0, 0, 0, 0, 0];
        const shifted = [...weekly.slice(daysMissed), ...Array(daysMissed).fill(0)];
        data.weeklyXp = shifted.slice(-7);
        data.dailyXp = 0;
        data.lastXpDate = today;
        saveGamificationData(data);
      }
      return data;
    }
  } catch {}
  return getDefaultData();
}

export function saveGamificationData(data: GamificationData) {
  localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(data));
}

export function getLevelInfo(xp: number) {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpNeeded) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || LEVELS[i];
      break;
    }
  }
  const progressToNext = next.xpNeeded > current.xpNeeded
    ? ((xp - current.xpNeeded) / (next.xpNeeded - current.xpNeeded)) * 100
    : 100;
  return { current, next, progressToNext };
}

export function addXP(amount: number, type: keyof typeof XP_REWARDS): { newAchievements: Achievement[], leveledUp: boolean } {
  const data = getGamificationData();
  const oldLevel = getLevelInfo(data.xp).current.level;

  data.xp += amount;
  data.dailyXp += amount;
  const today = new Date().toISOString().split("T")[0];
  data.lastXpDate = today;
  data.weeklyXp[data.weeklyXp.length - 1] = data.dailyXp;

  // Update counters
  if (type === "wordLearned")           data.totalWordsLearned++;
  if (type === "lessonCompleted")       data.totalLessonsCompleted++;
  if (type === "quizCompleted" || type === "quizPerfect") data.totalQuizzesTaken++;
  if (type === "conversationCompleted") data.totalConversations++;
  if (type === "storyRead")            data.totalStories++;
  if (type === "phonicsLesson")        data.totalPhonicsLessons++;

  data.level = getLevelInfo(data.xp).current.level;
  const leveledUp = data.level > oldLevel;

  // ✓ قراءة streak مرة واحدة خارج الحلقة بدل قراءتها لكل إنجاز
  let streakValue = 0;
  try {
    const prog = JSON.parse(localStorage.getItem("lab-english-progress") || "{}");
    streakValue = prog.streak || 0;
  } catch { streakValue = 0; }

  const newAchievements: Achievement[] = [];
  for (const ach of ACHIEVEMENTS) {
    if (data.achievements.includes(ach.id)) continue;
    let value = 0;
    switch (ach.type) {
      case "words":         value = data.totalWordsLearned; break;
      case "lessons":       value = data.totalLessonsCompleted; break;
      case "quiz":          value = data.totalQuizzesTaken; break;
      case "conversations": value = data.totalConversations; break;
      case "stories":       value = data.totalStories; break;
      case "xp":            value = data.xp; break;
      case "streak":        value = streakValue; break;
    }
    if (value >= ach.requirement) {
      data.achievements.push(ach.id);
      newAchievements.push(ach);
    }
  }

  saveGamificationData(data);
  return { newAchievements, leveledUp };
}
