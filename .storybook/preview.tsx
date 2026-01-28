import type { Preview } from "@storybook/react";
import type { DocsContainerProps } from "@storybook/blocks";
import { DocsContainer } from "@storybook/blocks";
import { ThemeProvider, BaseStyles, themeGet, theme } from "@primer/react";
import { createGlobalStyle } from "styled-components";
import type { PropsWithChildren } from "react";

const GlobalStyle = createGlobalStyle`
  body,
  .docs-story {
    background-color: ${themeGet("colors.canvas.default")};
    color: ${themeGet("colors.fg.default")};
  }
`;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      container: ({ children, context }: PropsWithChildren<DocsContainerProps>) => (
        <ThemeProvider theme={theme} colorMode="light">
          <GlobalStyle />
          <BaseStyles>
            <DocsContainer context={context}>{children}</DocsContainer>
          </BaseStyles>
        </ThemeProvider>
      ),
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme} colorMode="light">
        <GlobalStyle />
        <BaseStyles>
          <Story />
        </BaseStyles>
      </ThemeProvider>
    ),
  ],
};

export default preview;
