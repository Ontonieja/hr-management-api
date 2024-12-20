import { AxiosError } from "axios";
import axios from "@/axiosConfig";
import { useState } from "react";

interface ParamsProps {
  method: "GET" | "POST" | "PUT";
  url: string;
  data?: object;
}

export default function useAxios<T>() {
  const [response, setResponse] = useState<T | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const fetchData = async (params: ParamsProps) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await axios.request({
        method: params.method,
        url: params.url,
        data: params.data,
      });
      setResponse(result.data);
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else {
        setError("An unexpecetd error ocured");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, fetchData };
}
