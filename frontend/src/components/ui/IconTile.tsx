import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { wp, hp } from '@/utils/responsive';

type Props = {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  showDot?: boolean;
};

export default function IconTile({ icon, label, onPress, showDot }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="items-center w-full"
      style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}
    >
      <View 
        className="rounded-xl bg-white shadow-card items-center justify-center" 
        style={{ width: wp(56), height: hp(56) }}
      >
        {icon}
        {showDot ? (
          <View 
            className="bg-success rounded-full absolute" 
            style={{ width: wp(8), height: hp(8), top: hp(6), right: wp(6) }} 
          />
        ) : null}
      </View>
      <Text className="text-xs text-text-black mt-2" allowFontScaling={false}>{label}</Text>
    </Pressable>
  );
}


