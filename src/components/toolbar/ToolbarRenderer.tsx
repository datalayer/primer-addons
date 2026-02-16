/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * ToolbarRenderer - Renders an array of ToolbarItems.
 *
 * Shared logic between Toolbar and FloatingToolbar.
 *
 * @module components/toolbar/ToolbarRenderer
 */

import { Fragment } from 'react';
import type { ToolbarItem } from './types';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarDivider } from './ToolbarDivider';

export interface ToolbarRendererProps {
  items: ToolbarItem[];
  disabled?: boolean;
  size?: 'small' | 'medium';
}

/**
 * Sort items by order, then render each one according to its type.
 */
export function ToolbarRenderer({ items, disabled, size = 'medium' }: ToolbarRendererProps) {
  const sorted = [...items]
    .filter(item => !item.hidden)
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100));

  return (
    <>
      {sorted.map(item => {
        const itemDisabled = disabled || item.disabled;

        switch (item.type) {
          case 'button':
            return (
              <Fragment key={item.key}>
                <ToolbarButton
                  item={{ ...item, disabled: itemDisabled }}
                  size={size}
                />
              </Fragment>
            );

          case 'dropdown':
            return (
              <Fragment key={item.key}>
                <ToolbarDropdown
                  item={{ ...item, disabled: itemDisabled }}
                  size={size}
                />
              </Fragment>
            );

          case 'divider':
            return (
              <Fragment key={item.key}>
                <ToolbarDivider />
              </Fragment>
            );

          case 'custom':
            return <Fragment key={item.key}>{item.render()}</Fragment>;

          default:
            return null;
        }
      })}
    </>
  );
}

export default ToolbarRenderer;
