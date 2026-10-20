/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  PATTERN 1 — BOTTOM TAB NAVIGATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Four destinations sit in the tab bar and stay visible at all times:
 *
 *      ┌──────────────────────────────────────────────┐
 *      │  Today  │  Explore  │  Saved  │  Profile    │  ← tab bar
 *      └──────────────────────────────────────────────┘
 *
 *  Every tab owns a stack, so a detail screen is pushed *inside* the tab and
 *  the tab bar stays visible while the user works through the task.
 *
 *  Ergonomics: one tap to change context, thumb-reachable, but limited to
 *  roughly five destinations before the bar becomes unreadable.
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import type { IconName } from '@/components/IconButton';
import { NavigationShellProvider } from '@/navigation/NavigationPatternContext';
import {
  ExploreStackNavigator,
  ProfileStackNavigator,
  SavedStackNavigator,
  TodayStackNavigator,
} from '@/navigation/stacks';
import type { TabParamList } from '@/navigation/types';
import { useSavedTrails } from '@/state/SavedTrailsContext';

const Tab = createBottomTabNavigator<TabParamList>();

/** Icons for the four primary destinations. */
const TAB_ICONS: Record<keyof TabParamList, { active: IconName; inactive: IconName }> = {
  Today: { active: 'sunny', inactive: 'sunny-outline' },
  Explore: { active: 'compass', inactive: 'compass-outline' },
  Saved: { active: 'bookmark', inactive: 'bookmark-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

export function TabNavigator() {
  const theme = useTheme();
  const { savedCount } = useSavedTrails();

  return (
    <NavigationShellProvider shell="tabs">
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // The nested stacks render their own headers.
          headerShown: false,
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: styles.label,
          tabBarStyle: {
            backgroundColor: theme.backgroundElement,
            borderTopColor: theme.border,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? TAB_ICONS[route.name].active : TAB_ICONS[route.name].inactive}
              size={22}
              color={color}
            />
          ),
        })}>
        <Tab.Screen
          name="Today"
          component={TodayStackNavigator}
          options={{ title: 'Today', tabBarAccessibilityLabel: 'Today tab' }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreStackNavigator}
          options={{ title: 'Explore', tabBarAccessibilityLabel: 'Explore tab' }}
        />
        <Tab.Screen
          name="Saved"
          component={SavedStackNavigator}
          options={{
            title: 'Saved',
            tabBarAccessibilityLabel: 'Saved tab',
            // Badge shows how many trails are on the shortlist.
            tabBarBadge: savedCount > 0 ? savedCount : undefined,
            tabBarBadgeStyle: { backgroundColor: theme.accent, color: '#FFFFFF' },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackNavigator}
          options={{ title: 'Profile', tabBarAccessibilityLabel: 'Profile tab' }}
        />
      </Tab.Navigator>
    </NavigationShellProvider>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
});
