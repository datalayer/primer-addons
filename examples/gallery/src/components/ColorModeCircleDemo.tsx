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

import { Text } from '@primer/react';
import type { ColorMode, ThemeVariant } from '@datalayer/primer-addons';
import { AppearanceControls, Box, ColorModeCircle, useThemeStore } from '@datalayer/primer-addons';

export function ColorModeCircleDemo() {
  const { colorMode, theme, setColorMode, setTheme } = useThemeStore();
  const overlay = (
    <AppearanceControls
      colorMode={colorMode}
      themeVariant={theme}
      onColorModeChange={(mode: ColorMode) => setColorMode(mode)}
      onThemeChange={(variant: ThemeVariant) => setTheme(variant, false)}
    />
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Text sx={{ display: 'block', mb: 2, fontSize: 0, color: 'fg.muted' }}>
          Click to cycle light -&gt; dark -&gt; system.
        </Text>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <ColorModeCircle
            colorMode={colorMode}
            themeVariant={theme}
            onColorModeChange={(mode: ColorMode) => setColorMode(mode)}
          />
          <ColorModeCircle
            colorMode={colorMode}
            themeVariant={theme}
            onColorModeChange={(mode: ColorMode) => setColorMode(mode)}
            shape="circle"
          />
        </Box>
      </Box>
      <Box>
        <Text sx={{ display: 'block', mb: 2, fontSize: 0, color: 'fg.muted' }}>
          Hover to reveal the appearance overlay (click-to-cycle disabled).
        </Text>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <ColorModeCircle
            colorMode={colorMode}
            themeVariant={theme}
            onColorModeChange={(mode: ColorMode) => setColorMode(mode)}
            hoverOverlay={overlay}
            cycleOnClick={false}
            hoverOverlayPlacement="bottom-start"
          />
          <ColorModeCircle
            colorMode={colorMode}
            themeVariant={theme}
            onColorModeChange={(mode: ColorMode) => setColorMode(mode)}
            shape="circle"
            hoverOverlay={overlay}
            cycleOnClick={false}
            hoverOverlayPlacement="bottom-start"
          />
        </Box>
      </Box>
    </Box>
  );
}
