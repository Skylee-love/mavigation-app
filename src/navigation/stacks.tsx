/**
 * The stacks that are shared by *both* navigation patterns.
 *
 * These stacks are the reason the assignment works so neatly: the tab bar and
 * the drawer are only different *shells*. They mount exactly the same screens
 * with exactly the same relationships, so the only thing that changes between
 * the two demos is where the primary destinations live and how the user
 * reaches them.
 *
 *   TodayStack     TodayHome  → TrailDetail
 *   ExploreStack   ExploreList → TrailDetail → Filters (modal)
 *   SavedStack     SavedList  → TrailDetail
 *   ProfileStack   ProfileHome → Settings → About
 */

import { createNativeStackNavigator, type NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { MenuButton } from '@/components/MenuButton';
import { PatternSwitchButton } from '@/components/PatternSwitchButton';
import { useTheme } from '@/hooks/use-theme';
import { AboutScreen } from '@/screens/AboutScreen';
import { ExploreScreen } from '@/screens/ExploreScreen';
import { FiltersScreen } from '@/screens/FiltersScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { SavedScreen } from '@/screens/SavedScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { TodayScreen } from '@/screens/TodayScreen';
import { TrailDetailScreen } from '@/screens/TrailDetailScreen';
import type {
  ExploreStackParamList,
  ProfileStackParamList,
  SavedStackParamList,
  TodayStackParamList,
} from '@/navigation/types';

/**
 * Header configuration shared by every stack.
 *
 * `headerRight` holds the temporary pattern switcher, so the reviewer can jump
 * between both patterns from any screen.
 */
function useStackScreenOptions(): NativeStackNavigationOptions {
  const theme = useTheme();

  return {
    headerStyle: { backgroundColor: theme.background },
    headerTintColor: theme.text,
    headerTitleStyle: { fontWeight: '700' },
    headerShadowVisible: false,
    headerBackButtonDisplayMode: 'minimal',
    contentStyle: { backgroundColor: theme.background },
    headerRight: () => <PatternSwitchButton />,
  };
}

const TodayStack = createNativeStackNavigator<TodayStackParamList>();

export function TodayStackNavigator() {
  const screenOptions = useStackScreenOptions();

  return (
    <TodayStack.Navigator screenOptions={screenOptions}>
      <TodayStack.Screen
        name="TodayHome"
        component={TodayScreen}
        options={{ title: 'Today', headerLeft: () => <MenuButton /> }}
      />
      <TodayStack.Screen name="TrailDetail" component={TrailDetailScreen} />
    </TodayStack.Navigator>
  );
}

const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

export function ExploreStackNavigator() {
  const screenOptions = useStackScreenOptions();

  return (
    <ExploreStack.Navigator screenOptions={screenOptions}>
      <ExploreStack.Screen
        name="ExploreList"
        component={ExploreScreen}
        options={{ title: 'Explore', headerLeft: () => <MenuButton /> }}
      />
      <ExploreStack.Screen name="TrailDetail" component={TrailDetailScreen} />
      <ExploreStack.Screen
        name="Filters"
        component={FiltersScreen}
        options={{ title: 'Filters', presentation: 'modal' }}
      />
    </ExploreStack.Navigator>
  );
}

const SavedStack = createNativeStackNavigator<SavedStackParamList>();

export function SavedStackNavigator() {
  const screenOptions = useStackScreenOptions();

  return (
    <SavedStack.Navigator screenOptions={screenOptions}>
      <SavedStack.Screen
        name="SavedList"
        component={SavedScreen}
        options={{ title: 'Saved', headerLeft: () => <MenuButton /> }}
      />
      <SavedStack.Screen name="TrailDetail" component={TrailDetailScreen} />
    </SavedStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStackNavigator() {
  const screenOptions = useStackScreenOptions();

  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      <ProfileStack.Screen
        name="ProfileHome"
        component={ProfileScreen}
        options={{ title: 'Profile', headerLeft: () => <MenuButton /> }}
      />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <ProfileStack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
    </ProfileStack.Navigator>
  );
}

/* -------------------------------------------------------------------------- */
/* Leaf stacks for the extra drawer destinations                                */
/* -------------------------------------------------------------------------- */

/**
 * The drawer adds two destinations that the tab bar cannot afford: Settings
 * and About. They get their own (single screen) stack so they still show a
 * proper header with a back button and the hamburger menu.
 */

const SettingsLeafStack = createNativeStackNavigator<{ SettingsLeaf: undefined }>();

export function SettingsLeafStackNavigator() {
  const screenOptions = useStackScreenOptions();

  return (
    <SettingsLeafStack.Navigator screenOptions={screenOptions}>
      <SettingsLeafStack.Screen
        name="SettingsLeaf"
        component={SettingsScreen}
        options={{ title: 'Settings', headerLeft: () => <MenuButton /> }}
      />
    </SettingsLeafStack.Navigator>
  );
}

const AboutLeafStack = createNativeStackNavigator<{ AboutLeaf: undefined }>();

export function AboutLeafStackNavigator() {
  const screenOptions = useStackScreenOptions();

  return (
    <AboutLeafStack.Navigator screenOptions={screenOptions}>
      <AboutLeafStack.Screen
        name="AboutLeaf"
        component={AboutScreen}
        options={{ title: 'About', headerLeft: () => <MenuButton /> }}
      />
    </AboutLeafStack.Navigator>
  );
}
