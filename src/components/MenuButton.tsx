import { DrawerActions, useNavigation } from '@react-navigation/native';

import { IconButton } from '@/components/IconButton';
import { useNavigationShell } from '@/navigation/NavigationPatternContext';

/**
 * Header affordance that opens the drawer.
 *
 * It is only rendered when the drawer shell is the one that is mounted, which
 * keeps the chrome honest: a bottom-tab build never shows a hamburger button.
 */
export function MenuButton() {
  const shell = useNavigationShell();
  const navigation = useNavigation();

  if (shell !== 'drawer') {
    return null;
  }

  return (
    <IconButton
      icon="menu"
      accessibilityLabel="Open navigation menu"
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );
}
