import { useEffect, useState } from 'react';
import { Box, IconButton, Overlay as PrimerOverlay } from "@primer/react";
import { XIcon } from "@primer/octicons-react";

export interface OverlayProps {
  closeButtonRef?: React.RefObject<HTMLButtonElement>;
  content: JSX.Element;
  direction: 'left' | 'right';
  headingRef?: React.RefObject<HTMLHeadingElement>;
  isOpen?: boolean;
  openButtonRef?: React.RefObject<HTMLButtonElement>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  width: number | string;
}

const PrimerAddonOverlay = (props: OverlayProps) => {

  const {
    closeButtonRef,
    content,
    headingRef,
    isOpen,
    openButtonRef,
    setIsOpen,
    width,
  } = props;

  const [direction, _] = useState(props.direction);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(headingRef?.current?.getBoundingClientRect().bottom ?? 0)
  }, [headingRef])

  const closeOverlay = () => setIsOpen!(false);

  return (
    closeButtonRef && openButtonRef ? 
    <>
      {isOpen ? 
        direction === 'left' ? 
          <PrimerOverlay
            initialFocusRef={closeButtonRef}
            returnFocusRef={openButtonRef}
            ignoreClickRefs={[openButtonRef]}
            onEscape={closeOverlay}
            onClickOutside={closeOverlay}
            width="auto"
            anchorSide="inside-right"
            top={top}
          >
            <Box sx={{
              /* We need to remove the padding */
              height: `calc(100vh - ${top}px - 8px)`,
              width,
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
                <IconButton
                  variant='invisible'
                  ref={closeButtonRef}
                  onClick={closeOverlay}
                  icon={XIcon}
                  aria-labelledby="close"
                />
              </Box>
              {content}
            </Box>
          </PrimerOverlay> 
        : 
          <PrimerOverlay
            initialFocusRef={closeButtonRef}
            returnFocusRef={openButtonRef}
            ignoreClickRefs={[openButtonRef]}
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
              width,
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
                <IconButton
                  variant='invisible'
                  ref={closeButtonRef}
                  onClick={closeOverlay}
                  icon={XIcon}
                  aria-labelledby="close"
                />
              </Box>
              {content}
            </Box>
          </PrimerOverlay> 
      : <></>}
    </>
    :
      <></>
  );
};

export const Overlay = (props: OverlayProps) => {
  return (
    <PrimerAddonOverlay {...props}/>
  )
};

Overlay.defaultProps = {
  width: '500px',
} as Partial<OverlayProps>;

export default Overlay;
