import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { DiscountFactoryService } from './discount.factory/discount.factory.service';
import { Discount, OnTopDiscount, SeasonalDiscountType } from 'src/data/interface/discount';
import { CategoryDiscount } from './campaigns/onTop/category.service';
import { CartItem } from 'src/data/interface/product';

@Injectable()
export class DiscountService {

  constructor(private readonly DiscountFactory: DiscountFactoryService) { }

  create(createDiscountDto: CreateDiscountDto) {
    const items = createDiscountDto.items;
    const discount = createDiscountDto.discounts;
    const discountList = []
    const originalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    let currentPrice = originalPrice;


    const couponDiscount = this.calculateCouponDiscount(discount, currentPrice, discountList);
    currentPrice -= couponDiscount;

    const ratio = originalPrice > 0 ? currentPrice / originalPrice : 0;
    const itemsAfterCoupon = items.map((i) => ({ ...i, price: i.price * ratio }));

    const onTopDiscount = this.calculateOnTopDiscount(itemsAfterCoupon, discount, currentPrice, discountList);
    currentPrice -= onTopDiscount;
    const seasonalDiscount = this.calculateSeasonalDiscount(discount, currentPrice, discountList);
    currentPrice -= seasonalDiscount;

    const totalDiscount = this.calculateTotalDiscount(couponDiscount, onTopDiscount, seasonalDiscount);
    const finalPrice = Math.max(0, currentPrice);
    


    return {
      items,
      discountList,
      totalDiscount,
      originalPrice,
      finalPrice,
    };
  }


  private calculateCouponDiscount( discounts: Discount[], originalPrice: number, discountList: Discount[]) {
    const couponDiscount = discounts.find((d) => d.type === 'coupon');

    if (!couponDiscount) {
      return 0;
    }
    const coupon = this.DiscountFactory.createCoupon(couponDiscount.subtype, couponDiscount.amount);

    const discountAmount = Math.min(coupon.applyDiscount(originalPrice), originalPrice);

    discountList.push({ ...couponDiscount, amount: discountAmount });
    return discountAmount;

  }

  private calculateOnTopDiscount(items: CartItem[],discounts: Discount[], originalPrice: number, discountList: Discount[]) {
    const onTopDiscount = discounts.find((d) => d.type === 'onTop');

    if (!onTopDiscount) {
      return 0;
    }

    const onTop = this.DiscountFactory.createOnTop(onTopDiscount as OnTopDiscount);


    let discountAmount: number;
    if (onTop instanceof CategoryDiscount) {
      discountAmount = onTop.calculateDiscountFromItems(items);
    } else {
      discountAmount = onTop.applyDiscount(originalPrice);
    }

    discountAmount = Math.min(discountAmount, originalPrice);

    discountList.push({ ...onTopDiscount, amount: discountAmount });
    return discountAmount;
  }

  private calculateSeasonalDiscount(discounts: Discount[], originalPrice: number, discountList: Discount[]) {
    const seasonalDiscount = discounts.find((d) => d.type === 'seasonal');

    if (!seasonalDiscount) {
      return 0;
    }

    const seasonal = this.DiscountFactory.createSeasonal(seasonalDiscount as SeasonalDiscountType);

    const discountAmount = Math.min(seasonal.applyDiscount(originalPrice), originalPrice);

    discountList.push({ ...seasonalDiscount, amount: discountAmount });
    return discountAmount;
  }


  private calculateTotalDiscount(couponDiscount: number, onTopDiscount: number, seasonalDiscount: number): number {
    return couponDiscount + onTopDiscount + seasonalDiscount;
  }

}
