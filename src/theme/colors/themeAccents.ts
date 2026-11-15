/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Theme accents – the colour an application names, over any theme.
 *
 * Six soft accents, each with the dark text that sits on it (the lowest
 * contrast of the six is 8.8 to 1), the tint of the stage behind an
 * application, a quiet tint, and the accent as text. They were drawn for
 * the `loop` theme — green, mint, is `loop`'s own — and, since 2026-10-07
 * (decided by the user), they colour every theme: `themeAccentVars` sets
 * Primer's own accent and primary properties, so the filled button, links,
 * the accent tokens and a selected tab take the accent whatever theme an
 * application wears.
 */

import type { ThemeColorDefs } from '../css/createThemeCSSVars';

/** The accents an application may take, by name. */
export type ThemeAccentName = 'green' | 'rose' | 'sky' | 'lime' | 'sun' | 'violet';

/** An accent: its values, in light and in dark. */
export interface ThemeAccent {
  /** The accent itself: a bubble, a send button. The same in both modes. */
  accent: string;
  /** The text that sits on the accent. */
  on: string;
  /** The stage behind an application. */
  stage: { light: string; dark: string };
  /** A quiet tint: a draft, something waiting. */
  quiet: { light: string; dark: string };
  /**
   * The accent as text: a link, a starter, an accent's word — deep enough on
   * white (4.5 to 1), and the pastel itself on dark.
   */
  text: { light: string; dark: string };
}

/** The six accents. One per application; everything else is the theme's. Green — mint — is `loop`'s own. */
export const themeAccents: Record<ThemeAccentName, ThemeAccent> = {
  green: {
    accent: '#7ADBB8',
    on: '#06281E',
    stage: { light: '#DDF5EC', dark: '#10261F' },
    quiet: { light: '#F0FAF6', dark: '#17211D' },
    text: { light: '#248462', dark: '#8FE5C6' },
  },
  rose: {
    accent: '#F6A5C1',
    on: '#3A0A1C',
    stage: { light: '#FCE3EC', dark: '#2B141C' },
    quiet: { light: '#FDF2F6', dark: '#22181C' },
    text: { light: '#B83A6B', dark: '#F6A5C1' },
  },
  sky: {
    accent: '#8CCBF9',
    on: '#06243B',
    stage: { light: '#DFF0FD', dark: '#0F2333' },
    quiet: { light: '#F0F8FE', dark: '#161E25' },
    text: { light: '#1F6FB0', dark: '#8CCBF9' },
  },
  lime: {
    accent: '#BEDC55',
    on: '#1F2A00',
    stage: { light: '#EEF6CC', dark: '#1E2609' },
    quiet: { light: '#F7FBE6', dark: '#1C2014' },
    text: { light: '#5F7A00', dark: '#BEDC55' },
  },
  sun: {
    accent: '#F8D469',
    on: '#2E2200',
    stage: { light: '#FDF3CD', dark: '#2A2209' },
    quiet: { light: '#FEF9E7', dark: '#221F14' },
    text: { light: '#8A6A00', dark: '#F8D469' },
  },
  violet: {
    accent: '#C0AEF6',
    on: '#1C0F47',
    stage: { light: '#ECE7FD', dark: '#1B1533' },
    quiet: { light: '#F6F3FE', dark: '#1C1A27' },
    text: { light: '#6B53C9', dark: '#C0AEF6' },
  },
};

/** The names of the accents, in the order a picker shows them. */
export const themeAccentNames: ThemeAccentName[] = ['green', 'rose', 'sky', 'lime', 'sun', 'violet'];

/**
 * The stage, lit: a soft fall from the stage tint at the top to the quiet
 * tint at the bottom, for the page an application sits on. Written with the
 * colours themselves, not with `var(--theme-stage)`: a custom property is
 * resolved where it is set, so a gradient inherited from the theme's root
 * would keep the theme's tints under an application's own.
 */
