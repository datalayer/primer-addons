import { useState, useRef } from "react";
import { Heading, Text, ThemeProviderProps, Box, Button } from "@primer/react";
import type { Meta, StoryObj } from '@storybook/react';
import { Overlay, OverlayProps } from '../..';

const meta = {
  title: 'Components/Overlay',
  component: Overlay,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Overlay>;

export default meta;

type Story = StoryObj<typeof meta>

const ThemedOverlay = (props: {colorMode?: ThemeProviderProps["colorMode"]} & OverlayProps) => {
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
          <Overlay
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

export const OverlayDayLeft: Story = {
  args: {
    content: <Text>👈 Look, left aligned, no heading.</Text>,
    direction: "left",
    width: '500px',
  },
  render: (args) => <ThemedOverlay {...args} colorMode="day" />
};

export const OverlayDayRight: Story = {
  args: {
    content: <Text>Look, right aligned, on heading 👉</Text>,
    direction: "right",
    width: '500px',
  },
  render: (args) => <ThemedOverlay {...args} colorMode="day" />
};

export const OverlayNightLeft: Story = {
  args: {
    content: <Text>👈 Look, left aligned, no heading.</Text>,
    direction: "left",
    width: '300px',
  },
  render: (args) => <ThemedOverlay {...args} colorMode="night" />
};

export const OverlayNightRight: Story = {
  args: {
    content: <Text>Look, right aligned, on heading 👉</Text>,
    direction: "right",
    width: '300px',
  },
  render: (args) => <ThemedOverlay {...args} colorMode="night" />
};
