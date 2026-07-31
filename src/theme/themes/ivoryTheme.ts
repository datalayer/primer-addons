/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Ivory Theme for Primer React.
 *
 * Soft, warm off-white neutrals with a deep-taupe accent — a calm,
 * refined, and welcoming look. Uses an elegant humanist-serif type stack
 * (Palatino-led) for a gentle, hospitable, printed feel.
 * Theming is applied via **CSS custom-property overrides**.
 */

import { theme as primerTheme } from '@primer/react';
import { ivoryColors } from '../colors/ivoryColors';
import { type ThemeColorDefs, buildThemeStyles } from '../css/createThemeCSSVars';

/* ── Light-mode colour definitions ───────────────────────────────────── */

const ivoryLight: ThemeColorDefs = {
  canvas: {
    default: ivoryColors.white,
  },
  fg: {
    default: '#2C2318',
    muted: ivoryColors.gray,
    onEmphasis: '#FBF7EF',
  },
  accent: {
    fg: ivoryColors.ivoryText,
    emphasis: ivoryColors.ivoryText,
    muted: ivoryColors.ivoryAccent,
    subtle: ivoryColors.ivoryTint,
  },
  success: {
    fg: '#3E6B47',
    emphasis: '#3E6B47',
    muted: '#5E8A5E',
    subtle: '#E1EEE0',
  },
  attention: {
    fg: ivoryColors.attentionBrand,
    emphasis: ivoryColors.attentionBrand,
    muted: ivoryColors.attentionAccent,
    subtle: ivoryColors.attentionTint,
  },
  danger: {
    fg: ivoryColors.dangerBrand,
    emphasis: ivoryColors.dangerBrand,
    muted: ivoryColors.dangerAccent,
    subtle: ivoryColors.dangerTint,
  },
  severe: {
    fg: ivoryColors.severeBrand,
    emphasis: ivoryColors.severeBrand,
    muted: ivoryColors.severeAccent,
    subtle: ivoryColors.severeTint,
  },
  done: {
    fg: ivoryColors.doneBrand,
    emphasis: ivoryColors.doneBrand,
    muted: ivoryColors.doneAccent,
    subtle: ivoryColors.doneTint,
  },
  border: {
    default: '#E0D3BC',
    muted: '#EBE1CE',
  },
  btn: {
    text: '#2C2318',
    bg: '#FDF9F1',
    border: '#DDCEB2',
    hoverBg: ivoryColors.ivoryTint,
    hoverBorder: ivoryColors.gray,
    activeBg: ivoryColors.ivoryTint,
    activeBorder: ivoryColors.gray,
    selectedBg: '#FDF9F1',
    counterBg: ivoryColors.gray,
    primary: {
      text: '#FBF7EF',
      bg: ivoryColors.ivoryText,
      border: ivoryColors.ivoryText,
      hoverBg: ivoryColors.ivoryHover,
      hoverBorder: ivoryColors.ivoryHover,
      selectedBg: ivoryColors.ivoryHover,
      disabledText: 'rgba(255, 255, 255, 0.8)',
      disabledBg: '#D8C9AE',
      disabledBorder: '#D8C9AE',
      icon: '#FBF7EF',
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: ivoryColors.ivoryText,
      hoverText: '#FBF7EF',
      hoverBg: ivoryColors.ivoryText,
      hoverBorder: ivoryColors.ivoryText,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FBF7EF',
      selectedBg: ivoryColors.ivoryHover,
      selectedBorder: ivoryColors.ivoryHover,
      disabledText: ivoryColors.gray,
      disabledBg: ivoryColors.ivoryTint,
      disabledCounterBg: 'rgba(0, 0, 0, 0.05)',
      counterBg: 'rgba(0, 0, 0, 0.05)',
      counterFg: ivoryColors.ivoryText,
      hoverCounterFg: '#FBF7EF',
      disabledCounterFg: ivoryColors.gray,
    },
    danger: {
      text: '#B42318',
      hoverText: '#FBF7EF',
      hoverBg: '#B42318',
      hoverBorder: '#B42318',
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FBF7EF',
      selectedBg: '#8E1B12',
      selectedBorder: '#8E1B12',
      disabledText: 'rgba(180, 35, 24, 0.5)',
      disabledBg: ivoryColors.ivoryTint,
      disabledCounterBg: 'rgba(180, 35, 24, 0.05)',
      counterBg: 'rgba(180, 35, 24, 0.1)',
      counterFg: '#B42318',
      hoverCounterFg: '#FBF7EF',
      disabledCounterFg: 'rgba(180, 35, 24, 0.5)',
      icon: '#B42318',
    },
  },
};

