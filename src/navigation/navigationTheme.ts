import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';
import { useMemo } from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Maps the app design tokens onto a React Navigation theme so that headers,
 * tab bars and the drawer pick up the same colours as the screens.
 */
export function useNavigationTheme(): Theme {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const palette = isDark ? Colors.dark : Colors.light;
  const base = isDark ? DarkTheme : DefaultTheme;

  return useMemo(
    () => ({
      ...base,
      dark: isDark,
      colors: {
        ...base.colors,
        primary: palette.primary,
        background: palette.background,
        card: palette.backgroundElement,
        text: palette.text,
        border: palette.border,
        notification: palette.accent,
      },
    }),
    [base, isDark, palette]
  );
}
