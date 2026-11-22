/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Agent Theme for Primer React.
 *
 * Soft and clear, for somebody who is not here for the software: one accent,
 * neutral everything else. A white (or near-black) canvas, a deep-grey ink
 * rather than black, faint hairlines, surfaces that float on soft shadows
 * instead of sitting in boxes, generous rounding, and one filled button in
 * the accent — the thing to press, plain to see. Inter, with the system
 * sans-serif stack behind it, titles set tight.
 * Theming is applied via **CSS custom-property overrides**.
 *
 * Unlike the other themes it also sets **shape**: rounder corners, and
 * its own `--agent-*` properties for what an application is drawn with —
 * a bubble, a frame, a face. Its accent and stage are the theme system's
 * (`--theme-accent`, `--theme-stage` and the rest, `themeAccents`): mint.
 */

import { agentColors } from '../colors/agentColors';
import { themeAccentTints, themeAccents } from '../colors/themeAccents';
import { type ThemeColorDefs, buildThemeStyles } from '../css/createThemeCSSVars';
import { roundedRadiusVars, roundedShape } from './roundedShape';

/* ── Light-mode colour definitions ───────────────────────────────────── */

export const agentLight: ThemeColorDefs = {
  canvas: {
    default: agentColors.white,
    subtle: agentColors.subtle,
  },
  fg: {
    default: agentColors.ink,
    muted: agentColors.gray,
    onEmphasis: '#FFFFFF',
  },
  accent: {
    fg: agentColors.agentText,
    // The accent itself, as on dark: the soft mint that dark text sits on —
    // the filled button, the person's bubble, the assistant's avatar. The
    // chat pairs it with the button's text, so the two stay one colour.
    emphasis: agentColors.agentBrand,
    muted: agentColors.agentBrand,
    subtle: agentColors.agentTint,
  },
  success: {
    fg: agentColors.successBrand,
    emphasis: agentColors.successBrand,
    muted: agentColors.successAccent,
    subtle: agentColors.successTint,
  },
  attention: {
    fg: agentColors.attentionBrand,
    emphasis: agentColors.attentionBrand,
    muted: agentColors.attentionAccent,
    subtle: agentColors.attentionTint,
  },
  danger: {
    fg: agentColors.dangerBrand,
    emphasis: agentColors.dangerBrand,
    muted: agentColors.dangerAccent,
    subtle: agentColors.dangerTint,
  },
  severe: {
    fg: agentColors.severeBrand,
    emphasis: agentColors.severeBrand,
    muted: agentColors.severeAccent,
    subtle: agentColors.severeTint,
  },
  done: {
    fg: agentColors.doneBrand,
    emphasis: agentColors.doneBrand,
    muted: agentColors.doneAccent,
    subtle: agentColors.doneTint,
  },
  border: {
    // Hairlines: 7% of the ink, as solid colours on white — a surface is
    // told apart by its shadow more than by a line.
    default: '#ECECEE',
    muted: '#F2F2F4',
  },
  btn: {
    text: agentColors.ink,
    bg: agentColors.subtle,
    border: 'transparent',
    hoverBg: '#ECECEF',
    hoverBorder: 'transparent',
    activeBg: '#E3E3E7',
    activeBorder: 'transparent',
    selectedBg: '#E3E3E7',
    counterBg: 'rgba(29, 29, 31, 0.08)',
    // The one filled button of a screen, in the accent: the soft mint, with
    // its dark text — the same pastel as on dark, never the platform's deep green.
    primary: {
      text: agentColors.agentOn,
      bg: agentColors.agentBrand,
      border: agentColors.agentBrand,
      hoverBg: agentColors.agentBrandHover,
      hoverBorder: agentColors.agentBrandHover,
      selectedBg: agentColors.agentAccent,
      disabledText: 'rgba(6, 40, 30, 0.5)',
      disabledBg: '#CDEFE2',
      disabledBorder: '#CDEFE2',
      icon: agentColors.agentOn,
      counterBg: 'rgba(6, 40, 30, 0.12)',
    },
    outline: {
      text: agentColors.agentText,
      hoverText: agentColors.agentOn,
      hoverBg: agentColors.agentBrand,
      hoverBorder: agentColors.agentBrand,
      hoverCounterBg: 'rgba(6, 40, 30, 0.12)',
      selectedText: agentColors.agentOn,
      selectedBg: agentColors.agentAccent,
      selectedBorder: agentColors.agentAccent,
      disabledText: agentColors.gray,
      disabledBg: agentColors.subtle,
      disabledCounterBg: 'rgba(0, 0, 0, 0.05)',
      counterBg: 'rgba(0, 0, 0, 0.05)',
      counterFg: agentColors.agentText,
      hoverCounterFg: agentColors.agentOn,
      disabledCounterFg: agentColors.gray,
    },
    danger: {
      text: agentColors.dangerBrand,
      hoverText: '#FFFFFF',
      hoverBg: agentColors.dangerBrand,
      hoverBorder: agentColors.dangerBrand,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FFFFFF',
      selectedBg: '#9C302A',
      selectedBorder: '#9C302A',
      disabledText: 'rgba(191, 63, 56, 0.5)',
      disabledBg: agentColors.subtle,
      disabledCounterBg: 'rgba(191, 63, 56, 0.05)',
      counterBg: 'rgba(191, 63, 56, 0.1)',
      counterFg: agentColors.dangerBrand,
      hoverCounterFg: '#FFFFFF',
      disabledCounterFg: 'rgba(191, 63, 56, 0.5)',
      icon: agentColors.dangerBrand,
    },
  },
};

