import React, { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import useDashboardQueryOptions, {
  UseDashboardReponse,
} from "@/queryOptions/dashboardQueryOptions";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

interface DashboardContextProps {
  data: UseDashboardReponse | undefined;
  isPending: boolean;
  error: Error | null;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, isPending, error } = useQuery(useDashboardQueryOptions());

  if (error) {
    toast.error("Something went wrong, try to refresh the page");
  }

  if (!data && !isPending) return null;

  return (
    <DashboardContext.Provider value={{ data, isPending, error }}>
      {isPending ? <Spinner /> : children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
