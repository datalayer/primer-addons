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
    /*
     * An extra item takes the place of the item it shares its key with.
     *
     * A host that knows better what one of the items should do — how this
     * document is saved, where it is run — says so with the key of that item
     * rather than adding a second button next to it. What it leaves out, its
     * order and its icon among them, stays as the toolbar had it.
     */
    const overrides = new Map(extraItems.map(item => [item.key, item]));
    const merged = items.map(item => {
      const override = overrides.get(item.key);
      if (!override) {
        return item;
      }
      overrides.delete(item.key);
      return { ...item, ...override } as ToolbarItem;
    });
    return [...merged, ...extraItems.filter(item => overrides.has(item.key))];
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
        zIndex: 1,
      }}
    >
      <ToolbarRenderer items={allItems} disabled={disabled} size="medium" />
    </Box>
  );
}

export default Toolbar;
