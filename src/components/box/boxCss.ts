/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * What `Box` draws with: its style props resolved to CSS, one class per
 * style, and the stylesheet the classes go into. No styled-components; see
 * `Box.tsx` for the design.
 */

import {
  BOX_BORDER_WIDTHS,
  BOX_BREAKPOINTS,
  BOX_COLOR_VARS,
  BOX_FONT_SIZES,
  BOX_FONT_VARS,
  BOX_FONT_WEIGHT_VARS,
  BOX_LINE_HEIGHTS,
  BOX_RADII,
  BOX_RADIUS_VARS,
  BOX_SHADOW_VARS,
  BOX_SIZES,
  BOX_SPACE,
  type BoxColorToken,
  type BoxRadiusToken,
  type BoxShadowToken,
} from './boxTokens';

/* ── The props ───────────────────────────────────────────────────────── */

/** How a prop's value is read: which of Primer's scales, if any. */
export type BoxScale =
  | 'space'
  | 'signedSpace'
  | 'color'
  | 'radius'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'font'
  | 'shadow'
  | 'size'
  | 'borderWidth'
  | 'raw'
  | 'unitless';

const prop = <S extends BoxScale = 'raw'>(css: string | string[], scale?: S) => ({
  css: Array.isArray(css) ? css : [css],
  scale: (scale ?? 'raw') as S,
});

/**
 * Every style prop: its CSS properties and its scale. The names are
 * Primer's (styled-system's), so `<Box p={3} bg="canvas.subtle">` reads as
 * it always did; an `sx` key of the same name moves to the prop unchanged.
 */
