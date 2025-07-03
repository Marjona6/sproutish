import React, {createContext, useContext, useState, useEffect} from 'react';
import {db} from '../services/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import {useAuthContext} from './AuthContext';
import {Habit} from '../types/habit';

interface HabitsContextProps {
  habits: Habit[];
  loading: boolean;
  error: string | null;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => Promise<void>;
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  markHabitCompleted: (id: string) => Promise<void>;
}

const HabitsContext = createContext<HabitsContextProps | undefined>(undefined);

export const HabitsProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {user} = useAuthContext();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    getDocs(collection(db, 'habits'))
      .then(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Habit[];
        setHabits(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  const addHabit = async (habit: Omit<Habit, 'id' | 'createdAt'>) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'habits'), {
        ...habit,
        createdAt: Timestamp.now(),
        userId: user?.uid,
      });
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateHabit = async (id: string, updates: Partial<Habit>) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'habits', id), updates);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteHabit = async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'habits', id));
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const markHabitCompleted = async (id: string) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'habits', id), {
        completionStatus: true,
        completedAt: Timestamp.now(),
      });
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <HabitsContext.Provider
      value={{
        habits,
        loading,
        error,
        addHabit,
        updateHabit,
        deleteHabit,
        markHabitCompleted,
      }}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabitsContext = () => {
  const context = useContext(HabitsContext);
  if (!context)
    throw new Error('useHabitsContext must be used within HabitsProvider');
  return context;
};
