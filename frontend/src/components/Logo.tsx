import React from 'react';
import { Image, View } from 'react-native';

type Props = {
  width?: number;
  height?: number;
};

// Use the Caarobar logo image.
const logo = require('../../assets/Logo.png');

export default function Logo({ width = 160, height = 48 }: Props) {
  return (
    <View className="items-center justify-center">
      <Image source={logo} style={{ width, height }} resizeMode="contain" />
    </View>
  );
}


