import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { PatternChooser } from '@/components/PatternChooser';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Settings screen.
 *
 * It is reachable from the Profile stack (bottom tabs build) *and* directly
 * from the drawer (drawer build) – the same component is reused in both
 * patterns. Everything on this screen is local state on purpose: the
 * assignment is about navigation, not persistence.
 */
export function SettingsScreen() {
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [trailAlerts, setTrailAlerts] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(false);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <ThemedText type="smallBold">Navigation</ThemedText>
      <ThemedText themeColor="textSecondary" type="small" style={styles.hint}>
        Bottom tabs keep the four main destinations one tap away. The drawer hides
        them behind a menu button and leaves room for secondary destinations.
      </ThemedText>
      <PatternChooser />

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        Units
      </ThemedText>
      <ThemedView style={styles.segment}>
        <Segment
          label="Metric (km)"
          active={units === 'metric'}
          onPress={() => setUnits('metric')}
        />
        <Segment
          label="Imperial (mi)"
          active={units === 'imperial'}
          onPress={() => setUnits('imperial')}
        />
      </ThemedView>

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        Notifications
      </ThemedText>
      <ThemedView style={styles.list}>
        <ToggleRow
          label="Trail condition alerts"
          hint="When a saved trail changes status"
          value={trailAlerts}
          onValueChange={setTrailAlerts}
        />
        <ToggleRow
          label="Weather warnings"
          hint="Rain, wind and wildfire notices"
          value={weatherAlerts}
          onValueChange={setWeatherAlerts}
          last
        />
      </ThemedView>

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        Appearance
      </ThemedText>
      <ThemedView style={styles.list}>
        <InfoRow label="Theme" value="Follows system" icon="sparkles-outline" />
        <InfoRow label="Version" value="1.0.0" icon="information-circle-outline" last />
      </ThemedView>
    </ScrollView>
  );
}

function Segment({
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
      accessibilityLabel={`${label} units`}
      style={({ pressed }) => [
        styles.segmentItem,
        {
          backgroundColor: active ? theme.primary : 'transparent',
          opacity: pressed ? 0.8 : 1,
        },
      ]}>
      <Text
        style={[
          styles.segmentLabel,
          { color: active ? theme.backgroundElement : theme.textSecondary },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

function ToggleRow({
  label,
  hint,
  value,
  onValueChange,
  last,
}: {
  label: string;
  hint: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  last?: boolean;
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.row,
        !last && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border },
      ]}>
      <View style={styles.rowText}>
        <ThemedText type="smallBold">{label}</ThemedText>
        <ThemedText themeColor="textSecondary" type="small">
          {hint}
        </ThemedText>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        accessibilityLabel={label}
        trackColor={{ true: theme.primary, false: theme.border }}
        thumbColor={theme.backgroundElement}
      />
    </View>
  );
}

function InfoRow({
  label,
  value,
  icon,
  last,
}: {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  last?: boolean;
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.row,
        !last && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border },
      ]}>
      <View style={[styles.rowIcon, { backgroundColor: theme.backgroundSelected }]}>
        <Ionicons name={icon} size={16} color={theme.primary} />
      </View>
      <View style={styles.rowText}>
        <ThemedText type="smallBold">{label}</ThemedText>
      </View>
      <Text style={[styles.rowValue, { color: theme.textSecondary }]}>{value}</Text>
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
  title: {
    fontSize: 24,
    lineHeight: 30,
  },
  hint: {
    marginTop: -Spacing.two,
  },
  sectionTitle: {
    marginTop: Spacing.two,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: 'rgba(128,128,128,0.12)',
    borderRadius: Radius.md,
    padding: 4,
    gap: 4,
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: Radius.sm,
  },
  segmentLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  list: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowValue: {
    fontSize: 14,
  },
});
