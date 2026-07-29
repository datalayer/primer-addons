/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { type ReactElement, type ReactNode, useEffect, useRef, useState } from 'react';
import { Tooltip } from '@primer/react';
import { MoonIcon, SunIcon, DeviceDesktopIcon, type Icon } from '@primer/octicons-react';
import { Box } from '../box/Box';
import type { ColorMode } from '../../theme';

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

type HoverOverlayPlacement = 'bottom-start' | 'bottom-end';

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
}: ColorModeCircleProps): ReactElement {
  const meta = COLOR_MODE_META[colorMode] ?? COLOR_MODE_META.light;
  const next = COLOR_MODE_CYCLE[colorMode] ?? 'light';
  const nextMeta = COLOR_MODE_META[next];
  const { Icon } = meta;
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isBottomStart = hoverOverlayPlacement === 'bottom-start';

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
    <Box
      as="button"
      type="button"
      aria-label={`Color mode: ${meta.label}. Switch to ${nextMeta.label}.`}
      onClick={handleClick}
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        bg: 'canvas.default',
        color: 'fg.default',
        border: '1px solid',
        borderColor: 'border.default',
        cursor: 'pointer',
        padding: 0,
        transition: 'border-color 0.15s ease, color 0.15s ease',
        '&:hover': { borderColor: 'accent.fg', color: 'accent.fg' },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'accent.fg',
          outlineOffset: 1,
        },
      }}
    >
      <Icon size={Math.round(size * 0.5)} />
    </Box>
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
