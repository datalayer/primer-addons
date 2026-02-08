/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { registerPortalRoot } from '@primer/react';

import '@primer/react-brand/lib/css/main.css';

const PRIMER_PORTAL_ROOT_ID = '__primerPortalRoot__';

type Colormode = 'light' | 'dark' | 'auto';

/**
 * Resolve 'auto' colormode to the actual OS preference.
 */
const resolveColormode = (colormode: Colormode): 'light' | 'dark' => {
  if (colormode === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return colormode;
};

/**
 * Ensure we define a root for Primer portal root.
 *
 *  @see https://github.com/primer/react/blob/main/packages/react/src/Portal/Portal.tsx#L23
 *  @see https://github.com/primer/react/blob/030fe020b48b7f12c2994c6614e5d4191fe764ee/src/Portal/Portal.tsx#L33
 */
export const setupPrimerPortals = (colormode: Colormode = 'light') => {
  const resolved = resolveColormode(colormode);
  const body = document.body;
  body.dataset['portalRoot'] = 'true';
  body.dataset['colorMode'] = resolved;
  body.dataset['lightTheme'] = 'light';
  body.dataset['darkTheme'] = 'dark';
  body.id = PRIMER_PORTAL_ROOT_ID;
  registerPortalRoot(body);
};

export default setupPrimerPortals;
