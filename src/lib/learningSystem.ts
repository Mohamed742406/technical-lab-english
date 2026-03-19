/**
 * learningSystem.ts
 * منطق التوصية الذكي — يحدد من أين يبدأ المستخدم وما الخطوة التالية
 */

import { getUserLevel } from "./progress";

export type UnitLevel = "beginner" | "elementary" | "intermediate" | "advanced" | "expert";

export interface UnitMeta {
  id: string;
  level: UnitLevel;
  label: string;   // Arabic label
  color: string;   // tailwind gradient
}

// ترتيب الوحدات ومستوياتها — يتطابق مع units[] في LearningPath
export const UNIT_META: UnitMeta[] = [
  { id: "u1",  level: "beginner",     label: "مبتدئ",   color: "from-green-500 to-emerald-600" },
  { id: "u2",  level: "beginner",     label: "مبتدئ",   color: "from-green-500 to-emerald-600" },
  { id: "u3",  level: "beginner",     label: "مبتدئ",   color: "from-green-500 to-emerald-600" },
  { id: "u4",  level: "beginner",     label: "مبتدئ",   color: "from-green-500 to-emerald-600" },
  { id: "u5",  level: "elementary",   label: "أساسي",   color: "from-blue-500 to-cyan-600" },
  { id: "u6",  level: "elementary",   label: "أساسي",   color: "from-blue-500 to-cyan-600" },
  { id: "u7",  level: "elementary",   label: "أساسي",   color: "from-blue-500 to-cyan-600" },
  { id: "u8",  level: "elementary",   label: "أساسي",   color: "from-blue-500 to-cyan-600" },
  { id: "u9",  level: "intermediate", label: "متوسط",   color: "from-purple-500 to-violet-600" },
  { id: "u10", level: "intermediate", label: "متوسط",   color: "from-purple-500 to-violet-600" },
  { id: "u11", level: "intermediate", label: "متوسط",   color: "from-purple-500 to-violet-600" },
  { id: "u12", level: "intermediate", label: "متوسط",   color: "from-purple-500 to-violet-600" },
  { id: "u13", level: "advanced",     label: "متقدم",   color: "from-orange-500 to-amber-600" },
  { id: "u14", level: "advanced",     label: "متقدم",   color: "from-orange-500 to-amber-600" },
  { id: "u15", level: "advanced",     label: "متقدم",   color: "from-orange-500 to-amber-600" },
  { id: "u16", level: "advanced",     label: "متقدم",   color: "from-orange-500 to-amber-600" },
  { id: "u17", level: "expert",       label: "محترف",   color: "from-rose-500 to-pink-600" },
  { id: "u18", level: "expert",       label: "محترف",   color: "from-rose-500 to-pink-600" },
];

// المراحل — تُستخدم لعرض فاصل + مبروك بين المجموعات
export const MILESTONES: { afterUnit: string; title: string; icon: string }[] = [
  { afterUnit: "u4",  title: "🌱 أنجزت مرحلة المبتدئ!",  icon: "🌱" },
  { afterUnit: "u8",  title: "📘 أنجزت المرحلة الأساسية!", icon: "📘" },
  { afterUnit: "u12", title: "⭐ أنجزت المرحلة المتوسطة!", icon: "⭐" },
  { afterUnit: "u16", title: "🏆 أنجزت المرحلة المتقدمة!", icon: "🏆" },
];

/** أين يبدأ المستخدم بناءً على مستوى الـ placement */
export function getRecommendedStartUnit(): string {
  const level = getUserLevel();
  if (level === "advanced")      return "u9";
  if (level === "intermediate")  return "u5";
  return "u1";  // beginner أو غير محدد → من الأول
}

/** هل الوحدة التالية بداية مرحلة جديدة؟ */
export function isMilestoneAfter(unitId: string): { afterUnit: string; title: string; icon: string } | null {
  return MILESTONES.find(m => m.afterUnit === unitId) ?? null;
}

/** مقياس التقدم الإجمالي: كم وحدة اكتملت من 18 */
export function getOverallProgress(pathProgress: Record<string, boolean>, unitLessons: Record<string, string[]>): number {
  let completed = 0;
  for (const meta of UNIT_META) {
    const lessons = unitLessons[meta.id] ?? [];
    const done = lessons.filter(id => pathProgress[id]).length;
    if (lessons.length > 0 && done === lessons.length) completed++;
  }
  return Math.round((completed / UNIT_META.length) * 100);
}

/** التوصية الذكية: الدرس المفتوح التالي غير المكتمل */
export function getNextLesson(
  pathProgress: Record<string, boolean>,
  units: { id: string; lessons: { id: string }[] }[]
): { unitId: string; lessonId: string } | null {
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (!pathProgress[lesson.id]) {
        return { unitId: unit.id, lessonId: lesson.id };
      }
    }
  }
  return null; // كل شيء مكتمل
}

/** نسبة إتقان مهارة معينة من تاريخ الاختبارات */
export function getSkillScore(
  quizHistory: { category: string; score: number; total: number }[],
  category: string
): number {
  const relevant = quizHistory.filter(h => h.category === category);
  if (relevant.length === 0) return 0;
  const total = relevant.reduce((s, h) => s + h.total, 0);
  const correct = relevant.reduce((s, h) => s + h.score, 0);
  return Math.round((correct / total) * 100);
}
