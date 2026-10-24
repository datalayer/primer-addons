/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { ColorMode, ThemeVariant } from '@datalayer/primer-addons';
import { AppearanceControls, Box, useThemeStore } from '@datalayer/primer-addons';

/** Which parts of the controls each example shows. */
const VARIANTS = [
  { showColorMode: true, showThemeChooser: true, showThemePreviews: false, what: 'Both, the theme as swatches (the default).' },
  { showColorMode: true, showThemeChooser: true, showThemePreviews: true, what: 'Both, with the chosen theme’s name, description and preview.' },
  { showColorMode: true, showThemeChooser: false, showThemePreviews: false, what: 'The colour mode alone.' },
  { showColorMode: false, showThemeChooser: true, showThemePreviews: false, what: 'The theme chooser alone.' },
];

export function AppearanceControlsDemo() {
  const { colorMode, theme, setColorMode, setTheme } = useThemeStore();

  return (
    <Box display="grid" gap={4}>
      {VARIANTS.map(({ showColorMode, showThemeChooser, showThemePreviews, what }) => (
        <Box key={what} display="grid" gap={2}>
          <Box fontSize={1} fontWeight="semibold">
            showColorMode={String(showColorMode)} showThemeChooser={String(showThemeChooser)}
            {showThemePreviews ? ' showThemePreviews' : ''}
          </Box>
          <Box fontSize={0} color="fg.muted">
            {what}
          </Box>
          <Box border="1px solid" borderColor="border.default" borderRadius="card" maxWidth={360}>
            <AppearanceControls
              colorMode={colorMode}
              themeVariant={theme}
              onColorModeChange={(mode: ColorMode) => setColorMode(mode)}
              onThemeChange={(variant: ThemeVariant) => setTheme(variant, false)}
              showColorMode={showColorMode}
              showThemeChooser={showThemeChooser}
              showThemePreviews={showThemePreviews}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
