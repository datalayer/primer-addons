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
import { DatePicker } from '@datalayer/primer-addons';

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
      <Text sx={{ fontSize: 0, color: 'var(--fgColor-muted)' }}>
        A date can be typed as well as picked. What is typed is read on blur or
        on Enter, so a half-typed date is never rewritten mid-word.
      </Text>
    </Box>
  );
}
