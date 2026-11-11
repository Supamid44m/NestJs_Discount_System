import { SeasonalDiscount } from "../seasonal.service";

export class SpecialDiscount extends SeasonalDiscount {
    private every: number;

    constructor(amount: number, every: number = 0) {
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
        if(this.every <=0){
            return 0
        }
        return Math.floor(price / this.every) * this.amount;
    }
}