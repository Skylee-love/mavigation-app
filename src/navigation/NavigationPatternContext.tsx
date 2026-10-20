/**
 * Navigation pattern state.
 *
 * Two pieces of information are tracked:
 *
 * 1. `pattern` — which shell the user picked (bottom tabs or drawer). It is
 *    owned by the provider so that a temporary switcher button can flip it at
 *    runtime without any persistence.
 * 2. `shell` — which shell is *actually rendered right now*. Each navigator
 *    declares it, so the chrome (hamburger button, drawer content) always
 *    matches the navigator that is mounted, even when a shell is mounted
 *    directly (see `rootShells.tsx`).
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type NavigationPattern = 'tabs' | 'drawer';

/**
 * Change this single value to change the pattern the app boots with.
 * (The runtime switcher button overrides it during the demo.)
 */
export const DEFAULT_NAVIGATION_PATTERN: NavigationPattern = 'tabs';

type NavigationPatternContextValue = {
  pattern: NavigationPattern;
  setPattern: (pattern: NavigationPattern) => void;
  togglePattern: () => void;
  /**
   * `false` when a single pattern is mounted structurally (see
   * `rootShells.tsx`). The switcher UI then hides itself instead of
   * promising a switch that cannot happen.
   */
  switchable: boolean;
};

const NavigationPatternContext = createContext<NavigationPatternContextValue | null>(null);

type ProviderProps = {
  children: ReactNode;
  /** Pattern the app starts with. */
  initialPattern?: NavigationPattern;
  /** Whether the runtime switcher is available. */
  switchable?: boolean;
};

export function NavigationPatternProvider({
  children,
  initialPattern = DEFAULT_NAVIGATION_PATTERN,
  switchable = true,
}: ProviderProps) {
  const [pattern, setPattern] = useState<NavigationPattern>(initialPattern);

  const togglePattern = useCallback(() => {
    setPattern((current) => (current === 'tabs' ? 'drawer' : 'tabs'));
  }, []);

  const value = useMemo(
    () => ({ pattern, setPattern, togglePattern, switchable }),
    [pattern, togglePattern, switchable]
  );

  return (
    <NavigationPatternContext.Provider value={value}>{children}</NavigationPatternContext.Provider>
  );
}

/** The pattern the user selected (drives the switcher UI). */
export function useNavigationPattern() {
  const context = useContext(NavigationPatternContext);

  if (!context) {
    throw new Error('useNavigationPattern must be used inside a <NavigationPatternProvider>');
  }

  return context;
}

/* -------------------------------------------------------------------------- */
/* The shell that is currently mounted                                         */
/* -------------------------------------------------------------------------- */

const NavigationShellContext = createContext<NavigationPattern>('tabs');

export function NavigationShellProvider({
  shell,
  children,
}: {
  shell: NavigationPattern;
  children: ReactNode;
}) {
  return (
    <NavigationShellContext.Provider value={shell}>{children}</NavigationShellContext.Provider>
  );
}

/** The shell that is currently rendered (drives the screen chrome). */
export function useNavigationShell() {
  return useContext(NavigationShellContext);
}
