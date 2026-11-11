import { CouponService } from '../coupon.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class FixedAmountDiscount extends CouponService {

    constructor(amount: number) {
        super(amount);
    }


    applyDiscount(price?: number): number {
        if (price === undefined || price <= 0) {
            return 0;
        }
        return Math.min(this.amount, price);
    }
}