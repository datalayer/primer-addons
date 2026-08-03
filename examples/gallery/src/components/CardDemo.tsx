import { Button, Text } from '@primer/react';
import { Card } from '@datalayer/primer-addons';

export function CardDemo() {
  return (
    <Card border rounded="medium" shadow="medium" sx={{ maxWidth: 520 }}>
      <Card.Header title="Datalayer Card" description="Composable addon component" />
      <Card.Content>
        <Text as="p" sx={{ m: 0 }}>
          The Card API supports header, content, image and action slots.
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button>Action</Button>
      </Card.Actions>
    </Card>
  );
}
