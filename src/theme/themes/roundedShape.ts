/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The rounded shape: Agent's corners, which Metal, Sand, Ivory and Sun share.
 *
 * Primer's own radii made rounder (a list item, a card, a menu take them),
 * the `--agent-radius-*` properties an application is drawn with, and the
 * theme shape that says so: a pill for every single-line control (a button,
 * an icon button, a text input, a select, a segmented control), soft cards
 * and overlays, round bubbles, a table with the corners of a list item.
 * `primerComponentsCss` draws the controls and the table from it.
 *
 * A theme that is rounded passes `roundedShape` (with its own shadow, motion
 * and the rest beside it) and sets `roundedRadiusVars` in both modes.
 */

import type { ThemeShape } from '../css/createThemeCSSVars';

/** The radii as custom properties, the same in both modes. */
export const roundedRadiusVars: Record<string, string> = {
  '--borderRadius-small': '10px',
  '--borderRadius-medium': '14px',
  '--borderRadius-large': '20px',
  '--borderRadius-default': '14px',
  '--agent-radius-control': '999px',
  '--agent-radius-card': '20px',
  '--agent-radius-bubble': '22px',
  '--agent-radius-frame': '28px',
};

/** The radii of the theme shape (`--theme-radius-*`). */
export const roundedShape: Pick<
  ThemeShape,
  'radiusControl' | 'radiusTable' | 'radiusOverlay' | 'radiusCard' | 'radiusBubble' | 'radiusFrame'
> = {
  radiusControl: roundedRadiusVars['--agent-radius-control'],
  radiusTable: roundedRadiusVars['--borderRadius-medium'],
  radiusOverlay: roundedRadiusVars['--agent-radius-card'],
  radiusCard: roundedRadiusVars['--agent-radius-card'],
  radiusBubble: roundedRadiusVars['--agent-radius-bubble'],
  radiusFrame: roundedRadiusVars['--agent-radius-frame'],
};
