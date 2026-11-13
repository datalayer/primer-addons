/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * A theme's colours, as the appearance picker's preview shows them under
 * its preview card: the colour palette (roles and hues) and the accents, in
 * the theme and the colour mode previewed, whatever the page around wears.
 */

import type { ReactElement } from 'react';
import { Text } from '@primer/react';
import { Box } from '../box/Box';
import { Card } from '../card/Card';
import { DatalayerThemeProvider } from '../../theme/DatalayerThemeProvider';
import type { ColorMode } from '../../theme/DatalayerBrandThemeProvider';
import { themeConfigs } from '../../theme/themeRegistry';
import type { ThemeVariant } from '../../theme/themeTokens';
import { useSystemColorMode } from '../../theme/useSystemColorMode';
import { ThemePaletteSwatches } from './ThemePaletteSwatches';
import { ThemeAccentSwatches } from './ThemeAccents';

export interface ThemePalettePreviewProps {
  variant: ThemeVariant;
  colorMode: ColorMode;
}

export function ThemePalettePreview({ variant, colorMode }: ThemePalettePreviewProps): ReactElement {
  const cfg = themeConfigs[variant];
  const systemMode = useSystemColorMode();
  const mode: 'light' | 'dark' = colorMode === 'auto' ? systemMode : colorMode === 'dark' ? 'dark' : 'light';
  const heading = { m: 0, fontSize: 1, fontWeight: 600, color: 'fg.default' };
  return (
    <DatalayerThemeProvider colorMode={mode} theme={cfg.primerTheme} themeStyles={cfg.themeStyles}>
      {/* Keyed by theme and mode: swatches that read values back from the page read them again. */}
      {/* A Card of this package, so its surface, hairline and corner are the theme's (13 November 2026). */}
      <Card
        key={`${variant}-${mode}`}
        data-testid="theme-palette-preview"
        data-theme-variant={variant}
        data-theme-mode={mode}
        border
        shadow="none"
        display="grid"
        sx={{ gap: 3, p: 2 }}
      >
        <Box as="section" sx={{ display: 'grid', gap: 2 }}>
          <Text as="h3" sx={heading}>
            Color palette
          </Text>
          <ThemePaletteSwatches variant={variant} colorMode={mode} compact />
        </Box>
        <Box as="section" sx={{ display: 'grid', gap: 2 }}>
          <Text as="h3" sx={heading}>
            Theme accents
          </Text>
          <ThemeAccentSwatches mode={mode} />
        </Box>
      </Card>
    </DatalayerThemeProvider>
  );
}

export default ThemePalettePreview;
