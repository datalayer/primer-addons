/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The six accents an application may name, in the theme and the colour mode
 * the gallery wears (its appearance controls choose them): each accent laid
 * over the theme with `themeAccentVars`, beside the theme's own; then the
 * theme's tokens read back. The gallery page is "Theme Accents"; the README's "Theme accents" says what each one is.
 */

import { useEffect, useRef, useState } from 'react';
import { Box, Text, useTheme } from '@primer/react';
import { ThemeAccentPanel, themeAccentChoices, useThemeStore } from '@datalayer/primer-addons';

const TOKENS = [
  '--theme-accent',
  '--theme-accent-on',
  '--theme-stage',
  '--theme-quiet',
  '--theme-stage-gradient',
  '--theme-radius-control',
  '--theme-radius-card',
  '--theme-radius-bubble',
  '--theme-radius-frame',
  '--theme-shadow',
  '--theme-motion-status',
  '--theme-motion-message',
  '--theme-motion-pane',
  '--theme-motion-easing',
  '--theme-message-link',
];

function useMode(): 'light' | 'dark' {
  const { resolvedColorMode } = useTheme();
  return resolvedColorMode === 'dark' || resolvedColorMode === 'night' ? 'dark' : 'light';
}

export function ThemeAccentsDemo() {
  const mode = useMode();
  const variant = useThemeStore(state => state.theme);
  const [values, setValues] = useState<Record<string, string>>({});
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) {
      return;
    }
    // Read once the theme's properties are on the page.
    const frame = requestAnimationFrame(() => {
      if (!root.current) {
        return;
      }
      const style = getComputedStyle(root.current);
      setValues(Object.fromEntries(TOKENS.map(t => [t, style.getPropertyValue(t).trim()])));
    });
    return () => cancelAnimationFrame(frame);
  }, [mode, variant]);

  return (
    <Box ref={root} sx={{ display: 'grid', gap: 4 }}>
      <Text sx={{ color: 'fg.muted' }}>
        In the gallery's theme, <Text sx={{ fontFamily: 'mono', color: 'fg.default' }}>{variant}</Text>, {mode}{' '}
        mode: change either with the appearance controls.
      </Text>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          alignItems: 'start',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        }}
      >
        {themeAccentChoices.map(choice => (
          <ThemeAccentPanel key={choice} choice={choice} mode={mode} />
        ))}
      </Box>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Text sx={{ fontWeight: 600 }}>The theme's tokens, read back from the page</Text>
        <Box as="dl" sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: 1, m: 0 }}>
          {TOKENS.map(token => (
            <Box key={token} sx={{ display: 'contents' }}>
              <Box as="dt" sx={{ fontFamily: 'mono', fontSize: 0 }}>
                {token}
              </Box>
              <Box as="dd" sx={{ m: 0, fontFamily: 'mono', fontSize: 0, color: 'fg.muted', wordBreak: 'break-all' }}>
                {values[token] ?? '…'}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
