import {
  Center,
  Container,
  Image,
  Text,
  Title,
  useMantineTheme,
  Group,
  ScrollArea,
  Transition,
} from '@mantine/core';
import { Welcome } from '../components/Welcome';
import { useMediaQuery } from '@mantine/hooks';
import { Colleges } from '../components/Colleges';
import { Packages } from '../components/Packages';

export default function Start() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery('(max-width: 700px)');

  return (
    <>
      <Group
        direction={mobile ? 'column' : 'row'}
        sx={{ width: '100vw', minHeight: '80vh' }}
        position="center"
      >
        <Title>Get Started</Title>
      </Group>
    </>
  );
}
