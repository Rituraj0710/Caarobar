import React from 'react';
import { ActivityIndicator, GestureResponderEvent, TouchableOpacity, Text, ViewStyle } from 'react-native';
import { hp, fontSize, spacing } from '../../utils/responsive';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  variant?: ButtonVariant;
  style?: ViewStyle | ViewStyle[];
};

export default function Button({
  title,
  onPress,
  disabled,
  loading,
  accessibilityLabel,
  variant = 'primary',
  style,
}: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: isPrimary ? '#4285F4' : '#FFFFFF',
          borderRadius: hp(50),
          paddingVertical: spacing(14),
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#4285F4',
          shadowOffset: { width: 0, height: spacing(2) },
          shadowOpacity: 0.3,
          shadowRadius: spacing(4),
          elevation: 4,
          borderWidth: isPrimary ? 0 : 1,
          borderColor: isPrimary ? 'transparent' : '#E0E0E0',
        },
        Array.isArray(style) ? style : style ? [style] : [],
        (disabled || loading) && { opacity: 0.6 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#FFFFFF' : '#4285F4'} />
      ) : (
        <Text 
          style={{
            fontSize: fontSize(16),
            fontWeight: '700',
            color: isPrimary ? '#FFFFFF' : '#4285F4',
            fontFamily: isPrimary ? 'Poppins-Bold' : 'Poppins-SemiBold',
          }}
          allowFontScaling={false}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}


