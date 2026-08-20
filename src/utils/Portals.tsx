/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { type CSSProperties } from 'react';
import { registerPortalRoot } from '@primer/react';

/**
 * Id of the element Primer portals render under.
 *
 * Exported because a host may need to mark that element as its own — the
 * JupyterLab theming of jupyter-react adds `jp-ThemedContainer` to it, so
 * the rules JupyterLab scopes to that class reach portaled content too.
 */
export const PRIMER_PORTAL_ROOT_ID = '__primerPortalRoot__';

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
 * Infer current app color mode from existing DOM theme markers.
 *
 * This avoids accidentally forcing light mode when callers invoke
 * setupPrimerPortals() without passing an explicit mode.
 */
const inferCurrentColormode = (): Colormode => {
  const portalRoot = document.getElementById(PRIMER_PORTAL_ROOT_ID);
  const portalMode = portalRoot?.getAttribute('data-color-mode');
  if (portalMode === 'light' || portalMode === 'dark' || portalMode === 'auto') {
    return portalMode;
  }

  const htmlMode = document.documentElement.getAttribute('data-color-mode');
  if (htmlMode === 'light' || htmlMode === 'dark' || htmlMode === 'auto') {
    return htmlMode;
  }

  const bodyMode = document.body.getAttribute('data-color-mode');
  if (bodyMode === 'light' || bodyMode === 'dark' || bodyMode === 'auto') {
    return bodyMode;
  }

  return 'auto';
};

/**
 * Infer Primer light/dark theme names from existing DOM markers.
 */
const inferCurrentThemeNames = (): { lightTheme: string; darkTheme: string } => {
  const portalRoot = document.getElementById(PRIMER_PORTAL_ROOT_ID);
  const lightTheme =
    portalRoot?.getAttribute('data-light-theme') ||
    document.documentElement.getAttribute('data-light-theme') ||
    document.body.getAttribute('data-light-theme') ||
    'light';
  const darkTheme =
    portalRoot?.getAttribute('data-dark-theme') ||
    document.documentElement.getAttribute('data-dark-theme') ||
    document.body.getAttribute('data-dark-theme') ||
    'dark';
  return { lightTheme, darkTheme };
};

/**
 * Ensure we define a root for Primer portal root.
 *
 * Creates a dedicated `<div>` appended to `<body>` with a high z-index
 * so that portaled content (overlays, tooltips, action menus) renders
 * above other positioned UI elements such as chat panels.
 *
 *  @see https://github.com/primer/react/blob/main/packages/react/src/Portal/Portal.tsx#L23
 *  @see https://github.com/primer/react/blob/030fe020b48b7f12c2994c6614e5d4191fe764ee/src/Portal/Portal.tsx#L33
 */
export const setupPrimerPortals = (colormode?: Colormode) => {
  const effectiveColormode = colormode ?? inferCurrentColormode();
  const resolved = resolveColormode(effectiveColormode);
  const { lightTheme, darkTheme } = inferCurrentThemeNames();

  // Create or reuse a dedicated portal root div.
  let portalRoot = document.getElementById(PRIMER_PORTAL_ROOT_ID);
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.id = PRIMER_PORTAL_ROOT_ID;
    document.body.appendChild(portalRoot);
  }

  // Primer theme attributes — required for proper theming inside portals.
  portalRoot.dataset['portalRoot'] = 'true';
  portalRoot.dataset['colorMode'] = resolved;
  portalRoot.dataset['lightTheme'] = lightTheme;
  portalRoot.dataset['darkTheme'] = darkTheme;

  /*
   * Pinned to the origin of the document, never left in the flow of the body.
   *
   * Primer positions an anchored overlay — a menu, a dropdown — with
   * `position: absolute` and coordinates taken from the VIEWPORT rectangle
   * of its anchor. Those coordinates are only right when the containing
   * block of the overlay starts at the origin of the document, which is why
   * Primer's own default portal root is `absolute` at `0, 0`.
   *
   * Left `relative`, this root instead sits wherever the flow of the body
   * ends and becomes the containing block of everything portaled into it:
   * in an application whose markup is a full-height element — a React page
   * hosting JupyterLab — that is the bottom of the screen, and every menu
   * opened at the top of the page was drawn a screen further down, off the
   * bottom edge. Which reads, to whoever clicked, as a menu that refuses to
   * open. The high z-index is kept: it needs a positioned element, and
   * `absolute` is one.
   */
  portalRoot.style.position = 'absolute';
  portalRoot.style.top = '0';
  portalRoot.style.left = '0';
  portalRoot.style.width = '100%';
  portalRoot.style.zIndex = '9999';

  registerPortalRoot(portalRoot);
};

/**
 * The element Primer portals render under, when it has been set up.
 *
 * `setupPrimerPortals` creates it; before that call there is none, and this
 * answers `null` rather than inventing one.
 */
export const getPrimerPortalRoot = (): HTMLElement | null =>
  document.getElementById(PRIMER_PORTAL_ROOT_ID);

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
  /*
   * On the portal root as well as on the body, and that is the point.
   *
   * The body was enough for what portals INHERIT — a font, a line height —
   * and never enough for the colours. The portal root carries Primer's own
   * theme markers (`data-color-mode`, `data-light-theme`), and Primer's
   * stylesheet declares `--bgColor-*`, `--fgColor-*` and the rest ON any
   * element carrying them. A declaration on the element always beats a value
   * inherited from an ancestor, so Primer's default palette won on the portal
   * root and everything drawn inside it — the buttons of a dialog, the
   * background of a menu — came out in the default theme while the same
   * components in the page wore the chosen one.
   *
   * Written inline on that element, the theme wins in turn: an inline style
   * outranks any selector in a stylesheet.
   */
  const targets = [
    document.body,
    document.getElementById(PRIMER_PORTAL_ROOT_ID)
  ].filter(Boolean) as HTMLElement[];

  for (const target of targets) {
    // 1. Remove properties set by the previous invocation.
    const prev = (target as any)[PORTAL_THEME_KEYS] as string[] | undefined;
    if (prev) {
      for (const key of prev) {
        target.style.removeProperty(key);
      }
    }

    // 2. Apply the new properties.
    const tracked: string[] = [];

    for (const [key, value] of Object.entries(styles)) {
      if (value == null) continue;
      const strVal = String(value);

      if (key.startsWith('--')) {
        // CSS custom property — must use setProperty
        target.style.setProperty(key, strVal);
        tracked.push(key);
      } else {
        // Standard CSS property (camelCase → kebab-case)
        const kebab = camelToKebab(key);
        target.style.setProperty(kebab, strVal);
        tracked.push(kebab);
      }
    }

    // 3. Stash the list for the next cleanup.
    (target as any)[PORTAL_THEME_KEYS] = tracked;
  }
}

export default setupPrimerPortals;
