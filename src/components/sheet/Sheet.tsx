/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * `Sheet`: a page on a canvas — the canvas colour, its hairline, the theme's
 * card corner (20px in loop) and the shadow a sheet of paper has, lifted off
 * what is under it. The page layout draws its page with it; anything that
 * shows a page of its own (a document, a gallery entry, a preview) can too.
 *
 * It owns its look only. Its size, padding and layout are the caller's,
 * given as Box props (or `sx` while the migration lasts).
 */

import { Box, type BoxProps } from "../box/Box";

/** The shadow of a sheet: a hairline close under it, a soft fall far below. */
export const SHEET_SHADOW =
  "0 1px 2px rgba(0,0,0,0.06), 0 24px 48px -28px rgba(0,0,0,0.35)";

export type SheetProps = BoxProps;

export function Sheet(props: SheetProps) {
  return (
    <Box
      bg="canvas.default"
      border="1px solid"
      borderColor="border.default"
      borderRadius="card"
      boxShadow={SHEET_SHADOW}
      {...props}
    />
  );
}

export default Sheet;
