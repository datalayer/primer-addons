/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The large card: everything about one thing, over the page.
 *
 * Not a route: the reader asked for more about a card on a shelf, not to go
 * somewhere. Closing it — the close button, a press on the veil, Escape —
 * leaves them where they were, which is the difference between browsing and
 * navigating.
 *
 * Its own element rather than Primer's `Dialog`, because a picture runs to
 * the edges and under the close button, which a dialog with a header cannot
 * do. Rendered into `document.body` through a portal: a `transform` on any
 * ancestor (an entrance animation's `both` fill-mode is enough) makes
 * `position: fixed` fix to that ancestor rather than to the viewport.
 *
 * It closes itself before it tells anybody: the exit plays, and only then
 * does `onClose` run — unmounting on the click would be a disappearance, not
 * a close. Drawn by the theme: a `Card` with the theme's corner (square to
 * the screen on a narrow one, where it is the page), shadow and ground, on
 * Primer's overlay backdrop.
 *
 * @module components/hover-card/HoverCardDetails
 */

import type { JSX, MouseEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from '@primer/react';
import { XIcon } from '@primer/octicons-react';
import { Box } from '../box/Box';
import { Card } from '../card/Card';
import { HOVER_CARD_MOTION_MS } from './useHoverCard';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export type HoverCardDetailsProps = {
  /** What the dialog is called, for assistive technology. */
  label: string;
  /** Called once the exit has played. */
  onClose: () => void;
  /** Its width, in pixels; it never exceeds the screen's. 880 by default. */
  width?: number;
  /** What the close button is called. */
  closeLabel?: string;
  children: ReactNode;
};

export function HoverCardDetails({
  label,
  onClose,
  width = 880,
  closeLabel = 'Close',
  children,
}: HoverCardDetailsProps): JSX.Element | null {
  const reduced = usePrefersReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const dismiss = () => {
    if (leaving) {
      return;
    }
    if (reduced) {
      onClose();
      return;
    }
    setLeaving(true);
    window.setTimeout(onClose, HOVER_CARD_MOTION_MS);
  };

  // Escape closes it, as it would any overlay.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dismiss();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <Box
      role="presentation"
      onClick={dismiss}
      position="fixed"
      inset={0}
      zIndex={1000}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      overflowY="auto"
      p={[0, 3, 5]}
      background="var(--overlay-backdrop-bgColor)"
      animation={reduced
        ? undefined
        : `${leaving ? 'dlaHoverCardVeilOut' : 'dlaHoverCardVeilIn'} ${HOVER_CARD_MOTION_MS}ms ease-out both`}
      sx={{
        '@keyframes dlaHoverCardVeilIn': { from: { opacity: 0 }, to: { opacity: 1 } },
        '@keyframes dlaHoverCardVeilOut': { from: { opacity: 1 }, to: { opacity: 0 } },
      }}
    >
      <Card
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(event: MouseEvent) => event.stopPropagation()}
        shadow="extraLarge"
        width={width}
        maxWidth="100%"
        borderRadius={[0, 'card']}
        overflow="hidden"
        position="relative"
        display="block"
        // Rises into place and sinks back out, at the hover card's speed: the
        // third size arrives the way the second one did.
        animation={reduced
          ? undefined
          : `${leaving ? 'dlaHoverCardPanelOut' : 'dlaHoverCardPanelIn'} ${HOVER_CARD_MOTION_MS}ms ease-out both`}
        sx={{
          '@keyframes dlaHoverCardPanelIn': {
            from: { transform: 'translateY(12px) scale(0.97)', opacity: 0 },
            to: { transform: 'translateY(0) scale(1)', opacity: 1 },
          },
          '@keyframes dlaHoverCardPanelOut': {
            from: { transform: 'translateY(0) scale(1)', opacity: 1 },
            to: { transform: 'translateY(12px) scale(0.97)', opacity: 0 },
          },
        }}
      >
        <IconButton
          icon={XIcon}
          aria-label={closeLabel}
          onClick={dismiss}
          sx={{
            position: 'absolute',
            top: 3,
            right: 3,
            zIndex: 2,
            borderRadius: '50%',
            bg: 'canvas.default',
          }}
        />
        {children}
      </Card>
    </Box>,
    document.body,
  );
}

export default HoverCardDetails;
