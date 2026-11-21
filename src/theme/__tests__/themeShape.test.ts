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
import { roundedRadiusVars } from '../themes/roundedShape';

/** The themes, beside loop and metal, rounded since 21 November 2026. */
const ROUNDED = ['sand', 'ivory', 'sun'];

/** A theme's styles, without the tokens added since the snapshot was taken. */
const before = (styles: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(styles).filter(([key]) => !key.startsWith('--theme-')));

describe('the shape of a theme', () => {
  it('is set by every theme, today\'s unless it says otherwise', () => {
    for (const [name, config] of Object.entries(themeConfigs)) {
      const light = config.themeStyles.light as Record<string, unknown>;
      expect(Object.keys(light).filter(key => key.startsWith('--theme-')).sort(), name).toEqual([
        '--theme-accent',
        '--theme-accent-on',
        '--theme-hairline',
        '--theme-message-link',
        '--theme-motion-easing',
        '--theme-motion-message',
        '--theme-motion-pane',
        '--theme-motion-status',
        '--theme-quiet',
        '--theme-radius-bubble',
        '--theme-radius-card',
        '--theme-radius-control',
        '--theme-radius-frame',
        '--theme-radius-overlay',
        '--theme-radius-table',
        '--theme-shadow',
        '--theme-stage',
        '--theme-stage-gradient',
        '--theme-table-border',
        '--theme-table-header-bg',
        '--theme-table-header-fg',
      ]);
    }
    expect((themeConfigs.datalayer.themeStyles.light as Record<string, string>)['--theme-radius-control']).toBe(
      DEFAULT_THEME_SHAPE.radiusControl,
    );
    // The loop theme's own: a pill.
    expect((themeConfigs.loop.themeStyles.light as Record<string, string>)['--theme-radius-control']).toBe('999px');
    // Nothing moves but in a theme that says so (T-10).
    expect((themeConfigs.datalayer.themeStyles.light as Record<string, string>)['--theme-motion-message']).toBe('0ms');
    expect((themeConfigs.loop.themeStyles.dark as Record<string, string>)['--theme-motion-message']).toBe('200ms');
    // A link in a message: the accent, but plain in loop (T-06).
    expect((themeConfigs.datalayer.themeStyles.light as Record<string, string>)['--theme-message-link']).toBe(
      DEFAULT_THEME_SHAPE.messageLink,
    );
    expect((themeConfigs.loop.themeStyles.light as Record<string, string>)['--theme-message-link']).toBe('currentColor');
    expect((themeConfigs.loop.themeStyles.dark as Record<string, string>)['--theme-message-link']).toBe('currentColor');
  });
});

describe('the themes that existed before the shape tokens', () => {
  const names = Object.keys(themeConfigs)
    .filter(name => !['loop', 'metal', 'vscode', ...ROUNDED].includes(name))
    .sort();

  it('are five that keep their shape, and the three made rounded', () => {
    expect(names).toHaveLength(5);
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

  // The three made rounded keep every other value: their colours, their type.
  const corners = (styles: Record<string, unknown>) =>
    Object.fromEntries(Object.entries(before(styles)).filter(([key]) => !(key in roundedRadiusVars)));
  for (const name of ROUNDED) {
    it(`${name} keeps every value it had`, () => {
      const styles = themeConfigs[name as keyof typeof themeConfigs].themeStyles;
      expect({
        light: corners(styles.light as Record<string, unknown>),
        dark: corners(styles.dark as Record<string, unknown>),
      }).toMatchSnapshot();
    });
  }

  it("says how Primer's data table is drawn: Primer's unless a theme says otherwise", () => {
    const datalayer = themeConfigs.datalayer.themeStyles.light as Record<string, string>;
    expect(datalayer['--theme-radius-table']).toBe(DEFAULT_THEME_SHAPE.radiusTable);
    expect(datalayer['--theme-table-header-bg']).toBe('var(--bgColor-muted)');
    expect(datalayer['--theme-table-border']).toBe('var(--borderColor-default)');
    expect(datalayer['--theme-radius-overlay']).toBe('var(--borderRadius-large, 12px)');
    expect((themeConfigs.loop.themeStyles.light as Record<string, string>)['--theme-radius-overlay']).toBe('20px');
    // The loop theme's tables have the corners of its list items.
    expect((themeConfigs.loop.themeStyles.dark as Record<string, string>)['--theme-radius-table']).toBe('14px');
  });
});

describe('the rounded shape', () => {
  const RADII = [
    '--theme-radius-control',
    '--theme-radius-card',
    '--theme-radius-bubble',
    '--theme-radius-frame',
    '--theme-radius-table',
    '--theme-radius-overlay',
  ];

  it('is the same in loop, metal, sand, ivory and sun, in both modes', () => {
    const loop = themeConfigs.loop.themeStyles.light as Record<string, string>;
    for (const name of ['metal', ...ROUNDED] as (keyof typeof themeConfigs)[]) {
      for (const mode of ['light', 'dark'] as const) {
        const styles = themeConfigs[name].themeStyles[mode] as Record<string, string>;
        for (const key of [...RADII, ...Object.keys(roundedRadiusVars)]) {
          expect(styles[key], `${name} ${mode} ${key}`).toBe(loop[key]);
        }
      }
      // Its pill controls drawn by the stylesheet.
      expect(themeConfigs[name].themeStyles.css, name).toContain('var(--theme-radius-control)');
    }
    expect(loop['--theme-radius-control']).toBe('999px');
    expect(loop['--borderRadius-medium']).toBe('14px');
  });
});
