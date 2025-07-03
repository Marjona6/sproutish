import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface SimpleNavigatorProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const SimpleNavigator: React.FC<SimpleNavigatorProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const screens = [
    {id: 'home', title: '🏠 Home'},
    {id: 'habits', title: '🌱 Habits'},
    {id: 'profile', title: '👤 Profile'},
  ];

  return (
    <View style={styles.container}>
      {screens.map(screen => (
        <TouchableOpacity
          key={screen.id}
          style={[styles.tab, currentScreen === screen.id && styles.activeTab]}
          onPress={() => onNavigate(screen.id)}>
          <Text
            style={[
              styles.tabText,
              currentScreen === screen.id && styles.activeTabText,
            ]}>
            {screen.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    backgroundColor: '#e8f5e8',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default SimpleNavigator;