/* ── Dark-mode colour definitions ────────────────────────────────────── */

export const agentDark: ThemeColorDefs = {
  canvas: {
    default: agentColors.black,
    subtle: agentColors.subtleDark,
  },
  fg: {
    default: agentColors.inkDark,
    muted: agentColors.grayDark,
    onEmphasis: '#FFFFFF',
  },
  accent: {
    fg: agentColors.agentBright,
    // The accent itself, on dark: a pastel that dark text sits on.
    emphasis: agentColors.agentBrand,
    muted: agentColors.agentBrand,
    subtle: agentColors.agentTintDark,
  },
  success: {
    fg: agentColors.successAccent,
    emphasis: agentColors.successBrand,
    muted: agentColors.successAccent,
    subtle: '#12241B',
  },
  attention: {
    fg: agentColors.attentionAccent,
    emphasis: '#8A5710',
    muted: agentColors.attentionAccent,
    subtle: '#2A2010',
  },
  danger: {
    fg: agentColors.dangerAccent,
    emphasis: agentColors.dangerBrand,
    muted: agentColors.dangerAccent,
    subtle: '#2C1615',
  },
  severe: {
    fg: agentColors.severeAccent,
    emphasis: agentColors.severeBrand,
    muted: agentColors.severeAccent,
    subtle: '#2B1B10',
  },
  done: {
    fg: agentColors.doneAccent,
    emphasis: agentColors.doneBrand,
    muted: agentColors.doneAccent,
    subtle: '#1C1A27',
  },
  border: {
    // Hairlines: 10% of the ink, as solid colours on near-black.
    default: '#2A2A2C',
    muted: '#222224',
  },
  btn: {
    text: agentColors.inkDark,
    bg: agentColors.subtleDark,
    border: 'transparent',
    hoverBg: '#28282B',
    hoverBorder: 'transparent',
    activeBg: '#303033',
    activeBorder: 'transparent',
    selectedBg: '#303033',
    counterBg: 'rgba(245, 245, 247, 0.12)',
    // The one filled button of a screen, in the accent: the pastel, with
    // its dark text, the brightest thing on a dark page.
    primary: {
      text: agentColors.agentOn,
      bg: agentColors.agentBrand,
      border: agentColors.agentBrand,
      hoverBg: agentColors.agentBright,
      hoverBorder: agentColors.agentBright,
      selectedBg: '#6CCFAA',
      disabledText: 'rgba(6, 40, 30, 0.6)',
      disabledBg: 'rgba(122, 219, 184, 0.35)',
      disabledBorder: 'transparent',
      icon: agentColors.agentOn,
      counterBg: 'rgba(6, 40, 30, 0.15)',
    },
    outline: {
      text: agentColors.agentBright,
      hoverText: agentColors.agentOn,
      hoverBg: agentColors.agentBright,
      hoverBorder: agentColors.agentBright,
      hoverCounterBg: 'rgba(0, 0, 0, 0.2)',
      selectedText: agentColors.agentOn,
      selectedBg: agentColors.agentBrand,
      selectedBorder: agentColors.agentBrand,
      disabledText: 'rgba(143, 229, 198, 0.5)',
      disabledBg: 'rgba(143, 229, 198, 0.1)',
      disabledCounterBg: 'rgba(143, 229, 198, 0.05)',
      counterBg: 'rgba(143, 229, 198, 0.1)',
      counterFg: agentColors.agentBright,
      hoverCounterFg: agentColors.agentOn,
      disabledCounterFg: 'rgba(143, 229, 198, 0.5)',
    },
    danger: {
      text: agentColors.dangerAccent,
      hoverText: '#FFFFFF',
      hoverBg: agentColors.dangerBrand,
      hoverBorder: agentColors.dangerAccent,
      hoverCounterBg: 'rgba(255, 255, 255, 0.2)',
      selectedText: '#FFFFFF',
      selectedBg: '#9C302A',
      selectedBorder: agentColors.dangerAccent,
      disabledText: 'rgba(240, 138, 131, 0.5)',
      disabledBg: 'rgba(240, 138, 131, 0.1)',
      disabledCounterBg: 'rgba(240, 138, 131, 0.05)',
      counterBg: 'rgba(240, 138, 131, 0.1)',
      counterFg: agentColors.dangerAccent,
      hoverCounterFg: '#FFFFFF',
      disabledCounterFg: 'rgba(240, 138, 131, 0.5)',
      icon: agentColors.dangerAccent,
    },
  },
};

