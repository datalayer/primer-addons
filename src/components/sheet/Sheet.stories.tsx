/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Box, Sheet } from "../..";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    px: [3, 4, "56px"],
    py: 4,
    maxWidth: 640,
    mx: "auto",
  },
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A sheet on a quiet canvas — the page the page layout draws, on its own:
 * the canvas colour, its hairline, the theme's card corner and a paper's shadow.
 */
export const Page: Story = {
  render: (args) => (
    <Box bg="canvas.subtle" p={4}>
      <Sheet {...args}>
        <Box as="h3" m={0} mb={2} fontSize={3}>
          A page
        </Box>
        <Box as="p" m={0} color="fg.muted">
          The canvas colour, its hairline, the theme&apos;s card corner and the
          shadow a sheet of paper has. Its size, padding and layout are yours.
        </Box>
      </Sheet>
    </Box>
  ),
};

/** Three sheets side by side, each padded as its content needs. */
export const SideBySide: Story = {
  args: {
    p: 3,
    minHeight: 120,
  },
  render: (args) => (
    <Box
      bg="canvas.subtle"
      p={4}
      display="grid"
      gridTemplateColumns={["1fr", "repeat(3, 1fr)"]}
      gap={3}
    >
      {["Notes", "Draft", "Report"].map((name) => (
        <Sheet key={name} p={args.p} minHeight={args.minHeight}>
          <Box fontWeight="semibold">{name}</Box>
          <Box color="fg.muted" fontSize={0}>
            Three sheets side by side, each padded as its content needs.
          </Box>
        </Sheet>
      ))}
    </Box>
  ),
};
