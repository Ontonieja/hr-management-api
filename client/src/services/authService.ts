import useAxios from "@/hooks/useAxios";
import { setCredentials } from "@/store/authSlice";
import { useDispatch } from "react-redux";

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
export const useAuthService = () => {
  const { fetchData, isLoading, error } = useAxios();
  const dispatch = useDispatch();

  const register = async (payload: RegisterProps) => {
    const data = await fetchData({
      method: "POST",
      url: "/api/v1/auth/register",
      data: payload,
    });

    dispatch(setCredentials(data));

    return data;
  };

  const login = async (payload: LoginProps) => {
    const data = await fetchData({
      method: "POST",
      url: "/api/v1/auth/login",
      data: payload,
    });

    dispatch(setCredentials(data));

    return data;
  };

  return { register, login, isLoading, error };
};
