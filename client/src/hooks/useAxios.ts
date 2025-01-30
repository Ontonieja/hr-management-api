import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import api from "@/axiosConfig";

interface ParamsProps {
  method: "GET" | "POST" | "PUT";
  url: string;
  data?: object;
}

export default function useAxios<T>() {
  const [response, setResponse] = useState<T | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const fetchData = useCallback(async (params: ParamsProps) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await api.request({
        method: params.method,
        url: params.url,
        data: params.data,
      });
      setResponse(result.data);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Unknown error from server");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { response, isLoading, error, fetchData };
}
