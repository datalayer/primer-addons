/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * `EntityAvatar` draws an image, a glyph or initials, on the theme's ground
 * and in the theme's shape.
 */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { EntityAvatar, initialsOf } from '../EntityAvatar';

beforeAll(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
});

let root: Root | null = null;
let host: HTMLElement | null = null;

const render = (node: React.ReactNode): HTMLElement => {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root!.render(node));
  return host.firstElementChild as HTMLElement;
};

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  root = null;
  host = null;
});

const rulesOf = (element: HTMLElement): string => {
  const className = Array.from(element.classList).find(name => name.startsWith('bx-'));
  return Array.from(document.querySelectorAll<HTMLStyleElement>('style[data-primer-addons-box]'))
    .flatMap(style => Array.from(style.sheet?.cssRules ?? []))
    .map(rule => rule.cssText)
    .filter(text => text.includes(`.${className}`))
    .join('\n');
};

describe('EntityAvatar', () => {
  it('draws the initials of a name on the accent wash, in a circle', () => {
    const avatar = render(<EntityAvatar name="Eric Charles" size={40} />);
    expect(avatar.textContent).toBe('EC');
    expect(avatar.getAttribute('role')).toBe('img');
    expect(avatar.getAttribute('aria-label')).toBe('Eric Charles');
    const rules = rulesOf(avatar);
    expect(rules).toContain('var(--bgColor-accent-muted)');
    expect(rules).toContain('var(--fgColor-accent)');
    expect(rules).toContain('border-radius: 50%');
  });

  it("is rounded by the theme's corner for anything but a person", () => {
    const rules = rulesOf(render(<EntityAvatar name="Compactor" shape="rounded" />));
    expect(rules).toContain('min(var(--borderRadius-medium), 28%)');
  });

  it('draws a glyph on a solid tone, or on the entity\'s own colour, under fg.onEmphasis', () => {
    const solid = render(<EntityAvatar tone="success" ground="emphasis"><span data-test="g">🤖</span></EntityAvatar>);
    expect(solid.querySelector('[data-test="g"]')).toBeTruthy();
    expect(rulesOf(solid)).toContain('var(--bgColor-success-emphasis)');
    expect(rulesOf(solid)).toContain('var(--fgColor-onEmphasis)');
    expect(rulesOf(render(<EntityAvatar color="#ff0066" name="x" />))).toMatch(/#ff0066|rgb\(255, 0, 102\)/);
  });

  it('draws an image, and falls back when it does not load', () => {
    const avatar = render(<EntityAvatar src="https://example.com/a.png" name="Ada Lovelace" />);
    const img = avatar.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('https://example.com/a.png');
    act(() => {
      img.dispatchEvent(new Event('error'));
    });
    expect(avatar.querySelector('img')).toBeNull();
    expect(avatar.textContent).toBe('AL');
  });

  it('takes the page ground with a hairline, and a ring', () => {
    const rules = rulesOf(render(<EntityAvatar name="x" ground="canvas" ring />));
    expect(rules).toContain('var(--bgColor-default)');
    expect(rules).toContain('var(--borderColor-default)');
  });

  it('makes initials of up to two words', () => {
    expect(initialsOf('jupyter-notebook-compactor')).toBe('JN');
    expect(initialsOf('eric')).toBe('E');
    expect(initialsOf(undefined)).toBe('');
  });
});
