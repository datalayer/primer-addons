import { useState, useRef } from "react";
import { Heading, Text, ThemeProviderProps, Box, Button } from "@primer/react";
import type { Meta, StoryObj } from '@storybook/react';
import { SideOverlay, SideOverlayProps } from '../..';

const meta = {
  title: 'Components/SideOverlay',
  component: SideOverlay,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SideOverlay>;

export default meta;

type Story = StoryObj<typeof meta>

const ThemedSideOverlay = (props: {colorMode?: ThemeProviderProps["colorMode"]} & SideOverlayProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  return (
    <Box p={3} bg="canvas.default">
      <Box>
        <Box sx={{width: '100%', bg: 'darkgray'}}>
          <Heading ref={headingRef}>Header</Heading>
        </Box>
        <Box>
          <Button ref={openButtonRef} onClick={() => {setIsOpen(!isOpen)}}>
            Open overlay
          </Button>
          <SideOverlay
            {...props}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            openButtonRef={openButtonRef}
            closeButtonRef={closeButtonRef}
            />
        </Box>
      </Box>
    </Box>
  )
}

export const SideOverlayDayLeft: Story = {
  args: {
    content: <Text>👈 Look, left aligned, no heading.</Text>,
    direction: "left",
    width: '500px',
  },
  render: (args) => <ThemedSideOverlay {...args} colorMode="day" />
};

export const SideOverlayDayRight: Story = {
  args: {
    content: <Text>Look, right aligned, on heading 👉</Text>,
    direction: "right",
    width: '500px',
  },
  render: (args) => <ThemedSideOverlay {...args} colorMode="day" />
};

export const SideOverlayNightLeft: Story = {
  args: {
    content: <Text>👈 Look, left aligned, no heading.</Text>,
    direction: "left",
    width: '300px',
  },
  render: (args) => <ThemedSideOverlay {...args} colorMode="night" />
};

export const SideOverlayNightRight: Story = {
  args: {
    content: <Text>Look, right aligned, on heading 👉</Text>,
    direction: "right",
    width: '300px',
  },
  render: (args) => <ThemedSideOverlay {...args} colorMode="night" />
};
