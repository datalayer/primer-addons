/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { type CSSProperties, useEffect, useMemo } from 'react';
import { BaseStyles, ThemeProvider, ThemeProviderProps } from '@primer/react';
import { useSystemColorMode } from './useSystemColorMode';
import { datalayerTheme, datalayerThemeStyles } from './themes/datalayerTheme';
import { setupPrimerPortals, syncPortalThemeStyles } from '../utils/Portals';

/**
 * System sans-serif font stack — shared between `fontFamily` and
 * the Primer `--fontStack-*` CSS custom properties so that
 * components using the CSS `font` shorthand (e.g. `Blankslate`)
 * also pick up the themed typeface.
 */
const SYSTEM_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';

/**
 * Shared typographic rhythm — clean, spacious feel inspired by
 * modern developer-blog aesthetics (generous line-height, open
 * letter-spacing on headings, crisp body text).
 *
 * Primer components like `Blankslate` use the CSS `font` shorthand
 * through `--text-title-shorthand-*` / `--text-body-shorthand-*`.
 * Those shorthand variables reference `--fontStack-sansSerif` (and
 * `--fontStack-sansSerifDisplay`).  If the `@primer/primitives`
 * typography CSS isn't loaded, the shorthand vars are undefined and
 * components fall back to a hardcoded system font stack baked into
 * their CSS.  We define the full set here so **every** theme gets
 * correct font inheritance — no primitives CSS import required.
 */
const typographyVars: CSSProperties = {
  /* ── Font stacks ───────────────────────────────────────────────── */
  '--fontStack-monospace':
    'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
  '--fontStack-sansSerif': SYSTEM_FONT,
  '--fontStack-sansSerifDisplay': SYSTEM_FONT,
  '--fontStack-system': SYSTEM_FONT,

  /* ── Base text weights (from @primer/primitives) ───────────────── */
  '--base-text-weight-light': '300',
  '--base-text-weight-normal': '400',
  '--base-text-weight-medium': '500',
  '--base-text-weight-semibold': '600',

  /* ── Body sizing ───────────────────────────────────────────────── */
  '--text-body-size-large': '1rem',
  '--text-body-size-medium': '0.875rem',
  '--text-body-size-small': '0.75rem',
  '--text-body-lineHeight-large': '1.5',
  '--text-body-lineHeight-medium': '1.4285',
  '--text-body-lineHeight-small': '1.6666',

  /* ── Title sizing ──────────────────────────────────────────────── */
  '--text-title-size-large': '2rem',
  '--text-title-size-medium': '1.25rem',
  '--text-title-size-small': '1rem',
  '--text-title-lineHeight-large': '1.5',
  '--text-title-lineHeight-medium': '1.6',
  '--text-title-lineHeight-small': '1.5',

  /* ── Caption / subtitle / display ──────────────────────────────── */
  '--text-caption-size': '0.75rem',
  '--text-caption-lineHeight': '1.3333',
  '--text-subtitle-size': '1.25rem',
  '--text-subtitle-lineHeight': '1.6',
  '--text-display-size': '2.5rem',
  '--text-display-lineHeight': '1.4',

  /* ── Font shorthand tokens ─────────────────────────────────────── *
   * These are the tokens consumed by Primer components (Blankslate,
   * etc.) via `font: var(--text-title-shorthand-medium, <fallback>)`.
   * Defining them here prevents the hard-coded fallback from firing.
   * Each one references `var(--fontStack-sansSerif)` or
   * `SYSTEM_FONT` directly (no nested `var()`) so that the CSS
   * `font` shorthand parses reliably.  Themes that override fonts
   * (e.g. Matrix monospace) replace these shorthand tokens via
   * `buildThemeStyles({ fontFamily })` in their `themeStyles`.
   * ─────────────────────────────────────────────────────────────── */
  '--text-body-shorthand-large':
    `400 1rem/1.5 ${SYSTEM_FONT}`,
  '--text-body-shorthand-medium':
    `400 0.875rem/1.4285 ${SYSTEM_FONT}`,
  '--text-body-shorthand-small':
    `400 0.75rem/1.6666 ${SYSTEM_FONT}`,
  '--text-title-shorthand-large':
    `600 2rem/1.5 ${SYSTEM_FONT}`,
  '--text-title-shorthand-medium':
    `600 1.25rem/1.6 ${SYSTEM_FONT}`,
  '--text-title-shorthand-small':
    `600 1rem/1.5 ${SYSTEM_FONT}`,
  '--text-caption-shorthand':
    `400 0.75rem/1.3333 ${SYSTEM_FONT}`,
  '--text-subtitle-shorthand':
    `400 1.25rem/1.6 ${SYSTEM_FONT}`,
  '--text-display-shorthand':
    `500 2.5rem/1.4 ${SYSTEM_FONT}`,

  /* ── Custom overrides ──────────────────────────────────────────── */
  '--text-body-lineHeight': '1.7',
  '--text-title-lineHeight': '1.2',
  '--text-title-letterSpacing': '-0.02em',

  fontFamily: SYSTEM_FONT,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textRendering: 'optimizeLegibility',
} as CSSProperties;

