import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box as PrimerBox,
  Button,
  Heading,
  NavList,
  Text,
  TextInput,
  ActionMenu,
  ActionList,
  AnchoredOverlay,
  Overlay as PrimerOverlay,
  Label,
} from '@primer/react';
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  LinkIcon,
} from '@primer/octicons-react';
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
  SideOverlay,
  Slider,
  ThemedProvider,
  Toolbar,
  useThemeStore,
} from '@datalayer/primer-addons';
import './index.css';

type Demo = {
  slug: string;
  title: string;
  description: string;
  render: () => JSX.Element;
};

const GALLERY_SLUG = 'gallery';

const slugToPath = (slug: string) => (slug === GALLERY_SLUG ? '/' : `/${slug}`);

const pathToSlug = (pathname: string) => {
  const normalized = pathname.replace(/^\/+|\/+$/g, '');
  return normalized === '' ? GALLERY_SLUG : normalized;
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

function SideOverlayDemo() {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const openLeftButtonRef = useRef<HTMLButtonElement>(null);
  const openRightButtonRef = useRef<HTMLButtonElement>(null);
  const closeLeftButtonRef = useRef<HTMLButtonElement>(null);
  const closeRightButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Heading as="h3" sx={{ fontSize: 2 }}>
        Side Overlay
      </Heading>
      <Text as="p" sx={{ color: 'fg.muted', m: 0 }}>
        Open each variant to verify left and right behavior. These overlays start
        at the top of the viewport and span the full window height.
      </Text>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button ref={openLeftButtonRef} onClick={() => setIsLeftOpen(true)}>
          Open Left Variant
        </Button>
        <Button ref={openRightButtonRef} onClick={() => setIsRightOpen(true)}>
          Open Right Variant
        </Button>
      </Box>
      <SideOverlay
        isOpen={isLeftOpen}
        setIsOpen={setIsLeftOpen}
        openButtonRef={openLeftButtonRef}
        closeButtonRef={closeLeftButtonRef}
        direction="left"
        width="440px"
        content={
          <Box sx={{ width: '100%', p: 2, overflow: 'auto' }}>
            <Heading as="h4" sx={{ fontSize: 2, mb: 2 }}>
              Left Side Overlay
            </Heading>
            <Text as="p" sx={{ color: 'fg.muted' }}>
              This panel is attached to the left edge and spans the full viewport height.
            </Text>
            <Text as="p">Try toggling theme controls while this overlay is open.</Text>
          </Box>
        }
      />
      <SideOverlay
        isOpen={isRightOpen}
        setIsOpen={setIsRightOpen}
        openButtonRef={openRightButtonRef}
        closeButtonRef={closeRightButtonRef}
        direction="right"
        width="440px"
        content={
          <Box sx={{ width: '100%', p: 2, overflow: 'auto' }}>
            <Heading as="h4" sx={{ fontSize: 2, mb: 2 }}>
              Right Side Overlay
            </Heading>
            <Text as="p" sx={{ color: 'fg.muted' }}>
              This panel is attached to the right edge and spans the full viewport height.
            </Text>
            <Text as="p">Use this variant for property panels and side inspectors.</Text>
          </Box>
        }
      />
    </Box>
  );
}

