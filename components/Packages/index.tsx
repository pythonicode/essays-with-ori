import {
  Group,
  Title,
  Text,
  Stack,
  useMantineTheme,
  Card,
  Badge,
  NumberInput,
  Divider,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Package } from './Package';
import { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';

export function Packages() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery('(max-width: 700px)');
  const [count, setCount] = useState<number | undefined>(250);

  return (
    <>
      <Title my={50} align="center">
        Common App Essay
      </Title>
      <Group position="center" sx={{ width: '100%' }} p="xl">
        <Zoom cascade triggerOnce>
          <Package title="Basic" price={45}>
            <Text>Meticulous feedback with unlimited* rounds of line edits. </Text>
            <Text>
              Address your specific questions or comments until you're happy with the state of your
              essay.
            </Text>
            <Text>Learn how to get yourself across effectively and authentically.</Text>
            <Text> Tailored editing to your personal goals.</Text>
            <Text color="dimmed" align="center" size="sm">
              Applicants must provide a complete or almost-complete draft.
            </Text>
          </Package>
          <Package title="Professional" badge={<Badge>Most Popular</Badge>} price={65}>
            <Text>Everything from the Basic package.</Text>
            <Text>Two 30-60 min video calls to develop ideas and brainstorm essay structure.</Text>
            <Text>Help transforming outlines and concepts into written-out drafts.</Text>
            <Text color="dimmed" align="center" size="sm">
              Applicants must provide ideas for the topic of their essay. They do not need to be
              fleshed out.
            </Text>
          </Package>
          <Package title="Complete" price={100}>
            <Text>Everything from the Basic package.</Text>
            <Text>
              Up to five 30-45 min video calls to settle on a topic, develop ideas and deliberate.
            </Text>
            <Text>Make decisions on your hook and brainstorm structure.</Text>
            <Text>Help transforming ideas and early outlines into written-out drafts.</Text>
            <Text color="dimmed" align="center" size="sm">
              Applicants may attend the first call as prepared or unprepared as they like.
            </Text>
          </Package>
        </Zoom>
      </Group>
      <Divider mx="xl" my="xl" />
      <Title my={50} align="center">
        Supplemental Essays
      </Title>
      <Group position="center" sx={{ width: '100%' }} p="xl">
        <Zoom cascade triggerOnce>
          <Package title="Basic" price={10} costPerWord={0.03} supplemental>
            <Text>Meticulous feedback with up to 5 rounds of line edits. </Text>
            <Text>
              Address your specific questions or comments until you're happy with the state of your
              essay.
            </Text>
            <Text>Learn how to get yourself across effectively and authentically.</Text>
            <Text>Tailored editing to your personal goals.</Text>
            <Text color="dimmed" align="center" size="sm">
              Applicants must provide a complete or almost-complete draft.
            </Text>
          </Package>
          <Package
            title="Professional"
            price={20}
            costPerWord={0.04}
            badge={<Badge>Most Popular</Badge>}
            supplemental
          >
            <Text>Everything from the Basic package.</Text>
            <Text>One 30-60 min video calls to develop ideas and brainstorm essay structure.</Text>
            <Text>
              Help developing topics and outlines into full drafts and can help provide opinions on
              potential topics.
            </Text>
            <Text color="dimmed" align="center" size="sm">
              Applicants must provide ideas for the topic of their essay. They do not need to be
              fleshed out.
            </Text>
          </Package>
          <Package title="Complete" price={30} supplemental>
            <Text>Everything from the Basic package.</Text>
            <Text>
              Up to three 30-45 min video calls to settle on a topic, develop ideas and deliberate.
            </Text>
            <Text>Help transforming early ideas and outlines into full written-out drafts.</Text>
            <Text color="dimmed" align="center" size="sm">
              Applicants may attend the first call as prepared or unprepared as they like.
            </Text>
          </Package>
        </Zoom>
      </Group>
    </>
  );
}
