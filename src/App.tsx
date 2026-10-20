import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationPatternProvider, useNavigationPattern } from '@/navigation/NavigationPatternContext';
import { useNavigationTheme } from '@/navigation/navigationTheme';
import { RootNavigator } from '@/navigation/RootNavigator';
import { FiltersProvider } from '@/state/FiltersContext';
import { SavedTrailsProvider } from '@/state/SavedTrailsContext';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NAVIGATION PATTERN
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  This app demonstrates the same screens inside two navigation patterns:
 *
 *    Pattern 1  ·  Bottom tab bar   →  <TabNavigator />
 *    Pattern 2  ·  Hamburger menu   →  <DrawerNavigator />
 *
 *  The default export below mounts the *runtime switcher*, so both patterns
 *  can be compared on a single device (the button in the header).
 *
 *  To demonstrate a single pattern instead, swap <SwitchableRoot /> for one
 *  of the structural roots exported by `@/navigation/rootShells`:
 *
 *    import { TabsRoot }   from '@/navigation/rootShells';  → <TabsRoot />
 *    import { DrawerRoot } from '@/navigation/rootShells';  → <DrawerRoot />
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Keep the splash screen visible until the first navigation frame is ready.
SplashScreen.preventAutoHideAsync().catch(() => {
  // `preventAutoHideAsync` can reject on web – ignoring it keeps the app booting.
});

function SwitchableRoot() {
  const { pattern } = useNavigationPattern();
  const theme = useNavigationTheme();

  return (
    // The key remounts the container when the pattern changes, so the new
    // navigator starts from its initial route instead of restoring stale state.
    <NavigationContainer key={pattern} theme={theme} onReady={() => void SplashScreen.hideAsync()}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  const theme = useNavigationTheme();

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <SavedTrailsProvider>
          <FiltersProvider>
            <NavigationPatternProvider>
              <StatusBar style={theme.dark ? 'light' : 'dark'} />
              <SwitchableRoot />
            </NavigationPatternProvider>
          </FiltersProvider>
        </SavedTrailsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
