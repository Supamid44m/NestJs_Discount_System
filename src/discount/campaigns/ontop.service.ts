import { DiscountServiceInterface } from "./discount.interface.service";

export abstract class OnTopService implements DiscountServiceInterface {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    abstract applyDiscount(originalPrice?: number): number;
}