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
 * The sidebar: every component, as a Primer `NavList`.
 *
 * On the left and open on arrival, so moving from one component to the next
 * is one click rather than a trip back to the grid. "Gallery" heads the list
 * and shows the cards; the rest are the demos, alphabetically. The items are
 * real links to the demos' addresses, so a middle click opens one in a tab
 * while a plain click navigates in place. The header's toggle still closes
 * the whole sidebar.
 */

import { useMemo, type MouseEvent } from 'react';
import { Box, NavList } from '@primer/react';
import { demos } from '../components/demos';
import { GALLERY_SLUG, slugToPath, useGalleryStore } from './galleryStore';

export function GalleryPanel() {
  const activeSlug = useGalleryStore(s => s.activeSlug);
  const navigate = useGalleryStore(s => s.navigate);
  const navDemos = useMemo(
    () => [...demos].sort((a, b) => a.title.localeCompare(b.title)),
    [],
  );
  const go = (slug: string) => (event: MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigate(slug);
  };
  return (
    <Box sx={{ overflowY: 'auto', py: 2 }}>
      <NavList aria-label="Primer addon components">
        <NavList.Item
          href={slugToPath(GALLERY_SLUG)}
          onClick={go(GALLERY_SLUG)}
          aria-current={activeSlug === GALLERY_SLUG ? 'page' : undefined}
        >
          Gallery
        </NavList.Item>
        <NavList.Divider />
        {navDemos.map(demo => (
          <NavList.Item
            key={demo.slug}
            href={slugToPath(demo.slug)}
            onClick={go(demo.slug)}
            aria-current={activeSlug === demo.slug ? 'page' : undefined}
          >
            {demo.title}
          </NavList.Item>
        ))}
      </NavList>
    </Box>
  );
}
