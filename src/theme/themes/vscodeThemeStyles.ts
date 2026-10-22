/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * VS Code Theme for Primer React.
 *
 * The editor's own colours, type and shape: every token is a reference to a
 * `--vscode-*` variable (see `../colors/vscodeColors`), so in a VS Code
 * webview the page is drawn in whatever colour theme the editor has and
 * follows it the moment the person picks another — the browser resolves the
 * references at paint time, nothing re-renders. Outside VS Code the
 * references fall back to Dark Modern and Light Modern, the editor's own
 * defaults, so the theme is a theme anywhere.
 *
 * Shape is the editor's: 2px corners on controls, 26px tall, flat cards and
 * overlays, no motion. Theming is applied via **CSS custom-property
 * overrides**, as every Datalayer theme is.
 */

import {
  vscodeFontFamily,
  vscodeFontSize,
  vscodeMonoFontFamily,
  vscodeTint,
  vscodeVar,
} from '../colors/vscodeColors';
import { type ThemeColorDefs, buildThemeStyles } from '../css/createThemeCSSVars';
import { primerComponentSelectors } from '../css/primerComponentsCss';
import { vscodeEditorsCss } from './vscodeEditorsCss';

/* ── Colour definitions, one per mode ────────────────────────────────── */

/**
 * The colour definitions for a mode: the same editor variables in both,
 * only the fallbacks differ.
 *
 * @param mode - The mode whose VS Code defaults are the fallbacks.
 *
 * @returns The definitions.
 */
function vscodeDefs(mode: 'light' | 'dark'): ThemeColorDefs {
  const v = (name: Parameters<typeof vscodeVar>[0]) => vscodeVar(name, mode);
  const tint = (name: Parameters<typeof vscodeVar>[0], percent: number) =>
    vscodeTint(name, mode, percent);
  return {
    canvas: {
      default: v('editorBackground'),
      subtle: v('sideBarBackground'),
    },
    fg: {
      default: v('editorForeground'),
      muted: v('descriptionForeground'),
      onEmphasis: v('buttonForeground'),
    },
    // The accent is the primary button's colour, as the editor's own
    // controls are; links keep the editor's link colour (`--fgColor-link`
    // is set apart below).
    accent: {
      fg: v('buttonBackground'),
      emphasis: v('buttonBackground'),
      muted: tint('buttonBackground', 40),
      subtle: tint('buttonBackground', 15),
    },
    success: {
      fg: v('testingIconPassed'),
      emphasis: v('testingIconPassed'),
      muted: v('testingIconPassed'),
      subtle: tint('testingIconPassed', 15),
    },
    attention: {
      fg: v('editorWarningForeground'),
      emphasis: v('editorWarningForeground'),
      muted: v('editorWarningForeground'),
      subtle: tint('editorWarningForeground', 15),
    },
    danger: {
      fg: v('errorForeground'),
      emphasis: v('errorForeground'),
      muted: v('errorForeground'),
      subtle: tint('errorForeground', 15),
    },
    severe: {
      fg: v('terminalAnsiRed'),
      emphasis: v('terminalAnsiRed'),
      muted: v('terminalAnsiRed'),
      subtle: tint('terminalAnsiRed', 15),
    },
    done: {
      fg: v('terminalAnsiMagenta'),
      emphasis: v('terminalAnsiMagenta'),
      muted: v('terminalAnsiMagenta'),
      subtle: tint('terminalAnsiMagenta', 15),
    },
    border: {
      default: v('panelBorder'),
      muted: v('editorWidgetBorder'),
    },
    btn: {
      text: v('buttonSecondaryForeground'),
      bg: v('buttonSecondaryBackground'),
      border: v('buttonBorder'),
      hoverBg: v('buttonSecondaryHoverBackground'),
      hoverBorder: v('buttonBorder'),
      activeBg: v('buttonSecondaryHoverBackground'),
      activeBorder: v('buttonBorder'),
      selectedBg: v('listActiveSelectionBackground'),
      counterBg: tint('foreground', 15),
      primary: {
        text: v('buttonForeground'),
        bg: v('buttonBackground'),
        border: v('buttonBorder'),
        hoverBg: v('buttonHoverBackground'),
        hoverBorder: v('buttonBorder'),
        selectedBg: v('buttonHoverBackground'),
        disabledText: tint('buttonForeground', 60),
        disabledBg: tint('buttonBackground', 50),
        disabledBorder: 'transparent',
        icon: v('buttonForeground'),
        counterBg: tint('buttonForeground', 20),
      },
      outline: {
        text: v('buttonBackground'),
        hoverText: v('buttonForeground'),
        hoverBg: v('buttonBackground'),
        hoverBorder: v('buttonBackground'),
        hoverCounterBg: tint('buttonForeground', 20),
        selectedText: v('buttonForeground'),
        selectedBg: v('buttonHoverBackground'),
        selectedBorder: v('buttonHoverBackground'),
        disabledText: tint('buttonBackground', 50),
        disabledBg: 'transparent',
        disabledCounterBg: tint('buttonBackground', 5),
        counterBg: tint('buttonBackground', 10),
        counterFg: v('buttonBackground'),
        hoverCounterFg: v('buttonForeground'),
        disabledCounterFg: tint('buttonBackground', 50),
      },
      danger: {
        text: v('errorForeground'),
        hoverText: v('buttonForeground'),
        hoverBg: v('errorForeground'),
        hoverBorder: v('errorForeground'),
        hoverCounterBg: tint('buttonForeground', 20),
        selectedText: v('buttonForeground'),
        selectedBg: v('errorForeground'),
        selectedBorder: v('errorForeground'),
        disabledText: tint('errorForeground', 50),
        disabledBg: 'transparent',
        disabledCounterBg: tint('errorForeground', 5),
        counterBg: tint('errorForeground', 10),
        counterFg: v('errorForeground'),
        hoverCounterFg: v('buttonForeground'),
        disabledCounterFg: tint('errorForeground', 50),
        icon: v('errorForeground'),
      },
    },
  };
}

