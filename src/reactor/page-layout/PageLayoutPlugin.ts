/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * `@datalayer/primer-page-layout` — the page layout, as a reactor plugin.
 *
 * A host lists this plugin and renders one slot, `main` by default; the
 * plugin fills it with {@link PageLayout} and opens four slots of its own for
 * the other plugins to fill: `page` for what lies on the sheet, `page-band`
 * for the band docked above it (a composer, a toolbar), `page-panel` for the
 * side panel, `page-chips` for the chips under the band. A button that opens
 * and closes the panel goes in the header — only while something fills the
 * panel slot, so a host with no panel gets no dead button.
 *
 * This is the Loop's page layout with the Loop taken out: there the chat
 * view hands the layout its parts directly through a contribution point of
 * its own, and the Loop keeps that adapter. Here the parts are slots, which
 * is what a plain Reactor host has.
 *
 * @module reactor/page-layout/PageLayoutPlugin
 */

import { createElement } from "react";
import { definePlugin } from "@datalayer/reactor";
import type { ReactorReactOutput } from "@datalayer/reactor/react";
import type { Icon } from "@primer/octicons-react";
import type { PageSize } from "./PageLayout";
import { SlotPageLayout, SlotPanelToggle } from "./SlotPageLayout";
import { pageLayoutPanelOpen } from "./panelState";

export const PAGE_LAYOUT_PLUGIN_NAME = "@datalayer/primer-page-layout";

/** The slots the plugin opens, by their default names. */
export const PageLayoutSlots = {
  page: "page",
  band: "page-band",
  panel: "page-panel",
  chips: "page-chips",
} as const;

export type PageLayoutPluginConfig = {
  /** The slot the layout renders into. */
  slot: string;
  /** Its place among that slot's components; lower first. */
  order: number;
  /** The slot the panel toggle renders into. Empty for no toggle. */
  headerSlot: string;
  /**
   * The toggle's place among the header's components. Fifty by default:
   * after a view selector, before an appearance menu at a hundred.
   */
  toggleOrder: number;
  /** What the toggle's label calls the panel: "Show the conversation". */
  panelName: string;
  /** The toggle's glyph; the sidebar octicon by default. */
  toggleIcon?: Icon;
  /** The slot for what lies on the sheet. */
  pageSlot: string;
  /** The slot for the band above the page. */
  bandSlot: string;
  /** The slot for the side panel. */
  panelSlot: string;
  /** The slot for the chips under the band. */
  chipsSlot: string;
  /**
   * Whether the band is docked at the sheet's width, floats over the canvas,
   * or stands in the side panel under its content.
   */
  band: "docked" | "floating" | "panel";
  /** Where the panel stands: beside the page, over its edge, or in its corner. */
  panel: "docked" | "overlay" | "popup";
  /** Which side it stands on. `right` by default; `left` for a nav sidebar. */
  panelSide: "left" | "right";
  /** Whether the panel is open when the page first draws. */
  panelOpen: boolean;
  /** The sheet's width, in pixels. */
  sheetWidth?: number;
  /**
   * The sheet's size: free (the default) at `sheetWidth`, or a paper —
   * `{ format: "letter" }`, `{ format: "a4" }` — with a free `width` or
   * `height` over it.
   */
  pageSize?: PageSize;
  /** The open panel's width, in pixels. */
  panelWidth?: number;
};

export const PageLayoutPlugin = definePlugin<
  PageLayoutPluginConfig,
  unknown,
  ReactorReactOutput
>({
  name: PAGE_LAYOUT_PLUGIN_NAME,
  displayName: "Page layout",
  description:
    "The page on a centred sheet, a band docked above it at the same width or floating over it, and a side panel that opens from the header.",
  octicon: "file",
  emoji: "\u{1F4C4}",
  config: {
    slot: "main",
    order: 0,
    headerSlot: "header",
    toggleOrder: 50,
    panelName: "panel",
    toggleIcon: undefined,
    pageSlot: PageLayoutSlots.page,
    bandSlot: PageLayoutSlots.band,
    panelSlot: PageLayoutSlots.panel,
    chipsSlot: PageLayoutSlots.chips,
    band: "docked",
    panel: "docked",
    panelSide: "right",
    panelOpen: false,
    sheetWidth: undefined,
    pageSize: undefined,
    panelWidth: undefined,
  },
  build: ({ config }) => {
    // A host whose panel is a navigation sidebar wants it open on arrival,
    // not behind the header's toggle. Set once, at build: after that the
    // signal is the reader's.
    if (config.panelOpen) {
      pageLayoutPanelOpen.value = true;
    }
    return {
      components: [
        {
          id: "page-layout",
          slot: config.slot,
          order: config.order,
          Component: (context: Record<string, unknown>) =>
            createElement(SlotPageLayout, {
              pageSlot: config.pageSlot,
              bandSlot: config.bandSlot,
              panelSlot: config.panelSlot,
              chipsSlot: config.chipsSlot,
              bandMode: config.band,
              panelMode: config.panel,
              panelSide: config.panelSide,
              sheetWidth: config.sheetWidth,
              pageSize: config.pageSize,
              panelWidth: config.panelWidth,
              context,
            }),
        },
        ...(config.headerSlot
          ? [
              {
                id: "page-layout-panel-toggle",
                slot: config.headerSlot,
                order: config.toggleOrder,
                Component: () =>
                  createElement(SlotPanelToggle, {
                    panelSlot: config.panelSlot,
                    panelName: config.panelName,
                    icon: config.toggleIcon,
                  }),
              },
            ]
          : []),
      ],
    };
  },
});

export default PageLayoutPlugin;
