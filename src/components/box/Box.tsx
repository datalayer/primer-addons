/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * `Box`: Primer's, re-exported.
 *
 * This used to be a `styled.div` of our own, built on this package's own
 * styled-components. That copy is v5 while `@primer/react` runs on v6, so
 * wherever a bundler did not dedupe the two — webpack in the landing, Rsbuild
 * in the decks app — our Box rendered under a runtime with no Primer theme:
 * `sx` was never resolved and landed on the DOM as `sx="[object Object]"`,
 * and a card that asked for `canvas.subtle` came out white on a dark page.
 * agent-runtimes' Vite config carried a shim aliasing this module to Primer's
 * Box for exactly that reason; making the module *be* that is the fix for
 * every consumer at once. The system props (`p`, `bg`, `display`, …) and `sx`
 * are the same API on Primer's Box.
 */

import type { ComponentProps } from 'react';
import { Box } from '@primer/react';

export { Box };

export type BoxProps = ComponentProps<typeof Box>;

export default Box;
