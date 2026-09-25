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

import { Box, Text } from '@primer/react';
import {
  CollaboratorPalette,
  collaboratorColor,
  useCollaboratorColors,
} from '@datalayer/primer-addons';

const ROOM = ['ada', 'grace', 'alan', 'katherine', 'edsger'];

export function CollaboratorPaletteDemo() {
  const colors = useCollaboratorColors();
  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Text sx={{ fontSize: 1, fontWeight: 'semibold' }}>
          The palette of the active theme
        </Text>
        <CollaboratorPalette />
        <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
          Seven colours, taken from this theme's bright palette and ordered so
          neighbours never share a hue family. Change the theme or the colour
          mode in the header and the whole row follows.
        </Text>
      </Box>

      <Box sx={{ display: 'grid', gap: 2 }}>
        <Text sx={{ fontSize: 1, fontWeight: 'semibold' }}>
          A room of five
        </Text>
        <CollaboratorPalette people={ROOM} />
        <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
          Each person's colour is a stable hash of who they are, so everyone in
          the room draws everyone else the same way, with nothing handing
          numbers out.
        </Text>
      </Box>

      <Box sx={{ display: 'grid', gap: 2 }}>
        <Text sx={{ fontSize: 1, fontWeight: 'semibold' }}>Cursors</Text>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {ROOM.map(person => (
            <Box
              key={person}
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <Box
                aria-hidden="true"
                style={{
                  width: 2,
                  height: 20,
                  backgroundColor: collaboratorColor(person),
                }}
              />
              <Text
                sx={{
                  fontSize: 0,
                  px: 1,
                  borderRadius: 1,
                  color: '#fff',
                }}
                style={{ backgroundColor: collaboratorColor(person) }}
              >
                {person}
              </Text>
            </Box>
          ))}
        </Box>
        <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
          What a caret and its name tag look like in a shared document.
        </Text>
      </Box>

      <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
        {colors.length} colours in this theme. The same values are published as
        `--jp-collaborator-color1…7`, so a JupyterLab surface on the page
        agrees with a Primer one about who is who.
      </Text>
    </Box>
  );
}
