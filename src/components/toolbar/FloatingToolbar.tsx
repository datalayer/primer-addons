/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * FloatingToolbar - A floating toolbar that positions itself near a selection or anchor.
 *
 * Uses createPortal and absolute positioning to float above content.
 * Designed to be used as a text-selection floating format bar, or an inline AI action bar.
 *
 * Extensible: consumers register items via the `items` and `extraItems` props.
 *
 * Usage:
 * ```tsx
 * <FloatingToolbar
 *   isVisible={hasSelection}
 *   anchorElement={floatingAnchor}
 *   items={formatItems}
 *   extraItems={aiItems}
 * />
 * ```
 *
 * @module components/toolbar/FloatingToolbar
 */

import { useMemo, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '../box/Box';
import type { FloatingToolbarProps, ToolbarItem } from './types';
import { ToolbarRenderer } from './ToolbarRenderer';

/**
 * Position the floating element relative to a DOMRect within an anchor element.
 */
function setFloatingPosition(
  targetRect: DOMRect | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement,
  verticalGap: number = 10,
  horizontalOffset: number = 5,
) {
  if (targetRect === null) {
    floatingElem.style.opacity = '0';
    floatingElem.style.transform = 'translateY(-4px)';
    floatingElem.style.top = '-10000px';
    floatingElem.style.left = '-10000px';
    return;
  }

  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();

  // Convert viewport-relative coordinates to anchor-relative coordinates.
  // The toolbar is position:absolute inside anchorElem (position:relative),
  // so top/left must be relative to the anchor's border box.
  let top =
    targetRect.top - anchorElementRect.top - floatingElemRect.height - verticalGap;
  let left = targetRect.left - anchorElementRect.left - horizontalOffset;

  // If toolbar would go above the anchor, flip it below the selection
  if (top < 0) {
    top = targetRect.bottom - anchorElementRect.top + verticalGap;
  }

  // Keep within horizontal bounds
  if (left + floatingElemRect.width > anchorElementRect.width) {
    left = anchorElementRect.width - floatingElemRect.width - horizontalOffset;
  }
  if (left < horizontalOffset) {
    left = horizontalOffset;
  }

  floatingElem.style.opacity = '1';
  floatingElem.style.transform = 'translateY(0)';
  floatingElem.style.top = `${top}px`;
  floatingElem.style.left = `${left}px`;
}

export function FloatingToolbar({
  items,
  extraItems,
  anchorElement,
  isVisible,
  className,
  disabled,
  ariaLabel = 'Floating toolbar',
  portalContainer,
}: FloatingToolbarProps) {
  const floatingRef = useRef<HTMLDivElement | null>(null);

  const allItems: ToolbarItem[] = useMemo(() => {
    if (!extraItems?.length) return items;
    return [...items, ...extraItems];
  }, [items, extraItems]);

  const updatePosition = useCallback(() => {
    const floatingElem = floatingRef.current;
    if (!floatingElem || !anchorElement) return;

    const nativeSelection = window.getSelection();
    if (!nativeSelection || nativeSelection.isCollapsed || !isVisible) {
      floatingElem.style.opacity = '0';
      floatingElem.style.transform = 'translateY(-4px)';
      return;
    }

    const range = nativeSelection.getRangeAt(0);
    const rangeRect = range.getBoundingClientRect();
    setFloatingPosition(rangeRect, floatingElem, anchorElement);
  }, [anchorElement, isVisible]);

  // Update position on scroll and resize
  useEffect(() => {
    if (!isVisible) return;

    const update = () => updatePosition();
    window.addEventListener('resize', update);
    // Capture phase catches scroll on any ancestor (page, container, etc.)
    window.addEventListener('scroll', update, true);

    const scrollerElem = anchorElement?.parentElement;
    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update);
    }

    // Initial position
    update();

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update);
      }
    };
  }, [isVisible, updatePosition, anchorElement]);

  if (!isVisible || allItems.length === 0) {
    return null;
  }

  const container = portalContainer || anchorElement || document.body;

  const toolbar = (
    <Box
      ref={floatingRef}
      className={className}
      role="toolbar"
      aria-label={ariaLabel}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        px: 1,
        py: '4px',
        bg: 'canvas.overlay',
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 2,
        boxShadow: 'shadow.large',
        position: 'absolute',
        zIndex: 10,
        top: '-10000px',
        left: '-10000px',
        opacity: 0,
        transition: 'opacity 0.15s ease, transform 0.15s ease',
        transform: 'translateY(-4px)',
      }}
    >
      <ToolbarRenderer items={allItems} disabled={disabled} size="small" />
    </Box>
  );

  return createPortal(toolbar, container);
}

export default FloatingToolbar;
