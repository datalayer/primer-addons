import { Box } from "@primer/react";

export interface ToolbarProps {
  align?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-evenly"
    | "space-around"
    | "space-between";
  gap?: string;
  height?: string;
  padding?: string;
  heading?: React.ReactNode; // Preferred a Text Component of Primer
  backgroundColor?: string;
  borderBottomHeight?: number;
  borderBottomColor?: string;
  border?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export const Toolbar = ({
  align = "flex-start",
  height = "5vh",
  gap = "0.1rem",
  padding,
  heading,
  backgroundColor,
  borderBottomHeight = 1,
  borderBottomColor,
  border = false,
  children,
}: ToolbarProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : "pageHeaderBg",
        height: height,
        width: "100%",
        padding: padding,
        borderBottomWidth: borderBottomHeight,
        borderBottomStyle: border ? "solid" : "none",
        borderColor: borderBottomColor ? borderBottomColor : "border.default",
      }}
    >
      <Box display="flex">
        {heading != null && heading != undefined ? heading : <></>}
      </Box>
      <Box
        display="flex"
        flexGrow={1}
        alignItems="center"
        justifyContent={align}
        sx={{
          gap: gap,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Toolbar;
