import { CouponService } from "../coupon.service";
import { OnTopService } from "../ontop.service";

export class PointDiscount extends OnTopService {



    constructor(points: number) {
        super(points);
    }


    applyDiscount(originalPrice?: number): number {

        if (originalPrice === undefined || originalPrice <= 0) {
            return 0;
        }

        return Math.min(this.amount, originalPrice * 0.2);
    }

}