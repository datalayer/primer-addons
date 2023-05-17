import {
  BaseStyles,
  Box,
  Text,
  ThemeProvider,
} from "@primer/react";

import "./App.css";

const App = () => {
  return (
    <ThemeProvider>
      <BaseStyles>
        <Box>
          <Text>Primer Addons</Text>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
