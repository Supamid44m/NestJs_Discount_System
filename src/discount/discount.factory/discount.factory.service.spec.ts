import { Test, TestingModule } from '@nestjs/testing';
import { DiscountFactoryService } from './discount.factory.service';
import { CouponService } from '../campaigns/coupon.service';

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

  it('should create coupon a discount correctly', () => {
    const discount = service.createCoupon('fixed', 50);
    expect(discount).toBeInstanceOf(CouponService)
  });

  it('should throw an error for unknown discount type', () => {
    expect(() => service.createCoupon('unknown', 50)).toThrow();
  });
});
