/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState } from 'react';
import { Box, Text } from '@primer/react';
import { ColorPicker } from '@datalayer/primer-addons';

export function ColorPickerDemo() {
  const [color, setColor] = useState('#0969da');
  return (
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <ColorPicker color={color} onChange={setColor} showCollaboratorColors />
      <Box sx={{ display: 'grid', gap: 2, minWidth: 160 }}>
        <Box
          sx={{
            height: 72,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'var(--borderColor-default)',
            backgroundColor: color,
          }}
        />
        <Text sx={{ fontFamily: 'mono', fontSize: 1 }}>{color}</Text>
        <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
          Drag the field, the rail, or type a hex value. Arrow keys nudge a
          focused field; hold shift for ten at a time.
        </Text>
        <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
          Under the field: the neutral presets, then the active theme's own
          colours, then the colours a room gives its collaborators. Change the
          theme in the header and the last two rows change with it.
        </Text>
      </Box>
    </Box>
  );
}
