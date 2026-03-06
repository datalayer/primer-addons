/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * ThemeSwitcher – Themed colour circles + light/dark/auto segmented control.
 *
 * The component requires an external Zustand `ThemeState` store (created
 * with `createThemeStore`).  Consumers pass the `useStore` hook as a prop
 * so the switcher is completely decoupled from any specific app's store.
 *
 * @module theme/ThemeSwitcher
 */

import React from 'react';
import { Box, IconButton, SegmentedControl, Tooltip } from '@primer/react';
import {
  SunIcon,
  MoonIcon,
  DeviceDesktopIcon,
  CircleIcon,
} from '@primer/octicons-react';
import { themeConfigs, themeVariants } from './themeRegistry';
import type { ColorMode, ThemeState } from './useThemeStore';
import type { UseBoundStore, StoreApi } from 'zustand';

export interface ThemeSwitcherProps {
  /** A Zustand store hook created via `createThemeStore()`. */
  useStore: UseBoundStore<StoreApi<ThemeState>>;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ useStore }) => {
  const { colorMode, theme: themeVariant } = useStore();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {/* Theme colored circles */}
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
                onClick={() =>
                  useStore.getState().setTheme(variant, false)
                }
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

      {/* Color mode segmented control */}
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
