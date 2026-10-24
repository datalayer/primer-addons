/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * `Box`: this package's own, no longer Primer's deprecated one.
 *
 * ## The API
 *
 * The props are Primer's names, so a `Box` reads as it always did:
 *
 * - space — `m`, `mt`…`my`, `p`, `pt`…`py` and the long names, `gap`,
 *   `rowGap`, `columnGap`; numbers index Primer's space scale (`p={3}` is
 *   16px, `mt={-2}` is -8px), past its end they are pixels;
 * - colour — `color`, `bg`, `backgroundColor`, `fill`, `stroke`,
 *   `outlineColor`, `opacity`;
 * - border — `border`, `borderTop`…, `borderColor`, `borderTopColor`…,
 *   `borderWidth`, `borderStyle`, `borderRadius` and its corners,
 *   `boxShadow`, `outline`;
 * - layout — `display`, `width`, `height`, `min…`/`max…`, `size`,
 *   `overflow`…, `verticalAlign`, `aspectRatio`, `objectFit`;
 * - flex and grid — `flex…`, `align…`, `justify…`, `place…`, `order`,
 *   `gridTemplateColumns`, `gridColumn`, `gridArea`, `gridAuto…`;
 * - position — `position`, `zIndex`, `top`, `right`, `bottom`, `left`,
 *   `inset`;
 * - type — `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`,
 *   `letterSpacing`, `textAlign`, `whiteSpace`, `textDecoration`,
 *   `textTransform`, `textOverflow`, `wordBreak`, `listStyle`…;
 * - the rest — `cursor`, `pointerEvents`, `userSelect`, `transition`,
 *   `transform`, `animation`, `filter`, `backdropFilter`…
 *
 * `boxCss.ts` has the full list (`BOX_STYLE_PROPS`) with each prop's scale.
 *
 * Every prop takes one value or one per breakpoint — `[base, 544px,
 * 768px, 1012px, 1280px]`, Primer's, `null` to skip one — and the pseudo
 * states take a style of their own: `hover={{ bg: 'canvas.subtle' }}`,
 * `focus`, `focusVisible`, `focusWithin`, `active`, and `reducedMotion` for
 * the reader who asked for less motion. `as`, `className`, `style`, a ref
 * and every other prop go to the element.
 *
 * ## Tokens are Primer's variables, with no fallback
 *
 * A colour path is the CSS variable Primer's own theme reads first for it,
 * and only that: `bg="canvas.subtle"` is `var(--bgColor-muted)`,
 * `borderColor="border.default"` is `var(--borderColor-default)`,
 * `boxShadow="shadow.medium"` is `var(--shadow-resting-medium)` — the table
 * is generated from Primer's color schemes (`boxTokens.ts`). A radius by
 * name is Primer's (`small`, `medium`, `large`, `full`) or the theme's shape
 * (`control`, `card`, `bubble`, `frame`, LOOP T-03); a font weight by name
 * is the theme's weight variable. Space, font sizes, radii by index and
 * sizes are Primer's theme scales, written as pixels: they are the same in
 * every theme and need no variable.
 *
 * No fallback: a page is drawn by its theme, and the theme provider sets
 * every variable `Box` emits (`BOX_EMITTED_VARS`, proven by a test against
 * every theme). A theme that wants a different hairline or corner sets it
 * on Primer's variable — the `loop` theme's hairline *is* its
 * `--borderColor-default` — never a call site with a
 * `var(--loop-…, var(--…))` chain.
 *
 * ## The implementation: one class per style, no styled-components
 *
 * The style props are resolved to CSS and hashed into one class, whose
 * rules are inserted once (`insertRule`) into a stylesheet of the document
 * — or of the shadow root the element is in, for an application embedded
 * in another page. Equal styles share a class; responsive values are
 * `@media` rules and pseudo states `:hover`… rules of the same class, in a
 * fixed order (base, breakpoints, then the states), so a state always wins
 * over the base.
 *
 * Not styled-components, on purpose: this package's own copy of it once
 * shipped beside Primer's (v5 beside v6), and wherever a bundler did not
 * dedupe the two — webpack in the landing, Rsbuild in the decks app — a
 * `Box` rendered under a runtime with no Primer theme: `sx` landed on the
 * DOM as `sx="[object Object]"` and `canvas.subtle` came out white on a
 * dark page. Resolving to CSS variables needs no theme object at runtime,
 * so it needs no styled-components at all. Reusing Primer's instance would
 * tie `Box` to Primer's deprecated styling, which Primer is removing.
 *
 * ## `sx`, while the call sites move to props
 *
 * `sx` still works, typed, and through the same class: its keys are read
 * as Primer's `sx` read them (the same tokens, here with no fallback), and
 * its nested blocks — `'&:hover'`, `'& svg'`, `label`, `'@media (…)'`,
 * `'@keyframes …'` — become rules of that class, after the props', so `sx`
 * wins where both say something, as it did. No styled-components there
 * either: Primer's `Box` on styled-components 6 passed `sx` on to the DOM
 * (`sx="[object Object]"`). A codemod moves `sx` keys to props; what it
 * cannot — nested selectors, keyframes — stays in `sx`.
 */

