import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false,
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    // The package's source, not its build: an edit shows up on the next
    // reload. The reactor corner is a separate entry — the main barrel keeps
    // `@datalayer/reactor` out of pages that have none — so it needs its own
    // alias, listed first so the longer path is matched before the bare name.
    alias: [
      {
        find: '@datalayer/primer-addons/lib/reactor',
        replacement: path.resolve(__dirname, '../../src/reactor/index.ts'),
      },
      {
        find: '@datalayer/primer-addons',
        replacement: path.resolve(__dirname, '../../src/index.ts'),
      },
    ],
    // One React, one Primer, one reactor: the package's source resolves its
    // dependencies from the workspace above, and a copy installed under this
    // example would otherwise run beside them — two Reacts, and hooks that
    // throw.
    dedupe: [
      'react',
      'react-dom',
      '@primer/react',
      'styled-components',
      'zustand',
      '@datalayer/reactor',
    ],
  },
});
