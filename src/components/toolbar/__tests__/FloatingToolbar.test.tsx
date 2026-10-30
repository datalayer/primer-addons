/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * `FloatingToolbar` is drawn as a `Card` is, from the theme's variables
 * only: the overlay ground, the hairline, the floating shadow and the
 * theme's card corner.
 */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { FloatingToolbar } from '../FloatingToolbar';

beforeAll(() => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

let root: Root | null = null;
let host: HTMLElement | null = null;
let anchor: HTMLElement | null = null;

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  anchor?.remove();
  root = null;
  host = null;
  anchor = null;
});

/** The rules of the element's own class. */
const rulesOf = (element: HTMLElement): string => {
  const className = Array.from(element.classList).find(name => name.startsWith('bx-'));
  expect(className).toBeTruthy();
  return Array.from(document.querySelectorAll<HTMLStyleElement>('style[data-primer-addons-box]'))
    .flatMap(style => Array.from(style.sheet?.cssRules ?? []))
    .map(rule => rule.cssText)
    .filter(text => text.includes(`.${className}`))
    .join('\n');
};

describe('FloatingToolbar', () => {
  it('follows the theme: overlay ground, hairline, floating shadow, card corner', () => {
    host = document.createElement('div');
    anchor = document.createElement('div');
    document.body.append(host, anchor);
    root = createRoot(host);
    act(() =>
      root!.render(
        <FloatingToolbar
          isVisible
          anchorElement={anchor}
          items={[{ key: 'bold', type: 'button', ariaLabel: 'Bold', label: 'B', onClick: () => {} }]}
        />,
      ),
    );
    const toolbar = anchor.querySelector<HTMLElement>('[role="toolbar"]');
    expect(toolbar).toBeTruthy();
    const rules = rulesOf(toolbar!);
    expect(rules).toContain('var(--overlay-bgColor)');
    expect(rules).toContain('var(--borderColor-default)');
    expect(rules).toContain('var(--shadow-floating-large)');
    expect(rules).toContain('var(--theme-radius-card)');
    expect(rules).not.toMatch(/#[0-9a-fA-F]{3,6}\b|rgba?\(/);
  });
});
