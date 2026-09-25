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
 * The band above the page: where the reader is, and the search.
 *
 * Docked by the page layout at the sheet's own width, so the search box and
 * the grid under it share their edges.
 */

import { Box, Button, Text, TextInput } from '@primer/react';
import { HomeIcon, SearchIcon } from '@primer/octicons-react';
import { demos } from '../components/demos';
import { GALLERY_SLUG, useGalleryStore } from './galleryStore';

/** The search box's id, so the `/` shortcut can find it from anywhere. */
export const GALLERY_SEARCH_ID = 'gallery-search';

export function GalleryBand() {
  const activeSlug = useGalleryStore(s => s.activeSlug);
  const search = useGalleryStore(s => s.search);
  const setSearch = useGalleryStore(s => s.setSearch);
  const navigate = useGalleryStore(s => s.navigate);
  const activeDemo = demos.find(demo => demo.slug === activeSlug);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 2,
        flexWrap: 'wrap',
      }}
    >
      <Button
        variant="invisible"
        leadingVisual={HomeIcon}
        onClick={() => navigate(GALLERY_SLUG)}
        aria-current={activeDemo ? undefined : 'page'}
      >
        Gallery
      </Button>
      {activeDemo ? (
        <Text sx={{ color: 'fg.muted' }}>/ {activeDemo.title}</Text>
      ) : null}
      <Box sx={{ flex: 1 }} />
      <TextInput
        id={GALLERY_SEARCH_ID}
        placeholder="Search components… (press /)"
        leadingVisual={SearchIcon}
        value={search}
        onChange={event => {
          setSearch(event.target.value);
          // Searching is a question for the grid, wherever it was asked.
          if (activeDemo) {
            navigate(GALLERY_SLUG);
          }
        }}
        sx={{ width: ['100%', '320px'] }}
        aria-label="Search gallery components"
      />
    </Box>
  );
}
