/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@primer/react";
import { Toolbar as BareToolbar, overflowKeys } from "../Toolbar";
import type { ToolbarItem } from "../types";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

// Primer's overlay asks for media queries, which jsdom does not answer.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

/** Every item is 40px wide; the room is what `room` says. */
const ITEM_WIDTH = 40;
let room = 1000;

let host: HTMLDivElement;
let root: Root;
const restore: Array<() => void> = [];

beforeEach(() => {
  room = 1000;
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  const rect = vi
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockImplementation(function (this: HTMLElement) {
      const width = this.hasAttribute("data-toolbar-key") ? ITEM_WIDTH : 0;
      return { width, height: 32, top: 0, left: 0, right: width, bottom: 32, x: 0, y: 0, toJSON: () => ({}) } as DOMRect;
    });
  const descriptor = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "clientWidth",
  );
  Object.defineProperty(HTMLElement.prototype, "clientWidth", {
    configurable: true,
    get(this: HTMLElement) {
      return this.getAttribute("role") === "toolbar" ? room : 0;
    },
  });
  restore.push(() => rect.mockRestore());
  restore.push(() => {
    if (descriptor) {
      Object.defineProperty(HTMLElement.prototype, "clientWidth", descriptor);
    }
  });
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  restore.splice(0).forEach((undo) => undo());
});

// Primer's overlay reads the theme from its provider.
const Toolbar = (props: Parameters<typeof BareToolbar>[0]) => (
  <ThemeProvider>
    <BareToolbar {...props} />
  </ThemeProvider>
);

/** The menu button's name: Primer moves `aria-label` into its tooltip. */
const nameOf = (node: Element | null) =>
  node?.getAttribute("aria-label") ??
  document.getElementById(node?.getAttribute("aria-labelledby") ?? "")
    ?.textContent ??
  "";

const button = (key: string, extra: Partial<ToolbarItem> = {}) =>
  ({
    key,
    type: "button",
    ariaLabel: key,
    label: key,
    onClick: () => undefined,
    ...extra,
  }) as ToolbarItem;

const onLine = () =>
  Array.from(host.querySelectorAll("[data-toolbar-key]")).map((node) =>
    node.getAttribute("data-toolbar-key"),
  );

const openMenu = () => {
  const trigger = host.querySelector<HTMLButtonElement>(
    "[data-toolbar-overflow]",
  );
  expect(trigger).not.toBeNull();
  act(() => trigger!.click());
  return document.querySelector<HTMLElement>("[data-toolbar-overflow-menu]");
};

describe("overflowKeys", () => {
  const items = ["a", "b", "c", "d", "e"].map((key) => button(key));
  const width = () => 40;

  it("keeps everything when it fits", () => {
    expect(overflowKeys(items, width, 1000, 2, 32).size).toBe(0);
  });

  it("takes the tail off first, keeping room for the menu button", () => {
    // 3 items + 2 gaps + gap + trigger = 120 + 4 + 2 + 32 = 158
    expect([...overflowKeys(items, width, 160, 2, 32)].sort()).toEqual([
      "d",
      "e",
    ]);
  });

  it("never takes a pinned item, and the lowest priority leaves first", () => {
    const mixed = [
      button("a", { priority: 1 }),
      button("b"),
      button("c"),
      button("d", { priority: 5 }),
      button("e", { pinned: true }),
    ];
    const hidden = overflowKeys(mixed, width, 160, 2, 32);
    expect(hidden.has("e")).toBe(false);
    expect([...hidden].sort()).toEqual(["b", "c"]);
  });

  it("ignores items that draw nothing", () => {
    const hidden = overflowKeys(
      [button("a"), button("empty"), button("b")],
      (key) => (key === "empty" ? 0 : 40),
      90,
      2,
      32,
    );
    expect(hidden.size).toBe(0);
  });
});

