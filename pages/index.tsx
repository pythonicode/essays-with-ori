import { Center, Container, Image, Text, useMantineTheme, Group, ScrollArea } from '@mantine/core';
import { Welcome } from '../components/Welcome';
import { useMediaQuery } from '@mantine/hooks';
import { Colleges } from '../components/Colleges';
import { Packages } from '../components/Packages';

export default function Home() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery('(max-width: 700px)');

  return (
    <>
      <Group
        direction={mobile ? 'column' : 'row'}
        sx={{ width: '100vw', minHeight: '80vh' }}
        position="center"
      >
        <Center p="xl" sx={{ width: mobile ? '90%' : '40%' }}>
          <Image alt="Oriana" src="/images/oriana.jpg" radius="xl" />
        </Center>
        <Welcome />
      </Group>
      <Colleges />
      <Packages />
    </>
  );
}
