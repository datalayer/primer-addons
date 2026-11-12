/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The accents an application may name, over the theme it wears: the theme's
 * own accent and the six of `themeAccentNames`, each laid over the theme
 * with `themeAccentVars`.
 *
 * - `ThemeAccentPanel`: one accent at full size, its stage, two bubbles, a
 *   link and the controls (the gallery's "Theme Accents" page).
 * - `ThemeAccentSwatch` / `ThemeAccentSwatches`: one box per accent, its
 *   name and its values (the appearance picker's preview).
 *
 * They read the theme from the nearest theme provider, so inside a
 * `DatalayerThemeProvider` for another theme they show that theme's.
 */

import { type CSSProperties, type ReactElement, useLayoutEffect, useRef, useState } from 'react';
import { Button, Link, Text, ToggleSwitch } from '@primer/react';
import { Box } from '../box/Box';
import {
  type ThemeAccentName,
  themeAccentNames,
  themeAccents,
  themeAccentVars,
} from '../../theme/colors/themeAccents';

/** The theme's own accent, or one of the six. */
export type ThemeAccentChoice = ThemeAccentName | 'theme';

/** The theme's own accent first, then the six. */
export const themeAccentChoices: ThemeAccentChoice[] = ['theme', ...themeAccentNames];

/** The custom properties that lay an accent over the theme; none for the theme's own. */
const accentStyle = (choice: ThemeAccentChoice, mode: 'light' | 'dark'): CSSProperties | undefined =>
  choice === 'theme' ? undefined : (themeAccentVars(choice, mode) as CSSProperties);

const accentLabel = (choice: ThemeAccentChoice): string =>
  choice === 'theme' ? "the theme's own" : choice;

export interface ThemeAccentPanelProps {
  choice: ThemeAccentChoice;
  mode: 'light' | 'dark';
}

/** One accent over the theme: the stage, two bubbles, a link and the controls. */
export function ThemeAccentPanel({ choice, mode }: ThemeAccentPanelProps): ReactElement {
  return (
    <Box
      style={accentStyle(choice, mode)}
      sx={{
        background: 'var(--theme-stage-gradient)',
        borderRadius: 'var(--theme-radius-frame)',
        p: 3,
        display: 'grid',
        gap: 2,
      }}
    >
      <Text sx={{ fontWeight: 600, fontFamily: 'mono', fontSize: 1 }}>{accentLabel(choice)}</Text>
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
          <Text id={`theme-accents-ask-first-${choice}-${mode}`} sx={{ fontSize: 1 }}>
            Ask first
          </Text>
          <ToggleSwitch aria-labelledby={`theme-accents-ask-first-${choice}-${mode}`} size="small" defaultChecked />
        </Box>
      </Box>
    </Box>
  );
}

/** The accent's values a swatch names. */
interface AccentValues {
  accent: string;
  text: string;
}

export interface ThemeAccentSwatchProps {
  choice: ThemeAccentChoice;
  mode: 'light' | 'dark';
  /** Height of the stage block. Default: 40. */
  height?: number;
}

/**
 * One accent as a swatch: its stage with the accent's fill on it, then its
 * name, the accent's value and the value of its text. The theme's own values
 * are read back from the page, the six from `themeAccents`.
 */
export function ThemeAccentSwatch({ choice, mode, height = 40 }: ThemeAccentSwatchProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const [read, setRead] = useState<AccentValues | null>(null);
  useLayoutEffect(() => {
    if (choice !== 'theme') {
      setRead(null);
      return undefined;
    }
    // Once the theme's properties are on the page.
    const frame = requestAnimationFrame(() => {
      if (!ref.current) {
        return;
      }
      const style = getComputedStyle(ref.current);
      setRead({
        accent: style.getPropertyValue('--theme-accent').trim(),
        text: style.getPropertyValue('--fgColor-accent').trim(),
      });
    });
    return () => cancelAnimationFrame(frame);
    // A theme of its own is a provider above: key the swatch by it to read again.
  }, [choice, mode]);
  const values: AccentValues | null =
    choice === 'theme' ? read : { accent: themeAccents[choice].accent, text: themeAccents[choice].text[mode] };
  return (
    <Box
      ref={ref}
      style={accentStyle(choice, mode)}
      data-accent={choice}
      sx={{
        display: 'grid',
        gridTemplateRows: `${height}px auto`,
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 'var(--theme-radius-card)',
        overflow: 'hidden',
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          background: 'var(--theme-stage-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            bg: 'var(--theme-accent)',
            color: 'var(--theme-accent-on)',
            borderRadius: 'var(--theme-radius-bubble)',
            px: 2,
            fontSize: 0,
            lineHeight: '20px',
            fontWeight: 600,
          }}
        >
          Aa
        </Box>
      </Box>
      <Box sx={{ p: 2, display: 'grid', gap: 1, bg: 'canvas.default' }}>
        <Text
          sx={{ fontSize: 0, color: 'fg.default', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          title={accentLabel(choice)}
        >
          {accentLabel(choice)}
        </Text>
        {values?.accent ? (
          <Text sx={{ fontSize: 0, color: 'fg.muted', fontFamily: 'mono' }}>{values.accent}</Text>
        ) : null}
        {values?.text ? (
          <Text sx={{ fontSize: 0, color: 'var(--fgColor-accent)', fontFamily: 'mono' }}>text {values.text}</Text>
        ) : null}
      </Box>
    </Box>
  );
}

export interface ThemeAccentSwatchesProps {
  mode: 'light' | 'dark';
  /** The narrowest a swatch gets before the grid wraps to fewer columns. Default: 104px. */
  minSwatchWidth?: number;
}

/** The theme's own accent and the six, one swatch each, in a wrapping grid. */
export function ThemeAccentSwatches({ mode, minSwatchWidth = 104 }: ThemeAccentSwatchesProps): ReactElement {
  return (
    <Box
      data-testid="theme-accent-swatches"
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minSwatchWidth}px, 1fr))`,
        gap: 2,
      }}
    >
      {themeAccentChoices.map(choice => (
        <ThemeAccentSwatch key={choice} choice={choice} mode={mode} />
      ))}
    </Box>
  );
}
