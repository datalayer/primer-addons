/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { Heading, Text } from '@primer/react';
import { Box } from '@datalayer/primer-addons';

const SURFACES = [
  { id: 'sage', title: 'Sage', says: 'White text and glass on a brushed surface.' },
  { id: 'steel', title: 'Steel', says: 'The accent, as a surface.' },
  { id: 'mauve', title: 'Mauve', says: 'For a second subject on the same page.' },
  { id: 'clay', title: 'Clay', says: 'For a third.' },
];

/** The four gradients the metal theme sets; under another theme they are not defined. */
export function MetalSurfacesDemo() {
  return (
    <Box display="grid" gap={3} gridTemplateColumns={['1fr', 'repeat(2, minmax(0, 1fr))', 'repeat(4, minmax(0, 1fr))']}>
      {SURFACES.map(surface => (
        <Box
          key={surface.id}
          display="flex"
          flexDirection="column"
          gap={4}
          p={3}
          minHeight={220}
          borderRadius="var(--loop-radius-card)"
          bg="canvas.subtle"
          style={{ backgroundImage: `var(--metal-gradient-${surface.id})`, color: '#FFFFFF' }}
          data-metal-surface={surface.id}
        >
          <Heading as="h3" sx={{ fontSize: 2, fontWeight: 'normal', color: 'inherit', m: 0 }}>
            {surface.title}
          </Heading>
          <Box
            p={3}
            border="1px solid"
            borderRadius="var(--loop-radius-bubble)"
            style={{ background: 'var(--metal-glass-bg)', borderColor: 'var(--metal-glass-border)' }}
          >
            <Text sx={{ fontSize: 1, color: 'inherit' }}>{surface.says}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
