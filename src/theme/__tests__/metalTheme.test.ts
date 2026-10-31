/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { describe, expect, it } from 'vitest';
import { metalColors } from '../colors/metalColors';
import { themeConfigs, themeVariants } from '../themeRegistry';
import { loopThemeStyles } from '../themes/loopThemeStyles';
import { metalDark, metalLight, metalThemeStyles } from '../themes/metalThemeStyles';

const channel = (value: number): number => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map(at => channel(parseInt(hex.slice(at, at + 2), 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string): number => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
};

describe('the metal theme', () => {
  it('is in the list of themes, between Loop and VS Code', () => {
    const at = themeVariants.indexOf('metal');
    expect(themeVariants[at - 1]).toBe('loop');
    expect(themeVariants[at + 1]).toBe('vscode');
    expect(themeConfigs.metal.label).toBe('Metal');
  });

  it('keeps every curve of Loop', () => {
    const curves = (styles: typeof loopThemeStyles, mode: 'light' | 'dark') =>
      Object.entries(styles[mode] as Record<string, string>).filter(([name]) => /radius/i.test(name));
    for (const mode of ['light', 'dark'] as const) {
      expect(curves(metalThemeStyles, mode)).toEqual(curves(loopThemeStyles, mode));
    }
  });

  it('reads at 4.5 to 1: text, muted text, links and the filled button, in both modes', () => {
    for (const [text, surface] of [
      [metalLight.fg.default, metalLight.canvas.default],
      [metalLight.fg.muted, metalLight.canvas.default],
      [metalLight.fg.muted, metalLight.canvas.subtle],
      [metalLight.accent.fg, metalLight.canvas.default],
      [metalLight.btn.primary.text, metalLight.btn.primary.bg],
      [metalLight.btn.primary.text, metalLight.btn.primary.hoverBg],
      [metalDark.fg.default, metalDark.canvas.default],
      [metalDark.fg.muted, metalDark.canvas.default],
      [metalDark.accent.fg, metalDark.canvas.default],
      [metalDark.btn.primary.text, metalDark.btn.primary.bg],
    ] as [string, string][]) {
      expect([text, surface, contrast(text, surface) >= 4.5]).toEqual([text, surface, true]);
    }
  });

  it('carries its four surfaces and their glass in both modes', () => {
    for (const mode of ['light', 'dark'] as const) {
      const styles = metalThemeStyles[mode] as Record<string, string>;
      for (const surface of ['sage', 'steel', 'mauve', 'clay']) {
        expect(styles[`--metal-gradient-${surface}`]).toContain('linear-gradient');
      }
      expect(styles['--metal-glass-bg']).toMatch(/^rgba/);
    }
    expect(metalColors.metalBrand).toBe('#4C76BA');
  });
});
