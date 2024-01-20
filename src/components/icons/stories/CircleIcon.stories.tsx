import type { Meta, StoryObj } from '@storybook/react';
import {
  ThemeProvider,
  ThemeProviderProps,
  BaseStyles,
  Box
} from "@primer/react";

import { CircleIcon, CircleIconProps } from '../../../index';

const meta = {
  title: 'Components/CircleIcon',
  component: CircleIcon,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CircleIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

const ThemedCircleIcon = (props: {colorMode?: ThemeProviderProps["colorMode"]} & CircleIconProps) =>
  <ThemeProvider colorMode={props.colorMode}>
    <BaseStyles>
      <Box p={3} bg="canvas.default">
        <CircleIcon {...props}/>
      </Box>
    </BaseStyles>
  </ThemeProvider>

export const CircleIconDay: Story = {
  args: {
    color: 'danger',
    variant: 'fg',
  },
  render: (args) => <ThemedCircleIcon {...args} colorMode="day" />
};

export const CircleIconNight: Story = {
  args: {
    color: 'danger',
    variant: 'fg',
  },
  render: (args) => <ThemedCircleIcon {...args} colorMode="night" />
};
