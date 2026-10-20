import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useNavigationPattern } from '@/navigation/NavigationPatternContext';

/**
 * Temporary switcher that lets the reviewer flip between the two navigation
 * patterns without restarting the app.
 *
 * The icon always shows the pattern the app would switch **to**, so the
 * affordance is never ambiguous.
 */
export function PatternSwitchButton({ showLabel = false }: { showLabel?: boolean }) {
  const theme = useTheme();
  const { pattern, togglePattern, switchable } = useNavigationPattern();

  // When a single pattern is mounted structurally there is nothing to switch to.
  if (!switchable) {
    return null;
  }

  const target = pattern === 'tabs' ? 'drawer' : 'tabs';
  const label = target === 'drawer' ? 'Drawer' : 'Tabs';
  // A "swap" glyph is used on purpose: a hamburger icon would be confused with
  // the drawer's own menu button.
  const icon = 'swap-horizontal';

  return (
    <Pressable
      onPress={togglePattern}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${target === 'drawer' ? 'drawer' : 'bottom tab'} navigation`}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: showLabel ? theme.backgroundSelected : 'transparent',
          opacity: pressed ? 0.6 : 1,
        },
      ]}>
      <Ionicons name={icon} size={showLabel ? 16 : 22} color={theme.text} />
      {showLabel ? (
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
});
