import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DifficultyChip } from '@/components/DifficultyChip';
import { Radius, Spacing } from '@/constants/theme';
import type { Trail } from '@/data/trails';
import { useTheme } from '@/hooks/use-theme';
import { useSavedTrails } from '@/state/SavedTrailsContext';

type Props = {
  trail: Trail;
  onPress: () => void;
  /** `rail` is the narrow card used inside the horizontal "nearby" carousel. */
  variant?: 'list' | 'rail';
};

export function TrailCard({ trail, onPress, variant = 'list' }: Props) {
  const theme = useTheme();
  const { isSaved, toggleSaved } = useSavedTrails();
  const saved = isSaved(trail.id);

  if (variant === 'rail') {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${trail.name}, ${trail.difficulty}, ${trail.distanceKm} kilometres`}
        style={({ pressed }) => [
          styles.rail,
          { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.85 : 1 },
        ]}>
        <View style={[styles.railArtwork, { backgroundColor: trail.accent }]}>
          <Text style={styles.railGlyph}>{trail.glyph}</Text>
        </View>
        <View style={styles.railBody}>
          <Text numberOfLines={1} style={[styles.railTitle, { color: theme.text }]}>
            {trail.name}
          </Text>
          <Text style={[styles.railMeta, { color: theme.textSecondary }]}>
            {trail.distanceKm} km · {trail.durationMin} min
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    // The card is a container, not a single button: the bookmark is its own
    // button so the two never nest (invalid markup on web, confusing for
    // screen readers).
    <View
      style={[
        styles.card,
        { backgroundColor: theme.backgroundElement },
      ]}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${trail.name}, ${trail.difficulty}, ${trail.distanceKm} kilometres`}
        style={({ pressed }) => [styles.cardHeader, { opacity: pressed ? 0.7 : 1 }]}>
        <View style={[styles.artwork, { backgroundColor: trail.accent }]}>
          <Text style={styles.glyph}>{trail.glyph}</Text>
        </View>

        <View style={styles.headline}>
          <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>
            {trail.name}
          </Text>
          <Text numberOfLines={1} style={[styles.region, { color: theme.textSecondary }]}>
            {trail.region}
          </Text>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={13} color={theme.accent} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {trail.rating.toFixed(1)} ({trail.reviewCount})
            </Text>
            <Text style={[styles.metaDot, { color: theme.textSecondary }]}>·</Text>
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {trail.distanceKm} km
            </Text>
            <Text style={[styles.metaDot, { color: theme.textSecondary }]}>·</Text>
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {trail.durationMin} min
            </Text>
          </View>
        </View>
      </Pressable>

      <View style={styles.cardFooter}>
        <DifficultyChip difficulty={trail.difficulty} />
        <Pressable
          onPress={() => toggleSaved(trail.id)}
          accessibilityRole="button"
          accessibilityState={{ selected: saved }}
          accessibilityLabel={saved ? `Remove ${trail.name} from saved` : `Save ${trail.name}`}
          hitSlop={8}
          style={styles.saveButton}>
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={saved ? theme.primary : theme.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.three,
    gap: Spacing.three,
    marginBottom: Spacing.three,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  artwork: {
    width: 64,
    height: 64,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontSize: 30,
  },
  headline: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  region: {
    fontSize: 13,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
  },
  metaDot: {
    fontSize: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  saveButton: {
    padding: 6,
  },
  rail: {
    width: 210,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginRight: Spacing.three,
  },
  railArtwork: {
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  railGlyph: {
    fontSize: 38,
  },
  railBody: {
    padding: Spacing.three,
    gap: 2,
  },
  railTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  railMeta: {
    fontSize: 12,
  },
});
