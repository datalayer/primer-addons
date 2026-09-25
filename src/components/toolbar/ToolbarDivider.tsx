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

/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * ToolbarDivider - A vertical divider between toolbar items.
 *
 * @module components/toolbar/ToolbarDivider
 */

import { Box } from '../box/Box';

export interface ToolbarDividerProps {
  /** Orientation: vertical for horizontal toolbars, horizontal for vertical */
  orientation?: 'vertical' | 'horizontal';
}

export function ToolbarDivider({ orientation = 'vertical' }: ToolbarDividerProps) {
  return (
    <Box
      sx={{
        ...(orientation === 'vertical'
          ? {
              width: '1px',
              height: '20px',
              mx: 1,
            }
          : {
              height: '1px',
              width: '100%',
              my: 1,
            }),
        bg: 'border.muted',
        flexShrink: 0,
      }}
    />
  );
}

export default ToolbarDivider;
