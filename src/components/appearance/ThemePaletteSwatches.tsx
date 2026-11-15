/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The colour palette of a theme as swatches: its roles (what the theme's own
 * design uses) and its hues (the named colours a spec or a person picks),
 * each swatch with its name and value. The gallery's "Color Palette" page
 * draws its grids with these, and the appearance picker's preview shows them
 * for the theme and mode it previews.
 */

import type { ReactElement } from 'react';
import { Text } from '@primer/react';
import { Box } from '../box/Box';
import { ColorSwatch } from '../color/ColorSwatch';
import {
  getColorPalette,
  paletteRoleNames,
  type ColorPalette,
  type PaletteColorName,
} from '../../theme/palettes';
import { hueNames } from '../../theme/colors/hueColors';
import type { ThemeVariant } from '../../theme/themeTokens';
import { useThemeStore } from '../../theme/useThemeStore';

export interface PaletteSwatchGridProps {
  /** The palette the values come from. */
  palette: ColorPalette;
  /** The names of the palette to draw, in order. */
  names: readonly PaletteColorName[];
  /** Height of each swatch's colour block. Default: the swatch's own. */
  swatchHeight?: number;
  /** The narrowest a swatch gets before the grid wraps to fewer columns. Default: 120px. */
  minSwatchWidth?: number;
}

/** A wrapping grid of swatches, one per name of the palette. */
export function PaletteSwatchGrid({
  palette,
  names,
  swatchHeight,
  minSwatchWidth = 120,
}: PaletteSwatchGridProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minSwatchWidth}px, 1fr))`,
        gap: 2,
      }}
    >
      {names.map(name => (
        <ColorSwatch key={name} color={palette[name]} label={name} height={swatchHeight} />
      ))}
    </Box>
  );
}

export interface ThemePaletteSwatchesProps {
  /** The theme to draw. Default: the theme store's. */
  variant?: ThemeVariant;
  /** The colour mode to draw. Default: the theme store's. */
  colorMode?: 'light' | 'dark' | 'auto';
  /** Smaller swatches, for a settings page or a menu. */
  compact?: boolean;
}

/** A theme's palette: a heading and a grid for its roles, then for its hues. */
export function ThemePaletteSwatches({
  variant,
  colorMode,
  compact = false,
}: ThemePaletteSwatchesProps): ReactElement {
  const store = useThemeStore();
  const palette = getColorPalette(variant ?? store.theme, colorMode ?? store.colorMode);
  const swatchHeight = compact ? 32 : undefined;
  const minSwatchWidth = compact ? 104 : 120;
  const groups: { title: string; names: readonly PaletteColorName[] }[] = [
    { title: 'Roles', names: paletteRoleNames },
    { title: 'Hues', names: hueNames },
  ];
  return (
    <Box sx={{ display: 'grid', gap: compact ? 2 : 3 }} data-testid="theme-palette-swatches">
      {groups.map(group => (
        <Box key={group.title} sx={{ display: 'grid', gap: compact ? 1 : 2 }}>
          <Text as="h4" sx={{ m: 0, fontSize: compact ? 0 : 1, fontWeight: 600 }}>
            {group.title}
          </Text>
          <PaletteSwatchGrid
            palette={palette}
            names={group.names}
            swatchHeight={swatchHeight}
            minSwatchWidth={minSwatchWidth}
          />
        </Box>
      ))}
    </Box>
  );
}

export default ThemePaletteSwatches;
