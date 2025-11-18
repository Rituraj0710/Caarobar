import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, spacing } from '../utils/responsive';

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  size?: number;
}

export default function BackButton({ onPress, color = '#000000', size }: BackButtonProps) {
  const navigation = useNavigation();
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  const iconSize = size || wp(32); // Responsive size, default to 32 (bigger and bolder)

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={styles.button}
      activeOpacity={0.7}
    >
      <MaterialIcons 
        name="arrow-back" 
        size={iconSize} 
        color={color}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: spacing(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
});

