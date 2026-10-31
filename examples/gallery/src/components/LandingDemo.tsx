/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { CSSProperties, ReactNode } from 'react';
import { Button, Heading, Label, Text } from '@primer/react';
import {
  ArrowRightIcon,
  BeakerIcon,
  CommentDiscussionIcon,
  DatabaseIcon,
  GraphIcon,
  PeopleIcon,
  PlayIcon,
  ShieldCheckIcon,
  WorkflowIcon,
} from '@primer/octicons-react';
import { Box, Card, type CardSurface } from '@datalayer/primer-addons';

/*
 * A landing page in the theme, to judge a theme by something other than a
 * list of components: a hero with the product in it, surfaces, numbers, a
 * call to action.
 */

const mono: CSSProperties = { fontFamily: 'var(--fontStack-monospace)' };
const title = (size: number): CSSProperties => ({ fontSize: size, lineHeight: 1.12, letterSpacing: '-0.03em' });

const NAV = [
  { group: 'Analyze', items: [{ icon: GraphIcon, name: 'Insights' }, { icon: CommentDiscussionIcon, name: 'Sessions', on: true }] },
  { group: 'Build', items: [{ icon: WorkflowIcon, name: 'Scenes' }, { icon: BeakerIcon, name: 'Evaluations' }, { icon: DatabaseIcon, name: 'Contents' }] },
];

const TOPICS = [
  { name: 'Team orchestration', runs: '5,560', change: '+19%' },
  { name: 'Reproducible evals', runs: '8,728', change: '+11%' },
  { name: 'Durable sessions', runs: '6,579', change: '+22%' },
  { name: 'Open protocols', runs: '2,255', change: '+12%' },
];

function Panel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <Box p={3} border="1px solid" borderColor="border.default" borderRadius="var(--theme-radius-card, 12px)" bg="canvas.default" style={style}>
      {children}
    </Box>
  );
}

