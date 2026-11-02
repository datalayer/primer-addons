/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { Box, Text } from "@primer/react";
import {
  ColorSwatch,
  hueNames,
  paletteRoleNames,
  useColorPalette,
} from "@datalayer/primer-addons";
import { ExampleCode } from "./BoxDemo";

type TokenGroup = {
  name: string;
  tokens: string[];
};

// Primer functional (semantic) color tokens emitted by the addons theme.
// Each swatch resolves its value at runtime from a CSS custom property, so the
// colors follow the active theme and color mode.
const FUNCTIONAL_GROUPS: TokenGroup[] = [
  {
    name: "Foreground",
    tokens: [
      "--fgColor-default",
      "--fgColor-muted",
      "--fgColor-onEmphasis",
      "--fgColor-accent",
      "--fgColor-success",
      "--fgColor-attention",
      "--fgColor-severe",
      "--fgColor-danger",
      "--fgColor-done",
      "--fgColor-link",
    ],
  },
  {
    name: "Background",
    tokens: [
      "--bgColor-default",
      "--bgColor-inset",
      "--bgColor-muted",
      "--bgColor-accent-emphasis",
      "--bgColor-accent-muted",
      "--bgColor-success-emphasis",
      "--bgColor-success-muted",
      "--bgColor-attention-emphasis",
      "--bgColor-attention-muted",
      "--bgColor-severe-emphasis",
      "--bgColor-severe-muted",
      "--bgColor-danger-emphasis",
      "--bgColor-danger-muted",
      "--bgColor-done-emphasis",
      "--bgColor-done-muted",
    ],
  },
  {
    name: "Border",
    tokens: [
      "--borderColor-default",
      "--borderColor-muted",
      "--borderColor-accent-emphasis",
      "--borderColor-accent-muted",
      "--borderColor-success-emphasis",
      "--borderColor-success-muted",
      "--borderColor-attention-emphasis",
      "--borderColor-attention-muted",
      "--borderColor-severe-emphasis",
      "--borderColor-severe-muted",
      "--borderColor-danger-emphasis",
      "--borderColor-danger-muted",
      "--borderColor-done-emphasis",
      "--borderColor-done-muted",
    ],
  },
];

function TokenGroupRow({ name, tokens }: TokenGroup) {
  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Text sx={{ fontWeight: 600 }}>{name}</Text>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: [
            "repeat(2, minmax(0, 1fr))",
            "repeat(5, minmax(0, 1fr))",
          ],
          gap: 2,
        }}
      >
        {tokens.map((token) => (
          <ColorSwatch key={token} color={`var(${token})`} label={token} />
        ))}
      </Box>
    </Box>
  );
}

const SWATCH_GRID = {
  display: "grid",
  gridTemplateColumns: ["repeat(2, minmax(0, 1fr))", "repeat(5, minmax(0, 1fr))"],
  gap: 2,
};

const PALETTE_EXAMPLE = `import { useColorPalette } from '@datalayer/primer-addons';

const palette = useColorPalette();
palette.primary;  // a role, e.g. the theme's brand green
palette.indigo;   // a hue, deep in light mode, bright in dark
palette.isLight;  // true in light mode`;

const ROLES_EXAMPLE = `const palette = useColorPalette();

<Box style={{ background: palette.bgPanel, color: palette.textLight }}>
  <Text style={{ color: palette.primary }}>Title</Text>
  <Text style={{ color: palette.textMuted }}>Caption</Text>
</Box>`;

const HUES_EXAMPLE = `import {
  isHexColor,
  isPaletteColorName,
  resolvePaletteColor,
  useColorPalette,
  usePaletteColor,
} from '@datalayer/primer-addons';

// In a component: one function, renewed when the theme or mode changes.
const colorOf = usePaletteColor();
const agentColor = colorOf(agent.color) ?? 'var(--fgColor-accent)';
// 'indigo' -> the theme's indigo, '#0969da' -> '#0969da', 'nope' -> undefined

// With a palette in hand (several lookups, or outside a hook).
const palette = useColorPalette();
resolvePaletteColor('teal', palette);

// Validate a spec's value before saving it.
isPaletteColorName('rose');  // true
isHexColor('#abc');          // true (#RGB or #RRGGBB)`;

