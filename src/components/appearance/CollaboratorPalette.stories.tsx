/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@primer/react";
import {
  CollaboratorPalette,
  CollaboratorPaletteProps,
  collaboratorColor,
  themeVariants,
} from "../..";

const ROOM = ["ada", "grace", "alan", "katherine", "edsger"];

const meta = {
  title: "Components/Appearance/CollaboratorPalette",
  component: CollaboratorPalette,
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
    showValues: true,
    height: 32,
  },
} satisfies Meta<typeof CollaboratorPalette>;

export default meta;

type Story = StoryObj<typeof meta>;

const ThemedCollaboratorPalette = (props: CollaboratorPaletteProps) => (
  <Box p={3} bg="canvas.default">
    <CollaboratorPalette {...props} />
  </Box>
);

/** The seven colours of the active theme, slot by slot. */
export const ActiveTheme: Story = {
  render: (args) => <ThemedCollaboratorPalette {...args} />,
};

/** A room of five: each person's colour is a stable hash of who they are. */
export const ARoomOfFive: Story = {
  args: {
    people: ROOM,
  },
  render: (args) => <ThemedCollaboratorPalette {...args} />,
};

/** One theme in one mode, whatever the page wears. */
export const LoopDark: Story = {
  args: {
    variant: "loop",
    colorMode: "dark",
    people: ROOM,
  },
  render: (args) => <ThemedCollaboratorPalette {...args} />,
};

/** What a caret and its name tag look like in a shared document. */
export const Cursors: Story = {
  args: {
    variant: "datalayer",
    colorMode: "light",
  },
  render: (args) => (
    <Box
      p={3}
      bg="canvas.default"
      sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}
    >
      {ROOM.map((person) => {
        const color = collaboratorColor(person, args.variant, args.colorMode);
        return (
          <Box
            key={person}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Box
              aria-hidden="true"
              style={{ width: 2, height: 20, backgroundColor: color }}
            />
            <Text
              sx={{ fontSize: 0, px: 1, borderRadius: 1, color: "#fff" }}
              style={{ backgroundColor: color }}
            >
              {person}
            </Text>
          </Box>
        );
      })}
    </Box>
  ),
};
