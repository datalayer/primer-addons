/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The page layout: the work on a centred sheet, like a document.
 *
 * A quiet canvas fills the view. On it, one sheet — the page, at a reading
 * width, with the margins and the shadow a page has — and a band docked
 * directly above the canvas — or, when the host asks for it, floating over
 * the canvas as a draggable card — like the toolbar of a document
 * application, with chips directly under it — or standing in the side panel
 * under its content, the page bare. With no page to show, the side panel's
 * content is the page: the same sheet, holding it, and no side panel. While
 * something works in the page, a small line at the top of the sheet says
 * what it is doing — "Analyst is adding a cell…" — so the change is seen
 * where it happens. The panel is a column on the right that opens when it
 * is wanted — on either side by `panelSide`, and by `panelMode` a column, an
 * overlay over the page's edge or a small window in its corner; closed, the
 * page is all there is.
 *
 * The sheet is a reading column by default, as tall as what is on it; asked
 * for a paper (`pageSize`: letter, A4, or a free width and height), it takes
 * the paper's width and is at least the paper's height.
 *
 * The band holds one **mount point**, and that is what gives its content its
 * width: the same `sheetWidth` column the sheet gets, centred the same way,
 * inside the same canvas padding. So the band and the page below it are one
 * column with one pair of edges, and they stay one when the panel opens and
 * narrows the canvas — because the band lives inside the page column, not
 * across the whole view. A floating card sizes itself, which is why it never
 * lines up with anything. It hangs at the top of the canvas, over the chips
 * and the sheet, which start where they would with no band at all: the flow
 * keeps no room for the card. What it covers is a drag away, and a strip of
 * canvas held clear for it was a blank band before the page — worse than a
 * card over the first lines.
 *
 * Nothing here decides what the parts do. A host wires them; this arranges
 * them. It grew up as the Loop's page layout, where the page is a notebook or
 * a document, the band is the composer and the panel is the conversation;
 * the names here are the general ones.
 *
 * @module reactor/page-layout/PageLayout
 */

import { useEffect, type JSX, type ReactNode } from "react";
import { Box, Text } from "@primer/react";
import { useSignalValue } from "@datalayer/reactor/react";
import {
  pageLayoutActivity,
  pageLayoutPanelOpen,
  pageLayoutSheet,
} from "./panelState";

/** A page reads best at about this width; wider and lines run too long. */
export const PAGE_SHEET_WIDTH = 920;
/** The side panel, when open. */
export const PAGE_PANEL_WIDTH = 400;

/**
 * How the sheet is sized: `free`, or as a sheet of paper.
 *
 * `free` is the reading column — `PAGE_SHEET_WIDTH` wide, or the width the
 * host gives, as tall as its content. `letter` and `a4` are the papers, at
 * CSS's 96 dots to the inch: the sheet takes their width and is at least
 * their height, so a short document still reads as a page rather than as a
 * box shrunk around three lines.
 */
export type PageSizeFormat = "free" | "letter" | "a4";

/** The sheet's size: a format, and free width and height over it. */
export type PageSize = {
  /** `free` unless said otherwise. */
  format?: PageSizeFormat;
  /** The sheet's width in px. Over a paper format, replaces the paper's. */
  width?: number;
  /**
   * The sheet's least height in px; content past it grows the sheet. Over a
   * paper format, replaces the paper's. Omitted under `free`: the content's.
   */
  height?: number;
};

/** The papers, in CSS px (96 to the inch): US Letter 8.5 × 11 in, A4 210 × 297 mm. */
export const PAGE_SIZE_FORMATS: Record<
  Exclude<PageSizeFormat, "free">,
  { width: number; height: number }
> = {
  letter: { width: 816, height: 1056 },
  a4: { width: 794, height: 1123 },
};

/**
 * The width and least height a `PageSize` asks for: the format's, with any
 * free width or height over it; `sheetWidth` and the content's height when
 * neither says.
 */
export function resolvePageSize(
  size: PageSize | undefined,
  sheetWidth: number = PAGE_SHEET_WIDTH,
): { width: number; height?: number } {
  const paper =
    size?.format && size.format !== "free"
      ? PAGE_SIZE_FORMATS[size.format]
      : undefined;
  return {
    width: size?.width ?? paper?.width ?? sheetWidth,
    height: size?.height ?? paper?.height,
  };
}
/**
 * The canvas' own gutters, shared by the sheet and the band.
 *
 * One constant rather than two literals: the two are only aligned as long as
 * they are equal, and a column that lines up by coincidence stops lining up
 * the first time one of them is edited.
 */
const CANVAS_PX = [2, 3, 4];

