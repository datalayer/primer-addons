/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * The appearance picker's preview of a theme's colours: the palette's
 * swatches (roles and hues) and the accents' swatches, for the theme and the
 * mode given, changing with them; and `AppearanceControls` showing them
 * under its preview card once "Show preview" is pressed.
 */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { getColorPalette, paletteRoleNames } from '../../../theme/palettes';
import { hueNames } from '../../../theme/colors/hueColors';
import { themeAccentNames, themeAccents } from '../../../theme/colors/themeAccents';
import { ThemePaletteSwatches } from '../ThemePaletteSwatches';
import { ThemeAccentSwatches, themeAccentChoices } from '../ThemeAccents';
import { ThemePalettePreview } from '../ThemePalettePreview';
import { AppearanceControls } from '../AppearanceControls';

beforeAll(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  // jsdom's CSS parser predates some of the themes' rules; browsers have them.
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

let root: Root | null = null;
let host: HTMLElement | null = null;

const render = (node: React.ReactNode): HTMLElement => {
  if (!host) {
    host = document.createElement('div');
    document.body.appendChild(host);
    root = createRoot(host);
  }
  act(() => root!.render(node));
  return host;
};

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  root = null;
  host = null;
});

/** The swatches' labels, in order. */
const labelsOf = (container: Element): string[] =>
  Array.from(container.querySelectorAll('[title]')).map(el => el.getAttribute('title') ?? '');

/** The colour each palette swatch is filled with, by its label. */
const fillsOf = (container: Element): Record<string, string> =>
  Object.fromEntries(
    Array.from(container.querySelectorAll<HTMLElement>('[title]')).map(label => {
      const swatch = label.parentElement!.parentElement!;
      return [label.getAttribute('title'), (swatch.firstElementChild as HTMLElement).style.backgroundColor];
    }),
  );

const normalize = (color: string): string => {
  const probe = document.createElement('div');
  probe.style.backgroundColor = color;
  return probe.style.backgroundColor;
};

describe('ThemePaletteSwatches', () => {
  it('draws a swatch for each role and hue of the theme, filled with its value', () => {
    const view = render(<ThemePaletteSwatches variant="datalayer" colorMode="light" compact />);
    const swatches = view.querySelector('[data-testid="theme-palette-swatches"]')!;
    expect(Array.from(swatches.querySelectorAll('h4')).map(h => h.textContent)).toEqual(['Roles', 'Hues']);
    expect(labelsOf(swatches)).toEqual([...paletteRoleNames, ...hueNames]);
    const palette = getColorPalette('datalayer', 'light');
    const fills = fillsOf(swatches);
    expect(fills.primary).toBe(normalize(palette.primary));
    expect(fills.indigo).toBe(normalize(palette.indigo));
  });

  it('changes with the theme and with the mode', () => {
    const view = render(<ThemePaletteSwatches variant="datalayer" colorMode="light" />);
    const before = fillsOf(view);
    render(<ThemePaletteSwatches variant="matrix" colorMode="light" />);
    const otherTheme = fillsOf(view);
    expect(otherTheme.bg).toBe(normalize(getColorPalette('matrix', 'light').bg));
    expect(otherTheme).not.toEqual(before);
    render(<ThemePaletteSwatches variant="matrix" colorMode="dark" />);
    const otherMode = fillsOf(view);
    expect(otherMode.bg).toBe(normalize(getColorPalette('matrix', 'dark').bg));
    expect(otherMode).not.toEqual(otherTheme);
  });
});

describe('ThemeAccentSwatches', () => {
  it("draws the theme's own accent and the six, with each accent's values", () => {
    const view = render(<ThemeAccentSwatches mode="light" />);
    const swatches = Array.from(view.querySelectorAll<HTMLElement>('[data-accent]'));
    expect(swatches.map(s => s.dataset.accent)).toEqual(themeAccentChoices);
    for (const name of themeAccentNames) {
      const swatch = view.querySelector<HTMLElement>(`[data-accent="${name}"]`)!;
      expect(swatch.textContent).toContain(name);
      expect(swatch.textContent).toContain(themeAccents[name].accent);
      expect(swatch.textContent).toContain(themeAccents[name].text.light);
      // The accent laid over the theme on the swatch itself.
      expect(swatch.style.getPropertyValue('--theme-accent')).toBe(themeAccents[name].accent);
    }
  });

  it('changes with the mode', () => {
    const view = render(<ThemeAccentSwatches mode="light" />);
    render(<ThemeAccentSwatches mode="dark" />);
    const rose = view.querySelector<HTMLElement>('[data-accent="rose"]')!;
    expect(rose.textContent).toContain(themeAccents.rose.text.dark);
    expect(rose.style.getPropertyValue('--theme-stage')).toBe(themeAccents.rose.stage.dark);
  });
});

describe('ThemePalettePreview', () => {
  it('shows the palette and the accents of the theme previewed, and follows it', () => {
    const view = render(<ThemePalettePreview variant="datalayer" colorMode="light" />);
    const preview = () => view.querySelector<HTMLElement>('[data-testid="theme-palette-preview"]')!;
    expect(Array.from(preview().querySelectorAll('h3')).map(h => h.textContent)).toEqual([
      'Color palette',
      'Theme accents',
    ]);
    expect(preview().querySelector('[data-testid="theme-palette-swatches"]')).not.toBeNull();
    expect(preview().querySelectorAll('[data-accent]')).toHaveLength(themeAccentChoices.length);
    render(<ThemePalettePreview variant="matrix" colorMode="dark" />);
    expect(preview().dataset.themeVariant).toBe('matrix');
    expect(preview().dataset.themeMode).toBe('dark');
    expect(fillsOf(preview().querySelector('[data-testid="theme-palette-swatches"]')!).bg).toBe(
      normalize(getColorPalette('matrix', 'dark').bg),
    );
  });
});

describe('AppearanceControls', () => {
  it('shows the palette and the accents under the preview card once "Show preview" is pressed', () => {
    const view = render(
      <AppearanceControls
        withStore={false}
        colorMode="light"
        themeVariant="datalayer"
        onColorModeChange={() => undefined}
        onThemeChange={() => undefined}
        showThemePreviews
      />,
    );
    expect(view.querySelector('[data-testid="theme-palette-preview"]')).toBeNull();
    const toggle = Array.from(view.querySelectorAll('button')).find(b => b.textContent === 'Show preview')!;
    act(() => toggle.click());
    const preview = view.querySelector<HTMLElement>('[data-testid="theme-palette-preview"]')!;
    expect(preview).not.toBeNull();
    expect(preview.dataset.themeVariant).toBe('datalayer');
    // The sample card is not drawn as chosen: no accent ring, no check mark.
    expect(view.querySelector('.octicon-check-circle-fill')).toBeNull();
    expect(view.textContent).toContain('The quick brown fox');
  });
});
