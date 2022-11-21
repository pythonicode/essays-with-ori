import { ActionIcon, Text } from '@mantine/core';
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';

export function Socials() {
  return (
    <>
      <Text sx={{ lineHeight: 0 }} component="a" href="https://www.instagram.com/orianariley02/">
        <ActionIcon>
          <FiInstagram />
        </ActionIcon>
      </Text>
      <Text sx={{ lineHeight: 0 }} component="a" href="https://www.linkedin.com/in/oriana-riley">
        <ActionIcon>
          <FiLinkedin />
        </ActionIcon>
      </Text>
    </>
  );
}
