/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { type ReactElement } from 'react';
import { ColorModeCircle } from './ColorModeCircle';
import { AppearanceControls } from './AppearanceControls';
import type { ColorMode, ThemeVariant } from '../../theme';

export interface AppearanceMenuProps {
  /** Current color mode. */
  colorMode: ColorMode;
  /** Current theme variant. */
  themeVariant: ThemeVariant;
  /** Called with the next color mode. */
  onColorModeChange: (mode: ColorMode) => void;
  /** Called with the next theme variant. */
  onThemeChange: (theme: ThemeVariant) => void;
  /** Diameter of the trigger circle in pixels. */
  size?: number;
  /** Visual shape of the trigger control. */
  shape?: 'square' | 'circle';
  /** Overlay placement relative to the circle. */
  hoverOverlayPlacement?: 'bottom-start' | 'bottom-end';
  /** Whether the overlay shows the live theme previews. */
  showThemePreviews?: boolean;
}

/**
 * A single color-mode circle that reveals, on hover, an appearance overlay
 * with color-mode controls, theme circles and live theme previews.
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
  showThemePreviews = true,
}: AppearanceMenuProps): ReactElement {
  return (
    <ColorModeCircle
      colorMode={colorMode}
      onColorModeChange={onColorModeChange}
      cycleOnClick={false}
      themeVariant={themeVariant}
      hoverOverlayPlacement={hoverOverlayPlacement}
      shape={shape}
      size={size}
      hoverOverlay={
        <AppearanceControls
          colorMode={colorMode}
          themeVariant={themeVariant}
          onColorModeChange={onColorModeChange}
          onThemeChange={onThemeChange}
          showThemePreviews={showThemePreviews}
        />
      }
    />
  );
}

export default AppearanceMenu;
