import { StyleSheet, Text, View } from 'react-native';

import { DifficultyTone, type Difficulty } from '@/data/trails';
import { Radius } from '@/constants/theme';

type Props = {
  difficulty: Difficulty;
};

/** Coloured pill that communicates the difficulty of a trail at a glance. */
export function DifficultyChip({ difficulty }: Props) {
  const tone = DifficultyTone[difficulty];

  return (
    <View style={[styles.chip, { backgroundColor: tone.bg }]}>
      <Text style={[styles.label, { color: tone.fg }]}>{difficulty}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
