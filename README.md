[![Datalayer](https://assets.datalayer.tech/datalayer-25.svg)](https://datalayer.io)

[![Become a Sponsor](https://img.shields.io/static/v1?label=Become%20a%20Sponsor&message=%E2%9D%A4&logo=GitHub&style=flat&color=1ABC9C)](https://github.com/sponsors/datalayer)

# ⚛️ ➕ Primer Addons

> Additional components for Primer React.

This repository contains additional React.js components for the [@primer/react](https://github.com/primer/react) toolkit. The components are compliant with the Primer theming framework and aims to respect the [Primer design system](https://primer.style).

A Storybook showcasing the components and their options is available on https://primer-addons.datalayer.tech.

This project has been [shared in a discussion](https://github.com/primer/react/discussions/3297) on the Primer React main repository.

## Current Addons

- [ ] Backdrop
- [ ] Brand Header
- [ ] Brand Header Lines
- [ ] Brand Footer
- [x] Content Loader
- [x] Card
- [x] Closable Flash
- [ ] Masonry Box
- [x] Slider
- [x] Toolbar

## Reactor Plugins

Three plugins for hosts built on [`@datalayer/reactor`](https://github.com/datalayer/reactor), imported by path so a page without a reactor never pulls it in:

```ts
import { AppearancePlugin, PageLayoutPlugin, ThemePlugin } from '@datalayer/primer-addons/lib/reactor';
```

- `ThemePlugin` keeps Primer's portals in the application's color mode and toggles that mode by command (`Mod+Alt+C`).
- `AppearancePlugin` puts the appearance menu — color mode, theme, the theme's description and a preview of it, the control the Datalayer header wears — in a slot, `header` by default, and brings `ThemePlugin` along as a dependency.
- `PageLayoutPlugin` arranges a host's slots as a page: what plugins put in `page` lies on a centred sheet over a quiet canvas, `page-band` is docked above it at the sheet's width (or floats over it as a card), `page-chips` sit under the band, and `page-panel` is a side panel opened from a toggle in the header. The layout (`PageLayout`), its toggle and its signals (`pageLayoutPanelOpen`, `openPagePanel()`…) are exported too, for a host that wires the parts itself — the Loop of `@datalayer/agent-runtimes` does, with the notebook as the page and the conversation as the panel.

The [gallery example](examples/gallery) is a Reactor app built on the three: `npm run gallery`.

<div align="center" style="text-align: center">
  <img alt="Primer React Addons" src="https://assets.datalayer.tech/primer-addons-example.png" />
</div>

## Develop

Install the dependencies.

```bash
npm i
```

Start the storybook.

```bash
npm run storybook
```

Start the playground.

```bash
npm dev
```

## About Primer Design

- Design system https://primer.style

## About Primer Icons

- Icons https://primer.style/design/foundations/icons

## About Primer React

- GitHub repository https://github.com/primer/react
- Documentation https://primer.style/react
- Storybook https://primer.style/react/storybook

## About Primer Brand

- GitHub repository https://github.com/primer/brand
- Documentation https://primer.style/brand
- Storybook https://primer.style/brand/storybook

## Releases

Primer Addons is released in [Npm.js](https://www.npmjs.com/package/@datalayer/primer-addons).
