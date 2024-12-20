import useAxios from "@/hooks/useAxios";

interface CompanyProps {
  companyName: string;
  industry: string;
  address: string;
  city: string;
  country: string;
  zip: string;
}
export const useCompanyService = () => {
  const { fetchData, error, isLoading } = useAxios();
  const createCompany = async (data: CompanyProps) => {
    const result = await fetchData({
      url: "/api/v1/company/create-company",
      method: "POST",
      data,
    });

    return result;
  };

  return { createCompany, error, isLoading };
};
