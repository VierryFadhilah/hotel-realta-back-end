interface Igeneral {
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
}
interface ISalary {
  salary: number;
  frequency: number;
  department: number;
}

interface IAssigment {
  startDate: string;
  endDate: string;
}

interface IShift {
  shift: number;
  startTime: number;
  endTime: number;
}

export class CreateEmployeeDto {
  general: Igeneral;

  salary: ISalary;
  assigment: IAssigment;
  shift: IShift;
}
