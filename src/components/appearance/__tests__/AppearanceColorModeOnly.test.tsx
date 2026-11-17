/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * `showThemeChooser={false}`: the appearance controls are light, dark and
 * auto alone — no theme swatch, no preview — for a site that wears one
 * theme; and they need no theme callback then.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { AppearanceControls } from '../AppearanceControls';
import { themeConfigs, themeVariants } from '../../../theme';

beforeAll(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  // jsdom has none; Primer's segmented control asks for the viewport's width.
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }) as MediaQueryList;
});

let root: Root | null = null;
let host: HTMLElement | null = null;

const render = (node: React.ReactNode): HTMLElement => {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root!.render(node));
  return host;
};

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  root = null;
  host = null;
});

const themeButtons = (element: HTMLElement): string[] =>
  themeVariants
    .map(variant => themeConfigs[variant].label)
    .filter(label => element.querySelector(`button[aria-label="${label}"]`));

describe('the appearance controls without the theme chooser', () => {
  it('offer light, dark and auto, and no theme', () => {
    for (const layout of ['stacked', 'inline'] as const) {
      const element = render(
        <AppearanceControls
          withStore={false}
          layout={layout}
          colorMode="dark"
          themeVariant="loop"
          onColorModeChange={() => undefined}
          showThemeChooser={false}
          showThemePreviews
        />,
      );
      expect(element.querySelector('[aria-label="Light"]')).toBeTruthy();
      expect(element.querySelector('[aria-label="Dark"]')).toBeTruthy();
      expect(element.querySelector('[aria-label="Auto"]')).toBeTruthy();
      expect(themeButtons(element)).toEqual([]);
      expect(element.textContent).not.toContain('Show preview');
      act(() => root?.unmount());
      host?.remove();
      root = null;
      host = null;
    }
  });

  it('with the chooser, still show every theme, and need its callback', () => {
    const element = render(
      <AppearanceControls
        withStore={false}
        colorMode="dark"
        themeVariant="loop"
        onColorModeChange={() => undefined}
        onThemeChange={() => undefined}
      />,
    );
    expect(themeButtons(element).length).toBe(themeVariants.length);
    act(() => root?.unmount());
    host?.remove();
    root = null;
    host = null;
    expect(() =>
      render(
        <AppearanceControls
          withStore={false}
          colorMode="dark"
          themeVariant="loop"
          onColorModeChange={() => undefined}
        />,
      ),
    ).toThrow(/onThemeChange/);
  });
});

describe('the appearance menu without the theme chooser', () => {
  it('sizes its overlay to the switch, not to the swatches', () => {
    const menu = readFileSync(join(__dirname, '..', 'AppearanceMenu.tsx'), 'utf8');
    const circle = readFileSync(join(__dirname, '..', 'ColorModeCircle.tsx'), 'utf8');
    expect(menu).toContain("hoverOverlayMinWidth={showThemeChooser ? 340 : 'auto'}");
    expect(circle).toContain('minWidth: hoverOverlayMinWidth,');
  });
});
