/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  PATTERN 2 — DRAWER / HAMBURGER MENU
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  The primary destinations live behind a menu button (or an edge swipe):
 *
 *      ┌───────────────┬──────────────────────────────┐
 *      │  Today        │                              │
 *      │  Explore      │      content                 │
 *      │  Saved        │                              │
 *      │  Profile      │                              │
 *      │  ─────────    │                              │
 *      │  Settings     │                              │
 *      │  About        │                              │
 *      └───────────────┴──────────────────────────────┘
 *
 *  The drawer can hold far more destinations than a tab bar, which is why it
 *  is the better fit for secondary and account sections.
 *
 *  Ergonomics: the content area stays completely free, but every context
 *  switch costs two taps (menu → destination) and the user has to discover
 *  the menu in the first place.
 */

import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';

import { CustomDrawerContent } from '@/navigation/CustomDrawerContent';
import { DRAWER_ICONS } from '@/navigation/drawerIcons';
import { NavigationShellProvider } from '@/navigation/NavigationPatternContext';
import {
  AboutLeafStackNavigator,
  ExploreStackNavigator,
  ProfileStackNavigator,
  SavedStackNavigator,
  SettingsLeafStackNavigator,
  TodayStackNavigator,
} from '@/navigation/stacks';
import type { DrawerParamList } from '@/navigation/types';
import { useTheme } from '@/hooks/use-theme';

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerNavigator() {
  const theme = useTheme();

  return (
    <NavigationShellProvider shell="drawer">
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ route }) => ({
          // Each entry renders its own stack, which owns the header.
          headerShown: false,
          drawerType: 'front',
          swipeEdgeWidth: 60,
          drawerActiveTintColor: theme.primary,
          drawerInactiveTintColor: theme.textSecondary,
          drawerActiveBackgroundColor: theme.backgroundSelected,
          drawerInactiveBackgroundColor: 'transparent',
          drawerItemStyle: styles.drawerItem,
          drawerLabelStyle: styles.drawerLabel,
          drawerIcon: ({ color, size }) => (
            <Ionicons name={DRAWER_ICONS[route.name]} size={size} color={color} />
          ),
        })}>
        <Drawer.Screen name="Today" component={TodayStackNavigator} options={{ drawerLabel: 'Today' }} />
        <Drawer.Screen
          name="Explore"
          component={ExploreStackNavigator}
          options={{ drawerLabel: 'Explore' }}
        />
        <Drawer.Screen name="Saved" component={SavedStackNavigator} options={{ drawerLabel: 'Saved' }} />
        <Drawer.Screen
          name="Profile"
          component={ProfileStackNavigator}
          options={{ drawerLabel: 'Profile' }}
        />
        {/* Secondary destinations – the reason a drawer scales better than a tab bar. */}
        <Drawer.Screen
          name="Settings"
          component={SettingsLeafStackNavigator}
          options={{ drawerLabel: 'Settings' }}
        />
        <Drawer.Screen
          name="About"
          component={AboutLeafStackNavigator}
          options={{ drawerLabel: 'About' }}
        />
      </Drawer.Navigator>
    </NavigationShellProvider>
  );
}

const styles = StyleSheet.create({
  drawerItem: {
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 2,
  },
  drawerLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
});
