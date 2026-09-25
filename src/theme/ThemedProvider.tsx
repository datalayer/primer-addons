/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
