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
