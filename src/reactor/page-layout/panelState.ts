/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The page layout's shared state: whether the side panel is open, what the
 * sheet holds, and what is happening in the page.
 *
 * Signals, in a module of their own so the layout, the header toggle, the
 * panel's own contents and a host can all read and write them without any
 * of them importing the others.
 *
 * @module reactor/page-layout/panelState
 */

import { signal } from "@datalayer/reactor";

/**
 * Whether the side panel is open.
 *
 * Closed to start: the page is what a reader came for, and a panel with
 * nothing in it yet is a column of nothing.
 */
export const pageLayoutPanelOpen = signal(false);

/**
 * What lies on the sheet: the page, or — when there is no page to show — the
 * panel's own content.
 *
 * Written by the layout as it renders, read by the parts that only make
 * sense beside a page: the toggle would open a second copy of what is
 * already on the sheet, and anything hung under a band to echo the panel
 * would repeat it.
 */
export const pageLayoutSheet = signal<"page" | "panel">("page");

/**
 * What is happening in the page, in a short line — "Analyst is adding a
 * cell…" — or nothing. The layout pins it to the top of the sheet while it
 * is set. A host or another plugin writes it; a layout given an `activity`
 * prop shows that instead.
 */
export const pageLayoutActivity = signal<string | undefined>(undefined);

/** Open the panel — for a host that wants its content seen the moment it lands. */
export function openPagePanel(): void {
  pageLayoutPanelOpen.value = true;
}

export function closePagePanel(): void {
  pageLayoutPanelOpen.value = false;
}

export function togglePagePanel(): void {
  pageLayoutPanelOpen.value = !pageLayoutPanelOpen.value;
}
