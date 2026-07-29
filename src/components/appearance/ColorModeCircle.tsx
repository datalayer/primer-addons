/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { type ReactElement, type ReactNode, useEffect, useRef, useState } from 'react';
import { IconButton, Tooltip } from '@primer/react';
import { MoonIcon, SunIcon, DeviceDesktopIcon, type Icon } from '@primer/octicons-react';
import { Box } from '../box/Box';
import { themeConfigs, type ColorMode, type ThemeVariant } from '../../theme';

/** Order in which a click cycles through the color modes. */
const COLOR_MODE_CYCLE: Record<ColorMode, ColorMode> = {
  light: 'dark',
  dark: 'auto',
  auto: 'light',
};

/** Display metadata (label + icon) for each color mode. */
const COLOR_MODE_META: Record<ColorMode, { label: string; Icon: Icon }> = {
  light: { label: 'Light', Icon: SunIcon },
  dark: { label: 'Dark', Icon: MoonIcon },
  auto: { label: 'System', Icon: DeviceDesktopIcon },
};

/** Small optical offsets so glyphs look visually centered in the circle. */
const COLOR_MODE_ICON_Y_OFFSET: Record<ColorMode, number> = {
  light: -0.75,
  dark: 0,
  auto: -0.5,
};

type HoverOverlayPlacement = 'bottom-start' | 'bottom-end';
type ColorModeCircleShape = 'square' | 'circle';

export interface ColorModeCircleProps {
  /** Current color mode. */
  colorMode: ColorMode;
  /** Called with the next color mode when the circle is clicked. */
  onColorModeChange: (mode: ColorMode) => void;
  /** Diameter of the circle in pixels. */
  size?: number;
  /** Optional overlay shown when hovering the circle. */
  hoverOverlay?: ReactNode;
  /** Keep legacy click-to-cycle behavior when an overlay is present. */
  cycleOnClick?: boolean;
  /** Overlay placement relative to the circle. */
  hoverOverlayPlacement?: HoverOverlayPlacement;
  /** Optional theme used to tint the circle border. */
  themeVariant?: ThemeVariant;
  /** Visual shape of the control. */
  shape?: ColorModeCircleShape;
}

/**
 * A single clickable circle that cycles the color mode through
 * light → dark → system (auto). The icon reflects the current mode.
 */
export function ColorModeCircle({
  colorMode,
  onColorModeChange,
  size = 28,
  hoverOverlay,
  cycleOnClick = true,
  hoverOverlayPlacement = 'bottom-end',
  themeVariant,
  shape = 'square',
}: ColorModeCircleProps): ReactElement {
  const meta = COLOR_MODE_META[colorMode] ?? COLOR_MODE_META.light;
  const next = COLOR_MODE_CYCLE[colorMode] ?? 'light';
  const nextMeta = COLOR_MODE_META[next];
  const { Icon } = meta;
  const iconYOffset = COLOR_MODE_ICON_Y_OFFSET[colorMode] ?? 0;
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isBottomStart = hoverOverlayPlacement === 'bottom-start';
  const themeConfig = themeVariant ? themeConfigs[themeVariant] : undefined;
  const themeBorderColor = themeConfig?.brandColor;
  const hasThemeColor = Boolean(themeBorderColor);
  const resolvedMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
      : colorMode;
  const modeThemeStyles = themeConfig?.themeStyles?.[resolvedMode] as Record<string, string | undefined> | undefined;
  const themePrimaryButtonBg = modeThemeStyles?.['--button-primary-bgColor-rest'];
  const themePrimaryButtonFg = modeThemeStyles?.['--button-primary-fgColor-rest'];
  const themedIconColor = themePrimaryButtonFg || themeConfig?.brightPalette?.onGlow || 'fg.default';

  const cancelScheduledClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openHoverOverlay = () => {
    cancelScheduledClose();
    setIsHoverOpen(true);
  };

  const scheduleCloseHoverOverlay = () => {
    cancelScheduledClose();
    closeTimerRef.current = setTimeout(() => {
      setIsHoverOpen(false);
      closeTimerRef.current = null;
    }, 220);
  };

  useEffect(() => {
    return () => cancelScheduledClose();
  }, []);

  const handleClick = () => {
    if (!hoverOverlay || cycleOnClick) {
      onColorModeChange(next);
    }
  };

  const circle = (
    <IconButton
      aria-label={`Color mode: ${meta.label}. Switch to ${nextMeta.label}.`}
      onClick={handleClick}
      icon={() => (
        <Box
          as="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translateY(${iconYOffset}px)`,
            lineHeight: 0,
          }}
        >
          <Icon size={Math.round(size * 0.5)} />
        </Box>
      )}
      size="small"
      variant="invisible"
      sx={{
        minWidth: size,
        width: size,
        height: size,
        borderRadius: shape === 'circle' ? '50%' : 2,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        bg: hasThemeColor ? (themePrimaryButtonBg || themeBorderColor) : 'canvas.default',
        color: hasThemeColor ? themedIconColor : 'fg.default',
        border: '1px solid',
        borderColor: themeBorderColor || 'border.default',
        cursor: 'pointer',
        padding: 0,
        transition: 'border-color 0.15s ease, color 0.15s ease',
        '&:hover': {
          borderColor: hasThemeColor ? themeBorderColor : 'accent.fg',
          color: hasThemeColor ? themedIconColor : 'accent.fg',
          opacity: hasThemeColor ? 0.92 : 1,
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'accent.fg',
          outlineOffset: 1,
        },
      }}
    />
  );

  if (!hoverOverlay) {
    return (
      <Tooltip
        text={`Color mode: ${meta.label} — click for ${nextMeta.label}`}
        direction="s"
      >
        {circle}
      </Tooltip>
    );
  }

  return (
    <Box
      sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={openHoverOverlay}
      onMouseLeave={scheduleCloseHoverOverlay}
    >
      {circle}
      <Box
        sx={{
          position: 'absolute',
          top: `calc(100% + 8px)`,
          left: isBottomStart ? 0 : 'auto',
          right: isBottomStart ? 'auto' : 0,
          zIndex: 220,
          minWidth: 260,
          bg: 'canvas.overlay',
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 2,
          boxShadow: 'shadow.large',
          opacity: isHoverOpen ? 1 : 0,
          transform: isHoverOpen ? 'translateY(0)' : 'translateY(-6px)',
          pointerEvents: isHoverOpen ? 'auto' : 'none',
          transition: 'opacity 0.16s ease, transform 0.16s ease',
        }}
      >
        {hoverOverlay}
      </Box>
    </Box>
  );
}

export default ColorModeCircle;