export const BOX_STYLE_PROPS = {
  /* Space */
  m: prop('margin', 'signedSpace'),
  mt: prop('margin-top', 'signedSpace'),
  mr: prop('margin-right', 'signedSpace'),
  mb: prop('margin-bottom', 'signedSpace'),
  ml: prop('margin-left', 'signedSpace'),
  mx: prop(['margin-left', 'margin-right'], 'signedSpace'),
  my: prop(['margin-top', 'margin-bottom'], 'signedSpace'),
  margin: prop('margin', 'signedSpace'),
  marginTop: prop('margin-top', 'signedSpace'),
  marginRight: prop('margin-right', 'signedSpace'),
  marginBottom: prop('margin-bottom', 'signedSpace'),
  marginLeft: prop('margin-left', 'signedSpace'),
  marginX: prop(['margin-left', 'margin-right'], 'signedSpace'),
  marginY: prop(['margin-top', 'margin-bottom'], 'signedSpace'),
  p: prop('padding', 'space'),
  pt: prop('padding-top', 'space'),
  pr: prop('padding-right', 'space'),
  pb: prop('padding-bottom', 'space'),
  pl: prop('padding-left', 'space'),
  px: prop(['padding-left', 'padding-right'], 'space'),
  py: prop(['padding-top', 'padding-bottom'], 'space'),
  padding: prop('padding', 'space'),
  paddingTop: prop('padding-top', 'space'),
  paddingRight: prop('padding-right', 'space'),
  paddingBottom: prop('padding-bottom', 'space'),
  paddingLeft: prop('padding-left', 'space'),
  paddingX: prop(['padding-left', 'padding-right'], 'space'),
  paddingY: prop(['padding-top', 'padding-bottom'], 'space'),
  paddingBlock: prop('padding-block', 'space'),
  paddingInline: prop('padding-inline', 'space'),
  gap: prop('gap', 'space'),
  rowGap: prop('row-gap', 'space'),
  columnGap: prop('column-gap', 'space'),
  gridGap: prop('gap', 'space'),
  gridRowGap: prop('row-gap', 'space'),
  gridColumnGap: prop('column-gap', 'space'),
  scrollMarginTop: prop('scroll-margin-top'),

  /* Colour */
  color: prop('color', 'color'),
  bg: prop('background-color', 'color'),
  backgroundColor: prop('background-color', 'color'),
  fill: prop('fill', 'color'),
  stroke: prop('stroke', 'color'),
  outlineColor: prop('outline-color', 'color'),
  opacity: prop('opacity', 'unitless'),
  background: prop('background'),
  backgroundImage: prop('background-image'),
  backgroundSize: prop('background-size'),
  backgroundPosition: prop('background-position'),
  backgroundRepeat: prop('background-repeat'),

  /* Border */
  border: prop('border'),
  borderTop: prop('border-top'),
  borderRight: prop('border-right'),
  borderBottom: prop('border-bottom'),
  borderLeft: prop('border-left'),
  borderX: prop(['border-left', 'border-right']),
  borderY: prop(['border-top', 'border-bottom']),
  borderColor: prop('border-color', 'color'),
  borderTopColor: prop('border-top-color', 'color'),
  borderRightColor: prop('border-right-color', 'color'),
  borderBottomColor: prop('border-bottom-color', 'color'),
  borderLeftColor: prop('border-left-color', 'color'),
  borderWidth: prop('border-width', 'borderWidth'),
  borderTopWidth: prop('border-top-width', 'borderWidth'),
  borderRightWidth: prop('border-right-width', 'borderWidth'),
  borderBottomWidth: prop('border-bottom-width', 'borderWidth'),
  borderLeftWidth: prop('border-left-width', 'borderWidth'),
  borderStyle: prop('border-style'),
  borderTopStyle: prop('border-top-style'),
  borderRightStyle: prop('border-right-style'),
  borderBottomStyle: prop('border-bottom-style'),
  borderLeftStyle: prop('border-left-style'),
  borderRadius: prop('border-radius', 'radius'),
  borderTopLeftRadius: prop('border-top-left-radius', 'radius'),
  borderTopRightRadius: prop('border-top-right-radius', 'radius'),
  borderBottomLeftRadius: prop('border-bottom-left-radius', 'radius'),
  borderBottomRightRadius: prop('border-bottom-right-radius', 'radius'),
  borderCollapse: prop('border-collapse'),
  borderSpacing: prop('border-spacing'),
  outline: prop('outline'),
  outlineOffset: prop('outline-offset'),
  boxShadow: prop('box-shadow', 'shadow'),
  textShadow: prop('text-shadow', 'shadow'),

  /* Layout */
  display: prop('display'),
  width: prop('width', 'size'),
  height: prop('height', 'size'),
  minWidth: prop('min-width', 'size'),
  maxWidth: prop('max-width', 'size'),
  minHeight: prop('min-height', 'size'),
  maxHeight: prop('max-height', 'size'),
  size: prop(['width', 'height'], 'size'),
  overflow: prop('overflow'),
  overflowX: prop('overflow-x'),
  overflowY: prop('overflow-y'),
  overscrollBehavior: prop('overscroll-behavior'),
  overscrollBehaviorY: prop('overscroll-behavior-y'),
  scrollbarWidth: prop('scrollbar-width'),
  scrollbarGutter: prop('scrollbar-gutter'),
  verticalAlign: prop('vertical-align'),
  boxSizing: prop('box-sizing'),
  aspectRatio: prop('aspect-ratio', 'unitless'),
  visibility: prop('visibility'),
  objectFit: prop('object-fit'),
  objectPosition: prop('object-position'),
  float: prop('float'),
  isolation: prop('isolation'),
  tableLayout: prop('table-layout'),

  /* Flex */
  flex: prop('flex', 'unitless'),
  flexDirection: prop('flex-direction'),
  flexWrap: prop('flex-wrap'),
  flexFlow: prop('flex-flow'),
  flexGrow: prop('flex-grow', 'unitless'),
  flexShrink: prop('flex-shrink', 'unitless'),
  flexBasis: prop('flex-basis', 'size'),
  alignItems: prop('align-items'),
  alignContent: prop('align-content'),
  alignSelf: prop('align-self'),
  justifyContent: prop('justify-content'),
  justifyItems: prop('justify-items'),
  justifySelf: prop('justify-self'),
  placeItems: prop('place-items'),
  placeContent: prop('place-content'),
  placeSelf: prop('place-self'),
  order: prop('order', 'unitless'),

  /* Grid */
  gridTemplate: prop('grid-template'),
  gridTemplateColumns: prop('grid-template-columns'),
  gridTemplateRows: prop('grid-template-rows'),
  gridTemplateAreas: prop('grid-template-areas'),
  gridColumn: prop('grid-column', 'unitless'),
  gridRow: prop('grid-row', 'unitless'),
  gridColumnStart: prop('grid-column-start', 'unitless'),
  gridColumnEnd: prop('grid-column-end', 'unitless'),
  gridRowStart: prop('grid-row-start', 'unitless'),
  gridRowEnd: prop('grid-row-end', 'unitless'),
  gridArea: prop('grid-area', 'unitless'),
  gridAutoFlow: prop('grid-auto-flow'),
  gridAutoColumns: prop('grid-auto-columns'),
  gridAutoRows: prop('grid-auto-rows'),

  /* Position */
  position: prop('position'),
  zIndex: prop('z-index', 'unitless'),
  top: prop('top', 'signedSpace'),
  right: prop('right', 'signedSpace'),
  bottom: prop('bottom', 'signedSpace'),
  left: prop('left', 'signedSpace'),
  inset: prop('inset'),

  /* Typography */
  fontFamily: prop('font-family', 'font'),
  fontSize: prop('font-size', 'fontSize'),
  fontWeight: prop('font-weight', 'fontWeight'),
  fontStyle: prop('font-style'),
  fontVariantNumeric: prop('font-variant-numeric'),
  lineHeight: prop('line-height', 'lineHeight'),
  letterSpacing: prop('letter-spacing'),
  textAlign: prop('text-align'),
  whiteSpace: prop('white-space'),
  textDecoration: prop('text-decoration'),
  textUnderlineOffset: prop('text-underline-offset'),
  textTransform: prop('text-transform'),
  textOverflow: prop('text-overflow'),
  textWrap: prop('text-wrap'),
  wordBreak: prop('word-break'),
  overflowWrap: prop('overflow-wrap'),
  wordWrap: prop('word-wrap'),
  WebkitLineClamp: prop('-webkit-line-clamp', 'unitless'),
  WebkitBoxOrient: prop('-webkit-box-orient'),
  listStyle: prop('list-style'),
  listStyleType: prop('list-style-type'),
  listStylePosition: prop('list-style-position'),

  /* Effects and interaction */
  cursor: prop('cursor'),
  pointerEvents: prop('pointer-events'),
  userSelect: prop('user-select'),
  appearance: prop('appearance'),
  transition: prop('transition'),
  transform: prop('transform'),
  transformOrigin: prop('transform-origin'),
  animation: prop('animation'),
  animationDelay: prop('animation-delay'),
  filter: prop('filter'),
  backdropFilter: prop('backdrop-filter'),
  mixBlendMode: prop('mix-blend-mode'),
  willChange: prop('will-change'),
  clipPath: prop('clip-path'),
  resize: prop('resize'),
} as const;

