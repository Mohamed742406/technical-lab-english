/** Progress & Spaced Repetition helpers using localStorage */

export interface WordReview {
  word: string;
  arabic: string;
  category: string;
  level: number; // 0-5 mastery
  correctCount: number;
  totalCount: number;
  lastSeen: string; // ISO date
}

export interface ProgressData {
  masteredWords: string[];
  streak: number;
  lastActiveDate: string;
  categoryPracticeCount: Record<string, number>;
  recentWords: { word: string; date: string }[];
  quizHistory: { date: string; score: number; total: number; category: string }[];
}

const REVIEW_KEY = "lab-english-review";
const PROGRESS_KEY = "lab-english-progress";
const PLACEMENT_KEY = "lab-english-placement";
const TOUR_KEY = "lab-english-tour";

// ── Review Data ──
export function getReviewData(): Record<string, WordReview> {
  try {
    return JSON.parse(localStorage.getItem(REVIEW_KEY) || "{}");
  } catch { return {}; }
}

export function saveReviewData(data: Record<string, WordReview>) {
  localStorage.setItem(REVIEW_KEY, JSON.stringify(data));
}

export function recordWordSeen(word: string, arabic: string, category: string) {
  const data = getReviewData();
  const key = word.toLowerCase();
  if (!data[key]) {
    data[key] = { word, arabic, category, level: 0, correctCount: 0, totalCount: 0, lastSeen: new Date().toISOString() };
  } else {
    data[key].lastSeen = new Date().toISOString();
    data[key].totalCount++;
  }
  saveReviewData(data);
}

export function updateWordLevel(word: string, knew: boolean) {
  const data = getReviewData();
  const key = word.toLowerCase();
  if (data[key]) {
    if (knew) {
      data[key].level = Math.min(5, data[key].level + 1);
      data[key].correctCount++;
    } else {
      // ✓ SRS: الإجابة الغلط تخفّض المستوى (كانت تسيبه زي ما هو)
      data[key].level = Math.max(0, data[key].level - 1);
    }
    data[key].totalCount++;
    data[key].lastSeen = new Date().toISOString();
    saveReviewData(data);
  }
}

// ── Progress Data ──
export function getProgressData(): ProgressData {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    masteredWords: [],
    streak: 0,
    lastActiveDate: "",
    categoryPracticeCount: {},
    recentWords: [],
    quizHistory: [],
  };
}

export function saveProgressData(data: ProgressData) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

export function recordActivity() {
  const data = getProgressData();
  const today = new Date().toISOString().split("T")[0];
  if (data.lastActiveDate === today) return;

  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (data.lastActiveDate === yesterday) {
    data.streak++;
  } else {
    // ✓ إزالة الشرط الزائد (else if كان دايمًا true بعد الـ early return)
    data.streak = 1;
  }
  data.lastActiveDate = today;
  saveProgressData(data);
}

export function addMasteredWord(word: string) {
  const data = getProgressData();
  if (!data.masteredWords.includes(word.toLowerCase())) {
    data.masteredWords.push(word.toLowerCase());
    data.recentWords.unshift({ word, date: new Date().toISOString() });
    if (data.recentWords.length > 20) data.recentWords = data.recentWords.slice(0, 20);
    saveProgressData(data);
  }
}

export function addQuizResult(score: number, total: number, category: string) {
  const data = getProgressData();
  data.quizHistory.push({ date: new Date().toISOString(), score, total, category });
  saveProgressData(data);
}

export function incrementCategoryPractice(category: string) {
  const data = getProgressData();
  data.categoryPracticeCount[category] = (data.categoryPracticeCount[category] || 0) + 1;
  saveProgressData(data);
}

export function resetProgress() {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(REVIEW_KEY);
}

// ── Placement & Tour ──
export function isPlacementDone(): boolean {
  return localStorage.getItem(PLACEMENT_KEY) === "true";
}
export function setPlacementDone(level: string) {
  localStorage.setItem(PLACEMENT_KEY, "true");
  localStorage.setItem("lab-english-level", level);
}
export function getUserLevel(): string {
  return localStorage.getItem("lab-english-level") || "beginner";
}

export function isTourDone(): boolean {
  return localStorage.getItem(TOUR_KEY) === "true";
}
export function setTourDone() {
  localStorage.setItem(TOUR_KEY, "true");
}
