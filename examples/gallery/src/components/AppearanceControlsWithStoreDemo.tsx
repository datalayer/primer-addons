/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { AppearanceControlsWithStore, Box, useThemeStore } from '@datalayer/primer-addons';

/** Which parts of the controls each example shows. */
const VARIANTS = [
  { showColorMode: true, showThemeChooser: true, what: 'Both (the default): one swatch per theme, then the colour mode.' },
  { showColorMode: true, showThemeChooser: false, what: 'The colour mode alone.' },
  { showColorMode: false, showThemeChooser: true, what: 'The theme chooser alone.' },
];

export function AppearanceControlsWithStoreDemo() {
  return (
    <Box display="grid" gap={4}>
      {VARIANTS.map(({ showColorMode, showThemeChooser, what }) => (
        <Box key={what} display="grid" gap={2}>
          <Box fontSize={1} fontWeight="semibold">
            showColorMode={String(showColorMode)} showThemeChooser={String(showThemeChooser)}
          </Box>
          <Box fontSize={0} color="fg.muted">
            {what}
          </Box>
          <AppearanceControlsWithStore
            useStore={useThemeStore}
            showColorMode={showColorMode}
            showThemeChooser={showThemeChooser}
          />
        </Box>
      ))}
    </Box>
  );
}
