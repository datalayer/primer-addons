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

const sx = (props: SxProp) => css(props.sx)

export default sx

export {merge}
