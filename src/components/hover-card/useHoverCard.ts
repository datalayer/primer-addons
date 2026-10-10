/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Hovering a card to see more of it, as a state machine.
 *
 * The gesture is the one a shelf of films uses: rest the pointer on
 * something and it grows into a larger card; move off and the card plays its
 * entrance backwards. Simple to describe and full of edges, all of which are
 * about *time* rather than about what is drawn — which is why they live here,
 * in a hook that draws nothing, instead of being written again beside every
 * grid that wants the gesture.
 *
 * The edges, and what each one is for:
 *
 * - **Opening waits.** Dragging the pointer across a row would otherwise
 *   open a card over every item on the way, and the reader is chased by
 *   something they never asked for. The wait is the difference between
 *   passing over an item and stopping on it.
 * - **Closing waits too, then plays.** First a grace, because the pointer has
 *   to cross the gap into the card and a card that vanished in that gap could
 *   never be reached. Then the exit, during which the card is still mounted
 *   and knows it is leaving, so it can shrink rather than blink out.
 * - **Leaving is not interruptible.** A card on its way out keeps the stage
 *   until it is gone: two movements at once — one shrinking, one growing —
 *   read as a glitch rather than as a change of subject. An item reached
 *   mid-exit is queued, and the exit hands over to it.
 * - **Moving between items plays the exit.** Sliding the open card across to
 *   the new one instead skips the gesture entirely: it teleports, at full
 *   size, and the two cards never read as two. The grace is dropped there,
 *   though — a pointer that has landed on another item is plainly not
 *   heading for the card.
 * - **Escape closes it.** A card opened by resting on something can otherwise
 *   only be closed by moving off, and a reader who wants back what it covers
 *   reaches for the key every overlay answers. It also calls off a card that
 *   has not appeared yet: "no" is the same answer either side of the wait.
 *
 * The hook knows nothing about where the card goes. Callers hand it whatever
 * they need to place one — a coordinate inside a scrolling row, a rectangle
 * in the viewport — and get it back in `active`.
 *
 * @module components/hover-card/useHoverCard
 */

import { useEffect, useRef, useState } from 'react';

/** The thing a hover card grew out of, in viewport coordinates. */
export type HoverCardRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/**
 * How long the pointer must rest on something before its card opens.
 *
 * This is the wait that separates *reading a page* from *choosing something
 * on it*: a card that opens while the eye is still travelling is an
 * interruption, since the reader did not ask for it and has to wait for it
 * to leave again. Set by feel, from the top of the range down — long enough
 * that a pointer crossing the page is not chased by anything, short enough
 * that stopping on something does not feel like waiting for it.
 */
export const HOVER_CARD_OPEN_DELAY_MS = 320;

/** How long a card waits, after the pointer leaves, before it starts out. */
export const HOVER_CARD_CLOSE_DELAY_MS = 320;

/**
 * How long a card takes to arrive, and to leave.
 *
 * The same number both ways: a card that leaves faster than it came reads as
 * being dismissed rather than closed. Whatever draws the card has to animate
 * for exactly this long, because the card is kept mounted for exactly this
 * long after it is told it is leaving.
 */
export const HOVER_CARD_MOTION_MS = 320;

/** What is open, and whatever the caller needs to place it. */
type Opened<Placement> = { key: string | number; at: Placement };

export type HoverCardOptions = {
  /**
   * Whether the gesture is offered at all.
   *
   * A caller with nothing to preview passes `false` rather than skipping the
   * hook, which it cannot do.
   */
  enabled?: boolean;
  openDelayMs?: number;
  closeDelayMs?: number;
  motionMs?: number;
};

export type HoverCardState<Placement> = {
  /** Where to put the open card, or `null` when there is none. */
  active: Placement | null;
  /** Which item it is open for. */
  activeKey: string | number | null;
  /** Whether it is playing its exit, and so is still on screen. */
  closing: boolean;
  /** The pointer reached this item. */
  open: (key: string | number, at: Placement) => void;
  /** The pointer left it, or left the card. */
  scheduleClose: () => void;
  /** The pointer came back before the card was gone. */
  cancelClose: () => void;
};

