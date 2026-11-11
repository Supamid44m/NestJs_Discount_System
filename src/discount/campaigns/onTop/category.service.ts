import { CouponService } from '../coupon.service';
import { CartItem } from 'src/data/interface/product';
import { OnTopService } from '../ontop.service';

export class CategoryDiscount extends OnTopService {


    private category: "electronics" | "clothing" | "accessories";
    private categoryDiscountMap: Record<string, number> = {
        "electronics": 0,
        "clothing": 0,
        "accessories": 0,
    }

    constructor(amount: number, category: "electronics" | "clothing" | "accessories") {
        super(amount);
        this.category = category;
        this.categoryDiscountMap[this.category] = amount;
    }

    
    applyDiscount(categoryTotal?: number): number {

        if (categoryTotal === undefined || categoryTotal <= 0) {
            return 0;
        }
        const discountPercent = Math.min(Math.max(this.categoryDiscountMap[this.category] || 0, 0), 100);

        return categoryTotal * (discountPercent / 100);
    }


    calculateDiscountFromItems(items: CartItem[]): number {
        const categoryTotal = items
            .filter((i) => i.category === this.category)
            .reduce((sum, i) => sum + i.price * i.quantity, 0);
        return this.applyDiscount(categoryTotal);
    }

}