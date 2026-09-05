/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The page layout fed from slots, for a host whose parts arrive as plugins.
 *
 * The layout component takes elements; a Reactor host has slot components.
 * This reads four slots — the page, the band, the panel, the chips — and
 * hands each to the layout as a `ReactorSlot`, or as nothing when no plugin
 * filled it, so an empty band draws no band and an empty panel offers no
 * toggle. Whatever the host passed to the layout's own slot goes on to every
 * sub-slot, the way a slot's props always reach its components.
 *
 * @module reactor/page-layout/SlotPageLayout
 */

import type { JSX } from "react";
import { ReactorSlot, useOptionalSlotComponents } from "@datalayer/reactor/react";
import type { Icon } from "@primer/octicons-react";
import { PageLayout, type PageLayoutProps } from "./PageLayout";
import { PagePanelToggle } from "./PagePanelToggle";

export type SlotPageLayoutProps = Pick<
  PageLayoutProps,
  "bandMode" | "sheetWidth" | "panelWidth"
> & {
  pageSlot: string;
  bandSlot: string;
  panelSlot: string;
  chipsSlot: string;
  /** What the host handed the layout's slot; passed on to every sub-slot. */
  context?: Record<string, unknown>;
};

export function SlotPageLayout({
  pageSlot,
  bandSlot,
  panelSlot,
  chipsSlot,
  context,
  ...layout
}: SlotPageLayoutProps): JSX.Element {
  const hasPage = useOptionalSlotComponents(pageSlot).length > 0;
  const hasBand = useOptionalSlotComponents(bandSlot).length > 0;
  const hasPanel = useOptionalSlotComponents(panelSlot).length > 0;
  const hasChips = useOptionalSlotComponents(chipsSlot).length > 0;
  return (
    <PageLayout
      {...layout}
      page={hasPage ? <ReactorSlot slot={pageSlot} props={context} /> : null}
      hasPage={hasPage}
      band={hasBand ? <ReactorSlot slot={bandSlot} props={context} /> : null}
      panel={hasPanel ? <ReactorSlot slot={panelSlot} props={context} /> : null}
      chips={hasChips ? <ReactorSlot slot={chipsSlot} props={context} /> : null}
    />
  );
}

/**
 * The panel toggle, drawn only while some plugin fills the panel slot.
 *
 * Its place in the header is the slot component's `order`, which the slot
 * applies; nothing here sets a CSS order, which would reshuffle the row.
 */
export function SlotPanelToggle({
  panelSlot,
  panelName,
  icon,
}: {
  panelSlot: string;
  panelName?: string;
  icon?: Icon;
}): JSX.Element | null {
  const hasPanel = useOptionalSlotComponents(panelSlot).length > 0;
  if (!hasPanel) {
    return null;
  }
  return <PagePanelToggle panelName={panelName} icon={icon} />;
}

export default SlotPageLayout;
