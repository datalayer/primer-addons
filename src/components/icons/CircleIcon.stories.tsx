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

import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderProps, Box } from "@primer/react";
import { CircleIcon, CircleIconProps } from '../..';

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
  <Box p={3} bg="canvas.default">
    <CircleIcon {...props}/>
  </Box>

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
