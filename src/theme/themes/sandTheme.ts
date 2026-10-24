/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The sand theme for Primer React: its styles, from `./sandThemeStyles`,
 * and the Primer theme object. Theming is done through CSS custom
 * properties, so the object is Primer's unmodified default, kept for
 * `<ThemeProvider theme={…}>`. Code that needs the tokens without Primer
 * React (a native app) imports the styles module instead.
 */

import { theme as primerTheme } from '@primer/react';

export * from './sandThemeStyles';

/** The Primer theme object: Primer's default. */
export const sandTheme = primerTheme;

export default sandTheme;
