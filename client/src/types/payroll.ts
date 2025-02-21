export interface Salary {
  id: number;
  bonuses: number;
  createdAt: string;
  date: string;
  deductions: number;
  status: "NEEDSETUP" | "COMPLETED";
}

export interface PayrollEmployee {
  id: number;
  firstName: string;
  lastName: string;
  payroll: number;
  salary: Salary;
}

export interface PayrollResponse {
  message: string;
  employees: PayrollEmployee[];
}