export function ColorPaletteDemo() {
  const palette = useColorPalette();

  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      <Box>
        <Text as="p" sx={{ m: 0, color: "fg.muted" }}>
          The Datalayer addons theme palette and Primer functional color tokens.
          Every swatch resolves its value at runtime, so colors follow the
          active theme and color mode.
        </Text>
      </Box>

      <Box sx={{ display: "grid", gap: 2 }}>
        <Text sx={{ fontWeight: 600, fontSize: 2 }}>useColorPalette</Text>
        <Text as="p" sx={{ m: 0, color: "fg.muted" }}>
          <code>useColorPalette()</code> returns one <code>ColorPalette</code>{" "}
          object, resolved for the current theme and color mode, and a new one
          when either changes. It holds two categories of colors, both shown
          below, and <code>isLight</code>, whether the mode is light:
        </Text>
        <Box as="ul" sx={{ m: 0, pl: 4, color: "fg.muted" }}>
          <li>
            <strong>Roles</strong> (<code>paletteRoleNames</code>, type{" "}
            <code>PaletteRoleName</code>): <code>{paletteRoleNames.join(", ")}</code>.
            What a role is changes with the theme: <code>surge</code> is blue
            in one theme and sage in another. Use them for a page&apos;s own
            design.
          </li>
          <li>
            <strong>Hues</strong> (<code>hueNames</code>, type{" "}
            <code>HueName</code>): <code>{hueNames.join(", ")}</code>. A hue
            keeps its hue in every theme. Use them for a color that a spec or
            a person picks, such as an agent&apos;s color.
          </li>
        </Box>
        <ExampleCode code={PALETTE_EXAMPLE} />
      </Box>

      <Box sx={{ display: "grid", gap: 2 }}>
        <Text sx={{ fontWeight: 600, fontSize: 2 }}>Roles</Text>
        <Text sx={{ m: 0, fontSize: 1, fontStyle: "italic" }}>what each theme&apos;s own design uses, by role</Text>
        <Text as="p" sx={{ m: 0, color: "fg.muted" }}>
          The colors of a page&apos;s own design, read as{" "}
          <code>palette.primary</code>, <code>palette.bgPanel</code>…: what each
          is changes with the theme and the color mode.
        </Text>
        <ExampleCode code={ROLES_EXAMPLE} />
        <Box sx={SWATCH_GRID}>
          {paletteRoleNames.map((name) => (
            <ColorSwatch key={name} color={palette[name]} label={name} />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "grid", gap: 2 }}>
        <Text sx={{ fontWeight: 600, fontSize: 2 }}>Hues</Text>
        <Text sx={{ m: 0, fontSize: 1, fontStyle: "italic" }}>named colors a spec or a person picks, the same names in every theme</Text>
        <Text as="p" sx={{ m: 0, color: "fg.muted" }}>
          A colour named by its hue keeps its hue in every theme: deep on a
          light background, bright on a dark one. A spec names its colour by
          any name of this page (an agent&apos;s <code>color: indigo</code>),
          or by a hex where no name fits. Resolve it with{" "}
          <code>usePaletteColor()(name)</code> in a component, or{" "}
          <code>resolvePaletteColor(name, palette)</code> with a palette in
          hand: a palette name gives its value in the current theme and mode, a
          hex is returned as is, anything else is <code>undefined</code> (draw
          your own default). <code>isPaletteColorName</code> and{" "}
          <code>isHexColor</code> check a value first.
        </Text>
        <ExampleCode code={HUES_EXAMPLE} />
        <Box sx={SWATCH_GRID}>
          {hueNames.map((name) => (
            <ColorSwatch key={name} color={palette[name]} label={name} />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "grid", gap: 3 }}>
        <Text sx={{ fontWeight: 600, fontSize: 2 }}>Functional colors</Text>
        {FUNCTIONAL_GROUPS.map((group) => (
          <TokenGroupRow
            key={group.name}
            name={group.name}
            tokens={group.tokens}
          />
        ))}
      </Box>
    </Box>
  );
}
