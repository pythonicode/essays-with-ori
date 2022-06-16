import { Container, Group, ScrollArea, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Fade } from 'react-awesome-reveal';

export function Colleges() {
  const mobile = useMediaQuery('(max-width: 700px)');
  const theme = useMantineTheme();

  return (
    <Container
      p="xl"
      sx={{
        backgroundColor: theme.colorScheme == 'light' ? theme.colors.gray[1] : theme.colors.gray[8],
      }}
      fluid
    >
      <Title align="center" sx={{ fontSize: 'clamp(1rem, 1.5vw, 2rem)' }} mt="xl">
        Students I've worked with have been accepted to...
      </Title>
      <ScrollArea sx={{ width: '100%' }} my="xl">
        <Group
          align="center"
          position={mobile ? 'center' : 'apart'}
          direction={mobile ? 'column' : 'row'}
          p="xl"
          sx={{ width: '100%' }}
          spacing={50}
        >
          <Fade cascade triggerOnce>
            <img src="/images/colleges/stanford.svg" alt="Stanford" width="200px" />
            <img src="/images/colleges/princeton.svg" alt="Princeton" width="200px" />
            <img src="/images/colleges/harvard.svg" alt="Harvard" width="200px" />
            <img src="/images/colleges/carnegiemelon.svg" alt="Carnegie Melon" width="200px" />
            <img src="/images/colleges/brown.svg" alt="Brown" width="200px" />
          </Fade>
        </Group>
      </ScrollArea>
    </Container>
  );
}
