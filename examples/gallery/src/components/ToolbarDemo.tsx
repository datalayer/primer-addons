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

import { Text } from '@primer/react';
import type { ToolbarItem } from '@datalayer/primer-addons';
import { Box, Toolbar } from '@datalayer/primer-addons';
import { useState } from 'react';

export function ToolbarDemo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [format, setFormat] = useState<'paragraph' | 'heading' | 'quote'>('paragraph');

  const items: ToolbarItem[] = [
    {
      key: 'bold',
      type: 'button',
      ariaLabel: 'Bold',
      label: 'B',
      isActive: bold,
      onClick: () => setBold(v => !v),
    },
    {
      key: 'italic',
      type: 'button',
      ariaLabel: 'Italic',
      label: 'I',
      isActive: italic,
      onClick: () => setItalic(v => !v),
    },
    { key: 'divider-1', type: 'divider' },
    {
      key: 'format',
      type: 'dropdown',
      ariaLabel: 'Block format',
      label: format,
      minWidth: 96,
      options: [
        {
          key: 'paragraph',
          label: 'paragraph',
          isActive: format === 'paragraph',
          onClick: () => setFormat('paragraph'),
        },
        {
          key: 'heading',
          label: 'heading',
          isActive: format === 'heading',
          onClick: () => setFormat('heading'),
        },
        {
          key: 'quote',
          label: 'quote',
          isActive: format === 'quote',
          onClick: () => setFormat('quote'),
        },
      ],
    },
  ];

  return (
    <Box>
      <Toolbar items={items} />
      <Box sx={{ p: 3, border: '1px solid', borderColor: 'var(--borderColor-default)' }}>
        <Text>
          Toolbar state: bold={String(bold)}, italic={String(italic)}, format={format}
        </Text>
      </Box>
    </Box>
  );
}
