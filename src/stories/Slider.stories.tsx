import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ThemeProvider,
  BaseStyles
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

const ThemedSlider = (props: any) =>
  <ThemeProvider colorMode={props.colorMode}>
    <BaseStyles>
      <Slider {...props}>
      </Slider>
    </BaseStyles>
  </ThemeProvider>

export const SliderDay: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
  },
  render: (args) => <ThemedSlider {...args} colorMode="day" />
};

export const SliderNight: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10
  },
  render: (args) => <ThemedSlider {...args} colorMode="night" />
};
