/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CopilotIcon } from "@primer/octicons-react";
import { Box, Text } from "@primer/react";
import { EntityAvatar, type EntityAvatarTone } from "../..";

/** A portrait drawn inline, so the story needs no network. */
const PORTRAIT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#ddf4ff"/><circle cx="32" cy="26" r="12" fill="#0969da"/><rect x="12" y="42" width="40" height="26" rx="13" fill="#0969da"/></svg>',
  );

const TONES: EntityAvatarTone[] = [
  "accent",
  "success",
  "attention",
  "severe",
  "danger",
  "done",
  "sponsors",
  "neutral",
];

const meta = {
  title: "Components/EntityAvatar",
  component: EntityAvatar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    shape: {
      options: ["circle", "rounded"],
      control: "radio",
    },
    tone: {
      options: TONES,
      control: "select",
    },
    ground: {
      options: ["subtle", "emphasis", "canvas"],
      control: "radio",
    },
    children: { control: false },
  },
  args: {
    name: "Eric Charles",
    size: 48,
    shape: "circle",
    tone: "accent",
    ground: "subtle",
    ring: false,
  },
} satisfies Meta<typeof EntityAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const Row = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box sx={{ display: "grid", gap: 2 }}>
    <Text sx={{ fontSize: 1, fontWeight: "semibold" }}>{title}</Text>
    <Box
      sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 3 }}
    >
      {children}
    </Box>
  </Box>
);

/** Initials, when there is neither image nor glyph. */
export const Initials: Story = {
  render: (args) => (
    <Box p={3} bg="canvas.default">
      <EntityAvatar {...args} />
    </Box>
  ),
};

/** An image covers the avatar. */
export const Image: Story = {
  args: {
    src: PORTRAIT,
    name: "A person",
  },
  render: (args) => (
    <Box p={3} bg="canvas.default">
      <EntityAvatar {...args} />
    </Box>
  ),
};

/** A glyph — an icon, an emoji — on the theme's corner, for what is not a person. */
export const Glyphs: Story = {
  args: {
    shape: "rounded",
  },
  render: (args) => (
    <Box p={3} bg="canvas.default" sx={{ display: "flex", gap: 3 }}>
      <EntityAvatar {...args} name="Copilot">
        <CopilotIcon size={24} />
      </EntityAvatar>
      <EntityAvatar {...args} name="Compactor">
        <span style={{ fontSize: 26 }}>🗜️</span>
      </EntityAvatar>
      <EntityAvatar {...args} name="Data Analysis" />
    </Box>
  ),
};

/** Its sizes, as a person and as a space. */
export const Sizes: Story = {
  render: (args) => (
    <Box p={3} bg="canvas.default" sx={{ display: "grid", gap: 3 }}>
      <Row title="circle">
        {[16, 20, 24, 32, 40, 48, 72].map((size) => (
          <EntityAvatar key={size} {...args} size={size} shape="circle" />
        ))}
      </Row>
      <Row title="rounded">
        {[16, 20, 24, 32, 40, 48, 72].map((size) => (
          <EntityAvatar
            key={size}
            {...args}
            name="Space"
            size={size}
            shape="rounded"
          />
        ))}
      </Row>
    </Box>
  ),
};

/** The tones, on their wash and solid; the page's ground, a ring, an entity's own colour. */
export const Tones: Story = {
  args: {
    shape: "rounded",
    size: 40,
  },
  render: (args) => (
    <Box p={3} bg="canvas.default" sx={{ display: "grid", gap: 3 }}>
      <Row title="On their wash">
        {TONES.map((tone) => (
          <EntityAvatar
            key={tone}
            {...args}
            name={tone}
            tone={tone}
            ground="subtle"
          />
        ))}
      </Row>
      <Row title="Solid">
        {TONES.map((tone) => (
          <EntityAvatar
            key={tone}
            {...args}
            name={tone}
            tone={tone}
            ground="emphasis"
          />
        ))}
      </Row>
      <Row title="The page's ground, a ring, an entity's own colour">
        <EntityAvatar {...args} name="Canvas" ground="canvas" />
        <EntityAvatar {...args} name="Ring" ring />
        <EntityAvatar
          {...args}
          name="Own Colour"
          color="var(--bgColor-done-emphasis)"
        />
      </Row>
    </Box>
  ),
};
