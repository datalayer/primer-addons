import { useState, FC } from "react";
import { Box, Flash, FlashProps, CircleOcticon, IconButton, Text } from "@primer/react";
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
        <IconButton
          variant="invisible"
          icon={XIcon}
          aria-label="Close"
          onClick={handleClose}
          sx={{
            p: 0,
            width: 28,
            minWidth: 28,
            height: 28,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 0,
            color: closeTone.fg,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: closeTone.hoverBg,
            },
          }}
        />
      </Box>
    </Flash>
  );
}
