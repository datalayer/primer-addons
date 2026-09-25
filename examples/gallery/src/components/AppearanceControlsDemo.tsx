/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { ColorMode, ThemeVariant } from '@datalayer/primer-addons';
import { AppearanceControls, useThemeStore } from '@datalayer/primer-addons';

export function AppearanceControlsDemo() {
  const { colorMode, theme, setColorMode, setTheme } = useThemeStore();

  return (
    <AppearanceControls
      colorMode={colorMode}
      themeVariant={theme}
      onColorModeChange={(mode: ColorMode) => setColorMode(mode)}
      onThemeChange={(variant: ThemeVariant) => setTheme(variant, false)}
    />
  );
}
