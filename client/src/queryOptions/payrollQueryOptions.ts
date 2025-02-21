import api from "@/axiosConfig";
import { PayrollResponse } from "@/types/payroll";
import { SalaryHistoryResponse } from "@/types/salary";
import { queryOptions } from "@tanstack/react-query";

export const usePayrollQueryOptions = (month: string) => {
  return queryOptions({
    queryKey: ["payroll", month],
    queryFn: () => fetchPayroll(month),
  });
};

const fetchPayroll = async (month: string): Promise<PayrollResponse> => {
  const { data } = await api.get(`/api/v1/payroll/get-stats?month=${month}`);
  if (!data) throw new Error("Something went wrong");
  return data;
};

export const viewSalaryHistoryQueryOptions = (salaryId: number) => {
  return queryOptions({
    queryKey: ["view-payroll-history", salaryId],
    queryFn: () => viewSalaryHistory(salaryId),
  });
};

const viewSalaryHistory = async (salaryId: number) => {
  const { data } = await api.get<SalaryHistoryResponse>(
    `/api/v1/payroll/get-salary-history?salaryId=${salaryId}`
  );
  if (!data) throw new Error("Something went wrong");
  return data;
};
