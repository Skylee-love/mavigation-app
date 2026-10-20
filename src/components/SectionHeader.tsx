import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type Props = {
  title: string;
  /** Optional trailing action, e.g. a "See all" button. */
  action?: { label: string; onPress: () => void };
};

export function SectionHeader({ title, action }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      {action ? (
        <ThemedText
          type="linkPrimary"
          onPress={action.onPress}
          accessibilityRole="link"
          style={styles.action}>
          {action.label}
        </ThemedText>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.three,
    gap: Spacing.three,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
  },
  action: {
    fontWeight: '700',
  },
});
