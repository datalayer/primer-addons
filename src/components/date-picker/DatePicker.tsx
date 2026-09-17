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
import { AnchoredOverlay, Box, TextInput } from "@primer/react";
import { CalendarIcon } from "@primer/octicons-react";
import { CalendarPicker, type CalendarPickerProps } from "../calendar-picker/CalendarPicker";

/** `YYYY-MM-DD`, the one format that means the same thing everywhere. */
export function formatISODate(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
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
  return Number.isNaN(date.getTime()) ? null : date;
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
  placeholder = "YYYY-MM-DD",
  "aria-label": ariaLabel = "Date",
  disabled = false,
  size = "medium",
  validationStatus,
  format = formatISODate,
  id,
  min,
  max,
  isDisabled,
  weekStartsOn,
  locale,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(() => (value ? format(value) : ""));
  const anchorRef = useRef<HTMLDivElement>(null);

  // The field follows the value, except while it is being typed into: a
  // controlled rewrite mid-word moves the caret to the end.
  const typing = useRef(false);
  useEffect(() => {
    if (!typing.current) {
      setText(value ? format(value) : "");
    }
  }, [value, format]);

  const commit = (next: string) => {
    typing.current = false;
    const trimmed = next.trim();
    if (trimmed === "") {
      onChange?.(null);
      return;
    }
    const parsed = parseISODate(trimmed);
    if (parsed) {
      onChange?.(parsed);
      setText(format(parsed));
    } else {
      // Unreadable: put back what is actually held, rather than keeping a
      // date on screen that the caller never received.
      setText(value ? format(value) : "");
    }
  };

  const calendar = useMemo(
    () => (
      <Box sx={{ p: 3 }}>
        <CalendarPicker
          value={value}
          defaultMonth={value ?? undefined}
          onChange={(date) => {
            onChange?.(date);
            setText(format(date));
            setOpen(false);
          }}
          min={min}
          max={max}
          isDisabled={isDisabled}
          weekStartsOn={weekStartsOn}
          locale={locale}
          aria-label={`${ariaLabel}, choose a day`}
        />
      </Box>
    ),
    [
      ariaLabel,
      format,
      isDisabled,
      locale,
      max,
      min,
      onChange,
      value,
      weekStartsOn,
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
        placeholder={placeholder}
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
