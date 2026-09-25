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

export { datalayerColors } from './datalayerColors';
export { spatialColors } from './spatialColors';
export { lovelyColors } from './lovelyColors';
export { matrixColors } from './matrixColors';
export { earthColors } from './earthColors';
export { sandColors } from './sandColors';
export { ivoryColors } from './ivoryColors';
export { sunColors } from './sunColors';

import type { ThemeVariant } from '../themeRegistry';
import { datalayerColors } from './datalayerColors';
import { spatialColors } from './spatialColors';
import { lovelyColors } from './lovelyColors';
import { matrixColors } from './matrixColors';
import { earthColors } from './earthColors';
import { sandColors } from './sandColors';
import { ivoryColors } from './ivoryColors';
import { sunColors } from './sunColors';

/**
 * Themed color palettes — maps each `ThemeVariant` to its corresponding
 * color object so consumers can pick the right palette at runtime.
 *
 * Usage:
 * ```ts
 * import { themedColors } from '@datalayer/primer-addons/lib/theme';
 * const colors = themedColors[themeVariant]; // Record<string, string>
 * ```
 */
export const themedColors: Record<ThemeVariant, Record<string, string>> = {
  datalayer: datalayerColors,
  spatial: spatialColors,
  lovely: lovelyColors,
  matrix: matrixColors,
  earth: earthColors,
  sand: sandColors,
  ivory: ivoryColors,
  sun: sunColors,
};
