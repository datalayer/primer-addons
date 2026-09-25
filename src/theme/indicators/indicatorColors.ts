/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Indicator Color Palette — Semantic status colours for indicators,
 * badges, progress rings, and status dots.
 *
 * Each theme provides its own `IndicatorColors` so consumers pick up
 * the correct tones automatically. The palette contains both
 * **status colours** (success, warning, danger …) and
 * **domain-specific** colours (reservation, credits, invite …).
 *
 * Usage:
 * ```ts
 * import { indicatorColors } from '@datalayer/primer-addons/lib/theme';
 * const colors = indicatorColors.datalayer; // or .spatial, .lovely, .matrix
 * <Box sx={{ bg: colors.success }} />
 * ```
 */

/* ── Shape ─────────────────────────────────────────────── */

export interface IndicatorColors {
  /* ── Generic semantic status ── */

  /** Neutral / default — nothing notable */
  neutral: string;
  /** Muted — defined but inactive */
  muted: string;
  /** In-progress / loading */
  pending: string;
  /** Warning / attention-needed  */
  warning: string;
  /** Error / failure */
  danger: string;
  /** Healthy / success */
  success: string;
  /** Informational / accent */
  info: string;

  /* ── Domain-specific (migrated from Palette.ts) ── */

  /** Reservation indicator (e.g. usage rings) */
  reservation: string;
  /** Credits indicator (e.g. usage rings) */
  credits: string;
  /** Accepted / joined invite */
  inviteJoined: string;
  /** Pending invite */
  invitePending: string;
}

/* ── Per-theme palettes ────────────────────────────────── */

const datalayer: IndicatorColors = {
  neutral: '#656D76',
  muted: '#8b949e',
  pending: '#d29922',
  warning: '#d29922',
  danger: '#d1242f',
  success: '#16A085',
  info: '#0969da',

  reservation: '#656D76',
  credits: '#16A085',
  inviteJoined: '#0969da',
  invitePending: '#cfd3d7',
};

const spatial: IndicatorColors = {
  neutral: '#8892B0',
  muted: '#6B7394',
  pending: '#E2B340',
  warning: '#E2B340',
  danger: '#FF5252',
  success: '#4F46E5',
  info: '#448AFF',

  reservation: '#8892B0',
  credits: '#4F46E5',
  inviteJoined: '#448AFF',
  invitePending: '#6B7394',
};

const lovely: IndicatorColors = {
  neutral: '#9D7A8F',
  muted: '#C9A2B8',
  pending: '#FFD740',
  warning: '#FFD740',
  danger: '#FF1744',
  success: '#DB2777',
  info: '#536DFE',

  reservation: '#9D7A8F',
  credits: '#DB2777',
  inviteJoined: '#536DFE',
  invitePending: '#C9A2B8',
};

const matrix: IndicatorColors = {
  neutral: '#5A6E3A',
  muted: '#7A9A50',
  pending: '#FFD600',
  warning: '#FFD600',
  danger: '#FF3D00',
  success: '#00C853',
  info: '#00E676',

  reservation: '#5A6E3A',
  credits: '#00C853',
  inviteJoined: '#00E676',
  invitePending: '#7A9A50',
};

/* ── Public map ────────────────────────────────────────── */

export const indicatorColors = {
  datalayer,
  spatial,
  lovely,
  matrix,
} as const;

/**
 * Convenience: default indicator palette (Datalayer theme).
 */
export const defaultIndicatorColors: IndicatorColors = datalayer;
