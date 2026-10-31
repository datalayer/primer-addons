/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Metal Theme for Primer React.
 *
 * The Loop theme in cool metal: the same curves, type and motion, on cool
 * neutrals with a steel-blue accent. Its four brushed surfaces are gradients
 * for white text and glass (`--metal-gradient-*`, `--metal-glass-*`).
 * Theming is applied via **CSS custom-property overrides**.
 */

import { metalColors } from '../colors/metalColors';
import { themeAccentTints } from '../colors/themeAccents';
import { type ThemeColorDefs, buildThemeStyles } from '../css/createThemeCSSVars';
import {
  loopDark,
  loopFontFamily,
  loopLight,
  loopMotionVars,
  loopOwnCss,
  loopShapeVars,
  loopTypeVars,
} from './loopThemeStyles';

/* ── Colour definitions ────────────────────────────────────────── */

export const metalLight: ThemeColorDefs = {
  ...loopLight,
  canvas: {
    default: metalColors.white,
    subtle: metalColors.subtle,
  },
  fg: {
    default: metalColors.ink,
    muted: metalColors.gray,
    onEmphasis: '#FFFFFF',
  },
  accent: {
    fg: metalColors.metalText,
    emphasis: metalColors.metalBrand,
    muted: metalColors.metalBrand,
    subtle: metalColors.metalTint,
  },
  border: {
    default: metalColors.line,
    muted: metalColors.lineMuted,
  },
  btn: {
    ...loopLight.btn,
    text: metalColors.ink,
    bg: metalColors.subtle,
    hoverBg: '#ECF0F7',
    activeBg: '#E3E9F2',
    selectedBg: '#E3E9F2',
    counterBg: 'rgba(34, 38, 43, 0.08)',
    primary: {
      ...loopLight.btn.primary,
      text: metalColors.metalOn,
      bg: metalColors.metalBrand,
      border: metalColors.metalBrand,
      hoverBg: metalColors.metalHover,
      hoverBorder: metalColors.metalHover,
      selectedBg: metalColors.metalActive,
      disabledText: 'rgba(255, 255, 255, 0.8)',
      disabledBg: '#B9CBE6',
      disabledBorder: '#B9CBE6',
      icon: metalColors.metalOn,
      counterBg: 'rgba(255, 255, 255, 0.2)',
    },
    outline: {
      ...loopLight.btn.outline,
      text: metalColors.metalText,
      hoverText: metalColors.metalOn,
      hoverBg: metalColors.metalBrand,
      hoverBorder: metalColors.metalBrand,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: metalColors.metalOn,
      selectedBg: metalColors.metalActive,
      selectedBorder: metalColors.metalActive,
      disabledText: metalColors.gray,
      disabledBg: metalColors.subtle,
      counterFg: metalColors.metalText,
      hoverCounterFg: metalColors.metalOn,
      disabledCounterFg: metalColors.gray,
    },
  },
};

export const metalDark: ThemeColorDefs = {
  ...loopDark,
  canvas: {
    default: metalColors.black,
    subtle: metalColors.subtleDark,
  },
  fg: {
    default: metalColors.inkDark,
    muted: metalColors.grayDark,
    onEmphasis: '#FFFFFF',
  },
  accent: {
    fg: metalColors.metalBright,
    emphasis: metalColors.metalBright,
    muted: metalColors.metalBright,
    subtle: metalColors.metalTintDark,
  },
  border: {
    default: metalColors.lineDark,
    muted: metalColors.lineMutedDark,
  },
  btn: {
    ...loopDark.btn,
    text: metalColors.inkDark,
    bg: metalColors.subtleDark,
    hoverBg: '#1F2630',
    activeBg: '#28303B',
    selectedBg: '#28303B',
    counterBg: 'rgba(238, 242, 247, 0.12)',
    primary: {
      ...loopDark.btn.primary,
      text: metalColors.metalOnDark,
      bg: metalColors.metalBright,
      border: metalColors.metalBright,
      hoverBg: metalColors.metalBrightHover,
      hoverBorder: metalColors.metalBrightHover,
      selectedBg: metalColors.metalBrightHover,
      disabledText: 'rgba(11, 26, 48, 0.6)',
      disabledBg: 'rgba(143, 180, 232, 0.35)',
      disabledBorder: 'transparent',
      icon: metalColors.metalOnDark,
      counterBg: 'rgba(11, 26, 48, 0.15)',
    },
    outline: {
      ...loopDark.btn.outline,
      text: metalColors.metalBright,
      hoverText: metalColors.metalOnDark,
      hoverBg: metalColors.metalBright,
      hoverBorder: metalColors.metalBright,
      selectedText: metalColors.metalOnDark,
      selectedBg: metalColors.metalBrightHover,
      selectedBorder: metalColors.metalBrightHover,
      disabledText: 'rgba(143, 180, 232, 0.5)',
      disabledBg: 'rgba(143, 180, 232, 0.1)',
      disabledCounterBg: 'rgba(143, 180, 232, 0.05)',
      counterBg: 'rgba(143, 180, 232, 0.1)',
      counterFg: metalColors.metalBright,
      hoverCounterFg: metalColors.metalOnDark,
      disabledCounterFg: 'rgba(143, 180, 232, 0.5)',
    },
  },
};

/* ── Surfaces, shadows ─────────────────────────────────────────── */

