import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const HabitsScreen: React.FC = () => {
  const habits = [
    {id: 1, name: 'Morning Meditation', completed: true, streak: 7},
    {id: 2, name: 'Drink Water', completed: false, streak: 3},
    {id: 3, name: 'Exercise', completed: true, streak: 5},
    {id: 4, name: 'Read', completed: false, streak: 2},
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌱 My Habits</Text>
        <Text style={styles.subtitle}>Track your daily progress</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Habit</Text>
        </TouchableOpacity>

        {habits.map(habit => (
          <View key={habit.id} style={styles.habitCard}>
            <View style={styles.habitHeader}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <Text style={styles.streakText}>🔥 {habit.streak} days</Text>
            </View>

            <View style={styles.habitStatus}>
              <Text style={styles.statusText}>
                {habit.completed ? '✅ Completed' : '⏳ Pending'}
              </Text>
              <TouchableOpacity
                style={[
                  styles.completeButton,
                  habit.completed && styles.completedButton,
                ]}>
                <Text style={styles.completeButtonText}>
                  {habit.completed ? 'Done' : 'Mark Complete'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  title: {
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
  content: {
    padding: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  habitCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  habitName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  streakText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: 'bold',
  },
  habitStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#666',
  },
  completeButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HabitsScreen;
