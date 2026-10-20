import { useNavigation, type NavigationProp } from '@react-navigation/native';

import type { RootShellParamList } from '@/navigation/types';

/**
 * Navigation prop that reaches the *shell* (bottom tabs or drawer).
 *
 * The hook returns the navigation object of the closest stack, but typed
 * against the shell routes. `navigate('Explore')` cannot be resolved by the
 * current stack, so React Navigation bubbles the action up to the tab or
 * drawer navigator — which means the exact same call works in both patterns.
 */
export function useRootNavigation() {
  return useNavigation<NavigationProp<RootShellParamList>>();
}
