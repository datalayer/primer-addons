/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  LinkIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
  QuoteIcon,
  StrikethroughIcon,
} from "@primer/octicons-react";
import { Box, Text } from "@primer/react";
import { FloatingToolbar, Toolbar, type ToolbarItem } from "../..";

type Block = "paragraph" | "heading" | "quote";

const BLOCK_LABELS: Record<Block, string> = {
  paragraph: "Paragraph",
  heading: "Heading",
  quote: "Quote",
};

/** An editor's formatting state, and the toolbar items that change it. */
const useFormattingItems = (): [
  ToolbarItem[],
  Record<string, boolean>,
  Block,
] => {
  const [formats, setFormats] = useState<Record<string, boolean>>({
    bold: false,
    italic: false,
    strikethrough: false,
    code: false,
  });
  const [block, setBlock] = useState<Block>("paragraph");
  const toggle = (key: string) =>
    setFormats((previous) => ({ ...previous, [key]: !previous[key] }));
  const items: ToolbarItem[] = [
    {
      key: "block-type",
      type: "dropdown",
      ariaLabel: "Block type",
      label: BLOCK_LABELS[block],
      minWidth: 96,
      options: (Object.keys(BLOCK_LABELS) as Block[]).map((key) => ({
        key,
        label: BLOCK_LABELS[key],
        isActive: block === key,
        onClick: () => setBlock(key),
      })),
    },
    { key: "divider-1", type: "divider" },
    {
      key: "bold",
      type: "button",
      ariaLabel: "Bold",
      title: "Bold",
      icon: BoldIcon,
      shortcut: "⌘B",
      isActive: formats.bold,
      onClick: () => toggle("bold"),
    },
    {
      key: "italic",
      type: "button",
      ariaLabel: "Italic",
      title: "Italic",
      icon: ItalicIcon,
      shortcut: "⌘I",
      isActive: formats.italic,
      onClick: () => toggle("italic"),
    },
    {
      key: "strikethrough",
      type: "button",
      ariaLabel: "Strikethrough",
      title: "Strikethrough",
      icon: StrikethroughIcon,
      isActive: formats.strikethrough,
      onClick: () => toggle("strikethrough"),
    },
    {
      key: "code",
      type: "button",
      ariaLabel: "Inline code",
      title: "Inline code",
      icon: CodeIcon,
      isActive: formats.code,
      onClick: () => toggle("code"),
    },
    { key: "divider-2", type: "divider" },
    {
      key: "bullets",
      type: "button",
      ariaLabel: "Bulleted list",
      title: "Bulleted list",
      icon: ListUnorderedIcon,
      onClick: () => setBlock("paragraph"),
    },
    {
      key: "numbers",
      type: "button",
      ariaLabel: "Numbered list",
      title: "Numbered list",
      icon: ListOrderedIcon,
      onClick: () => setBlock("paragraph"),
    },
    {
      key: "quote",
      type: "button",
      ariaLabel: "Quote",
      title: "Quote",
      icon: QuoteIcon,
      isActive: block === "quote",
      onClick: () => setBlock("quote"),
    },
    {
      key: "link",
      type: "button",
      ariaLabel: "Insert link",
      title: "Insert link",
      icon: LinkIcon,
      onClick: () => console.log("Insert link"),
    },
  ];
  return [items, formats, block];
};

const meta = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    items: { control: false },
    extraItems: { control: false },
  },
  args: {
    items: [],
    ariaLabel: "Editor toolbar",
    disabled: false,
    overflow: true,
  },
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A formatting toolbar: a block-type dropdown, toggles that stay pressed, dividers. */
export const Default: Story = {
  render: function DefaultStory(args) {
    const [items, formats, block] = useFormattingItems();
    return (
      <Box p={3} bg="canvas.default">
        <Toolbar {...args} items={items} />
        <Text as="p" sx={{ mt: 2, fontSize: 0, color: "fg.muted" }}>
          {BLOCK_LABELS[block]};{" "}
          {Object.entries(formats)
            .filter(([, on]) => on)
            .map(([key]) => key)
            .join(", ") || "no inline format"}
          .
        </Text>
      </Box>
    );
  },
};

/** Text labels instead of icons. */
export const TextLabels: Story = {
  render: function TextLabelsStory(args) {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const items: ToolbarItem[] = [
      {
        key: "bold",
        type: "button",
        ariaLabel: "Bold",
        label: "B",
        isActive: bold,
        onClick: () => setBold((value) => !value),
      },
      {
        key: "italic",
        type: "button",
        ariaLabel: "Italic",
        label: "I",
        isActive: italic,
        onClick: () => setItalic((value) => !value),
      },
    ];
    return (
      <Box p={3} bg="canvas.default">
        <Toolbar {...args} items={items} />
      </Box>
    );
  },
};

/** In a narrow column: what does not fit moves into the overflow menu. */
export const Overflow: Story = {
  render: function OverflowStory(args) {
    const [items] = useFormattingItems();
    return (
      <Box p={3} bg="canvas.default">
        <Box
          sx={{
            width: 240,
            border: "1px dashed",
            borderColor: "border.default",
          }}
        >
          <Toolbar {...args} items={items} />
        </Box>
      </Box>
    );
  },
};

/** The whole toolbar disabled. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: function DisabledStory(args) {
    const [items] = useFormattingItems();
    return (
      <Box p={3} bg="canvas.default">
        <Toolbar {...args} items={items} />
      </Box>
    );
  },
};

/** `FloatingToolbar`: select text in the paragraph and it appears by the selection. */
export const Floating: Story = {
  render: function FloatingStory(args) {
    const [items] = useFormattingItems();
    const [visible, setVisible] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const onSelectionChange = () => {
      const selection = window.getSelection();
      setVisible(Boolean(selection && !selection.isCollapsed));
    };
    return (
      <Box p={3} bg="canvas.default" minHeight={240}>
        <Text as="p" sx={{ mb: 2, fontSize: 0, color: "fg.muted" }}>
          Select a few words below.
        </Text>
        <div ref={anchorRef} style={{ position: "relative", paddingTop: 56 }}>
          <Box
            contentEditable
            suppressContentEditableWarning
            onMouseUp={onSelectionChange}
            onKeyUp={onSelectionChange}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "border.default",
              borderRadius: 2,
              maxWidth: 560,
            }}
          >
            The floating toolbar suits inline editing: select a few words in
            this paragraph and it appears near the selection, then goes when the
            selection collapses.
          </Box>
          <FloatingToolbar
            anchorElement={anchorRef.current}
            isVisible={visible}
            items={items}
            ariaLabel={args.ariaLabel}
            disabled={args.disabled}
            onClose={() => setVisible(false)}
          />
        </div>
      </Box>
    );
  },
};
