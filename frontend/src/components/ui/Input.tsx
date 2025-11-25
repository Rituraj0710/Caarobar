import React from 'react';
import { TextInput, View, Text, ViewStyle, TextInputProps } from 'react-native';
import { hp } from '@/utils/responsive';

type Props = TextInputProps & {
  label?: string;
  error?: string | null;
  containerClassName?: string;
};

export default function Input({ label, error, containerClassName, style, ...props }: Props) {
  const [focused, setFocused] = React.useState(false);

  return (
    <View className={containerClassName}>
      {label ? (
        <Text className="text-sm font-semibold text-text-black mb-2" allowFontScaling={false}>{label}</Text>
      ) : null}
      <TextInput
        accessibilityLabel={label || (props.placeholder as string) || 'input'}
        className="rounded-input border px-3 text-sm"
        style={[
          {
            height: hp(48),
            borderColor: focused ? '#2D6EFF' : '#E5E7EB',
            backgroundColor: '#FFFFFF',
          },
          style,
        ]}
        placeholderTextColor={props.placeholderTextColor || '#6B7280'}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        allowFontScaling={false}
        {...props}
      />
      {error ? (
        <Text className="text-sm text-accentRed mt-1" allowFontScaling={false}>{error}</Text>
      ) : null}
    </View>
  );
}


