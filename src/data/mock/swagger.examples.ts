const items = [
  { name: 'T-Shirt', price: 350, category: 'clothing', quantity: 1 },
  { name: 'Hat', price: 250, category: 'clothing', quantity: 1 },
];

const itemsMixed = [
  { name: 'T-Shirt', price: 350, category: 'clothing', quantity: 1 },
  { name: 'Hat', price: 250, category: 'accessories', quantity: 1 },
  { name: 'Phone', price: 1000, category: 'electronics', quantity: 1 },
];

export const discountRequestExamples = {
  couponFixed: {
    summary: 'Coupon - Fixed amount',
    description: `Discounts the entire cart by subtracting an amount from the total price`,
    value: {
      items,
      discounts: [{ type: 'coupon', subtype: 'fixed', amount: 50 }],
    },
  },
  couponPercentage: {
    summary: 'Coupon - Percentage',
    description: 'Discounts the entire cart by subtracting a percentage fromthe total price',
    value: {
      items,
      discounts: [{ type: 'coupon', subtype: 'percentage', amount: 10 }],
    },
  },
  onTopCategory: {
    summary: 'On Top - Category',
    description: 'Discount the entire amount of a specific category of items in cart',
    value: {
      items: itemsMixed,
      discounts: [
        {
          type: 'onTop',
          subtype: 'category',
          category: 'clothing',
          amount: 15,
        },
      ],
    },
  },
  onTopPoints: {
    summary: 'On Top - Points',
    description: 'Users spent points for a fixed amount of discount (1 point = 1 THB). The amount will be capped at 20% of total price',
    value: {
      items,
      discounts: [{ type: 'onTop', subtype: 'points', points: 68 }],
    },
  },
  seasonalSpecial: {
    summary: 'Seasonal - Special',
    description: 'From the total price, at every X THB, subtracting a fixed amount Y THB',
    value: {
      items,
      discounts: [
        {
          type: 'seasonal',
          subtype: 'special',
          every: 300,
          discount: 40,
        },
      ],
    },
  },
  combined: {
    summary: 'Combined - Coupon + On Top + Seasonal',
    description: '(coupon → onTop → seasonal)',
    value: {
      items: itemsMixed,
      discounts: [
        { type: 'coupon', subtype: 'percentage', amount: 10 },
        { type: 'onTop', subtype: 'points', amount: 50, points: 50 },
        {
          type: 'seasonal',
          subtype: 'special',
          every: 300,
          discount: 40,
        },
      ],
    },
  },
  noDiscount: {
    summary: 'No discount',
    description: 'No discount',
    value: { items, discounts: [] },
  },
};
