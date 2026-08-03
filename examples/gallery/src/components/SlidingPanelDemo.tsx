import { Button, Text } from '@primer/react';
import { Box, SlidingPanel } from '@datalayer/primer-addons';
import { useState } from 'react';

export function SlidingPanelDemo() {
  const [northOpen, setNorthOpen] = useState(false);
  const [southOpen, setSouthOpen] = useState(false);
  const [eastOpen, setEastOpen] = useState(false);
  const [westOpen, setWestOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Text as="p" sx={{ color: 'fg.muted', m: 0 }}>
        Generic sliding overlay panel with directional placement, variants and optional auto-dismiss.
      </Text>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button onClick={() => setNorthOpen(true)}>Open North Info (auto-hide)</Button>
        <Button onClick={() => setSouthOpen(true)}>Open South Warning</Button>
        <Button onClick={() => setEastOpen(true)}>Open East Success</Button>
        <Button onClick={() => setWestOpen(true)}>Open West Error</Button>
      </Box>

      <SlidingPanel
        isOpen={northOpen}
        onDismiss={() => setNorthOpen(false)}
        position="north"
        variant="info"
        durationMs={3200}
        fullWidth={true}
        message="North panel: automatically hides after 3.2 seconds."
        details="This variant is useful for non-blocking notifications near the top edge."
      />

      <SlidingPanel
        isOpen={southOpen}
        onDismiss={() => setSouthOpen(false)}
        position="south"
        variant="warning"
        durationMs={0}
        fullWidth={true}
        message="South panel: stays visible until dismissed."
        details="Use this when users need more time to read the guidance text."
      />

      <SlidingPanel
        isOpen={eastOpen}
        onDismiss={() => setEastOpen(false)}
        position="east"
        variant="success"
        panelSize={360}
        durationMs={0}
        message="East panel: side inspectors and details panes."
        details="Pick east or west placement when you need persistent contextual notices."
      />

      <SlidingPanel
        isOpen={westOpen}
        onDismiss={() => setWestOpen(false)}
        position="west"
        variant="error"
        panelSize={360}
        durationMs={0}
        message="West panel: error or danger notices."
        details="Use this variant for high-priority messages that require user attention."
      />

      {(southOpen || eastOpen || westOpen) ? (
        <Box>
          <Button
            size="small"
            onClick={() => {
              setSouthOpen(false);
              setEastOpen(false);
              setWestOpen(false);
            }}
          >
            Dismiss open panels
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
