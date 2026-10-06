/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The rules of clean (LOOP T-17), where the theme itself can be held to
 * them: no gradient but the stage's, the one shadow a component draws, two
 * weights, links plain in a message. The rest is for review (Q-09), and is
 * written in the README's *The rules of clean*.
 */

import { describe, expect, it } from 'vitest';
import { themeConfigs } from '../themeRegistry';
import { loopControlsCss, loopFontWeights, loopTheme } from '../themes/loopTheme';

const modes = ['light', 'dark'] as const;
const styles = (mode: (typeof modes)[number]) =>
  themeConfigs.loop.themeStyles[mode] as Record<string, string>;

describe('the loop theme, by the rules of clean', () => {
  it('has no gradient but the stage', () => {
    for (const mode of modes) {
      const gradients = Object.entries(styles(mode))
        .filter(([, value]) => typeof value === 'string' && /gradient\(/.test(value))
        .map(([key]) => key);
      expect(gradients, mode).toEqual(['--loop-stage-gradient']);
    }
    expect(loopControlsCss).not.toMatch(/gradient\(/);
  });

  it("draws one shadow, the frame's, wherever a component asks the theme for one", () => {
    for (const mode of modes) {
      expect(styles(mode)['--theme-shadow'], mode).toBe(styles(mode)['--loop-shadow-frame']);
    }
    expect(loopControlsCss).not.toMatch(/box-shadow/);
  });

  it('has two weights', () => {
    expect(Object.values(loopFontWeights)).toEqual([400, 600]);
    const weights = new Set(
      Object.entries(styles('light'))
        .filter(([key]) => /^--text-.*-shorthand/.test(key))
        .map(([, value]) => Number(String(value).split(' ')[0])),
    );
    expect([...weights].sort()).toEqual([400, 600]);
    // And what `sx` reads by name: Primer's semibold is 500, its light 300.
    expect(loopTheme.fontWeights).toEqual({ light: 400, normal: 400, semibold: 600, bold: 600 });
    expect(themeConfigs.loop.primerTheme.fontWeights).toEqual(loopTheme.fontWeights);
  });

  it('writes a link in a message plain: the colour of its words', () => {
    for (const mode of modes) {
      expect(styles(mode)['--theme-message-link'], mode).toBe('currentColor');
    }
  });
});
