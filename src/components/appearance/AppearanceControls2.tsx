/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import React from 'react';
import { IconButton, SegmentedControl, Tooltip } from '@primer/react';
import type { UseBoundStore, StoreApi } from 'zustand';
import {
  SunIcon,
  MoonIcon,
  DeviceDesktopIcon,
  CircleIcon,
} from '@primer/octicons-react';
import { Box } from '../box/Box';
import { themeConfigs, themeVariants } from '../../theme/themeRegistry';
import type { ColorMode, ThemeState } from '../../theme/useThemeStore';

export interface AppearanceControlsWithStoreProps {
  useStore: UseBoundStore<StoreApi<ThemeState>>;
}

export const AppearanceControlsWithStore: React.FC<AppearanceControlsWithStoreProps> = ({ useStore }) => {
  const { colorMode, theme: themeVariant } = useStore();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {themeVariants.map(variant => {
          const tcfg = themeConfigs[variant];
          const isSelected = themeVariant === variant;
          return (
            <Tooltip key={variant} text={tcfg.label} direction="s">
              <IconButton
                aria-label={tcfg.label}
                aria-pressed={isSelected}
                icon={() => <CircleIcon size={16} fill={tcfg.brandColor} />}
                size="small"
                variant={isSelected ? 'default' : 'invisible'}
                onClick={() => useStore.getState().setTheme(variant, false)}
                sx={{
                  border: isSelected ? '2px solid' : '1px solid',
                  borderColor: isSelected ? 'accent.fg' : 'border.muted',
                  borderRadius: '50%',
                }}
              />
            </Tooltip>
          );
        })}
      </Box>

      <SegmentedControl
        aria-label="Color mode"
        size="small"
        onChange={(index: number) => {
          const modes: ColorMode[] = ['light', 'dark', 'auto'];
          useStore.getState().setColorMode(modes[index]);
        }}
      >
        <SegmentedControl.IconButton
          selected={colorMode === 'light'}
          icon={SunIcon}
          aria-label="Light"
        />
        <SegmentedControl.IconButton
          selected={colorMode === 'dark'}
          icon={MoonIcon}
          aria-label="Dark"
        />
        <SegmentedControl.IconButton
          selected={colorMode === 'auto'}
          icon={DeviceDesktopIcon}
          aria-label="Auto"
        />
      </SegmentedControl>
    </Box>
  );
};

export default AppearanceControlsWithStore;
