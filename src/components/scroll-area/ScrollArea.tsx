/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { forwardRef, type ComponentProps } from 'react';
import { Box } from '../box/Box';

/**
 * A tiny scrollbar: thin, its thumb in the theme's border colour on a clear
 * track, darker on hover. Spread it into any scrolling element's `sx`.
 */
export const thinScrollbarSx = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'var(--borderColor-default, rgba(127, 127, 127, 0.4)) transparent',
  '&::-webkit-scrollbar': { width: '6px', height: '6px' },
  '&::-webkit-scrollbar-track': { background: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    background: 'var(--borderColor-default, rgba(127, 127, 127, 0.4))',
    borderRadius: '999px'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'var(--fgColor-muted, rgba(127, 127, 127, 0.7))'
  }
} as const;

export type ScrollAreaProps = ComponentProps<typeof Box>;

/**
 * A Box that scrolls (vertically by default) with the tiny scrollbar, its
 * scroll kept to itself. Any `sx` given is applied over it.
 */
export const ScrollArea = forwardRef<HTMLElement, ScrollAreaProps>(function ScrollArea({ sx, ...props }, ref) {
  return (
    <Box
      ref={ref as never}
      {...props}
      sx={{ overflowY: 'auto', overscrollBehavior: 'contain', ...thinScrollbarSx, ...(sx as object) }}
    />
  );
});

export default ScrollArea;
