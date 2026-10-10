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
 * - `variant` — the card's flavour: `default`, `subtle`, `inset`, or a
 *   tone (`accent`, `success`, `attention`, `danger`), each a ground and a
 *   hairline from the theme.
 * - `dashed` — a dashed hairline, for a placeholder or a "create new" card;
 *   `disabled` — quieter, no pointer, no hover;
 * - `accent` — a colour along the top edge, a token or the item's own;
 * - slots: `Card.Header`, `Card.Cover` (image, gradient or colour, a glyph,
 *   a top-right accessory), `Card.Image`, `Card.Content`, `Card.Footer`
 *   (the metadata line, over a hairline) and `Card.Actions`; the slots take
 *   `Box` props over their defaults.
 * - `selected` — the card that is chosen among others: an accent border on
 *   an accent wash. It says nothing to assistive technology by itself: the
 *   caller sets `aria-pressed` or `aria-selected`, as its role requires.
 */

import React from "react";
import { IconButton, Text } from "@primer/react";
import {
  Box,
  type BoxColorToken,
  type BoxProps,
  type BoxPseudoProps,
  type BoxRadiusToken,
  type BoxStyleProps,
} from "../box/Box";

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

/**
 * A card's flavour: its ground and, when it is bordered, its hairline.
 *
 * - `default` — the page's own surface, `canvas.default`;
 * - `subtle` — a quieter ground, `canvas.subtle`, for a card among cards
 *   or one inside a panel;
 * - `inset` — sunk into the page, `canvas.inset`, for code, logs, a prompt;
 * - `accent`, `success`, `attention`, `danger` — a note in that tone: the
 *   tone's wash with the tone's muted hairline.
 */
export type CardVariant = 'default' | 'subtle' | 'inset' | 'accent' | 'success' | 'attention' | 'danger';

const VARIANTS: Record<CardVariant, { bg: BoxColorToken; borderColor: BoxColorToken }> = {
  default: { bg: 'canvas.default', borderColor: 'border.default' },
  subtle: { bg: 'canvas.subtle', borderColor: 'border.default' },
  inset: { bg: 'canvas.inset', borderColor: 'border.default' },
  accent: { bg: 'accent.subtle', borderColor: 'accent.muted' },
  success: { bg: 'success.subtle', borderColor: 'success.muted' },
  attention: { bg: 'attention.subtle', borderColor: 'attention.muted' },
  danger: { bg: 'danger.subtle', borderColor: 'danger.muted' },
};

