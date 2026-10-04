/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * A theme's own stylesheet (LOOP T-09): injected by the theme provider for
 * its element and for the portal root, removed when the theme changes; none
 * for a theme that has none. And the `loop` theme's: its controls as pills,
 * through selectors that still match the installed Primer.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { DatalayerThemeProvider } from '../DatalayerThemeProvider';
import { themeConfigs, type ThemeVariant } from '../themeRegistry';
import { loopControlsCss, loopControlsSelectors } from '../themes/loopTheme';
import {
  PRIMER_PORTAL_ROOT_ID,
  THEME_SCOPE_ATTRIBUTE,
  THEME_STYLESHEET_ATTRIBUTE,
} from '../../utils/Portals';

beforeAll(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  // jsdom's CSS parser predates `@scope`; browsers have it, and the text is what is tested.
  const error = console.error;
  vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    if (String((args[0] as Error)?.message ?? args[0]).includes('Could not parse CSS stylesheet')) return;
    error(...args);
  });
  if (!window.matchMedia) {
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    })) as any;
  }
});

const stylesheets = () =>
  Array.from(document.head.querySelectorAll<HTMLStyleElement>(`style[${THEME_STYLESHEET_ATTRIBUTE}]`));

let root: Root | null = null;
let host: HTMLElement | null = null;

const render = (node: React.ReactNode) => {
  if (!host) {
    host = document.createElement('div');
    document.body.appendChild(host);
    root = createRoot(host);
  }
  act(() => root!.render(node));
};

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  root = null;
  host = null;
});

const themed = (variant: ThemeVariant, children?: React.ReactNode) => (
  <DatalayerThemeProvider
    colorMode="light"
    theme={themeConfigs[variant].primerTheme}
    themeStyles={themeConfigs[variant].themeStyles}
  >
    {children ?? <button>Go</button>}
  </DatalayerThemeProvider>
);

describe('a theme without a stylesheet', () => {
  it('is every theme but loop', () => {
    for (const [name, config] of Object.entries(themeConfigs)) {
      expect(config.themeStyles.css !== undefined, name).toBe(name === 'loop');
    }
  });

  for (const name of Object.keys(themeConfigs).filter(n => n !== 'loop') as ThemeVariant[]) {
    it(`${name} gets nothing injected`, () => {
      render(themed(name));
      expect(stylesheets()).toHaveLength(0);
    });
  }
});

describe('a theme with a stylesheet', () => {
  it('is injected once, for its element and for the portal root', () => {
    render(themed('loop'));
    const sheets = stylesheets();
    expect(sheets).toHaveLength(1);
    const scope = sheets[0].getAttribute(THEME_STYLESHEET_ATTRIBUTE)!;
    expect(document.querySelector(`[${THEME_SCOPE_ATTRIBUTE}="${scope}"]`)).not.toBeNull();
    const text = sheets[0].textContent!;
    expect(text).toContain(`@scope ([${THEME_SCOPE_ATTRIBUTE}="${scope}"])`);
    expect(text).toContain(`@scope (#${PRIMER_PORTAL_ROOT_ID})`);
    // Stopping at any provider nested inside.
    expect(text).toContain(`to ([${THEME_SCOPE_ATTRIBUTE}]:not(`);
    expect(text).toContain(loopControlsCss);
  });

  it('is removed when the theme changes, and when the provider goes', () => {
    render(themed('loop'));
    expect(stylesheets()).toHaveLength(1);
    render(themed('datalayer'));
    expect(stylesheets()).toHaveLength(0);
    render(themed('loop'));
    expect(stylesheets()).toHaveLength(1);
    act(() => root?.unmount());
    root = null;
    expect(stylesheets()).toHaveLength(0);
  });

  it('is not written on the page by a provider inside a themed element, not even once', () => {
    // An application embedded in another product's page (LOOP T-13): the
    // page's <body> and its portal root are the page's.
    document.body.removeAttribute('style');
    document.body.removeAttribute('data-color-mode');
    document.getElementById(PRIMER_PORTAL_ROOT_ID)?.remove();
    render(<div data-color-mode="light">{themed('loop')}</div>);
    expect(document.body.getAttribute('style') ?? '').toBe('');
    expect(document.body.getAttribute('data-color-mode')).toBeNull();
    expect(document.getElementById(PRIMER_PORTAL_ROOT_ID)).toBeNull();
    const sheets = stylesheets();
    expect(sheets).toHaveLength(1);
    expect(sheets[0].textContent).not.toContain(PRIMER_PORTAL_ROOT_ID);
  });

  it('is not injected for the portal root by a nested provider', () => {
    render(themed('datalayer', themed('loop')));
    const sheets = stylesheets();
    expect(sheets).toHaveLength(1);
    expect(sheets[0].textContent).not.toContain(PRIMER_PORTAL_ROOT_ID);
  });
});

/* ─── The loop theme's selectors, against the installed Primer ─────── */

const primerLib = dirname(createRequire(import.meta.url).resolve('@primer/react'));

const filesUnder = (dir: string, ext: string): string[] =>
  readdirSync(dir).flatMap(entry => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return filesUnder(path, ext);
    return path.endsWith(ext) ? [path] : [];
  });

describe("the loop theme's controls", () => {
  const primerCss = filesUnder(primerLib, '.css').map(f => readFileSync(f, 'utf8')).join('\n');
  const toggleJs = readFileSync(join(primerLib, 'ToggleSwitch', 'ToggleSwitch.js'), 'utf8');

  it('match class names the installed Primer has', () => {
    for (const [name, selector] of Object.entries(loopControlsSelectors)) {
      const prefix = /^\[class\*="([^"]+)"\]$/.exec(selector)![1];
      if (prefix.startsWith('prc-')) {
        expect(primerCss.includes(`.${prefix}-`), name).toBe(true);
      } else {
        // A styled-component, by the display name in its class.
        expect(toggleJs.includes(`displayName: "${prefix.replace(/-$/, '')}"`), name).toBe(true);
      }
    }
  });

  it('are pills, but a text area', () => {
    const rule = /([^{}]+)\{\s*--borderRadius-medium: var\(--loop-radius-control\);\s*border-radius: var\(--loop-radius-control\);\s*\}/.exec(
      loopControlsCss,
    );
    expect(rule).not.toBeNull();
    const selectors = rule![1].split(',').map(x => x.trim());
    const s = loopControlsSelectors;
    expect(selectors).toEqual([
      `:scope ${s.button}`,
      `:scope ${s.textInput}:not(:has(${s.textArea}))`,
      `:scope ${s.segmentedControl}`,
      `:scope ${s.underlineTab}`,
      `:scope ${s.toggleTrack}`,
      `:scope ${s.toggleKnob}`,
    ]);
    // A button group: its two ends, through the token Primer draws them with.
    expect(loopControlsCss).toContain(
      `:scope ${s.buttonGroup} {\n  --borderRadius-medium: var(--loop-radius-control);\n}`,
    );
    // Nothing else is touched: no overlay, no list item, no card.
    expect(loopControlsCss).not.toMatch(/Overlay|ActionList|borderRadius-large/);
  });
});
