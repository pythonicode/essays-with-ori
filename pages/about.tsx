import { Center, Image, Text, Title, Group, Stack, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Socials } from '../components/Navbar/Socials';
import { Fade } from 'react-awesome-reveal';
import { useRouter } from 'next/router';

export default function About() {
  const router = useRouter();
  const mobile = useMediaQuery('(max-width: 700px)');

  return (
    <Fade triggerOnce>
      <Group
        direction={mobile ? 'column' : 'row'}
        sx={{ width: '100vw', minHeight: '80vh' }}
        position="center"
      >
        <Center p="xl" sx={{ width: 'min(500px, 90%)' }}>
          <Image alt="Oriana" src="/images/oriana2.jpg" radius="xl" />
        </Center>
        <Stack sx={{ width: 'min(65ch, 80%)' }}>
          <Title>About Me</Title>
          <Text>
            My name is Oriana and I’m part of Stanford’s Class of 2025. I’m a staff writer for the
            Stanford Daily and have written everything from front page breaking news to stories on
            Ukraine cited by Fox News. I’m on the USA orienteering national team, which means I
            spend my weekends running through the woods with a map and a compass (like a crazy
            person.) In my free time, I write short novels and run long distances. I’m an avid
            podcast, Greek yogurt, and Harry Potter enjoyer — so if we’re not talking essays, feel
            free to talk to me about any of those!{' '}
          </Text>
          <Group>
            <Button onClick={() => router.push('/contact')}>Contact Me</Button>
            <Socials />
          </Group>
        </Stack>
      </Group>
    </Fade>
  );
}
