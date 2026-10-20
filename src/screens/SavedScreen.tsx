import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { TrailCard } from '@/components/TrailCard';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { TRAILS } from '@/data/trails';
import type { SavedStackParamList } from '@/navigation/types';
import { useSavedTrails } from '@/state/SavedTrailsContext';

type Props = NativeStackScreenProps<SavedStackParamList, 'SavedList'>;

export function SavedScreen({ navigation }: Props) {
  const { savedIds } = useSavedTrails();
  const savedTrails = TRAILS.filter((trail) => savedIds.includes(trail.id));

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <ThemedText themeColor="textSecondary" style={styles.subtitle}>
        {savedTrails.length === 0
          ? 'Nothing saved yet'
          : `${savedTrails.length} trail${savedTrails.length === 1 ? '' : 's'} on your shortlist`}
      </ThemedText>

      {savedTrails.length === 0 ? (
        <EmptyState
          icon="bookmark-outline"
          title="Your shortlist is empty"
          description="Tap the bookmark on any trail to keep it here for your next trip."
        />
      ) : (
        savedTrails.map((trail) => (
          <TrailCard
            key={trail.id}
            trail={trail}
            onPress={() => navigation.navigate('TrailDetail', { trailId: trail.id })}
          />
        ))
      )}
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
  },
  subtitle: {
    marginBottom: Spacing.three,
  },
});