export type CardProps = CardBoxProps & {
  /**
   * The corner: a radius by name — Primer's (`small`, `medium`, `large`,
   * `full`) or the theme's shapes (`control`, `card`, `bubble`, `frame`) —
   * or an index of Primer's radii. The theme's `card` corner by default.
   */
  rounded?: BoxRadiusToken | number;
  /** The card's flavour, `default` by default; see {@link CardVariant}. */
  variant?: CardVariant;
  /** A hairline around the card, `border.default`. */
  border?: boolean;
  /** Primer's shadows by name; `none` for a card that lies flat. `small` by default. */
  shadow?: 'none' | 'small' | 'medium' | 'large' | 'extraLarge';
  /** A card that is clicked: hover and focus states, a pointer, a border. */
  interactive?: boolean;
  /** The chosen card among others: an accent border on an accent wash. */
  selected?: boolean;
  /** A dashed hairline: a placeholder, a drop zone, a "create new" card. */
  dashed?: boolean;
  /**
   * A card that cannot be used now: quieter, no pointer, no hover. With
   * `interactive`, it also sets `aria-disabled`.
   */
  disabled?: boolean;
  /**
   * A colour along the card's top edge: a theme token (`accent.emphasis`,
   * `success.emphasis`…) or any CSS colour the caller has from its theme,
   * such as an item's own colour.
   */
  accent?: BoxColorToken | (string & {});
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

/** A slot's props: the slot's own defaults, overridden by any `Box` prop. */
export type CardContentProps = CardBoxProps & {
  children: React.ReactNode;
}

/** The card's last line: metadata, chips, an owner, an action. */
export type CardFooterProps = CardBoxProps & {
  children: React.ReactNode;
}

/**
 * The card's cover, above its content: an image, or a gradient between two
 * colours, or a theme colour, with an optional glyph centred on it and an
 * accessory (a label, a menu) in its top-right corner.
 */
export type CardCoverProps = CardBoxProps & {
  /** The cover's height, in pixels. 110 by default. */
  height?: number;
  /** An image URL; it covers the area. */
  image?: string;
  /** A gradient between two colours, top left to bottom right. */
  gradient?: { from: string; to: string };
  /** The ground under (or instead of) the image or gradient. `neutral.emphasis` by default. */
  color?: BoxColorToken | (string & {});
  /** What sits in the top-right corner: a label, a menu. */
  accessory?: React.ReactNode;
  /** A glyph centred on the cover, drawn in `fg.onEmphasis`. */
  children?: React.ReactNode;
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

/** What `disabled` takes away: the pointer and the hover, at a lower voice. */
const DISABLED: BoxProps = {
  cursor: 'not-allowed',
  opacity: 0.6,
  hover: {},
};

export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Cover: React.FC<CardCoverProps>;
  Image: React.FC<CardImageProps>;
  Content: React.FC<CardContentProps>;
  Footer: React.FC<CardFooterProps>;
  Actions: React.FC<CardActionsProps>;
} = (props) => {
  const {
    rounded, border, shadow = 'small', variant = 'default', interactive, selected, dashed, disabled, accent,
    children, ...otherProps
  } = props;
  const outlined = border || interactive || selected || dashed;
  const flavour = VARIANTS[variant];
  return (
    <Box
      // A column, so the actions stand at the bottom however long the text
      // above them: cards side by side end on one line.
      display="flex"
      flexDirection="column"
      bg={selected ? 'accent.subtle' : flavour.bg}
      color="fg.default"
      borderRadius={rounded ?? CARD_RADIUS}
      boxShadow={SHADOWS[shadow]}
      {...(outlined ? {
        border: '1px solid',
        borderColor: selected ? 'accent.emphasis' : flavour.borderColor,
      } : undefined)}
      {...(dashed ? { borderStyle: 'dashed' } : undefined)}
      {...(accent ? { borderTop: '3px solid', borderTopColor: accent } : undefined)}
      {...(interactive ? INTERACTIVE : undefined)}
      {...(disabled ? DISABLED : undefined)}
      {...(interactive && disabled ? { 'aria-disabled': true } : undefined)}
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

Card.Cover = ({ height = 110, image, gradient, color = 'neutral.emphasis', accessory, children, ...rest }) => {
  return (
    <Box
      position="relative"
      width="100%"
      height={`${height}px`}
      flexShrink={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={color}
      backgroundImage={image
        ? `url(${image})`
        : gradient ? `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)` : undefined}
      backgroundSize="cover"
      backgroundPosition="center"
      color="fg.onEmphasis"
      fontSize={4}
      fontWeight="semibold"
      {...rest}
    >
      {children}
      {accessory && (
        <Box position="absolute" top={2} right={2} display="flex" alignItems="center" gap={1}>
          {accessory}
        </Box>
      )}
    </Box>
  );
}

Card.Content = ({children, ...rest}) => {
  return (
    <Box display="block" p={3} {...rest}>
      {children}
    </Box>
  );
}

Card.Footer = ({children, ...rest}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      flexWrap="wrap"
      mt="auto"
      px={3}
      py={2}
      borderTop="1px solid"
      borderColor="border.muted"
      {...rest}
    >
      {children}
    </Box>
  );
}

Card.Actions = ({ children }) => {
  return <Box display="block" p={3} mt="auto">
    {children}
  </Box>;
}
