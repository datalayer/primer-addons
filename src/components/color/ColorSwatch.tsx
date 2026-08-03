/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useLayoutEffect, useRef, useState } from "react";
import { Box, Text } from "@primer/react";
import { useThemeStore } from "../../theme/useThemeStore";

/** Convert an `rgb()` / `rgba()` string to a `#rrggbb` hex value. */
function rgbToHex(rgb: string): string | null {
  const match = rgb.match(/rgba?\(([^)]+)\)/);
  if (!match) {
    return null;
  }
  const parts = match[1].split(",").map((part) => part.trim());
  if (parts.length < 3) {
    return null;
  }
  const [r, g, b] = parts.map((part) => parseInt(part, 10));
  if ([r, g, b].some((channel) => Number.isNaN(channel))) {
    return null;
  }
  const toHex = (channel: number) => channel.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export interface ColorSwatchProps {
  /**
   * A CSS color value or `var()` expression to render, e.g.
   * `"var(--fgColor-default)"` or `"#ff0000"`. The swatch resolves the
   * computed color at runtime, so `var()` tokens reflect the active theme
   * and color mode.
   */
  color: string;
  /** Optional label shown under the swatch. Defaults to the `color` string. */
  label?: string;
  /** Show the resolved hex value below the label. Defaults to `true`. */
  showValue?: boolean;
  /** Height of the color block in pixels. Defaults to `54`. */
  height?: number;
}

/**
 * Theme-aware color swatch. Renders a block filled with `color`, then reads
 * the resolved value via `getComputedStyle` and displays it as a hex string.
 * The resolved value recomputes whenever the active theme or color mode
 * changes, so swatches backed by CSS custom properties stay in sync.
 */
export function ColorSwatch({
  color,
  label,
  showValue = true,
  height = 54,
}: ColorSwatchProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { theme, colorMode } = useThemeStore();
  const [hex, setHex] = useState<string | null>(null);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (!ref.current) {
        return;
      }
      const rgb = getComputedStyle(ref.current).backgroundColor;
      setHex(rgbToHex(rgb));
    });
    return () => cancelAnimationFrame(raf);
  }, [color, theme, colorMode]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: `${height}px auto`,
        border: "1px solid",
        borderColor: "var(--borderColor-default)",
        borderRadius: 2,
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      <Box ref={ref} style={{ backgroundColor: color }} />
      <Box sx={{ p: 2, display: "grid", gap: 1 }}>
        <Text
          sx={{
            fontSize: 0,
            color: "fg.default",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={label ?? color}
        >
          {label ?? color}
        </Text>
        {showValue && hex ? (
          <Text sx={{ fontSize: 0, color: "fg.muted", fontFamily: "mono" }}>
            {hex}
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}

export default ColorSwatch;
