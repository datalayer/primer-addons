/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { AppearanceControlsWithStore, useThemeStore } from '@datalayer/primer-addons';

export function AppearanceControlsWithStoreDemo() {
  return <AppearanceControlsWithStore useStore={useThemeStore} />;
}