import {
  type CSSProperties,
  type ElementType,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  type RefAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useInsertionEffect,
  useLayoutEffect,
  useRef,
  version as reactVersion,
} from 'react';
import type { BetterSystemStyleObject } from './sx';
import {
  BOX_PSEUDO_PROPS,
  BOX_STYLE_PROPS,
  type BoxPseudoProps,
  type BoxStyleProps,
  boxClassOf,
  injectBoxClass,
} from './boxCss';

export * from './boxCss';
export * from './boxTokens';

/** The props of a `Box`: its style, its states, the element's own. */
export type BoxProps = BoxStyleProps &
  BoxPseudoProps &
  Omit<HTMLAttributes<HTMLElement>, keyof BoxStyleProps | 'as'> & {
    /** The element or component to render, `div` by default. */
    as?: ElementType;
    /** Primer's `sx`, while the call sites move to props. */
    sx?: BetterSystemStyleObject;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    /** Whatever the element (or the `as` component) takes besides. */
    [prop: string]: unknown;
  };

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const STYLE_KEYS: ReadonlySet<string> = new Set([
  ...Object.keys(BOX_STYLE_PROPS),
  ...Object.keys(BOX_PSEUDO_PROPS),
  'reducedMotion',
]);

/** React 19 hands a ref to a function component as a prop; React 18 warns. */
const REF_AS_PROP = Number.parseInt(reactVersion, 10) >= 19;

/** True for a component React 18 cannot give a ref to: a plain function. */
const isPlainFunction = (component: ElementType): boolean =>
  typeof component === 'function' && !(component as { prototype?: { isReactComponent?: unknown } }).prototype?.isReactComponent;

/** Elements whose `width` and `height` are attributes too: they keep them. */
const SIZED_ELEMENTS: ReadonlySet<string> = new Set(['img', 'svg', 'video', 'canvas', 'iframe', 'embed', 'object']);

function assignRef<T>(ref: Ref<T> | undefined, value: T | null): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    (ref as { current: T | null }).current = value;
  }
}

const BoxImpl = forwardRef<unknown, BoxProps>(function Box(props, ref) {
  const { as, sx: sxProp, className, ...rest } = props;
  // The index signature widens what destructuring reads: typed back here.
  const Component = (as ?? 'div') as ElementType;
  const sx = sxProp as BetterSystemStyleObject | undefined;
  const style: Record<string, unknown> = {};
  const element: Record<string, unknown> = {};
  for (const key of Object.keys(rest)) {
    (STYLE_KEYS.has(key) ? style : element)[key] = rest[key];
  }
  if (typeof Component === 'string' && SIZED_ELEMENTS.has(Component)) {
    for (const key of ['width', 'height']) {
      const value = rest[key];
      if (typeof value === 'string' || typeof value === 'number') {
        element[key] = value;
      }
    }
  }
  const box = boxClassOf(style, sx);

  const node = useRef<Element | null>(null);
  const setNode = useCallback(
    (value: unknown) => {
      node.current = value instanceof Element ? value : null;
      assignRef(ref, value);
    },
    [ref],
  );

  // Into the document's stylesheet before the DOM is changed…
  useInsertionEffect(() => {
    if (box && typeof document !== 'undefined') {
      injectBoxClass(document, box);
    }
  }, [box]);
  // …and into a shadow root's, for an element rendered in one.
  useIsomorphicLayoutEffect(() => {
    const root = node.current?.getRootNode();
    if (box && typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot) {
      injectBoxClass(root, box);
    }
  }, [box]);

  const classes = [box?.className, className].filter(Boolean).join(' ') || undefined;
  // Our ref (for the shadow root) unless React 18 would warn: then the
  // caller's, if any.
  const elementRef = REF_AS_PROP || !isPlainFunction(Component) ? setNode : ref || undefined;
  return <Component ref={elementRef} className={classes} {...element} />;
});

BoxImpl.displayName = 'Box';

/** A `div`, or `as`, drawn by its style props; see above. */
export const Box = BoxImpl as ForwardRefExoticComponent<BoxProps & RefAttributes<any>>;

export default Box;
