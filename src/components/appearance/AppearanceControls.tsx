/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState, type ReactElement } from "react";
import { Button, IconButton, SegmentedControl, Tooltip } from "@primer/react";
import {
  CircleIcon as SwatchIcon,
  DeviceDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@primer/octicons-react";
import type { StoreApi, UseBoundStore } from "zustand";
import { Box } from "../box/Box";
import { useThemeStore, type ThemeState } from "../../theme/useThemeStore";
import {
  themeVariants,
  themeConfigs,
  type ColorMode,
  type ThemeVariant,
} from "../../theme";
import { ThemePreviewCard } from "./ThemePreviewCard";
import { ThemePalettePreview } from "./ThemePalettePreview";

/**
 * How the controls are laid out:
 * - `stacked` — the light / dark / auto switch centred above the theme
 *   swatches (lines of `themesPerLine`), optionally the chosen theme's
 *   preview under them: the appearance menu's panel.
 * - `inline` — one row: a small round button per theme, then the switch: a
 *   page header's trailing controls.
 */
export type AppearanceControlsLayout = "stacked" | "inline";

export interface AppearanceControlsProps {
  /**
   * Read and write the theme store, on by default; `false` to drive the
   * controls from `colorMode`, `themeVariant` and the two callbacks alone.
   */
  withStore?: boolean;
  /** The store read and written with `withStore`: the shared one by default. */
  useStore?: UseBoundStore<StoreApi<ThemeState>>;
  /**
   * With the store, whether choosing a theme also switches to its default
   * colour mode. Off by default: a person who chose dark keeps dark.
   */
  applyThemeColorMode?: boolean;
  /** The colour mode shown; required without the store, the store's otherwise. */
  colorMode?: ColorMode;
  /** The theme shown; required without the store, the store's otherwise. */
  themeVariant?: ThemeVariant;
  /** Called on a new colour mode; required without the store, called after it with the store. */
  onColorModeChange?: (mode: ColorMode) => void;
  /** Called on a new theme; required without the store, called after it with the store. */
  onThemeChange?: (theme: ThemeVariant) => void;
  /** `stacked` by default; see {@link AppearanceControlsLayout}. */
  layout?: AppearanceControlsLayout;
  /** Show the light / dark / auto switch. Default: shown. */
  showColorMode?: boolean;
  /** Show the theme chooser. Default: shown. */
  showThemeChooser?: boolean;
  /** Stacked, with the chooser: the chosen theme's name, description and preview under its swatches. Default: swatches only. */
  showThemePreviews?: boolean;
  /**
   * Stacked: the most theme swatches on one line; every line is centred, so
   * a shorter last line sits in the middle under the full ones. Undefined,
   * they wrap freely to the width given.
   */
  themesPerLine?: number;
}

export function AppearanceControls({
  withStore = true,
  useStore = useThemeStore,
  applyThemeColorMode = false,
  colorMode: givenColorMode,
  themeVariant: givenThemeVariant,
  onColorModeChange: givenOnColorModeChange,
  onThemeChange: givenOnThemeChange,
  layout = "stacked",
  showColorMode = true,
  showThemeChooser = true,
  showThemePreviews = false,
  themesPerLine,
}: AppearanceControlsProps): ReactElement {
  // The store is read whatever `withStore` says: a hook is called on every render.
  const storeColorMode = useStore((state) => state.colorMode);
  const storeTheme = useStore((state) => state.theme);
  let colorMode: ColorMode;
  let themeVariant: ThemeVariant;
  let onColorModeChange: (mode: ColorMode) => void;
  let onThemeChange: (theme: ThemeVariant) => void;
  if (withStore) {
    colorMode = storeColorMode;
    themeVariant = storeTheme;
    onColorModeChange = (mode) => {
      useStore.getState().setColorMode(mode);
      givenOnColorModeChange?.(mode);
    };
    onThemeChange = (theme) => {
      useStore.getState().setTheme(theme, applyThemeColorMode);
      givenOnThemeChange?.(theme);
    };
  } else {
    if (
      givenColorMode === undefined ||
      givenThemeVariant === undefined ||
      !givenOnColorModeChange ||
      !givenOnThemeChange
    ) {
      throw new Error(
        "AppearanceControls without the store needs colorMode, themeVariant, onColorModeChange and onThemeChange.",
      );
    }
    colorMode = givenColorMode;
    themeVariant = givenThemeVariant;
    onColorModeChange = givenOnColorModeChange;
    onThemeChange = givenOnThemeChange;
  }

  // At most `themesPerLine` swatches on a line when given, each line centred,
  // so a shorter last line sits in the middle under the full ones; one line
  // wrapping freely otherwise. Explicit lines rather than a width: the
  // tooltips' hidden siblings take gaps of their own.
  const swatchLines: ThemeVariant[][] =
    themesPerLine !== undefined && themesPerLine > 0
      ? Array.from(
          { length: Math.ceil(themeVariants.length / themesPerLine) },
          (_, line) =>
            themeVariants.slice(
              line * themesPerLine,
              (line + 1) * themesPerLine,
            ),
        )
      : [[...themeVariants]];
  const swatchRow = { display: "grid", rowGap: 2 };
  const swatchLine = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 2,
  };
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const selectedTheme = themeConfigs[themeVariant];

  const colorModeSwitch = (
    <SegmentedControl
      aria-label="Color mode"
      size="small"
      onChange={(index: number) => {
        const modes: ColorMode[] = ["light", "dark", "auto"];
        onColorModeChange(modes[index]);
      }}
    >
      <SegmentedControl.IconButton
        selected={colorMode === "light"}
        icon={SunIcon}
        aria-label="Light"
      />
      <SegmentedControl.IconButton
        selected={colorMode === "dark"}
        icon={MoonIcon}
        aria-label="Dark"
      />
      <SegmentedControl.IconButton
        selected={colorMode === "auto"}
        icon={DeviceDesktopIcon}
        aria-label="Auto"
      />
    </SegmentedControl>
  );

  if (layout === "inline") {
    // One row, as a page header carries it: a round button per theme, then the switch.
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        {showThemeChooser ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {themeVariants.map((variant) => {
              const cfg = themeConfigs[variant];
              const isSelected = themeVariant === variant;
              return (
                <Tooltip key={variant} text={cfg.label} direction="s">
                  <IconButton
                    aria-label={cfg.label}
                    aria-pressed={isSelected}
                    icon={() => <SwatchIcon size={16} fill={cfg.brandColor} />}
                    size="small"
                    variant={isSelected ? "default" : "invisible"}
                    onClick={() => onThemeChange(variant)}
                    sx={{
                      border: isSelected ? "2px solid" : "1px solid",
                      borderColor: isSelected ? "accent.fg" : "border.muted",
                      borderRadius: "50%",
                    }}
                  />
                </Tooltip>
              );
            })}
          </Box>
        ) : null}
        {showColorMode ? colorModeSwitch : null}
      </Box>
    );
  }

  return (
    <>
      {showColorMode ? (
        <Box sx={{ px: 2, py: 2, display: "flex", justifyContent: "center" }}>
          {colorModeSwitch}
        </Box>
      ) : null}

      {!showThemeChooser ? null : showThemePreviews ? (
        <Box
          sx={{
            px: 2,
            // First in the controls when the colour mode is hidden.
            pt: showColorMode ? 0 : 2,
            pb: 2,
            display: "grid",
            gap: 2,
          }}
        >
          <Box
            sx={{
              ...swatchRow,
              gap: 2,
            }}
          >
            {swatchLines.map((line) => (
              <Box key={line.join()} sx={swatchLine}>
                {line.map((variant) => {
                  const cfg = themeConfigs[variant];
                  const isSelected = themeVariant === variant;
                  return (
                    <Tooltip
                      key={variant}
                      text={`${cfg.label} — ${cfg.description}`}
                      direction="s"
                    >
                      <Box
                        as="button"
                        aria-label={cfg.label}
                        aria-pressed={isSelected}
                        onClick={() => onThemeChange(variant)}
                        sx={{
                          width: 24,
                          height: 24,
                          flexShrink: 0,
                          borderRadius: "50%",
                          backgroundColor: cfg.brandColor,
                          border: "2px solid",
                          borderColor: isSelected
                            ? "accent.fg"
                            : "border.default",
                          cursor: "pointer",
                          padding: 0,
                          outline: "none",
                          transition: "border-color 0.15s ease",
                          boxShadow: isSelected
                            ? "0 0 0 2px var(--bgColor-accent-muted, rgba(9,105,218,0.3))"
                            : "none",
                          "&:hover": {
                            borderColor: "accent.fg",
                          },
                          "&:focus-visible": {
                            boxShadow:
                              "0 0 0 2px var(--bgColor-accent-muted, rgba(9,105,218,0.3))",
                          },
                        }}
                      />
                    </Tooltip>
                  );
                })}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              px: 1,
              display: "grid",
              gap: 1,
            }}
          >
            <Box
              sx={{ fontSize: 1, fontWeight: "semibold", color: "fg.default" }}
            >
              {selectedTheme.label}
            </Box>
            <Box sx={{ fontSize: 0, color: "fg.muted", lineHeight: 1.5 }}>
              {selectedTheme.description}
            </Box>
            {/* The theme's own button (13 November 2026). */}
            <Box sx={{ mt: 1 }}>
              <Button
                size="small"
                onClick={() => setIsPreviewOpen((open) => !open)}
                aria-expanded={isPreviewOpen}
                // The theme's control corner (Loop's pill), wherever the menu is drawn.
                sx={{ borderRadius: "var(--theme-radius-control, 6px)" }}
              >
                {isPreviewOpen ? "Hide preview" : "Show preview"}
              </Button>
            </Box>
          </Box>

          {isPreviewOpen ? (
            <>
              {/* Not `selected`: the sample stands on a neutral hairline,
                  not inside the accent's ring — the swatches above already
                  say which theme is chosen. */}
              <ThemePreviewCard
                variant={themeVariant}
                colorMode={colorMode}
                compact
                showDescription
              />
              {/* Under the card: the theme's colour palette and its accents. */}
              <ThemePalettePreview
                variant={themeVariant}
                colorMode={colorMode}
              />
            </>
          ) : null}
        </Box>
      ) : (
        <Box
          sx={{
            px: 2,
            // First in the controls when the colour mode is hidden.
            pt: showColorMode ? 0 : 2,
            pb: 2,
            // Narrow, the swatches go on a second line rather than shrink.
            ...swatchRow,
            gap: 2,
          }}
        >
          {swatchLines.map((line) => (
            <Box key={line.join()} sx={swatchLine}>
              {line.map((variant) => {
                const cfg = themeConfigs[variant];
                const isSelected = themeVariant === variant;
                return (
                  <Tooltip key={variant} text={cfg.label} direction="s">
                    <Box
                      as="button"
                      aria-label={cfg.label}
                      aria-pressed={isSelected}
                      onClick={() => onThemeChange(variant)}
                      sx={{
                        width: 24,
                        height: 24,
                        // A circle at any width: never squeezed into an oval.
                        flexShrink: 0,
                        borderRadius: "50%",
                        backgroundColor: cfg.brandColor,
                        border: "2px solid",
                        borderColor: isSelected
                          ? "accent.fg"
                          : "border.default",
                        cursor: "pointer",
                        padding: 0,
                        outline: "none",
                        transition: "border-color 0.15s ease",
                        boxShadow: isSelected
                          ? "0 0 0 2px var(--bgColor-accent-muted, rgba(9,105,218,0.3))"
                          : "none",
                        "&:hover": {
                          borderColor: "accent.fg",
                        },
                        "&:focus-visible": {
                          boxShadow:
                            "0 0 0 2px var(--bgColor-accent-muted, rgba(9,105,218,0.3))",
                        },
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}

export default AppearanceControls;
