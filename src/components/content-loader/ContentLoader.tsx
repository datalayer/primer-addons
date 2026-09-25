/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
