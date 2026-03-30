/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * ThemedProvider – Drop-in theme provider that reads theme / color-mode
 * from a Zustand `ThemeState` store and forwards them to
 * `DatalayerThemeProvider`.
 *
 * Consumers pass the `useStore` hook as a prop, so the provider is
 * completely decoupled from any specific application's store instance.
 *
 * @module theme/ThemedProvider
 */

import React from 'react';
import {
  DatalayerThemeProvider,
  type IDatalayerThemeProviderProps,
} from './DatalayerThemeProvider';
import { themeConfigs } from './themeRegistry';
import type { ThemeState } from './useThemeStore';
import type { UseBoundStore, StoreApi } from 'zustand';

export interface ThemedProviderProps
  extends Omit<IDatalayerThemeProviderProps, 'ref'> {
  /** A Zustand store hook created via `createThemeStore()`. */
  useStore: UseBoundStore<StoreApi<ThemeState>>;
}

/**
 * Drop-in replacement for `<DatalayerThemeProvider>`.
 * Reads theme / colorMode from the supplied store and forwards them to
 * the real provider.  Any explicit props (colorMode, theme, themeStyles)
 * are still respected as overrides.
 */
export const ThemedProvider: React.FC<
  React.PropsWithChildren<ThemedProviderProps>
> = ({ children, useStore, ...rest }) => {
  const { colorMode, theme: themeVariant } = useStore();
  const cfg = themeConfigs[themeVariant];

  return (
    <DatalayerThemeProvider
      colorMode={rest.colorMode ?? colorMode}
      theme={rest.theme ?? cfg.primerTheme}
      themeStyles={rest.themeStyles ?? cfg.themeStyles}
      {...rest}
    >
      {children}
    </DatalayerThemeProvider>
  );
};
