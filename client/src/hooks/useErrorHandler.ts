import { AxiosError } from "axios";

export default function useErrorHandler() {
  const handleAxiosError = (error: Error) => {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || "Unknown error from server";
    }
    return "An unexpected error occured";
  };
  return { handleAxiosError };
}
