/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { ReactElement } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';
import { useThemeStore, type ThemeState } from '../../theme/useThemeStore';
import { AppearanceMenu, type AppearanceMenuProps } from './AppearanceMenu';

export interface AppearanceMenuWithStoreProps
  extends Omit<
    AppearanceMenuProps,
    'colorMode' | 'themeVariant' | 'onColorModeChange' | 'onThemeChange'
  > {
  /** The store the menu reads and writes; the shared one by default. */
  useStore?: UseBoundStore<StoreApi<ThemeState>>;
  /**
   * Whether choosing a theme also switches to that theme's default color
   * mode. Off by default: a person who chose dark keeps dark while they try
   * another theme, which is how the public Datalayer header behaves.
   */
  applyThemeColorMode?: boolean;
}

/**
 * The {@link AppearanceMenu} bound to a theme store, so a header mounts it
 * with no props at all.
 *
 * The menu itself is controlled: a page with its own idea of where the theme
 * lives hands it values and callbacks. Most pages have no such idea — the
 * theme lives in the store — and this reads it from there and writes the
 * choices back. The same shape as {@link AppearanceControlsWithStore}, for
 * the whole menu: the trigger, the overlay, the description, the preview.
 */
export function AppearanceMenuWithStore({
  useStore = useThemeStore,
  applyThemeColorMode = false,
  ...menu
}: AppearanceMenuWithStoreProps): ReactElement {
  const colorMode = useStore((state) => state.colorMode);
  const themeVariant = useStore((state) => state.theme);
  const setColorMode = useStore((state) => state.setColorMode);
  const setTheme = useStore((state) => state.setTheme);
  return (
    <AppearanceMenu
      colorMode={colorMode}
      themeVariant={themeVariant}
      onColorModeChange={setColorMode}
      onThemeChange={(theme) => setTheme(theme, applyThemeColorMode)}
      {...menu}
    />
  );
}

export default AppearanceMenuWithStore;
