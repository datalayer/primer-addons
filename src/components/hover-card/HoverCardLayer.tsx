/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Where a hover card goes when it is bigger than the thing it grew from.
 *
 * Two problems, both of which the obvious answer — an absolutely positioned
 * element inside the card — gets wrong.
 *
 * The first is escape. A results grid clips, a marquee clips, a section
 * animates; and `position: fixed` is fixed to the *viewport* only until some
 * ancestor has a `transform`, at which point it fixes to that ancestor
 * instead. An entrance animation with `both` fill-mode is enough to do it,
 * for ever after it has played. A portal to `document.body` is immune to all
 * of it, so that is where the card is put.
 *
 * The second is the edges. The card is wider and taller than the thing it
 * covers, so one grown from the first column reaches past the left edge of
 * the window and one at the bottom of the page reaches past the fold. It is
 * measured once it is up and nudged back inside, which is why the position is
 * state rather than a style computed on the way out: the layout has to exist
 * before it can be corrected.
 *
 * @module components/hover-card/HoverCardLayer
 */

import type { JSX, ReactNode } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { HoverCardRect } from './useHoverCard';

/** How close to the window's edge the card may come. */
const MARGIN = 12;

export type HoverCardLayerProps = {
  anchor: HoverCardRect;
  children: ReactNode;
  /** Kept high enough to clear page furniture; under the details dialog. */
  zIndex?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function HoverCardLayer({
  anchor,
  children,
  zIndex = 900,
  onMouseEnter,
  onMouseLeave
}: HoverCardLayerProps): JSX.Element | null {
  const box = useRef<HTMLDivElement>(null);
  /** Centred on the anchor to start with, then corrected against the window. */
  const [at, setAt] = useState(() => ({
    left: anchor.left + anchor.width / 2,
    top: anchor.top + anchor.height / 2
  }));

  useLayoutEffect(() => {
    const element = box.current;
    const centre = {
      left: anchor.left + anchor.width / 2,
      top: anchor.top + anchor.height / 2
    };
    if (!element) {
      setAt(centre);
      return;
    }
    /*
     * The card's own size, not the anchor's.
     *
     * Read from the layout box rather than from the caller: the card decides
     * how much bigger than its anchor it is, and a layer that had to be told
     * would be one more thing to keep in step. `getBoundingClientRect` would
     * report the *animated* size — the entrance starts at the anchor's scale
     * — so the untransformed offsets are what is measured.
     */
    const half = { x: element.offsetWidth / 2, y: element.offsetHeight / 2 };
    const clamp = (value: number, half_: number, limit: number) => {
      // A card too big for the window at all: centre it, rather than pinning
      // it to one edge and letting the other run off.
      if (half_ * 2 + MARGIN * 2 > limit) {
        return limit / 2;
      }
      return Math.min(Math.max(value, half_ + MARGIN), limit - half_ - MARGIN);
    };
    setAt({
      left: clamp(centre.left, half.x, window.innerWidth),
      top: clamp(centre.top, half.y, window.innerHeight)
    });
  }, [anchor.left, anchor.top, anchor.width, anchor.height]);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      ref={box}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        left: at.left,
        top: at.top,
        transform: 'translate(-50%, -50%)',
        zIndex
      }}
    >
      {children}
    </div>,
    document.body
  );
}

export default HoverCardLayer;
