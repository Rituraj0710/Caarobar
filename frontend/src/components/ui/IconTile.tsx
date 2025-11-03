import React from 'react';
import { Pressable, Text, View } from 'react-native';

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
      <View className="rounded-[12px] bg-white shadow-card items-center justify-center" style={{ width: 56, height: 56 }}>
        {icon}
        {showDot ? (
          <View className="bg-success rounded-full absolute" style={{ width: 8, height: 8, top: 6, right: 6 }} />
        ) : null}
      </View>
      <Text className="text-[12px] text-text-black mt-2">{label}</Text>
    </Pressable>
  );
}


