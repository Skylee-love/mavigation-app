import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DifficultyChip } from '@/components/DifficultyChip';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { getTrailById } from '@/data/trails';
import { useTheme } from '@/hooks/use-theme';
import type { TrailDetailStackParamList, TrailDetailParams } from '@/navigation/types';
import { useSavedTrails } from '@/state/SavedTrailsContext';

type Props = {
  route: { params: TrailDetailParams };
};

/**
 * Detail screen shared by the Today, Explore and Saved stacks.
 *
 * The trail is addressed through route params, so the same component can be
 * pushed from three different stacks without any of them knowing about the
 * others.
 */
export function TrailDetailScreen({ route }: Props) {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<TrailDetailStackParamList>>();
  const { isSaved, toggleSaved } = useSavedTrails();
  const trail = getTrailById(route.params.trailId);

  useEffect(() => {
    if (trail) {
      navigation.setOptions({ title: trail.name });
    }
  }, [navigation, trail]);

  if (!trail) {
    return (
      <ThemedView style={styles.missing}>
        <ThemedText type="subtitle">Trail not found</ThemedText>
        <ThemedText themeColor="textSecondary">
          This trail is no longer part of the guide.
        </ThemedText>
      </ThemedView>
    );
  }

  const saved = isSaved(trail.id);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.artwork, { backgroundColor: trail.accent }]}>
        <Text style={styles.glyph}>{trail.glyph}</Text>
        <View style={styles.artworkBadges}>
          <DifficultyChip difficulty={trail.difficulty} />
          <View style={[styles.seasonBadge, { backgroundColor: 'rgba(255,255,255,0.85)' }]}>
            <Text style={styles.seasonText}>{trail.bestSeason}</Text>
          </View>
        </View>
      </View>

      <View style={styles.titleBlock}>
        <ThemedText type="subtitle">{trail.name}</ThemedText>
        <ThemedText themeColor="textSecondary">{trail.region}</ThemedText>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={15} color={theme.accent} />
          <ThemedText type="smallBold">{trail.rating.toFixed(1)}</ThemedText>
          <ThemedText themeColor="textSecondary" type="small">
            {trail.reviewCount} reviews
          </ThemedText>
        </View>
      </View>

      <ThemedView style={styles.stats}>
        <Stat icon="walk-outline" label={`${trail.distanceKm} km`} caption="Distance" />
        <Stat icon="trending-up-outline" label={`${trail.elevationGainM} m`} caption="Elevation" />
        <Stat icon="time-outline" label={`${trail.durationMin} min`} caption="Duration" />
      </ThemedView>

      <ThemedText type="smallBold">About this trail</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.summary}>
        {trail.summary}
      </ThemedText>

      <ThemedText type="smallBold">Highlights</ThemedText>
      <View style={styles.highlights}>
        {trail.highlights.map((highlight) => (
          <View key={highlight} style={styles.highlight}>
            <Ionicons name="checkmark-circle" size={16} color={theme.primary} />
            <ThemedText themeColor="textSecondary" type="small">
              {highlight}
            </ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.tags}>
        {trail.tags.map((tag) => (
          <View
            key={tag}
            style={[styles.tag, { backgroundColor: theme.backgroundSelected }]}>
            <Text style={[styles.tagText, { color: theme.textSecondary }]}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => toggleSaved(trail.id)}
          accessibilityRole="button"
          accessibilityState={{ selected: saved }}
          accessibilityLabel={saved ? 'Remove from saved trails' : 'Save trail'}
          style={({ pressed }) => [
            styles.secondaryButton,
            {
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
              opacity: pressed ? 0.8 : 1,
            },
          ]}>
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={saved ? theme.primary : theme.text}
          />
          <Text style={[styles.secondaryButtonText, { color: theme.text }]}>
            {saved ? 'Saved' : 'Save'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => Alert.alert('Directions', `Opening directions to ${trail.name}.`)}
          accessibilityRole="button"
          accessibilityLabel="Get directions to this trail"
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
          ]}>
          <Ionicons name="navigate-outline" size={18} color={theme.backgroundElement} />
          <Text style={[styles.primaryButtonText, { color: theme.backgroundElement }]}>
            Directions
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Stat({
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
      <Ionicons name={icon} size={18} color={theme.primary} />
      <Text style={[styles.statLabel, { color: theme.text }]}>{label}</Text>
      <Text style={[styles.statCaption, { color: theme.textSecondary }]}>{caption}</Text>
    </View>
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
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
  },
  artwork: {
    height: 180,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontSize: 64,
  },
  artworkBadges: {
    position: 'absolute',
    left: Spacing.three,
    bottom: Spacing.three,
    flexDirection: 'row',
    gap: Spacing.two,
  },
  seasonBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    justifyContent: 'center',
  },
  seasonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F6F4A',
  },
  titleBlock: {
    gap: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.three,
    borderRadius: Radius.lg,
  },
  stat: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  statLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  statCaption: {
    fontSize: 12,
  },
  summary: {
    lineHeight: 22,
  },
  highlights: {
    gap: Spacing.two,
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.pill,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: 14,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: 14,
    borderRadius: Radius.md,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
