import {
  Center,
  Container,
  Image,
  Text,
  useMantineTheme,
  Group,
  ScrollArea,
  Transition,
} from '@mantine/core';
import { Welcome } from '../components/Welcome';
import { useMediaQuery } from '@mantine/hooks';
import { Colleges } from '../components/Colleges';
import { Packages } from '../components/Packages';
import { Fade } from 'react-awesome-reveal';
import { Testimonials } from '../components/Testimonials';

export default function Home() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery('(max-width: 700px)');

  return (
    <>
      <Fade triggerOnce>
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
      </Fade>
      <Colleges />
      <Packages />
      <Testimonials />
    </>
  );
}
