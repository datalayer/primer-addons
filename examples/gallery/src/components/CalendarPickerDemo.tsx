/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
