/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

export { datalayerColors } from './datalayerColors';
export { spatialColors } from './spatialColors';
export { lovelyColors } from './lovelyColors';
export { matrixColors } from './matrixColors';
export { earthColors } from './earthColors';
export {
  indicatorColors,
  defaultIndicatorColors,
  type IndicatorColors,
} from './indicatorColors';

import type { ThemeVariant } from '../themeRegistry';
import { datalayerColors } from './datalayerColors';
import { spatialColors } from './spatialColors';
import { lovelyColors } from './lovelyColors';
import { matrixColors } from './matrixColors';
import { earthColors } from './earthColors';

/**
 * Themed color palettes — maps each `ThemeVariant` to its corresponding
 * color object so consumers can pick the right palette at runtime.
 *
 * Usage:
 * ```ts
 * import { themedColors } from '@datalayer/primer-addons/lib/theme';
 * const colors = themedColors[themeVariant]; // Record<string, string>
 * ```
 */
export const themedColors: Record<ThemeVariant, Record<string, string>> = {
  datalayer: datalayerColors,
  spatial: spatialColors,
  lovely: lovelyColors,
  matrix: matrixColors,
  earth: earthColors,
};
