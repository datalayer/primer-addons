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
 * Copyright (c) 2021-2024 Datalayer, Inc.
 *
 * Datalayer License
 */

import type {SystemCssProperties, SystemStyleObject} from '@styled-system/css'
import css from '@styled-system/css'
// import type {ThemeColorPaths, ThemeShadowPaths} from '@primer/react/test-helpers'
import type {ColorProps, BorderColorProps, ShadowProps} from 'styled-system'
import merge from 'deepmerge'

type ThemeColorPaths = string
type ThemeShadowPaths = string

export type BetterCssProperties = {
  [K in keyof SystemCssProperties]: K extends keyof ColorProps
    ? ThemeColorPaths | SystemCssProperties[K]
    : K extends keyof BorderColorProps
      ? ThemeColorPaths | SystemCssProperties[K]
      : K extends keyof ShadowProps
        ? ThemeShadowPaths | SystemCssProperties[K]
        : SystemCssProperties[K]
}

// Support CSS custom properties in the `sx` prop
export type CSSCustomProperties = {
  [key: `--${string}`]: string | number
}

type CSSSelectorObject = {
  [cssSelector: string]: SystemStyleObject | CSSCustomProperties
}

export type BetterSystemStyleObject = BetterCssProperties | SystemStyleObject | CSSCustomProperties | CSSSelectorObject

export interface SxProp {
  sx?: BetterSystemStyleObject
}

const sx = (props: SxProp & { theme?: Record<string, unknown> }) =>
  css(props.sx)(props.theme ?? {})

export default sx

export {merge}
