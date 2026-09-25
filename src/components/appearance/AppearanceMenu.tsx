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
