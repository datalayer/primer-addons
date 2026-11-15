/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { Heading, Label, Text } from '@primer/react';
import {
  BoldIcon,
  CodeIcon,
  CommentIcon,
  GearIcon,
  ItalicIcon,
  LinkIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
  PlayIcon,
  PlusIcon,
  QuoteIcon,
  ShareAndroidIcon,
  StrikethroughIcon,
  TasklistIcon,
  TrashIcon,
  XIcon,
} from '@primer/octicons-react';
import type { ToolbarButtonItem, ToolbarItem } from '@datalayer/primer-addons';
import { Box, Toolbar } from '@datalayer/primer-addons';
import { useState } from 'react';

/** A frame the reader can narrow, so the overflow is seen happening. */
function Narrowable({
  width,
  children,
}: {
  width: number;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: `${width}%`,
        minWidth: 120,
        maxWidth: '100%',
        resize: 'horizontal',
        overflow: 'hidden',
        border: '1px dashed',
        borderColor: 'border.default',
        borderRadius: 2,
      }}
    >
      {children}
    </Box>
  );
}

export function ToolbarDemo() {
  const [log, setLog] = useState<string[]>([]);
  const [marks, setMarks] = useState<Record<string, boolean>>({});
  const [format, setFormat] = useState<'paragraph' | 'heading' | 'quote'>('paragraph');
  const [width, setWidth] = useState(100);
  const [headerWidth, setHeaderWidth] = useState(60);

  const say = (what: string) => setLog(previous => [what, ...previous].slice(0, 5));
  const toggle = (key: string) => () => {
    setMarks(previous => ({ ...previous, [key]: !previous[key] }));
    say(`toggled ${key}`);
  };
  const mark = (key: string, icon: ToolbarButtonItem['icon'], ariaLabel: string): ToolbarItem => ({
    key,
    type: 'button',
    icon,
    ariaLabel,
    title: ariaLabel,
    isActive: Boolean(marks[key]),
    onClick: toggle(key),
  });

  /* An editor's strip: many items, the tail moving into "…" as it narrows. */
  const editorItems: ToolbarItem[] = [
    {
      key: 'format',
      type: 'dropdown',
      ariaLabel: 'Block format',
      label: format,
      minWidth: 80,
      options: (['paragraph', 'heading', 'quote'] as const).map(option => ({
        key: option,
        label: option,
        isActive: format === option,
        onClick: () => {
          setFormat(option);
          say(`format ${option}`);
        },
      })),
    },
    { key: 'divider-format', type: 'divider' },
    mark('bold', BoldIcon, 'Bold'),
    mark('italic', ItalicIcon, 'Italic'),
    mark('strike', StrikethroughIcon, 'Strikethrough'),
    mark('code', CodeIcon, 'Inline code'),
    mark('link', LinkIcon, 'Link'),
    { key: 'divider-marks', type: 'divider' },
    mark('bullets', ListUnorderedIcon, 'Bulleted list'),
    mark('numbers', ListOrderedIcon, 'Numbered list'),
    mark('tasks', TasklistIcon, 'Task list'),
    mark('quote', QuoteIcon, 'Quote'),
    { key: 'divider-lists', type: 'divider' },
    {
      key: 'comment',
      type: 'button',
      icon: CommentIcon,
      label: 'Comment',
      ariaLabel: 'Comment',
      onClick: () => say('comment'),
    },
    {
      key: 'status',
      type: 'custom',
      // A chip on the line; in the menu, a row that does what it stands for.
      render: () => <Label variant="success">Saved</Label>,
      overflow: { label: 'Save now', icon: PlayIcon, onSelect: () => say('saved') },
    },
    { key: 'spacer', type: 'spacer' },
    {
      key: 'run',
      type: 'button',
      icon: PlayIcon,
      ariaLabel: 'Run',
      title: 'Run (pinned: never in the menu)',
      pinned: true,
      onClick: () => say('run'),
    },
  ];

  /* A header row: a title on the left, an inline toolbar of actions on the
     right, the plugins' chips first to leave, close always kept. */
  const headerItems: ToolbarItem[] = [
    { key: 'lead', type: 'spacer' },
    {
      key: 'chip-linkedin',
      type: 'custom',
      priority: -1,
      render: () => <Label>LinkedIn connected</Label>,
      overflow: { label: 'LinkedIn connected', onSelect: () => say('linkedin') },
    },
    {
      key: 'chip-budget',
      type: 'custom',
      priority: -1,
      render: () => <Label variant="attention">12 / 50 posts</Label>,
    },
    { key: 'new', type: 'button', icon: PlusIcon, ariaLabel: 'New chat', title: 'New chat', onClick: () => say('new chat') },
    { key: 'clear', type: 'button', icon: TrashIcon, ariaLabel: 'Clear messages', title: 'Clear messages', onClick: () => say('clear') },
    { key: 'share', type: 'button', icon: ShareAndroidIcon, ariaLabel: 'Share', title: 'Share', onClick: () => say('share') },
    { key: 'settings', type: 'button', icon: GearIcon, ariaLabel: 'Settings', title: 'Settings', onClick: () => say('settings') },
    { key: 'close', type: 'button', icon: XIcon, ariaLabel: 'Close', title: 'Close', pinned: true, onClick: () => say('close') },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Heading as="h3" sx={{ fontSize: 2 }}>
          Collapsing into “…”
        </Heading>
        <Text sx={{ color: 'fg.muted' }}>
          The toolbar keeps to one line. Narrow it (the slider, or drag the frame’s corner):
          what does not fit moves, from the end, into the menu behind “…”. <b>Run</b> is
          pinned and never leaves; the <b>Saved</b> chip becomes a “Save now” row in the menu;
          arrow keys move between the controls.
        </Text>
        <label>
          <Text sx={{ fontSize: 1, mr: 2 }}>Width {width}%</Text>
          <input
            type="range"
            min={15}
            max={100}
            value={width}
            onChange={event => setWidth(Number(event.target.value))}
            aria-label="Toolbar width"
          />
        </label>
        <Narrowable width={width}>
          <Toolbar items={editorItems} ariaLabel="Editor toolbar" />
          <Box sx={{ p: 3 }}>
            <Text>
              format={format} · marks=
              {Object.keys(marks).filter(key => marks[key]).join(', ') || 'none'}
            </Text>
          </Box>
        </Narrowable>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Heading as="h3" sx={{ fontSize: 2 }}>
          In a header row (inline)
        </Heading>
        <Text sx={{ color: 'fg.muted' }}>
          <code>variant=&quot;inline&quot;</code> draws the items alone, for a header of the
          host’s. The chips have <code>priority: -1</code>, so they leave first; Close is
          pinned. The toolbar sits in a box of its own beside the title, which is the width it
          measures.
        </Text>
        <label>
          <Text sx={{ fontSize: 1, mr: 2 }}>Width {headerWidth}%</Text>
          <input
            type="range"
            min={20}
            max={100}
            value={headerWidth}
            onChange={event => setHeaderWidth(Number(event.target.value))}
            aria-label="Header width"
          />
        </label>
        <Narrowable width={headerWidth}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
            <Text sx={{ fontWeight: 'semibold', whiteSpace: 'nowrap' }}>Marketer</Text>
            <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
              <Toolbar items={headerItems} variant="inline" gap={4} ariaLabel="Chat actions" />
            </Box>
          </Box>
        </Narrowable>
      </Box>

      <Box sx={{ p: 3, border: '1px solid', borderColor: 'border.default', borderRadius: 2 }}>
        <Text sx={{ fontSize: 1, color: 'fg.muted' }}>Last actions: {log.join(' · ') || '—'}</Text>
      </Box>
    </Box>
  );
}
