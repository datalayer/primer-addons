/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
