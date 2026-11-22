// @vitest-environment jsdom
/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * A stored theme the registry no longer has (the user, 22 November 2026:
 * 'loop' became 'agent', and a page that had remembered 'loop' read an
 * undefined theme and broke) is dropped on hydration: the store's default
 * stands, a known stored theme still wins.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { createThemeStore } from '../useThemeStore';

const KEY = 'unknown-stored-theme-test';

const store = (theme: string, variants?: Record<string, unknown>) =>
  localStorage.setItem(
    KEY,
    JSON.stringify({ state: { theme, colorMode: 'dark', activeVariant: null, variants: variants ?? {} }, version: 3 }),
  );

describe('a stored theme the registry no longer has', () => {
  beforeEach(() => localStorage.clear());

  it('is dropped: the default theme stands', async () => {
    store('no-such-theme');
    const useStore = createThemeStore(KEY, { theme: 'datalayer', colorMode: 'light' });
    await useStore.persist.rehydrate();
    expect(useStore.getState().theme).toBe('datalayer');
  });

  it('is dropped from a variant too, the code default kept', async () => {
    store('agent', { signedIn: { theme: 'no-such-theme', colorMode: 'dark', version: 1 } });
    const useStore = createThemeStore(KEY, {
      theme: 'datalayer',
      variants: { signedIn: { theme: 'metal', colorMode: 'auto' } },
    });
    await useStore.persist.rehydrate();
    expect(useStore.getState().variants.signedIn.theme).toBe('metal');
  });

  it('a known stored theme still wins', async () => {
    store('agent');
    const useStore = createThemeStore(KEY, { theme: 'datalayer' });
    await useStore.persist.rehydrate();
    expect(useStore.getState().theme).toBe('agent');
  });
});

describe('a stored theme renamed here', () => {
  beforeEach(() => localStorage.clear());

  it("'loop' is read as 'agent', as the current theme and in a variant, each mode kept", async () => {
    store('loop', { signedIn: { theme: 'loop', colorMode: 'light', version: 1 } });
    const useStore = createThemeStore(KEY, {
      theme: 'datalayer',
      variants: { signedIn: { theme: 'metal', colorMode: 'auto' } },
    });
    await useStore.persist.rehydrate();
    expect(useStore.getState().theme).toBe('agent');
    expect(useStore.getState().variants.signedIn).toMatchObject({ theme: 'agent', colorMode: 'light' });
  });
});
