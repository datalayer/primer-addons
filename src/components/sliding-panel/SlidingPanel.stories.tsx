import { useRef, useState } from 'react';
import { Box, Button, Heading, Text } from '@primer/react';
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

type DemoProps = Omit<SlidingPanelProps, 'isOpen' | 'children' | 'onDismiss'>;

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
      <SlidingPanel {...props} isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Text>Sliding panel content</Text>
          <Button size="small" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Box>
      </SlidingPanel>
    </Box>
  );
};

export const NorthInfo: Story = {
  args: {
    isOpen: false,
    children: null,
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
    children: null,
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
    children: null,
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
    children: null,
    position: 'west',
    variant: 'error',
    durationMs: 0,
    panelSize: 360,
    fullWidth: false,
  },
  render: args => <Demo {...(args as DemoProps)} />,
};