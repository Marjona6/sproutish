import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {getHabitProgress} from '../services/dailyHabitService';
import {HabitProgress} from '../types/habit';
import DailyHabitScreen from './DailyHabitScreen';

interface HomeScreenProps {
  userId: string;
  selectedCategories: string[];
  onNavigate: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  userId,
  selectedCategories,
  onNavigate,
}) => {
  const [progress, setProgress] = useState<HabitProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [userId]);

  const loadProgress = async () => {
    try {
      setLoading(true);
      const habitProgress = await getHabitProgress(userId);
      setProgress(habitProgress);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 7) return '🔥';
    if (streak >= 3) return '⚡';
    if (streak >= 1) return '💪';
    return '🌱';
  };

  const getCompletionRateColor = (rate: number) => {
    if (rate >= 80) return '#4CAF50';
    if (rate >= 60) return '#FF9800';
    return '#F44336';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subtitle}>Ready for today's habit?</Text>
      </View>

      {progress && (
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>

          <View style={styles.progressGrid}>
            <View style={styles.progressCard}>
              <Text style={styles.progressNumber}>
                {progress.completedHabits}
              </Text>
              <Text style={styles.progressLabel}>Completed</Text>
            </View>

            <View style={styles.progressCard}>
              <Text style={styles.progressNumber}>
                {getStreakEmoji(progress.currentStreak)}{' '}
                {progress.currentStreak}
              </Text>
              <Text style={styles.progressLabel}>Current Streak</Text>
            </View>

            <View style={styles.progressCard}>
              <Text style={styles.progressNumber}>
                {progress.longestStreak}
              </Text>
              <Text style={styles.progressLabel}>Best Streak</Text>
            </View>

            <View style={styles.progressCard}>
              <Text
                style={[
                  styles.progressNumber,
                  {color: getCompletionRateColor(progress.completionRate)},
                ]}>
                {Math.round(progress.completionRate)}%
              </Text>
              <Text style={styles.progressLabel}>Success Rate</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.dailyHabitSection}>
        <Text style={styles.sectionTitle}>Today's Habit</Text>
        <DailyHabitScreen
          userId={userId}
          selectedCategories={selectedCategories}
        />
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => onNavigate('habits')}>
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionTitle}>View History</Text>
            <Text style={styles.actionSubtitle}>See your progress</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => onNavigate('profile')}>
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={styles.actionTitle}>Settings</Text>
            <Text style={styles.actionSubtitle}>Manage preferences</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  progressSection: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  progressCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  dailyHabitSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  quickActions: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default HomeScreen;
