/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@primer/react";
import {
  AppearanceControls,
  AppearanceControlsProps,
  AppearanceControlsWithStore,
  DatalayerThemeProvider,
  ThemedProvider,
  themeConfigs,
  themeVariants,
  useThemeStore,
  type ColorMode,
  type ThemeVariant,
} from "../..";

const meta = {
  title: "Components/Appearance/AppearanceControls",
  component: AppearanceControls,
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
  },
  args: {
    colorMode: "light",
    themeVariant: "datalayer",
    onColorModeChange: (mode: ColorMode) => console.log("Color mode:", mode),
    onThemeChange: (variant: ThemeVariant) => console.log("Theme:", variant),
    showColorMode: true,
    showThemeChooser: true,
    showThemePreviews: false,
  },
} satisfies Meta<typeof AppearanceControls>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Holds the choice, and draws the frame in it: picking a theme or a mode
 * re-themes the story around the controls.
 */
const ThemedAppearanceControls = (props: AppearanceControlsProps) => {
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
      <Box p={3} bg="canvas.default">
        <Box
          maxWidth={360}
          sx={{
            border: "1px solid",
            borderColor: "border.default",
            borderRadius: 2,
          }}
        >
          <AppearanceControls
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
        </Box>
        <Text as="p" sx={{ mt: 2, fontSize: 0, color: "fg.muted" }}>
          {config.label}, {colorMode}: {config.description}
        </Text>
      </Box>
    </DatalayerThemeProvider>
  );
};

/** Both parts, the theme as one swatch per theme (the default). */
export const Default: Story = {
  render: (args) => <ThemedAppearanceControls {...args} />,
};

/** With the chosen theme's name, description and a live preview under the swatches. */
export const WithThemePreviews: Story = {
  args: {
    showThemePreviews: true,
  },
  render: (args) => <ThemedAppearanceControls {...args} />,
};

/** The light / dark / auto switch alone. */
export const ColorModeOnly: Story = {
  args: {
    showThemeChooser: false,
  },
  render: (args) => <ThemedAppearanceControls {...args} />,
};

/** The theme chooser alone. */
export const ThemeChooserOnly: Story = {
  args: {
    showColorMode: false,
  },
  render: (args) => <ThemedAppearanceControls {...args} />,
};

/**
 * `AppearanceControlsWithStore`: the same controls reading and writing a
 * theme store (`useThemeStore` here), with the story drawn by
 * `ThemedProvider` from that store.
 */
export const WithStore: Story = {
  render: (args) => (
    <ThemedProvider useStore={useThemeStore}>
      <Box p={3} bg="canvas.default" maxWidth={400}>
        <AppearanceControlsWithStore
          useStore={useThemeStore}
          showColorMode={args.showColorMode}
          showThemeChooser={args.showThemeChooser}
        />
      </Box>
    </ThemedProvider>
  ),
};
