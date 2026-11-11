import { DiscountServiceInterface } from "./discount.interface.service";

export abstract class SeasonalDiscount implements DiscountServiceInterface {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    abstract applyDiscount(originalPrice?: number): number;
}