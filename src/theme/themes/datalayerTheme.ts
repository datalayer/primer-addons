/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Datalayer Theme for Primer React.
 *
 * Uses accessible color palette from the Datalayer brand manual.
 * Theming is applied via **CSS custom-property overrides** — the
 * Primer theme object is the unmodified default.
 */

import { theme as primerTheme } from '@primer/react';
import { datalayerColors } from '../colors';
import { type ThemeColorDefs, buildThemeStyles } from '../css/createThemeCSSVars';

/* ── Light-mode colour definitions ───────────────────────────────────── */

const datalayerLight: ThemeColorDefs = {
  canvas: {
    default: datalayerColors.white,
    subtle: '#f4f5f6',
  },
  fg: {
    default: datalayerColors.black,
    muted: datalayerColors.gray,
    onEmphasis: datalayerColors.white,
  },
  accent: {
    fg: datalayerColors.greenText,
    emphasis: datalayerColors.greenBrand,
    muted: datalayerColors.greenAccent,
    subtle: datalayerColors.greenTint,
  },
  success: {
    fg: '#1a7f37',
    emphasis: '#2da44e',
    muted: '#4ac26b',
    subtle: '#dafbe1',
  },
  attention: {
    fg: datalayerColors.attentionBrand,
    emphasis: datalayerColors.attentionAccent,
    muted: datalayerColors.attentionBrand,
    subtle: datalayerColors.attentionTint,
  },
  danger: {
    fg: datalayerColors.dangerBrand,
    emphasis: datalayerColors.dangerBrand,
    muted: datalayerColors.dangerAccent,
    subtle: datalayerColors.dangerTint,
  },
  severe: {
    fg: datalayerColors.severeBrand,
    emphasis: datalayerColors.severeBrand,
    muted: datalayerColors.severeAccent,
    subtle: datalayerColors.severeTint,
  },
  done: {
    fg: datalayerColors.doneBrand,
    emphasis: datalayerColors.doneBrand,
    muted: datalayerColors.doneAccent,
    subtle: datalayerColors.doneTint,
  },
  border: {
    default: '#d1d9e0',
    muted: '#e0e6eb',
  },
  btn: {
    text: datalayerColors.black,
    bg: datalayerColors.white,
    border: datalayerColors.gray,
    hoverBg: datalayerColors.greenTint,
    hoverBorder: datalayerColors.gray,
    activeBg: datalayerColors.greenTint,
    activeBorder: datalayerColors.gray,
    selectedBg: datalayerColors.white,
    counterBg: datalayerColors.gray,
    primary: {
      text: datalayerColors.white,
      bg: datalayerColors.greenText,
      border: datalayerColors.greenText,
      hoverBg: datalayerColors.greenHover,
      hoverBorder: datalayerColors.greenHover,
      selectedBg: datalayerColors.greenHover,
      disabledText: 'rgba(255, 255, 255, 0.8)',
      disabledBg: '#94C9B9',
      disabledBorder: '#94C9B9',
      icon: datalayerColors.white,
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: datalayerColors.greenText,
      hoverText: datalayerColors.white,
      hoverBg: datalayerColors.greenText,
      hoverBorder: datalayerColors.greenText,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: datalayerColors.white,
      selectedBg: datalayerColors.greenHover,
      selectedBorder: datalayerColors.greenHover,
      disabledText: datalayerColors.gray,
      disabledBg: datalayerColors.greenTint,
      disabledCounterBg: 'rgba(0, 0, 0, 0.05)',
      counterBg: 'rgba(0, 0, 0, 0.05)',
      counterFg: datalayerColors.greenText,
      hoverCounterFg: datalayerColors.white,
      disabledCounterFg: datalayerColors.gray,
    },
    danger: {
      text: '#d32f2f',
      hoverText: datalayerColors.white,
      hoverBg: '#d32f2f',
      hoverBorder: '#d32f2f',
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: datalayerColors.white,
      selectedBg: '#b71c1c',
      selectedBorder: '#b71c1c',
      disabledText: 'rgba(211, 47, 47, 0.5)',
      disabledBg: datalayerColors.greenTint,
      disabledCounterBg: 'rgba(211, 47, 47, 0.05)',
      counterBg: 'rgba(211, 47, 47, 0.1)',
      counterFg: '#d32f2f',
      hoverCounterFg: datalayerColors.white,
      disabledCounterFg: 'rgba(211, 47, 47, 0.5)',
      icon: '#d32f2f',
    },
  },
};

