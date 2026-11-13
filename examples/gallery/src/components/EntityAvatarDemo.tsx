/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * EntityAvatar in each flavour, under the selected theme: an image, an emoji,
 * an icon, initials; its sizes; a circle for a person and the theme's corner
 * for the rest (rounder in `loop`); its grounds and an entity's own colour.
 */

import type { ReactNode } from 'react';
import { CopilotIcon } from '@primer/octicons-react';
import { Box, EntityAvatar, type EntityAvatarTone } from '@datalayer/primer-addons';

const Row = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box as="section" aria-label={title} display="grid" gap={2}>
    <Box as="h3" m={0} fontSize={2} fontWeight="semibold">
      {title}
    </Box>
    <Box display="flex" flexWrap="wrap" alignItems="center" gap={3} p={3} border="1px solid" borderColor="border.default" borderRadius="card">
      {children}
    </Box>
  </Box>
);

const IMAGE = 'https://avatars.githubusercontent.com/u/583231?v=4';
const TONES: EntityAvatarTone[] = ['accent', 'success', 'attention', 'severe', 'danger', 'done', 'sponsors', 'neutral'];

export function EntityAvatarDemo() {
  return (
    <Box display="grid" gap={4}>
      <Row title="Image, emoji, icon, initials">
        <EntityAvatar src={IMAGE} name="The Octocat" size={48} />
        <EntityAvatar name="Compactor" shape="rounded" size={48}>
          <Box as="span" fontSize="26px">🗜️</Box>
        </EntityAvatar>
        <EntityAvatar name="Copilot" shape="rounded" size={48}>
          <CopilotIcon size={24} />
        </EntityAvatar>
        <EntityAvatar name="Eric Charles" size={48} />
        <EntityAvatar name="Data Analysis" shape="rounded" size={48} />
      </Row>
      <Row title="Sizes">
        {[16, 20, 24, 32, 40, 48, 72].map(size => (
          <EntityAvatar key={size} name="Eric Charles" size={size} />
        ))}
        {[16, 20, 24, 32, 40, 48, 72].map(size => (
          <EntityAvatar key={`r${size}`} name="Space" shape="rounded" size={size} />
        ))}
      </Row>
      <Row title="Shapes: a circle for a person, the theme's corner for the rest">
        <EntityAvatar name="A Person" size={56} />
        <EntityAvatar name="An Agent" shape="rounded" size={56} />
      </Row>
      <Row title="Tones, on their wash">
        {TONES.map(tone => (
          <EntityAvatar key={tone} name={tone} tone={tone} shape="rounded" size={40} />
        ))}
      </Row>
      <Row title="Tones, solid">
        {TONES.map(tone => (
          <EntityAvatar key={tone} name={tone} tone={tone} ground="emphasis" shape="rounded" size={40} />
        ))}
      </Row>
      <Row title="The page's ground, a ring, an entity's own colour">
        <EntityAvatar name="Canvas" ground="canvas" size={40} />
        <EntityAvatar name="Ring" ring size={40} />
        <EntityAvatar name="Own Colour" color="var(--bgColor-done-emphasis)" shape="rounded" size={40} />
      </Row>
    </Box>
  );
}
