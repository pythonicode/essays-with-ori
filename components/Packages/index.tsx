import { Group, Title, Text, Stack, useMantineTheme, Card, Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Package } from './Package';

export function Packages() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery('(max-width: 700px)');

  return (
    <Group position="center" sx={{ width: '100%' }} p="xl">
      <Package title="Basic" price={45} />
      <Package title="Professional" badge={<Badge>Most Popular</Badge>} price={65} />
      <Package title="Complete" price={100} />
    </Group>
  );
}
