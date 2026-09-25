/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Who is who, in colour.
 *
 * A shared document gives every person a colour: their cursor, their
 * selection, the ring on their avatar. Those colours were fixed hex values
 * in each application that needed them — JupyterLab's seven
 * `--jp-collaborator-color*`, and a pair typed into an editor example — so a
 * page in the Sand theme drew its collaborators in the same seven colours as
 * a page in Matrix.
 *
 * They come from the active theme instead. Each theme already carries a
 * **bright palette**: seven vivid, well-separated colours meant to sit on
 * that theme's surfaces, in a light and a dark reading. Those are the
 * collaborator colours, ordered here so that neighbouring people get
 * different hue families rather than two greens.
 *
 * Two rules the colours have to keep, and this module keeps them:
 *
 * - **A person holds their colour.** {@link collaboratorColor} picks by a
 *   stable hash of who they are, so a name always lands on the same slot for
 *   everyone in the room, with no server handing numbers out.
 * - **Nobody is invisible.** The bright palettes are vivid in both readings,
 *   so a cursor stays visible on a light page and on a dark one.
 *
 * @module components/appearance/CollaboratorPalette
 */

import { useMemo } from "react";
import { Box, Text } from "@primer/react";
import {
  getBrightPalette,
  type BrightPalette,
  type ThemeVariant,
} from "../../theme/themeRegistry";
import { useThemeStore } from "../../theme/useThemeStore";
import { useSystemColorMode } from "../../theme/useSystemColorMode";

/**
 * Which of the bright palette's colours a collaborator can be given, in the
 * order they are handed out.
 *
 * Interleaved on purpose: green, red, blue, yellow, cyan, orange, lime, so
 * the second person in a room is never a near-neighbour of the first.
 * `onGlow` is not here — it is a text colour, not a hue.
 */
export const COLLABORATOR_SLOTS = [
  "glow",
  "blaze",
  "surge",
  "gold",
  "pop",
  "flame",
  "spark",
] as const satisfies readonly (keyof BrightPalette)[];

/** How many colours a room can hand out before it repeats one. */
export const COLLABORATOR_COLOR_COUNT = COLLABORATOR_SLOTS.length;

/** The collaborator colours of one theme, in one colour mode. */
export function collaboratorColors(
  variant: ThemeVariant = "datalayer",
  colorMode: "light" | "dark" | "auto" = "dark",
): string[] {
  const bright = getBrightPalette(variant, colorMode);
  return COLLABORATOR_SLOTS.map((slot) => bright[slot] as string);
}

/**
 * A number from a string, stable across machines and runs.
 *
 * djb2: small, and — unlike anything built on iteration order or `Math.random`
 * — it gives every browser in the room the same answer for the same person,
 * which is the whole point.
 */
export function collaboratorHash(seed: string): number {
  let hash = 5381;
  for (let index = 0; index < seed.length; index += 1) {
    hash = ((hash << 5) + hash + seed.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

/**
 * The colour this person holds: the same one, everywhere, every session.
 *
 * `seed` should be whatever identifies them to the room — a user id where
 * there is one, their handle otherwise.
 */
export function collaboratorColor(
  seed: string,
  variant: ThemeVariant = "datalayer",
  colorMode: "light" | "dark" | "auto" = "dark",
): string {
  const colors = collaboratorColors(variant, colorMode);
  return colors[collaboratorHash(seed) % colors.length];
}

/**
 * The palette as CSS custom properties.
 *
 * JupyterLab reads `--jp-collaborator-color1` through `7`; anything of ours
 * can read `--dla-collaborator-color1` through `7`. Both names carry the same
 * colours, so a JupyterLab surface and a Primer surface in the same page
 * agree on who is who.
 */
export function collaboratorColorVars(
  variant: ThemeVariant = "datalayer",
  colorMode: "light" | "dark" | "auto" = "dark",
): Record<string, string> {
  const colors = collaboratorColors(variant, colorMode);
  const vars: Record<string, string> = {};
  colors.forEach((color, index) => {
    vars[`--jp-collaborator-color${index + 1}`] = color;
    vars[`--dla-collaborator-color${index + 1}`] = color;
  });
  return vars;
}

/** The collaborator colours of whichever theme is on, following the store. */
export function useCollaboratorColors(): string[] {
  const { theme, colorMode } = useThemeStore();
  const systemMode = useSystemColorMode();
  const resolved = colorMode === "auto" ? systemMode : colorMode;
  return useMemo(
    () => collaboratorColors(theme, resolved),
    [theme, resolved],
  );
}

/** One person's colour, in whichever theme is on. */
export function useCollaboratorColor(seed: string): string {
  const colors = useCollaboratorColors();
  return colors[collaboratorHash(seed) % colors.length];
}

export interface CollaboratorPaletteProps {
  /**
   * People to colour, in the order they joined. Named, the swatch is theirs
   * and is picked by hash; unnamed, the palette is shown slot by slot.
   */
  people?: readonly string[];
  /** The theme to read. The active one by default. */
  variant?: ThemeVariant;
  /** The mode to read. The active one by default. */
  colorMode?: "light" | "dark" | "auto";
  /** Show the hex value under each swatch. */
  showValues?: boolean;
  /** How tall each swatch stands, in pixels. */
  height?: number;
}

/**
 * The palette, drawn.
 *
 * A row of swatches — one per collaborator colour, or one per named person —
 * for a settings page, a room's roster, or the gallery.
 */
export function CollaboratorPalette({
  people,
  variant,
  colorMode,
  showValues = true,
  height = 44,
}: CollaboratorPaletteProps) {
  const store = useThemeStore();
  const systemMode = useSystemColorMode();
  const activeMode = colorMode ?? store.colorMode;
  const resolved = activeMode === "auto" ? systemMode : activeMode;
  const colors = collaboratorColors(variant ?? store.theme, resolved);

  const entries = people?.length
    ? people.map((person) => ({
        key: person,
        label: person,
        color: colors[collaboratorHash(person) % colors.length],
      }))
    : colors.map((color, index) => ({
        key: `${index}`,
        label: `Collaborator ${index + 1}`,
        color,
      }));

  return (
    <Box
      role="list"
      aria-label="Collaborator colours"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
        gap: 2,
      }}
    >
      {entries.map((entry) => (
        <Box
          key={entry.key}
          role="listitem"
          sx={{
            display: "grid",
            gap: 1,
            border: "1px solid",
            borderColor: "var(--borderColor-default)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box style={{ backgroundColor: entry.color, height }} />
          <Box sx={{ px: 2, pb: 2, display: "grid", gap: 1 }}>
            <Text
              sx={{
                fontSize: 0,
                color: "var(--fgColor-default)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={entry.label}
            >
              {entry.label}
            </Text>
            {showValues ? (
              <Text
                sx={{
                  fontSize: 0,
                  fontFamily: "mono",
                  color: "var(--fgColor-muted)",
                }}
              >
                {entry.color}
              </Text>
            ) : null}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default CollaboratorPalette;
