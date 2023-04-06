export class CreateEmployeeDto {
  user_id: number;
  nationalId: string;
  birth: Date;
  hireDate: Date;
  salariedFlag: string;
  status: string;
  vacationHours: number;
  sickLeaveHours: number;
  jobRole: number;
  gender: string;
  currentFlag: number;
  salary: string;
  frequency: number;
  department: number;
  startDate: Date;
  endDate: Date;
  shift_id: number[] | string;
  emp_photo: string;
}
