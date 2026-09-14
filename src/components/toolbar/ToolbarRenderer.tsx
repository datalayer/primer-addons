/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * ToolbarRenderer - Renders an array of ToolbarItems.
 *
 * Shared logic between Toolbar and FloatingToolbar.
 *
 * @module components/toolbar/ToolbarRenderer
 */

import { Fragment } from "react";
import { Box } from "../box/Box";
import type { ToolbarItem } from "./types";
import { ToolbarButton } from "./ToolbarButton";
import { ToolbarDropdown } from "./ToolbarDropdown";
import { ToolbarDivider } from "./ToolbarDivider";

export interface ToolbarRendererProps {
  items: ToolbarItem[];
  disabled?: boolean;
  size?: "small" | "medium";
  /**
   * Passed straight through to every dropdown item — see
   * `ToolbarDropdownProps.iconOnly` — and to every custom item's own
   * `render`, since that one is a host's component the renderer cannot
   * adapt on its behalf. `Toolbar` sets this for the items it renders
   * inside its "..." overflow menu; the inline row leaves it off.
   */
  iconOnly?: boolean;
}

/**
 * Sort items by order, then render each one according to its type.
 */
export function ToolbarRenderer({
  items,
  disabled,
  size = "medium",
  iconOnly,
}: ToolbarRendererProps) {
  const sorted = [...items]
    .filter((item) => !item.hidden)
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100));

  return (
    <>
      {sorted.map((item) => {
        const itemDisabled = disabled || item.disabled;

        switch (item.type) {
          case "button":
            return (
              <Fragment key={item.key}>
                <ToolbarButton
                  item={{ ...item, disabled: itemDisabled }}
                  size={size}
                />
              </Fragment>
            );

          case "dropdown":
            return (
              <Fragment key={item.key}>
                <ToolbarDropdown
                  item={{ ...item, disabled: itemDisabled }}
                  size={size}
                  iconOnly={iconOnly}
                />
              </Fragment>
            );

          case "divider":
            return (
              <Fragment key={item.key}>
                <ToolbarDivider />
              </Fragment>
            );

          case "spacer":
            return (
              <Box key={item.key} sx={{ flex: "1 1 auto", minWidth: 8 }} />
            );

          case "custom":
            return (
              <Fragment key={item.key}>{item.render({ iconOnly })}</Fragment>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

export default ToolbarRenderer;
