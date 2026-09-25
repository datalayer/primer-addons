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

import { useTheme } from '@primer/react';
import { CircleCurrentColorIcon } from '@datalayer/icons-react';

export type CircleIconProps = {
  color?: string;
  variant?: 'fg' | 'default' | 'muted' | 'onEmphasis' | 'subtle';
}

export const CircleIcon = ({
  color = 'white',
  variant = 'fg',
}: CircleIconProps) => {
  const { theme } = useTheme();
  const colorGroup = (theme?.colors as Record<string, unknown> | undefined)?.[color];
  const resolvedColor =
    colorGroup && typeof colorGroup === 'object'
      ? (colorGroup as Record<string, string | undefined>)[variant] ??
        (colorGroup as Record<string, string | undefined>).fg
      : undefined;

  return (
    <CircleCurrentColorIcon
      fill={resolvedColor ?? color ?? 'currentColor'}
      color={resolvedColor ?? color ?? 'currentColor'}
    />
  )
}

export default CircleIcon;
