/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { CSSProperties, ReactNode } from 'react';
import { Button, Heading, IconButton, Label, Spinner, Text } from '@primer/react';
import {
  ArrowRightIcon,
  ArrowUpIcon,
  BeakerIcon,
  CheckCircleFillIcon,
  CheckCircleIcon,
  CommentDiscussionIcon,
  CopilotIcon,
  DatabaseIcon,
  GraphIcon,
  PeopleIcon,
  ChecklistIcon,
  PlayIcon,
  ShieldCheckIcon,
  SparkleFillIcon,
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

/** A stage, the pale panel a fragment of the product stands on, and what it is under it. */
function Feature({ title: name, says, height, children }: { title: string; says: string; height: number; children: ReactNode }) {
  return (
    <Box display="grid" gap={2} alignContent="start" minWidth={0}>
      <Card variant="accent" shadow="none" height={height} overflow="hidden" position="relative" px={[3, 3, 4]} pt={[3, 3, 4]} style={{ border: 'none' }}>
        {children}
      </Card>
      <Text as="p" sx={{ fontSize: 2, m: 0, mt: 1 }}>{name}</Text>
      <Text as="p" sx={{ fontSize: 1, color: 'fg.muted', m: 0 }}>{says}</Text>
    </Box>
  );
}

/** The fragment itself: a panel in the stage, running off its bottom edge. */
const Fragment = ({ children, ...rest }: { children: ReactNode } & Record<string, unknown>) => (
  <Card border shadow="none" p={3} gap={3} flex="1 1 auto" style={{ borderBottom: 'none', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} {...rest}>
    {children}
  </Card>
);

const accentPill: CSSProperties = {
  background: 'var(--bgColor-accent-muted)',
  borderColor: 'var(--borderColor-accent-muted)',
  color: 'var(--fgColor-accent)',
};

const STEPS = ['Updating the agent', 'Researching', 'Writing tests'];

function BuildFragment() {
  return (
    <Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2}>
          <CopilotIcon size={18} />
          <Text sx={{ fontSize: 3 }}>Composer</Text>
        </Box>
        <Button size="small">Merge</Button>
      </Box>
      <Card variant="accent" shadow="none" border p={3} gap={2}>
        <Text sx={{ fontSize: 1, color: 'accent.fg' }}>Create a support agent that tracks orders</Text>
        <Box height={10} bg="accent.muted" borderRadius="full" />
        <Box height={10} width="70%" bg="accent.muted" borderRadius="full" />
      </Card>
      <Box display="grid" gap={2}>
        {STEPS.map(step => (
          <Box key={step} display="flex" alignItems="center" gap={2} color="accent.fg">
            <CheckCircleFillIcon size={16} />
            <Text sx={{ fontSize: 1, color: 'fg.muted' }}>{step}</Text>
          </Box>
        ))}
        <Box display="flex" alignItems="center" gap={2}>
          <Spinner size="small" />
          <Text sx={{ fontSize: 1, color: 'fg.muted' }}>Running the tests</Text>
        </Box>
      </Box>
      <Card border shadow="none" px={3} py={2} rounded="bubble">
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
          <Text sx={{ fontSize: 1, color: 'fg.muted' }}>What can I help you with?</Text>
          <IconButton icon={ArrowUpIcon} aria-label="Send" variant="primary" size="small" />
        </Box>
      </Card>
    </Fragment>
  );
}

const RECOMMENDATIONS = [
  'Handle cancellations, disputes and refunds with care.',
  'Add secure subscription management for plans and billing.',
  'Apply all three to strengthen the billing experience.',
];

function ImproveFragment() {
  return (
    <Fragment>
      <Text sx={{ fontSize: 3 }}>Recommendations</Text>
      <Card border shadow="none" overflow="hidden">
        {RECOMMENDATIONS.map((text, index) => (
          <Box
            key={text}
            display="flex"
            alignItems="center"
            gap={3}
            p={3}
            bg={index === 1 ? 'accent.subtle' : undefined}
            color={index === 1 ? 'accent.fg' : 'fg.muted'}
            borderTop={index ? '1px solid' : undefined}
            borderColor="border.default"
          >
            <Box color="accent.fg" display="flex"><CopilotIcon size={18} /></Box>
            <Text sx={{ fontSize: 1, color: 'inherit' }}>{text}</Text>
          </Box>
        ))}
      </Card>
      <Box display="flex" gap={2} flexWrap="wrap">
        <Button trailingVisual={ArrowRightIcon} style={accentPill}>Compare findings</Button>
        <Button trailingVisual={ArrowRightIcon} style={accentPill}>Show all sessions</Button>
      </Box>
    </Fragment>
  );
}

const BARS = [
  { base: 34, top: 28 },
  { base: 52, top: 36 },
  { base: 12, top: 10 },
  { base: 36, top: 8 },
  { base: 30, top: 6 },
];

function Monitors() {
  return (
    <Box position="relative" height="100%">
      <Card border shadow="none" p={2} position="absolute" left={0} bottom={16} width="64%" height={140}>
        <Text sx={{ fontSize: 0, color: 'fg.muted' }}>Total runs</Text>
        <Box display="flex" alignItems="flex-end" gap={1} mt="auto">
          {BARS.map((bar, index) => (
            <Box key={index} flex="1 1 0" display="grid" gap="2px">
              <Box height={bar.top} bg="border.muted" />
              <Box height={bar.base} bg="accent.emphasis" />
            </Box>
          ))}
        </Box>
      </Card>
      <Card border shadow="large" p={2} position="absolute" right={0} top={0} width="62%" height={132}>
        <Text sx={{ fontSize: 0, color: 'fg.muted' }}>Completion</Text>
        <span style={{ ...mono, fontSize: 26, letterSpacing: '-0.02em' }}>32%</span>
        <svg viewBox="0 0 130 60" width="100%" height="44" role="img" aria-label="Completion, rising">
          <path d="M0 52 L14 50 L30 36 L48 33 L66 30 L80 18 L96 12 L130 4 L130 60 L0 60 Z" fill="var(--fgColor-success)" opacity="0.14" />
          <path d="M0 52 L14 50 L30 36 L48 33 L66 30 L80 18 L96 12 L130 4" fill="none" stroke="var(--fgColor-success)" strokeWidth="1.5" />
        </svg>
      </Card>
    </Box>
  );
}

function Experiments() {
  return (
    <Box display="grid" gap={3} pl={2} style={{ borderLeft: '1px dashed var(--borderColor-accent-muted)' }}>
      {['Hi, how can I help?', 'Hello, how are you this evening?'].map(text => (
        <Card key={text} border shadow="none" p={3} gap={1}>
          <Box display="flex" alignItems="center" gap={1} color="fg.muted">
            <SparkleFillIcon size={10} />
            <Text sx={{ fontSize: 0 }}>Agent</Text>
          </Box>
          <Text sx={{ fontSize: 1 }}>{text}</Text>
        </Card>
      ))}
    </Box>
  );
}

const REASONING = [
  { group: 'Supervisors', steps: ['Detect abuse', 'Observations'] },
  { group: 'Decisions', steps: ['Security setup'] },
  { group: 'Responses', steps: ['Main response'] },
];

function Reasoning() {
  return (
    <Fragment gap={2}>
      <Box display="flex" alignItems="center" gap={2} color="accent.fg">
        <SparkleFillIcon size={14} />
        <Text sx={{ fontSize: 1, color: 'inherit' }}>Agent reasoning</Text>
      </Box>
      {REASONING.map(section => (
        <Box key={section.group}>
          <Text as="p" sx={{ fontSize: 0, m: 0 }}>{section.group}</Text>
          {section.steps.map(step => (
            <Box key={step} display="flex" justifyContent="space-between" alignItems="center" color="success.fg">
              <Text sx={{ fontSize: 0, color: 'fg.muted' }}>{step}</Text>
              <CheckCircleIcon size={12} />
            </Box>
          ))}
        </Box>
      ))}
    </Fragment>
  );
}

function Explorer() {
  return (
    <Fragment gap={2}>
      <Text sx={{ fontSize: 2 }}>“Why do runs hand over to a person?”</Text>
      <Text sx={{ fontSize: 0, color: 'fg.muted' }}>Highlights</Text>
      <Text sx={{ fontSize: 0, color: 'fg.muted' }}>Out of 120k runs, the top reasons are:</Text>
      <Card border shadow="none" px={2} py={1}>
        <Text sx={{ fontSize: 0 }}>Package stuck in transit</Text>
      </Card>
    </Fragment>
  );
}

const IMPROVE = [
  { title: 'Explorer', says: 'Ask why agents behave as they do, and read the evidence.', render: () => <Explorer /> },
  { title: 'Monitors', says: 'See what needs attention before anybody reports it.', render: () => <Monitors /> },
  { title: 'Experiments', says: 'Compare variants on the same tasks and keep what works.', render: () => <Experiments /> },
  { title: 'Observability', says: 'Follow every action: tool calls, lookups, latency and cost.', render: () => <Reasoning /> },
];

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

      {/* Build, and improve: fragments of the product on their stages */}
      <Box display="grid" gridTemplateColumns={['1fr', '1fr', 'repeat(2, minmax(0, 1fr))']} gap={3}>
        <Feature title="Build" says="Describe the goal in plain words. The composer drafts an agent, with its tests and its guardrails." height={480}>
          <BuildFragment />
        </Feature>
        <Feature title="Improve" says="Updates proposed from what went wrong, with every change visible, to review and ship with confidence." height={480}>
          <ImproveFragment />
        </Feature>
      </Box>

      <Box textAlign="center" pt={4} display="grid" justifyItems="center" gap={3}>
        <Heading as="h2" style={title(38)} sx={{ fontWeight: 'normal', m: 0 }}>Use your agents to improve your agents</Heading>
        <Button size="small" leadingVisual={ChecklistIcon}>Insights</Button>
      </Box>
      <Box display="grid" gridTemplateColumns={['1fr', 'repeat(2, minmax(0, 1fr))', 'repeat(4, minmax(0, 1fr))']} gap={3}>
        {IMPROVE.map(item => (
          <Feature key={item.title} title={item.title} says={item.says} height={250}>
            {item.render()}
          </Feature>
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
