/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * `CloseableFlash`: a Primer `Flash` the reader can dismiss.
 *
 * Primer's own variants are `default`, `success`, `warning` and `danger`. Two
 * more are added here, for the levels a platform announce is written at:
 * `info`, which is the neutral blue Primer already draws for `default` and is
 * worth having under the name people say, and `critical`, which is `danger`
 * wearing its emphasis colour — an incident has to look different from a
 * validation error, and a reader who sees everything red stops reading red.
 *
 * @module components/closeable-flash/CloseableFlash
 */

import { useState, FC } from "react";
import { Box, Flash, FlashProps, CircleOcticon, Text } from "@primer/react";
import { XIcon } from "@primer/octicons-react";

/** What a flash may be, Primer's own plus the announce levels. */
export type CloseableFlashVariant =
  | NonNullable<FlashProps['variant']>
  | 'info'
  | 'critical';

export type CloseableFlashProps = Omit<FlashProps, 'variant'> & {
  variant?: CloseableFlashVariant;
  leadingVisual?: React.ComponentType;
  onClose?: () => void;
  /**
   * Whether the reader may close it. `false` draws the same flash without the
   * close button, which is what a preview of one wants: an editor showing an
   * announce as it will look should not offer to dismiss something that is
   * not being shown to anybody yet.
   */
  dismissible?: boolean;
}

type CloseButtonTone = {
  fg: string;
  hoverBg: string;
};

type FlashVariant = NonNullable<FlashProps['variant']>;

/**
 * The Primer variant that draws a given level.
 *
 * `info` is Primer's `default` — already the accent blue — and `critical` is
 * `danger`; what sets the two dangers apart is the emphasis below, not the
 * variant, because Primer has no louder red to ask for.
 */
const flashVariantForVariant = (variant: CloseableFlashVariant): FlashVariant => {
  switch (variant) {
    case 'info':
      return 'default';
    case 'critical':
      return 'danger';
    default:
      return variant;
  }
};

const closeButtonToneForVariant = (variant: CloseableFlashVariant): CloseButtonTone => {
  switch (variant) {
    case 'success':
      return { fg: 'success.fg', hoverBg: 'rgba(26, 127, 55, 0.14)' };
    case 'warning':
      return { fg: 'attention.fg', hoverBg: 'rgba(154, 103, 0, 0.16)' };
    case 'danger':
    case 'critical':
      return { fg: 'danger.fg', hoverBg: 'rgba(207, 34, 46, 0.14)' };
    case 'info':
      return { fg: 'accent.fg', hoverBg: 'rgba(9, 105, 218, 0.12)' };
    default:
      return { fg: 'fg.default', hoverBg: 'rgba(31, 35, 40, 0.12)' };
  }
};

const textColorForVariant = (variant: CloseableFlashVariant): string => {
  switch (variant) {
    case 'success':
      return 'success.fg';
    case 'warning':
      return 'attention.fg';
    case 'danger':
    case 'critical':
      return 'danger.fg';
    case 'info':
      return 'accent.fg';
    default:
      return 'fg.default';
  }
};

export const CloseableFlash: FC<CloseableFlashProps> = (props) => {
  const {leadingVisual, variant, onClose, sx, dismissible = true, ...otherProps} = props;
  const resolvedVariant: CloseableFlashVariant = variant ?? 'default';
  const closeTone = closeButtonToneForVariant(resolvedVariant);
  const primerVariant = flashVariantForVariant(resolvedVariant);
  const flashVariant = primerVariant === 'default' ? undefined : primerVariant;
  const isCritical = resolvedVariant === 'critical';
  const [isVisible, setIsVisible] = useState(true);
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setIsVisible(false);
  };
  if (!isVisible) {
    return null;
  }
  return (
    <Flash
      variant={flashVariant}
      sx={{
        // A critical flash is the one a reader must not scroll past: the
        // border carries the emphasis colour rather than the muted one.
        ...(isCritical
          ? { borderColor: 'danger.emphasis', borderWidth: 2, borderStyle: 'solid' }
          : {}),
        ...sx,
      }}
      {...otherProps}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {leadingVisual && <CircleOcticon icon={leadingVisual} />}
          <Text
            color={textColorForVariant(resolvedVariant)}
            sx={isCritical ? { fontWeight: 'bold' } : undefined}
          >
            {props.children}
          </Text>
        </Box>
        {dismissible && (
        <Box
          as="button"
          type="button"
          aria-label="Close"
          onClick={handleClose}
          sx={{
            flex: '0 0 auto',
            p: 0,
            m: 0,
            width: 28,
            height: 28,
            minWidth: 28,
            minHeight: 28,
            boxSizing: 'border-box',
            display: 'grid',
            placeItems: 'center',
            lineHeight: 0,
            border: 0,
            background: 'transparent',
            appearance: 'none',
            cursor: 'pointer',
            color: closeTone.fg,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: closeTone.hoverBg,
            },
            '& > span': {
              width: 16,
              height: 16,
              display: 'grid',
              placeItems: 'center',
            },
            '& svg': {
              display: 'block',
            },
          }}
        >
          <Box as="span" aria-hidden>
            <XIcon size={16} />
          </Box>
        </Box>
        )}
      </Box>
    </Flash>
  );
}
