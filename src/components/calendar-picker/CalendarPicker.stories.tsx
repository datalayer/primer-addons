/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@primer/react";
import { CalendarPicker, CalendarPickerProps } from "../..";

const today = new Date();

const meta = {
  title: "Components/CalendarPicker",
  component: CalendarPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    value: { control: false },
    defaultMonth: { control: false },
    min: { control: false },
    max: { control: false },
    isDisabled: { control: false },
    weekStartsOn: {
      options: [0, 1],
      control: "radio",
    },
    locale: {
      options: ["en-US", "en-GB", "fr-FR", "de-DE", "ja-JP"],
      control: "select",
    },
  },
  args: {
    value: today,
    weekStartsOn: 0,
    locale: "en-US",
    "aria-label": "Pick a day",
  },
} satisfies Meta<typeof CalendarPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Holds the chosen day and says it under the grid. */
const ThemedCalendarPicker = (props: CalendarPickerProps) => {
  const [date, setDate] = useState<Date | null>(props.value ?? null);
  useEffect(() => setDate(props.value ?? null), [props.value]);
  return (
    <Box p={3} bg="canvas.default">
      <Box
        sx={{
          display: "inline-block",
          p: 3,
          border: "1px solid",
          borderColor: "border.default",
          borderRadius: "var(--theme-radius-card)",
        }}
      >
        <CalendarPicker
          {...props}
          value={date}
          onChange={(day) => {
            setDate(day);
            props.onChange?.(day);
          }}
        />
      </Box>
      <Text as="p" sx={{ mt: 2, fontSize: 1 }}>
        {date ? date.toDateString() : "Nothing chosen"}
      </Text>
    </Box>
  );
};

/** The grid alone, with no field and no popover; a week opens on Sunday. */
export const Default: Story = {
  render: (args) => <ThemedCalendarPicker {...args} />,
};

/** A week that opens on Monday, written in French. */
export const MondayFirstFrench: Story = {
  args: {
    weekStartsOn: 1,
    locale: "fr-FR",
  },
  render: (args) => <ThemedCalendarPicker {...args} />,
};

/** From today to three months out: the days past either end cannot be picked. */
export const Bounded: Story = {
  args: {
    min: today,
    max: new Date(today.getFullYear(), today.getMonth() + 3, 0),
  },
  render: (args) => <ThemedCalendarPicker {...args} />,
};

/** Weekends are out, through `isDisabled`. */
export const WeekdaysOnly: Story = {
  args: {
    isDisabled: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
  },
  render: (args) => <ThemedCalendarPicker {...args} />,
};

/** Nothing chosen yet, opening on a given month. */
export const Empty: Story = {
  args: {
    value: null,
    defaultMonth: new Date(today.getFullYear(), 11, 1),
  },
  render: (args) => <ThemedCalendarPicker {...args} />,
};
