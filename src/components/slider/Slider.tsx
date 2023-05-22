import { ChangeEvent, useEffect, useState } from "react";
import { useTheme, Box, CounterLabel, FormControl } from "@primer/react";

interface CommonProps {
  name: string;
  id: string;
  min: number;
  max: number;
  label?: string;
  value?: number;
  displayValue?: boolean;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  width?: string | number;
  onChange: (value: number) => void;
}

type ConditionalProps =
  | {
      markers: true;
      step: number;
    }
  | {
      markers?: false;
      step?: number;
    }

export type SliderProps = CommonProps & ConditionalProps

export const Slider = ({
  name = "slider",
  id = "slider",
  min,
  max,
  value,
  label,
  step = 1,
  markers = false,
  displayValue = true,
  disabled = false,
  orientation = "horizontal",
  width = "200px",
  onChange,
}: SliderProps) => {
  const { colorMode } = useTheme();
  const defaultValue = max < min ? min : min + (max - min) / 2;
  const [sliderVal, setSliderVal] = useState(defaultValue);

  useEffect(() => {
    setSliderVal(value ?? defaultValue);
  }, [value, defaultValue]);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSliderVal(newValue);
    onChange(newValue);
  };

  // Warning: unreliable
  const sliderStyle = {
    width,
    ...(orientation === "vertical" ? { transform: "rotate(-90deg)" } : {}),
    colorScheme: colorMode == 'day' ? 'light' : 'dark'
  }

  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <input
        type="range"
        id={id}
        name={name}
        min={min}
        max={max}
        value={sliderVal}
        step={step ?? "any"}
        list="slider-markers"
        style={sliderStyle}
        onChange={handleSliderChange}
        disabled={disabled}
      />
      {markers && step && (
        <datalist id="slider-markers">
          {Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step).map((e) => (
            // TODO: Supply markers as array and show them here
            <option key={`slider-marker-${e}`} value={e}></option>
          ))}
        </datalist>
      )}
      {label && <FormControl.Label htmlFor={id} sx={{ml: 2}}>{label}</FormControl.Label>}
      {displayValue && orientation === "horizontal" && <CounterLabel sx={{ml: 2}}>{sliderVal}</CounterLabel>}
    </Box>
  )
};

export default Slider;
