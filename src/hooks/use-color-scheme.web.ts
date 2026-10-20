import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the
 * client side for web.
 *
 * `useSyncExternalStore` is used instead of a `useEffect` + `useState` pair so
 * that the hydration state is derived, never set inside an effect.
 */
const subscribe = () => () => {};

export function useColorScheme() {
  const colorScheme = useRNColorScheme();
  const hasHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
