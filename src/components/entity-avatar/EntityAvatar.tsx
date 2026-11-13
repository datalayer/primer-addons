/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * `EntityAvatar`: the face of a person, an agent, an app or a space, drawn
 * by the theme.
 *
 * One of three things, in this order:
 *
 * - an **image** (`src`), cropped to the shape — and, if it fails to load,
 *   what would have been drawn without it;
 * - a **glyph** (`children`): an emoji's drawing, an icon — whatever the
 *   caller draws, on the avatar's ground;
 * - the **initials** of `name`.
 *
 * Its ground is the theme's: a tone's wash with the tone's foreground
 * (`ground="subtle"`, the default), the tone's solid colour with
 * `fg.onEmphasis` (`ground="emphasis"`), the page's own surface with a
 * hairline (`ground="canvas"`), or the entity's own colour (`color`), as a
 * profile's cards give one, with `fg.onEmphasis`.
 *
 * Its shape is the theme's too: a `circle` for a person, `rounded` for
 * anything else — the theme's medium corner (rounder in `loop`), never more
 * than a little over a quarter of the avatar, so a small one stays a square
 * with soft corners rather than turning into a circle.
 *
 * Not Primer's `Avatar` (an image only, in a circle or a fixed square).
 */

import { useState, type CSSProperties, type ElementType, type HTMLAttributes, type JSX, type ReactNode } from 'react';
import { Box, type BoxProps, type BoxPseudoProps, type BoxStyleProps } from '../box/Box';

export type EntityAvatarShape = 'circle' | 'rounded';

export type EntityAvatarTone = 'accent' | 'success' | 'attention' | 'severe' | 'danger' | 'done' | 'sponsors' | 'neutral';

export type EntityAvatarGround = 'subtle' | 'emphasis' | 'canvas';

/**
 * `Box`'s props but `color` and `children`, which are the avatar's own.
 * Spelled out rather than `Omit<BoxProps, …>`: `BoxProps` has an index
 * signature, and `Omit` over one drops every named key.
 */
type EntityAvatarBoxProps = Omit<BoxStyleProps, 'color'> &
  BoxPseudoProps &
  Omit<HTMLAttributes<HTMLElement>, keyof BoxStyleProps | 'as' | 'color' | 'children'> & {
    as?: ElementType;
    sx?: BoxProps['sx'];
    className?: string;
    style?: CSSProperties;
    [prop: string]: unknown;
  };

export type EntityAvatarProps = EntityAvatarBoxProps & {
  /** An image URL; it covers the avatar. */
  src?: string;
  /** What the avatar is of, for assistive technology; the name by default. */
  alt?: string;
  /** A glyph drawn on the ground: an emoji's drawing, an icon. */
  children?: ReactNode;
  /** The entity's name: its initials when there is neither image nor glyph. */
  name?: string;
  /** Its edge, in pixels. 32 by default. */
  size?: number;
  /** `circle` for a person, `rounded` (the theme's corner) for the rest. */
  shape?: EntityAvatarShape;
  /** The tone of its ground. `accent` by default. */
  tone?: EntityAvatarTone;
  /** How the ground is drawn: the tone's wash, its solid colour, or the page's. */
  ground?: EntityAvatarGround;
  /**
   * The entity's own colour, as the theme gives it — a palette colour, a
   * token — drawn solid under `fg.onEmphasis`; it overrides `tone`.
   */
  color?: string;
  /** A hairline just outside the edge, for an avatar on a ground like its own. */
  ring?: boolean;
};

/** The theme's corner for an avatar that is not a person's. */
export const ENTITY_AVATAR_RADIUS = 'min(var(--borderRadius-medium), 28%)';

/** Up to two letters: the first of the first two words. */
export const initialsOf = (name?: string): string =>
  (name ?? '')
    .trim()
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]!.toUpperCase())
    .join('');

const wash = (tone: EntityAvatarTone) =>
  tone === 'neutral'
    ? { bg: 'neutral.muted', color: 'fg.default' }
    : { bg: `${tone}.subtle`, color: `${tone}.fg` };

const solid = (tone: EntityAvatarTone) => ({
  bg: tone === 'neutral' ? 'neutral.emphasis' : `${tone}.emphasis`,
  color: 'fg.onEmphasis',
});

export function EntityAvatar({
  src,
  alt,
  children,
  name,
  size = 32,
  shape = 'circle',
  tone = 'accent',
  ground = 'subtle',
  color,
  ring = false,
  ...rest
}: EntityAvatarProps): JSX.Element {
  const [failed, setFailed] = useState(false);
  const label = alt ?? name;
  const paint = color
    ? { bg: color, color: 'fg.onEmphasis' }
    : ground === 'emphasis'
      ? solid(tone)
      : ground === 'canvas'
        ? { bg: 'canvas.default', color: 'fg.default', border: '1px solid', borderColor: 'border.default' }
        : wash(tone);
  const image = src && !failed;
  return (
    <Box
      role="img"
      aria-label={label}
      data-entity-avatar={shape}
      width={size}
      height={size}
      minWidth={size}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      borderRadius={shape === 'circle' ? '50%' : ENTITY_AVATAR_RADIUS}
      fontSize={`${Math.max(9, Math.round(size * 0.4))}px`}
      fontWeight="semibold"
      lineHeight="1"
      userSelect="none"
      boxShadow={ring ? '0 0 0 1px var(--borderColor-default)' : undefined}
      {...(image ? { bg: 'canvas.subtle' } : paint)}
      {...rest}
    >
      {image ? (
        <Box
          as="img"
          src={src}
          alt=""
          width={size}
          height={size}
          objectFit="cover"
          display="block"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        children ?? initialsOf(name)
      )}
    </Box>
  );
}

export default EntityAvatar;
