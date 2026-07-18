import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BaseStyles,
  Box as PrimerBox,
  Button,
  Heading,
  NavList,
  Text,
} from '@primer/react';
import type {
  ColorMode,
  ThemeVariant,
  ToolbarItem,
} from '@datalayer/primer-addons';
import {
  AI,
  AI2,
  AppearanceControls,
  AppearanceControlsWithStore,
  Box,
  Card,
  CircleIcon,
  CloseableFlash,
  ContentLoader,
  DI,
  DatalayerLogo,
  DatalayerLogoText,
  DatalayerText,
  DatalayerTextAI,
  FloatingToolbar,
  Overlay,
  Slider,
  ThemedProvider,
  Toolbar,
  useThemeStore,
} from '@datalayer/primer-addons';
import './index.css';

type Demo = {
  id: string;
  title: string;
  description: string;
  render: () => JSX.Element;
};

function AppearanceControlsDemo() {
  const { colorMode, theme, setColorMode, setTheme } = useThemeStore();
  return (
    <AppearanceControls
      colorMode={colorMode}
      themeVariant={theme}
      onColorModeChange={(mode: ColorMode) => setColorMode(mode)}
      onThemeChange={(variant: ThemeVariant) => setTheme(variant, false)}
    />
  );
}

function OverlayDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Heading as="h3" ref={headingRef} sx={{ fontSize: 2 }}>
        Overlay Demo
      </Heading>
      <Button ref={openButtonRef} onClick={() => setIsOpen(true)}>
        Open Overlay
      </Button>
      <Overlay
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        openButtonRef={openButtonRef}
        closeButtonRef={closeButtonRef}
        headingRef={headingRef}
        direction="left"
        content={
          <Box sx={{ width: '100%', p: 2 }}>
            <Text as="p">This is the addon Overlay component.</Text>
            <Text as="p" sx={{ color: 'fg.muted' }}>
              It uses Primer portals and honors the current theme.
            </Text>
          </Box>
        }
      />
    </Box>
  );
}

function ToolbarDemo() {
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
      <Box sx={{ p: 3, border: '1px solid', borderColor: 'border.default' }}>
        <Text>
          Toolbar state: bold={String(bold)}, italic={String(italic)}, format={format}
        </Text>
      </Box>
    </Box>
  );
}

function FloatingToolbarDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'normal' | 'code'>('normal');
  const anchorRef = useRef<HTMLDivElement>(null);

  const items: ToolbarItem[] = [
    {
      key: 'normal',
      type: 'button',
      ariaLabel: 'Normal format',
      label: 'N',
      isActive: selectedFormat === 'normal',
      onClick: () => setSelectedFormat('normal'),
    },
    {
      key: 'code',
      type: 'button',
      ariaLabel: 'Code format',
      label: '<>',
      isActive: selectedFormat === 'code',
      onClick: () => setSelectedFormat('code'),
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

function CardDemo() {
  return (
    <Card border rounded="medium" shadow="medium" sx={{ maxWidth: 520 }}>
      <Card.Header title="Datalayer Card" description="Composable addon component" />
      <Card.Content>
        <Text as="p" sx={{ m: 0 }}>
          The Card API supports header, content, image and action slots.
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button>Action</Button>
      </Card.Actions>
    </Card>
  );
}

function LogoDemo() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4 }}>
      <DatalayerLogo />
      <DatalayerText />
      <DatalayerLogoText />
      <DatalayerTextAI />
      <AI />
      <AI2 />
      <DI />
    </Box>
  );
}

