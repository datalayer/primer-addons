/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The themes without Primer React, the DOM or React: what a native app
 * (Datalayer Mobile) or a build script imports, as
 * `@datalayer/primer-addons/lib/theme/portable`.
 *
 * Everything here is data and pure functions. A test in `__tests__` loads
 * this module in a bare environment and fails if `@primer/react`,
 * `styled-components` or a browser global is reached.
 */

export * from './colors';
export * from './indicators';
export * from './fontStacks';
export * from './loopEyes';
export * from './portableTheme';
export * from './themeTokens';
export {
  type ThemeColorDefs,
  type ThemeStyles,
  type ThemeShape,
  DEFAULT_THEME_SHAPE,
  colorDefsToCSS,
  shapeVars,
  buildThemeStyles,
} from './css/createThemeCSSVars';
