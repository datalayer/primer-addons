/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * ToolbarDropdown - A dropdown menu in a Toolbar.
 *
 * Uses Primer React ActionMenu for accessible dropdown menus.
 *
 * The trigger button highlights (accent colour) when any option is active,
 * matching the behavior of regular ToolbarButton items.
 *
 * All option rows render a fixed-width LeadingVisual slot so that labels
 * stay left-aligned regardless of whether the option has an icon.
 *
 * @module components/toolbar/ToolbarDropdown
 */

import { type ReactNode, isValidElement, useMemo, useState } from 'react';
import { ActionMenu, ActionList, Text } from '@primer/react';
import { Box } from '../box/Box';
import type { ToolbarDropdownItem, ToolbarDropdownOption } from './types';

export interface ToolbarDropdownProps {
  item: ToolbarDropdownItem;
  /** Size variant */
  size?: 'small' | 'medium';
}

/**
 * Resolve an icon prop to a ReactNode.
 *
 * Octicon components use React.forwardRef which returns an *object*
 * (typeof === 'object'), NOT a function.  We check isValidElement first
 * (already-instantiated JSX), then treat anything else as a component type.
 */
function renderIcon(icon: ToolbarDropdownOption['icon']): ReactNode {
  if (!icon) return null;
  if (isValidElement(icon)) {
    return icon;
  }
  // Component type: function component, forwardRef, or memo wrapper
  const IconComp = icon as React.ComponentType<{ size?: number }>;
  return <IconComp size={16} />;
}

/** Whether any dropdown option in the list has an icon. */
function hasAnyIcon(options: ToolbarDropdownOption[]): boolean {
  return options.some(o => !!o.icon);
}

export function ToolbarDropdown({ item, size = 'medium' }: ToolbarDropdownProps) {
  const { ariaLabel, icon, label, minWidth, options, disabled } = item;

  const [open, setOpen] = useState(false);

  /*
   * When the trigger is highlighted.
   *
   * Not simply "an option is active". A dropdown that *selects* something —
   * the cell type, say — always has exactly one active option, so that rule
   * painted it in the accent colour permanently: a control that looked
   * switched on before it had been touched, in a blue that was Primer's
   * rather than the theme's whenever the accent variable did not reach it.
   *
   * A labelled dropdown already shows its current value in the label, so the
   * highlight tells the reader nothing they cannot see. Only a label-less one
   * — an icon that means "filter on" — has a state worth colouring, and any
   * dropdown is worth marking while its menu is open.
   */
  const anyActive = useMemo(
    () => !label && options.some(o => o.isActive),
    [label, options],
  );

  // If any option has an icon we reserve a leading-visual column for all rows.
  const showLeadingVisual = useMemo(() => hasAnyIcon(options), [options]);

  const btnSize = size === 'small' ? 28 : 32;

  return (
    <ActionMenu open={open} onOpenChange={setOpen}>
      {/* Use a native <button> trigger (same pattern as ToolbarButton) so that
          we can show the active highlight consistently and avoid Primer Tooltip
          invariant issues. ActionMenu.Anchor accepts any interactive child. */}
      <ActionMenu.Anchor>
        <button
          type="button"
          aria-label={ariaLabel}
          title={ariaLabel}
          disabled={disabled}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            minWidth: btnSize,
            height: btnSize,
            padding: label ? '0 8px' : 0,
            margin: 0,
            border: 'none',
            borderRadius: 6,
            cursor: disabled ? 'not-allowed' : 'pointer',
            /*
              Neutral while the menu is open, not accented.
              
              An accent here is a colour the host has to have defined for this
              subtree, and where it has not the browser falls back to Primer's
              blue — so the control turned blue the moment it was clicked, in a
              hue belonging to no theme on the page. The neutral pair is the
              same one the hover state uses, which the theme does define.
            */
            background:
              anyActive || open
                ? 'var(--bgColor-neutral-muted, rgba(175,184,193,0.2))'
                : 'transparent',
            color:
              anyActive || open
                ? 'var(--fgColor-default, #1f2328)'
                : 'var(--fgColor-muted, #656d76)',
            opacity: disabled ? 0.5 : 1,
            fontSize: size === 'small' ? 12 : 14,
            fontWeight: 'normal',
            fontFamily: 'inherit',
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.background =
                'var(--bgColor-neutral-muted, rgba(175,184,193,0.2))';
              e.currentTarget.style.color = 'var(--fgColor-default, #1f2328)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              anyActive || open
                ? 'var(--bgColor-neutral-muted, rgba(175,184,193,0.2))'
                : 'transparent';
            e.currentTarget.style.color =
              anyActive || open
                ? 'var(--fgColor-default, #1f2328)'
                : 'var(--fgColor-muted, #656d76)';
          }}
        >
          {renderIcon(icon)}
          {label && (
            <span
              style={{
                display: 'inline-block',
                minWidth: minWidth ? minWidth : undefined,
                textAlign: 'left',
              }}
            >
              {label}
            </span>
          )}
        </button>
      </ActionMenu.Anchor>
      <ActionMenu.Overlay width="auto">
        <ActionList>
          {options.map(option => (
            <ActionList.Item
              key={option.key}
              onSelect={option.onClick}
              disabled={option.disabled}
              active={option.isActive}
            >
              {showLeadingVisual && (
                <ActionList.LeadingVisual>
                  {option.icon ? renderIcon(option.icon) : <Box sx={{ width: 16 }} />}
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
