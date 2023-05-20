import {
  BaseStyles,
  Box,
  Text,
  ThemeProvider
} from "@primer/react";

import "./App.css";

const App = () => {
  return (
    <ThemeProvider colorMode="night">
      <BaseStyles>
        <Box bg="canvas.default">
          <Box>
            <Text>Primer React</Text>
          </Box>
            <Box>
              <Text>Addons</Text>            
            </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  )
}

export default App;
