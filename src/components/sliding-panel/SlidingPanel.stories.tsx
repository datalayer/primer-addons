/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useRef, useState } from 'react';
import { Box, Button, Heading } from '@primer/react';
import type { Meta, StoryObj } from '@storybook/react';
import { SlidingPanel, type SlidingPanelProps } from './SlidingPanel';

const meta = {
  title: 'Components/SlidingPanel',
  component: SlidingPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SlidingPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

type DemoProps = Omit<SlidingPanelProps, 'isOpen' | 'onDismiss'>;

const Demo = (props: DemoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bg: 'canvas.default' }}>
      <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>
        Sliding Panel Demo
      </Heading>
      <Button ref={openButtonRef} onClick={() => setIsOpen(true)}>
        Open panel
      </Button>
      <SlidingPanel {...props} isOpen={isOpen} onDismiss={() => setIsOpen(false)} />
      {isOpen ? (
        <Box sx={{ mt: 3 }}>
          <Button size="small" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export const NorthInfo: Story = {
  args: {
    isOpen: false,
    message: 'Sliding panel message',
    details: 'Additional details appear below the message in normal font.',
    position: 'north',
    variant: 'info',
    durationMs: 4500,
    fullWidth: true,
  },
  render: args => <Demo {...(args as DemoProps)} />,
};

export const SouthWarning: Story = {
  args: {
    isOpen: false,
    message: 'Sliding panel message',
    details: 'Additional details appear below the message in normal font.',
    position: 'south',
    variant: 'warning',
    durationMs: 0,
    fullWidth: true,
  },
  render: args => <Demo {...(args as DemoProps)} />,
};

export const EastSuccess: Story = {
  args: {
    isOpen: false,
    message: 'Sliding panel message',
    details: 'Additional details appear below the message in normal font.',
    position: 'east',
    variant: 'success',
    durationMs: 0,
    panelSize: 360,
    fullWidth: false,
  },
  render: args => <Demo {...(args as DemoProps)} />,
};

export const WestError: Story = {
  args: {
    isOpen: false,
    message: 'Sliding panel message',
    details: 'Additional details appear below the message in normal font.',
    position: 'west',
    variant: 'error',
    durationMs: 0,
    panelSize: 360,
    fullWidth: false,
  },
  render: args => <Demo {...(args as DemoProps)} />,
};
/**
 * Contained: the panel slides within its region of the page (here a box
 * standing for a chat embedded in a section), never over the rest of it.
 */
const ContainedDemo = (props: DemoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box sx={{ p: 4, minHeight: '100vh', bg: 'canvas.default' }}>
      <Heading as="h2" sx={{ fontSize: 3, mb: 3 }}>
        A panel inside its region
      </Heading>
      <Button onClick={() => setIsOpen(true)}>Open panel</Button>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          mt: 3,
          height: 360,
          maxWidth: 720,
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 2,
        }}
      >
        <Box sx={{ p: 3, color: 'fg.muted' }}>The region the panel belongs to.</Box>
        <SlidingPanel {...props} isOpen={isOpen} onDismiss={() => setIsOpen(false)} />
      </Box>
    </Box>
  );
};

export const ContainedEast: Story = {
  args: {
    isOpen: false,
    message: 'Deck ready',
    details: 'Six slides on the roast-day launch.',
    position: 'east',
    variant: 'success',
    contained: true,
    panelSize: 320,
    dismissOnPanelClick: false,
    closeLabel: 'Close the notice',
  },
  render: args => <ContainedDemo {...args} />,
};
