/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Primer's own CSS variables that no theme sets but that a page still reads
 * — the radii, the neutral and sponsor colours, the open and closed states,
 * the four elevation shadows — at Primer's own values (`@primer/primitives`,
 * functional themes light and dark).
 *
 * The apps do not load the primitives' stylesheets, so Primer components
 * draw these through the fallbacks written in their own CSS. `Box` emits
 * the variable alone, with no fallback (see `components/box/Box.tsx`), so
 * the theme provider sets every variable `Box` can emit: these, under the
 * theme's own (`themeStyles`), which win where a theme says otherwise — the
 * `loop` theme's radii and shadows.
 */

const radii: Record<string, string> = {
  '--borderRadius-small': '3px',
  '--borderRadius-medium': '6px',
  '--borderRadius-large': '12px',
  '--borderRadius-full': '9999px',
};

/** The open and closed states are success and danger, as in Primer. */
/*
 * The sizes Primer's controls read from `@primer/primitives`' size and
 * border sheets (`--base-size-*`, `--borderWidth-*`, the control sizes),
 * for a page that loads no primitives sheet — a VS Code webview, a page of
 * Primer components alone: without them a text input has no border and a
 * button no height, their shorthands being invalid. The values are the
 * primitives' own.
 */
const sizes: Record<string, string> = {
  '--base-size-2': '0.125rem',
  '--base-size-4': '0.25rem',
  '--base-size-6': '0.375rem',
  '--base-size-8': '0.5rem',
  '--base-size-12': '0.75rem',
  '--base-size-16': '1rem',
  '--base-size-20': '1.25rem',
  '--base-size-24': '1.5rem',
  '--base-size-28': '1.75rem',
  '--base-size-32': '2rem',
  '--base-size-36': '2.25rem',
  '--base-size-40': '2.5rem',
  '--base-size-44': '2.75rem',
  '--base-size-48': '3rem',
  '--base-size-64': '4rem',
  '--base-size-80': '5rem',
  '--base-size-96': '6rem',
  '--base-size-112': '7rem',
  '--base-size-128': '8rem',
  '--borderWidth-thin': '0.0625rem',
  '--borderWidth-default': 'var(--borderWidth-thin)',
  '--borderWidth-thick': '0.125rem',
  '--borderWidth-thicker': '0.25rem',
  '--boxShadow-thin': 'inset 0 0 0 var(--borderWidth-thin)',
  '--stack-gap-condensed': '0.5rem',
  '--control-xsmall-size': '1.5rem',
  '--control-xsmall-paddingBlock': '0.125rem',
  '--control-xsmall-paddingInline-condensed': '0.25rem',
  '--control-xsmall-paddingInline-normal': '0.5rem',
  '--control-xsmall-paddingInline-spacious': '0.75rem',
  '--control-small-size': '1.75rem',
  '--control-small-paddingBlock': '0.25rem',
  '--control-small-paddingInline-condensed': '0.5rem',
  '--control-small-paddingInline-normal': '0.75rem',
  '--control-medium-size': '2rem',
  '--control-medium-paddingBlock': '0.375rem',
  '--control-medium-paddingInline-condensed': '0.5rem',
  '--control-medium-paddingInline-normal': '0.75rem',
  '--control-medium-paddingInline-spacious': '1rem',
  '--control-large-size': '2.5rem',
  '--control-large-paddingBlock': '0.625rem',
  '--control-large-paddingInline-normal': '0.75rem',
  '--control-large-paddingInline-spacious': '1rem',
  '--control-xlarge-size': '3rem',
  '--control-xlarge-paddingBlock': '0.875rem',
  '--control-xlarge-paddingInline-normal': '0.75rem',
  '--control-xlarge-paddingInline-spacious': '1rem',
};

const states: Record<string, string> = {
  '--fgColor-open': 'var(--fgColor-success)',
  '--bgColor-open-emphasis': 'var(--bgColor-success-emphasis)',
  '--borderColor-open-muted': 'var(--borderColor-success-muted)',
  '--bgColor-open-muted': 'var(--bgColor-success-muted)',
  '--fgColor-closed': 'var(--fgColor-danger)',
  '--bgColor-closed-emphasis': 'var(--bgColor-danger-emphasis)',
  '--borderColor-closed-muted': 'var(--borderColor-danger-muted)',
  '--bgColor-closed-muted': 'var(--bgColor-danger-muted)',
};

export const primerBaseVars: Record<'light' | 'dark', Record<string, string>> = {
  light: {
    ...sizes,
    ...radii,
    ...states,
    '--bgColor-emphasis': '#25292e',
    '--bgColor-neutral-emphasis': '#59636e',
    '--bgColor-neutral-muted': '#818b981f',
    '--fgColor-sponsors': '#bf3989',
    '--bgColor-sponsors-emphasis': '#bf3989',
    '--borderColor-sponsors-muted': '#ff80c866',
    '--bgColor-sponsors-muted': '#ffeff7',
    '--shadow-resting-xsmall': '0px 1px 1px 0px #1f23280f',
    '--shadow-resting-small': '0px 1px 1px 0px #1f23280f, 0px 1px 3px 0px #1f23280f',
    '--shadow-resting-medium': '0px 1px 1px 0px #25292e1a, 0px 3px 6px 0px #25292e1f',
    '--shadow-floating-small':
      '0px 0px 0px 1px #d1d9e080, 0px 6px 12px -3px #25292e0a, 0px 6px 18px 0px #25292e1f',
    '--shadow-floating-medium':
      '0px 0px 0px 1px #d1d9e0, 0px 8px 16px -4px #25292e14, 0px 4px 32px -4px #25292e14, 0px 24px 48px -12px #25292e14, 0px 48px 96px -24px #25292e14',
    '--shadow-floating-large': '0px 0px 0px 1px #d1d9e0, 0px 40px 80px 0px #25292e3d',
    '--shadow-floating-xlarge': '0px 0px 0px 1px #d1d9e0, 0px 56px 112px 0px #25292e52',
  },
  dark: {
    ...sizes,
    ...radii,
    ...states,
    '--bgColor-emphasis': '#3d444d',
    '--bgColor-neutral-emphasis': '#656c76',
    '--bgColor-neutral-muted': '#656c7633',
    '--fgColor-sponsors': '#db61a2',
    '--bgColor-sponsors-emphasis': '#bf4b8a',
    '--borderColor-sponsors-muted': '#db61a266',
    '--bgColor-sponsors-muted': '#db61a21a',
    '--shadow-resting-xsmall': '0px 1px 1px 0px #010409cc',
    '--shadow-resting-small': '0px 1px 1px 0px #01040999, 0px 1px 3px 0px #01040999',
    '--shadow-resting-medium': '0px 1px 1px 0px #01040966, 0px 3px 6px 0px #010409cc',
    '--shadow-floating-small':
      '0px 0px 0px 1px #3d444d, 0px 6px 12px -3px #01040966, 0px 6px 18px 0px #01040966',
    '--shadow-floating-medium':
      '0px 0px 0px 1px #3d444d, 0px 8px 16px -4px #01040966, 0px 4px 32px -4px #01040966, 0px 24px 48px -12px #01040966, 0px 48px 96px -24px #01040966',
    '--shadow-floating-large': '0px 0px 0px 1px #3d444d, 0px 24px 48px 0px #010409',
    '--shadow-floating-xlarge': '0px 0px 0px 1px #3d444d, 0px 32px 64px 0px #010409',
  },
};
