/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * ToolbarButton - A single button in a Toolbar.
 *
 * Renders an IconButton from Primer React with active state support.
 *
 * @module components/toolbar/ToolbarButton
 */

import { type ReactNode, isValidElement } from 'react';
import { IconButton } from '@primer/react';
import type { ToolbarButtonItem } from './types';

export interface ToolbarButtonProps {
  item: ToolbarButtonItem;
  /** Size variant: 'small' for floating toolbar, 'medium' for fixed toolbar */
  size?: 'small' | 'medium';
}

export function ToolbarButton({ item, size = 'medium' }: ToolbarButtonProps) {
  const { ariaLabel, title, icon, isActive, onClick, disabled } = item;

  // Resolve icon: if it's a component type, instantiate it; if element, use directly
  let iconElement: ReactNode = null;
  if (icon) {
    if (typeof icon === 'function') {
      const IconComp = icon as React.ComponentType<{ size?: number }>;
      iconElement = <IconComp size={size === 'small' ? 16 : 16} />;
    } else if (isValidElement(icon)) {
      iconElement = icon;
    }
  }

  // Use IconButton's built-in `description` prop for the tooltip instead of
  // wrapping in a separate <Tooltip>.  Primer v37's IconButton already renders
  // its own Tooltip internally; nesting a second one triggers an invariant
  // ("expects a single React element that contains interactive content").
  return (
    <IconButton
      icon={() => <>{iconElement}</>}
      aria-label={ariaLabel}
      description={title}
      tooltipDirection="s"
      unsafeDisableTooltip={!title}
      onClick={onClick}
      disabled={disabled}
      variant="invisible"
      size={size}
      sx={{
        color: isActive ? 'accent.fg' : 'fg.muted',
        bg: isActive ? 'accent.subtle' : 'transparent',
        borderRadius: 2,
        '&:hover:not([disabled])': {
          bg: 'neutral.muted',
          color: 'fg.default',
        },
      }}
    />
  );
}

export default ToolbarButton;
