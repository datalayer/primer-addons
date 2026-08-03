import type { Demo } from './Demo';
import { AppearanceControlsWithStoreDemo } from './AppearanceControlsWithStoreDemo';
import { AppearanceControlsDemo } from './AppearanceControlsDemo';
import { ColorModeCircleDemo } from './ColorModeCircleDemo';
import { ThemeCircleDemo } from './ThemeCircleDemo';
import { BoxDemo } from './BoxDemo';
import { CardDemo } from './CardDemo';
import { CloseableFlashDemo } from './CloseableFlashDemo';
import { ContentLoaderDemo } from './ContentLoaderDemo';
import { CircleIconDemo } from './CircleIconDemo';
import { ColorPaletteDemo } from './ColorPaletteDemo';
import { SlidingPanelDemo } from './SlidingPanelDemo';
import { SideOverlayDemo } from './SideOverlayDemo';
import { PortalOverlayDemo } from './PortalOverlayDemo';
import { SliderDemo } from './SliderDemo';
import { LogoDemo } from './LogoDemo';
import { ToolbarDemo } from './ToolbarDemo';
import { FloatingToolbarDemo } from './FloatingToolbarDemo';

export const demos: Demo[] = [
  {
    slug: 'appearance-controls-with-store',
    title: 'Appearance Controls With Store',
    description: 'Theme + color-mode chooser bound to the shared store.',
    render: () => <AppearanceControlsWithStoreDemo />,
  },
  {
    slug: 'appearance-controls',
    title: 'Appearance Controls',
    description: 'Controlled appearance chooser component.',
    render: () => <AppearanceControlsDemo />,
  },
  {
    slug: 'color-mode-circle',
    title: 'Color Mode Circle',
    description: 'Single circle that cycles light / dark / system color modes.',
    render: () => <ColorModeCircleDemo />,
  },
  {
    slug: 'theme-circle',
    title: 'Theme Circle',
    description: 'Single circle that cycles through the registered theme variants.',
    render: () => <ThemeCircleDemo />,
  },
  {
    slug: 'box',
    title: 'Box',
    description: 'Styled-system enabled layout primitive.',
    render: () => <BoxDemo />,
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
    render: () => <CloseableFlashDemo />,
  },
  {
    slug: 'content-loader',
    title: 'Content Loader',
    description: 'Skeleton loader utility.',
    render: () => <ContentLoaderDemo />,
  },
  {
    slug: 'circle-icon',
    title: 'Circle Icon',
    description: 'Theme-aware circular icon utility.',
    render: () => <CircleIconDemo />,
  },
  {
    slug: 'color-palette',
    title: 'Color Palette',
    description: 'Primer primitive scales and semantic color tokens.',
    render: () => <ColorPaletteDemo />,
  },
  {
    slug: 'sliding-panel',
    title: 'Sliding Panel',
    description: 'Directional sliding overlay (north/south/west/east) with variants and timing.',
    render: () => <SlidingPanelDemo />,
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
    render: () => <SliderDemo />,
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
];
