/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { ReactElement } from 'react';
import { SegmentedControl } from '@primer/react';
import { Box } from '../box/Box';
import {
  MoonIcon,
  SunIcon,
  DeviceDesktopIcon,
} from '@primer/octicons-react';
import {
  themeVariants,
  themeConfigs,
  type ColorMode,
  type ThemeVariant,
} from '../../theme';

export interface AppearanceControlsProps {
  colorMode: ColorMode;
  themeVariant: ThemeVariant;
  onColorModeChange: (mode: ColorMode) => void;
  onThemeChange: (theme: ThemeVariant) => void;
}

export function AppearanceControls({
  colorMode,
  themeVariant,
  onColorModeChange,
  onThemeChange,
}: AppearanceControlsProps): ReactElement {
  return (
    <>
      <Box sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'center' }}>
        <SegmentedControl
          aria-label="Color mode"
          size="small"
          onChange={(index: number) => {
            const modes: ColorMode[] = ['light', 'dark', 'auto'];
            onColorModeChange(modes[index]);
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

      <Box
        sx={{
          px: 2,
          pb: 2,
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {themeVariants.map((variant) => {
          const cfg = themeConfigs[variant];
          const isSelected = themeVariant === variant;
          return (
            <Box
              as="button"
              key={variant}
              aria-label={cfg.label}
              aria-pressed={isSelected}
              onClick={() => onThemeChange(variant)}
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: cfg.brandColor,
                border: '2px solid',
                borderColor: isSelected ? 'accent.fg' : 'border.default',
                cursor: 'pointer',
                padding: 0,
                outline: 'none',
                transition: 'border-color 0.15s ease',
                boxShadow: isSelected
                  ? '0 0 0 2px var(--bgColor-accent-muted, rgba(9,105,218,0.3))'
                  : 'none',
                '&:hover': {
                  borderColor: 'accent.fg',
                },
                '&:focus-visible': {
                  boxShadow:
                    '0 0 0 2px var(--bgColor-accent-muted, rgba(9,105,218,0.3))',
                },
              }}
            />
          );
        })}
      </Box>
    </>
  );
}

export default AppearanceControls;
