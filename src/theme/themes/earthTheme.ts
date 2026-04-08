/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Earth Theme for Primer React.
 *
 * Ocean blues (sea), forest greens (plants), golden yellows (sun) —
 * the Blue Planet, inspired by satellite observations of Earth.
 * Theming is applied via **CSS custom-property overrides**.
 */

import { theme as primerTheme } from '@primer/react';
import { earthColors } from '../colors/earthColors';
import { type ThemeColorDefs, buildThemeStyles } from './createThemeCSSVars';

/* ── Light-mode colour definitions ───────────────────────────────────── */

const earthLight: ThemeColorDefs = {
  canvas: {
    default: earthColors.white,
  },
  fg: {
    default: '#1A2332',
    muted: earthColors.gray,
    onEmphasis: earthColors.white,
  },
  accent: {
    fg: earthColors.oceanText,
    emphasis: earthColors.oceanBrand,
    muted: earthColors.oceanAccent,
  },
  success: {
    fg: earthColors.forestBrand,
    emphasis: earthColors.forestBrand,
    muted: earthColors.forestAccent,
  },
  border: {
    default: '#C1D0DD',
    muted: '#DAE4ED',
  },
  btn: {
    text: '#1A2332',
    bg: earthColors.white,
    border: '#A8BDD0',
    hoverBg: earthColors.oceanTint,
    hoverBorder: earthColors.gray,
    activeBg: earthColors.oceanTint,
    activeBorder: earthColors.gray,
    selectedBg: earthColors.white,
    counterBg: earthColors.gray,
    primary: {
      text: earthColors.white,
      bg: earthColors.oceanText,
      border: earthColors.oceanText,
      hoverBg: earthColors.oceanHover,
      hoverBorder: earthColors.oceanHover,
      selectedBg: earthColors.oceanHover,
      disabledText: 'rgba(255, 255, 255, 0.8)',
      disabledBg: '#7DB8D8',
      disabledBorder: '#7DB8D8',
      icon: earthColors.white,
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: earthColors.oceanText,
      hoverText: earthColors.white,
      hoverBg: earthColors.oceanText,
      hoverBorder: earthColors.oceanText,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: earthColors.white,
      selectedBg: earthColors.oceanHover,
      selectedBorder: earthColors.oceanHover,
      disabledText: earthColors.gray,
      disabledBg: earthColors.oceanTint,
      disabledCounterBg: 'rgba(0, 0, 0, 0.05)',
      counterBg: 'rgba(0, 0, 0, 0.05)',
      counterFg: earthColors.oceanText,
      hoverCounterFg: earthColors.white,
      disabledCounterFg: earthColors.gray,
    },
    danger: {
      text: '#d32f2f',
      hoverText: earthColors.white,
      hoverBg: '#d32f2f',
      hoverBorder: '#d32f2f',
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: earthColors.white,
      selectedBg: '#b71c1c',
      selectedBorder: '#b71c1c',
      disabledText: 'rgba(211, 47, 47, 0.5)',
      disabledBg: earthColors.oceanTint,
      disabledCounterBg: 'rgba(211, 47, 47, 0.05)',
      counterBg: 'rgba(211, 47, 47, 0.1)',
      counterFg: '#d32f2f',
      hoverCounterFg: earthColors.white,
      disabledCounterFg: 'rgba(211, 47, 47, 0.5)',
      icon: '#d32f2f',
    },
  },
};

/* ── Dark-mode colour definitions ────────────────────────────────────── */

const earthDark: ThemeColorDefs = {
  canvas: {
    default: earthColors.black,
    subtle: '#0E1D30',
  },
  fg: {
    default: '#D4E4DC',
    muted: '#8A9BA8',
    onEmphasis: earthColors.white,
  },
  accent: {
    fg: earthColors.oceanAccent,
    emphasis: earthColors.oceanBright,
    muted: earthColors.oceanBrand,
    subtle: '#0C2440',
  },
  success: {
    fg: earthColors.forestAccent,
    emphasis: earthColors.forestAccent,
    muted: earthColors.forestBrand,
    subtle: '#0C2D18',
  },
  btn: {
    text: '#D4E4DC',
    bg: '#162236',
    border: 'rgba(212, 228, 220, 0.12)',
    hoverBg: '#1E3048',
    hoverBorder: '#8A9BA8',
    activeBg: '#162236',
    activeBorder: '#6B7C88',
    selectedBg: '#0E1D30',
    counterBg: '#1E3048',
    primary: {
      text: earthColors.white,
      bg: earthColors.oceanAccent,
      border: 'rgba(212, 228, 220, 0.12)',
      hoverBg: earthColors.oceanBright,
      hoverBorder: 'rgba(212, 228, 220, 0.12)',
      selectedBg: earthColors.oceanBright,
      disabledText: 'rgba(255, 255, 255, 0.5)',
      disabledBg: 'rgba(3, 105, 161, 0.35)',
      disabledBorder: 'rgba(3, 105, 161, 0.2)',
      icon: earthColors.white,
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: earthColors.oceanAccent,
      hoverText: earthColors.white,
      hoverBg: earthColors.oceanAccent,
      hoverBorder: earthColors.oceanAccent,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: earthColors.white,
      selectedBg: earthColors.oceanBright,
      selectedBorder: earthColors.oceanBright,
      disabledText: 'rgba(14, 165, 233, 0.5)',
      disabledBg: 'rgba(14, 165, 233, 0.1)',
      disabledCounterBg: 'rgba(14, 165, 233, 0.05)',
      counterBg: 'rgba(14, 165, 233, 0.1)',
      counterFg: earthColors.oceanAccent,
      hoverCounterFg: earthColors.white,
      disabledCounterFg: 'rgba(14, 165, 233, 0.5)',
    },
    danger: {
      text: '#f85149',
      hoverText: earthColors.white,
      hoverBg: '#da3633',
      hoverBorder: '#f85149',
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: earthColors.white,
      selectedBg: '#b62324',
      selectedBorder: '#ff7b72',
      disabledText: 'rgba(248, 81, 73, 0.5)',
      disabledBg: 'rgba(248, 81, 73, 0.1)',
      disabledCounterBg: 'rgba(248, 81, 73, 0.05)',
      counterBg: 'rgba(248, 81, 73, 0.1)',
      counterFg: '#f85149',
      hoverCounterFg: earthColors.white,
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
 * (see `earthThemeStyles`), this is just the unmodified
 * default Primer theme kept for backward compatibility.
 */
export const earthTheme = primerTheme;

/** Comprehensive Primer CSS-variable overrides for light & dark mode. */
export const earthThemeStyles = buildThemeStyles(earthLight, earthDark);

export default earthTheme;
