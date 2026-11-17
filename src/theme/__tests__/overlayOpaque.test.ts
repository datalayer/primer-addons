/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * What floats over the page — a menu, a dialog, a popover, a header's
 * mega-menu — is painted with `--overlay-bgColor` (`canvas.overlay`), and it
 * must hide the page under it: opaque in every theme and both modes. A
 * theme's panels may be glass (Metal's dark `--bgColor-default`), its
 * overlays never are.
 */

import { describe, expect, it } from 'vitest';
import { themeTokens, themeVariants } from '../themeTokens';

/**
 * Whether a CSS colour lets nothing through: a hex without alpha, or an
 * alpha of 1; VS Code's variable by its fallback.
 */
const isOpaque = (color: string): boolean => {
  const value = color.trim().toLowerCase();
  // VS Code's own colour first, which its widgets keep opaque: the fallback says the rest.
  const host = value.match(/^var\(--vscode-[\w-]+,\s*(.+)\)$/);
  if (host) {
    return isOpaque(host[1]);
  }
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(value)) {
    return true;
  }
  if (/^#([0-9a-f]{4}|[0-9a-f]{8})$/.test(value)) {
    return value.endsWith('f') && (value.length === 5 || value.endsWith('ff'));
  }
  const rgba = value.match(/^rgba?\(([^)]*)\)$/);
  if (rgba) {
    const parts = rgba[1].split(/[\s,/]+/).filter(Boolean);
    return parts.length === 3 || Number(parts[3]) === 1;
  }
  return false;
};

describe('overlays are opaque', () => {
  it('reads colours as opaque or not', () => {
    expect(isOpaque('#25343F')).toBe(true);
    expect(isOpaque('#fff')).toBe(true);
    expect(isOpaque('rgba(30, 44, 54, 0.74)')).toBe(false);
    expect(isOpaque('rgb(1, 2, 3)')).toBe(true);
    expect(isOpaque('transparent')).toBe(false);
    expect(isOpaque('var(--vscode-editorWidget-background, #F8F8F8)')).toBe(true);
    expect(isOpaque('var(--vscode-editorWidget-background, rgba(0, 0, 0, 0.5))')).toBe(false);
  });

  it('every theme paints --overlay-bgColor opaque, in light and in dark', () => {
    for (const variant of themeVariants) {
      for (const mode of ['light', 'dark'] as const) {
        const styles = themeTokens[variant].themeStyles[mode] as Record<string, string>;
        const overlay = styles['--overlay-bgColor'];
        expect([variant, mode, overlay, Boolean(overlay) && isOpaque(overlay)]).toEqual([
          variant,
          mode,
          overlay,
          true,
        ]);
      }
    }
  });
});
