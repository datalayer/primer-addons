import { useEffect, useState } from 'react';
import {
  Button,
  Overlay as PrimerOverlay,
  Box
} from "@primer/react";

export interface OverlayProps {
  direction: 'left' | 'right';
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  content: JSX.Element;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  confirmButtonRef?: React.RefObject<HTMLButtonElement>;
  headingRef?: React.RefObject<HTMLHeadingElement>;
}

const PrimerAddonOverlay = (props: OverlayProps) => {

  const { content, buttonRef, confirmButtonRef, headingRef, isOpen, setIsOpen } = props;

  const [direction, _] = useState(props.direction);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(headingRef?.current?.getBoundingClientRect().bottom ?? 0)
  }, [headingRef])

  const closeOverlay = () => setIsOpen!(false);

  return (
    confirmButtonRef && buttonRef && headingRef && <>
      {isOpen ? 
        direction === 'left' ? 
          <PrimerOverlay
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
              {content}
            </Box>
          </PrimerOverlay> 
        : 
          <PrimerOverlay
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
              {content}
            </Box>
          </PrimerOverlay> 
      : null}
    </>
  );
};

export const Overlay = (props: OverlayProps) => {
  return (
    <PrimerAddonOverlay {...props}/>
  )
};

export default Overlay;
