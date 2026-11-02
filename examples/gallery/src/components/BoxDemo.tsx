/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The gallery's Box: one example per family of props, each with a line
 * saying what it shows and the code that draws it. No `sx` anywhere: every
 * value is a prop, on the theme's tokens, so switching the theme (try
 * `loop`) redraws them all — its hairline, its corners, its weights.
 */

import type { ReactNode } from 'react';
import { Button } from '@primer/react';
import { Box } from '@datalayer/primer-addons';

type Example = {
  title: string;
  /** What it shows, in plain words. */
  caption: string;
  code: string;
  render: () => ReactNode;
};

const Swatch = ({ children, ...props }: { children: ReactNode } & Record<string, unknown>) => (
  <Box p={2} borderRadius="medium" fontSize={0} {...props}>
    {children}
  </Box>
);

const EXAMPLES: Example[] = [
  {
    title: 'Spacing',
    caption:
      "Padding and margin on Primer's scale: 0 is none, 1 is 4px, 2 is 8px, 3 is 16px, 4 is 24px, 5 is 32px. Past the scale, a number is pixels.",
    code: `<Box p={1}>p={1}</Box>
<Box p={3}>p={3}</Box>
<Box px={4} py={2}>px={4} py={2}</Box>
<Box mt={3} ml={5}>mt={3} ml={5}</Box>`,
    render: () => (
      <Box display="flex" flexWrap="wrap" gap={2} alignItems="flex-start">
        {[{ p: 1 }, { p: 3 }, { px: 4, py: 2 }, { mt: 3, ml: 5 }].map(space => (
          <Box key={JSON.stringify(space)} bg="accent.subtle" borderRadius="small">
            <Box {...space} bg="canvas.default" border="1px dashed" borderColor="accent.muted" fontSize={0}>
              {Object.entries(space)
                .map(([k, v]) => `${k}={${v}}`)
                .join(' ')}
            </Box>
          </Box>
        ))}
      </Box>
    ),
  },
  {
    title: 'Colours and backgrounds',
    caption:
      "Colour names are the theme's: bg=\"canvas.subtle\" is var(--bgColor-muted), color=\"fg.muted\" is var(--fgColor-muted). No fallback: the theme sets them.",
    code: `<Box bg="canvas.subtle" color="fg.default">canvas.subtle</Box>
<Box bg="accent.subtle" color="accent.fg">accent</Box>
<Box bg="success.subtle" color="success.fg">success</Box>
<Box bg="attention.subtle" color="attention.fg">attention</Box>
<Box bg="danger.subtle" color="danger.fg">danger</Box>
<Box bg="neutral.emphasis" color="fg.onEmphasis">neutral.emphasis</Box>`,
    render: () => (
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Swatch bg="canvas.subtle" color="fg.default">canvas.subtle</Swatch>
        <Swatch bg="accent.subtle" color="accent.fg">accent</Swatch>
        <Swatch bg="success.subtle" color="success.fg">success</Swatch>
        <Swatch bg="attention.subtle" color="attention.fg">attention</Swatch>
        <Swatch bg="danger.subtle" color="danger.fg">danger</Swatch>
        <Swatch bg="neutral.emphasis" color="fg.onEmphasis">neutral.emphasis</Swatch>
      </Box>
    ),
  },
  {
    title: 'Borders and corners',
    caption:
      "A border is a line plus a colour token. Corners by name: small, medium, large and full are Primer's; card, control, bubble and frame are the theme's shapes.",
    code: `<Box border="1px solid" borderColor="border.default" borderRadius="small" />
<Box border="1px solid" borderColor="border.default" borderRadius="medium" />
<Box border="1px solid" borderColor="border.default" borderRadius="large" />
<Box border="1px solid" borderColor="border.default" borderRadius="full" />
<Box borderTop="2px solid" borderBottom="2px solid" borderColor="accent.emphasis" />
<Box border="1px solid" borderColor="border.default" borderRadius="card" />`,
    render: () => (
      <Box display="flex" flexWrap="wrap" gap={3}>
        {(['small', 'medium', 'large', 'full', 'card'] as const).map(radius => (
          <Box
            key={radius}
            px={3}
            py={2}
            border="1px solid"
            borderColor="border.default"
            borderRadius={radius}
            fontSize={0}
          >
            {radius}
          </Box>
        ))}
        <Box px={3} py={2} borderTop="2px solid" borderBottom="2px solid" borderColor="accent.emphasis" fontSize={0}>
          top and bottom
        </Box>
      </Box>
    ),
  },
  {
    title: 'A card',
    caption:
      "The Studio Home's card: the theme's hairline, its large corner (20px in loop), padded so the corner does not crowd the words.",
    code: `<Box as="section" display="flex" flexDirection="column" gap={2} p={3}
  bg="canvas.default" border="1px solid" borderColor="border.default" borderRadius="large">
  <Box as="h3" m={0} fontSize={3}>Build</Box>
  <Box as="p" m={0} color="fg.muted" fontSize={1}>Make an agent, try it, keep it.</Box>
</Box>`,
    render: () => (
      <Box
        as="section"
        display="flex"
        flexDirection="column"
        gap={2}
        p={3}
        maxWidth={360}
        bg="canvas.default"
        border="1px solid"
        borderColor="border.default"
        borderRadius="large"
      >
        <Box as="h3" m={0} fontSize={3}>
          Build
        </Box>
        <Box as="p" m={0} color="fg.muted" fontSize={1}>
          Make an agent, try it, keep it.
        </Box>
        <Box display="flex" gap={2} pt={1}>
          <Button size="small" variant="primary">
            Create agent
          </Button>
          <Button size="small">Templates</Button>
        </Box>
      </Box>
    ),
  },
  {
    title: 'Flex',
    caption: 'A row or a column, with a gap between and the items aligned.',
    code: `<Box display="flex" gap={2} alignItems="center" justifyContent="space-between">…</Box>
<Box display="flex" flexDirection="column" gap={1} alignItems="flex-start">…</Box>`,
    render: () => (
      <Box display="grid" gap={3}>
        <Box display="flex" gap={2} alignItems="center" justifyContent="space-between" p={2} bg="canvas.subtle" borderRadius="medium">
          <Swatch bg="accent.subtle">one</Swatch>
          <Swatch bg="accent.subtle" py={3}>
            two, taller
          </Swatch>
          <Swatch bg="accent.subtle">three</Swatch>
        </Box>
        <Box display="flex" flexDirection="column" gap={1} alignItems="flex-start" p={2} bg="canvas.subtle" borderRadius="medium">
          <Swatch bg="done.subtle">one</Swatch>
          <Swatch bg="done.subtle">two</Swatch>
          <Swatch bg="done.subtle">three</Swatch>
        </Box>
      </Box>
    ),
  },
  {
    title: 'Grid',
    caption: 'Columns as CSS writes them, a gap on the space scale.',
    code: `<Box display="grid" gridTemplateColumns="repeat(3, minmax(0, 1fr))" gap={2}>…</Box>`,
    render: () => (
      <Box display="grid" gridTemplateColumns="repeat(3, minmax(0, 1fr))" gap={2}>
        {['a', 'b', 'c', 'd', 'e', 'f'].map(cell => (
          <Swatch key={cell} bg="canvas.subtle" textAlign="center">
            {cell}
          </Swatch>
        ))}
      </Box>
    ),
  },
  {
    title: 'Responsive',
    caption:
      "One value per breakpoint — from 0, 544px, 768px, 1012px, 1280px — null to keep the one before: one column on a phone, three on a desktop. Narrow the window to see it.",
    code: `<Box display="grid" gridTemplateColumns={['1fr', null, 'repeat(3, 1fr)']}
  gap={[1, null, 3]} p={[2, null, 4]}>…</Box>`,
    render: () => (
      <Box
        display="grid"
        gridTemplateColumns={['1fr', null, 'repeat(3, 1fr)']}
        gap={[1, null, 3]}
        p={[2, null, 4]}
        bg="canvas.subtle"
        borderRadius="medium"
      >
        {['phone: one column', 'tablet: still one', 'desktop: three'].map(cell => (
          <Swatch key={cell} bg="canvas.default" border="1px solid" borderColor="border.default">
            {cell}
          </Swatch>
        ))}
      </Box>
    ),
  },
  {
    title: 'Type',
    caption:
      "Sizes on Primer's scale (0 is 12px, 1 is 14px, 3 is 20px), weights by name (the theme's: loop has two), alignment, and text that does not wrap.",
    code: `<Box fontSize={3} fontWeight="semibold">fontSize={3} semibold</Box>
<Box fontSize={1} color="fg.muted" textAlign="center">centred, muted</Box>
<Box fontSize={0} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" maxWidth={200}>…</Box>`,
    render: () => (
      <Box display="grid" gap={2}>
        <Box fontSize={3} fontWeight="semibold">
          fontSize={'{3}'} fontWeight="semibold"
        </Box>
        <Box fontSize={1} color="fg.muted" textAlign="center">
          fontSize={'{1}'}, centred, muted
        </Box>
        <Box fontSize={0} fontFamily="mono" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" maxWidth={200}>
          whiteSpace="nowrap" with an ellipsis when the line is too long for its box
        </Box>
      </Box>
    ),
  },
  {
    title: 'Position, layers, shadow, opacity',
    caption:
      "A badge placed over a card's corner: position and a zIndex; a shadow by name (shadow.medium is Primer's resting shadow); an opacity.",
    code: `<Box position="relative" p={3} boxShadow="shadow.medium" borderRadius="large">
  <Box position="absolute" top={-2} right={-2} zIndex={1} px={2} borderRadius="full"
    bg="accent.emphasis" color="fg.onEmphasis">new</Box>
</Box>
<Box opacity={0.5}>half there</Box>`,
    render: () => (
      <Box display="flex" gap={4} alignItems="center" flexWrap="wrap" pt={2}>
        <Box position="relative" p={3} bg="canvas.default" boxShadow="shadow.medium" borderRadius="large" fontSize={1}>
          A card on a shadow
          <Box
            position="absolute"
            top={-2}
            right={-2}
            zIndex={1}
            px={2}
            borderRadius="full"
            bg="accent.emphasis"
            color="fg.onEmphasis"
            fontSize={0}
          >
            new
          </Box>
        </Box>
        <Box p={3} bg="canvas.subtle" borderRadius="large" opacity={0.5} fontSize={1}>
          opacity={'{0.5}'}
        </Box>
      </Box>
    ),
  },
  {
    title: 'Hover and focus',
    caption:
      'States are props too: hover and focusVisible take a style of their own; cursor and transition say how it reads and moves. Hover it, or tab to it.',
    code: `<Box as="button" type="button" p={3} bg="canvas.default" border="1px solid" borderColor="border.default"
  borderRadius="large" cursor="pointer" transition="background-color 120ms ease"
  hover={{ bg: 'canvas.subtle' }}
  focusVisible={{ outline: '2px solid var(--focus-outlineColor)', outlineOffset: '2px' }}>…</Box>`,
    render: () => (
      <Box
        as="button"
        type="button"
        p={3}
        bg="canvas.default"
        color="fg.default"
        border="1px solid"
        borderColor="border.default"
        borderRadius="large"
        cursor="pointer"
        transition="background-color 120ms ease"
        hover={{ bg: 'canvas.subtle' }}
        focusVisible={{ outline: '2px solid var(--focus-outlineColor)', outlineOffset: '2px' }}
        reducedMotion={{ transition: 'none' }}
      >
        Hover or focus me
      </Box>
    ),
  },
  {
    title: 'as',
    caption: 'Any element or component: a section, a list and its items, a link.',
    code: `<Box as="section" aria-label="…">
  <Box as="ul" listStyle="none" m={0} p={0} display="grid" gap={1}>
    <Box as="li">…</Box>
  </Box>
  <Box as="a" href="#box" color="accent.fg">a link</Box>
</Box>`,
    render: () => (
      <Box as="section" aria-label="as" display="grid" gap={2}>
        <Box as="ul" listStyle="none" m={0} p={0} display="grid" gap={1}>
          {['a list item', 'another', 'and one more'].map(item => (
            <Box as="li" key={item} px={2} py={1} bg="canvas.subtle" borderRadius="small" fontSize={1}>
              {item}
            </Box>
          ))}
        </Box>
        <Box as="a" href="#box" color="accent.fg" fontSize={1}>
          a link, drawn by Box as="a"
        </Box>
      </Box>
    ),
  },
];

export function ExampleCode({ code }: { code: string }) {
  return (
    <Box
      as="pre"
      m={0}
      p={3}
      bg="canvas.subtle"
      borderRadius="medium"
      fontFamily="mono"
      fontSize={0}
      overflowX="auto"
      whiteSpace="pre"
    >
      {code}
    </Box>
  );
}

export function BoxDemo() {
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
