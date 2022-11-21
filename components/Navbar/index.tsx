import { Group, MediaQuery, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { FiHome, FiMail } from 'react-icons/fi';
import { ColorSchemeToggle } from '../ColorSchemeToggle';
import { BsQuestionCircle } from 'react-icons/bs';
import { Socials } from './Socials';
import MobileMenu from './MobileMenu';

export function Navbar() {
  const mobile = useMediaQuery('(max-width: 700px)');

  return (
    <Group sx={{ width: '100vw' }} px="clamp(2rem, 5vw, 5rem)" py="md" position="apart">
      <MobileMenu />
      <MediaQuery query="(max-width: 700px)"
        styles={{ display: "none" }}>
        <Group spacing="md">
          <Link href="/">
            <Text
              sx={{
                cursor: 'pointer',
                padding: "0 0.5rem",
                transition: 'all 300ms',
                borderRadius: '0.5rem',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                }
              }}
              weight={600}
            >
              Home
            </Text>
          </Link>
          <Link href="/about">
            <Text
              sx={{
                cursor: 'pointer',
                padding: "0 0.5rem",
                transition: 'all 300ms',
                borderRadius: '0.5rem',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                }
              }}
              weight={600}
            >
              About
            </Text>
          </Link>
          <Link href="/contact">
            <Text
              sx={{
                cursor: 'pointer',
                padding: "0 0.5rem",
                transition: 'all 300ms',
                borderRadius: '0.5rem',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                }
              }}
              weight={600}
            >
              Contact
            </Text>
          </Link>
        </Group>
      </MediaQuery>
      <Group>
        <Socials />
        <ColorSchemeToggle />
      </Group>
    </Group>
  );
}
