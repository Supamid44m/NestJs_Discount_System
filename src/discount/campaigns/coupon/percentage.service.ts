import { Injectable } from '@nestjs/common';
import { CouponService } from '../coupon.service';

@Injectable()
export class PercentageDiscount extends CouponService {


    constructor(percentage: number) {
        super(percentage);
    }

    applyDiscount(originalPrice?: number): number {
        if (originalPrice === undefined || originalPrice <= 0) {
            return 0;
        }
        return originalPrice * (this.amount / 100);
    }
}