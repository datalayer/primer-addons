/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { ReactElement } from 'react';
import { CheckCircleFillIcon } from '@primer/octicons-react';
import { Box } from '../box/Box';
import { DatalayerThemeProvider, type ColorMode, themeConfigs, type ThemeVariant, useSystemColorMode } from '../../theme';

export interface ThemePreviewCardProps {
  variant: ThemeVariant;
  colorMode: ColorMode;
  selected?: boolean;
  onSelect?: (variant: ThemeVariant) => void;
  compact?: boolean;
  showDescription?: boolean;
}

export function ThemePreviewCard({
  variant,
  colorMode,
  selected = false,
  onSelect,
  compact = false,
  showDescription = true,
}: ThemePreviewCardProps): ReactElement {
  const cfg = themeConfigs[variant];
  const systemMode = useSystemColorMode();
  const resolvedMode = colorMode === 'auto' ? systemMode : colorMode;

  return (
    <Box
      as={onSelect ? 'button' : 'div'}
      onClick={onSelect ? () => onSelect(variant) : undefined}
      sx={{
        position: 'relative',
        width: '100%',
        textAlign: 'left',
        cursor: onSelect ? 'pointer' : 'default',
        bg: 'canvas.subtle',
        border: '2px solid',
        borderColor: selected ? 'accent.fg' : 'border.default',
        borderRadius: 2,
        p: compact ? 2 : 4,
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease',
        boxShadow: selected
          ? '0 0 0 1px var(--fgColor-accent, var(--color-accent-fg))'
          : 'none',
        ':hover': onSelect
          ? {
              borderColor: selected ? 'accent.fg' : 'border.muted',
              bg: 'canvas.inset',
            }
          : undefined,
        ':focus-visible': onSelect
          ? {
              outline: '2px solid',
              outlineColor: 'accent.fg',
              outlineOffset: 2,
            }
          : undefined,
      }}
    >
      {selected ? (
        <Box
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
            color: 'accent.fg',
          }}
        >
          <CheckCircleFillIcon size={compact ? 16 : 20} />
        </Box>
      ) : null}

      <DatalayerThemeProvider
        colorMode={resolvedMode}
        theme={cfg.primerTheme}
        themeStyles={cfg.themeStyles}
      >
        <Box
          sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'border.default',
            overflow: 'hidden',
            mb: compact ? 2 : 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: compact ? 1.5 : 2,
              py: compact ? '4px' : '6px',
              bg: 'canvas.subtle',
              borderBottom: '1px solid',
              borderColor: 'border.muted',
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bg: 'danger.emphasis' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bg: 'attention.emphasis' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bg: 'success.emphasis' }} />
          </Box>

          <Box sx={{ p: compact ? 2 : 3, bg: 'canvas.default' }}>
            <Box sx={{ display: 'block', fontWeight: 'semibold', fontSize: compact ? 0 : 1, color: 'fg.default', mb: 1 }}>
              The quick brown fox
            </Box>
            <Box sx={{ display: 'block', fontSize: 0, color: 'fg.muted', mb: 2 }}>
              jumps over the lazy dog.
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box
                sx={{
                  px: 2,
                  py: '2px',
                  borderRadius: '12px',
                  bg: 'accent.emphasis',
                  color: 'fg.onEmphasis',
                  fontSize: 0,
                  lineHeight: '18px',
                }}
              >
                accent
              </Box>
              <Box
                sx={{
                  px: 2,
                  py: '2px',
                  borderRadius: '12px',
                  bg: 'success.emphasis',
                  color: 'fg.onEmphasis',
                  fontSize: 0,
                  lineHeight: '18px',
                }}
              >
                success
              </Box>
            </Box>
          </Box>
        </Box>
      </DatalayerThemeProvider>

      <Box
        sx={{
          display: 'block',
          fontWeight: 'semibold',
          fontSize: compact ? 1 : 2,
          mb: showDescription ? 1 : 0,
        }}
      >
        {cfg.label}
      </Box>
      {showDescription ? (
        <Box sx={{ color: 'fg.muted', fontSize: compact ? 0 : 1 }}>
          {cfg.description}
        </Box>
      ) : null}
    </Box>
  );
}

export default ThemePreviewCard;