/* ── Shape, type and motion ──────────────────────────────────────────── */

/**
 * What the Agent theme sets beside colour, the same in both modes.
 *
 * Primer's own radii are made rounder; the `--agent-*` properties are what
 * an application is drawn with. A face is an emoji at one of three sizes;
 * motion has three durations and one easing.
 */
export const agentShapeVars: Record<string, string> = {
  // The rounded shape's radii, shared with Metal, Sand, Ivory and Sun.
  ...roundedRadiusVars,
  // Light mode's; `agentShadows` says dark mode's.
  '--agent-shadow-frame': '0 1px 2px rgba(0, 0, 0, 0.03), 0 10px 30px rgba(0, 0, 0, 0.06)',
  '--agent-face-large': '72px',
  '--agent-face-medium': '40px',
  '--agent-face-small': '20px',
  '--agent-motion-fast': '120ms',
  '--agent-motion-medium': '200ms',
  '--agent-motion-slow': '320ms',
  '--agent-motion-easing': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
};

/** The hairline between two surfaces, per mode. */
const agentHairline = {
  light: 'rgba(29, 29, 31, 0.07)',
  dark: 'rgba(255, 255, 255, 0.10)',
};

/**
 * Shadows, per mode: how a surface floats. Soft and low in the light —
 * a card is told apart by its shadow more than by a line; in the dark a
 * shadow shows little, so a surface gets a hairline of light and a
 * deeper shadow. Primer's own shadow tokens take the same hand, so a menu
 * or a dialog floats the way a frame does.
 */
export const agentShadows: Record<'light' | 'dark', Record<string, string>> = {
  light: {
    '--agent-shadow-frame': '0 1px 2px rgba(0, 0, 0, 0.03), 0 10px 30px rgba(0, 0, 0, 0.06)',
    '--theme-shadow': '0 1px 2px rgba(0, 0, 0, 0.03), 0 10px 30px rgba(0, 0, 0, 0.06)',
    '--shadow-resting-xsmall': '0 1px 1px rgba(0, 0, 0, 0.03)',
    '--shadow-resting-small': '0 1px 2px rgba(0, 0, 0, 0.04)',
    '--shadow-resting-medium': '0 2px 8px rgba(0, 0, 0, 0.05)',
    '--shadow-floating-small': '0 0 0 1px rgba(29, 29, 31, 0.04), 0 4px 14px rgba(0, 0, 0, 0.08)',
    '--shadow-floating-medium': '0 0 0 1px rgba(29, 29, 31, 0.04), 0 8px 24px rgba(0, 0, 0, 0.10)',
    '--shadow-floating-large': '0 0 0 1px rgba(29, 29, 31, 0.04), 0 16px 48px rgba(0, 0, 0, 0.14)',
    '--shadow-floating-xlarge': '0 0 0 1px rgba(29, 29, 31, 0.04), 0 24px 64px rgba(0, 0, 0, 0.18)',
  },
  dark: {
    '--agent-shadow-frame': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 12px 36px rgba(0, 0, 0, 0.45)',
    '--theme-shadow': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 12px 36px rgba(0, 0, 0, 0.45)',
    '--shadow-resting-xsmall': '0 0 0 1px rgba(255, 255, 255, 0.05)',
    '--shadow-resting-small': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 1px 2px rgba(0, 0, 0, 0.3)',
    '--shadow-resting-medium': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 2px 8px rgba(0, 0, 0, 0.35)',
    '--shadow-floating-small': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 14px rgba(0, 0, 0, 0.45)',
    '--shadow-floating-medium': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 24px rgba(0, 0, 0, 0.5)',
    '--shadow-floating-large': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 16px 48px rgba(0, 0, 0, 0.55)',
    '--shadow-floating-xlarge': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 64px rgba(0, 0, 0, 0.6)',
  },
};

