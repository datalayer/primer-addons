/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { JSX } from 'react';

export type Demo = {
  slug: string;
  title: string;
  description: string;
  render: () => JSX.Element;
};
