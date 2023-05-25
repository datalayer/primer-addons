import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ThemeProvider,
  ThemeProviderProps,
  BaseStyles,
  Box
} from "@primer/react";

import { Card, CardProps } from '../index';

const meta = {
  title: 'Components/Card',
  component: Card,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const ThemedCard = (props: {colorMode?: ThemeProviderProps["colorMode"]} & CardProps) => {
  return (
    <ThemeProvider colorMode={props.colorMode}>
      <BaseStyles>
        <Box p={3} bg="canvas.default">
          <Box>
            <Card {...props}/>
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  )
}

export const CardDay: Story = {
  args: {
    rounded: "small",
    border: true,
    sx: { p:2 }
  },
  render: (args) => <ThemedCard {...args} colorMode="day">Success Card</ThemedCard>
};

export const CardNight: Story = {
  args: {
    rounded: "small",
    border: true,
    sx: { p:2 }
  },
  render: (args) => <ThemedCard {...args} colorMode="night">Success Card</ThemedCard>
};
