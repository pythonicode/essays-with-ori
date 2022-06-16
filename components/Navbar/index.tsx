import { Group, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { FiFacebook, FiHome, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import { ColorSchemeToggle } from '../ColorSchemeToggle';
import { BsQuestionCircle } from 'react-icons/bs';
import { Socials } from './Socials';

export function Navbar() {
  const mobile = useMediaQuery('(max-width: 700px)');

  return (
    <Group sx={{ width: '100vw' }} px="clamp(2rem, 5vw, 5rem)" py="md" position="apart">
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
        <Link href="/about">
          {mobile ? (
            <BsQuestionCircle size="20px" />
          ) : (
            <Text
              sx={{
                cursor: 'pointer',
                transition: 'all 100ms',
                '&:hover': { fontWeight: 'bold' },
              }}
            >
              About
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
        <Socials />
        <ColorSchemeToggle />
      </Group>
    </Group>
  );
}
