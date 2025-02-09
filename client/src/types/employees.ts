export interface EmployeesProps {
  firstName: string;
  lastName: string;
  position: string;
  status: "ACTIVE" | "RESIGNED" | "INACTIVE";
  payroll: number;
  Department: { name: string };
  createdAt: string;
  resignedAt: string | null;
}
