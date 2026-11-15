/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The page layout's panel opening at the theme's pace (LOOP T-10): from its
 * side, by `--theme-motion-pane` and `--theme-motion-easing` — no motion in
 * a theme that sets none, none when motion is reduced.
 */

import { describe, expect, it } from 'vitest';
import { panelOpening } from '../page-layout/PageLayout';
import { themeConfigs } from '../../theme/themeRegistry';

describe('a panel opening', () => {
  it("comes in from its side at the theme's pace", () => {
    const right = panelOpening('right');
    expect(right.animation).toBe(
      'pagePanelOpenRight var(--theme-motion-pane, 0ms) var(--theme-motion-easing, ease) both',
    );
    expect(right['@keyframes pagePanelOpenRight']).toEqual({
      from: { opacity: 0, transform: 'translateX(12px)' },
      to: { opacity: 1, transform: 'none' },
    });
    expect(panelOpening('left')['@keyframes pagePanelOpenLeft']).toEqual({
      from: { opacity: 0, transform: 'translateX(-12px)' },
      to: { opacity: 1, transform: 'none' },
    });
  });

  it('does not move when motion is reduced', () => {
    expect(panelOpening('right')['@media (prefers-reduced-motion: reduce)']).toEqual({
      animation: 'none',
    });
  });

  it('moves only in a theme that sets a pane duration', () => {
    const pane = (name: keyof typeof themeConfigs) =>
      (themeConfigs[name].themeStyles.light as Record<string, string>)['--theme-motion-pane'];
    expect(pane('loop')).toBe('320ms');
    expect(pane('datalayer')).toBe('0ms');
  });
});
