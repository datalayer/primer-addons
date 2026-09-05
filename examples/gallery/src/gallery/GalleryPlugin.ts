/**
 * The gallery, as the plugin that fills the page layout.
 *
 * Four slot components, one per slot the page layout opens: the search in
 * the band, the grid or the open demo on the sheet, quick links as chips,
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
import { GalleryChips } from './GalleryChips';
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
        id: 'gallery-chips',
        slot: PageLayoutSlots.chips,
        Component: () => createElement(GalleryChips),
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
