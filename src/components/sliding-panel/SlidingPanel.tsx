/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { type KeyboardEvent, type MouseEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { IconButton } from '@primer/react';
import { XIcon } from '@primer/octicons-react';
import { Box } from '../box/Box';

export type SlidingPanelPosition = 'north' | 'south' | 'west' | 'east';

export type SlidingPanelVariant =
  | 'default'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'danger';

export interface SlidingPanelProps {
  isOpen: boolean;
  message: ReactNode;
  details?: ReactNode;
  onDismiss?: () => void;
  position?: SlidingPanelPosition;
  variant?: SlidingPanelVariant;
  durationMs?: number;
  transitionMs?: number;
  zIndex?: number;
  offset?: number;
  panelSize?: number | string;
  fullWidth?: boolean;
  /**
   * Slide within the nearest positioned ancestor rather than over the
   * viewport: the panel is `position: absolute` and takes that box's width
   * (north, south) or height (east, west). For a panel that belongs to one
   * region of a page — a chat embedded in a section — and must not cover
   * the rest of it. Off by default: over the viewport, as before.
   */
  contained?: boolean;
  /**
   * Whether a click on the panel's background dismisses it, as it always
   * did. Off for a panel whose content is read and used (a table, a card):
   * its Close button and Escape still dismiss it.
   */
  dismissOnPanelClick?: boolean;
  /** The Close button's name, said to a screen reader. */
  closeLabel?: string;
  /**
   * Whether the panel is a live region that a screen reader reads out when
   * it opens (`status`, or `alert` for an error), as it always was. Off for
   * a panel with content to read at one's pace: it is then a named region
   * (`ariaLabel`), reached like any other part of the page.
   */
  live?: boolean;
  /** The panel's name, for a region that is not live. */
  ariaLabel?: string;
}

const variantStyles: Record<SlidingPanelVariant, { bg: string; border: string; fg: string }> = {
  default: {
    bg: 'var(--bgColor-default, #ffffff)',
    border: 'var(--borderColor-default, #d0d7de)',
    fg: 'var(--fgColor-default, #1f2328)',
  },
  info: {
    bg: 'var(--bgColor-accent-muted, #ddf4ff)',
    border: 'var(--borderColor-accent-emphasis, #218bff)',
    fg: 'var(--fgColor-default, #1f2328)',
  },
  success: {
    bg: 'var(--bgColor-success-muted, #dafbe1)',
    border: 'var(--borderColor-success-emphasis, #1a7f37)',
    fg: 'var(--fgColor-success, #1a7f37)',
  },
  warning: {
    bg: 'var(--bgColor-attention-muted, #fff8c5)',
    border: 'var(--borderColor-attention-emphasis, #9a6700)',
    fg: 'var(--fgColor-attention, #9a6700)',
  },
  error: {
    bg: 'var(--bgColor-danger-muted, #ffebe9)',
    border: 'var(--borderColor-danger-emphasis, #cf222e)',
    fg: 'var(--fgColor-danger, #cf222e)',
  },
  danger: {
    bg: 'var(--bgColor-danger-muted, #ffebe9)',
    border: 'var(--borderColor-danger-emphasis, #cf222e)',
    fg: 'var(--fgColor-danger, #cf222e)',
  },
};

const closeButtonStyles: Record<SlidingPanelVariant, { fg: string; hoverBg: string }> = {
  default: {
    fg: 'var(--fgColor-default, #1f2328)',
    hoverBg: 'rgba(31, 35, 40, 0.10)',
  },
  info: {
    fg: 'var(--fgColor-accent, #0969da)',
    hoverBg: 'rgba(9, 105, 218, 0.14)',
  },
  success: {
    fg: 'var(--fgColor-success, #1a7f37)',
    hoverBg: 'rgba(26, 127, 55, 0.14)',
  },
  warning: {
    fg: 'var(--fgColor-attention, #9a6700)',
    hoverBg: 'rgba(154, 103, 0, 0.16)',
  },
  error: {
    fg: 'var(--fgColor-danger, #cf222e)',
    hoverBg: 'rgba(207, 34, 46, 0.14)',
  },
  danger: {
    fg: 'var(--fgColor-danger, #cf222e)',
    hoverBg: 'rgba(207, 34, 46, 0.14)',
  },
};

const closedTransforms: Record<SlidingPanelPosition, string> = {
  north: 'translateY(-100%)',
  south: 'translateY(100%)',
  west: 'translateX(-100%)',
  east: 'translateX(100%)',
};

const edgeBorderStyles: Record<
  SlidingPanelPosition,
  {
    borderTop: string;
    borderRight: string;
    borderBottom: string;
    borderLeft: string;
  }
> = {
  north: {
    borderTop: '0',
    borderRight: '0',
    borderBottom: '1px solid',
    borderLeft: '0',
  },
  south: {
    borderTop: '1px solid',
    borderRight: '0',
    borderBottom: '0',
    borderLeft: '0',
  },
  west: {
    borderTop: '0',
    borderRight: '1px solid',
    borderBottom: '0',
    borderLeft: '0',
  },
  east: {
    borderTop: '0',
    borderRight: '0',
    borderBottom: '0',
    borderLeft: '1px solid',
  },
};

export const SlidingPanel = ({
  isOpen,
  message,
  details,
  onDismiss,
  position = 'north',
  variant = 'default',
  durationMs,
  transitionMs = 260,
  zIndex = 200,
  offset = 0,
  panelSize = 360,
  fullWidth = true,
  contained = false,
  dismissOnPanelClick = true,
  closeLabel = 'Close panel',
  live = true,
  ariaLabel,
}: SlidingPanelProps) => {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const showTimer = window.setTimeout(() => setIsVisible(true), 10);
      return () => window.clearTimeout(showTimer);
    }

    setIsVisible(false);
    const hideTimer = window.setTimeout(() => setIsMounted(false), transitionMs);
    return () => window.clearTimeout(hideTimer);
  }, [isOpen, transitionMs]);

  useEffect(() => {
    if (!isOpen || !onDismiss) {
      return;
    }
    if (durationMs === undefined || durationMs <= 0) {
      return;
    }
    const timer = window.setTimeout(() => {
      onDismiss();
    }, durationMs);
    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen, durationMs, onDismiss]);

  const anchorStyles = useMemo(() => {
    if (position === 'north') {
      return {
        top: offset,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'flex-start',
      };
    }
    if (position === 'south') {
      return {
        bottom: offset,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
      };
    }
    if (position === 'west') {
      return {
        left: offset,
        top: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      };
    }
    return {
      right: offset,
      top: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'stretch',
    };
  }, [position, offset]);

  if (!isMounted) {
    return null;
  }

  const style = variantStyles[variant];
  const alerting = variant === 'error' || variant === 'danger';
  // Over the viewport, or over its own region of the page.
  const across = contained ? '100%' : '100vw';
  const along = contained ? '100%' : '100vh';
  const closeStyle = closeButtonStyles[variant];
  const horizontal = position === 'north' || position === 'south';
  const edgeBorder = edgeBorderStyles[position];

  return (
    <Box
      sx={{
        position: contained ? 'absolute' : 'fixed',
        zIndex,
        display: 'flex',
        pointerEvents: 'none',
        ...anchorStyles,
      }}
    >
      <Box
        role={live ? (alerting ? 'alert' : 'status') : 'region'}
        aria-live={live ? (alerting ? 'assertive' : 'polite') : undefined}
        aria-label={live ? undefined : ariaLabel}
        data-sliding-panel={position}
        onKeyDown={
          onDismiss
            ? (event: KeyboardEvent<HTMLElement>) => {
                if (event.key === 'Escape') {
                  event.stopPropagation();
                  onDismiss();
                }
              }
            : undefined
        }
        onClick={
          onDismiss && dismissOnPanelClick
            ? (event: MouseEvent<HTMLElement>) => {
                // A tap on the panel dismisses it — but not a click on a
                // link, button or field in its content, nor the end of a
                // text selection: those are someone using what it says.
                const target = event.target as HTMLElement;
                if (
                  target.closest('a, button, input, select, textarea, label, [role="button"], [contenteditable="true"]') ||
                  (window.getSelection()?.toString() ?? '') !== ''
                ) {
                  return;
                }
                onDismiss();
              }
            : undefined
        }
        sx={{
          pointerEvents: 'auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          cursor: onDismiss && dismissOnPanelClick ? 'pointer' : 'default',
          width: horizontal
            ? fullWidth
              ? across
              : `min(960px, ${contained ? '100%' : '96vw'})`
            : panelSize,
          maxWidth: horizontal ? across : '100%',
          height: horizontal ? undefined : along,
          maxHeight: horizontal ? undefined : along,
          borderColor: style.border,
          borderTop: edgeBorder.borderTop,
          borderRight: edgeBorder.borderRight,
          borderBottom: edgeBorder.borderBottom,
          borderLeft: edgeBorder.borderLeft,
          backgroundColor: style.bg,
          color: style.fg,
          textAlign: 'left',
          px: 4,
          py: horizontal ? 3 : 4,
          boxShadow: 'shadow.large',
          transform: isVisible ? 'translate(0, 0)' : closedTransforms[position],
          opacity: isVisible ? 1 : 0,
          transition: `transform ${transitionMs}ms ease, opacity ${transitionMs}ms ease`,
          overflow: 'auto',
        }}
      >
        {onDismiss ? (
          <Box
            sx={{
              position: 'absolute',
              top: 2,
              right: 3,
            }}
          >
            <IconButton
              variant="invisible"
              icon={XIcon}
              aria-label={closeLabel}
              onClick={event => {
                event.stopPropagation();
                onDismiss();
              }}
              sx={{
                color: closeStyle.fg,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: closeStyle.hoverBg,
                },
              }}
            />
          </Box>
        ) : null}
        <Box sx={{ width: 'min(980px, 100%)', display: 'grid', gap: 1, pr: onDismiss ? 6 : 0 }}>
          <Box sx={{ fontSize: 3, fontWeight: 500, lineHeight: 1.4 }}>{message}</Box>
          {details ? (
            <Box sx={{ fontSize: 1, fontWeight: 400, lineHeight: 1.4, color: 'fg.muted' }}>
              {details}
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default SlidingPanel;