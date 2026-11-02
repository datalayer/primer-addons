/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@primer/react";
import {
  DatalayerThemeProvider,
  ThemeCircle,
  ThemeCircleProps,
  themeConfigs,
  themeVariants,
  type ThemeVariant,
} from "../..";

const meta = {
  title: "Components/Appearance/ThemeCircle",
  component: ThemeCircle,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    themeVariant: {
      options: themeVariants,
      control: "select",
    },
    themes: {
      options: themeVariants,
      control: "check",
    },
  },
  args: {
    themeVariant: "datalayer",
    onThemeChange: (variant: ThemeVariant) => console.log("Theme:", variant),
    size: 28,
  },
} satisfies Meta<typeof ThemeCircle>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Holds the theme, so clicking moves to the next one, and draws the story in it. */
const ThemedThemeCircle = (props: ThemeCircleProps) => {
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(
    props.themeVariant,
  );
  useEffect(() => setThemeVariant(props.themeVariant), [props.themeVariant]);
  const config = themeConfigs[themeVariant];
  return (
    <DatalayerThemeProvider
      colorMode={config.defaultColorMode}
      theme={config.primerTheme}
      themeStyles={config.themeStyles}
    >
      <Box p={3} bg="canvas.default">
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <ThemeCircle
            {...props}
            themeVariant={themeVariant}
            onThemeChange={(variant) => {
              setThemeVariant(variant);
              props.onThemeChange(variant);
            }}
          />
          <Box>
            <Text as="p" sx={{ m: 0, fontWeight: "semibold" }}>
              {config.label}
            </Text>
            <Text as="p" sx={{ m: 0, fontSize: 0, color: "fg.muted" }}>
              {config.description}
            </Text>
          </Box>
        </Box>
      </Box>
    </DatalayerThemeProvider>
  );
};

/** Click to move through every registered theme. */
export const Default: Story = {
  render: (args) => <ThemedThemeCircle {...args} />,
};

/** Cycling through a chosen few. */
export const AFewThemes: Story = {
  args: {
    themes: ["datalayer", "loop", "earth", "matrix"],
    size: 36,
  },
  render: (args) => <ThemedThemeCircle {...args} />,
};
