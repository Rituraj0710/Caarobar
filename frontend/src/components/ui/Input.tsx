import React from 'react';
import { TextInput, View, Text, ViewStyle, TextInputProps } from 'react-native';

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
        <Text className="text-[14px] font-semibold text-text-black mb-2">{label}</Text>
      ) : null}
      <TextInput
        accessibilityLabel={label || (props.placeholder as string) || 'input'}
        className="h-[48px] rounded-input border px-3 text-[14px]"
        style={{
          borderColor: focused ? '#2D6EFF' : '#E5E7EB',
          backgroundColor: '#FFFFFF',
        }}
        placeholderTextColor={props.placeholderTextColor || '#6B7280'}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
      {error ? (
        <Text className="text-[14px] text-accentRed mt-1">{error}</Text>
      ) : null}
    </View>
  );
}


