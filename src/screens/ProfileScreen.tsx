import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PatternChooser } from '@/components/PatternChooser';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useRootNavigation } from '@/navigation/useRootNavigation';
import type { ProfileStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

export function ProfileScreen({ navigation }: Props) {
  const theme = useTheme();
  const rootNavigation = useRootNavigation();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.identity}>
        <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
          <Text style={styles.avatarText}>AR</Text>
        </View>
        <View style={styles.identityText}>
          <ThemedText type="subtitle">Alex Rivera</ThemedText>
          <ThemedText themeColor="textSecondary">@alex.r · Portland, OR</ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.stats}>
        <ProfileStat value="24" label="Trails" />
        <ProfileStat value="8" label="Saved" />
        <ProfileStat value="3" label="Regions" />
      </ThemedView>

      <ThemedText type="smallBold">Navigation pattern</ThemedText>
      <ThemedText themeColor="textSecondary" type="small" style={styles.hint}>
        The same screens, wrapped in two different shells. Switch and compare how
        each one feels.
      </ThemedText>
      <PatternChooser />

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        Your account
      </ThemedText>
      <ThemedView style={styles.menu}>
        <MenuRow
          icon="bookmark-outline"
          label="Saved trails"
          hint="Shortlist for your next trip"
          onPress={() => rootNavigation.navigate('Saved')}
        />
        <MenuRow
          icon="settings-outline"
          label="Settings"
          hint="Units, notifications and navigation"
          onPress={() => navigation.navigate('Settings')}
        />
        <MenuRow
          icon="information-circle-outline"
          label="About Trailhead"
          hint="How the two patterns compare"
          onPress={() => navigation.navigate('About')}
          last
        />
      </ThemedView>
    </ScrollView>
  );
}

function ProfileStat({ value, label }: { value: string; label: string }) {
  const theme = useTheme();

  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</Text>
    </View>
  );
}

function MenuRow({
  icon,
  label,
  hint,
  onPress,
  last,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  hint: string;
  onPress: () => void;
  last?: boolean;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}. ${hint}`}
      style={({ pressed }) => [
        styles.menuRow,
        !last && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border },
        { opacity: pressed ? 0.7 : 1 },
      ]}>
      <View style={[styles.menuIcon, { backgroundColor: theme.backgroundSelected }]}>
        <Ionicons name={icon} size={18} color={theme.primary} />
      </View>
      <View style={styles.menuText}>
        <ThemedText type="smallBold">{label}</ThemedText>
        <ThemedText themeColor="textSecondary" type="small">
          {hint}
        </ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
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
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  identityText: {
    gap: 2,
  },
  stats: {
    flexDirection: 'row',
    paddingVertical: Spacing.three,
    borderRadius: Radius.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
  },
  hint: {
    marginTop: -Spacing.two,
  },
  sectionTitle: {
    marginTop: Spacing.two,
  },
  menu: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
    gap: 2,
  },
});
