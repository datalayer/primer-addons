/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { type ColorMode } from './DatalayerBrandThemeProvider';
import { systemFontStack } from './fontStacks';
import { themeConfigs, type ThemeVariant } from './themeRegistry';

/** A valid CSS custom-property name. */
export type CssVariableName = `--${string}`;

/**
 * A JSON-safe CSS-variable map.
 *
 * Theme values retain Primer's canonical functional and component token names
 * (`--bgColor-*`, `--fgColor-*`, `--button-*`, and so on), allowing consumers
 * to use the map without depending on React, styled-components, or Primer.
 */
export type CssVariableMap = Record<CssVariableName, string>;

/** A portable theme with explicit light and dark CSS-variable modes. */
export interface PortableTheme {
  id: ThemeVariant;
  label: string;
  description: string;
  defaultColorMode: ColorMode;
  modes: {
    light: CssVariableMap;
    dark: CssVariableMap;
  };
}

function cssVariables(styles: object): CssVariableMap {
  const variables = Object.fromEntries(
    Object.entries(styles)
      .filter(
        ([name, value]) =>
          name.startsWith('--') && value !== undefined && value !== null,
      )
      .map(([name, value]) => [name, String(value)]),
  ) as CssVariableMap;
  const fontFamily =
    variables['--fontStack-sansSerif'] ??
    (styles as { fontFamily?: string }).fontFamily ??
    systemFontStack;
  return {
    '--fontStack-sansSerif': fontFamily,
    '--fontStack-sansSerifDisplay': fontFamily,
    '--fontStack-system': fontFamily,
    ...variables,
  };
}

/**
 * Export a Primer Addons theme as a framework-neutral, JSON-safe token map.
 *
 * Framework adapters should consume these canonical CSS variables directly
 * instead of translating them into framework-specific color names.
 */
export function exportPortableTheme(variant: ThemeVariant): PortableTheme {
  const config = themeConfigs[variant];
  return {
    id: variant,
    label: config.label,
    description: config.description,
    defaultColorMode: config.defaultColorMode,
    modes: {
      light: cssVariables(config.themeStyles.light),
      dark: cssVariables(config.themeStyles.dark),
    },
  };
}

/** Serialize a trusted portable map for a CSS declaration block. */
export function cssVariableDeclarations(tokens: CssVariableMap): string {
  return Object.entries(tokens)
    .map(([name, value]) => `${name}:${value}`)
    .join(';');
}
