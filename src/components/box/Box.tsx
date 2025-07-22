/*
 * Copyright (c) 2021-2024 Datalayer, Inc.
 *
 * Datalayer License
 */

import { ComponentProps } from 'react';
import styled from 'styled-components';
import type { BackgroundProps, BorderProps, ColorProps, FlexboxProps, GridProps, LayoutProps, PositionProps, ShadowProps, SpaceProps, TypographyProps } from 'styled-system';
import {background, border, color, flexbox, grid, layout, position, shadow, space, typography} from 'styled-system';
import sx, {type SxProp } from './sx';

type StyledBoxProps = SxProp &
  SpaceProps &
  ColorProps &
  TypographyProps &
  LayoutProps &
  FlexboxProps &
  GridProps &
  BackgroundProps &
  BorderProps &
  PositionProps &
  ShadowProps;

export const Box = styled.div<StyledBoxProps>(
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  sx,
);

export type BoxProps = ComponentProps<typeof Box>;

export default Box;
