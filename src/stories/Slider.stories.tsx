import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ThemeProvider,
  BaseStyles,
  Box,
  CounterLabel
} from "@primer/react";

import { Slider } from '../index';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

const ThemedSlider = (props: any) => {
  const [value, setValue] = useState(50);

  return (
    <ThemeProvider colorMode={props.colorMode}>
      <BaseStyles>
        <Box p={3} bg="canvas.default">
          <Box>
            <Slider {...props} value={value} onChange={setValue} />
          </Box>
          <Box>
            <CounterLabel sx={{ml: 2}}>{value}</CounterLabel>
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  )
}

export const SliderDay: Story = {
  args: {
    name: "slider-day",
    id: "slider-day",
    min: 0,
    max: 100,
    step: 10,
    value: 50,
    onChange: (value: number) => {
      console.log('Slider value changed:', value);
    },
  },
  render: (args) => <ThemedSlider {...args} colorMode="day" />
};

export const SliderNight: Story = {
  args: {
    name: "slider-night",
    id: "slider-night",
    min: 0,
    max: 100,
    step: 10,
    value: 50,
    onChange: (value: number) => {
      console.log('Slider value changed:', value);
    },
  },
  render: (args) => <ThemedSlider {...args} colorMode="night" />
};
