export interface Habit {
  id: string;
  userId: string;
  name: string;
  frequency: string;
  completionStatus: boolean;
  createdAt: any;
  completedAt?: any;
}
