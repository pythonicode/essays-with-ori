import { Blockquote, Container, Group, ScrollArea, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Fade } from 'react-awesome-reveal';

export function Testimonials() {
  const mobile = useMediaQuery('(max-width: 700px)');
  const theme = useMantineTheme();

  return (
    <>
      <Group
        p="xl"
        position="center"
        sx={{
          width: '100vw',
          backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.gray[8],
        }}
        direction={mobile ? 'column' : 'row'}
      >
        <Fade triggerOnce>
          <img src="/images/education.svg" alt="Education" width="300px" />
        </Fade>
        <Fade direction="right" triggerOnce>
          <Blockquote sx={{ maxWidth: '65ch' }} cite="Mira, Harvard 2026" my="xl">
            Oriana always got back to me with comments in a timely manner and I liked having her
            suggestions in Google Docs to look over later as I was revising my writing. She provides
            both notes on what is working well in the essays and what could be improved, which helped
            make my essays better while also giving me confidence during a stressful process. She’s
            thorough in going through the details of my writing and helped me tell my story in a
            cohesive, articulated manner. I highly recommend having Oriana look over your college
            essays before applying.
          </Blockquote>
        </Fade>
      </Group>
      <Group
        p="xl"
        position="center"
        sx={{
          width: '100vw',
          backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.gray[8],
        }}
        direction={mobile ? 'column' : 'row'}
      >

        <Fade direction="left" triggerOnce>
          <Blockquote sx={{ maxWidth: '65ch' }} cite="Maine Park, Daughters in Cornell" my="xl">
            Oriana was excellent, not only in editing, but in having my daughters think about why they were writing about the topics they chose. She was able to help guide in the bigger picture of conveying a message to admissions officers. And of course her edits were amazing with quick turnarounds. We would and will easily recommend her to all trying to navigate this crazy college process! She allowed my girls to show their true selves in their applications, which yielded wonderful results!
          </Blockquote>
        </Fade>
        <Fade triggerOnce>
          <img src="/images/education.svg" alt="Education" width="300px" />
        </Fade>
      </Group>
    </>
  );
}
