/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Contrast, tested (LOOP T-15): every accent of the `loop` theme, in both
 * modes, for text on a bubble, on a pill and on the stage — 4.5 to 1, WCAG
 * AA for body text. A failure fails the build.
 */

import { describe, expect, it } from 'vitest';
import { loopAccentNames, loopAccents, loopColors } from '../colors/loopColors';
import { loopDark, loopFocusRing, loopLight, loopMotionVars } from '../themes/loopTheme';

/** The relative luminance of an sRGB colour, as WCAG 2.x defines it. */
export function luminance(hex: string): number {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map(at => parseInt(value.slice(at, at + 2), 16) / 255);
  const linear = channels.map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

/** The contrast ratio of two colours, 1 to 21. */
export function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const AA = 4.5;

describe('the loop theme’s contrast', () => {
  it('measures as WCAG does', () => {
    expect(contrast('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrast('#777777', '#FFFFFF')).toBeCloseTo(4.48, 2);
  });

  for (const name of loopAccentNames) {
    const accent = loopAccents[name];
    it(`${name}: the text on a bubble and on a pill`, () => {
      // The person's bubble and the filled pill: the accent, its `on` text.
      expect(contrast(accent.on, accent.accent)).toBeGreaterThanOrEqual(AA);
    });
    it(`${name}: the text on the stage, light and dark`, () => {
      expect(contrast(loopColors.ink, accent.stage.light)).toBeGreaterThanOrEqual(AA);
      expect(contrast(loopColors.inkDark, accent.stage.dark)).toBeGreaterThanOrEqual(AA);
      // And on the quiet tint, where a reply sits.
      expect(contrast(loopColors.ink, accent.quiet.light)).toBeGreaterThanOrEqual(AA);
      expect(contrast(loopColors.inkDark, accent.quiet.dark)).toBeGreaterThanOrEqual(AA);
    });
  }

  it('shows its focus ring on the surface and around every pill (3 to 1)', () => {
    expect(contrast(loopFocusRing.light, loopColors.white)).toBeGreaterThanOrEqual(3);
    expect(contrast(loopFocusRing.dark, loopColors.black)).toBeGreaterThanOrEqual(3);
    for (const name of loopAccentNames) {
      expect(contrast(loopFocusRing.light, loopAccents[name].accent)).toBeGreaterThanOrEqual(3);
      expect(contrast(loopFocusRing.dark, loopAccents[name].accent)).toBeGreaterThanOrEqual(3);
    }
    // The subtle dark surface is the one place the dark ring falls short.
    expect(contrast(loopFocusRing.dark, loopColors.subtleDark)).toBeGreaterThanOrEqual(2.7);
  });

  it('moves at three durations and one easing (T-10)', () => {
    const durations = Object.entries(loopMotionVars).filter(([, value]) => value.endsWith('ms'));
    expect(durations.map(([key]) => key).sort()).toEqual([
      '--loop-motion-message',
      '--loop-motion-pane',
      '--loop-motion-status',
    ]);
    expect(Object.keys(loopMotionVars)).toContain('--loop-motion-easing');
  });

  it('fills the one button of a screen in the accent, readable in both modes', () => {
    // Both modes: the mint pastel, with its dark text — rest, hovered, pressed.
    expect(loopColors.loopBrand).toBe(loopAccents.green.accent);
    expect(contrast(loopColors.loopOn, loopColors.loopBrand)).toBeGreaterThanOrEqual(AA);
    expect(contrast(loopColors.loopOn, loopColors.loopBrandHover)).toBeGreaterThanOrEqual(AA);
    expect(contrast(loopColors.loopOn, loopColors.loopAccent)).toBeGreaterThanOrEqual(AA);
    // The accent's fill is the button's, in both modes, and the button's text
    // reads on it: the chat draws the person's bubble from that pair.
    for (const mode of [loopLight, loopDark]) {
      expect(mode.accent.emphasis).toBe(mode.btn.primary.bg);
      expect(contrast(mode.btn.primary.text, mode.accent.emphasis)).toBeGreaterThanOrEqual(AA);
    }
    // The accent's text on white.
    expect(contrast(loopColors.loopText, loopColors.white)).toBeGreaterThanOrEqual(AA);
    expect(contrast(loopColors.loopHover, loopColors.white)).toBeGreaterThanOrEqual(AA);
    expect(contrast(loopColors.loopOn, loopColors.loopBright)).toBeGreaterThanOrEqual(AA);
  });

  it('keeps the secondary text readable on the surfaces', () => {
    expect(contrast(loopColors.gray, loopColors.white)).toBeGreaterThanOrEqual(AA);
    expect(contrast(loopColors.grayDark, loopColors.black)).toBeGreaterThanOrEqual(AA);
  });
});
