/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { SVGProps } from 'react';
import { datalayerColors } from '../../theme';

export interface DatalayerTextProps extends Omit<SVGProps<SVGGElement>, 'ref'> {
  /** Colour for the "LAYER" part of the wordmark. */
  primaryColor?: string;
  /** Colour for the "DATA" part of the wordmark (gray in the original brand logo). */
  secondaryColor?: string;
  /** Multiplies the base wordmark size. 1.0 keeps current dimensions. */
  sizeMultiplier?: number;
  /** X translation in the parent SVG coordinate system. */
  x?: number;
  /** Y translation in the parent SVG coordinate system. */
  y?: number;
}

/**
 * Official Datalayer wordmark outlines (BebasNeue converted to paths).
 *
 * Colour mapping matches the original brand logo SVG:
 *   - "DATA"  = secondaryColor (gray in the original)
 *   - "LAYER" = primaryColor   (green accent in the original)
 */
export const DatalayerText = ({
  primaryColor = datalayerColors.greenAccent,
  secondaryColor = datalayerColors.gray,
  sizeMultiplier = 1,
  x = 20,
  y = -190.15,
  ...groupProps
}: DatalayerTextProps): JSX.Element => {
  const baseScale = 0.7;
  const scale = baseScale * sizeMultiplier;

  // Keep the wordmark anchored when scaling so larger multipliers do not
  // move the paths out of the parent SVG viewBox.
  const anchorX = 17.35761;
  const anchorY = 289.499065;
  const translateX = x + anchorX * (baseScale - scale);
  const translateY = y + anchorY * (baseScale - scale);

  return (
    <g
      transform={`matrix(${scale},0,0,${scale},${translateX},${translateY})`}
      {...groupProps}
    >
      <path
        d="m 17.35761,297 h 3.729038 c 2.357437,0 3.514725,-1.30731 3.514725,-3.70761 v -7.58666 c 0,-2.4003 -1.157288,-3.7076 -3.514725,-3.7076 H 17.35761 Z m 3.686175,-12.85875 c 0.750094,0 1.20015,0.38576 1.20015,1.45733 v 7.80097 c 0,1.07156 -0.450056,1.45733 -1.20015,1.45733 h -1.328737 v -10.71563 z"
        fill={secondaryColor}
      />
      <path
        d="M 31.29328,281.99813 H 27.842849 L 25.442549,297 h 2.164556 l 0.407194,-2.72177 h 2.893219 L 31.314711,297 h 2.378869 z m -1.864519,2.65747 h 0.04286 l 1.114425,7.58666 h -2.271713 z"
        fill={secondaryColor}
      />
      <path
        d="m 33.2894,284.14125 h 2.464594 V 297 h 2.357438 v -12.85875 h 2.464593 v -2.14312 H 33.2894 Z"
        fill={secondaryColor}
      />
      <path
        d="M 46.027265,281.99813 H 42.576834 L 40.176534,297 h 2.164556 l 0.407194,-2.72177 h 2.893219 L 46.048696,297 h 2.378869 z m -1.864519,2.65747 h 0.04286 l 1.114425,7.58666 h -2.271713 z"
        fill={secondaryColor}
      />
      <path
        d="m 51.175594,297 h 6.236494 v -2.14312 h -3.879056 v -12.85875 h -2.357438 z"
        fill={primaryColor}
      />
      <path
        d="M 63.688095,281.99813 H 60.237664 L 57.837364,297 h 2.164556 l 0.407194,-2.72177 h 2.893219 L 63.709526,297 h 2.378869 z m -1.864519,2.65747 h 0.04286 l 1.114425,7.58666 h -2.271713 z"
        fill={primaryColor}
      />
      <path
        d="m 68.326286,297 h 2.357438 v -4.97205 l 2.978944,-10.02982 h -2.250282 l -1.778793,6.83656 h -0.04286 l -1.778794,-6.83656 h -2.464593 l 2.978943,10.02982 z"
        fill={primaryColor}
      />
      <path
        d="m 76.973461,284.14125 h 4.071938 v -2.14312 H 74.616024 V 297 h 6.429375 v -2.14312 h -4.071938 v -4.39341 h 3.236119 v -2.14313 h -3.236119 z"
        fill={primaryColor}
      />
      <path
        d="m 89.814797,297 c -0.235744,-0.55721 -0.257175,-1.09299 -0.257175,-1.82166 v -2.31457 c 0,-1.56448 -0.385763,-2.67891 -1.564481,-3.17183 v -0.0429 c 1.050131,-0.49292 1.543049,-1.47875 1.543049,-3.0218 v -1.17872 c 0,-2.31458 -1.050131,-3.45043 -3.493293,-3.45043 H 82.485309 V 297 h 2.357438 v -6.10791 h 0.814387 c 1.071563,0 1.54305,0.51435 1.54305,1.90739 v 2.35743 c 0,1.22158 0.08573,1.45733 0.214313,1.84309 z m -3.836194,-12.85875 c 0.835819,0 1.20015,0.47149 1.20015,1.54305 v 1.47876 c 0,1.20015 -0.535781,1.58591 -1.414462,1.58591 h -0.921544 v -4.60772 z"
        fill={primaryColor}
      />
    </g>
  );
};

export default DatalayerText;
