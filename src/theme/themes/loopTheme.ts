/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Loop Theme for Primer React.
 *
 * Very clean: one accent, neutral everything else. A white (or near-black)
 * canvas, near-black (or near-white) text, hairlines for borders, and a
 * filled button that is ink on paper rather than a colour. Uses Inter,
 * with the system sans-serif stack behind it.
 * Theming is applied via **CSS custom-property overrides**.
 *
 * Unlike the other themes it also sets **shape**: rounder corners, and
 * its own `--loop-*` properties for what an application is drawn with —
 * its accent, the stage behind it, a bubble, a frame, a face.
 */

import { theme as primerTheme } from '@primer/react';
import { loopAccentVars, loopColors } from '../colors/loopColors';
import { type ThemeColorDefs, buildThemeStyles } from '../css/createThemeCSSVars';

/* ── Light-mode colour definitions ───────────────────────────────────── */

const loopLight: ThemeColorDefs = {
  canvas: {
    default: loopColors.white,
    subtle: loopColors.subtle,
  },
  fg: {
    default: loopColors.ink,
    muted: loopColors.gray,
    onEmphasis: '#FFFFFF',
  },
  accent: {
    fg: loopColors.loopText,
    emphasis: loopColors.loopText,
    muted: loopColors.loopBrand,
    subtle: loopColors.loopTint,
  },
  success: {
    fg: loopColors.successBrand,
    emphasis: loopColors.successBrand,
    muted: loopColors.successAccent,
    subtle: loopColors.successTint,
  },
  attention: {
    fg: loopColors.attentionBrand,
    emphasis: loopColors.attentionBrand,
    muted: loopColors.attentionAccent,
    subtle: loopColors.attentionTint,
  },
  danger: {
    fg: loopColors.dangerBrand,
    emphasis: loopColors.dangerBrand,
    muted: loopColors.dangerAccent,
    subtle: loopColors.dangerTint,
  },
  severe: {
    fg: loopColors.severeBrand,
    emphasis: loopColors.severeBrand,
    muted: loopColors.severeAccent,
    subtle: loopColors.severeTint,
  },
  done: {
    fg: loopColors.doneBrand,
    emphasis: loopColors.doneBrand,
    muted: loopColors.doneAccent,
    subtle: loopColors.doneTint,
  },
  border: {
    // Hairlines: 9% of the ink, as solid colours on white.
    default: '#E9E9E7',
    muted: '#F0F0EE',
  },
  btn: {
    text: loopColors.ink,
    bg: loopColors.subtle,
    border: 'transparent',
    hoverBg: '#ECECE9',
    hoverBorder: 'transparent',
    activeBg: '#E4E4E1',
    activeBorder: 'transparent',
    selectedBg: '#E4E4E1',
    counterBg: 'rgba(17, 17, 17, 0.08)',
    // The one filled button of a screen: ink on paper, not a colour.
    primary: {
      text: '#FFFFFF',
      bg: loopColors.ink,
      border: loopColors.ink,
      hoverBg: '#2B2B2B',
      hoverBorder: '#2B2B2B',
      selectedBg: '#2B2B2B',
      disabledText: 'rgba(255, 255, 255, 0.8)',
      disabledBg: '#B9B9B5',
      disabledBorder: '#B9B9B5',
      icon: '#FFFFFF',
      counterBg: 'rgba(255, 255, 255, 0.2)',
    },
    outline: {
      text: loopColors.loopText,
      hoverText: '#FFFFFF',
      hoverBg: loopColors.loopText,
      hoverBorder: loopColors.loopText,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FFFFFF',
      selectedBg: loopColors.loopHover,
      selectedBorder: loopColors.loopHover,
      disabledText: loopColors.gray,
      disabledBg: loopColors.subtle,
      disabledCounterBg: 'rgba(0, 0, 0, 0.05)',
      counterBg: 'rgba(0, 0, 0, 0.05)',
      counterFg: loopColors.loopText,
      hoverCounterFg: '#FFFFFF',
      disabledCounterFg: loopColors.gray,
    },
    danger: {
      text: loopColors.dangerBrand,
      hoverText: '#FFFFFF',
      hoverBg: loopColors.dangerBrand,
      hoverBorder: loopColors.dangerBrand,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FFFFFF',
      selectedBg: '#9C302A',
      selectedBorder: '#9C302A',
      disabledText: 'rgba(191, 63, 56, 0.5)',
      disabledBg: loopColors.subtle,
      disabledCounterBg: 'rgba(191, 63, 56, 0.05)',
      counterBg: 'rgba(191, 63, 56, 0.1)',
      counterFg: loopColors.dangerBrand,
      hoverCounterFg: '#FFFFFF',
      disabledCounterFg: 'rgba(191, 63, 56, 0.5)',
      icon: loopColors.dangerBrand,
    },
  },
};

