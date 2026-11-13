/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { Text } from '@primer/react';
import { Box, CircleIcon, CIRCLE_ICON_ROLES } from '@datalayer/primer-addons';

/** Each colour role in the theme's colour, then a fixed CSS colour, which does not follow it. */
export function CircleIconDemo() {
  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
        {CIRCLE_ICON_ROLES.map(role => (
          <Box key={role} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
            <CircleIcon color={role} />
            <Text sx={{ fontSize: 0, color: 'fg.muted' }}>{role}</Text>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
        {CIRCLE_ICON_ROLES.map(role => (
          <CircleIcon key={role} color={role} variant="emphasis" />
        ))}
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
          <CircleIcon color="#dd2222" />
          <Text sx={{ fontSize: 0, color: 'fg.muted' }}>#dd2222</Text>
        </Box>
      </Box>
    </Box>
  );
}
