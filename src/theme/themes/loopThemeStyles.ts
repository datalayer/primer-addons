/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Loop Theme for Primer React.
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
 * its own `--loop-*` properties for what an application is drawn with —
 * a bubble, a frame, a face. Its accent and stage are the theme system's
 * (`--theme-accent`, `--theme-stage` and the rest, `themeAccents`): mint.
 */

import { loopColors } from '../colors/loopColors';
import { themeAccentTints, themeAccents } from '../colors/themeAccents';
import { type ThemeColorDefs, buildThemeStyles } from '../css/createThemeCSSVars';

/* ── Light-mode colour definitions ───────────────────────────────────── */

export const loopLight: ThemeColorDefs = {
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
    // The accent itself, as on dark: the soft mint that dark text sits on —
    // the filled button, the person's bubble, the assistant's avatar. The
    // chat pairs it with the button's text, so the two stay one colour.
    emphasis: loopColors.loopBrand,
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
    // Hairlines: 7% of the ink, as solid colours on white — a surface is
    // told apart by its shadow more than by a line.
    default: '#ECECEE',
    muted: '#F2F2F4',
  },
  btn: {
    text: loopColors.ink,
    bg: loopColors.subtle,
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
      text: loopColors.loopOn,
      bg: loopColors.loopBrand,
      border: loopColors.loopBrand,
      hoverBg: loopColors.loopBrandHover,
      hoverBorder: loopColors.loopBrandHover,
      selectedBg: loopColors.loopAccent,
      disabledText: 'rgba(6, 40, 30, 0.5)',
      disabledBg: '#CDEFE2',
      disabledBorder: '#CDEFE2',
      icon: loopColors.loopOn,
      counterBg: 'rgba(6, 40, 30, 0.12)',
    },
    outline: {
      text: loopColors.loopText,
      hoverText: loopColors.loopOn,
      hoverBg: loopColors.loopBrand,
      hoverBorder: loopColors.loopBrand,
      hoverCounterBg: 'rgba(6, 40, 30, 0.12)',
      selectedText: loopColors.loopOn,
      selectedBg: loopColors.loopAccent,
      selectedBorder: loopColors.loopAccent,
      disabledText: loopColors.gray,
      disabledBg: loopColors.subtle,
      disabledCounterBg: 'rgba(0, 0, 0, 0.05)',
      counterBg: 'rgba(0, 0, 0, 0.05)',
      counterFg: loopColors.loopText,
      hoverCounterFg: loopColors.loopOn,
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

export const loopDark: ThemeColorDefs = {
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
    // The accent itself, on dark: a pastel that dark text sits on.
    emphasis: loopColors.loopBrand,
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
    // Hairlines: 10% of the ink, as solid colours on near-black.
    default: '#2A2A2C',
    muted: '#222224',
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
    counterBg: 'rgba(245, 245, 247, 0.12)',
    // The one filled button of a screen, in the accent: the pastel, with
    // its dark text, the brightest thing on a dark page.
    primary: {
      text: loopColors.loopOn,
      bg: loopColors.loopBrand,
      border: loopColors.loopBrand,
      hoverBg: loopColors.loopBright,
      hoverBorder: loopColors.loopBright,
      selectedBg: '#6CCFAA',
      disabledText: 'rgba(6, 40, 30, 0.6)',
      disabledBg: 'rgba(122, 219, 184, 0.35)',
      disabledBorder: 'transparent',
      icon: loopColors.loopOn,
      counterBg: 'rgba(6, 40, 30, 0.15)',
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
  '--borderRadius-small': '10px',
  '--borderRadius-medium': '14px',
  '--borderRadius-large': '20px',
  '--borderRadius-default': '14px',
  '--loop-radius-control': '999px',
  '--loop-radius-card': '20px',
  '--loop-radius-bubble': '22px',
  '--loop-radius-frame': '28px',
  // Light mode's; `loopShadows` says dark mode's.
  '--loop-shadow-frame': '0 1px 2px rgba(0, 0, 0, 0.03), 0 10px 30px rgba(0, 0, 0, 0.06)',
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
export const loopShadows: Record<'light' | 'dark', Record<string, string>> = {
  light: {
    '--loop-shadow-frame': '0 1px 2px rgba(0, 0, 0, 0.03), 0 10px 30px rgba(0, 0, 0, 0.06)',
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
    '--loop-shadow-frame': '0 0 0 1px rgba(255, 255, 255, 0.06), 0 12px 36px rgba(0, 0, 0, 0.45)',
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
 * Type (LOOP T-04): one face, two weights, five sizes, one line-height per
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
export const loopTypeScale = {
  display: { size: '2rem', lineHeight: '1.25' },
  title: { size: '1.25rem', lineHeight: '1.4' },
  heading: { size: '1rem', lineHeight: '1.5' },
  body: { size: '0.875rem', lineHeight: '1.4286' },
  small: { size: '0.75rem', lineHeight: '1.3333' },
} as const;

/** The two weights of the `loop` theme. */
export const loopFontWeights = { regular: 400, semibold: 600 } as const;

export const loopTypeVars = (font: string): Record<string, string> => {
  const { display, title, heading, body, small } = loopTypeScale;
  const { regular, semibold } = loopFontWeights;
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
    '--loop-tracking-display': '-0.02em',
    '--loop-tracking-title': '-0.012em',
    '--loop-tracking-body': '0',
  };
};

/**
 * The accent's properties in a mode, mint's (`themeAccents.green`): the
 * stage and the quiet tint are mint's own, not derived from the colours.
 */
const loopTints = (mode: 'light' | 'dark') =>
  themeAccentTints({
    accent: themeAccents.green.accent,
    on: themeAccents.green.on,
    stage: themeAccents.green.stage[mode],
    quiet: themeAccents.green.quiet[mode],
  });

/* ── Exports ─────────────────────────────────────────────────────────── */

/**
 * Inter, then its metric-matched fallback, then the system's own sans-serif
 * (LOOP T-04). One face, two weights (400 and 600). The face is served by the
 * page's own build: a page wearing the theme imports
 * `@datalayer/primer-addons/style/loop-face.css`, which declares
 * `Inter Variable` from `@fontsource-variable/inter` and `Inter Fallback`, a
 * local Arial drawn to Inter's measure. The text paints in the fallback first
 * and does not move when Inter arrives; a page that has not imported the
 * stylesheet shows the system face.
 */
export const loopFontFamily =
  '"Inter Variable", "Inter Fallback", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

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
 * The focus ring (LOOP T-15): 3 to 1 against the page and around a pill of
 * any accent, in both modes. In light mode the deep mint does it — darker than the text, the one place it is —
 * a halo in the theme's colour, as a system's own focus ring is — 6.5 to 1
 * on white and 3.28 or more around every pastel. In dark mode no
 * colour clears 3 to 1 against both the near-black page and the six
 * pastels, the light ink least of all (under 1.8 to 1 on the pastels): a
 * mid grey does, at 3.04 to 1 — and 2.77 to 1 on the subtle dark surface,
 * the one place it falls short.
 */
export const loopFocusRing = { light: loopColors.loopRing, dark: '#636363' } as const;

/**
 * The loop theme's own stylesheet, beside what its shape draws: bold is the
 * theme's semibold, its second and last weight.
 *
 * Its controls are pills and its tables rounder by its shape
 * (`radiusControl`, `radiusTable`), which `primerComponentsCss` draws for
 * any theme that sets them: menus and overlays keep the card's radius,
 * `--borderRadius-large`, which the theme already sets.
 */
const loopOwnCss = `
:scope b,
:scope strong {
  font-weight: var(--base-text-weight-semibold);
}
`;

/** Comprehensive Primer CSS-variable overrides for light & dark mode. */
export const loopThemeStyles = buildThemeStyles(loopLight, loopDark, {
  fontFamily: loopFontFamily,
  css: loopOwnCss,
  // Rounder than the others: a pill for a control (LOOP T-09), soft cards,
  // round bubbles, a table with the corners of a list item.
  shape: {
    radiusControl: loopShapeVars['--loop-radius-control'],
    radiusTable: loopShapeVars['--borderRadius-medium'],
    radiusCard: loopShapeVars['--loop-radius-card'],
    radiusBubble: loopShapeVars['--loop-radius-bubble'],
    radiusFrame: loopShapeVars['--loop-radius-frame'],
    shadow: loopShapeVars['--loop-shadow-frame'],
    motionStatus: loopMotionVars['--loop-motion-status'],
    motionMessage: loopMotionVars['--loop-motion-message'],
    motionPane: loopMotionVars['--loop-motion-pane'],
    motionEasing: loopMotionVars['--loop-motion-easing'],
    // Links plain in a message: the words' own colour, underlined (T-06).
    messageLink: 'currentColor',
  },
  variables: {
    light: {
      ...loopShapeVars,
      ...loopTints('light'),
      ...loopMotionVars,
      ...loopShadows.light,
      ...loopTypeVars(loopFontFamily),
      '--loop-hairline': loopHairline.light,
      // The hairline is Primer's default border: a card drawn with
      // `borderColor="border.default"` gets it, no fallback chain at the call site.
      '--borderColor-default': loopHairline.light,
      '--focus-outlineColor': loopFocusRing.light,
      // The selected tab underlined in the accent, not Primer's coral (LOOP T-14).
      '--underlineNav-borderColor-active': themeAccents.green.accent,
    },
    dark: {
      ...loopShapeVars,
      ...loopTints('dark'),
      ...loopMotionVars,
      ...loopShadows.dark,
      ...loopTypeVars(loopFontFamily),
      '--loop-hairline': loopHairline.dark,
      // The hairline is Primer's default border: a card drawn with
      // `borderColor="border.default"` gets it, no fallback chain at the call site.
      '--borderColor-default': loopHairline.dark,
      '--focus-outlineColor': loopFocusRing.dark,
      // The selected tab underlined in the accent, not Primer's coral (LOOP T-14).
      '--underlineNav-borderColor-active': themeAccents.green.accent,
    },
  },
});

/**
 * The loop theme's whole stylesheet (`ThemeStyles.css`): its controls as
 * pills and its tables rounder, drawn from its shape, then its own rules.
 */
export const loopControlsCss: string = loopThemeStyles.css ?? '';
