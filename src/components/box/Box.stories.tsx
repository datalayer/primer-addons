/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@primer/react";
import { Box } from "../..";

const meta = {
  title: "Components/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    p: {
      options: [0, 1, 2, 3, 4, 5],
      control: "select",
    },
    bg: {
      options: [
        "canvas.default",
        "canvas.subtle",
        "accent.subtle",
        "success.subtle",
        "attention.subtle",
        "danger.subtle",
      ],
      control: "select",
    },
    borderRadius: {
      options: [
        "small",
        "medium",
        "large",
        "full",
        "card",
        "control",
        "bubble",
        "frame",
      ],
      control: "select",
    },
  },
  args: {
    p: 3,
    bg: "accent.subtle",
    color: "fg.default",
    border: "1px solid",
    borderColor: "border.default",
    borderRadius: "card",
    maxWidth: 360,
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Every value a prop on the theme's tokens: switch the theme and it redraws. */
export const Default: Story = {
  render: (args) => (
    <Box p={3} bg="canvas.default">
      <Box {...args}>
        A box on the theme's tokens: padding, ground, hairline, corner.
      </Box>
    </Box>
  ),
};

/** The Studio Home's card: the theme's hairline and large corner. */
export const ACard: Story = {
  args: {
    as: "section",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    p: 3,
    bg: "canvas.default",
    borderRadius: "large",
  },
  render: (args) => (
    <Box p={3} bg="canvas.default">
      <Box {...args}>
        <Box as="h3" m={0} fontSize={3}>
          Build
        </Box>
        <Box as="p" m={0} color="fg.muted" fontSize={1}>
          Make an agent, try it, keep it.
        </Box>
        <Box display="flex" gap={2} pt={1}>
          <Button size="small" variant="primary">
            Create agent
          </Button>
        </Box>
      </Box>
    </Box>
  ),
};

/** Colour names are the theme's: `bg="canvas.subtle"` is `var(--bgColor-muted)`, `color="fg.muted"` is `var(--fgColor-muted)`. */
export const Colours: Story = {
  render: () => (
    <Box p={3} bg="canvas.default" display="flex" flexWrap="wrap" gap={2}>
      {[
        ["canvas.subtle", "fg.default"],
        ["accent.subtle", "accent.fg"],
        ["success.subtle", "success.fg"],
        ["attention.subtle", "attention.fg"],
        ["danger.subtle", "danger.fg"],
        ["neutral.emphasis", "fg.onEmphasis"],
      ].map(([bg, color]) => (
        <Box
          key={bg}
          p={2}
          bg={bg}
          color={color}
          borderRadius="medium"
          fontSize={0}
        >
          {bg}
        </Box>
      ))}
    </Box>
  ),
};

/** Corners by name: Primer's four, then the theme's shapes (rounder in `loop`). */
export const Corners: Story = {
  render: () => (
    <Box p={3} bg="canvas.default" display="flex" flexWrap="wrap" gap={3}>
      {[
        "small",
        "medium",
        "large",
        "full",
        "card",
        "control",
        "bubble",
        "frame",
      ].map((radius) => (
        <Box
          key={radius}
          width={96}
          height={64}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor="border.default"
          bg="canvas.subtle"
          borderRadius={radius}
          fontSize={0}
        >
          {radius}
        </Box>
      ))}
    </Box>
  ),
};

/** One value per breakpoint: one column on a phone, three on a desktop. */
export const Responsive: Story = {
  render: () => (
    <Box p={3} bg="canvas.default">
      <Box
        display="grid"
        gridTemplateColumns={["1fr", null, "repeat(3, 1fr)"]}
        gap={[1, null, 3]}
        p={[2, null, 4]}
        bg="canvas.subtle"
        borderRadius="medium"
      >
        {["phone: one column", "tablet: still one", "desktop: three"].map(
          (cell) => (
            <Box
              key={cell}
              p={2}
              bg="canvas.default"
              border="1px solid"
              borderColor="border.default"
              borderRadius="medium"
              fontSize={0}
            >
              {cell}
            </Box>
          ),
        )}
      </Box>
    </Box>
  ),
};

/** States are props too: `hover`, `focusVisible` and `reducedMotion`. */
export const HoverAndFocus: Story = {
  render: () => (
    <Box p={3} bg="canvas.default">
      <Box
        as="button"
        type="button"
        p={3}
        bg="canvas.default"
        color="fg.default"
        border="1px solid"
        borderColor="border.default"
        borderRadius="large"
        cursor="pointer"
        transition="background-color 120ms ease"
        hover={{ bg: "canvas.subtle" }}
        focusVisible={{
          outline: "2px solid var(--focus-outlineColor)",
          outlineOffset: "2px",
        }}
        reducedMotion={{ transition: "none" }}
      >
        Hover or focus me
      </Box>
    </Box>
  ),
};
