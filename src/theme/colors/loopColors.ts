/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Loop Color System – one accent, neutral everything else.
 *
 * The look of an application built in LOOP: a white (or near-black)
 * canvas, near-black (or near-white) text, hairlines instead of borders,
 * and a single soft accent that dark text sits on. Nothing else carries
 * colour, apart from the three colours of a verdict.
 *
 * The accent of the theme itself is mint — a soft green, lighter than
 * the platform's (decided 2026-10-03, after a day on sky). An
 * application may take one of five others (`loopAccents`); each is four
 * values: the accent, the text that sits
 * on it, the tint of the stage behind an application, and a quiet tint.
 * Dark text on every accent: the lowest contrast of the six is 8.8 to 1.
 */
export const loopColors = {
  // Core neutrals
  black: '#131314', // Near-black — primary dark background
  gray: '#6E6E73',  // Secondary text on light: a soft grey, 5.1 to 1 on white
  white: '#FFFFFF', // White — primary light background

  // Neutral surfaces and ink. The ink is not black: a deep grey with a
  // breath of blue, as a page of a well-set book reads — 16.8 to 1 on white.
  ink: '#1D1D1F',        // Text on light
  inkDark: '#F5F5F7',    // Text on dark
  subtle: '#F5F5F7',     // Subtle surface on light (a bubble, a chip)
  subtleDark: '#1E1E20', // Subtle surface on dark
  grayDark: '#A1A1A6',   // Secondary text on dark

  // Loop palette (Brand) — mint
  loopBrand: '#7ADBB8',  // The accent — a bubble, a send button, a swatch
  loopOn: '#06281E',     // Text that sits on the accent (9.5 to 1)
  loopAccent: '#4FC79C', // Deeper accent — charts, highlights
  loopBrandHover: '#6CCFAA', // The filled button, hovered: dark text 8.4 to 1
  loopText: '#248462',   // Accent text & links on white: the lightest mint that reads, 4.6 to 1
  loopRing: '#0F6B4F',   // The focus ring: 3 to 1 or more around every pastel
  loopTint: '#F0FAF6',   // Quiet tint — a draft, a callout
  loopStage: '#DDF5EC',  // The stage behind an application
  loopBright: '#8FE5C6', // Accent text & links on dark
  loopHover: '#227C5C',  // Accent text hover

  // The stage and the quiet tint, on dark
  loopStageDark: '#10261F',
  loopTintDark: '#17211D',

  // Semantic roles — kept for verdicts and rules only
  successBrand: '#1F8A5B',
  successAccent: '#58C797',
  successTint: '#E4F5EC',
  attentionBrand: '#A66A12',
  attentionAccent: '#E0A54A',
  attentionTint: '#FBF0DC',
  dangerBrand: '#BF3F38',
  dangerAccent: '#F08A83',
  dangerTint: '#FBE7E5',
  severeBrand: '#B4571A',
  severeAccent: '#E8935A',
  severeTint: '#FBEADD',
  doneBrand: '#6B53C9',
  doneAccent: '#C0AEF6',
  doneTint: '#F6F3FE',

  // Bright colours for SVG illustrations — the six accents themselves
  brightGlow: '#7ADBB8',  // Mint — the accent
  brightPop: '#8CCBF9',   // Sky
  brightSpark: '#BEDC55', // Lime
  brightBlaze: '#F6A5C1', // Rose
  brightSurge: '#C0AEF6', // Violet
  brightFlame: '#F4A261', // Soft orange
  brightGold: '#F8D469',  // Sun

  // The same, deeper, for light backgrounds
  brightLightGlow: '#0F6B4F',  // Deep green
  brightLightPop: '#1F6FB0',   // Deep sky
  brightLightSpark: '#5F7A00', // Deep lime
  brightLightBlaze: '#B83A6B', // Deep rose
  brightLightSurge: '#6B53C9', // Deep violet
  brightLightFlame: '#B4571A', // Deep orange
  brightLightGold: '#8A6A00',  // Deep sun
};

/** The accents an application may take, by name. */
export type LoopAccentName = 'green' | 'rose' | 'sky' | 'lime' | 'sun' | 'violet';

/** An accent: four values, in light and in dark. */
export interface LoopAccent {
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

/** The six accents. One per application; everything else is neutral. Green — mint — is the theme's own. */
export const loopAccents: Record<LoopAccentName, LoopAccent> = {
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
export const loopAccentNames: LoopAccentName[] = ['green', 'rose', 'sky', 'lime', 'sun', 'violet'];

/**
 * An accent as CSS custom properties, for a color mode: what an
 * application sets on its root to take its colour.
 */
export function loopAccentVars(
  name: LoopAccentName,
  mode: 'light' | 'dark' = 'light',
): Record<string, string> {
  const accent = loopAccents[name] ?? loopAccents.green;
  return {
    '--loop-accent': accent.accent,
    '--loop-accent-on': accent.on,
    '--loop-stage': accent.stage[mode],
    '--loop-quiet': accent.quiet[mode],
  };
}

/**
 * An application's accent as everything it colours (LOOP T-05): the four
 * `--loop-*` properties of `loopAccentVars`, and Primer's accent fill and
 * filled button — the person's bubble, the assistant's avatar, the one
 * button to press — in the accent with the text that sits on it. Set on an
 * application's root, it wears its own colour; the page around keeps mint.
 */
export function loopAccentStyles(
  name: LoopAccentName,
  mode: 'light' | 'dark' = 'light',
): Record<string, string> {
  const accent = loopAccents[name];
  if (!accent) {
    throw new Error(
      `There is no accent "${name}"; the accents are ${loopAccentNames.join(', ')}.`,
    );
  }
  return {
    ...loopAccentVars(name, mode),
    '--bgColor-accent-emphasis': accent.accent,
    '--borderColor-accent-emphasis': accent.accent,
    // Its text, its muted border and tint: so that nothing on the page keeps
    // the theme's default accent beside the application's own (T-18).
    '--fgColor-accent': accent.text[mode],
    '--fgColor-link': accent.text[mode],
    '--borderColor-accent-muted': accent.accent,
    '--bgColor-accent-muted': accent.quiet[mode],
    '--button-primary-bgColor-rest': accent.accent,
    '--button-primary-borderColor-rest': accent.accent,
    '--button-primary-bgColor-hover': accent.accent,
    '--button-primary-borderColor-hover': accent.accent,
    '--button-primary-bgColor-active': accent.accent,
    '--button-primary-borderColor-active': accent.accent,
    '--button-primary-fgColor-rest': accent.on,
    '--button-primary-iconColor-rest': accent.on,
  };
}
