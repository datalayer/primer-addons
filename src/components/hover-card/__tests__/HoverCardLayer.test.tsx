/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * Where a hover card lands.
 *
 * The card is bigger than the thing it grew out of — that is the whole point
 * of it — so on the first column of a grid it reaches past the left edge of
 * the window, and on the last row past the fold. Nothing catches that: it is
 * `position: fixed`, so the window does not scroll to it and no ancestor
 * clips it; it simply sits half off the screen.
 *
 * So the layer measures itself once it is up and nudges itself back inside.
 * These are the edges of that, including the one that has no good answer —
 * a card too big for the window at all, which is pinned to neither side.
 *
 * The *timing* of the gesture, and the card itself, are in `HoverCard.test`.
 */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { HoverCardLayer } from '../HoverCardLayer';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/** The window these tests place cards in. */
const WINDOW = { width: 1000, height: 800 };

/** How big the card being placed measures, since jsdom lays nothing out. */
let cardSize = { width: 400, height: 300 };

beforeAll(() => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    get: () => WINDOW.width
  });
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    get: () => WINDOW.height
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get: () => cardSize.width
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get: () => cardSize.height
  });
});

let host: HTMLDivElement;
let root: Root;

beforeEach(() => {
  cardSize = { width: 400, height: 300 };
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

/** Put a card over an anchor, and read back where it ended up. */
const place = (anchor: {
  left: number;
  top: number;
  width: number;
  height: number;
}) => {
  act(() => {
    root.render(
      <HoverCardLayer anchor={anchor}>
        <span>a card</span>
      </HoverCardLayer>
    );
  });
  const card = [...document.body.querySelectorAll<HTMLElement>('div')].find(
    element => element.style.position === 'fixed'
  );
  if (!card) {
    throw new Error('the layer drew nothing');
  }
  // Translated by half its own size, so these are its centre.
  return {
    centreX: Number.parseFloat(card.style.left),
    centreY: Number.parseFloat(card.style.top),
    element: card
  };
};

/** A card sat on a 200×150 anchor at these coordinates. */
const anchorAt = (left: number, top: number) => ({
  left,
  top,
  width: 200,
  height: 150
});

describe('where the card is put', () => {
  it('escapes the tree it was written in', () => {
    // Its parent clips, animates, or both; the body does neither.
    const { element } = place(anchorAt(400, 300));

    expect(host.contains(element)).toBe(false);
    expect(element.parentElement).toBe(document.body);
    expect(element.textContent).toBe('a card');
  });

  it('centres on what it grew out of, when there is room', () => {
    const { centreX, centreY } = place(anchorAt(400, 300));

    expect(centreX).toBe(500);
    expect(centreY).toBe(375);
  });

  it('pushes a card off the left edge back onto the screen', () => {
    // A result in the first column: its centre is 100, and half the card is
    // 200, so a third of it would be outside the window.
    const { centreX } = place(anchorAt(0, 300));

    expect(centreX).toBe(212);
    expect(centreX - cardSize.width / 2).toBeGreaterThanOrEqual(0);
  });

  it('pushes a card off the right edge back on too', () => {
    const { centreX } = place(anchorAt(WINDOW.width - 200, 300));

    expect(centreX).toBe(788);
    expect(centreX + cardSize.width / 2).toBeLessThanOrEqual(WINDOW.width);
  });

  it('does the same above and below the fold', () => {
    expect(place(anchorAt(400, 0)).centreY).toBe(162);
    expect(place(anchorAt(400, WINDOW.height - 150)).centreY).toBe(638);
  });

  it('centres a card too big for the window rather than pinning it', () => {
    /*
     * Clamping both edges of something wider than what it is clamped into
     * gives contradictory answers, and whichever wins leaves the other side
     * further out than it started. Centred, at least as much of it is
     * reachable on each side.
     */
    cardSize = { width: 1400, height: 300 };

    expect(place(anchorAt(0, 300)).centreX).toBe(WINDOW.width / 2);
  });

  it('follows the anchor when the pointer moves to another one', () => {
    place(anchorAt(400, 300));

    expect(place(anchorAt(100, 500)).centreX).toBe(212);
  });
});
