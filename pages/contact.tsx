import { Title, Group, Stack, Button, TextInput, Divider, Textarea, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Fade } from 'react-awesome-reveal';
import { useRouter } from 'next/router';
import { BsAt } from 'react-icons/bs';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { FiCheck } from 'react-icons/fi';

export default function Contact() {
  const router = useRouter();
  const mobile = useMediaQuery('(max-width: 700px)');

  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      subject: '',
      message: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const submit = async (values: any) => {
    const result = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
        },
        subject: values.subject,
        message: values.message,
      }),
    });
    form.reset();
    const response = await result.json();
    if (response.err)
      showNotification({
        title: 'An error has occurred.',
        message: response.err,
        color: 'red',
      });
    else if (response.status == 'success')
      showNotification({
        icon: <FiCheck />,
        title: 'Email sent!',
        message: 'Your message was successfully sent. You should get a response shortly.',
        color: 'green',
      });
    else if (response.status == 'rejected')
      showNotification({
        title: 'Email was rejected.',
        message: 'Please try again later',
        color: 'red',
      });
    router.push('/');
  };

  return (
    <Fade triggerOnce>
      <Stack
        sx={{ width: '100vw', minHeight: '80vh' }}
        justify="center"
        align="center"
        mt={mobile ? 100 : 0}
      >
        <Image src="/images/email.svg" sx={{ width: 'min(200px, 80%)' }} />
        <form style={{ width: 'min(600px, 90%)' }} onSubmit={form.onSubmit(submit)}>
          <Stack sx={{ width: '100%' }}>
            <Title align="center">Contact Me!</Title>
            <Group grow>
              <TextInput placeholder="First Name" required {...form.getInputProps('firstname')} />
              <TextInput placeholder="Last Name" required {...form.getInputProps('lastname')} />
            </Group>
            <TextInput
              placeholder="Email"
              icon={<BsAt size={14} />}
              required
              {...form.getInputProps('email')}
            />
            <Divider label="and" labelPosition="center" />
            <TextInput placeholder="Subject" required {...form.getInputProps('subject')} />
            <Textarea placeholder="Message" required {...form.getInputProps('message')} />
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Fade>
  );
}
