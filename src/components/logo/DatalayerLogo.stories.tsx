/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@primer/react";
import {
  DatalayerLogo,
  DatalayerLogoText,
  DatalayerText,
  DatalayerTextAI,
  themeConfigs,
  themeVariants,
} from "../..";

const meta = {
  title: "Components/DatalayerLogo",
  component: DatalayerLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      options: themeVariants,
      control: "select",
    },
    colorMode: {
      options: ["light", "dark", "auto"],
      control: "radio",
    },
  },
  args: {
    size: 64,
    variant: "datalayer",
    colorMode: "light",
    gradient: false,
  },
} satisfies Meta<typeof DatalayerLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The square mark, in a theme's colours. */
export const Logo: Story = {
  render: (args) => (
    <Box p={3} bg="canvas.default">
      <DatalayerLogo {...args} />
    </Box>
  ),
};

/** The mark with gradients. */
export const Gradient: Story = {
  args: {
    gradient: true,
    variant: "loop",
  },
  render: (args) => (
    <Box p={3} bg="canvas.default">
      <DatalayerLogo {...args} />
    </Box>
  ),
};

/** The mark beside the wordmark, and the wordmark with the AI glyph. */
export const LogoTextAndTextAI: Story = {
  args: {
    size: 32,
  },
  render: (args) => (
    <Box
      p={3}
      bg="canvas.default"
      sx={{ display: "grid", gap: 4, justifyItems: "start" }}
    >
      <DatalayerLogoText
        size={args.size}
        variant={args.variant}
        colorMode={args.colorMode}
      />
      <DatalayerLogoText
        size={args.size}
        variant={args.variant}
        colorMode={args.colorMode}
        inverse
      />
      <DatalayerTextAI
        size={args.size}
        variant={args.variant}
        colorMode={args.colorMode}
      />
    </Box>
  ),
};

/** The bare wordmark: an SVG group, placed in an SVG of the host's own. */
export const Wordmark: Story = {
  render: () => (
    <Box p={3} bg="canvas.default">
      <svg
        viewBox="0 0 124.672 25"
        height={50}
        role="img"
        aria-label="Datalayer"
      >
        <DatalayerText x={-12} />
      </svg>
    </Box>
  ),
};

/** The mark in every theme. */
export const AllThemes: Story = {
  args: {
    size: 48,
  },
  render: (args) => (
    <Box
      p={3}
      bg="canvas.default"
      sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
    >
      {themeVariants.map((variant) => (
        <Box
          key={variant}
          sx={{ display: "grid", gap: 1, justifyItems: "center" }}
        >
          <DatalayerLogo
            size={args.size}
            variant={variant}
            colorMode={args.colorMode}
            gradient={args.gradient}
          />
          <Text sx={{ fontSize: 0, color: "fg.muted" }}>
            {themeConfigs[variant].label}
          </Text>
        </Box>
      ))}
    </Box>
  ),
};