function PortalOverlayDemo() {
  const [open, setOpen] = useState(false);
  const [primerOpen, setPrimerOpen] = useState(false);
  const primerButtonRef = useRef<HTMLButtonElement>(null);
  const [primerCoords, setPrimerCoords] = useState({ top: 0, left: 0 });

  const openPrimerOverlay = () => {
    const rect = primerButtonRef.current?.getBoundingClientRect();
    if (rect) {
      // The Primer portal root is `position: relative`, so the base Overlay is
      // positioned absolutely relative to it. Compute coordinates relative to
      // that portal root (both rects are viewport-based, so scroll is handled).
      const portalRoot = document.getElementById('__primerPortalRoot__');
      const portalRect = portalRoot?.getBoundingClientRect();
      setPrimerCoords({
        top: rect.bottom - (portalRect?.top ?? 0) + 4,
        left: rect.left - (portalRect?.left ?? 0),
      });
    }
    setPrimerOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Text as="p" sx={{ color: 'fg.muted', m: 0 }}>
        These overlays render through Primer portals (outside the React tree, as a
        child of <code>&lt;body&gt;</code>). Use them to verify the active theme —
        colors, fonts and borders — is followed inside portaled content.
      </Text>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
        {/* ActionMenu: portaled overlay with an ActionList (like "Create New"). */}
        <ActionMenu>
          <ActionMenu.Anchor>
            <Button>Open ActionMenu</Button>
          </ActionMenu.Anchor>
          <ActionMenu.Overlay width="medium" sx={{ mt: '2px' }}>
            <ActionList>
              <ActionList.Item>
                New Notebook
                <ActionList.Description variant="block">
                  Create a themed notebook document.
                </ActionList.Description>
              </ActionList.Item>
              <ActionList.Item>
                New Dataset
                <ActionList.Description variant="block">
                  Add a dataset to the current space.
                </ActionList.Description>
              </ActionList.Item>
              <ActionList.Divider />
              <ActionList.Item variant="danger">Delete</ActionList.Item>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>

        {/* AnchoredOverlay: portaled free-form panel (like the cart overlay). */}
        <AnchoredOverlay
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderAnchor={anchorProps => (
            <Button {...anchorProps}>Open AnchoredOverlay</Button>
          )}
        >
          <Box sx={{ p: 3, width: 260, display: 'grid', gap: 2 }}>
            <Text sx={{ fontWeight: 'bold' }}>Shopping cart</Text>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
              <Text>Neon Harbor</Text>
              <Text sx={{ color: 'fg.muted' }}>× 1</Text>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 3,
                pt: 2,
                mt: 1,
                borderTop: '1px solid',
                borderColor: 'var(--borderColor-default)',
                fontWeight: 'bold',
              }}
            >
              <Text>Total</Text>
              <Text>$0.99</Text>
            </Box>
            <Label variant="accent">Themed portal content</Label>
          </Box>
        </AnchoredOverlay>

        {/* Base Primer Overlay: low-level portaled surface from @primer/react. */}
        <Button ref={primerButtonRef} onClick={openPrimerOverlay}>
          Open Primer Overlay
        </Button>
        {primerOpen && (
          <PrimerOverlay
            returnFocusRef={primerButtonRef}
            ignoreClickRefs={[primerButtonRef]}
            onEscape={() => setPrimerOpen(false)}
            onClickOutside={() => setPrimerOpen(false)}
            top={primerCoords.top}
            left={primerCoords.left}
          >
            <Box sx={{ p: 3, width: 240, display: 'grid', gap: 2 }}>
              <Text sx={{ fontWeight: 'bold' }}>Base Primer Overlay</Text>
              <Text sx={{ color: 'fg.muted' }}>
                Low-level portaled surface from <code>@primer/react</code>.
              </Text>
              <Label variant="accent">Themed portal content</Label>
            </Box>
          </PrimerOverlay>
        )}
      </Box>
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
      <Box sx={{ p: 3, border: '1px solid', borderColor: 'var(--borderColor-default)' }}>
        <Text>
          Toolbar state: bold={String(bold)}, italic={String(italic)}, format={format}
        </Text>
      </Box>
    </Box>
  );
}

function FloatingToolbarDemo() {
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
    setFormats((prev) => ({ ...prev, [key]: !prev[key] }));

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
  const { theme, colorMode } = useThemeStore();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
      <DatalayerLogo variant={theme} colorMode={colorMode} />
      <DatalayerText />
      <DatalayerLogoText variant={theme} colorMode={colorMode} />
      <DatalayerTextAI variant={theme} colorMode={colorMode} />
      <AI variant={theme} colorMode={colorMode} />
      <AI2 variant={theme} colorMode={colorMode} />
      <DI variant={theme} colorMode={colorMode} />
    </Box>
  );
}

