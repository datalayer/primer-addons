/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * `CloseableFlash` renders without a React warning: its layout goes through
 * `sx`, so no styled-system prop (`justifyContent`, `alignItems`) reaches a
 * DOM element; and `dismissible={false}` draws it without the close button.
 */

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CloseableFlash } from "../CloseableFlash";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let host: HTMLElement | undefined;

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  root = undefined;
  host = undefined;
  vi.restoreAllMocks();
});

function render(node: React.ReactNode): HTMLElement {
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root!.render(node));
  return host;
}

describe("CloseableFlash", () => {
  it("logs no React warning, dismissible or not", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <>
        <CloseableFlash variant="warning">Closeable.</CloseableFlash>
        <CloseableFlash variant="warning" dismissible={false}>
          Not closeable.
        </CloseableFlash>
      </>,
    );
    expect(error.mock.calls.map((c) => String(c[0]))).toEqual([]);
  });

  it("draws the close button only when dismissible, and closes on it", () => {
    const el = render(
      <>
        <CloseableFlash variant="warning">Closeable.</CloseableFlash>
        <CloseableFlash variant="warning" dismissible={false}>
          Not closeable.
        </CloseableFlash>
      </>,
    );
    expect(el.querySelectorAll('button[aria-label="Close"]')).toHaveLength(1);
    act(() =>
      el
        .querySelector<HTMLButtonElement>('button[aria-label="Close"]')!
        .click(),
    );
    expect(el.textContent).toBe("Not closeable.");
  });
});
