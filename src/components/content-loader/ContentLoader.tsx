import { Box } from "@primer/react";
import Skeleton, { SkeletonTheme }  from "react-loading-skeleton";

import 'react-loading-skeleton/dist/skeleton.css';

export interface ContentLoaderProps {
  count?: number;
}

export const ContentLoader = (props: ContentLoaderProps) => {
  return (
    <Box>
      <SkeletonTheme>
        <Skeleton {...props}/>
      </SkeletonTheme>
    </Box>
  );
};

export default ContentLoader;
