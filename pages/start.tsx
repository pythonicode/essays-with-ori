import {
  Card,
  Container,
  Image,
  Text,
  Title,
  useMantineTheme,
  Group,
  Stack,
  TextInput,
  Button,
  Box,
  Tooltip,
  Divider,
  ActionIcon,
  Select,
  NumberInput,
  Checkbox,
  Center,
  List,
  Loader,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PlusCircledIcon } from '@modulz/radix-icons';
import { FiX } from 'react-icons/fi';
import { FormEvent, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useModals } from '@mantine/modals';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { MdCancel, MdCheckCircle, MdError } from 'react-icons/md';
import { useRouter } from 'next/router';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function Form({ price, main, supplementals }: any) {
  const [disabled, setDisabled] = useState(false);
  const [state, setState] = useState('pending');
  const router = useRouter();

  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      confirmEmail: '',
      phone: '',
      contact: 'email',
      terms: false,
    },

    validate: {
      email: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : 'Not a valid email. Please try again.',
      confirmEmail: (value, values) => (value !== values.email ? 'Emails do not match.' : null),
      phone: (value) =>
        /^(?:\+\d{1,3}|0\d{1,3}|00\d{1,2})?(?:\s?\(\d+\))?(?:[-\/\s.]|\d)+$/.test(value)
          ? null
          : 'Not a valid phone number.',
      contact: (value, values) =>
        values.phone == '' && value == 'phone' ? 'Phone number not provided.' : null,
    },
  });

  const submit = async (values: any) => {
    setDisabled(true);
    const result = await fetch('/api/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: price,
        customer: values,
        main: main,
        supplementals: supplementals,
      }),
    });
    const response = await result.json();
    if (response.err || result.status != 200) setState('error');
    else if (response.customer == 'success' && response.editor == 'success') setState('success');
    else if (response.customer == 'rejected' || response.editor == 'rejected') setState('rejected');
    setDisabled(false);
    router.replace("/");
  };

  if (state === 'error')
    return (
      <Center>
        <Stack align="center" my="xl">
          <MdError color="red" size="64px" />
          <Title order={3}>An error has occurred.</Title>
          <Text size="sm" color="dimmed">
            Please close this window and try again.
          </Text>
        </Stack>
      </Center>
    );
  else if (state === 'rejected')
    return (
      <Center>
        <Stack align="center" my="xl">
          <MdCancel color="red" size="64px" />
          <Title order={3}>Order failed.</Title>
          <Text size="sm" color="dimmed">
            Please try again
          </Text>
          <List>
            <List.Item>Refresh the page.</List.Item>
            <List.Item>Clear your cache.</List.Item>
            <List.Item>Remove items.</List.Item>
          </List>
        </Stack>
      </Center>
    );
  else if (state === 'success')
    return (
      <Center>
        <Stack align="center" my="xl">
          <MdCheckCircle color="green" size="64px" />
          <Title order={3}>Success!</Title>
          <Text size="sm" color="dimmed">
            I'll begin working on your essays and get back to you shortly.
          </Text>
        </Stack>
      </Center>
    );
  return (
    <>
      <Title mt="md" align="center">
        {currency.format(price)}
      </Title>
      <Text color="dimmed" size="sm" align="center" mb="md">
        (Due Later)
      </Text>
      <form onSubmit={form.onSubmit(submit)}>
        <Stack align="center" sx={{ width: '100%' }}>
          <Group grow>
            <TextInput
              type="text"
              placeholder="First Name"
              required
              {...form.getInputProps('firstname')}
            />
            <TextInput
              type="text"
              placeholder="Last Name"
              sx={{ width: '100%' }}
              required
              {...form.getInputProps('lastname')}
            />
          </Group>
          <TextInput
            type="email"
            placeholder="Email"
            sx={{ width: '100%' }}
            required
            {...form.getInputProps('email')}
          />
          <TextInput
            placeholder="Confirm Email"
            sx={{ width: '100%' }}
            required
            {...form.getInputProps('confirmEmail')}
          />
          <TextInput
            type="tel"
            placeholder="Phone Number (optional)"
            sx={{ width: '100%' }}
            {...form.getInputProps('phone')}
          />
          <Text size="sm" mb={-10}>Preferred Method of Contact</Text>
          <Select
            data={[
              { value: 'email', label: 'Email' },
              { value: 'phone', label: 'Phone' },
            ]}
            sx={{ width: '100%' }}
            {...form.getInputProps('contact')}
            required
          />
          <Checkbox
            label={
              <Text>
                I agree to the{' '}
                <Link href="/terms">
                  <Text component="a" variant="link" sx={{ cursor: 'pointer' }}>
                    Terms of Service
                  </Text>
                </Link>
              </Text>
            }
            styles={{ input: { cursor: 'pointer' } }}
            required
            {...form.getInputProps('terms')}
          />
          <Button type="submit" size="lg" loading={disabled}>
            Submit
          </Button>
        </Stack>
      </form>
      <Text size="xs" color="dimmed" mt="xl">
        By checking the above box you are agreeing to pay the full amount of{' '}
        {currency.format(price)} upon receipt of service. Failure to make payment is a breach of the
        terms and will result in future denial of service.
      </Text>
    </>
  );
}

