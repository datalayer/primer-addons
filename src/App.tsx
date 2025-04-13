import { useState, useRef } from "react";
import { BaseStyles, Box, Text, NavList, Heading, ThemeProvider, Button, theme } from "@primer/react";
import { Slider, Overlay } from ".";

import "./App.css";

import "@primer/primitives/dist/css/base/typography/typography.css";
import "@primer/primitives/dist/css/functional/themes/light.css";
import "@primer/primitives/dist/css/functional/size/border.css";
import "@primer/primitives/dist/css/functional/size/breakpoints.css";
import "@primer/primitives/dist/css/functional/size/size-coarse.css";
import "@primer/primitives/dist/css/functional/size/size-fine.css";
import "@primer/primitives/dist/css/functional/size/size.css";
import "@primer/primitives/dist/css/functional/size/viewport.css";
import "@primer/primitives/dist/css/functional/typography/typography.css";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  return (
    <ThemeProvider colorMode="day" theme={theme}>
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
              <Text>Primer React Addons</Text>
            </Box>
            <Box>
              <Slider id="slider" name="slider" min={1} max={10} onChange={() => {}} />
            </Box>
            <Box p={3} bg="canvas.default">
              <Box>
                <Box sx={{width: '100%', bg: 'darkgray'}}>
                  <Heading ref={headingRef}>Header</Heading>
                </Box>
                <Box>
                  <Button ref={openButtonRef} onClick={() => {setIsOpen(!isOpen)}}>
                    Open overlay
                  </Button>
                  <Overlay
                    isOpen={isOpen}
                    content={<Text>Look, I am an <Button>Overlay 👉</Button></Text>}
                    setIsOpen={setIsOpen}
                    openButtonRef={openButtonRef}
                    closeButtonRef={closeButtonRef}
                    headingRef={headingRef}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
       </BaseStyles>
    </ThemeProvider>
  )
}

export default App;
