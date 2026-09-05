/**
 * The example, as a Reactor app.
 *
 * Three plugins from primer-addons' reactor corner and one of the example's
 * own. `ThemePlugin` keeps Primer's portals in the chosen color mode;
 * `AppearancePlugin` puts the appearance menu — color mode, theme, the
 * theme's description and a preview — at the right edge of the header;
 * `PageLayoutPlugin` arranges the main area as a page: a sheet on a canvas,
 * a band docked above it, a side panel opened from the header. The gallery
 * plugin fills the layout's slots: the search in the band, the component
 * grid or the open demo on the sheet, quick links as chips, and the list of
 * components in the panel.
 *
 * The shell itself is two boxes: a header that renders the `header` slot
 * after its title, and a main area that renders the `main` slot. Everything
 * in them arrived through a plugin.
 */

import { useEffect, useMemo } from 'react';
import { Box, Heading, Text } from '@primer/react';
import { buildReactorFromPlugins, configurePlugin } from '@datalayer/reactor';
import { ReactorSlot, useReactor } from '@datalayer/reactor/react';
import { ThemedProvider, useThemeStore } from '@datalayer/primer-addons';
import {
  AppearancePlugin,
  PageLayoutPlugin,
  ThemePlugin,
} from '@datalayer/primer-addons/lib/reactor';
import { GalleryPlugin } from './gallery/GalleryPlugin';

function createReactor() {
  return buildReactorFromPlugins([
    ThemePlugin,
    AppearancePlugin,
    configurePlugin(PageLayoutPlugin, {
      // The toggle's label: "Show the components".
      panelName: 'components',
      // Demo pages hold wide things — palettes, toolbars — so the sheet is
      // wider than a page of prose.
      sheetWidth: 1080,
      panelWidth: 320,
    }),
    GalleryPlugin,
  ]);
}

export default function App() {
  const reactor = useMemo(createReactor, []);
  useReactor(reactor);

  // A first visit opens on the earth theme, following the OS for the mode;
  // after that the store remembers what the visitor chose.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const persisted = window.localStorage.getItem('datalayer-theme');
    if (persisted) return;
    const { setTheme, setColorMode } = useThemeStore.getState();
    setTheme('earth');
    setColorMode('auto');
  }, []);

  return (
    <ThemedProvider useStore={useThemeStore}>
      <div className="example-shell">
        <Box
          as="header"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            px: 3,
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'border.default',
            bg: 'canvas.default',
          }}
        >
          <div>
            <Heading as="h1" sx={{ fontSize: 3, m: 0 }}>
              Primer Addons Example
            </Heading>
            <Text sx={{ color: 'fg.muted' }}>
              A Reactor app: the theme, appearance and page-layout plugins
              around the addon gallery.
            </Text>
          </div>
          <Box sx={{ flex: 1 }} />
          {/* The page layout's panel toggle, then the appearance menu. */}
          <ReactorSlot slot="header" />
        </Box>
        <Box
          as="main"
          sx={{ minHeight: 0, display: 'flex', flexDirection: 'column' }}
        >
          {/* The page layout, and in it whatever the gallery contributed. */}
          <ReactorSlot slot="main" />
        </Box>
      </div>
    </ThemedProvider>
  );
}
