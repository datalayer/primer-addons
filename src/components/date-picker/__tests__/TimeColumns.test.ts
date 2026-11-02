/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { describe, expect, it } from "vitest";
import { parseTime } from "../TimeColumns";

describe("parseTime", () => {
  it("accepts valid freely typed 24-hour times", () => {
    expect(parseTime("9:05")).toEqual({ hour: 9, minute: 5 });
    expect(parseTime(" 23:59 ")).toEqual({ hour: 23, minute: 59 });
  });

  it("rejects invalid or incomplete times", () => {
    expect(parseTime("24:00")).toBeNull();
    expect(parseTime("12:60")).toBeNull();
    expect(parseTime("noon")).toBeNull();
    expect(parseTime("9:5")).toBeNull();
  });
});
