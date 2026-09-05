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
 * wants the plugins imports them by path:
 *
 * ```ts
 * import { AppearancePlugin, ThemePlugin } from '@datalayer/primer-addons/lib/reactor';
 * ```
 *
 * Three plugins. `ThemePlugin` keeps Primer's portals in the application's
 * color mode and toggles that mode by command. `AppearancePlugin` puts the
 * appearance menu — color mode, theme, the theme's description and a
 * preview of it — in a slot, the header by default, and brings the first
 * along as a dependency. `PageLayoutPlugin` arranges a host's slots as a
 * page: the work on a centred sheet, a band above it, a side panel opened
 * from the header — and the layout, its toggle and its signals are exported
 * on their own for a host that wires the parts itself, as the Loop does.
 *
 * @module reactor
 */

export {
  ThemePlugin,
  THEME_PLUGIN_NAME,
  TOGGLE_COLOR_MODE_COMMAND,
} from "./ThemePlugin";
export {
  AppearancePlugin,
  APPEARANCE_PLUGIN_NAME,
  APPEARANCE_MENU_COMPONENT_ID,
  type AppearancePluginConfig,
} from "./AppearancePlugin";
export {
  PageLayoutPlugin,
  PAGE_LAYOUT_PLUGIN_NAME,
  PageLayoutSlots,
  type PageLayoutPluginConfig,
} from "./page-layout/PageLayoutPlugin";
export {
  PageLayout,
  PAGE_SHEET_WIDTH,
  PAGE_PANEL_WIDTH,
  type PageLayoutProps,
} from "./page-layout/PageLayout";
export {
  PagePanelToggle,
  type PagePanelToggleProps,
} from "./page-layout/PagePanelToggle";
export {
  SlotPageLayout,
  SlotPanelToggle,
  type SlotPageLayoutProps,
} from "./page-layout/SlotPageLayout";
export {
  pageLayoutPanelOpen,
  pageLayoutSheet,
  pageLayoutActivity,
  openPagePanel,
  closePagePanel,
  togglePagePanel,
} from "./page-layout/panelState";
