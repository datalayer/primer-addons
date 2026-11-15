/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Primer's own components, drawn by the selected theme. A theme's shape says
 * how a control's corners and a data table's corners, header and hairline
 * look (`primerComponentsCss`); its colours do the rest. Switch the theme
 * (try `loop`: pills and a rounder table) and every one of them follows.
 */

import { useState, type ReactNode } from 'react';
import {
  ActionList,
  ActionMenu,
  Button,
  Dialog,
  Label,
  SegmentedControl,
  Select,
  TextInput,
  ToggleSwitch,
  Token,
  UnderlineNav,
} from '@primer/react';
import { DataTable, Table } from '@primer/react/experimental';
import { Box } from '@datalayer/primer-addons';

type Runtime = { id: number; name: string; status: string; owner: string; activity: string };

const RUNTIMES: Runtime[] = [
  { id: 1, name: 'AI Agents Runtime', status: 'Ready', owner: '—', activity: '16m ago' },
  { id: 2, name: 'Python CPU', status: 'Starting', owner: 'eric', activity: 'now' },
  { id: 3, name: 'Python GPU', status: 'Stopped', owner: 'team', activity: '2d ago' },
];

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box as="section" aria-label={title} display="grid" gap={2}>
    <Box as="h3" m={0} fontSize={2} fontWeight="semibold">
      {title}
    </Box>
    <Box p={3} border="1px solid" borderColor="border.default" borderRadius="card">
      {children}
    </Box>
  </Box>
);

export function PrimerDemo() {
  const [on, setOn] = useState(true);
  const [segment, setSegment] = useState(0);
  const [tab, setTab] = useState('Code');
  const [dialog, setDialog] = useState(false);
  return (
    <Box display="grid" gap={4}>
      <Section title="Table / DataTable">
        <Table.Container>
          <Table.Title as="h4" id="primer-demo-runtimes">
            Runtimes
          </Table.Title>
          <DataTable
            aria-labelledby="primer-demo-runtimes"
            data={RUNTIMES}
            columns={[
              { header: 'Name', field: 'name', rowHeader: true },
              {
                header: 'Status',
                field: 'status',
                renderCell: row => (
                  <Label variant={row.status === 'Ready' ? 'success' : row.status === 'Starting' ? 'attention' : 'secondary'}>
                    {row.status}
                  </Label>
                ),
              },
              { header: 'Owner', field: 'owner' },
              { header: 'Last activity', field: 'activity' },
            ]}
          />
        </Table.Container>
      </Section>
      <Section title="ToggleSwitch">
        <Box display="flex" alignItems="center" gap={3}>
          <Box id="primer-demo-toggle" fontWeight="semibold">
            Notifications
          </Box>
          <ToggleSwitch aria-labelledby="primer-demo-toggle" checked={on} onClick={() => setOn(!on)} />
          <ToggleSwitch aria-labelledby="primer-demo-toggle" size="small" checked={!on} onClick={() => setOn(!on)} />
        </Box>
      </Section>
      <Section title="SegmentedControl">
        <SegmentedControl aria-label="View" onChange={setSegment}>
          {['Preview', 'Raw', 'Blame'].map((label, i) => (
            <SegmentedControl.Button key={label} selected={segment === i}>
              {label}
            </SegmentedControl.Button>
          ))}
        </SegmentedControl>
      </Section>
      <Section title="Button, TextInput, Select, ActionMenu">
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
          <Button variant="primary">Primary</Button>
          <Button>Default</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="invisible">Invisible</Button>
          <TextInput aria-label="Name" placeholder="A text input" />
          <Select aria-label="Size">
            <Select.Option value="1">1 Gi</Select.Option>
            <Select.Option value="5">5 Gi</Select.Option>
          </Select>
          <ActionMenu>
            <ActionMenu.Button>Menu</ActionMenu.Button>
            <ActionMenu.Overlay>
              <ActionList>
                <ActionList.Item>Rename</ActionList.Item>
                <ActionList.Divider />
                <ActionList.Item variant="danger">Delete</ActionList.Item>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>
        </Box>
      </Section>
      <Section title="Label, Token">
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
          {(['default', 'accent', 'success', 'attention', 'danger', 'done'] as const).map(variant => (
            <Label key={variant} variant={variant}>
              {variant}
            </Label>
          ))}
          <Token text="python" />
          <Token text="gpu" onRemove={() => undefined} />
        </Box>
      </Section>
      <Section title="UnderlineNav">
        <UnderlineNav aria-label="Repository">
          {['Code', 'Issues', 'Pull requests'].map(label => (
            <UnderlineNav.Item
              key={label}
              href="#"
              aria-current={tab === label ? 'page' : undefined}
              onSelect={event => {
                event.preventDefault();
                setTab(label);
              }}
            >
              {label}
            </UnderlineNav.Item>
          ))}
        </UnderlineNav>
      </Section>
      <Section title="Dialog">
        <Button onClick={() => setDialog(true)}>Open a dialog</Button>
        {dialog && (
          <Dialog
            title="A dialog"
            onClose={() => setDialog(false)}
            footerButtons={[{ buttonType: 'primary', content: 'Close', onClick: () => setDialog(false) }]}
          >
            Drawn by the theme: its overlay, its corners, its buttons.
          </Dialog>
        )}
      </Section>
    </Box>
  );
}
