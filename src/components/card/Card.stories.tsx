/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProviderProps, Box, Button, IconButton, Text, ButtonGroup   } from "@primer/react";
import { ProjectIcon, ThreeBarsIcon } from '@primer/octicons-react';
import { Card, CardProps } from '../..';

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
    <Box p={3} bg="canvas.default">
      <Box>
        <Card {...props}/>
      </Box>
    </Box>
  )
}

export const CardDay: Story = {
  args: {
    rounded: "medium",
    shadow: "medium",
    border: true,
    sx: {maxWidth: 360}
  },
  render: (args) => <ThemedCard {...args} colorMode="day">
    <Card.Header
      leadingVisual={ProjectIcon}
      title="Shrimp and Chorizo Paella"
      description="September 14, 2016"
      action={<IconButton aria-label="Menu" onClick={() => alert("Menu")} icon={ThreeBarsIcon} />}
    />
    <Card.Image height={200} url="https://images.unsplash.com/photo-1623961990059-28356e226a77?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=douglas-lopez-4B0cLMtJxWw-unsplash.jpg&w=640"/>
    <Card.Content>
      <Text display="block" fontSize={22}>Paella</Text>
      <Text color="fg.muted">
        This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </Text>
    </Card.Content>
    <Card.Actions>
      <ButtonGroup>
        <Button variant='invisible' onClick={() => alert("Share it on Socials!")}>Share</Button>
        <Button variant='invisible' onClick={() => alert("Learn more about Paella")}>Learn More</Button>
      </ButtonGroup>
    </Card.Actions>
  </ThemedCard>
};

const SVG = `
<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" />
  <rect x="120" width="100" height="100" rx="15" />
</svg>
`

export const CardDaySvg: Story = {
  args: {
    rounded: "medium",
    shadow: "medium",
    border: true,
    sx: {maxWidth: 360}
  },
  render: (args) => <ThemedCard {...args} colorMode="day">
    <Card.Header
      leadingVisual={ProjectIcon}
      title="Shrimp and Chorizo Paella"
      description="September 14, 2016"
      action={<IconButton aria-label="Menu" onClick={() => alert("Menu")} icon={ThreeBarsIcon} />}
    />
    <Card.Image height={200} svg={SVG}/>
    <Card.Content>
      <Text display="block" fontSize={22}>Paella</Text>
      <Text color="fg.muted">
        This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
      </Text>
    </Card.Content>
    <Card.Actions>
      <ButtonGroup>
        <Button variant='invisible' onClick={() => alert("Share it on Socials!")}>Share</Button>
        <Button variant='invisible' onClick={() => alert("Learn more about Paella")}>Learn More</Button>
      </ButtonGroup>
    </Card.Actions>
  </ThemedCard>
};

export const CardNight: Story = {
  args: {
    rounded: "medium",
    shadow: "medium",
    border: true,
    sx: {maxWidth: 360}
  },
  render: (args) => <ThemedCard {...args} colorMode="night">
  <Card.Header
    leadingVisual={ProjectIcon}
    title="Shrimp and Chorizo Paella"
    description="September 14, 2016"
    action={<IconButton aria-label="Menu" onClick={() => alert("Menu")} icon={ThreeBarsIcon} />}
  />
  <Card.Image height={200} url="https://images.unsplash.com/photo-1623961990059-28356e226a77?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=douglas-lopez-4B0cLMtJxWw-unsplash.jpg&w=640"/>
  <Card.Content>
    <Text display="block" fontSize={22}>Paella</Text>
    <Text color="fg.muted">
      This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
    </Text>
  </Card.Content>
  <Card.Actions>
    <ButtonGroup>
      <Button variant='invisible' onClick={() => alert("Share it on Socials!")}>Share</Button>
      <Button variant='invisible' onClick={() => alert("Learn more about Paella")}>Learn More</Button>
    </ButtonGroup>
  </Card.Actions>
</ThemedCard>
};

/** A card that is clicked: rendered as a button, with hover and focus states. */
export const CardInteractive: Story = {
  args: {
    as: "button",
    type: "button",
    interactive: true,
    shadow: "none",
    p: 3,
    sx: {maxWidth: 360},
  },
  render: (args) => <ThemedCard {...args} onClick={() => alert("Opened")}>
    <Text display="block" fontWeight="bold">Tutor</Text>
    <Text color="fg.muted">
      Author lessons, exercises and assignments, and follow the courses you give and take.
    </Text>
  </ThemedCard>
};

/** The chosen card among others: an accent border on an accent wash. */
export const CardSelected: Story = {
  args: {
    interactive: true,
    selected: true,
    shadow: "none",
    role: "button",
    tabIndex: 0,
    "aria-pressed": true,
    p: 3,
    sx: {maxWidth: 360},
  },
  render: (args) => <ThemedCard {...args}>
    <Text display="block" fontWeight="bold">Selected example</Text>
    <Text color="fg.muted">The one picked among its siblings.</Text>
  </ThemedCard>
};
