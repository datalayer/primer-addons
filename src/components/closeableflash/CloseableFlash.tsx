import React, { useState } from "react";
import { Box, Flash, FlashProps, StyledOcticon, Text } from "@primer/react";
import { Icon, XIcon } from "@primer/octicons-react";

type CloseableFlashProps = FlashProps & {
  onClose: () => void;
  leadingIcon: Icon | null;
}

export const CloseableFlash: React.FC<CloseableFlashProps> = (props) => {
  const {leadingIcon, variant, ...otherProps} = props;
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    props.onClose();
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }
  return (
    <Flash variant={variant} {...otherProps}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {leadingIcon && <StyledOcticon icon={leadingIcon} />}
          <Text color={`${variant === "default" ? "accent" : (variant === "warning" ? "attention" : variant)}.fg`}>{props.children}</Text>
        </Box>
        <Box onClick={handleClose} sx={{cursor: "pointer"}}>
          <XIcon size={20}/>
        </Box>
      </Box>
    </Flash>
  );
}
