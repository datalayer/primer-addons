/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { Box, ColorSwatch } from '@datalayer/primer-addons';

/** One colour as a card: its block, its name and the value the theme resolves it to. */
export function ColorSwatchDemo() {
  return (
    <Box display="grid" gap={4}>
      <Box display="grid" gridTemplateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={2}>
        <ColorSwatch color="var(--bgColor-accent-emphasis)" label="Accent" />
        <ColorSwatch color="var(--bgColor-success-emphasis)" label="Success" />
        <ColorSwatch color="var(--bgColor-attention-emphasis)" label="Attention" />
        <ColorSwatch color="var(--bgColor-danger-emphasis)" label="Danger" />
      </Box>
      <Box display="grid" gridTemplateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={2}>
        <ColorSwatch color="#7ad7b1" label="A fixed colour" height={32} />
        <ColorSwatch color="var(--fgColor-default)" label="Without its value" showValue={false} height={32} />
      </Box>
      <Box as="p" m={0} color="fg.muted" fontSize={0}>
        A CSS colour or a theme variable; the value under it is read from the page,
        so it follows the theme and the colour mode. Height and the value are optional.
      </Box>
    </Box>
  );
}
