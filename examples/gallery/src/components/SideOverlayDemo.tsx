import { Button, Heading, Text } from '@primer/react';
import { Box, SideOverlay } from '@datalayer/primer-addons';
import { useRef, useState } from 'react';

export function SideOverlayDemo() {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const openLeftButtonRef = useRef<HTMLButtonElement>(null);
  const openRightButtonRef = useRef<HTMLButtonElement>(null);
  const closeLeftButtonRef = useRef<HTMLButtonElement>(null);
  const closeRightButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Heading as="h3" sx={{ fontSize: 2 }}>
        Side Overlay
      </Heading>
      <Text as="p" sx={{ color: 'fg.muted', m: 0 }}>
        Open each variant to verify left and right behavior. These overlays start
        at the top of the viewport and span the full window height.
      </Text>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button ref={openLeftButtonRef} onClick={() => setIsLeftOpen(true)}>
          Open Left Variant
        </Button>
        <Button ref={openRightButtonRef} onClick={() => setIsRightOpen(true)}>
          Open Right Variant
        </Button>
      </Box>
      <SideOverlay
        isOpen={isLeftOpen}
        setIsOpen={setIsLeftOpen}
        openButtonRef={openLeftButtonRef}
        closeButtonRef={closeLeftButtonRef}
        direction="left"
        width="440px"
        content={
          <Box sx={{ width: '100%', p: 2, overflow: 'auto' }}>
            <Heading as="h4" sx={{ fontSize: 2, mb: 2 }}>
              Left Side Overlay
            </Heading>
            <Text as="p" sx={{ color: 'fg.muted' }}>
              This panel is attached to the left edge and spans the full viewport height.
            </Text>
            <Text as="p">Try toggling theme controls while this overlay is open.</Text>
          </Box>
        }
      />
      <SideOverlay
        isOpen={isRightOpen}
        setIsOpen={setIsRightOpen}
        openButtonRef={openRightButtonRef}
        closeButtonRef={closeRightButtonRef}
        direction="right"
        width="440px"
        content={
          <Box sx={{ width: '100%', p: 2, overflow: 'auto' }}>
            <Heading as="h4" sx={{ fontSize: 2, mb: 2 }}>
              Right Side Overlay
            </Heading>
            <Text as="p" sx={{ color: 'fg.muted' }}>
              This panel is attached to the right edge and spans the full viewport height.
            </Text>
            <Text as="p">Use this variant for property panels and side inspectors.</Text>
          </Box>
        }
      />
    </Box>
  );
}
