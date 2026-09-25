/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Hours and minutes, as two columns the reader scrolls.
 *
 * The browser's own `type="time"` control draws its dropdown itself: unstyled,
 * unaware of the page's theme, and — because it is the platform's own popup —
 * *over* whatever is already open. Beside a calendar that means the time
 * dropdown covers the days, which is the one thing somebody choosing a moment
 * needs to keep seeing.
 *
 * So the columns are drawn here, in Primer, inside the overlay that already
 * exists. Not a second overlay: a menu anchored inside an `AnchoredOverlay`
 * portals out of it, and the outer overlay's own click-away closes everything
 * the moment the pointer lands in the inner one.
 *
 * @module components/date-picker/TimeColumns
 */

import { useEffect, useRef } from "react";
import { ActionList, Box, Text } from "@primer/react";

/** `7` → `07`. Two digits, always, because a column of ragged numbers reads badly. */
export const pad = (value: number): string => `${value}`.padStart(2, "0");

export interface TimeColumnsProps {
  /** The hour shown as chosen, 0–23. */
  hour: number;
  /** The minute shown as chosen, 0–59. */
  minute: number;
  /** Minutes between the options offered. 1 lists all sixty. */
  step?: number;
  /** Told when either column is used, with the whole time. */
  onChange: (hour: number, minute: number) => void;
  disabled?: boolean;
  /** Names the columns for a screen reader: "Start date, hour". Not drawn —
   *  on screen the two columns are headed "Hour" and "Minute", and a whole
   *  field label repeated over them reads as noise. */
  labelPrefix?: string;
}

const HOURS = Array.from({ length: 24 }, (_, index) => index);

function Column({
  label,
  ariaLabel,
  values,
  selected,
  onPick,
  disabled,
}: {
  label: string;
  ariaLabel: string;
  values: number[];
  selected: number;
  onPick: (value: number) => void;
  disabled?: boolean;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const chosen = useRef<HTMLLIElement>(null);

  // The chosen value, in view, the moment the column is drawn. A column that
  // opens at midnight when it holds 17:00 makes the reader scroll to find out
  // what it is already set to.
  useEffect(() => {
    const item = chosen.current;
    if (!item) {
      return;
    }
    // After layout, and against the scroller rather than whatever the list
    // happens to be positioned against.
    const frame = requestAnimationFrame(() => {
      item.scrollIntoView({ block: "center", inline: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, [selected]);

  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Text
        sx={{
          display: "block",
          fontSize: 0,
          color: "fg.muted",
          mb: 1,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
      <Box
        ref={scroller}
        sx={{
          height: 132,
          overflowY: "auto",
          border: "1px solid",
          borderColor: "border.default",
          borderRadius: 2,
          bg: "canvas.default",
          // The scrollbar is the only hint that there is more below, so it
          // stays: a hidden one turns the column into a list of six hours.
          scrollbarWidth: "thin",
        }}
      >
        <ActionList selectionVariant="single" aria-label={ariaLabel} sx={{ p: 1 }}>
          {values.map((value) => (
            <ActionList.Item
              key={value}
              ref={value === selected ? chosen : undefined}
              selected={value === selected}
              disabled={disabled}
              onSelect={() => onPick(value)}
              sx={{ justifyContent: "center", fontVariantNumeric: "tabular-nums" }}
            >
              {pad(value)}
            </ActionList.Item>
          ))}
        </ActionList>
      </Box>
    </Box>
  );
}

/**
 * The two columns, side by side, with the time they currently mean between
 * them.
 */
export function TimeColumns({
  hour,
  minute,
  step = 5,
  onChange,
  disabled,
  labelPrefix,
}: TimeColumnsProps) {
  const every = Math.min(60, Math.max(1, Math.floor(step) || 1));
  const minutes = Array.from(
    { length: Math.ceil(60 / every) },
    (_, index) => index * every,
  );
  // A minute the step does not land on — 17:07 read back from a stored value —
  // still has to be selectable, or choosing an hour would silently move it.
  const shown = minutes.includes(minute)
    ? minutes
    : [...minutes, minute].sort((left, right) => left - right);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 2,
          mb: 1,
        }}
      >
        <Text sx={{ fontSize: 0, color: "fg.muted" }}>Time</Text>
        <Text
          sx={{
            fontFamily: "mono",
            fontSize: 1,
            fontWeight: "bold",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {pad(hour)}:{pad(minute)}
        </Text>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Column
          label="Hour"
          ariaLabel={labelPrefix ? `${labelPrefix}, hour` : "Hour"}
          values={HOURS}
          selected={hour}
          disabled={disabled}
          onPick={(next) => onChange(next, minute)}
        />
        <Column
          label="Minute"
          ariaLabel={labelPrefix ? `${labelPrefix}, minute` : "Minute"}
          values={shown}
          selected={minute}
          disabled={disabled}
          onPick={(next) => onChange(hour, next)}
        />
      </Box>
    </Box>
  );
}

export default TimeColumns;
