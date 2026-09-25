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
 * Where the gallery is: which demo is open and what is being searched for.
 *
 * A store rather than component state because the gallery is now several
 * slot components — the band, the page, the chips, the panel — that render
 * in different places and share one address. The address is the URL: `/` is
 * the gallery, `/<slug>` a demo, and the browser's back button works.
 */

import { create } from 'zustand';

export const GALLERY_SLUG = 'gallery';

export const slugToPath = (slug: string) =>
  slug === GALLERY_SLUG ? '/' : `/${slug}`;

export const pathToSlug = (pathname: string) => {
  const normalized = pathname.replace(/^\/+|\/+$/g, '');
  return normalized === '' ? GALLERY_SLUG : normalized;
};

export type GalleryState = {
  /** The open demo's slug, or `gallery` for the grid. */
  activeSlug: string;
  /** What the search box holds. */
  search: string;
  /** Open a demo, or the gallery, and put it in the address bar. */
  navigate: (slug: string) => void;
  setSearch: (search: string) => void;
  /** Follow the address bar — after the back button, say. */
  syncFromLocation: () => void;
};

export const useGalleryStore = create<GalleryState>(set => ({
  activeSlug: pathToSlug(window.location.pathname),
  search: '',
  navigate: slug => {
    const nextPath = slugToPath(slug);
    if (nextPath !== window.location.pathname) {
      window.history.pushState({}, '', nextPath);
    }
    set({ activeSlug: slug });
  },
  setSearch: search => set({ search }),
  syncFromLocation: () =>
    set({ activeSlug: pathToSlug(window.location.pathname) }),
}));
