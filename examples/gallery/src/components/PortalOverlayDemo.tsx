import {
  ActionList,
  ActionMenu,
  AnchoredOverlay,
  Button,
  Label,
  Overlay as PrimerOverlay,
  Text,
} from '@primer/react';
import { Box } from '@datalayer/primer-addons';
import { useRef, useState } from 'react';

export function PortalOverlayDemo() {
  const [open, setOpen] = useState(false);
  const [primerOpen, setPrimerOpen] = useState(false);
  const primerButtonRef = useRef<HTMLButtonElement>(null);
  const [primerCoords, setPrimerCoords] = useState({ top: 0, left: 0 });

  const openPrimerOverlay = () => {
    const rect = primerButtonRef.current?.getBoundingClientRect();
    if (rect) {
      const portalRoot = document.getElementById('__primerPortalRoot__');
      const portalRect = portalRoot?.getBoundingClientRect();
      setPrimerCoords({
        top: rect.bottom - (portalRect?.top ?? 0) + 4,
        left: rect.left - (portalRect?.left ?? 0),
      });
    }
    setPrimerOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Text as="p" sx={{ color: 'fg.muted', m: 0 }}>
        These overlays render through Primer portals (outside the React tree, as a child of
        &lt;body&gt;). Use them to verify the active theme is followed inside portaled content.
      </Text>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
        <ActionMenu>
          <ActionMenu.Anchor>
            <Button>Open ActionMenu</Button>
          </ActionMenu.Anchor>
          <ActionMenu.Overlay width="medium" sx={{ mt: '2px' }}>
            <ActionList>
              <ActionList.Item>
                New Notebook
                <ActionList.Description variant="block">
                  Create a themed notebook document.
                </ActionList.Description>
              </ActionList.Item>
              <ActionList.Item>
                New Dataset
                <ActionList.Description variant="block">
                  Add a dataset to the current space.
                </ActionList.Description>
              </ActionList.Item>
              <ActionList.Divider />
              <ActionList.Item variant="danger">Delete</ActionList.Item>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>

        <AnchoredOverlay
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderAnchor={anchorProps => (
            <Button {...anchorProps}>Open AnchoredOverlay</Button>
          )}
        >
          <Box sx={{ p: 3, width: 260, display: 'grid', gap: 2 }}>
            <Text sx={{ fontWeight: 'bold' }}>Shopping cart</Text>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
              <Text>Neon Harbor</Text>
              <Text sx={{ color: 'fg.muted' }}>x 1</Text>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 3,
                pt: 2,
                mt: 1,
                borderTop: '1px solid',
                borderColor: 'var(--borderColor-default)',
                fontWeight: 'bold',
              }}
            >
              <Text>Total</Text>
              <Text>$0.99</Text>
            </Box>
            <Label variant="accent">Themed portal content</Label>
          </Box>
        </AnchoredOverlay>

        <Button ref={primerButtonRef} onClick={openPrimerOverlay}>
          Open Primer Overlay
        </Button>
        {primerOpen && (
          <PrimerOverlay
            returnFocusRef={primerButtonRef}
            ignoreClickRefs={[primerButtonRef]}
            onEscape={() => setPrimerOpen(false)}
            onClickOutside={() => setPrimerOpen(false)}
            top={primerCoords.top}
            left={primerCoords.left}
          >
            <Box sx={{ p: 3, width: 240, display: 'grid', gap: 2 }}>
              <Text sx={{ fontWeight: 'bold' }}>Base Primer Overlay</Text>
              <Text sx={{ color: 'fg.muted' }}>
                Low-level portaled surface from @primer/react.
              </Text>
              <Label variant="accent">Themed portal content</Label>
            </Box>
          </PrimerOverlay>
        )}
      </Box>
    </Box>
  );
}
