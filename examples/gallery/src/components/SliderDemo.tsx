/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { Slider } from '@datalayer/primer-addons';

export function SliderDemo() {
  return (
    <Slider
      id="example-slider"
      name="example-slider"
      min={0}
      max={100}
      value={40}
      step={5}
      label="Volume"
      onChange={() => undefined}
    />
  );
}