/** The four brushed surfaces, and the glass that sits on them, the same in both modes. */
export const metalSurfaceVars: Record<string, string> = {
  '--metal-gradient-sage': `linear-gradient(160deg, ${metalColors.sageFrom}, ${metalColors.sageTo})`,
  '--metal-gradient-steel': `linear-gradient(160deg, ${metalColors.steelFrom}, ${metalColors.steelTo})`,
  '--metal-gradient-mauve': `linear-gradient(160deg, ${metalColors.mauveFrom}, ${metalColors.mauveTo})`,
  '--metal-gradient-clay': `linear-gradient(160deg, ${metalColors.clayFrom}, ${metalColors.clayTo})`,
  '--metal-glass-bg': 'rgba(255, 255, 255, 0.14)',
  '--metal-glass-border': 'rgba(255, 255, 255, 0.24)',
};

const metalHairline = {
  light: 'rgba(76, 118, 186, 0.16)',
  dark: 'rgba(255, 255, 255, 0.10)',
};

/** Loop's soft shadows, with blue in them on light, and a hairline around a floating surface. */
export const metalShadows: Record<'light' | 'dark', Record<string, string>> = {
  light: {
    '--loop-shadow-frame': '0 1px 2px rgba(34, 52, 84, 0.04), 0 12px 32px rgba(34, 52, 84, 0.08)',
    '--theme-shadow': '0 1px 2px rgba(34, 52, 84, 0.04), 0 12px 32px rgba(34, 52, 84, 0.08)',
    '--shadow-resting-xsmall': '0 1px 1px rgba(34, 52, 84, 0.04)',
    '--shadow-resting-small': '0 1px 2px rgba(34, 52, 84, 0.05)',
    '--shadow-resting-medium': '0 2px 8px rgba(34, 52, 84, 0.06)',
    '--shadow-floating-small': '0 0 0 1px rgba(76, 118, 186, 0.10), 0 4px 14px rgba(34, 52, 84, 0.09)',
    '--shadow-floating-medium': '0 0 0 1px rgba(76, 118, 186, 0.10), 0 8px 24px rgba(34, 52, 84, 0.11)',
    '--shadow-floating-large': '0 0 0 1px rgba(76, 118, 186, 0.10), 0 16px 48px rgba(34, 52, 84, 0.14)',
    '--shadow-floating-xlarge': '0 0 0 1px rgba(76, 118, 186, 0.10), 0 24px 64px rgba(34, 52, 84, 0.18)',
  },
  dark: {
    '--loop-shadow-frame': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 12px 36px rgba(0, 0, 0, 0.5)',
    '--theme-shadow': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 12px 36px rgba(0, 0, 0, 0.5)',
    '--shadow-resting-xsmall': '0 0 0 1px rgba(255, 255, 255, 0.05)',
    '--shadow-resting-small': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 1px 2px rgba(0, 0, 0, 0.35)',
    '--shadow-resting-medium': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 2px 8px rgba(0, 0, 0, 0.4)',
    '--shadow-floating-small': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 14px rgba(0, 0, 0, 0.5)',
    '--shadow-floating-medium': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 24px rgba(0, 0, 0, 0.55)',
    '--shadow-floating-large': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 16px 48px rgba(0, 0, 0, 0.6)',
    '--shadow-floating-xlarge': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 64px rgba(0, 0, 0, 0.65)',
  },
};

export const metalFocusRing = { light: metalColors.metalRing, dark: metalColors.metalBright } as const;

const metalTints = (mode: 'light' | 'dark') =>
  themeAccentTints({
    accent: mode === 'light' ? metalColors.metalBrand : metalColors.metalBright,
    on: mode === 'light' ? metalColors.metalOn : metalColors.metalOnDark,
    stage: mode === 'light' ? metalColors.metalStage : metalColors.metalStageDark,
    quiet: mode === 'light' ? metalColors.metalTint : metalColors.metalTintDark,
  });

const metalVariables = (mode: 'light' | 'dark'): Record<string, string> => ({
  ...loopShapeVars,
  ...metalTints(mode),
  ...loopMotionVars,
  ...metalShadows[mode],
  ...loopTypeVars(loopFontFamily),
  ...metalSurfaceVars,
  '--loop-hairline': metalHairline[mode],
  '--borderColor-default': metalHairline[mode],
  '--focus-outlineColor': metalFocusRing[mode],
  '--underlineNav-borderColor-active': mode === 'light' ? metalColors.metalBrand : metalColors.metalBright,
});

/* ── Exports ───────────────────────────────────────────────────── */

/** Comprehensive Primer CSS-variable overrides for light & dark mode: Loop's curves, Metal's colours. */
export const metalThemeStyles = buildThemeStyles(metalLight, metalDark, {
  fontFamily: loopFontFamily,
  css: loopOwnCss,
  shape: {
    radiusControl: loopShapeVars['--loop-radius-control'],
    radiusTable: loopShapeVars['--borderRadius-medium'],
    radiusOverlay: loopShapeVars['--loop-radius-card'],
    radiusCard: loopShapeVars['--loop-radius-card'],
    radiusBubble: loopShapeVars['--loop-radius-bubble'],
    radiusFrame: loopShapeVars['--loop-radius-frame'],
    shadow: metalShadows.light['--theme-shadow'],
    motionStatus: loopMotionVars['--loop-motion-status'],
    motionMessage: loopMotionVars['--loop-motion-message'],
    motionPane: loopMotionVars['--loop-motion-pane'],
    motionEasing: loopMotionVars['--loop-motion-easing'],
    messageLink: 'currentColor',
  },
  variables: {
    light: metalVariables('light'),
    dark: metalVariables('dark'),
  },
});
