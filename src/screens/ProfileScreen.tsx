import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

interface ProfileScreenProps {
  user: any;
  onLinkWithEmail?: (email: string, password: string) => void;
  onLinkWithGoogle?: () => void;
  onSignOut?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onLinkWithEmail,
  onLinkWithGoogle,
  onSignOut,
}) => {
  const [showLinkAccount, setShowLinkAccount] = useState(false);
  const [linkEmail, setLinkEmail] = useState('');
  const [linkPassword, setLinkPassword] = useState('');

  const handleLinkWithEmail = () => {
    if (!linkEmail || !linkPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    onLinkWithEmail?.(linkEmail, linkPassword);
    setShowLinkAccount(false);
    setLinkEmail('');
    setLinkPassword('');
  };

  const stats = [
    {label: 'Total Habits', value: '8'},
    {label: 'Active Streak', value: '12 days'},
    {label: 'Completion Rate', value: '85%'},
    {label: 'Total Days', value: '45'},
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.name}>User Profile</Text>
        <Text style={styles.email}>user@example.com</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Statistics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>Current Account</Text>
            <Text style={styles.statusValue}>
              {user?.email || 'Anonymous User'}
            </Text>
            <Text style={styles.statusSubtext}>
              {user?.isAnonymous ? 'Guest Account' : 'Linked Account'}
            </Text>
          </View>

          {user?.isAnonymous && (
            <>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setShowLinkAccount(!showLinkAccount)}>
                <Text style={styles.menuText}>🔗 Link Account</Text>
              </TouchableOpacity>

              {showLinkAccount && (
                <View style={styles.linkAccountForm}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={linkEmail}
                    onChangeText={setLinkEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={linkPassword}
                    onChangeText={setLinkPassword}
                    secureTextEntry
                  />
                  <TouchableOpacity
                    style={styles.linkButton}
                    onPress={handleLinkWithEmail}>
                    <Text style={styles.linkButtonText}>Link with Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.linkButton}
                    onPress={onLinkWithGoogle}>
                    <Text style={styles.linkButtonText}>Link with Google</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>📧 Change Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>🔒 Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>🔔 Notifications</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>🌙 Dark Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>📊 Export Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>❓ Help & Support</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={onSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  signOutButton: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  statusValue: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  statusSubtext: {
    fontSize: 14,
    color: '#666',
  },
  linkAccountForm: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  linkButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
