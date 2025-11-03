import React, { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';

type Props = PropsWithChildren<{
  className?: string;
}> & ViewProps;

export default function Card({ className, children, ...rest }: Props) {
  return (
    <View className={`bg-white rounded-card shadow-card ${className || ''}`} {...rest}>
      {children}
    </View>
  );
}


