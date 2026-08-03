import { Text } from '@primer/react';
import { Box } from '@datalayer/primer-addons';

export function BoxDemo() {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'var(--borderColor-default)',
        bg: 'canvas.subtle',
      }}
    >
      <Text>Addon Box with sx styling.</Text>
    </Box>
  );
}
