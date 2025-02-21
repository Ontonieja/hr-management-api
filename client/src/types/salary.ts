export interface SalaryProps {
  id: number;
  amount: number;
  date: string;
  createdAt: Date;
  status: "NEEDSETUP" | "COMPLETED";
  deductions: number;
  bonuses: number;
  employeeId: number;
  totalPaid: number;
}

export interface SalaryHistoryResponse {
  message: string;
  salaries: SalaryProps[];
}
