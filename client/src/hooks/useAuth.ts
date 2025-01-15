import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/axiosConfig";
import { setCredentials, logOut } from "@/store/authSlice";
import { RootState } from "@/store/store";

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (!token) dispatch(logOut());
    const fetchUserInfo = async () => {
      try {
        const { data } = await api.get("/api/v1/auth/user-info");
        dispatch(setCredentials(data));
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        dispatch(logOut());
      }
    };

    fetchUserInfo();
  }, [token, dispatch]);
};

export default useAuth;
