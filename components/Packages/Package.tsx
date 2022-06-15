import { Group, Title, Text, Stack, useMantineTheme, Card, Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function Package({ title, badge, price }: any) {
  const mobile = useMediaQuery('(max-width: 700px)');

  return (
    <Card shadow="sm" p="xl" sx={{ width: mobile ? '90%' : '300px' }}>
      <Stack>
        {badge}
        <Title order={3} align="center">
          {title}
        </Title>
        <Title align="center">{price ? `\$${price}.00` : 'Free'}</Title>
      </Stack>
    </Card>
  );
}
