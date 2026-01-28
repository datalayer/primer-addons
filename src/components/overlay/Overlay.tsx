import { useEffect, useState } from 'react';
import { IconButton, Overlay as PrimerOverlay, BaseStyles, ThemeProvider, useTheme } from "@primer/react";
import { XIcon } from "@primer/octicons-react";
import { Box } from '../box/Box';

export interface OverlayProps {
  closeButtonRef?: React.RefObject<HTMLButtonElement>;
  content: JSX.Element;
  direction?: 'left' | 'right';
  headingRef?: React.RefObject<HTMLHeadingElement>;
  isOpen?: boolean;
  openButtonRef?: React.RefObject<HTMLButtonElement>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  width?: number | string;
  zIndex?: number;
}

const PrimerAddonOverlay = (props: OverlayProps) => {
  const {
    closeButtonRef,
    content,
    direction: propsDirection,
    headingRef,
    isOpen,
    openButtonRef,
    setIsOpen,
    width,
    zIndex,
  } = props;
  const { theme, colorMode } = useTheme();
  const [direction, _] = useState(propsDirection);
  const [top, setTop] = useState(0);
  useEffect(() => {
    setTop(headingRef?.current?.getBoundingClientRect().bottom ?? 0)
  }, [headingRef])
  const closeOverlay = () => setIsOpen!(false);

  const overlayContent = (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <BaseStyles>
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
      </BaseStyles>
    </ThemeProvider>
  );

  return (
    closeButtonRef && openButtonRef ? 
    <>
      {isOpen ? 
        direction === 'left' ?
          <Box sx={{ zIndex }}>
            <PrimerOverlay
              initialFocusRef={closeButtonRef}
              returnFocusRef={openButtonRef}
              ignoreClickRefs={[openButtonRef]}
              onEscape={closeOverlay}
              onClickOutside={closeOverlay}
              width="auto"
              anchorSide="inside-right"
              left={0}
              position="fixed"
              top={top}
            >
              {overlayContent}
            </PrimerOverlay>
          </Box>
        : 
          <Box sx={{ zIndex }}>
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
              {overlayContent}
            </PrimerOverlay>
          </Box>
      : <></>}
    </>
    :
      <></>
  );
};

export const Overlay = ({
  width = '500px',
  direction = 'left',
  zIndex = 100,
  ...rest
}: OverlayProps) => {
  return (
    <PrimerAddonOverlay width={width} direction={direction} zIndex={zIndex} {...rest}/>
  )
};

export default Overlay;
