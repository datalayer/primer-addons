<!--
  ~ Copyright (c) 2021-2026 Datalayer, Inc.
  ~
  ~ Distributed under the terms of the Modified BSD License.
-->

# Changelog

Each version names the LOOP boxes it carries — the plan's ids, as its commits say them — and links the section of the README that documents them. The `loop` theme is documented in [The `loop` theme](https://github.com/datalayer/primer-addons/blob/main/README.md#the-loop-theme), and shown in the gallery's *Loop Theme* page.

## 1.0.34

- A provider writes nothing on the page — the body's tokens and mode, the portal root, the portal's stylesheet — before it has read whether it sits inside a themed element, so a nested provider, as an application embedded in another product's page is, never writes its theme on the host's body. LOOP T-13 — [What a host may override](https://github.com/datalayer/primer-addons/blob/main/README.md#what-a-host-may-override).

## 1.0.33

- An application's accent as everything it colours (`loopAccentStyles`): the stage and its tints, the accent fill and the one filled button, its own text on it, tested in both modes. LOOP T-05 — [Accents](https://github.com/datalayer/primer-addons/blob/main/README.md#accents).
- The documentation of the `loop` theme: its accents and how an application names one, the shape, shadow, type and motion tokens, the controls as pills, contrast as tested, what a host may override; the gallery's *Loop Theme* page. LOOP G-04 — [The `loop` theme](https://github.com/datalayer/primer-addons/blob/main/README.md#the-loop-theme).

## 1.0.32

- jsdom a dependency of the package's own, for the theme stylesheet's tests.

## 1.0.31

- A theme may carry a stylesheet of its own, scoped by the provider to its element and to the portal root, stopping at any provider nested inside, removed when the theme changes; `loop`'s controls as one family of pills — buttons, inputs, selects, segmented controls, button groups, toggles, underline tabs. LOOP T-09 — [The controls, as pills](https://github.com/datalayer/primer-addons/blob/main/README.md#the-controls-as-pills).

## 1.0.30

- `loop`: the accent's fill is the soft mint in light mode too, the button's own; a test holds the fill and the button as one pair in both modes. LOOP T-05 — [Accents](https://github.com/datalayer/primer-addons/blob/main/README.md#accents).

## 1.0.29

- `loop`: the filled button in the soft mint with dark text in light mode too, the accent's text a lighter mint (4.6 to 1); the deep mint kept for the focus ring. LOOP T-05, T-15 — [Accents](https://github.com/datalayer/primer-addons/blob/main/README.md#accents), [Contrast, as tested](https://github.com/datalayer/primer-addons/blob/main/README.md#contrast-as-tested).

## 1.0.28

- `loop`: mint as LOOP's own accent again, the soft look kept: the filled button, links and focus ring in the deep mint, 6.5 to 1 (decided 2026-10-03). LOOP T-05 — [Accents](https://github.com/datalayer/primer-addons/blob/main/README.md#accents).

## 1.0.27

- `loop`, softer: a deep-grey ink, faint hairlines, surfaces on soft shadows, rounder, titles set tight; the one filled button in the accent. LOOP T-03, T-05 — [Shape, shadow, type and motion](https://github.com/datalayer/primer-addons/blob/main/README.md#shape-shadow-type-and-motion).

## 1.0.26

- Motion as tokens every theme sets, none unless a theme says so; `loop`'s three durations and easing. LOOP T-10 — [Shape, shadow, type and motion](https://github.com/datalayer/primer-addons/blob/main/README.md#shape-shadow-type-and-motion).

## 1.0.25

- Shape as tokens every theme sets, the eight others proven unchanged; `loop`'s contrast tested, its focus ring and its motion; `loop`'s dark focus ring a mid grey, 3 to 1 around every accent. LOOP T-03, T-15, T-10 — [Shape, shadow, type and motion](https://github.com/datalayer/primer-addons/blob/main/README.md#shape-shadow-type-and-motion), [Contrast, as tested](https://github.com/datalayer/primer-addons/blob/main/README.md#contrast-as-tested).

## 1.0.24

- The `loop` theme: one soft accent, neutral everything else, with six accents and shape tokens, registered as the other themes are. LOOP T-02, T-05, T-03 in part — [The `loop` theme](https://github.com/datalayer/primer-addons/blob/main/README.md#the-loop-theme).
- Depends on reactor 1.0.4; a date picker.
