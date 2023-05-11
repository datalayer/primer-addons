import {
  ThemeProvider,
  BaseStyles,
  Box,
  ToggleSwitch,
  Text,
  IconButton,
} from "@primer/react";
import { SearchIcon, ThreeBarsIcon, GearIcon } from "@primer/octicons-react";
import { Slider, Toolbar } from "./index";
import "./App.css";
import { Fragment, useState } from "react";

function App() {
  const [isOn, setIsOn] = useState(false);
  return (
    <>
      <ThemeProvider colorMode={isOn ? "day" : "night"}>
        <BaseStyles>
          <Fragment>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              sx={{ height: "100%", width: "100%" }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
              >
                <Text as={"h2"}>Primer AddOns</Text>
                <Box>
                  <Text>Lights</Text>
                  <ToggleSwitch
                    onClick={() => setIsOn(!isOn)}
                    checked={isOn}
                    aria-labelledby="switchLabel"
                  />
                </Box>
              </Box>
              <Box>
                <Slider />
                <Toolbar
                  heading={
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ gap: "0.5rem" }}
                    >
                      <IconButton
                        aria-label="Search"
                        icon={ThreeBarsIcon}
                        size="small"
                        variant="invisible"
                      />
                      <Text>Datalayer Toolbar</Text>
                    </Box>
                  }
                  align="flex-end"
                  border={true}
                  gap="1rem"
                  padding="0 1rem"
                >
                  <IconButton
                    aria-label="Search"
                    icon={SearchIcon}
                    size="small"
                  />
                  <Text>Action1</Text>
                  <Text>Action2</Text>
                  <Text>Action3</Text>
                  <IconButton
                    aria-label="Search"
                    icon={GearIcon}
                    size="small"
                    variant="invisible"
                  />
                </Toolbar>
              </Box>
            </Box>
          </Fragment>
        </BaseStyles>
      </ThemeProvider>
    </>
  );
}

export default App;
