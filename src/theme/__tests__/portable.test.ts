/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The portable entry (`theme/portable`) is what a native app imports. It must
 * reach neither Primer React nor styled-components, and must evaluate with no
 * `window` or `document`, as it does under Hermes.
 */

// @vitest-environment node

import { describe, expect, it, vi } from 'vitest';

vi.mock('@primer/react', () => {
  throw new Error('theme/portable reached @primer/react');
});
vi.mock('styled-components', () => {
  throw new Error('theme/portable reached styled-components');
});

describe('the portable theme entry', () => {
  it('loads without Primer React, styled-components or a browser', async () => {
    expect(typeof window).toBe('undefined');
    const portable = await import('../portable');
    expect(portable.themeVariants).toHaveLength(9);
    for (const variant of portable.themeVariants) {
      const theme = portable.exportPortableTheme(variant);
      expect(theme.id).toBe(variant);
      expect(theme.modes.light['--bgColor-default']).toMatch(/^#|^rgb|^hsl|^var\(/);
      expect(theme.modes.dark['--fgColor-default']).toBeTruthy();
    }
  });

  it('carries each theme\'s own tokens', async () => {
    const { themeTokens } = await import('../themeTokens');
    expect(themeTokens.loop.themeStyles.light).toHaveProperty('--loop-radius-control');
    expect(themeTokens.datalayer.defaultColorMode).toBe('auto');
    expect(Object.keys(themeTokens.loop)).not.toContain('primerTheme');
  });
});