/** What is happening in the page, pinned to the sheet's top edge. */
function ActivityLine({ label }: { label: string }): JSX.Element {
  return (
    <Box
      data-page-activity=""
      role="status"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 2,
        alignSelf: "flex-start",
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: "4px",
        borderRadius: "999px",
        border: "1px solid",
        borderColor: "accent.muted",
        bg: "accent.subtle",
        color: "accent.fg",
        fontSize: 0,
        fontWeight: "semibold",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 12px -6px rgba(0,0,0,0.3)",
      }}
    >
      <Box
        as="span"
        aria-hidden="true"
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          bg: "accent.fg",
          animation: "page-activity-dot 1.1s ease-in-out infinite",
          "@keyframes page-activity-dot": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.3 },
          },
        }}
      />
      <Text>{label}</Text>
    </Box>
  );
}

export type PageLayoutProps = {
  /** The page: what lies on the sheet. */
  page?: ReactNode;
  /**
   * Whether there is a page on screen.
   *
   * When false, the panel's content lies on the sheet instead, and the page
   * is kept mounted out of sight — whatever lives in it keeps running —
   * rather than unmounted. Defaults to whether `page` was given.
   */
  hasPage?: boolean;
  /** The side panel's content: a conversation, an inspector, a list. */
  panel?: ReactNode;
  /**
   * The band above the page: a composer, a toolbar. Docked in a band at the
   * sheet's width, or floating over the canvas, by `bandMode`. Nothing when
   * omitted — an empty band is a strip of chrome that does nothing.
   */
  band?: ReactNode;
  /** Chips under the band, above the sheet: openers, quick actions. */
  chips?: ReactNode;
  /** A strip above the canvas: a picker, a row of tabs. */
  picker?: ReactNode;
  /** Rendered after the canvas, positioned by itself: a transient notice. */
  transient?: ReactNode;
  /**
   * What is happening in the page, pinned to the sheet's top edge while set.
   * Omitted, the layout reads {@link pageLayoutActivity}.
   */
  activity?: string;
  /**
   * `docked` (the default): the band above the canvas, at the sheet's width.
   * `floating`: the band's content is a draggable card at the top of the
   * canvas, positioned by itself against this layout's root, over the chips
   * and the sheet — which start at the top of the canvas as if there were
   * no band; the card covers what it covers. `panel`: the band stands in the
   * side panel, under the panel's content, with the chips above it; the
   * page has no band over it at all, and the panel is on screen for as
   * long as the band is in it, whatever the toggle says.
   */
  bandMode?: "docked" | "floating" | "panel";
  /**
   * Where the panel stands, when open. `docked` (the default): a column
   * beside the page, narrowing it. `overlay`: over the page's right edge at
   * full height, the page untouched under it. `popup`: a small window in
   * the page's bottom-right corner.
   */
  panelMode?: "docked" | "overlay" | "popup";
  /**
   * Which side the panel stands on: `right` (the default), or `left`, where
   * a navigation sidebar belongs. An overlay and a popup follow the same
   * side, so a left panel slides in over the page's left edge.
   */
  panelSide?: "left" | "right";
  /** The sheet's width; {@link PAGE_SHEET_WIDTH} by default. */
  sheetWidth?: number;
  /**
   * The sheet's size: `free` (the default) at `sheetWidth`, or a paper —
   * `letter`, `a4` — whose width the sheet takes and whose height it is at
   * least; a `width` or `height` given here comes before either.
   */
  pageSize?: PageSize;
  /** The panel's width when open; {@link PAGE_PANEL_WIDTH} by default. */
  panelWidth?: number;
};

