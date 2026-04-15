/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Zustand store for theme preferences – reusable across Datalayer apps.
 *
 * Persists `colorMode` and `theme` to localStorage.  The store key is
 * configurable so that different apps can maintain independent prefs.
 *
 * ## Variants
 *
 * A *variant* is a named set of theme/colorMode defaults (e.g. `anonymous`,
 * `authenticated`).  When a variant is active, `setTheme`, `setColorMode`,
 * and `toggleColorMode` automatically update the active variant's stored
 * preferences.  Calling `setVariant(name)` switches theme/colorMode to
 * that variant's prefs in one step.
 *
 * Variants can be registered at build time (via defaults) or at runtime
 * (via `registerVariants`).  `registerVariants` only sets defaults for
 * variants that don't already exist, preserving user-customised prefs
 * across page loads.
 *
 * @module theme/useThemeStore
 */

import { create, type StoreApi, type UseBoundStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ThemeVariant } from './themeRegistry';
import { themeConfigs } from './themeRegistry';
import type { ColorMode } from './DatalayerBrandThemeProvider';

/** Per-variant theme + colorMode preferences. */
export type VariantDefaults = Record<string, { theme: ThemeVariant; colorMode: ColorMode }>;

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

  /* ── Variant support ─────────────────────────────────────────── */

  /** The currently active variant (`null` when no variant is active). */
  activeVariant: string | null;
  /** Per-variant stored preferences. */
  variants: VariantDefaults;
  /**
   * Register variant definitions.  Only sets defaults for variants that
   * don't already exist — existing (possibly user-customised) variants
   * are preserved.
   */
  registerVariants: (defs: VariantDefaults) => void;
  /**
   * Activate a named variant.  Sets `theme` / `colorMode` to the
   * variant's stored prefs in one step.
   */
  setVariant: (variant: string) => void;
}

/* ── Helpers ─────────────────────────────────────────────────────── */

const colorModeCycle: Record<ColorMode, ColorMode> = {
  light: 'dark',
  dark: 'auto',
  auto: 'light',
};

/**
 * Create a theme store bound to a specific localStorage key.
 *
 * Usage:
 * ```ts
 * export const useMyAppThemeStore = createThemeStore('my-app-theme');
 * ```
 *
 * @param storageKey  localStorage key for persistence (e.g. `'otel-example-theme'`)
 * @param defaults    Optional overrides for the initial colorMode / theme / variants
 */
export function createThemeStore(
  storageKey: string,
  defaults?: {
    colorMode?: ColorMode;
    theme?: ThemeVariant;
    variants?: VariantDefaults;
  },
): UseBoundStore<StoreApi<ThemeState>> {
  return create<ThemeState>()(
    persist(
      set => ({
        colorMode: defaults?.colorMode ?? ('dark' as ColorMode),
        theme: defaults?.theme ?? ('matrix' as ThemeVariant),

        /* ── variant state ──────────────────────────────────── */
        activeVariant: null,
        variants: defaults?.variants ?? {},

        /* ── actions ────────────────────────────────────────── */

        toggleColorMode: () =>
          set(state => {
            const next = colorModeCycle[state.colorMode];
            if (state.activeVariant && state.variants[state.activeVariant]) {
              return {
                colorMode: next,
                variants: {
                  ...state.variants,
                  [state.activeVariant]: { ...state.variants[state.activeVariant], colorMode: next },
                },
              };
            }
            return { colorMode: next };
          }),

        setColorMode: (mode: ColorMode) =>
          set(state => {
            if (state.activeVariant && state.variants[state.activeVariant]) {
              return {
                colorMode: mode,
                variants: {
                  ...state.variants,
                  [state.activeVariant]: { ...state.variants[state.activeVariant], colorMode: mode },
                },
              };
            }
            return { colorMode: mode };
          }),

        setTheme: (theme: ThemeVariant, applyDefaultColorMode = true) =>
          set(state => {
            const nextColorMode = applyDefaultColorMode
              ? themeConfigs[theme].defaultColorMode
              : state.colorMode;
            if (state.activeVariant && state.variants[state.activeVariant]) {
              return {
                theme,
                colorMode: nextColorMode,
                variants: {
                  ...state.variants,
                  [state.activeVariant]: { theme, colorMode: nextColorMode },
                },
              };
            }
            return { theme, colorMode: nextColorMode };
          }),

        registerVariants: (defs: VariantDefaults) =>
          set(state => {
            const merged = { ...state.variants };
            for (const [key, val] of Object.entries(defs)) {
              if (!merged[key]) {
                merged[key] = val;
              }
            }
            return { variants: merged };
          }),

        setVariant: (variant: string) =>
          set(state => {
            const v = state.variants[variant];
            if (!v) {
              if (variant === 'agent-anonymous') {
                return {
                  activeVariant: variant,
                  theme: 'earth',
                  colorMode: state.colorMode || 'auto',
                };
              }
              return { activeVariant: variant };
            }
            return {
              activeVariant: variant,
              theme: v.theme,
              colorMode: v.colorMode,
            };
          }),
      }),
      {
        name: storageKey,
        version: 2,
        storage: createJSONStorage(() => localStorage),
        partialize: state => ({
          colorMode: state.colorMode,
          theme: state.theme,
          activeVariant: state.activeVariant,
          variants: state.variants,
        }),
        /**
         * Migration: when `version` is missing or differs from the current
         * value the persisted state is discarded and the store starts fresh
         * from code-defined defaults.
         */
        migrate: () => ({}),
        /**
         * Deep-merge variants during hydration so that:
         *  - Code-defined variants (from defaults or registerVariants) are
         *    always present even when localStorage has an older snapshot.
         *  - Per-variant prefs that the user customised (persisted) win over
         *    code defaults for each variant key.
         */
        merge: (persisted, current) => {
          const p = (persisted ?? {}) as Partial<ThemeState>;
          // Build merged variants: start from code-defined, then overlay
          // any persisted variant whose prefs differ (user customisations).
          const mergedVariants = { ...current.variants };
          if (p.variants) {
            for (const [key, val] of Object.entries(p.variants)) {
              if (val && typeof val === 'object' && 'theme' in val) {
                mergedVariants[key] = val;
              }
            }
          }
          return {
            ...current,
            ...p,
            variants: mergedVariants,
          };
        },
      },
    ),
  );
}

/**
 * Default theme store for Datalayer applications.
 *
 * Persists to `localStorage` under the key `'datalayer-theme'`.
 * Use `createThemeStore` if you need an app-specific key or defaults.
 */
export const useThemeStore = createThemeStore('datalayer-theme', {
  colorMode: 'dark',
  theme: 'matrix',
});
