import api from "@/axiosConfig";
import { queryOptions } from "@tanstack/react-query";

export function useAuthQueryOptions() {
  return queryOptions({
    queryKey: ["use-auth"],
    queryFn: useAuth,
    retry: false,
  });
}

const useAuth = async () => {
  const { data } = await api.get("/api/v1/auth/user-info");
  return data;
};
