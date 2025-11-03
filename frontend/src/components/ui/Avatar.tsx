import React from 'react';
import { Image, ImageProps, View } from 'react-native';

type Props = Omit<ImageProps, 'style'> & {
  uri?: string;
};

export default function Avatar({ uri, ...rest }: Props) {
  return (
    <View className="rounded-full overflow-hidden" style={{ width: 48, height: 48 }}>
      <Image
        source={uri ? { uri } : require('../../../assets/Logo.png')}
        style={{ width: 48, height: 48 }}
        {...rest}
      />
    </View>
  );
}


