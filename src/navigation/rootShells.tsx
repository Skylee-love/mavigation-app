/**
 * Structural entry points.
 *
 * These are complete app shells that mount exactly one navigation pattern.
 * They exist for the *structural* way of demonstrating the assignment: change
 * the root export in `src/App.tsx` from `<SwitchableRoot />` to `<TabsRoot />`
 * or `<DrawerRoot />` and the app boots with that pattern only.
 *
 *   <TabsRoot />    → bottom tab bar   (Pattern 1)
 *   <DrawerRoot />  → hamburger menu   (Pattern 2)
 */

import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DrawerNavigator } from '@/navigation/DrawerNavigator';
import { NavigationPatternProvider } from '@/navigation/NavigationPatternContext';
import { useNavigationTheme } from '@/navigation/navigationTheme';
import { TabNavigator } from '@/navigation/TabNavigator';

function Shell({ children }: { children: React.ReactNode }) {
  const theme = useNavigationTheme();

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme} onReady={() => void SplashScreen.hideAsync()}>
          {children}
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

/** Pattern 1 as a standalone root. */
export function TabsRoot() {
  return (
    <NavigationPatternProvider initialPattern="tabs" switchable={false}>
      <Shell>
        <TabNavigator />
      </Shell>
    </NavigationPatternProvider>
  );
}

/** Pattern 2 as a standalone root. */
export function DrawerRoot() {
  return (
    <NavigationPatternProvider initialPattern="drawer" switchable={false}>
      <Shell>
        <DrawerNavigator />
      </Shell>
    </NavigationPatternProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
