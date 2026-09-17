import { useState } from 'react';
import { Box, Text } from '@primer/react';
import { CalendarPicker } from '@datalayer/primer-addons';

export function CalendarPickerDemo() {
  const [date, setDate] = useState<Date | null>(new Date());
  const today = new Date();
  const horizon = new Date(today.getFullYear(), today.getMonth() + 3, 0);
  return (
    <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Box
        sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'var(--borderColor-default)',
          borderRadius: 2,
        }}
      >
        <CalendarPicker value={date} onChange={setDate} max={horizon} />
      </Box>
      <Box sx={{ display: 'grid', gap: 2, maxWidth: 260 }}>
        <Text sx={{ fontSize: 1 }}>
          {date ? date.toDateString() : 'Nothing chosen'}
        </Text>
        <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
          The grid alone, with no field and no popover. This one stops three
          months out, so the days past it cannot be picked. A week opens on
          Sunday unless `weekStartsOn` says otherwise.
        </Text>
      </Box>
    </Box>
  );
}
