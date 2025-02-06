import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "@/axiosConfig";
import useErrorHandler from "@/hooks/useErrorHandler";
import { toast } from "react-toastify";

interface CompanyProps {
  companyName: string;
  industry: string;
  address: string;
  city: string;
  country: string;
  zip: string;
}

interface CompanyCreateResponse {
  message: string;
}
export const useCompanyCreate = () => {
  const navigate = useNavigate();
  const { handleAxiosError } = useErrorHandler();

  return useMutation({
    mutationKey: ["create-company"],
    mutationFn: createCompany,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(handleAxiosError(error));
    },
  });
};
const createCompany = async (
  payload: CompanyProps
): Promise<CompanyCreateResponse> => {
  const { data } = await api.post("/api/v1/company/create-company", payload);
  return data;
};
