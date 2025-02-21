import api from "@/axiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface PayrollProps {
  id: number;
  salary: number;
  bonuses: number;
  deductions: number;
  salaryId: number;
}

const editPayroll = async (values: PayrollProps) => {
  const { id, salaryId } = values;
  const { data } = await api.patch(
    `/api/v1/payroll/edit-payroll?id=${id}?&salaryId=${salaryId}`,
    values
  );
  if (!data) throw new Error("Something went wrong");
  return data;
};

export const usePayrollEdit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-payroll", "id"],
    mutationFn: editPayroll,
    onSuccess: () => {
      toast.success("Payroll updated successfully");
      queryClient.invalidateQueries({ queryKey: ["payroll"] });
    },
    onError: () => {
      return toast.error("Failed to update payroll");
    },
  });
};

export const useMarkAsCompleted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["mark-as-completed", "id"],
    mutationFn: markAsCompleted,
    onSuccess: () => {
      toast.success("Payroll marked  successfully");
      queryClient.invalidateQueries({ queryKey: ["payroll"] });
    },
    onError: () => {
      return toast.error("Failed to mark payroll as completed");
    },
  });
};

const markAsCompleted = async (salaryId: number) => {
  const { data } = await api.patch(
    `/api/v1/payroll/mark-as-completed?salaryId=${salaryId}`
  );
  if (!data) throw new Error("Something went wrong");
  return data;
};
