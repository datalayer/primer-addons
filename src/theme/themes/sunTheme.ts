/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Sun Theme for Primer React.
 *
 * Warm, radiant golden light with a deep amber accent — energetic,
 * optimistic, and welcoming. Uses a friendly humanist-sans type stack
 * for an approachable, cheerful feel.
 * Theming is applied via **CSS custom-property overrides**.
 */

import { theme as primerTheme } from '@primer/react';
import { sunColors } from '../colors/sunColors';
import { type ThemeColorDefs, buildThemeStyles } from '../css/createThemeCSSVars';

/* ── Light-mode colour definitions ───────────────────────────────────── */

const sunLight: ThemeColorDefs = {
  canvas: {
    default: sunColors.white,
    subtle: '#FFF3D6',
  },
  fg: {
    default: '#2A2210',
    muted: sunColors.gray,
    onEmphasis: '#FFFBF0',
  },
  accent: {
    fg: sunColors.sunText,
    emphasis: sunColors.sunText,
    muted: sunColors.sunAccent,
    subtle: sunColors.sunTint,
  },
  success: {
    fg: '#3E6B47',
    emphasis: '#3E6B47',
    muted: '#5E8A5E',
    subtle: '#E1EEE0',
  },
  attention: {
    fg: sunColors.attentionBrand,
    emphasis: sunColors.attentionBrand,
    muted: sunColors.attentionAccent,
    subtle: sunColors.attentionTint,
  },
  danger: {
    fg: sunColors.dangerBrand,
    emphasis: sunColors.dangerBrand,
    muted: sunColors.dangerAccent,
    subtle: sunColors.dangerTint,
  },
  severe: {
    fg: sunColors.severeBrand,
    emphasis: sunColors.severeBrand,
    muted: sunColors.severeAccent,
    subtle: sunColors.severeTint,
  },
  done: {
    fg: sunColors.doneBrand,
    emphasis: sunColors.doneBrand,
    muted: sunColors.doneAccent,
    subtle: sunColors.doneTint,
  },
  border: {
    default: '#F0E2BE',
    muted: '#F6ECCF',
  },
  btn: {
    text: '#2A2210',
    bg: '#FFFCF3',
    border: '#EEDCB2',
    hoverBg: sunColors.sunTint,
    hoverBorder: sunColors.gray,
    activeBg: sunColors.sunTint,
    activeBorder: sunColors.gray,
    selectedBg: '#FFFCF3',
    counterBg: sunColors.gray,
    primary: {
      text: '#FFFBF0',
      bg: sunColors.sunText,
      border: sunColors.sunText,
      hoverBg: sunColors.sunHover,
      hoverBorder: sunColors.sunHover,
      selectedBg: sunColors.sunHover,
      disabledText: 'rgba(255, 255, 255, 0.8)',
      disabledBg: '#E0BE73',
      disabledBorder: '#E0BE73',
      icon: '#FFFBF0',
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: sunColors.sunText,
      hoverText: '#FFFBF0',
      hoverBg: sunColors.sunText,
      hoverBorder: sunColors.sunText,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FFFBF0',
      selectedBg: sunColors.sunHover,
      selectedBorder: sunColors.sunHover,
      disabledText: sunColors.gray,
      disabledBg: sunColors.sunTint,
      disabledCounterBg: 'rgba(0, 0, 0, 0.05)',
      counterBg: 'rgba(0, 0, 0, 0.05)',
      counterFg: sunColors.sunText,
      hoverCounterFg: '#FFFBF0',
      disabledCounterFg: sunColors.gray,
    },
    danger: {
      text: '#B42318',
      hoverText: '#FFFBF0',
      hoverBg: '#B42318',
      hoverBorder: '#B42318',
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FFFBF0',
      selectedBg: '#8E1B12',
      selectedBorder: '#8E1B12',
      disabledText: 'rgba(180, 35, 24, 0.5)',
      disabledBg: sunColors.sunTint,
      disabledCounterBg: 'rgba(180, 35, 24, 0.05)',
      counterBg: 'rgba(180, 35, 24, 0.1)',
      counterFg: '#B42318',
      hoverCounterFg: '#FFFBF0',
      disabledCounterFg: 'rgba(180, 35, 24, 0.5)',
      icon: '#B42318',
    },
  },
};

/* ── Dark-mode colour definitions ────────────────────────────────────── */

