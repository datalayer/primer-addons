import { AppearanceControlsWithStore, useThemeStore } from '@datalayer/primer-addons';

export function AppearanceControlsWithStoreDemo() {
  return <AppearanceControlsWithStore useStore={useThemeStore} />;
}
