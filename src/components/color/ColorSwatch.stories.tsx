/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@primer/react";
import { ColorSwatch, ColorSwatchProps } from "../..";

const meta = {
  title: "Components/ColorSwatch",
  component: ColorSwatch,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    color: "var(--bgColor-accent-emphasis)",
    label: "Accent",
    showValue: true,
    height: 54,
  },
} satisfies Meta<typeof ColorSwatch>;

export default meta;

type Story = StoryObj<typeof meta>;

const ThemedColorSwatch = (props: ColorSwatchProps) => (
  <Box p={3} bg="canvas.default">
    <Box maxWidth={200}>
      <ColorSwatch {...props} />
    </Box>
  </Box>
);

/** A theme variable: the value under it is read from the page, so it follows the theme. */
export const ThemeToken: Story = {
  render: (args) => <ThemedColorSwatch {...args} />,
};

/** A fixed colour, shorter. */
export const FixedColour: Story = {
  args: {
    color: "#7ad7b1",
    label: "A fixed colour",
    height: 32,
  },
  render: (args) => <ThemedColorSwatch {...args} />,
};

/** Without its value. */
export const WithoutValue: Story = {
  args: {
    color: "var(--fgColor-default)",
    label: "Foreground",
    showValue: false,
  },
  render: (args) => <ThemedColorSwatch {...args} />,
};

/** The theme's emphasis colours in a row. */
export const Palette: Story = {
  render: (args) => (
    <Box
      p={3}
      bg="canvas.default"
      sx={{
        display: "grid",
        gridTemplateColumns: ["repeat(2, 1fr)", "repeat(4, 1fr)"],
        gap: 2,
      }}
    >
      {[
        ["var(--bgColor-accent-emphasis)", "Accent"],
        ["var(--bgColor-success-emphasis)", "Success"],
        ["var(--bgColor-attention-emphasis)", "Attention"],
        ["var(--bgColor-danger-emphasis)", "Danger"],
      ].map(([color, label]) => (
        <ColorSwatch
          key={label}
          color={color}
          label={label}
          showValue={args.showValue}
          height={args.height}
        />
      ))}
    </Box>
  ),
};
