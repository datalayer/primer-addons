/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The spatial theme for Primer React: its styles, from `./spatialThemeStyles`,
 * and the Primer theme object. Theming is done through CSS custom
 * properties, so the object is Primer's unmodified default, kept for
 * `<ThemeProvider theme={…}>`. Code that needs the tokens without Primer
 * React (a native app) imports the styles module instead.
 */

import { theme as primerTheme } from '@primer/react';

export * from './spatialThemeStyles';

/** The Primer theme object: Primer's default. */
export const spatialTheme = primerTheme;

export default spatialTheme;