export interface IDatalayerThemeProviderProps extends Omit<
  ThemeProviderProps,
  'theme' | 'colorMode'
> {
  /**
   * Color mode to use.
   * - `'light'` / `'dark'` — explicit override
   * - `'auto'` — follow the operating system preference (prefers-color-scheme)
   * - Primer's `'day'` / `'night'` are still accepted.
   */
  colorMode?: 'light' | 'dark' | 'auto' | 'day' | 'night';
  /**
   * Additional base styles merged on top of theme defaults.
   */
  baseStyles?: CSSProperties;
  /**
   * Optional Primer theme object. Defaults to the built-in datalayerTheme
   * (which is the unmodified default Primer theme — all theming is done
   * via CSS custom-property overrides in `themeStyles`).
   */
  theme?: Record<string, any>;
  /**
   * Per-mode CSS-property overrides (background, foreground, and all
   * Primer functional-token CSS custom properties).
   *
   * When provided, these replace the built-in datalayer styles entirely.
   * The `baseStyles` prop is still merged on top.
   *
   * Use the `buildThemeStyles` helper from `./themes/createThemeCSSVars`
   * to generate comprehensive overrides from a `ThemeColorDefs` pair.
   */
  themeStyles?: {
    light: CSSProperties;
    dark: CSSProperties;
  };
}

export function DatalayerThemeProvider(
  props: React.PropsWithChildren<IDatalayerThemeProviderProps>,
): JSX.Element {
  const { children, colorMode, baseStyles, theme, themeStyles, ...rest } =
    props;

  // Resolve 'auto' → actual system preference ('light' or 'dark').
  const systemMode = useSystemColorMode();
  const resolvedColorMode =
    colorMode === 'auto' ? systemMode : (colorMode ?? 'light');

  const isDark = resolvedColorMode === 'dark' || resolvedColorMode === 'night';
  const resolvedTheme = theme ?? datalayerTheme;
  const styles = themeStyles ?? datalayerThemeStyles;
  const resolvedStyles = isDark ? styles.dark : styles.light;

  // The full set of styles that <BaseStyles> receives — we also push
  // these to document.body so Primer portal content inherits theme
  // tokens, fonts, and colors.
  const portalStyles: CSSProperties = useMemo(
    () => ({
      ...typographyVars,
      ...resolvedStyles,
      ...baseStyles,
    }),
    [resolvedStyles, baseStyles],
  );

  // Keep document.body portal-root attributes AND theme styles in sync
  // so that Primer portals (modals, dialogs, overlays) inherit the
  // correct color mode **and** theme tokens (fonts, colors, CSS vars).
  useEffect(() => {
    setupPrimerPortals(resolvedColorMode === 'night' ? 'dark' : resolvedColorMode === 'day' ? 'light' : resolvedColorMode as 'light' | 'dark');
    syncPortalThemeStyles(portalStyles);
  }, [resolvedColorMode, portalStyles]);

  return (
    <ThemeProvider
      colorMode={resolvedColorMode}
      theme={resolvedTheme}
      {...rest}
    >
      <BaseStyles
        style={{
          lineHeight: '1.7',
          transition: 'background-color 0.25s ease, color 0.25s ease',
          ...typographyVars,
          ...resolvedStyles,
          ...baseStyles,
        }}
      >
        {children}
      </BaseStyles>
    </ThemeProvider>
  );
}
