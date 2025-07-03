import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import CategorySelectionScreen from './src/screens/CategorySelectionScreen';
import HomeScreen from './src/screens/HomeScreen';
import HabitsScreen from './src/screens/HabitsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Firebase imports
import {auth, db} from './src/services/firebase';
import {
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  User,
} from 'firebase/auth';

// Utils
import {
  setOnboardingComplete,
  setCategoriesSelected,
} from './src/utils/onboardingUtils';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onboardingComplete, setOnboardingCompleteState] = useState(false);
  const [categoriesSelected, setCategoriesSelectedState] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize Google Sign-In
      GoogleSignin.configure({
        webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your actual web client ID
      });

      // Check authentication state
      const unsubscribe = onAuthStateChanged(auth, async user => {
        setUser(user);

        if (user) {
          // Check onboarding status
          const isOnboardingComplete = await AsyncStorage.getItem(
            'onboardingComplete',
          );
          const categoriesSelected = await AsyncStorage.getItem(
            'categoriesSelected',
          );
          const savedCategories = await AsyncStorage.getItem(
            'selectedCategories',
          );

          setOnboardingCompleteState(isOnboardingComplete === 'true');
          setCategoriesSelectedState(categoriesSelected === 'true');

          if (savedCategories) {
            setSelectedCategories(JSON.parse(savedCategories));
          }

          if (
            isOnboardingComplete === 'true' &&
            categoriesSelected === 'true'
          ) {
            setCurrentScreen('home');
          } else if (isOnboardingComplete === 'true') {
            setCurrentScreen('categories');
          } else {
            setCurrentScreen('onboarding');
          }
        } else {
          setCurrentScreen('splash');
        }

        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error initializing app:', error);
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      setLoading(true);
      const userCredential = await signInAnonymously(auth);
      setUser(userCredential.user);

      // Check if user has completed onboarding
      const isOnboardingComplete = await AsyncStorage.getItem(
        'onboardingComplete',
      );
      const categoriesSelected = await AsyncStorage.getItem(
        'categoriesSelected',
      );
      const savedCategories = await AsyncStorage.getItem('selectedCategories');

      setOnboardingCompleteState(isOnboardingComplete === 'true');
      setCategoriesSelectedState(categoriesSelected === 'true');

      if (savedCategories) {
        setSelectedCategories(JSON.parse(savedCategories));
      }

      if (isOnboardingComplete === 'true' && categoriesSelected === 'true') {
        setCurrentScreen('home');
      } else if (isOnboardingComplete === 'true') {
        setCurrentScreen('categories');
      } else {
        setCurrentScreen('onboarding');
      }
    } catch (error) {
      console.error('Anonymous sign-in error:', error);
      Alert.alert('Error', 'Failed to sign in anonymously');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // For now, just sign in anonymously since Google Sign-In needs more setup
      await handleAnonymousSignIn();
    } catch (error) {
      console.error('Google sign-in error:', error);
      Alert.alert('Error', 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem('onboardingComplete', 'true');
    setOnboardingCompleteState(true);
    setCurrentScreen('categories');
  };

  const handleCategoriesSelected = async (categories: string[]) => {
    if (user) {
      await setCategoriesSelected(categories);
      setSelectedCategories(categories);
      setCategoriesSelectedState(true);
      setCurrentScreen('home');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setCurrentScreen('splash');
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  const handleLinkAccount = async (method: 'email' | 'google') => {
    if (!user) return;

    try {
      if (method === 'email') {
        // For email linking, you might want to show a form
        Alert.alert('Coming Soon', 'Email linking will be available soon!');
      } else if (method === 'google') {
        Alert.alert('Coming Soon', 'Google linking will be available soon!');
      }
    } catch (error) {
      console.error('Account linking error:', error);
      Alert.alert('Error', 'Failed to link account');
    }
  };

  if (loading) {
    return <SplashScreen />;
  }

  // Render different screens based on current state
  switch (currentScreen) {
    case 'splash':
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>🌱 Sproutish</Text>
            <Text style={styles.subtitle}>
              Build positive habits, one day at a time
            </Text>

            <View style={styles.authButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleAnonymousSignIn}
                disabled={loading}>
                <Text style={styles.primaryButtonText}>Continue as Guest</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleGoogleSignIn}
                disabled={loading}>
                <Text style={styles.secondaryButtonText}>
                  Sign in with Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );

    case 'onboarding':
      return (
        <OnboardingScreen
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingComplete}
        />
      );

    case 'categories':
      return <CategorySelectionScreen onComplete={handleCategoriesSelected} />;

    case 'home':
      return (
        <HomeScreen
          userId={user?.uid || ''}
          selectedCategories={selectedCategories}
          onNavigate={handleNavigate}
        />
      );

    case 'habits':
      return <HabitsScreen />;

    case 'profile':
      return <ProfileScreen user={user} onSignOut={handleSignOut} />;

    default:
      return <SplashScreen />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 40,
  },
  authButtons: {
    width: '100%',
    maxWidth: 300,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
