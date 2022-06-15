import { Center, Group, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Pencil2Icon } from '@modulz/radix-icons';
import Link from 'next/link';

export function Footer() {
  const mobile = useMediaQuery('(max-width: 700px)');

  return (
    <Group
      sx={{ width: '100vw' }}
      px="clamp(32px, 20vw, 500px)"
      py={100}
      position="apart"
      direction={mobile ? 'column' : 'row'}
      align="center"
      spacing={100}
    >
      <Center sx={{ width: mobile ? '100%' : '40%' }}>
        <Text color="dimmed" size="xs" sx={{ maxWidth: '50ch' }}>
          Disclaimer: <br />I am not a professional admissions officer and never have been. While I
          provide the best advice I possibly can, have done extensive research on the college
          admissions process, and had lots of practice in the essay editing sphere, I cannot
          guarantee acceptance to any school, as that relies on a myriad of other factors as well
          and is, at least partially, random based on fit/luck/the admissions officers preferences.
          I can, however, guarantee you put your best foot forward in your essays, given that you’re
          willing to put the work in to get to that point.
        </Text>
      </Center>
      <Stack sx={{ width: mobile ? '100%' : '40%' }}>
        <Link href="/terms">
          <Group sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
            <Text component="a">Terms and Conditions</Text>
            <Pencil2Icon />
          </Group>
        </Link>
        <Text color="dimmed" size="sm">
          Copyright 2022. Essays with Ori
        </Text>
      </Stack>
    </Group>
  );
}
