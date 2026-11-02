/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The VS Code theme's face for the editors a page may hold: JupyterLab's
 * variables, a notebook's cells and CodeMirror, and Excalidraw's, each read
 * from the editor's own `--vscode-*` colours. Part of the theme's stylesheet
 * (`ThemeStyles.css`), scoped to the theme's element: a page without a
 * notebook pays nothing but a few unused rules.
 *
 * The `!important`s stand against JupyterLab's and CodeMirror's own
 * stylesheets, which set these on their elements.
 */

/** The JupyterLab, CodeMirror and Excalidraw rules of the VS Code theme. */
export const vscodeEditorsCss = `
:scope {
  /* JupyterLab's variables, each the editor's colour */
  --jp-layout-color0: var(--vscode-editor-background);
  --jp-layout-color1: var(--vscode-sideBar-background);
  --jp-layout-color2: var(--vscode-editorWidget-background);
  --jp-layout-color3: var(--vscode-input-background);
  --jp-layout-color4: var(--vscode-dropdown-background);

  --jp-ui-font-color0: var(--vscode-editor-foreground);
  --jp-ui-font-color1: var(--vscode-foreground);
  --jp-ui-font-color2: var(--vscode-descriptionForeground);
  --jp-ui-font-color3: var(--vscode-disabledForeground);

  --jp-border-color0: var(--vscode-panel-border);
  --jp-border-color1: var(--vscode-editorWidget-border);
  --jp-border-color2: var(--vscode-input-border);

  --jp-brand-color1: var(--vscode-button-background);
  --jp-accent-color1: var(--vscode-focusBorder);

  --jp-error-color1: var(--vscode-errorForeground);
  --jp-warn-color1: var(--vscode-editorWarning-foreground);
  --jp-success-color1: var(--vscode-terminal-ansiGreen);
  --jp-info-color1: var(--vscode-editorInfo-foreground);

  /* The editor */
  --jp-editor-background: var(--vscode-editor-background);
  --jp-editor-foreground: var(--vscode-editor-foreground);
  --jp-editor-border-color: var(--vscode-editorWidget-border);
  --jp-editor-selected-background: var(--vscode-editor-selectionBackground);

  /* A cell */
  --jp-cell-editor-background: var(--vscode-notebook-cellEditorBackground, var(--vscode-editor-background));
  --jp-cell-editor-border-color: var(--vscode-notebook-cellBorderColor, var(--vscode-editorWidget-border));

  /* Input and output */
  --jp-input-background: var(--vscode-input-background);
  --jp-input-foreground: var(--vscode-input-foreground);
  --jp-input-border: var(--vscode-input-border);

  /* Lists */
  --jp-list-hover-background: var(--vscode-list-hoverBackground);
  --jp-list-selected-background: var(--vscode-list-activeSelectionBackground);
}

/* No black gap: the notebook and its frame wear the editor's background */
:scope #notebook-editor,
:scope .dla-Jupyter-Notebook,
:scope .jp-Notebook {
  background-color: var(--vscode-editor-background) !important;
}

/* CodeMirror's editor */
:scope .cm-editor,
:scope .cm-content {
  background-color: var(--vscode-notebook-cellEditorBackground, var(--vscode-editor-background)) !important;
}

/* A notebook's cells */
:scope .jp-Cell {
  background-color: var(--vscode-editor-background) !important;
}

:scope .jp-InputArea-editor {
  background-color: var(--vscode-notebook-cellEditorBackground, var(--vscode-editor-background)) !important;
}

/* The toolbar */
:scope .jp-Toolbar {
  background-color: var(--vscode-editorWidget-background) !important;
  border-bottom: 1px solid var(--vscode-panel-border) !important;
}

/* The sidebar */
:scope .jp-SideBar {
  background-color: var(--vscode-sideBar-background) !important;
  border-color: var(--vscode-panel-border) !important;
}

/* Every widget inside a cell, the cell sidebar's included */
:scope .jp-Cell .lm-Widget {
  background-color: var(--vscode-editor-background) !important;
}

:scope .dla-CellSidebar-Container {
  background-color: var(--vscode-editor-background) !important;
  color: var(--vscode-editor-foreground) !important;
}

:scope .dla-CellSidebar-Container * {
  background-color: inherit !important;
}

:scope .dla-CellSidebar-Container button {
  background-color: transparent !important;
  color: var(--vscode-editor-foreground) !important;
  border: none !important;
}

:scope .dla-CellSidebar-Container button:hover {
  background-color: var(--vscode-list-hoverBackground) !important;
}

/* CodeMirror's selection: its layer, and ::selection on every token */
:scope .cm-selectionBackground,
:scope .cm-editor .cm-selectionBackground,
:scope .cm-editor > .cm-scroller > .cm-selectionLayer .cm-selectionBackground,
:scope .cm-editor.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground {
  background: var(--vscode-editor-selectionBackground) !important;
}

:scope .cm-editor .cm-line ::selection,
:scope .cm-editor .cm-line > *::selection,
:scope .cm-editor .cm-line span::selection,
:scope .cm-editor .cm-content ::selection,
:scope .cm-editor .cm-activeLine ::selection,
:scope .cm-editor *::selection {
  background: var(--vscode-editor-selectionBackground) !important;
  background-color: var(--vscode-editor-selectionBackground) !important;
}

/* Excalidraw, dark */
:scope .ExcalidrawModal__row .excalidraw.theme--dark {
  --color-primary: var(--vscode-button-background, #0e639c);
  --color-primary-darker: var(--vscode-button-hoverBackground, #1177bb);
  --color-primary-darkest: var(--vscode-button-hoverBackground, #0a5285);
  --color-primary-hover: var(--vscode-button-hoverBackground, #1177bb);
  --color-primary-light: var(--vscode-list-activeSelectionBackground, #094771);
  --color-surface-primary: var(--vscode-editor-background, #1e1e1e);
  --default-bg-color: var(--vscode-editor-background, #1e1e1e);
  --color-on-surface: var(--vscode-editor-foreground, #d4d4d4);
  --text-primary-color: var(--vscode-editor-foreground, #d4d4d4);
  --popup-text-color: var(--vscode-editor-foreground, #d4d4d4);
  --color-surface-primary-container: var(--vscode-list-activeSelectionBackground, #094771);
  --color-on-primary-container: var(--vscode-list-activeSelectionForeground, #ffffff);
  --color-brand-hover: var(--vscode-button-hoverBackground, #1177bb);
  --color-brand-active: var(--vscode-focusBorder, #007fd4);
  --color-icon-white: #ffffff;
  --island-bg-color: var(--vscode-editorWidget-background, #252526);
  --sidebar-bg-color: var(--vscode-sideBar-background, #252526);
  --popup-bg-color: var(--vscode-editorWidget-background, #252526);
  --popup-secondary-bg-color: var(--vscode-dropdown-background, #3c3c3c);
  --color-surface-high: var(--vscode-editorWidget-background, #2e2d39);
  --color-surface-mid: var(--vscode-sideBar-background, #252526);
  --color-surface-low: var(--vscode-editor-background, #1e1e1e);
  --color-surface-lowest: var(--vscode-editor-background, #1e1e1e);
  --button-gray-1: var(--vscode-button-secondaryBackground, #3a3d41);
  --button-gray-2: var(--vscode-button-secondaryHoverBackground, #45494e);
  --button-gray-3: var(--vscode-button-secondaryHoverBackground, #45494e);
  --button-hover-bg: var(--vscode-list-hoverBackground, #2a2d2e);
  --button-active-bg: var(--vscode-list-activeSelectionBackground, #094771);
  --button-color: var(--vscode-button-foreground, #ffffff);
  --button-hover-color: var(--vscode-button-foreground, #ffffff);
  --button-bg: var(--vscode-button-background, #0e639c);
  --input-bg-color: var(--vscode-input-background, #3c3c3c);
  --input-border-color: var(--vscode-input-border, #3c3c3c);
  --input-hover-bg-color: var(--vscode-list-hoverBackground, #2a2d2e);
  --default-border-color: var(--vscode-panel-border, #3c3c3c);
  --color-border-outline: var(--vscode-editorWidget-border, #454545);
  --color-border-outline-variant: var(--vscode-panel-border, #3c3c3c);
  --sidebar-border-color: var(--vscode-panel-border, #3c3c3c);
  --dialog-border-color: var(--vscode-editorWidget-border, #454545);
  --focus-highlight-color: var(--vscode-focusBorder, #007fd4);
  --select-highlight-color: var(--vscode-editor-selectionBackground, #264f78);
  --color-selection: var(--vscode-editor-selectionBackground, #264f78);
  --button-active-border: var(--vscode-focusBorder, #007fd4);
  --link-color: var(--vscode-textLink-foreground, #3794ff);
  --scrollbar-thumb: var(--vscode-scrollbarSlider-background, rgba(121, 121, 121, 0.4));
  --scrollbar-thumb-hover: var(--vscode-scrollbarSlider-hoverBackground, rgba(100, 100, 100, 0.7));
  --icon-fill-color: var(--vscode-icon-foreground, #c5c5c5);
}

/* Excalidraw, light */
:scope .ExcalidrawModal__row .excalidraw.theme--light {
  --color-primary: var(--vscode-button-background, #007acc);
  --color-primary-darker: var(--vscode-button-hoverBackground, #005a9e);
  --color-primary-darkest: var(--vscode-button-hoverBackground, #004578);
  --color-primary-hover: var(--vscode-button-hoverBackground, #005a9e);
  --color-primary-light: var(--vscode-list-activeSelectionBackground, #0060c0);
  --color-surface-primary: var(--vscode-editor-background, #ffffff);
  --default-bg-color: var(--vscode-editor-background, #ffffff);
  --color-on-surface: var(--vscode-editor-foreground, #000000);
  --text-primary-color: var(--vscode-editor-foreground, #000000);
  --popup-text-color: var(--vscode-editor-foreground, #000000);
  --color-surface-primary-container: var(--vscode-list-activeSelectionBackground, #0060c0);
  --color-on-primary-container: var(--vscode-list-activeSelectionForeground, #ffffff);
  --color-brand-hover: var(--vscode-button-hoverBackground, #005a9e);
  --color-brand-active: var(--vscode-focusBorder, #0090f1);
  --color-icon-white: #ffffff;
  --island-bg-color: var(--vscode-editorWidget-background, #f3f3f3);
  --sidebar-bg-color: var(--vscode-sideBar-background, #f3f3f3);
  --popup-bg-color: var(--vscode-editorWidget-background, #f3f3f3);
  --popup-secondary-bg-color: var(--vscode-dropdown-background, #ffffff);
  --color-surface-high: var(--vscode-editorWidget-background, #f1f0ff);
  --color-surface-mid: var(--vscode-sideBar-background, #f3f3f3);
  --color-surface-low: var(--vscode-editor-background, #ffffff);
  --color-surface-lowest: var(--vscode-editor-background, #ffffff);
  --button-gray-1: var(--vscode-button-secondaryBackground, #e1e1e1);
  --button-gray-2: var(--vscode-button-secondaryHoverBackground, #d0d0d0);
  --button-gray-3: var(--vscode-button-secondaryHoverBackground, #d0d0d0);
  --button-hover-bg: var(--vscode-list-hoverBackground, #f0f0f0);
  --button-active-bg: var(--vscode-list-activeSelectionBackground, #0060c0);
  --button-color: var(--vscode-button-foreground, #ffffff);
  --button-hover-color: var(--vscode-button-foreground, #ffffff);
  --button-bg: var(--vscode-button-background, #007acc);
  --input-bg-color: var(--vscode-input-background, #ffffff);
  --input-border-color: var(--vscode-input-border, #cecece);
  --input-hover-bg-color: var(--vscode-list-hoverBackground, #f0f0f0);
  --default-border-color: var(--vscode-panel-border, #e0e0e0);
  --color-border-outline: var(--vscode-editorWidget-border, #c8c8c8);
  --color-border-outline-variant: var(--vscode-panel-border, #e0e0e0);
  --sidebar-border-color: var(--vscode-panel-border, #e0e0e0);
  --dialog-border-color: var(--vscode-editorWidget-border, #c8c8c8);
  --focus-highlight-color: var(--vscode-focusBorder, #0090f1);
  --select-highlight-color: var(--vscode-editor-selectionBackground, #add6ff);
  --color-selection: var(--vscode-editor-selectionBackground, #add6ff);
  --button-active-border: var(--vscode-focusBorder, #0090f1);
  --link-color: var(--vscode-textLink-foreground, #006ab1);
  --scrollbar-thumb: var(--vscode-scrollbarSlider-background, rgba(100, 100, 100, 0.4));
  --scrollbar-thumb-hover: var(--vscode-scrollbarSlider-hoverBackground, rgba(100, 100, 100, 0.7));
  --icon-fill-color: var(--vscode-icon-foreground, #424242);
}
`;
