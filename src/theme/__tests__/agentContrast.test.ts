/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Contrast, tested: every accent of the theme system, in both
 * modes, for text on a bubble, on a pill and on the stage — 4.5 to 1, WCAG
 * AA for body text. A failure fails the build.
 */

import { describe, expect, it } from 'vitest';
import { agentColors } from '../colors/agentColors';
import { themeAccentNames, themeAccentVars, themeAccents } from '../colors/themeAccents';
import { themeConfigs } from '../themeRegistry';
import { agentDark, agentFocusRing, agentLight, agentMotionVars } from '../themes/agentTheme';

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

describe('the agent theme’s contrast', () => {
  it('measures as WCAG does', () => {
    expect(contrast('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrast('#777777', '#FFFFFF')).toBeCloseTo(4.48, 2);
  });

  for (const name of themeAccentNames) {
    const accent = themeAccents[name];
    it(`${name}: the text on a bubble and on a pill`, () => {
      // The person's bubble and the filled pill: the accent, its `on` text.
      expect(contrast(accent.on, accent.accent)).toBeGreaterThanOrEqual(AA);
    });
    it(`${name}: the text on the stage, light and dark`, () => {
      expect(contrast(agentColors.ink, accent.stage.light)).toBeGreaterThanOrEqual(AA);
      expect(contrast(agentColors.inkDark, accent.stage.dark)).toBeGreaterThanOrEqual(AA);
      // And on the quiet tint, where a reply sits.
      expect(contrast(agentColors.ink, accent.quiet.light)).toBeGreaterThanOrEqual(AA);
      expect(contrast(agentColors.inkDark, accent.quiet.dark)).toBeGreaterThanOrEqual(AA);
    });
  }

  it('shows its focus ring on the surface and around every pill (3 to 1)', () => {
    expect(contrast(agentFocusRing.light, agentColors.white)).toBeGreaterThanOrEqual(3);
    expect(contrast(agentFocusRing.dark, agentColors.black)).toBeGreaterThanOrEqual(3);
    for (const name of themeAccentNames) {
      expect(contrast(agentFocusRing.light, themeAccents[name].accent)).toBeGreaterThanOrEqual(3);
      expect(contrast(agentFocusRing.dark, themeAccents[name].accent)).toBeGreaterThanOrEqual(3);
    }
    // The subtle dark surface is the one place the dark ring falls short.
    expect(contrast(agentFocusRing.dark, agentColors.subtleDark)).toBeGreaterThanOrEqual(2.7);
  });

  it('moves at three durations and one easing', () => {
    const durations = Object.entries(agentMotionVars).filter(([, value]) => value.endsWith('ms'));
    expect(durations.map(([key]) => key).sort()).toEqual([
      '--agent-motion-message',
      '--agent-motion-pane',
      '--agent-motion-status',
    ]);
    expect(Object.keys(agentMotionVars)).toContain('--agent-motion-easing');
  });

  it('fills the one button of a screen in the accent, readable in both modes', () => {
    // Both modes: the mint pastel, with its dark text — rest, hovered, pressed.
    expect(agentColors.agentBrand).toBe(themeAccents.green.accent);
    expect(contrast(agentColors.agentOn, agentColors.agentBrand)).toBeGreaterThanOrEqual(AA);
    expect(contrast(agentColors.agentOn, agentColors.agentBrandHover)).toBeGreaterThanOrEqual(AA);
    expect(contrast(agentColors.agentOn, agentColors.agentAccent)).toBeGreaterThanOrEqual(AA);
    // The accent's fill is the button's, in both modes, and the button's text
    // reads on it: the chat draws the person's bubble from that pair.
    for (const mode of [agentLight, agentDark]) {
      expect(mode.accent.emphasis).toBe(mode.btn.primary.bg);
      expect(contrast(mode.btn.primary.text, mode.accent.emphasis)).toBeGreaterThanOrEqual(AA);
    }
    // The accent's text on white.
    expect(contrast(agentColors.agentText, agentColors.white)).toBeGreaterThanOrEqual(AA);
    expect(contrast(agentColors.agentHover, agentColors.white)).toBeGreaterThanOrEqual(AA);
    expect(contrast(agentColors.agentOn, agentColors.agentBright)).toBeGreaterThanOrEqual(AA);
  });

  it('keeps the secondary text readable on the surfaces', () => {
    expect(contrast(agentColors.gray, agentColors.white)).toBeGreaterThanOrEqual(AA);
    expect(contrast(agentColors.grayDark, agentColors.black)).toBeGreaterThanOrEqual(AA);
  });
});

describe("an application's accent, everything it colours", () => {
  it('fills the bubble and the button with the accent, its own text on it', () => {
    for (const name of themeAccentNames) {
      for (const mode of ['light', 'dark'] as const) {
        const styles = themeAccentVars(name, mode);
        expect(styles['--theme-accent']).toBe(themeAccents[name].accent);
        expect(styles['--bgColor-accent-emphasis']).toBe(themeAccents[name].accent);
        expect(styles['--button-primary-bgColor-rest']).toBe(themeAccents[name].accent);
        expect(
          contrast(styles['--button-primary-fgColor-rest'], styles['--button-primary-bgColor-rest']),
        ).toBeGreaterThanOrEqual(AA);
        expect(styles['--theme-stage']).toBe(themeAccents[name].stage[mode]);
        // The selected tab, underlined in the accent rather than Primer's coral.
        expect(styles['--underlineNav-borderColor-active']).toBe(themeAccents[name].accent);
      }
    }
  });

  it('writes its text in its own hue, readable in both modes', () => {
    for (const name of themeAccentNames) {
      const light = themeAccentVars(name, 'light');
      const dark = themeAccentVars(name, 'dark');
      // A link and an accent's word, on the page and on its quiet tint.
      expect(light['--fgColor-accent']).toBe(themeAccents[name].text.light);
      expect(light['--fgColor-link']).toBe(themeAccents[name].text.light);
      expect(dark['--fgColor-accent']).toBe(themeAccents[name].text.dark);
      expect(contrast(light['--fgColor-accent'], agentColors.white)).toBeGreaterThanOrEqual(AA);
      expect(contrast(dark['--fgColor-accent'], agentColors.black)).toBeGreaterThanOrEqual(AA);
      expect(contrast(dark['--fgColor-accent'], themeAccents[name].quiet.dark)).toBeGreaterThanOrEqual(AA);
      if (name !== 'green') {
        expect(contrast(light['--fgColor-accent'], themeAccents[name].quiet.light)).toBeGreaterThanOrEqual(AA);
      }
      expect(light['--bgColor-accent-muted']).toBe(themeAccents[name].quiet.light);
      expect(dark['--bgColor-accent-muted']).toBe(themeAccents[name].quiet.dark);
    }
  });

  it('leaves mint, the default, as the theme has it', () => {
    expect(themeAccents.green.text).toEqual({ light: agentColors.agentText, dark: agentColors.agentBright });
    expect(themeAccents.green.quiet).toEqual({ light: agentColors.agentTint, dark: agentColors.agentTintDark });
    expect(agentLight.accent.fg).toBe(themeAccents.green.text.light);
    expect(agentDark.accent.fg).toBe(themeAccents.green.text.dark);
  });

  it('colours every theme, not agent alone (decided 2026-10-07)', () => {
    for (const [variant, config] of Object.entries(themeConfigs)) {
      for (const mode of ['light', 'dark'] as const) {
        const worn = { ...(config.themeStyles[mode] as Record<string, string>), ...themeAccentVars('rose', mode) };
        expect(worn['--button-primary-bgColor-rest'], variant).toBe(themeAccents.rose.accent);
        expect(worn['--button-primary-fgColor-rest'], variant).toBe(themeAccents.rose.on);
        expect(worn['--fgColor-accent'], variant).toBe(themeAccents.rose.text[mode]);
        expect(worn['--theme-stage'], variant).toBe(themeAccents.rose.stage[mode]);
      }
    }
  });

  it('is set by every theme, its own by default', () => {
    for (const [variant, config] of Object.entries(themeConfigs)) {
      for (const mode of ['light', 'dark'] as const) {
        const styles = config.themeStyles[mode] as Record<string, string>;
        for (const key of ['--theme-accent', '--theme-accent-on', '--theme-stage', '--theme-quiet', '--theme-stage-gradient']) {
          expect(styles[key], `${variant} ${mode} ${key}`).toBeTruthy();
        }
      }
    }
    // Agent's own is mint, its stage and quiet tint included.
    const agent = themeConfigs.agent.themeStyles.light as Record<string, string>;
    expect(agent['--theme-accent']).toBe(themeAccents.green.accent);
    expect(agent['--theme-stage']).toBe(themeAccents.green.stage.light);
    expect(agent['--theme-quiet']).toBe(themeAccents.green.quiet.light);
  });

  it('refuses an accent that is not one of the six', () => {
    expect(() => themeAccentVars('teal' as never)).toThrow(
      'There is no accent "teal"; the accents are green, rose, sky, lime, sun, violet.',
    );
  });
});
