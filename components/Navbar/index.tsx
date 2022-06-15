import { Group, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { HomeIcon } from '@modulz/radix-icons';
import Link from 'next/link';
import { FiFacebook, FiHome, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import { ColorSchemeToggle } from '../ColorSchemeToggle';

export function Navbar() {
  const mobile = useMediaQuery('(max-width: 700px)');

  return (
    <Group sx={{ width: '100vw' }} px="clamp(1rem, 2vw, 3rem)" py="md" position="apart">
      <Group spacing="xl">
        <Link href="/">
          {mobile ? (
            <FiHome size="20px" />
          ) : (
            <Text
              sx={{
                cursor: 'pointer',
                transition: 'all 100ms',
                '&:hover': { fontWeight: 'bold' },
              }}
            >
              Home
            </Text>
          )}
        </Link>
        <Link href="/contact">
          {mobile ? (
            <FiMail size="20px" />
          ) : (
            <Text
              sx={{
                cursor: 'pointer',
                transition: 'all 100ms',
                '&:hover': { fontWeight: 'bold' },
              }}
            >
              Contact
            </Text>
          )}
        </Link>
      </Group>
      <Group>
        <Text sx={{ lineHeight: 0 }} component="a" href="https://mantine.dev">
          <FiFacebook />
        </Text>
        <Text sx={{ lineHeight: 0 }} component="a" href="https://mantine.dev">
          <FiInstagram />
        </Text>
        <Text sx={{ lineHeight: 0 }} component="a" href="https://mantine.dev">
          <FiLinkedin />
        </Text>
        <ColorSchemeToggle />
      </Group>
    </Group>
  );
}
