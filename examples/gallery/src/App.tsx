import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box as PrimerBox, Button, Heading, NavList, Text, TextInput } from '@primer/react';
import { AppearanceControlsWithStore, Box, Card, ThemedProvider, useThemeStore } from '@datalayer/primer-addons';
import { demos } from './components/demos';
import './index.css';

const GALLERY_SLUG = 'gallery';

const slugToPath = (slug: string) => (slug === GALLERY_SLUG ? '/' : `/${slug}`);

const pathToSlug = (pathname: string) => {
  const normalized = pathname.replace(/^\/+|\/+$/g, '');
  return normalized === '' ? GALLERY_SLUG : normalized;
};


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