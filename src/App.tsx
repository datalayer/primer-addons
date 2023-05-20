import {
  BaseStyles,
  Box,
  Text,
  NavList,
  ThemeProvider
} from "@primer/react";
import { Slider } from ".";

import "./App.css";

const App = () => {
  return (
    <ThemeProvider colorMode="night">
      <BaseStyles>
        <Box bg="canvas.default" sx={{ display: 'flex' }}>
          <Box>
            <NavList>
              <NavList.Item href="/" aria-current="page">
                Home
              </NavList.Item>
              <NavList.Item href="/about">About</NavList.Item>
              <NavList.Item href="/contact">Contact</NavList.Item>
            </NavList>
          </Box>
          <Box p={3} sx={{ flexGrow: 1 }}>
            <Box>
              <Text>Primer React</Text>
            </Box>
            <Box>
              <Text>Addons</Text>            
            </Box>
            <Box>
              <Slider/>
            </Box>
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  )
}

export default App;
