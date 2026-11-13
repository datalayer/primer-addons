/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { Box, Sheet } from '@datalayer/primer-addons';

/** A sheet on a quiet canvas: the page the page layout draws, on its own. */
export function SheetDemo() {
  return (
    <Box display="grid" gap={4}>
      <Box bg="canvas.subtle" p={4} borderRadius="card">
        <Sheet px={[3, 4, '56px']} py={4} maxWidth={640} mx="auto">
          <Box as="h3" m={0} mb={2} fontSize={3}>
            A page
          </Box>
          <Box as="p" m={0} color="fg.muted">
            The canvas colour, its hairline, the theme&apos;s card corner and the
            shadow a sheet of paper has. Its size, padding and layout are yours.
          </Box>
        </Sheet>
      </Box>
      <Box display="grid" gridTemplateColumns={['1fr', 'repeat(3, 1fr)']} gap={3}>
        {['Notes', 'Draft', 'Report'].map(name => (
          <Sheet key={name} p={3} minHeight={120}>
            <Box fontWeight="semibold">{name}</Box>
            <Box color="fg.muted" fontSize={0}>
              Three sheets side by side, each padded as its content needs.
            </Box>
          </Sheet>
        ))}
      </Box>
    </Box>
  );
}
