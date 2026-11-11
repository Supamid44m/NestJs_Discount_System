import { Test, TestingModule } from '@nestjs/testing';
import { DiscountFactoryService } from './discount.factory.service';
import { CouponService } from '../campaigns/coupon.service';
import { PercentageDiscount } from '../campaigns/coupon/percentage.service';
import { FixedAmountDiscount } from '../campaigns/coupon/fixed.amount.service';

describe('DiscountFactoryService', () => {
  let service: DiscountFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountFactoryService],
    }).compile();

    service = module.get<DiscountFactoryService>(DiscountFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create fixed amount coupon  discount correctly', () => {
    const discount = service.createCoupon('fixed', 50);
    expect(discount).toBeInstanceOf(FixedAmountDiscount);
  });

  it('should create percentage  discount correctly', () => {
    const discount = service.createCoupon('percentage', 50);
    expect(discount).toBeInstanceOf(PercentageDiscount);
  });

  it('should throw an error for unknown discount type', () => {
    expect(() => service.createCoupon('unknown', 50)).toThrow();
  });
});