type Main = {
  tier: string;
  link: string;
  error: string;
};

type Supplemental = {
  tier: string;
  link: string;
  words: number;
  error: string;
};

export default function Start() {
  const modals = useModals();

  const [main, setMain] = useState<Main | null>({ tier: 'basic', link: '', error: '' });
  const [supplementals, setSupplementals] = useState<Array<Supplemental>>([
    { tier: 'basic', link: '', words: 250, error: '' },
  ]);

  const calculatePrice = () => {
    const mainPrice = main
      ? main.tier == 'complete'
        ? 245
        : main.tier == 'professional'
          ? 155
          : 105
      : 0;
    const supplementalPrice = supplementals
      .map((supp) =>
        supp.tier == 'complete'
          ? 50 + 0.1 * supp.words
          : supp.tier == 'professional'
            ? 40 + 0.075 * supp.words
            : 30 + 0.05 * supp.words
      )
      .reduce((total, curr) => total + curr, 0);
    return mainPrice + supplementalPrice;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    let next = [...supplementals];
    const validate =
      /https?:\/\/(www\.)?docs.google.com\/document\/\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\/edit\?usp=sharing/;
    let error = false;
    if (main) {
      if (!validate.test(main.link.trim())) {
        setMain({ ...main, error: 'Not a valid link to a Google Doc. Please try again.' });
        error = true;
      }
      else setMain({ ...main, error: '' });
    }
    for (let i = 0; i < supplementals.length; i++) {
      const supp = supplementals[i];
      if (!validate.test(supp.link.trim())) {
        next[i].error = 'Not a valid link to a Google Doc. Please try again.';
        error = true;
      } else {
        next[i].error = '';
      }
    }
    setSupplementals(next);
    if (error == true) return;
    if (main == null && supplementals.length == 0) return;
    modals.openModal({
      title: 'Almost done!',
      children: <Form price={calculatePrice()} main={main} supplementals={supplementals} />,
    });
  };

  return (
    <>
      <Stack sx={{ width: '100vw', minHeight: '80vh' }} align="center">
        <Title mt={100}>Get Started</Title>
        <Text color="dimmed" align="center">
          Please fill out all the following information so I can get started on your essays.
        </Text>
        <Box sx={{ width: 'min(500px, 100%)' }} p="xl">
          <form onSubmit={(event) => submit(event)}>
            <Stack>
              {main ? (
                <Fade triggerOnce>
                  <Card shadow="sm" p="xl">
                    <Stack sx={{ width: '100%' }}>
                      <Group position="apart">
                        <Title order={3}>Main Essay</Title>
                        <Tooltip label="Remove">
                          <ActionIcon onClick={() => setMain(null)}>
                            <FiX />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                      <Divider />
                      <Select
                        label="Package"
                        value={main.tier}
                        data={[
                          { value: 'basic', label: 'Basic ($85.00)' },
                          { value: 'professional', label: 'Professional ($125.00)' },
                          { value: 'complete', label: 'Complete ($195.00)' },
                        ]}
                        onChange={(value) => setMain({ ...main, tier: value ? value : 'basic' })}
                        required
                      />
                      <Tooltip
                        position="bottom"
                        label="Please double check that sharing is enabled before entering a link."
                        wrapLines
                      >
                        <TextInput
                          value={main.link}
                          onChange={(e) => setMain({ ...main, link: e.currentTarget.value })}
                          label="Google Docs Link"
                          placeholder="https://docs.google.com/document/d/1Qp7213asd2QTB-DyxjUJWfM-JMSidnMte5NBhHiE/"
                          error={main.error}
                          required
                        />
                      </Tooltip>
                    </Stack>
                  </Card>
                </Fade>
              ) : (
                <Button
                  variant="outline"
                  leftIcon={<PlusCircledIcon />}
                  fullWidth
                  onClick={() => setMain({ tier: 'basic', link: '', error: '' })}
                >
                  Add Main Essay
                </Button>
              )}
              {supplementals.map((supp, i) => (
                <Fade key={i} triggerOnce>
                  <Card shadow="sm" p="xl">
                    <Stack sx={{ width: '100%' }}>
                      <Group position="apart">
                        <Title order={3}>Supplemental Essay</Title>
                        <Tooltip label="Remove">
                          <ActionIcon
                            onClick={() =>
                              setSupplementals(
                                supplementals.length > 1 ? supplementals.splice(i, 1) : []
                              )
                            }
                          >
                            <FiX />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                      <Divider />
                      <Select
                        label="Package"
                        value={supp.tier}
                        data={[
                          {
                            value: 'basic',
                            label: `Basic (${currency.format(20 + 0.04 * supp.words)})`,
                          },
                          {
                            value: 'professional',
                            label: `Professional (${currency.format(30 + 0.06 * supp.words)})`,
                          },
                          {
                            value: 'complete',
                            label: `Complete (${currency.format(50 + 0.1 * supp.words)})`,
                          },
                        ]}
                        onChange={(value) => {
                          let next = [...supplementals];
                          next[i].tier = value ? value : 'basic';
                          setSupplementals(next);
                        }}
                        required
                      />
                      <NumberInput
                        value={supp.words}
                        onChange={(val) => {
                          let next = [...supplementals];
                          next[i].words = val ? val : 250;
                          setSupplementals(next);
                        }}
                        placeholder="250"
                        label="Word Count"
                        required
                      />
                      <Tooltip
                        position="bottom"
                        label="Please double check that sharing is enabled before entering a link."
                      >
                        <TextInput
                          value={supp.link}
                          onChange={(e) => {
                            let next = [...supplementals];
                            next[i].link = e.currentTarget.value;
                            setSupplementals(next);
                          }}
                          label="Google Docs Link"
                          placeholder="https://docs.google.com/document/d/1Qp7213asd2QTB-DyxjUJWfM-JMSidnMte5NBhHiE/"
                          error={supp.error}
                          required
                        />
                      </Tooltip>
                    </Stack>
                  </Card>
                </Fade>
              ))}
            </Stack>
            <Button
              mt="xl"
              variant="light"
              leftIcon={<PlusCircledIcon />}
              fullWidth
              onClick={() =>
                setSupplementals([
                  ...supplementals,
                  { tier: 'basic', link: '', words: 250, error: '' },
                ])
              }
            >
              Add Supplemental
            </Button>
            <Button type="submit" mt="md" fullWidth disabled={main == null && supplementals.length == 0}>
              Finish
            </Button>
            <Text size="xs" color="dimmed" align="center" p="md">
              No credit card required. You won't be charged until after you receive feedback.
            </Text>
          </form>
        </Box>
      </Stack>
    </>
  );
}
