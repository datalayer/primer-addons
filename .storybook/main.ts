import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {},
  viteFinal: async config => {
    // Configure resolve aliases for Node.js built-in modules
    config.resolve = {
      ...config.resolve,
      alias: [
        ...(Array.isArray(config.resolve?.alias) ? config.resolve.alias : []),
        {
          find: 'crypto',
          replacement: 'crypto-browserify',
        },
      ],
    };

    // Configure optimization dependencies
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include || []), 'crypto-browserify'],
    };

    return config;
  },
};

export default config;