/* ── Dark-mode colour definitions ────────────────────────────────────── */

const ivoryDark: ThemeColorDefs = {
  canvas: {
    default: ivoryColors.black,
    subtle: '#2A2219',
  },
  fg: {
    default: '#EFE6D6',
    muted: '#BBAC97',
    onEmphasis: '#FBF7EF',
  },
  accent: {
    fg: ivoryColors.ivoryBright,
    emphasis: '#836A18',
    muted: ivoryColors.ivoryBrand,
    subtle: '#332A18',
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
    muted: ivoryColors.attentionAccent,
    subtle: '#2E2606',
  },
  danger: {
    fg: '#F08A70',
    emphasis: '#A34632',
    muted: ivoryColors.dangerAccent,
    subtle: '#2E140E',
  },
  severe: {
    fg: '#E6A566',
    emphasis: '#9C6221',
    muted: ivoryColors.severeAccent,
    subtle: '#2E1D0A',
  },
  done: {
    fg: '#B09AD0',
    emphasis: '#6A5591',
    muted: ivoryColors.doneAccent,
    subtle: '#1F1830',
  },
  btn: {
    text: '#EFE6D6',
    bg: '#2E2519',
    border: 'rgba(239, 230, 214, 0.12)',
    hoverBg: '#3A2F1F',
    hoverBorder: '#BBAC97',
    activeBg: '#2E2519',
    activeBorder: '#8C7C64',
    selectedBg: '#241D12',
    counterBg: '#3A2F1F',
    primary: {
      text: '#211A12',
      bg: ivoryColors.ivoryBright,
      border: 'rgba(239, 230, 214, 0.12)',
      hoverBg: ivoryColors.ivoryAccent,
      hoverBorder: 'rgba(239, 230, 214, 0.12)',
      selectedBg: ivoryColors.ivoryAccent,
      disabledText: 'rgba(33, 26, 18, 0.5)',
      disabledBg: 'rgba(239, 223, 194, 0.35)',
      disabledBorder: 'rgba(239, 223, 194, 0.2)',
      icon: '#211A12',
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: ivoryColors.ivoryBright,
      hoverText: '#211A12',
      hoverBg: ivoryColors.ivoryBright,
      hoverBorder: ivoryColors.ivoryBright,
      hoverCounterBg: 'rgba(0, 0, 0, 0.2)',
      selectedText: '#211A12',
      selectedBg: ivoryColors.ivoryAccent,
      selectedBorder: ivoryColors.ivoryAccent,
      disabledText: 'rgba(239, 223, 194, 0.5)',
      disabledBg: 'rgba(239, 223, 194, 0.1)',
      disabledCounterBg: 'rgba(239, 223, 194, 0.05)',
      counterBg: 'rgba(239, 223, 194, 0.1)',
      counterFg: ivoryColors.ivoryBright,
      hoverCounterFg: '#211A12',
      disabledCounterFg: 'rgba(239, 223, 194, 0.5)',
    },
    danger: {
      text: '#f85149',
      hoverText: '#FBF7EF',
      hoverBg: '#da3633',
      hoverBorder: '#f85149',
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FBF7EF',
      selectedBg: '#b62324',
      selectedBorder: '#ff7b72',
      disabledText: 'rgba(248, 81, 73, 0.5)',
      disabledBg: 'rgba(248, 81, 73, 0.1)',
      disabledCounterBg: 'rgba(248, 81, 73, 0.05)',
      counterBg: 'rgba(248, 81, 73, 0.1)',
      counterFg: '#f85149',
      hoverCounterFg: '#FBF7EF',
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
 * (see `ivoryThemeStyles`), this is just the unmodified default Primer
 * theme kept for backward compatibility.
 */
export const ivoryTheme = primerTheme;

/**
 * Elegant humanist-serif font stack for the Ivory aesthetic.
 *
 * Leads with Palatino — a soft, calligraphic, welcoming transitional
 * serif — with metric-compatible fallbacks across macOS / Windows /
 * Linux (URW Palladio L / P052) so the refined, hospitable feel renders
 * consistently everywhere without web-font loading (same no-download
 * approach as the Matrix monospace stack).
 */
const ivoryFontFamily =
  '"Palatino Linotype", Palatino, "Book Antiqua", "URW Palladio L", P052, Georgia, serif';

/** Comprehensive Primer CSS-variable overrides for light & dark mode. */
export const ivoryThemeStyles = buildThemeStyles(ivoryLight, ivoryDark, {
  fontFamily: ivoryFontFamily,
});

export default ivoryTheme;
