export const colors = {
  brandBlue: '#2D6EFF',
  brandBlueVariant: '#2B6FFB',
  accentRed: '#FE0032',
  successGreen: '#4CB64C',
  bgWhite: '#FFFFFF',
  bgLight: '#F5F5F5',
  borderGray: '#E5E7EB',
  mutedGray: '#6B7280',
  textBlack: '#101317',
  cardShadow: 'rgba(0,0,0,0.10)',
} as const;

export const spacing = {
  base: 4,
  paddingStandard: 16,
  gapSm: 8,
  gapMd: 12,
  gapLg: 24,
} as const;

export const radii = {
  small: 8,
  medium: 12,
  large: 16,
} as const;

export const sizes = {
  buttonHeight: 50,
  inputHeight: 48,
  otpBox: 56,
  otpGap: 12,
  avatar: 48,
  flag: 24,
  iconTile: 56,
} as const;

export const typography = {
  heading: { size: 24, weight: '700' as const },
  subheading: { size: 16, weight: '500' as const },
  body: { size: 14, weight: '400' as const },
  bigNumber: { sizeMin: 28, sizeMax: 32, weight: '700' as const },
} as const;

export const shadows = {
  card: '0px 2px 6px rgba(0,0,0,0.10)',
} as const;

export type DesignTokens = {
  colors: typeof colors;
  spacing: typeof spacing;
  radii: typeof radii;
  sizes: typeof sizes;
  typography: typeof typography;
  shadows: typeof shadows;
};

export const tokens: DesignTokens = {
  colors,
  spacing,
  radii,
  sizes,
  typography,
  shadows,
};

export default tokens;


