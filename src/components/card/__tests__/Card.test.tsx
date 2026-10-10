/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * `Card` draws with the theme's variables — its ground, hairline, shadow and
 * corner — takes `interactive` and `selected` states, and lets the caller's
 * own `Box` props win over its defaults.
 */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { Card } from '../Card';

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

describe('Card', () => {
  it('is a theme surface: canvas ground, Primer shadow, the theme card corner', () => {
    const rules = rulesOf(render(<Card>a</Card>));
    expect(rules).toContain('var(--bgColor-default)');
    expect(rules).toContain('var(--fgColor-default)');
    expect(rules).toContain('var(--shadow-resting-small)');
    expect(rules).toContain('var(--theme-radius-card)');
    expect(rules).not.toContain('rgba(');
    expect(rules).not.toContain('border:');
  });

  it('draws the border, a named shadow, a named corner, or no shadow', () => {
    const rules = rulesOf(render(<Card border shadow="large" rounded="medium">b</Card>));
    expect(rules).toContain('var(--borderColor-default)');
    expect(rules).toContain('var(--shadow-floating-large)');
    expect(rules).toContain('var(--borderRadius-medium)');
    expect(rulesOf(render(<Card shadow="none">c</Card>))).toContain('box-shadow: none');
  });

  it('as an interactive button: bordered, a pointer, hover and focus-visible states', () => {
    const element = render(
      <Card as="button" type="button" interactive>
        d
      </Card>,
    );
    expect(element.tagName).toBe('BUTTON');
    expect(element.getAttribute('type')).toBe('button');
    const rules = rulesOf(element);
    expect(rules).toContain('var(--borderColor-default)');
    expect(rules).toContain('cursor: pointer');
    expect(rules).toMatch(/:hover[^}]*var\(--bgColor-accent-emphasis\)/);
    expect(rules).toMatch(/:hover[^}]*var\(--shadow-resting-medium\)/);
    expect(rules).toMatch(/:focus-visible[^}]*outline/);
  });

  it('selected: an accent border on an accent wash', () => {
    const rules = rulesOf(render(<Card selected>e</Card>));
    expect(rules).toContain('var(--bgColor-accent-muted)');
    expect(rules).toContain('var(--bgColor-accent-emphasis)');
    expect(rules).not.toContain('var(--bgColor-default)');
  });

  it('lets the caller\'s props win over its defaults', () => {
    const rules = rulesOf(render(<Card bg="canvas.subtle" p={3}>f</Card>));
    expect(rules).toContain('var(--bgColor-muted)');
    expect(rules).not.toContain('var(--bgColor-default)');
    expect(rules).toContain('padding: 16px');
  });

  it('takes a flavour: its ground and, bordered, its hairline', () => {
    const subtle = rulesOf(render(<Card variant="subtle">g</Card>));
    expect(subtle).toContain('var(--bgColor-muted)');
    const accent = rulesOf(render(<Card variant="accent" border>h</Card>));
    expect(accent).toContain('var(--bgColor-accent-muted)');
    expect(accent).toContain('var(--borderColor-accent-muted)');
    const danger = rulesOf(render(<Card variant="danger" border>i</Card>));
    expect(danger).toContain('var(--bgColor-danger-muted)');
    expect(danger).toContain('var(--borderColor-danger-muted)');
    expect(rulesOf(render(<Card variant="inset">j</Card>))).toContain('var(--bgColor-inset)');
  });

  it('takes the theme\'s shapes by name for its corner', () => {
    expect(rulesOf(render(<Card rounded="control">k</Card>))).toContain('var(--theme-radius-control)');
  });
});
