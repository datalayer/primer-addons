/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { JSX } from "react";
import { IconButton, type SxProp } from "@primer/react";
import { SidebarExpandIcon, type Icon } from "@primer/octicons-react";
import { useSignalValue } from "@datalayer/reactor/react";
import {
  openPagePanel,
  pageLayoutPanelOpen,
  pageLayoutSheet,
} from "./panelState";

export type PagePanelToggleProps = {
  /** What the panel holds, for the label: "Show the conversation". */
  panelName?: string;
  /** The button's glyph. */
  icon?: Icon;
  /** Extra styles — an `order` among a header's items, say. */
  sx?: SxProp["sx"];
};

/**
 * The header button that opens and closes the page layout's side panel.
 *
 * It shares the layout's signals, so a host that opens the panel itself —
 * `openPagePanel()` when something lands in it — sees the button follow.
 * With the panel's content on the sheet there is nothing to open, and the
 * button draws nothing.
 */
export function PagePanelToggle({
  panelName = "panel",
  icon = SidebarExpandIcon,
  sx,
}: PagePanelToggleProps): JSX.Element | null {
  const open = useSignalValue(pageLayoutPanelOpen);
  const sheet = useSignalValue(pageLayoutSheet);
  if (sheet === "panel") {
    return null;
  }
  return (
    <IconButton
      icon={icon}
      size="small"
      variant={open ? "default" : "invisible"}
      aria-label={open ? `Hide the ${panelName}` : `Show the ${panelName}`}
      aria-pressed={open}
      onClick={() => {
        if (open) {
          pageLayoutPanelOpen.value = false;
        } else {
          openPagePanel();
        }
      }}
      sx={{ color: open ? "accent.fg" : "fg.muted", ...sx }}
    />
  );
}

export default PagePanelToggle;
