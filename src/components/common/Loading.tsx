import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import tailwind from '../../styles/tailwind';

const Loading = () => (
  <View style={[tailwind.flex1, tailwind.justifyCenter, tailwind.itemsCenter]}>
    <ActivityIndicator size="large" color="#4F46E5" />
  </View>
);

export default Loading;
