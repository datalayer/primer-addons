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

/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import React, { Ref, PropsWithChildren } from 'react';
import type { AnimateProps } from '@primer/react-brand';

/**
 * Layout
 */
export const Container = ({
  children,
  style,
}: {
  children: React.ReactElement[] | React.ReactElement;
  style?: React.CSSProperties;
}) => (
  <div style={{ maxWidth: 1024, margin: '0 auto', ...style }}>{children}</div>
);

type RedlineBackgroundProps = {
  height?: number;
  hasBorder?: boolean;
};

export function RedlineBackground({
  height,
  hasBorder = true,
  ...rest
}: PropsWithChildren<RedlineBackgroundProps>) {
  return (
    <div
      style={{
        display: 'flex',
        overflow: 'hidden',
        border: hasBorder
          ? '1px solid var(--base-color-scale-red-2)'
          : undefined,
        backgroundImage:
          'linear-gradient(45deg, var(--base-color-scale-red-0) 12.5%, hsla(var(--base-color-scale-red-2-hsl) / 50%) 12.5%, hsla(var(--base-color-scale-red-2-hsl) / 50%) 50%, var(--base-color-scale-red-0) 50%, var(--base-color-scale-red-0) 62.5%, hsla(var(--base-color-scale-red-2-hsl) / 50%) 62.5%, hsla(var(--base-color-scale-red-2-hsl) / 50%) 100%)',
        backgroundSize: '5.66px 5.66px',
        WebkitBoxPack: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height,
      }}
      {...rest}
    />
  );
}

/**
 * Base Types
 *
 * Component helper type to be extended by component types, e.g.:
 * type CustomComponentProps = BaseProps<HTMLDivElement> & { ... }
 *
 * Example use:
 *   const CustomComponent = forwardRef<HTMLDivElement, CustomComponentProps>(({className, ...props}, ref) => { ... })
 *   // OR:
 *   const CustomComponent = forwardRef(({className: CustomComponentProps, ...props}, ref: Ref<HTMLDivElement>) => { ... })
 */
export type BaseProps<T> = {
  className?: string;
  id?: string;
  ref?: Ref<T>;
  animate?: AnimateProps;
};
