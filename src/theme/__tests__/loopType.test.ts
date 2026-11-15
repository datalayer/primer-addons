/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The `loop` theme's type (LOOP T-04): one face, served from the page's own
 * build with a metric-matched fallback; two weights; five sizes, one
 * line-height per size.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { themeConfigs } from '../themeRegistry';
import { loopFontFamily } from '../themes/loopTheme';

const styles = themeConfigs.loop.themeStyles;
const face = readFileSync(join(__dirname, '..', '..', '..', 'style', 'loop-face.css'), 'utf8');

/** Every `--text-*-shorthand` of a mode, as weight, size and line-height. */
const shorthands = (mode: Record<string, unknown>) =>
  Object.entries(mode)
    .filter(([name]) => /^--text-.*-shorthand/.test(name))
    .map(([name, value]) => {
      const match = String(value).match(/^(\d+) ([\d.]+rem)\/([\d.]+) (.+)$/);
      if (!match) throw new Error(`${name} is not a font shorthand: ${value}`);
      return { name, weight: match[1], size: match[2], lineHeight: match[3], family: match[4] };
    });

describe('the loop theme type', () => {
  it('names Inter, then its fallback, then the system face', () => {
    expect(loopFontFamily.startsWith('"Inter Variable", "Inter Fallback", ')).toBe(true);
    expect(loopFontFamily).toMatch(/system-ui/);
    expect(loopFontFamily.trim().endsWith('sans-serif')).toBe(true);
  });

  for (const mode of ['light', 'dark'] as const) {
    it(`sets five sizes, one line-height each and two weights, in ${mode}`, () => {
      const mine = styles[mode] as Record<string, unknown>;
      const all = shorthands(mine);
      expect(all.length).toBeGreaterThanOrEqual(9);
      for (const one of all) expect(one.family).toBe(loopFontFamily);
      expect(new Set(all.map(one => one.size)).size).toBe(5);
      const lineOf = new Map<string, string>();
      for (const one of all) {
        expect(lineOf.get(one.size) ?? one.lineHeight).toBe(one.lineHeight);
        lineOf.set(one.size, one.lineHeight);
        // Each line a multiple of 4px.
        const line = parseFloat(one.size) * 16 * parseFloat(one.lineHeight);
        expect(Math.abs(line - Math.round(line / 4) * 4)).toBeLessThan(0.01);
      }
      expect([...new Set(all.map(one => one.weight))].sort()).toEqual(['400', '600']);
      expect(new Set(['light', 'normal', 'medium', 'semibold'].map(w => mine[`--base-text-weight-${w}`]))).toEqual(
        new Set(['400', '600']),
      );
      // The split tokens agree with the shorthands.
      expect(mine['--text-body-size-medium']).toBe('0.875rem');
      expect(mine['--text-body-lineHeight-small']).toBe(lineOf.get('0.75rem'));
      expect(mine['--text-title-lineHeight-large']).toBe(lineOf.get('2rem'));
    });
  }

  it('serves Inter from the page’s own build and nothing from a third party', () => {
    expect(face).not.toMatch(/https?:|fonts\.googleapis|fonts\.gstatic/);
    const sources = [...face.matchAll(/url\('([^']+)'\)/g)].map(match => match[1]);
    expect(sources).toEqual([
      '@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2',
      '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
    ]);
    expect(face.match(/font-display: swap;/g)).toHaveLength(2);
  });

  it('draws the fallback to Inter’s measure', () => {
    const fallback = face.slice(face.indexOf("font-family: 'Inter Fallback'"));
    expect(fallback).toContain("local('Arial')");
    expect(fallback).toContain("local('Liberation Sans')");
    expect(fallback).toContain('size-adjust: 107.4%');
    expect(fallback).toContain('ascent-override: 90.2%');
    expect(fallback).toContain('descent-override: 22.48%');
    expect(fallback).toContain('line-gap-override: 0%');
  });
});
