import { CartItem, Product } from "src/data/interface/product";
import { Discount } from "src/data/interface/discount";

export class CreateDiscountDto {
    items: CartItem[] = []
    discounts : Discount[] = []
}
