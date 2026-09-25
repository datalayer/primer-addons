/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * A month of days, to pick one from.
 *
 * The grid on its own, with no input and no popover: a page that already has
 * somewhere to show a month — a sidebar, a scheduling panel, a form — renders
 * this directly, and {@link DatePicker} puts the same grid in an overlay
 * behind a field.
 *
 * Every colour is a Primer custom property rather than a token read from the
 * theme object, so the calendar follows whichever theme the page is wearing.
 *
 * @module components/calendar-picker/CalendarPicker
 */

import { useMemo, useState } from "react";
import { Box, IconButton, Text } from "@primer/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";

/** Sunday-first, as a month grid is conventionally drawn. */
const WEEKDAY_ORDER = [0, 1, 2, 3, 4, 5, 6] as const;

/** Midnight, so two days compare by their date alone. */
function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a: Date | null | undefined, b: Date | null | undefined) {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Every cell of the grid the month is drawn on: the days before the first
 * fall on the previous month, the days after the last on the next, so the
 * weeks stay whole and nothing jumps when the month changes length.
 */
export function monthGrid(month: Date, weekStartsOn = 0): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const lead = (first.getDay() - weekStartsOn + 7) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - lead);
  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}

export interface CalendarPickerProps {
  /** The day that reads as chosen. */
  value?: Date | null;
  /** The month on screen when the calendar has no value of its own. */
  defaultMonth?: Date;
  /** Told which day was picked. */
  onChange?: (date: Date) => void;
  /** Days before this one cannot be picked. */
  min?: Date;
  /** Days after this one cannot be picked. */
  max?: Date;
  /** Answers whether one more day is out of bounds, over `min` and `max`. */
  isDisabled?: (date: Date) => boolean;
  /**
   * Which day a week opens on: `0` Sunday (the default), `1` Monday. The
   * headings follow it, so a Monday week reads M T W T F S S.
   */
  weekStartsOn?: 0 | 1;
  /** The locale the month name and the weekday initials are written in. */
  locale?: string;
  /** A label for the grid, for anyone reading it through a screen reader. */
  "aria-label"?: string;
}

/**
 * The month grid. Uncontrolled in the month it shows — arrows move it — and
 * controlled in the day it marks, which is the caller's to hold.
 */
export function CalendarPicker({
  value,
  defaultMonth,
  onChange,
  min,
  max,
  isDisabled,
  weekStartsOn = 0,
  locale,
  "aria-label": ariaLabel,
}: CalendarPickerProps) {
  const [month, setMonth] = useState<Date>(() => {
    const anchor = value ?? defaultMonth ?? new Date();
    return new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  });

  const today = useMemo(() => startOfDay(new Date()), []);
  const days = useMemo(
    () => monthGrid(month, weekStartsOn),
    [month, weekStartsOn],
  );

  const monthName = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(month),
    [locale, month],
  );

  const weekdayNames = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
    // Any week will do for the names; 2024-01-07 was a Sunday.
    return WEEKDAY_ORDER.map((offset) => {
      const day = new Date(2024, 0, 7 + ((offset + weekStartsOn) % 7));
      return format.format(day);
    });
  }, [locale, weekStartsOn]);

  const dayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [locale],
  );

  const blocked = (day: Date) => {
    if (min && startOfDay(day) < startOfDay(min)) {
      return true;
    }
    if (max && startOfDay(day) > startOfDay(max)) {
      return true;
    }
    return isDisabled?.(day) ?? false;
  };

  const step = (by: number) =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + by, 1));

  return (
    <Box
      role="group"
      aria-label={ariaLabel ?? "Choose a date"}
      sx={{ display: "grid", gap: 2, minWidth: 252 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <IconButton
          icon={ChevronLeftIcon}
          aria-label="Previous month"
          variant="invisible"
          size="small"
          onClick={() => step(-1)}
        />
        <Text
          aria-live="polite"
          sx={{
            fontSize: 1,
            fontWeight: "semibold",
            color: "var(--fgColor-default)",
          }}
        >
          {monthName}
        </Text>
        <IconButton
          icon={ChevronRightIcon}
          aria-label="Next month"
          variant="invisible"
          size="small"
          onClick={() => step(1)}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 1,
        }}
      >
        {weekdayNames.map((name) => (
          <Text
            key={name}
            aria-hidden="true"
            sx={{
              fontSize: 0,
              textAlign: "center",
              color: "var(--fgColor-muted)",
            }}
          >
            {name.slice(0, 2)}
          </Text>
        ))}

        {days.map((day) => {
          const outside = day.getMonth() !== month.getMonth();
          const selected = sameDay(day, value ?? null);
          const isToday = sameDay(day, today);
          const disabled = blocked(day);
          return (
            <Box
              key={day.toISOString()}
              as="button"
              type="button"
              aria-label={dayLabel.format(day)}
              aria-pressed={selected}
              aria-current={isToday ? "date" : undefined}
              disabled={disabled}
              onClick={() => !disabled && onChange?.(startOfDay(day))}
              sx={{
                appearance: "none",
                border: "1px solid",
                borderColor: selected
                  ? "var(--borderColor-accent-emphasis)"
                  : isToday
                    ? "var(--borderColor-default)"
                    : "transparent",
                borderRadius: 2,
                height: 30,
                cursor: disabled ? "not-allowed" : "pointer",
                fontSize: 1,
                lineHeight: 1,
                bg: selected
                  ? "var(--bgColor-accent-emphasis)"
                  : "transparent",
                color: selected
                  ? "var(--fgColor-onEmphasis)"
                  : outside || disabled
                    ? "var(--fgColor-muted)"
                    : "var(--fgColor-default)",
                opacity: disabled ? 0.5 : outside ? 0.6 : 1,
                "&:hover:not(:disabled)": {
                  bg: selected
                    ? "var(--bgColor-accent-emphasis)"
                    : "var(--bgColor-muted)",
                },
                "&:focus-visible": {
                  outline: "2px solid var(--borderColor-accent-emphasis)",
                  outlineOffset: "-1px",
                },
              }}
            >
              {day.getDate()}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default CalendarPicker;
