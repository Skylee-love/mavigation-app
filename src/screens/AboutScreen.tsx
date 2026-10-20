import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PatternSwitchButton } from '@/components/PatternSwitchButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  strengths: string[];
  tradeOffs: string[];
};

const PATTERNS: Props[] = [
  {
    icon: 'grid-outline',
    title: 'Pattern 1 · Bottom tabs',
    strengths: [
      'Four destinations are visible at all times — one tap away',
      'Thumb-reachable on large phones, no extra gesture',
      'Great for a small set of peer destinations',
    ],
    tradeOffs: [
      'Only 3–5 destinations stay comfortable',
      'Secondary screens have to live inside a tab stack',
      'Tab bar takes vertical space on every screen',
    ],
  },
  {
    icon: 'menu',
    title: 'Pattern 2 · Drawer menu',
    strengths: [
      'Scales to many destinations without crowding the screen',
      'Natural home for secondary and account destinations',
      'Content area stays completely free of chrome',
    ],
    tradeOffs: [
      'Destinations are hidden: two taps instead of one',
      'Relies on a discoverable hamburger button or swipe gesture',
      'Context switching interrupts the current task',
    ],
  },
];

/**
 * Explains the two patterns side by side.
 *
 * The screen is reachable from the Profile stack and from the drawer, which
 * makes it a convenient talking point during the demo.
 */
export function AboutScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.logo, { backgroundColor: theme.primary }]}>
        <Ionicons name="trail-sign-outline" size={30} color="#FFFFFF" />
      </View>
      <ThemedText type="subtitle">Trailhead</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.tagline}>
        One trail guide, two navigation patterns. The screens are identical — only
        the shell around them changes.
      </ThemedText>

      <ThemedView style={styles.version}>
        <ThemedText type="smallBold">Version 1.0.0</ThemedText>
        <ThemedText themeColor="textSecondary" type="small">
          Built with Expo, React Navigation 7, TypeScript
        </ThemedText>
      </ThemedView>

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        Try the other pattern
      </ThemedText>
      <View style={styles.switchRow}>
        <ThemedText themeColor="textSecondary" type="small" style={styles.switchHint}>
          The switcher is temporary – it only exists for this comparison.
        </ThemedText>
        <PatternSwitchButton showLabel />
      </View>

      {PATTERNS.map((pattern) => (
        <ThemedView key={pattern.title} style={styles.patternCard}>
          <View style={styles.patternHeader}>
            <Ionicons name={pattern.icon} size={18} color={theme.primary} />
            <ThemedText type="smallBold" style={styles.patternTitle}>
              {pattern.title}
            </ThemedText>
          </View>

          <Text style={[styles.listLabel, { color: theme.primary }]}>Strengths</Text>
          {pattern.strengths.map((item) => (
            <View key={item} style={styles.listItem}>
              <Ionicons name="checkmark-circle" size={15} color={theme.primary} />
              <ThemedText themeColor="textSecondary" type="small" style={styles.listText}>
                {item}
              </ThemedText>
            </View>
          ))}

          <Text style={[styles.listLabel, { color: theme.accent }]}>Trade-offs</Text>
          {pattern.tradeOffs.map((item) => (
            <View key={item} style={styles.listItem}>
              <Ionicons name="remove-circle-outline" size={15} color={theme.accent} />
              <ThemedText themeColor="textSecondary" type="small" style={styles.listText}>
                {item}
              </ThemedText>
            </View>
          ))}
        </ThemedView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagline: {
    lineHeight: 22,
  },
  version: {
    gap: 2,
  },
  sectionTitle: {
    marginTop: Spacing.two,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  switchHint: {
    flex: 1,
  },
  patternCard: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.lg,
  },
  patternHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  patternTitle: {
    fontSize: 15,
  },
  listLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  listText: {
    flex: 1,
    lineHeight: 20,
  },
});
