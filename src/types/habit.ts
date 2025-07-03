export interface Habit {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string; // e.g., "5 minutes"
  tips: string[];
  benefits: string[];
  icon: string;
  color: string;
}

export interface DailyHabit {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
  completedAt?: string;
  userId: string;
}

export interface HabitProgress {
  totalHabits: number;
  completedHabits: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
}
