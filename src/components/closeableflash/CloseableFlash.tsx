import React, { useState } from "react";
import { Box, Flash, FlashProps } from "@primer/react";
import { XIcon } from "@primer/octicons-react";

type CloseableFlashProps = FlashProps;

export const CloseableFlash: React.FC<CloseableFlashProps> = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Flash {...props}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>{props.children}</Box>
        <Box onClick={handleClose} sx={{cursor: "pointer"}}>
          <XIcon size={20}/>
        </Box>
      </Box>
    </Flash>
  );
};
