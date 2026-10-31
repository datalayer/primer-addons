/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Metal Color System – cool neutrals, one steel blue, four brushed surfaces.
 *
 * The Loop theme's system with the warmth taken out: a white canvas under a
 * blue-grey wash, hairlines with a little steel in them, and a slate-blue
 * accent. Where Loop has no gradient, Metal has four, for a surface that
 * carries white text and glass on top: sage, steel, mauve and clay.
 * The verdict colours are Loop's.
 */

import { loopColors } from './loopColors';

export const metalColors = {
  ...loopColors,

  // Core neutrals
  black: '#1C2A33',      // The deep base under the dark mesh
  gray: '#6B7280',       // Secondary text on light: 4.8 to 1 on white
  ink: '#2A2F37',        // Text on light: softer than Loop's, 13.5 to 1 on white
  inkDark: '#EEF2F7',    // Text on dark
  subtle: '#F6F8FC',     // Subtle surface on light
  subtleDark: '#25343F', // Subtle surface on dark, and the menus
  grayDark: '#C3CDD8',   // Secondary text on dark

  // Metal palette (Brand) — steel blue
  metalBrand: '#4C76BA',       // The filled button: white text 4.6 to 1
  metalOn: '#FFFFFF',          // Text that sits on the accent
  metalHover: '#3F68AC',       // The filled button, hovered: white text 5.5 to 1
  metalActive: '#355A98',      // The filled button, pressed
  metalText: '#3A66AC',        // Accent text & links on white: 5.7 to 1
  metalRing: '#264F8F',        // The focus ring on light: 8 to 1 on white
  metalTint: '#EDF4FC',        // The pale stage a product fragment stands on, a chosen row
  metalStage: '#F2F7FC',       // The stage behind an application
  metalTintLine: '#C4DAF0',    // The line around anything on the tint
  metalBright: '#8FB4E8',      // The accent on dark: dark text 8.2 to 1
  metalBrightHover: '#A9C6EE', // The accent on dark, hovered
  metalOnDark: '#0B1A30',      // Text that sits on the accent on dark
  metalStageDark: '#152033',
  metalTintDark: '#141A23',

  // Hairlines, with a little steel in them
  line: '#D8E5F2',
  lineMuted: '#E6EEF7',
  controlLine: '#D6E0EE',
  lineDark: '#262D37',
  lineMutedDark: '#1E242C',

  // The four surfaces: the two stops of each gradient
  sageFrom: '#8FA672',
  sageTo: '#4F7A5A',
  steelFrom: '#3F73B5',
  steelTo: '#2396D6',
  mauveFrom: '#A87890',
  mauveTo: '#B04A6E',
  clayFrom: '#C26A4E',
  clayTo: '#A04A2C',

  // Bright colours for SVG illustrations, on dark
  brightGlow: '#8FB4E8',  // Steel
  brightPop: '#6FC3E8',   // Sky
  brightSpark: '#A8C08A', // Sage
  brightBlaze: '#D98FAE', // Mauve
  brightSurge: '#A9B4E6', // Periwinkle
  brightFlame: '#E09272', // Clay
  brightGold: '#E6C878',  // Brass

  // The same, deeper, for light backgrounds
  brightLightGlow: '#3A66AC',  // Deep steel
  brightLightPop: '#1F7FB8',   // Deep sky
  brightLightSpark: '#56784A', // Deep sage
  brightLightBlaze: '#A8426A', // Deep mauve
  brightLightSurge: '#5A5FB0', // Deep periwinkle
  brightLightFlame: '#A64E2E', // Deep clay
  brightLightGold: '#8A6A1E',  // Deep brass
};
