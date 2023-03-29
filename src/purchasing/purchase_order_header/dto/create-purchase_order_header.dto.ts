export class CreatePurchaseOrderHeaderDto {
  pohe_number: string;
  pohe_status: string;
  pohe_order_date: Date;
  pohe_subtotal: string;
  pohe_tax: string;
  pohe_total_amount: string;
  pohe_refund: string;
  pohe_arrival_date: Date;
  pohe_pay_type: string;
  pohe_emp_id: number;
  pohe_vendor_id: number;
  pohe_line_items: number;
}
