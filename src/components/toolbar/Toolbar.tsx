/*
 * Copyright (c) 2025-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Toolbar - Fixed/sticky toolbar component.
 *
 * An extensible toolbar that renders ToolbarItems using Primer React components.
 * Designed to be used as a rich text editor toolbar or any fixed toolbar.
 *
 * The toolbar keeps to ONE line. What does not fit is not wrapped onto a
 * second row — an editor toolbar that grows taller takes the room the
 * document was using, and it moves the content under the pointer every time
 * an item appears — it is moved into a menu behind a single button at the
 * end of the line. See `overflow`.
 *
 * What leaves the line, and how it shows in the menu:
 * - `pinned: true` never leaves (a close button, a session menu);
 * - `priority` orders who leaves first (lowest first; among equals, the
 *   last on the line) — the menu still lists them in the line's order;
 * - a button shows its icon and name in the menu and closes it once chosen;
 * - a custom item says what it becomes with `overflow`: `{ label, icon,
 *   onSelect }` for a menu row, `{ render }` for a node of its own, or
 *   nothing to be drawn in the menu as it was on the line;
 * - a divider that would begin or end a list, or double another, is dropped.
 *
 * Every item is watched for its size (a chip that draws nothing until its
 * data arrives grows later), arrow keys / Home / End move the focus between
 * the controls, and `variant="inline"` drops the strip's own ground and
 * border for a toolbar inside the host's header row.
 *
 * Usage:
 * ```tsx
 * <Toolbar
 *   items={[
 *     { key: 'bold', type: 'button', icon: BoldIcon, ariaLabel: 'Bold', onClick: () => {} },
 *     { key: 'divider-1', type: 'divider' },
 *     { key: 'heading', type: 'dropdown', ariaLabel: 'Heading', label: 'Normal', options: [...] },
 *   ]}
 *   extraItems={pluginItems}
 * />
 * ```
 *
 * @module components/toolbar/Toolbar
 */

import {
  type KeyboardEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ActionMenu, IconButton } from "@primer/react";
import { KebabHorizontalIcon } from "@primer/octicons-react";
import { Box } from "../box/Box";
import type { ToolbarProps, ToolbarItem } from "./types";
import { ToolbarRenderer } from "./ToolbarRenderer";

/** Space between two items, as the flex `gap` below sets it, by default. */
const ITEM_GAP = 2;

/** Room kept at the end of the line for the button opening the rest. */
const OVERFLOW_TRIGGER_WIDTH = 32;

/** What arrow keys move between, inside the line. */
const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * A rule that begins or ends a list, or follows another rule, separates
 * nothing: the items it sat between have gone elsewhere.
 */
function tidyDividers(list: ToolbarItem[]): ToolbarItem[] {
  const out: ToolbarItem[] = [];
  for (const item of list) {
    if (
      item.type === "divider" &&
      (out.length === 0 || out[out.length - 1].type === "divider")
    ) {
      continue;
    }
    out.push(item);
  }
  while (out.length && out[out.length - 1].type === "divider") {
    out.pop();
  }
  return out;
}

/**
 * The keys to take off the line so the rest fits in `available`.
 *
 * Exported for tests. Pinned items, spacers and items that take no room
 * never leave; the others leave lowest `priority` first, the last on the
 * line first among equals — with every priority equal, the tail of the
 * line, as a reader expects.
 */
export function overflowKeys(
  ordered: ToolbarItem[],
  widthOf: (key: string) => number,
  available: number,
  gap: number = ITEM_GAP,
  triggerWidth: number = OVERFLOW_TRIGGER_WIDTH,
  /**
   * Whether an item is laid out on the line: one that draws nothing yet
   * (a chip waiting for its data) is 0px wide and still takes its gap.
   * Unsaid, an item 0px wide takes none.
   */
  laidOut?: (key: string) => boolean,
): Set<string> {
  const hidden = new Set<string>();
  const widthOfItem = (item: ToolbarItem) =>
    item.type === "spacer" ? 0 : widthOf(item.key);
  const used = () => {
    // What the line holds, as the browser lays it out: a 0px item that is
    // on the line takes its gap like any other (the Accountant's two empty
    // chips pushed its last button 2px past the edge, 28 November 2026).
    const shown = ordered.filter(
      (item) =>
        !hidden.has(item.key) &&
        (widthOfItem(item) > 0 ||
          (item.type !== "spacer" && laidOut?.(item.key) === true)),
    );
    const total = shown.reduce((sum, item) => sum + widthOfItem(item), 0);
    return (
      total +
      Math.max(0, shown.length - 1) * gap +
      (hidden.size > 0 ? gap + triggerWidth : 0)
    );
  };
  if (used() <= available) {
    return hidden;
  }
  const candidates = ordered
    .map((item, index) => ({ item, index }))
    .filter(
      ({ item }) =>
        !item.pinned && item.type !== "spacer" && widthOfItem(item) > 0,
    )
    .sort(
      (a, b) =>
        (a.item.priority ?? 0) - (b.item.priority ?? 0) || b.index - a.index,
    );
  for (const { item } of candidates) {
    hidden.add(item.key);
    if (used() <= available) {
      break;
    }
  }
  return hidden;
}

