/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * `Box` renders its element with one class for its style props, whose rules
 * are in the document's stylesheet (or the shadow root's); `as`, refs,
 * `className`, `style` and the element's own props pass through; `sx` still
 * works, in the same class.
 */

import { act, createRef } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { Box } from '../Box';

beforeAll(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
});

let root: Root | null = null;
let host: HTMLElement | null = null;

const render = (node: React.ReactNode, container?: Element | ShadowRoot) => {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot((container as Element) ?? host);
  act(() => root!.render(node));
  return (container ?? host) as Element;
};

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  root = null;
  host = null;
});

const boxRules = (doc: Document | ShadowRoot = document) =>
  Array.from(doc.querySelectorAll<HTMLStyleElement>('style[data-primer-addons-box]'))
    .flatMap(style => Array.from(style.sheet?.cssRules ?? []))
    .map(rule => rule.cssText)
    .join('\n');

describe('Box', () => {
  it('renders a div with a class for its style props, the rules in the stylesheet', () => {
    const container = render(
      <Box p={3} bg="canvas.subtle" borderColor="border.default" data-test="one">
        hi
      </Box>,
    );
    const element = container.querySelector('[data-test="one"]') as HTMLElement;
    expect(element.tagName).toBe('DIV');
    expect(element.textContent).toBe('hi');
    const className = Array.from(element.classList).find(name => name.startsWith('bx-'));
    expect(className).toBeTruthy();
    expect(element.getAttribute('p')).toBeNull();
    expect(element.getAttribute('bg')).toBeNull();
    const rules = boxRules();
    expect(rules).toContain(`.${className}`);
    expect(rules).toContain('var(--bgColor-muted)');
    expect(rules).toContain('var(--borderColor-default)');
  });

  it('passes as, className, style, ref and the element\'s props through', () => {
    const ref = createRef<HTMLElement>();
    const container = render(
      <Box as="section" ref={ref} className="mine" style={{ color: 'red' }} aria-label="a section" display="flex">
        x
      </Box>,
    );
    const element = container.querySelector('section') as HTMLElement;
    expect(ref.current).toBe(element);
    expect(element.classList.contains('mine')).toBe(true);
    expect(element.style.color).toBe('red');
    expect(element.getAttribute('aria-label')).toBe('a section');
  });

  it('keeps width and height as attributes of an image', () => {
    const container = render(<Box as="img" alt="" width={48} height={48} borderRadius="full" />);
    const element = container.querySelector('img') as HTMLImageElement;
    expect(element.getAttribute('width')).toBe('48');
    expect(element.getAttribute('height')).toBe('48');
    const div = render(<Box data-test="div" width={48} />).querySelector('[data-test="div"]') as HTMLElement;
    expect(div.getAttribute('width')).toBeNull();
  });

  it('draws nothing of its own when it has no style props', () => {
    const container = render(<Box data-test="plain">plain</Box>);
    const element = container.querySelector('[data-test="plain"]') as HTMLElement;
    expect(element.className).toBe('');
  });

  it('still takes sx, in the same class as its props, and never puts it on the DOM', () => {
    const container = render(
      <Box data-test="sx" p={2} sx={{ '& svg': { color: 'fg.muted' } }}>
        sx
      </Box>,
    );
    const element = container.querySelector('[data-test="sx"]') as HTMLElement;
    expect(element.getAttribute('sx')).toBeNull();
    const className = Array.from(element.classList).find(name => name.startsWith('bx-'));
    expect(element.classList.length).toBe(1);
    expect(boxRules()).toContain(`.${className} svg`);
  });

  it('puts its rules in the shadow root it renders into', () => {
    const outer = document.createElement('div');
    document.body.appendChild(outer);
    const shadow = outer.attachShadow({ mode: 'open' });
    const mount = document.createElement('div');
    shadow.appendChild(mount);
    render(<Box data-test="shadow" mx={5} />, mount);
    expect(boxRules(shadow)).toContain('margin-left: 32px');
    outer.remove();
  });
});
