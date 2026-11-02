/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * VS Code Color System – the editor's own colours.
 *
 * Inside a Visual Studio Code webview the editor publishes its colour theme
 * as `--vscode-*` custom properties on the page and rewrites them when the
 * person picks another theme (Abyss, Dark Modern, Quiet Light…). The VS Code
 * theme reads those variables, so the webview follows the editor at paint
 * time, with no re-render: {@link vscodeVar} writes
 * `var(--vscode-<name>, <fallback>)`, the fallback being VS Code's own
 * *Dark Modern* or *Light Modern* value, which is what the theme looks like
 * outside VS Code (the appearance menu on the web, a native app).
 *
 * `vscodeColors` holds the Dark Modern hexes under the keys the other colour
 * systems have, for the consumers that need a literal colour: the swatch,
 * the avatars, the illustrations.
 */

/** One VS Code theme colour: its variable, and the value when it is not published. */
export interface VSCodeColor {
  /** The `--vscode-*` variable, without the prefix (`editor-background`). */
  variable: string;
  /** VS Code's Light Modern value. */
  light: string;
  /** VS Code's Dark Modern value. */
  dark: string;
}

/**
 * The editor colours the theme reads, with their Light Modern and Dark
 * Modern values (VS Code's own defaults) as the fallbacks outside VS Code.
 */
export const vscodeVars = {
  editorBackground: { variable: 'editor-background', light: '#FFFFFF', dark: '#1F1F1F' },
  editorForeground: { variable: 'editor-foreground', light: '#3B3B3B', dark: '#CCCCCC' },
  foreground: { variable: 'foreground', light: '#3B3B3B', dark: '#CCCCCC' },
  descriptionForeground: { variable: 'descriptionForeground', light: '#3B3B3BB3', dark: '#9D9D9D' },
  disabledForeground: { variable: 'disabledForeground', light: '#3B3B3B80', dark: '#CCCCCC80' },
  sideBarBackground: { variable: 'sideBar-background', light: '#F8F8F8', dark: '#181818' },
  editorWidgetBackground: { variable: 'editorWidget-background', light: '#F8F8F8', dark: '#202020' },
  editorWidgetBorder: { variable: 'editorWidget-border', light: '#E5E5E5', dark: '#313131' },
  panelBorder: { variable: 'panel-border', light: '#E5E5E5', dark: '#2B2B2B' },
  widgetShadow: { variable: 'widget-shadow', light: '#00000029', dark: '#0000005C' },
  focusBorder: { variable: 'focusBorder', light: '#005FB8', dark: '#0078D4' },
  textLinkForeground: { variable: 'textLink-foreground', light: '#005FB8', dark: '#4DAAFC' },
  buttonBackground: { variable: 'button-background', light: '#005FB8', dark: '#0078D4' },
  buttonForeground: { variable: 'button-foreground', light: '#FFFFFF', dark: '#FFFFFF' },
  buttonHoverBackground: { variable: 'button-hoverBackground', light: '#0258A8', dark: '#026EC1' },
  buttonBorder: { variable: 'button-border', light: '#0000001A', dark: '#FFFFFF12' },
  buttonSecondaryBackground: { variable: 'button-secondaryBackground', light: '#E5E5E5', dark: '#313131' },
  buttonSecondaryForeground: { variable: 'button-secondaryForeground', light: '#3B3B3B', dark: '#CCCCCC' },
  buttonSecondaryHoverBackground: { variable: 'button-secondaryHoverBackground', light: '#CCCCCC', dark: '#3C3C3C' },
  inputBackground: { variable: 'input-background', light: '#FFFFFF', dark: '#313131' },
  inputForeground: { variable: 'input-foreground', light: '#3B3B3B', dark: '#CCCCCC' },
  inputBorder: { variable: 'input-border', light: '#CECECE', dark: '#3C3C3C' },
  inputPlaceholderForeground: { variable: 'input-placeholderForeground', light: '#767676', dark: '#989898' },
  listHoverBackground: { variable: 'list-hoverBackground', light: '#F2F2F2', dark: '#2A2D2E' },
  listActiveSelectionBackground: { variable: 'list-activeSelectionBackground', light: '#E8E8E8', dark: '#04395E' },
  errorForeground: { variable: 'errorForeground', light: '#F85149', dark: '#F85149' },
  editorWarningForeground: { variable: 'editorWarning-foreground', light: '#BF8803', dark: '#CCA700' },
  editorInfoForeground: { variable: 'editorInfo-foreground', light: '#1A85FF', dark: '#3794FF' },
  testingIconPassed: { variable: 'testing-iconPassed', light: '#388A34', dark: '#73C991' },
  terminalAnsiBlue: { variable: 'terminal-ansiBlue', light: '#0451A5', dark: '#2472C8' },
  terminalAnsiGreen: { variable: 'terminal-ansiGreen', light: '#107C10', dark: '#0DBC79' },
  terminalAnsiMagenta: { variable: 'terminal-ansiMagenta', light: '#BC05BC', dark: '#BC3FBC' },
  terminalAnsiYellow: { variable: 'terminal-ansiYellow', light: '#949800', dark: '#E5E510' },
  terminalAnsiRed: { variable: 'terminal-ansiRed', light: '#CD3131', dark: '#CD3131' },
  terminalAnsiCyan: { variable: 'terminal-ansiCyan', light: '#0598BC', dark: '#11A8CD' },
} as const satisfies Record<string, VSCodeColor>;

