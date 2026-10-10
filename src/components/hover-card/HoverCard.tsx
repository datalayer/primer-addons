/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * A card in three sizes, the way a shelf of films is read.
 *
 * A shelf is scanned at a glance, one thing catches the eye, and the reader
 * wants a little more before committing — then, sometimes, a lot more:
 *
 * - the **small card** in the page is the caller's own, wrapped in a
 *   `HoverCardAnchor`;
 * - **hovering** it grows this card out of it, covering it (`HoverCardLayer`
 *   places it, `useHoverCard` times it): the same picture larger, what to do
 *   with it, the whole title and description;
 * - its **chevron** opens the large one, `HoverCardDetails`, over the page.
 *
 * Drawn by the theme: it is a `Card`, so its corner is the theme's card
 * corner (rounder in `loop`, with nothing said here), its ground the
 * overlay's, its hairline and shadow the theme's.
 *
 * @module components/hover-card/HoverCard
 */

import type { JSX, ReactNode } from 'react';
import { IconButton, Text } from '@primer/react';
import { ChevronDownIcon } from '@primer/octicons-react';
import { Box } from '../box/Box';
import { Card } from '../card/Card';
import { HOVER_CARD_MOTION_MS } from './useHoverCard';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * How much bigger than its anchor the hover card is.
 *
 * Enough that the growth is visible and the artwork gets room; not so much
 * that it stops reading as the same object enlarged.
 */
export const HOVER_CARD_SCALE = 1.45;

export type HoverCardProps = {
  /** The width of what this grew out of, so the card can be larger. */
  anchorWidth: number;
  /** How much larger; {@link HOVER_CARD_SCALE} by default. */
  scale?: number;
  /** Whether it is being taken away, so it plays the entrance backwards. */
  closing?: boolean;
  /**
   * The picture at the top, drawn at the height given — half the card's
   * width. A function, because only the card knows how wide it is.
   */
  picture?: (height: number) => ReactNode;
  /** The picture is a way in: what pressing it does. */
  onOpen?: () => void;
  /** What pressing the picture is called, for assistive technology. */
  openLabel?: string;
  /** What to do with the thing: buttons, on the left of the chevron. */
  actions?: ReactNode;
  /**
   * Open the large card. Without it there is no third size, and no chevron
   * offering one.
   */
  onExpand?: () => void;
  /** What the chevron is called, for assistive technology. */
  expandLabel?: string;
  /** Its name, on two lines at most. */
  title: ReactNode;
  /** What it is and whose: a line of labels. */
  meta?: ReactNode;
  /** The whole description, which the small card had to cut. */
  description?: ReactNode;
  /** Anything after it: tags, say. */
  children?: ReactNode;
};

export function HoverCard({
  anchorWidth,
  scale = HOVER_CARD_SCALE,
  closing = false,
  picture,
  onOpen,
  openLabel,
  actions,
  onExpand,
  expandLabel = 'More',
  title,
  meta,
  description,
  children,
}: HoverCardProps): JSX.Element {
  const reduced = usePrefersReducedMotion();
  const width = Math.round(anchorWidth * scale);
  const pictureHeight = Math.round(width * 0.5);
  const from = (anchorWidth / width).toFixed(3);
  return (
    <Card
      border
      shadow="extraLarge"
      bg="canvas.overlay"
      width={width}
      maxWidth="92vw"
      overflow="hidden"
      textAlign="left"
      /*
       * Grown, not faded in. The card starts at the size of the one it
       * covers and settles at its own, which is what makes it read as the
       * same object rather than a second one arriving on top.
       */
      transformOrigin="center"
      animation={reduced
        ? undefined
        : `${closing ? 'dlaHoverCardShrink' : 'dlaHoverCardGrow'} ${HOVER_CARD_MOTION_MS}ms ease-out both`}
      sx={{
        '@keyframes dlaHoverCardGrow': {
          from: { transform: `scale(${from})`, opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 },
        },
        // The entrance backwards, at the same speed, ending on the card it
        // grew from rather than simply disappearing.
        '@keyframes dlaHoverCardShrink': {
          from: { transform: 'scale(1)', opacity: 1 },
          to: { transform: `scale(${from})`, opacity: 0 },
        },
      }}
    >
      {picture ? (
        onOpen ? (
          <Box
            all="unset"
            as="button"
            type="button"
            onClick={onOpen}
            aria-label={openLabel}
            display="block"
            width="100%"
            cursor="pointer"
            focusVisible={{ outline: '2px solid', outlineColor: 'accent.emphasis', outlineOffset: -2 }}
          >
            {picture(pictureHeight)}
          </Box>
        ) : (
          picture(pictureHeight)
        )
      ) : null}
      <Box p={3} display="grid" gap={2}>
        {actions || onExpand ? (
          <Box display="flex" alignItems="center" gap={2}>
            {actions}
            <Box flexGrow={1} />
            {/*
              The gesture that earns the third size, drawn as a control rather
              than as a bare glyph: a ring says it can be pressed, which an
              arrow on its own does not.
            */}
            {onExpand ? (
              <IconButton
                icon={ChevronDownIcon}
                aria-label={expandLabel}
                size="small"
                variant="invisible"
                sx={{
                  borderRadius: '50%',
                  border: '1px solid',
                  borderColor: 'border.default',
                  color: 'fg.muted',
                  '&:hover': { borderColor: 'fg.default', color: 'fg.default' },
                }}
                onClick={onExpand}
              />
            ) : null}
          </Box>
        ) : null}
        <Text
          sx={{
            fontWeight: 600,
            fontSize: 2,
            lineHeight: 1.25,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Text>
        {meta}
        {description ? (
          <Text sx={{ fontSize: 0, color: 'fg.muted', lineHeight: 1.5 }}>{description}</Text>
        ) : null}
        {children}
      </Box>
    </Card>
  );
}

export default HoverCard;
