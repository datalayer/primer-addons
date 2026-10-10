/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The gallery's Card: one example per prop and flavour, each with a line
 * saying what it shows and the code that draws it. Every colour, shadow and
 * corner is the theme's, so switching the theme (try `loop`) or the colour
 * mode redraws them all.
 */

import { useState, type MouseEvent, type ReactNode } from 'react';
import { ActionMenu, ActionList, Button, IconButton, Label, Text } from '@primer/react';
import { GlobeIcon, KebabHorizontalIcon, PeopleIcon, PlusIcon, ProjectIcon } from '@primer/octicons-react';
import { Box, Card, type CardVariant } from '@datalayer/primer-addons';
import { ExampleCode } from './BoxDemo';

type Example = {
  title: string;
  /** What it shows, in plain words. */
  caption: string;
  code: string;
  render: () => ReactNode;
};

const Row = ({ children }: { children: ReactNode }) => (
  <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))" gap={3}>
    {children}
  </Box>
);

const VARIANTS: CardVariant[] = ['default', 'subtle', 'inset', 'accent', 'success', 'attention', 'danger'];

function SelectableCards() {
  const [chosen, setChosen] = useState('ag-ui');
  return (
    <Row>
      {['ag-ui', 'acp', 'a2a', 'vercel-ai'].map(protocol => (
        <Card
          key={protocol}
          as="button"
          type="button"
          aria-pressed={chosen === protocol}
          onClick={() => setChosen(protocol)}
          interactive
          selected={chosen === protocol}
          shadow="none"
          p={3}
        >
          {protocol}
        </Card>
      ))}
    </Row>
  );
}

