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
 * application, with chips directly under it. With no page to show, the side
 * panel's content is the page: the same sheet, holding it, and no side
 * panel. While something works in the page, a small line at the top of the
 * sheet says what it is doing — "Analyst is adding a cell…" — so the change
 * is seen where it happens. The panel is a column on the right that opens
 * when it is wanted; closed, the page is all there is.
 *
 * The band holds one **mount point**, and that is what gives its content its
 * width: the same `sheetWidth` column the sheet gets, centred the same way,
 * inside the same canvas padding. So the band and the page below it are one
 * column with one pair of edges, and they stay one when the panel opens and
 * narrows the canvas — because the band lives inside the page column, not
 * across the whole view. A floating card sizes itself, which is why it never
 * lines up with anything and is given a strip of empty canvas to hover over.
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
 * The canvas' own gutters, shared by the sheet and the band.
 *
 * One constant rather than two literals: the two are only aligned as long as
 * they are equal, and a column that lines up by coincidence stops lining up
 * the first time one of them is edited.
 */
const CANVAS_PX = [2, 3, 4];

/**
 * The strip of canvas kept clear under a floating band.
 *
 * The card is absolutely positioned, so the flow has to leave room for it or
 * the sheet slides underneath: measured, a composer with its footer stands
 * about 170px tall, anchored 16px from the top.
 */
const BAND_STRIP = 188;

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
   * `floating`: the band's content is a draggable card over the top of the
   * canvas, positioned by itself against this layout's root.
   */
  bandMode?: "docked" | "floating";
  /** The sheet's width; {@link PAGE_SHEET_WIDTH} by default. */
  sheetWidth?: number;
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
  sheetWidth = PAGE_SHEET_WIDTH,
  panelWidth = PAGE_PANEL_WIDTH,
}: PageLayoutProps): JSX.Element {
  const floating = bandMode === "floating";
  const panelOpen = useSignalValue(pageLayoutPanelOpen);
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
          {band && !floating ? (
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
              <Box sx={{ width: "100%", maxWidth: sheetWidth, minWidth: 0 }}>
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
              // Under a floating card, room for it above the first line of
              // the sheet — only while there is one.
              pt: floating && band ? `${BAND_STRIP}px` : 3,
              pb: 6,
              px: CANVAS_PX,
            }}
          >
            {/* The chips, under the band and above the sheet. */}
            {band && chips ? (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: sheetWidth,
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
                  maxWidth: sheetWidth,
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
                maxWidth: sheetWidth,
                flex: hasPage ? "0 0 auto" : "1 1 auto",
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
                minHeight: hasPage ? 480 : 0,
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
            is a page; its content is the sheet otherwise. */}
        {!hasPage || !panel ? null : panelOpen ? (
          <Box
            data-page-panel=""
            sx={{
              flex: `0 0 ${panelWidth}px`,
              maxWidth: "45%",
              minWidth: 0,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              bg: "canvas.default",
              borderLeft: "1px solid",
              borderColor: "border.default",
              // Over the canvas, and beside the band rather than under it:
              // the band belongs to the page column.
              zIndex: 1,
              "& > *": { flex: "1 1 auto", minHeight: 0 },
            }}
          >
            {panel}
          </Box>
        ) : (
          // Kept mounted, out of sight: a conversation is where the tools
          // run and the stream lands, and a panel that unmounted it would
          // stop the agent the moment the reader closed it.
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
            {panel}
          </Box>
        )}
      </Box>
      {transient}
      {/* Floating: anchored to the top of the canvas, the command line of
          the page. It positions itself against the relative root above. */}
      {floating ? band : null}
    </Box>
  );
}

export default PageLayout;