export const vscodeLight: ThemeColorDefs = vscodeDefs('light');
export const vscodeDark: ThemeColorDefs = vscodeDefs('dark');

/* ── The editor's own variables, beside the colour definitions ───────── */

/**
 * What the colour definitions cannot say, per mode: the link colour (the
 * editor's, not the button's), the focus ring, the list rows, the
 * overlays, the type and the controls' size.
 *
 * @param mode - The mode whose VS Code defaults are the fallbacks.
 *
 * @returns The variables.
 */
function vscodeVariables(mode: 'light' | 'dark'): Record<string, string> {
  const v = (name: Parameters<typeof vscodeVar>[0]) => vscodeVar(name, mode);
  return {
    // Links are the editor's link colour; everything else accented wears
    // the button's.
    '--fgColor-link': v('textLinkForeground'),
    '--focus-outlineColor': v('focusBorder'),
    '--underlineNav-borderColor-active': v('focusBorder'),
    // Rows of a list, as the editor's lists hover and select.
    '--control-transparent-bgColor-hover': v('listHoverBackground'),
    '--control-transparent-bgColor-active': v('listActiveSelectionBackground'),
    '--control-transparent-bgColor-selected': v('listActiveSelectionBackground'),
    '--menu-bgColor-active': v('listHoverBackground'),
    // Menus, dialogs and popovers: the editor's widgets.
    '--overlay-bgColor': v('editorWidgetBackground'),
    '--bgColor-muted': v('editorWidgetBackground'),
    '--shadow-floating-small': `0 0 8px 2px ${v('widgetShadow')}`,
    '--shadow-floating-medium': `0 0 8px 2px ${v('widgetShadow')}`,
    '--shadow-floating-large': `0 0 8px 2px ${v('widgetShadow')}`,
    '--shadow-resting-small': 'none',
    '--shadow-resting-medium': 'none',
    // Fields: the editor's inputs.
    '--control-bgColor-rest': v('inputBackground'),
    '--control-fgColor-rest': v('inputForeground'),
    '--control-borderColor-rest': v('inputBorder'),
    '--control-borderColor-emphasis': v('focusBorder'),
    '--control-fgColor-placeholder': v('inputPlaceholderForeground'),
    // The editor's corners: square-ish everywhere.
    '--borderRadius-small': '2px',
    '--borderRadius-medium': '2px',
    '--borderRadius-large': '4px',
    // The editor's controls: 26px tall, tight.
    '--control-medium-size': '26px',
    '--control-medium-paddingBlock': '4px',
    '--control-medium-paddingInline-normal': '8px',
    '--control-small-size': '22px',
    // The editor's type.
    '--text-body-size-medium': vscodeFontSize,
    '--fontStack-monospace': vscodeMonoFontFamily,
    '--fontStack-system': vscodeFontFamily,
  };
}

/* ── The theme's own stylesheet ──────────────────────────────────────── */

const sel = primerComponentSelectors;

/**
 * What no token says: the editor's focus ring is one pixel, drawn inside
 * the control, in the focus colour. Then the editors' face
 * (`vscodeEditorsCss`): JupyterLab's variables, CodeMirror, Excalidraw.
 */
const vscodeOwnCss = `
:scope ${sel.button}:focus-visible,
:scope ${sel.textInput}:focus-within,
:scope ${sel.textArea}:focus-visible {
  outline: 1px solid var(--focus-outlineColor);
  outline-offset: -1px;
  box-shadow: none;
}
${vscodeEditorsCss}`;

/* ── Exports ─────────────────────────────────────────────────────────── */

/** Comprehensive Primer CSS-variable overrides for light & dark mode. */
export const vscodeThemeStyles = buildThemeStyles(vscodeLight, vscodeDark, {
  fontFamily: vscodeFontFamily,
  css: vscodeOwnCss,
  // The editor's shape: tight corners, flat surfaces, no motion.
  shape: {
    radiusControl: '2px',
    radiusTable: '2px',
    radiusOverlay: '4px',
    radiusCard: '4px',
    radiusBubble: '6px',
    radiusFrame: '4px',
    shadow: 'none',
    motionStatus: '0ms',
    motionMessage: '0ms',
    motionPane: '0ms',
    // A link in a message: the editor's link colour, not the button's.
    messageLink: 'var(--fgColor-link)',
  },
  variables: {
    light: vscodeVariables('light'),
    dark: vscodeVariables('dark'),
  },
});

/** The theme's whole stylesheet (`ThemeStyles.css`). */
export const vscodeControlsCss: string = vscodeThemeStyles.css ?? '';
