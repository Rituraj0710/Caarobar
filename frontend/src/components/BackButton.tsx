import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, spacing } from '../utils/responsive';

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  size?: number;
  width?: number;
  height?: number;
}

export default function BackButton({ onPress, color = '#000000', size, width, height }: BackButtonProps) {
  const navigation = useNavigation();
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  // Use width/height if provided, otherwise fall back to size for square, or default
  const iconWidth = width || size || wp(16.67);
  const iconHeight = height || size || hp(14.57);

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={styles.button}
      activeOpacity={0.7}
    >
      <Svg width={iconWidth} height={iconHeight} viewBox="0 0 24 24" fill="none">
        <Path 
          d="M12 4l-8 8 8 8 1.41-1.41L6.83 13H20v-2H6.83l6.58-6.59L12 4z" 
          fill={color}
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: spacing(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

