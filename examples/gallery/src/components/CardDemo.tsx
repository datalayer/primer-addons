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
import {
  BeakerIcon,
  GlobeIcon,
  KebabHorizontalIcon,
  PeopleIcon,
  PlusIcon,
  ProjectIcon,
  RocketIcon,
  TelescopeIcon,
  ToolsIcon,
} from '@primer/octicons-react';
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

/** The tints the landing's card grids cycle through, one per card. */
const LIFT_ACCENTS = [
  { color: 'accent.fg', bg: 'accent.subtle' },
  { color: 'done.fg', bg: 'done.subtle' },
  { color: 'attention.fg', bg: 'attention.subtle' },
] as const;

const LIFT_SOURCES = [
  { icon: GlobeIcon, title: 'Satellite sources', text: 'Sentinel, Landsat and commercial constellations.' },
  { icon: TelescopeIcon, title: 'Change detection', text: 'What moved since the last pass, flagged.' },
  { icon: RocketIcon, title: 'Alerts', text: 'Within the hour, where the team already works.' },
];

const LIFT_TOOLS = [
  { name: 'Earthdata', text: 'Search and read NASA Earthdata granules.', fact: '12 tools', enabled: true },
  { name: 'Odoo', text: 'Invoices, partners and the ledger.', fact: '9 tools', enabled: true },
  { name: 'Slack', text: 'Post the answer to a channel.', fact: '3 tools', enabled: false },
];

