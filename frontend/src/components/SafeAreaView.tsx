import React from 'react';
import { ViewProps } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

type SafeAreaViewProps = ViewProps & {
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  children: React.ReactNode;
};

/**
 * SafeAreaView component that handles safe areas properly
 * Wraps react-native-safe-area-context's SafeAreaView
 * 
 * Usage:
 * <SafeAreaView edges={['top', 'bottom']}>
 *   <YourContent />
 * </SafeAreaView>
 */
export default function SafeAreaView({ edges, style, children, ...props }: SafeAreaViewProps) {
  return (
    <RNSafeAreaView 
      edges={edges || ['top', 'bottom']} 
      style={[{ flex: 1 }, style]} 
      {...props}
    >
      {children}
    </RNSafeAreaView>
  );
}

