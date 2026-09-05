/**
 * Quick links under the band: a few demos worth opening first.
 */

import { Box, Button } from '@primer/react';
import { useGalleryStore } from './galleryStore';

const FEATURED = [
  'appearance-menu',
  'card',
  'toolbar',
  'sliding-panel',
  'color-palette',
];

export function GalleryChips() {
  const activeSlug = useGalleryStore(s => s.activeSlug);
  const navigate = useGalleryStore(s => s.navigate);
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {FEATURED.map(slug => (
        <Button
          key={slug}
          size="small"
          variant={activeSlug === slug ? 'primary' : 'default'}
          onClick={() => navigate(slug)}
        >
          {slug.replace(/-/g, ' ')}
        </Button>
      ))}
    </Box>
  );
}