/** A small label set like the landing's: mono, wide, upper case. */
const MONO = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

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
      "border draws the theme's hairline. rounded takes Primer's radii (small, medium, large, full) or the theme's shapes (control, card, bubble, frame, overlay); the theme's card corner by default. shadow is none, small (the default), medium, large or extraLarge — Primer's shadow variables, set per colour mode.",
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
    title: 'Lift — the Earth Observation card',
    caption:
      "hoverEffect=\"lift\": on hover the card rises 3px onto shadow.large, its hairline turns border.muted, a light of accent.fg runs along its top edge, and its Card.Icon grows 6% and tilts 3° (260ms, the icon 320ms, on CARD_EASE). Card.Icon is a glyph in a tinted square — any element marked data-card-icon moves the same way. This is /agentify/earth-observation's grid.",
    code: `<Card hoverEffect="lift" shadow="none" p={4}>
  <Card.Icon icon={GlobeIcon} color="done.fg" bg="done.subtle" />
  <Heading as="h3">Satellite sources</Heading>
  <Text color="fg.muted">…</Text>
</Card>`,
    render: () => (
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={3}>
        {LIFT_SOURCES.map((item, i) => (
          <Card key={item.title} hoverEffect="lift" shadow="none" p={4}>
            <Card.Icon icon={item.icon} {...LIFT_ACCENTS[i % LIFT_ACCENTS.length]} />
            <Text sx={{ fontWeight: 'bold', fontSize: 3, mb: 2 }}>{item.title}</Text>
            <Text sx={{ color: 'fg.muted', fontSize: 1, lineHeight: 1.65 }}>{item.text}</Text>
          </Card>
        ))}
      </Box>
    ),
  },
  {
    title: 'Lift — the Integrations card',
    caption:
      'The same lift with a status in the corner, a fact at the foot and a dashed, quieter card for what is declared but not offered — /settings/integrations. The card is position: relative under the lift, so a badge places itself against it.',
    code: `<Card hoverEffect="lift" shadow="none" p={4} gap={2}
  sx={enabled ? {} : { borderStyle: 'dashed', bg: 'canvas.subtle', opacity: 0.72 }}>
  <Label sx={{ position: 'absolute', top: 3, right: 3 }}>Enabled</Label>
  <Card.Icon icon={ToolsIcon} color="done.fg" bg="done.subtle" />
  …
</Card>`,
    render: () => (
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={3}>
        {LIFT_TOOLS.map(tool => (
          <Card
            key={tool.name}
            hoverEffect="lift"
            shadow="none"
            p={4}
            gap={2}
            sx={tool.enabled ? {} : { borderStyle: 'dashed', bg: 'canvas.subtle', opacity: 0.72 }}
          >
            <Text
              sx={{
                position: 'absolute',
                top: 3,
                right: 3,
                px: 2,
                py: '2px',
                borderRadius: 999,
                border: '1px solid',
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                ...(tool.enabled
                  ? { color: 'success.fg', bg: 'success.subtle', borderColor: 'success.muted' }
                  : { color: 'fg.muted', bg: 'neutral.subtle', borderColor: 'border.default' }),
              }}
            >
              {tool.enabled ? 'Enabled' : 'Not available'}
            </Text>
            <Card.Icon icon={ToolsIcon} color="done.fg" bg="done.subtle" />
            <Text sx={{ fontWeight: 'bold', fontSize: 2 }}>{tool.name}</Text>
            <Text sx={{ color: 'fg.muted', fontSize: 1, lineHeight: 1.65 }}>{tool.text}</Text>
            <Text sx={{ mt: 'auto', pt: 3, fontFamily: MONO, fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'fg.muted' }}>
              {tool.fact}
            </Text>
          </Card>
        ))}
      </Box>
    ),
  },
  {
    title: 'Lift — keyboard and reduced motion',
    caption:
      "The keyboard gets the hover: a focusable card lifts on :focus-visible (Tab to the first), and a card lifts while a link or button inside it has the keyboard's focus (:has(:focus-visible); Tab to the link in the second). With prefers-reduced-motion: reduce (your system setting, or DevTools › Rendering › Emulate CSS prefers-reduced-motion) nothing moves — no rise, no tilt — and the shadow, the hairline and the top light still change. A clickable lifted card can be interactive too: its hover hairline is then the accent (the third).",
    code: `<Card hoverEffect="lift" tabIndex={0}>…</Card>
<Card hoverEffect="lift"><a href="#">Open the docs</a></Card>
<Card as="button" type="button" interactive hoverEffect="lift">…</Card>`,
    render: () => (
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={3}>
        <Card hoverEffect="lift" shadow="none" p={4} tabIndex={0} aria-label="A focusable card">
          <Card.Icon icon={BeakerIcon} />
          <Text sx={{ fontWeight: 'bold' }}>tabIndex=0</Text>
          <Text sx={{ color: 'fg.muted', fontSize: 1 }}>Lifts on hover and on focus-visible.</Text>
        </Card>
        <Card hoverEffect="lift" shadow="none" p={4}>
          <Card.Icon icon={ProjectIcon} color="attention.fg" bg="attention.subtle" />
          <Text sx={{ fontWeight: 'bold' }}>A link inside</Text>
          <Box as="a" href="#lift" color="accent.fg" fontSize={1}>
            Open the docs
          </Box>
        </Card>
        <Card as="button" type="button" interactive hoverEffect="lift" shadow="none" p={4}>
          <Card.Icon icon={RocketIcon} color="done.fg" bg="done.subtle" />
          <Text sx={{ fontWeight: 'bold' }}>interactive + lift</Text>
          <Text sx={{ color: 'fg.muted', fontSize: 1 }}>The accent hairline on hover.</Text>
        </Card>
      </Box>
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
    title: 'An attached panel',
    caption:
      "rounded=\"overlay\" is the theme's corner for a panel floating over the page — a menu, a header's mega-menu (Primer's overlay corner unless the theme sets --theme-radius-overlay; loop's is its card corner). With the top corners squared it reads as hanging from what opened it.",
    code: `<Card border shadow="extraLarge" rounded="overlay"
  borderTopLeftRadius={0} borderTopRightRadius={0} p={4}>…</Card>`,
    render: () => (
      <Box>
        <Box px={3} py={2} bg="canvas.subtle" border="1px solid" borderColor="border.default" fontSize={1} fontWeight="semibold">
          Header · Cases ▾
        </Box>
        <Card
          border
          shadow="extraLarge"
          rounded="overlay"
          borderTopLeftRadius={0}
          borderTopRightRadius={0}
          borderTop="none"
          p={4}
          display="grid"
          gridTemplateColumns="1fr 1fr 1.1fr"
          gap={3}
        >
          <Box display="grid" gap={2}>
            <Text sx={{ fontSize: 0, color: 'fg.muted', fontWeight: 'bold' }}>Industries</Text>
            <Text>Healthcare</Text>
            <Text>Insurance</Text>
          </Box>
          <Box display="grid" gap={2}>
            <Text sx={{ fontSize: 0, color: 'fg.muted', fontWeight: 'bold' }}>More scenarios</Text>
            <Text>Market analyst</Text>
            <Text>Personal assistant</Text>
          </Box>
          <Card border shadow="none" interactive overflow="hidden" minHeight={100}>
            <Card.Cover height={100} color="done.emphasis">Spotlight</Card.Cover>
          </Card>
        </Card>
      </Box>
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
