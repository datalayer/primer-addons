import type { ThemeVariant } from '@datalayer/primer-addons';
import { ThemeCircle, useThemeStore } from '@datalayer/primer-addons';

export function ThemeCircleDemo() {
  const { theme, setTheme } = useThemeStore();

  return (
    <ThemeCircle
      themeVariant={theme}
      onThemeChange={(variant: ThemeVariant) => setTheme(variant, false)}
    />
  );
}