export function PageLayout({
  page,
  hasPage = page !== undefined && page !== null,
  panel,
  band,
  chips,
  picker,
  transient,
  activity,
  bandMode = "docked",
  panelMode = "docked",
  panelSide = "right",
  sheetWidth = PAGE_SHEET_WIDTH,
  pageSize,
  panelWidth = PAGE_PANEL_WIDTH,
}: PageLayoutProps): JSX.Element {
  const bandInPanel = bandMode === "panel";
  const hasBand = band !== undefined && band !== null;
  // One width for the sheet, the band's mount and the chips: the column.
  const { width: pageWidth, height: pageHeight } = resolvePageSize(
    pageSize,
    sheetWidth,
  );
  const panelOpen = useSignalValue(pageLayoutPanelOpen);
  // A panel holding the band is on screen whatever the toggle says: closing
  // it would take the composer with it.
  const panelShown = panelOpen || (bandInPanel && hasBand);
  const announced = useSignalValue(pageLayoutActivity);
  const activityLabel = activity ?? announced;

  /*
   * No page — a host without one, or a view that hid it — and the panel's
   * content is what lies on the sheet. Told to the parts that only make
   * sense beside a page, through the shared signal.
   */
  const sheet = hasPage ? "page" : "panel";
  useEffect(() => {
    pageLayoutSheet.value = sheet;
  }, [sheet]);

  return (
    <Box
      data-page-layout=""
      sx={{
        // The positioned ancestor the out-of-sight parts park against.
        position: "relative",
        flex: "1 1 auto",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {picker}
      <Box
        sx={{
          flex: "1 1 auto",
          minHeight: 0,
          display: "flex",
          // The canvas the sheet lies on: a step darker than the page, so the
          // sheet reads as paper rather than as a bordered region of the
          // same surface.
          bg: "canvas.inset",
        }}
      >
        {/* The page column: the band, and the canvas under it. Both live in
            here rather than the row, so the panel narrows the two of them
            together and the column stays a column. */}
        <Box
          sx={{
            flex: "1 1 auto",
            minWidth: 0,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* The band, docked above the page: it spans the canvas, the mount
              point inside it is the page's own column, so the two share one
              pair of edges. */}
          {band && bandMode === "docked" ? (
            <Box
              data-page-band=""
              data-page-prompt-dock=""
              sx={{
                flex: "0 0 auto",
                display: "flex",
                justifyContent: "center",
                px: CANVAS_PX,
                // The content brings its own padding, its own border and
                // its own surface; the band only has to carry them the full
                // width of the canvas and close with a rule.
                bg: "canvas.subtle",
                borderBottom: "1px solid",
                borderColor: "border.default",
              }}
            >
              {/* The mount point: the same column the sheet gets, so
                  `[data-page-band] > *` and `[data-page-sheet]` measure the
                  same width and the same left edge. */}
              <Box sx={{ width: "100%", maxWidth: pageWidth, minWidth: 0 }}>
                {band}
              </Box>
            </Box>
          ) : null}
          {/* The canvas. */}
          <Box
            data-page-canvas=""
            sx={{
              flex: "1 1 auto",
              minWidth: 0,
              minHeight: 0,
              // A page's sheet grows with its content and the canvas
              // scrolls; the panel's sheet fills the canvas and scrolls
              // inside, so a conversation keeps following its stream.
              overflowY: hasPage ? "auto" : "hidden",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // The same under a floating card: the chips and the sheet
              // start at the top, and the card hangs over them.
              pt: 3,
              pb: 6,
              px: CANVAS_PX,
            }}
          >
            {/* The chips, under the band — docked or floating — and above
                the sheet. With the band in the panel they go there too. */}
            {band && chips && !bandInPanel ? (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: pageWidth,
                  mb: 3,
                  display: "flex",
                  justifyContent: "center",
                  "& > *": { justifyContent: "center" },
                }}
              >
                {chips}
              </Box>
            ) : null}
            {/* What is happening, at the top of the sheet, while it does. */}
            {activityLabel ? (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: pageWidth,
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: 2,
                }}
              >
                <ActivityLine label={activityLabel} />
              </Box>
            ) : null}
            <Box
              data-page-sheet=""
              sx={{
                width: "100%",
                maxWidth: pageWidth,
                /*
                  A page's sheet is at least as tall as the canvas, and grows
                  past it with its content (`1 0 auto`: grow, never shrink).
                  It used to be `0 0 auto`, its content's height only — so
                  when the layout was given more room (full screen, a taller
                  frame, a resized window) the canvas grew and the page did
                  not, leaving an empty band of canvas under a short sheet.
                  Flex does the following: nothing is measured, so any
                  change in the layout's height reaches the page at once.
                */
                flex: hasPage ? "1 0 auto" : "1 1 auto",
                bg: "canvas.default",
                border: "1px solid",
                borderColor: "border.default",
                borderRadius: "10px",
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.06), 0 24px 48px -28px rgba(0,0,0,0.35)",
                // The page's own margins. A page fills the sheet and reads
                // against these, as text on paper does; a panel's content
                // brings its own gutters, so it sits closer.
                px: hasPage ? [3, 4, "56px"] : [2, 3, 4],
                py: hasPage ? [3, 4, 4] : 2,
                // What is on the sheet positions its hidden siblings
                // against this.
                position: "relative",
                display: "flex",
                // A paper's height when the size names one: the sheet is at
                // least that tall, and grows past it with its content.
                minHeight: hasPage ? (pageHeight ?? 480) : 0,
                /*
                The page fills the sheet, not the viewport: the sheet grows
                with its content and the canvas scrolls, which is what makes
                it a page.
              */
                "& > *": { flex: "1 1 auto", minWidth: 0 },
              }}
            >
              {hasPage ? page : panel}
            </Box>
            {/* With the panel's content on the sheet, the page is parked out
                of sight, not unmounted: whatever runs in it — an editor's
                tools, say — would leave with it. Hidden visibility keeps real
                dimensions for anything that measures itself. */}
            {hasPage || !page ? null : (
              <Box
                aria-hidden="true"
                sx={{
                  position: "absolute",
                  inset: 0,
                  visibility: "hidden",
                  pointerEvents: "none",
                  zIndex: -1,
                  display: "flex",
                }}
              >
                {page}
              </Box>
            )}
          </Box>
        </Box>

        {/* The panel, beside the page, when asked for — and only when there
            is a page; its content is the sheet otherwise.

            One element, open or closed, and the mount point inside it is the
            same either way. It used to be two branches — a column when open,
            a hidden box when closed — and although both kept the panel
            mounted, they held it at different depths, so React tore the
            subtree down and built it again on every open. The conversation
            lives in there: opening the panel, which is what happens the
            moment an agent starts working, killed the request in flight and
            left the message unanswered. */}
        {!hasPage || !panel ? null : (
          <Box
            data-page-panel={panelShown ? "" : undefined}
            data-page-panel-mode={panelMode}
            aria-hidden={panelShown ? undefined : "true"}
            sx={{
              minWidth: 0,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              bg: "canvas.default",
              borderColor: "border.default",
              ...(!panelShown
                ? {
                    // Out of sight, and out of the way of the pointer, while
                    // whatever is in it goes on running. No `z-index` here:
                    // it would make a stacking context, and the composer —
                    // which lives in this column whether the panel is open or
                    // not — has to be able to float over the page from it.
                    position: "absolute",
                    inset: 0,
                    visibility: "hidden",
                    pointerEvents: "none",
                    overflow: "visible",
                  }
                : panelMode === "docked"
                  ? {
                      flex: `0 0 ${panelWidth}px`,
                      maxWidth: "45%",
                      order: panelSide === "left" ? -1 : undefined,
                      [panelSide === "left" ? "borderRight" : "borderLeft"]:
                        "1px solid",
                      // Over the canvas, and beside the band rather than under
                      // it: the band belongs to the page column.
                      zIndex: 1,
                    }
                  : panelMode === "overlay"
                    ? {
                        // Over the page's right edge, the page untouched
                        // under it; against the root, as the float is.
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        [panelSide]: 0,
                        width: panelWidth,
                        maxWidth: "85%",
                        [panelSide === "left" ? "borderRight" : "borderLeft"]:
                          "1px solid",
                        boxShadow: "shadow.large",
                        zIndex: 5,
                      }
                    : {
                        // A window in the page's corner.
                        position: "absolute",
                        [panelSide]: 16,
                        bottom: 16,
                        width: panelWidth,
                        maxWidth: "calc(100% - 32px)",
                        height: "min(70%, 560px)",
                        border: "1px solid",
                        borderRadius: 2,
                        boxShadow: "shadow.large",
                        overflow: "hidden",
                        zIndex: 5,
                      }),
            }}
          >
            <Box
              sx={{
                flex: "1 1 auto",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                "& > *": { flex: "1 1 auto", minHeight: 0 },
              }}
            >
              {panel}
            </Box>
            {/* The composer's one home, whichever way it is shown.

                A card floating over the page and a band standing under the
                conversation are the same element here, moved by styles. It
                used to be two: one at the layout's root, one in this column,
                and switching between them handed the composer to a different
                parent — React rebuilds a subtree that changes parents, and a
                request in flight died with it. The page's own docked band is
                still in the page column; that one never moves at runtime. */}
            {hasBand && bandMode !== "docked" ? (
              <Box
                data-page-panel-band={bandInPanel ? "" : undefined}
                sx={
                  bandInPanel
                    ? {
                        flex: "0 0 auto",
                        borderTop: "1px solid",
                        borderColor: "border.default",
                        // Visible even while the column itself is hidden —
                        // which it is until something opens the panel.
                        visibility: "visible",
                        pointerEvents: "auto",
                        "& > *": { justifyContent: "center" },
                      }
                    : {
                        /* The card positions itself against this layout's
                           root; this only has to stay out of its way, and
                           stay visible when the column around it is not. */
                        position: "absolute",
                        inset: 0,
                        visibility: "visible",
                        pointerEvents: "none",
                        "& > *": { pointerEvents: "auto" },
                      }
                }
              >
                {bandInPanel ? chips : null}
                {band}
              </Box>
            ) : null}
          </Box>
        )}
      </Box>
      {transient}
    </Box>
  );
}

export default PageLayout;
