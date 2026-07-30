/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Spatial Theme for Primer React.
 *
 * Cosmic indigo & deep blues — inspired by space.
 * Theming is applied via **CSS custom-property overrides**.
 */

import { theme as primerTheme } from '@primer/react';
import { spatialColors } from '../colors';
import { type ThemeColorDefs, buildThemeStyles } from '../css/createThemeCSSVars';

/* ── Light-mode colour definitions ───────────────────────────────────── */

const spatialLight: ThemeColorDefs = {
  canvas: {
    default: spatialColors.white,
  },
  fg: {
    default: '#1E1E3F',
    muted: spatialColors.gray,
    onEmphasis: spatialColors.white,
  },
  accent: {
    fg: spatialColors.indigoText,
    emphasis: spatialColors.indigoBrand,
    muted: spatialColors.indigoAccent,
    subtle: spatialColors.indigoTint,
  },
  success: {
    fg: '#1a7f37',
    emphasis: '#2da44e',
    muted: '#4ac26b',
    subtle: '#dafbe1',
  },
  attention: {
    fg: spatialColors.attentionBrand,
    emphasis: spatialColors.attentionAccent,
    muted: spatialColors.attentionBrand,
    subtle: spatialColors.attentionTint,
  },
  danger: {
    fg: spatialColors.dangerBrand,
    emphasis: spatialColors.dangerBrand,
    muted: spatialColors.dangerAccent,
    subtle: spatialColors.dangerTint,
  },
  severe: {
    fg: spatialColors.severeBrand,
    emphasis: spatialColors.severeBrand,
    muted: spatialColors.severeAccent,
    subtle: spatialColors.severeTint,
  },
  done: {
    fg: spatialColors.doneBrand,
    emphasis: spatialColors.doneBrand,
    muted: spatialColors.doneAccent,
    subtle: spatialColors.doneTint,
  },
  btn: {
    text: '#1E1E3F',
    bg: spatialColors.white,
    border: '#C7D2FE',
    hoverBg: spatialColors.indigoTint,
    hoverBorder: spatialColors.gray,
    activeBg: spatialColors.indigoTint,
    activeBorder: spatialColors.gray,
    selectedBg: spatialColors.white,
    counterBg: spatialColors.gray,
    primary: {
      text: spatialColors.white,
      bg: spatialColors.indigoText,
      border: spatialColors.indigoText,
      hoverBg: spatialColors.indigoHover,
      hoverBorder: spatialColors.indigoHover,
      selectedBg: spatialColors.indigoHover,
      disabledText: 'rgba(255, 255, 255, 0.8)',
      disabledBg: '#B4B0D8',
      disabledBorder: '#B4B0D8',
      icon: spatialColors.white,
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: spatialColors.indigoText,
      hoverText: spatialColors.white,
      hoverBg: spatialColors.indigoText,
      hoverBorder: spatialColors.indigoText,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: spatialColors.white,
      selectedBg: spatialColors.indigoHover,
      selectedBorder: spatialColors.indigoHover,
      disabledText: spatialColors.gray,
      disabledBg: spatialColors.indigoTint,
      disabledCounterBg: 'rgba(0, 0, 0, 0.05)',
      counterBg: 'rgba(0, 0, 0, 0.05)',
      counterFg: spatialColors.indigoText,
      hoverCounterFg: spatialColors.white,
      disabledCounterFg: spatialColors.gray,
    },
    danger: {
      text: '#d32f2f',
      hoverText: spatialColors.white,
      hoverBg: '#d32f2f',
      hoverBorder: '#d32f2f',
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: spatialColors.white,
      selectedBg: '#b71c1c',
      selectedBorder: '#b71c1c',
      disabledText: 'rgba(211, 47, 47, 0.5)',
      disabledBg: spatialColors.indigoTint,
      disabledCounterBg: 'rgba(211, 47, 47, 0.05)',
      counterBg: 'rgba(211, 47, 47, 0.1)',
      counterFg: '#d32f2f',
      hoverCounterFg: spatialColors.white,
      disabledCounterFg: 'rgba(211, 47, 47, 0.5)',
      icon: '#d32f2f',
    },
  },
};

