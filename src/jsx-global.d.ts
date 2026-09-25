/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * `@primer/react` 37 types its polymorphic `as` prop against the global `JSX`
 * namespace, which `@types/react` 19 no longer declares: the only global `JSX`
 * left is the one `@github/relative-time-element` adds, so
 * `keyof JSX.IntrinsicElements` is `'relative-time'` and `as="div"` fails to
 * type-check. Restore the global namespace from React's own.
 *
 * The monorepo gets away without this because it patches `@primer/react` at
 * its root; a standalone install, which is what CI and consumers get, does not.
 */
import type { JSX as ReactJSX } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ReactJSX.IntrinsicElements {}
  }
}
