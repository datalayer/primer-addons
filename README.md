[![Datalayer](https://images.datalayer.io/legacy/datalayer-25.svg)](https://datalayer.ai)

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

## The `loop` theme

`loop` is one of the variants of the theme registry (`ThemeVariant`, `themeConfigs`), beside `datalayer`, `spatial`, `lovely`, `matrix`, `earth`, `sand`, `ivory` and `sun`: the look of an application built in LOOP — **one accent, neutral everything else**. A white (near-black in dark mode) canvas, a deep-grey ink, hairlines, soft shadows, round corners and one filled button in the accent. Success, attention and danger are kept for verdicts and rules only. The [gallery](examples/gallery) shows it on its own page, *Loop Theme*, whatever theme the gallery itself wears.

```tsx
import { DatalayerThemeProvider, loopTheme, loopThemeStyles } from '@datalayer/primer-addons';

<DatalayerThemeProvider theme={loopTheme} themeStyles={loopThemeStyles} colorMode="auto">
  {app}
</DatalayerThemeProvider>
```

The sources: `src/theme/colors/loopColors.ts` (colours and accents), `src/theme/themes/loopTheme.ts` (the theme), `src/theme/css/createThemeCSSVars.ts` (what every theme sets), `src/theme/DatalayerThemeProvider.tsx` and `src/utils/Portals.tsx` (how a theme's stylesheet is applied).

### Accents

Six, and an application takes one. Each is four values — the accent, the text that sits on it, the **stage** (the flat tint behind a hosted application) and a **quiet** tint (the agent's bubble, a draft) — the stage and the quiet tint each with a light and a dark value.

| Name | Accent | Text on it | Stage (light / dark) | Quiet (light / dark) |
|---|---|---|---|---|
| `green` (mint, the default) | `#7ADBB8` | `#06281E` | `#DDF5EC` / `#10261F` | `#F0FAF6` / `#17211D` |
| `rose` | `#F6A5C1` | `#3A0A1C` | `#FCE3EC` / `#2B141C` | `#FDF2F6` / `#22181C` |
| `sky` | `#8CCBF9` | `#06243B` | `#DFF0FD` / `#0F2333` | `#F0F8FE` / `#161E25` |
| `lime` | `#BEDC55` | `#1F2A00` | `#EEF6CC` / `#1E2609` | `#F7FBE6` / `#1C2014` |
| `sun` | `#F8D469` | `#2E2200` | `#FDF3CD` / `#2A2209` | `#FEF9E7` / `#221F14` |
| `violet` | `#C0AEF6` | `#1C0F47` | `#ECE7FD` / `#1B1533` | `#F6F3FE` / `#1C1A27` |

`loopAccents` holds them, `loopAccentNames` lists them in the order a picker shows them, and `loopAccentVars(name, mode)` turns one into the four custom properties an application sets on its root: `--loop-accent`, `--loop-accent-on`, `--loop-stage`, `--loop-quiet`. An unknown name falls back to `green`.

An application names its accent in its Appspec, as `interface.accent` (one of the six names; `green` when it says nothing), and its host applies it:

```tsx
import { loopAccentVars } from '@datalayer/primer-addons';

<DatalayerThemeProvider theme={loopTheme} themeStyles={loopThemeStyles}
  baseStyles={loopAccentVars(app.interface.accent, mode)}>
```

`loopAccentVars` sets the four `--loop-*` properties and nothing else: what reads them (the stage, a bubble drawn with them) takes the application's accent, while Primer's own accent tokens — the filled button, `--bgColor-accent-emphasis` — stay the theme's mint.

### Shape, shadow, type and motion

**Every theme** sets these, so that a component reads its shape the way it reads its colour (`shapeVars`, `DEFAULT_THEME_SHAPE`). The eight other themes take the defaults — today's corners and no motion at all — and keep every other value they had, which `themeShape.test.ts` holds by a snapshot of each.

| Token | Default (every other theme) | `loop` |
|---|---|---|
| `--theme-radius-control` | `var(--borderRadius-medium, 6px)` | `999px` |
| `--theme-radius-card` | `var(--borderRadius-medium, 6px)` | `20px` |
| `--theme-radius-bubble` | `var(--borderRadius-large, 12px)` | `22px` |
| `--theme-radius-frame` | `var(--borderRadius-large, 12px)` | `28px` |
| `--theme-hairline` | `var(--borderWidth-thin, 1px)` | the same |
| `--theme-shadow` | `var(--shadow-resting-small, none)` | the frame's shadow, per mode |
| `--theme-motion-status` | `0ms` | `120ms` |
| `--theme-motion-message` | `0ms` | `200ms` |
| `--theme-motion-pane` | `0ms` | `320ms` |
| `--theme-motion-easing` | `ease` | `cubic-bezier(0.2, 0, 0, 1)` |

**The `loop` theme's own**, beside them (`loopShapeVars`, `loopShadows`, `loopMotionVars`, `loopTypeVars`):

- **Radii**: `--loop-radius-control` (999px), `--loop-radius-card` (20px), `--loop-radius-bubble` (22px), `--loop-radius-frame` (28px); Primer's own `--borderRadius-small`, `-medium`, `-large` are made rounder (10, 14, 20px).
- **The face** of an application, at three sizes and no other: `--loop-face-large` (72px, a page), `--loop-face-medium` (40px, a header or a card), `--loop-face-small` (20px, a line of a list).
- **Shadow**: one level, `--loop-shadow-frame`. In light mode a surface floats on a soft, low shadow; in dark mode, where a shadow shows little, on a hairline of light and a deeper shadow. Primer's `--shadow-resting-*` and `--shadow-floating-*` take the same hand, so a menu or a dialog floats as a frame does. `--loop-hairline` is the line between two surfaces (7% of the ink in light, 10% of white in dark).
- **Motion**: three durations for three things — `--loop-motion-status` (a status changing), `--loop-motion-message` (a message arriving), `--loop-motion-pane` (a pane opening) — and one easing, `--loop-motion-easing`. Nothing else moves; a component honours `prefers-reduced-motion` itself.
- **Type**: one face, Inter, then the system sans-serif (`loopFontFamily`); two weights, 400 and 600. The titles are set tighter (`--text-display-shorthand` 2.75rem/1.15 down to `--text-title-shorthand-small` 1rem/1.4) and the tracking is a token a component applies: `--loop-tracking-display` (-0.02em), `--loop-tracking-title` (-0.012em), `--loop-tracking-body` (0). The package does not ship the face: a page that has not loaded Inter shows the system face, and nothing but the letterforms changes.
- **Space**: no scale of its own — Primer's, in steps of 4 and 8 (`sx` 1 to 6 are 4, 8, 16, 24, 32, 40px), and the air of the look comes from where it is spent: a frame 24px from the edge of its stage, 16px inside a conversation (the header, the messages, the composer), 24px around a pane of work, 8px between two pills, and one hairline (`--theme-hairline`) where two surfaces meet instead of a gap and a border.
- **The stage, lit**: `--loop-stage-gradient`, from the stage tint at the top to the quiet tint at the bottom, both the accent's.
- **The focus ring**: `--focus-outlineColor`, the deep mint `#0F6B4F` in light mode and a mid grey `#636363` in dark mode.

### The reference screens

The tokens above are drawn together on four reference screens (LOOP T-01) — **a conversation**, **a conversation beside its work**, **the activity of a worker** and **an approval** — each in the nine themes of the registry and in both modes. They are built from the real chat components of `@datalayer/agent-runtimes`, which depends on this package, so they live there: as stories (`src/stories/loop/LoopReference.stories.tsx`, *Loop/Reference screens*) and as pictures that a test compares in Chrome (`npm run test:pictures` in agent-runtimes, T-16; `TESTING.md` there says how to run it and how to accept a change). A change of token here shows there as a picture that differs: accept it, or fix it.

### The controls, as pills

Every Primer control takes its corners from one token, `--borderRadius-medium`, which cards and list items take too — so "the controls alone are pills" cannot be said with a custom property. A theme may therefore carry **a stylesheet of its own**, `ThemeStyles.css`, written relative to `:scope` (`buildThemeStyles(light, dark, { css })`). `loop` is the only theme that has one (`loopControlsCss`): buttons, text inputs, selects, segmented controls, button groups (their two ends), toggle switches and underline tabs are pills; a multi-line text area keeps `--borderRadius-medium`, and menus and overlays keep the card's radius. The selectors match the stable prefixes of Primer's class names (`loopControlsSelectors`), and a test reads each back from the installed `@primer/react`, so an upgrade that renames one fails the build.

How `DatalayerThemeProvider` applies it:

- It stamps its own element with a unique `data-datalayer-theme-scope` and injects one `<style data-datalayer-theme-stylesheet>` into the document's head, wrapping the theme's stylesheet in `@scope (<its element>) to (<any other provider's element>)` — so the rules stop at a provider nested inside, and a widget in its own theme keeps its shapes (`scopeThemeCss`, `injectThemeStylesheet`).
- The **outermost** provider owns Primer's portal root (`__primerPortalRoot__`, where menus, overlays and dialogs are drawn) and scopes the stylesheet to it too; a nested provider leaves the portal root alone.
- The stylesheet is removed when the theme changes and when the provider unmounts; it is injected in a layout effect, so the first paint is already in the theme's shapes. A theme without one gets nothing injected.

`themeStylesheet.test.tsx` tests each of these.

### Contrast, as tested

`src/theme/__tests__/loopContrast.test.ts` fails the build when, for any of the six accents, in either mode:

- the text on a bubble and on a filled pill (the accent's `on` on the accent) is under **4.5 to 1** (WCAG AA for body text);
- the ink on the stage or on the quiet tint, light and dark, is under 4.5 to 1;
- the focus ring is under **3 to 1** against the page or around a pill of any accent — but on the subtle dark surface, the one place the dark ring falls short, where it holds 2.7 to 1;
- the filled button — rest, hovered, pressed — or the accent's text on white is under 4.5 to 1, or the accent's fill and the filled button stop being one colour;
- the secondary text is under 4.5 to 1 on white or on near-black.

The same test holds the motion to three durations and one easing.

### What a host may override

Today a host overrides through the provider: `baseStyles` is merged on top of the theme's properties, so it may set an accent (`loopAccentVars`), or any `--loop-*` or `--theme-*` property, for the element and — for the outermost provider — the portal root; and it may pass a theme of its own to `themeStyles`, built with `buildThemeStyles`. A person's choice in an appearance menu (`useThemeStore`) is the host's to honour.

**Not built yet** (LOOP T-13): the theme travelling inside an embedded application's web component as CSS variables isolated from the host page's styles, with the accent, the face and the mode as the only things the host overrides. Until then an embedded application is themed as any React tree under `DatalayerThemeProvider` is, and the host page's own CSS is not kept out.

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

What each version brought, with the LOOP boxes it carries, is in the [changelog](CHANGELOG.md).
