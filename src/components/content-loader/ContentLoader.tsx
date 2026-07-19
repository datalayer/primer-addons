import { Box, useTheme } from "@primer/react";
import Skeleton, { SkeletonTheme }  from "react-loading-skeleton";

import 'react-loading-skeleton/dist/skeleton.css';

export interface ContentLoaderProps {
  count?: number;
}

export const ContentLoader = (props: ContentLoaderProps) => {
  const { colorMode } = useTheme();
  const isDark = colorMode !== 'day';
  return (
    <Box>
      <SkeletonTheme
        baseColor={isDark ? 'var(--bgColor-muted, #21262d)' : 'var(--bgColor-muted, #ebebeb)'}
        highlightColor={isDark ? 'var(--borderColor-muted, #30363d)' : 'var(--borderColor-muted, #f5f5f5)'}
      >
        <Skeleton {...props}/>
      </SkeletonTheme>
    </Box>
  );
};

export default ContentLoader;
