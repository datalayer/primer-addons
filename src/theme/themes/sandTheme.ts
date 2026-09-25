/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Sand Theme for Primer React.
 *
 * Warm, pale desert neutrals with a terracotta-clay accent — a calm,
 * editorial look inspired by Anthropic's book-like warmth. Uses a warm
 * transitional serif type stack for a natural, printed feel.
 * Theming is applied via **CSS custom-property overrides**.
 */

import { theme as primerTheme } from '@primer/react';
import { sandColors } from '../colors/sandColors';
import { type ThemeColorDefs, buildThemeStyles } from '../css/createThemeCSSVars';

/* ── Light-mode colour definitions ───────────────────────────────────── */

const sandLight: ThemeColorDefs = {
  canvas: {
    default: sandColors.white,
    subtle: '#F1EAD2',
  },
  fg: {
    default: '#2B2118',
    muted: sandColors.gray,
    onEmphasis: '#FBF7EF',
  },
  accent: {
    fg: sandColors.sandText,
    emphasis: sandColors.sandText,
    muted: sandColors.sandAccent,
    subtle: sandColors.sandTint,
  },
  success: {
    fg: '#3E6B47',
    emphasis: '#3E6B47',
    muted: '#5E8A5E',
    subtle: '#E1EEE0',
  },
  attention: {
    fg: sandColors.attentionBrand,
    emphasis: sandColors.attentionBrand,
    muted: sandColors.attentionAccent,
    subtle: sandColors.attentionTint,
  },
  danger: {
    fg: sandColors.dangerBrand,
    emphasis: sandColors.dangerBrand,
    muted: sandColors.dangerAccent,
    subtle: sandColors.dangerTint,
  },
  severe: {
    fg: sandColors.severeBrand,
    emphasis: sandColors.severeBrand,
    muted: sandColors.severeAccent,
    subtle: sandColors.severeTint,
  },
  done: {
    fg: sandColors.doneBrand,
    emphasis: sandColors.doneBrand,
    muted: sandColors.doneAccent,
    subtle: sandColors.doneTint,
  },
  border: {
    default: '#DBCDB4',
    muted: '#E7DCC7',
  },
  btn: {
    text: '#2B2118',
    bg: '#FBF7EF',
    border: '#D3C3A6',
    hoverBg: sandColors.sandTint,
    hoverBorder: sandColors.gray,
    activeBg: sandColors.sandTint,
    activeBorder: sandColors.gray,
    selectedBg: '#FBF7EF',
    counterBg: sandColors.gray,
    primary: {
      text: '#FBF7EF',
      bg: sandColors.sandText,
      border: sandColors.sandText,
      hoverBg: sandColors.sandHover,
      hoverBorder: sandColors.sandHover,
      selectedBg: sandColors.sandHover,
      disabledText: 'rgba(255, 255, 255, 0.8)',
      disabledBg: '#D8C58A',
      disabledBorder: '#D8C58A',
      icon: '#FBF7EF',
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: sandColors.sandText,
      hoverText: '#FBF7EF',
      hoverBg: sandColors.sandText,
      hoverBorder: sandColors.sandText,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FBF7EF',
      selectedBg: sandColors.sandHover,
      selectedBorder: sandColors.sandHover,
      disabledText: sandColors.gray,
      disabledBg: sandColors.sandTint,
      disabledCounterBg: 'rgba(0, 0, 0, 0.05)',
      counterBg: 'rgba(0, 0, 0, 0.05)',
      counterFg: sandColors.sandText,
      hoverCounterFg: '#FBF7EF',
      disabledCounterFg: sandColors.gray,
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
      disabledBg: sandColors.sandTint,
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

const sandDark: ThemeColorDefs = {
  canvas: {
    default: sandColors.black,
    subtle: '#2A2118',
  },
  fg: {
    default: '#EDE3D3',
    muted: '#B7A793',
    onEmphasis: '#FBF7EF',
  },
  accent: {
    fg: sandColors.sandBright,
    emphasis: '#8A6E10',
    muted: sandColors.sandBrand,
    subtle: '#33290F',
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
    muted: sandColors.attentionAccent,
    subtle: '#2E2606',
  },
  danger: {
    fg: '#F08A70',
    emphasis: '#A8412A',
    muted: sandColors.dangerAccent,
    subtle: '#2E140E',
  },
  severe: {
    fg: '#E6A566',
    emphasis: '#A85E1E',
    muted: sandColors.severeAccent,
    subtle: '#2E1D0A',
  },
  done: {
    fg: '#B09AD0',
    emphasis: '#6A548F',
    muted: sandColors.doneAccent,
    subtle: '#1F1830',
  },
  btn: {
    text: '#EDE3D3',
    bg: '#2E2418',
    border: 'rgba(237, 227, 211, 0.12)',
    hoverBg: '#3A2E1E',
    hoverBorder: '#B7A793',
    activeBg: '#2E2418',
    activeBorder: '#8A7A63',
    selectedBg: '#241C12',
    counterBg: '#3A2E1E',
    primary: {
      text: '#211A12',
      bg: sandColors.sandBright,
      border: 'rgba(237, 227, 211, 0.12)',
      hoverBg: sandColors.sandAccent,
      hoverBorder: 'rgba(237, 227, 211, 0.12)',
      selectedBg: sandColors.sandAccent,
      disabledText: 'rgba(33, 26, 18, 0.5)',
      disabledBg: 'rgba(236, 217, 143, 0.35)',
      disabledBorder: 'rgba(236, 217, 143, 0.2)',
      icon: '#211A12',
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: sandColors.sandBright,
      hoverText: '#211A12',
      hoverBg: sandColors.sandBright,
      hoverBorder: sandColors.sandBright,
      hoverCounterBg: 'rgba(0, 0, 0, 0.2)',
      selectedText: '#211A12',
      selectedBg: sandColors.sandAccent,
      selectedBorder: sandColors.sandAccent,
      disabledText: 'rgba(236, 217, 143, 0.5)',
      disabledBg: 'rgba(236, 217, 143, 0.1)',
      disabledCounterBg: 'rgba(236, 217, 143, 0.05)',
      counterBg: 'rgba(236, 217, 143, 0.1)',
      counterFg: sandColors.sandBright,
      hoverCounterFg: '#211A12',
      disabledCounterFg: 'rgba(236, 217, 143, 0.5)',
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
 * (see `sandThemeStyles`), this is just the unmodified default Primer
 * theme kept for backward compatibility.
 */
export const sandTheme = primerTheme;

/**
 * Warm humanist-serif font stack for the Sand aesthetic.
 *
 * Leads with Georgia — the most reliable warm transitional serif across
 * macOS / Windows / Linux — so the intended editorial, book-like feel
 * (Anthropic-style) renders consistently everywhere without web-font
 * loading (same no-download approach as the Matrix monospace stack).
 */
const sandFontFamily =
  'Georgia, "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Cambria, serif';

/** Comprehensive Primer CSS-variable overrides for light & dark mode. */
export const sandThemeStyles = buildThemeStyles(sandLight, sandDark, {
  fontFamily: sandFontFamily,
});

export default sandTheme;
