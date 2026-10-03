/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Shape as theme tokens (LOOP T-03): what a theme may set besides colour and
 * type — radii, the hairline, one shadow. The eight themes that existed
 * before keep every value they had: proven against a snapshot of each,
 * taken before the shape tokens existed.
 */

import { describe, expect, it } from 'vitest';
import { themeConfigs } from '../themeRegistry';
import { DEFAULT_THEME_SHAPE } from '../css/createThemeCSSVars';

/** A theme's styles, without the tokens added since the snapshot was taken. */
const before = (styles: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(styles).filter(([key]) => !key.startsWith('--theme-')));

describe('the shape of a theme', () => {
  it('is set by every theme, today\'s unless it says otherwise', () => {
    for (const [name, config] of Object.entries(themeConfigs)) {
      const light = config.themeStyles.light as Record<string, unknown>;
      expect(Object.keys(light).filter(key => key.startsWith('--theme-')).sort(), name).toEqual([
        '--theme-hairline',
        '--theme-radius-bubble',
        '--theme-radius-card',
        '--theme-radius-control',
        '--theme-radius-frame',
        '--theme-shadow',
      ]);
    }
    expect((themeConfigs.datalayer.themeStyles.light as Record<string, string>)['--theme-radius-control']).toBe(
      DEFAULT_THEME_SHAPE.radiusControl,
    );
    // The loop theme's own: a pill.
    expect((themeConfigs.loop.themeStyles.light as Record<string, string>)['--theme-radius-control']).toBe('999px');
  });
});

describe('the themes that existed before the shape tokens', () => {
  const names = Object.keys(themeConfigs).filter(name => name !== 'loop').sort();

  it('are eight', () => {
    expect(names).toHaveLength(8);
  });

  for (const name of names) {
    it(`${name} keeps every value it had`, () => {
      const styles = themeConfigs[name as keyof typeof themeConfigs].themeStyles;
      expect({
        light: before(styles.light as Record<string, unknown>),
        dark: before(styles.dark as Record<string, unknown>),
      }).toMatchSnapshot();
    });
  }
});
