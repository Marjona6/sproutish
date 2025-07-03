import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Habit, DailyHabit} from '../types/habit';
import {getTodaysHabit, markHabitComplete} from '../services/dailyHabitService';

interface DailyHabitScreenProps {
  userId: string;
  selectedCategories: string[];
}

const DailyHabitScreen: React.FC<DailyHabitScreenProps> = ({
  userId,
  selectedCategories,
}) => {
  const [loading, setLoading] = useState(true);
  const [habit, setHabit] = useState<Habit | null>(null);
  const [dailyHabit, setDailyHabit] = useState<DailyHabit | null>(null);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    loadTodaysHabit();
  }, [userId, selectedCategories]);

  const loadTodaysHabit = async () => {
    try {
      setLoading(true);
      const result = await getTodaysHabit(userId, selectedCategories);
      setHabit(result.habit);
      setDailyHabit(result.dailyHabit);
    } catch (error) {
      console.error("Error loading today's habit:", error);
      Alert.alert('Error', "Failed to load today's habit");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteHabit = async () => {
    if (!dailyHabit) return;

    try {
      setCompleting(true);
      await markHabitComplete(dailyHabit.id, userId);

      // Update local state
      setDailyHabit(prev =>
        prev
          ? {...prev, completed: true, completedAt: new Date().toISOString()}
          : null,
      );

      Alert.alert(
        '🎉 Habit Completed!',
        "Great job! You're building positive habits one day at a time.",
        [{text: 'Continue', style: 'default'}],
      );
    } catch (error) {
      console.error('Error completing habit:', error);
      Alert.alert('Error', 'Failed to mark habit as complete');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading today's habit...</Text>
      </View>
    );
  }

  if (!habit || !dailyHabit) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No habit available for today</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadTodaysHabit}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#4CAF50';
      case 'medium':
        return '#FF9800';
      case 'hard':
        return '#F44336';
      default:
        return '#4CAF50';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.title}>Today's Habit</Text>
      </View>

      <View style={styles.habitCard}>
        <View style={styles.habitHeader}>
          <Text style={styles.habitIcon}>{habit.icon}</Text>
          <View style={styles.habitInfo}>
            <Text style={styles.habitTitle}>{habit.title}</Text>
            <Text style={styles.habitDescription}>{habit.description}</Text>
          </View>
        </View>

        <View style={styles.habitMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Difficulty</Text>
            <View
              style={[
                styles.difficultyBadge,
                {backgroundColor: getDifficultyColor(habit.difficulty)},
              ]}>
              <Text style={styles.difficultyText}>{habit.difficulty}</Text>
            </View>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Time</Text>
            <Text style={styles.metaValue}>{habit.estimatedTime}</Text>
          </View>
        </View>

        {dailyHabit.completed ? (
          <View style={styles.completedSection}>
            <Text style={styles.completedIcon}>✅</Text>
            <Text style={styles.completedText}>Completed!</Text>
            <Text style={styles.completedTime}>
              {dailyHabit.completedAt
                ? new Date(dailyHabit.completedAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.completeButton,
              completing && styles.completingButton,
            ]}
            onPress={handleCompleteHabit}
            disabled={completing}>
            {completing ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.completeButtonText}>Mark as Complete</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Tips</Text>
        {habit.tips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Benefits</Text>
        {habit.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Text style={styles.benefitBullet}>✨</Text>
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  habitCard: {
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
  habitHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  habitIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  habitInfo: {
    flex: 1,
  },
  habitTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  habitDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 22,
  },
  habitMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  completingButton: {
    backgroundColor: '#81C784',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  completedSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  completedIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  completedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  completedTime: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tipBullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  benefitBullet: {
    fontSize: 16,
    color: '#FF9800',
    marginRight: 8,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 22,
  },
});

export default DailyHabitScreen;
