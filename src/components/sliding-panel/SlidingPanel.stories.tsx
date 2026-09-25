/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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