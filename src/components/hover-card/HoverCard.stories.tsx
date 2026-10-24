/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Button, Label, Text } from "@primer/react";
import {
  Card,
  HoverCard,
  HoverCardAnchor,
  HoverCardDetails,
  HoverCardLayer,
  useHoverCard,
} from "../..";

type Item = {
  id: string;
  name: string;
  kind: string;
  description: string;
  color: string;
};

const ITEMS: Item[] = [
  {
    id: "titanic",
    name: "Titanic survival",
    kind: "notebook",
    description:
      "Who survived, and why: a classic dataset read again with an agent.",
    color: "accent.emphasis",
  },
  {
    id: "quarterly",
    name: "Quarterly report",
    kind: "document",
    description:
      "Revenue, churn and the pipeline, written from the warehouse every quarter.",
    color: "success.emphasis",
  },
  {
    id: "deck",
    name: "Launch deck",
    kind: "deck",
    description:
      "Twelve slides from a specification, presented in the browser.",
    color: "done.emphasis",
  },
];

/** A picture drawn by the theme, so the story needs no network. */
const Picture = ({ item, height }: { item: Item; height: number }) => (
  <Box
    height={height}
    bg={item.color}
    color="fg.onEmphasis"
    display="flex"
    alignItems="center"
    justifyContent="center"
    fontSize={3}
    fontWeight="semibold"
  >
    {item.kind}
  </Box>
);

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    picture: { control: false },
    actions: { control: false },
    meta: { control: false },
    children: { control: false },
  },
  args: {
    anchorWidth: 240,
    title: ITEMS[0].name,
    description: ITEMS[0].description,
    openLabel: `Open ${ITEMS[0].name}`,
    expandLabel: `More about ${ITEMS[0].name}`,
    closing: false,
  },
} satisfies Meta<typeof HoverCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The grown card on its own: the picture as a way in, actions, the
 * focusable chevron, the whole title and description.
 */
export const Grown: Story = {
  render: function GrownStory(args) {
    const [details, setDetails] = useState(false);
    return (
      <Box p={3} bg="canvas.default">
        <HoverCard
          {...args}
          picture={(height) => <Picture item={ITEMS[0]} height={height} />}
          onOpen={() => console.log("Open", ITEMS[0].name)}
          actions={
            <Button size="small" variant="primary">
              Open
            </Button>
          }
          onExpand={() => setDetails(true)}
          meta={<Label size="small">{ITEMS[0].kind}</Label>}
        />
        {details ? (
          <HoverCardDetails
            label={ITEMS[0].name}
            onClose={() => setDetails(false)}
          >
            <Picture item={ITEMS[0]} height={280} />
            <Box p={4}>
              <Text sx={{ fontSize: 4, fontWeight: 600 }}>{ITEMS[0].name}</Text>
            </Box>
          </HoverCardDetails>
        ) : null}
      </Box>
    );
  },
};

/** Without a chevron: no `onExpand`, so no third size is offered. */
export const WithoutExpand: Story = {
  args: {
    title: ITEMS[2].name,
    description: ITEMS[2].description,
  },
  render: (args) => (
    <Box p={3} bg="canvas.default">
      <HoverCard
        {...args}
        picture={(height) => <Picture item={ITEMS[2]} height={height} />}
        meta={<Label size="small">{ITEMS[2].kind}</Label>}
      />
    </Box>
  ),
};

/**
 * A shelf of small cards: rest the pointer on one and after a moment it grows
 * into the hover card, whose chevron opens the large one. Escape closes either.
 */
export const Shelf: Story = {
  render: function ShelfStory() {
    const state = useHoverCard();
    const [details, setDetails] = useState<Item | null>(null);
    const previewed = ITEMS.find((item) => item.id === state.activeKey);
    return (
      <Box p={3} bg="canvas.default" minHeight={420}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 3,
          }}
        >
          {ITEMS.map((item) => (
            <HoverCardAnchor key={item.id} state={state} itemKey={item.id}>
              <Card border shadow="none" interactive overflow="hidden">
                <Picture item={item} height={100} />
                <Card.Content>
                  <Text sx={{ fontWeight: "bold" }}>{item.name}</Text>
                </Card.Content>
              </Card>
            </HoverCardAnchor>
          ))}
        </Box>
        {state.active && previewed ? (
          <HoverCardLayer
            anchor={state.active}
            onMouseEnter={state.cancelClose}
            onMouseLeave={state.scheduleClose}
          >
            <HoverCard
              anchorWidth={state.active.width}
              closing={state.closing}
              picture={(height) => <Picture item={previewed} height={height} />}
              onOpen={() => console.log("Open", previewed.name)}
              openLabel={`Open ${previewed.name}`}
              actions={
                <Button size="small" variant="primary">
                  Open
                </Button>
              }
              onExpand={() => setDetails(previewed)}
              expandLabel={`More about ${previewed.name}`}
              title={previewed.name}
              meta={<Label size="small">{previewed.kind}</Label>}
              description={previewed.description}
            />
          </HoverCardLayer>
        ) : null}
        {details ? (
          <HoverCardDetails
            label={details.name}
            onClose={() => setDetails(null)}
          >
            <Picture item={details} height={280} />
            <Box p={4} sx={{ display: "grid", gap: 3 }}>
              <Text sx={{ fontSize: 4, fontWeight: 600 }}>{details.name}</Text>
              <Label sx={{ justifySelf: "start" }}>{details.kind}</Label>
              <Text sx={{ color: "fg.muted" }}>{details.description}</Text>
            </Box>
          </HoverCardDetails>
        ) : null}
      </Box>
    );
  },
};

/** The large card over the page, on the overlay backdrop: closed by its button, the veil or Escape. */
export const Details: Story = {
  render: function DetailsStory() {
    const [open, setOpen] = useState(false);
    const item = ITEMS[1];
    return (
      <Box p={3} bg="canvas.default">
        <Button onClick={() => setOpen(true)}>Open the large card</Button>
        {open ? (
          <HoverCardDetails
            label={item.name}
            onClose={() => setOpen(false)}
            width={720}
          >
            <Picture item={item} height={240} />
            <Box p={4} sx={{ display: "grid", gap: 3 }}>
              <Text sx={{ fontSize: 4, fontWeight: 600 }}>{item.name}</Text>
              <Label sx={{ justifySelf: "start" }}>{item.kind}</Label>
              <Text sx={{ color: "fg.muted" }}>{item.description}</Text>
            </Box>
          </HoverCardDetails>
        ) : null}
      </Box>
    );
  },
};
