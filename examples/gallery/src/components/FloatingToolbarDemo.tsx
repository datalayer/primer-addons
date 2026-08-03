import { BoldIcon, CodeIcon, ItalicIcon, LinkIcon, StrikethroughIcon } from '@primer/octicons-react';
import { Text } from '@primer/react';
import type { ToolbarItem } from '@datalayer/primer-addons';
import { FloatingToolbar } from '@datalayer/primer-addons';
import { useRef, useState } from 'react';

export function FloatingToolbarDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [formats, setFormats] = useState<Record<string, boolean>>({
    bold: false,
    italic: false,
    strikethrough: false,
    code: false,
  });
  const [blockType, setBlockType] = useState<'paragraph' | 'heading' | 'quote'>('paragraph');
  const anchorRef = useRef<HTMLDivElement>(null);

  const toggle = (key: string) =>
    setFormats(prev => ({ ...prev, [key]: !prev[key] }));

  const items: ToolbarItem[] = [
    {
      key: 'block-type',
      type: 'dropdown',
      ariaLabel: 'Block type',
      label: blockType === 'paragraph' ? 'Paragraph' : blockType === 'heading' ? 'Heading' : 'Quote',
      minWidth: 96,
      options: [
        { key: 'paragraph', label: 'Paragraph', isActive: blockType === 'paragraph', onClick: () => setBlockType('paragraph') },
        { key: 'heading', label: 'Heading', isActive: blockType === 'heading', onClick: () => setBlockType('heading') },
        { key: 'quote', label: 'Quote', isActive: blockType === 'quote', onClick: () => setBlockType('quote') },
      ],
    },
    { key: 'divider-1', type: 'divider' },
    {
      key: 'bold',
      type: 'button',
      ariaLabel: 'Bold',
      title: 'Bold',
      icon: BoldIcon,
      isActive: formats.bold,
      onClick: () => toggle('bold'),
    },
    {
      key: 'italic',
      type: 'button',
      ariaLabel: 'Italic',
      title: 'Italic',
      icon: ItalicIcon,
      isActive: formats.italic,
      onClick: () => toggle('italic'),
    },
    {
      key: 'strikethrough',
      type: 'button',
      ariaLabel: 'Strikethrough',
      title: 'Strikethrough',
      icon: StrikethroughIcon,
      isActive: formats.strikethrough,
      onClick: () => toggle('strikethrough'),
    },
    {
      key: 'code',
      type: 'button',
      ariaLabel: 'Inline code',
      title: 'Inline code',
      icon: CodeIcon,
      isActive: formats.code,
      onClick: () => toggle('code'),
    },
    { key: 'divider-2', type: 'divider' },
    {
      key: 'link',
      type: 'button',
      ariaLabel: 'Insert link',
      title: 'Insert link',
      icon: LinkIcon,
      onClick: () => {},
    },
  ];

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
  };

  return (
    <div>
      <Text as="p" sx={{ mb: 2 }}>
        Select text below to show the floating toolbar.
      </Text>
      <div ref={anchorRef} className="floating-anchor">
        <div
          contentEditable
          suppressContentEditableWarning
          className="floating-editor"
          onMouseUp={handleSelectionChange}
          onKeyUp={handleSelectionChange}
        >
          This component is useful for inline editing workflows. Select a few words in this paragraph
          and the floating toolbar will appear near the selection.
        </div>
        <FloatingToolbar
          anchorElement={anchorRef.current}
          isVisible={isVisible}
          items={items}
        />
      </div>
    </div>
  );
}
