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
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * A colour, picked.
 *
 * A saturation-and-brightness field, a hue rail under it, a hex field and a
 * row of presets — the shape a colour picker has had since Photoshop, drawn
 * with Primer's form controls and Primer's custom properties so it sits in a
 * Primer page without a stylesheet of its own.
 *
 * The chrome follows the theme (`--borderColor-default`, `--bgColor-muted`).
 * The colour surfaces do not: a hue rail is the hue rail in every theme, and
 * tinting it would lie about the colour being picked.
 *
 * Pointer events throughout, so a drag works the same with a mouse, a finger
 * or a stylus, and keeps following the pointer outside the element.
 *
 * @module components/color-picker/ColorPicker
 */

import type React from "react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, Text, TextInput } from "@primer/react";
import {
  getBrightPalette,
  themeConfigs,
  type ThemeVariant,
} from "../../theme/themeRegistry";
import { useThemeStore } from "../../theme/useThemeStore";
import { useSystemColorMode } from "../../theme/useSystemColorMode";
import { collaboratorColors } from "../appearance/CollaboratorPalette";

/* ── Colour maths ──────────────────────────────────────────────────── */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSV {
  /** 0–360 */
  h: number;
  /** 0–100 */
  s: number;
  /** 0–100 */
  v: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** `#rgb`, `#rrggbb` or `rgb(r, g, b)` as channels; black when unreadable. */
export function toRgb(input: string): RGB {
  const text = input.trim();
  const fromFunction = /^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i.exec(text);
  if (fromFunction) {
    const [, r, g, b] = fromFunction;
    return { r: Number(r), g: Number(g), b: Number(b) };
  }
  let hex = text.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((channel) => channel + channel)
      .join("");
  }
  if (!/^[0-9a-f]{6}$/i.test(hex)) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

export function toHex({ r, g, b }: RGB): string {
  const channel = (value: number) =>
    clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");
  return `#${channel(r)}${channel(g)}${channel(b)}`;
}

export function rgbToHsv({ r, g, b }: RGB): HSV {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const span = max - min;
  let h = 0;
  if (span !== 0) {
    if (max === red) {
      h = 60 * (((green - blue) / span) % 6);
    } else if (max === green) {
      h = 60 * ((blue - red) / span + 2);
    } else {
      h = 60 * ((red - green) / span + 4);
    }
  }
  if (h < 0) {
    h += 360;
  }
  return { h, s: max === 0 ? 0 : (span / max) * 100, v: max * 100 };
}

export function hsvToRgb({ h, s, v }: HSV): RGB {
  const saturation = s / 100;
  const value = v / 100;
  const chroma = value * saturation;
  const second = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const base = value - chroma;
  const sextant = Math.floor((((h % 360) + 360) % 360) / 60);
  const [r, g, b] = (
    [
      [chroma, second, 0],
      [second, chroma, 0],
      [0, chroma, second],
      [0, second, chroma],
      [second, 0, chroma],
      [chroma, 0, second],
    ] as const
  )[sextant];
  return {
    r: Math.round((r + base) * 255),
    g: Math.round((g + base) * 255),
    b: Math.round((b + base) * 255),
  };
}

/** Whether text reads as a colour this picker can hold. */
export function isColor(input: string): boolean {
  const text = input.trim();
  return (
    /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(text) ||
    /^rgba?\(\s*\d+[,\s]+\d+[,\s]+\d+/i.test(text)
  );
}

/** Black or white, whichever stays legible on the colour given. */
export function readableOn(color: RGB): string {
  // Rec. 601 luma, the usual quick test for "is this a light colour".
  const luma = (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
  return luma > 150 ? "#000000" : "#ffffff";
}

/* ── The picker ────────────────────────────────────────────────────── */

/** A spread of hues and neutrals to start from. */
export const DEFAULT_COLOR_PRESETS = [
  "#cf222e",
  "#bc4c00",
  "#9a6700",
  "#1a7f37",
  "#0969da",
  "#8250df",
  "#bf3989",
  "#24292f",
  "#57606a",
  "#8c959f",
  "#d0d7de",
  "#ffffff",
];

/**
 * A named row of swatches under the field.
 *
 * More than one can be offered at a time — the theme's own colours, the
 * colours a room gives its collaborators, a product's brand set — each under
 * its own heading, so a person picking a colour can reach for one that
 * already belongs somewhere rather than inventing a hex value.
 */
export interface ColorPresetGroup {
  /** The heading over the row. */
  label: string;
  /** The colours, as anything CSS accepts. */
  colors: readonly string[];
}

/**
 * The active theme's own colours, as a group.
 *
 * Surfaces and text first, then the semantic four, then the vivid palette the
 * theme keeps for illustration — the order someone reaches for them in.
 */
export function themeColorPresets(
  variant: ThemeVariant = "datalayer",
  colorMode: "light" | "dark" | "auto" = "light",
): ColorPresetGroup {
  const bright = getBrightPalette(variant, colorMode);
  const config = themeConfigs[variant] ?? themeConfigs.datalayer;
  const mode =
    colorMode === "auto"
      ? typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : colorMode;
  const styles = (
    mode === "dark" ? config.themeStyles.dark : config.themeStyles.light
  ) as Record<string, string>;
  const fromStyles = (name: string) => styles[name];
  return {
    label: config.label,
    colors: [
      fromStyles("--bgColor-default"),
      fromStyles("--bgColor-muted"),
      fromStyles("--fgColor-default"),
      fromStyles("--fgColor-muted"),
      fromStyles("--fgColor-accent"),
      fromStyles("--fgColor-success"),
      fromStyles("--fgColor-attention"),
      fromStyles("--fgColor-danger"),
      bright.glow,
      bright.pop,
      bright.spark,
      bright.blaze,
      bright.surge,
      bright.flame,
      bright.gold,
    ].filter(Boolean),
  };
}

/** The colours a room gives its collaborators, as a group. */
export function collaboratorColorPresets(
  variant: ThemeVariant = "datalayer",
  colorMode: "light" | "dark" | "auto" = "dark",
): ColorPresetGroup {
  return {
    label: "Collaborators",
    colors: collaboratorColors(variant, colorMode),
  };
}

export interface ColorPickerProps {
  /** The colour held, as `#rrggbb` or `rgb(r, g, b)`. */
  color: string;
  /** Told the new colour, as `#rrggbb`, while it is dragged and when it is set. */
  onChange?: (color: string) => void;
  /** The swatches offered under the field. {@link DEFAULT_COLOR_PRESETS} by default. */
  presets?: readonly string[];
  /** Hide the preset row. */
  showPresets?: boolean;
  /**
   * Further rows under the presets, each with its own heading. Give it
   * {@link themeColorPresets} or {@link collaboratorColorPresets}, or rows of
   * your own.
   */
  presetGroups?: readonly ColorPresetGroup[];
  /**
   * Offer the active theme's own colours as a row. On by default: a colour
   * picked in a themed page usually wants to be one of the theme's.
   */
  showThemeColors?: boolean;
  /** Offer the collaborator colours as a row. Off by default. */
  showCollaboratorColors?: boolean;
  /** Hide the hex field. */
  showInput?: boolean;
  /** How wide the whole picker is, in pixels. */
  width?: number;
  /** The picker's accessible name. */
  "aria-label"?: string;
}

const FIELD_HEIGHT = 150;
const RAIL_HEIGHT = 12;

/**
 * Follows a pointer across an element, in fractions of its own box.
 *
 * The listeners go on the window once a drag starts, so the pointer can leave
 * the element — down the page, out of the window — without the handle being
 * dropped where it was last seen.
 */
function useDrag(onMove: (x: number, y: number) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const moving = useRef(false);

  const report = useCallback(
    (event: PointerEvent | React.PointerEvent) => {
      const element = ref.current;
      if (!element) {
        return;
      }
      const box = element.getBoundingClientRect();
      onMove(
        clamp((event.clientX - box.left) / box.width, 0, 1),
        clamp((event.clientY - box.top) / box.height, 0, 1),
      );
    },
    [onMove],
  );

  useEffect(() => {
    const move = (event: PointerEvent) => moving.current && report(event);
    const up = () => {
      moving.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [report]);

  const onPointerDown = (event: React.PointerEvent) => {
    moving.current = true;
    report(event);
  };

  return { ref, onPointerDown };
}

export function ColorPicker({
  color,
  onChange,
  presets = DEFAULT_COLOR_PRESETS,
  showPresets = true,
  presetGroups,
  showThemeColors = true,
  showCollaboratorColors = false,
  showInput = true,
  width = 232,
  "aria-label": ariaLabel = "Colour picker",
}: ColorPickerProps) {
  const [hsv, setHsv] = useState<HSV>(() => rgbToHsv(toRgb(color)));
  const [text, setText] = useState(() => toHex(toRgb(color)));
  /* A drag reports a colour, which comes back as a prop; without this the
     answer would overwrite the hue whenever grey is picked (grey has none). */
  const own = useRef(false);

  useEffect(() => {
    if (own.current) {
      own.current = false;
      return;
    }
    const rgb = toRgb(color);
    setHsv(rgbToHsv(rgb));
    setText(toHex(rgb));
  }, [color]);

  const rgb = useMemo(() => hsvToRgb(hsv), [hsv]);
  const hex = useMemo(() => toHex(rgb), [rgb]);

  const announce = useCallback(
    (next: HSV) => {
      own.current = true;
      setHsv(next);
      const value = toHex(hsvToRgb(next));
      setText(value);
      onChange?.(value);
    },
    [onChange],
  );

  const field = useDrag(
    useCallback(
      (x, y) => announce({ ...hsv, s: x * 100, v: (1 - y) * 100 }),
      [announce, hsv],
    ),
  );
  const rail = useDrag(
    useCallback((x) => announce({ ...hsv, h: x * 360 }), [announce, hsv]),
  );

  /*
    The rows under the field: the caller's presets, then the theme's own
    colours, then the collaborators' — each only when asked for, and each
    read from whichever theme is on rather than from a fixed list.
  */
  const { theme: activeTheme, colorMode: activeMode } = useThemeStore();
  const systemMode = useSystemColorMode();
  const resolvedMode = activeMode === "auto" ? systemMode : activeMode;
  const rows = useMemo(() => {
    const groups: ColorPresetGroup[] = [];
    if (showPresets && presets.length > 0) {
      groups.push({ label: "Presets", colors: presets });
    }
    if (showThemeColors) {
      groups.push(themeColorPresets(activeTheme, resolvedMode));
    }
    if (showCollaboratorColors) {
      groups.push(collaboratorColorPresets(activeTheme, resolvedMode));
    }
    return groups.concat(presetGroups ?? []);
  }, [
    activeTheme,
    presetGroups,
    presets,
    resolvedMode,
    showCollaboratorColors,
    showPresets,
    showThemeColors,
  ]);
  /* Each row's heading names its own swatches, so the ids must not collide. */
  const rowIdPrefix = useId();

  const setFromText = (entry: string) => {
    setText(entry);
    if (isColor(entry)) {
      const next = rgbToHsv(toRgb(entry));
      own.current = true;
      setHsv(next);
      onChange?.(toHex(toRgb(entry)));
    }
  };

  const nudge = (event: React.KeyboardEvent, axis: "s" | "v" | "h") => {
    const step = event.shiftKey ? 10 : 1;
    const back = event.key === "ArrowLeft" || event.key === "ArrowDown";
    const forward = event.key === "ArrowRight" || event.key === "ArrowUp";
    if (!back && !forward) {
      return;
    }
    event.preventDefault();
    const by = forward ? step : -step;
    const limit = axis === "h" ? 360 : 100;
    announce({ ...hsv, [axis]: clamp(hsv[axis] + by, 0, limit) } as HSV);
  };

  const handle = {
    position: "absolute" as const,
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "2px solid #ffffff",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.35)",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none" as const,
  };

  return (
    <Box
      role="group"
      aria-label={ariaLabel}
      sx={{ display: "grid", gap: 2, width, minWidth: 0 }}
    >
      {/* Saturation across, brightness up: the hue itself under two gradients. */}
      <Box
        ref={field.ref}
        role="slider"
        tabIndex={0}
        aria-label="Saturation and brightness"
        aria-valuetext={`saturation ${Math.round(hsv.s)}%, brightness ${Math.round(hsv.v)}%`}
        onPointerDown={field.onPointerDown}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
          nudge(
            event,
            event.key === "ArrowUp" || event.key === "ArrowDown" ? "v" : "s",
          )
        }
        sx={{
          position: "relative",
          height: FIELD_HEIGHT,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "var(--borderColor-default)",
          cursor: "crosshair",
          touchAction: "none",
          backgroundColor: toHex(hsvToRgb({ h: hsv.h, s: 100, v: 100 })),
          backgroundImage:
            "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
          "&:focus-visible": {
            outline: "2px solid var(--borderColor-accent-emphasis)",
            outlineOffset: "1px",
          },
        }}
      >
        <Box
          sx={{
            ...handle,
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`,
            backgroundColor: hex,
          }}
        />
      </Box>

      {/* The hue rail. */}
      <Box
        ref={rail.ref}
        role="slider"
        tabIndex={0}
        aria-label="Hue"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={Math.round(hsv.h)}
        onPointerDown={rail.onPointerDown}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
          nudge(event, "h")
        }
        sx={{
          position: "relative",
          height: RAIL_HEIGHT,
          borderRadius: 6,
          border: "1px solid",
          borderColor: "var(--borderColor-default)",
          cursor: "ew-resize",
          touchAction: "none",
          backgroundImage:
            "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
          "&:focus-visible": {
            outline: "2px solid var(--borderColor-accent-emphasis)",
            outlineOffset: "1px",
          },
        }}
      >
        <Box
          sx={{
            ...handle,
            left: `${(hsv.h / 360) * 100}%`,
            top: "50%",
            backgroundColor: toHex(hsvToRgb({ h: hsv.h, s: 100, v: 100 })),
          }}
        />
      </Box>

      {showInput ? (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            aria-hidden="true"
            sx={{
              width: 28,
              height: 28,
              flex: "0 0 auto",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "var(--borderColor-default)",
              backgroundColor: hex,
            }}
          />
          <TextInput
            aria-label="Colour, as hex"
            value={text}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFromText(event.target.value)
            }
            onBlur={() => setText(hex)}
            size="small"
            sx={{ flex: "1 1 auto", fontFamily: "mono" }}
            validationStatus={isColor(text) ? undefined : "error"}
          />
        </Box>
      ) : null}

      {rows.map((row) => (
        <Box key={row.label}>
          <Text
            id={`${rowIdPrefix}-${row.label}`}
            sx={{
              fontSize: 0,
              color: "var(--fgColor-muted)",
              display: "block",
              mb: 1,
            }}
          >
            {row.label}
          </Text>
          <Box
            role="group"
            aria-labelledby={`${rowIdPrefix}-${row.label}`}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(22px, 1fr))",
              gap: 1,
            }}
          >
            {row.colors.map((preset, index) => {
              const chosen = preset.toLowerCase() === hex.toLowerCase();
              return (
                <Box
                  key={`${preset}-${index}`}
                  as="button"
                  type="button"
                  aria-label={preset}
                  aria-pressed={chosen}
                  onClick={() => setFromText(preset)}
                  sx={{
                    height: 22,
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor: preset,
                    border: "1px solid",
                    borderColor: chosen
                      ? "var(--borderColor-accent-emphasis)"
                      : "var(--borderColor-default)",
                    boxShadow: chosen
                      ? "inset 0 0 0 2px var(--bgColor-default)"
                      : "none",
                    "&:focus-visible": {
                      outline: "2px solid var(--borderColor-accent-emphasis)",
                      outlineOffset: "1px",
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ColorPicker;
