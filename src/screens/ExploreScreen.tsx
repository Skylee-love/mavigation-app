import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { TrailCard } from '@/components/TrailCard';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { DIFFICULTIES, TRAILS } from '@/data/trails';
import { useTheme } from '@/hooks/use-theme';
import type { ExploreStackParamList } from '@/navigation/types';
import { useFilters } from '@/state/FiltersContext';

type Props = NativeStackScreenProps<ExploreStackParamList, 'ExploreList'>;

/**
 * Search + browse screen.
 *
 * The "Filters" button pushes a *modal* screen on the same stack, which is a
 * good illustration of how a stack works inside either shell: the tab bar (or
 * the drawer) stays where it is while a focused task takes over the screen.
 */
export function ExploreScreen({ navigation }: Props) {
  const theme = useTheme();
  const { difficulty, maxDistanceKm, setDifficulty } = useFilters();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return TRAILS.filter((trail) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        trail.name.toLowerCase().includes(normalizedQuery) ||
        trail.region.toLowerCase().includes(normalizedQuery) ||
        trail.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      const matchesDifficulty = difficulty === null || trail.difficulty === difficulty;
      const matchesDistance = trail.distanceKm <= maxDistanceKm;

      return matchesQuery && matchesDifficulty && matchesDistance;
    });
  }, [difficulty, maxDistanceKm, query]);

  return (
    <FlatList
      style={styles.screen}
      data={results}
      keyExtractor={(trail) => trail.id}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.header}>
          <View style={[styles.search, { backgroundColor: theme.backgroundElement }]}>
            <Ionicons name="search-outline" size={18} color={theme.textSecondary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search trails, parks or towns"
              placeholderTextColor={theme.textSecondary}
              style={[styles.searchInput, { color: theme.text }]}
              accessibilityLabel="Search trails"
              returnKeyType="search"
            />
            {query.length > 0 ? (
              <Pressable
                onPress={() => setQuery('')}
                accessibilityRole="button"
                accessibilityLabel="Clear search"
                hitSlop={8}>
                <Ionicons name="close" size={16} color={theme.textSecondary} />
              </Pressable>
            ) : null}
          </View>

          <View style={styles.chipRow}>
            <FilterChip
              label="All"
              active={difficulty === null}
              onPress={() => setDifficulty(null)}
            />
            {DIFFICULTIES.map((option) => (
              <FilterChip
                key={option}
                label={option}
                active={difficulty === option}
                onPress={() => setDifficulty(option)}
              />
            ))}
          </View>

          <View style={styles.resultsRow}>
            <ThemedText themeColor="textSecondary" type="small" style={styles.resultsText}>
              {results.length} {results.length === 1 ? 'trail' : 'trails'} within{' '}
              {maxDistanceKm} km
            </ThemedText>

            <Pressable
              onPress={() => navigation.navigate('Filters')}
              accessibilityRole="button"
              accessibilityLabel="Open advanced filters"
              style={({ pressed }) => [
                styles.filterButton,
                {
                  backgroundColor: theme.backgroundElement,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}>
              <Ionicons name="options-outline" size={16} color={theme.text} />
              <Text style={[styles.filterLabel, { color: theme.text }]}>Filters</Text>
            </Pressable>
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <TrailCard
          trail={item}
          onPress={() => navigation.navigate('TrailDetail', { trailId: item.id })}
        />
      )}
      ListEmptyComponent={
        <EmptyState
          icon="search-outline"
          title="No trails match"
          description="Try a different search term or relax the filters to see more trails."
        />
      }
    />
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`${label} difficulty filter`}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: active ? theme.primary : theme.backgroundElement,
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      <Text
        style={[
          styles.chipText,
          { color: active ? theme.backgroundElement : theme.textSecondary },
        ]}>
        {label}
      </Text>
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
  },
  header: {
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    height: 46,
    borderRadius: Radius.pill,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radius.pill,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.pill,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  resultsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  resultsText: {
    flex: 1,
  },
});
