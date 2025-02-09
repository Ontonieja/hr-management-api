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
      {isPending ? (
        <div className="w-full h-full absolute top-0 left-0 flex z-50 justify-center items-center bg-white">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
