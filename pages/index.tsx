import {
  Center,
  Image,
  Group,
  MediaQuery,
} from '@mantine/core';
import { Fade } from 'react-awesome-reveal';
import { Welcome } from '../components/Welcome';
import { Colleges } from '../components/Colleges';
import { Packages } from '../components/Packages';
import { Testimonials } from '../components/Testimonials';

export default function Home() {
  return (
    <>
      <Fade triggerOnce>
        <MediaQuery
          query="(max-width: 700px)"
          styles={{ flexDirection: 'column' }}
        >
          <Group
            sx={{ width: '100vw', minHeight: '80vh', flexDirection: 'row' }}
            position="center"
            noWrap
          >
            <Center p="xl" sx={{ maxWidth: '500px' }}>
              <Image alt="Oriana" src="/images/oriana3.jpg" radius="xl" />
            </Center>
            <Welcome />
          </Group>
        </MediaQuery>
      </Fade>
      <Colleges />
      <Packages />
      <Testimonials />
    </>
  );
}
