import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ThemeProvider,
  ThemeProviderProps,
  BaseStyles,
  Box,
  Button,
  IconButton,
  Text,
  ButtonGroup,
} from "@primer/react";

import { Card, CardProps } from '../index';
import { ProjectIcon, ThreeBarsIcon } from '@primer/octicons-react';

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
    rounded: "medium",
    shadow: "medium",
    border: true,
    sx: {maxWidth: 360}
  },
  render: (args) => <ThemedCard {...args} colorMode="day">
    <Card.Header
      leadingIcon={ProjectIcon}
      title="Shrimp and Chorizo Paella"
      description="September 14, 2016"
      action={<IconButton aria-label="Menu" onClick={() => alert("Menu")} icon={ThreeBarsIcon} />}
    />
    <Card.Image height={200} image="https://images.unsplash.com/photo-1623961990059-28356e226a77?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=douglas-lopez-4B0cLMtJxWw-unsplash.jpg&w=640"/>
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
    leadingIcon={ProjectIcon}
    title="Shrimp and Chorizo Paella"
    description="September 14, 2016"
    action={<IconButton aria-label="Menu" onClick={() => alert("Menu")} icon={ThreeBarsIcon} />}
  />
  <Card.Image height={200} image="https://images.unsplash.com/photo-1623961990059-28356e226a77?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=douglas-lopez-4B0cLMtJxWw-unsplash.jpg&w=640"/>
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
