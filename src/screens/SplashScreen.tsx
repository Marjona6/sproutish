import React from 'react';
import {View, Text} from 'react-native';
import tailwind from '../styles/tailwind';

const SplashScreen = () => (
  <View style={[tailwind.flex1, tailwind.justifyCenter, tailwind.itemsCenter]}>
    <Text style={[tailwind.text2xl, tailwind.fontBold]}>Loading...</Text>
  </View>
);

export default SplashScreen;
