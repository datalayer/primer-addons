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
