import api from "@/axiosConfig";
import { toast } from "react-toastify";
import { setCredentials, logOut } from "@/store/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useErrorHandler from "@/hooks/useErrorHandler";
import { useAuthQueryOptions } from "@/queryOptions/authQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
    onSuccess: async (data) => {
      dispatch(setCredentials(data));
      await new Promise((resolve) => setTimeout(resolve, 100));
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

  useEffect(() => {
    if (error) {
      dispatch(logOut());
    }

    if (data && !isPending) {
      dispatch(setCredentials(data));
    }
  }, [data, isPending, error, dispatch]);
};

const login = (payload: LoginProps) => authRequest(payload, "login");

const register = (payload: RegisterProps) => authRequest(payload, "register");

const authRequest = async (
  payload: RegisterProps | LoginProps,
  endpoint: string
) => {
  const { data } = await api.post(`/api/v1/auth/${endpoint}`, payload);
  return data;
};
