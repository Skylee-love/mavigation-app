/**
 * The two shells of the app.
 *
 * `RootNavigator` renders whichever pattern is currently selected, which is
 * what the runtime switcher uses.
 */

import { useNavigationPattern } from '@/navigation/NavigationPatternContext';
import { DrawerNavigator } from '@/navigation/DrawerNavigator';
import { TabNavigator } from '@/navigation/TabNavigator';

export function RootNavigator() {
  const { pattern } = useNavigationPattern();

  // The key forces a clean remount when the pattern changes, so the new
  // navigator always starts at its initial route.
  return pattern === 'tabs' ? <TabNavigator key="tabs" /> : <DrawerNavigator key="drawer" />;
}