export type BoxStyleKey = keyof typeof BOX_STYLE_PROPS;

/** The pseudo-state props: each takes a style object of the style props. */
export const BOX_PSEUDO_PROPS = {
  hover: ':hover',
  focus: ':focus',
  focusVisible: ':focus-visible',
  focusWithin: ':focus-within',
  active: ':active',
} as const;

export type BoxPseudoKey = keyof typeof BOX_PSEUDO_PROPS;

/** Styles for the reader who asked for less motion. */
export const BOX_REDUCED_MOTION = '@media (prefers-reduced-motion: reduce)';

/* ── The types ───────────────────────────────────────────────────────── */

/** A value, or one per breakpoint (Primer's: 544, 768, 1012, 1280px). */
export type BoxResponsive<T> = T | null | undefined | false | ReadonlyArray<T | null | undefined | false>;

type ScaleValue<S> = S extends 'color'
  ? BoxColorToken | (string & {})
  : S extends 'radius'
    ? BoxRadiusToken | number | (string & {})
    : S extends 'shadow'
      ? BoxShadowToken | (string & {})
      : S extends 'fontWeight'
        ? keyof typeof BOX_FONT_WEIGHT_VARS | number | (string & {})
        : S extends 'lineHeight'
          ? keyof typeof BOX_LINE_HEIGHTS | number | (string & {})
          : S extends 'font'
            ? keyof typeof BOX_FONT_VARS | (string & {})
            : S extends 'size'
              ? keyof typeof BOX_SIZES | number | (string & {})
              : string | number;

