/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * `Card`: a surface that follows the theme.
 *
 * It is this package's own `Box`, so every colour, shadow and corner is one
 * of the theme's variables: the ground is `canvas.default` (a card is never
 * the page showing through), the hairline `border.default`, the shadow one of
 * Primer's (`shadow.small`…, which each colour mode sets for itself — no
 * literal `rgba` that reads as a smudge on a dark page), and the corner the
 * theme's card corner unless `rounded` says otherwise.
 *
 * Every `Box` prop passes through and wins over the card's defaults (`bg`,
 * `p`, `as`, …), and `sx` wins over both, as it does on `Box`.
 *
 * - `interactive` — a card that is clicked: a pointer, a border that takes
 *   the accent and a lifted shadow on hover, a focus ring for the keyboard.
 *   It always has a border, so a card rendered `as="button"` shows the
 *   card's hairline rather than the browser's button border, and a button
 *   reads its text left to right in the page's font.
 * - `selected` — the card that is chosen among others: an accent border on
 *   an accent wash. It says nothing to assistive technology by itself: the
 *   caller sets `aria-pressed` or `aria-selected`, as its role requires.
 */

import React from "react";
import { IconButton, Text } from "@primer/react";
import { Box, type BoxProps, type BoxPseudoProps, type BoxStyleProps } from "../box/Box";

/**
 * `Box`'s props, but `border` is the card's switch rather than a CSS value.
 * Spelled out rather than `Omit<BoxProps, 'border'>`: `BoxProps` has an index
 * signature, and `Omit` over one drops every named key (`children` would be
 * `unknown`).
 */
type CardBoxProps = Omit<BoxStyleProps, 'border'> &
  BoxPseudoProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof BoxStyleProps | 'as'> & {
    as?: React.ElementType;
    sx?: BoxProps['sx'];
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    [prop: string]: unknown;
  };

export type CardProps = CardBoxProps & {
  rounded?: 'small' | 'medium' | 'large' | 'full' | number;
  /** A hairline around the card, `border.default`. */
  border?: boolean;
  /** Primer's shadows by name; `none` for a card that lies flat. `small` by default. */
  shadow?: 'none' | 'small' | 'medium' | 'large' | 'extraLarge';
  /** A card that is clicked: hover and focus states, a pointer, a border. */
  interactive?: boolean;
  /** The chosen card among others: an accent border on an accent wash. */
  selected?: boolean;
};

export type CardHeaderProps = {
  /**
   * The card's title. A node rather than a string, so a header can carry an
   * avatar, a label or a link beside its text — a card title is a place
   * callers reasonably want to compose.
   */
  title?: React.ReactNode;
  description?: string;
  leadingVisual?: React.ElementType;
  action?: React.ReactNode;
}

export type CardImageProps = {
  url?: string;
  image?: string;
  svg?: string;
  height: number;
}

export type CardContentProps = {
  children: React.ReactNode;
}

export type CardActionsProps = {
  children: React.ReactNode;
}

/**
 * The corners, read from the theme: each theme sets Primer's radii (loop's
 * are rounder), and a card left unsaid takes the theme's card corner.
 */
const CARD_RADIUS = 'card';

const SHADOWS = {
  none: 'none',
  small: 'shadow.small',
  medium: 'shadow.medium',
  large: 'shadow.large',
  extraLarge: 'shadow.extraLarge',
} as const;

/** What `interactive` adds: a pointer, the hover and focus states, a button reset. */
const INTERACTIVE: BoxProps = {
  cursor: 'pointer',
  textAlign: 'left',
  font: 'inherit',
  transition: 'border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease',
  hover: { borderColor: 'accent.emphasis', boxShadow: SHADOWS.medium },
  focusVisible: { outline: '2px solid', outlineColor: 'accent.emphasis', outlineOffset: '2px' },
  reducedMotion: { transition: 'none' },
};

export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Image: React.FC<CardImageProps>;
  Content: React.FC<CardContentProps>;
  Actions: React.FC<CardActionsProps>;
} = (props) => {
  const { rounded, border, shadow = 'small', interactive, selected, children, ...otherProps } = props;
  const outlined = border || interactive || selected;
  return (
    <Box
      // A column, so the actions stand at the bottom however long the text
      // above them: cards side by side end on one line.
      display="flex"
      flexDirection="column"
      bg={selected ? 'accent.subtle' : 'canvas.default'}
      color="fg.default"
      borderRadius={rounded ?? CARD_RADIUS}
      boxShadow={SHADOWS[shadow]}
      {...(outlined ? {
        border: '1px solid',
        borderColor: selected ? 'accent.emphasis' : 'border.default',
      } : undefined)}
      {...(interactive ? INTERACTIVE : undefined)}
      {...otherProps}
    >
      {children}
    </Box>
  );
};

Card.Header = (props) => {
  const { title, description, leadingVisual, action } = props;
  return <Box display="flex" alignItems="center" p={3}>
    {leadingVisual && <Box mr={3}>
      <IconButton size="medium" icon={leadingVisual} aria-label=""/>
    </Box>}
    <Box flexGrow={1}>
      <Text as="div" display="block">{title}</Text>
      <Text display="block" color="fg.muted">{description}</Text>
    </Box>
    {action && <Box>
      {action}
    </Box>}
  </Box>;
}

Card.Image = ({url, image, svg, height}) => {
  return (
    <Box
      display="block"
      width="100%"
      height={`${height}px`}
      backgroundImage={url ? `url(${url})` : undefined}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      objectFit="cover"
    >
    {image && <img src={image} style={{maxHeight: `${height}px`}} />}
    {svg && <img src={`data:image/svg+xml;utf8,${svg}`} style={{maxHeight: height}} />}
  </Box>
  );
}

Card.Content = ({children}) => {
  return (
    <Box display="block" p={3}>
      {children}
    </Box>
  );
}

Card.Actions = ({ children }) => {
  return <Box display="block" p={3} mt="auto">
    {children}
  </Box>;
}