/* ── Dark-mode colour definitions ────────────────────────────────────── */

const loopDark: ThemeColorDefs = {
  canvas: {
    default: loopColors.black,
    subtle: loopColors.subtleDark,
  },
  fg: {
    default: loopColors.inkDark,
    muted: loopColors.grayDark,
    onEmphasis: '#FFFFFF',
  },
  accent: {
    fg: loopColors.loopBright,
    emphasis: loopColors.loopText,
    muted: loopColors.loopBrand,
    subtle: loopColors.loopTintDark,
  },
  success: {
    fg: loopColors.successAccent,
    emphasis: loopColors.successBrand,
    muted: loopColors.successAccent,
    subtle: '#12241B',
  },
  attention: {
    fg: loopColors.attentionAccent,
    emphasis: '#8A5710',
    muted: loopColors.attentionAccent,
    subtle: '#2A2010',
  },
  danger: {
    fg: loopColors.dangerAccent,
    emphasis: loopColors.dangerBrand,
    muted: loopColors.dangerAccent,
    subtle: '#2C1615',
  },
  severe: {
    fg: loopColors.severeAccent,
    emphasis: loopColors.severeBrand,
    muted: loopColors.severeAccent,
    subtle: '#2B1B10',
  },
  done: {
    fg: loopColors.doneAccent,
    emphasis: loopColors.doneBrand,
    muted: loopColors.doneAccent,
    subtle: '#1C1A27',
  },
  border: {
    // Hairlines: 11% of the ink, as solid colours on near-black.
    default: '#2C2C2D',
    muted: '#232324',
  },
  btn: {
    text: loopColors.inkDark,
    bg: loopColors.subtleDark,
    border: 'transparent',
    hoverBg: '#28282B',
    hoverBorder: 'transparent',
    activeBg: '#303033',
    activeBorder: 'transparent',
    selectedBg: '#303033',
    counterBg: 'rgba(243, 243, 241, 0.12)',
    // The one filled button of a screen: paper on ink.
    primary: {
      text: loopColors.ink,
      bg: loopColors.inkDark,
      border: loopColors.inkDark,
      hoverBg: '#DCDCD9',
      hoverBorder: '#DCDCD9',
      selectedBg: '#DCDCD9',
      disabledText: 'rgba(17, 17, 17, 0.5)',
      disabledBg: 'rgba(243, 243, 241, 0.35)',
      disabledBorder: 'rgba(243, 243, 241, 0.2)',
      icon: loopColors.ink,
      counterBg: 'rgba(0, 0, 0, 0.2)',
    },
    outline: {
      text: loopColors.loopBright,
      hoverText: loopColors.loopOn,
      hoverBg: loopColors.loopBright,
      hoverBorder: loopColors.loopBright,
      hoverCounterBg: 'rgba(0, 0, 0, 0.2)',
      selectedText: loopColors.loopOn,
      selectedBg: loopColors.loopBrand,
      selectedBorder: loopColors.loopBrand,
      disabledText: 'rgba(143, 229, 198, 0.5)',
      disabledBg: 'rgba(143, 229, 198, 0.1)',
      disabledCounterBg: 'rgba(143, 229, 198, 0.05)',
      counterBg: 'rgba(143, 229, 198, 0.1)',
      counterFg: loopColors.loopBright,
      hoverCounterFg: loopColors.loopOn,
      disabledCounterFg: 'rgba(143, 229, 198, 0.5)',
    },
    danger: {
      text: loopColors.dangerAccent,
      hoverText: '#FFFFFF',
      hoverBg: loopColors.dangerBrand,
      hoverBorder: loopColors.dangerAccent,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FFFFFF',
      selectedBg: '#9C302A',
      selectedBorder: loopColors.dangerAccent,
      disabledText: 'rgba(240, 138, 131, 0.5)',
      disabledBg: 'rgba(240, 138, 131, 0.1)',
      disabledCounterBg: 'rgba(240, 138, 131, 0.05)',
      counterBg: 'rgba(240, 138, 131, 0.1)',
      counterFg: loopColors.dangerAccent,
      hoverCounterFg: '#FFFFFF',
      disabledCounterFg: 'rgba(240, 138, 131, 0.5)',
      icon: loopColors.dangerAccent,
    },
  },
};

