/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Hue colours – a colour named by its hue, in every theme and both modes.
 *
 * The palette's other names are roles (`primary`, `glow`, `surge`…): what
 * they are changes with the theme, so `surge` is blue in one theme and sage
 * in another. A hue name keeps its hue: `teal` is a teal in every theme, a
 * deep one that reads on a light background and a bright one that reads on
 * a dark background. A spec names its colour by hue (an agent's `color:
 * indigo`), and the drawing follows the theme and its mode.
 *
 * Every theme takes the base values; a theme with hues of its own (`loop`'s
 * pastels, `vscode`'s terminal colours) gives them for the hues it has.
 */

import type { ThemeVariant } from '../themeTokens';

/** The hue names, in the order of the colour wheel, and grey last. */
export const hueNames = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'pink',
  'rose',
  'gray',
] as const;

/** A hue name. */
export type HueName = (typeof hueNames)[number];

/** A hue's value on a light background and on a dark one. */
export interface HueColor {
  /** Deep enough to read on a light background. */
  light: string;
  /** Bright enough to read on a dark background. */
  dark: string;
}

/** The hues every theme takes, unless it gives its own. */
export const baseHueColors: Record<HueName, HueColor> = {
  red: { light: '#B91C1C', dark: '#F87171' },
  orange: { light: '#C2410C', dark: '#FB923C' },
  amber: { light: '#B45309', dark: '#FBBF24' },
  yellow: { light: '#A16207', dark: '#FACC15' },
  lime: { light: '#4D7C0F', dark: '#A3E635' },
  green: { light: '#15803D', dark: '#4ADE80' },
  teal: { light: '#0F766E', dark: '#2DD4BF' },
  cyan: { light: '#0E7490', dark: '#22D3EE' },
  sky: { light: '#0369A1', dark: '#38BDF8' },
  blue: { light: '#1D4ED8', dark: '#60A5FA' },
  indigo: { light: '#4338CA', dark: '#818CF8' },
  violet: { light: '#6D28D9', dark: '#A78BFA' },
  purple: { light: '#7E22CE', dark: '#C084FC' },
  pink: { light: '#BE185D', dark: '#F472B6' },
  rose: { light: '#BE123C', dark: '#FB7185' },
  gray: { light: '#4B5563', dark: '#9CA3AF' },
};

/** The hues a theme gives of its own. */
const themeHueColors: Partial<Record<ThemeVariant, Partial<Record<HueName, HueColor>>>> = {
  // Loop's soft accents, deep on light, the pastels on dark (`themeAccents`).
  loop: {
    green: { light: '#248462', dark: '#8FE5C6' },
    rose: { light: '#B83A6B', dark: '#F6A5C1' },
    sky: { light: '#1F6FB0', dark: '#8CCBF9' },
    lime: { light: '#5F7A00', dark: '#BEDC55' },
    yellow: { light: '#8A6A00', dark: '#F8D469' },
    violet: { light: '#6B53C9', dark: '#C0AEF6' },
    orange: { light: '#B4571A', dark: '#F4A261' },
  },
  // The terminal's ANSI colours.
  vscode: {
    red: { light: '#CD3131', dark: '#F14C4C' },
    green: { light: '#107C10', dark: '#0DBC79' },
    yellow: { light: '#858800', dark: '#E5E510' }, // the ANSI yellow, a shade deeper to read on white
    blue: { light: '#0451A5', dark: '#2472C8' },
    cyan: { light: '#0598BC', dark: '#11A8CD' },
    purple: { light: '#BC05BC', dark: '#BC3FBC' },
  },
};

/** Every hue of a theme, in a mode. */
export function hueColorsOf(variant: ThemeVariant, mode: 'light' | 'dark'): Record<HueName, string> {
  const own = themeHueColors[variant] ?? {};
  return Object.fromEntries(
    hueNames.map(name => [name, (own[name] ?? baseHueColors[name])[mode]]),
  ) as Record<HueName, string>;
}
