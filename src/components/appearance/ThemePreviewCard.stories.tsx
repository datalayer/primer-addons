/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@primer/react";
import {
  ThemePreviewCard,
  ThemePreviewCardProps,
  themeVariants,
  type ThemeVariant,
} from "../..";

const meta = {
  title: "Components/Appearance/ThemePreviewCard",
  component: ThemePreviewCard,
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
    variant: "loop",
    colorMode: "light",
    selected: false,
    compact: false,
    showDescription: true,
    onSelect: (variant: ThemeVariant) => console.log("Selected:", variant),
  },
} satisfies Meta<typeof ThemePreviewCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const ThemedThemePreviewCard = (props: ThemePreviewCardProps) => (
  <Box p={3} bg="canvas.default">
    <Box maxWidth={320}>
      <ThemePreviewCard {...props} />
    </Box>
  </Box>
);

/** One theme's miniature: its name, description and a sketch of a page in it. */
export const Default: Story = {
  render: (args) => <ThemedThemePreviewCard {...args} />,
};

/** The chosen card, in the dark. */
export const SelectedDark: Story = {
  args: {
    variant: "earth",
    colorMode: "dark",
    selected: true,
  },
  render: (args) => <ThemedThemePreviewCard {...args} />,
};

/** Compact, without its description. */
export const Compact: Story = {
  args: {
    variant: "sand",
    compact: true,
    showDescription: false,
  },
  render: (args) => <ThemedThemePreviewCard {...args} />,
};

/** Every theme as a chooser: click one to select it. */
export const AllThemes: Story = {
  args: {
    compact: true,
  },
  render: function AllThemesStory(args) {
    const [chosen, setChosen] = useState<ThemeVariant>("datalayer");
    return (
      <Box
        p={3}
        bg="canvas.default"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 3,
        }}
      >
        {themeVariants.map((variant) => (
          <ThemePreviewCard
            key={variant}
            variant={variant}
            colorMode={args.colorMode}
            compact={args.compact}
            showDescription={args.showDescription}
            selected={variant === chosen}
            onSelect={setChosen}
          />
        ))}
      </Box>
    );
  },
};