const sunDark: ThemeColorDefs = {
  canvas: {
    default: sunColors.black,
    subtle: '#2A2109',
  },
  fg: {
    default: '#F3E9CF',
    muted: '#BEAC82',
    onEmphasis: '#FFFBF0',
  },
  accent: {
    fg: sunColors.sunBright,
    emphasis: '#8A6E00',
    muted: sunColors.sunBrand,
    subtle: '#33290C',
  },
  success: {
    fg: '#7CB07E',
    emphasis: '#3E6B47',
    muted: '#5E8A5E',
    subtle: '#16261A',
  },
  attention: {
    fg: '#E7C24E',
    emphasis: '#8A6D08',
    muted: sunColors.attentionAccent,
    subtle: '#2E2606',
  },
  danger: {
    fg: '#F08A70',
    emphasis: '#B23A1E',
    muted: sunColors.dangerAccent,
    subtle: '#2E140E',
  },
  severe: {
    fg: '#E6A566',
    emphasis: '#A85D0C',
    muted: sunColors.severeAccent,
    subtle: '#2E1D0A',
  },
  done: {
    fg: '#B09AD0',
    emphasis: '#6A4E9E',
    muted: sunColors.doneAccent,
    subtle: '#1F1830',
  },
  btn: {
    text: '#F3E9CF',
    bg: '#2E2509',
    border: 'rgba(243, 233, 207, 0.12)',
    hoverBg: '#3A2F0D',
    hoverBorder: '#BEAC82',
    activeBg: '#2E2509',
    activeBorder: '#8C7C4A',
    selectedBg: '#241D07',
    counterBg: '#3A2F0D',
    primary: {
      text: '#211A08',
      bg: sunColors.sunBright,
      border: 'rgba(243, 233, 207, 0.12)',
      hoverBg: sunColors.sunAccent,
      hoverBorder: 'rgba(243, 233, 207, 0.12)',
      selectedBg: sunColors.sunAccent,
      disabledText: 'rgba(33, 26, 8, 0.5)',
      disabledBg: 'rgba(255, 213, 74, 0.35)',
      disabledBorder: 'rgba(255, 213, 74, 0.2)',
      icon: '#211A08',
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: sunColors.sunBright,
      hoverText: '#211A08',
      hoverBg: sunColors.sunBright,
      hoverBorder: sunColors.sunBright,
      hoverCounterBg: 'rgba(0, 0, 0, 0.2)',
      selectedText: '#211A08',
      selectedBg: sunColors.sunAccent,
      selectedBorder: sunColors.sunAccent,
      disabledText: 'rgba(255, 213, 74, 0.5)',
      disabledBg: 'rgba(255, 213, 74, 0.1)',
      disabledCounterBg: 'rgba(255, 213, 74, 0.05)',
      counterBg: 'rgba(255, 213, 74, 0.1)',
      counterFg: sunColors.sunBright,
      hoverCounterFg: '#211A08',
      disabledCounterFg: 'rgba(255, 213, 74, 0.5)',
    },
    danger: {
      text: '#f85149',
      hoverText: '#FFFBF0',
      hoverBg: '#da3633',
      hoverBorder: '#f85149',
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FFFBF0',
      selectedBg: '#b62324',
      selectedBorder: '#ff7b72',
      disabledText: 'rgba(248, 81, 73, 0.5)',
      disabledBg: 'rgba(248, 81, 73, 0.1)',
      disabledCounterBg: 'rgba(248, 81, 73, 0.05)',
      counterBg: 'rgba(248, 81, 73, 0.1)',
      counterFg: '#f85149',
      hoverCounterFg: '#FFFBF0',
      disabledCounterFg: 'rgba(248, 81, 73, 0.5)',
      icon: '#f85149',
    },
  },
};

/* ── Exports ─────────────────────────────────────────────────────────── */

/**
 * The Primer theme object.
 *
 * Since theming is done entirely via CSS custom properties
 * (see `sunThemeStyles`), this is just the unmodified default Primer
 * theme kept for backward compatibility.
 */
export const sunTheme = primerTheme;

/**
 * Friendly humanist-sans font stack for the Sun aesthetic.
 *
 * Leads with warm geometric-humanist sans-serifs (Avenir / Segoe UI /
 * Ubuntu / Cantarell) for an approachable, optimistic feel, with
 * cross-platform fallbacks across macOS / Windows / Linux so it renders
 * consistently everywhere without web-font loading (same no-download
 * approach as the Matrix monospace stack).
 */
const sunFontFamily =
  '"Avenir Next", Avenir, "Segoe UI", Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif';

/** Comprehensive Primer CSS-variable overrides for light & dark mode. */
export const sunThemeStyles = buildThemeStyles(sunLight, sunDark, {
  fontFamily: sunFontFamily,
});

export default sunTheme;
