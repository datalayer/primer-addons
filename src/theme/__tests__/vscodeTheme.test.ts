/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The VS Code theme: every colour is the editor's own variable with the
 * editor's default as its fallback, in both modes, so a webview follows the
 * editor's colour theme live and the theme still draws outside VS Code.
 */

import { describe, expect, it } from 'vitest';
import { themeTokens, themeVariants } from '../themeTokens';
import { themeConfigs } from '../themeRegistry';
import { vscodeTint, vscodeVar, vscodeVars } from '../colors/vscodeColors';
import { vscodeThemeStyles } from '../themes/vscodeTheme';
import { vscodeEditorsCss } from '../themes/vscodeEditorsCss';

const COLOR_TOKENS = [
  '--bgColor-default',
  '--fgColor-default',
  '--fgColor-muted',
  '--fgColor-link',
  '--fgColor-accent',
  '--bgColor-accent-emphasis',
  '--borderColor-default',
  '--button-primary-bgColor-rest',
  '--button-default-bgColor-rest',
  '--control-bgColor-rest',
  '--focus-outlineColor',
  '--fgColor-danger',
  '--fgColor-success',
  '--fgColor-attention',
  '--overlay-bgColor',
];

describe('the VS Code theme', () => {
  it('is listed with the others, last', () => {
    expect(themeVariants[themeVariants.length - 1]).toBe('vscode');
    expect(themeTokens.vscode.label).toBe('VS Code');
    expect(themeConfigs.vscode.primerTheme).toBeDefined();
  });

  it('writes an editor colour as its variable with the mode’s default', () => {
    expect(vscodeVar('editorBackground', 'dark')).toBe('var(--vscode-editor-background, #1F1F1F)');
    expect(vscodeVar('editorBackground', 'light')).toBe('var(--vscode-editor-background, #FFFFFF)');
    expect(vscodeTint('buttonBackground', 'dark', 15)).toBe(
      'color-mix(in srgb, var(--vscode-button-background, #0078D4) 15%, transparent)',
    );
  });

  for (const mode of ['light', 'dark'] as const) {
    it(`${mode}: every colour token reads a --vscode-* variable`, () => {
      const styles = vscodeThemeStyles[mode] as Record<string, string>;
      for (const token of COLOR_TOKENS) {
        expect(styles[token], token).toMatch(/var\(--vscode-[a-zA-Z-]+, /);
      }
      // The fallbacks are the mode's: Dark Modern's editor is #1F1F1F, Light Modern's white.
      expect(styles['--bgColor-default']).toContain(vscodeVars.editorBackground[mode]);
    });
  }

  it('accents with the button, links with the link colour, focus with the focus ring', () => {
    const dark = vscodeThemeStyles.dark as Record<string, string>;
    expect(dark['--fgColor-accent']).toContain('--vscode-button-background');
    expect(dark['--bgColor-accent-emphasis']).toContain('--vscode-button-background');
    expect(dark['--fgColor-link']).toContain('--vscode-textLink-foreground');
    expect(dark['--focus-outlineColor']).toContain('--vscode-focusBorder');
    expect(dark['--theme-message-link']).toBe('var(--fgColor-link)');
  });

  it('wears the editor’s type and shape', () => {
    const light = vscodeThemeStyles.light as Record<string, string>;
    expect(light['--fontStack-sansSerif']).toContain('var(--vscode-font-family');
    expect(light['--fontStack-monospace']).toContain('var(--vscode-editor-font-family');
    expect(light['--text-body-size-medium']).toBe('var(--vscode-font-size, 13px)');
    expect(light['--borderRadius-medium']).toBe('2px');
    expect(light['--theme-radius-control']).toBe('2px');
    expect(light['--control-medium-size']).toBe('26px');
    expect(light['--theme-motion-message']).toBe('0ms');
  });

  it('carries its stylesheet: the editor’s one-pixel inset focus ring', () => {
    expect(vscodeThemeStyles.css).toContain('outline: 1px solid var(--focus-outlineColor)');
    expect(vscodeThemeStyles.css).toContain('outline-offset: -1px');
  });

  it('gives the editors their face: JupyterLab’s variables, CodeMirror, Excalidraw', () => {
    const css = vscodeThemeStyles.css ?? '';
    expect(css).toContain('--jp-layout-color0: var(--vscode-editor-background)');
    expect(css).toContain('--jp-brand-color1: var(--vscode-button-background)');
    expect(css).toContain(':scope .cm-editor *::selection');
    expect(css).toContain(':scope .ExcalidrawModal__row .excalidraw.theme--dark');
    expect(css).toContain(':scope .ExcalidrawModal__row .excalidraw.theme--light');
    // Scoped: nothing addresses the page's body.
    expect(css).not.toMatch(/^\s*body/m);
  });

  it('defines the sizes Primer’s controls read, for a page without the primitives sheets', () => {
    const light = vscodeThemeStyles.light as Record<string, string>;
    // The theme's own control size wins over the base's.
    expect(light['--control-medium-size']).toBe('26px');
  });
});

describe('the editors\' face stays off the portable entry', () => {
  it('leaves the editors\' CSS out of the portable tokens and puts it in the web\'s styles', () => {
    const portableCss = themeTokens.vscode.themeStyles.css ?? '';
    expect(portableCss).toContain(':focus-visible');
    expect(portableCss).not.toContain(vscodeEditorsCss.trim().slice(0, 80));
    expect(vscodeThemeStyles.css).toContain(vscodeEditorsCss.trim().slice(0, 80));
    expect(themeConfigs.vscode.themeStyles.css).toBe(vscodeThemeStyles.css);
  });
});