export function themeStageGradient(stage: string, quiet: string): string {
  return `radial-gradient(140% 100% at 50% 0%, ${stage} 0%, ${quiet} 100%)`;
}

/**
 * The accent's own custom properties, which every theme sets (its default
 * from its colours, `themeTintVars`) and an application's accent replaces:
 * the accent, the text on it, the stage, the quiet tint and the stage lit.
 */
export function themeAccentTints(
  accent: Pick<ThemeAccent, 'accent' | 'on'> & { stage: string; quiet: string },
): Record<string, string> {
  return {
    '--theme-accent': accent.accent,
    '--theme-accent-on': accent.on,
    '--theme-stage': accent.stage,
    '--theme-quiet': accent.quiet,
    '--theme-stage-gradient': themeStageGradient(accent.stage, accent.quiet),
  };
}

/**
 * A theme's default accent properties, from its own colours: its accent
 * fill and the text of its filled button, the accent's subtle tint as the
 * stage, the subtle canvas as the quiet tint.
 */
export function themeTintVars(defs: ThemeColorDefs): Record<string, string> {
  return themeAccentTints({
    accent: defs.accent.emphasis,
    on: defs.btn.primary.text,
    stage: defs.accent.subtle ?? defs.canvas.subtle ?? defs.canvas.default,
    quiet: defs.canvas.subtle ?? defs.canvas.default,
  });
}

/**
 * An application's accent as everything it colours, over any theme (LOOP
 * T-05, T-30): the accent's own properties (`--theme-accent`,
 * `--theme-accent-on`, `--theme-stage`, `--theme-quiet`,
 * `--theme-stage-gradient`), and Primer's — the accent fill, text, links,
 * muted border and tint, the filled button, a checked switch, a selected
 * tab — so that nothing on its page keeps the theme's default accent beside
 * its own (T-18). The theme's focus ring is kept: it is drawn to show around
 * every accent (T-15). Set on an application's root, it wears its own
 * colour; the page around keeps the theme's.
 *
 * An unknown name is refused.
 */
export function themeAccentVars(
  name: ThemeAccentName,
  mode: 'light' | 'dark' = 'light',
): Record<string, string> {
  const accent = themeAccents[name];
  if (!accent) {
    throw new Error(
      `There is no accent "${name}"; the accents are ${themeAccentNames.join(', ')}.`,
    );
  }
  return {
    ...themeAccentTints({
      accent: accent.accent,
      on: accent.on,
      stage: accent.stage[mode],
      quiet: accent.quiet[mode],
    }),
    '--bgColor-accent-emphasis': accent.accent,
    '--borderColor-accent-emphasis': accent.accent,
    '--fgColor-accent': accent.text[mode],
    '--fgColor-link': accent.text[mode],
    '--borderColor-accent-muted': accent.accent,
    '--bgColor-accent-muted': accent.quiet[mode],
    '--underlineNav-borderColor-active': accent.accent,
    '--button-primary-bgColor-rest': accent.accent,
    '--button-primary-borderColor-rest': accent.accent,
    '--button-primary-bgColor-hover': accent.accent,
    '--button-primary-borderColor-hover': accent.accent,
    '--button-primary-bgColor-active': accent.accent,
    '--button-primary-borderColor-active': accent.accent,
    '--button-primary-fgColor-rest': accent.on,
    '--button-primary-iconColor-rest': accent.on,
    '--buttonCounter-primary-fgColor-rest': accent.on,
    '--color-btn-primary-bg': accent.accent,
    '--color-btn-primary-hover-bg': accent.accent,
    '--control-checked-bgColor-rest': accent.accent,
    '--control-checked-bgColor-hover': accent.accent,
    '--control-checked-bgColor-active': accent.accent,
    '--control-checked-fgColor-rest': accent.on,
    '--controlKnob-borderColor-checked': accent.accent,
    '--datalayer-icon-fg': accent.text[mode],
  };
}
