import { Text } from '@primer/react';
import type { ToolbarItem } from '@datalayer/primer-addons';
import { Box, Toolbar } from '@datalayer/primer-addons';
import { useState } from 'react';

export function ToolbarDemo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [format, setFormat] = useState<'paragraph' | 'heading' | 'quote'>('paragraph');

  const items: ToolbarItem[] = [
    {
      key: 'bold',
      type: 'button',
      ariaLabel: 'Bold',
      label: 'B',
      isActive: bold,
      onClick: () => setBold(v => !v),
    },
    {
      key: 'italic',
      type: 'button',
      ariaLabel: 'Italic',
      label: 'I',
      isActive: italic,
      onClick: () => setItalic(v => !v),
    },
    { key: 'divider-1', type: 'divider' },
    {
      key: 'format',
      type: 'dropdown',
      ariaLabel: 'Block format',
      label: format,
      minWidth: 96,
      options: [
        {
          key: 'paragraph',
          label: 'paragraph',
          isActive: format === 'paragraph',
          onClick: () => setFormat('paragraph'),
        },
        {
          key: 'heading',
          label: 'heading',
          isActive: format === 'heading',
          onClick: () => setFormat('heading'),
        },
        {
          key: 'quote',
          label: 'quote',
          isActive: format === 'quote',
          onClick: () => setFormat('quote'),
        },
      ],
    },
  ];

  return (
    <Box>
      <Toolbar items={items} />
      <Box sx={{ p: 3, border: '1px solid', borderColor: 'var(--borderColor-default)' }}>
        <Text>
          Toolbar state: bold={String(bold)}, italic={String(italic)}, format={format}
        </Text>
      </Box>
    </Box>
  );
}
