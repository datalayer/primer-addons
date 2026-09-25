/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * A date field, with a month to pick from behind it.
 *
 * Primer's own form field and overlay: a `TextInput` with a calendar button
 * for its trailing action, and {@link CalendarPicker} in an `AnchoredOverlay`
 * under it. A date can be typed as well as picked — the field parses what is
 * typed on blur and leaves it alone until then, so half-typed dates are not
 * rewritten under the person's cursor.
 *
 * @module components/date-picker/DatePicker
 */

import type { RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnchoredOverlay, Box, Button, TextInput } from "@primer/react";
import { CalendarIcon } from "@primer/octicons-react";
import { CalendarPicker, type CalendarPickerProps } from "../calendar-picker/CalendarPicker";
import { TimeColumns } from "./TimeColumns";

/** `YYYY-MM-DD`, the one format that means the same thing everywhere. */
export function formatISODate(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** `YYYY-MM-DD HH:mm`, the same date with the minute it holds. */
export function formatISODateTime(date: Date): string {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${formatISODate(date)} ${hours}:${minutes}`;
}

/** `HH:mm` of a date, which is what a `type="time"` field holds. */
export function formatTime(date: Date): string {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Reads `YYYY-MM-DD` as a local date.
 *
 * `new Date('2026-01-31')` is UTC midnight, which is the day before in the
 * Americas; the parts are given to the constructor separately so the date
 * means the same day in every zone.
 */
export function parseISODate(text: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text.trim());
  if (!match) {
    return null;
  }
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return isExactly(date, Number(year), Number(month), Number(day)) ? date : null;
}

/**
 * Whether `date` holds exactly the fields it was built from.
 *
 * The `Date` constructor rolls an out-of-range field into the next one —
 * `2026-02-31` becomes the 3rd of March, `24:00` the next day — instead of
 * failing, so a typo would be committed as some other moment. A field that
 * does not come back as written was not a real one.
 */
function isExactly(
  date: Date,
  year: number,
  month: number,
  day: number,
  hours = 0,
  minutes = 0,
  seconds = 0,
): boolean {
  return (
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getHours() === hours &&
    date.getMinutes() === minutes &&
    date.getSeconds() === seconds
  );
}

/**
 * Reads `YYYY-MM-DD HH:mm` — or the same with a `T`, or with seconds, or with
 * no time at all — as a local date.
 *
 * Lenient on the way in and strict on the way out: somebody typing a date into
 * a field has a shape in their fingers, and rejecting `2026-01-31T09:00`
 * because the separator is a `T` teaches them nothing. What the field *writes*
 * is always one shape.
 */
export function parseISODateTime(text: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(
    text.trim(),
  );
  if (!match) {
    return null;
  }
  const [, year, month, day, hours, minutes, seconds] = match;
  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours ?? 0),
    Number(minutes ?? 0),
    Number(seconds ?? 0),
  );
  return isExactly(
    date,
    Number(year),
    Number(month),
    Number(day),
    Number(hours ?? 0),
    Number(minutes ?? 0),
    Number(seconds ?? 0),
  )
    ? date
    : null;
}

export interface DatePickerProps
  extends Pick<
    CalendarPickerProps,
    "min" | "max" | "isDisabled" | "weekStartsOn" | "locale"
  > {
  /** The chosen date, or nothing chosen. */
  value?: Date | null;
  /** Told when a date is picked or typed. `null` when the field is emptied. */
  onChange?: (date: Date | null) => void;
  /** What the empty field says. */
  placeholder?: string;
  /** The field's accessible name. */
  "aria-label"?: string;
  /** Nothing can be picked or typed. */
  disabled?: boolean;
  /** The field's width. Primer's `medium` by default. */
  size?: "small" | "medium" | "large";
  /**
   * Marks the field as holding something invalid, or as settled. Primer's own
   * two, spelled out rather than imported from a path inside the package that
   * not every consumer's module resolution can see.
   */
  validationStatus?: "error" | "success";
  /**
   * How a chosen date is written into the field. ISO `YYYY-MM-DD` by
   * default, which is also the only shape the field parses back.
   */
  format?: (date: Date) => string;
  /** An id for the field, for a label that names it from outside. */
  id?: string;
  /**
   * Whether the field holds a time as well as a day.
   *
   * With it, the field reads and writes `YYYY-MM-DD HH:mm`, and the overlay
   * carries a time beneath the calendar. Without it — the default — nothing
   * about the field changes, because most dates are days.
   */
  withTime?: boolean;
  /**
   * Minutes between the options the minute column offers. Default: five.
   *
   * A minute the step does not land on — one read back from a stored value —
   * is still offered, so choosing an hour never quietly moves it.
   */
  timeStep?: number;
  /**
   * The time a day picked from the calendar takes when the field held nothing
   * yet. `"00:00"` by default — a window that starts "on the 3rd" starts at
   * the beginning of the 3rd.
   */
  defaultTime?: string;
}

/**
 * A date field with a calendar behind it.
 *
 * Controlled: `value` is the caller's, and every pick and every parsed entry
 * arrives through `onChange`.
 */
export function DatePicker({
  value = null,
  onChange,
  placeholder,
  "aria-label": ariaLabel = "Date",
  disabled = false,
  size = "medium",
  validationStatus,
  format,
  id,
  min,
  max,
  isDisabled,
  weekStartsOn,
  locale,
  withTime = false,
  timeStep = 5,
  defaultTime = "00:00",
}: DatePickerProps) {
  // The two shapes, chosen once: a caller that passed a `format` keeps it,
  // and a caller that asked for a time gets the one that carries a time.
  const writeDate = format ?? (withTime ? formatISODateTime : formatISODate);
  const readDate = withTime ? parseISODateTime : parseISODate;
  const emptyText = placeholder ?? (withTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD");
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(() => (value ? writeDate(value) : ""));
  const anchorRef = useRef<HTMLDivElement>(null);

  // The field follows the value, except while it is being typed into: a
  // controlled rewrite mid-word moves the caret to the end.
  const typing = useRef(false);
  useEffect(() => {
    if (!typing.current) {
      setText(value ? writeDate(value) : "");
    }
  }, [value, writeDate]);

  const commit = (next: string) => {
    typing.current = false;
    const trimmed = next.trim();
    if (trimmed === "") {
      onChange?.(null);
      return;
    }
    const parsed = readDate(trimmed);
    if (parsed) {
      onChange?.(parsed);
      setText(writeDate(parsed));
    } else {
      // Unreadable: put back what is actually held, rather than keeping a
      // date on screen that the caller never received.
      setText(value ? writeDate(value) : "");
    }
  };

  /** The day picked, wearing the time the field already held. */
  const withHeldTime = (day: Date): Date => {
    const [hours, minutes] = (value ? formatTime(value) : defaultTime)
      .split(":")
      .map(Number);
    const next = new Date(day);
    next.setHours(hours || 0, minutes || 0, 0, 0);
    return next;
  };

  /** The time the field holds right now, or the one a new pick starts from. */
  const held = (() => {
    const [hours, minutes] = (value ? formatTime(value) : defaultTime)
      .split(":")
      .map(Number);
    return { hour: hours || 0, minute: minutes || 0 };
  })();

  /** The day the field holds, at the time just chosen. */
  const atTime = (hour: number, minute: number): Date => {
    const next = new Date(value ?? new Date());
    next.setHours(hour, minute, 0, 0);
    return next;
  };

  const calendar = useMemo(
    () => (
      <Box sx={{ p: 3 }}>
        <CalendarPicker
          value={value}
          defaultMonth={value ?? undefined}
          onChange={(date) => {
            // A day picked while a time is held keeps that time: somebody
            // moving a window from the 3rd to the 4th did not mean to move
            // it to midnight.
            const next = withTime ? withHeldTime(date) : date;
            onChange?.(next);
            setText(writeDate(next));
            if (!withTime) {
              setOpen(false);
            }
          }}
          min={min}
          max={max}
          isDisabled={isDisabled}
          weekStartsOn={weekStartsOn}
          locale={locale}
          aria-label={`${ariaLabel}, choose a day`}
        />
        {withTime && (
          <Box
            sx={{
              mt: 3,
              pt: 3,
              borderTop: "1px solid",
              borderColor: "border.default",
            }}
          >
            <TimeColumns
              hour={held.hour}
              minute={held.minute}
              step={timeStep}
              disabled={disabled}
              labelPrefix={ariaLabel}
              onChange={(hour, minute) => {
                const next = atTime(hour, minute);
                onChange?.(next);
                setText(writeDate(next));
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button size="small" variant="primary" onClick={() => setOpen(false)}>
                Done
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    ),
    // `withHeldTime`, `held` and `atTime` all close over `value` and
    // `defaultTime`, both of which are named here.
    [
      ariaLabel,
      defaultTime,
      disabled,
      isDisabled,
      locale,
      max,
      min,
      onChange,
      size,
      timeStep,
      value,
      weekStartsOn,
      withTime,
      writeDate,
    ],
  );

  return (
    <Box ref={anchorRef} sx={{ display: "inline-block" }}>
      <AnchoredOverlay
        open={open}
        onOpen={() => !disabled && setOpen(true)}
        onClose={() => setOpen(false)}
        // The field's own box is the anchor; `useRef` types its current as
        // nullable, which is not how the overlay declares what it takes.
        anchorRef={anchorRef as RefObject<HTMLElement>}
        // The field is the anchor; the button inside it does the opening.
        renderAnchor={null}
        overlayProps={{ role: "dialog", "aria-label": `${ariaLabel} calendar` }}
      >
        {calendar}
      </AnchoredOverlay>
      <TextInput
        id={id}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        value={text}
        placeholder={emptyText}
        disabled={disabled}
        size={size}
        validationStatus={validationStatus}
        onChange={(event) => {
          typing.current = true;
          setText(event.target.value);
        }}
        onBlur={(event) => commit(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            commit((event.target as HTMLInputElement).value);
            setOpen(false);
          }
          if (event.key === "ArrowDown" && !open) {
            event.preventDefault();
            setOpen(true);
          }
        }}
        trailingAction={
          <TextInput.Action
            onClick={() => !disabled && setOpen((was) => !was)}
            icon={CalendarIcon}
            aria-label={open ? "Close the calendar" : "Open the calendar"}
            disabled={disabled}
          />
        }
      />
    </Box>
  );
}

export default DatePicker;
