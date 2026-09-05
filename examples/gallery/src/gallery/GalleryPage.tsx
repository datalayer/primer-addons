/**
 * What lies on the sheet: the grid of components, or the open demo.
 */

import { useMemo } from 'react';
import { Box, Button, Heading, Text } from '@primer/react';
import { Card } from '@datalayer/primer-addons';
import { demos } from '../components/demos';
import { GALLERY_SLUG, useGalleryStore } from './galleryStore';

export function GalleryPage() {
  const activeSlug = useGalleryStore(s => s.activeSlug);
  const search = useGalleryStore(s => s.search);
  const navigate = useGalleryStore(s => s.navigate);

  const filteredDemos = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) {
      return demos;
    }
    return demos.filter(
      demo =>
        demo.title.toLowerCase().includes(needle) ||
        demo.description.toLowerCase().includes(needle),
    );
  }, [search]);

  const activeDemo = demos.find(demo => demo.slug === activeSlug);

  if (activeSlug === GALLERY_SLUG || !activeDemo) {
    return (
      <Box sx={{ display: 'grid', gap: 3, alignContent: 'start' }}>
        <Box>
          <Heading as="h2" sx={{ m: 0, mb: 1, fontSize: 3 }}>
            Gallery
          </Heading>
          <Text as="p" sx={{ m: 0, color: 'fg.muted' }}>
            Browse all components. Search above, open any component page, or
            show the list from the header.
          </Text>
        </Box>
        <div className="gallery-grid">
          {filteredDemos.length === 0 ? (
            <Card border rounded="medium" shadow="small" className="gallery-card">
              <Card.Header
                title="No components found"
                description="Try a different search term, for example: overlay, toolbar, or card."
              />
            </Card>
          ) : (
            filteredDemos.map(demo => (
              <Card
                key={demo.slug}
                border
                rounded="medium"
                shadow="small"
                className="gallery-card"
              >
                <Card.Header title={demo.title} description={demo.description} />
                <Card.Actions>
                  <Button onClick={() => navigate(demo.slug)}>Open</Button>
                </Card.Actions>
              </Card>
            ))
          )}
        </div>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'grid', gap: 3, alignContent: 'start' }}>
      <Box>
        <Heading as="h2" sx={{ m: 0, mb: 1, fontSize: 3 }}>
          {activeDemo.title}
        </Heading>
        <Text as="p" sx={{ m: 0, color: 'fg.muted' }}>
          {activeDemo.description}
        </Text>
      </Box>
      <Box
        sx={{
          p: 2,
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 2,
        }}
      >
        {activeDemo.render()}
      </Box>
    </Box>
  );
}
