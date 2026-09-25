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

import { type CSSProperties, type ReactNode } from 'react';
import { ThemeProvider as PrimerBrandThemeProvider } from '@primer/react-brand';
import { useSystemColorMode } from './useSystemColorMode';
import type { BrandTheme } from './themes-brand/spatialBrandTheme';

export type ColorMode = 'light' | 'dark' | 'auto';

export interface IDatalayerBrandThemeProviderProps {
  /**
   * Color mode to use.
   * - `'light'` / `'dark'` — explicit override
   * - `'auto'` — follow the operating system preference (prefers-color-scheme)
   */
  colorMode?: ColorMode;
  /**
   * A brand theme object with per-mode CSS variable overrides.
   * Each key (`light` / `dark`) is a `CSSProperties` map whose entries
   * are `--brand-color-*` / `--brand-button-*` custom properties.
   *
   * When omitted, the default Primer Brand tokens are used unchanged.
   */
  brandTheme?: BrandTheme;
  /**
   * Additional inline styles merged on top of the resolved brand theme.
   */
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Theme provider for Primer Brand (`@primer/react-brand`) components.
 *
 * Works by passing CSS custom-property overrides as inline `style` to
 * `ThemeProvider`, which scopes them to its DOM subtree — exactly how
 * the VS Code extension re-skins Primer via CSS variables.
 *
 * ```tsx
 * import { DatalayerBrandThemeProvider } from '@datalayer/core/lib/theme';
 * import { spatialBrandTheme } from '@datalayer/core/lib/theme/themes-brand/spatialBrandTheme';
 *
 * <DatalayerBrandThemeProvider colorMode="dark" brandTheme={spatialBrandTheme}>
 *   <Hero>…</Hero>
 * </DatalayerBrandThemeProvider>
 * ```
 */
export function DatalayerBrandThemeProvider({
  colorMode = 'light',
  brandTheme,
  style,
  children,
}: IDatalayerBrandThemeProviderProps): React.JSX.Element {
  const systemMode = useSystemColorMode();
  const resolved: 'light' | 'dark' =
    colorMode === 'auto' ? systemMode : colorMode;

  const themeOverrides: CSSProperties | undefined = brandTheme
    ? resolved === 'dark'
      ? brandTheme.dark
      : brandTheme.light
    : undefined;

  return (
    <PrimerBrandThemeProvider
      colorMode={resolved}
      style={{
        ...themeOverrides,
        ...style,
      }}
    >
      {children}
    </PrimerBrandThemeProvider>
  );
}
