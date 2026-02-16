/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Toolbar - Fixed/sticky toolbar component.
 *
 * An extensible toolbar that renders ToolbarItems using Primer React components.
 * Designed to be used as a rich text editor toolbar or any fixed toolbar.
 *
 * Usage:
 * ```tsx
 * <Toolbar
 *   items={[
 *     { key: 'bold', type: 'button', icon: BoldIcon, ariaLabel: 'Bold', onClick: () => {} },
 *     { key: 'divider-1', type: 'divider' },
 *     { key: 'heading', type: 'dropdown', ariaLabel: 'Heading', label: 'Normal', options: [...] },
 *   ]}
 *   extraItems={pluginItems}
 * />
 * ```
 *
 * @module components/toolbar/Toolbar
 */

import { useMemo } from 'react';
import { Box } from '../box/Box';
import type { ToolbarProps, ToolbarItem } from './types';
import { ToolbarRenderer } from './ToolbarRenderer';

export function Toolbar({
  items,
  extraItems,
  className,
  disabled,
  ariaLabel = 'Editor toolbar',
}: ToolbarProps) {
  const allItems: ToolbarItem[] = useMemo(() => {
    if (!extraItems?.length) return items;
    return [...items, ...extraItems];
  }, [items, extraItems]);

  return (
    <Box
      className={className}
      role="toolbar"
      aria-label={ariaLabel}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2px',
        px: 2,
        py: 1,
        bg: 'canvas.default',
        borderBottom: '1px solid',
        borderColor: 'border.default',
        position: 'sticky',
        top: 0,
        zIndex: 2,
      }}
    >
      <ToolbarRenderer items={allItems} disabled={disabled} size="medium" />
    </Box>
  );
}

export default Toolbar;
