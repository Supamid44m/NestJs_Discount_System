import { SeasonalDiscount } from "../seasonal.service";

export class SpecialDiscount extends SeasonalDiscount {
    private every: number;

    constructor(amount: number, every: number) {
        super(amount);
        this.every = every;
    }

    applyDiscount(originalPrice?: number): number {
        if (originalPrice === undefined || originalPrice <= 0) {
            return 0;
        }
        return this.calcucalateEveryPrice(originalPrice);
    }

    private calcucalateEveryPrice(price: number) {
        return Math.floor(price / this.every) * this.amount;
    }
}