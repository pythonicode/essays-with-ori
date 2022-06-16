import { Text } from '@mantine/core';
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';

export function Socials() {
  return (
    <>
      <Text sx={{ lineHeight: 0 }} component="a" href="https://www.instagram.com/orianariley02/">
        <FiInstagram />
      </Text>
      <Text sx={{ lineHeight: 0 }} component="a" href="https://www.linkedin.com/in/oriana-riley">
        <FiLinkedin />
      </Text>
    </>
  );
}
