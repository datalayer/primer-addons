import { Box, Text } from '@primer/react';
import { AppearanceMenuWithStore } from '@datalayer/primer-addons';

export function AppearanceMenuDemo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <AppearanceMenuWithStore hoverOverlayPlacement="bottom-start" />
      <Text sx={{ color: 'fg.muted' }}>
        Hover the square: color mode, theme, the theme's description and a
        preview. The same control the header wears, through the appearance
        plugin.
      </Text>
    </Box>
  );
}
