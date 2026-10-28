/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@primer/react";
import {
  AppearanceMenu,
  AppearanceMenuProps,
  AppearanceMenuWithStore,
  DatalayerThemeProvider,
  ThemedProvider,
  themeConfigs,
  themeVariants,
  useThemeStore,
  type ColorMode,
  type ThemeVariant,
} from "../..";

const meta = {
  title: "Components/Appearance/AppearanceMenu",
  component: AppearanceMenu,
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
  },
  args: {
    colorMode: "light",
    themeVariant: "datalayer",
    onColorModeChange: (mode: ColorMode) => console.log("Color mode:", mode),
    onThemeChange: (variant: ThemeVariant) => console.log("Theme:", variant),
    size: 26,
    shape: "square",
    hoverOverlayPlacement: "bottom-start",
    showThemePreviews: true,
  },
} satisfies Meta<typeof AppearanceMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Holds the choice and draws the story in it. */
const ThemedAppearanceMenu = (props: AppearanceMenuProps) => {
  const [colorMode, setColorMode] = useState<ColorMode>(props.colorMode);
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(
    props.themeVariant,
  );
  useEffect(() => setColorMode(props.colorMode), [props.colorMode]);
  useEffect(() => setThemeVariant(props.themeVariant), [props.themeVariant]);
  const config = themeConfigs[themeVariant];
  return (
    <DatalayerThemeProvider
      colorMode={colorMode}
      theme={config.primerTheme}
      themeStyles={config.themeStyles}
    >
      <Box p={3} bg="canvas.default" minHeight={520}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <AppearanceMenu
            {...props}
            colorMode={colorMode}
            themeVariant={themeVariant}
            onColorModeChange={(mode) => {
              setColorMode(mode);
              props.onColorModeChange(mode);
            }}
            onThemeChange={(variant) => {
              setThemeVariant(variant);
              props.onThemeChange(variant);
            }}
          />
          <Text sx={{ color: "fg.muted", fontSize: 1 }}>
            Hover the control: colour mode, theme, the theme's description and a
            preview.
          </Text>
        </Box>
      </Box>
    </DatalayerThemeProvider>
  );
};

/** The square a header wears. */
export const Default: Story = {
  render: (args) => <ThemedAppearanceMenu {...args} />,
};

/** A round trigger, larger, without the theme previews in its overlay. */
export const CircleWithoutPreviews: Story = {
  args: {
    shape: "circle",
    size: 32,
    showThemePreviews: false,
  },
  render: (args) => <ThemedAppearanceMenu {...args} />,
};

/**
 * `AppearanceMenuWithStore`: the menu wired to a theme store, as the
 * appearance plugin puts it in a header.
 */
export const WithStore: Story = {
  render: (args) => (
    <ThemedProvider useStore={useThemeStore}>
      <Box p={3} bg="canvas.default" minHeight={520}>
        <AppearanceMenuWithStore
          useStore={useThemeStore}
          size={args.size}
          shape={args.shape}
          hoverOverlayPlacement={args.hoverOverlayPlacement}
          showThemePreviews={args.showThemePreviews}
        />
      </Box>
    </ThemedProvider>
  ),
};
