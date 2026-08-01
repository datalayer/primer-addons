import { useState, FC } from "react";
import { Box, Flash, FlashProps, CircleOcticon, Text } from "@primer/react";
import { XIcon } from "@primer/octicons-react";

export type CloseableFlashProps = FlashProps & {
  leadingVisual?: React.ComponentType;
  onClose?: () => void;
}

type CloseButtonTone = {
  fg: string;
  hoverBg: string;
};

type FlashVariant = NonNullable<FlashProps['variant']>;

const closeButtonToneForVariant = (variant: FlashProps['variant']): CloseButtonTone => {
  switch (variant) {
    case 'success':
      return { fg: 'success.fg', hoverBg: 'rgba(26, 127, 55, 0.14)' };
    case 'warning':
      return { fg: 'attention.fg', hoverBg: 'rgba(154, 103, 0, 0.16)' };
    case 'danger':
      return { fg: 'danger.fg', hoverBg: 'rgba(207, 34, 46, 0.14)' };
    default:
      return { fg: 'fg.default', hoverBg: 'rgba(31, 35, 40, 0.12)' };
  }
};

const textColorForVariant = (variant: FlashVariant): string => {
  switch (variant) {
    case 'success':
      return 'success.fg';
    case 'warning':
      return 'attention.fg';
    case 'danger':
      return 'danger.fg';
    default:
      return 'fg.default';
  }
};

export const CloseableFlash: FC<CloseableFlashProps> = (props) => {
  const {leadingVisual, variant, onClose, ...otherProps} = props;
  const resolvedVariant: FlashVariant = variant ?? 'default';
  const closeTone = closeButtonToneForVariant(resolvedVariant);
  const flashVariant = resolvedVariant === 'default' ? undefined : resolvedVariant;
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
    <Flash variant={flashVariant} {...otherProps}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {leadingVisual && <CircleOcticon icon={leadingVisual} />}
          <Text color={textColorForVariant(resolvedVariant)}>{props.children}</Text>
        </Box>
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
      </Box>
    </Flash>
  );
}
