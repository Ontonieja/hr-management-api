import api from "@/axiosConfig";
import { EmployeesProps } from "@/types/employees";
import { queryOptions } from "@tanstack/react-query";

export interface UseDashboardReponse {
  message: string;
  totalEmployees: number;
  totalResignedEmployees: number;
  totalPayroll: number;
  retentionRate: number;
  barChartData: [{ month: string; employees: number }];
  pieChartDepartmentData: [{ name: string; employees: number }];
  employees: EmployeesProps[];
}

export default function useDashboardQueryOptions() {
  return queryOptions({
    queryKey: ["dashboard"],
    queryFn: useDashboard,
    retry: 2,
  });
}

const useDashboard = async () => {
  const { data } = await api.get<UseDashboardReponse>(
    "api/v1/dashboard/get-stats"
  );
  return data;
};
