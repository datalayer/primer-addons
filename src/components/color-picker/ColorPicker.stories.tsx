/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@primer/react";
import { ColorPicker, ColorPickerProps } from "../..";

const meta = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    presets: { control: false },
    presetGroups: { control: false },
  },
  args: {
    color: "#0969da",
    showPresets: true,
    showThemeColors: true,
    showCollaboratorColors: false,
    showInput: true,
    "aria-label": "Colour",
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Holds the colour and shows it beside the picker. */
const ThemedColorPicker = (props: ColorPickerProps) => {
  const [color, setColor] = useState(props.color);
  useEffect(() => setColor(props.color), [props.color]);
  return (
    <Box
      p={3}
      bg="canvas.default"
      sx={{
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    >
      <ColorPicker
        {...props}
        color={color}
        onChange={(next) => {
          setColor(next);
          props.onChange?.(next);
        }}
      />
      <Box sx={{ display: "grid", gap: 2, minWidth: 160 }}>
        <Box
          sx={{
            height: 72,
            borderRadius: "var(--theme-radius-card)",
            border: "1px solid",
            borderColor: "border.default",
          }}
          style={{ backgroundColor: color }}
        />
        <Text sx={{ fontFamily: "mono", fontSize: 1 }}>{color}</Text>
      </Box>
    </Box>
  );
};

/** The field, the hue rail, the hex input, the neutral presets and the theme's own colours. */
export const Default: Story = {
  render: (args) => <ThemedColorPicker {...args} />,
};

/** With the colours a room gives its collaborators as a further row. */
export const WithCollaboratorColors: Story = {
  args: {
    showCollaboratorColors: true,
  },
  render: (args) => <ThemedColorPicker {...args} />,
};

/** Rows of your own, each with a heading. */
export const CustomPresetGroups: Story = {
  args: {
    color: "#16a085",
    showThemeColors: false,
    presetGroups: [
      { label: "Brand", colors: ["#16a085", "#1abc9c", "#2c3e50", "#f1c40f"] },
      {
        label: "Charts",
        colors: ["#4c78a8", "#f58518", "#e45756", "#72b7b2", "#54a24b"],
      },
    ],
  },
  render: (args) => <ThemedColorPicker {...args} />,
};

/** The field and the rail only, narrower. */
export const Minimal: Story = {
  args: {
    color: "#bf3989",
    showPresets: false,
    showThemeColors: false,
    showInput: false,
    width: 200,
  },
  render: (args) => <ThemedColorPicker {...args} />,
};
