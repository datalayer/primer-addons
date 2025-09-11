/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ThemeProvider, BaseStyles } from '@primer/react';

export const Styles = () => {
  return (
    <>
      <ThemeProvider>
        <BaseStyles />
      </ThemeProvider>
    </>
  );
};

export default Styles;
