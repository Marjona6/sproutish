import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import {db} from './firebase';
import {DailyHabit, HabitProgress} from '../types/habit';
import {getRandomHabit, getHabitById} from '../data/habits';

const getTodayString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD format
};

export const getTodaysHabit = async (
  userId: string,
  selectedCategories: string[],
): Promise<any> => {
  const today = getTodayString();

  try {
    // Check if user is signed in (has email)
    const userDoc = await getDoc(doc(db, 'users', userId));
    const isSignedIn = userDoc.exists() && userDoc.data()?.email;

    if (isSignedIn) {
      // For signed-in users, check Firestore
      const dailyHabitQuery = query(
        collection(db, 'dailyHabits'),
        where('userId', '==', userId),
        where('date', '==', today),
      );

      const querySnapshot = await getDocs(dailyHabitQuery);

      if (!querySnapshot.empty) {
        // Habit already assigned for today
        const dailyHabitDoc = querySnapshot.docs[0];
        const dailyHabit = dailyHabitDoc.data() as DailyHabit;
        const habit = getHabitById(dailyHabit.habitId);

        return {
          dailyHabit: {...dailyHabit, id: dailyHabitDoc.id},
          habit,
        };
      } else {
        // Assign new habit for today
        const newHabit = getRandomHabit(selectedCategories);
        const dailyHabitData: Omit<DailyHabit, 'id'> = {
          habitId: newHabit.id,
          date: today,
          completed: false,
          userId,
        };

        const docRef = await addDoc(
          collection(db, 'dailyHabits'),
          dailyHabitData,
        );

        return {
          dailyHabit: {...dailyHabitData, id: docRef.id},
          habit: newHabit,
        };
      }
    } else {
      // For anonymous users, use AsyncStorage
      const storageKey = `dailyHabit_${userId}_${today}`;
      const storedHabit = await AsyncStorage.getItem(storageKey);

      if (storedHabit) {
        const dailyHabit = JSON.parse(storedHabit);
        const habit = getHabitById(dailyHabit.habitId);

        return {
          dailyHabit,
          habit,
        };
      } else {
        // Assign new habit for today
        const newHabit = getRandomHabit(selectedCategories);
        const dailyHabit: DailyHabit = {
          id: `local_${Date.now()}`,
          habitId: newHabit.id,
          date: today,
          completed: false,
          userId,
        };

        await AsyncStorage.setItem(storageKey, JSON.stringify(dailyHabit));

        return {
          dailyHabit,
          habit: newHabit,
        };
      }
    }
  } catch (error) {
    console.error("Error getting today's habit:", error);
    // Fallback to local storage
    const newHabit = getRandomHabit(selectedCategories);
    const dailyHabit: DailyHabit = {
      id: `local_${Date.now()}`,
      habitId: newHabit.id,
      date: today,
      completed: false,
      userId,
    };

    return {
      dailyHabit,
      habit: newHabit,
    };
  }
};

export const markHabitComplete = async (
  dailyHabitId: string,
  userId: string,
): Promise<void> => {
  const today = getTodayString();

  try {
    // Check if user is signed in
    const userDoc = await getDoc(doc(db, 'users', userId));
    const isSignedIn = userDoc.exists() && userDoc.data()?.email;

    if (isSignedIn) {
      // Update in Firestore
      await setDoc(
        doc(db, 'dailyHabits', dailyHabitId),
        {
          completed: true,
          completedAt: new Date().toISOString(),
        },
        {merge: true},
      );
    } else {
      // Update in AsyncStorage
      const storageKey = `dailyHabit_${userId}_${today}`;
      const storedHabit = await AsyncStorage.getItem(storageKey);

      if (storedHabit) {
        const dailyHabit = JSON.parse(storedHabit);
        dailyHabit.completed = true;
        dailyHabit.completedAt = new Date().toISOString();

        await AsyncStorage.setItem(storageKey, JSON.stringify(dailyHabit));
      }
    }
  } catch (error) {
    console.error('Error marking habit complete:', error);
  }
};

export const getHabitProgress = async (
  userId: string,
): Promise<HabitProgress> => {
  try {
    // Check if user is signed in
    const userDoc = await getDoc(doc(db, 'users', userId));
    const isSignedIn = userDoc.exists() && userDoc.data()?.email;

    if (isSignedIn) {
      // Get from Firestore
      const dailyHabitsQuery = query(
        collection(db, 'dailyHabits'),
        where('userId', '==', userId),
      );

      const querySnapshot = await getDocs(dailyHabitsQuery);
      const dailyHabits = querySnapshot.docs.map(
        doc => doc.data() as DailyHabit,
      );

      return calculateProgress(dailyHabits);
    } else {
      // Get from AsyncStorage
      const keys = await AsyncStorage.getAllKeys();
      const habitKeys = keys.filter(key =>
        key.startsWith(`dailyHabit_${userId}_`),
      );
      const habitData = await AsyncStorage.multiGet(habitKeys);

      const dailyHabits: DailyHabit[] = habitData
        .map(([_, value]) => (value ? JSON.parse(value) : null))
        .filter(Boolean);

      return calculateProgress(dailyHabits);
    }
  } catch (error) {
    console.error('Error getting habit progress:', error);
    return {
      totalHabits: 0,
      completedHabits: 0,
      currentStreak: 0,
      longestStreak: 0,
      completionRate: 0,
    };
  }
};

const calculateProgress = (dailyHabits: DailyHabit[]): HabitProgress => {
  const totalHabits = dailyHabits.length;
  const completedHabits = dailyHabits.filter(habit => habit.completed).length;
  const completionRate =
    totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  // Calculate streaks
  const sortedHabits = dailyHabits
    .filter(habit => habit.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < sortedHabits.length; i++) {
    const currentDate = new Date(sortedHabits[i].date);
    const nextDate =
      i < sortedHabits.length - 1 ? new Date(sortedHabits[i + 1].date) : null;

    if (nextDate) {
      const dayDiff = Math.floor(
        (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (dayDiff === 1) {
        tempStreak++;
      } else {
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
        tempStreak = 0;
      }
    } else {
      tempStreak++;
    }
  }

  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
  }

  // Check if current streak is ongoing (today or yesterday)
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayString = today.toISOString().split('T')[0];
  const yesterdayString = yesterday.toISOString().split('T')[0];

  const hasRecentHabit = sortedHabits.some(
    habit => habit.date === todayString || habit.date === yesterdayString,
  );

  currentStreak = hasRecentHabit ? tempStreak : 0;

  return {
    totalHabits,
    completedHabits,
    currentStreak,
    longestStreak,
    completionRate,
  };
};
