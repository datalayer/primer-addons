/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * The gallery, as the plugin that fills the page layout.
 *
 * Four slot components, one per slot the page layout opens: the search in
 * the band, the grid or the open demo on the sheet,
 * and the list of components in the panel. Registering also wires the two
 * things the address bar needs — following the back button, and `/` to
 * focus the search from anywhere — and unwires them when the plugin is
 * switched off.
 */

import { createElement } from 'react';
import { definePlugin } from '@datalayer/reactor';
import type { ReactorReactOutput } from '@datalayer/reactor/react';
import { PageLayoutSlots } from '@datalayer/primer-addons/lib/reactor';
import { GalleryBand, GALLERY_SEARCH_ID } from './GalleryBand';
import { GalleryPage } from './GalleryPage';
import { GalleryPanel } from './GalleryPanel';
import { GALLERY_SLUG, useGalleryStore } from './galleryStore';

export const GALLERY_PLUGIN_NAME = '@datalayer-examples/gallery';

export const GalleryPlugin = definePlugin<
  Record<string, never>,
  unknown,
  ReactorReactOutput
>({
  name: GALLERY_PLUGIN_NAME,
  displayName: 'Gallery',
  description: 'The addon components, on the page layout.',
  octicon: 'apps',
  emoji: '\u{1F5BC}',
  register: () => {
    const { syncFromLocation } = useGalleryStore.getState();
    const onPopstate = () => syncFromLocation();
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }
      const { activeSlug, navigate } = useGalleryStore.getState();
      if (activeSlug !== GALLERY_SLUG) {
        navigate(GALLERY_SLUG);
      }
      event.preventDefault();
      document.getElementById(GALLERY_SEARCH_ID)?.focus();
    };
    window.addEventListener('popstate', onPopstate);
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('popstate', onPopstate);
      window.removeEventListener('keydown', onKeydown);
    };
  },
  build: () => ({
    components: [
      {
        id: 'gallery-band',
        slot: PageLayoutSlots.band,
        Component: () => createElement(GalleryBand),
      },
      {
        id: 'gallery-page',
        slot: PageLayoutSlots.page,
        Component: () => createElement(GalleryPage),
      },
      {
        id: 'gallery-panel',
        slot: PageLayoutSlots.panel,
        Component: () => createElement(GalleryPanel),
      },
    ],
  }),
});

export default GalleryPlugin;