const EXAMPLES: Example[] = [
  {
    title: 'Slots',
    caption:
      'Card.Header (title, description, a leading visual, an action), Card.Content, Card.Actions. A card is a column, so its actions stand at the bottom.',
    code: `<Card border>
  <Card.Header title="Datalayer Card" description="Composable" leadingVisual={ProjectIcon} />
  <Card.Content>…</Card.Content>
  <Card.Actions><Button>Action</Button></Card.Actions>
</Card>`,
    render: () => (
      <Card border maxWidth={420}>
        <Card.Header title="Datalayer Card" description="Composable addon component" leadingVisual={ProjectIcon} />
        <Card.Content>
          <Text as="p" sx={{ m: 0 }}>
            The theme's ground, hairline, corner and shadow.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button>Action</Button>
        </Card.Actions>
      </Card>
    ),
  },
  {
    title: 'Border, corner, shadow',
    caption:
      "border draws the theme's hairline. rounded takes Primer's radii (small, medium, large, full) or the theme's shapes (control, card, bubble, frame); the theme's card corner by default. shadow is none, small (the default), medium, large or extraLarge — Primer's shadow variables, set per colour mode.",
    code: `<Card border shadow="none">flat</Card>
<Card rounded="control" shadow="medium">control, medium</Card>
<Card rounded="small" shadow="large">small, large</Card>
<Card border shadow="extraLarge">extraLarge</Card>`,
    render: () => (
      <Row>
        <Card border shadow="none" p={3}>border, shadow none</Card>
        <Card rounded="control" shadow="medium" p={3}>rounded control, medium</Card>
        <Card rounded="small" shadow="large" p={3}>rounded small, large</Card>
        <Card border shadow="extraLarge" p={3}>border, extraLarge</Card>
      </Row>
    ),
  },
  {
    title: 'Variants',
    caption:
      'The flavour: a ground and, bordered, a hairline from the theme. default, subtle and inset are surfaces; accent, success, attention and danger are notes in that tone.',
    code: `<Card border shadow="none" variant="subtle">subtle</Card>
<Card border shadow="none" variant="accent">accent</Card>`,
    render: () => (
      <Row>
        {VARIANTS.map(variant => (
          <Card key={variant} border shadow="none" variant={variant} p={3}>
            {variant}
          </Card>
        ))}
      </Row>
    ),
  },
  {
    title: 'Interactive',
    caption:
      'A card that is clicked: a pointer, the accent hairline and a lifted shadow on hover, a focus ring for the keyboard. As a button it reads left to right in the page font, with the card hairline.',
    code: `<Card as="button" type="button" interactive shadow="none" p={3} onClick={open}>
  Tutor
</Card>`,
    render: () => (
      <Row>
        {['Tutor', 'Pitcher', 'Marketer'].map(name => (
          <Card key={name} as="button" type="button" interactive shadow="none" p={3}>
            <Text sx={{ fontWeight: 'bold' }}>{name}</Text>
            <Text sx={{ color: 'fg.muted', fontSize: 1 }}>Opens its case.</Text>
          </Card>
        ))}
      </Row>
    ),
  },
  {
    title: 'Selected',
    caption:
      'The chosen card among others: an accent border on an accent wash. The caller says it to assistive technology (aria-pressed here).',
    code: `<Card as="button" type="button" interactive selected={chosen === p}
  aria-pressed={chosen === p} onClick={() => setChosen(p)}>{p}</Card>`,
    render: () => <SelectableCards />,
  },
  {
    title: 'Dashed and disabled',
    caption:
      'dashed draws a dashed hairline — a placeholder, a "create new" card. disabled lowers the card, drops the pointer and the hover, and sets aria-disabled on an interactive one.',
    code: `<Card as="button" type="button" interactive dashed shadow="none">Create new</Card>
<Card as="button" type="button" interactive dashed disabled shadow="none">Create new</Card>`,
    render: () => (
      <Row>
        {[false, true].map(disabled => (
          <Card
            key={String(disabled)}
            as="button"
            type="button"
            interactive
            dashed
            disabled={disabled}
            shadow="none"
            minHeight={120}
            alignItems="center"
            justifyContent="center"
            color="fg.muted"
          >
            <PlusIcon size={24} />
            <Text sx={{ mt: 2 }}>{disabled ? 'Create new (disabled)' : 'Create new'}</Text>
          </Card>
        ))}
      </Row>
    ),
  },
  {
    title: 'Accent edge',
    caption:
      "accent draws a colour along the top edge: a theme token, or an item's own colour from the theme.",
    code: `<Card border shadow="none" accent="success.emphasis">running</Card>
<Card border shadow="none" accent="attention.emphasis">waiting</Card>`,
    render: () => (
      <Row>
        {[
          ['success.emphasis', 'running'],
          ['attention.emphasis', 'waiting'],
          ['danger.emphasis', 'failed'],
          ['accent.emphasis', 'new'],
        ].map(([accent, label]) => (
          <Card key={accent} border shadow="none" accent={accent} p={3}>
            {label}
          </Card>
        ))}
      </Row>
    ),
  },
  {
    title: 'Cover and footer',
    caption:
      "Card.Cover is an image, a gradient between two colours or a theme colour, with a glyph centred on it and an accessory (a label, a menu) in its corner. Card.Footer is the metadata line over a hairline. This is a space's card.",
    code: `<Card border shadow="none" interactive overflow="hidden">
  <Card.Cover gradient={{ from, to }} accessory={<Label>project</Label>}>ANALYSIS</Card.Cover>
  <Card.Content>…</Card.Content>
  <Card.Footer><Label variant="success">Public</Label> …</Card.Footer>
</Card>`,
    render: () => (
      <Row>
        {[
          { glyph: 'ANALYSIS', gradient: { from: 'var(--bgColor-accent-emphasis)', to: 'var(--bgColor-done-emphasis)' } },
          { glyph: 'COURSE', color: 'success.emphasis' },
          { glyph: 'DEFAULT' },
        ].map(({ glyph, gradient, color }) => (
          <Card key={glyph} border shadow="none" interactive overflow="hidden" minHeight={240}>
            <Card.Cover
              gradient={gradient}
              color={color}
              accessory={
                <Box display="inline-flex" gap={1} onClick={(event: MouseEvent) => event.stopPropagation()}>
                  <Label size="small">project</Label>
                  <ActionMenu>
                    <ActionMenu.Anchor>
                      <IconButton icon={KebabHorizontalIcon} aria-label="Actions" size="small" variant="invisible" />
                    </ActionMenu.Anchor>
                    <ActionMenu.Overlay width="small">
                      <ActionList>
                        <ActionList.Item>Rename</ActionList.Item>
                      </ActionList>
                    </ActionMenu.Overlay>
                  </ActionMenu>
                </Box>
              }
            >
              {glyph}
            </Card.Cover>
            <Card.Content flex={1}>
              <Text sx={{ fontWeight: 'bold', display: 'block' }}>{glyph.toLowerCase()}</Text>
              <Text sx={{ color: 'fg.muted', fontSize: 1 }}>A space of notebooks and data.</Text>
            </Card.Content>
            <Card.Footer>
              <Label variant="success" sx={{ display: 'inline-flex', gap: 1 }}>
                <GlobeIcon size={12} /> Public
              </Label>
              <Label variant="secondary" sx={{ display: 'inline-flex', gap: 1 }}>
                <PeopleIcon size={12} /> 3
              </Label>
            </Card.Footer>
          </Card>
        ))}
      </Row>
    ),
  },
];

export function CardDemo() {
  return (
    <Box display="grid" gap={4}>
      {EXAMPLES.map(example => (
        <Box as="section" key={example.title} aria-label={example.title} display="grid" gap={2}>
          <Box as="h3" m={0} fontSize={2} fontWeight="semibold">
            {example.title}
          </Box>
          <Box as="p" m={0} color="fg.muted" fontSize={1}>
            {example.caption}
          </Box>
          <Box p={3} border="1px solid" borderColor="border.default" borderRadius="card">
            {example.render()}
          </Box>
          <ExampleCode code={example.code} />
        </Box>
      ))}
    </Box>
  );
}
