import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderProps, Box } from "@primer/react";
import { ContentLoader, ContentLoaderProps } from '../..';

const meta = {
  title: 'Components/ContentLoader',
  component: ContentLoader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ContentLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

const ThemedContentLoader = (props: {colorMode?: ThemeProviderProps["colorMode"]} & ContentLoaderProps) =>
  <Box p={3} bg="canvas.default">
    <ContentLoader {...props}/>
  </Box>

export const ContentLoaderDay: Story = {
  args: {
    count: 3
  },
  render: (args) => <ThemedContentLoader {...args} colorMode="day" />
};

export const ContentLoaderNight: Story = {
  args: {
    count: 3
  },
  render: (args) => <ThemedContentLoader {...args} colorMode="night" />
};
