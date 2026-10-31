/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The Metal theme for Primer React: its styles, from `./metalThemeStyles`, and
 * the Primer theme object, whose weights are Metal's two.
 */

import { theme as primerTheme } from '@primer/react';
import { metalFontWeights } from './metalThemeStyles';

export * from './metalThemeStyles';

export const metalTheme = {
  ...primerTheme,
  fontWeights: {
    light: metalFontWeights.regular,
    normal: metalFontWeights.regular,
    semibold: metalFontWeights.medium,
    bold: metalFontWeights.medium,
  },
};

export default metalTheme;