/* ── Shape, type and motion ──────────────────────────────────────────── */

/**
 * What the Loop theme sets beside colour, the same in both modes.
 *
 * Primer's own radii are made rounder; the `--loop-*` properties are what
 * an application is drawn with. A face is an emoji at one of three sizes;
 * motion has three durations and one easing.
 */
export const loopShapeVars: Record<string, string> = {
  '--borderRadius-small': '8px',
  '--borderRadius-medium': '12px',
  '--borderRadius-large': '16px',
  '--borderRadius-default': '12px',
  '--loop-radius-control': '999px',
  '--loop-radius-card': '16px',
  '--loop-radius-bubble': '20px',
  '--loop-radius-frame': '24px',
  '--loop-shadow-frame': '0 1px 2px rgba(0, 0, 0, 0.04), 0 12px 32px rgba(0, 0, 0, 0.07)',
  '--loop-face-large': '72px',
  '--loop-face-medium': '40px',
  '--loop-face-small': '20px',
  '--loop-motion-fast': '120ms',
  '--loop-motion-medium': '200ms',
  '--loop-motion-slow': '320ms',
  '--loop-motion-easing': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
};

/** The hairline between two surfaces, per mode. */
const loopHairline = {
  light: 'rgba(17, 17, 17, 0.09)',
  dark: 'rgba(255, 255, 255, 0.11)',
};

/* ── Exports ─────────────────────────────────────────────────────────── */

/**
 * The Primer theme object.
 *
 * Since theming is done entirely via CSS custom properties
 * (see `loopThemeStyles`), this is just the unmodified default Primer
 * theme kept for backward compatibility.
 */
export const loopTheme = primerTheme;

/**
 * Inter, then the system's own sans-serif. One face, two weights (400
 * and 600). The page is expected to load Inter; without it the system
 * face is used, and nothing shifts but the letterforms.
 */
export const loopFontFamily =
  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

/**
 * Motion (LOOP T-10): three durations and one easing, for three things — a
 * status changing, a message arriving, a pane opening. Nothing else moves.
 */
export const loopMotionVars: Record<string, string> = {
  '--loop-motion-status': '120ms',
  '--loop-motion-message': '200ms',
  '--loop-motion-pane': '320ms',
  '--loop-motion-easing': 'cubic-bezier(0.2, 0, 0, 1)',
};

/**
 * The focus ring (LOOP T-15): the theme's ink, so that it shows on the
 * surface and around a pill of any accent, in both modes.
 */
export const loopFocusRing = { light: loopColors.ink, dark: loopColors.inkDark } as const;

/** Comprehensive Primer CSS-variable overrides for light & dark mode. */
export const loopThemeStyles = buildThemeStyles(loopLight, loopDark, {
  fontFamily: loopFontFamily,
  // Rounder than the others: a pill for a control, soft cards, round bubbles.
  shape: {
    radiusControl: loopShapeVars['--loop-radius-control'],
    radiusCard: loopShapeVars['--loop-radius-card'],
    radiusBubble: loopShapeVars['--loop-radius-bubble'],
    radiusFrame: loopShapeVars['--loop-radius-frame'],
    shadow: loopShapeVars['--loop-shadow-frame'],
  },
  variables: {
    light: {
      ...loopShapeVars,
      ...loopAccentVars('green', 'light'),
      ...loopMotionVars,
      '--loop-hairline': loopHairline.light,
      '--focus-outlineColor': loopFocusRing.light,
    },
    dark: {
      ...loopShapeVars,
      ...loopAccentVars('green', 'dark'),
      ...loopMotionVars,
      '--loop-hairline': loopHairline.dark,
      '--focus-outlineColor': loopFocusRing.dark,
    },
  },
});

export default loopTheme;
