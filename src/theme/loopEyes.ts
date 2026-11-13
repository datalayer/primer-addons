/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The eyes of L👀P, as geometry (`plans/STUDIO.md`, N-02).
 *
 * The name is displayed with two eyes where its two O's are. They are drawn,
 * not typed: the emoji is a different picture on every platform, is missing
 * on some, and is read aloud as "eyes". Two ovals and two pupils, in the
 * colour of the text around them, look the same everywhere — the web's SVG
 * and the mobile app's native views draw this same geometry.
 *
 * An eye is about as wide and as tall as a capital O of the face beside it,
 * so that the two of them read as the O's they stand for.
 *
 * Pure: nothing here renders.
 */

/** The box the two eyes are drawn in. */
export const EYES_VIEW = { width: 52, height: 32 } as const;

/** Where the eyes look: a point from -1 to 1 each way, right and down positive. */
export type Gaze = { x: number; y: number };

/** The ways of looking that have a name. */
export const GAZES = {
  /** As the emoji does: to the left, a little down. What the logotype shows. */
  aside: { x: -0.7, y: 0.25 },
  ahead: { x: 0, y: 0 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
} as const satisfies Record<string, Gaze>;

export type GazeName = keyof typeof GAZES;

export type Ellipse = { cx: number; cy: number; rx: number; ry: number };
export type Circle = { cx: number; cy: number; r: number };

/** The outline of each eye. */
const EYE: Pick<Ellipse, 'rx' | 'ry'> = { rx: 10.2, ry: 13.6 };
const CENTRES = [13, 39];
const MIDDLE = EYES_VIEW.height / 2;

/** The stroke of an eye's outline: about the stem of a bold letter at this size. */
export const EYE_STROKE = 4;

const PUPIL_RADIUS = 5.2;

/** How far a pupil may leave the centre of its eye and stay inside it. */
const REACH = {
  x: EYE.rx - EYE_STROKE / 2 - PUPIL_RADIUS - 0.5,
  y: EYE.ry - EYE_STROKE / 2 - PUPIL_RADIUS - 0.5,
};

const clamp = (value: number): number =>
  Math.max(-1, Math.min(1, Number.isFinite(value) ? value : 0));

const round = (value: number): number => Math.round(value * 100) / 100;

/** A gaze no longer than 1: a look to a corner does not leave the eye. */
export function boundedGaze(gaze: Gaze): Gaze {
  const x = clamp(gaze.x);
  const y = clamp(gaze.y);
  const length = Math.hypot(x, y);
  return length > 1 ? { x: x / length, y: y / length } : { x, y };
}

/** The two eyes and their pupils, looking somewhere. */
export function eyesGeometry(gaze: Gaze | GazeName = 'aside'): {
  eyes: [Ellipse, Ellipse];
  pupils: [Circle, Circle];
} {
  const looking = boundedGaze(typeof gaze === 'string' ? GAZES[gaze] : gaze);
  const eye = (cx: number): Ellipse => ({ cx, cy: MIDDLE, ...EYE });
  const pupil = (cx: number): Circle => ({
    cx: round(cx + looking.x * REACH.x),
    cy: round(MIDDLE + looking.y * REACH.y),
    r: PUPIL_RADIUS,
  });
  return {
    eyes: [eye(CENTRES[0]), eye(CENTRES[1])],
    pupils: [pupil(CENTRES[0]), pupil(CENTRES[1])],
  };
}

/**
 * Where the eyes look when something is at a point: the gaze towards it from
 * the middle of the eyes, full when it is `far` away or more.
 */
export function gazeTowards(
  from: { x: number; y: number },
  to: { x: number; y: number },
  far = 160,
): Gaze {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.hypot(dx, dy);
  if (distance === 0 || !Number.isFinite(distance) || far <= 0) {
    return GAZES.ahead;
  }
  const strength = Math.min(1, distance / far);
  return boundedGaze({
    x: (dx / distance) * strength,
    y: (dy / distance) * strength,
  });
}
