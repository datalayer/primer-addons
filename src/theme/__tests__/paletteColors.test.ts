/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The palette's names: every name holds in every theme and both modes, a
 * hue reads on its theme's panels, and a spec's colour — a name or a hex —
 * resolves to the colour the theme gives it.
 */

import { describe, expect, it } from 'vitest';
import { themeVariants } from '../themeTokens';
import { hueNames } from '../colors';
import {
  getColorPalette,
  isPaletteColorName,
  paletteColorNames,
  paletteRoleNames,
  resolvePaletteColor,
} from '../palettes';

const HEX = /^#[0-9a-fA-F]{6}$/;

/** WCAG's relative luminance of a `#RRGGBB`. */
const luminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map(at => {
    const c = parseInt(hex.slice(at, at + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe('the palette names', () => {
  it('are the roles, then the hues, each once', () => {
    expect(paletteColorNames).toEqual([...paletteRoleNames, ...hueNames]);
    expect(new Set(paletteColorNames).size).toBe(paletteColorNames.length);
  });

  it('hold in every theme, light and dark', () => {
    for (const variant of themeVariants) {
      for (const mode of ['light', 'dark'] as const) {
        const palette = getColorPalette(variant, mode);
        for (const name of paletteColorNames) {
          expect(palette[name], `${variant} ${mode} ${name}`).toMatch(/^#|^rgb|^var\(/);
        }
        for (const name of hueNames) {
          expect(palette[name], `${variant} ${mode} ${name}`).toMatch(HEX);
        }
      }
    }
  });

  it('give a hue that reads on its theme’s panel, light and dark', () => {
    for (const variant of themeVariants) {
      for (const mode of ['light', 'dark'] as const) {
        const palette = getColorPalette(variant, mode);
        if (!HEX.test(palette.bgPanel)) {
          continue;
        }
        for (const name of hueNames) {
          expect(contrast(palette[name], palette.bgPanel), `${variant} ${mode} ${name} on ${palette.bgPanel}`).toBeGreaterThanOrEqual(3);
        }
      }
    }
  });

  it('change a hue with the mode, and a role with the theme', () => {
    expect(getColorPalette('datalayer', 'light').indigo).not.toBe(getColorPalette('datalayer', 'dark').indigo);
    expect(getColorPalette('loop', 'dark').violet).toBe('#C0AEF6');
    expect(getColorPalette('earth', 'dark').surge).not.toBe(getColorPalette('sand', 'dark').surge);
  });
});

describe('a spec’s colour', () => {
  const light = getColorPalette('datalayer', 'light');
  const dark = getColorPalette('datalayer', 'dark');

  it('is the theme’s value of a name', () => {
    expect(resolvePaletteColor('indigo', light)).toBe(light.indigo);
    expect(resolvePaletteColor('indigo', dark)).toBe(dark.indigo);
    expect(resolvePaletteColor('primary', dark)).toBe(dark.primary);
  });

  it('is itself when a hex, short or long', () => {
    expect(resolvePaletteColor('#6366F1', light)).toBe('#6366F1');
    expect(resolvePaletteColor('#abc', dark)).toBe('#abc');
  });

  it('is nothing when unsaid or neither', () => {
    expect(resolvePaletteColor(undefined, light)).toBeUndefined();
    expect(resolvePaletteColor('', light)).toBeUndefined();
    expect(resolvePaletteColor('Indigo', light)).toBeUndefined();
    expect(resolvePaletteColor('#12345', light)).toBeUndefined();
    expect(resolvePaletteColor('isLight', light)).toBeUndefined();
    expect(isPaletteColorName('isLight')).toBe(false);
  });
});
