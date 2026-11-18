/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * SlidingPanel: over the viewport, as it always was, or contained in its own
 * region of a page (a chat embedded in a section), and a panel to read rather
 * than an announcement when it says so.
 */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { ThemeProvider } from '@primer/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SlidingPanel, type SlidingPanelProps } from '../SlidingPanel';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let host: HTMLDivElement | null = null;
let root: Root | null = null;

afterEach(() => {
  act(() => root?.unmount());
  root = null;
  host?.remove();
  host = null;
});

/** A button's accessible name: its label, or the tooltip that labels it (Primer's IconButton). */
const nameOf = (button: HTMLElement): string | null | undefined =>
  button.getAttribute('aria-label') ??
  document.getElementById(button.getAttribute('aria-labelledby') ?? '')?.textContent;

const draw = (props: Partial<SlidingPanelProps>) => {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => {
    root!.render(
      <ThemeProvider>
        <SlidingPanel isOpen message="Deck ready" details="Six slides." {...props} />
      </ThemeProvider>,
    );
  });
  const panel = host.querySelector<HTMLElement>('[data-sliding-panel]')!;
  return { panel, anchor: panel.parentElement! };
};

describe('SlidingPanel', () => {
  it('covers the viewport by default, and its own region when contained', () => {
    const over = draw({ position: 'north' });
    expect(getComputedStyle(over.anchor).position).toBe('fixed');
    act(() => root?.unmount());
    host?.remove();
    const within = draw({ position: 'east', contained: true, panelSize: 320 });
    expect(getComputedStyle(within.anchor).position).toBe('absolute');
    expect(within.panel.dataset.slidingPanel).toBe('east');
    expect(getComputedStyle(within.panel).height).toBe('100%');
  });

  it('is a live region by default, an error at once; or a named region to read', () => {
    expect(draw({}).panel.getAttribute('role')).toBe('status');
    act(() => root?.unmount());
    host?.remove();
    const error = draw({ variant: 'error' }).panel;
    expect(error.getAttribute('role')).toBe('alert');
    expect(error.getAttribute('aria-live')).toBe('assertive');
    act(() => root?.unmount());
    host?.remove();
    const read = draw({ live: false, ariaLabel: 'From the agent' }).panel;
    expect(read.getAttribute('role')).toBe('region');
    expect(read.getAttribute('aria-live')).toBeNull();
    expect(read.getAttribute('aria-label')).toBe('From the agent');
  });

  it('is dismissed by its Close button, by Escape, and by a click unless told otherwise', () => {
    const dismissed = vi.fn();
    const { panel } = draw({ onDismiss: dismissed, closeLabel: 'Close the notice' });
    const close = panel.querySelector('button')!;
    expect(nameOf(close)).toBe('Close the notice');
    act(() => close.click());
    act(() => {
      panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    });
    act(() => panel.click());
    expect(dismissed).toHaveBeenCalledTimes(3);
    act(() => root?.unmount());
    host?.remove();
    const kept = vi.fn();
    const still = draw({ onDismiss: kept, dismissOnPanelClick: false }).panel;
    act(() => still.click());
    expect(kept).not.toHaveBeenCalled();
    act(() => {
      still.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    });
    expect(kept).toHaveBeenCalledTimes(1);
  });
});
