/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Metal Theme for Primer React.
 *
 * Loop's curves and motion, with a look of its own. On light, a page that is
 * not white: a blue-grey wash and a dot grid, panels drawn by a pale steel
 * line rather than floated on a shadow, outlined controls, a brushed filled
 * button. On dark, the page is the surface: a deep mesh of sage, steel, mauve
 * and clay, frosted glass on it, white type, and a white button. In both,
 * Geist in regular weight, with numbers in step (`style/metal-face.css`).
 * Theming is applied via **CSS custom-property overrides** and a stylesheet.
 */

import { metalColors } from '../colors/metalColors';
import { themeAccentTints } from '../colors/themeAccents';
import { type ThemeColorDefs, buildThemeStyles } from '../css/createThemeCSSVars';
import {
  loopDark,
  loopLight,
  loopMotionVars,
  loopShapeVars,
  loopTypeScale,
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
    muted: metalColors.metalTintLine,
    subtle: metalColors.metalTint,
  },
  border: {
    default: metalColors.line,
    muted: metalColors.lineMuted,
  },
  btn: {
    ...loopLight.btn,
    text: metalColors.ink,
    // Outlined, not filled: a control is drawn as a panel is.
    bg: '#FFFFFF',
    border: metalColors.controlLine,
    hoverBg: '#F4F7FB',
    hoverBorder: '#C4D2E6',
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
  // Solid stand-ins for the page behind the glass, which the checks read;
  // what is painted is `metalVariables` and the mesh.
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
    // A fill with white text on it, as everywhere; the white button is `btn.primary`.
    emphasis: metalColors.metalBrand,
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
    bg: 'rgba(255, 255, 255, 0.10)',
    border: 'rgba(255, 255, 255, 0.22)',
    hoverBg: 'rgba(255, 255, 255, 0.16)',
    hoverBorder: 'rgba(255, 255, 255, 0.32)',
    activeBg: 'rgba(255, 255, 255, 0.20)',
    selectedBg: 'rgba(255, 255, 255, 0.20)',
    counterBg: 'rgba(238, 242, 247, 0.12)',
    // White on the mesh, the brightest thing on the page.
    primary: {
      ...loopDark.btn.primary,
      text: metalColors.metalOnDark,
      bg: metalColors.white,
      border: metalColors.white,
      hoverBg: '#E8EEF7',
      hoverBorder: '#E8EEF7',
      selectedBg: '#DCE5F2',
      disabledText: 'rgba(11, 26, 48, 0.6)',
      disabledBg: 'rgba(255, 255, 255, 0.35)',
      disabledBorder: 'transparent',
      icon: metalColors.metalOnDark,
      counterBg: 'rgba(11, 26, 48, 0.12)',
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

/* ── Faces, type ───────────────────────────────────────────────── */

export const metalFontFamily =
  '"Geist Variable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const metalMonoFamily =
  '"Geist Mono Variable", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

/** The two weights: titles stay regular, what must stand out is 500. */
export const metalFontWeights = { regular: 400, medium: 500 } as const;

/** Loop's sizes, in Metal's weights: a title is large and light, never bold. */
const metalTypeVars = (): Record<string, string> => {
  const { regular, medium } = metalFontWeights;
  const { display, title, heading } = loopTypeScale;
  return {
    ...loopTypeVars(metalFontFamily),
    '--base-text-weight-medium': String(medium),
    '--base-text-weight-semibold': String(medium),
    '--text-display-weight': String(regular),
    '--text-display-shorthand': `${regular} ${display.size}/${display.lineHeight} ${metalFontFamily}`,
    '--text-title-shorthand-large': `${regular} ${display.size}/${display.lineHeight} ${metalFontFamily}`,
    '--text-title-shorthand-medium': `${regular} ${title.size}/${title.lineHeight} ${metalFontFamily}`,
    '--text-title-shorthand-small': `${medium} ${heading.size}/${heading.lineHeight} ${metalFontFamily}`,
    '--loop-tracking-display': '-0.03em',
    '--loop-tracking-title': '-0.02em',
    '--fontStack-monospace': metalMonoFamily,
  };
};

/* ── Surfaces ──────────────────────────────────────────────────── */

/** The four brushed surfaces, and the glass that sits on them, the same in both modes. */
export const metalSurfaceVars: Record<string, string> = {
  '--metal-gradient-sage': `linear-gradient(160deg, ${metalColors.sageFrom}, ${metalColors.sageTo})`,
  '--metal-gradient-steel': `linear-gradient(160deg, ${metalColors.steelFrom}, ${metalColors.steelTo})`,
  '--metal-gradient-mauve': `linear-gradient(160deg, ${metalColors.mauveFrom}, ${metalColors.mauveTo})`,
  '--metal-gradient-clay': `linear-gradient(160deg, ${metalColors.clayFrom}, ${metalColors.clayTo})`,
  '--metal-glass-bg': 'rgba(255, 255, 255, 0.14)',
  '--metal-glass-border': 'rgba(255, 255, 255, 0.24)',
};

/** What a page is painted with, per mode. */
export const metalPage = {
  light: [
    'radial-gradient(rgba(76, 118, 186, 0.15) 1px, transparent 1.2px) 0 0 / 22px 22px',
    'radial-gradient(1100px 620px at 88% -8%, #D6E4F7 0%, transparent 62%)',
    'radial-gradient(900px 560px at -6% 4%, #E6F0EE 0%, transparent 60%)',
    '#F7F9FD',
  ].join(', '),
  dark: [
    'radial-gradient(900px 640px at 6% -4%, #55794E 0%, transparent 62%)',
    'radial-gradient(1000px 700px at 96% 4%, #2C6AA8 0%, transparent 60%)',
    'radial-gradient(900px 640px at 92% 102%, #8E3F60 0%, transparent 60%)',
    'radial-gradient(800px 560px at 8% 104%, #93492E 0%, transparent 58%)',
    '#1C2A33',
  ].join(', '),
};

const metalHairline = {
  light: 'rgba(76, 138, 200, 0.26)',
  dark: 'rgba(255, 255, 255, 0.18)',
};

/** What is painted, beside the solid stand-ins: a panel on light, glass on dark. */
const metalPainted: Record<'light' | 'dark', Record<string, string>> = {
  light: {
    '--bgColor-default': '#FFFFFF',
    '--bgColor-muted': '#F6F9FD',
    '--bgColor-inset': '#F1F5FB',
    '--overlay-bgColor': '#FFFFFF',
    '--metal-primary-image': 'linear-gradient(180deg, #5C86C8 0%, #3F68AC 100%)',
    '--metal-primary-shadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.28), 0 1px 2px rgba(34, 52, 84, 0.18)',
    '--control-transparent-bgColor-selected': '#EDF1F6',
  },
  dark: {
    // Deep rather than clear: what floats over the page must stay readable.
    '--bgColor-default': 'rgba(30, 44, 54, 0.74)',
    '--bgColor-muted': 'rgba(255, 255, 255, 0.06)',
    '--bgColor-inset': 'rgba(0, 0, 0, 0.14)',
    '--bgColor-accent-muted': 'rgba(255, 255, 255, 0.09)',
    '--borderColor-accent-muted': 'rgba(255, 255, 255, 0.22)',
    '--overlay-bgColor': '#25343F',
    '--metal-primary-image': 'none',
    '--metal-primary-shadow': 'none',
    '--fgColor-default': '#FFFFFF',
    '--fgColor-muted': 'rgba(255, 255, 255, 0.74)',
    '--control-transparent-bgColor-selected': 'rgba(255, 255, 255, 0.14)',
  },
};

/** A panel lies on the page: a line and nothing under it, a menu alone floats. */
export const metalShadows: Record<'light' | 'dark', Record<string, string>> = {
  light: {
    '--loop-shadow-frame': 'none',
    '--theme-shadow': 'none',
    '--shadow-resting-xsmall': 'none',
    '--shadow-resting-small': 'none',
    '--shadow-resting-medium': 'none',
    '--shadow-floating-small': '0 0 0 1px rgba(76, 118, 186, 0.16), 0 6px 18px rgba(34, 52, 84, 0.08)',
    '--shadow-floating-medium': '0 0 0 1px rgba(76, 118, 186, 0.16), 0 10px 28px rgba(34, 52, 84, 0.10)',
    '--shadow-floating-large': '0 0 0 1px rgba(76, 118, 186, 0.16), 0 18px 48px rgba(34, 52, 84, 0.12)',
    '--shadow-floating-xlarge': '0 0 0 1px rgba(76, 118, 186, 0.16), 0 24px 64px rgba(34, 52, 84, 0.14)',
  },
  dark: {
    '--loop-shadow-frame': 'none',
    '--theme-shadow': 'none',
    '--shadow-resting-xsmall': 'none',
    '--shadow-resting-small': 'none',
    '--shadow-resting-medium': 'none',
    '--shadow-floating-small': '0 0 0 1px rgba(255, 255, 255, 0.16), 0 6px 18px rgba(0, 0, 0, 0.3)',
    '--shadow-floating-medium': '0 0 0 1px rgba(255, 255, 255, 0.16), 0 10px 28px rgba(0, 0, 0, 0.35)',
    '--shadow-floating-large': '0 0 0 1px rgba(255, 255, 255, 0.16), 0 18px 48px rgba(0, 0, 0, 0.4)',
    '--shadow-floating-xlarge': '0 0 0 1px rgba(255, 255, 255, 0.16), 0 24px 64px rgba(0, 0, 0, 0.45)',
  },
};

export const metalFocusRing = { light: metalColors.metalRing, dark: metalColors.white } as const;

const metalTints = (mode: 'light' | 'dark') =>
  themeAccentTints({
    accent: mode === 'light' ? metalColors.metalBrand : metalColors.white,
    on: mode === 'light' ? metalColors.metalOn : metalColors.metalOnDark,
    stage: mode === 'light' ? metalColors.metalStage : metalColors.metalStageDark,
    quiet: mode === 'light' ? metalColors.metalTint : metalColors.metalTintDark,
  });

const metalVariables = (mode: 'light' | 'dark'): Record<string, string> => ({
  ...loopShapeVars,
  ...metalTints(mode),
  ...loopMotionVars,
  ...metalShadows[mode],
  ...metalTypeVars(),
  ...metalSurfaceVars,
  ...metalPainted[mode],
  '--metal-page': metalPage[mode],
  '--loop-hairline': metalHairline[mode],
  '--borderColor-default': metalHairline[mode],
  '--borderColor-muted': metalHairline[mode],
  '--focus-outlineColor': metalFocusRing[mode],
  '--underlineNav-borderColor-active': mode === 'light' ? metalColors.metalBrand : metalColors.white,
});

/**
 * Metal's own stylesheet: the page painted under everything, its numbers in
 * step, bold at the theme's heavier weight, and the filled button brushed on
 * light (dark's is plain white: the mode is in the variables, not a selector,
 * since an ancestor's `data-color-mode` may say `auto` or the other mode).
 */
const metalOwnCss = `
:scope {
  background: var(--metal-page);
  background-attachment: fixed;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "ss01", "cv11";
  letter-spacing: -0.006em;
}
:scope b,
:scope strong {
  font-weight: var(--base-text-weight-medium);
}
:scope h1,
:scope h2 {
  font-weight: 400;
  letter-spacing: -0.02em;
}
:scope h3,
:scope h4 {
  font-weight: 500;
  letter-spacing: -0.012em;
}
:scope code,
:scope kbd,
:scope pre,
:scope [class*="CounterLabel"] {
  font-family: var(--fontStack-monospace);
}
:scope [data-variant="primary"] {
  background-image: var(--metal-primary-image);
  box-shadow: var(--metal-primary-shadow);
}
`;

/* ── Exports ───────────────────────────────────────────────────── */

/** Comprehensive Primer CSS-variable overrides for light & dark mode: Loop's curves, Metal's look. */
export const metalThemeStyles = buildThemeStyles(metalLight, metalDark, {
  fontFamily: metalFontFamily,
  css: metalOwnCss,
  shape: {
    radiusControl: loopShapeVars['--loop-radius-control'],
    radiusTable: loopShapeVars['--borderRadius-medium'],
    radiusOverlay: loopShapeVars['--loop-radius-card'],
    radiusCard: loopShapeVars['--loop-radius-card'],
    radiusBubble: loopShapeVars['--loop-radius-bubble'],
    radiusFrame: loopShapeVars['--loop-radius-frame'],
    shadow: 'none',
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
