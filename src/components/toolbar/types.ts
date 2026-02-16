/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { ReactNode } from 'react';
import type { IconProps } from '@primer/octicons-react';

/**
 * Toolbar item types that can be registered in a toolbar.
 */
export type ToolbarItemType = 'button' | 'dropdown' | 'divider' | 'custom';

/**
 * Base toolbar item definition.
 */
export interface ToolbarItemBase {
  /** Unique key for the item */
  key: string;
  /** Item type */
  type: ToolbarItemType;
  /** Sort order (lower = earlier). Default: 100 */
  order?: number;
  /** Group name for logical grouping */
  group?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether to hide the item */
  hidden?: boolean;
}

/**
 * Toolbar button item definition.
 */
export interface ToolbarButtonItem extends ToolbarItemBase {
  type: 'button';
  /** Accessible label */
  ariaLabel: string;
  /** Tooltip text */
  title?: string;
  /** Icon component (Octicon or custom) */
  icon?: React.ComponentType<IconProps> | ReactNode;
  /** Text label */
  label?: string;
  /** Whether the button is in an active/pressed state */
  isActive?: boolean;
  /** Click handler */
  onClick: () => void;
  /** Keyboard shortcut hint (e.g., "⌘B") */
  shortcut?: string;
}

/**
 * Dropdown option for ToolbarDropdownItem.
 */
export interface ToolbarDropdownOption {
  /** Unique key */
  key: string;
  /** Display label */
  label: string;
  /** Icon component or element */
  icon?: React.ComponentType<IconProps> | ReactNode;
  /** Whether this option is active/selected */
  isActive?: boolean;
  /** Click handler */
  onClick: () => void;
  /** Keyboard shortcut hint */
  shortcut?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

/**
 * Toolbar dropdown item definition.
 */
export interface ToolbarDropdownItem extends ToolbarItemBase {
  type: 'dropdown';
  /** Accessible label */
  ariaLabel: string;
  /** Tooltip text */
  title?: string;
  /** Icon component or element for the trigger */
  icon?: React.ComponentType<IconProps> | ReactNode;
  /** Text label for the trigger */
  label?: string;
  /** Dropdown options */
  options: ToolbarDropdownOption[];
}

/**
 * Toolbar divider item definition.
 */
export interface ToolbarDividerItem extends ToolbarItemBase {
  type: 'divider';
}

/**
 * Toolbar custom item definition.
 */
export interface ToolbarCustomItem extends ToolbarItemBase {
  type: 'custom';
  /** Custom render function */
  render: () => ReactNode;
}

/**
 * Union of all toolbar item types.
 */
export type ToolbarItem =
  | ToolbarButtonItem
  | ToolbarDropdownItem
  | ToolbarDividerItem
  | ToolbarCustomItem;

/**
 * Props for the extensible Toolbar component.
 */
export interface ToolbarProps {
  /** Array of toolbar items to render */
  items: ToolbarItem[];
  /** Additional CSS class name */
  className?: string;
  /** Whether the entire toolbar is disabled */
  disabled?: boolean;
  /** Additional items to append (for extensibility) */
  extraItems?: ToolbarItem[];
  /** Aria label for the toolbar */
  ariaLabel?: string;
}

/**
 * Props for the extensible FloatingToolbar component.
 */
export interface FloatingToolbarProps {
  /** Array of toolbar items to render */
  items: ToolbarItem[];
  /** The anchor element to position relative to */
  anchorElement?: HTMLElement | null;
  /** Whether the floating toolbar is visible */
  isVisible: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Whether the entire toolbar is disabled */
  disabled?: boolean;
  /** Additional items to append (for extensibility) */
  extraItems?: ToolbarItem[];
  /** Aria label for the toolbar */
  ariaLabel?: string;
  /** Callback when the toolbar requests to close */
  onClose?: () => void;
  /** Portal container element. Defaults to document.body */
  portalContainer?: HTMLElement;
}
