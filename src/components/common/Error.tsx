import React from 'react';
import {Text, View} from 'react-native';
import tailwind from '../../styles/tailwind';

const Error = ({message}: {message: string}) => (
  <View style={[tailwind.p4, tailwind.bgRed100, tailwind.rounded, tailwind.m4]}>
    <Text style={[tailwind.textRed700]}>{message}</Text>
  </View>
);

export default Error;
