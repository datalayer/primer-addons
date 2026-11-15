/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { ReactNode } from "react";
import type { IconProps } from "@primer/octicons-react";

/**
 * Toolbar item types that can be registered in a toolbar.
 */
export type ToolbarItemType =
  "button" | "dropdown" | "divider" | "spacer" | "custom";

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
  /**
   * Never moved into the overflow menu, however narrow the line: the
   * controls a reader must always find where they left them (a close
   * button, a session menu). Pinned items count against the room first.
   */
  pinned?: boolean;
  /**
   * Which items leave the line first when the room runs out: the lowest
   * priority goes first, and among equals the last item on the line.
   * Default: 0. The menu lists what left in the line's own order.
   */
  priority?: number;
}

/**
 * What a custom item becomes in the overflow menu.
 *
 * - `onSelect`: a labelled menu row (`label`, `icon`) that runs it and
 *   closes the menu — for a control whose node only makes sense on the line.
 * - `render`: a node of its own for the menu.
 * - neither: the item's own `render()` is drawn in the menu as on the line.
 */
export interface ToolbarOverflowRepresentation {
  /** The menu row's name (required with `onSelect`). */
  label?: string;
  /** The menu row's icon. */
  icon?: React.ComponentType<IconProps> | ReactNode;
  /** Run when the menu row is chosen; the menu closes after. */
  onSelect?: () => void;
  /** A node of its own for the menu instead of a row. */
  render?: () => ReactNode;
}

/**
 * Toolbar button item definition.
 */
export interface ToolbarButtonItem extends ToolbarItemBase {
  type: "button";
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
  type: "dropdown";
  /** Accessible label */
  ariaLabel: string;
  /** Tooltip text */
  title?: string;
  /** Icon component or element for the trigger */
  icon?: React.ComponentType<IconProps> | ReactNode;
  /** Text label for the trigger */
  label?: string;
  /**
   * Fixed minimum width (in px) for the trigger's label area.
   * Set this to the width of the longest possible label so the
   * toolbar doesn't reflow when the selection changes.
   */
  minWidth?: number;
  /** Dropdown options */
  options: ToolbarDropdownOption[];
}

/**
 * Toolbar divider item definition.
 */
export interface ToolbarDividerItem extends ToolbarItemBase {
  type: "divider";
}

/**
 * Toolbar spacer item definition.
 *
 * Takes the free space of the toolbar, so the items ordered after it sit on
 * the trailing edge — e.g. a status indicator kept away from the actions.
 */
export interface ToolbarSpacerItem extends ToolbarItemBase {
  type: "spacer";
}

/**
 * Toolbar custom item definition.
 */
export interface ToolbarCustomItem extends ToolbarItemBase {
  type: "custom";
  /** Custom render function */
  render: () => ReactNode;
  /** What it becomes in the overflow menu — see `ToolbarOverflowRepresentation`. */
  overflow?: ToolbarOverflowRepresentation;
}

/**
 * Union of all toolbar item types.
 */
export type ToolbarItem =
  | ToolbarButtonItem
  | ToolbarDropdownItem
  | ToolbarDividerItem
  | ToolbarSpacerItem
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
  /**
   * Keep the toolbar to one line, moving what does not fit into a menu.
   *
   * On by default. Turned off, the items are all laid on the line and it is
   * up to the host to leave room for them.
   */
  overflow?: boolean;
  /**
   * `bar` (the default): an editor's strip — its own ground, a hairline
   * under it, sticky at the top. `inline`: the items alone, no ground, no
   * border, no padding — for a toolbar inside a header row of the host's.
   */
  variant?: "bar" | "inline";
  /** Space between two items, in px. Default: 2. */
  gap?: number;
  /**
   * The name of the button opening the overflow menu. Default:
   * "N more toolbar items".
   */
  overflowAriaLabel?: string;
  /**
   * Arrow keys, Home and End move the focus between the toolbar's controls
   * (Tab still leaves it); keys typed into a field are left alone. On by
   * default.
   */
  keyboardNavigation?: boolean;
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