describe("Toolbar overflow", () => {
  it("moves what does not fit into the menu, pinned items staying", () => {
    room = 200;
    const items = [
      button("one"),
      button("two"),
      button("three"),
      button("four"),
      button("five"),
      button("six"),
      button("close", { pinned: true }),
    ];
    act(() => root.render(<Toolbar items={items} />));
    const line = onLine();
    expect(line).toContain("close");
    expect(line).toContain("one");
    expect(line).not.toContain("six");
    const trigger = host.querySelector("[data-toolbar-overflow]");
    expect(nameOf(trigger)).toMatch(/more toolbar item/);
    const menu = openMenu();
    expect(menu?.textContent).toContain("six");
    expect(menu?.textContent).not.toContain("close");
  });

  it("runs a menu row's action: a button, and a custom item's onSelect", () => {
    room = 120;
    const save = vi.fn();
    const share = vi.fn();
    const items: ToolbarItem[] = [
      button("first"),
      button("save", { onClick: save } as Partial<ToolbarItem>),
      {
        key: "share",
        type: "custom",
        render: () => <span data-testid="share-chip">Share chip</span>,
        overflow: { label: "Share", onSelect: share },
      },
    ];
    act(() => root.render(<Toolbar items={items} />));
    expect(onLine()).toEqual(["first"]);
    let menu = openMenu();
    // The custom item is a labelled row in the menu, not its line node.
    expect(menu?.querySelector('[data-testid="share-chip"]')).toBeNull();
    const shareRow = menu?.querySelector<HTMLButtonElement>(
      'button[aria-label="Share"]',
    );
    act(() => shareRow!.click());
    expect(share).toHaveBeenCalledTimes(1);
    menu = openMenu();
    const saveRow = menu?.querySelector<HTMLButtonElement>(
      'button[aria-label="save"]',
    );
    act(() => saveRow!.click());
    expect(save).toHaveBeenCalledTimes(1);
  });

  it("keeps every item on the line with overflow off", () => {
    room = 50;
    const items = ["a", "b", "c"].map((key) => button(key));
    act(() => root.render(<Toolbar items={items} overflow={false} />));
    expect(onLine()).toEqual(["a", "b", "c"]);
    expect(host.querySelector("[data-toolbar-overflow]")).toBeNull();
  });

  it("moves the focus with the arrow keys", () => {
    const items = ["a", "b", "c"].map((key) => button(key));
    act(() => root.render(<Toolbar items={items} />));
    const buttons = host.querySelectorAll<HTMLButtonElement>("button");
    buttons[0].focus();
    act(() => {
      buttons[0].dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
      );
    });
    expect(document.activeElement).toBe(buttons[1]);
    act(() => {
      buttons[1].dispatchEvent(
        new KeyboardEvent("keydown", { key: "End", bubbles: true }),
      );
    });
    expect(document.activeElement).toBe(buttons[2]);
  });

  it("draws no strip in the inline variant", () => {
    act(() =>
      root.render(<Toolbar items={[button("a")]} variant="inline" />),
    );
    expect(
      host.querySelector('[role="toolbar"]')?.getAttribute(
        "data-toolbar-variant",
      ),
    ).toBe("inline");
  });
});

describe("overflowKeys with empty items on the line (28 November 2026)", () => {
  it("counts the gap a 0px item on the line takes, and folds what no longer fits", () => {
    const items = [
      { key: "lead", type: "custom" as const },
      { key: "chip-a", type: "custom" as const },
      { key: "chip-b", type: "custom" as const },
      { key: "toggle", type: "custom" as const },
      { key: "full", type: "custom" as const },
      { key: "chooser", type: "custom" as const, pinned: true },
    ];
    const widths: Record<string, number> = { lead: 8, "chip-a": 0, "chip-b": 0, toggle: 28, full: 28, chooser: 94 };
    const width = (key: string) => widths[key] ?? 0;
    // Without the empty chips' gaps it seems to fit 176px: 158 + 3 gaps of 4.
    expect(overflowKeys(items as never, width, 176, 4, 32).size).toBe(0);
    // With them, as the browser lays it out (178px), something is folded.
    expect(overflowKeys(items as never, width, 176, 4, 32, () => true).size).toBeGreaterThan(0);
    // A hidden 0px item takes no gap.
    expect(overflowKeys(items as never, width, 176, 4, 32, key => !key.startsWith("chip")).size).toBe(0);
  });
});