export default function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const persisted = window.localStorage.getItem('datalayer-theme');
    if (persisted) return;
    const { setTheme, setColorMode } = useThemeStore.getState();
    setTheme('earth' as Parameters<typeof setTheme>[0]);
    setColorMode('auto');
  }, []);

  const demos: Demo[] = useMemo(
    () => [
      {
        id: 'AppearanceControlsWithStore',
        title: 'AppearanceControlsWithStore',
        description: 'Theme + color-mode chooser bound to the shared store.',
        render: () => <AppearanceControlsWithStore useStore={useThemeStore} />,
      },
      {
        id: 'AppearanceControls',
        title: 'AppearanceControls',
        description: 'Controlled appearance chooser component.',
        render: () => <AppearanceControlsDemo />,
      },
      {
        id: 'Box',
        title: 'Box',
        description: 'Styled-system enabled layout primitive.',
        render: () => (
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'border.default',
              bg: 'canvas.subtle',
            }}
          >
            <Text>Addon Box with sx styling.</Text>
          </Box>
        ),
      },
      {
        id: 'Card',
        title: 'Card',
        description: 'Composable card with header/content/actions.',
        render: () => <CardDemo />,
      },
      {
        id: 'CloseableFlash',
        title: 'CloseableFlash',
        description: 'Dismissible flash message wrapper.',
        render: () => (
          <CloseableFlash variant="warning">This flash can be dismissed.</CloseableFlash>
        ),
      },
      {
        id: 'ContentLoader',
        title: 'ContentLoader',
        description: 'Skeleton loader utility.',
        render: () => <ContentLoader count={4} />,
      },
      {
        id: 'CircleIcon',
        title: 'CircleIcon',
        description: 'Theme-aware circular icon utility.',
        render: () => (
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <CircleIcon color="accent" />
            <CircleIcon color="#dd2222" />
          </Box>
        ),
      },
      {
        id: 'Overlay',
        title: 'Overlay',
        description: 'Side-mounted overlay panel component.',
        render: () => <OverlayDemo />,
      },
      {
        id: 'Slider',
        title: 'Slider',
        description: 'Lightweight slider input component.',
        render: () => (
          <Slider
            id="example-slider"
            name="example-slider"
            min={0}
            max={100}
            value={40}
            step={5}
            label="Volume"
            onChange={() => undefined}
          />
        ),
      },
      {
        id: 'Logos',
        title: 'Logo Components (AI, AI2, DI, Datalayer*)',
        description: 'All logo and wordmark components.',
        render: () => <LogoDemo />,
      },
      {
        id: 'Toolbar',
        title: 'Toolbar',
        description: 'Extensible fixed toolbar with button/dropdown/divider items.',
        render: () => <ToolbarDemo />,
      },
      {
        id: 'FloatingToolbar',
        title: 'FloatingToolbar',
        description: 'Selection-aware floating toolbar.',
        render: () => <FloatingToolbarDemo />,
      },
    ],
    []
  );

  const [selectedDemoId, setSelectedDemoId] = useState(demos[0].id);
  const selectedDemo = demos.find(demo => demo.id === selectedDemoId) ?? demos[0];

  return (
    <ThemedProvider useStore={useThemeStore}>
      <BaseStyles>
        <div className="example-shell">
          <PrimerBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              px: 3,
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'border.default',
              bg: 'canvas.default',
            }}
          >
            <div>
              <Heading as="h1" sx={{ fontSize: 3, m: 0 }}>
                Primer Addons Example
              </Heading>
              <Text sx={{ color: 'fg.muted' }}>
                Sidebar showcase of addon components.
              </Text>
            </div>
            <AppearanceControlsWithStore useStore={useThemeStore} />
          </PrimerBox>

          <div className="example-main">
            <div className="example-sidebar">
              <NavList aria-label="Primer addon components">
                {demos.map(demo => (
                  <NavList.Item
                    key={demo.id}
                    as="button"
                    type="button"
                    onClick={() => setSelectedDemoId(demo.id)}
                    aria-current={selectedDemoId === demo.id ? 'page' : undefined}
                  >
                    {demo.title}
                  </NavList.Item>
                ))}
              </NavList>
            </div>

            <div className="example-content">
              <Box sx={{ display: 'grid', gap: 3, maxWidth: 920 }}>
                <Box>
                  <Heading as="h2" sx={{ m: 0, mb: 1, fontSize: 3 }}>
                    {selectedDemo.title}
                  </Heading>
                  <Text as="p" sx={{ m: 0, color: 'fg.muted' }}>
                    {selectedDemo.description}
                  </Text>
                </Box>
                <Box sx={{ p: 2, border: '1px solid', borderColor: 'border.default', borderRadius: 2 }}>
                  {selectedDemo.render()}
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </BaseStyles>
    </ThemedProvider>
  );
}