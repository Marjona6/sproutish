import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface CategorySelectionScreenProps {
  onComplete: (selectedCategories: string[]) => void;
}

const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({
  onComplete,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories: Category[] = [
    {
      id: 'health',
      name: 'Health & Wellness',
      description: 'Physical health, exercise, and self-care habits',
      icon: '💪',
      color: '#4CAF50',
    },
    {
      id: 'productivity',
      name: 'Productivity',
      description: 'Work efficiency, time management, and focus',
      icon: '⚡',
      color: '#2196F3',
    },
    {
      id: 'mindfulness',
      name: 'Mindfulness',
      description: 'Mental health, meditation, and emotional balance',
      icon: '🧘',
      color: '#9C27B0',
    },
    {
      id: 'relationships',
      name: 'Relationships',
      description: 'Social connections, communication, and empathy',
      icon: '❤️',
      color: '#F44336',
    },
    {
      id: 'learning',
      name: 'Learning',
      description: 'Knowledge, skills, and personal growth',
      icon: '📚',
      color: '#FF9800',
    },
    {
      id: 'creativity',
      name: 'Creativity',
      description: 'Art, innovation, and self-expression',
      icon: '🎨',
      color: '#E91E63',
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleComplete = () => {
    if (selectedCategories.length === 0) {
      Alert.alert(
        'Select Categories',
        'Please select at least one category to get started.',
      );
      return;
    }
    onComplete(selectedCategories);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Focus Areas</Text>
        <Text style={styles.subtitle}>
          Select the categories that matter most to you
        </Text>
      </View>

      <ScrollView
        style={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryCard,
              selectedCategories.includes(category.id) && styles.selectedCard,
            ]}
            onPress={() => toggleCategory(category.id)}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>
                  {category.description}
                </Text>
              </View>
              <View
                style={[
                  styles.checkbox,
                  selectedCategories.includes(category.id) && styles.checkedBox,
                ]}>
                {selectedCategories.includes(category.id) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.selectionText}>
          {selectedCategories.length} category
          {selectedCategories.length !== 1 ? 's' : ''} selected
        </Text>
        <TouchableOpacity
          style={[
            styles.completeButton,
            selectedCategories.length === 0 && styles.disabledButton,
          ]}
          onPress={handleComplete}>
          <Text style={styles.completeButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  categoriesContainer: {
    flex: 1,
    padding: 20,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  selectionText: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 16,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CategorySelectionScreen;
