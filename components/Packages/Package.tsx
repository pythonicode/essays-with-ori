import { Title, Text, Stack, Card, Divider, Button, NumberInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { useState } from 'react';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export function Package({ title, badge, price, supplemental, costPerWord = 0.05, children }: any) {
  const mobile = useMediaQuery('(max-width: 700px)');
  const [count, setCount] = useState<number | undefined>(250);

  return (
    <Card shadow="sm" p="xl" sx={{ width: mobile ? '100%' : '300px' }}>
      <Stack>
        {badge}
        <Title order={3} align="center">
          {title}
        </Title>
        {supplemental ? (
          <Title align="center">
            {currency.format(
              count && price
                ? price + count * costPerWord
                : price
                  ? price + 250 * costPerWord
                  : 250 * costPerWord
            )}
          </Title>
        ) : (
          <Title align="center">{price ? currency.format(price) : 'Free'}</Title>
        )}
        {supplemental && (
          <NumberInput
            value={250}
            onChange={(val) => setCount(val)}
            placeholder="250"
            label="Word Count"
            sx={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}
          />
        )}
        <Text align="center" color="dimmed">
          Includes
        </Text>
        <Divider />
        {children}
        <Link href="/start"><Button fullWidth>Get Started</Button></Link>
      </Stack>
    </Card>
  );
}
