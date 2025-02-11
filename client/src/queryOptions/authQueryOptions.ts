import api from "@/axiosConfig";
import { queryOptions } from "@tanstack/react-query";

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export function useAuthQueryOptions() {
  return queryOptions({
    queryKey: ["use-auth"],
    queryFn: useAuth,
    refetchOnWindowFocus: false,
  });
}

const useAuth = async () => {
  const { data } = await api.get<AuthResponse>("/api/v1/auth/user-info");

  return data;
};
