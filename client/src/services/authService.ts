import api from "@/axiosConfig";
import { toast } from "react-toastify";
import { setCredentials, logOut } from "@/store/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useErrorHandler from "@/hooks/useErrorHandler";
import { useAuthQueryOptions } from "@/queryOptions/authQueryOptions";
import { useQuery } from "@tanstack/react-query";

interface RegisterProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginProps {
  email: string;
  password: string;
}

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

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleAxiosError } = useErrorHandler();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      navigate("/dashboard");
    },
    onError: (error) => {
      dispatch(logOut());
      toast.error(handleAxiosError(error));
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleAxiosError } = useErrorHandler();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      navigate("/company");
    },
    onError: (error) => {
      toast.error(handleAxiosError(error));
    },
  });
};

export const useUserInfo = () => {
  const dispatch = useDispatch();

  const { data, isPending, error } = useQuery(useAuthQueryOptions());
  if (error) {
    console.error("Failed to fetch user info:", error);
    dispatch(logOut());
  }

  if (data && !isPending) dispatch(setCredentials(data));
};

const login = async (payload: LoginProps): Promise<AuthResponse> => {
  const { data } = await api.post("/api/v1/auth/login", payload);
  return data;
};

const register = async (payload: RegisterProps): Promise<AuthResponse> => {
  const { data } = await api.post("/api/v1/auth/register", payload);
  return data;
};