/**
 * Type: one face, two weights, five sizes, one line-height per
 * size — each line a multiple of 4px.
 *
 * | Size            | Line          | Tokens                               |
 * |-----------------|---------------|--------------------------------------|
 * | 2rem (32px)     | 1.25 (40px)   | display, title large                 |
 * | 1.25rem (20px)  | 1.4 (28px)    | title medium, subtitle               |
 * | 1rem (16px)     | 1.5 (24px)    | title small, body large              |
 * | 0.875rem (14px) | 1.4286 (20px) | body medium — the body of the theme |
 * | 0.75rem (12px)  | 1.3333 (16px) | body small, caption                  |
 *
 * The weights are 400 (body, subtitle) and 600 (titles, display, and what
 * Primer sets in its medium weight — a button's label); Primer's light weight
 * is 400. The titles are set tight and a little closer, as a good display face
 * is; the body left alone. The tracking is a token for a component to apply,
 * since a CSS font shorthand carries none.
 */
export const agentTypeScale = {
  display: { size: '2rem', lineHeight: '1.25' },
  title: { size: '1.25rem', lineHeight: '1.4' },
  heading: { size: '1rem', lineHeight: '1.5' },
  body: { size: '0.875rem', lineHeight: '1.4286' },
  small: { size: '0.75rem', lineHeight: '1.3333' },
} as const;

/** The two weights of the `agent` theme. */
export const agentFontWeights = { regular: 400, semibold: 600 } as const;

export const agentTypeVars = (font: string): Record<string, string> => {
  const { display, title, heading, body, small } = agentTypeScale;
  const { regular, semibold } = agentFontWeights;
  const shorthand = (weight: number, step: { size: string; lineHeight: string }) =>
    `${weight} ${step.size}/${step.lineHeight} ${font}`;
  return {
    '--base-text-weight-light': String(regular),
    '--base-text-weight-normal': String(regular),
    '--base-text-weight-medium': String(semibold),
    '--base-text-weight-semibold': String(semibold),
    '--text-display-size': display.size,
    '--text-display-lineHeight': display.lineHeight,
    '--text-display-lineBoxHeight': display.lineHeight,
    '--text-display-weight': String(semibold),
    '--text-title-size-large': display.size,
    '--text-title-lineHeight-large': display.lineHeight,
    '--text-title-size-medium': title.size,
    '--text-title-lineHeight-medium': title.lineHeight,
    '--text-subtitle-size': title.size,
    '--text-subtitle-lineHeight': title.lineHeight,
    '--text-title-size-small': heading.size,
    '--text-title-lineHeight-small': heading.lineHeight,
    '--text-body-size-large': heading.size,
    '--text-body-lineHeight-large': heading.lineHeight,
    '--text-body-size-medium': body.size,
    '--text-body-lineHeight-medium': body.lineHeight,
    '--text-body-size-small': small.size,
    '--text-body-lineHeight-small': small.lineHeight,
    '--text-caption-size': small.size,
    '--text-caption-lineHeight': small.lineHeight,
    '--text-display-shorthand': shorthand(semibold, display),
    '--text-title-shorthand-large': shorthand(semibold, display),
    '--text-title-shorthand-medium': shorthand(semibold, title),
    '--text-title-shorthand-small': shorthand(semibold, heading),
    '--text-subtitle-shorthand': shorthand(regular, title),
    '--text-body-shorthand-large': shorthand(regular, heading),
    '--text-body-shorthand-medium': shorthand(regular, body),
    '--text-body-shorthand-small': shorthand(regular, small),
    '--text-caption-shorthand': shorthand(regular, small),
    '--agent-tracking-display': '-0.02em',
    '--agent-tracking-title': '-0.012em',
    '--agent-tracking-body': '0',
  };
};

/**
 * The accent's properties in a mode, mint's (`themeAccents.green`): the
 * stage and the quiet tint are mint's own, not derived from the colours.
 */
const agentTints = (mode: 'light' | 'dark') =>
  themeAccentTints({
    accent: themeAccents.green.accent,
    on: themeAccents.green.on,
    stage: themeAccents.green.stage[mode],
    quiet: themeAccents.green.quiet[mode],
  });

/* ── Exports ─────────────────────────────────────────────────────────── */

