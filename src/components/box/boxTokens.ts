/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The tokens `Box` resolves, taken from Primer React's own theme
 * (`@primer/react` 37, `legacy-theme/ts/color-schemes.js`): each colour or
 * shadow path is mapped to the first CSS variable Primer's theme object
 * gives it — the variable Primer itself reads first — and emitted without
 * the fallback chain that follows it. The scales are Primer's theme scales.
 *
 * Generated from Primer's color schemes; regenerate when `@primer/react`
 * changes its theme.
 */

export const BOX_COLOR_VARS = {
  'fg.default': '--fgColor-default',
  'fg.muted': '--fgColor-muted',
  'fg.subtle': '--fgColor-muted',
  'fg.onEmphasis': '--fgColor-onEmphasis',
  'canvas.default': '--bgColor-default',
  'canvas.overlay': '--overlay-bgColor',
  'canvas.inset': '--bgColor-inset',
  'canvas.subtle': '--bgColor-muted',
  'border.default': '--borderColor-default',
  'border.muted': '--borderColor-muted',
  'border.subtle': '--borderColor-muted',
  'neutral.emphasisPlus': '--bgColor-emphasis',
  'neutral.emphasis': '--bgColor-neutral-emphasis',
  'neutral.muted': '--bgColor-neutral-muted',
  'neutral.subtle': '--bgColor-neutral-muted',
  'accent.fg': '--fgColor-accent',
  'accent.emphasis': '--bgColor-accent-emphasis',
  'accent.muted': '--borderColor-accent-muted',
  'accent.subtle': '--bgColor-accent-muted',
  'success.fg': '--fgColor-success',
  'success.emphasis': '--bgColor-success-emphasis',
  'success.muted': '--borderColor-success-muted',
  'success.subtle': '--bgColor-success-muted',
  'attention.fg': '--fgColor-attention',
  'attention.emphasis': '--bgColor-attention-emphasis',
  'attention.muted': '--borderColor-attention-muted',
  'attention.subtle': '--bgColor-attention-muted',
  'severe.fg': '--fgColor-severe',
  'severe.emphasis': '--bgColor-severe-emphasis',
  'severe.muted': '--borderColor-severe-muted',
  'severe.subtle': '--bgColor-severe-muted',
  'danger.fg': '--fgColor-danger',
  'danger.emphasis': '--borderColor-danger-emphasis',
  'danger.muted': '--borderColor-danger-muted',
  'danger.subtle': '--bgColor-danger-muted',
  'open.fg': '--fgColor-open',
  'open.emphasis': '--bgColor-open-emphasis',
  'open.muted': '--borderColor-open-muted',
  'open.subtle': '--bgColor-open-muted',
  'closed.fg': '--fgColor-closed',
  'closed.emphasis': '--bgColor-closed-emphasis',
  'closed.muted': '--borderColor-closed-muted',
  'closed.subtle': '--bgColor-closed-muted',
  'done.fg': '--fgColor-done',
  'done.emphasis': '--bgColor-done-emphasis',
  'done.muted': '--borderColor-done-muted',
  'done.subtle': '--bgColor-done-muted',
  'sponsors.fg': '--fgColor-sponsors',
  'sponsors.emphasis': '--bgColor-sponsors-emphasis',
  'sponsors.muted': '--borderColor-sponsors-muted',
  'sponsors.subtle': '--bgColor-sponsors-muted',
  'actionListItem.default.hoverBg': '--control-transparent-bgColor-hover',
  'actionListItem.default.activeBg': '--control-transparent-bgColor-active',
} as const;

export const BOX_SHADOW_VARS = {
  'shadow.small': '--shadow-resting-small',
  'shadow.medium': '--shadow-resting-medium',
  'shadow.large': '--shadow-floating-large',
  'shadow.extraLarge': '--shadow-floating-xlarge',
} as const;

export type BoxColorToken = keyof typeof BOX_COLOR_VARS;
export type BoxShadowToken = keyof typeof BOX_SHADOW_VARS;

/** Primer's breakpoints: a responsive array's second value from 544px, … */
export const BOX_BREAKPOINTS = ['544px', '768px', '1012px', '1280px'] as const;

/** Primer's space scale: `p={3}` is 16px. */
export const BOX_SPACE = ['0', '4px', '8px', '16px', '24px', '32px', '40px', '48px', '64px', '80px', '96px', '112px', '128px'] as const;

/** Primer's font sizes: `fontSize={1}` is 14px. */
export const BOX_FONT_SIZES = ['12px', '14px', '16px', '20px', '24px', '32px', '40px', '48px', '56px'] as const;

/** Primer's radii by index (`borderRadius={2}` is 6px). */
export const BOX_RADII = ['0', '3px', '6px', '100px'] as const;

/** Radii by name: Primer's, and the theme's shapes (LOOP T-03), an overlay's among them. */
export const BOX_RADIUS_VARS = {
  small: '--borderRadius-small',
  medium: '--borderRadius-medium',
  large: '--borderRadius-large',
  full: '--borderRadius-full',
  control: '--theme-radius-control',
  card: '--theme-radius-card',
  bubble: '--theme-radius-bubble',
  frame: '--theme-radius-frame',
  overlay: '--theme-radius-overlay',
} as const;

export type BoxRadiusToken = keyof typeof BOX_RADIUS_VARS;

/** Primer's border widths by index. */
export const BOX_BORDER_WIDTHS = ['0', '1px'] as const;

/** Primer's sizes by name (`maxWidth="large"` is 1012px). */
export const BOX_SIZES = { small: '544px', medium: '768px', large: '1012px', xlarge: '1280px' } as const;

/**
 * Font weights by name, as the theme's weight variables. Primer's theme
 * names its weights 300, 400, 500, 600 — `light`, `normal`, `semibold`,
 * `bold` — which are the primitives' `light`, `normal`, `medium` and
 * `semibold`: so `semibold` is `--base-text-weight-medium` (500, and 600 in
 * the `loop` theme, which has two weights), as it reads today.
 */
export const BOX_FONT_WEIGHT_VARS = {
  light: '--base-text-weight-light',
  normal: '--base-text-weight-normal',
  medium: '--base-text-weight-medium',
  semibold: '--base-text-weight-medium',
  bold: '--base-text-weight-semibold',
} as const;

/** Primer's line heights by name. */
export const BOX_LINE_HEIGHTS = { condensedUltra: '1', condensed: '1.25', default: '1.5' } as const;

/** Font families by name. */
export const BOX_FONT_VARS = { normal: '--fontStack-system', mono: '--fontStack-monospace' } as const;

/** Every CSS variable `Box` can emit: the theme provider must set them all. */
export const BOX_EMITTED_VARS: readonly string[] = [
  ...Object.values(BOX_COLOR_VARS),
  ...Object.values(BOX_SHADOW_VARS),
  ...Object.values(BOX_RADIUS_VARS),
  ...Object.values(BOX_FONT_WEIGHT_VARS),
  ...Object.values(BOX_FONT_VARS),
];
