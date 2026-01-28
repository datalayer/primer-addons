import type { Preview } from "@storybook/react";
import {
  toolbarTypes,
  withThemeProvider,
} from "../src/_utils/story-helpers";

// Import Primer CSS variables
import "@primer/primitives/dist/css/primitives.css";
import "@primer/primitives/dist/css/functional/themes/light.css";
import "@primer/primitives/dist/css/functional/themes/dark.css";

export const globalTypes = toolbarTypes;
export const decorators = [withThemeProvider];

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Welcome', '*'],
        locales: 'en-US',
      },
    },
  },
};

export default preview;
