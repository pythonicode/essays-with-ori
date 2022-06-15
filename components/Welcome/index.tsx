import { Group, Title, Text, Stack, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function Welcome() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery('(max-width: 700px)');

  return (
    <>
      <Stack align="center" p="xl" sx={{ width: mobile ? '90%' : '45%' }}>
        <Group align="center">
          <Title sx={{ fontFamily: 'Boogaloo', fontSize: 'clamp(3rem, 5vw, 5rem)' }}>
            <Text component="span" color={theme.primaryColor} inherit>
              Essays
            </Text>{' '}
            with
          </Title>
          <Title sx={{ fontFamily: 'Barrio', fontSize: 'clamp(3rem, 5vw, 5rem)' }}>
            <Text color={theme.primaryColor} component="span" inherit>
              Ori
            </Text>
          </Title>
        </Group>
        <Text sx={{ fontSize: 'clamp(1rem, 1.5vw, 2rem)' }} align="center">
          Enjoy premium essay editing at a fraction of the cost.
        </Text>
      </Stack>
    </>
  );
}
