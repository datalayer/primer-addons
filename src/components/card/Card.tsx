import React from "react";
import { Box, BoxProps, IconButton, Text } from "@primer/react";

export type CardProps = Omit<BoxProps, 'border'> & {
  rounded?: 'small' | 'medium' | 'large' | 'full' | number;
  border?: boolean;
  shadow?: 'small' | 'medium' | 'large' | 'extraLarge';
};

export type CardHeaderProps = {
  title?: string;
  description?: string;
  leadingVisual?: React.ElementType;
  action?: React.ReactNode;
}

export type CardImageProps = {
  url?: string;
  image?: string;
  svg?: string;
  height: number;
}

export type CardContentProps = {
  children: React.ReactNode;
}

export type CardActionsProps = {
  children: React.ReactNode;
}

const roundedVals = {
  small: "3px",
  medium: "6px",
  large: "12px",
  full: "100vh",
};

const shadowVals = {
  small: '0 1px 0 rgba(31,35,40,0.04)',
  medium: '0 3px 6px rgba(140,149,159,0.15)',
  large: '0 8px 24px rgba(140,149,159,0.2)',
  extraLarge: '0 12px 28px rgba(140,149,159,0.3)',
};

export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Image: React.FC<CardImageProps>;
  Content: React.FC<CardContentProps>;
  Actions: React.FC<CardActionsProps>;
} = (props) => {
  const { sx, rounded, border, shadow, children, ...otherProps } = props;
  return (
    <Box
      sx={{
        ...(sx ? sx : undefined),
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
      {...otherProps}
    >
      {children}
    </Box>
  );
};

Card.Header = (props) => {
  const { title, description, leadingVisual, action } = props;
  return <Box display="flex" alignItems="center" sx={{p: 3}}>
    {leadingVisual && <Box sx={{mr: 3}}>
      <IconButton size="medium" icon={leadingVisual} aria-label=""/>
    </Box>}
    <Box sx={{flexGrow: 1}}>
      <Text display="block">{title}</Text>
      <Text display="block" color="fg.muted">{description}</Text>
    </Box>
    {action && <Box>
      {action}
    </Box>}
  </Box>;
}

Card.Image = ({url, image, svg, height}) => {
  return (
    <Box
      display="block"
      width="100%"
      height={`${height}px`}
      backgroundImage={`url(${url})`}
      sx={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        objectFit: "cover"
      }}>
    {image && <img src={image} style={{maxHeight: `${height}px`}} />}
    {svg && <img src={`data:image/svg+xml;utf8,${svg}`} style={{maxHeight: height}} />}
  </Box>
  );
}

Card.Content = ({children}) => {
  return (
    <Box display="block" sx={{p: 3}}>
      {children}
    </Box>
  );
}

Card.Actions = ({ children }) => {
  return <Box display="block" sx={{p: 3}}>
    {children}
  </Box>;
}
