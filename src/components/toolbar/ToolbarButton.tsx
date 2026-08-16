/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * ToolbarButton - A single button in a Toolbar.
 *
 * Renders a native <button> with a direct Octicon icon, wrapped in Primer's
 * Tooltip when the item carries a title. The v37 Tooltip demands a native
 * interactive child — the reason IconButton is avoided — and a plain
 * <button> is exactly that. A disabled item therefore wears `aria-disabled`
 * rather than the `disabled` attribute: a truly disabled button is not
 * interactive, which both silences its tooltip and breaks the invariant —
 * and the tooltip of a disabled action is precisely where the why-disabled
 * explanation lives.
 *
 * @module components/toolbar/ToolbarButton
 */

import { type ReactNode, isValidElement } from 'react';
import { Tooltip } from '@primer/react';
import type { ToolbarButtonItem } from './types';

export interface ToolbarButtonProps {
  item: ToolbarButtonItem;
  /** Size variant: 'small' for floating toolbar, 'medium' for fixed toolbar */
  size?: 'small' | 'medium';
}

export function ToolbarButton({ item, size = 'medium' }: ToolbarButtonProps) {
  const { ariaLabel, title, icon, label, isActive, onClick, disabled } = item;

  // Resolve icon → React element.
  // Octicon components use React.forwardRef, which returns an *object*
  // (typeof === 'object'), NOT a function.  So we check isValidElement first
  // (already-instantiated JSX), then treat anything else as a component type.
  let iconElement: ReactNode = null;
  if (icon) {
    if (isValidElement(icon)) {
      iconElement = icon;
    } else {
      // Component type: function component, forwardRef, or memo wrapper
      const IconComp = icon as React.ComponentType<{ size?: number }>;
      iconElement = <IconComp size={16} />;
    }
  } else if (label) {
    // Fallback: render text label (e.g. "x₂" for subscript)
    iconElement = <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1 }}>{label}</span>;
  }

  const btnSize = size === 'small' ? 28 : 32;

  const button = (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      onMouseDown={(e) => e.preventDefault()}
      onClick={disabled ? undefined : onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: btnSize,
        height: btnSize,
        padding: 0,
        margin: 0,
        border: 'none',
        borderRadius: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: isActive ? 'var(--bgColor-accent-muted, rgba(9,105,218,0.1))' : 'transparent',
        color: isActive ? 'var(--fgColor-accent, #0969da)' : 'var(--fgColor-muted, #656d76)',
        opacity: disabled ? 0.5 : 1,
        lineHeight: 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = 'var(--bgColor-neutral-muted, rgba(175,184,193,0.2))';
          e.currentTarget.style.color = 'var(--fgColor-default, #1f2328)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isActive
          ? 'var(--bgColor-accent-muted, rgba(9,105,218,0.1))'
          : 'transparent';
        e.currentTarget.style.color = isActive
          ? 'var(--fgColor-accent, #0969da)'
          : 'var(--fgColor-muted, #656d76)';
      }}
    >
      {iconElement}
    </button>
  );

  // No title: nothing to say, no wrapper to say it with.
  return title ? (
    <Tooltip text={title} direction="s">
      {button}
    </Tooltip>
  ) : (
    button
  );
}

export default ToolbarButton;
