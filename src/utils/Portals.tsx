/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { type CSSProperties } from 'react';
import { registerPortalRoot } from '@primer/react';

import '@primer/react-brand/lib/css/main.css';

const PRIMER_PORTAL_ROOT_ID = '__primerPortalRoot__';

/**
 * Key used on `document.body` to track the CSS-property names we
 * previously applied so we can remove stale entries on theme switch.
 */
const PORTAL_THEME_KEYS = '__primerPortalThemeKeys__';

type Colormode = 'light' | 'dark' | 'auto';

/**
 * Resolve 'auto' colormode to the actual OS preference.
 */
const resolveColormode = (colormode: Colormode): 'light' | 'dark' => {
  if (colormode === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return colormode;
};

/**
 * Ensure we define a root for Primer portal root.
 *
 *  @see https://github.com/primer/react/blob/main/packages/react/src/Portal/Portal.tsx#L23
 *  @see https://github.com/primer/react/blob/030fe020b48b7f12c2994c6614e5d4191fe764ee/src/Portal/Portal.tsx#L33
 */
export const setupPrimerPortals = (colormode: Colormode = 'light') => {
  const resolved = resolveColormode(colormode);
  const body = document.body;
  body.dataset['portalRoot'] = 'true';
  body.dataset['colorMode'] = resolved;
  body.dataset['lightTheme'] = 'light';
  body.dataset['darkTheme'] = 'dark';
  body.id = PRIMER_PORTAL_ROOT_ID;
  registerPortalRoot(body);
};

/* ─── camelCase → kebab-case ─────────────────────────────────────────── */

const camelToKebab = (s: string): string =>
  s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

/**
 * Sync a set of CSS properties (including CSS custom properties) to
 * `document.body` so that Primer portal content — which is a DOM child
 * of `<body>`, not of the React-tree `<BaseStyles>` element — inherits
 * the same theme tokens and cascade properties (font, color, background)
 * as the rest of the application.
 *
 * This function is **idempotent**: calling it again replaces the
 * properties from the previous call and removes any stale ones.
 *
 * Typical usage: call from `DatalayerThemeProvider`'s `useEffect` so
 * portals stay in sync whenever theme or color-mode changes.
 */
export function syncPortalThemeStyles(styles: CSSProperties): void {
  const body = document.body;

  // 1. Remove properties set by the previous invocation.
  const prev = (body as any)[PORTAL_THEME_KEYS] as string[] | undefined;
  if (prev) {
    for (const key of prev) {
      body.style.removeProperty(key);
    }
  }

  // 2. Apply the new properties.
  const tracked: string[] = [];

  for (const [key, value] of Object.entries(styles)) {
    if (value == null) continue;
    const strVal = String(value);

    if (key.startsWith('--')) {
      // CSS custom property — must use setProperty
      body.style.setProperty(key, strVal);
      tracked.push(key);
    } else {
      // Standard CSS property (camelCase → kebab-case)
      const kebab = camelToKebab(key);
      body.style.setProperty(kebab, strVal);
      tracked.push(kebab);
    }
  }

  // 3. Stash the list for the next cleanup.
  (body as any)[PORTAL_THEME_KEYS] = tracked;
}

export default setupPrimerPortals;
