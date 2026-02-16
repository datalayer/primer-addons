/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * ToolbarDropdown - A dropdown menu in a Toolbar.
 *
 * Uses Primer React ActionMenu for accessible dropdown menus.
 *
 * @module components/toolbar/ToolbarDropdown
 */

import { type ReactNode, isValidElement } from 'react';
import { ActionMenu, ActionList, Text } from '@primer/react';
import { Box } from '../box/Box';
import type { ToolbarDropdownItem, ToolbarDropdownOption } from './types';

export interface ToolbarDropdownProps {
  item: ToolbarDropdownItem;
  /** Size variant */
  size?: 'small' | 'medium';
}

function renderIcon(icon: ToolbarDropdownOption['icon']): ReactNode {
  if (!icon) return null;
  if (typeof icon === 'function') {
    const IconComp = icon as React.ComponentType<{ size?: number }>;
    return <IconComp size={16} />;
  }
  if (isValidElement(icon)) {
    return icon;
  }
  return null;
}

export function ToolbarDropdown({ item, size = 'medium' }: ToolbarDropdownProps) {
  const { ariaLabel, icon, label, options, disabled } = item;

  return (
    <ActionMenu>
      <ActionMenu.Button
        aria-label={ariaLabel}
        disabled={disabled}
        variant="invisible"
        size={size}
        sx={{
          color: 'fg.muted',
          fontWeight: 'normal',
          fontSize: size === 'small' ? 0 : 1,
          px: 2,
          '&:hover:not([disabled])': {
            bg: 'neutral.muted',
            color: 'fg.default',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {renderIcon(icon)}
          {label && (
            <Text sx={{ fontSize: size === 'small' ? 0 : 1 }}>{label}</Text>
          )}
        </Box>
      </ActionMenu.Button>
      <ActionMenu.Overlay width="auto">
        <ActionList>
          {options.map(option => (
            <ActionList.Item
              key={option.key}
              onSelect={option.onClick}
              disabled={option.disabled}
              active={option.isActive}
            >
              {option.icon && (
                <ActionList.LeadingVisual>
                  {renderIcon(option.icon)}
                </ActionList.LeadingVisual>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: 3 }}>
                <Text>{option.label}</Text>
                {option.shortcut && (
                  <Text sx={{ color: 'fg.subtle', fontSize: 0, fontFamily: 'mono' }}>
                    {option.shortcut}
                  </Text>
                )}
              </Box>
            </ActionList.Item>
          ))}
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}

export default ToolbarDropdown;
