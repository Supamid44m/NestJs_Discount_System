import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { DiscountFactoryService } from './discount.factory/discount.factory.service';

@Module({
  controllers: [DiscountController],
  providers: [DiscountService, DiscountFactoryService],
})
export class DiscountModule {}
