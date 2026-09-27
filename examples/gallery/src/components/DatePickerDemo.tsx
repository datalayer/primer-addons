/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState } from 'react';
import { Box, Text } from '@primer/react';
import { DatePicker, formatISODateTime } from '@datalayer/primer-addons';

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [due, setDue] = useState<Date | null>(null);
  const [meeting, setMeeting] = useState<Date | null>(null);
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
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Text sx={{ fontSize: 1, fontWeight: 'semibold' }}>Meeting</Text>
        <DatePicker
          value={meeting}
          onChange={setMeeting}
          withTime
          timeStep={15}
          defaultTime="09:00"
          aria-label="Meeting date and time"
        />
        <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
          {meeting
            ? `Chosen: ${formatISODateTime(meeting)}.`
            : 'With withTime, the hour and minute columns sit beneath the calendar. A day picked first starts at 09:00; minutes step by 15.'}
        </Text>
      </Box>
      <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
        A date can be typed as well as picked. What is typed is read on blur or
        on Enter, so a half-typed date is never rewritten mid-word.
      </Text>
    </Box>
  );
}
