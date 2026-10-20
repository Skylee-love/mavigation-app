import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useNavigationPattern, type NavigationPattern } from '@/navigation/NavigationPatternContext';

const OPTIONS: { value: NavigationPattern; label: string; icon: 'grid-outline' | 'menu' }[] = [
  { value: 'tabs', label: 'Bottom tabs', icon: 'grid-outline' },
  { value: 'drawer', label: 'Drawer menu', icon: 'menu' },
];

/**
 * Two-way control that shows which navigation pattern is active and lets the
 * user pick the other one. Used on the Profile and Settings screens.
 */
export function PatternChooser() {
  const theme = useTheme();
  const { pattern, setPattern, switchable } = useNavigationPattern();

  if (!switchable) {
    return (
      <View style={[styles.locked, { backgroundColor: theme.backgroundElement }]}>
        <Ionicons name={pattern === 'tabs' ? 'grid-outline' : 'menu'} size={18} color={theme.primary} />
        <Text style={[styles.lockedLabel, { color: theme.text }]}>
          {pattern === 'tabs' ? 'Bottom tab bar' : 'Drawer menu'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      {OPTIONS.map((option) => {
        const active = option.value === pattern;

        return (
          <Pressable
            key={option.value}
            onPress={() => setPattern(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected: active, checked: active }}
            accessibilityLabel={`Use ${option.label} navigation`}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: active ? theme.primary : theme.backgroundElement,
                borderColor: active ? theme.primary : theme.border,
                opacity: pressed ? 0.8 : 1,
              },
            ]}>
            <Ionicons
              name={option.icon}
              size={18}
              color={active ? theme.backgroundElement : theme.textSecondary}
            />
            <Text
              style={[
                styles.label,
                { color: active ? theme.backgroundElement : theme.textSecondary },
              ]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: 12,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  locked: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.md,
  },
  lockedLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
});
