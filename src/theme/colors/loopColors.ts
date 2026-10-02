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
 * The accent of the theme itself is green — a lighter relative of
 * Datalayer's brand green. An application may take one of five others
 * (`loopAccents`); each is four values: the accent, the text that sits on
 * it, the tint of the stage behind an application, and a quiet tint.
 * Dark text on every accent: the lowest contrast of the six is 8.8 to 1.
 */
export const loopColors = {
  // Core neutrals
  black: '#131314', // Near-black — primary dark background
  gray: '#6A6A66',  // Neutral gray, faintly warm — secondary text
  white: '#FFFFFF', // White — primary light background

  // Neutral surfaces and ink
  ink: '#111111',        // Text on light
  inkDark: '#F3F3F1',    // Text on dark
  subtle: '#F5F5F3',     // Subtle surface on light (a bubble, a chip)
  subtleDark: '#1E1E20', // Subtle surface on dark
  grayDark: '#A1A19C',   // Secondary text on dark

  // Loop palette (Brand) — green
  loopBrand: '#7ADBB8',  // The accent — a bubble, a send button, a swatch
  loopOn: '#06281E',     // Text that sits on the accent
  loopAccent: '#4FC79C', // Deeper accent — charts, highlights
  loopText: '#0F6B4F',   // Accessible accent text & links on white (AA+)
  loopTint: '#F0FAF6',   // Quiet tint — a draft, a callout
  loopStage: '#DDF5EC',  // The stage behind an application
  loopBright: '#8FE5C6', // Accent text & links on dark
  loopHover: '#0A5640',  // Accent text hover

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
  brightGlow: '#7ADBB8',  // Green — the accent
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
}

/** The six accents. One per application; everything else is neutral. */
export const loopAccents: Record<LoopAccentName, LoopAccent> = {
  green: {
    accent: '#7ADBB8',
    on: '#06281E',
    stage: { light: '#DDF5EC', dark: '#10261F' },
    quiet: { light: '#F0FAF6', dark: '#17211D' },
  },
  rose: {
    accent: '#F6A5C1',
    on: '#3A0A1C',
    stage: { light: '#FCE3EC', dark: '#2B141C' },
    quiet: { light: '#FDF2F6', dark: '#22181C' },
  },
  sky: {
    accent: '#8CCBF9',
    on: '#06243B',
    stage: { light: '#DFF0FD', dark: '#0F2333' },
    quiet: { light: '#F0F8FE', dark: '#161E25' },
  },
  lime: {
    accent: '#BEDC55',
    on: '#1F2A00',
    stage: { light: '#EEF6CC', dark: '#1E2609' },
    quiet: { light: '#F7FBE6', dark: '#1C2014' },
  },
  sun: {
    accent: '#F8D469',
    on: '#2E2200',
    stage: { light: '#FDF3CD', dark: '#2A2209' },
    quiet: { light: '#FEF9E7', dark: '#221F14' },
  },
  violet: {
    accent: '#C0AEF6',
    on: '#1C0F47',
    stage: { light: '#ECE7FD', dark: '#1B1533' },
    quiet: { light: '#F6F3FE', dark: '#1C1A27' },
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
