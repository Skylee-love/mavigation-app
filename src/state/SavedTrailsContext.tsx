/**
 * Minimal "saved trails" state.
 *
 * The assignment deliberately avoids persistence and heavy state management, so
 * this is a plain `useState` inside a context. It only exists to show how the
 * same screen can be reused by both navigation patterns.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type SavedTrailsContextValue = {
  savedIds: string[];
  savedCount: number;
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
};

const SavedTrailsContext = createContext<SavedTrailsContextValue | null>(null);

export function SavedTrailsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(['cedar-ridge-loop', 'pine-falls-circuit']);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]
    );
  }, []);

  const value = useMemo(
    () => ({ savedIds, savedCount: savedIds.length, isSaved, toggleSaved }),
    [savedIds, isSaved, toggleSaved]
  );

  return <SavedTrailsContext.Provider value={value}>{children}</SavedTrailsContext.Provider>;
}

export function useSavedTrails() {
  const context = useContext(SavedTrailsContext);

  if (!context) {
    throw new Error('useSavedTrails must be used inside a <SavedTrailsProvider>');
  }

  return context;
}
