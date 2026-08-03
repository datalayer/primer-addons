import { Box, CircleIcon } from '@datalayer/primer-addons';

export function CircleIconDemo() {
  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <CircleIcon color="accent" />
      <CircleIcon color="#dd2222" />
    </Box>
  );
}