/** The names of the colours the theme reads. */
export type VSCodeVarName = keyof typeof vscodeVars;

/**
 * An editor colour as the theme writes it: the live variable, its
 * mode's default when the page is not a VS Code webview.
 *
 * @param name - The colour.
 * @param mode - Which default to fall back on.
 *
 * @returns `var(--vscode-<variable>, <fallback>)`.
 */
export function vscodeVar(name: VSCodeVarName, mode: 'light' | 'dark'): string {
  const color = vscodeVars[name];
  return `var(--vscode-${color.variable}, ${color[mode]})`;
}

/**
 * An editor colour at a fraction of its opacity, for the muted surfaces
 * (a banner's tint, a chip's background): the live colour mixed with
 * transparency, which keeps following the editor's theme.
 *
 * @param name - The colour.
 * @param mode - Which default to fall back on.
 * @param percent - How much of the colour, 0 to 100.
 *
 * @returns A `color-mix()` of the colour and transparent.
 */
export function vscodeTint(name: VSCodeVarName, mode: 'light' | 'dark', percent: number): string {
  return `color-mix(in srgb, ${vscodeVar(name, mode)} ${percent}%, transparent)`;
}

/** The editor's sans-serif, when the page is not a VS Code webview. */
const vscodeSystemFont =
  'system-ui, "Ubuntu", "Droid Sans", -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", sans-serif';

/** The editor's UI font: VS Code's, else what VS Code picks on each OS. */
export const vscodeFontFamily = `var(--vscode-font-family, ${vscodeSystemFont})`;

/** The editor's code font. */
export const vscodeMonoFontFamily =
  'var(--vscode-editor-font-family, "Droid Sans Mono", "monospace", monospace)';

/** The editor's UI font size (13px by default). */
export const vscodeFontSize = 'var(--vscode-font-size, 13px)';

/**
 * The VS Code colours as literal values — Dark Modern's — under the keys the
 * other colour systems share, for the swatch, the avatars and the
 * illustrations, which need a colour rather than a reference.
 */
export const vscodeColors = {
  // Core Neutrals — Dark Modern
  black: vscodeVars.editorBackground.dark,  // #1F1F1F — editor background
  gray: vscodeVars.descriptionForeground.dark, // #9D9D9D — secondary text
  white: vscodeVars.editorBackground.light, // #FFFFFF — Light Modern background

  // VS Code palette (Brand) — the product's blue
  vscodeBase: '#0078D4',   // Base color — the button, the focus ring
  vscodeBrand: '#0078D4',  // Brand / swatch
  vscodeAccent: '#4DAAFC', // Links on dark surfaces
  vscodeText: '#005FB8',   // Accessible text and buttons on white
  vscodeTint: '#E8F1FB',   // Pale blue — callouts on light surfaces
  vscodeBright: '#4DAAFC', // Highlights on dark backgrounds
  vscodeHover: '#026EC1',  // Primary button hover

  // Semantic roles — the editor's
  attentionBrand: vscodeVars.editorWarningForeground.light,
  attentionAccent: vscodeVars.editorWarningForeground.dark,
  attentionTint: '#FFF4CE',
  dangerBrand: vscodeVars.errorForeground.light,
  dangerAccent: vscodeVars.errorForeground.dark,
  dangerTint: '#FDE7E6',
  severeBrand: '#BC4C00',
  severeAccent: '#DB6D28',
  severeTint: '#FFE9D9',
  doneBrand: vscodeVars.terminalAnsiMagenta.light,
  doneAccent: vscodeVars.terminalAnsiMagenta.dark,
  doneTint: '#F5E1F5',

  // Bright / vivid colours for SVG illustrations — the terminal's ANSI colours
  brightGlow: '#4DAAFC',  // Link blue — primary glow
  brightPop: '#0DBC79',   // ANSI green — contrasting accent
  brightSpark: '#11A8CD', // ANSI cyan — sparkle
  brightBlaze: '#F14C4C', // ANSI bright red — warm accent
  brightSurge: '#2472C8', // ANSI blue — cool accent
  brightFlame: '#E5E510', // ANSI yellow — warm energy
  brightGold: '#FFCC00',  // Gold — highlight

  // Vivid brights for light backgrounds — deeper for contrast on white
  brightLightGlow: '#005FB8',  // Deep blue
  brightLightPop: '#107C10',   // Deep green
  brightLightSpark: '#0598BC', // Deep cyan
  brightLightBlaze: '#CD3131', // Deep red
  brightLightSurge: '#0451A5', // Deep blue
  brightLightFlame: '#949800', // Deep yellow
  brightLightGold: '#9A7B00',  // Deep gold
} as const;

export default vscodeColors;
