export class CreateOrderMenuDto {
  orme_order_number?: string;
  orme_order_date?: Date;
  orme_total_item?: number;
  orme_total_discount?: string;
  orme_total_amount?: string;
  orme_pay_type?: string;
  orme_cardnumber?: string;
  orme_is_paid?: string;
  orme_modified_date?: Date = new Date();
  orme_user_id?: number;
}
