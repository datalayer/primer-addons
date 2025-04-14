import { useState, useRef } from "react";
import { BaseStyles, Box, Text, NavList, Heading, ThemeProvider, Button, theme, ActionMenu, IconButton, ActionList } from "@primer/react";
import { KebabHorizontalIcon } from "@primer/octicons-react";
import { DatalayerIcon, LogOutIcon, SettingsIcon } from "@datalayer/icons-react";
import { Slider, Overlay } from ".";

import "@primer/primitives/dist/css/base/typography/typography.css";
import "@primer/primitives/dist/css/functional/themes/light.css";
import "@primer/primitives/dist/css/functional/size/border.css";
import "@primer/primitives/dist/css/functional/size/breakpoints.css";
import "@primer/primitives/dist/css/functional/size/size-coarse.css";
import "@primer/primitives/dist/css/functional/size/size-fine.css";
import "@primer/primitives/dist/css/functional/size/size.css";
import "@primer/primitives/dist/css/functional/size/viewport.css";
import "@primer/primitives/dist/css/functional/typography/typography.css";

import "./App.css";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  return (
    <ThemeProvider colorMode="day" theme={theme}>
      <BaseStyles>
        <ActionMenu>
          <ActionMenu.Anchor>
            <IconButton
              icon={KebabHorizontalIcon}
              variant="invisible"
              aria-label="jupyter-runtimes-more"
            />
          </ActionMenu.Anchor>
          <ActionMenu.Overlay width="medium">
            <ActionList>
              <ActionList.Group>
                <ActionList.GroupHeading>More…</ActionList.GroupHeading>
                <ActionList.Item onSelect={() => alert('click')}>
                  <ActionList.LeadingVisual>
                    <SettingsIcon />
                  </ActionList.LeadingVisual>
                  Settings
                  <ActionList.Description variant="block">
                    Configure your personal settings.
                  </ActionList.Description>
                </ActionList.Item>
              <ActionList.Item onSelect={() => alert('click')}>
                  <ActionList.LeadingVisual>
                    <DatalayerIcon />
                  </ActionList.LeadingVisual>
                  About
                  <ActionList.Description variant="block">
                    About Runtimes.
                  </ActionList.Description>
                </ActionList.Item>
              </ActionList.Group>
              <>
                <ActionList.Divider />
                <ActionList.Item
                  variant="danger"
                  onSelect={e => alert('click')}
                >
                  <ActionList.LeadingVisual>
                    <LogOutIcon />
                  </ActionList.LeadingVisual>
                  Logout
                </ActionList.Item>
              </>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
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
