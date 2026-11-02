/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Primer's own components, drawn by the theme's shape.
 *
 * A theme's shape (`ThemeShape`) names a control's corner and a table's
 * corner, header and hairline. Primer takes a control's corners from
 * `--borderRadius-medium`, which cards and list items take too, and a data
 * table's from its own `--table-border-radius`, so none of this can be a
 * token alone: it is a stylesheet, scoped by the theme provider
 * (`ThemeStyles.css`), with one rule per thing the theme says. A theme that
 * says nothing gets no rule and keeps Primer's look, and no stylesheet.
 *
 * Primer's class names are CSS-module hashes (`prc-Button-ButtonBase-c50BI`),
 * so the selectors match their stable prefix; the toggle switch is a
 * styled-component, matched by its display name, which styled-components
 * puts in its class (`ToggleSwitch__SwitchButton-sc-e6gszy-0`). A test reads
 * each of them back from the installed `@primer/react`.
 */

import type { ThemeShape } from './createThemeCSSVars';

export const primerComponentSelectors = {
  button: '[class*="prc-Button-ButtonBase"]',
  textInput: '[class*="prc-components-TextInputBaseWrapper"]',
  textArea: '[class*="prc-Textarea-TextArea"]',
  segmentedControl: '[class*="prc-SegmentedControl-SegmentedControl"]',
  buttonGroup: '[class*="prc-ButtonGroup-ButtonGroup"]',
  underlineTab: '[class*="prc-components-UnderlineItem"]',
  toggleTrack: '[class*="ToggleSwitch__SwitchButton-"]',
  toggleKnob: '[class*="ToggleSwitch__ToggleKnob-"]',
  table: '[class*="prc-DataTable-Table-"]',
  tableHeader: '[class*="prc-DataTable-TableHeader-"]',
  tableCell: '[class*="prc-DataTable-TableCell-"]',
} as const;

const sel = primerComponentSelectors;

/**
 * The stylesheet for what a theme's shape says about Primer's components;
 * empty when it says nothing about them.
 *
 * - `radiusControl` — every single-line control: a button, a text input, a
 *   select, a segmented control (outside and each segment), a button
 *   group's two ends, a toggle switch, an underline tab's hover. A
 *   multi-line text area keeps `--borderRadius-medium`: a pill of many
 *   lines is a lozenge. Where a control draws more than one element from the
 *   token — a segmented control's track and segments, a button group's ends
 *   — the token itself is set on the control, and Primer's rules draw it.
 * - `radiusTable` — a data table's outer corners (`--table-border-radius`).
 * - `tableHeaderBg`, `tableHeaderFg` — its header band and header text.
 * - `tableBorder` — the hairline between and around its cells.
 */
export function primerComponentsCss(shape: Partial<ThemeShape> = {}): string {
  const rules: string[] = [];
  if (shape.radiusControl !== undefined) {
    rules.push(`:scope ${sel.button},
:scope ${sel.textInput}:not(:has(${sel.textArea})),
:scope ${sel.segmentedControl},
:scope ${sel.underlineTab},
:scope ${sel.toggleTrack},
:scope ${sel.toggleKnob} {
  --borderRadius-medium: var(--theme-radius-control);
  border-radius: var(--theme-radius-control);
}
:scope ${sel.buttonGroup} {
  --borderRadius-medium: var(--theme-radius-control);
}`);
  }
  if (shape.radiusTable !== undefined) {
    rules.push(`:scope ${sel.table} {
  --table-border-radius: var(--theme-radius-table);
}`);
  }
  const header: string[] = [];
  if (shape.tableHeaderBg !== undefined) {
    header.push('  background-color: var(--theme-table-header-bg);');
  }
  if (shape.tableHeaderFg !== undefined) {
    header.push('  color: var(--theme-table-header-fg);');
  }
  if (header.length) {
    rules.push(`:scope ${sel.tableHeader} {\n${header.join('\n')}\n}`);
  }
  if (shape.tableBorder !== undefined) {
    rules.push(`:scope ${sel.tableHeader},
:scope ${sel.tableCell} {
  border-color: var(--theme-table-border);
}`);
  }
  return rules.length ? `\n${rules.join('\n')}\n` : '';
}
