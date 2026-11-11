import { Test, TestingModule } from '@nestjs/testing';
import { DiscountService } from './discount.service';
import { DiscountFactoryService } from './discount.factory/discount.factory.service';

describe('DiscountService', () => {
  let service: DiscountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountService, DiscountFactoryService],
    }).compile();

    service = module.get<DiscountService>(DiscountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should item discount by coupon fixed amount ', () => {
    const result = service.create({
      items: [
        { name: 'T-Shirt', price: 350, category: 'clothing', quantity: 1 },
        { name: 'Hat', price: 250, category: 'accessories', quantity: 1 },
      ],
      discounts: [{ type: 'coupon', subtype: 'fixed', amount: 50 }],
    });

    expect(result.originalPrice).toBe(600);
    expect(result.totalDiscount).toBe(50);
    expect(result.finalPrice).toBe(550);
    expect(result.discountList).toEqual([
      { type: 'coupon', subtype: 'fixed', amount: 50 },
    ]);
  });

  it('should  discount item by percentage  ', () => {
    const result = service.create({
      items: [
        { name: 'T-Shirt', price: 350, category: 'clothing', quantity: 1 },
        { name: 'Hat', price: 250, category: 'accessories', quantity: 1 },
      ],
      discounts: [{ type: 'coupon', subtype: 'percentage', amount: 10 }],
    });

    expect(result.originalPrice).toBe(600);
    expect(result.totalDiscount).toBe(60);
    expect(result.finalPrice).toBe(540);
    expect(result.discountList).toEqual([
      { type: 'coupon', subtype: 'percentage', amount: 60 },
    ]);
  });

  it('shold discount items by Percentage', () => {
    const result = service.create({
      items: [
        { name: 'T-Shirt', price: 350, category: 'clothing', quantity: 1 },
        { name: 'Hoodie', price: 700, category: 'clothing', quantity: 1 },
        { name: 'Watch', price: 850, category: 'accessories', quantity: 1 },
        { name: 'Bag', price: 640, category: 'accessories', quantity: 1 },
      ],
      discounts: [
        {
          type: 'onTop',
          subtype: 'category',
          category: 'clothing',
          amount: 15,
        },
      ],
    });

    expect(result.originalPrice).toBe(2540);
    expect(result.totalDiscount).toBe(157.5);
    expect(result.finalPrice).toBe(2382.5);
    expect(result.discountList).toEqual([
      {
        type: 'onTop',
        subtype: 'category',
        category: 'clothing',
        amount: 157.5,
      },
    ]);
  });

  it('should discount item by customer point', () => {
    const result = service.create({
      items: [
        { name: 'T-Shirt', price: 350, category: 'clothing', quantity: 1 },
        { name: 'Hat', price: 250, category: 'clothing', quantity: 1 },
        { name: 'Belt', price: 230, category: 'accessories', quantity: 1 },
      ],
      discounts: [
        {
          type: 'onTop',
          subtype: 'points',
          points: 68,
        },
      ],
    });

    expect(result.originalPrice).toBe(830);
    expect(result.totalDiscount).toBe(68);
    expect(result.finalPrice).toBe(762);
    expect(result.discountList).toEqual([
      { type: 'onTop', subtype: 'points', points: 68, amount: 68 },
    ]);
  });

  it('should discount item by 20% when  customer point over 20% of totalprice', () => {
    const result = service.create({
      items: [
        { name: 'T-Shirt', price: 350, category: 'clothing', quantity: 1 },
        { name: 'Hat', price: 250, category: 'clothing', quantity: 1 },
        { name: 'Belt', price: 230, category: 'accessories', quantity: 1 },
      ],
      discounts: [
        {
          type: 'onTop',
          subtype: 'points',
          points: 500,
        },
      ],
    });

    expect(result.originalPrice).toBe(830);
    expect(result.totalDiscount).toBe(166);
    expect(result.finalPrice).toBe(664);
    expect(result.discountList).toEqual([
      {
        type: 'onTop',
        subtype: 'points',
        points: 500,
        amount: 166,
      },
    ]);
  });

  it('should discount item every  amount', () => {
    const result = service.create({
      items: [
        { name: 'T-Shirt', price: 350, category: 'clothing', quantity: 1 },
        { name: 'Hat', price: 250, category: 'clothing', quantity: 1 },
        { name: 'Belt', price: 230, category: 'accessories', quantity: 1 },
      ],
      discounts: [
        {
          type: 'seasonal',
          subtype: 'special',
          every: 300,
          discount: 40,
        },
      ],
    });

    expect(result.originalPrice).toBe(830);
    expect(result.totalDiscount).toBe(80);
    expect(result.finalPrice).toBe(750);
    expect(result.discountList).toEqual([
      {
        type: 'seasonal',
        subtype: 'special',
        every: 300,
        discount: 40,
        amount: 80,
      },
    ]);
  });

  it('should not discount more than the original price when fixed coupon exceeds total', () => {
    const result = service.create({
      items: [
        { name: 'Hat', price: 100, category: 'accessories', quantity: 1 },
      ],
      discounts: [{ type: 'coupon', subtype: 'fixed', amount: 500 }],
    });

    expect(result.totalDiscount).toBe(100);
    expect(result.finalPrice).toBe(0);
  });
});