/* ── Dark-mode colour definitions ────────────────────────────────────── */

const datalayerDark: ThemeColorDefs = {
  canvas: {
    default: datalayerColors.black,
    subtle: '#0d1117',
  },
  fg: {
    default: datalayerColors.white,
    muted: '#8b949e',
    onEmphasis: datalayerColors.white,
  },
  accent: {
    fg: datalayerColors.greenAccent,
    emphasis: datalayerColors.greenBright,
    muted: datalayerColors.greenBrand,
    subtle: '#1f352d',
  },
  success: {
    fg: '#3fb950',
    emphasis: '#238636',
    muted: '#2ea043',
    subtle: '#0f2a18',
  },
  attention: {
    fg: '#e3b341',
    emphasis: '#9e6a03',
    muted: '#d4a72c',
    subtle: '#341a00',
  },
  danger: {
    fg: '#ff7b72',
    emphasis: '#da3633',
    muted: datalayerColors.dangerBrand,
    subtle: '#25171c',
  },
  severe: {
    fg: '#f0883e',
    emphasis: '#bd561d',
    muted: datalayerColors.severeBrand,
    subtle: '#2a1801',
  },
  done: {
    fg: '#79c0ff',
    emphasis: '#1f6feb',
    muted: datalayerColors.doneBrand,
    subtle: '#0d1f3a',
  },
  btn: {
    text: '#c9d1d9',
    bg: '#21262d',
    border: 'rgba(240, 246, 252, 0.1)',
    hoverBg: '#30363d',
    hoverBorder: '#8b949e',
    activeBg: 'hsla(212, 12%, 18%, 1)',
    activeBorder: '#6e7681',
    selectedBg: '#161b22',
    counterBg: '#30363d',
    primary: {
      text: datalayerColors.white,
      bg: datalayerColors.greenAccent,
      border: 'rgba(240, 246, 252, 0.1)',
      hoverBg: datalayerColors.greenBright,
      hoverBorder: 'rgba(240, 246, 252, 0.1)',
      selectedBg: datalayerColors.greenBright,
      disabledText: 'rgba(255, 255, 255, 0.5)',
      disabledBg: 'rgba(22, 160, 133, 0.35)',
      disabledBorder: 'rgba(22, 160, 133, 0.2)',
      icon: datalayerColors.white,
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: datalayerColors.greenAccent,
      hoverText: datalayerColors.white,
      hoverBg: datalayerColors.greenAccent,
      hoverBorder: datalayerColors.greenAccent,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: datalayerColors.white,
      selectedBg: datalayerColors.greenBright,
      selectedBorder: datalayerColors.greenBright,
      disabledText: 'rgba(26, 188, 156, 0.5)',
      disabledBg: 'rgba(26, 188, 156, 0.1)',
      disabledCounterBg: 'rgba(26, 188, 156, 0.05)',
      counterBg: 'rgba(26, 188, 156, 0.1)',
      counterFg: datalayerColors.greenAccent,
      hoverCounterFg: datalayerColors.white,
      disabledCounterFg: 'rgba(26, 188, 156, 0.5)',
    },
    danger: {
      text: '#f85149',
      hoverText: datalayerColors.white,
      hoverBg: '#da3633',
      hoverBorder: '#f85149',
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: datalayerColors.white,
      selectedBg: '#b62324',
      selectedBorder: '#ff7b72',
      disabledText: 'rgba(248, 81, 73, 0.5)',
      disabledBg: 'rgba(248, 81, 73, 0.1)',
      disabledCounterBg: 'rgba(248, 81, 73, 0.05)',
      counterBg: 'rgba(248, 81, 73, 0.1)',
      counterFg: '#f85149',
      hoverCounterFg: datalayerColors.white,
      disabledCounterFg: 'rgba(248, 81, 73, 0.5)',
      icon: '#f85149',
    },
  },
};

/* ── Exports ─────────────────────────────────────────────────────────── */

/**
 * The Primer theme object.
 *
 * Since theming is now done entirely via CSS custom properties
 * (see `datalayerThemeStyles`), this is just the unmodified
 * default Primer theme kept for backward compatibility.
 */
export const datalayerTheme = primerTheme;

/** Comprehensive Primer CSS-variable overrides for light & dark mode. */
export const datalayerThemeStyles = buildThemeStyles(
  datalayerLight,
  datalayerDark,
);

export default datalayerTheme;
