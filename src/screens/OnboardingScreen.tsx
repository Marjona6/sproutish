import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  onSkip,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const onboardingData = [
    {
      title: 'Welcome to Sproutish 🌱',
      subtitle: 'Where habits grow one day at a time',
      description:
        'Start your journey to better habits with simple, daily micro-habits that actually stick.',
      icon: '🌱',
    },
    {
      title: 'One Habit Per Day',
      subtitle: 'Simple, focused, effective',
      description:
        "Each day, you'll get one carefully chosen habit to focus on. No overwhelm, just steady progress.",
      icon: '📅',
    },
    {
      title: 'Track Your Growth',
      subtitle: 'Watch your streaks grow',
      description:
        'Build momentum with visual progress tracking and celebrate your consistency with streaks.',
      icon: '📈',
    },
    {
      title: 'Choose Your Path',
      subtitle: 'Categories that matter to you',
      description:
        'Focus on what matters most: Health, Productivity, Mindfulness, and more.',
      icon: '🎯',
    },
  ];

  const nextPage = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onSkip();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const page = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentPage(page);
        }}
        style={styles.scrollView}>
        {onboardingData.map((item, index) => (
          <View key={index} style={styles.page}>
            <View style={styles.content}>
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentPage && styles.activeDot]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={nextPage}>
            <Text style={styles.nextButtonText}>
              {currentPage === onboardingData.length - 1
                ? 'Get Started'
                : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  icon: {
    fontSize: 80,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
    width: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    color: '#7f8c8d',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
