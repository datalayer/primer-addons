import { Box } from '@datalayer/primer-addons';
import { CloseableFlash } from '@datalayer/primer-addons';

export function CloseableFlashDemo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <CloseableFlash variant="default">Default flash message.</CloseableFlash>
      <CloseableFlash variant="success">Success flash message.</CloseableFlash>
      <CloseableFlash variant="warning">Warning flash message.</CloseableFlash>
      <CloseableFlash variant="danger">Danger flash message.</CloseableFlash>
    </Box>
  );
}