export function useHoverCard<Placement = HoverCardRect>({
  enabled = true,
  openDelayMs = HOVER_CARD_OPEN_DELAY_MS,
  closeDelayMs = HOVER_CARD_CLOSE_DELAY_MS,
  motionMs = HOVER_CARD_MOTION_MS
}: HoverCardOptions = {}): HoverCardState<Placement> {
  const [opened, setOpened] = useState<Opened<Placement> | null>(null);
  const [closing, setClosing] = useState(false);

  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const exitTimer = useRef<number | null>(null);
  /**
   * An item the pointer reached while a card was still leaving.
   *
   * A ref rather than state: nothing renders from it, and it is written and
   * read inside timers that must see the latest value rather than the one
   * captured when they were set.
   */
  const queued = useRef<Opened<Placement> | null>(null);

  const clear = (timer: { current: number | null }) => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const cancelClose = () => {
    queued.current = null;
    clear(closeTimer);
    clear(exitTimer);
    setClosing(false);
  };

  /**
   * The exit: the entrance played backwards.
   *
   * The card stays mounted through it, marked `closing` so it knows to
   * shrink rather than to grow, and only then is it taken off the screen —
   * or handed over to whichever item the pointer found in the meantime.
   */
  const beginExit = () => {
    clear(closeTimer);
    clear(exitTimer);
    setClosing(true);
    exitTimer.current = window.setTimeout(() => {
      const next = queued.current;
      queued.current = null;
      setClosing(false);
      // Straight into the next card if the pointer found one while this was
      // leaving: the reader has already waited out the exit, and making them
      // wait the hover intent again on top of it would read as being ignored.
      setOpened(next ?? null);
    }, motionMs);
  };

  const scheduleClose = () => {
    /*
     * The wait to open is called off, first of all.
     *
     * This is what makes the hover intent mean anything. Without it, a
     * pointer that crossed an item and left again still had a timer running:
     * it fired after the pointer had gone, opened a card over nothing, and
     * the close that had been scheduled behind it took the card away again.
     * Passing over a row of cards flashed one open at every item — the exact
     * behaviour the wait exists to prevent, arriving a fifth of a second
     * late.
     */
    clear(openTimer);
    /*
     * A card already on its way out is left to finish.
     *
     * Without this, the pointer leaving whatever it moved to next would
     * clear the exit timer and start the whole close again — the card would
     * shrink, stop, and shrink once more. Leaving is not interruptible; only
     * coming back cancels it, and that goes through `cancelClose`.
     */
    queued.current = null;
    if (closing) {
      return;
    }
    clear(closeTimer);
    clear(exitTimer);
    closeTimer.current = window.setTimeout(beginExit, closeDelayMs);
  };

  const open = (key: string | number, at: Placement) => {
    if (!enabled) {
      return;
    }
    const next = { key, at };

    if (closing) {
      queued.current = next;
      return;
    }

    if (opened !== null) {
      if (opened.key === key) {
        // Back on the thing it is already open for: nothing to do but stay.
        cancelClose();
        return;
      }
      queued.current = next;
      beginExit();
      return;
    }

    cancelClose();
    clear(openTimer);
    openTimer.current = window.setTimeout(() => setOpened(next), openDelayMs);
  };

  useEffect(
    () => () => {
      clear(openTimer);
      clear(closeTimer);
      clear(exitTimer);
    },
    []
  );

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }
      clear(openTimer);
      if (opened !== null && !closing) {
        beginExit();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // `beginExit` is rebuilt every render; what decides whether it should run
    // is the state below, and the listener is re-attached when that changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, opened, closing]);

  return {
    active: opened?.at ?? null,
    activeKey: opened?.key ?? null,
    closing,
    open,
    scheduleClose,
    cancelClose
  };
}

export default useHoverCard;
