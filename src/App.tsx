import {
  ThemeProvider,
  BaseStyles,
  Box,
  Text,
} from "@primer/react";

import "./App.css";

function App() {
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
