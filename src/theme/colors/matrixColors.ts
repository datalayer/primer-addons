/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Matrix Color System – Terminal & Phosphor-Green
 *
 * Inspired by the iconic green-on-black aesthetic of The Matrix.
 * Dark-first, CRT feel. Uses Datalayer brand greens for accessible text
 * and introduces phosphor-green accents for the signature glow.
 */
export const matrixColors = {
  // Core Neutrals — CRT / terminal aesthetic
  black: '#0D0208', // Matrix void — near-black with faint warm undertone
  gray: '#4A7856', // Dim terminal gray-green — secondary text
  white: '#F0FFF0', // Honeydew — light bg with subtle green cast (CRT paper)

  // Green palette — Datalayer brand greens  + Matrix phosphor highlights
  greenBrand: '#16A085', // Datalayer brand — headings, icons, dividers
  greenAccent: '#1ABC9C', // Datalayer accent — icons, charts on dark surfaces
  greenText: '#117A65', // Datalayer text — accessible buttons & text on light (AA+)
  greenTint: '#E8F5E9', // Matrix-tinted soft background for callouts
  greenPhosphor: '#00FF41', // Iconic Matrix falling-code green — dark mode highlights
  greenGlow: '#39FF14', // Neon phosphor glow — brightest accent on dark
  greenHover: '#0E6655', // Datalayer hover — primary button hover
  greenTerminal: '#003B00', // Deep terminal — dark mode subtle/canvas

  // Bright / vivid colours for SVG illustrations (OpenAI-blog style)
  brightGlow: '#39FF14', // Neon green — primary glow (re-stated for palette API)
  brightPop: '#00FF88', // Phosphor cyan — contrasting accent
  brightSpark: '#CCFF00', // Acid lime — sparkle / tertiary
  brightBlaze: '#FF0040', // Matrix red pill — warm accent
  brightSurge: '#00E5FF', // Electric blue — cool accent

  // Warm vivid colours — yellow & orange accents for SVG illustrations
  brightFlame: '#FF6D00',  // Electric orange — glitch warm accent
  brightGold: '#FFEA00',   // Glitch yellow — phosphor highlight

  // Vivid brights for light backgrounds — punchy, saturated, OpenAI-blog vibrancy
  brightLightGlow: '#00E676',  // Vivid green
  brightLightPop: '#1DE9B6',   // Vivid teal-mint
  brightLightSpark: '#AEEA00', // Vivid lime
  brightLightBlaze: '#FF1744', // Vivid red
  brightLightSurge: '#00B0FF', // Vivid sky blue
  brightLightFlame: '#FF6D00', // Vivid orange
  brightLightGold: '#FFAB00',  // Vivid amber
};