export function Toolbar({
  items,
  extraItems,
  className,
  disabled,
  ariaLabel = "Editor toolbar",
  overflow = true,
  variant = "bar",
  gap = ITEM_GAP,
  overflowAriaLabel,
  keyboardNavigation = true,
}: ToolbarProps) {
  const allItems: ToolbarItem[] = useMemo(() => {
    if (!extraItems?.length) return items;
    /*
     * An extra item takes the place of the item it shares its key with.
     *
     * A host that knows better what one of the items should do — how this
     * document is saved, where it is run — says so with the key of that item
     * rather than adding a second button next to it. What it leaves out, its
     * order and its icon among them, stays as the toolbar had it.
     */
    const overrides = new Map(extraItems.map((item) => [item.key, item]));
    const merged = items.map((item) => {
      const override = overrides.get(item.key);
      if (!override) {
        return item;
      }
      overrides.delete(item.key);
      return { ...item, ...override } as ToolbarItem;
    });
    return [...merged, ...extraItems.filter((item) => overrides.has(item.key))];
  }, [items, extraItems]);

  /*
   * The order the toolbar is READ in, decided here rather than in the
   * renderer: what overflows is decided against the line as it will appear.
   */
  const ordered = useMemo(
    () =>
      [...allItems]
        .filter((item) => !item.hidden)
        .sort((a, b) => (a.order ?? 100) - (b.order ?? 100)),
    [allItems],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  /** Room the line takes that the sum of its items does not account for. */
  const unseen = useRef(0);
  /*
   * The width of every item, by key, measured while it was on the line.
   *
   * An item moved into the menu is no longer on the line to be measured, so
   * what it took is remembered from when it was: without this the toolbar
   * would let an item back on, find it does not fit, take it off again, and
   * oscillate on every resize.
   */
  const widths = useRef(new Map<string, number>());
  const [hiddenKeys, setHiddenKeys] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const keys = useMemo(
    () => ordered.map((item) => item.key).join("\u0000"),
    [ordered],
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    const row = rowRef.current;
    if (!container || !row) {
      return;
    }
    /*
     * Whatever is on the line right now is worth remembering, found by KEY.
     *
     * Not by position: an item renders as many nodes as it likes — a control
     * a host contributes brings its tooltip along — so the nth node of the
     * line is not the nth item. Each item is wrapped in one element carrying
     * its key, below, which is what makes this lookup possible.
     */
    // Read off the wrappers' attribute rather than built into a selector: a
    // key is the host's text, and `CSS.escape` is not everywhere (jsdom).
    const onTheLine = new Set<string>();
    row
      .querySelectorAll<HTMLElement>("[data-toolbar-key]")
      .forEach((node) => {
        const key = node.getAttribute("data-toolbar-key");
        if (key !== null) {
          widths.current.set(key, node.getBoundingClientRect().width);
          if (getComputedStyle(node).display !== "none") {
            onTheLine.add(key);
          }
        }
      });
    const style = getComputedStyle(container);
    /*
     * The room, taken from the PARENT as well as from the toolbar itself.
     *
     * A host is free to lay the toolbar out so that it is as wide as what it
     * holds. Measured on itself alone, taking an item off the line then made
     * the line narrower, which pushed the next item off, and the toolbar
     * collapsed to its menu button. The parent keeps the width the toolbar
     * is allowed, whatever the toolbar currently shows, so the wider of the
     * two is the honest answer — and where the toolbar does fill its parent
     * the two are the same number. A host laying the toolbar in a row with
     * other things wraps it in a box of its own for that reason.
     */
    const parent = container.parentElement;
    const available =
      Math.max(container.clientWidth, parent?.clientWidth ?? 0) -
      parseFloat(style.paddingLeft || "0") -
      parseFloat(style.paddingRight || "0");
    if (available <= 0) {
      return;
    }
    // An item never measured is assumed to fit; the next pass, once it has
    // been on the line, knows better.
    const widthOf = (key: string) => widths.current.get(key) ?? 0;
    const laidOut = (key: string) => onTheLine.has(key);
    /*
     * The browser has the last word. Where the sum says the line fits and
     * the line runs past the edge anyway (a gap or a margin the sum does
     * not know of), the excess is remembered and taken off the room — kept
     * until the items change, so that moving one into the menu, which ends
     * the excess, does not bring it straight back.
     */
    let next = overflowKeys(
      ordered,
      widthOf,
      available - unseen.current,
      gap,
      undefined,
      laidOut,
    );
    const excess = container.scrollWidth - container.clientWidth;
    if (next.size === 0 && excess > 0.5) {
      unseen.current += excess;
      next = overflowKeys(
        ordered,
        widthOf,
        available - unseen.current,
        gap,
        undefined,
        laidOut,
      );
    }
    setHiddenKeys((previous) =>
      previous.size === next.size && [...next].every((key) => previous.has(key))
        ? previous
        : next,
    );
  }, [ordered, gap]);

  useLayoutEffect(() => {
    // A new set of items is shown whole first, so each one is measured on
    // the line before anything is taken off it.
    setHiddenKeys(new Set());
    unseen.current = 0;
  }, [keys, overflow]);

  useLayoutEffect(() => {
    if (!overflow) {
      return;
    }
    measure();
    const container = containerRef.current;
    const row = rowRef.current;
    if (!container || !row || typeof ResizeObserver === "undefined") {
      return;
    }
    const observer = new ResizeObserver(() => measure());
    observer.observe(container);
    if (container.parentElement) {
      observer.observe(container.parentElement);
    }
    /*
     * Each item as well: a control that draws nothing until it has something
     * to say (a chip that waits for its data) grows after the line was
     * measured, and the toolbar has to hear about it.
     */
    row
      .querySelectorAll<HTMLElement>("[data-toolbar-key]")
      .forEach((node) => observer.observe(node));
    /*
     * And what changes without changing size: a chip that waits for its data
     * is put on the line still 0px wide, which takes a gap and resizes
     * nothing — the Accountant's two empty chips pushed the agent chooser
     * past the edge on first load, unheard (28 November 2026).
     */
    let frame = 0;
    const mutations =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(() => {
            if (frame === 0) {
              frame = requestAnimationFrame(() => {
                frame = 0;
                measure();
              });
            }
          });
    mutations?.observe(row, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style", "class", "hidden"],
    });
    return () => {
      observer.disconnect();
      mutations?.disconnect();
      if (frame !== 0) {
        cancelAnimationFrame(frame);
      }
    };
  }, [measure, overflow, hiddenKeys]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!keyboardNavigation) {
        return;
      }
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        return;
      }
      const target = event.target as HTMLElement;
      if (
        target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
      ) {
        return;
      }
      const container = containerRef.current;
      if (!container) {
        return;
      }
      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter(
        (node) =>
          !node.hasAttribute("disabled") &&
          node.getAttribute("aria-hidden") !== "true",
      );
      if (focusables.length === 0) {
        return;
      }
      const current = focusables.findIndex(
        (node) => node === target || node.contains(target),
      );
      let next = current;
      if (event.key === "Home") next = 0;
      else if (event.key === "End") next = focusables.length - 1;
      else if (event.key === "ArrowRight")
        next = current < 0 ? 0 : (current + 1) % focusables.length;
      else
        next =
          current < 0
            ? focusables.length - 1
            : (current - 1 + focusables.length) % focusables.length;
      event.preventDefault();
      focusables[next]?.focus();
    },
    [keyboardNavigation],
  );

  const visible = overflow
    ? tidyDividers(ordered.filter((item) => !hiddenKeys.has(item.key)))
    : ordered;
  const hidden = overflow
    ? ordered.filter((item) => hiddenKeys.has(item.key))
    : [];
  /*
   * What the menu draws for each item that left the line: a button keeps
   * its name beside its icon and closes the menu once chosen; a custom item
   * becomes what its `overflow` says — a row that runs `onSelect`, a node of
   * its own — or else itself.
   */
  const close = () => setMenuOpen(false);
  const overflowed: ToolbarItem[] = tidyDividers(hidden).map((item) => {
    if (item.type === "button") {
      return {
        ...item,
        onClick: () => {
          item.onClick();
          close();
        },
      };
    }
    if (item.type === "custom" && item.overflow) {
      const { label, icon, onSelect, render } = item.overflow;
      if (render) {
        return { ...item, render };
      }
      if (onSelect) {
        return {
          key: item.key,
          type: "button",
          order: item.order,
          disabled: item.disabled,
          ariaLabel: label ?? item.key,
          icon,
          onClick: () => {
            onSelect();
            close();
          },
        };
      }
    }
    return item;
  });
  const inline = variant === "inline";

  return (
    <Box
      ref={containerRef}
      className={className}
      role="toolbar"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      data-toolbar-variant={variant}
      onKeyDown={onKeyDown}
      sx={{
        display: "flex",
        alignItems: "center",
        // One line, always: see the note at the top of this module.
        flexWrap: "nowrap",
        overflow: "hidden",
        /*
         * The width comes from the parent, never from the content.
         *
         * Left to size itself, the toolbar shrank to whatever was still on
         * the line — so moving an item into the menu made the line narrower,
         * which made the next item overflow, which narrowed it again: it
         * collapsed to the menu button alone. Measuring the room only means
         * anything when the room is not decided by what is measured.
         */
        width: "100%",
        boxSizing: "border-box",
        minWidth: 0,
        gap: `${gap}px`,
        ...(inline
          ? {}
          : {
              px: 2,
              py: 1,
              bg: "canvas.default",
              borderBottom: "1px solid",
              borderColor: "border.default",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }),
      }}
    >
      <Box
        ref={rowRef}
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: `${gap}px`,
          minWidth: 0,
          flex: "1 1 auto",
          /*
           * An item keeps its width, whatever the room.
           *
           * Allowed to shrink, every item squeezed instead of overflowing —
           * the line always "fitted", the measurement below always agreed,
           * and nothing ever moved into the menu. Held at their natural
           * width they run past the edge, which is what the measurement is
           * there to notice.
           */
          "& > *": { flexShrink: 0 },
          /*
           * An item that draws nothing takes no room and no gap: the wrapper
           * of a control rendering null would otherwise space the line out
           * around nothing.
           */
          "& > [data-toolbar-key]:empty": { display: "none" },
        }}
      >
        {visible.map((item) => (
          <Box
            key={item.key}
            data-toolbar-key={item.key}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              // A spacer is the one item that should take what is left.
              flex: item.type === "spacer" ? "1 1 auto" : "0 0 auto",
              minWidth: 0,
            }}
          >
            <ToolbarRenderer items={[item]} disabled={disabled} size="medium" />
          </Box>
        ))}
      </Box>
      {overflowed.length > 0 && (
        <ActionMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <ActionMenu.Anchor>
            <IconButton
              icon={KebabHorizontalIcon}
              /*
               * The name a screen reader announces, and the tooltip a
               * pointer reveals: Primer turns this label into both, which is
               * why the button itself carries no `aria-label` in the end but
               * an `aria-labelledby` pointing at the tooltip.
               */
              aria-label={
                overflowAriaLabel ??
                (overflowed.length === 1
                  ? "1 more toolbar item"
                  : `${overflowed.length} more toolbar items`)
              }
              data-toolbar-overflow=""
              variant="invisible"
              size="small"
            />
          </ActionMenu.Anchor>
          <ActionMenu.Overlay width="auto">
            {/*
              The items themselves, not a translation of them into menu rows:
              a dropdown or a control a host contributed keeps working in the
              menu exactly as it did on the line.
            */}
            <Box
              data-toolbar-overflow-menu=""
              sx={{
                display: "flex",
                flexDirection: "column",
                // `flex-start`, not `stretch`: `stretch` sized every row to
                // the width of the widest item in the menu, which for an
                // icon-only button meant an invisible (at rest,
                // transparent-background) hit area far wider than its icon,
                // showing up as a wide blank bar the moment it was hovered.
                // `flex-start` sizes every item to its own content instead —
                // `showLabel` below means a plain button is icon-plus-name
                // width here, not icon-only, the same as it always was for a
                // dropdown trigger (its icon alone often isn't enough to say
                // what it does — the "more formatting" chevron, say).
                alignItems: "flex-start",
                gap: 1,
                p: 2,
              }}
            >
              <ToolbarRenderer
                items={overflowed}
                disabled={disabled}
                size="medium"
                showLabel
                direction="column"
              />
            </Box>
          </ActionMenu.Overlay>
        </ActionMenu>
      )}
    </Box>
  );
}

export default Toolbar;
