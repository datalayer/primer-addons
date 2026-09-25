/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * `@datalayer/primer-appearance` — the appearance menu, as a reactor plugin.
 *
 * The control the public Datalayer header wears at its right edge: a small
 * square showing the color mode which, hovered, opens the appearance overlay
 * — light, dark and auto as a segmented control; one circle per theme; the
 * chosen theme's name and description; and a "Show preview" button that
 * unfolds a live card of it. That is {@link AppearanceMenuWithStore}, and
 * every reactor host that wanted it wrote the same slot component around it.
 * This plugin is that component, written once: a host lists the plugin, names
 * a slot if the default is not `header`, and the menu is there.
 *
 * It depends on {@link ThemePlugin}: the menu changes the color mode, and the
 * theme plugin is what keeps Primer's portals — a palette, a menu — in the
 * mode chosen. Listing this plugin brings that one along.
 *
 * @module reactor/AppearancePlugin
 */

import { createElement } from "react";
import { definePlugin } from "@datalayer/reactor";
import type { ReactorReactOutput } from "@datalayer/reactor/react";
import { AppearanceMenuWithStore } from "../components/appearance/AppearanceMenuWithStore";
import { ThemePlugin } from "./ThemePlugin";

export const APPEARANCE_PLUGIN_NAME = "@datalayer/primer-appearance";

/** The id of the slot component, for a host that looks it up. */
export const APPEARANCE_MENU_COMPONENT_ID = "appearance-menu";

export type AppearancePluginConfig = {
  /** The slot the menu renders into. */
  slot: string;
  /**
   * Its place among that slot's components: lower first. High by default, so
   * the menu sits at the trailing edge of a header, after a view selector.
   */
  order: number;
  /** The trigger's size in pixels. */
  size: number;
  /** The trigger's shape. */
  shape: "square" | "circle";
  /** Which way the overlay opens from the trigger. */
  placement: "bottom-start" | "bottom-end";
  /**
   * Whether the overlay carries the chosen theme's description and its
   * preview, or only the circles.
   */
  showThemePreviews: boolean;
  /**
   * Whether choosing a theme also switches to its default color mode. Off,
   * as in the public header: a person who chose dark keeps dark.
   */
  applyThemeColorMode: boolean;
};

export const AppearancePlugin = definePlugin<
  AppearancePluginConfig,
  unknown,
  ReactorReactOutput
>({
  name: APPEARANCE_PLUGIN_NAME,
  displayName: "Appearance",
  description: "The color mode and theme chooser, in the header.",
  octicon: "paintbrush",
  emoji: "\u{1F3A8}",
  dependencies: [ThemePlugin],
  config: {
    slot: "header",
    order: 100,
    size: 26,
    shape: "square",
    placement: "bottom-end",
    showThemePreviews: true,
    applyThemeColorMode: false,
  },
  build: ({ config }) => ({
    components: [
      {
        id: APPEARANCE_MENU_COMPONENT_ID,
        slot: config.slot,
        order: config.order,
        Component: () =>
          createElement(AppearanceMenuWithStore, {
            size: config.size,
            shape: config.shape,
            hoverOverlayPlacement: config.placement,
            showThemePreviews: config.showThemePreviews,
            applyThemeColorMode: config.applyThemeColorMode,
          }),
      },
    ],
  }),
});

export default AppearancePlugin;
