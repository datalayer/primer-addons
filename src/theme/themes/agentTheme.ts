/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The Agent theme for Primer React: its styles, from `./agentThemeStyles`, and
 * the Primer theme object. Code that needs the tokens without Primer React
 * (a native app) imports the styles module instead.
 */

import { theme as primerTheme } from '@primer/react';
import { agentFontWeights } from './agentThemeStyles';

export * from './agentThemeStyles';

/**
 * The Primer theme object.
 *
 * Theming is done through CSS custom properties (see `agentThemeStyles`), but
 * `sx` reads its weights from this object: Primer's `semibold` is 500 and its
 * `light` 300, so `fontWeight: 'semibold'` drew a third weight beside the
 * theme's two. Here the four names are the two weights:
 * `light` and `normal` the regular, `semibold` and `bold` the semibold.
 * Everything else is Primer's default.
 */
export const agentTheme = {
  ...primerTheme,
  fontWeights: {
    light: agentFontWeights.regular,
    normal: agentFontWeights.regular,
    semibold: agentFontWeights.semibold,
    bold: agentFontWeights.semibold,
  },
};

export default agentTheme;
