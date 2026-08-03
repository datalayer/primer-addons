import type { ColorMode, ThemeVariant } from '@datalayer/primer-addons';
import { AppearanceControls, useThemeStore } from '@datalayer/primer-addons';

export function AppearanceControlsDemo() {
  const { colorMode, theme, setColorMode, setTheme } = useThemeStore();

  return (
    <AppearanceControls
      colorMode={colorMode}
      themeVariant={theme}
      onColorModeChange={(mode: ColorMode) => setColorMode(mode)}
      onThemeChange={(variant: ThemeVariant) => setTheme(variant, false)}
    />
  );
}
