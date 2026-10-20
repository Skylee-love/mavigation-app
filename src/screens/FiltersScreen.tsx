import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { DIFFICULTIES } from '@/data/trails';
import { useTheme } from '@/hooks/use-theme';
import type { ExploreStackParamList } from '@/navigation/types';
import { useFilters } from '@/state/FiltersContext';

type Props = NativeStackScreenProps<ExploreStackParamList, 'Filters'>;

/**
 * Modal screen of the Explore stack.
 *
 * A modal is the classic example of a screen that belongs to a *task*: it
 * takes over the whole screen while the tab bar (or the drawer) stays exactly
 * where it was.
 */
export function FiltersScreen({ navigation }: Props) {
  const theme = useTheme();
  const { difficulty, maxDistanceKm, setDifficulty, setMaxDistanceKm, reset } = useFilters();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <ThemedText type="subtitle">Filters</ThemedText>

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        Difficulty
      </ThemedText>
      <View style={styles.options}>
        <Option
          label="Any difficulty"
          active={difficulty === null}
          onPress={() => setDifficulty(null)}
        />
        {DIFFICULTIES.map((option) => (
          <Option
            key={option}
            label={option}
            active={difficulty === option}
            onPress={() => setDifficulty(option)}
          />
        ))}
      </View>

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        Maximum distance
      </ThemedText>
      <ThemedView style={styles.stepper}>
        <Pressable
          onPress={() => setMaxDistanceKm(Math.max(5, maxDistanceKm - 5))}
          accessibilityRole="button"
          accessibilityLabel="Decrease maximum distance"
          style={({ pressed }) => [
            styles.stepperButton,
            { backgroundColor: theme.backgroundSelected, opacity: pressed ? 0.7 : 1 },
          ]}>
          <Ionicons name="close" size={18} color={theme.text} />
        </Pressable>

        <Text style={[styles.stepperValue, { color: theme.text }]}>{maxDistanceKm} km</Text>

        <Pressable
          onPress={() => setMaxDistanceKm(Math.min(30, maxDistanceKm + 5))}
          accessibilityRole="button"
          accessibilityLabel="Increase maximum distance"
          style={({ pressed }) => [
            styles.stepperButton,
            { backgroundColor: theme.backgroundSelected, opacity: pressed ? 0.7 : 1 },
          ]}>
          <Ionicons name="add" size={18} color={theme.text} />
        </Pressable>
      </ThemedView>

      <View style={styles.actions}>
        <Pressable
          onPress={reset}
          accessibilityRole="button"
          accessibilityLabel="Reset filters"
          style={({ pressed }) => [
            styles.secondaryButton,
            {
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
              opacity: pressed ? 0.8 : 1,
            },
          ]}>
          <Text style={[styles.secondaryButtonText, { color: theme.text }]}>Reset</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Apply filters"
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: theme.primary, opacity: pressed ? 0.85 : 1 },
          ]}>
          <Text style={[styles.primaryButtonText, { color: theme.backgroundElement }]}>Apply</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Option({
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
      accessibilityRole="radio"
      accessibilityState={{ selected: active, checked: active }}
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.option,
        {
          backgroundColor: active ? theme.primarySoft : theme.backgroundElement,
          borderColor: active ? theme.primary : theme.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}>
      <Text style={[styles.optionLabel, { color: active ? theme.primary : theme.text }]}>
        {label}
      </Text>
      {active ? <Ionicons name="checkmark-circle" size={18} color={theme.primary} /> : null}
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
  sectionTitle: {
    marginTop: Spacing.two,
  },
  options: {
    gap: Spacing.two,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.three,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.three,
    borderRadius: Radius.lg,
  },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.three,
  },
  secondaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: Radius.md,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
