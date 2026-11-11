import { HttpException, Injectable } from '@nestjs/common';
import { FixedAmountDiscount } from '../campaigns/coupon/fixed.amount.service';
import { PercentageDiscount } from '../campaigns/coupon/percentage.service';
import { DiscountServiceInterface } from '../campaigns/discount.interface.service';
import { CouponService } from '../campaigns/coupon.service';
import { Discount, OnTopDiscount, SeasonalDiscountType } from 'src/data/interface/discount';
import { CategoryDiscount } from '../campaigns/onTop/category.service';
import { PointDiscount } from '../campaigns/onTop/point.service';
import { SpecialDiscount } from '../campaigns/seasonsal/special.service';
import { SeasonalDiscount } from '../campaigns/seasonal.service';
import { OnTopService } from '../campaigns/ontop.service';


@Injectable()
export class DiscountFactoryService {

    createCoupon(type: string, amount: number): CouponService {
        switch (type.toLocaleLowerCase()) {
            case 'fixed':
                return new FixedAmountDiscount(amount);
            case 'percentage':
                return new PercentageDiscount(amount);
            default:
                throw new HttpException(`Unsupported coupon type: ${type}`, 500);
        }

    }


    createOnTop(onTop: OnTopDiscount) : OnTopService {
        switch (onTop?.subtype) {
            case 'category':
                return new CategoryDiscount(onTop.amount, onTop.category);
            case 'points':
                return new PointDiscount(onTop.points);
            default:
                throw new HttpException(`Unsupported on-top type: ${(onTop as Discount)?.subtype}`, 500);
        }
    }

    createSeasonal(seasonal:SeasonalDiscountType) : SeasonalDiscount {
        switch (seasonal.subtype.toLocaleLowerCase()) {
            case 'special':
                return new SpecialDiscount(seasonal.amount, seasonal.every);
            default:
                throw new HttpException(`Unsupported seasonal type: ${seasonal.subtype}`, 500);
        }
    }


}
