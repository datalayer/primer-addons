/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState } from 'react';
import { Box, Text } from '@primer/react';
import {
  DatePicker,
  formatISODateTime,
  type DatePickerTimePosition,
} from '@datalayer/primer-addons';

/** The four places the time can stand against the calendar, east first: the default. */
const TIME_POSITIONS: { position: DatePickerTimePosition; where: string }[] = [
  { position: 'east', where: 'to the right of the calendar (the default)' },
  { position: 'south', where: 'under the calendar' },
  { position: 'west', where: 'to the left of the calendar' },
  { position: 'north', where: 'above the calendar' },
];

/** A meeting's day and time, with the time where `position` puts it. */
function MeetingPicker({
  position,
  where,
}: {
  position: DatePickerTimePosition;
  where: string;
}) {
  const [meeting, setMeeting] = useState<Date | null>(null);
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Text sx={{ fontSize: 1, fontWeight: 'semibold' }}>
        Meeting, timePosition="{position}"
      </Text>
      <DatePicker
        value={meeting}
        onChange={setMeeting}
        withTime
        timePosition={position}
        timeStep={15}
        defaultTime="09:00"
        aria-label={`Meeting date and time, the time ${where}`}
      />
      <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
        {meeting
          ? `Chosen: ${formatISODateTime(meeting)}.`
          : `The hour and minute columns stand ${where}. A day picked first starts at 09:00; minutes step by 15.`}
      </Text>
    </Box>
  );
}

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [due, setDue] = useState<Date | null>(null);
  return (
    <Box sx={{ display: 'grid', gap: 4, maxWidth: 420 }}>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Text sx={{ fontSize: 1, fontWeight: 'semibold' }}>Starts</Text>
        <DatePicker value={date} onChange={setDate} aria-label="Start date" />
      </Box>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Text sx={{ fontSize: 1, fontWeight: 'semibold' }}>Due</Text>
        <DatePicker
          value={due}
          onChange={setDue}
          min={date ?? undefined}
          aria-label="Due date"
        />
        <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
          Nothing before the start date can be picked here.
        </Text>
      </Box>
      {TIME_POSITIONS.map(({ position, where }) => (
        <MeetingPicker key={position} position={position} where={where} />
      ))}
      <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
        A date can be typed as well as picked. What is typed is read on blur or
        on Enter, so a half-typed date is never rewritten mid-word.
      </Text>
    </Box>
  );
}
