import { useState, FC } from "react";
import { Box, Flash, FlashProps, Octicon, Text } from "@primer/react";
import { XIcon } from "@primer/octicons-react";

export type CloseableFlashProps = FlashProps & {
  leadingVisual?: React.ElementType;
  onClose?: () => void;
}

export const CloseableFlash: FC<CloseableFlashProps> = (props) => {
  const {leadingVisual, variant, onClose, ...otherProps} = props;
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
    <Flash variant={variant} {...otherProps}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {leadingVisual && <Octicon icon={leadingVisual} />}
          <Text color={`${variant === "default" ? "accent" : (variant === "warning" ? "attention" : variant)}.fg`}>{props.children}</Text>
        </Box>
        <Box onClick={handleClose} sx={{cursor: "pointer"}}>
          <XIcon size={20}/>
        </Box>
      </Box>
    </Flash>
  );
}