/* ── Dark-mode colour definitions ────────────────────────────────────── */

const spatialDark: ThemeColorDefs = {
  canvas: {
    default: spatialColors.black,
    subtle: '#111827',
  },
  fg: {
    default: '#E0E7FF',
    muted: '#94A3B8',
    onEmphasis: spatialColors.white,
  },
  accent: {
    fg: spatialColors.indigoAccent,
    emphasis: spatialColors.indigoBright,
    muted: spatialColors.indigoBrand,
    subtle: '#1E1B4B',
  },
  success: {
    fg: '#3fb950',
    emphasis: '#238636',
    muted: '#2ea043',
    subtle: '#0f2a18',
  },
  attention: {
    fg: '#f2cc60',
    emphasis: '#a36f00',
    muted: spatialColors.attentionBrand,
    subtle: '#332300',
  },
  danger: {
    fg: '#ff9aa2',
    emphasis: '#c93d45',
    muted: spatialColors.dangerBrand,
    subtle: '#34161b',
  },
  severe: {
    fg: '#ffba84',
    emphasis: '#bd6a2d',
    muted: spatialColors.severeBrand,
    subtle: '#321d08',
  },
  done: {
    fg: '#c4b5fd',
    emphasis: '#8b5cf6',
    muted: spatialColors.doneBrand,
    subtle: '#22194a',
  },
  btn: {
    text: '#E0E7FF',
    bg: '#1E293B',
    border: 'rgba(199, 210, 254, 0.15)',
    hoverBg: '#334155',
    hoverBorder: '#94A3B8',
    activeBg: '#1E293B',
    activeBorder: '#64748B',
    selectedBg: '#0F172A',
    counterBg: '#334155',
    primary: {
      text: spatialColors.white,
      bg: spatialColors.indigoAccent,
      border: 'rgba(199, 210, 254, 0.15)',
      hoverBg: spatialColors.indigoBright,
      hoverBorder: 'rgba(199, 210, 254, 0.15)',
      selectedBg: spatialColors.indigoBright,
      disabledText: 'rgba(255, 255, 255, 0.5)',
      disabledBg: 'rgba(79, 70, 229, 0.35)',
      disabledBorder: 'rgba(79, 70, 229, 0.2)',
      icon: spatialColors.white,
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: spatialColors.indigoAccent,
      hoverText: spatialColors.white,
      hoverBg: spatialColors.indigoAccent,
      hoverBorder: spatialColors.indigoAccent,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: spatialColors.white,
      selectedBg: spatialColors.indigoBright,
      selectedBorder: spatialColors.indigoBright,
      disabledText: 'rgba(99, 102, 241, 0.5)',
      disabledBg: 'rgba(99, 102, 241, 0.1)',
      disabledCounterBg: 'rgba(99, 102, 241, 0.05)',
      counterBg: 'rgba(99, 102, 241, 0.1)',
      counterFg: spatialColors.indigoAccent,
      hoverCounterFg: spatialColors.white,
      disabledCounterFg: 'rgba(99, 102, 241, 0.5)',
    },
    danger: {
      text: '#f85149',
      hoverText: spatialColors.white,
      hoverBg: '#da3633',
      hoverBorder: '#f85149',
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: spatialColors.white,
      selectedBg: '#b62324',
      selectedBorder: '#ff7b72',
      disabledText: 'rgba(248, 81, 73, 0.5)',
      disabledBg: 'rgba(248, 81, 73, 0.1)',
      disabledCounterBg: 'rgba(248, 81, 73, 0.05)',
      counterBg: 'rgba(248, 81, 73, 0.1)',
      counterFg: '#f85149',
      hoverCounterFg: spatialColors.white,
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
 * (see `spatialThemeStyles`), this is just the unmodified
 * default Primer theme kept for backward compatibility.
 */
export const spatialTheme = primerTheme;

/** Comprehensive Primer CSS-variable overrides for light & dark mode. */
export const spatialThemeStyles = buildThemeStyles(spatialLight, spatialDark);

export default spatialTheme;
