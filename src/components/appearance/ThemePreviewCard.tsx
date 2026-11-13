/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { ReactElement } from 'react';
import { CheckCircleFillIcon } from '@primer/octicons-react';
import { Box } from '../box/Box';
import { Card } from '../card/Card';
import { matrixColors } from '../../theme/colors';
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
    // A Card of this package: the theme's surface, hairline, corner and, when
    // it is picked from, its hover, focus and selected states (13 November 2026).
    <Card
      as={onSelect ? 'button' : 'div'}
      onClick={onSelect ? () => onSelect(variant) : undefined}
      border
      shadow="none"
      interactive={Boolean(onSelect)}
      selected={selected}
      display="block"
      sx={{ position: 'relative', width: '100%', textAlign: 'left', p: compact ? 2 : 4 }}
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
        <Card border shadow="none" display="block" sx={{ overflow: 'hidden', mb: compact ? 2 : 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: compact ? 1.5 : 2,
              py: compact ? '4px' : '6px',
              bg: 'canvas.default',
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {(
                [
                  { label: 'accent', bg: 'accent.emphasis' as const },
                  { label: 'success', bg: 'success.emphasis' as const },
                  { label: 'attention', bg: 'attention.emphasis' as const },
                  { label: 'danger', bg: 'danger.emphasis' as const },
                  { label: 'done', bg: 'done.emphasis' as const },
                  { label: 'severe', bg: 'severe.emphasis' as const },
                ]
              ).map(({ label, bg }) => (
                <Box
                  key={label}
                  sx={{
                    px: 2,
                    py: '2px',
                    borderRadius: '12px',
                    bg,
                    color:
                      variant === 'matrix' &&
                      ((resolvedMode === 'dark' && label === 'accent') ||
                        (resolvedMode === 'light' && label === 'attention'))
                        ? matrixColors.black
                        : 'fg.onEmphasis',
                    fontSize: 0,
                    lineHeight: '18px',
                  }}
                >
                  {label}
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
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
    </Card>
  );
}

export default ThemePreviewCard;