/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The reactor-facing corner of primer-addons.
 *
 * Deliberately NOT re-exported from the package's main barrel: importing
 * anything from here pulls `@datalayer/reactor` into the bundle, and most
 * consumers of primer-addons are pages with no reactor at all. A host that
 * wants the plugin imports it by path:
 *
 * ```ts
 * import { ThemePlugin } from '@datalayer/primer-addons/lib/reactor';
 * ```
 *
 * @module reactor
 */

export {
  ThemePlugin,
  THEME_PLUGIN_NAME,
  TOGGLE_COLOR_MODE_COMMAND,
} from "./ThemePlugin";
