import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import AddEditHabitScreen from '../screens/AddEditHabitScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Dashboard"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="AddEditHabit" component={AddEditHabitScreen} />
    <Stack.Screen name="Splash" component={SplashScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
