/**
 * Design tokens for the Trailhead app.
 *
 * Every colour that changes between light and dark mode lives in `Colors`,
 * so a screen can pull the right token with the `useTheme()` hook.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F6F7F5',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E4EFE8',
    textSecondary: '#5F6B72',
    border: '#E1E6E2',
    primary: '#1F6F4A',
    primarySoft: '#E3F0E8',
    accent: '#B4620F',
    accentSoft: '#FBEEDC',
    danger: '#B3261E',
  },
  dark: {
    text: '#F1F4F2',
    background: '#0E1113',
    backgroundElement: '#171B1E',
    backgroundSelected: '#1D2A22',
    textSecondary: '#98A4AD',
    border: '#242A2F',
    primary: '#4CAF7D',
    primarySoft: '#16281E',
    accent: '#E9A44C',
    accentSoft: '#2B2013',
    danger: '#F2B8B5',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    serif: 'Georgia, "Times New Roman", serif',
    rounded: '"SF Pro Rounded", "Hiragino Maru Gothic ProN", Meiryo, "MS PGothic", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Corner radius scale used by cards, chips and sheets. */
export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
