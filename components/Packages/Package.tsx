import { Title, Text, Stack, Card, Divider, Button, NumberInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { useState } from 'react';
import { currency } from '../../config/pricing';

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
            onChange={(val: any) => setCount(val)}
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
