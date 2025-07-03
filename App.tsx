/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
} from 'react-native';

// Firebase imports
import {auth, db} from './src/services/firebase';
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from 'firebase/firestore';

// Screen imports
import HomeScreen from './src/screens/HomeScreen';
import HabitsScreen from './src/screens/HabitsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SimpleNavigator from './src/navigation/SimpleNavigator';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [firestoreStatus, setFirestoreStatus] = useState<string>('Not tested');
  const [testData, setTestData] = useState<any[]>([]);
  const [currentScreen, setCurrentScreen] = useState('home');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Signed in successfully!');
      }
      setEmail('');
      setPassword('');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'Signed out successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      Alert.alert('Success', 'Signed in anonymously!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const testFirebaseConnection = () => {
    Alert.alert(
      'Firebase Status',
      `Firebase is ${
        auth.app.options.projectId ? 'connected' : 'not connected'
      }!\n\nProject ID: ${auth.app.options.projectId}`,
    );
  };

  const testFirestoreWrite = async () => {
    if (!user) {
      Alert.alert('Error', 'Please sign in first');
      return;
    }

    try {
      setFirestoreStatus('Writing...');
      const testDoc = {
        userId: user.uid,
        message: 'Hello from Sproutish!',
        timestamp: new Date(),
        type: 'test',
      };

      const docRef = await addDoc(collection(db, 'test'), testDoc);
      setFirestoreStatus('Write successful!');
      Alert.alert('Success', `Document written with ID: ${docRef.id}`);
    } catch (error: any) {
      setFirestoreStatus('Write failed');
      Alert.alert('Error', error.message);
    }
  };

  const testFirestoreRead = async () => {
    if (!user) {
      Alert.alert('Error', 'Please sign in first');
      return;
    }

    try {
      setFirestoreStatus('Reading...');
      const q = query(collection(db, 'test'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestData(data);
      setFirestoreStatus('Read successful!');
      Alert.alert('Success', `Found ${data.length} documents`);
    } catch (error: any) {
      setFirestoreStatus('Read failed');
      Alert.alert('Error', error.message);
    }
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    // Sign in/up view
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>🌱 Sproutish</Text>
          <Text style={styles.subtitle}>Habit Tracking App</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Text>

          <View style={styles.authForm}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleAuth}>
              <Text style={styles.buttonText}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.anonymousButton}
              onPress={handleAnonymousSignIn}>
              <Text style={styles.buttonText}>Continue as Guest</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={styles.switchButtonText}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>Connection Status</Text>
            <Text style={styles.statusValue}>
              ✅ Connected to: {auth.app.options.projectId}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={testFirebaseConnection}>
            <Text style={styles.buttonText}>Test Firebase Connection</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Signed in view with navigation
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'habits' && <HabitsScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
      </View>
      <SimpleNavigator
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#4CAF50',
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
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 20,
  },
  authForm: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statusCard: {
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
  statusTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 16,
    color: '#4CAF50',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  signOutButton: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  anonymousButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  switchButton: {
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButtonText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  nextSteps: {
    marginTop: 20,
  },
  nextStepItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 10,
  },
  dataItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  screenContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
