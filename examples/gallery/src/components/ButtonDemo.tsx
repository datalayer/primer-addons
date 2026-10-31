/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The gallery's Button: Primer's buttons in the theme, one example per
 * variant and state, each with a line saying what it shows and the code that
 * draws it. Switching the theme or the colour mode redraws them all.
 */

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button, ButtonGroup, Heading, IconButton, LinkButton, SegmentedControl, Text } from '@primer/react';
import {
  ArrowRightIcon,
  CopyIcon,
  DownloadIcon,
  GearIcon,
  KebabHorizontalIcon,
  PlusIcon,
  RocketIcon,
  SearchIcon,
  TrashIcon,
  TriangleDownIcon,
} from '@primer/octicons-react';
import { Box } from '@datalayer/primer-addons';
import { ExampleCode } from './BoxDemo';

const Row = ({ children }: { children: ReactNode }) => (
  <Box display="flex" flexWrap="wrap" alignItems="center" gap={2}>
    {children}
  </Box>
);

function Choice() {
  const [at, setAt] = useState(0);
  return (
    <SegmentedControl aria-label="Show as" onChange={setAt}>
      {['Cards', 'Table', 'Graph'].map((name, index) => (
        <SegmentedControl.Button key={name} selected={at === index}>
          {name}
        </SegmentedControl.Button>
      ))}
    </SegmentedControl>
  );
}

function Loading() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      variant="primary"
      loading={loading}
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 1500);
      }}
    >
      Run it
    </Button>
  );
}

const EXAMPLES: { title: string; caption: string; code: string; render: () => ReactNode }[] = [
  {
    title: 'Variants',
    caption: 'One primary to a screen: the thing to press. default for the rest, invisible where a frame is too much, danger for what cannot be undone.',
    code: `<Button variant="primary">Primary</Button>
<Button>Default</Button>
<Button variant="invisible">Invisible</Button>
<Button variant="danger">Danger</Button>`,
    render: () => (
      <Row>
        <Button variant="primary">Primary</Button>
        <Button>Default</Button>
        <Button variant="invisible">Invisible</Button>
        <Button variant="danger">Danger</Button>
      </Row>
    ),
  },
  {
    title: 'Sizes',
    caption: 'small, medium by default, large; block fills its column.',
    code: `<Button size="small">Small</Button>
<Button>Medium</Button>
<Button size="large">Large</Button>
<Button block>Block</Button>`,
    render: () => (
      <Box display="grid" gap={2}>
        <Row>
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary">Medium</Button>
          <Button variant="primary" size="large">Large</Button>
          <Button size="small">Small</Button>
          <Button>Medium</Button>
          <Button size="large">Large</Button>
        </Row>
        <Button block>Block</Button>
      </Box>
    ),
  },
  {
    title: 'With an icon, a count, a caret',
    caption: 'leadingVisual says what it does, trailingVisual a count or where it goes, trailingAction that it opens something.',
    code: `<Button leadingVisual={RocketIcon} variant="primary">Ship</Button>
<Button trailingVisual={ArrowRightIcon}>Continue</Button>
<Button count={12}>Issues</Button>
<Button trailingAction={TriangleDownIcon}>Version 3</Button>`,
    render: () => (
      <Row>
        <Button leadingVisual={RocketIcon} variant="primary">Ship</Button>
        <Button leadingVisual={DownloadIcon}>Download</Button>
        <Button trailingVisual={ArrowRightIcon}>Continue</Button>
        <Button count={12}>Issues</Button>
        <Button trailingAction={TriangleDownIcon}>Version 3</Button>
        <Button leadingVisual={TrashIcon} variant="danger">Delete</Button>
      </Row>
    ),
  },
  {
    title: 'Icon buttons',
    caption: 'No words on screen: aria-label says it to a screen reader and the tooltip to everybody else.',
    code: `<IconButton icon={SearchIcon} aria-label="Search" />
<IconButton icon={GearIcon} aria-label="Settings" variant="invisible" />
<IconButton icon={TrashIcon} aria-label="Delete" variant="danger" />`,
    render: () => (
      <Row>
        <IconButton icon={SearchIcon} aria-label="Search" size="small" />
        <IconButton icon={SearchIcon} aria-label="Search" />
        <IconButton icon={SearchIcon} aria-label="Search" size="large" />
        <IconButton icon={PlusIcon} aria-label="Add" variant="primary" />
        <IconButton icon={GearIcon} aria-label="Settings" variant="invisible" />
        <IconButton icon={KebabHorizontalIcon} aria-label="More" variant="invisible" />
        <IconButton icon={TrashIcon} aria-label="Delete" variant="danger" />
      </Row>
    ),
  },
  {
    title: 'States',
    caption: 'disabled says it cannot be used; inactive that it can but will not; loading that it is at work, here for a second and a half.',
    code: `<Button disabled>Disabled</Button>
<Button inactive>Inactive</Button>
<Button variant="primary" loading>Run it</Button>`,
    render: () => (
      <Row>
        <Button variant="primary" disabled>Disabled</Button>
        <Button disabled>Disabled</Button>
        <Button variant="danger" disabled>Disabled</Button>
        <Button inactive>Inactive</Button>
        <Button loading>Loading</Button>
        <Loading />
      </Row>
    ),
  },
  {
    title: 'Links and groups',
    caption: 'LinkButton looks like a button and goes somewhere. ButtonGroup joins actions that belong together; SegmentedControl chooses one of a few.',
    code: `<LinkButton href="#">Read the docs</LinkButton>
<ButtonGroup>
  <Button>Copy</Button>
  <IconButton icon={TriangleDownIcon} aria-label="More copy options" />
</ButtonGroup>
<SegmentedControl aria-label="Show as">…</SegmentedControl>`,
    render: () => (
      <Row>
        <LinkButton href="#" variant="primary">Get started</LinkButton>
        <LinkButton href="#">Read the docs</LinkButton>
        <ButtonGroup>
          <Button leadingVisual={CopyIcon}>Copy</Button>
          <IconButton icon={TriangleDownIcon} aria-label="More copy options" />
        </ButtonGroup>
        <Choice />
      </Row>
    ),
  },
];

export function ButtonDemo() {
  return (
    <Box display="grid" gap={4}>
      {EXAMPLES.map(example => (
        <Box key={example.title} display="grid" gap={2}>
          <Heading as="h3" sx={{ fontSize: 2, m: 0 }}>{example.title}</Heading>
          <Text as="p" sx={{ color: 'fg.muted', fontSize: 1, m: 0 }}>{example.caption}</Text>
          <Box p={3} border="1px solid" borderColor="border.default" borderRadius="card">
            {example.render()}
          </Box>
          <ExampleCode code={example.code} />
        </Box>
      ))}
    </Box>
  );
}
