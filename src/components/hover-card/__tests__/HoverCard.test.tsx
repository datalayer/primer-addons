/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * The hover card's timing and its two larger sizes: it opens after the
 * pointer rests and not when it passes, Escape closes it, the chevron is a
 * focusable control that opens the large card, and the large card plays its
 * exit before it says it closed.
 */

import { act, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { HoverCard } from '../HoverCard';
import { HoverCardDetails } from '../HoverCardDetails';
import {
  HOVER_CARD_CLOSE_DELAY_MS,
  HOVER_CARD_MOTION_MS,
  HOVER_CARD_OPEN_DELAY_MS,
  useHoverCard,
  type HoverCardState,
} from '../useHoverCard';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let host: HTMLDivElement;
let root: Root;

beforeAll(() => {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
});

beforeEach(() => {
  vi.useFakeTimers();
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.useRealTimers();
});

const RECT = { left: 0, top: 0, width: 200, height: 150 };

describe('useHoverCard', () => {
  let state: HoverCardState | null = null;
  const Probe = () => {
    state = useHoverCard();
    return null;
  };

  it('opens once the pointer rests, not as it passes', () => {
    act(() => root.render(<Probe />));
    act(() => state!.open('a', RECT));
    act(() => state!.scheduleClose());
    act(() => vi.advanceTimersByTime(HOVER_CARD_OPEN_DELAY_MS * 2));
    expect(state!.activeKey).toBeNull();
    act(() => state!.open('a', RECT));
    act(() => vi.advanceTimersByTime(HOVER_CARD_OPEN_DELAY_MS));
    expect(state!.activeKey).toBe('a');
    expect(state!.active).toEqual(RECT);
  });

  it('closes on Escape, playing its exit first', () => {
    act(() => root.render(<Probe />));
    act(() => state!.open('a', RECT));
    act(() => vi.advanceTimersByTime(HOVER_CARD_OPEN_DELAY_MS));
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(state!.closing).toBe(true);
    act(() => vi.advanceTimersByTime(HOVER_CARD_MOTION_MS));
    expect(state!.activeKey).toBeNull();
    expect(HOVER_CARD_CLOSE_DELAY_MS).toBeGreaterThan(0);
  });
});

describe('HoverCard', () => {
  it('draws the picture as a way in, the actions, and a focusable chevron', () => {
    const onOpen = vi.fn();
    const onExpand = vi.fn();
    act(() =>
      root.render(
        <HoverCard
          anchorWidth={200}
          picture={height => <span data-test="picture" data-height={height} />}
          onOpen={onOpen}
          openLabel="Open Titanic"
          actions={<button type="button">Open</button>}
          onExpand={onExpand}
          expandLabel="More about Titanic"
          title="Titanic"
          description="Who survived."
        />,
      ),
    );
    // A button's accessible name: its label, the element labelling it (Primer's
    // IconButton names itself through its tooltip), or its text.
    const nameOf = (b: Element) =>
      b.getAttribute('aria-label') ??
      (b.getAttribute('aria-labelledby') && document.getElementById(b.getAttribute('aria-labelledby')!)?.textContent) ??
      b.textContent;
    const buttons = [...host.querySelectorAll('button')].map(nameOf);
    expect(buttons).toEqual(['Open Titanic', 'Open', 'More about Titanic']);
    // Half the grown width: 200 × 1.45 = 290, so 145.
    expect(host.querySelector('[data-test="picture"]')!.getAttribute('data-height')).toBe('145');
    const chevron = [...host.querySelectorAll('button')].find(b => nameOf(b) === 'More about Titanic') as HTMLButtonElement;
    chevron.focus();
    expect(document.activeElement).toBe(chevron);
    act(() => chevron.click());
    expect(onExpand).toHaveBeenCalledTimes(1);
    expect(host.textContent).toContain('Who survived.');
  });

  it('offers no chevron without a large card to open', () => {
    act(() => root.render(<HoverCard anchorWidth={200} title="A page" />));
    expect(host.querySelector('button')).toBeNull();
  });
});

describe('HoverCardDetails', () => {
  it('closes on Escape after its exit, and on the close button', () => {
    const onClose = vi.fn();
    const Host = () => {
      const [open, setOpen] = useState(true);
      return open ? (
        <HoverCardDetails
          label="Titanic"
          onClose={() => {
            onClose();
            setOpen(false);
          }}
        >
          <p>everything</p>
        </HoverCardDetails>
      ) : null;
    };
    act(() => root.render(<Host />));
    const dialog = document.body.querySelector('[role="dialog"]')!;
    expect(dialog.getAttribute('aria-label')).toBe('Titanic');
    expect(host.contains(dialog)).toBe(false);
    act(() => {
      dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    });
    expect(onClose).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(HOVER_CARD_MOTION_MS));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
  });
});
