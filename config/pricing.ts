// Centralized pricing configuration for all essay packages

export const PRICING = {
  main: {
    basic: 185,
    professional: 250,
    complete: 360,
  },
  supplemental: {
    basic: {
      base: 65,
      perWord: 0.07,
    },
    professional: {
      base: 75,
      perWord: 0.1,
    },
    complete: {
      base: 90,
      perWord: 0.13,
    },
  },
} as const;

export type MainTier = keyof typeof PRICING.main;
export type SupplementalTier = keyof typeof PRICING.supplemental;

// Helper function to calculate supplemental essay price
export function calculateSupplementalPrice(tier: SupplementalTier, wordCount: number): number {
  const pricing = PRICING.supplemental[tier];
  return pricing.base + pricing.perWord * wordCount;
}

// Helper function to calculate total price
export function calculateTotalPrice(
  main: { tier: MainTier } | null,
  supplementals: Array<{ tier: SupplementalTier; words: number }>
): number {
  const mainPrice = main ? PRICING.main[main.tier] : 0;
  const supplementalPrice = supplementals
    .map((supp) => calculateSupplementalPrice(supp.tier as SupplementalTier, supp.words))
    .reduce((total, curr) => total + curr, 0);
  return mainPrice + supplementalPrice;
}

// Currency formatter for consistent display
export const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

