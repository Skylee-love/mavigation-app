/**
 * Filter state shared by the Explore screen and the `Filters` modal.
 *
 * Both screens live in the same stack, but keeping the values in a tiny context
 * means the modal can be dismissed and the list keeps the applied filters
 * without introducing a state library.
 */

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { Difficulty } from '@/data/trails';

type FiltersContextValue = {
  /** `null` means "any difficulty". */
  difficulty: Difficulty | null;
  maxDistanceKm: number;
  setDifficulty: (difficulty: Difficulty | null) => void;
  setMaxDistanceKm: (distance: number) => void;
  reset: () => void;
};

const FiltersContext = createContext<FiltersContextValue | null>(null);

const DEFAULT_MAX_DISTANCE = 20;

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [maxDistanceKm, setMaxDistanceKm] = useState(DEFAULT_MAX_DISTANCE);

  const value = useMemo(
    () => ({
      difficulty,
      maxDistanceKm,
      setDifficulty,
      setMaxDistanceKm,
      reset: () => {
        setDifficulty(null);
        setMaxDistanceKm(DEFAULT_MAX_DISTANCE);
      },
    }),
    [difficulty, maxDistanceKm]
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error('useFilters must be used inside a <FiltersProvider>');
  }

  return context;
}
