/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@primer/react";
import { DatePicker, DatePickerProps, formatISODateTime } from "../..";

const today = new Date();

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    value: { control: false },
    min: { control: false },
    max: { control: false },
    isDisabled: { control: false },
    format: { control: false },
    size: {
      options: ["small", "medium", "large"],
      control: "radio",
    },
    validationStatus: {
      options: ["error", "success", undefined],
      control: "radio",
    },
    timePosition: {
      options: ["east", "south", "west", "north"],
      control: "radio",
    },
    weekStartsOn: {
      options: [0, 1],
      control: "radio",
    },
  },
  args: {
    value: today,
    placeholder: "YYYY-MM-DD",
    disabled: false,
    size: "medium",
    withTime: false,
    "aria-label": "Start date",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Holds the date and says it under the field. */
const ThemedDatePicker = (props: DatePickerProps) => {
  const [date, setDate] = useState<Date | null>(props.value ?? null);
  useEffect(() => setDate(props.value ?? null), [props.value]);
  return (
    <Box p={3} bg="canvas.default" minHeight={420}>
      <Box sx={{ display: "grid", gap: 2, maxWidth: 420 }}>
        <DatePicker
          {...props}
          value={date}
          onChange={(next) => {
            setDate(next);
            props.onChange?.(next);
          }}
        />
        <Text sx={{ fontSize: 0, color: "fg.muted" }}>
          {date ? `Chosen: ${formatISODateTime(date)}.` : "Nothing chosen."} A
          date can be typed as well as picked; what is typed is read on blur or
          on Enter.
        </Text>
      </Box>
    </Box>
  );
};

/** A day, typed or picked from the calendar the field opens. */
export const Default: Story = {
  render: (args) => <ThemedDatePicker {...args} />,
};

/** A day and a time: the hour and minute columns to the right of the calendar. */
export const WithTime: Story = {
  args: {
    value: null,
    withTime: true,
    timePosition: "east",
    timeStep: 15,
    defaultTime: "09:00",
    placeholder: "YYYY-MM-DD HH:mm",
    "aria-label": "Meeting date and time",
  },
  render: (args) => <ThemedDatePicker {...args} />,
};

/** The time under the calendar, five-minute steps. */
export const TimeSouth: Story = {
  args: {
    withTime: true,
    timePosition: "south",
    timeStep: 5,
    "aria-label": "Reminder date and time",
  },
  render: (args) => <ThemedDatePicker {...args} />,
};

/** Nothing before today, nothing past three months out; weeks open on Monday. */
export const Bounded: Story = {
  args: {
    value: null,
    min: today,
    max: new Date(today.getFullYear(), today.getMonth() + 3, 0),
    weekStartsOn: 1,
    "aria-label": "Due date",
  },
  render: (args) => <ThemedDatePicker {...args} />,
};

/** Marked as holding something invalid. */
export const Invalid: Story = {
  args: {
    validationStatus: "error",
  },
  render: (args) => <ThemedDatePicker {...args} />,
};

/** Nothing can be picked or typed. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <ThemedDatePicker {...args} />,
};
