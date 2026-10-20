import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type IconName = React.ComponentProps<typeof Ionicons>['name'];

type Props = {
  icon: IconName;
  onPress: () => void;
  /** Used by screen readers – describe the *action*, not the glyph. */
  accessibilityLabel: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
};

/** Small, accessible icon button used in headers and cards. */
export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  size = 22,
  color,
  backgroundColor,
}: Props) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={10}
      style={({ pressed }) => [
        styles.button,
        backgroundColor ? { backgroundColor } : null,
        { opacity: pressed ? 0.6 : 1 },
      ]}
    >
      <Ionicons name={icon} size={size} color={color ?? theme.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
