import React from 'react';
import { ActivityIndicator, GestureResponderEvent, Pressable, Text, ViewStyle } from 'react-native';
import { hp } from '@/utils/responsive';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  variant?: ButtonVariant;
  className?: string;
  style?: ViewStyle | ViewStyle[];
};

export default function Button({
  title,
  onPress,
  disabled,
  loading,
  accessibilityLabel,
  variant = 'primary',
  className,
  style,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const baseClasses = 'rounded-button items-center justify-center shadow-card';
  const primaryClasses = 'bg-brand';
  const secondaryClasses = 'bg-background-light border border-border-gray';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses} ${className || ''}`}
      style={({ pressed }) => [
        { height: hp(50) },
        Array.isArray(style) ? style : style ? [style] : [],
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#FFFFFF' : '#101317'} />
      ) : (
        <Text 
          className={`text-base font-medium ${isPrimary ? 'text-white' : 'text-text-black'}`}
          allowFontScaling={false}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}


