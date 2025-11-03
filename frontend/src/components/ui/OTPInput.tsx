import React, { useEffect, useRef } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';

type Props = {
  value: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
  autoFocus?: boolean;
  error?: string | null;
  accessibilityLabel?: string;
};

export default function OTPInput({ value, onChange, onComplete, autoFocus, error, accessibilityLabel }: Props) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (value.length === 4) {
      onComplete?.(value);
    }
  }, [value, onComplete]);

  const digits = [0, 1, 2, 3].map((i) => value[i] || '');

  return (
    <View className="items-center">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || 'OTP input'}
        onPress={() => inputRef.current?.focus()}
        style={{ flexDirection: 'row' }}
      >
        {digits.map((d, idx) => (
          <View
            key={idx}
            className="rounded-lg items-center justify-center border bg-white"
            style={{ 
              width: 72, 
              height: 72, 
              borderColor: error ? '#FE0032' : '#E5E7EB',
              borderWidth: 1,
              marginHorizontal: 6
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: '600', color: '#12110D' }}>{d}</Text>
          </View>
        ))}
      </Pressable>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(t) => onChange(t.replace(/\D/g, '').slice(0, 4))}
        keyboardType="number-pad"
        returnKeyType="done"
        maxLength={4}
        style={{ position: 'absolute', opacity: 0, height: 0, width: 0 }}
        autoFocus={autoFocus}
      />
      {error ? <Text className="text-accentRed mt-2">{error}</Text> : null}
    </View>
  );
}


