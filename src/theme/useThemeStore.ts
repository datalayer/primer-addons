/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Zustand store for theme preferences – reusable across Datalayer apps.
 *
 * Persists `colorMode` and `theme` to localStorage. The store key is
 * configurable so that different apps can maintain independent prefs.
 *
 * @module theme/useThemeStore
 */

import { create, type StoreApi, type UseBoundStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ThemeVariant } from './themeRegistry';
import { themeConfigs } from './themeRegistry';
import type { ColorMode } from './DatalayerBrandThemeProvider';

export type { ThemeVariant, ColorMode };

export interface ThemeState {
  /** Current color mode (light, dark, or auto = follow OS). */
  colorMode: ColorMode;
  /** Current theme variant. */
  theme: ThemeVariant;
  /** Cycle through light → dark → auto. */
  toggleColorMode: () => void;
  /** Set a specific color mode. */
  setColorMode: (mode: ColorMode) => void;
  /**
   * Set the active theme variant.
   * @param applyDefaultColorMode When true (default), also switches the
   *   color mode to the theme's configured default.
   */
  setTheme: (theme: ThemeVariant, applyDefaultColorMode?: boolean) => void;
}

/**
 * Create a theme store bound to a specific localStorage key.
 *
 * Usage:
 * ```ts
 * export const useMyAppThemeStore = createThemeStore('my-app-theme');
 * ```
 *
 * @param storageKey  localStorage key for persistence (e.g. `'otel-example-theme'`)
 * @param defaults    Optional overrides for the initial colorMode / theme
 */
export function createThemeStore(
  storageKey: string,
  defaults?: { colorMode?: ColorMode; theme?: ThemeVariant },
): UseBoundStore<StoreApi<ThemeState>> {
  return create<ThemeState>()(
    persist(
      set => ({
        colorMode: defaults?.colorMode ?? ('dark' as ColorMode),
        theme: defaults?.theme ?? ('matrix' as ThemeVariant),
        toggleColorMode: () =>
          set(state => {
            const cycle: Record<ColorMode, ColorMode> = {
              light: 'dark',
              dark: 'auto',
              auto: 'light',
            };
            return { colorMode: cycle[state.colorMode] };
          }),
        setColorMode: (mode: ColorMode) => set({ colorMode: mode }),
        setTheme: (theme: ThemeVariant, applyDefaultColorMode = true) =>
          set(() => {
            const next: Partial<ThemeState> = { theme };
            if (applyDefaultColorMode) {
              next.colorMode = themeConfigs[theme].defaultColorMode;
            }
            return next;
          }),
      }),
      {
        name: storageKey,
        storage: createJSONStorage(() => localStorage),
        partialize: state => ({
          colorMode: state.colorMode,
          theme: state.theme,
        }),
      },
    ),
  );
}
