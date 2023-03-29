export class CreateRestoMenuDto {
  reme_faci_id?: number;
  reme_name?: string;
  reme_description?: string;
  reme_price?: string;
  reme_status?: string;
  reme_modified_date?: Date = new Date();
}
