/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * One item of a grid or a list, as something a card can grow out of.
 *
 * All it does is report the pointer and, with it, where the item currently
 * is on screen — measured at the moment of the hover rather than kept in
 * state, because the page scrolls and a rectangle read at render time is
 * wrong by the time it is used.
 *
 * `mouseover`/`mouseout` reach here as React's `onMouseEnter`/`onMouseLeave`,
 * which are synthesised from them and so do not fire again as the pointer
 * moves between the item's own children — the distinction that makes a card
 * flicker if it is got wrong.
 *
 * @module components/hover-card/HoverCardAnchor
 */

import type { JSX, ReactNode } from 'react';
import { useRef } from 'react';
import { Box, type BoxProps } from '../box/Box';
import type { HoverCardRect, HoverCardState } from './useHoverCard';

export type HoverCardAnchorProps = BoxProps & {
  /** The machine this item reports to. */
  state: HoverCardState<HoverCardRect>;
  /** What identifies this item to it. */
  itemKey: string | number;
  children: ReactNode;
};

/**
 * A grid cell by default, which is the shape that makes the wrapper
 * invisible: a lone child of a grid stretches to fill it, so wrapping a
 * card changes nothing about how tall it is or where it sits. Any `Box`
 * prop changes how it sits in its parent.
 */
export function HoverCardAnchor({
  state,
  itemKey,
  children,
  ...rest
}: HoverCardAnchorProps): JSX.Element {
  const host = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={host}
      onMouseEnter={() => {
        const element = host.current;
        if (!element) {
          return;
        }
        const rect = element.getBoundingClientRect();
        state.open(itemKey, {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        });
      }}
      onMouseLeave={state.scheduleClose}
      display="grid"
      minWidth={0}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default HoverCardAnchor;
