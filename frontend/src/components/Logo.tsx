import React from 'react';
import { Image, View } from 'react-native';
import { wp, hp } from '@/utils/responsive';

type Props = {
  width?: number;
  height?: number;
};

// Use the Caarobar logo image.
const logo = require('../../assets/Logo.png');

export default function Logo({ width, height }: Props) {
  const logoWidth = width ? wp(width) : wp(160);
  const logoHeight = height ? hp(height) : hp(48);
  
  return (
    <View className="items-center justify-center">
      <Image 
        source={logo} 
        style={{ width: logoWidth, height: logoHeight }} 
        resizeMode="contain" 
      />
    </View>
  );
}