export default function App() {
  const searchInputRef = useRef<HTMLInputElement>(null);

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
        slug: 'appearance-controls-with-store',
        title: 'Appearance Controls With Store',
        description: 'Theme + color-mode chooser bound to the shared store.',
        render: () => <AppearanceControlsWithStore useStore={useThemeStore} />,
      },
      {
        slug: 'appearance-controls',
        title: 'Appearance Controls',
        description: 'Controlled appearance chooser component.',
        render: () => <AppearanceControlsDemo />,
      },
      {
        slug: 'box',
        title: 'Box',
        description: 'Styled-system enabled layout primitive.',
        render: () => (
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'var(--borderColor-default)',
              bg: 'canvas.subtle',
            }}
          >
            <Text>Addon Box with sx styling.</Text>
          </Box>
        ),
      },
      {
        slug: 'card',
        title: 'Card',
        description: 'Composable card with header/content/actions.',
        render: () => <CardDemo />,
      },
      {
        slug: 'closeable-flash',
        title: 'Closeable Flash',
        description: 'Dismissible flash message wrapper.',
        render: () => (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <CloseableFlash variant="default">Default flash message.</CloseableFlash>
            <CloseableFlash variant="success">Success flash message.</CloseableFlash>
            <CloseableFlash variant="warning">Warning flash message.</CloseableFlash>
            <CloseableFlash variant="danger">Danger flash message.</CloseableFlash>
          </Box>
        ),
      },
      {
        slug: 'content-loader',
        title: 'Content Loader',
        description: 'Skeleton loader utility.',
        render: () => <ContentLoader count={4} />,
      },
      {
        slug: 'circle-icon',
        title: 'Circle Icon',
        description: 'Theme-aware circular icon utility.',
        render: () => (
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <CircleIcon color="accent" />
            <CircleIcon color="#dd2222" />
          </Box>
        ),
      },
      {
        slug: 'side-overlay',
        title: 'Side Overlay',
        description: 'Side-mounted overlay panel component.',
        render: () => <SideOverlayDemo />,
      },
      {
        slug: 'portal-overlay',
        title: 'Portal Overlay',
        description: 'ActionMenu + AnchoredOverlay rendered via Primer portals.',
        render: () => <PortalOverlayDemo />,
      },
      {
        slug: 'slider',
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
        slug: 'logos',
        title: 'Logos',
        description: 'All logo and wordmark components.',
        render: () => <LogoDemo />,
      },
      {
        slug: 'toolbar',
        title: 'Toolbar',
        description: 'Extensible fixed toolbar with button/dropdown/divider items.',
        render: () => <ToolbarDemo />,
      },
      {
        slug: 'floating-toolbar',
        title: 'Floating Toolbar',
        description: 'Selection-aware floating toolbar.',
        render: () => <FloatingToolbarDemo />,
      },
    ],
    [],
  );

  const [activeSlug, setActiveSlug] = useState(() =>
    pathToSlug(window.location.pathname),
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handlePopstate = () => {
      setActiveSlug(pathToSlug(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }
      if (activeSlug !== GALLERY_SLUG) {
        window.history.pushState({}, '', '/');
        setActiveSlug(GALLERY_SLUG);
      }
      event.preventDefault();
      searchInputRef.current?.focus();
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [activeSlug]);

  const navigate = useCallback((slug: string) => {
    const nextPath = slugToPath(slug);
    if (nextPath === window.location.pathname) {
      return;
    }
    window.history.pushState({}, '', nextPath);
    setActiveSlug(slug);
  }, []);

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
  }, [demos, search]);

  const navDemos = useMemo(
    () => [...demos].sort((a, b) => a.title.localeCompare(b.title)),
    [demos],
  );

  const activeDemo = demos.find(demo => demo.slug === activeSlug);

  const renderContent = () => {
    if (activeSlug === GALLERY_SLUG || !activeDemo) {
      return (
        <Box sx={{ display: 'grid', gap: 3 }}>
          <Box>
            <Heading as="h2" sx={{ m: 0, mb: 1, fontSize: 3 }}>
              Gallery
            </Heading>
            <Text as="p" sx={{ m: 0, color: 'fg.muted' }}>
              Browse all components. Use search, then open any component page.
            </Text>
          </Box>
          <Box className="gallery-toolbar">
            <TextInput
              ref={searchInputRef}
              placeholder="Search components..."
              value={search}
              onChange={event => setSearch(event.target.value)}
              sx={{ width: ['100%', '360px'] }}
              aria-label="Search gallery components"
            />
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
      <Box sx={{ display: 'grid', gap: 3, maxWidth: 980 }}>
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
            borderColor: 'var(--borderColor-default)',
            borderRadius: 2,
          }}
        >
          {activeDemo.render()}
        </Box>
      </Box>
    );
  };

  return (
    <ThemedProvider useStore={useThemeStore}>
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
              borderColor: 'var(--borderColor-default)',
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
                <NavList.Item
                  as="button"
                  type="button"
                  onClick={() => navigate(GALLERY_SLUG)}
                  aria-current={activeSlug === GALLERY_SLUG ? 'page' : undefined}
                >
                  Gallery
                </NavList.Item>
                <NavList.Divider />
                {navDemos.map(demo => (
                  <NavList.Item
                    key={demo.slug}
                    as="button"
                    type="button"
                    onClick={() => navigate(demo.slug)}
                    aria-current={activeSlug === demo.slug ? 'page' : undefined}
                  >
                    {demo.title}
                  </NavList.Item>
                ))}
              </NavList>
            </div>

            <div className="example-content">
              {renderContent()}
            </div>
          </div>
        </div>
    </ThemedProvider>
  );
}