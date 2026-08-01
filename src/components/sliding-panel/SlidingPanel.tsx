import { type ReactNode, useEffect, useMemo, useState } from 'react';
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
  children: ReactNode;
  onDismiss?: () => void;
  position?: SlidingPanelPosition;
  variant?: SlidingPanelVariant;
  durationMs?: number;
  transitionMs?: number;
  zIndex?: number;
  offset?: number;
  panelSize?: number | string;
  fullWidth?: boolean;
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
  children,
  onDismiss,
  position = 'north',
  variant = 'default',
  durationMs,
  transitionMs = 260,
  zIndex = 200,
  offset = 0,
  panelSize = 360,
  fullWidth = true,
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
  const horizontal = position === 'north' || position === 'south';
  const edgeBorder = edgeBorderStyles[position];

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex,
        display: 'flex',
        pointerEvents: 'none',
        ...anchorStyles,
      }}
    >
      <Box
        role={variant === 'error' || variant === 'danger' ? 'alert' : 'status'}
        aria-live={variant === 'error' || variant === 'danger' ? 'assertive' : 'polite'}
        sx={{
          pointerEvents: 'auto',
          width: horizontal
            ? fullWidth
              ? '100vw'
              : 'min(960px, 96vw)'
            : panelSize,
          maxWidth: horizontal ? '100vw' : undefined,
          height: horizontal ? undefined : '100vh',
          maxHeight: horizontal ? undefined : '100vh',
          borderColor: style.border,
          borderTop: edgeBorder.borderTop,
          borderRight: edgeBorder.borderRight,
          borderBottom: edgeBorder.borderBottom,
          borderLeft: edgeBorder.borderLeft,
          backgroundColor: style.bg,
          color: style.fg,
          boxShadow: 'shadow.large',
          transform: isVisible ? 'translate(0, 0)' : closedTransforms[position],
          opacity: isVisible ? 1 : 0,
          transition: `transform ${transitionMs}ms ease, opacity ${transitionMs}ms ease`,
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SlidingPanel;