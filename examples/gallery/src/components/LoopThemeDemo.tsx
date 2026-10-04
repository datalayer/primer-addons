/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The `loop` theme, whatever theme the gallery wears: its own provider, the
 * six accents an application may name, its tokens read back live, and the
 * controls as pills. The README's "The loop theme" says what each one is.
 */

import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  SegmentedControl,
  Text,
  TextInput,
  ToggleSwitch,
  useTheme,
} from '@primer/react';
import {
  DatalayerThemeProvider,
  type LoopAccentName,
  loopAccentNames,
  loopAccentVars,
  loopAccents,
  loopTheme,
  loopThemeStyles,
} from '@datalayer/primer-addons';

const TOKENS = [
  '--theme-radius-control',
  '--theme-radius-card',
  '--theme-radius-bubble',
  '--theme-radius-frame',
  '--theme-motion-status',
  '--theme-motion-message',
  '--theme-motion-pane',
  '--theme-motion-easing',
  '--loop-face-large',
  '--loop-face-medium',
  '--loop-face-small',
];

function LoopSheet() {
  const { resolvedColorMode } = useTheme();
  const mode =
    resolvedColorMode === 'dark' || resolvedColorMode === 'night' ? 'dark' : 'light';
  const [accent, setAccent] = useState<LoopAccentName>('green');
  const [values, setValues] = useState<Record<string, string>>({});
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) {
      return;
    }
    const style = getComputedStyle(root.current);
    setValues(Object.fromEntries(TOKENS.map(t => [t, style.getPropertyValue(t).trim()])));
  }, [mode]);

  return (
    <Box ref={root} sx={{ display: 'grid', gap: 4 }}>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Text sx={{ fontWeight: 600 }}>Accents — `interface.accent`</Text>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {loopAccentNames.map(name => (
            <Box
              key={name}
              as="button"
              type="button"
              aria-pressed={name === accent}
              onClick={() => setAccent(name)}
              sx={{
                width: 72,
                height: 48,
                borderRadius: 'var(--theme-radius-control)',
                border: name === accent ? '2px solid' : '2px solid transparent',
                borderColor: name === accent ? 'fg.default' : 'transparent',
                bg: loopAccents[name].accent,
                color: loopAccents[name].on,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {name}
            </Box>
          ))}
        </Box>
      </Box>

      {/* The stage of the chosen accent, as a host sets it on the application's root. */}
      <Box
        style={loopAccentVars(accent, mode)}
        sx={{
          background: 'var(--loop-stage)',
          borderRadius: 'var(--theme-radius-frame)',
          p: 4,
        }}
      >
        <Box
          sx={{
            bg: 'canvas.default',
            borderRadius: 'var(--theme-radius-frame)',
            boxShadow: 'var(--theme-shadow)',
            p: 3,
            display: 'grid',
            gap: 3,
          }}
        >
          <Box
            sx={{
              justifySelf: 'start',
              bg: 'var(--loop-quiet)',
              borderRadius: 'var(--theme-radius-bubble)',
              px: 3,
              py: 2,
            }}
          >
            The agent's words, on the quiet tint.
          </Box>
          <Box
            sx={{
              justifySelf: 'end',
              bg: 'var(--loop-accent)',
              color: 'var(--loop-accent-on)',
              borderRadius: 'var(--theme-radius-bubble)',
              px: 3,
              py: 2,
            }}
          >
            The person's, on the accent.
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextInput placeholder="Send a message" aria-label="Message" />
            <Button variant="primary">Send</Button>
            <Button>Later</Button>
            <SegmentedControl aria-label="View">
              <SegmentedControl.Button defaultSelected>Chat</SegmentedControl.Button>
              <SegmentedControl.Button>Work</SegmentedControl.Button>
            </SegmentedControl>
            <ToggleSwitch aria-labelledby="loop-demo-toggle" size="small" />
            <Text id="loop-demo-toggle" sx={{ color: 'fg.muted' }}>
              Ask first
            </Text>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gap: 2 }}>
        <Text sx={{ fontWeight: 600 }}>Tokens, read back from the page</Text>
        <Box as="dl" sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: 1, m: 0 }}>
          {TOKENS.map(token => (
            <Box key={token} sx={{ display: 'contents' }}>
              <Box as="dt" sx={{ fontFamily: 'mono', fontSize: 0 }}>
                {token}
              </Box>
              <Box as="dd" sx={{ m: 0, fontFamily: 'mono', fontSize: 0, color: 'fg.muted' }}>
                {values[token] ?? '…'}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export function LoopThemeDemo() {
  // A provider of its own: the theme's stylesheet is scoped to it and stops
  // at it, so the pills show here whatever theme the gallery wears. Given no
  // colorMode, a nested provider wears the mode of the page around it.
  return (
    <DatalayerThemeProvider theme={loopTheme} themeStyles={loopThemeStyles}>
      <Box sx={{ p: 3 }}>
        <LoopSheet />
      </Box>
    </DatalayerThemeProvider>
  );
}
