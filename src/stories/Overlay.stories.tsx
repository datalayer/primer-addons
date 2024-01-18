import { Box, Button, Heading, Overlay, Text, ThemeProvider } from '@primer/react'
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

const meta = {
  title: 'Components/Overlay',
  component: Overlay,
} satisfies Meta<typeof Overlay>

export default meta

type Story = StoryObj<typeof Overlay>

export const Default: Story = ({
  right
}: {
  right?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>(right ? 'right' : 'left');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(headingRef.current?.getBoundingClientRect().bottom ?? 0)
  }, [headingRef])


  const closeOverlay = () => setIsOpen(false);
  return (
    <ThemeProvider>
      <Box sx={{width: '100%', bg: 'darkgray'}}><Heading ref={headingRef}>Header</Heading></Box>
      <Box>
        <Button ref={buttonRef} onClick={() => {
          setIsOpen(!isOpen);
          setDirection('left');
        }}>
          Open left overlay
        </Button>
        <Button ref={buttonRef} onClick={() => {
            setIsOpen(!isOpen);
            setDirection('right');
          }} sx={{
            mt: 2
          }}
        >
          Open right overlay
        </Button>
        {isOpen ? 
          direction === 'left' ? 
            <Overlay
              initialFocusRef={confirmButtonRef}
              returnFocusRef={buttonRef}
              ignoreClickRefs={[buttonRef]}
              onEscape={closeOverlay}
              onClickOutside={closeOverlay}
              width="auto"
              anchorSide="inside-right"
              top={top}
            >
              <Box sx={{
                /* We need to remove the padding */
                height: `calc(100vh - ${top}px - 8px)`,
                width: '500px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '4px'
              }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    width: '100%'
                  }}
                >
                  <Button
                    ref={confirmButtonRef}
                    onClick={closeOverlay}
                  >
                    Close me
                  </Button>
                </Box>
                <Text>Look! left aligned</Text>
              </Box>
            </Overlay> 
          : 
            <Overlay
              initialFocusRef={confirmButtonRef}
              returnFocusRef={buttonRef}
              ignoreClickRefs={[buttonRef]}
              onEscape={closeOverlay}
              onClickOutside={closeOverlay}
              width="auto"
              anchorSide={'inside-left'}
              right={0}
              position="fixed"
              top={top}
            >
              <Box sx={{
                /* We need to remove the padding */
                height: `calc(100vh - ${top}px - 8px)`,
                width: '500px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '4px'
              }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    width: '100%'
                  }}
                >
                  <Button
                    ref={confirmButtonRef}
                    onClick={closeOverlay}
                  >
                    Close me
                  </Button>
                </Box>
                <Text>Look! right aligned</Text>
              </Box>
            </Overlay> 
        : null}
      </Box>
    </ThemeProvider>
  );
};