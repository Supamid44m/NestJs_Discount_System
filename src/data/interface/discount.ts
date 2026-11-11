export interface Discount { 
    type:string
    subtype:string
    amount: number
}

export interface CategoryDiscount extends Discount {
    subtype: 'category';
    category: 'electronics' | 'clothing' | 'accessories';
}

export interface PointsDiscount extends Discount {
    subtype: 'points';
    points: number;
}

export type OnTopDiscount = CategoryDiscount | PointsDiscount;


export interface SeasonalDiscount extends Discount {
    subtype: 'special';
    every: number;
    discount : number
}

export type SeasonalDiscountType = SeasonalDiscount;