/**
 * Inter, then its metric-matched fallback, then the system's own sans-serif
 *. One face, two weights (400 and 600). The face is served by the
 * page's own build: a page wearing the theme imports
 * `@datalayer/primer-addons/style/agent-face.css`, which declares
 * `Inter Variable` from `@fontsource-variable/inter` and `Inter Fallback`, a
 * local Arial drawn to Inter's measure. The text paints in the fallback first
 * and does not move when Inter arrives; a page that has not imported the
 * stylesheet shows the system face.
 */
export const agentFontFamily =
  '"Inter Variable", "Inter Fallback", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

/**
 * Motion: three durations and one easing, for three things — a
 * status changing, a message arriving, a pane opening. Nothing else moves.
 */
export const agentMotionVars: Record<string, string> = {
  '--agent-motion-status': '120ms',
  '--agent-motion-message': '200ms',
  '--agent-motion-pane': '320ms',
  '--agent-motion-easing': 'cubic-bezier(0.2, 0, 0, 1)',
};

/**
 * The focus ring: 3 to 1 against the page and around a pill of
 * any accent, in both modes. In light mode the deep mint does it — darker than the text, the one place it is —
 * a halo in the theme's colour, as a system's own focus ring is — 6.5 to 1
 * on white and 3.28 or more around every pastel. In dark mode no
 * colour clears 3 to 1 against both the near-black page and the six
 * pastels, the light ink least of all (under 1.8 to 1 on the pastels): a
 * mid grey does, at 3.04 to 1 — and 2.77 to 1 on the subtle dark surface,
 * the one place it falls short.
 */
export const agentFocusRing = { light: agentColors.agentRing, dark: '#636363' } as const;

/**
 * The agent theme's own stylesheet, beside what its shape draws: bold is the
 * theme's semibold, its second and last weight.
 *
 * Its controls are pills and its tables rounder by its shape
 * (`radiusControl`, `radiusTable`), which `primerComponentsCss` draws for
 * any theme that sets them: menus and overlays keep the card's radius,
 * `--borderRadius-large`, which the theme already sets.
 */
const agentOwnCss = `
:scope b,
:scope strong {
  font-weight: var(--base-text-weight-semibold);
}
`;

/** Comprehensive Primer CSS-variable overrides for light & dark mode. */
export const agentThemeStyles = buildThemeStyles(agentLight, agentDark, {
  fontFamily: agentFontFamily,
  css: agentOwnCss,
  // Rounder than the others: a pill for a control, soft cards,
  // round bubbles, a table with the corners of a list item.
  shape: {
    ...roundedShape,
    shadow: agentShapeVars['--agent-shadow-frame'],
    motionStatus: agentMotionVars['--agent-motion-status'],
    motionMessage: agentMotionVars['--agent-motion-message'],
    motionPane: agentMotionVars['--agent-motion-pane'],
    motionEasing: agentMotionVars['--agent-motion-easing'],
    // Links plain in a message: the words' own colour, underlined.
    messageLink: 'currentColor',
  },
  variables: {
    light: {
      ...agentShapeVars,
      ...agentTints('light'),
      ...agentMotionVars,
      ...agentShadows.light,
      ...agentTypeVars(agentFontFamily),
      '--agent-hairline': agentHairline.light,
      // The hairline is Primer's default border: a card drawn with
      // `borderColor="border.default"` gets it, no fallback chain at the call site.
      '--borderColor-default': agentHairline.light,
      '--focus-outlineColor': agentFocusRing.light,
      // The selected tab underlined in the accent, not Primer's coral.
      '--underlineNav-borderColor-active': themeAccents.green.accent,
    },
    dark: {
      ...agentShapeVars,
      ...agentTints('dark'),
      ...agentMotionVars,
      ...agentShadows.dark,
      ...agentTypeVars(agentFontFamily),
      '--agent-hairline': agentHairline.dark,
      // The hairline is Primer's default border: a card drawn with
      // `borderColor="border.default"` gets it, no fallback chain at the call site.
      '--borderColor-default': agentHairline.dark,
      '--focus-outlineColor': agentFocusRing.dark,
      // The selected tab underlined in the accent, not Primer's coral.
      '--underlineNav-borderColor-active': themeAccents.green.accent,
    },
  },
});

/**
 * The agent theme's whole stylesheet (`ThemeStyles.css`): its controls as
 * pills and its tables rounder, drawn from its shape, then its own rules.
 */
export const agentControlsCss: string = agentThemeStyles.css ?? '';
