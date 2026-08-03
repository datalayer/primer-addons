import { Box, Text } from "@primer/react";
import { ColorSwatch, useColorPalette } from "@datalayer/primer-addons";

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

export function ColorPaletteDemo() {
  const palette = useColorPalette();

  const paletteSwatches: Array<{ key: string; value: string }> = [
    { key: "bg", value: palette.bg },
    { key: "bgPanel", value: palette.bgPanel },
    { key: "bgAlt", value: palette.bgAlt },
    { key: "primary", value: palette.primary },
    { key: "secondary", value: palette.secondary },
    { key: "accent", value: palette.accent },
    { key: "glow", value: palette.glow },
    { key: "pop", value: palette.pop },
    { key: "spark", value: palette.spark },
    { key: "blaze", value: palette.blaze },
    { key: "surge", value: palette.surge },
    { key: "flame", value: palette.flame },
    { key: "gold", value: palette.gold },
    { key: "textLight", value: palette.textLight },
    { key: "textMuted", value: palette.textMuted },
  ];

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
        <Text sx={{ fontWeight: 600, fontSize: 2 }}>Primer addons palette</Text>
        <Text as="p" sx={{ m: 0, color: "fg.muted" }}>
          Theme-aware palette from useColorPalette (follows the active theme and
          color mode).
        </Text>
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
          {paletteSwatches.map((swatch) => (
            <ColorSwatch
              key={swatch.key}
              color={swatch.value}
              label={swatch.key}
            />
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
