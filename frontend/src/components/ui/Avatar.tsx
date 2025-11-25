import React from 'react';
import { Image, ImageProps, View } from 'react-native';
import { wp, hp } from '@/utils/responsive';

type Props = Omit<ImageProps, 'style'> & {
  uri?: string;
};

export default function Avatar({ uri, ...rest }: Props) {
  const size = wp(48);
  return (
    <View className="rounded-full overflow-hidden" style={{ width: size, height: size }}>
      <Image
        source={uri ? { uri } : require('../../../assets/Logo.png')}
        style={{ width: size, height: size }}
        resizeMode="cover"
        {...rest}
      />
    </View>
  );
}