/** The style props, typed by their scale. */
export type BoxStyleProps = {
  [K in BoxStyleKey]?: BoxResponsive<ScaleValue<(typeof BOX_STYLE_PROPS)[K]['scale']>>;
};

/** The pseudo-state props and `reducedMotion`. */
export type BoxPseudoProps = {
  [K in BoxPseudoKey]?: BoxStyleProps;
} & {
  reducedMotion?: BoxStyleProps;
};

/* ── Resolving a value ───────────────────────────────────────────────── */

const px = (n: number): string => (n === 0 ? '0' : `${n}px`);

const fromList = (list: readonly string[], n: number): string => (Number.isInteger(n) && n >= 0 && n < list.length ? list[n] : px(n));

const varOf = (name: string): string => `var(${name})`;

/**
 * One value of one prop, as CSS. Numbers index Primer's scale where the prop
 * has one, and are pixels past its end (as `sx` reads them); a token name
 * is its CSS variable, with no fallback; anything else is CSS as written.
 */
export function resolveBoxValue(scale: BoxScale, value: string | number): string {
  if (typeof value === 'number') {
    switch (scale) {
      case 'space':
        return fromList(BOX_SPACE, value);
      case 'signedSpace':
        if (value < 0) {
          const positive = fromList(BOX_SPACE, -value);
          return positive === '0' ? '0' : `-${positive}`;
        }
        return fromList(BOX_SPACE, value);
      case 'fontSize':
        return fromList(BOX_FONT_SIZES, value);
      case 'radius':
        return fromList(BOX_RADII, value);
      case 'borderWidth':
        return fromList(BOX_BORDER_WIDTHS, value);
      case 'unitless':
      case 'fontWeight':
      case 'lineHeight':
        return String(value);
      default:
        return px(value);
    }
  }
  switch (scale) {
    case 'color':
      return value in BOX_COLOR_VARS ? varOf(BOX_COLOR_VARS[value as BoxColorToken]) : value;
    case 'shadow':
      return value in BOX_SHADOW_VARS ? varOf(BOX_SHADOW_VARS[value as BoxShadowToken]) : value;
    case 'radius':
      return value in BOX_RADIUS_VARS ? varOf(BOX_RADIUS_VARS[value as BoxRadiusToken]) : value;
    case 'fontWeight':
      return value in BOX_FONT_WEIGHT_VARS
        ? varOf(BOX_FONT_WEIGHT_VARS[value as keyof typeof BOX_FONT_WEIGHT_VARS])
        : value;
    case 'lineHeight':
      return value in BOX_LINE_HEIGHTS ? BOX_LINE_HEIGHTS[value as keyof typeof BOX_LINE_HEIGHTS] : value;
    case 'font':
      return value in BOX_FONT_VARS ? varOf(BOX_FONT_VARS[value as keyof typeof BOX_FONT_VARS]) : value;
    case 'size':
      return value in BOX_SIZES ? BOX_SIZES[value as keyof typeof BOX_SIZES] : value;
    default:
      return value;
  }
}

/* ── Resolving a style ───────────────────────────────────────────────── */

/** Declarations by media: index 0 is no media, 1… Primer's breakpoints. */
type Block = Array<Array<[string, string]>>;

const isSet = (value: unknown): value is string | number =>
  value !== null && value !== undefined && value !== false && value !== '' && (typeof value === 'string' || typeof value === 'number');

function addDeclarations(block: Block, key: BoxStyleKey, value: unknown): void {
  const { css, scale } = BOX_STYLE_PROPS[key];
  const values: readonly unknown[] = Array.isArray(value) ? value.slice(0, BOX_BREAKPOINTS.length + 1) : [value];
  values.forEach((one, index) => {
    if (!isSet(one)) {
      return;
    }
    const resolved = resolveBoxValue(scale, one);
    (block[index] ??= []).push(...css.map(property => [property, resolved] as [string, string]));
  });
}

