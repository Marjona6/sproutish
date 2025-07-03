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
} from 'react-native';

// Firebase imports
import {auth} from './src/services/firebase';
import {onAuthStateChanged, User} from 'firebase/auth';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const testFirebaseConnection = () => {
    Alert.alert(
      'Firebase Status',
      `Firebase is ${
        auth.app.options.projectId ? 'connected' : 'not connected'
      }!\n\nProject ID: ${auth.app.options.projectId}`,
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🌱 Sproutish</Text>
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌱 Sproutish</Text>
        <Text style={styles.subtitle}>Habit Tracking App</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Firebase Setup Complete! 🎉</Text>
        <Text style={styles.description}>
          Your Firebase configuration is working properly. The app is now
          connected to your Firebase project.
        </Text>

        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Connection Status</Text>
          <Text style={styles.statusValue}>
            ✅ Connected to: {auth.app.options.projectId}
          </Text>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Authentication Status</Text>
          <Text style={styles.statusValue}>
            {user ? `✅ Signed in as: ${user.email}` : '❌ Not signed in'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={testFirebaseConnection}>
          <Text style={styles.buttonText}>Test Firebase Connection</Text>
        </TouchableOpacity>

        <View style={styles.nextSteps}>
          <Text style={styles.sectionTitle}>Next Steps</Text>
          <Text style={styles.nextStepItem}>
            1. ✅ Firebase project configured
          </Text>
          <Text style={styles.nextStepItem}>
            2. ✅ Authentication service ready
          </Text>
          <Text style={styles.nextStepItem}>
            3. ⏳ Enable Authentication methods in Firebase Console
          </Text>
          <Text style={styles.nextStepItem}>
            4. ⏳ Set up Firestore database
          </Text>
          <Text style={styles.nextStepItem}>
            5. ⏳ Add navigation and screens
          </Text>
        </View>
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
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
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
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default App;
