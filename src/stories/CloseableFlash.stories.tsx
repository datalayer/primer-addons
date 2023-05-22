import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ThemeProvider,
  BaseStyles,
  Box
} from "@primer/react";

import { CloseableFlash } from '../index';

const meta = {
  title: 'Components/CloseableFlash',
  component: CloseableFlash,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CloseableFlash>;

export default meta;

type Story = StoryObj<typeof meta>;

const ThemedCloseableFlash = (props: any) => {
  return (
    <ThemeProvider colorMode={props.colorMode}>
      <BaseStyles>
        <Box p={3} bg="canvas.default">
          <Box>
            <CloseableFlash {...props}/>
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  )
}

export const CloseableFlashDay: Story = {
  args: {
    variant: "success"
  },
  render: (args) => <ThemedCloseableFlash {...args} colorMode="day">Success Flash</ThemedCloseableFlash>
};

export const CloseableFlashNight: Story = {
  args: {
    variant: "success"
  },
  render: (args) => <ThemedCloseableFlash {...args} colorMode="night">Success Flash</ThemedCloseableFlash>
};
