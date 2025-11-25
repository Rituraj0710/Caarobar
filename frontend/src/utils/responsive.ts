import { Dimensions, PixelRatio, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (reference device - typically iPhone 12/13)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

/**
 * Get responsive width based on screen width
 * @param size - Base size in pixels
 * @returns Responsive size scaled to current screen
 */
export const wp = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return PixelRatio.roundToNearestPixel(size * scale);
};

/**
 * Get responsive height based on screen height
 * @param size - Base size in pixels
 * @returns Responsive size scaled to current screen
 */
export const hp = (size: number): number => {
  const scale = SCREEN_HEIGHT / BASE_HEIGHT;
  return PixelRatio.roundToNearestPixel(size * scale);
};

/**
 * Get responsive font size
 * @param size - Base font size in pixels
 * @returns Responsive font size
 */
export const fontSize = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  // Limit font size scaling to prevent it from becoming too large or too small
  return Math.max(10, Math.min(newSize, size * 1.5));
};

/**
 * Get responsive padding/margin
 * @param size - Base spacing in pixels
 * @returns Responsive spacing
 */
export const spacing = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return PixelRatio.roundToNearestPixel(size * scale);
};

/**
 * Get percentage width (clamped to reasonable values)
 * @param percentage - Percentage of screen width (0-100)
 * @returns Width in pixels
 */
export const widthPercentage = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

/**
 * Get percentage height (clamped to reasonable values)
 * @param percentage - Percentage of screen height (0-100)
 * @returns Height in pixels
 */
export const heightPercentage = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

/**
 * Check if device is tablet or large screen
 */
export const isTablet = (): boolean => {
  return SCREEN_WIDTH >= 768;
};

/**
 * Check if device is small screen
 */
export const isSmallScreen = (): boolean => {
  return SCREEN_WIDTH < 375;
};

/**
 * Get responsive table cell width
 * For tables, use flex values instead of fixed widths when possible
 * This function provides a fallback for when fixed width is necessary
 */
export const tableCellWidth = (baseWidth: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  // Clamp table cell widths to prevent them from becoming too large
  return Math.min(PixelRatio.roundToNearestPixel(baseWidth * scale), baseWidth * 1.3);
};

/**
 * Hook to get safe area insets
 * Use this hook in components to get safe area values
 * @returns SafeAreaInsets object with top, bottom, left, right
 */
export const useSafeArea = () => {
  return useSafeAreaInsets();
};

/**
 * Get safe area bottom padding for devices with notches/home indicators
 * @deprecated Use useSafeArea() hook instead for better accuracy
 * @returns Safe bottom padding (fallback value)
 */
export const getSafeBottomPadding = (): number => {
  // Fallback value - use useSafeArea() hook in components for accurate values
  return Platform.OS === 'ios' ? hp(20) : hp(10);
};

/**
 * Get safe area top padding for status bar
 * @deprecated Use useSafeArea() hook instead for better accuracy
 * @returns Safe top padding (fallback value)
 */
export const getSafeTopPadding = (): number => {
  // Fallback value - use useSafeArea() hook in components for accurate values
  return Platform.OS === 'ios' ? hp(44) : hp(24);
};

export { SCREEN_WIDTH, SCREEN_HEIGHT };

