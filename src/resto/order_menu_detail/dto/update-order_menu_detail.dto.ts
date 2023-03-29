import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderMenuDetailDto } from './create-order_menu_detail.dto';

export class UpdateOrderMenuDetailDto extends PartialType(
  CreateOrderMenuDetailDto,
) {
  orme_price?: string;
  orme_qty?: number;
  orme_subtotal?: string;
  orme_discount?: string;
  omde_orme_id?: number;
  omde_reme_id?: number;
}
