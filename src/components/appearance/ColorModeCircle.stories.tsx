/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@primer/react";
import {
  AppearanceControls,
  ColorModeCircle,
  ColorModeCircleProps,
  themeVariants,
  type ColorMode,
  type ThemeVariant,
} from "../..";

const meta = {
  title: "Components/Appearance/ColorModeCircle",
  component: ColorModeCircle,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    colorMode: {
      options: ["light", "dark", "auto"],
      control: "radio",
    },
    themeVariant: {
      options: themeVariants,
      control: "select",
    },
    shape: {
      options: ["square", "circle"],
      control: "radio",
    },
    hoverOverlayPlacement: {
      options: ["bottom-start", "bottom-end", "right-start"],
      control: "radio",
    },
    hoverOverlay: {
      control: false,
    },
  },
  args: {
    colorMode: "light",
    themeVariant: "datalayer",
    onColorModeChange: (mode: ColorMode) => console.log("Color mode:", mode),
    size: 28,
    shape: "square",
    cycleOnClick: true,
  },
} satisfies Meta<typeof ColorModeCircle>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Holds the mode, so clicking cycles it. */
const ThemedColorModeCircle = ({
  withOverlay = false,
  ...props
}: ColorModeCircleProps & { withOverlay?: boolean }) => {
  const [colorMode, setColorMode] = useState<ColorMode>(props.colorMode);
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(
    props.themeVariant ?? "datalayer",
  );
  useEffect(() => setColorMode(props.colorMode), [props.colorMode]);
  useEffect(
    () => setThemeVariant(props.themeVariant ?? "datalayer"),
    [props.themeVariant],
  );
  const onColorModeChange = (mode: ColorMode) => {
    setColorMode(mode);
    props.onColorModeChange(mode);
  };
  return (
    <Box p={3} bg="canvas.default" minHeight={withOverlay ? 360 : undefined}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <ColorModeCircle
          {...props}
          colorMode={colorMode}
          themeVariant={themeVariant}
          onColorModeChange={onColorModeChange}
          hoverOverlay={
            withOverlay ? (
              <AppearanceControls
                colorMode={colorMode}
                themeVariant={themeVariant}
                onColorModeChange={onColorModeChange}
                onThemeChange={setThemeVariant}
              />
            ) : undefined
          }
        />
        <Text sx={{ fontSize: 1, color: "fg.muted" }}>
          {withOverlay
            ? `Hover to reveal the appearance controls (${colorMode}).`
            : `Click to cycle light → dark → auto (now ${colorMode}).`}
        </Text>
      </Box>
    </Box>
  );
};

/** Click to cycle the colour mode. */
export const Default: Story = {
  render: (args) => <ThemedColorModeCircle {...args} />,
};

/** The round shape, larger. */
export const Circle: Story = {
  args: {
    shape: "circle",
    size: 36,
  },
  render: (args) => <ThemedColorModeCircle {...args} />,
};

/** Hovering reveals an overlay — here the appearance controls; clicking no longer cycles. */
export const WithHoverOverlay: Story = {
  args: {
    cycleOnClick: false,
    hoverOverlayPlacement: "bottom-start",
  },
  render: (args) => <ThemedColorModeCircle {...args} withOverlay />,
};