function blockOf(style: Record<string, unknown>): Block {
  const block: Block = [];
  for (const key of Object.keys(style)) {
    if (key in BOX_STYLE_PROPS) {
      addDeclarations(block, key as BoxStyleKey, style[key]);
    }
  }
  return block;
}

const MEDIA = (index: number) => `@media screen and (min-width: ${BOX_BREAKPOINTS[index - 1]})`;

const PLACEHOLDER = '\u0000';

function rulesOf(block: Block, selector: string, wrap?: string): string[] {
  const rules: string[] = [];
  block.forEach((declarations, index) => {
    if (!declarations || declarations.length === 0) {
      return;
    }
    const body = declarations.map(([property, value]) => `${property}:${value}`).join(';');
    let rule = `${selector}{${body}}`;
    if (index > 0) {
      rule = `${MEDIA(index)}{${rule}}`;
    }
    if (wrap) {
      rule = `${wrap}{${rule}}`;
    }
    rules.push(rule);
  });
  return rules;
}

/** A style's class and its rules, ready for the stylesheet. */
export interface BoxClass {
  className: string;
  rules: string[];
}

/** FNV-1a, 32 bits, in base 36. */
function hash(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

/** Every style resolved in this page, by class (for SSR and tests). */
const registry = new Map<string, BoxClass>();

/**
 * A style — the style props, the pseudo-state props, `reducedMotion` — as
 * one class and its rules. `undefined` when the style sets nothing.
 */
export function boxClassOf(style: Record<string, unknown>): BoxClass | undefined {
  const P = `.${PLACEHOLDER}`;
  const template: string[] = rulesOf(blockOf(style), P);
  for (const [key, pseudo] of Object.entries(BOX_PSEUDO_PROPS)) {
    const nested = style[key];
    if (nested && typeof nested === 'object') {
      template.push(...rulesOf(blockOf(nested as Record<string, unknown>), `${P}${pseudo}`));
    }
  }
  const reduced = style.reducedMotion;
  if (reduced && typeof reduced === 'object') {
    template.push(...rulesOf(blockOf(reduced as Record<string, unknown>), P, BOX_REDUCED_MOTION));
  }
  if (template.length === 0) {
    return undefined;
  }
  const text = template.join('');
  const className = `bx-${hash(text)}${text.length.toString(36)}`;
  let box = registry.get(className);
  if (!box) {
    // One object per class: a stable dependency for the effects that insert it.
    box = { className, rules: template.map(rule => rule.split(PLACEHOLDER).join(className)) };
    registry.set(className, box);
  }
  return box;
}

/** Every rule resolved so far, as one stylesheet: for server rendering and tests. */
export function getBoxCss(): string {
  return [...registry.values()].map(box => box.rules.join('\n')).join('\n');
}

/* ── The stylesheet ──────────────────────────────────────────────────── */

const STYLE_ATTRIBUTE = 'data-primer-addons-box';

const sheets = new WeakMap<Document | ShadowRoot, { element: HTMLStyleElement; inserted: Set<string> }>();

function sheetOf(root: Document | ShadowRoot) {
  let entry = sheets.get(root);
  if (!entry || !entry.element.isConnected) {
    const doc = root instanceof Document ? root : root.ownerDocument;
    const element = doc.createElement('style');
    element.setAttribute(STYLE_ATTRIBUTE, '');
    (root instanceof Document ? root.head : root).appendChild(element);
    entry = { element, inserted: new Set() };
    sheets.set(root, entry);
  }
  return entry;
}

/**
 * Puts a class's rules in the stylesheet of a document or a shadow root,
 * once. With `insertRule`: no reparsing of the sheet as classes are added.
 */
export function injectBoxClass(root: Document | ShadowRoot, box: BoxClass): void {
  const entry = sheetOf(root);
  if (entry.inserted.has(box.className)) {
    return;
  }
  entry.inserted.add(box.className);
  const sheet = entry.element.sheet;
  for (const rule of box.rules) {
    try {
      if (sheet) {
        sheet.insertRule(rule, sheet.cssRules.length);
      } else {
        entry.element.appendChild(entry.element.ownerDocument.createTextNode(rule));
      }
    } catch {
      // A rule the browser cannot parse (a typo in a value): skipped, as a
      // stylesheet would.
    }
  }
}
