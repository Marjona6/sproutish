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
import {
  getTodaysHabit,
  markHabitComplete,
  skipHabitForToday,
  blockHabit,
} from '../services/dailyHabitService';

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
  const [showTips, setShowTips] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);

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

  const handleSkipToday = async () => {
    if (!dailyHabit) return;

    Alert.alert(
      'Skip for Today',
      'Are you sure you want to skip this habit for today?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Skip',
          style: 'default',
          onPress: async () => {
            try {
              await skipHabitForToday(dailyHabit.id, userId);

              // Update local state
              setDailyHabit(prev =>
                prev
                  ? {
                      ...prev,
                      skipped: true,
                      skippedAt: new Date().toISOString(),
                    }
                  : null,
              );

              Alert.alert(
                'Habit Skipped',
                "This habit has been skipped for today. You'll get a new habit tomorrow!",
                [{text: 'Continue', style: 'default'}],
              );
            } catch (error) {
              console.error('Error skipping habit:', error);
              Alert.alert('Error', 'Failed to skip habit');
            }
          },
        },
      ],
    );
  };

  const handleNeverShow = async () => {
    if (!dailyHabit || !habit) return;

    Alert.alert(
      'Never Show Again',
      'This habit will be removed from your rotation. You can always add it back later in settings.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await blockHabit(habit.id, userId);

              // Mark as completed to move past this habit
              await handleCompleteHabit();

              Alert.alert(
                'Habit Removed',
                "This habit has been removed from your rotation. You won't see it again unless you unblock it in settings.",
                [{text: 'Continue', style: 'default'}],
              );
            } catch (error) {
              console.error('Error blocking habit:', error);
              Alert.alert('Error', 'Failed to remove habit');
            }
          },
        },
      ],
    );
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

        {/* Tips Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setShowTips(!showTips)}>
            <Text style={styles.sectionTitle}>💡 Tips</Text>
            <Text style={styles.expandIcon}>{showTips ? '▼' : '▶'}</Text>
          </TouchableOpacity>

          {showTips && (
            <View style={styles.tipsContainer}>
              {habit.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <Text style={styles.tipBullet}>•</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Benefits Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setShowBenefits(!showBenefits)}>
            <Text style={styles.sectionTitle}>🌟 Benefits</Text>
            <Text style={styles.expandIcon}>{showBenefits ? '▼' : '▶'}</Text>
          </TouchableOpacity>

          {showBenefits && (
            <View style={styles.benefitsContainer}>
              {habit.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Text style={styles.benefitBullet}>✨</Text>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          )}
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
          <View style={styles.actionButtons}>
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

            <View style={styles.skipButtons}>
              <TouchableOpacity
                style={styles.skipButton}
                onPress={handleSkipToday}>
                <Text style={styles.skipButtonText}>Skip Today</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.neverShowButton}
                onPress={handleNeverShow}>
                <Text style={styles.neverShowButtonText}>Never Show</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  expandIcon: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  tipsContainer: {
    marginTop: 8,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
  benefitsContainer: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  benefitBullet: {
    fontSize: 16,
    color: '#FF9800',
    marginRight: 8,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
  actionButtons: {
    marginTop: 16,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  completingButton: {
    backgroundColor: '#81C784',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  skipButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  skipButtonText: {
    color: '#6c757d',
    fontSize: 14,
    fontWeight: '500',
  },
  neverShowButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  neverShowButtonText: {
    color: '#dc3545',
    fontSize: 14,
    fontWeight: '500',
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
});

export default DailyHabitScreen;
