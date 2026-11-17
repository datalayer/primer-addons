/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { type ReactElement } from 'react';
import { ColorModeCircle, type HoverOverlayPlacement } from './ColorModeCircle';
import { AppearanceControls } from './AppearanceControls';
import type { ColorMode, ThemeVariant } from '../../theme';

export interface AppearanceMenuProps {
  /** Current color mode. */
  colorMode: ColorMode;
  /** Current theme variant. */
  themeVariant: ThemeVariant;
  /** Called with the next color mode. */
  onColorModeChange: (mode: ColorMode) => void;
  /** Called with the next theme variant; required when the theme chooser shows. */
  onThemeChange?: (theme: ThemeVariant) => void;
  /** Diameter of the trigger circle in pixels. */
  size?: number;
  /** Visual shape of the trigger control. */
  shape?: 'square' | 'circle';
  /** Overlay placement relative to the circle. */
  hoverOverlayPlacement?: HoverOverlayPlacement;
  /**
   * Whether the overlay offers the themes (their swatches, and with
   * `showThemePreviews` the chosen one's preview). Default: shown; `false`
   * for a site that wears one theme — the overlay is the light / dark / auto
   * switch alone.
   */
  showThemeChooser?: boolean;
  /** Whether the overlay shows the live theme previews. */
  showThemePreviews?: boolean;
  /** The most theme swatches on one line in the overlay; undefined, they wrap freely. */
  themesPerLine?: number;
}

/**
 * A single color-mode circle that reveals, on hover, an appearance overlay
 * with color-mode controls, theme circles and live theme previews — or the
 * color-mode controls alone, with `showThemeChooser={false}`.
 *
 * This bundles the {@link ColorModeCircle} trigger together with the
 * {@link AppearanceControls} overlay so the whole appearance menu can be
 * dropped into any header with a single component.
 */
export function AppearanceMenu({
  colorMode,
  themeVariant,
  onColorModeChange,
  onThemeChange,
  size = 26,
  shape = 'square',
  hoverOverlayPlacement = 'bottom-end',
  showThemeChooser = true,
  showThemePreviews = true,
  themesPerLine,
}: AppearanceMenuProps): ReactElement {
  return (
    <ColorModeCircle
      colorMode={colorMode}
      onColorModeChange={onColorModeChange}
      cycleOnClick={false}
      themeVariant={themeVariant}
      hoverOverlayPlacement={hoverOverlayPlacement}
      // The switch alone needs no room for the swatches.
      hoverOverlayMinWidth={showThemeChooser ? 340 : 'auto'}
      shape={shape}
      size={size}
      hoverOverlay={
        <AppearanceControls
          withStore={false}
          colorMode={colorMode}
          themeVariant={themeVariant}
          onColorModeChange={onColorModeChange}
          onThemeChange={onThemeChange}
          showThemeChooser={showThemeChooser}
          showThemePreviews={showThemePreviews}
          themesPerLine={themesPerLine}
        />
      }
    />
  );
}

export default AppearanceMenu;
