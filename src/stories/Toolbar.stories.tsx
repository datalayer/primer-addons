import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ThemeProvider,
  BaseStyles,
  Box,
  Text,
  IconButton,
} from "@primer/react";
import { SearchIcon, ThreeBarsIcon, GearIcon } from "@primer/octicons-react";

import { Toolbar } from '../index';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

const ThemedToolbar = (props: any) =>
  <ThemeProvider colorMode={props.colorMode}>
    <BaseStyles>
      <Toolbar {...props} heading={
        <Box
          display="flex"
          alignItems="center"
          sx={{ gap: "0.5rem" }}
        >
          <IconButton
            aria-label="Search"
            icon={ThreeBarsIcon}
            size="small"
            variant="invisible"
          />
          <Text>Datalayer Toolbar</Text>
        </Box>
      }>
        <IconButton
          aria-label="Search"
          icon={SearchIcon}
          size="small"
        />
        <Text>Action1</Text>
        <Text>Action2</Text>
        <Text>Action3</Text>
        <IconButton
          aria-label="Search"
          icon={GearIcon}
          size="small"
          variant="invisible"
        />
      </Toolbar>
      </BaseStyles>
    </ThemeProvider>

export const ToolbarDay: Story = {
  args: {
    align: "flex-end",
    border: true,
    gap: "1rem",
    padding: "0 1rem",
    children: [],
  },
  render: (args) => <ThemedToolbar {...args} colorMode="day" />
};

export const ToolbarNight: Story = {
  args: {
    align: "flex-end",
    border: true,
    gap: "1rem",
    padding: "0 1rem",
    children: [],
  },
  render: (args) => <ThemedToolbar {...args} colorMode="night" />
};
