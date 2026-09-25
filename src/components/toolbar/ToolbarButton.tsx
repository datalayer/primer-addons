/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
 * `showLabel` prints that same name beside the icon instead of leaving it in
 * the tooltip alone. On the toolbar's own line an icon earns its keep — Bold,
 * Italic, Underline read at a glance, and a name beside each would crowd a
 * strip already short on room. Inside the "..." overflow menu there is a
 * whole row to spend and nothing to read at a glance until the pointer
 * happens to rest on one: a tooltip nobody is hovering says nothing, the way
 * `ariaLabel` says it whether or not anyone points at the row at all. The
 * `Toolbar` sets it on that menu alone; a host wiring `ToolbarButton` up on
 * its own line does not need to know the flag exists.
 *
 * @module components/toolbar/ToolbarButton
 */

import { type ReactNode, isValidElement, useState } from 'react';
import { Tooltip } from '@primer/react';
import type { ToolbarButtonItem } from './types';

export interface ToolbarButtonProps {
  item: ToolbarButtonItem;
  /** Size variant: 'small' for floating toolbar, 'medium' for fixed toolbar */
  size?: 'small' | 'medium';
  /** Print `ariaLabel` beside the icon — see the module doc. Off by default. */
  showLabel?: boolean;
}

export function ToolbarButton({
  item,
  size = 'medium',
  showLabel = false,
}: ToolbarButtonProps) {
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
  // Only when there is a name to show, and only where it was asked for:
  // showLabel with no ariaLabel (should never happen — it is required on
  // the item — but this keeps a bare icon rather than an empty gap) falls
  // back to the icon-only layout below.
  const printLabel = showLabel && Boolean(ariaLabel);
  /*
   * Hover, as state rather than as a style written onto the element.
   *
   * The `Tooltip` around a titled button replays its `onMouseEnter` from a
   * timeout, by which time React has cleared the event's `currentTarget`:
   * writing `e.currentTarget.style` there threw "Cannot read properties of
   * null (reading 'style')". A ref would not do either — the Tooltip clones
   * the button with a ref of its own.
   */
  const [hovered, setHovered] = useState(false);
  const lit = hovered && !disabled;

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
        justifyContent: printLabel ? 'flex-start' : 'center',
        gap: printLabel ? 6 : 0,
        // No explicit `width` when labelled: sized to its own icon-plus-name
        // content, the same as `ToolbarDropdown`'s trigger — the two sit in
        // the same overflow menu, and a button stretched to fill it beside a
        // dropdown sized to its own text would read as two different kinds
        // of row rather than one consistent list.
        width: printLabel ? undefined : btnSize,
        minWidth: btnSize,
        height: btnSize,
        padding: printLabel ? '0 8px' : 0,
        margin: 0,
        border: 'none',
        borderRadius: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: lit
          ? 'var(--bgColor-neutral-muted, rgba(175,184,193,0.2))'
          : isActive
            ? 'var(--bgColor-accent-muted, rgba(9,105,218,0.1))'
            : 'transparent',
        color: lit
          ? 'var(--fgColor-default, #1f2328)'
          : isActive
            ? 'var(--fgColor-accent, #0969da)'
            : 'var(--fgColor-muted, #656d76)',
        opacity: disabled ? 0.5 : 1,
        lineHeight: 1,
        fontSize: size === 'small' ? 12 : 14,
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {iconElement}
      {printLabel && <span>{ariaLabel}</span>}
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
