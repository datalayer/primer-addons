/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
   * Print a button's name beside its icon instead of leaving it in the
   * tooltip alone — see `ToolbarButton`. Meaningless for a dropdown, which
   * already shows its own label wherever it is drawn.
   */
  showLabel?: boolean;
  /**
   * How the caller lays the items out: along a row (a toolbar line, the
   * default) or down a column (the "..." overflow menu).
   *
   * Only dividers read it. A divider is drawn across the direction of travel
   * — a vertical bar between items on a row, a horizontal rule between groups
   * in a column. Left vertical in a column it became a 20px-tall empty row
   * with a 1px line down its left edge, which is exactly what showed under
   * the last item of every group in the overflow menu.
   */
  direction?: "row" | "column";
}

/**
 * Sort items by order, then render each one according to its type.
 */
export function ToolbarRenderer({
  items,
  disabled,
  size = "medium",
  showLabel = false,
  direction = "row",
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
                  showLabel={showLabel}
                />
              </Fragment>
            );

          case "dropdown":
            return (
              <Fragment key={item.key}>
                <ToolbarDropdown
                  item={{ ...item, disabled: itemDisabled }}
                  size={size}
                />
              </Fragment>
            );

          case "divider":
            return (
              <Fragment key={item.key}>
                <ToolbarDivider
                  orientation={
                    direction === "column" ? "horizontal" : "vertical"
                  }
                />
              </Fragment>
            );

          case "spacer":
            return (
              <Box key={item.key} sx={{ flex: "1 1 auto", minWidth: 8 }} />
            );

          case "custom":
            return <Fragment key={item.key}>{item.render()}</Fragment>;

          default:
            return null;
        }
      })}
    </>
  );
}

export default ToolbarRenderer;
