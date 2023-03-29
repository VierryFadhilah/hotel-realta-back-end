export class CreateFacilityPriceHistoryDto {
  faph_startdate: Date;
  faph_enddate: Date;
  faph_low_price: string;
  faph_high_price: string;
  faph_rate_price: string;
  faph_discount: string;
  faph_tax_rate: string;
  faph_modified_date: Date;
  faph_user_id: number;
  faph_faci_id: number;
}
