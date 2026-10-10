/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useEffect, useState } from 'react';

/**
 * Whether the reader has asked for less movement.
 *
 * A hover card grows, and growing is the part somebody with vestibular
 * trouble asked not to see. Everything else about it — that it appears,
 * what it says — is unchanged; only the animation is dropped, and an exit
 * that waited for an animation no longer waits.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) {
      return undefined;
    }
    setReduced(query.matches);
    const listen = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener?.('change', listen);
    return () => query.removeEventListener?.('change', listen);
  }, []);
  return reduced;
}

export default usePrefersReducedMotion;