/** The product, in the hero: a small window of what it does. */
function ProductWindow() {
  return (
    <Box
      display="grid"
      gridTemplateColumns={['1fr', '1fr', '190px minmax(0, 1fr)']}
      gap={3}
      p={3}
      border="1px solid"
      borderColor="border.default"
      borderRadius="var(--theme-radius-frame, 16px)"
      bg="canvas.subtle"
    >
      <Box display={['none', 'none', 'block']} px={2}>
        {NAV.map(section => (
          <Box key={section.group} mb={3}>
            <Text as="p" sx={{ fontSize: 0, color: 'fg.muted', m: 0, mb: 2 }}>{section.group}</Text>
            {section.items.map(item => (
              <Box
                key={item.name}
                display="flex"
                alignItems="center"
                gap={2}
                px={2}
                py={1}
                mb={1}
                borderRadius={2}
                bg={'on' in item ? 'canvas.default' : undefined}
                color={'on' in item ? 'fg.default' : 'fg.muted'}
              >
                <item.icon size={14} />
                <Text sx={{ fontSize: 1 }}>{item.name}</Text>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Box display="grid" gap={3} minWidth={0}>
        <Panel>
          <Text sx={{ fontSize: 1 }}>What changed in completion rates this week?</Text>
        </Panel>
        <Box display="grid" gridTemplateColumns={['1fr', '1fr', 'minmax(0, 1fr) minmax(0, 1fr)']} gap={3}>
          <Panel>
            <Text as="p" sx={{ fontSize: 0, color: 'fg.muted', m: 0 }}>Tasks completed</Text>
            <Box display="flex" alignItems="baseline" gap={2} mt={1}>
              <span style={{ ...mono, fontSize: 30, letterSpacing: '-0.02em' }}>88,412</span>
              <Text sx={{ ...mono, fontSize: 0, color: 'success.fg' }}>+138%</Text>
            </Box>
            <svg viewBox="0 0 320 120" width="100%" height="120" role="img" aria-label="Tasks completed, rising over the week">
              <defs>
                <linearGradient id="landing-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="var(--fgColor-success)" stopOpacity="0.22" />
                  <stop offset="1" stopColor="var(--fgColor-success)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 104 L54 86 L108 76 L162 38 L216 30 L270 8 L320 7 L320 120 L0 120 Z" fill="url(#landing-area)" />
              <path d="M0 104 L54 86 L108 76 L162 38 L216 30 L270 8 L320 7" fill="none" stroke="var(--fgColor-success)" strokeWidth="1.5" />
            </svg>
          </Panel>
          <Panel>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Text sx={{ fontSize: 0, color: 'fg.muted' }}>Top topics</Text>
              <Text sx={{ fontSize: 0, color: 'fg.muted' }}>Last 24h</Text>
            </Box>
            {TOPICS.map(topic => (
              <Box key={topic.name} display="grid" gridTemplateColumns="minmax(0, 1fr) auto 52px" gap={2} py={2} borderTop="1px solid" borderColor="border.muted">
                <Text sx={{ fontSize: 1 }}>{topic.name}</Text>
                <span style={{ ...mono, fontSize: 12 }}>{topic.runs}</span>
                <span style={{ ...mono, fontSize: 12, color: 'var(--fgColor-success)', textAlign: 'right' }}>{topic.change}</span>
              </Box>
            ))}
          </Panel>
        </Box>
        <Panel>
          <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
            <Text sx={{ fontSize: 1, color: 'fg.muted' }}>Ask a follow-up question</Text>
            <Button size="small" variant="primary">Ask</Button>
          </Box>
        </Panel>
      </Box>
    </Box>
  );
}

const CHANNELS: { surface: CardSurface; icon: typeof PeopleIcon; title: string; says: string }[] = [
  { surface: 'steel', icon: PeopleIcon, title: 'Empower every team', says: 'Compose agents into teams, with or without engineering support.' },
  { surface: 'mauve', icon: WorkflowIcon, title: 'Unify your channels', says: 'One agent across chat, email, voice and your own applications.' },
  { surface: 'clay', icon: ShieldCheckIcon, title: 'Pay for work well done', says: 'Budgets, approvals and evidence behind every number.' },
];

const STATS = [
  { value: '1.3K+', says: 'GitHub stars' },
  { value: '15', says: 'conformance scenarios' },
  { value: '24/7', says: 'kept running' },
  { value: '6', says: 'open protocols' },
];

export function LandingDemo() {
  return (
    <Box display="grid" gap={4}>
      {/* Hero */}
      <Box textAlign="center" pt={4} display="grid" justifyItems="center" gap={2}>
        <Label variant="accent">New: agent teams</Label>
        <Heading as="h1" style={title(52)} sx={{ fontWeight: 'normal', m: 0, mt: 2 }}>
          Meet your agent team
        </Heading>
        <Text as="p" sx={{ color: 'fg.muted', fontSize: 3, m: 0, maxWidth: 560 }}>
          The platform to orchestrate agents, measure what they do, and keep them running.
        </Text>
        <Box display="flex" gap={2} mt={3} flexWrap="wrap" justifyContent="center">
          <Button variant="primary" size="large" trailingVisual={ArrowRightIcon}>Start building</Button>
          <Button size="large" leadingVisual={PlayIcon}>Watch the demo</Button>
        </Box>
      </Box>
      <ProductWindow />

      {/* The large surface: glass on a gradient */}
      <Card surface="sage" p={[3, 4]} minHeight={320} justifyContent="space-between" gap={4}>
        <Heading as="h2" style={{ ...title(30), color: 'inherit' }} sx={{ fontWeight: 'normal', m: 0 }}>
          Increase what every agent delivers
        </Heading>
        <Card.Glass maxWidth={460} mx="auto" width="100%">
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <CommentDiscussionIcon size={16} />
            <Text sx={{ fontSize: 1, color: 'inherit' }}>Your agent</Text>
          </Box>
          <Text sx={{ fontSize: 2, color: 'inherit' }}>Your weekly report is ready. Shall I send it?</Text>
        </Card.Glass>
        <Text sx={{ fontSize: 2, color: 'inherit' }}>Go beyond answers, to work that gets done.</Text>
      </Card>

      {/* Three surfaces */}
      <Box display="grid" gridTemplateColumns={['1fr', '1fr', 'repeat(3, minmax(0, 1fr))']} gap={3}>
        {CHANNELS.map(channel => (
          <Card key={channel.surface} surface={channel.surface} p={3} minHeight={280} justifyContent="space-between" gap={3}>
            <Heading as="h3" style={{ ...title(22), color: 'inherit' }} sx={{ fontWeight: 'normal', m: 0 }}>{channel.title}</Heading>
            <Card.Glass alignSelf="center" display="flex" alignItems="center" justifyContent="center" width={72} height={72} p={0} borderRadius={12}>
              <channel.icon size={24} />
            </Card.Glass>
            <Text sx={{ fontSize: 1, color: 'inherit' }}>{channel.says}</Text>
          </Card>
        ))}
      </Box>

      {/* Numbers */}
      <Box display="grid" gridTemplateColumns={['repeat(2, minmax(0, 1fr))', 'repeat(2, minmax(0, 1fr))', 'repeat(4, minmax(0, 1fr))']} gap={3}>
        {STATS.map(stat => (
          <Panel key={stat.says}>
            <span style={{ ...mono, fontSize: 28, letterSpacing: '-0.02em', display: 'block' }}>{stat.value}</span>
            <Text sx={{ fontSize: 1, color: 'fg.muted' }}>{stat.says}</Text>
          </Panel>
        ))}
      </Box>

      {/* Call to action */}
      <Box textAlign="center" py={4} display="grid" justifyItems="center" gap={2}>
        <Heading as="h2" style={title(34)} sx={{ fontWeight: 'normal', m: 0 }}>Put your agents to work</Heading>
        <Text as="p" sx={{ color: 'fg.muted', fontSize: 2, m: 0 }}>Start from an example, or from nothing at all.</Text>
        <Box mt={2}><Button variant="primary" size="large">Get started</Button></Box>
      </Box>
    </Box>
  );
}
