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
