/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The six accents an application may name, over several themes side by
 * side: each theme in its own provider, the chosen accent laid over it with
 * `themeAccentVars`. Then the `loop` theme's own: the controls as pills and
 * its tokens read back. The README's "Accents" says what each one is.
 */

import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Link,
  SegmentedControl,
  Text,
  TextInput,
  ToggleSwitch,
  useTheme,
} from '@primer/react';
import {
  DatalayerThemeProvider,
  type ThemeAccentName,
  type ThemeVariant,
  getThemeConfig,
  loopTheme,
  loopThemeStyles,
  themeAccentNames,
  themeAccentVars,
  themeAccents,
} from '@datalayer/primer-addons';

/** The themes shown side by side. */
const VARIANTS: ThemeVariant[] = ['datalayer', 'loop', 'earth', 'sand'];

/** The theme's own accent, or one of the six. */
type Choice = ThemeAccentName | 'theme';

function useMode(): 'light' | 'dark' {
  const { resolvedColorMode } = useTheme();
  return resolvedColorMode === 'dark' || resolvedColorMode === 'night' ? 'dark' : 'light';
}

function AccentPicker({ value, onChange }: { value: Choice; onChange: (choice: Choice) => void }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Box
        as="button"
        type="button"
        aria-pressed={value === 'theme'}
        onClick={() => onChange('theme')}
        sx={{
          height: 40,
          px: 3,
          borderRadius: 2,
          border: '2px solid',
          borderColor: value === 'theme' ? 'fg.default' : 'border.default',
          bg: 'canvas.default',
          color: 'fg.default',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        the theme's own
      </Box>
      {themeAccentNames.map(name => (
        <Box
          key={name}
          as="button"
          type="button"
          aria-pressed={name === value}
          onClick={() => onChange(name)}
          sx={{
            width: 72,
            height: 40,
            borderRadius: 2,
            border: '2px solid',
            borderColor: name === value ? 'fg.default' : 'transparent',
            bg: themeAccents[name].accent,
            color: themeAccents[name].on,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {name}
        </Box>
      ))}
    </Box>
  );
}

/** One theme, with the accent over it: the stage, two bubbles, a link and the controls. */
function ThemePanel({ variant, choice, mode }: { variant: ThemeVariant; choice: Choice; mode: 'light' | 'dark' }) {
  const config = getThemeConfig(variant);
  return (
    <DatalayerThemeProvider
      theme={config.primerTheme}
      themeStyles={config.themeStyles}
      baseStyles={choice === 'theme' ? undefined : themeAccentVars(choice, mode)}
    >
      <Box
        sx={{
          background: 'var(--theme-stage-gradient)',
          borderRadius: 'var(--theme-radius-frame)',
          p: 3,
          display: 'grid',
          gap: 2,
        }}
      >
        <Text sx={{ fontWeight: 600, fontFamily: 'mono', fontSize: 1 }}>{variant}</Text>
        <Box
          sx={{
            bg: 'canvas.default',
            borderRadius: 'var(--theme-radius-card)',
            boxShadow: 'var(--theme-shadow)',
            p: 3,
            display: 'grid',
            gap: 2,
          }}
        >
          <Box
            sx={{
              justifySelf: 'start',
              bg: 'var(--theme-quiet)',
              color: 'fg.default',
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
              bg: 'var(--theme-accent)',
              color: 'var(--theme-accent-on)',
              borderRadius: 'var(--theme-radius-bubble)',
              px: 3,
              py: 2,
            }}
          >
            The person's, on the accent.
          </Box>
          <Text>
            A <Link href="#theme-accents">link</Link> in the accent's text.
          </Text>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary">Send</Button>
            <Button>Later</Button>
            <ToggleSwitch aria-label={`Ask first (${variant})`} size="small" defaultChecked />
          </Box>
        </Box>
      </Box>
    </DatalayerThemeProvider>
  );
}

const LOOP_TOKENS = [
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

/** The `loop` theme's own: the controls as pills, and its tokens read back. */
function LoopSheet({ choice, mode }: { choice: Choice; mode: 'light' | 'dark' }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) {
      return;
    }
    const style = getComputedStyle(root.current);
    setValues(Object.fromEntries(LOOP_TOKENS.map(t => [t, style.getPropertyValue(t).trim()])));
  }, [mode]);
  return (
    <DatalayerThemeProvider
      theme={loopTheme}
      themeStyles={loopThemeStyles}
      baseStyles={choice === 'theme' ? undefined : themeAccentVars(choice, mode)}
    >
      <Box ref={root} sx={{ display: 'grid', gap: 3, p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextInput placeholder="Send a message" aria-label="Message" />
          <Button variant="primary">Send</Button>
          <Button>Later</Button>
          <SegmentedControl aria-label="View">
            <SegmentedControl.Button defaultSelected>Chat</SegmentedControl.Button>
            <SegmentedControl.Button>Work</SegmentedControl.Button>
          </SegmentedControl>
        </Box>
        <Box as="dl" sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: 1, m: 0 }}>
          {LOOP_TOKENS.map(token => (
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
    </DatalayerThemeProvider>
  );
}

export function ThemeAccentsDemo() {
  const mode = useMode();
  const [choice, setChoice] = useState<Choice>('rose');
  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Text sx={{ fontWeight: 600 }}>Pick an accent, as an application names one in interface.accent</Text>
        <AccentPicker value={choice} onChange={setChoice} />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          alignItems: 'start',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        }}
      >
        {VARIANTS.map(variant => (
          <ThemePanel key={variant} variant={variant} choice={choice} mode={mode} />
        ))}
      </Box>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Text sx={{ fontWeight: 600 }}>The loop theme's own: the controls as pills, its tokens read back</Text>
        <LoopSheet choice={choice} mode={mode} />
      </Box>
    </Box>
  );
}
