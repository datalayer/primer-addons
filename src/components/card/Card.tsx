import React from "react";
import { Box, BoxProps } from "@primer/react";

export type CardProps = Omit<BoxProps, 'border'> & {
  rounded?: 'small' | 'medium' | 'large' | 'full' | number;
  border?: boolean;
  shadow?: 'small' | 'medium' | 'large' | 'extraLarge';
};

const roundedVals = {
  "small": "3px",
  "medium": "6px",
  "large": "12px",
  "full": "100vh",
}

const shadowVals = {
  "small": '0 1px 0 rgba(31,35,40,0.04)',
  "medium": '0 3px 6px rgba(140,149,159,0.15)',
  "large": '0 8px 24px rgba(140,149,159,0.2)',
  "extraLarge": '0 12px 28px rgba(140,149,159,0.3)',
}

export const Card: React.FC<CardProps> = (props) => {
  const {sx, rounded, border, shadow, children, ...otherProps} = props;
  return (
    <Box
      sx={{
        ...(sx ? sx : undefined),
        display: 'flex',
        alignItems: 'center',
        ...(rounded ? typeof rounded === "string" ? {
          borderRadius: roundedVals[rounded]
        } : {
          borderRadius: props.rounded
        } : undefined),
        ...(border ? {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'border.default'
        } : undefined),
        ...(shadow ? {
          boxShadow: shadowVals[shadow]
        } : {
          boxShadow: shadowVals['small']
        })
      }}
      className="color-shadow-medium"
      {...otherProps}
    >
      {children}
    </Box>
  );
};
