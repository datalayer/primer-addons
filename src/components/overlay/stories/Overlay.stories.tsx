import { useState, useRef } from "react";
import {
  Heading,
  Text,
  ThemeProvider,
  ThemeProviderProps,
  BaseStyles,
  Box,
  Button,
} from "@primer/react";
import type { Meta, StoryObj } from '@storybook/react';
import { Overlay, OverlayProps } from './../Overlay';

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

  const buttonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <ThemeProvider colorMode={props.colorMode}>
      <BaseStyles>
        <Box p={3} bg="canvas.default">
          <Box>
            <Box sx={{width: '100%', bg: 'darkgray'}}>
              <Heading ref={headingRef}>Header</Heading>
            </Box>
            <Box>
              <Button ref={buttonRef} onClick={() => {
                setIsOpen(!isOpen);
              }}>
                Open overlay
              </Button>
              <Overlay
                {...props}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                buttonRef={buttonRef}
                confirmButtonRef={confirmButtonRef}
                headingRef={props.direction === 'left' ? headingRef : undefined}
                />
            </Box>
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  )
}

export const OverlayDayLeft: Story = {
  args: {
    direction: "left",
    content: <Text>👈 Look, left aligned, no heading.</Text>,
  },
  render: (args) => <ThemedOverlay {...args} colorMode="day" />
};

export const OverlayDayRight: Story = {
  args: {
    direction: "right",
    content: <Text>Look, right aligned, on heading 👉</Text>,
  },
  render: (args) => <ThemedOverlay {...args} colorMode="day" />
};

export const OverlayNightLeft: Story = {
  args: {
    direction: "left",
    content: <Text>👈 Look, left aligned, no heading.</Text>,
  },
  render: (args) => <ThemedOverlay {...args} colorMode="night" />
};

export const OverlayNightRight: Story = {
  args: {
    direction: "right",
    content: <Text>Look, right aligned, on heading 👉</Text>
  },
  render: (args) => <ThemedOverlay {...args} colorMode="night" />
};
