import { FixedAmountDiscount } from './fixed.amount.service';

describe('FixedAmountDiscount', () => {
    const discount = 50;
    let service: FixedAmountDiscount;

    beforeEach(() => {
        service = new FixedAmountDiscount(discount);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should apply fixed amount discount correctly', () => {
        const total = 350 + 250;
        const discountAmount = service.applyDiscount(total);
        expect(discountAmount).toBe(discount);
        expect(total - discountAmount).toBe(550);
    });

});
