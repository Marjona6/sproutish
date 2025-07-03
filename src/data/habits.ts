import {Habit} from '../types/habit';

export const habits: Habit[] = [
  // Health & Wellness
  {
    id: 'health-001',
    title: 'Drink a glass of water',
    description:
      'Start your day with hydration to boost energy and metabolism.',
    category: 'health',
    difficulty: 'easy',
    estimatedTime: '1 minute',
    tips: [
      'Keep a water bottle by your bed',
      'Add lemon for flavor and vitamin C',
      'Set a reminder on your phone',
    ],
    benefits: [
      'Improves energy levels',
      'Boosts metabolism',
      'Enhances cognitive function',
      'Supports healthy skin',
    ],
    icon: '💧',
    color: '#4CAF50',
  },
  {
    id: 'health-002',
    title: 'Do 10 jumping jacks',
    description:
      'Quick cardio burst to get your heart pumping and energy flowing.',
    category: 'health',
    difficulty: 'easy',
    estimatedTime: '2 minutes',
    tips: [
      'Do them in the morning for energy',
      'Focus on good form over speed',
      'Breathe steadily throughout',
    ],
    benefits: [
      'Increases heart rate',
      'Improves coordination',
      'Releases endorphins',
      'Burns calories',
    ],
    icon: '🏃',
    color: '#4CAF50',
  },
  {
    id: 'health-003',
    title: 'Take 5 deep breaths',
    description: 'Mindful breathing to reduce stress and improve focus.',
    category: 'health',
    difficulty: 'easy',
    estimatedTime: '2 minutes',
    tips: [
      'Breathe in through your nose',
      'Hold for 3 seconds',
      'Exhale slowly through your mouth',
      'Focus on the sensation of breathing',
    ],
    benefits: [
      'Reduces stress and anxiety',
      'Improves focus and clarity',
      'Lowers blood pressure',
      'Increases oxygen to brain',
    ],
    icon: '🫁',
    color: '#4CAF50',
  },

  // Productivity
  {
    id: 'productivity-001',
    title: 'Write down 3 priorities',
    description: 'Clarify your most important tasks for the day ahead.',
    category: 'productivity',
    difficulty: 'easy',
    estimatedTime: '3 minutes',
    tips: [
      'Do this first thing in the morning',
      'Keep it to 3 items maximum',
      'Be specific and actionable',
      'Review at the end of the day',
    ],
    benefits: [
      'Increases focus and clarity',
      'Reduces decision fatigue',
      'Improves time management',
      'Boosts sense of accomplishment',
    ],
    icon: '📝',
    color: '#2196F3',
  },
  {
    id: 'productivity-002',
    title: 'Clear your workspace',
    description: 'Organize your physical space for better mental clarity.',
    category: 'productivity',
    difficulty: 'easy',
    estimatedTime: '5 minutes',
    tips: [
      'Start with one surface',
      'Put things in their proper place',
      'Remove unnecessary items',
      'Make it a daily habit',
    ],
    benefits: [
      'Reduces distractions',
      'Improves focus',
      'Creates positive environment',
      'Saves time looking for things',
    ],
    icon: '🧹',
    color: '#2196F3',
  },
  {
    id: 'productivity-003',
    title: 'Turn off notifications for 30 minutes',
    description: 'Create focused work time without digital interruptions.',
    category: 'productivity',
    difficulty: 'medium',
    estimatedTime: '1 minute setup',
    tips: [
      'Schedule this during your most productive hours',
      'Use airplane mode if needed',
      "Let others know you're focusing",
      'Gradually increase the time',
    ],
    benefits: [
      'Improves concentration',
      'Reduces stress',
      'Increases productivity',
      'Better quality work',
    ],
    icon: '🔕',
    color: '#2196F3',
  },

  // Mindfulness
  {
    id: 'mindfulness-001',
    title: 'Practice gratitude',
    description: "Reflect on three things you're grateful for today.",
    category: 'mindfulness',
    difficulty: 'easy',
    estimatedTime: '3 minutes',
    tips: [
      'Write them down in a journal',
      "Be specific about why you're grateful",
      'Include both big and small things',
      'Do this in the morning or evening',
    ],
    benefits: [
      'Improves mood and happiness',
      'Reduces stress and anxiety',
      'Strengthens relationships',
      'Increases resilience',
    ],
    icon: '🙏',
    color: '#9C27B0',
  },
  {
    id: 'mindfulness-002',
    title: 'Mindful eating',
    description:
      'Eat one meal today without distractions, focusing on taste and texture.',
    category: 'mindfulness',
    difficulty: 'medium',
    estimatedTime: '15 minutes',
    tips: [
      'Turn off TV and put phone away',
      'Take small bites',
      'Chew slowly and thoroughly',
      'Notice flavors and textures',
    ],
    benefits: [
      'Improves digestion',
      'Helps with portion control',
      'Reduces stress',
      'Enhances enjoyment of food',
    ],
    icon: '🍽️',
    color: '#9C27B0',
  },
  {
    id: 'mindfulness-003',
    title: 'Body scan meditation',
    description: 'Take 5 minutes to scan your body from head to toe.',
    category: 'mindfulness',
    difficulty: 'medium',
    estimatedTime: '5 minutes',
    tips: [
      'Find a comfortable position',
      'Start from your toes',
      'Notice sensations without judgment',
      'Breathe naturally',
    ],
    benefits: [
      'Reduces stress and tension',
      'Improves body awareness',
      'Helps with relaxation',
      'Better sleep quality',
    ],
    icon: '🧘',
    color: '#9C27B0',
  },

  // Relationships
  {
    id: 'relationships-001',
    title: 'Send a kind message',
    description:
      'Reach out to someone with a thoughtful message or compliment.',
    category: 'relationships',
    difficulty: 'easy',
    estimatedTime: '2 minutes',
    tips: [
      'Be genuine and specific',
      "Don't expect a response",
      'Focus on their positive qualities',
      'Make it personal',
    ],
    benefits: [
      'Strengthens relationships',
      'Improves your mood',
      'Creates positive connections',
      'Builds trust and rapport',
    ],
    icon: '💌',
    color: '#F44336',
  },
  {
    id: 'relationships-002',
    title: 'Active listening',
    description:
      'Have a conversation where you focus entirely on the other person.',
    category: 'relationships',
    difficulty: 'medium',
    estimatedTime: '10 minutes',
    tips: [
      'Put away distractions',
      'Make eye contact',
      'Ask follow-up questions',
      "Don't interrupt or plan your response",
    ],
    benefits: [
      'Deepens relationships',
      'Improves communication',
      'Builds trust',
      'Reduces misunderstandings',
    ],
    icon: '👂',
    color: '#F44336',
  },
  {
    id: 'relationships-003',
    title: 'Express appreciation',
    description: 'Thank someone for something they did, no matter how small.',
    category: 'relationships',
    difficulty: 'easy',
    estimatedTime: '1 minute',
    tips: [
      'Be specific about what you appreciate',
      'Do it in person when possible',
      'Make it timely',
      'Be genuine',
    ],
    benefits: [
      'Strengthens bonds',
      'Improves workplace culture',
      'Increases positive interactions',
      'Builds mutual respect',
    ],
    icon: '❤️',
    color: '#F44336',
  },

  // Learning
  {
    id: 'learning-001',
    title: 'Learn a new word',
    description: 'Discover and use a new word in conversation today.',
    category: 'learning',
    difficulty: 'easy',
    estimatedTime: '5 minutes',
    tips: [
      'Use a word-of-the-day app',
      'Look up its etymology',
      'Try to use it in a sentence',
      'Share it with someone',
    ],
    benefits: [
      'Expands vocabulary',
      'Improves communication',
      'Keeps mind active',
      'Boosts confidence',
    ],
    icon: '📚',
    color: '#FF9800',
  },
  {
    id: 'learning-002',
    title: 'Read for 10 minutes',
    description: 'Dedicate time to reading something educational or inspiring.',
    category: 'learning',
    difficulty: 'easy',
    estimatedTime: '10 minutes',
    tips: [
      "Choose something you're interested in",
      'Find a quiet space',
      'Take notes if helpful',
      'Make it a daily habit',
    ],
    benefits: [
      'Increases knowledge',
      'Improves focus',
      'Reduces stress',
      'Enhances vocabulary',
    ],
    icon: '📖',
    color: '#FF9800',
  },
  {
    id: 'learning-003',
    title: 'Watch an educational video',
    description: 'Spend 10 minutes learning something new from a video.',
    category: 'learning',
    difficulty: 'easy',
    estimatedTime: '10 minutes',
    tips: [
      "Choose a topic you're curious about",
      'Take notes',
      'Apply what you learn',
      'Share with others',
    ],
    benefits: [
      'Expands knowledge base',
      'Improves critical thinking',
      'Keeps mind engaged',
      'Provides new perspectives',
    ],
    icon: '🎥',
    color: '#FF9800',
  },

  // Creativity
  {
    id: 'creativity-001',
    title: 'Draw something',
    description: "Spend 5 minutes drawing, even if you think you can't draw.",
    category: 'creativity',
    difficulty: 'easy',
    estimatedTime: '5 minutes',
    tips: [
      "Don't worry about perfection",
      'Use simple shapes',
      'Draw what you see',
      'Enjoy the process',
    ],
    benefits: [
      'Improves hand-eye coordination',
      'Reduces stress',
      'Boosts creativity',
      'Enhances observation skills',
    ],
    icon: '🎨',
    color: '#E91E63',
  },
  {
    id: 'creativity-002',
    title: 'Write a haiku',
    description: 'Create a 3-line poem with 5-7-5 syllable pattern.',
    category: 'creativity',
    difficulty: 'medium',
    estimatedTime: '5 minutes',
    tips: [
      'Focus on nature or emotions',
      'Count syllables carefully',
      "Don't overthink it",
      'Share with others',
    ],
    benefits: [
      'Improves language skills',
      'Boosts creativity',
      'Enhances self-expression',
      'Provides mental exercise',
    ],
    icon: '✍️',
    color: '#E91E63',
  },
  {
    id: 'creativity-003',
    title: 'Take a creative photo',
    description: 'Capture an interesting image with your phone camera.',
    category: 'creativity',
    difficulty: 'easy',
    estimatedTime: '5 minutes',
    tips: [
      'Look for interesting angles',
      'Pay attention to lighting',
      'Focus on composition',
      'Try different perspectives',
    ],
    benefits: [
      'Improves observation skills',
      'Boosts creativity',
      'Creates lasting memories',
      'Enhances appreciation of beauty',
    ],
    icon: '📸',
    color: '#E91E63',
  },
];

export const getHabitsByCategory = (category: string): Habit[] => {
  return habits.filter(habit => habit.category === category);
};

export const getRandomHabit = (categories: string[]): Habit => {
  const filteredHabits = habits.filter(habit =>
    categories.includes(habit.category),
  );
  const randomIndex = Math.floor(Math.random() * filteredHabits.length);
  return filteredHabits[randomIndex];
};

export const getHabitById = (id: string): Habit | undefined => {
  return habits.find(habit => habit.id === id);
};
