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
