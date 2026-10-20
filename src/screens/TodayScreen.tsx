import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SectionHeader } from '@/components/SectionHeader';
import { TrailCard } from '@/components/TrailCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { TRAILS } from '@/data/trails';
import { useTheme } from '@/hooks/use-theme';
import { useRootNavigation } from '@/navigation/useRootNavigation';
import type { TodayStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<TodayStackParamList, 'TodayHome'>;

/**
 * First screen of the "Today" stack.
 *
 * It is rendered by both patterns: as the first tab (bottom tabs) and as the
 * first drawer entry (hamburger menu). Cross links such as "See all" use
 * `useRootNavigation()`, whose `navigate` bubbles up to whichever shell is
 * mounted.
 */
export function TodayScreen({ navigation }: Props) {
  const theme = useTheme();
  const rootNavigation = useRootNavigation();
  const nearby = TRAILS.slice(0, 5);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.greeting}>
        <ThemedText type="subtitle" style={styles.greetingTitle}>
          Good morning, Alex
        </ThemedText>
        <ThemedText themeColor="textSecondary">Tuesday 14 October · Forest Park</ThemedText>
      </ThemedView>

      <ThemedView style={styles.conditions}>
        <View style={styles.conditionsHeader}>
          <Ionicons name="sparkles-outline" size={18} color={theme.primary} />
          <ThemedText type="smallBold" style={styles.conditionsTitle}>
            Trail conditions
          </ThemedText>
          <View style={[styles.badge, { backgroundColor: theme.primarySoft }]}>
            <Text style={[styles.badgeText, { color: theme.primary }]}>Great</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <ConditionStat icon="sunny-outline" label="12°" caption="Clear" />
          <ConditionStat icon="layers-outline" label="0 mm" caption="Rain" />
          <ConditionStat icon="time-outline" label="07:42" caption="Sunrise" />
        </View>
      </ThemedView>

      <SectionHeader
        title="Nearby today"
        action={{ label: 'See all', onPress: () => rootNavigation.navigate('Explore') }}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rail}
        style={styles.railScroll}>
        {nearby.map((trail) => (
          <TrailCard
            key={trail.id}
            trail={trail}
            variant="rail"
            onPress={() => navigation.navigate('TrailDetail', { trailId: trail.id })}
          />
        ))}
      </ScrollView>

      <SectionHeader title="Jump back in" />
      <Pressable
        onPress={() => navigation.navigate('TrailDetail', { trailId: TRAILS[0].id })}
        accessibilityRole="button"
        accessibilityLabel={`Continue with ${TRAILS[0].name}`}
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
        <ThemedView style={styles.resumeCard}>
          <View style={[styles.resumeGlyph, { backgroundColor: TRAILS[0].accent }]}>
            <Text style={styles.resumeGlyphText}>{TRAILS[0].glyph}</Text>
          </View>
          <View style={styles.resumeBody}>
            <ThemedText type="smallBold">{TRAILS[0].name}</ThemedText>
            <ThemedText themeColor="textSecondary" type="small">
              You saved a route here last weekend
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
        </ThemedView>
      </Pressable>

      <SectionHeader title="Quick actions" />
      <View style={styles.actions}>
        <QuickAction
          icon="compass-outline"
          label="Explore"
          hint="Browse all trails"
          onPress={() => rootNavigation.navigate('Explore')}
        />
        <QuickAction
          icon="bookmark-outline"
          label="Saved"
          hint="Your shortlist"
          onPress={() => rootNavigation.navigate('Saved')}
        />
        <QuickAction
          icon="person-outline"
          label="Profile"
          hint="Account & settings"
          onPress={() => rootNavigation.navigate('Profile')}
        />
      </View>
    </ScrollView>
  );
}

function ConditionStat({
  icon,
  label,
  caption,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  caption: string;
}) {
  const theme = useTheme();

  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={16} color={theme.textSecondary} />
      <Text style={[styles.statLabel, { color: theme.text }]}>{label}</Text>
      <Text style={[styles.statCaption, { color: theme.textSecondary }]}>{caption}</Text>
    </View>
  );
}

function QuickAction({
  icon,
  label,
  hint,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  hint: string;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}. ${hint}`}
      style={({ pressed }) => [
        styles.action,
        { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.85 : 1 },
      ]}>
      <Ionicons name={icon} size={20} color={theme.primary} />
      <ThemedText type="smallBold">{label}</ThemedText>
      <ThemedText themeColor="textSecondary" type="small">
        {hint}
      </ThemedText>
    </Pressable>
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
  greeting: {
    gap: 2,
  },
  greetingTitle: {
    fontSize: 26,
    lineHeight: 32,
  },
  conditions: {
    borderRadius: Radius.lg,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  conditionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  conditionsTitle: {
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  statCaption: {
    fontSize: 12,
  },
  railScroll: {
    marginHorizontal: -Spacing.four,
    paddingLeft: Spacing.four,
  },
  rail: {
    paddingRight: Spacing.four,
  },
  resumeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.lg,
  },
  resumeGlyph: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeGlyphText: {
    fontSize: 24,
  },
  resumeBody: {
    flex: 1,
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  action: {
    flex: 1,
    gap: 4,
    padding: Spacing.three,
    borderRadius: Radius.lg,
  },
});
