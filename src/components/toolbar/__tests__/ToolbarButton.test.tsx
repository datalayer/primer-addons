/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ToolbarButton } from "../ToolbarButton";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let host: HTMLDivElement;
let root: Root;

beforeEach(() => {
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

describe("ToolbarButton", () => {
  it("takes its corner from the active theme", () => {
    act(() =>
      root.render(
        <ToolbarButton
          item={{
            key: "bold",
            type: "button",
            ariaLabel: "Bold",
            label: "B",
            onClick: () => undefined,
          }}
        />,
      ),
    );

    const button = host.querySelector("button") as HTMLButtonElement;
    expect(button.style.borderRadius).toBe("var(--theme-radius-control)");
  });
});
