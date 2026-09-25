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

import { Button, Text } from '@primer/react';
import { Card } from '@datalayer/primer-addons';

export function CardDemo() {
  return (
    <Card border rounded="medium" shadow="medium" sx={{ maxWidth: 520 }}>
      <Card.Header title="Datalayer Card" description="Composable addon component" />
      <Card.Content>
        <Text as="p" sx={{ m: 0 }}>
          The Card API supports header, content, image and action slots.
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button>Action</Button>
      </Card.Actions>
    </Card>
  );
}
