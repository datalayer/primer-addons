/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

// @vitest-environment jsdom

/**
 * The portal root gets the theme's variables, colours and type, never the
 * layout of a provider's own box: `height: 100%` on that fixed, painted layer
 * covered the whole page (a VS Code webview's chat drew nothing visible).
 */

import { afterEach, describe, expect, it } from 'vitest';
import {
  PRIMER_PORTAL_ROOT_ID,
  syncPortalThemeStyles,
} from '../../utils/Portals';

afterEach(() => {
  document.getElementById(PRIMER_PORTAL_ROOT_ID)?.remove();
  document.body.removeAttribute('style');
});

describe('syncPortalThemeStyles', () => {
  it('carries variables, colour and type to the body and the portal root, no layout', () => {
    const portal = document.createElement('div');
    portal.id = PRIMER_PORTAL_ROOT_ID;
    document.body.appendChild(portal);
    syncPortalThemeStyles({
      '--bgColor-default': '#1F1F1F',
      color: 'rgb(204, 204, 204)',
      backgroundColor: 'rgb(31, 31, 31)',
      fontFamily: 'system-ui',
      height: '100%',
      display: 'contents',
      transition: 'color 0.25s',
    } as React.CSSProperties);
    for (const target of [document.body, portal]) {
      expect(target.style.getPropertyValue('--bgColor-default')).toBe('#1F1F1F');
      expect(target.style.color).toBe('rgb(204, 204, 204)');
      expect(target.style.backgroundColor).toBe('rgb(31, 31, 31)');
      expect(target.style.fontFamily).toBe('system-ui');
      expect(target.style.height).toBe('');
      expect(target.style.display).toBe('');
      expect(target.style.transition).toBe('');
    }
  });
});
