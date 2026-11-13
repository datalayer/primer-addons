/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * The appearance panel never runs past the window: held to the room under
 * its top and scrolling inside, so what Show preview adds stays reachable.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(join(__dirname, '..', 'ColorModeCircle.tsx'), 'utf8');

describe('the appearance panel scrolls inside the window', () => {
  it('is held to the room under its top and scrolls', () => {
    expect(source).toContain('ref={overlayRef}');
    expect(source).toContain("overflowY: 'auto'");
    expect(source).toContain('window.innerHeight - top - OVERLAY_MARGIN');
    expect(source).toContain("window.addEventListener('resize', measure)");
  });
});
