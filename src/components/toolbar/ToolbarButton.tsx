/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * ToolbarButton - A single button in a Toolbar.
 *
 * Renders a native <button> with a direct Octicon icon.
 * Avoids Primer's IconButton and Tooltip components to prevent invariant
 * violations in Primer v37 (Tooltip requires a native interactive child,
 * and IconButton's internal Tooltip conflicts with external wrappers).
 *
 * Uses the native HTML `title` attribute for tooltip behaviour.
 *
 * @module components/toolbar/ToolbarButton
 */

import { type ReactNode, isValidElement } from 'react';
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

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={title}
      onClick={onClick}
      disabled={disabled}
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
}

export default ToolbarButton;
