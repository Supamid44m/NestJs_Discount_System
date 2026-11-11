import { Injectable } from '@nestjs/common';
import { DiscountServiceInterface } from './discount.interface.service';

@Injectable()

export abstract class CouponService implements DiscountServiceInterface {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    abstract applyDiscount(originalPrice?: number): number;
}