/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The hover card in its three sizes: a shelf of small cards that grow on
 * hover, the grown card on its own, and the large card its chevron opens.
 * All of it is drawn by the theme — switch to `loop` for its rounder corner.
 */

import { useState } from 'react';
import { Button, Label, Text } from '@primer/react';
import {
  Box,
  Card,
  HoverCard,
  HoverCardAnchor,
  HoverCardDetails,
  HoverCardLayer,
  useHoverCard,
} from '@datalayer/primer-addons';

type Item = { id: string; name: string; kind: string; description: string; color: string };

const ITEMS: Item[] = [
  { id: 'titanic', name: 'Titanic survival', kind: 'notebook', description: 'Who survived, and why: a classic dataset read again with an agent.', color: 'accent.emphasis' },
  { id: 'quarterly', name: 'Quarterly report', kind: 'document', description: 'Revenue, churn and the pipeline, written from the warehouse every quarter.', color: 'success.emphasis' },
  { id: 'deck', name: 'Launch deck', kind: 'deck', description: 'Twelve slides from a specification, presented in the browser.', color: 'done.emphasis' },
];

const Picture = ({ item, height }: { item: Item; height: number }) => (
  <Box height={height} bg={item.color} color="fg.onEmphasis" display="flex" alignItems="center" justifyContent="center" fontSize={3} fontWeight="semibold">
    {item.kind}
  </Box>
);

const Grown = ({ item, anchorWidth, closing, onExpand }: { item: Item; anchorWidth: number; closing?: boolean; onExpand: () => void }) => (
  <HoverCard
    anchorWidth={anchorWidth}
    closing={closing}
    picture={height => <Picture item={item} height={height} />}
    onOpen={() => undefined}
    openLabel={`Open ${item.name}`}
    actions={<Button size="small" variant="primary">Open</Button>}
    onExpand={onExpand}
    expandLabel={`More about ${item.name}`}
    title={item.name}
    meta={<Label size="small">{item.kind}</Label>}
    description={item.description}
  />
);

export function HoverCardDemo() {
  const state = useHoverCard();
  const [details, setDetails] = useState<Item | null>(null);
  const previewed = ITEMS.find(item => item.id === state.activeKey);
  return (
    <Box display="grid" gap={4}>
      <Box as="section" aria-label="Small, growing on hover" display="grid" gap={2}>
        <Box as="h3" m={0} fontSize={2} fontWeight="semibold">Small, growing on hover</Box>
        <Box as="p" m={0} color="fg.muted" fontSize={1}>
          Rest the pointer on a card: after a moment it grows into the hover card, which a chevron takes to the large one. Escape closes either.
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={3}>
          {ITEMS.map(item => (
            <HoverCardAnchor key={item.id} state={state} itemKey={item.id}>
              <Card border shadow="none" interactive overflow="hidden">
                <Picture item={item} height={100} />
                <Card.Content>
                  <Text sx={{ fontWeight: 'bold' }}>{item.name}</Text>
                </Card.Content>
              </Card>
            </HoverCardAnchor>
          ))}
        </Box>
        {state.active && previewed ? (
          <HoverCardLayer anchor={state.active} onMouseEnter={state.cancelClose} onMouseLeave={state.scheduleClose}>
            <Grown item={previewed} anchorWidth={state.active.width} closing={state.closing} onExpand={() => setDetails(previewed)} />
          </HoverCardLayer>
        ) : null}
      </Box>
      <Box as="section" aria-label="The grown card" display="grid" gap={2}>
        <Box as="h3" m={0} fontSize={2} fontWeight="semibold">The grown card</Box>
        <Box as="p" m={0} color="fg.muted" fontSize={1}>
          HoverCard on its own: the picture as a way in, actions, the focusable chevron, the whole title and description.
        </Box>
        <Box>
          <Grown item={ITEMS[0]} anchorWidth={240} onExpand={() => setDetails(ITEMS[0])} />
        </Box>
      </Box>
      <Box as="section" aria-label="The large card" display="grid" gap={2}>
        <Box as="h3" m={0} fontSize={2} fontWeight="semibold">The large card</Box>
        <Box as="p" m={0} color="fg.muted" fontSize={1}>
          HoverCardDetails over the page, on the overlay backdrop: closed by its button, the veil or Escape.
        </Box>
        <Box>
          <Button onClick={() => setDetails(ITEMS[1])}>Open the large card</Button>
        </Box>
      </Box>
      {details ? (
        <HoverCardDetails label={details.name} onClose={() => setDetails(null)}>
          <Picture item={details} height={280} />
          <Box p={4} display="grid" gap={3}>
            <Text sx={{ fontSize: 4, fontWeight: 600 }}>{details.name}</Text>
            <Label>{details.kind}</Label>
            <Text sx={{ color: 'fg.muted' }}>{details.description}</Text>
          </Box>
        </HoverCardDetails>
      ) : null}
    </Box>
  );
}
