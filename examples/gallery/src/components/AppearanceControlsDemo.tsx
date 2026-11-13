/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useState } from 'react';
import type { AppearanceControlsProps, ColorMode, ThemeVariant } from '@datalayer/primer-addons';
import { AppearanceControls, Box } from '@datalayer/primer-addons';

type Example = { props: AppearanceControlsProps; what: string; framed?: boolean };

/** Every combination: the two layouts, the parts each shows, with the store (the default) and without. */
const EXAMPLES: Example[] = [
  // Stacked, the appearance menu's panel.
  { props: { themesPerLine: 6 }, what: 'Stacked (the default), with the store (the default): the colour mode, then the theme swatches.', framed: true },
  { props: { themesPerLine: 6, showThemePreviews: true }, what: 'Stacked, with the chosen theme’s name, description and preview.', framed: true },
  { props: { showThemeChooser: false }, what: 'Stacked, the colour mode alone.', framed: true },
  { props: { themesPerLine: 6, showColorMode: false }, what: 'Stacked, the theme chooser alone.', framed: true },
  { props: { themesPerLine: 6, showColorMode: false, showThemePreviews: true }, what: 'Stacked, the theme chooser alone with its preview.', framed: true },
  // Inline, a page header's trailing controls.
  { props: { layout: 'inline' }, what: 'Inline: one round button per theme, then the colour mode.' },
  { props: { layout: 'inline', showThemeChooser: false }, what: 'Inline, the colour mode alone.' },
  { props: { layout: 'inline', showColorMode: false }, what: 'Inline, the theme chooser alone.' },
  { props: { layout: 'inline', applyThemeColorMode: true }, what: 'Inline, a theme also switching to its own colour mode.' },
];

const propsSaid = (props: AppearanceControlsProps): string =>
  Object.entries(props)
    .map(([key, value]) => (value === true ? key : `${key}=${typeof value === 'string' ? `"${value}"` : `{${String(value)}}`}`))
    .join(' ') || '(no props)';

function Labelled({ title, what, framed, children }: { title: string; what: string; framed?: boolean; children: React.ReactNode }) {
  return (
    <Box display="grid" gap={2}>
      <Box fontSize={1} fontWeight="semibold" fontFamily="mono">
        {title}
      </Box>
      <Box fontSize={0} color="fg.muted">
        {what}
      </Box>
      {framed ? (
        <Box border="1px solid" borderColor="border.default" borderRadius="card" maxWidth={360}>
          {children}
        </Box>
      ) : (
        children
      )}
    </Box>
  );
}

/** Without the store: the page holds the values and is told of each change. */
function WithoutStore({ layout }: { layout: 'stacked' | 'inline' }) {
  const [colorMode, setColorMode] = useState<ColorMode>('light');
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>('datalayer');
  return (
    <Labelled
      title={`withStore={false} layout="${layout}"`}
      what={`Without the store, from the page’s own state (now ${themeVariant}, ${colorMode}): the rest of the gallery does not change.`}
      framed={layout === 'stacked'}
    >
      <AppearanceControls
        withStore={false}
        layout={layout}
        themesPerLine={6}
        colorMode={colorMode}
        themeVariant={themeVariant}
        onColorModeChange={setColorMode}
        onThemeChange={setThemeVariant}
      />
    </Labelled>
  );
}

export function AppearanceControlsDemo() {
  return (
    <Box display="grid" gap={4}>
      {EXAMPLES.map(({ props, what, framed }) => (
        <Labelled key={what} title={propsSaid(props)} what={what} framed={framed}>
          <AppearanceControls {...props} />
        </Labelled>
      ))}
      <WithoutStore layout="stacked" />
      <WithoutStore layout="inline" />
    </Box>
  );
}
